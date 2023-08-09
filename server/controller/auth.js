import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Student from "../domain/Student.js";

/** STUDENT REGISTRATION */
/** Creating a register function - creates a new Student entry
 *  Call to mongoDB is async
 *  (req, res) -> Express provides this by default
 *  
 */
export const registerStudent = async (req, res) => {
    try{
        // Fron-end will send an object that will have all these fields
        const{
            firstName,
            lastName,
            email,
            password,
            profileImage,
            connections,
            address
        } = req.body; // grab all these fileds from the request body 

        // Creating a random salt provided by the bcrypt . 
        // salt will be to encryopt password
        const salt = await bcrypt.genSalt();
        const encryptedPassword = await bcrypt.hash(password, salt);

        /** 1- Encrypt the password
         *  2- Save it
         *  3- When user logs in - they provide the password.
         *  4 - In Backend - it will be salted again 
         *  5 - We will not store the real password, it will be encryptedPassword
         *    
         */

        const newStudent = new Student({
            firstName,
            lastName,
            email,
            password : encryptedPassword,
            profileImage,
            connections,
            address,
            viewedProfile : Math.floor(Math.random() * 1000),
            impressions: Math.floor(Math.random() * 1000)

        });

        const savedStudent = await newStudent.save();
        res.status(201).json(savedStudent); 

    }catch (err){
        res.status(500).json({error : err.message}); 
    }
};

  /** LOGIN FUNCTION */
  export const studentLogin = async (req, res) => {
    try{
        // Extracting the email and password from the req body
        const {email, password} = req.body;

        // Using the email fetch the Student details from mongoDB (using mongoose model)
        const student = await Student.findOne({email : email});

        // Check if the student exists or not
        if(!student) return res.status(400).json({msg : "Student doesn't exist."});

        // comapre the password and check if it's valid or not
        const isValid = await bcrypt.compare(password, student.password);
        if(!isValid) return res.status(400).json({msg: "Invalid credentials"});

        /** Creating a jwt token for the current student login with the JWT secret
         * once done -> delete the password 
         * In the response body -> send token and stuent object
         * 
         */
        const token = jwt.sign({ id : student._id }, process.env.JWT_SECRET);
        delete student.password;
        res.status(200).json({token, student});

    }catch(err){
        res.status(500).json({error : err.message});
    }
  };

