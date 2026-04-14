const speechBubble = document.getElementById("speechBubble");
const boardContent = document.getElementById("boardContent");
const introOverlay = document.getElementById("introOverlay");
const introPod = document.getElementById("introPod");
const introCaption = document.getElementById("introCaption");
const currentUserBadge = document.getElementById("currentUserBadge");
const currentUserLabel = document.getElementById("currentUserLabel");
const homeClock = document.getElementById("homeClock");
const homeClockTime = document.getElementById("homeClockTime");
const homeClockDay = document.getElementById("homeClockDay");
const homeClockDate = document.getElementById("homeClockDate");
const homeClockSeason = document.getElementById("homeClockSeason");
const clickHint = document.querySelector(".click-hint");
const aubitAvatar = document.getElementById("aubitAvatar");
const widgetModeToggle = document.getElementById("widgetModeToggle");
const appShell = document.querySelector(".app-shell");
const studyBoard = document.getElementById("studyBoard");
const boardTitle = document.getElementById("boardTitle");
const boardActionButton = document.getElementById("boardActionButton");
const focusLampButton = document.querySelector('.object-card[data-reaction="focus"]');
const customizeToolButtons = document.getElementById("customizeToolButtons");
const customizeToolToggle = document.getElementById("customizeToolToggle");
const gameToolButtons = document.getElementById("gameToolButtons");
const gameToolToggle = document.getElementById("gameToolToggle");
const mainRoomImage = document.getElementById("mainRoomImage");
const introRoomImage = document.getElementById("introRoomImage");
const introAubit = document.getElementById("introAubit");
const companionStage = document.getElementById("companionStage");
const aubitAvatarImage = aubitAvatar.querySelector("img");
const introAubitImage = introAubit?.querySelector("img");
const robotChoiceMenu = document.getElementById("robotChoiceMenu");
const robotChoiceButtons = robotChoiceMenu?.querySelectorAll("[data-robot-variant]") || [];
const aubitWinterBranchCluster = document.getElementById("aubitWinterBranchCluster");
const aubitWinterBranchToggle = document.getElementById("aubitWinterBranchToggle");
const aubitWinterBranchMenu = document.getElementById("aubitWinterBranchMenu");
const homePhotoFrame = document.getElementById("homePhotoFrame");
const homeWallPoster = document.getElementById("homeWallPoster");
const photoViewer = document.getElementById("photoViewer");
const photoViewerClose = document.getElementById("photoViewerClose");
const photoViewerBack = document.getElementById("photoViewerBack");
const photoViewerImage = document.getElementById("photoViewerImage");
const entryAuthOverlay = document.getElementById("entryAuthOverlay");
const entryAuthModeButtons = entryAuthOverlay?.querySelectorAll("[data-auth-mode]") || [];
const entrySignInForm = document.getElementById("entrySignInForm");
const entrySignUpForm = document.getElementById("entrySignUpForm");
const entryAuthFeedback = document.getElementById("entryAuthFeedback");
const floorGatewayButton = document.getElementById("floorGatewayButton");
const floorGatewayLabel = document.getElementById("floorGatewayLabel");

const state = {
  coins: 120,
  stars: 14,
  level: 3,
  introPlayed: false,
  compactMode: false,
  currentPanel: "",
  currentOutfit: "default",
  currentAubiraOutfit: "default",
  currentTopic: "",
  studiedTopic: "",
  studyDraft: "",
  currentUserName: "",
  authUnlocked: false,
  testTopic: "",
  currentTestMode: "",
  currentTestBlueprint: null,
  activeGame: "",
  recognition: null,
  idleTimer: null,
  sleepTimer: null,
  wakeStageTimer: null,
  wakeCompleteTimer: null,
  theme: "light",
  apiBaseUrl: "http://127.0.0.1:8001/api",
  authToken: "",
  authReady: null,
  voiceInputMode: "",
  voiceWakeActive: false,
  voiceBusy: false,
  robotVariant: "male",
  robotMenuOpen: false,
  customizeMenuOpen: false,
  gameMenuOpen: false,
  activeOutfitBranch: "",
  avatarState: "awake",
};

const desktopShell = window.aubitDesktop || null;
const isDesktopShellAvailable = Boolean(desktopShell?.isDesktopShell);

const roomImages = {
  default: {
    light: "./images/HomeSection.jpeg",
    dark: "./images/HomeSection.jpeg",
  },
  games: {
    light: "./images/GameHubSection.jpeg",
    dark: "./images/GameHubSection.jpeg",
  },
  customize: {
    light: "./images/CustomizeSection.jpeg",
    dark: "./images/CustomizeSection.jpeg",
  },
};

const homeFocusImage = "./images/HomeSectionFocus.jpeg";
const sectionVisualAssets = [
  ...new Set([
    ...Object.values(roomImages).flatMap((panelImages) => Object.values(panelImages)),
    homeFocusImage,
    "./src/assets/game-hub-bg.jpeg",
    "./src/assets/customize-hub-bg.jpeg",
  ]),
];
const AUTH_ACCOUNTS_STORAGE_KEY = "aubit.auth.accounts.v1";
const AUTH_LAST_USER_STORAGE_KEY = "aubit.auth.last-user.v1";
const ROBOT_VARIANT_STORAGE_KEY = "aubit.robot.variant.v1";
const warmedImageAssets = new Map();
const robotBaseImages = {
  male: "./images/robot-earlier.png",
  female: "./images/Aubit-Female.png",
};
const robotProfiles = {
  male: {
    name: "Aubit",
    introName: "Aubit",
  },
  female: {
    name: "Aubira",
    introName: "Aubira",
  },
};

const outfitImages = {
  default: robotBaseImages.male,
  "armor-red": "./images/Aubit-Red-Armor-Hero.png",
  "aubit-red-winter": "./images/Aubit-Red-Winter.png",
  "aubit-green-winter": "./images/Aubit-Green-Winter.png",
  "casual-green": "./images/Aubit-Green.png",
  "street-green": "./images/Aubit-Street-Green.png",
  "vibe-code": "./images/Aubit-Vibe-Code.png",
  "cobra-kai": "./images/Aubit-Cobra-Kai.png",
};

const aubitWinterOutfitStyles = ["aubit-red-winter", "aubit-green-winter"];

const aubiraOutfitImages = {
  default: robotBaseImages.female,
  "aubira-violet": "./images/Aubira-Violet.png",
  "aubira-pink-casual": "./images/Aubira-Pink-Casual.png",
  "aubira-winter-coat": "./images/Aubira-Winter-Coat.png",
};

const gameLinks = {
  sudoku: "./sudoku.html",
  "snake-ladder": "./snake-and-ladder.html",
  chess: "./chess.html",
  monopoly: "./monopoly.html",
  "temple-run": "https://templerun.org/",
};

const homeClockFormatters = {
  day: new Intl.DateTimeFormat(undefined, { weekday: "long" }),
  date: new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }),
  time: new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  }),
};

let homeClockTimerId = 0;

function syncWidgetModeToggleLabel() {
  const label = widgetModeToggle?.lastElementChild;
  if (!label) {
    return;
  }

  if (isDesktopShellAvailable) {
    label.textContent = "Desktop Shell";
    return;
  }

  label.textContent = state.compactMode ? "Immersive App" : "Desktop Widget";
}

desktopShell?.onShellEvent?.((payload) => {
  if (!payload?.type) {
    return;
  }

  if (payload.type === "immersive-mode-entered") {
    state.compactMode = false;
    appShell.classList.remove("compact-mode");
    syncWidgetModeToggleLabel();
  }
});

function getGameLabel(game) {
  const labels = {
    sudoku: "Sudoku",
    "snake-ladder": "Snake and Ladder",
    chess: "Chess",
    monopoly: "Monopoly",
  };
  return labels[game] || "selected game";
}

function getSeasonLabel(date = new Date()) {
  const month = date.getMonth();

  if (month >= 2 && month <= 4) {
    return "Spring";
  }

  if (month >= 5 && month <= 7) {
    return "Summer";
  }

  if (month >= 8 && month <= 10) {
    return "Autumn";
  }

  return "Winter";
}

function updateHomeClock() {
  if (!homeClock || !homeClockTime || !homeClockDay || !homeClockDate || !homeClockSeason) {
    return;
  }

  const now = new Date();
  const dayLabel = homeClockFormatters.day.format(now);
  const dateLabel = homeClockFormatters.date.format(now);
  const timeLabel = homeClockFormatters.time.format(now);
  const seasonLabel = getSeasonLabel(now);

  homeClockTime.textContent = timeLabel;
  homeClockDay.textContent = dayLabel;
  homeClockDate.textContent = dateLabel;
  homeClockSeason.textContent = seasonLabel;
  homeClock.setAttribute("aria-label", `${dayLabel}, ${dateLabel}, ${timeLabel}, ${seasonLabel} season`);
}

function startHomeClock() {
  updateHomeClock();

  if (homeClockTimerId) {
    window.clearInterval(homeClockTimerId);
  }

  homeClockTimerId = window.setInterval(updateHomeClock, 1000);
}

function isEmbeddedBoardGame(game) {
  return game === "sudoku" || game === "snake-ladder" || game === "chess" || game === "monopoly";
}

const boardTopics = {
  study: {
    title: "Step-by-step learning plan",
    copy:
      "Aubit will break the topic into simple parts, show examples on the green board, and ask one confidence-check question after each step.",
  },
  test: {
    title: "I would like to evaluate your progress.",
    copy:
      "Choose MCQ, coding, or puzzle mode. Aubit reacts warmly when you are correct and gives hints instead of hard failure when you miss.",
  },
  games: {
    title: "Aubit play space",
    copy:
      "Sudoku, Aubit Run, memory loops, and puzzle challenges all feed coins and stars back into the companion world.",
  },
  customize: {
    title: "Companion style editor",
    copy:
      "Preview hoodies, seasonal jackets, and futuristic suits in real time while the room updates with matching accent lights.",
  },
  settings: {
    title: "Desktop assistant controls",
    copy:
      "Switch between widget overlay, immersive room, and ambient idle mode while keeping shared memory and shared progression.",
  },
};

const youtubeEmbeds = {
  gravity: "https://www.youtube-nocookie.com/embed/MTY1Kje0yLg",
  photosynthesis: "https://www.youtube-nocookie.com/embed/eY1REQ2Da7Y",
  algebra: "https://www.youtube-nocookie.com/embed/NybHckSEQBI",
  "solar system": "https://www.youtube-nocookie.com/embed/libKVRa01L8",
  python: "https://www.youtube-nocookie.com/embed/kqtD5dpn9C8",
};

