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
                collectionName,
                query: question,
            }),
        };

        // const response = await fetch(`https://dhruv4023-llmproject.hf.space/ask`, requestOptions);
        const response = await fetch(`${process.env.REACT_APP_REST_API}/chat/bot/ask-question`, requestOptions);
        if (response.ok)
            return await response.json();
        else throw Error(response.statusText)
    } catch (error) {
        // alert("Internal Server Connection error! Please try again later! Sorry for inconvenience");
        throw error; // Re-throw the error to handle it in the calling code
    }
};
