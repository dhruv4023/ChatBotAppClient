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
        if (!response.ok) {
            throw new Error("Failed to fetch chat data"); // Throw an error for non-successful response
        }
        return await getDataFromResponse(response);
    } catch (error) {
        console.error("Error fetching chat data:", error); // Log the error for debugging
        throw new Error("Failed to fetch data.");
    }
};

export const createTmpChain = async ({ token, values }) => {
    const formData = new FormData();

    // Append files to FormData
    values.files.forEach((file) => {
        formData.append("files", file);
    });

    const requestOptions = {
        method: "POST",
        headers: {
            "Authorization": token
        },
        body: formData,
    };

    try {
        const response = await fetch(`${process.env.REACT_APP_REST_API}/chat/bot/create/tmp/chain`, requestOptions);
        if (!response.ok) {
            throw new Error("Failed to create temporary chain"); // Throw an error for non-successful response
        }
        return await getDataFromResponse(response);
    } catch (error) {
        console.error("Error creating temporary chain:", error); // Log the error for debugging
        throw error; // Re-throw the error to handle it in the calling code
    }
};
