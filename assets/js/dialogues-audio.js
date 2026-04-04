const dialoguesAudio = document.getElementById("dialoguesAudio");
const synth = window.speechSynthesis;

let currentSrc = "";
let lastSpokenText = "";
let lastSpokenRate = 1;
let activeButtons = [];
let activeLineBlock = null;
let lastMeta = null;
let isShadowing = false;

function cleanText(text) {
  return (text || "").replace(/\s+/g, " ").trim();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function clearActiveButtons() {
  activeButtons.forEach((btn) => btn.classList.remove("is-playing"));
  activeButtons = [];
}

function clearActiveLineBlock() {
  if (activeLineBlock) {
    activeLineBlock.classList.remove("is-playing");
    activeLineBlock = null;
  }
}

function setActiveLineBlock(lineBlock) {
  clearActiveLineBlock();
  if (lineBlock) {
    activeLineBlock = lineBlock;
    activeLineBlock.classList.add("is-playing");
  }
}

function markActive(button) {
  clearActiveButtons();
  if (button) {
    button.classList.add("is-playing");
    activeButtons.push(button);
  }
}

function stopEverything() {
  if (dialoguesAudio) {
    dialoguesAudio.pause();
    dialoguesAudio.currentTime = 0;
  }
  if (synth) {
    synth.cancel();
  }
}

function getGermanVoice() {
  const voices = synth.getVoices();
  return (
    voices.find((voice) => /^de/i.test(voice.lang)) ||
    voices.find((voice) => /german/i.test(voice.name)) ||
    null
  );
}

function buildMeta(button, options = {}) {
  const sceneCard = options.sceneCard || button?.closest(".question-scene-card") || null;
  const lineBlock = options.lineBlock || button?.closest(".dialogue-line-block") || null;
  const nowPlayingTarget = sceneCard?.querySelector("[data-now-playing]") || null;

  return {
    sceneCard,
    lineBlock,
    nowPlayingTarget,
    defaultNowPlaying: "เลือก audio ด้านบนเพื่อเริ่ม",
    repeatLabel: ""
  };
}

function setNowPlaying(meta, text) {
  if (meta?.nowPlayingTarget) {
    meta.nowPlayingTarget.textContent = text || meta.defaultNowPlaying;
  }
}

function resetNowPlaying(meta) {
  if (meta?.nowPlayingTarget) {
    meta.nowPlayingTarget.textContent = meta.defaultNowPlaying;
  }
}

function startVisualState(button, meta, label) {
  markActive(button);
  setActiveLineBlock(meta?.lineBlock || null);
  setNowPlaying(meta, label);
}

function endVisualState(meta) {
  clearActiveButtons();
  clearActiveLineBlock();
  resetNowPlaying(meta);
}

function speakText(text, rate = 1, button = null, meta = null, label = null) {
  if (!synth || !text) return;

  stopEverything();

  const utterance = new SpeechSynthesisUtterance(cleanText(text));
  utterance.lang = "de-DE";
  utterance.rate = rate;
  utterance.pitch = 1;
  utterance.volume = 1;

  const germanVoice = getGermanVoice();
  if (germanVoice) {
    utterance.voice = germanVoice;
  }

  lastSpokenText = text;
  lastSpokenRate = rate;
  currentSrc = "";
  lastMeta = meta;

  utterance.onstart = () => {
    startVisualState(button, meta, label || cleanText(text));
  };

  utterance.onend = () => {
    endVisualState(meta);
  };

  utterance.onerror = (err) => {
    console.error("Speech error:", err);
    endVisualState(meta);
  };

  synth.speak(utterance);
}

async function fileExists(url) {
  try {
    const res = await fetch(url, { method: "HEAD", cache: "no-store" });
    return res.ok;
  } catch (err) {
    console.error("fileExists error:", err);
    return false;
  }
}

async function playFileOrFallback(src, fallbackText = "", fallbackRate = 1, button = null, meta = null, label = "") {
  stopEverything();

  if (src && dialoguesAudio) {
    const exists = await fileExists(src);

    if (exists) {
      try {
        currentSrc = src;
        lastSpokenText = fallbackText;
        lastSpokenRate = fallbackRate;
        lastMeta = meta;

        dialoguesAudio.src = `${src}?v=${Date.now()}`;
        dialoguesAudio.currentTime = 0;
        await dialoguesAudio.play();

        startVisualState(button, meta, label || cleanText(fallbackText) || "Playing audio");
        return;
      } catch (err) {
        console.error("Audio file play error:", err);
      }
    }
  }

  if (fallbackText) {
    speakText(fallbackText, fallbackRate, button, meta, label || cleanText(fallbackText));
  }
}

function repeatLast(button = null) {
  if (currentSrc && dialoguesAudio) {
    stopEverything();

    dialoguesAudio.src = `${currentSrc}?v=${Date.now()}`;
    dialoguesAudio.currentTime = 0;

    dialoguesAudio.play()
      .then(() => {
        startVisualState(button, lastMeta, lastMeta?.repeatLabel || "Repeating audio");
      })
      .catch((err) => {
        console.error("Repeat file error:", err);
      });

    return;
  }

  if (lastSpokenText) {
    speakText(lastSpokenText, lastSpokenRate, button, lastMeta, lastMeta?.repeatLabel || cleanText(lastSpokenText));
  }
}

function getSceneText(sceneCard) {
  const lines = sceneCard?.querySelectorAll(".dialogue-line-de") || [];
  return Array.from(lines)
    .map((line) => line.textContent)
    .join(" ");
}

function getSceneHeading(sceneCard) {
  return (
    sceneCard?.querySelector(".question-scene-head h3")?.textContent?.trim() ||
    sceneCard?.querySelector("h3")?.textContent?.trim() ||
    "dialogue scene"
  );
}

function waitForAudioEnd() {
  return new Promise((resolve) => {
    const done = () => resolve();
    dialoguesAudio.addEventListener("ended", done, { once: true });
    dialoguesAudio.addEventListener("error", done, { once: true });
  });
}

function bindSceneAudioRows() {
  const rows = document.querySelectorAll(".dialogue-audio-row");

  rows.forEach((row) => {
    const sceneCard = row.closest(".question-scene-card");
    if (!sceneCard) return;

    const sceneText = getSceneText(sceneCard);
    const sceneHeading = getSceneHeading(sceneCard);
    const buttons = row.querySelectorAll(".dialogue-audio-btn");

    const playBtn = buttons[0];
    const slowBtn = buttons[1];
    const repeatBtn = buttons[2];

    if (playBtn) {
      playBtn.addEventListener("click", () => {
        const src = playBtn.getAttribute("data-audio-src");
        const meta = buildMeta(playBtn, { sceneCard });
        meta.repeatLabel = `Repeat • ${sceneHeading}`;
        playFileOrFallback(src, sceneText, 0.95, playBtn, meta, `Playing • ${sceneHeading}`);
      });
    }

    if (slowBtn) {
      slowBtn.addEventListener("click", () => {
        const src = slowBtn.getAttribute("data-audio-src");
        const meta = buildMeta(slowBtn, { sceneCard });
        meta.repeatLabel = `Repeat • ${sceneHeading}`;
        playFileOrFallback(src, sceneText, 0.72, slowBtn, meta, `Slow mode • ${sceneHeading}`);
      });
    }

    if (repeatBtn) {
      repeatBtn.addEventListener("click", () => {
        if (!lastMeta) {
          lastMeta = buildMeta(repeatBtn, { sceneCard });
          lastMeta.repeatLabel = `Repeat • ${sceneHeading}`;
        }
        repeatLast(repeatBtn);
      });
    }
  });
}

function bindLineAudioButtons() {
  const lineButtons = document.querySelectorAll(".dialogue-line-audio-btn");

  lineButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const src = button.getAttribute("data-line-audio");
      const lineBlock = button.closest(".dialogue-line-block");
      const lineTop = button.closest(".dialogue-line-top");
      const deLine = lineTop?.querySelector(".dialogue-line-de");
      const fallbackText = deLine ? cleanText(deLine.textContent) : "";

      const meta = buildMeta(button, { lineBlock });
      meta.repeatLabel = fallbackText;

      playFileOrFallback(src, fallbackText, 0.92, button, meta, fallbackText);
    });
  });
}

