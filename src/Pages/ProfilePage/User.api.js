export const getUser = async (UID) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_REST_API}/user/get/userid/${UID}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return await response.json();
  } catch (error) {
    throw Error("Error retriving user data")
  }
};
