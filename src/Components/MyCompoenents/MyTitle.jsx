import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";
import React from "react";

const MyTitle = ({ txt }) => {
  const theme = useTheme();
  return (
    <Typography
      fontWeight={"bold"}
      fontSize={"1.5rem"}
      color={theme.palette.primary.main}
    >
      {txt}
    </Typography>
  );
};

export default MyTitle;
