// ThaiLearnsGerman Professional Progress System
// Clean. Structured. Slight game layer. No childish vibes.

const STORAGE_KEY = "tlg_system_v2";

const STEPS = [
  { id: "sounds", title: "1) Sounds", desc: "Ä/Ö/Ü/ß + pronunciation" },
  { id: "greetings", title: "2) Greetings", desc: "Hello, goodbye, polite basics" },
  { id: "pattern", title: "3) Sentence pattern", desc: "S + V + O" },
  { id: "articles", title: "4) Articles", desc: "der / die / das" },
  { id: "vocab", title: "5) Vocabulary", desc: "10 words per day" },
  { id: "verbs", title: "6) Verbs", desc: "sein / haben / gehen / machen" },
  { id: "questions", title: "7) Questions", desc: "W-questions + yes/no" },
  { id: "dialogs", title: "8) Dialogues", desc: "Real-life practice" },
  { id: "listening", title: "9) Listening", desc: "Short daily audio" },
  { id: "plan", title: "10) 4-week plan", desc: "Routine structure" }
];

// ---------- UTIL ----------

function todayISO() {
  const d = new Date();
  return d.toISOString().split("T")[0];
}

function defaultState() {
  return {
    level: "A1",
    minutes: 20,
    stepsDone: {},
    doneDays: {}
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    return { ...defaultState(), ...JSON.parse(raw) };
  } catch {
    return defaultState();
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// ---------- STREAK ----------

function calcStreak(state) {
  let streak = 0;
  let cursor = new Date();

  while (true) {
    const iso = cursor.toISOString().split("T")[0];
    if (state.doneDays[iso]) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

// ---------- PROFESSIONAL LAYER ----------

function weeklyStatusLabel(streak) {
  if (streak <= 1) return "Starting";
  if (streak <= 3) return "Consistent";
  if (streak <= 6) return "Focused";
  return "Serious Student";
}

function dailyMicroTask(level) {
  const tasks = {
    A1: [
      "Say 3 greetings aloud.",
      "Write 2 sentences with 'Ich bin'.",
      "Learn 5 new nouns."
    ],
    A2: [
      "Ask 3 W-questions.",
      "Describe your day in 3 sentences.",
      "Review der/die/das."
    ],
    B1: [
      "Tell a short story (5 sentences).",
      "Use 'weil' in 3 sentences.",
      "Summarize a short audio."
    ]
  };
  const arr = tasks[level] || tasks.A1;
  const index = new Date().getDate() % arr.length;
  return arr[index];
}

function motivationLine(streak) {
  if (streak === 0) return "Start today. Small steps matter.";
  if (streak < 3) return "Consistency beats motivation.";
  if (streak < 6) return "You are building discipline.";
  return "Real progress is happening.";
}

function systemScore(state) {
  const steps = Object.keys(state.stepsDone).length;
  const streak = calcStreak(state);
  const raw = (steps * 10) + (streak * 2);
  return Math.min(100, raw);
}

// ---------- UI ----------

function renderSteps(state) {
  const grid = document.getElementById("stepsGrid");
  grid.innerHTML = "";

  STEPS.forEach(step => {
    const done = !!state.stepsDone[step.id];

    const el = document.createElement("div");
    el.className = "step";

    el.innerHTML = `
      <div class="step-left">
        <p class="step-title">${step.title}</p>
        <p class="step-desc">${step.desc}</p>
      </div>
      <div class="step-actions">
        <span class="badge ${done ? "done" : ""}">
          ${done ? "DONE" : "TODO"}
        </span>
        <button class="btn small ${done ? "ghost" : "primary"}" data-step="${step.id}">
          ${done ? "Undo" : "Done"}
        </button>
      </div>
    `;

    grid.appendChild(el);
  });

  grid.querySelectorAll("button[data-step]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-step");
      state.stepsDone[id] = !state.stepsDone[id];
      saveState(state);
      updateUI(state);
    });
  });
}

function updateUI(state) {
  const streak = calcStreak(state);
  const score = systemScore(state);

  document.getElementById("statLevel").textContent = state.level;
  document.getElementById("statMinutes").textContent = state.minutes;
  document.getElementById("statStreak").textContent = streak;

  document.getElementById("barFill").style.width = score + "%";
  document.getElementById("barText").textContent = score + "%";

  document.getElementById("nextAction").innerHTML = `
    <strong>Status:</strong> ${weeklyStatusLabel(streak)}<br/>
    <strong>Today:</strong> ${dailyMicroTask(state.level)}<br/>
    <em>${motivationLine(streak)}</em>
  `;

  renderSteps(state);
}

// ---------- SMART START ----------

function wireSmartStart(state) {
  const form = document.getElementById("smartForm");
  const levelSelect = document.getElementById("levelSelect");
  const minutesInput = document.getElementById("minutesInput");

  levelSelect.value = state.level;
  minutesInput.value = state.minutes;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    state.level = levelSelect.value;
    state.minutes = Math.max(5, Math.min(120, Number(minutesInput.value)));
    saveState(state);
    updateUI(state);
  });

  document.getElementById("resetAll").addEventListener("click", () => {
    const fresh = defaultState();
    saveState(fresh);
    updateUI(fresh);
  });
}

// ---------- TODAY ----------

function wireToday(state) {
  document.getElementById("markTodayDone").addEventListener("click", () => {
    state.doneDays[todayISO()] = true;
    saveState(state);
    updateUI(state);
  });

  document.getElementById("resetToday").addEventListener("click", () => {
    delete state.doneDays[todayISO()];
    saveState(state);
    updateUI(state);
  });
}

// ---------- BACKUP ----------

function wireBackup(state) {
  const box = document.getElementById("backupBox");

  document.getElementById("exportBtn").addEventListener("click", () => {
    box.value = JSON.stringify(state, null, 2);
  });

  document.getElementById("importBtn").addEventListener("click", () => {
    try {
      const parsed = JSON.parse(box.value);
      saveState(parsed);
      updateUI(parsed);
    } catch {
      alert("Invalid JSON.");
    }
  });
}

// ---------- INIT ----------

(function init() {
  const state = loadState();
  wireSmartStart(state);
  wireToday(state);
  wireBackup(state);
  updateUI(state);
})();
