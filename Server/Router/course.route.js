const express = require("express");

const isAuthenticated = require("../middlewares/isAuthenticated");
const { createCourse } = require("../controllers/course.controller");

const router = express.Router();

router.route("/").post(isAuthenticated, createCourse);

module.exports = router;
