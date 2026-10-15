const API_URL = "https://bikehike-github-io.onrender.com/chat";

document.addEventListener("DOMContentLoaded", () => {
  const questionInput = document.getElementById("chatbotQuestion"); 
  const askButton = document.getElementById("askChatbot"); 
  const responseContainer = document.getElementById("chatbotResponse");
  const lengthCounter = document.getElementById("chatbotLength");

  function appendMarkdownText(text) {
    const message = document.createElement("div");
    message.className = "chat-message mt-3";
    message.innerHTML = DOMPurify.sanitize(marked.parse(text));
    responseContainer.appendChild(message);
  }

  if (!questionInput || !askButton || !responseContainer) { 
    console.error("Chatbot HTML elements were not found."); 
    return; 
  }

  async function askChatbot() {
    const question = questionInput.value.trim();    

    if (!question || !questionInput.validity.valid) { 
      appendMarkdownText(`Please enter a valid question.`);
      return; 
    }

    askButton.disabled = true; 
    responseContainer.classList.remove("d-none");
    appendMarkdownText(`Thinking...`);

    try {
      const response = await fetch(API_URL, 
        { method: "POST", 
          headers: { "Content-Type": "application/json" }, 
          body: JSON.stringify({ message: question }) 
        });

      if (!response.ok) { 
        throw new Error(`Request failed: ${ response.status }`); 
      }

      const data = await response.json();

      if (typeof data.answer !== "string") { 
        throw new Error("Unexpected response from the chatbot."); 
      }

      // textContent displays the answer as text, not executable HTML. 
      appendMarkdownText(`${data.answer}`);
      questionInput.value = "";
      lengthCounter.textContent = "0";

    } catch (error) {
      console.error("Chatbot request error:", error);

      appendMarkdownText(`Sorry, the chatbot is temporarily unavailable. Please try again.`);
    } finally { 
      askButton.disabled = false; 
    }
  }

  askButton.addEventListener("click", askChatbot);

  questionInput.addEventListener("input", () => {
    lengthCounter.textContent = questionInput.value.length;
  });

});