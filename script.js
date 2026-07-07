/**
 * GhostChat — Twitch-style fake chat simulator
 * Helps streamers practice talking while streaming with few or no viewers.
 */

/* ==========================================================================
   Data: Game franchises, sub-games, and message pools
   ========================================================================== */

/** General gaming pool — used for the General Gaming franchise and occasional mix-ins */
const GENERAL_GAMING_MESSAGES = [
  'What games do you usually play?',
  'PC or console?',
  "What's your favorite game of all time?",
  'How long have you been gaming?',
  'What game are you most excited for?',
  'What got you into gaming?',
  'Single player or multiplayer person?',
  'What headset are you using?',
  'Retro games or new releases?',
  "What's on your backlog?",
  'Co-op streams are the best',
  'Graphics or gameplay first?',
];

const GAME_FRANCHISES = {
  callOfDuty: {
    label: 'Call of Duty',
    subGames: {
      warzone: {
        label: 'Warzone',
        messages: [
          'What loadout are you running?',
          "What's your KD?",
          'Where are you dropping?',
          'Why did you rotate there?',
          'Are you playing ranked?',
          'Controller or mouse and keyboard?',
          'How many wins do you have this season?',
          'That was a nice play.',
          'Drop hot or play it safe?',
          'Push or rotate?',
          'Nice clutch!',
          'Run it back?',
        ],
      },
      blackOps7: {
        label: 'Black Ops 7',
        messages: [
          'What map is this?',
          "What's your favorite weapon?",
          'Are you grinding camos?',
          'Multiplayer or Zombies?',
          "What's your scorestreak setup?",
          'Favorite map so far?',
          'That killstreak was nasty.',
          'Zombies Easter egg tonight?',
          'Hardpoint or Search?',
          'What attachment meta are you on?',
        ],
      },
    },
  },
  battlefield: {
    label: 'Battlefield',
    subGames: {
      battlefield6: {
        label: 'Battlefield 6',
        messages: [
          "What's your favorite class?",
          'Are you playing infantry or vehicles?',
          'Are you squad leader?',
          'Favorite map so far?',
          'How many revives do you have?',
          'Assault, Medic, Engineer, or Recon?',
          'Tank or heli pilot?',
          'That squad play was clean.',
          'Conquest or Breakthrough?',
          'Who has the best gadget?',
        ],
      },
      redactedSector: {
        label: 'Redacted Sector (RedSec)',
        messages: [
          'Where are you dropping?',
          "What's your loadout?",
          'Solo, Duo, or Squad?',
          'How many wins do you have?',
          'Is this your main battle royale?',
          'Favorite weapon so far?',
          'Rotate early or late?',
          'Third party or avoid fights?',
          'That extract was close.',
          'Run the same drop every game?',
        ],
      },
    },
  },
  rainbowSix: {
    label: 'Rainbow Six',
    subGames: {
      siege: {
        label: 'Rainbow Six Siege',
        messages: [
          "Who's your favorite operator?",
          "What's your rank?",
          'Who do you usually ban?',
          'Why did you reinforce that wall?',
          'Are you solo queueing?',
          'Favorite attacking operator?',
          'Favorite defending operator?',
          'That roam was nasty.',
          'Clutch or kick?',
          'Run it back same ops?',
        ],
      },
    },
  },
  extractionShooters: {
    label: 'Extraction Shooters',
    subGames: {
      tarkov: {
        label: 'Escape From Tarkov',
        messages: [
          'Solo or squad?',
          "What's your PMC level?",
          "How's the wipe going?",
          "What's your favorite map?",
          'Did you insure that gear?',
          "What's your favorite extraction?",
          "What's your current goal this wipe?",
          'Scav or PMC run next?',
          'That raid was stressful.',
          'Labs or Streets tonight?',
        ],
      },
      arcRaiders: {
        label: 'ARC Raiders',
        messages: [
          'How are you liking ARC Raiders?',
          'Running solo or with a squad?',
          "What's your favorite weapon?",
          'Have you had a successful extraction yet?',
          "Think you'll main this game?",
          'Favorite area so far?',
          'That extraction was clutch.',
          'Loot first or fight first?',
          'What build are you running?',
          'Co-op or solo queue?',
        ],
      },
    },
  },
  rpgMmorp: {
    label: 'RPG / MMORPG',
    subGames: {
      wow: {
        label: 'World of Warcraft',
        messages: [
          'What class are you playing?',
          'Horde or Alliance?',
          "What's your main?",
          'Running raids tonight?',
          'What level is your character?',
          'Are you doing Mythics?',
          "What's your favorite expansion?",
          'DPS, tank, or healer?',
          'Any rare mounts yet?',
          'PvP or PvE stream?',
        ],
      },
      diablo4: {
        label: 'Diablo IV',
        messages: [
          'What class are you playing?',
          'Seasonal or Eternal Realm?',
          "What's your build?",
          "How's the loot today?",
          "What's your Paragon level?",
          'Favorite class this season?',
          'Farming bosses tonight?',
          'Hardcore or softcore?',
          'Any unique drops yet?',
          'Nightmare dungeons or world bosses?',
        ],
      },
    },
  },
  generalGaming: {
    label: 'General Gaming',
    subGames: null,
    messages: GENERAL_GAMING_MESSAGES,
  },
};

/* Viewer personalities — tone and style of fake chat messages */
const VIEWER_PERSONALITIES = {
  newViewer: {
    label: 'New Viewer',
    color: '#4fc3f7',
    gameModeBlend: 0.2,
    messages: [
      'First time here.',
      'How long have you been streaming?',
      'What game is this?',
      'Do you stream every day?',
      'Just found your channel.',
      'This looks fun, what are we playing?',
      'How do you have so few viewers? This is great.',
      'Subbed, this is chill.',
      'What rank is this?',
      'Is this your main game?',
      'Came from the browse page.',
      'Nice overlay, how do you set that up?',
      'Do you take song requests?',
      'What mic is that?',
      'How often do you go live?',
    ],
  },
  regularViewer: {
    label: 'Regular Viewer',
    color: '#81c784',
    gameModeBlend: 0.35,
    messages: [
      "How's the grind going?",
      'Any wins yet today?',
      'You running with the same squad?',
      'What time did you go live?',
      'Back again for the stream.',
      'Missed yesterday, how did it go?',
      'Same vibes as last time.',
      'Chat is quiet tonight huh.',
      'You warming up or ranked already?',
      'How long is the stream today?',
      'Still chasing that win?',
      'Squad online yet?',
      'Good to see you live again.',
      'Run it back like last stream?',
      'How was the queue tonight?',
    ],
  },
  competitivePlayer: {
    label: 'Competitive Player',
    color: '#ff7043',
    gameModeBlend: 0.8,
    messages: [
      "What's your sensitivity?",
      'Controller or mouse and keyboard?',
      'Why did you rotate there?',
      "What's your KD?",
      "What's your rank?",
      'Are you playing ranked?',
      'What sens do you run?',
      'Deadzone settings?',
      'What FOV do you use?',
      'Push or play zone?',
      'That was the wrong play.',
      'You should have held angle.',
      'Ranked or casual tonight?',
      'What\'s your peak rank?',
      'Meta loadout or off-meta?',
    ],
  },
  supportiveViewer: {
    label: 'Supportive Viewer',
    color: '#ce93d8',
    gameModeBlend: 0.15,
    messages: [
      'Nice shots.',
      'Good play.',
      'That was clean.',
      "You're improving.",
      'Smart push.',
      'Great comms.',
      'Love the energy tonight.',
      'You got this.',
      'Clutch potential.',
      'That aim is looking sharp.',
      'Good call.',
      'W play.',
      'Keep it up.',
      'Solid rotation.',
      'You read that perfectly.',
    ],
  },
  troll: {
    label: 'Troll',
    color: '#ef5350',
    gameModeBlend: 0.25,
    messages: [
      'Bot lobby.',
      'Lucky.',
      'Bro what was that?',
      'Chat, did you see that?',
      'No way that worked.',
      'Skill issue.',
      'My grandma plays better.',
      'Delete the game.',
      'Imagine missing that shot.',
      'NPC movement.',
      'You paid for that win?',
      'Stream snipers carrying?',
      'Camera man diff.',
      'Was that on purpose?',
      'Okay buddy.',
    ],
  },
};

