import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        studentId: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        question: {
            type: String,
            required: true
        },
        address: String,
        profileImage: String,
        imagePath: String,  // image path part of the post
        upVotes : {
             type: Map,  // Object in mongo (in Schema it's mentinoed as Map)
             of: Boolean  // value of Boolean
             // Check if the studenId exists in this Map : value will be true always if it exists
        },
         answers: {
            type: Array,
            default: []
         }    

    },
    {timestamps: true}
);

const Post = mongoose.model("Post", postSchema);
export default Post;