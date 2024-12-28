const express = require("express");

const isAuthenticated = require("../middlewares/isAuthenticated");
const { createCourse, getAdmincCourse, editCourse, getCourse, createLecture, getCourseLecture } = require("../controllers/course.controller");
const upload = require("../utils/multer");
const router = express.Router();

router.route("/").post(isAuthenticated, createCourse);
router.route("/search").get(isAuthenticated,getAdmincCourse)
router.route("/:courseId").put(isAuthenticated,upload.single("courseThumbnail"),editCourse)
router.route("/:courseId").get(isAuthenticated,getCourse)
router.route("/:courseId/lecture").post(isAuthenticated,createLecture)
router.route("/:courseId/lecture").get(isAuthenticated,getCourseLecture)

module.exports = router;