/* Supplementary categories mixed in alongside game-mode messages */
const CATEGORIES = {
  personalQuestions: {
    label: 'Personal Questions',
    color: '#e040fb',
    messages: [
      'How long have you been streaming?',
      'Where are you from?',
      'What do you do when you\'re not streaming?',
      'How did you pick your username?',
      'Do you stream full time?',
      'What made you start streaming?',
      'How do you deal with nerves on camera?',
      'Any tips for new streamers?',
      'What\'s your setup like?',
      'Do you have a streaming schedule?',
      'How do you stay motivated with low viewers?',
      'What\'s the best part of streaming for you?',
      'Coffee or energy drinks?',
      'Cats or dogs?',
      'What music do you listen to?',
      'Favorite snack while gaming?',
      'How do you handle trolls?',
      'Do your friends watch your streams?',
      'What\'s your goal for this year?',
      'Ever thought about going pro?',
    ],
  },
  storytelling: {
    label: 'Storytelling Prompts',
    color: '#ffd600',
    messages: [
      'Tell us a funny story.',
      'What\'s your most embarrassing gaming moment?',
      'Ever rage quit and regret it?',
      'Best win you\'ve ever had?',
      'Worst teammate experience?',
      'Tell us about your first stream.',
      'Craziest thing that happened on stream?',
      'Ever met someone famous in a game?',
      'Funniest glitch you\'ve seen?',
      'Tell us a story from high school.',
      'What\'s the dumbest thing you\'ve done in game?',
      'Ever stayed up all night gaming?',
      'Best co-op memory?',
      'Tell us about a close call in ranked.',
      'Most wholesome moment in chat?',
      'Ever carried a random to victory?',
      'Story time about your worst lag?',
      'What\'s your luckiest moment ever?',
      'Ever accidentally leaked something live?',
      'Tell us about your gaming origin story.',
    ],
  },
  hype: {
    label: 'Hype / Reactions',
    color: '#69f0ae',
    messages: [
      'LETS GOOO',
      'Pog',
      'That was sick!',
      'W stream',
      'Sheesh 🔥',
      'No way!!!',
      'Clip that!',
      'You\'re cracked',
      'HUGE play',
      'Chat is popping off',
      'This is content right here',
      'I\'m not leaving this stream',
      'Certified W',
      'Built different',
      'That\'s insane',
      'GOAT gameplay',
      'I\'m hyped',
      'This is why I subbed',
      'Absolute cinema',
      'You make this look easy',
    ],
  },
};

/** Chance (0–1) that a non–General Gaming mode pulls from the general gaming pool */
const GENERAL_GAMING_MIX_RATE = 0.15;

/** Chance (0–1) that a message comes from enabled supplementary categories */
const SUPPLEMENTARY_MIX_RATE = 0.15;

/** Stream phase identifiers */
const STREAM_PHASE = {
  OPENING: 'opening',
  NORMAL: 'normal',
};

/** Generic greeting messages for the Opening Phase */
const OPENING_MESSAGES_GENERIC = [
  "Let's gooo!",
  "Streamer's back!",
  "We're live!",
  'What are we playing today?',
  "Yo, what's up?",
  'Made it just in time.',
  'First!',
  'Chat waking up.',
  "What's the plan today?",
  'Good to see you back.',
  'Finally live!',
  'Here we go.',
  'Notifications squad checking in.',
  'Been waiting for this.',
  'Lets get it.',
];

/** Game-specific opening messages keyed by sub-game */
const OPENING_MESSAGES_BY_SUB_GAME = {
  warzone: [
    'First game on Warzone?',
    'Ranked grind today?',
    'Where are we dropping first?',
    'Resurgence or BR tonight?',
    'Warm-up game or ranked?',
  ],
  blackOps7: [
    'Multiplayer or Zombies first?',
    'Camo grind stream?',
    'What mode are we starting on?',
    'First match of the night?',
  ],
  battlefield6: [
    'Conquest or Breakthrough today?',
    'Infantry or vehicles first?',
    'Squad up yet?',
    'First match warming up?',
  ],
  redactedSector: [
    'First drop of the stream?',
    'Solo or squad tonight?',
    'Where we landing first?',
    'Battle royale grind today?',
  ],
  siege: [
    'Ranked Siege today?',
    'Who are you playing first?',
    'Solo queue or squad today?',
    'Unranked warm-up first?',
    'What ops are we running?',
  ],
  tarkov: [
    'First raid of the stream?',
    'PMC or scav run first?',
    "How's the wipe going?",
    'Insured up for this raid?',
  ],
  arcRaiders: [
    'First extraction attempt tonight?',
    'Solo or squad for ARC?',
    'How are you liking ARC Raiders?',
    'Warming up or going straight in?',
  ],
  wow: [
    'Raids today?',
    'What character are you starting on?',
    'Mythics tonight?',
    'World content or dungeons first?',
    'Horde or Alliance stream?',
  ],
  diablo4: [
    'Boss farm tonight?',
    'Seasonal or Eternal Realm?',
    'What build are we on today?',
    'Paragon grind stream?',
    'First dungeon of the night?',
  ],
};

/** localStorage key for streamer profile persistence */
const PROFILE_STORAGE_KEY = 'ghostchat_streamer_profile';

/** localStorage key for viewer count simulator settings */
const VIEWER_SETTINGS_STORAGE_KEY = 'ghostchat_viewer_settings';

/** localStorage key for the chatter interaction toggle */
const CHATTER_INTERACTION_STORAGE_KEY = 'ghostchat_chatter_interactions';

/** Share of messages that become chatter-to-chatter replies (rolled per message) */
const CHATTER_REPLY_RATE_MIN = 0.15;
const CHATTER_REPLY_RATE_MAX = 0.25;

/** How many recent chatters we can reply to, and how many targets to cool down */
const MAX_RECENT_CHATTERS = 14;
const MAX_RECENT_REPLY_TARGETS = 5;

/** Max chat messages kept in the DOM (older ones are pruned, Twitch-style) */
const MAX_CHAT_MESSAGES = 250;

/** Distance (px) from the bottom that still counts as "following" the chat */
const AUTO_FOLLOW_THRESHOLD_PX = 60;

/**
 * Short, natural reply bodies keyed by reply type. The "@username " prefix is
 * added at generation time. `followup` powers simple New Viewer questions.
 */
const REPLY_BODIES = {
  agreement: [
    'yeah that was clean.',
    'facts.',
    'agreed.',
    'exactly this.',
    'for real.',
    'yep, same.',
    '100%.',
    'true.',
    "couldn't agree more.",
    'this right here.',
  ],
  disagreement: [
    'nah I disagree.',
    'not really though.',
    'hard disagree.',
    'eh, not sure about that.',
    'nah, wrong call.',
    'zone was the better play.',
    'he should have pushed.',
    'not buying it.',
    'idk about that one.',
    'respectfully, no.',
  ],
  joke: [
    'lmao okay.',
    'you would say that.',
    'copium detected.',
    'sure, bud.',
    'name checks out.',
    'least biased viewer.',
    'certified moment.',
    'the confidence is wild.',
    'couldnt be me.',
    'ok comedian.',
  ],
  hype: [
    'YESSS.',
    'LETS GO.',
    'so hype.',
    'W take.',
    'based.',
    'this guy gets it.',
    'POG.',
    'chat W.',
    'preach.',
    'huge.',
  ],
  troll: [
    'skill issue.',
    'okay npc.',
    'ratio.',
    'mid take.',
    'grandma take.',
    'delete this.',
    'source: trust me.',
    'lil bro spoke.',
    'and? cope.',
    'hard yikes.',
  ],
  supportive: [
    "don't listen to them, you're good.",
    'ignore the haters.',
    'well said.',
    'be nice, chat.',
    'we support you.',
    'good vibes only.',
    "you're right, keep it up.",
    'stay positive.',
    'real one.',
    'facts, respect.',
  ],
  followup: [
    'wait, what does that mean?',
    'is that good?',
    'how do you do that?',
    'can you explain?',
    'new here, what happened?',
    'why is that?',
    'is that hard?',
    'what rank is that?',
    'wait how?',
    'what game is this again?',
  ],
};

