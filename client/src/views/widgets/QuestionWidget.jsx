import {
  ChatBubbleOutlineOutlined,
  ArrowUpwardOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, Typography, useTheme, IconButton } from "@mui/material";
import FlexLayout from "components/FlexLayout";
import Connection from "components/Connection";
import WidgetContainer from "components/WidgetContainer";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPost } from "state";

const QuestionWidget = ({
  questionId,
  questionStudentId,
  name,
  question,
  address,
  profileImage,
  studentImagePath,
  upVotes,
  answers,
}) => {
  // declare the required set of variables

  // this variable is to determine if the answers list is opened or not
  const [isAnswers, setIsAnswers] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInStudentId = useSelector((state) => state.student._id);

  /**
   * upVotes is defined as a map object in mongo
   * upVotes : {student1 : true, student2: true}
   * To get the number of upVotes -> just fetch the length of the keys in the maps
   *
   */
  const isUpvoted = Boolean(upVotes[loggedInStudentId]);
  const upVoteCount = Object.keys(upVotes).length;

  // theme settings variables
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  // Function to make calls to change the upVote. Integration with BE.
  const patchUpVote = async () => {
    // Integrating BE API to update the upVotes. questionId -> postId
    const response = await fetch(
      `http://localhost:3001/posts/upVote/${questionId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studentId: loggedInStudentId }),
      }
    );

    // fethcing the updated post response as json
    const updatedQuestionPost = await response.json();

    // Update the global state
    dispatch(setPost({ post: updatedQuestionPost }));
  };

  return (
    <WidgetContainer m="2rem 0">
      <Connection
        connectionId={questionStudentId}
        name={name}
        subtitle={address}
        profileImage={profileImage}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {question}
      </Typography>
      {studentImagePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/images/${studentImagePath}`}
        />
      )}
      <FlexLayout mt="0.25rem">
        <FlexLayout gap="1rem">
          <FlexLayout gap="0.3rem">
            <IconButton onClick={patchUpVote}>
              {isUpvoted ? (
                <ArrowUpwardOutlined sx={{ color: primary }} />
              ) : (
                <ArrowUpwardOutlined />
              )}
            </IconButton>
            <Typography>{upVoteCount}</Typography>
          </FlexLayout>

          <FlexLayout gap="0.3rem">
            <IconButton onClick={() => setIsAnswers(!isAnswers)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{answers.length}</Typography>
          </FlexLayout>
        </FlexLayout>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexLayout>
      {isAnswers && (
        <Box mt="0.5rem">
          {answers.map((answer, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {answer}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetContainer>
  );
};

export default QuestionWidget;
