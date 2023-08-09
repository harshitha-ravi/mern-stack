import { Box } from "@mui/material";
import { styled } from "@mui/system";

// Set of CSS properties - align things and fliex things into proper location 
const FlexLayout = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
})

export default FlexLayout;