/**
 * Reply types each personality tends to use. Weighted by repetition in the
 * array. Supportive defends, trolls roast, competitive corrects strategy,
 * regulars agree/joke, new viewers ask simple follow-ups.
 */
const REPLY_TYPES_BY_PERSONALITY = {
  newViewer: ['followup', 'followup', 'agreement'],
  regularViewer: ['agreement', 'agreement', 'joke', 'hype'],
  competitivePlayer: ['disagreement', 'disagreement', 'agreement'],
  supportiveViewer: ['supportive', 'supportive', 'agreement', 'hype'],
  troll: ['troll', 'troll', 'joke', 'disagreement'],
};

/** Fallback reply-type mix for any personality without a specific mapping */
const DEFAULT_REPLY_TYPES = ['agreement', 'joke', 'hype', 'disagreement'];

const DEFAULT_VIEWER_SETTINGS = {
  enabled: true,
  startingViewers: 2,
  minViewers: 0,
  maxViewers: 25,
  growthSpeed: 'normal',
  randomFluctuation: true,
};

/** Tick delay ranges (ms) for viewer count changes by growth speed */
const VIEWER_GROWTH_DELAYS = {
  slow: [10000, 18000],
  normal: [5000, 10000],
  fast: [2500, 6000],
};

/** Minimum message interval (seconds) regardless of viewer count */
const MIN_MESSAGE_INTERVAL_SECONDS = 4;

/** Chance (0–1) that a message references the streamer profile */
const PROFILE_REFERENCE_RATE = 0.18;

/** Templates for occasional profile-aware chat lines */
const PROFILE_MESSAGE_TEMPLATES = {
  streamerName: [
    'Welcome back, {name}.',
    '{name} is live.',
    "Let's go, {name}!",
    'Good to see {name} streaming.',
    '{name} is back.',
    'Yo {name}, we live?',
  ],
  nickname: [
    '{name}, what are we playing tonight?',
    'Nice shots, {name}.',
    'Yo {name}, glad you are live.',
    '{name}, lets get it.',
    'Good to see you, {name}.',
    '{name} carrying the stream.',
  ],
  community: [
    '{community} checking in.',
    '{community} in the chat.',
    'Representing {community} tonight.',
    '{community} squad here.',
    'Shoutout to {community}.',
  ],
};

/* Username building blocks for random generation */
const USERNAME_PREFIXES = [
  'xX', 'Pro', 'Dark', 'Shadow', 'Epic', 'Lil', 'Big', 'Sir', 'Lady', 'Captain',
  'Ghost', 'Neon', 'Cyber', 'Pixel', 'Turbo', 'Mega', 'Ultra', 'Hyper', 'Cosmic', 'Nova',
  'Silent', 'Swift', 'Wild', 'Frost', 'Blaze', 'Storm', 'Iron', 'Golden', 'Lucky', 'Royal',
];

const USERNAME_CORES = [
  'Gamer', 'Ninja', 'Wolf', 'Dragon', 'Phoenix', 'Hawk', 'Viper', 'Tiger', 'Bear', 'Fox',
  'Slayer', 'Hunter', 'Knight', 'Wizard', 'Rogue', 'Sniper', 'Raider', 'Striker', 'Ranger', 'Scout',
  'Panda', 'Otter', 'Shark', 'Eagle', 'Raven', 'Cobra', 'Lynx', 'Moose', 'Duck', 'Frog',
  'Pixel', 'Byte', 'Glitch', 'Lag', 'Ping', 'Frag', 'Clutch', 'Ace', 'Boss', 'Chief',
];

const USERNAME_SUFFIXES = [
  '', '', '', '420', '69', '777', '2024', '2025', '99', '88', 'Xx', '_tv', '_gg', '_ftw',
  'Plays', 'Live', 'HD', 'Pro', 'Jr', 'Sr', 'III', 'IV',
];

/* Twitch-style username colors */
const USERNAME_COLORS = [
  '#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd',
  '#00d2d3', '#ff9f43', '#10ac84', '#ee5a24', '#c56cf0', '#18dcff',
  '#7bed9f', '#70a1ff', '#e056fd', '#f368e0', '#ff6348', '#2ed573',
];

/* ==========================================================================
   State
   ========================================================================== */

const state = {
  isRunning: false,
  intervalId: null,
  frequencySeconds: 15,
  franchise: 'callOfDuty',
  subGame: 'warzone',
  enabledCategories: new Set(Object.keys(CATEGORIES)),
  enabledPersonalities: new Set(Object.keys(VIEWER_PERSONALITIES)),
  showPersonalityLabels: true,
  streamPhase: STREAM_PHASE.OPENING,
  openingActiveMs: 0,
  phaseLastTick: null,
  openingDurationMs: 120000,
  streamerProfile: {
    name: '',
    nicknames: [],
    community: '',
  },
  viewerSettings: { ...DEFAULT_VIEWER_SETTINGS },
  currentViewers: DEFAULT_VIEWER_SETTINGS.startingViewers,
  viewerCountIntervalId: null,
  viewerSessionActive: false,
  recentMessages: [],       // Track recent messages to avoid repetition
  recentUsernames: [],      // Track recent usernames for variety
  maxRecentMessages: 12,    // Don't repeat a message within this window
  maxRecentUsernames: 8,
  chatterInteractionsEnabled: true, // @username chatter-to-chatter replies
  recentChatters: [],       // Recent posters available as reply targets
  recentReplyTargets: [],   // Recently replied-to usernames (cool-down)
  autoFollow: true,         // Auto-scroll to newest unless user scrolled up
};

/* ==========================================================================
   DOM References
   ========================================================================== */

const chatWindow = document.getElementById('chatWindow');
const chatStatus = document.getElementById('chatStatus');
const btnStart = document.getElementById('btnStart');
const btnPause = document.getElementById('btnPause');
const btnClear = document.getElementById('btnClear');
const frequencySlider = document.getElementById('frequencySlider');
const frequencyValue = document.getElementById('frequencyValue');
const frequencyHeaderValue = document.getElementById('frequencyHeaderValue');
const categoryList = document.getElementById('categoryList');
const franchiseButtonGroup = document.getElementById('franchiseButtonGroup');
const subGameButtonGroup = document.getElementById('subGameButtonGroup');
const subGameEmptyHint = document.getElementById('subGameEmptyHint');
const subGameGroup = document.getElementById('subGameGroup');
const gameSelectionDisplay = document.getElementById('gameSelectionDisplay');
const streamPhaseDisplay = document.getElementById('streamPhaseDisplay');
const openingDurationSelect = document.getElementById('openingDurationSelect');
const streamerNameInput = document.getElementById('streamerNameInput');
const streamerNicknamesInput = document.getElementById('streamerNicknamesInput');
const streamerCommunityInput = document.getElementById('streamerCommunityInput');
const btnSaveProfile = document.getElementById('btnSaveProfile');
const btnClearProfile = document.getElementById('btnClearProfile');
const profileStatus = document.getElementById('profileStatus');
const viewerCountDisplay = document.getElementById('viewerCountDisplay');
const viewerCountHeaderValue = document.getElementById('viewerCountHeaderValue');
const viewerCountEnabled = document.getElementById('viewerCountEnabled');
const viewerStartingInput = document.getElementById('viewerStartingInput');
const viewerMinInput = document.getElementById('viewerMinInput');
const viewerMaxInput = document.getElementById('viewerMaxInput');
const viewerGrowthSpeed = document.getElementById('viewerGrowthSpeed');
const viewerRandomFluctuation = document.getElementById('viewerRandomFluctuation');
const personalityList = document.getElementById('personalityList');
const personalityWarning = document.getElementById('personalityWarning');
const showPersonalityLabelsCheckbox = document.getElementById('showPersonalityLabels');
const chatterInteractionsToggle = document.getElementById('chatterInteractions');
const newMessagesBtn = document.getElementById('newMessagesBtn');
const obsModeCheckbox = document.getElementById('obsMode');
const obsExitBtn = document.getElementById('obsExitBtn');

