/* =====================================================
   EDIT EVERYTHING HERE — all text on the site lives in CONFIG.
   Each option has `text` (the button) and `reply` (shown after tapping).
   Add or remove questions freely; the progress hearts adjust by themselves.
   ===================================================== */
const CONFIG = {
  name: "Aynaz",

  welcome: {
    title: "Hey, my favorite princess ♡",
    subtitle: "I made something little for you... and if you ever tried to fall, I would catch you anytime in my arms.",
    button: "Open your surprise"
  },

  questions: [
    {
      q: "How much do you love me?",
      options: [
        { text: "More than anything ♡", reply: "Good, my love, because I feel exactly the same way." },
        { text: "Infinity times.", reply: "Infinity and one, darling. I win, no take-backs." },
        { text: "That's a secret.", reply: "Mysterious... I'll keep trying to find out." },
        { text: "You already know!", reply: "I do, honey. I just love hearing it." }
      ]
    },
    {
      q: "What should we do together?",
      options: [
        { text: "Late night calls.", reply: "Falling asleep to your voice is my favorite thing." },
        { text: "Watch movies.", reply: "You pick the movie, my princess, I'll pick the blanket." },
        { text: "Go on cute dates.", reply: "I'm already planning the first one." },
        { text: "Just spend time together.", reply: "Honestly, my love, that's the best plan of all." }
      ]
    },
    {
      q: "Who's the luckiest person?",
      options: [
        { text: "Me.", reply: "Wrong! It's me. But I like that you think so." },
        { text: "You.", reply: "You're sweet, darling, but I'm the lucky one here." },
        { text: "Both of us.", reply: "Finally, we agree on something." }
      ]
    },
    {
      q: "If I could give you anything, what would it be?",
      options: [
        { text: "A thousand hugs.", reply: "Saving them all up for you, my princess." },
        { text: "Unlimited kisses.", reply: "Delivered with no shipping fee." },
        { text: "My time forever.", reply: "It's already yours, my love." },
        { text: "Everything you wish for.", reply: "Make a wish, honey. I'm listening." }
      ]
    },
    {
      q: "What's my favorite thing about you?",
      options: [
        { text: "Your smile.", reply: "It fixes my whole day, every time." },
        { text: "Your kindness.", reply: "You have the softest heart I know, darling." },
        { text: "Your laugh.", reply: "I'd do anything to hear it more." },
        { text: "Everything.", reply: "Correct. Full marks, my princess." }
      ]
    },
    {
      q: "Pick our dream trip.",
      options: [
        { text: "Somewhere by the sea.", reply: "Sunsets, sand, and your hand in mine." },
        { text: "A cozy mountain cabin.", reply: "Fireplace, hot chocolate, no one else around." },
        { text: "A city full of lights.", reply: "We'd get lost and love every minute." },
        { text: "Anywhere with you.", reply: "That's my answer too, my love." }
      ]
    },
    {
      q: "What do we do on a rainy day?",
      options: [
        { text: "Stay in and cuddle.", reply: "Best weather for it, honey." },
        { text: "Cook something together.", reply: "I'll make the mess, you make it delicious." },
        { text: "Dance in the rain.", reply: "I'll hold your hand so you don't slip." },
        { text: "Build a blanket fort.", reply: "Snacks and fairy lights included." }
      ]
    },
    {
      q: "What does forever look like?",
      options: [
        { text: "A little home of our own.", reply: "With your favorite things in every corner." },
        { text: "Endless adventures.", reply: "I'll bring the map, you bring the smile." },
        { text: "Slow mornings together.", reply: "Coffee, sunlight, and you." },
        { text: "Just us, always.", reply: "That's all I need, my love." }
      ]
    },
    {
      q: "Pick a treat for us to share.",
      options: [
        { text: "Warm chocolate.", reply: "Of course you picked chocolate. Your chocolate is all yours." },
        { text: "Strawberry ice cream.", reply: "Two spoons, one cup." },
        { text: "Fresh strawberries.", reply: "Sweet, like you, darling." },
        { text: "A slice of cake.", reply: "You get the first bite, my princess." }
      ]
    },
    {
      q: "Will you stay with me?",
      options: [
        { text: "Always.", reply: "Then I'm the happiest person alive, my love." },
        { text: "Forever.", reply: "Forever sounds perfect." },
        { text: "Yes, yes, yes!", reply: "Three yeses. I'm keeping count." },
        { text: "Try and stop me.", reply: "I wouldn't dream of it." }
      ]
    }
  ],

  // `a` = array of the option texts she picked, in order.
  result: {
    title: "You make everything better",
    message: a => `${CONFIG.name}, my love, you said "${a[0]}" and chose "${a[1]}" for us. And you'd get ${a[3].replace(/\.$/, "").toLowerCase()} from me. Every answer sounded like you, and that is why I adore you.`,
    button: "One last thing..."
  },

  letter: {
    title: "A little letter for you",
    paragraphs: [
      "My dear Aynaz, my princess, my love,",
      "I'm not great at saying everything out loud, so your chocolate made you something you could keep.",
      "You are the person I want to tell about my day, the one who makes ordinary moments feel like something special.",
      "Thank you for being patient, kind, and wonderfully you. I'm grateful for you every single day.",
      "Whatever comes next, honey, I hope we get to figure it out together.",
      "If you ever try to fall, I would catch you anytime in my arms.",
      "Never forget it, my princess: you are loved, today and always."
    ],
    signature: "Always yours, your chocolate ♡",
    button: "I love this little world with you ♡"
  },

  end: {
    title: "Our little world",
    message: "Thank you for being in it with me, my love. Come back anytime you need a reminder from your chocolate."
  }
};

