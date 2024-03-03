// Import the 'setLogin' function from the 'state' module
import { getDataFromResponse } from "../../state/globalFunctions";
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
    return await getDataFromResponse(response);
  } catch (error) {
    throw Error("Error while register")
  }
};

// Function to log in a user
export const login = async ({ values, dispatch, setLogin, navigate }) => {

  try {

    const loggedInResponse = await fetch(
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
      navigate(`/profile/${loggedIn.data.user.username}`);
    } else {
      alert(loggedIn.message);
    }

  } catch (error) {
    console.error(error)
    // throw Error("Error log in user")
  }
};

// Function to change a user's password
// export const changePass = async (values) => {
//   const response = await fetch(
//     `${process.env.REACT_APP_REST_API}/auth/changepass`,
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(values),
//     }
//   );
//   return await getDataFromResponse(response);
// };

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
    return await getDataFromResponse(response);

  } catch (error) {
    throw Error("Error retriving usernames")
  }
};

// Function to update a user's profile
export const updateProfile = async (values, dispatch, token, navigate) => {
  try {
    const formData = new FormData();
    appendData(formData, values);
    if (values["picPath"] === "") delete values["picPath"];
    const savedUserResponse = await fetch(
      `${process.env.REACT_APP_REST_API}/user/update`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    if (savedUser?.data?.user) {
      dispatch(
        setLogin({
          user: savedUser.data.user,
          token: token,
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

/**
 * Recursively appends data to a FormData object.
 * @param {FormData} formData - The FormData object to append data to.
 * @param {object} object - The data object to append.
 * @param {string} parentKey - The parent key (used for nested objects).
 */
function appendData(formData, object, parentKey) {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const currentKey = parentKey ? `${parentKey}.${key}` : key;

      // Check if the value is an object and not an instance of File.
      if (typeof object[key] === "object" && !(object[key] instanceof File)) {
        // Recursively append nested object data.
        appendData(formData, object[key], currentKey);
      } else {
        // Append the current key-value pair to the FormData object.
        formData.append(currentKey, object[key]);
      }
    }
  }
}