/* ==========================================================================
   Initialization
   ========================================================================== */

function init() {
  loadStreamerProfile();
  applyProfileToForm();
  loadViewerSettings();
  applyViewerSettingsToForm();
  loadChatterInteractionSetting();
  applyChatterInteractionToForm();
  resetViewerCount();
  renderCategoryToggles();
  renderPersonalityToggles();
  initAccordion();
  renderFranchiseButtons();
  renderSubGameButtons();
  updateGameSelectionDisplay();
  state.openingDurationMs = parseInt(openingDurationSelect.value, 10) * 1000;
  updateStreamPhaseDisplay();
  document.body.classList.toggle('hide-personality-labels', !showPersonalityLabelsCheckbox.checked);
  showEmptyState();
  bindEvents();
  initChatScroll();

  if (shouldAutoEnableObsMode()) {
    setObsMode(true);
  }

  if (shouldAutoStartChat()) {
    setTimeout(() => startChat(), 150);
  }
}

/** True when URL requests OBS overlay mode (?obs=true or #obs) */
function shouldAutoEnableObsMode() {
  const params = new URLSearchParams(window.location.search);
  const obsParam = params.get('obs');

  if (obsParam !== null) {
    const normalized = obsParam.trim().toLowerCase();
    if (normalized === '' || normalized === 'true' || normalized === '1' || normalized === 'yes') {
      return true;
    }
  }

  const hash = window.location.hash.replace(/^#/, '').trim().toLowerCase();
  if (hash === 'obs' || hash === 'obs=true' || hash === 'obs=1') {
    return true;
  }

  return false;
}

/** True when URL requests automatic chat start (?autostart=true) */
function shouldAutoStartChat() {
  const params = new URLSearchParams(window.location.search);
  const autostartParam = params.get('autostart');

  if (autostartParam !== null) {
    const normalized = autostartParam.trim().toLowerCase();
    if (normalized === '' || normalized === 'true' || normalized === '1' || normalized === 'yes') {
      return true;
    }
  }

  return false;
}

/** Wire collapsible accordion sections in the controls panel */
function initAccordion() {
  const sections = document.querySelectorAll('.accordion__section');

  sections.forEach((section) => {
    const header = section.querySelector('.accordion__header');
    const bodyId = header.getAttribute('aria-controls');
    const body = document.getElementById(bodyId);

    if (!header || !body) return;

    header.addEventListener('click', () => {
      const isOpen = section.classList.contains('accordion__section--open');

      section.classList.toggle('accordion__section--open', !isOpen);
      header.setAttribute('aria-expanded', String(!isOpen));
    });
  });
}

/** Build category enable/disable checkboxes */
function renderCategoryToggles() {
  categoryList.innerHTML = '';

  Object.entries(CATEGORIES).forEach(([key, category]) => {
    const label = document.createElement('label');
    label.className = 'category-item';
    label.setAttribute('for', `cat-${key}`);

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = `cat-${key}`;
    input.className = 'category-item__input';
    input.checked = true;
    input.dataset.category = key;

    const dot = document.createElement('span');
    dot.className = 'category-item__dot';
    dot.style.backgroundColor = category.color;

    const text = document.createTextNode(category.label);

    label.appendChild(input);
    label.appendChild(dot);
    label.appendChild(text);
    categoryList.appendChild(label);
  });
}

/** Build viewer personality enable/disable checkboxes */
function renderPersonalityToggles() {
  personalityList.innerHTML = '';

  Object.entries(VIEWER_PERSONALITIES).forEach(([key, personality]) => {
    const label = document.createElement('label');
    label.className = 'category-item';
    label.setAttribute('for', `personality-${key}`);

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = `personality-${key}`;
    input.className = 'category-item__input';
    input.checked = true;
    input.dataset.personality = key;

    const dot = document.createElement('span');
    dot.className = 'category-item__dot';
    dot.style.backgroundColor = personality.color;

    const text = document.createTextNode(personality.label);

    label.appendChild(input);
    label.appendChild(dot);
    label.appendChild(text);
    personalityList.appendChild(label);
  });
}

function bindEvents() {
  btnStart.addEventListener('click', startChat);
  btnPause.addEventListener('click', pauseChat);
  btnClear.addEventListener('click', clearChat);

  frequencySlider.addEventListener('input', onFrequencyChange);

  categoryList.addEventListener('change', onCategoryToggle);

  chatterInteractionsToggle.addEventListener('change', onChatterInteractionsChange);

  personalityList.addEventListener('change', onPersonalityToggle);

  showPersonalityLabelsCheckbox.addEventListener('change', onShowPersonalityLabelsChange);

  openingDurationSelect.addEventListener('change', onOpeningDurationChange);

  btnSaveProfile.addEventListener('click', saveProfileFromForm);
  btnClearProfile.addEventListener('click', clearSavedProfile);

  viewerCountEnabled.addEventListener('change', onViewerSettingsChange);
  viewerStartingInput.addEventListener('change', onViewerSettingsChange);
  viewerMinInput.addEventListener('change', onViewerSettingsChange);
  viewerMaxInput.addEventListener('change', onViewerSettingsChange);
  viewerGrowthSpeed.addEventListener('change', onViewerSettingsChange);
  viewerRandomFluctuation.addEventListener('change', onViewerSettingsChange);

  obsModeCheckbox.addEventListener('change', onObsModeToggle);
  obsExitBtn.addEventListener('click', () => setObsMode(false));

  // Escape exits OBS Mode when controls are hidden
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.body.classList.contains('obs-mode')) {
      setObsMode(false);
    }
  });
}

/* ==========================================================================
   Chat Controls
   ========================================================================== */

function startChat() {
  if (state.isRunning) return;

  // Need at least one enabled personality
  if (state.enabledPersonalities.size === 0) {
    alert('Enable at least one viewer personality to start the chat.');
    return;
  }

  // Need at least game mode messages or one supplementary category
  if (getSubGamePool().length === 0) {
    alert('Select a valid game to start the chat.');
    return;
  }

  state.isRunning = true;
  btnStart.disabled = true;
  btnPause.disabled = false;
  chatStatus.textContent = 'Live';
  chatStatus.classList.add('chat-panel__status--live');

  resumePhaseTimer();

  if (!state.viewerSessionActive) {
    resetViewerCount();
    state.viewerSessionActive = true;
  }

  resumeViewerCountTicker();
  removeEmptyState();
  scheduleNextMessage();

  // Post first message shortly after starting for immediate feedback
  setTimeout(() => {
    if (state.isRunning) postMessage();
  }, 800);
}

function pauseChat() {
  pausePhaseTimer();
  pauseViewerCountTicker();
  state.isRunning = false;
  btnStart.disabled = false;
  btnPause.disabled = true;
  chatStatus.textContent = 'Paused';
  chatStatus.classList.remove('chat-panel__status--live');

  if (state.intervalId) {
    clearTimeout(state.intervalId);
    state.intervalId = null;
  }
}

function clearChat() {
  chatWindow.innerHTML = '';
  state.recentMessages = [];
  state.recentUsernames = [];
  state.recentChatters = [];
  state.recentReplyTargets = [];
  state.autoFollow = true;
  hideNewMessagesIndicator();
  resetStreamPhase();
  resetViewerCount();
  state.viewerSessionActive = false;
  showEmptyState();
}

function onOpeningDurationChange() {
  state.openingDurationMs = parseInt(openingDurationSelect.value, 10) * 1000;
  updateStreamPhaseFromTimer();
}

/** Reset stream phase to Opening (used by Clear Chat) */
function resetStreamPhase() {
  pausePhaseTimer();
  state.streamPhase = STREAM_PHASE.OPENING;
  state.openingActiveMs = 0;
  state.phaseLastTick = null;
  updateStreamPhaseDisplay();
}

