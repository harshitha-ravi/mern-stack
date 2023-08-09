import express from "express";
import {studentLogin} from "../controller/auth.js";

/** Setting up a router 
 * This will allow the express to identify that these routes will be configured 
 * And, his allows to have the routes in separate file 
 * Here, we don;t use app.use() -> instead using router.post()*/ 
const router = express.Router(); 

//  /auth/login will routed to this route
router.post("/login", studentLogin);

export default router;
