import Post from "../domain/Post.js";
import Student from "../domain/Student.js";



 /** createPost */
 export const createPost = async (req, res) => {
    try{
        // read the params from req body
        const { studentId, question, imagePath } = req.body;

        // Fetch the student details
        const student = await Student.findById(studentId);

        // creatining a new post object
        const newPost = new Post({
            studentId,
            firstName: student.firstName,
            lastName: student.lastName,
            question,
            address: student.address,
            profileImage: student.profileImage,
            imagePath,
            upVotes: {},
            answers: []
        });

        // Saving to mongo
        await newPost.save();

        // Then, return all the posts, after updating
        const posts = await Post.find();
        res.status(201).json(posts);

    }catch(err){
        res.status(409).json({message: err.message});
    }
 }

  /** READ Functions */

  /** getFeedQuestions
   * This functoin will return all the posts from POST collection
   */
  export const getFeedQuestions = async (req, res) => {
    try{
       // Find all posts and send it
       const posts = await Post.find();
       res.status(200).json(posts);
    } catch(err) {
        res.status(404).json({error: err.message});
    }
  }

  /** getStudentQuestions 
   * This function will return only the questions posted by the given student
  */

  export const getStudentQuestions = async (req, res) => {
    try{
        // Fetch the studentId
        const { studentId } = req.params;

        // Find the questions posted by studentId
        const studentQuestions = await Post.find({studentId});
 
        res.status(200).json(studentQuestions);

    }catch (err){
        res.status(404).json({error: err.message});
    }
  }

  /** UPDATE function */

  /** upVote : This function is used to upVote/downVote the post
   *  Technically -> the post is already upVoted -> then downVote
   *     If not --> upVote
   * params sent in req --> postId
   * req body --> studentId
   */
export const upVote = async (req, res) => {
    try{
        // Fetch the postId from params and userid from body
        const { postId } = req.params;
        const { studentId } = req.body;

        // Fetch the post based on the postId
        const post = await Post.findById(postId);

        // Fetch the upVote for the given studentId {upVotes is a Map object, default value true}
        const isUpVoted = post.upVotes.get(studentId);

        if(isUpVoted){
            post.upVotes.delete(studentId);
        } else{
            post.upVotes.set(studentId, true);
        }

        // Update mongo - findByIdAndUpdate
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { upVotes: post.upVotes },
            { new: true }
        );

        res.status(200).json(updatedPost);
    }catch (err) {
        res.status(404).json({ error: err.message});

    }

}