/** Resume counting opening-phase time when chat is running */
function resumePhaseTimer() {
  if (state.streamPhase === STREAM_PHASE.OPENING) {
    state.phaseLastTick = Date.now();
  }
}

/** Pause opening-phase timer without resetting elapsed time */
function pausePhaseTimer() {
  if (state.phaseLastTick && state.streamPhase === STREAM_PHASE.OPENING) {
    state.openingActiveMs += Date.now() - state.phaseLastTick;
    state.phaseLastTick = null;
  }
}

/** Advance opening-phase timer and transition when duration is reached */
function updateStreamPhaseFromTimer() {
  if (!state.isRunning || state.streamPhase !== STREAM_PHASE.OPENING) return;

  if (state.phaseLastTick) {
    const now = Date.now();
    state.openingActiveMs += now - state.phaseLastTick;
    state.phaseLastTick = now;
  }

  if (state.openingActiveMs >= state.openingDurationMs) {
    state.streamPhase = STREAM_PHASE.NORMAL;
    state.phaseLastTick = null;
    updateStreamPhaseDisplay();
  }
}

/** Update the phase badge in the chat header */
function updateStreamPhaseDisplay() {
  const isOpening = state.streamPhase === STREAM_PHASE.OPENING;
  streamPhaseDisplay.textContent = isOpening ? 'Opening' : 'Normal';
  streamPhaseDisplay.classList.toggle('chat-panel__phase--opening', isOpening);
  streamPhaseDisplay.classList.toggle('chat-panel__phase--normal', !isOpening);
}

function onFrequencyChange() {
  state.frequencySeconds = parseInt(frequencySlider.value, 10);
  const label = `${state.frequencySeconds}s`;
  frequencyValue.textContent = label;
  frequencyHeaderValue.textContent = label;

  // Reschedule if chat is running so new frequency takes effect immediately
  if (state.isRunning) {
    if (state.intervalId) clearTimeout(state.intervalId);
    scheduleNextMessage();
  }
}

function onCategoryToggle(event) {
  const checkbox = event.target;
  if (checkbox.type !== 'checkbox') return;

  const category = checkbox.dataset.category;
  if (checkbox.checked) {
    state.enabledCategories.add(category);
  } else {
    state.enabledCategories.delete(category);
  }
}

function onPersonalityToggle(event) {
  const checkbox = event.target;
  if (checkbox.type !== 'checkbox' || !checkbox.dataset.personality) return;

  const personality = checkbox.dataset.personality;

  if (checkbox.checked) {
    state.enabledPersonalities.add(personality);
    personalityWarning.hidden = true;
    return;
  }

  // Block disabling the last remaining personality
  if (state.enabledPersonalities.size <= 1) {
    checkbox.checked = true;
    personalityWarning.hidden = false;
    return;
  }

  state.enabledPersonalities.delete(personality);
}

function onShowPersonalityLabelsChange() {
  state.showPersonalityLabels = showPersonalityLabelsCheckbox.checked;
  document.body.classList.toggle('hide-personality-labels', !state.showPersonalityLabels);
}

function renderFranchiseButtons() {
  franchiseButtonGroup.innerHTML = '';

  Object.entries(GAME_FRANCHISES).forEach(([key, franchise]) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'button-group__btn';
    button.textContent = franchise.label;
    button.dataset.franchise = key;
    button.setAttribute('aria-pressed', String(key === state.franchise));

    if (key === state.franchise) {
      button.classList.add('button-group__btn--active');
    }

    button.addEventListener('click', () => selectFranchise(key));
    franchiseButtonGroup.appendChild(button);
  });
}

function selectFranchise(franchiseKey) {
  if (!GAME_FRANCHISES[franchiseKey] || state.franchise === franchiseKey) return;

  state.franchise = franchiseKey;
  renderFranchiseButtons();
  renderSubGameButtons();
  updateGameSelectionDisplay();
}

function renderSubGameButtons() {
  const franchise = GAME_FRANCHISES[state.franchise];
  subGameButtonGroup.innerHTML = '';

  if (!franchise || !franchise.subGames) {
    subGameButtonGroup.hidden = true;
    subGameEmptyHint.hidden = false;
    state.subGame = null;
    return;
  }

  subGameButtonGroup.hidden = false;
  subGameEmptyHint.hidden = true;

  if (!franchise.subGames[state.subGame]) {
    state.subGame = Object.keys(franchise.subGames)[0];
  }

  Object.entries(franchise.subGames).forEach(([key, subGame]) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'button-group__btn';
    button.textContent = subGame.label;
    button.dataset.subGame = key;
    button.setAttribute('aria-pressed', String(key === state.subGame));

    if (key === state.subGame) {
      button.classList.add('button-group__btn--active');
    }

    button.addEventListener('click', () => selectSubGame(key));
    subGameButtonGroup.appendChild(button);
  });
}

function selectSubGame(subGameKey) {
  const franchise = GAME_FRANCHISES[state.franchise];
  if (!franchise?.subGames?.[subGameKey] || state.subGame === subGameKey) return;

  state.subGame = subGameKey;
  renderSubGameButtons();
  updateGameSelectionDisplay();
}

/** Whether the General Gaming franchise is selected (no sub-game) */
function isGeneralFranchise() {
  return state.franchise === 'generalGaming';
}

/** Sync the chat header badge with the selected franchise and sub-game */
function updateGameSelectionDisplay() {
  const franchise = GAME_FRANCHISES[state.franchise];

  if (!franchise) return;

  if (!franchise.subGames) {
    gameSelectionDisplay.textContent = franchise.label;
    return;
  }

  const subGame = franchise.subGames[state.subGame];
  if (subGame) {
    gameSelectionDisplay.textContent = `${franchise.label} / ${subGame.label}`;
  }
}

function onObsModeToggle() {
  setObsMode(obsModeCheckbox.checked);
}

/** Enable or disable OBS overlay layout */
function setObsMode(enabled) {
  document.body.classList.toggle('obs-mode', enabled);
  obsModeCheckbox.checked = enabled;
  obsExitBtn.hidden = !enabled;
}

/* ==========================================================================
   Message Scheduling
   ========================================================================== */

function scheduleNextMessage() {
  const delayMs = getEffectiveFrequencySeconds() * 1000;

  state.intervalId = setTimeout(() => {
    if (state.isRunning) {
      updateStreamPhaseFromTimer();
      postMessage();
      scheduleNextMessage();
    }
  }, delayMs);
}

/* ==========================================================================
   Random Generation — Usernames & Messages (independent)
   ========================================================================== */

/** Pick a random element from an array */
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Generate a random Twitch-style username */
function generateUsername() {
  let username;
  let attempts = 0;
  const maxAttempts = 30;

  do {
    const prefix = pickRandom(USERNAME_PREFIXES);
    const core = pickRandom(USERNAME_CORES);
    const suffix = pickRandom(USERNAME_SUFFIXES);
    const number = Math.random() < 0.4 ? Math.floor(Math.random() * 9999) : '';
    username = `${prefix}${core}${suffix}${number}`;

    // Clean up awkward combos
    username = username.replace(/XxXx/g, 'Xx').replace(/__+/g, '_');
    attempts++;
  } while (
    state.recentUsernames.includes(username) &&
    attempts < maxAttempts
  );

  // Track recent usernames
  state.recentUsernames.push(username);
  if (state.recentUsernames.length > state.maxRecentUsernames) {
    state.recentUsernames.shift();
  }

  return username;
}

/** Pick a random color for a username */
function generateUsernameColor() {
  return pickRandom(USERNAME_COLORS);
}

/** Build pool from enabled supplementary categories */
function getSupplementaryPool() {
  let pool = [];
  state.enabledCategories.forEach((key) => {
    if (CATEGORIES[key]) {
      pool = pool.concat(CATEGORIES[key].messages);
    }
  });
  return pool;
}

/** Pick a random enabled viewer personality */
function pickRandomPersonality() {
  const keys = Array.from(state.enabledPersonalities);
  return pickRandom(keys);
}

