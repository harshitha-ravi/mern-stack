import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
// The below two will help in fully set the paths when configuring the directories
import path from "path";
import {fileURLToPath} from "url";
import { registerStudent } from "./controller/auth.js"
import { createPost } from "./controller/post.js"
import authRoutes from "./routes/auth.js";
import studentRoutes from "./routes/student.js"
import postRoutes from "./routes/post.js"
import { verifyToken } from "./middleware/auth.js";
 

/* Configurations - Will contain all the middleware configs and different package configs*/

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(express.json());

// For request safety
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));

app.use(morgan("common")); // For logging

// To process request body
app.use(bodyParser.json({limit:"30mb", extended: true})); 
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

app.use(cors()); // cross-origin request

// set the directory where we store images locally
// For production - can be stored on cloud storage like s3 
app.use("/images", express.static(path.join(__dirname, 'public/images')));


/* Local File Storage using multer 
// This is how we can save files locally - Anytime someone uploads a file, it goes to destination and will
// be saved in the link mentioned */ 
const localStorage = multer.diskStorage({
    destination : function (req, file, cb) {
        cb(null, "public/images");
    },
    filename : function (req, file, cb) {
        cb(null, file.originalname);
    }
});

/* To upload any file, will be using the below variable uploadFile.
   This will save the file in the local storage defined*/
const uploadFile = multer({localStorage});

/** Creating ROUTE WITH FILES 
 * "auth/register" - is the endpoint to hit
 * uploadFile - is the middleware function that stores the images locally
 * registerStudent  - is the actual db operation to store student details in DB
 * 
 * Here, image is the variable name from the fronetend - the image given in that variable
 * will be grabbed - make sure it aligns with the frontend
*/
app.post("/auth/register", uploadFile.single("image"), registerStudent);
app.post("/posts/create", verifyToken, uploadFile.single("image"), createPost);

/** OTHER ROUTES */
app.use("/auth", authRoutes);
app.use("/student", studentRoutes); 
app.use("/posts", postRoutes);

/* SETTING UP MONGOOSE */
const PORT = process.env.PORT || 6001; 

// to supress the warning
mongoose.set('strictQuery', true); 

mongoose.connect(process.env.MONGO_URL, {
     useNewUrlParser : true,
     useUnifiedTopology : true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port : ${PORT}`));
     
}).catch((error) => console.log(`${error} : Couldn't connect to database`));  










