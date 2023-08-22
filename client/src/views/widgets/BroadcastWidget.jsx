import { Typography, useTheme } from "@mui/material";
import FlexLayout from "components/FlexLayout";
import WidgetContainer from "components/WidgetContainer";

const BroadcastWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetContainer>
      <FlexLayout>
        <Typography color={dark} variant="h5" fontWeight="500">
          Upcoming events
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexLayout>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="http://localhost:3001/images/mavs1.jpeg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexLayout>
        <Typography color={main}>Networking Social</Typography>
      </FlexLayout>
      <Typography color={medium} m="0.5rem 0">
        Interact, Learn and Share with different mindsets.
      </Typography>
    </WidgetContainer>
  );
};

export default BroadcastWidget;
