import { getDataFromResponse } from "../../state/globalFunctions";

export const getUser = async (UID) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_REST_API}/auth/user/get/userid/${UID}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return await getDataFromResponse(response);
  } catch (error) {
    throw Error("Error retriving user data")
  }
};
