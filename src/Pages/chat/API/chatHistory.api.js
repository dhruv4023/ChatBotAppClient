import { getDataFromResponse } from "../../../state/globalFunctions";

export const getChatHistory = async ({ page, limit, token }) => {
    const url = `${process.env.REACT_APP_REST_API}/chat/history?page=${page}&limit=${limit}`;

    const requestOptions = {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    };

    try {
        const response = await fetch(url, requestOptions);
        return await getDataFromResponse(response);
    } catch (error) {
        alert("Internal Server Connection error! Please try again later! Sorry for inconvenience")
    }
};

export const deleteQuestion = async ({ token, questionId }) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_REST_API}/chat/history/question/${questionId}`, requestOptions);
        return await getDataFromResponse(response);

    } catch (error) {
        console.error(error);
        alert("Failed to delete question.");
    }
};
