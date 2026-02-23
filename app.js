// ThaiLearnsGerman — Progress System (professional, light game feel)
// Works on root and project pages (no absolute paths needed)

const STORAGE_KEY = "tlg_system_v3";

const STEPS = [
  { id: "sounds",    title: "1) Sounds",           desc: "Ä/Ö/Ü/ß + pronunciation" },
  { id: "greetings", title: "2) Greetings",        desc: "Hello, goodbye, polite basics" },
  { id: "pattern",   title: "3) Sentence pattern", desc: "S + V + O" },
  { id: "articles",  title: "4) Articles",         desc: "der / die / das (simple rules)" },
  { id: "vocab",     title: "5) Vocabulary",       desc: "10 words/day" },
  { id: "verbs",     title: "6) Verbs",            desc: "sein / haben / gehen / machen" },
  { id: "questions", title: "7) Questions",        desc: "W-questions + yes/no" },
  { id: "dialogs",   title: "8) Dialogues",        desc: "Ordering, travel, meeting" },
  { id: "listening", title: "9) Listening",        desc: "Short daily audio" },
  { id: "plan",      title: "10) 4-week plan",     desc: "Routine + checkpoints" }
];

// ---------- helpers ----------
function el(id){ return document.getElementById(id); }

function todayISO(){
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth()+1).padStart(2,"0");
  const day = String(d.getDate()).padStart(2,"0");
  return `${y}-${m}-${day}`;
}

function defaultState(){
  return { level:"A1", minutes:20, stepsDone:{}, doneDays:{} };
}

function loadState(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return defaultState();
    const parsed = JSON.parse(raw);
    const base = defaultState();
    // merge safely
    return {
      ...base,
      ...parsed,
      stepsDone: parsed.stepsDone && typeof parsed.stepsDone==="object" ? parsed.stepsDone : {},
      doneDays:  parsed.doneDays  && typeof parsed.doneDays==="object"  ? parsed.doneDays  : {},
    };
  }catch{
    return defaultState();
  }
}

function saveState(state){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function clamp(n,a,b){ return Math.max(a, Math.min(b,n)); }

// ---------- streak ----------
function calcStreak(state){
  let streak=0;
  let cursor = new Date();
  while(true){
    const y = cursor.getFullYear();
    const m = String(cursor.getMonth()+1).padStart(2,"0");
    const d = String(cursor.getDate()).padStart(2,"0");
    const iso = `${y}-${m}-${d}`;
    if(state.doneDays[iso]){
      streak++;
      cursor.setDate(cursor.getDate()-1);
    }else break;
  }
  return streak;
}

// ---------- light game layer ----------
function weeklyStatusLabel(streak){
  if(streak<=1) return "Starting";
  if(streak<=3) return "Consistent";
  if(streak<=6) return "Focused";
  return "Serious Student";
}

function dailyMicroTask(level){
  const tasks = {
    A1: [
      "Say 3 greetings aloud.",
      "Write 2 sentences with 'Ich bin'.",
      "Learn 5 new nouns."
    ],
    A2: [
      "Ask 3 W-questions.",
      "Describe your day in 3 short sentences.",
      "Review der/die/das with 8 nouns."
    ],
    B1: [
      "Tell a short story (5 sentences).",
      "Use 'weil' in 3 sentences.",
      "Summarize a short audio."
    ],
    B2: [
      "Write a short opinion (4 lines).",
      "Practice connectors: obwohl/deshalb/weil.",
      "Summarize a video in 5 sentences."
    ]
  };
  const arr = tasks[level] || tasks.A1;
  const idx = new Date().getDate() % arr.length;
  return arr[idx];
}

function motivationLine(streak){
  if(streak===0) return "Start today. Small steps matter.";
  if(streak<3) return "Consistency beats motivation.";
  if(streak<6) return "You are building discipline.";
  return "Real progress is happening.";
}

function doneStepsCount(state){
  return STEPS.reduce((acc,s)=>acc + (state.stepsDone[s.id] ? 1 : 0), 0);
}

// System Score: steps + streak (professional)
function systemScore(state){
  const steps = doneStepsCount(state);     // 0..10
  const streak = calcStreak(state);        // 0..∞
  const raw = (steps * 10) + (streak * 2); // max clamp 100
  return clamp(raw, 0, 100);
}

// ---------- UI render ----------
function renderSteps(state){
  const grid = el("stepsGrid");
  if(!grid) return;

  grid.innerHTML = "";

  for(const step of STEPS){
    const done = !!state.stepsDone[step.id];

    const card = document.createElement("div");
    card.className = "step";
    card.innerHTML = `
      <div class="step-left">
        <p class="step-title">${step.title}</p>
        <p class="step-desc">${step.desc}</p>
      </div>
      <div class="step-actions">
        <span class="badge ${done ? "done":""}">${done ? "DONE":"TODO"}</span>
        <button class="btn small ${done ? "ghost":"primary"}" type="button" data-step="${step.id}">
          ${done ? "Undo" : "Done"}
        </button>
      </div>
    `;

    grid.appendChild(card);
  }

  grid.querySelectorAll("button[data-step]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const id = btn.getAttribute("data-step");
      state.stepsDone[id] = !state.stepsDone[id];
      saveState(state);
      updateUI(state);
    });
  });
}

