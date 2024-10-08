import React from "react";
import { useTheme } from "@emotion/react";
import {
  AbcOutlined,
  EditOutlined,
  Email,
  LocationOnOutlined,
} from "@mui/icons-material";
import { Divider, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import FlexBetween from "../../../Components/FlexBetween";
import UserImg from "../../../Components/UserImg";
import { useNavigate } from "react-router-dom";
import WidgetWrapper from "../../../Components/WidgetWrapper";

const UserWidgets = ({ user, admin, setEditProf }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dark = theme.palette.neutral.dark;
  const medium = theme.palette.neutral.medium;
  const main = theme.palette.neutral.main;
  if (!user) {
    return null;
  }
  // console.log(picPath);
  return (
    <WidgetWrapper>
      <FlexBetween gap={"1rem"} pb="1.1rem">
        <UserImg image={user?.picPath} />
        <Box flexGrow={"1"}>
          <IconButton onClick={() => navigate(`/profile/${user.username}`)}>
            <Typography
              variant="h4"
              color={dark}
              fontWeight={500}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  color: theme.palette.primary.main,
                },
              }}
            >
              {user.firstName} {user.lastName}
            </Typography>
          </IconButton>
          <Typography color={medium}>@{user.username}</Typography>
        </Box>
        {admin && (
          <IconButton onClick={() => setEditProf(true)}>
            <EditOutlined />
          </IconButton>
        )}
      </FlexBetween>
      <Divider />
      <Box p="0.2rem 0">
        <Box display={"flex"} alignItems="center" gap="1rem" m={"0.2rem 0"}>
          <Email fontSize="large" sx={{ color: main }} />{" "}
          <Typography color={medium}>{user.email}</Typography>
        </Box>
      </Box>
      <Divider />
      <Box p="0.2rem 0">
        <Box display={"flex"} alignItems="center" gap="1rem" m={"0.2rem 0"}>
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>
            {user?.location?.city +
              " " +
              user?.location?.state +
              ", " +
              user?.location?.pincode}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box p={"0.2rem 0"}>
        <Box display={"flex"} alignItems="center" gap="1rem" m={"0.2rem 0"}>
          <AbcOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{user?.about}</Typography>
        </Box>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidgets;
