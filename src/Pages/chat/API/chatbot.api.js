import { getDataFromResponse } from "../../../state/globalFunctions";

export const sendQuestion = async ({ question, token, collectionName }) => {
    try {
        const requestOptions = {
            method: "POST",
            headers: {
                "Authorization": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question,
                collectionName // Corrected syntax
            }),
        };

        const response = await fetch(`${process.env.REACT_APP_REST_API}/chat/bot/ask/question`, requestOptions);
        if (!response.ok) {
            throw new Error("Failed to fetch"); // Throw an error for non-successful response
        }
        return await getDataFromResponse(response);
    } catch (error) {
        console.error("Error sending question:", error); // Log the error for debugging
        alert("Internal Server Connection error! Please try again later! Sorry for inconvenience");
        throw error; // Re-throw the error to handle it in the calling code
    }
};
