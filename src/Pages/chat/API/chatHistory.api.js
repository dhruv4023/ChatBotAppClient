 

export const getChatHistory = async ({ page, limit, token }) => {
    const url = `${process.env.REACT_APP_REST_API}/chat/history?page=${page}&limit=${limit}`;

    const requestOptions = {
        method: "GET",
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        },
    };

    try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
            throw new Error("Failed to fetch chat history"); // Throw an error for non-successful response
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching chat history:", error); // Log the error for debugging
        alert("Internal Server Connection error! Please try again later! Sorry for inconvenience");
        throw error; // Re-throw the error to handle it in the calling code
    }
};

export const deleteQuestion = async ({ token, questionId }) => {
    try {
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Authorization": token,
                "Content-Type": "application/json"
            },
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_REST_API}/chat/history/question/${questionId}`, requestOptions);
        if (!response.ok) {
            throw new Error("Failed to delete question"); // Throw an error for non-successful response
        }
        return await response.json();

    } catch (error) {
        console.error("Error deleting question:", error); // Log the error for debugging
        alert("Failed to delete question.");
        throw error; // Re-throw the error to handle it in the calling code
    }
};