function bindPracticeAudioButtons() {
  const practiceButtons = document.querySelectorAll("[data-practice-speak]");

  practiceButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const text = button.getAttribute("data-practice-speak");
      const rate = parseFloat(button.getAttribute("data-practice-rate") || "0.95");
      const meta = buildMeta(button);
      meta.repeatLabel = cleanText(text);

      speakText(text, rate, button, meta, cleanText(text));
    });
  });
}

async function runShadowingMode(button) {
  if (isShadowing) return;

  const sceneCard = button.closest(".question-scene-card");
  if (!sceneCard) return;

  const lines = Array.from(sceneCard.querySelectorAll(".dialogue-line-block"));
  if (!lines.length) return;

  isShadowing = true;
  stopEverything();
  button.classList.add("is-playing");

  const sceneMeta = buildMeta(button, { sceneCard });

  for (const lineBlock of lines) {
    const lineButton = lineBlock.querySelector(".dialogue-line-audio-btn");
    const lineText = cleanText(lineBlock.querySelector(".dialogue-line-de")?.textContent || "");
    const lineSrc = lineButton?.getAttribute("data-line-audio") || "";
    const meta = buildMeta(button, { sceneCard, lineBlock });

    markActive(button);
    setActiveLineBlock(lineBlock);
    setNowPlaying(meta, `Shadowing • ${lineText}`);

    if (lineSrc && await fileExists(lineSrc)) {
      try {
        dialoguesAudio.src = `${lineSrc}?v=${Date.now()}`;
        dialoguesAudio.currentTime = 0;
        await dialoguesAudio.play();
        await waitForAudioEnd();
      } catch (err) {
        console.error("Shadowing file error:", err);
        speakText(lineText, 0.86, button, meta, `Shadowing • ${lineText}`);
        await sleep(2400);
      }
    } else {
      speakText(lineText, 0.86, button, meta, `Shadowing • ${lineText}`);
      await sleep(2400);
    }

    await sleep(900);
  }

  button.classList.remove("is-playing");
  clearActiveButtons();
  clearActiveLineBlock();
  resetNowPlaying(sceneMeta);
  isShadowing = false;
}

