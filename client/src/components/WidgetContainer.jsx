import { Box } from "@mui/material";
import { styled } from "@mui/system";

// This serves as a default layout properties for all the widgets we create
const WidgetContainer = styled(Box)(({ theme }) => ({
  padding: "1.5rem 1.5rem 0.75rem 1.5rem",
  backgroundColor: theme.palette.background.alt,
  borderRadius: "0.75 rem",
}));

export default WidgetContainer;
