import express from "express";
import {
  getFeedQuestions,
  getStudentQuestions,
  upVote,
} from "../controller/post.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/** READ */
router.get("/", verifyToken, getFeedQuestions);
router.get("/:studentId", verifyToken, getStudentQuestions);

/** UPDATE */
router.patch("/upVote/:postId", verifyToken, upVote);

export default router;
