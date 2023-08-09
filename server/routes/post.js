import express from "express";
import { getFeedQuestions, getStudentQuestions, upVote } from "../controller/post.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/** READ */
router.get("/", verifyToken, getFeedQuestions);
router.get("/:studentId/posts", verifyToken, getStudentQuestions);

/** UPDATE */
router.patch("/upVote/:id", verifyToken, upVote);

export default router;
