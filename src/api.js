import axios from "axios";

export const sendMessage = async (message) => {
  const response = await axios.post("https://goklyn-ai-chatboat-project.onrender.com/api/chat", { message: input });

  return response.data.response;
};