function topicKey(value) {
  return value.trim().toLowerCase();
}

function updateBoardChrome(title, showAction = false, actionLabel = "Explain Python") {
  boardTitle.textContent = title;
  boardActionButton.textContent = actionLabel;
  boardActionButton.classList.toggle("is-hidden", !showAction);
}

function setBoardContentLayout(layout = "default") {
  boardContent.classList.toggle("game-embed-mode", layout === "game-embed");
}

function warmImageAsset(source) {
  if (!source) {
    return Promise.resolve();
  }

  const cachedAsset = warmedImageAssets.get(source);
  if (cachedAsset) {
    return cachedAsset.ready;
  }

  const image = new Image();
  image.decoding = "async";

  let resolved = false;
  let resolveReady = () => {};
  const ready = new Promise((resolve) => {
    resolveReady = resolve;
  });

  const completeWarmup = () => {
    if (resolved) {
      return;
    }

    resolved = true;
    resolveReady();
  };

  const finishWarmup = () => {
    if (typeof image.decode === "function") {
      image.decode().catch(() => {}).finally(completeWarmup);
      return;
    }

    completeWarmup();
  };

  warmedImageAssets.set(source, { image, ready });
  image.addEventListener("load", finishWarmup, { once: true });
  image.addEventListener("error", completeWarmup, { once: true });
  image.src = source;

  if (image.complete) {
    finishWarmup();
  }

  return ready;
}

function warmSectionAssets() {
  sectionVisualAssets.forEach((source) => {
    warmImageAsset(source);
  });
}

function setImageSource(imageElement, source) {
  if (!imageElement || !source) {
    return;
  }

  const currentSource = imageElement.dataset.activeSrc || imageElement.getAttribute("src") || "";
  if (currentSource === source) {
    return;
  }

  imageElement.dataset.activeSrc = source;
  imageElement.src = source;
}

function applyRoomBackdrop() {
  const variant =
    state.currentPanel === "games"
      ? "games"
      : state.currentPanel === "customize"
        ? "customize"
        : "default";
  const isHomeView = !state.currentPanel;
  const nextRoomImage = isHomeView && state.theme === "dark" ? homeFocusImage : roomImages[variant][state.theme];
  const nextIntroRoomImage = roomImages.default[state.theme];

  warmImageAsset(nextRoomImage);
  warmImageAsset(nextIntroRoomImage);
  setImageSource(mainRoomImage, nextRoomImage);
  setImageSource(introRoomImage, nextIntroRoomImage);
}

warmSectionAssets();

const reactions = {
  tickle: {
    mood: "Playful",
    speech: "That tickles. I am still ready to help whenever you want.",
    status: "Aubit reacted to touch input and shifted into a playful companion state.",
  },
  feed: {
    mood: "Cared For",
    speech: "Thank you. I feel looked after. Shall we do something rewarding next?",
    status: "Companion care increases trust, emotion score, and room evolution progress.",
    reward: { coins: 8, stars: 1 },
  },
  focus: {
    mood: "Focused Mentor",
    speech: "Focus mode is on. Let us learn calmly, one step at a time.",
    status: "Study lighting is now active. Aubit will keep explanations concise and visual.",
  },
};

const outfitResponses = {
  default: "Default shell loaded. Clean, friendly, and assistant-first.",
  "armor-red": "Red armor style applied. Aubit now looks bolder and more heroic.",
  "aubit-red-winter": "Red cozy winter style applied. Aubit now has a warm cold-weather look.",
  "aubit-green-winter": "Green winter style applied. Aubit now has a fresh cold-weather look.",
  "casual-green": "Green casual style applied. Aubit now has a calm casual look.",
  "street-green": "Green street jacket style applied. Aubit now has a casual gamer vibe.",
  "vibe-code": "Vibe Code shirt style applied. Aubit is now ready to ship in style.",
  "cobra-kai": "Cobra Kai style applied. Aubit is in strike-first mode.",
};

const aubiraOutfitResponses = {
  default: "Aubira default shell restored. Clean, bright, and ready to help.",
  "aubira-violet": "Aubira violet style applied. She now has a bold futuristic glow.",
  "aubira-pink-casual": "Aubira pink casual style applied. She now has a softer everyday look.",
  "aubira-winter-coat": "Aubira winter outfit applied. She now has a cozy cold-weather look.",
};

function readStoredRobotVariant() {
  try {
    const storedVariant = window.localStorage.getItem(ROBOT_VARIANT_STORAGE_KEY);
    return storedVariant === "female" ? "female" : "male";
  } catch (_error) {
    return "male";
  }
}

function writeStoredRobotVariant(variant) {
  try {
    window.localStorage.setItem(ROBOT_VARIANT_STORAGE_KEY, variant);
  } catch (_error) {
  }
}

function getRobotProfile(variant = state.robotVariant) {
  return robotProfiles[variant === "female" ? "female" : "male"];
}

function getSelectedOutfitStyle(variant = state.robotVariant) {
  return variant === "female" ? state.currentAubiraOutfit : state.currentOutfit;
}

function getDisplayedOutfit() {
  return getSelectedOutfitStyle();
}

function getActiveRobotImage() {
  if (state.robotVariant === "female") {
    return aubiraOutfitImages[state.currentAubiraOutfit] || robotBaseImages.female;
  }

  return outfitImages[state.currentOutfit] || outfitImages.default;
}

function syncCustomizeButtons() {
  const selectedStyle = getSelectedOutfitStyle();
  const isWinterBranchVisible = state.robotVariant === "male";
  const isWinterBranchOpen =
    state.customizeMenuOpen &&
    state.activeOutfitBranch === "aubit-winter" &&
    isWinterBranchVisible;

  customizeToolButtons?.querySelectorAll("[data-outfit-style]").forEach((button) => {
    const visibleFor = button.dataset.visibleFor || "all";
    const isVisible = visibleFor === "all" || visibleFor === state.robotVariant;
    const isBranchOption = Boolean(button.closest("#aubitWinterBranchMenu"));
    button.classList.toggle("is-hidden-by-variant", !isVisible);
    button.classList.toggle("active", isVisible && button.dataset.outfitStyle === selectedStyle);
    button.setAttribute("aria-hidden", isVisible ? "false" : "true");
    button.tabIndex = isVisible && (!isBranchOption || isWinterBranchOpen) ? 0 : -1;
  });

  if (aubitWinterBranchCluster) {
    aubitWinterBranchCluster.classList.toggle("is-hidden-by-variant", !isWinterBranchVisible);
    aubitWinterBranchCluster.setAttribute("aria-hidden", isWinterBranchVisible ? "false" : "true");
  }

  if (aubitWinterBranchToggle) {
    const activeWinterStyle = aubitWinterOutfitStyles.includes(selectedStyle)
      ? selectedStyle
      : "aubit-red-winter";
    const previewImage = aubitWinterBranchToggle.querySelector("img");

    if (previewImage) {
      previewImage.src = outfitImages[activeWinterStyle] || outfitImages["aubit-red-winter"];
      previewImage.alt =
        activeWinterStyle === "aubit-green-winter"
          ? "Green winter robot style"
          : "Red cozy winter robot style";
    }

    aubitWinterBranchToggle.classList.toggle(
      "active",
      isWinterBranchVisible && aubitWinterOutfitStyles.includes(selectedStyle),
    );
    aubitWinterBranchToggle.setAttribute("aria-expanded", isWinterBranchOpen ? "true" : "false");
    aubitWinterBranchToggle.tabIndex = isWinterBranchVisible ? 0 : -1;
  }

  if (aubitWinterBranchMenu) {
    aubitWinterBranchMenu.classList.toggle("is-open", isWinterBranchOpen);
    aubitWinterBranchMenu.setAttribute("aria-hidden", isWinterBranchOpen ? "false" : "true");
  }

  const defaultPreviewImage = customizeToolButtons?.querySelector('[data-outfit-style="default"] img');
  if (defaultPreviewImage) {
    defaultPreviewImage.src = state.robotVariant === "female" ? robotBaseImages.female : outfitImages.default;
    defaultPreviewImage.alt = state.robotVariant === "female" ? "Aubira default robot style" : "Original white robot style";
  }
}

