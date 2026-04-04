const verbsSynth = window.speechSynthesis || null;

if (verbsSynth) {
    verbsSynth.getVoices();
}

function initVerbsPractice() {
    const trackedCards = Array.from(document.querySelectorAll('[data-verbs-track="true"]'));
    const progressFill = document.querySelector("[data-verbs-progress-fill]");
    const progressText = document.querySelector("[data-verbs-progress-text]");
    const completeBox = document.querySelector("[data-verbs-complete]");
    const resetButton = document.querySelector("[data-verbs-reset]");

    function getGermanVoice() {
        if (!verbsSynth) return null;
        const voices = verbsSynth.getVoices();

        return (
            voices.find((voice) => /^de/i.test(voice.lang)) ||
            voices.find((voice) => /german/i.test(voice.name)) ||
            null
        );
    }

    function speakSentence(text, rate = 0.95) {
        if (!verbsSynth || !text) return;

        const runSpeak = () => {
            verbsSynth.cancel();

            const utterance = new SpeechSynthesisUtterance(text.trim());
            utterance.lang = "de-DE";
            utterance.rate = rate;
            utterance.pitch = 1;
            utterance.volume = 1;

            const germanVoice = getGermanVoice();
            if (germanVoice) {
                utterance.voice = germanVoice;
            }

            const resumeInterval = setInterval(() => {
                if (verbsSynth.speaking) {
                    verbsSynth.resume();
                }
            }, 200);

            utterance.onend = () => clearInterval(resumeInterval);
            utterance.onerror = () => clearInterval(resumeInterval);

            verbsSynth.speak(utterance);
        };

        const voices = verbsSynth.getVoices();
        if (!voices.length) {
            setTimeout(runSpeak, 250);
            return;
        }

        runSpeak();
    }

    function getSolvedCount() {
        return trackedCards.filter((card) => card.dataset.verbsState === "solved").length;
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

        if (completeBox) {
            completeBox.hidden = !(total > 0 && solved === total);
        }
    }

    function markSolved(card) {
        if (!card || card.dataset.verbsState === "solved") return;
        card.dataset.verbsState = "solved";
        updateProgress();
    }

    function bindSingleChoice() {
        const groups = document.querySelectorAll("[data-verbs-question]");

        groups.forEach((group) => {
            const card = group.closest('[data-verbs-track="true"]');
            const feedback = card?.querySelector(".verbs-practice-feedback");
            const correctValue = group.getAttribute("data-correct-value");
            const buttons = group.querySelectorAll(".verbs-quiz-option");

            buttons.forEach((button) => {
                button.addEventListener("click", () => {
                    if (!card || card.dataset.verbsState === "solved") return;

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
        const groups = document.querySelectorAll("[data-verbs-order]");

        groups.forEach((group) => {
            const card = group.closest('[data-verbs-track="true"]');
            const feedback = card?.querySelector(".verbs-practice-feedback");
            const chips = Array.from(group.querySelectorAll(".verbs-order-chip"));
            const totalSteps = chips.length;

            chips.forEach((chip) => {
                chip.addEventListener("click", () => {
                    if (!card || card.dataset.verbsState === "solved") return;

                    const currentStep = Number(group.getAttribute("data-current-step") || "1");
                    const clickedStep = Number(chip.getAttribute("data-step") || "0");

                    if (clickedStep === currentStep) {
                        chip.classList.remove("is-wrong");
                        chip.classList.add("is-correct");
                        chip.disabled = true;

                        if (clickedStep === totalSteps) {
                            if (feedback) {
                                feedback.textContent = "Top! De volgorde klopt.";
                            }
                            markSolved(card);
                        } else {
                            group.setAttribute("data-current-step", String(currentStep + 1));
                            if (feedback) {
                                feedback.textContent = "Goed. Kies nu het volgende woord.";
                            }
                        }
                    } else {
                        chip.classList.add("is-wrong");

                        if (feedback) {
                            feedback.textContent = "Nog niet. Denk aan verb op positie 2.";
                        }

                        setTimeout(() => {
                            chip.classList.remove("is-wrong");
                        }, 700);
                    }
                });
            });
        });
    }

    function bindSpeechButtons() {
        const buttons = document.querySelectorAll("[data-verbs-speak]");

        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                const text = button.getAttribute("data-verbs-speak");
                const rate = parseFloat(button.getAttribute("data-verbs-rate") || "0.95");
                speakSentence(text, rate);
            });
        });
    }

    function resetPractice() {
        if (verbsSynth) {
            verbsSynth.cancel();
        }

        trackedCards.forEach((card) => {
            card.dataset.verbsState = "";

            const feedback = card.querySelector(".verbs-practice-feedback");
            if (feedback) {
                feedback.textContent = "";
            }

            card.querySelectorAll(".verbs-quiz-option").forEach((button) => {
                button.disabled = false;
                button.classList.remove("is-correct", "is-wrong");
            });

            card.querySelectorAll(".verbs-order-chip").forEach((chip) => {
                chip.disabled = false;
                chip.classList.remove("is-correct", "is-wrong");
            });

            card.querySelectorAll("[data-verbs-order]").forEach((group) => {
                group.setAttribute("data-current-step", "1");
            });
        });

        updateProgress();
    }

    if (resetButton) {
        resetButton.addEventListener("click", resetPractice);
    }

    updateProgress();
    bindSingleChoice();
    bindOrderChallenges();
    bindSpeechButtons();
}

if (verbsSynth && "onvoiceschanged" in verbsSynth) {
    verbsSynth.onvoiceschanged = () => {
        verbsSynth.getVoices();
    };
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initVerbsPractice);
} else {
    initVerbsPractice();
}