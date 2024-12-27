const COURSE = require("../models/course.model");

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
    if(!findCourse){
        return res.status(500).json({
            message: "NO courses found"
          });
        
    }
    res.status(200).json({
        findCourse,
        message:"Succefully fetched Courses"
    })
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch "+error,
    });
  }
};
module.exports = { createCourse,getAdmincCourse };
