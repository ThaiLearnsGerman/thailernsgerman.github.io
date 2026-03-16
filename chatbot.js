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

  // Greetings
  if (
    text.includes("สวัสดี") ||
    text.includes("hello") ||
    text.includes("hallo") ||
    text.includes("hi")
  ) {
    return `
      <strong>German greeting basics</strong><br><br>
      <strong>Hallo</strong> = สวัสดี<br>
      <strong>Guten Morgen</strong> = สวัสดีตอนเช้า<br>
      <strong>Guten Abend</strong> = สวัสดีตอนเย็น<br><br>
      เริ่มต้นง่าย ๆ ใช้ <strong>Hallo</strong> ได้แทบทุกสถานการณ์ 👋
    `;
  }

  // Start learning
  if (
    text.includes("start") ||
    text.includes("begin") ||
    text.includes("เริ่ม") ||
    text.includes("เริ่มยังไง") ||
    text.includes("เริ่มเรียน")
  ) {
    return `
      <strong>Start German step by step</strong><br><br>
      1. <strong>Hallo</strong> = สวัสดี<br>
      2. <strong>Danke</strong> = ขอบคุณ<br>
      3. <strong>Wie geht's?</strong> = สบายดีไหม<br><br>
      สำหรับคนไทย: ไม่ต้องรีบจำเยอะ เริ่มจากคำสั้น ๆ ก่อน แล้วค่อยเปิด lesson เพิ่ม
    `;
  }

  // Thai learners
  if (
    text.includes("thai") ||
    text.includes("ไทย") ||
    text.includes("คนไทย")
  ) {
    return `
      แน่นอน 😊<br><br>
      This site is built for <strong>Thai learners</strong> who want a calm and simple way to learn German.<br><br>
      เป้าหมายคือ: เรียนแบบเข้าใจง่าย ไม่กดดัน และค่อย ๆ มั่นใจขึ้น
    `;
  }

  // Pronunciation
  if (
    text.includes("pronunciation") ||
    text.includes("uitspraak") ||
    text.includes("ออกเสียง")
  ) {
    return `
      <strong>Pronunciation tip</strong><br><br>
      ไม่ต้องออกเสียงเป๊ะตั้งแต่วันแรกก็ได้ 👍<br><br>
      Focus first on:
      <br>• clear words
      <br>• confidence
      <br>• short phrases
      <br><br>
      แล้วค่อยพัฒนาสำเนียงทีหลัง
    `;
  }

  // Specific beginner words
  if (
    text.includes("danke") ||
    text.includes("thanks") ||
    text.includes("thank you") ||
    text.includes("ขอบคุณ")
  ) {
    return `
      <strong>Danke</strong> = ขอบคุณ 🙏<br><br>
      ถ้าอยากสุภาพขึ้น ใช้ <strong>Danke schön</strong><br>
      ถ้าอยากตอบกลับแบบง่าย ๆ ใช้ <strong>Bitte</strong>
    `;
  }

  if (
    text.includes("wie geht") ||
    text.includes("สบายดีไหม")
  ) {
    return `
      <strong>Wie geht's?</strong> = สบายดีไหม<br><br>
      ตอบง่าย ๆ ได้แบบนี้:<br>
      <strong>Gut</strong> = ดี<br>
      <strong>Sehr gut</strong> = ดีมาก<br>
      <strong>Nicht schlecht</strong> = ไม่แย่
    `;
  }

  // Lesson / learning
  if (
    text.includes("lesson") ||
    text.includes("learn") ||
    text.includes("german") ||
    text.includes("เยอรมัน") ||
    text.includes("เรียน")
  ) {
    return `
      คุณสามารถกดเข้าไปดู lesson แต่ละบทได้เลย 📚<br><br>
      <strong>Hook</strong> = ประโยคเปิดหรือไอเดียหลัก<br>
      <strong>Mini lesson</strong> = คำอธิบายสั้น ๆ<br>
      <strong>CTA</strong> = สิ่งที่ให้คนทำต่อ<br><br>
      This helps you learn step by step.
    `;
  }

  return `
    ฉันช่วยได้เรื่อง:<br><br>
    • German greetings<br>
    • Thai explanations<br>
    • beginner words<br>
    • simple lesson help<br><br>
    ลองถามแบบนี้ได้:<br>
    <strong>Hallo แปลว่าอะไร</strong><br>
    <strong>เริ่มเรียนเยอรมันยังไง</strong><br>
    <strong>Danke คืออะไร</strong>
  `;
}
