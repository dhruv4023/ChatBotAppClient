import { getDataFromResponse } from "../../state/globalFunctions";

export const fetchAllChatsData = async ({ token, page = 1, limit = 10 }) => {
    
    try {
        const requestOptions = {
            method: "GET",
            headers: {
                "Authorization": token,
                "Content-Type": "application/json"
            },
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_REST_API}/chat/get?page=${page}&limit=${limit}`, requestOptions);
        return await getDataFromResponse(response);
    } catch (error) {
        // console.error(error);
        throw new Error("Failed to fetch data.");
    }
};