/** Resolve the active sub-game message pool */
function getSubGamePool() {
  const franchise = GAME_FRANCHISES[state.franchise];

  if (!franchise) return GENERAL_GAMING_MESSAGES;

  if (!franchise.subGames) {
    return franchise.messages || GENERAL_GAMING_MESSAGES;
  }

  const subGame = franchise.subGames[state.subGame];
  return subGame ? subGame.messages : GENERAL_GAMING_MESSAGES;
}

/** Build the opening-phase message pool for the current game selection */
function getOpeningPool() {
  const gameSpecific = state.subGame
    ? (OPENING_MESSAGES_BY_SUB_GAME[state.subGame] || [])
    : [];

  if (gameSpecific.length === 0) {
    return OPENING_MESSAGES_GENERIC;
  }

  return OPENING_MESSAGES_GENERIC.concat(gameSpecific);
}

/** Pick opening-phase message source — greetings first, with personality tone */
function selectOpeningMessageSource() {
  const personalityKey = pickRandomPersonality();
  const openingPool = getOpeningPool();

  return {
    personalityKey,
    useBlend: true,
    personalityPool: VIEWER_PERSONALITIES[personalityKey].messages,
    gamePool: openingPool,
    gameModeBlend: 0.75,
  };
}

/**
 * Combine sub-game messages with a personality's tone.
 * Sub-game sets the topic; personality sets how often game-specific lines appear.
 */
function buildPersonalityGamePool(personalityKey) {
  const personality = VIEWER_PERSONALITIES[personalityKey];
  const gamePool = getSubGamePool();

  return {
    personalityPool: personality.messages,
    gamePool,
    gameModeBlend: personality.gameModeBlend,
  };
}

/** Weighted roll: pick which message pool to draw from this tick */
function selectMessageSource() {
  updateStreamPhaseFromTimer();

  // Opening Phase: prioritize greeting / arrival messages
  if (state.streamPhase === STREAM_PHASE.OPENING) {
    return selectOpeningMessageSource();
  }

  const supplementaryPool = getSupplementaryPool();
  const hasSupplementary = supplementaryPool.length > 0;
  const isGeneral = isGeneralFranchise();
  const personalityKey = pickRandomPersonality();

  const roll = Math.random();
  let threshold = 0;

  // Optional mix from Personal Questions / Storytelling / Hype
  if (hasSupplementary) {
    threshold += SUPPLEMENTARY_MIX_RATE;
    if (roll < threshold) {
      return {
        pool: supplementaryPool,
        personalityKey,
        useBlend: false,
      };
    }
  }

  // When streaming a specific sub-game, occasionally ask general gaming questions
  if (!isGeneral) {
    threshold += GENERAL_GAMING_MIX_RATE;
    if (roll < threshold) {
      return {
        pool: GENERAL_GAMING_MESSAGES,
        personalityKey,
        useBlend: false,
      };
    }
  }

  // Primary: combine selected sub-game with a viewer personality
  const combined = buildPersonalityGamePool(personalityKey);
  return {
    personalityKey,
    useBlend: true,
    ...combined,
  };
}

/** Pick a message from the active source, avoiding recent repeats */
function pickMessageFromSource(source) {
  let pool;

  if (source.useBlend) {
    const useGamePool = Math.random() < source.gameModeBlend;
    pool = useGamePool ? source.gamePool : source.personalityPool;
  } else {
    pool = source.pool;
  }

  let available = pool.filter((msg) => !state.recentMessages.includes(msg));

  if (available.length === 0) {
    available = pool;
    state.recentMessages = [];
  }

  const message = pickRandom(available);

  state.recentMessages.push(message);
  if (state.recentMessages.length > state.maxRecentMessages) {
    state.recentMessages.shift();
  }

  return message;
}

/** Pick a random message based on game mode, personality, and enabled categories */
function generateMessage() {
  const profileText = maybeGenerateProfileMessage();
  if (profileText) {
    return {
      text: profileText,
      personalityKey: pickRandomPersonality(),
    };
  }

  const source = selectMessageSource();
  const text = pickMessageFromSource(source);

  return {
    text,
    personalityKey: source.personalityKey,
  };
}

/* ==========================================================================
   Chatter Interactions — viewers reply to each other with @username
   ========================================================================== */

/** Anti-repeat pick that shares the recentMessages window with normal messages */
function pickAntiRepeat(pool) {
  let available = pool.filter((msg) => !state.recentMessages.includes(msg));

  if (available.length === 0) {
    available = pool;
  }

  const message = pickRandom(available);

  state.recentMessages.push(message);
  if (state.recentMessages.length > state.maxRecentMessages) {
    state.recentMessages.shift();
  }

  return message;
}

/** Recent posters we can reply to, preferring ones we haven't replied to lately */
function getReplyTargets() {
  const nonReplies = state.recentChatters.filter((chatter) => !chatter.isReply);
  const blocked = new Set(state.recentReplyTargets);
  const preferred = nonReplies.filter((chatter) => !blocked.has(chatter.username));

  return preferred.length > 0 ? preferred : nonReplies;
}

/** Choose a weighted reply type for the replying viewer's personality */
function pickReplyType(personalityKey) {
  const types = REPLY_TYPES_BY_PERSONALITY[personalityKey] || DEFAULT_REPLY_TYPES;
  return pickRandom(types);
}

/**
 * Possibly build a chatter-to-chatter reply for this message.
 * Returns { text, personalityKey } or null when no reply should be sent.
 */
function maybeGenerateReply() {
  if (!state.chatterInteractionsEnabled) return null;

  // Replies need an established conversation, so skip the opening greetings.
  if (state.streamPhase !== STREAM_PHASE.NORMAL) return null;

  const targets = getReplyTargets();
  if (targets.length === 0) return null;

  const replyChance = CHATTER_REPLY_RATE_MIN
    + Math.random() * (CHATTER_REPLY_RATE_MAX - CHATTER_REPLY_RATE_MIN);
  if (Math.random() > replyChance) return null;

  const target = pickRandom(targets);
  const personalityKey = pickRandomPersonality();
  const replyType = pickReplyType(personalityKey);
  const body = pickAntiRepeat(REPLY_BODIES[replyType] || REPLY_BODIES.agreement);

  state.recentReplyTargets.push(target.username);
  if (state.recentReplyTargets.length > MAX_RECENT_REPLY_TARGETS) {
    state.recentReplyTargets.shift();
  }

  return {
    text: `@${target.username} ${body}`,
    personalityKey,
  };
}

/** Remember a posted chatter so later messages can reply to them */
function trackChatter(data) {
  state.recentChatters.push({
    username: data.username,
    isReply: data.text.startsWith('@'),
  });

  if (state.recentChatters.length > MAX_RECENT_CHATTERS) {
    state.recentChatters.shift();
  }
}

/* ==========================================================================
   Streamer Profile
   ========================================================================== */

/** Parse comma-separated nicknames into a trimmed array */
function parseNicknames(value) {
  return value
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);
}

/** Load streamer profile from localStorage into saved state and form */
function loadStreamerProfile() {
  state.streamerProfile = { name: '', nicknames: [], community: '' };

  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) return;

    const data = JSON.parse(raw);
    state.streamerProfile = {
      name: typeof data.name === 'string' ? data.name.trim() : '',
      nicknames: Array.isArray(data.nicknames)
        ? data.nicknames.map((n) => String(n).trim()).filter(Boolean)
        : parseNicknames(data.nicknames || ''),
      community: typeof data.community === 'string' ? data.community.trim() : '',
    };
  } catch {
    state.streamerProfile = { name: '', nicknames: [], community: '' };
  }
}

/** Persist the saved profile (not draft form values) to localStorage */
function saveStreamerProfile() {
  try {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(state.streamerProfile));
  } catch {
    showProfileStatus('Could not save profile in this browser.', true);
  }
}

/** Fill form fields from the saved profile only */
function applyProfileToForm() {
  streamerNameInput.value = state.streamerProfile.name;
  streamerNicknamesInput.value = state.streamerProfile.nicknames.join(', ');
  streamerCommunityInput.value = state.streamerProfile.community;
}

