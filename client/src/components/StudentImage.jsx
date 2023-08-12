import { Box } from "@mui/material";

const StudentImage = ({ image, size = "60 px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="student"
        src={`http://localhost:3001/assets/${image}`}
      />
    </Box>
  );
};

export default StudentImage;
