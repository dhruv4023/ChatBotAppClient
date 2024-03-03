// Import necessary dependencies and components
import { CloseRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import FlexBetween from "../../../Components/FlexBetween";
import WidgetWrapper from "../../../Components/WidgetWrapper";
import Form from "../../LoginPage/Form";

// Define the EditProfileWidget component
const EditProfileWidget = ({ user, setEditProf }) => {
  // Create an object containing user data
  const userData = {
    about: user.about,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    location: user.location,
    picPath: "",
    username: user.username,
  };

  return (
    // Render the EditProfileWidget inside a WidgetWrapper component
    <WidgetWrapper>
      {/* Render a close button as an IconButton */}
      <IconButton 
        size={"50"}
        sx={{ m: "0 0 1rem 0" }}
        onClick={() => setEditProf(false)}
      >
        <CloseRounded />
      </IconButton>
      {/* Render a FlexBetween component */}
      <FlexBetween width={"100%"}>
        {/* Render the Form component with specific props */}
        <Form pgType={"Register"} user={userData} editProfile={true} />
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default EditProfileWidget;