/* ===================== Helpers ===================== */
const $ = id => document.getElementById(id);
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const answers = [];   // saved option index per question (undefined = unanswered)
let current = 0;

/* ===================== Screens ===================== */
// Fades the current screen out, then fades the next one in.
function show(id) {
  const old = document.querySelector(".screen.active");
  const go = () => { $(id).classList.add("active"); window.scrollTo(0, 0); };
  if (!old) return go();
  old.classList.remove("active");
  old.classList.add("leaving");
  setTimeout(() => { old.classList.remove("leaving"); go(); }, 350);
}

/* ===================== Floating hearts & sparkles ===================== */
function spawnFloater() {
  const el = document.createElement("span");
  const r = Math.random();
  // sparks, plus small hearts in pink, white and black
  const kind = r < .3 ? "spark" : r < .55 ? "" : r < .8 ? "h-white" : "h-black";
  el.className = "floater " + kind;
  el.textContent = kind === "spark" ? "✦" : "♥";
  el.style.left = Math.random() * 100 + "vw";
  el.style.fontSize = (kind === "spark" ? 8 + Math.random() * 14 : 8 + Math.random() * 12) + "px";
  el.style.setProperty("--dx", (Math.random() * 80 - 40) + "px");
  el.style.setProperty("--rot", (Math.random() * 120 - 60) + "deg");
  el.style.animationDuration = 8 + Math.random() * 9 + "s";
  $("floaters").appendChild(el);
  setTimeout(() => el.remove(), 18000);
}
if (!reduceMotion) { for (let i = 0; i < 26; i++) setTimeout(spawnFloater, i * 150); setInterval(spawnFloater, 450); }

// Burst of hearts from a point (used for answers and the finale).
function burst(x, y, count = 10) {
  if (reduceMotion) return;
  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.className = "burst";
    el.textContent = Math.random() < .7 ? "♥" : "✦";
    el.style.left = x + "px"; el.style.top = y + "px";
    el.style.fontSize = 12 + Math.random() * 16 + "px";
    const ang = Math.random() * Math.PI * 2, dist = 50 + Math.random() * 90;
    el.style.setProperty("--x", Math.cos(ang) * dist + "px");
    el.style.setProperty("--y", Math.sin(ang) * dist + "px");
    el.style.setProperty("--r", Math.random() * 360 + "deg");
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1000);
  }
}
// Confetti rain of hearts for completing the quiz.
function confetti() {
  for (let i = 0; i < 6; i++) setTimeout(() => burst(Math.random() * innerWidth, innerHeight * (.2 + Math.random() * .4), 14), i * 250);
}

/* ===================== Quiz ===================== */
function renderProgress() {
  const total = CONFIG.questions.length;
  $("progress").innerHTML = CONFIG.questions.map((_, i) =>
    `<span class="${answers[i] !== undefined ? "done" : ""} ${i === current ? "now" : ""}">♥</span>`).join("");
  const done = answers.filter(v => v !== undefined).length;
  $("progress").setAttribute("aria-valuemax", total);
  $("progress").setAttribute("aria-valuenow", done);
}

function renderQuestion() {
  const item = CONFIG.questions[current];
  const saved = answers[current];
  $("qCount").textContent = `Question ${current + 1} of ${CONFIG.questions.length}`;
  $("qText").textContent = item.q;
  $("options").innerHTML = "";
  item.options.forEach((opt, i) => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "opt" + (saved === i ? " selected" : "");
    b.textContent = opt.text;
    b.setAttribute("aria-pressed", saved === i);
    b.addEventListener("click", e => choose(i, e));
    $("options").appendChild(b);
  });
  showReply(saved !== undefined ? item.options[saved].reply : "");
  $("prevBtn").style.visibility = current === 0 ? "hidden" : "visible";
  $("nextBtn").textContent = current === CONFIG.questions.length - 1 ? "See my surprise" : "Next";
  $("nextBtn").disabled = saved === undefined;   // can't skip an unanswered question
  renderProgress();
}

function showReply(text) {
  const r = $("reply");
  r.classList.remove("show"); void r.offsetWidth;  // restart animation
  r.textContent = text;
  if (text) r.classList.add("show");
}

function choose(i, e) {
  answers[current] = i;
  [...$("options").children].forEach((b, k) => { b.classList.toggle("selected", k === i); b.setAttribute("aria-pressed", k === i); });
  showReply(CONFIG.questions[current].options[i].reply);
  $("nextBtn").disabled = false;
  const r = e.currentTarget.getBoundingClientRect();
  burst(e.clientX || r.left + r.width / 2, e.clientY || r.top + r.height / 2);
  renderProgress();
}

