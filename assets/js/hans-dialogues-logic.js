(function () {
  const data = window.hansDialoguesData;

  const hansOpeners = [
    "Sehr gut 🗣️",
    "Ja, genau 👌",
    "Gut, das ist wichtig 😄",
    "Klar 👍",
    "Das hilft dir beim echten Sprechen"
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
    msg.className =
      type === "user" ? "hans-msg hans-msg-user" : "hans-msg hans-msg-bot";
    msg.innerHTML = content;
    box.appendChild(msg);
    box.scrollTop = box.scrollHeight;
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

    if (bestScore === 0) {
      if (
        lower.includes("dialogue") ||
        lower.includes("dialog") ||
        lower.includes("บทสนทนา")
      ) {
        return "what";
      }

      if (
        lower.includes("name") ||
        lower.includes("wie heißt du") ||
        lower.includes("แนะนำตัว")
      ) {
        return "intro_dialogue";
      }

      if (
        lower.includes("greeting") ||
        lower.includes("ทักทาย") ||
        lower.includes("wie geht")
      ) {
        return "greeting";
      }

      if (
        lower.includes("city") ||
        lower.includes("เมือง") ||
        lower.includes("ถามทาง") ||
        lower.includes("wo ist")
      ) {
        return "city";
      }

      if (
        lower.includes("morning") ||
        lower.includes("เช้า") ||
        lower.includes("kaffee")
      ) {
        return "morning";
      }

      if (
        lower.includes("evening") ||
        lower.includes("เย็น") ||
        lower.includes("abend")
      ) {
        return "evening";
      }

      if (
        lower.includes("formal") ||
        lower.includes("สุภาพ") ||
        lower.includes("sie")
      ) {
        return "formal";
      }

      if (
        lower.includes("better") ||
        lower.includes("improve") ||
        lower.includes("creative") ||
        lower.includes("ดีขึ้น")
      ) {
        return "improve";
      }

      if (
        lower.includes("mali") ||
        lower.includes("anna") ||
        lower.includes("lukas") ||
        lower.includes("ben") ||
        lower.includes("emma") ||
        lower.includes("becker") ||
        lower.includes("ตัวละคร")
      ) {
        return "names";
      }
    }

    return bestKey;
  }

  function buildSmartReply(text) {
    const lower = normalizeText(text);
    const intent = detectIntent(text);

    if (intent !== "fallback") {
      return getReply(intent, true);
    }

    if (
      lower.includes("wer spricht") ||
      lower.includes("ใครพูด") ||
      lower.includes("who says")
    ) {
      return getReply("names", true);
    }

    if (
      lower.includes("wie besser") ||
      lower.includes("make better") ||
      lower.includes("ทำให้ดีขึ้น")
    ) {
      return getReply("improve", true);
    }

    if (
      lower.includes("morgen dialog") ||
      lower.includes("บทสนทนาตอนเช้า")
    ) {
      return getReply("morning", true);
    }

    if (
      lower.includes("abend dialog") ||
      lower.includes("บทสนทนาตอนเย็น")
    ) {
      return getReply("evening", true);
    }

    if (
      lower.includes("stadt") ||
      lower.includes("bakery") ||
      lower.includes("ร้าน") ||
      lower.includes("cafe")
    ) {
      return getReply("city", true);
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

  function initHansDialogues() {
    const box = document.getElementById("hansMessages");
    if (!box) return;

    if (!box.dataset.initialized) {
      box.innerHTML = "";
      addHansMessage(getReply("intro", false), "bot");
      box.dataset.initialized = "true";
      box.dataset.lesson = "dialogues-gold";
    }
  }

  window.askHansChat = askHansChat;
  window.sendHansMessage = sendHansMessage;
  window.initHansDialogues = initHansDialogues;

  document.addEventListener("DOMContentLoaded", initHansDialogues);
})();