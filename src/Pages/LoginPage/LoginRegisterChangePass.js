import axios from 'axios';
import { appendData } from "../../state/globalFunctions";
import { setLogin } from "../../state/index";

// Function to register a user
export const register = async (values) => {
  try {
    const formData = new FormData();
    if (values["picPath"] === "") {
      delete values["picPath"];
    }
    appendData(formData, values);
    const response = await axios.post(`${process.env.REACT_APP_REST_API}/auth/register`, formData);
    return response.data;
  } catch (error) {
    throw new Error("Error while registering");
  }
};

// Function to log in a user
export const login = async ({ values, dispatch, navigate }) => {
  try {

    const loggedInResponse = await axios.post(
      // `${process.env.REACT_APP_REST_API}/auth/login`,
      "https://dhruv4023-chatbotapi.hf.space/api/auth/login/",
      values, {
      headers: { "Content-Type": "application/json" }
    });

    const loggedIn = loggedInResponse.data;
    dispatch(setLogin({
      user: loggedIn.data.user,
      token: loggedIn.data.token,
    }));
    navigate(`/`);

  } catch (error) {
    if (error.response) {
      alert("Error logging in: " + error.response.data.message);
    } else {
      alert("Error logging in user: " + error.message);
    }
  }
};

export const changePasswordRequest = async ({ email, password, otp }) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_REST_API}/auth/change/password`, {
      email,
      password,
      otp
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to make the change password request");
  }
};

// Function to get user names
export const getUserNames = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_REST_API}/auth/get/usernames`, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  } catch (error) {
    throw new Error("Error retrieving usernames");
  }
};

// Function to update a user's profile
export const updateProfile = async ({ values, dispatch, token, navigate }) => {
  try {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (values["picPath"] === "") delete values["picPath"];
    const savedUserResponse = await axios.put(`${process.env.REACT_APP_REST_API}/user/update`, formData, {
      headers: {
        "Authorization": token,
      }
    });
    const savedUser = savedUserResponse.data;
    if (savedUser?.data?.user) {
      dispatch(setLogin({
        user: savedUser.data.user,
        token: token?.split("Bearer ")[1],
      }));
      navigate(`/profile/${savedUser.data.user.username}`);
      return savedUser.message;
    } else {
      return savedUser.message;
    }
  } catch (error) {
    throw new Error("Error updating user data");
  }
};

export const sendOTPRequest = async (email) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_REST_API}/mail/send-otp`, { email });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send OTP");
  }
};

export const logout = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_REST_API}/auth/logout/`, { withCredentials: true });
    alert(response.data.message);
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error:" + error);
  }
}

export const getSession = () => async (dispatch) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_REST_API}/auth/get/session/`, { withCredentials: true });
    dispatch(setLogin({ ...response.data.data }));
  } catch (error) {
    // console.log(error);
  }
}