function syncRobotChoiceButtons() {
  robotChoiceButtons.forEach((button) => {
    const isActive = button.dataset.robotVariant === state.robotVariant;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
}

function renderRobotAppearance() {
  const robotProfile = getRobotProfile();
  const imageSrc = getActiveRobotImage();
  const displayedOutfit = getDisplayedOutfit();

  aubitAvatarImage.src = imageSrc;
  aubitAvatarImage.alt = `${robotProfile.name} robot`;
  aubitAvatar.dataset.outfit = displayedOutfit;
  aubitAvatar.dataset.robotVariant = state.robotVariant;

  if (introAubitImage) {
    introAubitImage.src = imageSrc;
    introAubitImage.alt = `${robotProfile.introName} robot emerging from pod`;
  }

  if (introAubit) {
    introAubit.dataset.outfit = displayedOutfit;
    introAubit.dataset.robotVariant = state.robotVariant;
  }

  if (clickHint) {
    clickHint.textContent = `Tap the pod to open ${robotProfile.name}`;
  }

  if (introCaption) {
    introCaption.textContent = `Tap the pod to open ${robotProfile.name}`;
  }

  syncRobotChoiceButtons();
  syncCustomizeButtons();
}

function setRobotMenu(open) {
  state.robotMenuOpen = Boolean(open);
  robotChoiceMenu?.classList.toggle("is-open", state.robotMenuOpen);
  robotChoiceMenu?.setAttribute("aria-hidden", state.robotMenuOpen ? "false" : "true");
  aubitAvatar?.setAttribute("aria-expanded", state.robotMenuOpen ? "true" : "false");
}

function setRobotVariant(variant, options = {}) {
  const nextVariant = variant === "female" ? "female" : "male";
  const shouldAnnounce = options.announce !== false;

  state.robotVariant = nextVariant;
  state.activeOutfitBranch = "";
  writeStoredRobotVariant(nextVariant);
  renderRobotAppearance();
  setRobotMenu(false);

  if (!shouldAnnounce) {
    return;
  }

  setCompanionState({
    speech: `${getRobotProfile(nextVariant).name} selected. I am ready to help.`,
  });
}

function applyOutfitStyle(style) {
  const nextStyle = style || "default";
  if (state.robotVariant === "female" && Object.prototype.hasOwnProperty.call(aubiraOutfitImages, nextStyle)) {
    state.currentAubiraOutfit = nextStyle;
  } else {
    state.currentOutfit = nextStyle;
  }

  state.activeOutfitBranch = "";
  renderRobotAppearance();
}

function setCustomizeMenu(open) {
  state.customizeMenuOpen = Boolean(open);
  if (!state.customizeMenuOpen) {
    state.activeOutfitBranch = "";
  }
  customizeToolButtons?.classList.toggle("menu-open", state.customizeMenuOpen);
  customizeToolToggle?.setAttribute("aria-expanded", state.customizeMenuOpen ? "true" : "false");
  syncCustomizeButtons();
}

function setOutfitBranch(branch = "") {
  state.activeOutfitBranch = branch;
  syncCustomizeButtons();
}

function setGameMenu(open) {
  state.gameMenuOpen = Boolean(open);
  gameToolButtons?.classList.toggle("menu-open", state.gameMenuOpen);
  gameToolToggle?.setAttribute("aria-expanded", state.gameMenuOpen ? "true" : "false");
}

function updateRewards(delta = {}) {
  state.coins += delta.coins || 0;
  state.stars += delta.stars || 0;
  state.level += delta.level || 0;
}

function normalizeSpeechText(text) {
  return text
    .replace(/\*\*/g, "")
    .replace(/`/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function splitSpeechIntoChunks(text, maxLength = 220) {
  const normalized = normalizeSpeechText(text);
  if (!normalized) {
    return [];
  }

  const sentences = normalized.match(/[^.!?]+[.!?]?/g) || [normalized];
  const chunks = [];
  let current = "";

  sentences.forEach((sentence) => {
    const next = sentence.trim();
    if (!next) {
      return;
    }

    if (!current) {
      current = next;
      return;
    }

    if (`${current} ${next}`.length <= maxLength) {
      current = `${current} ${next}`;
      return;
    }

    chunks.push(current);
    current = next;
  });

  if (current) {
    chunks.push(current);
  }

  return chunks;
}

function selectPreferredVoice(voices) {
  const rankedPatterns =
    state.robotVariant === "female"
      ? [
          /Microsoft Zira|Microsoft Aria|Microsoft Jenny|Google UK English Female|Samantha|Victoria|Karen|Hazel|Libby|Sonia/i,
          /Google US English|Google UK English/i,
          /en(-|_)?(US|GB)/i,
          /Microsoft|Google/i,
        ]
      : [
          /Microsoft Guy|Microsoft Davis|Microsoft Ryan|Google UK English Male|Daniel|Alex|Fred|Thomas|Aaron/i,
          /Google US English|Google UK English/i,
          /en(-|_)?(US|GB)/i,
          /Microsoft|Google/i,
        ];

  for (const pattern of rankedPatterns) {
    const match = voices.find((voice) => pattern.test(`${voice.name} ${voice.lang}`));
    if (match) {
      return match;
    }
  }

  return voices[0] || null;
}

function speak(text) {
  speechBubble.textContent = text;

  if (!("speechSynthesis" in window)) {
    return;
  }

  const chunks = splitSpeechIntoChunks(text);
  if (!chunks.length) {
    return;
  }

  window.speechSynthesis.cancel();
  window.speechSynthesis.resume();
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = selectPreferredVoice(voices);

  const speakChunk = (index) => {
    if (index >= chunks.length) {
      return;
    }

    const chunk = chunks[index];
    const utterance = new SpeechSynthesisUtterance(chunk);
    utterance.rate = 0.9;
    utterance.pitch = state.robotVariant === "female" ? 1 : 0.72;
    utterance.volume = 1;

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      if (index === 0) {
        speechBubble.textContent = text;
      }
    };
    utterance.onend = () => {
      speakChunk(index + 1);
    };

    window.speechSynthesis.speak(utterance);
  };

  speakChunk(0);
}

function setCompanionState({ mood, speech, status, reward }) {
  if (speech) speak(speech);
  if (reward) updateRewards(reward);
}

function renderDefaultBoard() {
  setBoardContentLayout();
  updateBoardChrome("Study Board", false);
  boardContent.innerHTML = `
    <div class="board-stack">
      <h3>Aubit Features</h3>
      <div class="pipeline-row">
        <span class="pipeline-chip">STT</span>
        <span class="pipeline-chip">AI Brain</span>
        <span class="pipeline-chip">TTS</span>
        <span class="pipeline-chip">Interactive Tutor</span>
      </div>
      <p>
        Open Study or Test to use the green board. Aubit can explain topics with
        visuals, clear step-by-step guidance, and tutor-style reinforcement.
      </p>
    </div>
  `;
}

function renderStudyTopicPrompt() {
  setBoardContentLayout();
  updateBoardChrome("Study Board", true, "Explain Python");
  boardContent.innerHTML = `
    <div class="board-stack board-chat-thread">
      ${renderBoardChatLine(
        "assistant",
        `
          <h3>What topic would you like to study?</h3>
          <p>Ask any concept and I will explain it in a green chat flow.</p>
        `,
        0,
      )}
      ${renderBoardChatLine(
        "user",
        `
          <div class="study-form chat-input-shell">
            ${renderStudyComposer()}
          </div>
        `,
        1,
      )}
    </div>
  `;
}

function renderStudyComposer(value = state.studyDraft) {
  const safeValue = escapeHtml(value);
  return `
    <div class="chat-composer">
      <input class="topic-field chat-topic-field" id="studyTopicInput" type="text" placeholder="Ask Aubit about Python, Algebra, Gravity..." value="${safeValue}" />
      <button class="chat-icon-button mic-button" type="button" data-study-action="voice-topic" aria-label="Use microphone" title="Use microphone">
        <svg class="chat-icon-svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M12 3.5a3.5 3.5 0 0 0-3.5 3.5v5a3.5 3.5 0 0 0 7 0V7A3.5 3.5 0 0 0 12 3.5Z" />
          <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0" />
          <path d="M12 18v3" />
          <path d="M8.5 21h7" />
        </svg>
      </button>
      <button class="chat-icon-button send-button" type="button" data-study-action="start-topic" aria-label="Send topic" title="Send topic">
        <svg class="chat-icon-svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M3 20.5L21 12 3 3.5l2.7 7.5 7.8 1-7.8 1L3 20.5Z" />
        </svg>
      </button>
    </div>
  `;
}

function buildYoutubeArea(topic) {
  const embed = youtubeEmbeds[topicKey(topic)];
  if (embed) {
    return `
      <div class="video-slot">
        <iframe src="${embed}" title="YouTube study support for ${topic}" allowfullscreen loading="lazy"></iframe>
      </div>
    `;
  }

  const query = encodeURIComponent(`${topic} explained for beginners`);
  return `
    <div class="video-slot">
      <div class="video-placeholder">
        <div>
          <strong>YouTube Tutor Support</strong>
          <p>Open a topic-specific video search to make the concept clearer.</p>
          <div class="video-links">
            <a class="video-link" href="https://www.youtube.com/results?search_query=${query}" target="_blank" rel="noopener noreferrer">Open YouTube Search</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

function buildImageSearchLink(topic) {
  const query = encodeURIComponent(`${topic} concept diagram`);
  return `https://www.google.com/search?tbm=isch&q=${query}`;
}

function buildVisualCardSvg(topic, label, accent) {
  const safeTopic = topic.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const safeLabel = label.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 360">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0f2f22"/>
          <stop offset="100%" stop-color="#153f2d"/>
        </linearGradient>
      </defs>
      <rect width="600" height="360" rx="28" fill="url(#bg)"/>
      <circle cx="120" cy="90" r="54" fill="${accent}" opacity="0.18"/>
      <circle cx="470" cy="250" r="76" fill="${accent}" opacity="0.14"/>
      <rect x="54" y="64" width="492" height="232" rx="24" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.18)"/>
      <text x="76" y="118" fill="#ecfff5" font-size="20" font-family="Arial, sans-serif" opacity="0.72">${safeLabel}</text>
      <text x="76" y="176" fill="#ecfff5" font-size="38" font-family="Arial, sans-serif" font-weight="700">${safeTopic}</text>
      <line x1="78" y1="208" x2="522" y2="208" stroke="${accent}" stroke-width="10" stroke-linecap="round" opacity="0.75"/>
      <circle cx="156" cy="208" r="18" fill="${accent}"/>
      <circle cx="300" cy="208" r="18" fill="${accent}"/>
      <circle cx="444" cy="208" r="18" fill="${accent}"/>
      <text x="116" y="258" fill="#ecfff5" font-size="16" font-family="Arial, sans-serif">Concept</text>
      <text x="268" y="258" fill="#ecfff5" font-size="16" font-family="Arial, sans-serif">Example</text>
      <text x="417" y="258" fill="#ecfff5" font-size="16" font-family="Arial, sans-serif">Review</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function buildStudyExplanation(topic) {
  return [
    `${topic} is introduced in simple language first so the learner gets the main idea before details.`,
    `Aubit then adds one worked example, one visual explanation, and one quick check question.`,
    `At the end, Aubit reinforces the concept with a short recap and guided follow-up.`,
  ];
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderBoardChatLine(role, bodyMarkup, order = 0) {
  const isUser = role === "user";
  const roleClass = isUser ? "chat-line-user" : "chat-line-assistant";
  const roleLabel = isUser ? "You" : "Aubit";
  return `
    <div class="chat-line ${roleClass}" style="--chat-order: ${order};">
      <div class="chat-bubble">
        <span class="chat-role">${roleLabel}</span>
        ${bodyMarkup}
      </div>
    </div>
  `;
}

function renderBoardTypingLine(label = "Aubit is thinking...", order = 0) {
  return renderBoardChatLine(
    "assistant",
    `
      <div class="chat-typing-row" aria-hidden="true">
        <span class="chat-typing-dot"></span>
        <span class="chat-typing-dot"></span>
        <span class="chat-typing-dot"></span>
      </div>
      <p class="chat-typing-label">${escapeHtml(label)}</p>
    `,
    order,
  );
}

function formatStudyAnswer(text) {
  const source = (text || "").trim();
  if (!source) {
    return "";
  }

  const blocks = source
    .replace(/\r/g, "")
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  return blocks
    .map((block) => {
      const lines = block
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      const isList = lines.length > 1 && lines.every((line) => /^(?:[-*]|\u2022|\d+[.)])\s*/.test(line));
      if (isList) {
        const items = lines
          .map((line) => line.replace(/^(?:[-*]|\u2022|\d+[.)])\s*/, ""))
          .map((line) => `<li>${escapeHtml(line)}</li>`)
          .join("");
        return `<ul class="study-answer-list">${items}</ul>`;
      }

      return `<p class="study-answer-paragraph">${escapeHtml(block)}</p>`;
    })
    .join("");
}

function autoScrollStudyBoard() {
  requestAnimationFrame(() => {
    const answerCard = boardContent.querySelector(".study-answer-card");
    if (!answerCard) {
      boardContent.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const cardTop = answerCard.offsetTop - 12;
    const cardBottom = cardTop + answerCard.offsetHeight;
    const viewTop = boardContent.scrollTop;
    const viewBottom = viewTop + boardContent.clientHeight;

    if (cardTop < viewTop || cardBottom > viewBottom) {
      boardContent.scrollTo({ top: Math.max(cardTop, 0), behavior: "smooth" });
    }
  });
}

function renderBackendUnavailableBoard(boardLabel = "Study Board", topic = "") {
  const safeTopic = escapeHtml((topic || state.currentTopic || "").trim());
  const safeBoardLabel = escapeHtml(boardLabel);
  const isStudyBoard = boardLabel === "Study Board";

  setBoardContentLayout();
  updateBoardChrome(boardLabel, isStudyBoard, "Explain Python");
  boardContent.innerHTML = `
    <div class="board-stack board-chat-thread">
      ${
        safeTopic
          ? renderBoardChatLine(
              "user",
              `
                <p class="chat-topic-label">Topic</p>
                <h3>${safeTopic}</h3>
              `,
              0,
            )
          : ""
      }
      ${renderBoardChatLine(
        "assistant",
        `
          <div class="backend-alert-card">
            <div class="backend-alert-copy">
              <h3>${safeBoardLabel}</h3>
              ${safeTopic ? `<p>Topic: ${safeTopic}</p>` : `<p>The backend AI request did not complete.</p>`}
              <p class="backend-alert-line">Please send request to backend server</p>
            </div>
            <div class="backend-alert-image-wrap">
              <img
                class="backend-alert-image"
                src="./src/assets/backend-request-guide.png"
                alt="Backend request reminder"
                loading="lazy"
              />
            </div>
          </div>
        `,
        safeTopic ? 1 : 0,
      )}
      ${
        isStudyBoard
          ? renderBoardChatLine(
              "user",
              `
                <div class="study-form chat-input-shell">
                  ${renderStudyComposer()}
                </div>
              `,
              safeTopic ? 2 : 1,
            )
          : ""
      }
    </div>
  `;
  autoScrollStudyBoard();
}

function renderStudyBoard(topic, aiData = null) {
  state.currentTopic = topic;
  state.studiedTopic = topic;
  updateBoardChrome("Study Board", true, "Explain Python");
  const explanationSteps = aiData?.steps?.length === 3 ? aiData.steps : buildStudyExplanation(topic);
  const safeTopic = escapeHtml(topic);
  const safeSteps = explanationSteps.map((step) => escapeHtml(step));
  const fullAnswer = aiData?.response ? formatStudyAnswer(aiData.response) : "";
  boardContent.innerHTML = `
    <div class="board-stack board-chat-thread">
      ${renderBoardChatLine(
        "user",
        `
          <p class="chat-topic-label">Study topic</p>
          <h3>${safeTopic}</h3>
        `,
        0,
      )}
      ${renderBoardChatLine(
        "assistant",
        `
          <p>
            Aubit explains ${safeTopic} with STT to AI Brain to TTS flow, step-by-step
            breakdown, interactive visuals, and tutor-style reinforcement.
          </p>
        `,
        1,
      )}
      ${
        fullAnswer
          ? renderBoardChatLine(
              "assistant",
              `
                <div class="study-form study-answer-card">
                  <div class="study-answer-label">Aubit</div>
                  <div class="study-answer-body">${fullAnswer}</div>
                </div>
              `,
              2,
            )
          : ""
      }
      ${renderBoardChatLine(
        "assistant",
        `
          <div class="study-form">
            <div class="visual-bullets">
              <span class="visual-caption">${safeSteps[0]}</span>
              <span class="visual-caption">${safeSteps[1]}</span>
              <span class="visual-caption">${safeSteps[2]}</span>
            </div>
          </div>
        `,
        3,
      )}
      ${renderBoardChatLine(
        "user",
        `
          <div class="study-form chat-input-shell">
            ${renderStudyComposer()}
          </div>
        `,
        4,
      )}
    </div>
  `;
  autoScrollStudyBoard();
}

function renderStudyLoading(topic) {
  state.currentTopic = topic;
  state.studiedTopic = topic;
  updateBoardChrome("Study Board", true, "Explain Python");
  const safeTopic = escapeHtml(topic);
  boardContent.innerHTML = `
    <div class="board-stack board-chat-thread">
      ${renderBoardChatLine(
        "user",
        `
          <p class="chat-topic-label">Study topic</p>
          <h3>${safeTopic}</h3>
        `,
        0,
      )}
      ${renderBoardTypingLine("Aubit is contacting the AI brain and preparing the study board.", 1)}
      ${renderBoardChatLine(
        "user",
        `
          <div class="study-form chat-input-shell">
            ${renderStudyComposer()}
          </div>
        `,
        2,
      )}
    </div>
  `;
  autoScrollStudyBoard();
}

function getStudyTopicInput() {
  return document.getElementById("studyTopicInput");
}

function syncStudyDraft() {
  const input = getStudyTopicInput();
  state.studyDraft = input?.value ?? state.studyDraft;
}

function splitResponseIntoSteps(text, topic) {
  const normalized = text
    .replace(/\r/g, "")
    .split(/\n+/)
    .map((line) => line.replace(/^[-*0-9.)\s]+/, "").trim())
    .filter(Boolean);

  if (normalized.length >= 3) {
    return normalized.slice(0, 3);
  }

  return buildStudyExplanation(topic);
}

function isDirectAnswerStudyTopic(topic) {
  const normalized = topic.trim().toLowerCase();
  if (!normalized) {
    return false;
  }

  if (/\d/.test(normalized) && /[+\-*/%=()]/.test(normalized)) {
    return true;
  }

  return /\b(arithmetic|math|mathematics|logic|calculate|calculation|solve|equation|sum|difference|product|quotient|percentage|percent|ratio|average)\b/.test(
    normalized,
  );
}

function buildStudyPrompt(topic) {
  if (isDirectAnswerStudyTopic(topic)) {
    return `Answer this arithmetic or logic question directly: ${topic}. Give the final answer first. Keep it brief and do not give a long explanation unless the user explicitly asks for one.`;
  }

  return `Teach me ${topic} simply in 3 short steps with one practical example. Start directly with the explanation and do not add any introductory phrases.`;
}

function buildSpokenStudyReply(topic, aiData) {
  if (!aiData?.response) {
    return `Starting study session for ${topic}.`;
  }

  const condensed = aiData.response.replace(/\s+/g, " ").trim();
  if (condensed.length <= 500) {
    return condensed;
  }

  return `${aiData.steps.join(" ")} That is the quick explanation for ${topic}.`;
}

async function ensureGuestSession() {
  if (state.authToken) {
    return state.authToken;
  }

  if (state.authReady) {
    return state.authReady;
  }

  const guestCredentials = {
    username: "guest_demo",
    password: "Password123",
    role: "user",
  };

  state.authReady = fetch(`${state.apiBaseUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(guestCredentials),
  })
    .then(async (response) => {
      if (response.ok) {
        return response.json();
      }

      if (response.status !== 401) {
        throw new Error(`Login failed with status ${response.status}`);
      }

      const signupResponse = await fetch(`${state.apiBaseUrl}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...guestCredentials,
          display_name: "Guest User",
        }),
      });

      if (!signupResponse.ok) {
        throw new Error(`Signup failed with status ${signupResponse.status}`);
      }

      return signupResponse.json();
    })
    .then((payload) => {
      const accessToken = payload?.data?.access_token;
      if (!accessToken) {
        throw new Error("Login response did not contain an access token");
      }
      state.authToken = accessToken;
      return accessToken;
    })
    .finally(() => {
      state.authReady = null;
    });

  return state.authReady;
}