$("prevBtn").addEventListener("click", () => { if (current > 0) { current--; renderQuestion(); } });
$("nextBtn").addEventListener("click", () => {
  if (answers[current] === undefined) return;
  if (current < CONFIG.questions.length - 1) { current++; renderQuestion(); }
  else finishQuiz();
});

function finishQuiz() {
  const picked = CONFIG.questions.map((q, i) => q.options[answers[i]].text);
  $("resultTitle").textContent = CONFIG.result.title;
  $("resultMsg").textContent = CONFIG.result.message(picked);
  $("lastBtn").textContent = CONFIG.result.button;
  show("result");
  setTimeout(confetti, 450);
}

/* ===================== Letter & ending ===================== */
$("lastBtn").addEventListener("click", () => {
  const L = CONFIG.letter;
  $("letterTitle").textContent = L.title;
  $("letterBody").innerHTML = "";
  L.paragraphs.forEach((t, i) => {
    const p = document.createElement("p");
    p.textContent = t; p.style.animationDelay = .4 + i * .9 + "s";
    $("letterBody").appendChild(p);
  });
  const delay = .4 + L.paragraphs.length * .9;
  $("letterSign").textContent = L.signature; $("letterSign").style.animationDelay = delay + "s";
  $("finalBtn").textContent = L.button; $("finalBtn").style.animationDelay = delay + .6 + "s";
  show("letter");
});

$("finalBtn").addEventListener("click", () => {
  $("endTitle").textContent = CONFIG.end.title;
  $("endMsg").textContent = CONFIG.end.message;
  show("end");
  setTimeout(confetti, 450);
});

/* ===================== Start & replay ===================== */
$("welcomeTitle").textContent = CONFIG.welcome.title;
$("welcomeSub").textContent = CONFIG.welcome.subtitle;
$("startBtn").textContent = CONFIG.welcome.button;

$("startBtn").addEventListener("click", () => {
  if (!musicStarted) { musicStarted = true; setMusic(true); }   // song fades in on the first tap
  current = 0; renderQuestion(); show("quiz");
});
$("replayBtn").addEventListener("click", () => { answers.length = 0; current = 0; show("welcome"); });

/* ===================== Music: song.m4a, low volume, fades in and out ===================== */
const MAX_VOL = 0.22;   // keep it quiet (0 to 1) — change here if you want it louder
const FADE = 3;         // seconds of fade at the start, at the end of the loop, and on pause
const song = new Audio("song.m4a");   // song.m4a must sit in the same folder as index.html
song.loop = true; song.preload = "auto"; song.setAttribute("playsinline", "");
let master = 0, wantMusic = false, musicStarted = false, ctx, gain;

// Small message at the bottom of the screen if the song can't play, so you can see what is wrong.
function note(msg) {
  const n = $("note"); n.textContent = msg; n.classList.add("show");
  setTimeout(() => n.classList.remove("show"), 7000);
}
function musicFailed(msg) {
  wantMusic = false; $("musicBtn").setAttribute("aria-pressed", false); note(msg);
}
song.addEventListener("error", () => musicFailed("Song not found: put song.m4a in the same folder as index.html"));

// iPhones ignore song.volume, so there we use a Web Audio gain node instead (needs the site hosted online).
song.volume = .5;
const volumeIsLocked = song.volume !== .5;
function setVol(v) { if (gain) gain.gain.value = v; else song.volume = v; }

setInterval(() => {
  if (song.paused) return;
  const t = song.currentTime, d = isFinite(song.duration) ? song.duration : 1e9;
  const edge = Math.max(0, Math.min(1, t / FADE, (d - t) / FADE));   // fade in at start, out at the end
  master = Math.max(0, Math.min(1, master + (wantMusic ? 1 : -1) / (FADE * 20)));
  setVol(MAX_VOL * master * edge);
  if (!wantMusic && master === 0) song.pause();
}, 50);

function setMusic(on) {
  wantMusic = on;
  $("musicBtn").setAttribute("aria-pressed", on);
  $("musicBtn").setAttribute("aria-label", on ? "Pause music" : "Play music");
  if (!on) return;
  if (volumeIsLocked && !ctx && location.protocol.startsWith("http")) {
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      gain = ctx.createGain();
      ctx.createMediaElementSource(song).connect(gain).connect(ctx.destination);
    } catch (e) { ctx = gain = null; }
  }
  if (ctx) ctx.resume();
  setVol(0);
  const p = song.play();
  if (p) p.catch(() => musicFailed("Couldn't start the song. Tap the ♪ button to try again."));
}
$("musicBtn").addEventListener("click", () => { musicStarted = true; setMusic(!wantMusic); });

/* ===================== Heart cursor (desktop) ===================== */
if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
  const c = $("cursor");
  addEventListener("mousemove", e => { c.style.left = e.clientX + "px"; c.style.top = e.clientY + "px"; });
  addEventListener("mousedown", () => c.classList.add("down"));
  addEventListener("mouseup", () => c.classList.remove("down"));
}
