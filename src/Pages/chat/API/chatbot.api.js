export const sendQuestion = async ({ question, token, collectionName }) => {
    try {
        const requestOptions = {
            method: "POST",
            headers: {
                "Authorization": token,
                "Content-Type": "application/json",
                "Access-Control-Request-Headers": "content-type",
                "Access-Control-Request-Method": "POST"
            },
            body: JSON.stringify({
                question,
                collectionName
                // query: question,
                // chain_name: collectionName
            }),
        };

        // const response = await fetch(`https://dhruv4023-llmproject.hf.space/ask`, requestOptions);
        const response = await fetch(`${process.env.REACT_APP_REST_API}/chat/bot/ask/question`, requestOptions);
        return await response.json();
    } catch (error) {
        console.error("Error sending question:", error); // Log the error for debugging
        alert("Internal Server Connection error! Please try again later! Sorry for inconvenience");
        throw error; // Re-throw the error to handle it in the calling code
    }
};