/** Read current form values without saving */
function readProfileFromForm() {
  return {
    name: streamerNameInput.value.trim(),
    nicknames: parseNicknames(streamerNicknamesInput.value),
    community: streamerCommunityInput.value.trim(),
  };
}

/** Save Profile button — commit form values to saved state and localStorage */
function saveProfileFromForm() {
  state.streamerProfile = readProfileFromForm();
  saveStreamerProfile();
  showProfileStatus('Profile saved.');
}

/** Clear Profile button — wipe saved profile, form, and localStorage */
function clearSavedProfile() {
  state.streamerProfile = { name: '', nicknames: [], community: '' };

  streamerNameInput.value = '';
  streamerNicknamesInput.value = '';
  streamerCommunityInput.value = '';

  try {
    localStorage.removeItem(PROFILE_STORAGE_KEY);
  } catch {
    // Ignore storage errors
  }

  showProfileStatus('Profile cleared.');
}

/** Brief status message under profile buttons */
function showProfileStatus(message, isError = false) {
  profileStatus.textContent = message;
  profileStatus.hidden = false;
  profileStatus.classList.toggle('profile-status--error', isError);
}

/** Whether the saved profile has any data used by chat */
function hasProfileData() {
  const profile = state.streamerProfile;
  return Boolean(profile.name || profile.nicknames.length > 0 || profile.community);
}

/** Build a list of profile message options from current templates */
function buildProfileMessageOptions() {
  const profile = state.streamerProfile;
  const options = [];

  if (profile.name) {
    PROFILE_MESSAGE_TEMPLATES.streamerName.forEach((template) => {
      options.push({ template, value: profile.name, token: '{name}' });
    });
  }

  if (profile.nicknames.length > 0) {
    const nickname = pickRandom(profile.nicknames);
    PROFILE_MESSAGE_TEMPLATES.nickname.forEach((template) => {
      options.push({ template, value: nickname, token: '{name}' });
    });
  }

  if (profile.community) {
    PROFILE_MESSAGE_TEMPLATES.community.forEach((template) => {
      options.push({ template, value: profile.community, token: '{community}' });
    });
  }

  return options;
}

/**
 * Occasionally return a profile-aware message.
 * Returns null when profile is empty, roll misses, or no unique line is available.
 */
function maybeGenerateProfileMessage() {
  if (!hasProfileData()) return null;
  if (Math.random() > PROFILE_REFERENCE_RATE) return null;

  const options = buildProfileMessageOptions();
  if (options.length === 0) return null;

  // Shuffle attempts to avoid repeats without forcing profile into every tick
  const shuffled = options.sort(() => Math.random() - 0.5);

  for (let i = 0; i < shuffled.length; i += 1) {
    const choice = shuffled[i];
    const text = choice.template.replace(choice.token, choice.value);

    if (state.recentMessages.includes(text)) continue;

    state.recentMessages.push(text);
    if (state.recentMessages.length > state.maxRecentMessages) {
      state.recentMessages.shift();
    }

    return text;
  }

  return null;
}

/* ==========================================================================
   Viewer Count Simulator
   ========================================================================== */

