const CourseProgress = require("../models/courseProgress");
const COURSE = require("../models/course.model");

const getCourseProgress = async (req, res) => {
  //todo incomplete
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const courseDetails = await COURSE.findById(courseId).populate("lectures");
    if (!courseDetails) {
      return res.status(404).json({
        message: "Course not found",
      });
    }
    //fetch the user course progress
    const courseProgress = await CourseProgress.findOne({ courseId, userId });
    //step 2 if no progress found,return course details with an empty progress
    if (!courseProgress) {
      return res.status(200).json({
        data: {
          courseDetails,
          progress: [],
          completed: false,
        },
      });
    }
    //step 3 return the user course progress along with course detauls
    return res.status(200).json({
      data: {
        courseDetails,
        progress: courseProgress.lectureProgress,
        completed: courseProgress.completed,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch course Progress",
    });
  }
};
const updateLectureProgress = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;
    const userId = req.id;

    //check wether the course exists or not !
    let courseProgress = await CourseProgress.findOne({ courseId, userId });
    // if no progress create a  new courseProgress
    if (!courseProgress) {
      courseProgress = await new CourseProgress({
        userId,
        courseId,

        completed: false,
        lectureProgress: [],
      });
    }
    //find the lecture progress in the course progress
    const lectureIndex = courseProgress.lectureProgress.findIndex(
      (lecture) => lecture.lectureId === lectureId
    );
    if (lectureIndex !== -1) {
      //if lecture  alredy exist then update status
      courseProgress.lectureProgress[lectureIndex].viewed = true;
    } else {
      //if no lecture progress found then add new lecture progress
      courseProgress.lectureProgress.push({ lectureId, viewed: true });
    }
    //toggle viewd
    //todo
   
   
    //if all lecture is complete
    const lectureProgresslength = courseProgress.lectureProgress.filter(
      (lectureProgress) => lectureProgress.viewed
    ).length;
    const course = await COURSE.findById(courseId);
    

    //if lectures length is equal to lectureProgress length
    if (course.lectures.length === lectureProgresslength)
      courseProgress.completed = true;
    await courseProgress.save();
    return res.status(200).json({
      message: "Succefully updated the lecture progress",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update the lecture progress",
    });
  }
};
const markAsCompleted = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;
    const courseProgress = await CourseProgress.findOne({ courseId, userId });
    if (!courseProgress) {
      return res.status(404).json({
        message: "No course progess is tracked",
      });
    }
    courseProgress.lectureProgress.map(
      (lectureProgress) => (lectureProgress.viewed = true)
    );
    courseProgress.completed = true;
    await courseProgress.save();

    return res.status(200).json({
      message: "Course marked as completed",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to mark course completed",
    });
  }
};
const markAsInCompleted = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;
    const courseProgess = await CourseProgress.findOne({ courseId, userId });
    if (!courseProgess) {
      return res.status(404).json({
        message: "Failed to find the course progress",
      });
    }
    courseProgess.lectureProgress.map(
      (lectureProgress) => (lectureProgress.viewed = false)
    );
    courseProgess.completed = false;
    await courseProgess.save();
    return res.status(200).json({
      message: "Succefully marked as incomplete",
    });
  } catch (error) {}
};
module.exports = {
  getCourseProgress,
  updateLectureProgress,
  markAsCompleted,
  markAsInCompleted,
};
