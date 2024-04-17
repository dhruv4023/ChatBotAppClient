// Import the 'setLogin' function from the 'state' module
import { appendData, } from "../../state/globalFunctions";
import { setLogin } from "../../state/index";

// Function to register a user
export const register = async (values) => {
  try {
    // Create a new FormData object to prepare data for the POST request.
    const formData = new FormData();

    // Check if the 'picPath' field is empty and remove it if so.
    if (values["picPath"] === "") {
      delete values["picPath"];
    }

    // Append data from the 'values' object to the 'formData' object.
    appendData(formData, values);

    // Send a POST request to the registration endpoint on the server.
    const response = await fetch(
      `${process.env.REACT_APP_REST_API}/auth/register`,
      {
        method: "POST",
        body: formData,
      }
    );
    return await response.json();
  } catch (error) {
    throw Error("Error while register")
  }
};

// Function to log in a user
export const login = async ({ values, dispatch, navigate }) => {

  try {
    // console.log(`${process.env.REACT_APP_REST_API}/auth/login`)
    console.log(process.env.REACT_APP_REST_API)

    const loggedInResponse = await fetch(
      "https://dhruv4023-chatbotapi.hf.space/api/auth/login/",
      `${process.env.REACT_APP_REST_API}/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );

    const loggedIn = await loggedInResponse.json();

    if (loggedIn.success) {
      dispatch(
        setLogin({
          user: loggedIn.data.user,
          token: loggedIn.data.token,
        })
      );
      // navigate(`/profile/${loggedIn.data.user.username}`);
      navigate(`/`);
    } else {
      alert(loggedIn.message);
    }

  } catch (error) {
    console.error(error)
    // throw Error("Error log in user")
  }
};

export const changePasswordRequest = async ({ email, password, otp }) => {
  try {
    const raw = JSON.stringify({
      "email": email,
      "password": password,
      "otp": otp
    });

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: raw,
      redirect: "follow"
    };

    const response = await fetch(`${process.env.REACT_APP_REST_API}/auth/change/password`, requestOptions);
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to make the change password request");
  }
};


// Function to get user names
export const getUserNames = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_REST_API}/auth/get/usernames`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    return await response.json();

  } catch (error) {
    throw Error("Error retriving usernames")
  }
};

// Function to update a user's profile
export const updateProfile = async ({ values, dispatch, token, navigate }) => {
  // console.log(token)
  try {
    const formData = new FormData();
    appendData(formData, values);
    if (values["picPath"] === "") delete values["picPath"];
    const savedUserResponse = await fetch(
      `${process.env.REACT_APP_REST_API}/user/update`,
      {
        method: "PUT",
        headers: {
          "Authorization": token,
        },
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    if (savedUser?.data?.user) {
      dispatch(
        setLogin({
          user: savedUser.data.user,
          token: token?.split("Bearer ")[1],
        })
      ) && navigate(`/profile/${savedUser.data.user.username}`);
      return (savedUser.message);
    } else {
      return (savedUser.message);
    }

  } catch (error) {
    throw Error("Error update user data")
  }
};


export const sendOTPRequest = async (email) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ "email": email });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    const response = await fetch(`${process.env.REACT_APP_REST_API}/auth/mail/send-otp`, requestOptions);

    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send OTP");
  }
};