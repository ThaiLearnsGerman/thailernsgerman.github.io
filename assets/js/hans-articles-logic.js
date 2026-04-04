(function () {
  const data = window.hansArticlesData;
  if (!data) return;

  const hansOpeners = [
    "Sehr gut 📚",
    "Ja, genau 👌",
    "Gut, wir machen das logisch 😄",
    "Klar 👍",
    "Das ist wichtig für Artikel"
  ];

  function randomOpener() {
    return hansOpeners[Math.floor(Math.random() * hansOpeners.length)];
  }

  function injectOpener(reply) {
    if (!reply || !reply.includes("<strong>Hans:</strong>")) return reply || "";
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
    msg.className =
      type === "user" ? "hans-msg hans-msg-user" : "hans-msg hans-msg-bot";
    msg.innerHTML = content;
    box.appendChild(msg);

    box.scrollTop = box.scrollHeight;

    requestAnimationFrame(() => {
      window.scrollTo(0, wasPageY);
    });
  }

  function normalizeText(text) {
    return (text || "")
      .toLowerCase()
      .trim()
      .replace(/[?!.,:;()"'`´]/g, "")
      .replace(/\s+/g, " ");
  }

  function escapeRegExp(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function containsKeyword(text, keyword) {
    const normalizedText = normalizeText(text);
    const normalizedKeyword = normalizeText(keyword);

    if (!normalizedKeyword) return false;

    const isShortLatinKeyword =
      /^[a-zäöüß\s-]+$/i.test(normalizedKeyword) &&
      normalizedKeyword.length <= 5 &&
      !normalizedKeyword.includes(" ");

    if (isShortLatinKeyword) {
      const regex = new RegExp(`\\b${escapeRegExp(normalizedKeyword)}\\b`, "i");
      return regex.test(normalizedText);
    }

    return normalizedText.includes(normalizedKeyword);
  }

  function resolveKey(key) {
    const aliases = {
      what: "artikel",
      article: "artikel",
      articles: "artikel",
      pattern: "pattern",
      patterns: "pattern",
      learn: "learn",
      howlearn: "learn",
      mistake: "mistake",
      mistakes: "mistake",
      game: "game"
    };

    const direct = aliases[key] || key;

    if (data.replies && data.replies[direct]) return direct;
    if (data.replies && data.replies[key]) return key;

    return "fallback";
  }

  function getQuickLabel(key) {
    const resolvedKey = resolveKey(key);

    if (data.quickLabels && data.quickLabels[resolvedKey]) {
      return data.quickLabels[resolvedKey];
    }

    if (data.quickLabels && data.quickLabels[key]) {
      return data.quickLabels[key];
    }

    const fallbackLabels = {
      artikel: "Artikel คืออะไร?",
      der: "der?",
      die: "die?",
      das: "das?",
      mistake: "ข้อผิดพลาด",
      game: "เกม?",
      pattern: "รูปแบบ?",
      learn: "เรียนยังไง?"
    };

    return fallbackLabels[resolvedKey] || key;
  }

  function getReply(key, useVariation = true) {
    const resolvedKey = resolveKey(key);
    const baseReply =
      (data.replies && data.replies[resolvedKey]) ||
      (data.replies && data.replies.fallback) ||
      `<strong>Hans:</strong><br />Ich helfe dir mit Artikeln.`;

    if (!useVariation || resolvedKey === "intro") return baseReply;
    return injectOpener(baseReply);
  }

  function scoreIntent(lower, intent) {
    let score = 0;

    for (const keyword of intent.keywords || []) {
      const normalizedKeyword = normalizeText(keyword);

      if (containsKeyword(lower, normalizedKeyword)) {
        score += normalizedKeyword.length >= 8 ? 4 : 2;
      }

      if (normalizeText(lower) === normalizedKeyword) {
        score += 3;
      }
    }

    return score;
  }

  function detectIntent(text) {
    const lower = normalizeText(text);

    let bestKey = "fallback";
    let bestScore = 0;

    for (const intent of data.intents || []) {
      const score = scoreIntent(lower, intent);
      if (score > bestScore) {
        bestScore = score;
        bestKey = intent.key;
      }
    }

    if (bestScore === 0) {
      if (
        lower.includes("artikel") ||
        lower.includes("article") ||
        lower.includes("articles") ||
        lower.includes("der die das")
      ) {
        return data.replies?.artikel ? "artikel" : "what";
      }

      if (
        lower.includes("ผิด") ||
        lower.includes("mistake") ||
        lower.includes("wrong") ||
        lower.includes("error")
      ) {
        return data.replies?.mistake ? "mistake" : "fallback";
      }

      if (
        lower.includes("game") ||
        lower.includes("quiz") ||
        lower.includes("spiel") ||
        lower.includes("เกม")
      ) {
        return data.replies?.game ? "game" : "fallback";
      }

      if (
        lower.includes("pattern") ||
        lower.includes("patterns") ||
        lower.includes("endung") ||
        lower.includes("ลงท้าย") ||
        lower.includes("รูปแบบ")
      ) {
        return data.replies?.pattern ? "pattern" : "fallback";
      }

      if (
        lower.includes("learn") ||
        lower.includes("study") ||
        lower.includes("remember") ||
        lower.includes("จำ") ||
        lower.includes("เรียน") ||
        lower.includes("ฝึกยังไง")
      ) {
        return data.replies?.learn ? "learn" : "fallback";
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
      lower.includes("kaffee") ||
      lower.includes("park") ||
      lower.includes("mann")
    ) {
      return getReply("der", true);
    }

    if (
      lower.includes("tasche") ||
      lower.includes("banane") ||
      lower.includes("sprache") ||
      lower.includes("straße")
    ) {
      return getReply("die", true);
    }

    if (
      lower.includes("kino") ||
      lower.includes("wasser") ||
      lower.includes("kind") ||
      lower.includes("handy")
    ) {
      return getReply("das", true);
    }

    return getReply("fallback", true);
  }

  function askHansChat(topic) {
    const resolvedKey = resolveKey(topic);
    const label = getQuickLabel(resolvedKey);

    addHansMessage(`<strong>Du:</strong><br />${label}`, "user");
    addHansMessage(getReply(resolvedKey, true), "bot");
  }

  function sendHansMessage() {
    const input = document.getElementById("hansInput");
    if (!input) return;

    const text = input.value.trim();
    if (!text) return;

    addHansMessage(`<strong>Du:</strong><br />${text}`, "user");
    addHansMessage(buildSmartReply(text), "bot");

    input.value = "";
    input.blur();
  }

  function initHansArticles() {
    const box = document.getElementById("hansMessages");
    if (!box) return;

    if (!box.dataset.initialized) {
      box.innerHTML = "";
      addHansMessage(getReply("intro", false), "bot");
      box.dataset.initialized = "true";
      box.dataset.lesson = "articles-gold";
    }
  }

  window.askHansChat = askHansChat;
  window.sendHansMessage = sendHansMessage;
  window.initHansArticles = initHansArticles;

  document.addEventListener("DOMContentLoaded", initHansArticles);
})();