import { getDataFromResponse } from "../../../state/globalFunctions";

export const sendQuetion = async ({ question, token, collectionName }) => {
    try {

        const requestOptions = {
            method: "POST",
            headers: {
                "Authorization": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "question": question, collectionName
            }),
        };

        const response = await fetch(`${process.env.REACT_APP_REST_API}/chat/bot/query/ask`, requestOptions);
        return await getDataFromResponse(response);
    } catch (error) {
        alert("Internal Server Connection error! Please try again later! Sorry for inconvenience")
    }
}