import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createReview, deleteReview } from "../controller/review.controller.js";

const router = Router();

router.use(protectRoute);

router.post("/", createReview);
router.post("/:reviewId", deleteReview);

export default router;
