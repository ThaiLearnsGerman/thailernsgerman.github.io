(function () {
  const data = window.hansQuestionsData;

  const hansOpeners = [
    "Sehr gut ❓",
    "Ja, genau 👌",
    "Gut, das ist wichtig 😄",
    "Klar 👍",
    "Das hilft dir beim Sprechen"
  ];

  function randomOpener() {
    return hansOpeners[Math.floor(Math.random() * hansOpeners.length)];
  }

  function injectOpener(reply) {
    if (!reply.includes("<strong>Hans:</strong>")) return reply;
    return reply.replace(
      "<strong>Hans:</strong><br />",
      `<strong>Hans:</strong><br />${randomOpener()}<br /><br />`
    );
  }

  function addHansMessage(content, type = "bot") {
    const box = document.getElementById("hansMessages");
    if (!box) return;

    const wasPageY = window.scrollY;

    const msg = document.createElement("div");
    msg.className = type === "user" ? "hans-msg hans-msg-user" : "hans-msg hans-msg-bot";
    msg.innerHTML = content;
    box.appendChild(msg);

    box.scrollTop = box.scrollHeight;

    requestAnimationFrame(() => {
      window.scrollTo(0, wasPageY);
    });
  }

  function getReply(key, useVariation = true) {
    const baseReply = data.replies[key] || data.replies.fallback;
    if (!useVariation || key === "intro") return baseReply;
    return injectOpener(baseReply);
  }

  function normalizeText(text) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[?!.,:;()"]/g, "")
      .replace(/\s+/g, " ");
  }

  function scoreIntent(lower, intent) {
    let score = 0;

    for (const keyword of intent.keywords) {
      const normalizedKeyword = normalizeText(keyword);

      if (lower.includes(normalizedKeyword)) {
        score += normalizedKeyword.length >= 8 ? 4 : 2;
      }

      if (lower === normalizedKeyword) {
        score += 3;
      }
    }

    return score;
  }

  function detectIntent(text) {
    const lower = normalizeText(text);

    let bestKey = "fallback";
    let bestScore = 0;

    for (const intent of data.intents) {
      const score = scoreIntent(lower, intent);
      if (score > bestScore) {
        bestScore = score;
        bestKey = intent.key;
      }
    }

    return bestKey;
  }

  function askHansChat(topic) {
    const label = data.quickLabels[topic] || topic;
    addHansMessage(`<strong>Du:</strong><br />${label}`, "user");
    addHansMessage(getReply(topic, true), "bot");
  }

  function sendHansMessage() {
    const input = document.getElementById("hansInput");
    if (!input) return;

    const text = input.value.trim();
    if (!text) return;

    addHansMessage(`<strong>Du:</strong><br />${text}`, "user");

    const intent = detectIntent(text);
    addHansMessage(getReply(intent, true), "bot");

    input.value = "";
    input.blur();
  }

  function initHansQuestions() {
    const box = document.getElementById("hansMessages");
    if (!box) return;

    if (!box.dataset.initialized) {
      box.innerHTML = "";
      addHansMessage(getReply("intro", false), "bot");
      box.dataset.initialized = "true";
      box.dataset.lesson = "questions-gold";
    }
  }

  window.askHansChat = askHansChat;
  window.sendHansMessage = sendHansMessage;
  window.initHansQuestions = initHansQuestions;

  document.addEventListener("DOMContentLoaded", initHansQuestions);
})();