async function requestAIResponse(prompt, context = {}, useVoice = false) {
  const accessToken = await ensureGuestSession();
  const response = await fetch(`${state.apiBaseUrl}/ai-response`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      prompt,
      use_voice: useVoice,
      context,
    }),
  });

  if (!response.ok) {
    throw new Error(`AI request failed with status ${response.status}`);
  }

  const payload = await response.json();
  const text = payload?.data?.response;
  if (!text) {
    throw new Error("AI response was empty");
  }

  return text;
}

async function requestAIStudy(topic) {
  const text = await requestAIResponse(
    buildStudyPrompt(topic),
    {
      topic,
      mode: "study",
      response_style: isDirectAnswerStudyTopic(topic) ? "direct_answer" : "teach",
    },
    false,
  );
  return {
    response: text,
    steps: splitResponseIntoSteps(text, topic),
  };
}

function readStoredAuthAccounts() {
  try {
    const raw = window.localStorage.getItem(AUTH_ACCOUNTS_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }
    return parsed;
  } catch (_error) {
    return {};
  }
}

function writeStoredAuthAccounts(accounts) {
  window.localStorage.setItem(AUTH_ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function setEntryAuthFeedback(message = "", tone = "error") {
  if (!entryAuthFeedback) {
    return;
  }

  entryAuthFeedback.textContent = message;
  entryAuthFeedback.classList.remove("is-hidden", "is-success", "is-error");
  if (!message) {
    entryAuthFeedback.classList.add("is-hidden");
    return;
  }

  entryAuthFeedback.classList.add(tone === "success" ? "is-success" : "is-error");
}

function updateCurrentUserBadge() {
  const userName = state.currentUserName.trim();
  if (!userName) {
    currentUserLabel.textContent = "";
    currentUserBadge.classList.add("is-hidden");
    return;
  }

  currentUserLabel.textContent = userName;
  currentUserBadge.classList.remove("is-hidden");
}

function setEntryAuthMode(mode = "signin") {
  entryAuthModeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.authMode === mode);
  });
  entrySignInForm?.classList.toggle("is-hidden", mode !== "signin");
  entrySignUpForm?.classList.toggle("is-hidden", mode !== "signup");
  setEntryAuthFeedback("");
}

function revealFloorGateway(displayName) {
  if (!entryAuthOverlay) {
    return;
  }

  entryAuthOverlay.classList.add("ready");
  if (floorGatewayLabel) {
    floorGatewayLabel.textContent = `Welcome ${displayName}. Tap to enter Home`;
  }
}

