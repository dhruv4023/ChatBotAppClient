import { getDataFromResponse } from "../../../state/globalFunctions";

export const fetchOneChatData = async ({ token, collectionName }) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
            method: "GET",
            headers: myHeaders
        };

        const response = await fetch(`${process.env.REACT_APP_REST_API}/chat/get/${collectionName}`, requestOptions);
        return await getDataFromResponse(response);
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch data.");
    }
};