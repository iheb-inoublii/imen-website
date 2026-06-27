/* ============================================
   Imen's World — shared magic ✨
   ============================================ */

/* ---------- Falling blue petals ---------- */
const BLUE_PETALS = ["💠", "❄", "✿", "❀"]; // blue already, or text glyphs colored by CSS
const PINK_PETALS = ["🌸", "🦋"]; // warm-colored — shift the hue to blue

function spawnPetal() {
  const petal = document.createElement("span");
  petal.className = "petal";
  if (Math.random() < 0.5) {
    petal.textContent = BLUE_PETALS[Math.floor(Math.random() * BLUE_PETALS.length)];
  } else {
    petal.textContent = PINK_PETALS[Math.floor(Math.random() * PINK_PETALS.length)];
    petal.style.filter = `hue-rotate(${160 + Math.random() * 60}deg) saturate(1.4)`;
  }
  petal.style.left = Math.random() * 100 + "vw";
  petal.style.fontSize = 12 + Math.random() * 18 + "px";
  const duration = 7 + Math.random() * 8;
  petal.style.animationDuration = `${duration}s, ${2 + Math.random() * 3}s`;
  document.body.appendChild(petal);
  setTimeout(() => petal.remove(), duration * 1000);
}

setInterval(spawnPetal, 700);
for (let i = 0; i < 6; i++) setTimeout(spawnPetal, i * 250);

/* ---------- Typewriter ---------- */
function typewriter(el, phrases) {
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const phrase = phrases[phraseIndex];
    el.textContent = phrase.slice(0, charIndex);

    if (!deleting && charIndex < phrase.length) {
      charIndex++;
      setTimeout(tick, 65);
    } else if (!deleting) {
      deleting = true;
      setTimeout(tick, 2200);
    } else if (charIndex > 0) {
      charIndex--;
      setTimeout(tick, 30);
    } else {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(tick, 400);
    }
  }
  tick();
}

const typeEl = document.querySelector("[data-typewriter]");
if (typeEl) {
  typewriter(typeEl, JSON.parse(typeEl.dataset.typewriter));
}

/* ---------- Scroll reveal ---------- */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

/* ---------- Joke machine ---------- */
const jokeBtn = document.getElementById("joke-btn");
const jokeText = document.getElementById("joke-text");

if (jokeBtn && jokeText) {
  const jokes = JSON.parse(jokeText.dataset.jokes);
  let lastJoke = -1;

  jokeBtn.addEventListener("click", () => {
    let next;
    do {
      next = Math.floor(Math.random() * jokes.length);
    } while (next === lastJoke && jokes.length > 1);
    lastJoke = next;

    jokeText.classList.add("fading");
    setTimeout(() => {
      jokeText.textContent = jokes[next];
      jokeText.classList.remove("fading");
    }, 300);
  });
}

/* ---------- Garden bloom stagger + click confetti ---------- */
document.querySelectorAll(".flower").forEach((flower, i) => {
  flower.style.animationDelay = i * 0.18 + "s";

  flower.addEventListener("click", () => {
    for (let j = 0; j < 8; j++) {
      const burst = document.createElement("span");
      burst.className = "petal";
      burst.textContent = "💙";
      const rect = flower.getBoundingClientRect();
      burst.style.left = rect.left + rect.width / 2 + "px";
      burst.style.top = rect.top + "px";
      burst.style.position = "fixed";
      burst.style.fontSize = "16px";
      burst.style.animationDuration = `${1.2 + Math.random()}s, 1s`;
      document.body.appendChild(burst);
      setTimeout(() => burst.remove(), 2200);
    }
  });
});

/* ---------- Twinkling stars in quote banners ---------- */
document.querySelectorAll(".quote-banner").forEach((banner) => {
  for (let i = 0; i < 14; i++) {
    const star = document.createElement("span");
    star.className = "star";
    star.textContent = "✦";
    star.style.left = Math.random() * 96 + "%";
    star.style.top = Math.random() * 85 + "%";
    star.style.fontSize = 8 + Math.random() * 12 + "px";
    star.style.animationDelay = Math.random() * 2.5 + "s";
    banner.appendChild(star);
  }
});

/* ---------- Celebration burst & sound ---------- */
function launchCelebrationBurst(x, y) {
  const icons = ["🎉", "🎊", "✨", "🚗", "🛣️", "🎺"];
  for (let i = 0; i < 24; i++) {
    const piece = document.createElement("span");
    piece.className = "celebration-piece";
    piece.textContent = icons[i % icons.length];
    piece.style.left = x + "px";
    piece.style.top = y + "px";
    piece.style.setProperty("--dx", `${(Math.random() - 0.5) * 220}px`);
    piece.style.setProperty("--dy", `${-120 - Math.random() * 180}px`);
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 2200);
  }
}

function playCelebrationSound() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return;

  const ctx = new AudioCtx();
  const now = ctx.currentTime;
  const notes = [523.25, 659.25, 783.99, 1046.5];

  notes.forEach((note, index) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = index % 2 === 0 ? "triangle" : "sine";
    osc.frequency.setValueAtTime(note, now + index * 0.1);
    gain.gain.setValueAtTime(0.0001, now + index * 0.1);
    gain.gain.exponentialRampToValueAtTime(0.08, now + index * 0.1 + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.1 + 0.24);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + index * 0.1);
    osc.stop(now + index * 0.1 + 0.25);
  });

  setTimeout(() => ctx.close(), 700);
}

const celebrateBtn = document.getElementById("celebrate-btn");
if (celebrateBtn) {
  celebrateBtn.addEventListener("click", () => {
    const rect = celebrateBtn.getBoundingClientRect();
    launchCelebrationBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
    playCelebrationSound();
    celebrateBtn.textContent = "Celebration launched! 🎉";
    celebrateBtn.disabled = true;
    setTimeout(() => {
      celebrateBtn.textContent = "Launch the celebration! 🎺";
      celebrateBtn.disabled = false;
    }, 2200);
  });
}