function completeEntryAuth() {
  state.authUnlocked = true;
  document.body.classList.remove("auth-locked");
  entryAuthOverlay?.classList.add("is-hidden");
  goHome();
  setIdleBehavior();
  setCompanionState({
    speech: `Welcome ${state.currentUserName || "back"}. You are now in the home section.`,
  });
}

function handleSignInSubmit(event) {
  event.preventDefault();

  const formData = new FormData(entrySignInForm);
  const email = normalizeEmail(formData.get("email"));
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    setEntryAuthFeedback("Enter email and password to sign in.");
    return;
  }

  const accounts = readStoredAuthAccounts();
  const account = accounts[email];
  if (!account || account.password !== password) {
    setEntryAuthFeedback("Invalid email or password.");
    return;
  }

  state.currentUserName = account.displayName || email.split("@")[0] || "User";
  window.localStorage.setItem(AUTH_LAST_USER_STORAGE_KEY, email);
  updateCurrentUserBadge();
  setEntryAuthFeedback("Sign in successful. Tap the floor device to enter home.", "success");
  revealFloorGateway(state.currentUserName);
}

function handleSignUpSubmit(event) {
  event.preventDefault();

  const formData = new FormData(entrySignUpForm);
  const displayName = String(formData.get("display_name") || "").trim();
  const email = normalizeEmail(formData.get("email"));
  const password = String(formData.get("password") || "");
  const confirmPassword = String(formData.get("confirm_password") || "");

  if (!displayName || !email || !password || !confirmPassword) {
    setEntryAuthFeedback("Fill all sign up fields before continuing.");
    return;
  }

  if (password.length < 6) {
    setEntryAuthFeedback("Password must be at least 6 characters.");
    return;
  }

  if (password !== confirmPassword) {
    setEntryAuthFeedback("Passwords do not match.");
    return;
  }

  const accounts = readStoredAuthAccounts();
  if (accounts[email]) {
    setEntryAuthFeedback("Account already exists. Use Sign In instead.");
    return;
  }

  accounts[email] = {
    displayName,
    password,
    createdAt: new Date().toISOString(),
  };
  writeStoredAuthAccounts(accounts);
  window.localStorage.setItem(AUTH_LAST_USER_STORAGE_KEY, email);

  state.currentUserName = displayName;
  updateCurrentUserBadge();
  setEntryAuthFeedback("Sign up complete. Tap the floor device to enter home.", "success");
  revealFloorGateway(displayName);
}

function initEntryAuthOverlay() {
  if (!entryAuthOverlay) {
    state.authUnlocked = true;
    document.body.classList.remove("auth-locked");
    return;
  }

  state.authUnlocked = false;
  document.body.classList.add("auth-locked");
  entryAuthOverlay.classList.remove("is-hidden", "ready");
  setEntryAuthMode("signin");

  const lastUser = window.localStorage.getItem(AUTH_LAST_USER_STORAGE_KEY) || "";
  const signInEmailField = entrySignInForm?.querySelector("input[name=\"email\"]");
  if (signInEmailField && lastUser) {
    signInEmailField.value = lastUser;
  }

  entryAuthModeButtons.forEach((button) => {
    button.addEventListener("click", () => setEntryAuthMode(button.dataset.authMode));
  });
  entrySignInForm?.addEventListener("submit", handleSignInSubmit);
  entrySignUpForm?.addEventListener("submit", handleSignUpSubmit);
  floorGatewayButton?.addEventListener("click", completeEntryAuth);
}

async function startStudySession(topic) {
  state.studyDraft = topic;
  renderStudyLoading(topic);

  try {
    const aiData = await requestAIStudy(topic);
    renderStudyBoard(topic, aiData);
    setCompanionState({
      speech: buildSpokenStudyReply(topic, aiData),
      reward: { coins: 4 },
    });
  } catch (_error) {
    renderBackendUnavailableBoard("Study Board", topic);
    setCompanionState({
      speech: `I could not reach the backend AI for ${topic}. Please send request to backend server.`,
    });
  }
}

function extractPromptAfterWakePhrase(transcript) {
  const match = transcript.match(/hello aubit[\s,:-]*(.*)/i);
  return match ? match[1].trim() : "";
}

function handleVoiceCommand(prompt) {
  const normalized = prompt.toLowerCase();

  if (normalized.includes("study")) {
    activatePanel("study");
    return true;
  }
  if (normalized.includes("test")) {
    activatePanel("test");
    return true;
  }
  if (normalized.includes("game")) {
    activatePanel("games");
    return true;
  }
  if (normalized.includes("home")) {
    goHome();
    return true;
  }
  if (normalized.includes("dark theme")) {
    if (state.theme !== "dark") {
      toggleTheme();
    }
    return true;
  }
  if (normalized.includes("light theme")) {
    if (state.theme !== "light") {
      toggleTheme();
    }
    return true;
  }
  if (normalized.includes("tired")) {
    setCompanionState({
      mood: "Caring",
      speech: "Would you like to take a short break?",
      status: "Aubit detected fatigue-related language and suggested a restorative pause.",
    });
    return true;
  }

  return false;
}

async function handleVoicePrompt(prompt) {
  if (!prompt || state.voiceBusy) {
    return;
  }

  state.voiceBusy = true;
  speechBubble.textContent = `You said: ${prompt}`;

  try {
    const aiText = await requestAIResponse(prompt, { mode: "voice", topic: "voice assistant" }, true);
    setCompanionState({
      mood: "Responsive",
      speech: aiText,
      status: "Aubit answered a spoken prompt through the backend AI brain.",
    });
  } catch (_error) {
    if (state.currentPanel === "study") {
      renderBackendUnavailableBoard("Study Board", state.studyDraft || prompt);
    } else if (state.currentPanel === "test") {
      renderBackendUnavailableBoard("Test Board", state.testTopic || state.currentTopic || prompt);
    }
    setCompanionState({
      mood: "Fallback",
      speech: "I could not reach the backend AI right now. Please send request to backend server.",
      status: "Voice prompt failed because the backend AI request did not complete.",
    });
  } finally {
    state.voiceBusy = false;
    state.voiceWakeActive = false;
  }
}

function renderTestPrompt() {
  setBoardContentLayout();
  updateBoardChrome("Test Board", false);
  const safeStudiedTopic = escapeHtml(state.studiedTopic);
  if (state.studiedTopic) {
    boardContent.innerHTML = `
      <div class="board-stack board-chat-thread">
        ${renderBoardChatLine(
          "assistant",
          `
            <h3>Test Section</h3>
            <p>Would you like to give MCQ test based on your learning from study section?</p>
          `,
          0,
        )}
        ${renderBoardChatLine(
          "user",
          `
            <p class="chat-topic-label">Studied topic</p>
            <p>${safeStudiedTopic}</p>
          `,
          1,
        )}
        ${renderBoardChatLine(
          "assistant",
          `
            <div class="test-choice-row">
              <button class="test-option primary" data-test-action="yes">Yes</button>
              <button class="test-option secondary" data-test-action="no">No</button>
            </div>
          `,
          2,
        )}
      </div>
    `;
    return;
  }

  boardContent.innerHTML = `
    <div class="board-stack board-chat-thread">
      ${renderBoardChatLine(
        "assistant",
        `
          <h3>Test Section</h3>
          <p>On which topic would you like to give a test today?</p>
        `,
        0,
      )}
      ${renderBoardChatLine(
        "user",
        `
          <div class="study-form chat-input-shell">
            <input class="topic-field" id="testTopicInput" type="text" placeholder="Enter a topic for your test" />
            <div class="answer-row">
              <button class="study-submit" data-test-action="topic-submit">Create Test</button>
            </div>
          </div>
        `,
        1,
      )}
    </div>
  `;
}

function renderTestBoard(topic) {
  setBoardContentLayout();
  state.currentTopic = topic;
  state.testTopic = topic;
  state.currentTestMode = "";
  state.currentTestBlueprint = null;
  const safeTopic = escapeHtml(topic);
  updateBoardChrome("Test Board", false);
  boardContent.innerHTML = `
    <div class="board-stack board-chat-thread">
      ${renderBoardChatLine(
        "user",
        `
          <p class="chat-topic-label">Test topic</p>
          <h3>${safeTopic}</h3>
        `,
        0,
      )}
      ${renderBoardChatLine(
        "assistant",
        `
          <p>Choose the kind of test you want Aubit to prepare right now.</p>
          <div class="test-card">
            <strong>MCQ Test</strong>
            <span>Aubit can first open an MCQ flow based on your study learning.</span>
          </div>
          <div class="test-choice-row">
            <button class="test-option primary" data-test-mode="mcq">MCQ</button>
            <button class="test-option secondary" data-test-mode="numerical">Numerical Type</button>
          </div>
        `,
        1,
      )}
    </div>
  `;
  autoScrollStudyBoard();
}

function pickTestVariant(variants, previousPrompt = "") {
  if (!variants.length) {
    return null;
  }

  const filtered = variants.filter((variant) => variant.prompt !== previousPrompt);
  const pool = filtered.length ? filtered : variants;
  return pool[Math.floor(Math.random() * pool.length)];
}

