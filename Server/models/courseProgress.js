const mongoose = require("mongoose");

const lectureProgressSchema = new mongoose.Schema(
  {
    lectureId: {
      type: String,
    },
    viewed: {
      type: Boolean,
    },
  },
  { timestamps: true }
);
const courseProgressSchema = new mongoose.Schema({
  userId: { type: String },
  courseId: { type: String },
  completed: { type: Boolean },
  lectureProgress: [lectureProgressSchema],
});


module.exports = new mongoose.model("CourseProgress", courseProgressSchema);
