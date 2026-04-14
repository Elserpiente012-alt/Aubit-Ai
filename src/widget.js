const desktopShell = window.aubitDesktop || null;
const widgetShellButton = document.getElementById("widgetShellButton");
const widgetBubble = document.getElementById("widgetBubble");
const widgetPrompt = "How can I help you?";

const expressionCycle = ["curious", "happy", "thinking", "listening", "surprised", "awake"];

const state = {
  expressionIndex: 0,
  expressionTimer: null,
  sleepTimer: null,
  sequenceToken: 0,
};

function pause(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function clearExpressionTimer() {
  window.clearTimeout(state.expressionTimer);
  state.expressionTimer = null;
}

function clearSleepTimer() {
  window.clearTimeout(state.sleepTimer);
  state.sleepTimer = null;
}

function setGaze(x, y) {
  document.documentElement.style.setProperty("--gaze-x", `${x}px`);
  document.documentElement.style.setProperty("--gaze-y", `${y}px`);
}

function speak(text) {
  if (!("speechSynthesis" in window) || !text) {
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.95;
  utterance.pitch = 0.88;
  utterance.volume = 1;
  window.speechSynthesis.speak(utterance);
}

function showBubble(_text = widgetPrompt, options = {}) {
  widgetBubble.textContent = widgetPrompt;
  widgetBubble.classList.add("is-visible");

  if (options.speak) {
    speak(widgetPrompt);
  }
}

function setExpression(expression) {
  document.body.dataset.expression = expression;
}

function setShellMode(mode) {
  document.body.dataset.shellMode = mode;
}

function scheduleSleepMode() {
  clearSleepTimer();
  state.sleepTimer = window.setTimeout(() => {
    enterSleepMode();
  }, 30000);
}

function scheduleNextExpression() {
  clearExpressionTimer();
  if (document.body.dataset.expression === "sleeping") {
    return;
  }

  state.expressionTimer = window.setTimeout(() => {
    if (document.body.dataset.expression === "sleeping") {
      return;
    }

    const nextExpression = expressionCycle[state.expressionIndex % expressionCycle.length];
    state.expressionIndex += 1;
    setExpression(nextExpression);
    scheduleNextExpression();
  }, 4600);
}

function refreshPresence() {
  if (document.body.dataset.expression === "sleeping") {
    return;
  }

  setExpression("awake");
  scheduleSleepMode();
  scheduleNextExpression();
}

function enterSleepMode() {
  state.sequenceToken += 1;
  clearExpressionTimer();
  clearSleepTimer();
  setGaze(0, 0);
  setShellMode("idle");
  setExpression("sleeping");
  showBubble();
}

async function runWakeSequence(options = {}) {
  const token = state.sequenceToken + 1;
  state.sequenceToken = token;
  clearExpressionTimer();
  clearSleepTimer();
  setGaze(0, 0);
  setShellMode("active");
  setExpression("waking");
  showBubble();
  await pause(540);
  if (token !== state.sequenceToken) {
    return;
  }

  setExpression("scanning");
  showBubble();
  await pause(1500);
  if (token !== state.sequenceToken) {
    return;
  }

  setExpression("awake");
  showBubble(widgetPrompt, { speak: options.speak !== false });
  scheduleSleepMode();
  scheduleNextExpression();
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

widgetShellButton.addEventListener("pointermove", (event) => {
  if (document.body.dataset.expression === "sleeping") {
    return;
  }

  const rect = widgetShellButton.getBoundingClientRect();
  const offsetX = ((event.clientX - (rect.left + rect.width / 2)) / rect.width) * 30;
  const offsetY = ((event.clientY - (rect.top + rect.height / 2)) / rect.height) * 18;
  setGaze(clamp(offsetX, -12, 12), clamp(offsetY, -7, 7));
});

widgetShellButton.addEventListener("pointerleave", () => {
  setGaze(0, 0);
});

widgetShellButton.addEventListener("click", async () => {
  if (document.body.dataset.expression === "sleeping") {
    await runWakeSequence();
    return;
  }

  setShellMode("active");
  refreshPresence();
  showBubble(widgetPrompt, { speak: true });
});

widgetShellButton.addEventListener("dblclick", async () => {
  if (desktopShell?.exitWidgetMode) {
    await desktopShell.exitWidgetMode();
  }
});

["pointerdown", "keydown"].forEach((eventName) => {
  window.addEventListener(eventName, () => {
    if (document.body.dataset.expression !== "sleeping") {
      refreshPresence();
    }
  });
});

desktopShell?.onShellEvent?.((payload) => {
  if (!payload?.type) {
    return;
  }

  if (payload.type === "widget-mode-entered") {
    runWakeSequence({ speak: false });
  }
});

setShellMode("active");
setExpression("awake");
showBubble();
scheduleSleepMode();
scheduleNextExpression();
