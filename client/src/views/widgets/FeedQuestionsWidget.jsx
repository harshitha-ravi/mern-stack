import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "state";
import QuestionWidget from "./QuestionWidget";

const FeedQuestionsWidget = ({ studentId, isProfile = false }) => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  /**  Writing 2 different APIs
   * 1 - To get all the feed questions
   * 2 - To get the profile specific questions
   * 3 - Integrating BE APIs
   */
  const getFeedQuestions = async () => {
    // Making an API call to fetch all the feed questions
    const response = await fetch(`http://localhost:3001/posts/`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    // extracting the questions as json from response
    const questions = await response.json();

    // saving the feed questions to the redux state (state store)
    dispatch(setPosts({ posts: questions }));
  };

  const getProfileQuestions = async () => {
    // Making an API call to fetch the profile questions specific to a student
    const response = await fetch(`http://localhost:3001/posts/${studentId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    // extracting the questions as json from response
    const questions = await response.json();

    // saving the feed questions to the redux state (state store)
    dispatch(setPosts({ posts: questions }));
  };

  /** [] - so that it is used only once
   * to disable the warnings below comment lines are given (eslint, react hooks)
   */
  useEffect(() => {
    if (isProfile) {
      getProfileQuestions();
    } else {
      getFeedQuestions();
    }
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {questions.map(
        ({
          _id,
          studentId,
          firstName,
          lastName,
          question,
          address,
          profileImage,
          studentImagePath,
          upVotes,
          answers,
        }) => (
          <QuestionWidget
            key={_id}
            questionId={_id}
            questionStudentId={studentId}
            name={`${firstName} ${lastName}`}
            question={question}
            address={address}
            profileImage={profileImage}
            studentImagePath={studentImagePath}
            upVotes={upVotes}
            answers={answers}
          />
        )
      )}
    </>
  );
};

export default FeedQuestionsWidget;
