import { Box, useMediaQuery } from "@mui/material";
import Navbar from "views/navbar";
import StudentWidget from "views/widgets/StudentWidget";
import { useSelector } from "react-redux";
import MyQuestionWidget from "views/widgets/MyQuestionWidget";
import FeedQuestionsWidget from "views/widgets/FeedQuestionsWidget";
import BroadcastWidget from "views/widgets/BroadcastWidget";
import ConnectionListWidget from "views/widgets/ConnectionListWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { _id, profileImage } = useSelector((state) => state.student);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <StudentWidget studentId={_id} profileImage={profileImage} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyQuestionWidget profileImage={profileImage} />
          <FeedQuestionsWidget studentId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <BroadcastWidget />
            <Box m="2rem 0" />
            <ConnectionListWidget studentId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;

// <FeedQuestionsWidget studentId={_id} />
