 import mongoose from "mongoose";

 /** When a creating a model in mongoose :
  * 1 - First create the schema
  * 2 - Then create the model by passing the schema
  */
 const StudentSchema = new mongoose.Schema(
    {
        firstName : {
            type: String,
            required: true,
            min: 2,
            max: 30
        }, 
        lastName : {
            type: String,
            required: true,
            min: 2,
            max: 30
        },
        email : {
            type: String,
            required: true,
            max: 40,
            unique: true //should be unique 
        },
        password : {
            type: String,
            required: true,
            min: 8
        },
        profileImage : {
            type: String,
            default: ""
        },
        connections : {
            type: Array,
            default: []
        },
        address : String,
        viewedProfile : Number,
        impressions : Number,     
    }, 
    {timestamps : true}
 )

 const Student = mongoose.model("Student", StudentSchema);
 export default Student;