 import express from "express";
 import {
    getStudent,
    getStudentConnections,
    addRemoveConnection
 } from "../controller/student.js";

import { verifyToken } from "../middleware/auth.js";

 const router = express.Router();

  /* READ */
  router.get("/:id", verifyToken, getStudent);
  router.get("/:id/connections", verifyToken, getStudentConnections);

  /* UPDATE */
  router.patch("/:id/:connectionId", verifyToken, addRemoveConnection);

  export default router;

