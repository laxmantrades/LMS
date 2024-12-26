const courseModel = require("../models/course.model")

const createCourse=async(req,res)=>{
    try{const {courseTitle,category}=req.body
    if(!courseTitle,!category){
        return res.status(500).json({
            message:"CourseTitle and Category are required"
        })
    }
    const course=await new courseModel({courseTitle,category,creator:req.id})
    return res.status(200).json({
        course,
        message:"Course created Succefully"
    })
}
catch(error){
    return res.status(500).json({
        message:"Failed to create the course"
    })
}

}
module.exports={createCourse}