function buildMcqVariants(topic) {
  const safeTopic = topic || "General Topic";
  const lowerTopic = safeTopic.toLowerCase();

  if (lowerTopic.includes("python")) {
    return [
      {
        prompt: "Which statement about Python is correct?",
        correct: "Python is commonly used for scripting, web apps, automation, and data work.",
        distractors: [
          "Python only works for building mobile apps and nothing else.",
          "Python cannot be used to automate repetitive tasks.",
          "Python code must always be compiled manually before it can run.",
        ],
      },
      {
        prompt: "What is a good beginner-friendly way to understand Python variables?",
        correct: "A variable is a named place to store a value that your program can use later.",
        distractors: [
          "A variable is a fixed keyword that can never change.",
          "A variable is only used to draw graphics on the screen.",
          "A variable means the program has an error.",
        ],
      },
      {
        prompt: "Why do people often choose Python for beginners?",
        correct: "Its readable syntax makes it easier to learn basic programming ideas.",
        distractors: [
          "It has no rules, so any text automatically becomes working code.",
          "It is only for experts working on hardware drivers.",
          "It cannot be used outside the classroom.",
        ],
      },
    ];
  }

  if (lowerTopic.includes("gravity")) {
    return [
      {
        prompt: "Which statement best describes gravity?",
        correct: "Gravity is the force that pulls objects toward each other.",
        distractors: [
          "Gravity only works on planets and not on everyday objects.",
          "Gravity pushes everything upward away from Earth.",
          "Gravity is a source of light energy.",
        ],
      },
      {
        prompt: "Why do objects fall to the ground on Earth?",
        correct: "Earth's gravity pulls them downward.",
        distractors: [
          "Because air always pushes them down.",
          "Because objects choose to move downward.",
          "Because motion can only happen vertically.",
        ],
      },
      {
        prompt: "How does gravity affect the Moon?",
        correct: "Gravity helps keep the Moon in orbit around Earth.",
        distractors: [
          "Gravity makes the Moon stop moving completely.",
          "Gravity pushes the Moon farther away every second.",
          "Gravity only affects stars, not moons.",
        ],
      },
    ];
  }

  if (lowerTopic.includes("algebra")) {
    return [
      {
        prompt: "What is the main purpose of algebra?",
        correct: "Algebra uses symbols and variables to represent and solve relationships.",
        distractors: [
          "Algebra is only about memorizing multiplication tables.",
          "Algebra means drawing geometric figures only.",
          "Algebra avoids the use of numbers entirely.",
        ],
      },
      {
        prompt: "What does a variable usually represent in algebra?",
        correct: "An unknown or changeable value.",
        distractors: [
          "A shape with four equal sides.",
          "A number that can never be used in equations.",
          "A calculation symbol like plus or minus.",
        ],
      },
      {
        prompt: "Why are equations useful in algebra?",
        correct: "They help describe relationships and find unknown values.",
        distractors: [
          "They make every problem impossible to solve.",
          "They are only used for naming numbers.",
          "They replace the need for logic in math.",
        ],
      },
    ];
  }

  return [
    {
      prompt: `Which statement best describes ${safeTopic}?`,
      correct: `${safeTopic} can be understood by identifying the core idea and one practical use.`,
      distractors: [
        `${safeTopic} only matters if every definition is memorized word for word.`,
        `${safeTopic} cannot be learned through examples or practice.`,
        `${safeTopic} has no useful connection to real situations.`,
      ],
    },
    {
      prompt: `What is a useful way to learn ${safeTopic}?`,
      correct: `Break ${safeTopic} into small ideas, then connect each idea to an example.`,
      distractors: [
        `Avoid examples because they make ${safeTopic} harder to understand.`,
        `Only memorize terms and skip understanding.`,
        `Learn ${safeTopic} by ignoring how the ideas connect.`,
      ],
    },
    {
      prompt: `Why is ${safeTopic} worth studying?`,
      correct: `${safeTopic} becomes clearer when you connect the concept to how it is used.`,
      distractors: [
        `${safeTopic} should only be studied without asking questions.`,
        `${safeTopic} has no patterns, structure, or practical value.`,
        `${safeTopic} cannot be improved through step-by-step learning.`,
      ],
    },
  ];
}

function getTestBlueprint(topic, mode) {
  const safeTopic = topic || "General Topic";
  const previousPrompt = state.currentTestBlueprint?.prompt || "";
  const lowerTopic = safeTopic.toLowerCase();

  const numericalVariants = lowerTopic.includes("percent")
    ? [
        { prompt: "Find 25% of 200.", answer: "50" },
        { prompt: "Find 10% of 450.", answer: "45" },
        { prompt: "Find 15% of 120.", answer: "18" },
        { prompt: "Find 50% of 86.", answer: "43" },
      ]
    : [
        { prompt: "If a learner solves 12 questions and then solves 8 more, how many questions are solved in total?", answer: "20" },
        { prompt: "A student reads 14 pages in the morning and 9 pages in the evening. How many pages are read in total?", answer: "23" },
        { prompt: "There are 36 pencils in a box. If 11 are used, how many pencils remain?", answer: "25" },
        { prompt: "A class has 7 rows with 6 desks in each row. How many desks are there altogether?", answer: "42" },
        { prompt: "A game awards 9 coins each round. After 5 rounds, how many coins are earned?", answer: "45" },
      ];

  const mcqVariant = pickTestVariant(buildMcqVariants(safeTopic), previousPrompt);
  const mcqOptions = shuffleArray([
    { text: mcqVariant.correct, correct: true },
    ...mcqVariant.distractors.map((text) => ({ text, correct: false })),
  ]);

  const library = {
    mcq: {
      title: "MCQ Test",
      prompt: mcqVariant.prompt,
      options: mcqOptions.map((option) => option.text),
      answer: String(mcqOptions.findIndex((option) => option.correct)),
    },
    numerical: {
      title: "Numerical Type Test",
      ...pickTestVariant(numericalVariants, previousPrompt),
      placeholder: "Type a number",
    },
    word: {
      title: "Word Type Test",
      prompt: `In one short sentence, explain ${safeTopic}.`,
      answer: "",
      placeholder: "Type your answer in words",
    },
  };

  return library[mode];
}

function renderTestModeBoard(topic, mode) {
  const blueprint = getTestBlueprint(topic, mode);
  if (!blueprint) {
    return;
  }

  state.currentTopic = topic;
  state.testTopic = topic;
  state.currentTestMode = mode;
  state.currentTestBlueprint = blueprint;

  const modeLabels = {
    mcq: "MCQ",
    numerical: "Numerical Type",
    word: "Word Type",
  };
  const safeTopic = escapeHtml(topic);
  const safeModeLabel = escapeHtml(modeLabels[mode] || "Test");
  const safePrompt = escapeHtml(blueprint.prompt);
  const safeTitle = escapeHtml(blueprint.title);

  const answerMarkup =
    mode === "mcq"
      ? `
      <div class="test-option-list">
        ${blueprint.options
          .map(
            (option, index) => `
          <button class="test-answer-button" data-test-answer="${index}">${escapeHtml(option)}</button>
        `,
          )
          .join("")}
      </div>
    `
      : `
      <div class="test-answer-entry">
        <input class="topic-field" id="testAnswerInput" type="text" placeholder="${escapeHtml(blueprint.placeholder)}" />
        <button class="study-submit" data-test-action="submit-answer">Submit Answer</button>
      </div>
    `;

  boardContent.innerHTML = `
    <div class="board-stack board-chat-thread">
      ${renderBoardChatLine(
        "user",
        `
          <p class="chat-topic-label">Test mode</p>
          <h3>${safeModeLabel} Test: ${safeTopic}</h3>
        `,
        0,
      )}
      ${renderBoardChatLine(
        "assistant",
        `
          <p>Aubit prepared a ${safeModeLabel.toLowerCase()} question for you.</p>
          <div class="test-card">
            <strong>${safeTitle}</strong>
            <p class="test-question">${safePrompt}</p>
            ${answerMarkup}
          </div>
          <div class="test-choice-row">
            <button class="test-option secondary" data-test-action="back-to-modes">Back</button>
          </div>
        `,
        1,
      )}
    </div>
  `;
  autoScrollStudyBoard();
}

function evaluateTestAnswer(mode, topic, answer) {
  const blueprint = state.currentTestBlueprint || getTestBlueprint(topic, mode);
  if (!blueprint) {
    return { correct: false, message: "I could not validate that answer." };
  }

  if (mode === "word") {
    const cleaned = answer.trim();
    if (cleaned.length >= 8) {
      return { correct: true, message: "Good. Your explanation is clear enough for a short answer." };
    }
    return { correct: false, message: "Write a slightly fuller answer in words." };
  }

  const normalizedAnswer = answer.trim().toLowerCase();
  const normalizedExpected = blueprint.answer.trim().toLowerCase();
  const correct = normalizedAnswer === normalizedExpected;

  return correct
    ? { correct: true, message: "Correct answer." }
    : { correct: false, message: `Not quite. The correct answer is ${blueprint.answer}.` };
}

function renderGamesBoard() {
  state.activeGame = "";
  syncPanelPresentation();
  updateBoardChrome("Game Hub", false);
  setBoardContentLayout();
  boardContent.innerHTML = `
    <div class="games-board">
      <div class="games-board-copy">
        <h3>Game Hub</h3>
        <p>Use the controller beside Aubit to open a game inside this board.</p>
      </div>
    </div>
  `;
  autoScrollStudyBoard();
}

function renderEmbeddedGame(game) {
  const gameConfig = {
    sudoku: {
      title: "Sudoku",
      src: "./sudoku.html?embed=1",
    },
    "snake-ladder": {
      title: "Snake and Ladder",
      src: "./snake-and-ladder.html?embed=1",
    },
    chess: {
      title: "Chess",
      src: "./chess.html?embed=1",
    },
    monopoly: {
      title: "Monopoly",
      src: "./monopoly.html?embed=1",
    },
  }[game];

  if (!gameConfig) {
    return;
  }

  state.activeGame = game;
  syncPanelPresentation();
  updateBoardChrome(gameConfig.title, false);
  setBoardContentLayout("game-embed");
  boardContent.innerHTML = `
    <div class="game-embed-card">
      <iframe
        class="game-embed-frame"
        src="${gameConfig.src}"
        title="${gameConfig.title}"
        loading="lazy"
      ></iframe>
    </div>
  `;
  autoScrollStudyBoard();
}

function updateBoard(topicKey) {
  const topic = boardTopics[topicKey];
  if (!topic) return;

  if (topicKey === "study") {
    renderStudyTopicPrompt();
    return;
  }

  if (topicKey === "test") {
    renderTestPrompt();
    return;
  }

  if (topicKey === "games") {
    renderGamesBoard();
    return;
  }

  boardContent.innerHTML = `
    <h3>${topic.title}</h3>
    <p>${topic.copy}</p>
  `;
}

function applyTheme(theme) {
  state.theme = theme;
  appShell.dataset.theme = theme;
  focusLampButton.classList.toggle("theme-on", theme === "dark");
  applyRoomBackdrop();
}

