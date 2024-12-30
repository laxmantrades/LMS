const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const {
  createCheckoutSession,
  stripeWebhook,
  getCourseDetailsWithPurchaseStatus,
  getAllPurchasedCourse,
} = require("../controllers/coursePurchase.controller");
const router = express.Router();

router
  .route("/checkout/create-checkout-session")
  .post(isAuthenticated, createCheckoutSession);
router
  .route("/webhook")
  .post(
    express.raw({ type: "application/json" }),
   
    stripeWebhook
  );
router.route("/course/:courseId/detail-with-status").get(isAuthenticated,getCourseDetailsWithPurchaseStatus);
router.route("/get").get(isAuthenticated,getAllPurchasedCourse);

module.exports = router;
