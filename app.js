const KEY = "tlg_state_v1";

function todayKey() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { level: "A1", minutes: 20, streak: 0, lastDone: null };
    const s = JSON.parse(raw);
    return {
      level: s.level || "A1",
      minutes: Number(s.minutes || 20),
      streak: Number(s.streak || 0),
      lastDone: s.lastDone || null
    };
  } catch {
    return { level: "A1", minutes: 20, streak: 0, lastDone: null };
  }
}

function saveState(s) {
  localStorage.setItem(KEY, JSON.stringify(s));
}

function calcWeeklyProgress(streak) {
  // 0..7 days -> 0..100%
  const v = Math.max(0, Math.min(7, streak));
  return Math.round((v / 7) * 100);
}

function microTaskFor(level) {
  const tasks = {
    A1: [
      "Say 3 greetings out loud.",
      "Read 5 words and spell them slowly.",
      "Make 2 sentences: Ich bin… / Ich habe…",
    ],
    A2: [
      "Ask 3 W-questions (Wer/Was/Wo).",
      "Describe your day in 3 short sentences.",
      "Listen to 60 seconds audio + repeat 5 words.",
    ],
    B1: [
      "Tell a mini story (5 sentences).",
      "Practice articles with 8 nouns (der/die/das).",
      "Write 5 questions for a friend.",
    ],
    B2: [
      "Summarize a short video in 5 sentences.",
      "Practice connectors: weil/obwohl/deshalb.",
      "Write a short opinion (3 lines).",
    ]
  };
  const arr = tasks[level] || tasks.A1;
  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
}

function render(s) {
  // inputs
  const levelEl = document.getElementById("level");
  const minutesEl = document.getElementById("minutes");
  if (levelEl) levelEl.value = s.level;
  if (minutesEl) minutesEl.value = s.minutes;

  // stats
  document.getElementById("statLevel").textContent = s.level;
  document.getElementById("statMinutes").textContent = String(s.minutes);
  document.getElementById("statStreak").textContent = String(s.streak);

  // progress bar
  const pct = calcWeeklyProgress(s.streak);
  document.getElementById("progressBar").style.width = `${pct}%`;
  document.getElementById("progressHint").textContent =
    pct >= 100 ? "Perfect week. You’re a machine 🤝" : `Weekly consistency: ${pct}%`;

  // micro task
  document.getElementById("microTask").textContent = microTaskFor(s.level);
}

function markDone(s) {
  const t = todayKey();
  if (s.lastDone === t) return s; // already done today

  // streak logic:
  // if lastDone was yesterday -> streak +1
  // else streak = 1
  const d = new Date();
  const yesterday = new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1);
  const yKey = `${yesterday.getFullYear()}-${String(yesterday.getMonth()+1).padStart(2,"0")}-${String(yesterday.getDate()).padStart(2,"0")}`;

  if (s.lastDone === yKey) s.streak = s.streak + 1;
  else s.streak = 1;

  s.lastDone = t;
  return s;
}

document.addEventListener("DOMContentLoaded", () => {
  let state = loadState();
  render(state);

  document.getElementById("savePlan")?.addEventListener("click", () => {
    const level = document.getElementById("level").value;
    const minutes = Number(document.getElementById("minutes").value || 20);
    state.level = level;
    state.minutes = Math.max(5, Math.min(120, minutes));
    saveState(state);
    render(state);
  });

  document.getElementById("markDone")?.addEventListener("click", () => {
    state = markDone(state);
    saveState(state);
    render(state);
  });
});
