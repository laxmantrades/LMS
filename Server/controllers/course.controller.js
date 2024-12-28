const COURSE = require("../models/course.model");
const LECTURE = require("../models/lecture.model");
const {
  deleteMediaFromCloudinary,
  uploadMedia,
} = require("../utils/cloudinary");

const createCourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;
    if ((!courseTitle, !category)) {
      return res.status(500).json({
        message: "CourseTitle and Category are required",
      });
    }
    const course = await new COURSE({
      courseTitle,
      category,
      creator: req.id,
    }).save();
    return res.status(200).json({
      course,
      message: "Course created Succefully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create the course",
    });
  }
};
const getAdmincCourse = async (req, res) => {
  try {
    const userID = req.id;
    const findCourse = await COURSE.find({ creator: userID });
    if (!findCourse) {
      return res.status(500).json({
        message: "NO courses found",
      });
    }
    res.status(200).json({
      findCourse,
      message: "Succefully fetched Courses",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch " + error,
    });
  }
};

const editCourse = async (req, res) => {
  try {
    const id = req.params.courseId;

    const {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
    } = req.body;
    let findcourse = await COURSE.findById(id);

    if (!findcourse) {
      return res.status(500).json({
        success: false,
        message: "No user found",
      });
    }
    const thumbnail = req.file;
    let courseThumbnail;
    //logic to change the courseTHumnail to url
    if (thumbnail) {
      if (findcourse.courseThumbnail) {
        const publicID = findcourse.courseThumbnail
          .split("/")
          .pop()
          .split(".")[0];
        await deleteMediaFromCloudinary(publicID);
      }
      courseThumbnail = await uploadMedia(thumbnail.path);
    }
    //logic to find and update
    const update = {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
      courseThumbnail: courseThumbnail,
    };
    findcourse = await COURSE.findByIdAndUpdate(id, update, { new: true });
    if (!findcourse) {
      return res.status(500).json({
        success: false,
        message: "Failed to update the course",
      });
    }

    res.status(200).json({
      findcourse,
      message: "Succefully updated the course",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to edit the course" + err.message,
    });
  }
};
const getCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    const CourseFind = await COURSE.findById(courseId);
    if (!CourseFind) {
      return res.status(500).json({
        success: false,
        message: "No courses found",
      });
    }
    return res.status(200).json({
      CourseFind,
      message: "Succefully fetched the course",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch the course",
    });
  }
};
const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { courseId } = req.params;

    if (!lectureTitle || !courseId) {
      return res.status(500).json({
        success: false,
        message: "Lecture and CourseId is required",
      });
    }

    //now create lecture
    const newlecture = await new LECTURE({ lectureTitle }).save();

    //finding the course with the courseId

    const findcourse = await COURSE.findById(courseId);
    const { lectures } = findcourse;
    console.log(lectures);

    if (findcourse) {
      await COURSE.updateOne(
        { _id: courseId },
        { $push: { lectures: newlecture._id } }
      );
    }

    return res.status(201).json({
      newlecture,
      message: "Succefully created the lecture",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create Lecture!" + error,
    });
  }
};
const getCourseLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await COURSE.findById(courseId).populate("lectures");
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Courses not foud",
      });
    }
    return res.status(200).json({
      lectures: course.lectures,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch Courses!",
    });
  }
};
module.exports = {
  createCourse,
  getAdmincCourse,
  editCourse,
  getCourse,
  createLecture,
  getCourseLecture
};