function updateUI(state){
  const level = el("statLevel");
  const minutes = el("statMinutes");
  const streakEl = el("statStreak");
  const barFill = el("barFill");
  const barText = el("barText");
  const nextAction = el("nextAction");

  const streak = calcStreak(state);
  const score = systemScore(state);
  const stepsDone = doneStepsCount(state);

  if(level) level.textContent = state.level;
  if(minutes) minutes.textContent = String(state.minutes);
  if(streakEl) streakEl.textContent = String(streak);

  if(barFill) barFill.style.width = `${score}%`;
  if(barText) barText.textContent = `${score}%  ·  ${stepsDone}/10 steps`;

  if(nextAction){
    const status = weeklyStatusLabel(streak);
    const task = dailyMicroTask(state.level);
    const line = motivationLine(streak);
    nextAction.innerHTML = `<strong>Status:</strong> ${status}<br/><strong>Today:</strong> ${task}<br/><em>${line}</em>`;
  }

  renderSteps(state);
}

// ---------- wiring ----------
function wireSmartStart(state){
  const form = el("smartForm");
  const levelSelect = el("levelSelect");
  const minutesInput = el("minutesInput");
  const resetAll = el("resetAll");

  if(levelSelect) levelSelect.value = state.level;
  if(minutesInput) minutesInput.value = state.minutes;

  if(form){
    form.addEventListener("submit", (e)=>{
      e.preventDefault();
      const lvl = levelSelect ? levelSelect.value : "A1";
      const mins = minutesInput ? Number(minutesInput.value || 20) : 20;
      state.level = lvl;
      state.minutes = clamp(mins, 5, 120);
      saveState(state);
      updateUI(state);
    });
  }

  if(resetAll){
    resetAll.addEventListener("click", ()=>{
      const fresh = defaultState();
      saveState(fresh);
      // keep same reference? easiest: copy
      state.level = fresh.level;
      state.minutes = fresh.minutes;
      state.stepsDone = fresh.stepsDone;
      state.doneDays = fresh.doneDays;

      if(levelSelect) levelSelect.value = state.level;
      if(minutesInput) minutesInput.value = state.minutes;

      const box = el("backupBox");
      if(box) box.value = "";
      updateUI(state);
    });
  }
}

function wireToday(state){
  const doneBtn = el("markTodayDone");
  const undoBtn = el("resetToday");

  if(doneBtn){
    doneBtn.addEventListener("click", ()=>{
      state.doneDays[todayISO()] = true;
      saveState(state);
      updateUI(state);
    });
  }

  if(undoBtn){
    undoBtn.addEventListener("click", ()=>{
      delete state.doneDays[todayISO()];
      saveState(state);
      updateUI(state);
    });
  }
}

function wireBackup(state){
  const exportBtn = el("exportBtn");
  const importBtn = el("importBtn");
  const box = el("backupBox");

  if(exportBtn && box){
    exportBtn.addEventListener("click", ()=>{
      box.value = JSON.stringify(state, null, 2);
    });
  }

  if(importBtn && box){
    importBtn.addEventListener("click", ()=>{
      try{
        const parsed = JSON.parse(box.value.trim());
        const merged = {
          ...defaultState(),
          ...parsed,
          stepsDone: parsed.stepsDone && typeof parsed.stepsDone==="object" ? parsed.stepsDone : {},
          doneDays: parsed.doneDays && typeof parsed.doneDays==="object" ? parsed.doneDays : {},
        };

        saveState(merged);
        // copy into current state reference
        state.level = merged.level;
        state.minutes = merged.minutes;
        state.stepsDone = merged.stepsDone;
        state.doneDays = merged.doneDays;

        // sync inputs
        const levelSelect = el("levelSelect");
        const minutesInput = el("minutesInput");
        if(levelSelect) levelSelect.value = state.level;
        if(minutesInput) minutesInput.value = state.minutes;

        updateUI(state);
      }catch{
        alert("Invalid JSON. Paste exported text first.");
      }
    });
  }
}

// ---------- init ----------
document.addEventListener("DOMContentLoaded", ()=>{
  const state = loadState();
  wireSmartStart(state);
  wireToday(state);
  wireBackup(state);
  updateUI(state);
});
