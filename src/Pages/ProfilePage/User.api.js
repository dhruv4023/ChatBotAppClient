import { getDataFromResponse } from "../../state/globalFunctions";

export const getUser = async (UID) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_REST_API}/user/get/userid/${UID}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return await getDataFromResponse(response);
  } catch (error) {
    throw Error("Error retriving user data")
  }
};


export const fetchChatrooms = async (token) => {
  try {
    const requestOptions = {
      method: "GET",
      headers: { "Authorization": `Bearer ${token}` }
    };

    const response = await fetch(`${process.env.REACT_APP_REST_API}/chat/room/all`, requestOptions);
    return await getDataFromResponse(response);
  } catch (error) {
    throw Error("Error fetching chatrooms")
  }
}

