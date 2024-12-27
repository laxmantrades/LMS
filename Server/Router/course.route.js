const express = require("express");

const isAuthenticated = require("../middlewares/isAuthenticated");
const { createCourse, getAdmincCourse } = require("../controllers/course.controller");

const router = express.Router();

router.route("/").post(isAuthenticated, createCourse);
router.route("/search").get(isAuthenticated,getAdmincCourse)

module.exports = router;
