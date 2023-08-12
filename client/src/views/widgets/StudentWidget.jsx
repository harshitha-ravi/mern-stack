import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import StudentImage from "components/StudentImage";
import FlexLayout from "components/FlexLayout";
import WidgetContainer from "components/WidgetContainer";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentWidget = ({ studentId, profileImage }) => {
  const [student, setStudent] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate;
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  // function to integrate backend API to get a student info
  const getStudent = async () => {
    const response = await fetch(`http://localhost:3001/student/${studentId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const studentData = await response.json();
    setStudent(studentData);
  };

  // todo: understand this syntax and it's need
  useEffect(() => {
    getStudent();
  }, []);

  // if student object is empty, return null -> if not it will error out
  if (!student) {
    return null;
  }

  // Destructuring the student object
  const {
    firstName,
    lastName,
    address,
    viewedProfile,
    impressions,
    connections,
  } = student;

  return (
    <WidgetContainer>
      {/* FIRST ROW */}
      <FlexLayout
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${studentId}`)}
      >
        <FlexLayout gap="1rem">
          <StudentImage image={profileImage} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>
              {connections.length} connections
            </Typography>
          </Box>
        </FlexLayout>
        <ManageAccountsOutlined />
      </FlexLayout>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{address}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>Student</Typography>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexLayout mb="0.5rem">
          <Typography color={medium}>Profile Views</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexLayout>
        <FlexLayout>
          <Typography color={medium}>Post Reactions</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexLayout>
      </Box>

      <Divider />

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Network Profiles
        </Typography>

        <FlexLayout gap="1rem" mb="0.5rem">
          <FlexLayout gap="1rem">
            <img src="../images/twitter.png" alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexLayout>
          <EditOutlined sx={{ color: main }} />
        </FlexLayout>

        <FlexLayout gap="1rem">
          <FlexLayout gap="1rem">
            <img src="../images/linkedin.png" alt="linkedin" />
            <Box>
              <Typography color={main} fontWeight="500">
                LinkedIn
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexLayout>
          <EditOutlined sx={{ color: main }} />
        </FlexLayout>
      </Box>
    </WidgetContainer>
  );
};

export default StudentWidget;
