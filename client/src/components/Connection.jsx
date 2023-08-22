import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import StudentImage from "components/StudentImage";
import FlexLayout from "components/FlexLayout";
import { setConnections } from "state";
import { Box, Typography, IconButton, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Connection = ({ connectionId, name, subtitle, profileImage }) => {
  // define the set of required variables
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // to test
  const student = useSelector((state) => state.student);

  // todo: doubt? -> student._id or student?

  const studentId = student._id;

  const token = useSelector((state) => state.token);
  //const connections = useSelector((state) => state.student.connections);
  const connections = useSelector((state) => state.connections);

  // color theme related variables
  // TODO: these color themes should be changed from the source theme point
  const { palette } = useTheme();

  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  // this variable is to determine whether a student is a connection to the given student
  // to determine whether to use PersonAddOutlined or PersonRemoveOutlined icons

  // find method, returns the first match that it finds in the array, if not found return undefined
  const isConnection = connections.find(
    (connection) => connection === connectionId
  );

  // Function to make an API call to add/remove the connection
  const pacthConnection = async () => {
    // Make an API call to add/remove the connection from the list
    const response = await fetch(
      `http://localhost:3001/student/${studentId}/${connectionId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // API will return the newly updated list of connections, extracting the json form
    const connectionList = await response.json();

    // update the connections in state
    dispatch(setConnections({ connections: connectionList }));
  };

  return (
    <FlexLayout>
      <FlexLayout gap="1rem">
        <StudentImage image={profileImage} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${connectionId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexLayout>
      <IconButton
        onClick={() => pacthConnection()}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isConnection ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
    </FlexLayout>
  );
};

export default Connection;
