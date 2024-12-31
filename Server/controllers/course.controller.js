const COURSE = require("../models/course.model");
const LECTURE = require("../models/lecture.model");
const {
  deleteMediaFromCloudinary,
  uploadMedia,
  deleteVideoFromCloudinary,
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
const searchCourse = async (req, res) => {
  try {
    const { query = "", categories = [], sortByPrice = "" } = req.query;
    //create searchquery
    const searchCriteria = {
      isPublished: true,
      $or: [
        { courseTitle: { $regex: query, $options: "i" } },
        { subTitle: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    };
    //if categories selected
    if (categories.length > 0) {
      searchCriteria.category = { $in: categories };
    }
    //define sorting order
    const sortOptions = {};
    if (sortByPrice === "low") {
      sortOptions.coursePrice = 1;
    } else if (sortByPrice === "high") {
      sortOptions.coursePrice = -1;
    }
    const courses=await COURSE.find(searchCriteria).populate({path:"creator",select:"name photoUrl"}).sort(sortOptions)

    return res.status(200).json({
      success:true,
      courses:courses || []
    })
  } catch (error) {
    return res.status(500).json({
      message:"Failed to fetch course"
    })
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
const getPublishedCourse = async (req, res) => {
  try {
    const getPublishedCourse = await COURSE.find({
      isPublished: true,
    }).populate({ path: "creator", select: "name photoUrl " });
    if (!getPublishedCourse) {
      return res.status(404).json({
        success: false,
        message: "No courses found",
      });
    }
    return res.status(200).json({
      message: "Succefully fetched the published course!",
      getPublishedCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to find the course",
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
      courseThumbnail: courseThumbnail?.secure_url,
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

    const CourseFind = await COURSE.findById(courseId).populate({
      path: "creator",
    });
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
    //todo

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
const editLecture = async (req, res) => {
  try {
    const { lectureId, courseId } = req.params;
    const { lectureTitle, videoInfo, isPreviewFree } = req.body;
    const lecture = await LECTURE.findById(lectureId);
    console.log("hi");

    if (!lecture) {
      return res.status(500).json({
        success: false,
        message: "No lectures found!",
      });
    }
    if (lectureTitle) lecture.lectureTitle = lectureTitle;
    if (videoInfo?.videoUrl) lecture.videoUrl = videoInfo.videoUrl;
    if (videoInfo?.publicId) lecture.publicId = videoInfo.publicID;
    lecture.isPreviewFree = isPreviewFree;
    await lecture.save();
    res.status(200).json({
      message: "Succefully updated the lecture",
      lecture,
    });
    //todo
    // Optionally, check if the course does not already include the lecture, but it's not always needed
    const course = await COURSE.findById(courseId);

    if (course && !course.lectures.includes(lecture._id)) {
      course.lectures.push(lecture._id);
      await course.save();
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to Edit Lecture!",
    });
  }
};
const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await LECTURE.findByIdAndDelete(lectureId);
    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "Lecture not found",
      });
    }
    if (lecture.publicId) {
      await deleteVideoFromCloudinary(lecture.publicId);
    }
    await COURSE.updateOne(
      { lectures: lectureId },
      { $pull: { lectures: lectureId } }
    );
    return res.status(200).json({
      success: true,
      message: "Succefully delete the course",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete the course",
    });
  }
};
const getLectureById = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await LECTURE.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "No lectures found",
      });
    }
    return res.status(200).json({
      success: true,
      lecture,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch the course",
    });
  }
};
const togglePublishCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { publish } = req.query;
    const course = await COURSE.findByIdAndUpdate(
      courseId,
      { isPublished: publish },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const statusMessage = course.isPublished ? "Published" : "Unpublished";
    return res.status(200).json({
      success: true,
      message: `Course is ${statusMessage}`,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to publish course",
    });
  }
};
module.exports = {
  createCourse,
  getAdmincCourse,
  editCourse,
  getCourse,
  createLecture,
  getCourseLecture,
  editLecture,
  removeLecture,
  getLectureById,
  togglePublishCourse,
  getPublishedCourse,
  searchCourse
};
