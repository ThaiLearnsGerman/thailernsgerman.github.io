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

  // Thai greetings
  if (
    text.includes("สวัสดี") ||
    text.includes("หวัดดี") ||
    text.includes("hello") ||
    text.includes("hallo") ||
    text.includes("hi")
  ) {
    return `ภาษาเยอรมันพูดว่า <strong>Hallo</strong> ได้เลย 👋<br><br>
    ถ้าเป็นตอนเช้า ใช้ <strong>Guten Morgen</strong><br>
    ถ้าเป็นตอนเย็น ใช้ <strong>Guten Abend</strong>`;
  }

  // Thai learner / Thai language questions
  if (
    text.includes("thai") ||
    text.includes("ไทย") ||
    text.includes("คนไทย")
  ) {
    return `แน่นอน 😊 โปรเจกต์นี้สร้างมาสำหรับคนไทยที่อยากเริ่มเรียนเยอรมันแบบง่าย ๆ ชัดเจน และไม่กดดันเกินไป`;
  }

  // How to start learning
  if (
    text.includes("start") ||
    text.includes("begin") ||
    text.includes("how do i start") ||
    text.includes("เริ่ม") ||
    text.includes("เริ่มยังไง") ||
    text.includes("เริ่มเรียน")
  ) {
    return `เริ่มจากคำง่าย ๆ ก่อน:<br><br>
    <strong>Hallo</strong> = สวัสดี<br>
    <strong>Danke</strong> = ขอบคุณ<br>
    <strong>Wie geht's?</strong> = สบายดีไหม<br><br>
    จากนั้นค่อยเปิด lesson แล้วฝึกทีละนิด`;
  }

  // Pronunciation
  if (
    text.includes("pronunciation") ||
    text.includes("uitspraak") ||
    text.includes("ausprache") ||
    text.includes("ออกเสียง")
  ) {
    return `ไม่ต้องออกเสียงเป๊ะตั้งแต่วันแรกก็ได้ 👍<br><br>
    โฟกัสที่คำง่าย ๆ และความมั่นใจก่อน แล้วค่อยพัฒนาเรื่องเสียงทีหลัง`;
  }

  // Lesson / learning questions
  if (
    text.includes("lesson") ||
    text.includes("learn") ||
    text.includes("german") ||
    text.includes("เยอรมัน") ||
    text.includes("เรียน")
  ) {
    return `คุณสามารถเปิด lessons แล้วกดเข้าไปดูทีละบทได้เลย 📚<br><br>
    เป้าหมายคือเรียนแบบสั้น ชัดเจน และค่อย ๆ มั่นใจขึ้น`;
  }

  return `ฉันช่วยได้เรื่องคำทักทายภาษาเยอรมัน, วิธีเริ่มเรียน, และคำอธิบายง่าย ๆ สำหรับคนไทย 😊`;
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