function bindShadowingButtons() {
  const shadowButtons = document.querySelectorAll("[data-shadowing-trigger]");

  shadowButtons.forEach((button) => {
    button.addEventListener("click", () => {
      runShadowingMode(button);
    });
  });
}

function closeAllGrammarPopovers() {
  document.querySelectorAll(".dialogue-grammar-card .dialogue-grammar-extra").forEach((extra) => {
    extra.setAttribute("hidden", "");
  });

  document.querySelectorAll("[data-grammar-toggle]").forEach((button) => {
    button.textContent = "ดูเพิ่ม";
    button.setAttribute("aria-expanded", "false");
  });
}

function bindGrammarToggles() {
  const toggles = document.querySelectorAll("[data-grammar-toggle]");

  toggles.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();

      const wrap = button.closest(".dialogue-grammar-popover-wrap");
      const extra = wrap?.querySelector(".dialogue-grammar-extra");
      if (!extra) return;

      const isHidden = extra.hasAttribute("hidden");

      closeAllGrammarPopovers();

      if (isHidden) {
        extra.removeAttribute("hidden");
        button.textContent = "ซ่อน";
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".dialogue-grammar-popover-wrap")) {
      closeAllGrammarPopovers();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllGrammarPopovers();
    }
  });
}

function initDialoguesAudio() {
  bindSceneAudioRows();
  bindLineAudioButtons();
  bindPracticeAudioButtons();
  bindShadowingButtons();
  bindGrammarToggles();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initDialoguesAudio);
} else {
  initDialoguesAudio();
}

if (dialoguesAudio) {
  dialoguesAudio.addEventListener("ended", () => {
    if (!isShadowing) {
      endVisualState(lastMeta);
    }
  });

  dialoguesAudio.addEventListener("pause", () => {
    if (!isShadowing && (dialoguesAudio.currentTime === 0 || dialoguesAudio.ended)) {
      endVisualState(lastMeta);
    }
  });

  dialoguesAudio.addEventListener("error", (err) => {
    console.error("dialoguesAudio error:", err);
    if (!isShadowing) {
      endVisualState(lastMeta);
    }
  });
}