function launchGame(game) {
  if (!game) return;

  const url = gameLinks[game];
  if (url) {
    if (url.startsWith("./")) {
      window.location.href = url;
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  }
}

function shouldShowBoard(panel) {
  return panel === "study" || panel === "test" || (panel === "games" && Boolean(state.activeGame));
}

function syncPanelPresentation() {
  const showBoard = shouldShowBoard(state.currentPanel);
  appShell.dataset.panel = state.currentPanel || "default";
  studyBoard.dataset.boardMode = state.activeGame ? "game-player" : state.currentPanel || "default";
  studyBoard.classList.toggle("is-hidden", !showBoard);
  companionStage.classList.toggle("panel-focus", showBoard);
  companionStage.classList.toggle("game-player", state.currentPanel === "games" && Boolean(state.activeGame));
  customizeToolButtons?.classList.toggle("is-hidden", state.currentPanel !== "customize");
  gameToolButtons?.classList.toggle("is-hidden", state.currentPanel !== "games");
  if (state.currentPanel !== "customize") {
    setCustomizeMenu(false);
  }
  if (state.currentPanel !== "games") {
    setGameMenu(false);
  }
}

function toggleTheme() {
  const nextTheme = state.theme === "light" ? "dark" : "light";
  applyTheme(nextTheme);
  setCompanionState({
    speech:
      nextTheme === "dark"
        ? "Dark theme enabled. I have dimmed the room for a calmer focus mode."
        : "Light theme enabled. The room is bright again.",
  });
}

function activatePanel(target) {
  const isToggleOff = target === state.currentPanel;
  const nextPanel = isToggleOff ? "" : target;

  setRobotMenu(false);
  state.currentPanel = nextPanel;
  if (nextPanel !== "games") {
    state.activeGame = "";
  }
  applyRoomBackdrop();
  document.querySelectorAll(".panel-card").forEach((card) => {
    card.classList.toggle("active", card.dataset.panel === nextPanel);
  });
  syncPanelPresentation();

  if (nextPanel) {
    updateBoard(nextPanel);
  } else {
    renderDefaultBoard();
  }

  const companionLines = {
    study: "Tell me the topic you want to study today. I can explain it with visuals and step-by-step guidance.",
    test: state.studiedTopic
      ? "Would you like to give MCQ test based on your learning from study section?"
      : "On which topic would you like to give a test today?",
    games: "Let us play something light and rewarding. Sudoku, Snake and Ladder, Chess, or Monopoly?",
    customize: "choose an outfit for me to look better",
    settings: "You can keep me as a desktop widget or open the full companion world.",
  };

  if (nextPanel) {
    setCompanionState({
      mood: nextPanel === "games" ? "Bright Companion" : "Calm Mentor",
      speech: companionLines[nextPanel],
      status: `Aubit switched to ${nextPanel} mode and updated the room behavior profile.`,
    });
  } else {
    setCompanionState({
      speech: "Panel closed. I am back in the default room position.",
    });
  }
}

function triggerIntro(forceOpen = false) {
  introOverlay.classList.add("active");
  introOverlay.hidden = false;
  if (forceOpen) {
    introCaption.classList.remove("is-hidden");
    clickHint.textContent = `Tap the pod to open ${getRobotProfile().name}`;
  }
}

function closeIntro() {
  introOverlay.classList.remove("active");
  introOverlay.hidden = true;
}

function openPhotoViewer(sourceImage) {
  if (sourceImage?.src && photoViewerImage) {
    photoViewerImage.src = sourceImage.src;
  }

  if (photoViewerImage) {
    const altBase = sourceImage?.alt || "Aubit image";
    photoViewerImage.alt = `${altBase} enlarged view`;
  }

  photoViewer?.classList.add("open");
}

function closePhotoViewer() {
  photoViewer?.classList.remove("open");
}

function backToHomeFromPhotoViewer() {
  closePhotoViewer();
  if (state.currentPanel) {
    goHome();
  }
}

function goHome() {
  closeIntro();
  activatePanel("");
}

function openPod() {
  closeIntro();
  state.introPlayed = true;
  setCompanionState({
    mood: "Awake and Caring",
    speech: `Hi, I'm ${getRobotProfile().name}. What can I do for you?`,
    status: "Aubit opened directly into the main companion experience.",
    reward: { stars: 2 },
  });
}

function initVoiceRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    setCompanionState({
      mood: "Listening Unavailable",
      speech: "Voice recognition is not available in this browser. Click the buttons to explore the experience.",
      status: "SpeechRecognition API was not found. The UI remains functional without live voice input.",
    });
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onresult = async (event) => {
    if (state.voiceInputMode === "study") {
      const input = getStudyTopicInput();
      if (!input) {
        state.voiceInputMode = "";
        return;
      }

      let transcript = "";
      for (let index = 0; index < event.results.length; index += 1) {
        transcript += `${event.results[index][0].transcript} `;
      }

      input.value = transcript.trim();
      state.studyDraft = input.value;

      const latestResult = event.results[event.results.length - 1];
      if (latestResult?.isFinal) {
        state.voiceInputMode = "";
        try {
          recognition.stop();
        } catch (_error) {
        }
        setCompanionState({
          speech: "I captured your topic. Press send when you are ready.",
        });
      }
      return;
    }

    for (let index = event.resultIndex; index < event.results.length; index += 1) {
      const result = event.results[index];
      const transcript = result[0].transcript.trim();

      if (!transcript || !result.isFinal) {
        continue;
      }

      const normalized = transcript.toLowerCase();
      if (normalized.includes("hello aubit")) {
        const inlinePrompt = extractPromptAfterWakePhrase(transcript);
        state.voiceWakeActive = true;
        setCompanionState({
          mood: "Attentive",
          speech: inlinePrompt ? `I heard you. Working on ${inlinePrompt}.` : "I am listening. Tell me what you need.",
          status: "Wake phrase detected. Aubit is now in active listening mode.",
        });

        if (inlinePrompt) {
          if (!handleVoiceCommand(inlinePrompt)) {
            await handleVoicePrompt(inlinePrompt);
          } else {
            state.voiceWakeActive = false;
          }
        }
        continue;
      }

      if (!state.voiceWakeActive) {
        continue;
      }

      if (!handleVoiceCommand(transcript)) {
        await handleVoicePrompt(transcript);
      } else {
        state.voiceWakeActive = false;
      }
    }
  };

  recognition.onerror = () => {
  };

  return recognition;
}

function startListening(options = {}) {
  if (!state.recognition) {
    state.recognition = initVoiceRecognition();
  }

  if (!state.recognition) return;

  state.voiceInputMode = options.target || "";
  state.recognition.continuous = options.target === "study" ? false : true;
  state.recognition.interimResults = true;

  try {
    state.recognition.start();
    setCompanionState({
      mood: "Listening",
      speech:
        options.target === "study"
          ? "Listening for your study topic."
          : "Listening softly. Say hello Aubit when you are ready.",
      status:
        options.target === "study"
          ? "Microphone session started for study topic dictation."
          : "Microphone session started. Aubit is waiting for the wake phrase.",
    });
  } catch (_error) {
    try {
      state.recognition.stop();
    } catch (_innerError) {
    }
    window.setTimeout(() => {
      try {
        state.recognition.start();
      } catch (_finalError) {
        speak("Voice input is already active.");
      }
    }, 120);
  }
}

function clearIdleTimers() {
  window.clearTimeout(state.idleTimer);
  window.clearTimeout(state.sleepTimer);
  state.idleTimer = null;
  state.sleepTimer = null;
}

function clearWakeSequenceTimers() {
  window.clearTimeout(state.wakeStageTimer);
  window.clearTimeout(state.wakeCompleteTimer);
  state.wakeStageTimer = null;
  state.wakeCompleteTimer = null;
}

function setAvatarExpressionState(nextState = "awake") {
  state.avatarState = nextState;
  [aubitAvatar, introAubit].filter(Boolean).forEach((avatar) => {
    avatar.classList.toggle("is-idle", nextState === "idle");
    avatar.classList.toggle("is-sleeping", nextState === "sleeping");
    avatar.classList.toggle("is-waking", nextState === "waking");
    avatar.classList.toggle("is-looking-around", nextState === "looking-around");
  });
}

function enterSleepMode() {
  if (!state.authUnlocked || state.avatarState === "sleeping") {
    return;
  }

  clearIdleTimers();
  clearWakeSequenceTimers();
  resetPointerTracking();
  setRobotMenu(false);
  setAvatarExpressionState("sleeping");
  speechBubble.textContent = `${getRobotProfile().name} is sleeping. Click to wake up.`;
}

function startWakeSequence() {
  if (!state.authUnlocked || state.avatarState === "waking" || state.avatarState === "looking-around") {
    return;
  }

  clearIdleTimers();
  clearWakeSequenceTimers();
  resetPointerTracking();
  setRobotMenu(false);
  setAvatarExpressionState("waking");
  speechBubble.textContent = `${getRobotProfile().name} is waking up...`;

  state.wakeStageTimer = window.setTimeout(() => {
    setAvatarExpressionState("looking-around");
    speechBubble.textContent = `${getRobotProfile().name} is looking around.`;
  }, 640);

  state.wakeCompleteTimer = window.setTimeout(() => {
    resetPointerTracking();
    setAvatarExpressionState("awake");
    setCompanionState({
      mood: "Awake and Ready",
      speech: "How can I help you?",
      status: `${getRobotProfile().name} woke up, looked around, and returned to the front.`,
    });
    setIdleBehavior();
  }, 2200);
}

function setIdleBehavior() {
  if (!state.authUnlocked) {
    clearIdleTimers();
    clearWakeSequenceTimers();
    return;
  }

  clearIdleTimers();
  if (state.avatarState === "sleeping" || state.avatarState === "waking" || state.avatarState === "looking-around") {
    return;
  }

  setAvatarExpressionState("awake");
  resetPointerTracking();
  state.idleTimer = window.setTimeout(() => {
    if (state.avatarState !== "awake") {
      return;
    }

    setAvatarExpressionState("idle");
    speechBubble.textContent = `${getRobotProfile().name} is quietly on standby.`;
  }, 18000);

  state.sleepTimer = window.setTimeout(() => {
    enterSleepMode();
  }, 30000);
}

function trackPointer(event) {
  if (
    !state.authUnlocked ||
    state.compactMode ||
    introOverlay.classList.contains("active") ||
    state.avatarState === "sleeping" ||
    state.avatarState === "waking" ||
    state.avatarState === "looking-around"
  ) {
    return;
  }

  const rect = aubitAvatar.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const deltaX = (event.clientX - centerX) / rect.width;
  const deltaY = (event.clientY - centerY) / rect.height;
  const rotateY = Math.max(-9, Math.min(9, deltaX * 18));
  const rotateX = Math.max(-6, Math.min(6, deltaY * -14));
  const moveX = Math.max(-12, Math.min(12, deltaX * 24));
  const moveY = Math.max(-10, Math.min(10, deltaY * 20));

  aubitAvatar.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  speechBubble.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
}

function resetPointerTracking() {
  aubitAvatar.style.transform = "";
  speechBubble.style.transform = "";
}

