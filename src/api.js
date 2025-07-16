import axios from "axios";

export const sendMessage = async (message) => {
  const response = await axios.post("http://localhost:8000/api/chatbot", { message });
  return response.data.response;
};
