import { getDataFromResponse } from "../../../state/globalFunctions";

export const fetchOneChatData = async ({ token, collectionName }) => {
    try {
        const requestOptions = {
            method: "GET",
            headers: {
                "Authorization": token,
                "Content-Type": "application/json"
            },
        };

        const response = await fetch(`${process.env.REACT_APP_REST_API}/chat/get/${collectionName}`, requestOptions);
        return await getDataFromResponse(response);
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch data.");
    }
};