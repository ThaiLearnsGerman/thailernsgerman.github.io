const chatToggle = document.getElementById("chatToggle");
const chatWindow = document.getElementById("chatWindow");
const chatClose = document.getElementById("chatClose");
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const chatSend = document.getElementById("chatSend");
const quickActions = document.querySelectorAll(".chat-quick-action");

function addMessage(text, sender = "bot") {
  const msg = document.createElement("div");
  msg.className = `chat-message ${sender}`;
  msg.innerHTML = `<div class="chat-bubble">${text}</div>`;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function botReply(userText) {
  const text = userText.toLowerCase();

  if (text.includes("hello") || text.includes("hallo") || text.includes("hi")) {
    return `A good German beginner greeting is <strong>Hallo</strong>. You can also say <strong>Guten Morgen</strong> in the morning.`;
  }

  if (text.includes("pronunciation") || text.includes("ausspraak") || text.includes("uitspraak")) {
    return `Start simple: focus first on clear words and confidence. You do not need perfect pronunciation from day one.`;
  }

  if (text.includes("lesson") || text.includes("learn") || text.includes("german")) {
    return `You can explore the lessons page and open one lesson in detail. The goal is simple, clear progress step by step.`;
  }

  if (text.includes("thai")) {
    return `This project is made for Thai learners who want a softer and clearer start in German.`;
  }

  return `Good question. Right now I can help with greetings, basic learning tips, and how this German lesson site works.`;
}

function sendMessage() {
  const value = chatInput.value.trim();
  if (!value) return;

  addMessage(value, "user");
  chatInput.value = "";

  setTimeout(() => {
    addMessage(botReply(value), "bot");
  }, 500);
}

if (chatToggle) {
  chatToggle.addEventListener("click", () => {
    chatWindow.classList.toggle("open");
  });
}

if (chatClose) {
  chatClose.addEventListener("click", () => {
    chatWindow.classList.remove("open");
  });
}

if (chatSend) {
  chatSend.addEventListener("click", sendMessage);
}

if (chatInput) {
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });
}

quickActions.forEach((btn) => {
  btn.addEventListener("click", () => {
    const question = btn.dataset.question;
    addMessage(question, "user");

    setTimeout(() => {
      addMessage(botReply(question), "bot");
    }, 450);
  });
});
