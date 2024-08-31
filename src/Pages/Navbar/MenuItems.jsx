import React from "react";
import { DarkMode, LightMode, LoginRounded, Logout } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { setMode, setLogout } from "../../state/index";
import UserImg from "../../Components/UserImg";
import { logout } from "../LoginPage/LoginRegisterChangePass";

const MenuItems = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const dark = theme.palette.neutral.dark;
  const user = useSelector((state) => state.user);

  const toggleMode = () => {
    dispatch(setMode());
  };

  const handleLogout = async () => {
    await logout();
    dispatch(setLogout());
    navigate("/");
  };

  return (
    <>
      <IconButton onClick={toggleMode}>
        <Tooltip
          title={theme.palette.mode === "dark" ? "Light mode" : "Dark mode"}
        >
          {theme.palette.mode === "dark" ? (
            <LightMode sx={{ fontSize: "25px" }} />
          ) : (
            <DarkMode sx={{ fontSize: "25px", color: dark }} />
          )}
        </Tooltip>
      </IconButton>
      {user ? (
        <>
          <Tooltip title={`${user.firstName} ${user.lastName}`}>
            <IconButton onClick={() => navigate(`/profile/${user.username}`)}>
              <UserImg image={user.picPath} size={"30px"} />
            </IconButton>
          </Tooltip>
          <IconButton onClick={handleLogout}>
            <Tooltip title="Log out">
              <Logout />
            </Tooltip>
          </IconButton>
        </>
      ) : (
        <IconButton onClick={() => navigate("/auth/login")}>
          <Tooltip title="Login">
            <LoginRounded sx={{ cursor: "pointer" }} />
          </Tooltip>
        </IconButton>
      )}
    </>
  );
};

export default MenuItems;
