import axios from "axios";

export const fetchChatMemberApi = () => {
    return axios.get(`/api/chatMember.json`);
};

export const fetchChatApi = () => {
    return axios.get(`/api/chat.chats.json`);
};
