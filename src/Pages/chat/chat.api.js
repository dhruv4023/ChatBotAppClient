import { getDataFromResponse } from "../../state/globalFunctions";

export const getChatData = async ({ limit = 10, CID, token }) => {
    try {
        const requestOptions = {
            method: "GET", headers: { "Authorization": `Bearer ${token}` }
        };
        const response = await fetch(`${process.env.REACT_APP_REST_API}/chat/room/${CID}?limit=${limit}`, requestOptions);

        return await getDataFromResponse(response);
    } catch (error) {
        throw Error("Error retriving data")
    }
}

export const getChatMessages = async ({ limit = 10, page = 1, chatRoomId, token }) => {
    try {
        const requestOptions = {
            method: "GET", headers: { "Authorization": `Bearer ${token}` }
        };
        const response = await fetch(`${process.env.REACT_APP_REST_API}/chat/message/chatrooms/${chatRoomId}?limit=${limit}&page=${page}`, requestOptions);
        return await getDataFromResponse(response);
    } catch (error) {
        throw Error("Error retriving messages")
    }
}
