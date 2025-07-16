const sendMessage = async () => {
  const response = await fetch('http://localhost:8000/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: userInput }),
  });
  const data = await response.json();
  setMessages([...messages, { text: data.reply, sender: 'bot' }]);
};