/** Clamp a number between min and max */
function clampNumber(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

/** Normalize viewer settings and keep values in a valid range */
function normalizeViewerSettings(settings) {
  let minViewers = Math.max(0, parseInt(settings.minViewers, 10) || 0);
  let maxViewers = Math.max(0, parseInt(settings.maxViewers, 10) || 0);

  if (maxViewers < minViewers) {
    maxViewers = minViewers;
  }

  const startingViewers = clampNumber(
    parseInt(settings.startingViewers, 10) || 0,
    minViewers,
    maxViewers
  );

  const growthSpeed = ['slow', 'normal', 'fast'].includes(settings.growthSpeed)
    ? settings.growthSpeed
    : 'normal';

  return {
    enabled: Boolean(settings.enabled),
    startingViewers,
    minViewers,
    maxViewers,
    growthSpeed,
    randomFluctuation: Boolean(settings.randomFluctuation),
  };
}

/** Load viewer simulator settings from localStorage */
function loadViewerSettings() {
  state.viewerSettings = { ...DEFAULT_VIEWER_SETTINGS };

  try {
    const raw = localStorage.getItem(VIEWER_SETTINGS_STORAGE_KEY);
    if (!raw) return;

    const data = JSON.parse(raw);
    state.viewerSettings = normalizeViewerSettings({
      ...DEFAULT_VIEWER_SETTINGS,
      ...data,
    });
  } catch {
    state.viewerSettings = { ...DEFAULT_VIEWER_SETTINGS };
  }
}

/** Save viewer simulator settings to localStorage */
function saveViewerSettings() {
  try {
    localStorage.setItem(VIEWER_SETTINGS_STORAGE_KEY, JSON.stringify(state.viewerSettings));
  } catch {
    // Ignore storage errors
  }
}

/** Load the chatter interaction toggle from localStorage (defaults to on) */
function loadChatterInteractionSetting() {
  try {
    const raw = localStorage.getItem(CHATTER_INTERACTION_STORAGE_KEY);
    if (raw !== null) {
      state.chatterInteractionsEnabled = raw === 'true';
    }
  } catch {
    state.chatterInteractionsEnabled = true;
  }
}

/** Persist the chatter interaction toggle */
function saveChatterInteractionSetting() {
  try {
    localStorage.setItem(
      CHATTER_INTERACTION_STORAGE_KEY,
      String(state.chatterInteractionsEnabled)
    );
  } catch {
    // Ignore storage errors
  }
}

/** Reflect the saved setting in the toggle control */
function applyChatterInteractionToForm() {
  if (chatterInteractionsToggle) {
    chatterInteractionsToggle.checked = state.chatterInteractionsEnabled;
  }
}

/** Toggle handler for "Enable chatter interactions" */
function onChatterInteractionsChange() {
  state.chatterInteractionsEnabled = chatterInteractionsToggle.checked;
  saveChatterInteractionSetting();
}

/** Apply saved viewer settings to form controls */
function applyViewerSettingsToForm() {
  const settings = state.viewerSettings;
  viewerCountEnabled.checked = settings.enabled;
  viewerStartingInput.value = settings.startingViewers;
  viewerMinInput.value = settings.minViewers;
  viewerMaxInput.value = settings.maxViewers;
  viewerGrowthSpeed.value = settings.growthSpeed;
  viewerRandomFluctuation.checked = settings.randomFluctuation;
}

/** Read viewer settings from form, normalize, save, and refresh display */
function onViewerSettingsChange() {
  state.viewerSettings = normalizeViewerSettings({
    enabled: viewerCountEnabled.checked,
    startingViewers: viewerStartingInput.value,
    minViewers: viewerMinInput.value,
    maxViewers: viewerMaxInput.value,
    growthSpeed: viewerGrowthSpeed.value,
    randomFluctuation: viewerRandomFluctuation.checked,
  });

  applyViewerSettingsToForm();
  saveViewerSettings();

  if (!state.viewerSessionActive) {
    resetViewerCount();
  } else {
    state.currentViewers = clampNumber(
      state.currentViewers,
      state.viewerSettings.minViewers,
      state.viewerSettings.maxViewers
    );
    updateViewerCountDisplay();
  }

  if (state.isRunning) {
    if (state.intervalId) clearTimeout(state.intervalId);
    scheduleNextMessage();
    pauseViewerCountTicker();
    resumeViewerCountTicker();
  }
}

/** Reset live viewer count to the configured starting value */
function resetViewerCount() {
  pauseViewerCountTicker();
  state.currentViewers = state.viewerSettings.startingViewers;
  updateViewerCountDisplay();
}

/** Update viewer count labels in the header and accordion */
function updateViewerCountDisplay() {
  const count = state.currentViewers;
  const label = count === 1 ? 'Viewer' : 'Viewers';
  const text = `👥 ${count} ${label}`;

  viewerCountDisplay.textContent = text;
  viewerCountHeaderValue.textContent = String(count);
  viewerCountDisplay.classList.toggle(
    'chat-panel__viewer-count--disabled',
    !state.viewerSettings.enabled
  );
}

/** Compute the next viewer count change */
function computeViewerDelta() {
  const { growthSpeed, randomFluctuation, minViewers, maxViewers } = state.viewerSettings;
  const count = state.currentViewers;

  const changeChance = { slow: 0.35, normal: 0.5, fast: 0.65 }[growthSpeed];
  if (Math.random() > changeChance) return 0;

  if (!randomFluctuation) {
    if (count >= maxViewers) return 0;
    return 1;
  }

  const roll = Math.random();
  let delta = 0;

  if (roll < 0.28) delta = -1;
  else if (roll < 0.48) delta = 0;
  else delta = 1;

  // Gentle upward drift over time, stronger at slower speeds
  const drift = { slow: 0.2, normal: 0.12, fast: 0.06 }[growthSpeed];
  if (delta === 0 && Math.random() < drift) delta = 1;

  if (count <= minViewers && delta < 0) delta = Math.random() < 0.6 ? 1 : 0;
  if (count >= maxViewers && delta > 0) delta = Math.random() < 0.6 ? -1 : 0;

  return delta;
}

/** Apply one viewer count tick */
function tickViewerCount() {
  if (!state.viewerSettings.enabled || !state.isRunning) return;

  const { minViewers, maxViewers } = state.viewerSettings;
  const delta = computeViewerDelta();
  state.currentViewers = clampNumber(state.currentViewers + delta, minViewers, maxViewers);
  updateViewerCountDisplay();

  // NOTE: Do not reset the message timer here. The viewer-count ticker fires
  // every few seconds; restarting the message timeout on each tick would
  // perpetually starve it whenever the message interval is longer than the
  // tick interval (e.g. 15s+ frequency). The new viewer count is picked up
  // automatically by the next scheduleNextMessage() call after a message posts.
}

/** Schedule the next viewer count fluctuation */
function scheduleViewerCountTick() {
  if (state.viewerCountIntervalId) {
    clearTimeout(state.viewerCountIntervalId);
    state.viewerCountIntervalId = null;
  }

  if (!state.isRunning || !state.viewerSettings.enabled) return;

  const [minDelay, maxDelay] = VIEWER_GROWTH_DELAYS[state.viewerSettings.growthSpeed];
  const delay = minDelay + Math.random() * (maxDelay - minDelay);

  state.viewerCountIntervalId = setTimeout(() => {
    if (state.isRunning) {
      tickViewerCount();
      scheduleViewerCountTick();
    }
  }, delay);
}

function resumeViewerCountTicker() {
  if (!state.viewerSettings.enabled) return;
  scheduleViewerCountTick();
}

function pauseViewerCountTicker() {
  if (state.viewerCountIntervalId) {
    clearTimeout(state.viewerCountIntervalId);
    state.viewerCountIntervalId = null;
  }
}

/**
 * Adjust message frequency based on simulated viewer count.
 * Keeps chat readable with a minimum interval floor.
 */
function getEffectiveFrequencySeconds() {
  const base = state.frequencySeconds;

  if (!state.viewerSettings.enabled) {
    return base;
  }

  const count = state.currentViewers;
  let multiplier = 1;

  if (count <= 2) {
    multiplier = 1.55;
  } else if (count <= 10) {
    multiplier = 1;
  } else if (count <= 25) {
    multiplier = 0.78;
  } else {
    multiplier = 0.62;
  }

  return Math.max(MIN_MESSAGE_INTERVAL_SECONDS, Math.round(base * multiplier));
}

/* ==========================================================================
   Rendering Messages
   ========================================================================== */

function formatTimestamp(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes} ${ampm}`;
}

function createMessageData() {
  const username = generateUsername();
  const { text, personalityKey } = maybeGenerateReply() || generateMessage();
  const personality = VIEWER_PERSONALITIES[personalityKey];
  const color = generateUsernameColor();
  const timestamp = formatTimestamp(new Date());

  const data = {
    timestamp,
    username,
    color,
    text,
    personalityKey,
    personalityLabel: personality ? personality.label : null,
  };

  trackChatter(data);
  return data;
}

/** Render message text, highlighting a leading @username mention (escaped) */
function formatMessageText(text) {
  const match = text.match(/^(@\S+)(\s+)([\s\S]*)$/);

  if (match) {
    return `<span class="chat-message__mention">${escapeHtml(match[1])}</span>`
      + `${escapeHtml(match[2])}${escapeHtml(match[3])}`;
  }

  return escapeHtml(text);
}

function createMessageElement(data) {
  const personalityHtml = data.personalityLabel
    ? `<span class="chat-message__personality">[${escapeHtml(data.personalityLabel)}]</span>`
    : '';

  const messageEl = document.createElement('div');
  messageEl.className = 'chat-message';
  messageEl.innerHTML = `
    <span class="chat-message__timestamp">${data.timestamp}</span>
    <span class="chat-message__username" style="color: ${data.color}">${escapeHtml(data.username)}:</span>
    ${personalityHtml}
    <span class="chat-message__text">${formatMessageText(data.text)}</span>
  `;

  return messageEl;
}

function postMessage() {
  removeEmptyState();

  const messageData = createMessageData();
  chatWindow.appendChild(createMessageElement(messageData));
  enforceMessageLimit();
  handleNewMessageScroll();
}

/** Keep the DOM capped so the chat never grows without bound */
function enforceMessageLimit() {
  while (chatWindow.children.length > MAX_CHAT_MESSAGES) {
    chatWindow.removeChild(chatWindow.firstElementChild);
  }
}

/** Auto-scroll to the newest message, or show the indicator if scrolled up */
function handleNewMessageScroll() {
  if (state.autoFollow) {
    scrollToBottom();
  } else {
    showNewMessagesIndicator();
  }
}

/** Prevent XSS when rendering user-generated-style content */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function scrollToBottom() {
  chatWindow.scrollTop = chatWindow.scrollHeight;
  state.autoFollow = true;
  hideNewMessagesIndicator();
}

/** True when the user is at (or near) the newest message */
function isNearBottom() {
  const distance = chatWindow.scrollHeight - chatWindow.scrollTop - chatWindow.clientHeight;
  return distance <= AUTO_FOLLOW_THRESHOLD_PX;
}

function showNewMessagesIndicator() {
  if (newMessagesBtn) newMessagesBtn.hidden = false;
}

function hideNewMessagesIndicator() {
  if (newMessagesBtn) newMessagesBtn.hidden = true;
}

/**
 * Track whether the user is following the bottom of the chat. Scrolling up
 * pauses auto-scroll; returning to the bottom resumes it and hides the badge.
 */
function initChatScroll() {
  chatWindow.addEventListener('scroll', () => {
    if (isNearBottom()) {
      state.autoFollow = true;
      hideNewMessagesIndicator();
    } else {
      state.autoFollow = false;
    }
  });

  if (newMessagesBtn) {
    newMessagesBtn.addEventListener('click', () => {
      chatWindow.scrollTo({ top: chatWindow.scrollHeight, behavior: 'smooth' });
      state.autoFollow = true;
      hideNewMessagesIndicator();
    });
  }
}

function showEmptyState(message) {
  if (chatWindow.children.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'chat-window__empty';
    empty.id = 'emptyState';

    const icon = document.createElement('img');
    icon.className = 'chat-window__empty-icon';
    icon.src = 'assets/ghostchat-icon-transparent.png';
    icon.alt = '';
    icon.setAttribute('aria-hidden', 'true');
    icon.setAttribute('draggable', 'false');

    const text = document.createElement('p');
    text.className = 'chat-window__empty-text';
    text.textContent = message || 'Press Start Chat to warm up the room.';

    empty.appendChild(icon);
    empty.appendChild(text);
    chatWindow.appendChild(empty);
  }
}

function removeEmptyState() {
  const empty = document.getElementById('emptyState');
  if (empty) empty.remove();
}

/* ==========================================================================
   Boot
   ========================================================================== */

document.addEventListener('DOMContentLoaded', init);
