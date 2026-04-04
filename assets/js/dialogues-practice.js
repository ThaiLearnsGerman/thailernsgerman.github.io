function initDialoguesPractice() {
  const trackedCards = Array.from(document.querySelectorAll('[data-practice-track="true"]'));
  const progressFill = document.querySelector("[data-practice-progress-fill]");
  const progressText = document.querySelector("[data-practice-progress-text]");
  const completeBox = document.querySelector("[data-practice-complete]");
  const resetButton = document.querySelector("[data-practice-reset]");
  const practiceShell = document.querySelector(".dialogues-practice-shell");

  function getSolvedCount() {
    return trackedCards.filter((card) => card.dataset.practiceState === "solved").length;
  }

  function updateProgress() {
    const solved = getSolvedCount();
    const total = trackedCards.length;
    const percent = total ? (solved / total) * 100 : 0;

    if (progressFill) {
      progressFill.style.width = `${percent}%`;
    }

    if (progressText) {
      progressText.textContent = `${solved} / ${total} done`;
    }

    trackedCards.forEach((card) => {
      if (card.dataset.practiceState === "solved") {
        card.classList.add("is-complete");
      } else {
        card.classList.remove("is-complete");
      }
    });

    const isComplete = total > 0 && solved === total;

    if (completeBox) {
      completeBox.hidden = !isComplete;
    }

    if (practiceShell) {
      practiceShell.classList.toggle("is-complete", isComplete);
    }
  }

  function markSolved(card) {
    if (!card || card.dataset.practiceState === "solved") return;
    card.dataset.practiceState = "solved";
    updateProgress();
  }

  function bindSingleChoice() {
    const groups = document.querySelectorAll("[data-practice-question]");

    groups.forEach((group) => {
      const card = group.closest('[data-practice-track="true"]');
      const feedback = card?.querySelector(".dialogue-practice-feedback");
      const correctValue = group.getAttribute("data-correct-value");
      const buttons = group.querySelectorAll(".dialogue-quiz-option");

      buttons.forEach((button) => {
        button.addEventListener("click", () => {
          if (!card || card.dataset.practiceState === "solved") return;

          buttons.forEach((btn) => btn.classList.remove("is-wrong"));

          const value = button.getAttribute("data-value");
          const isCorrect = value === correctValue;

          if (isCorrect) {
            button.classList.add("is-correct");
            buttons.forEach((btn) => {
              btn.disabled = true;
            });

            if (feedback) {
              feedback.textContent = "Goed! Deze klopt.";
            }

            markSolved(card);
          } else {
            button.classList.add("is-wrong");

            if (feedback) {
              feedback.textContent = "Nog niet. Probeer nog eens.";
            }

            setTimeout(() => {
              button.classList.remove("is-wrong");
            }, 700);
          }
        });
      });
    });
  }

  function bindOrderChallenges() {
    const groups = document.querySelectorAll("[data-practice-order]");

    groups.forEach((group) => {
      const card = group.closest('[data-practice-track="true"]');
      const feedback = card?.querySelector(".dialogue-practice-feedback");
      const chips = Array.from(group.querySelectorAll(".dialogue-order-chip"));
      const totalSteps = chips.length;

      chips.forEach((chip) => {
        chip.addEventListener("click", () => {
          if (!card || card.dataset.practiceState === "solved") return;

          const currentStep = Number(group.getAttribute("data-current-step") || "1");
          const clickedStep = Number(chip.getAttribute("data-step") || "0");

          if (clickedStep === currentStep) {
            chip.classList.remove("is-wrong");
            chip.classList.add("is-correct", "is-locked");
            chip.disabled = true;

            if (clickedStep === totalSteps) {
              if (feedback) {
                feedback.textContent = "Top! De volgorde klopt.";
              }
              markSolved(card);
            } else {
              group.setAttribute("data-current-step", String(currentStep + 1));
              if (feedback) {
                feedback.textContent = "Goed. Kies nu de volgende zin.";
              }
            }
          } else {
            chip.classList.add("is-wrong");

            if (feedback) {
              feedback.textContent = "Nog niet. Welke zin komt eerst?";
            }

            setTimeout(() => {
              chip.classList.remove("is-wrong");
            }, 700);
          }
        });
      });
    });
  }

  function resetPractice() {
    trackedCards.forEach((card) => {
      card.dataset.practiceState = "";

      const feedback = card.querySelector(".dialogue-practice-feedback");
      if (feedback) {
        feedback.textContent = "";
      }

      card.querySelectorAll(".dialogue-quiz-option").forEach((button) => {
        button.disabled = false;
        button.classList.remove("is-correct", "is-wrong");
      });

      card.querySelectorAll(".dialogue-order-chip").forEach((chip) => {
        chip.disabled = false;
        chip.classList.remove("is-correct", "is-wrong", "is-locked");
      });

      card.querySelectorAll("[data-practice-order]").forEach((group) => {
        group.setAttribute("data-current-step", "1");
      });
    });

    updateProgress();

    const shellTop = document.querySelector(".dialogues-practice-head");
    if (shellTop) {
      shellTop.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  if (resetButton) {
    resetButton.addEventListener("click", resetPractice);
  }

  updateProgress();
  bindSingleChoice();
  bindOrderChallenges();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initDialoguesPractice);
} else {
  initDialoguesPractice();
}