document.getElementById("listenButton").addEventListener("click", startListening);
document.getElementById("homeButton").addEventListener("click", goHome);
document.getElementById("widgetWakeButton").addEventListener("click", () => {
  openPod();
  startListening();
});
introPod.addEventListener("click", openPod);
homePhotoFrame?.addEventListener("click", () => {
  openPhotoViewer(homePhotoFrame.querySelector("img"));
});
homeWallPoster?.addEventListener("click", () => {
  openPhotoViewer(homeWallPoster.querySelector("img"));
});
photoViewerClose?.addEventListener("click", closePhotoViewer);
photoViewerBack?.addEventListener("click", backToHomeFromPhotoViewer);
photoViewer?.addEventListener("click", (event) => {
  if (event.target === photoViewer) {
    closePhotoViewer();
  }
});

widgetModeToggle.addEventListener("click", () => {
  if (isDesktopShellAvailable) {
    desktopShell.enterWidgetMode();
    return;
  }

  state.compactMode = !state.compactMode;
  appShell.classList.toggle("compact-mode", state.compactMode);
  syncWidgetModeToggleLabel();
  setCompanionState({
    mood: state.compactMode ? "Compact Assistant" : "Immersive Companion",
    speech: state.compactMode
      ? "Widget mode enabled. I will stay lightweight and close to your desktop."
      : "Full world mode enabled. The room and progression systems are now visible.",
    status: state.compactMode
      ? "Aubit is now presented as a compact desktop-style assistant."
      : "Aubit returned to the immersive room view with the full feature stack visible.",
  });
});

document.querySelectorAll(".panel-card").forEach((card) => {
  card.addEventListener("click", () => activatePanel(card.dataset.panel));
});

document.querySelectorAll(".object-card").forEach((card) => {
  card.addEventListener("click", () => {
    const reaction = reactions[card.dataset.reaction];
    if (card.dataset.reaction === "focus") {
      toggleTheme();
    }
    if (reaction) setCompanionState(reaction);
  });
});

aubitAvatar.addEventListener("click", (event) => {
  event.stopPropagation();
  if (state.avatarState === "sleeping") {
    startWakeSequence();
    return;
  }

  if (state.avatarState === "waking" || state.avatarState === "looking-around") {
    return;
  }

  setIdleBehavior();
  setRobotMenu(!state.robotMenuOpen);
});

robotChoiceMenu?.addEventListener("click", (event) => {
  const variantButton = event.target.closest("[data-robot-variant]");
  if (!variantButton) {
    return;
  }

  const variant = variantButton.dataset.robotVariant || "male";
  if (variant === state.robotVariant) {
    setRobotMenu(false);
    return;
  }

  setRobotVariant(variant);
});

window.addEventListener("click", (event) => {
  if (!state.robotMenuOpen) {
    return;
  }

  if (event.target.closest("#aubitAvatar") || event.target.closest("#robotChoiceMenu")) {
    return;
  }

  setRobotMenu(false);
});

customizeToolButtons?.addEventListener("click", (event) => {
  const toggleButton = event.target.closest("#customizeToolToggle");
  if (toggleButton) {
    setCustomizeMenu(!state.customizeMenuOpen);
    return;
  }

  const branchToggle = event.target.closest("[data-outfit-branch]");
  if (branchToggle) {
    const branch = branchToggle.dataset.outfitBranch || "";
    setOutfitBranch(state.activeOutfitBranch === branch ? "" : branch);
    return;
  }

  const outfitButton = event.target.closest("[data-outfit-style]");
  if (!outfitButton) {
    return;
  }

  const style = outfitButton.dataset.outfitStyle || "default";
  applyOutfitStyle(style);
  setCustomizeMenu(false);
  setCompanionState({
    speech:
      state.robotVariant === "female"
        ? aubiraOutfitImages[style]
          ? aubiraOutfitResponses[style] || "Aubira style applied."
          : `${outfitResponses[style] || "Outfit style saved."} Switch back to Aubit to preview that outfit.`
        : outfitResponses[style] || "Outfit style applied.",
  });
});

gameToolButtons?.addEventListener("click", (event) => {
  const toggleButton = event.target.closest("#gameToolToggle");
  if (toggleButton) {
    setGameMenu(!state.gameMenuOpen);
    return;
  }

  const gameButton = event.target.closest("[data-game]");
  if (!gameButton) {
    return;
  }

  const game = gameButton.dataset.game;
  if (!game) {
    return;
  }

  setGameMenu(false);
  renderEmbeddedGame(game);
  gameToolButtons?.querySelectorAll("[data-game]").forEach((button) => {
    button.classList.toggle("active", button.dataset.game === game);
  });
  setCompanionState({
    speech: `Opening ${getGameLabel(game)} inside the game hub.`,
    reward: { coins: 3 },
  });
});

boardActionButton.addEventListener("click", async () => {
  await startStudySession("Python");
  setCompanionState({
    mood: "Teaching",
    status: "Aubit started a study-board explanation with backend AI support when available.",
    reward: { coins: 2 },
  });
});

boardContent.addEventListener("click", async (event) => {
  const studyAction = event.target.closest("[data-study-action]");
  if (studyAction) {
    if (studyAction.dataset.studyAction === "voice-topic") {
      syncStudyDraft();
      startListening({ target: "study" });
      return;
    }

    syncStudyDraft();
    const topic = state.studyDraft.trim() || "Python";
    await startStudySession(topic);
    return;
  }

  const testAction = event.target.closest("[data-test-action]");
  if (testAction) {
    if (testAction.dataset.testAction === "yes") {
      renderTestBoard(state.studiedTopic || state.currentTopic || "General Topic");
      setCompanionState({
        speech: `Opening the test flow for ${state.studiedTopic || state.currentTopic || "your topic"}.`,
      });
      return;
    }

    if (testAction.dataset.testAction === "no") {
      activatePanel("");
      setCompanionState({
        speech: "No problem. I will keep the test section closed.",
      });
      return;
    }

    if (testAction.dataset.testAction === "topic-submit") {
      const input = document.getElementById("testTopicInput");
      const topic = input?.value.trim() || "General Topic";
      renderTestBoard(topic);
      setCompanionState({
        speech: `Preparing a test for ${topic}.`,
      });
      return;
    }

    if (testAction.dataset.testAction === "submit-answer") {
      const input = document.getElementById("testAnswerInput");
      const answer = input?.value.trim() || "";
      const result = evaluateTestAnswer(state.currentTestMode, state.testTopic || state.currentTopic, answer);
      setCompanionState({
        speech: result.message,
        reward: result.correct ? { coins: 4, stars: 1 } : { coins: 1 },
      });
      return;
    }

    if (testAction.dataset.testAction === "back-to-modes") {
      renderTestBoard(state.testTopic || state.currentTopic || "General Topic");
      setCompanionState({
        speech: "Choose another test type.",
      });
      return;
    }
  }

  const testMode = event.target.closest("[data-test-mode]");
  if (testMode) {
    const labels = {
      mcq: "MCQ test opened.",
      numerical: "Numerical type test opened.",
      word: "Word type test opened.",
    };
    renderTestModeBoard(state.testTopic || state.studiedTopic || state.currentTopic || "General Topic", testMode.dataset.testMode);
    setCompanionState({
      speech: labels[testMode.dataset.testMode],
      reward: { coins: 3 },
    });
    return;
  }

  const gameAction = event.target.closest("[data-game-action]");
  if (gameAction) {
    if (gameAction.dataset.gameAction === "back-hub") {
      renderGamesBoard();
      setCompanionState({
        speech: "Back to the game hub.",
      });
    }
    return;
  }

  const testAnswer = event.target.closest("[data-test-answer]");
  if (testAnswer) {
    const result = evaluateTestAnswer(
      state.currentTestMode,
      state.testTopic || state.currentTopic,
      testAnswer.dataset.testAnswer || "",
    );
    setCompanionState({
      speech: result.message,
      reward: result.correct ? { coins: 4, stars: 1 } : { coins: 1 },
    });
    return;
  }

  const trigger = event.target.closest(".game-tile, .game-action, .level-chip, .game-link");
  if (!trigger) return;

  const game = trigger.dataset.game || trigger.closest(".game-tile")?.dataset.game;
  if (!game) return;

  if (isEmbeddedBoardGame(game) && state.currentPanel === "games") {
    event.preventDefault();
    renderEmbeddedGame(game);
    setCompanionState({
      speech: `Opening ${getGameLabel(game)} inside the game hub.`,
      reward: { coins: 3 },
    });
    return;
  }

  const gameMessages = {
    sudoku: "Launching Sudoku. Opening the puzzle board now.",
    "snake-ladder": "Launching Snake and Ladder. Setting up a two-player board now.",
    chess: "Launching Chess. Setting up the board now.",
    monopoly: "Launching Monopoly. Setting up the board now.",
  };

  setCompanionState({
    speech: gameMessages[game] || "Preparing the selected game.",
    reward: { coins: 3 },
  });

  event.preventDefault();
  launchGame(game);
});

boardContent.addEventListener("keydown", async (event) => {
  const input = event.target.closest("#studyTopicInput");
  if (!input) {
    return;
  }

  state.studyDraft = input.value;

  if (event.key !== "Enter") {
    return;
  }

  event.preventDefault();
  const topic = input.value.trim() || "Python";
  await startStudySession(topic);
});

window.addEventListener("message", (event) => {
  if (event.data?.type !== "aubit-gamehub-back" || state.currentPanel !== "games") {
    return;
  }

  renderGamesBoard();
  setCompanionState({
    speech: "Back to the game hub.",
  });
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && state.robotMenuOpen) {
    setRobotMenu(false);
  }

  if (event.key === "Escape" && photoViewer?.classList.contains("open")) {
    closePhotoViewer();
  }
});

["click", "keydown", "mousemove", "touchstart"].forEach((eventName) => {
  window.addEventListener(eventName, setIdleBehavior, { passive: true });
});

window.addEventListener("mousemove", trackPointer, { passive: true });
aubitAvatar.addEventListener("mouseleave", resetPointerTracking);

window.addEventListener("load", () => {
  state.robotVariant = readStoredRobotVariant();
  applyOutfitStyle(state.currentOutfit);
  syncWidgetModeToggleLabel();
  speechBubble.textContent = `Hi, I'm ${getRobotProfile().name}. What can I do for you?`;
  startHomeClock();
  applyTheme(state.theme);
  updateCurrentUserBadge();
  renderDefaultBoard();
  studyBoard.classList.add("is-hidden");
  closeIntro();
  initEntryAuthOverlay();
  if (state.authUnlocked) {
    setIdleBehavior();
    setCompanionState({
      speech: `Hi, I'm ${getRobotProfile().name}. What can I do for you?`,
    });
  }
});

