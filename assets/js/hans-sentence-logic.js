function getHansSentencePatternReply(message) {
  const data = window.hansSentencePatternData;

  if (!data || !data.replies || !data.intents) {
    return `
      <strong>Hans:</strong><br />
      ตอนนี้ระบบของ Hans ยังไม่พร้อมสำหรับบทนี้
    `;
  }

  const text = String(message || "").toLowerCase().trim();

  if (!text) {
    return data.replies.intro || data.replies.mai_khao_jai;
  }

  for (const intent of data.intents) {
    const found = intent.keywords.some(keyword =>
      text.includes(String(keyword).toLowerCase())
    );

    if (found && data.replies[intent.key]) {
      return data.replies[intent.key];
    }
  }

  return data.replies.mai_khao_jai;
}

function appendHansMessage(html, type = "bot") {
  const messages = document.getElementById("hansMessages");
  if (!messages) return;

  const msg = document.createElement("div");
  msg.className = type === "user" ? "hans-msg hans-msg-user" : "hans-msg hans-msg-bot";
  msg.innerHTML = html;
  messages.appendChild(msg);

  messages.scrollTop = messages.scrollHeight;
}

function askHansChat(topicKey) {
  const data = window.hansSentencePatternData;
  if (!data || !data.replies) return;

  const reply = data.replies[topicKey] || data.replies.mai_khao_jai;
  appendHansMessage(reply, "bot");
}

function sendHansMessage() {
  const input = document.getElementById("hansInput");
  if (!input) return;

  const value = input.value.trim();
  if (!value) return;

  appendHansMessage(`<strong>Du:</strong><br />${value}`, "user");

  const reply = getHansSentencePatternReply(value);

  setTimeout(() => {
    appendHansMessage(reply, "bot");
  }, 250);

  input.value = "";
}

window.addEventListener("DOMContentLoaded", () => {
  const data = window.hansSentencePatternData;
  const messages = document.getElementById("hansMessages");

  if (messages && data && data.replies && !messages.dataset.hansLoaded) {
    messages.dataset.hansLoaded = "true";

    if (messages.children.length === 0) {
      appendHansMessage(data.replies.intro || data.replies.mai_khao_jai, "bot");
    }
  }
});