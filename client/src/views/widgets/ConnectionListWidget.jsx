import { Box, Typography, useTheme } from "@mui/material";
import Connection from "components/Connection";
import WidgetContainer from "components/WidgetContainer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setConnections } from "state";

const ConnectionListWidget = ({ studentId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const connections = useSelector((state) => state.connections);

  const getConnections = async () => {
    const response = await fetch(
      `http://localhost:3001/student/${studentId}/connections`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setConnections({ connections: data }));
  };

  useEffect(() => {
    getConnections();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetContainer>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {connections.map((connection) => (
          <Connection
            key={connection._id}
            connectionId={connection._id}
            name={`${connection.firstName} ${connection.lastName}`}
            subtitle="Student"
            profileImage={connection.profileImage}
          />
        ))}
      </Box>
    </WidgetContainer>
  );
};

export default ConnectionListWidget;
