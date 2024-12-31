const express = require("express");

const isAuthenticated = require("../middlewares/isAuthenticated");
const {
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
  searchCourse,
} = require("../controllers/course.controller");
const upload = require("../utils/multer");
const router = express.Router();

router.route("/").post(isAuthenticated, createCourse);
router.route("/search/course").get(isAuthenticated, searchCourse);
router.route("/search").get(isAuthenticated, getAdmincCourse);
router.route("/published-course").get(isAuthenticated, getPublishedCourse);
router
  .route("/:courseId")
  .put(isAuthenticated, upload.single("courseThumbnail"), editCourse);
router.route("/:courseId").get(isAuthenticated, getCourse);
router.route("/:courseId/lecture").post(isAuthenticated, createLecture);
router.route("/:courseId/lecture").get(isAuthenticated, getCourseLecture);
router
  .route("/:courseId/lecture/:lectureId")
  .patch(isAuthenticated, editLecture);
router.route("/lecture/:lectureId").delete(isAuthenticated, removeLecture);
router.route("/lecture/:lectureId").get(isAuthenticated, getLectureById);
router.route("/:courseId").patch(isAuthenticated, togglePublishCourse);

module.exports = router;
