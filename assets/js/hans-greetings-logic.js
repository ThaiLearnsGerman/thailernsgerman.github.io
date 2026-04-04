(function () {
  const data = window.hansGreetingsData;

  const hansOpeners = [
    "Ja, genau 😄",
    "Sehr gut 👌",
    "Ah, gut!",
    "Klar 😄",
    "Super, das ist wichtig 👍"
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

    const msg = document.createElement("div");
    msg.className = type === "user" ? "hans-msg hans-msg-user" : "hans-msg hans-msg-bot";
    msg.innerHTML = content;
    box.appendChild(msg);
    box.scrollTop = box.scrollHeight;
  }

  function getReply(key, useVariation = true) {
    const baseReply = data.replies[key] || data.replies.fallback;
    if (!useVariation || key === "intro") return baseReply;
    return injectOpener(baseReply);
  }

  function scoreIntent(lower, intent) {
    let score = 0;

    for (const keyword of intent.keywords) {
      if (lower.includes(keyword)) {
        score += keyword.length >= 8 ? 4 : 2;
      }
    }

    return score;
  }

  function detectIntent(text) {
    const lower = text.toLowerCase().trim();

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

  function buildSmartReply(text) {
    const lower = text.toLowerCase().trim();
    const intent = detectIntent(text);

    if (intent !== "fallback") {
      return getReply(intent, true);
    }

    if (
      lower.includes("meaning") ||
      lower.includes("bedeutet") ||
      lower.includes("หมายความ")
    ) {
      if (lower.includes("hallo")) return getReply("hallo", true);
      if (lower.includes("morgen")) return getReply("morgen", true);
      if (lower.includes("abend")) return getReply("abend", true);
      if (lower.includes("geht")) return getReply("gehts", true);
    }

    return getReply("fallback", true);
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
    addHansMessage(buildSmartReply(text), "bot");

    input.value = "";
  }

  function initHansGreetings() {
    const box = document.getElementById("hansMessages");
    if (!box) return;

    if (!box.dataset.initialized) {
      box.innerHTML = "";
      addHansMessage(getReply("intro", false), "bot");
      box.dataset.initialized = "true";
      box.dataset.lesson = "greetings";
    }
  }

  window.askHansChat = askHansChat;
  window.sendHansMessage = sendHansMessage;
  window.initHansGreetings = initHansGreetings;

  document.addEventListener("DOMContentLoaded", initHansGreetings);
})();