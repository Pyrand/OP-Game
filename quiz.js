const quoteElement = document.getElementById('quote');
const choicesElement = document.getElementById('choices');
const nextBtn = document.getElementById('next-btn');
const scoreElement = document.getElementById('score');
const modeSelect = document.getElementById('mode');
const correctAnswerContainer = document.getElementById('correct-answer-container');


let score = 0;
const HIGH_SCORE_KEY = 'opQuizBestStreak';
let highScore = loadHighScore();
let correctAnswer = '';
let quoteCache = [];
let emojiData = [];
let imageData = [];
let selectedMode = 'random';
// Mode the question on screen was loaded with, and whether it is still waiting for an answer
let questionMode = null;
let questionPending = false;


const characterList = [
    'Monkey D. Luffy', 'Roronoa Zoro', 'Nami', 'Usopp', 'Sanji', 'Tony Tony Chopper',
    'Nico Robin', 'Franky', 'Brook', 'Jinbe', 'Portgas D. Ace', 'Shanks',
    'Trafalgar Law', 'Eustass Kid', 'Boa Hancock', 'Dracule Mihawk', 'Kaido',
    'Big Mom', 'Gol D. Roger', 'Edward Newgate', 'Sabo', 'Garp', 'Smoker', 'Buggy',
    'Crocodile', 'Donquixote Doflamingo', 'Katakuri', 'Enel', 'Arlong', 'Kizaru',
    'Akainu', 'Aokiji', 'Fujitora', 'Rob Lucci', 'Vegapunk', 'Yamato', 'Oden',
    'King', 'Queen', 'Ivankov', 'Magellan', 'Kuma', 'Reiju',
    'Caesar Clown', 'Shiryu', 'Blackbeard', 'Hawkins', 'X Drake', 'Urouge',
    'Kozuki Momonosuke', 'Kinemon', 'Raizo', 'Kanjuro', 'Ashura Doji', 'Inuarashi', 'Nekomamushi',
    'Carrot', 'Pedro', 'Pekoms', 'Tamago', 'Perospero', 'Smoothie', 'Cracker', 'Oven', 'Daifuku',
    'Sengoku', 'Tsuru', 'Koby', 'Helmeppo', 'Tashigi', 'Hina', 'Momonga', 'Onigumo', 'Doberman',
    'Monkey D. Dragon', 'Koala', 'Hack', 'Lindbergh', 'Morley', 'Karasu', 'Belo Betty',
    'Gecko Moria', 'Edward Weevil',
    'Alvida', 'Morgan', 'Kuro', 'Don Krieg', 'Gin', 'Pearl', 'Johnny', 'Yosaku',
    'Vivi', 'Igaram', 'Pell', 'Chaka', 'Kohza', 'Toto', 'Mr. 1', 'Mr. 3', 'Mr. 5', 'Miss Valentine',
    'Wyper', 'Gan Fall', 'Pagaya', 'Conis', 'Satori', 'Shura', 'Gedatsu', 'Ohm',
    'Iceburg', 'Paulie', 'Tilestone', 'Lulu', 'Galley-La', 'Spandam', 'Jabra', 'Kumadori', 'Fukurou', 'Kalifa',
    'Perona', 'Absalom', 'Hogback', 'Ryuma', 'Oars', 'Lola', 'Cindry',
    'Rayleigh', 'Shakky', 'Camie', 'Pappag', 'Hatchan', 'Duval', 'Marguerite', 'Sweet Pea', 'Aphelandra',
    'Hannyabal', 'Domino', 'Sadi', 'Minotaurus',
    'Neptune', 'Shirahoshi', 'Fukaboshi', 'Ryuboshi', 'Manboshi', 'Otohime', 'Fisher Tiger', 'Hody Jones', 'Vander Decken IX',
    'Vergo', 'Monet', 'Brownbeard',
    'Rebecca', 'Kyros', 'Riku Doldo III', 'Viola', 'Scarlett', 'Cavendish', 'Bartolomeo', 'Sai', 'Don Chinjao',
    'Ideo', 'Leo', 'Hajrudin', 'Orlumbus', 'Bellamy', 'Senor Pink', 'Machvise', 'Dellinger', 'Lao G', 'Gladius', 'Baby 5', 'Buffalo',
    'Zunisha', 'Wanda', 'Sicilian', 'Giovanni', 'Concelot', 'Yomo', 'Milky', 'Bariete', 'Tristan', 'Miyagi',
    'Pudding', 'Judge', 'Ichiji', 'Niji', 'Yonji', 'Capone Bege', 'Chiffon', 'Pez', 'Bobbin', 'Amande', 'Opera', 'Counter', 'Cadenza', 'Cabaletta',
    'Marco', 'Uta', 'Jewelry Bonney', 'Bepo', 'Killer', 'Benn Beckman', 'Kaku', 'Rocks D. Xebec', 'Hiluluk',
    'Otama', 'Ulti', 'Okiku', 'Loki', 'Corazon', 'Mr. 2',
    'Bellemere', 'Nojiko', 'Zeff', 'Kuina', 'Kureha', 'Makino', 'Dadan', 'Zephyr', 'Imu', 'Foxy', 'Jango',
    'Izou', 'Kawamatsu', 'Komurasaki', 'Black Maria', 'Sugar', 'Jaguar D. Saul', 'Montblanc Norland',
    'Scratchmen Apoo', 'Tom', 'Morgans'
];

// API names that refer to a character by a different name than characterList.
// Names that only differ by extra parts (e.g. "Charlotte Katakuri" vs "Katakuri")
// are matched automatically by isSameCharacter and don't need an entry here.
const NAME_ALIASES = {
    'Kaidou': 'Kaido',
    'Marshall D. Teach': 'Blackbeard',
    'Kuzan': 'Aokiji',
    'Borsalino': 'Kizaru',
    'Sakazuki': 'Akainu',
    'Isshou': 'Fujitora',
    'Charlotte Linlin': 'Big Mom',
    'Donquixote Rosinante': 'Corazon',
    'Bentham': 'Mr. 2',
    'Jinbei': 'Jinbe',
    'Wiper': 'Wyper',
    'Shimotsuki Ryuuma': 'Ryuma'
};

// Maps an API name to its characterList spelling, or null if the character isn't in the list.
// This keeps the correct choice formatted like the wrong ones, so it can't be spotted by its name.
function canonicalName(name) {
    if (NAME_ALIASES[name]) return NAME_ALIASES[name];
    if (characterList.includes(name)) return name;
    const matches = characterList.filter(c => isSameCharacter(c, name));
    return matches.length === 1 ? matches[0] : null;
}



modeSelect.addEventListener('change', () => {
    selectedMode = modeSelect.value;
    // Changing mode must not skip an unanswered question, so it applies from the next one
    if (questionPending) {
        showModeChangeNote();
        return;
    }
    loadNextQuestion();
});

function showModeChangeNote() {
    if (selectedMode === questionMode) {
        correctAnswerContainer.replaceChildren();
        return;
    }
    const note = document.createElement('div');
    note.className = 'mode-change-note';
    note.textContent = 'The new mode will start from the next question.';
    correctAnswerContainer.replaceChildren(note);
}

nextBtn.addEventListener('click', () => {
    playClickSound();
    loadNextQuestion();
});


async function initializeData() {
    quoteElement.innerText = "Loading data...";
    choicesElement.innerHTML = '';
    nextBtn.style.display = 'none';

    emojiData = EMOJI_DATA.slice();

    // Load each API independently so one failing API doesn't break the whole game
    const [quoteResult, imageResult] = await Promise.allSettled([
        loadQuotes(),
        fetchJson('https://api.jikan.moe/v4/anime/21/characters')
    ]);

    // loadQuotes never rejects, it falls back to the offline pool
    quoteCache = quoteResult.value;

    if (imageResult.status === 'fulfilled') {
        imagePool = parseImages(imageResult.value);
        imageData = imagePool.slice();
    }
    else console.error("IMAGE LOAD ERROR:", imageResult.reason);

    if (quoteCache.length === 0 && emojiData.length === 0 && imageData.length === 0) {
        quoteElement.innerText = "Data could not be loaded. Please refresh the page.";
        return;
    }

    loadNextQuestion();
}

async function fetchJson(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Request to ${url} failed: ${res.status}`);
    return res.json();
}

const QUOTE_API_URL = 'https://yurippe.vercel.app/api/quotes?show=one%20piece&random=10';

// Quotes already asked, keyed by quoteKey, so refills don't repeat them
const usedQuotes = new Set();

// Punctuation-insensitive key, so "Sometimes, the blood..." and "Sometimes the blood..." count as the same quote
function quoteKey(text) {
    return text.toLowerCase().replace(/[^a-z0-9]/g, '');
}

// True if the quote contains the speaker's own name, which would give the answer away
function mentionsOwnName(text, names) {
    const words = new Set(nameTokens(text));
    return names.some(name => nameTokens(name).some(t => t.length > 2 && words.has(t)));
}

function parseQuotes(quotes) {
    const seen = new Set();
    const result = [];
    for (const q of quotes) {
        const character = canonicalName(q.character);
        // Drop stage directions like "*To Captain Kuro*"
        const quote = (q.quote || '').replace(/\*[^*]*\*/g, '').trim();
        const key = quoteKey(quote);
        if (!character || !key || seen.has(key) || usedQuotes.has(key)) continue;
        if (mentionsOwnName(quote, [q.character, character])) continue;
        seen.add(key);
        result.push({ quote, character });
    }
    return result;
}

// Never fails: falls back to the offline pool when the API is down or only returns quotes already asked
async function loadQuotes() {
    let quotes = [];
    try {
        quotes = parseQuotes(await fetchJson(QUOTE_API_URL));
    } catch (error) {
        console.error("QUOTE LOAD ERROR, using offline quotes:", error);
    }
    if (quotes.length === 0) quotes = parseQuotes(QUOTE_DATA);
    if (quotes.length === 0) {
        // Every quote has been asked, start the pool over
        usedQuotes.clear();
        quotes = parseQuotes(QUOTE_DATA);
    }
    return quotes;
}

// Jikan (MyAnimeList) returns names as "Last, First" (e.g. "Monkey D., Luffy"),
// convert them to "Monkey D. Luffy" so they match the other choices.
function normalizeName(name) {
    const parts = name.split(',').map(p => p.trim());
    return parts.length === 2 && parts[1] ? `${parts[0]} ${parts[1]}` : name;
}

// Only the most popular characters are used; further down the list they get too obscure to guess
const IMAGE_POOL_SIZE = 150;

// Every usable character from the API, kept so refills don't have to call the API again
let imagePool = [];

function parseImages({ data }) {
    return data
        .filter(c => c.character.images?.jpg?.image_url)
        .sort((a, b) => b.favorites - a.favorites)
        .slice(0, IMAGE_POOL_SIZE)
        .map(c => ({
            type: 'image',
            text: c.character.images.jpg.image_url,
            character: canonicalName(normalizeName(c.character.name)),
            favorites: c.favorites
        }))
        .filter(c => c.character);
}

// Popular characters are more likely to come first, but the log keeps lesser-known ones in play
// (a character with 100k favorites is ~4x as likely as one with 15, not 7000x)
function pickWeightedImageIndex() {
    const weights = imageData.map(d => Math.log((d.favorites || 0) + 2));
    let r = Math.random() * weights.reduce((a, b) => a + b, 0);
    for (let i = 0; i < weights.length; i++) {
        r -= weights[i];
        if (r < 0) return i;
    }
    return weights.length - 1;
}


function pickType() {
    if (selectedMode !== 'random') return selectedMode;
    const pool = [];
    if (quoteCache.length > 0) pool.push(...Array(4).fill('quote'));
    if (emojiData.length > 0) pool.push(...Array(3).fill('emoji'));
    if (imageData.length > 0) pool.push(...Array(3).fill('image'));
    return pool[Math.floor(Math.random() * pool.length)];
}

let loadId = 0;

async function loadNextQuestion() {
    const currentLoad = ++loadId;
    questionPending = false;
    correctAnswerContainer.innerHTML = '';
    resetUI();

    const refills = {
        quote: [() => quoteCache, refillQuoteCache],
        image: [() => imageData, refillImageCache],
        emoji: [() => emojiData, refillEmojiCache]
    };
    const refill = refills[selectedMode];
    if (refill && refill[0]().length === 0) {
        const success = await refill[1]();
        // A newer load (e.g. mode changed) started while we were waiting
        if (currentLoad !== loadId) return;
        if (!success || refill[0]().length === 0) {
            if (success) quoteElement.innerText = "No new data received. Please try again.";
            nextBtn.style.display = 'inline-block';
            return;
        }
    }

    if (quoteCache.length === 0 && emojiData.length === 0 && imageData.length === 0) {
        initializeData();
        return;
    }

    const randomType = pickType();
    let data;

    if (randomType === 'emoji' && emojiData.length > 0) {
        const i = Math.floor(Math.random() * emojiData.length);
        data = { type: 'emoji', text: emojiData[i].emoji, character: emojiData[i].character };
        emojiData.splice(i, 1);
    } else if (randomType === 'quote' && quoteCache.length > 0) {
        const i = Math.floor(Math.random() * quoteCache.length);
        data = { type: 'quote', text: quoteCache[i].quote, character: quoteCache[i].character };
        usedQuotes.add(quoteKey(data.text));
        quoteCache.splice(i, 1);
    } else if (randomType === 'image' && imageData.length > 0) {
        const i = pickWeightedImageIndex();
        data = { type: 'image', text: imageData[i].text, character: imageData[i].character };
        imageData.splice(i, 1);
    } else {
        console.log("No data available for selected type, reinitializing...");
        initializeData();
        return;
    }

    correctAnswer = data.character;
    const choices = generateChoices(correctAnswer, characterList);

    if (data.type === 'image') {
        displayImageQuestion(data.text, choices);
    } else {
        const questionText = data.type === 'emoji' ? data.text : `"${data.text}"`;
        displayQuestion(questionText, choices);
    }
    questionMode = selectedMode;
    questionPending = true;
}

function nameTokens(name) {
    return name.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(Boolean);
}

function isSameCharacter(a, b) {
    const ta = nameTokens(a), tb = nameTokens(b);
    if (ta.length === 0 || tb.length === 0) return a === b;
    const [shorter, longer] = ta.length <= tb.length ? [ta, tb] : [tb, ta];
    return shorter.every(t => longer.includes(t));
}

function generateChoices(correct, sourceList) {
    let choices = [correct];
    let wrongOptions = sourceList.filter(option => !isSameCharacter(option, correct));
    while (choices.length < 4 && wrongOptions.length > 0) {
        let randIndex = Math.floor(Math.random() * wrongOptions.length);
        choices.push(wrongOptions[randIndex]);
        wrongOptions.splice(randIndex, 1);
    }
    // Fisher-Yates shuffle (sort with a random comparator is biased)
    for (let i = choices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [choices[i], choices[j]] = [choices[j], choices[i]];
    }
    return choices;
}



async function refillQuoteCache() {
  console.log("Quote cache empty, fetching new ones from API...");
  quoteElement.innerText = "Fetching new quotes...";
  choicesElement.innerHTML = '';

  quoteCache = await loadQuotes();
  console.log("Cache successfully refilled!");
  return true;
}

async function refillImageCache() {
  // Every character has been shown once, start the pool over without another API call
  if (imagePool.length > 0) {
    imageData = imagePool.slice();
    return true;
  }

  console.log("Image cache empty, fetching new ones from API...");
  quoteElement.innerText = "Fetching new images...";
  choicesElement.innerHTML = '';

  try {
    imagePool = parseImages(await fetchJson('https://api.jikan.moe/v4/anime/21/characters'));
    imageData = imagePool.slice();

    console.log("Image cache successfully refilled!");
    return true;
  } catch (error) {
    console.error("ERROR while reloading images:", error);
    quoteElement.innerText = "New images could not be loaded. The game will continue with other modes.";
    return false;
  }
}

async function refillEmojiCache() {
    emojiData = EMOJI_DATA.slice();
    return true;
}



function displayQuestion(questionText, choices) {
    quoteElement.textContent = questionText;
    renderChoices(choices);
}

// Stop skipping after this many broken images in a row (e.g. offline or the image host is down)
const MAX_IMAGE_FAILURES = 5;
let imageFailures = 0;

function displayImageQuestion(imageUrl, choices) {
    const questionLoad = loadId;
    const img = document.createElement('img');
    img.alt = 'Character Image';
    img.onload = () => { imageFailures = 0; };
    img.onerror = () => {
        // Ignore if the player already answered or another question has replaced this one
        if (questionLoad !== loadId || !questionPending) return;
        console.error("IMAGE ERROR, skipping question:", imageUrl);
        if (++imageFailures >= MAX_IMAGE_FAILURES) {
            imageFailures = 0;
            questionPending = false;
            choicesElement.innerHTML = '';
            quoteElement.innerText = "Images could not be loaded. Please try again or pick another mode.";
            nextBtn.style.display = 'inline-block';
            return;
        }
        loadNextQuestion();
    };
    img.src = imageUrl;
    quoteElement.replaceChildren(img);
    renderChoices(choices);
}

function renderChoices(choices) {
    choicesElement.innerHTML = '';
    choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = choice;
        btn.dataset.choice = choice;
        btn.addEventListener('click', handleChoiceClick);
        choicesElement.appendChild(btn);
    });
}

function handleChoiceClick(event) {
    const selectedBtn = event.currentTarget;
    questionPending = false;
    const allChoiceBtns = document.querySelectorAll('.choice-btn');
    allChoiceBtns.forEach(btn => {
        btn.disabled = true;
        if (btn.dataset.choice === correctAnswer) btn.classList.add('correct');
    });
    const isCorrect = selectedBtn.dataset.choice === correctAnswer;
    const label = document.createElement('div');
    if (isCorrect) {
        playSound(true);

        score++;
        if (score > highScore) {
            highScore = score;
            saveHighScore(highScore);
        }

        label.className = 'correct-answer-label feedback-correct';
        label.textContent = `✔ Correct answer: ${correctAnswer}`;
    }
    else {
        playSound(false);

        score = 0;
        selectedBtn.classList.add('incorrect');

        label.className = 'correct-answer-label feedback-incorrect';
        label.textContent = `✘ Wrong! Correct answer: ${correctAnswer}`;
    }
    correctAnswerContainer.replaceChildren(label);
    updateScore();
    nextBtn.style.display = 'inline-block';
}

function resetUI() {
    choicesElement.innerHTML = '';
    nextBtn.style.display = 'none';
    updateScore();
}

function updateScore() {
    const scoreText = document.createElement('div');
    scoreText.innerHTML = `<strong>Streak:</strong> ${score} &nbsp; | &nbsp; <strong>Best:</strong> ${highScore}`;
    scoreElement.innerHTML = '';
    scoreElement.appendChild(scoreText);
}

// Storage can be unavailable (private mode, blocked site data), so the game falls back to 0
function loadHighScore() {
    try {
        const saved = parseInt(localStorage.getItem(HIGH_SCORE_KEY), 10);
        return Number.isFinite(saved) && saved > 0 ? saved : 0;
    } catch {
        return 0;
    }
}

function saveHighScore(value) {
    try {
        localStorage.setItem(HIGH_SCORE_KEY, String(value));
    } catch {
        // Best streak just won't persist this session
    }
}

let sharedAudioContext = null;

function getAudioContext() {
    if (!sharedAudioContext) {
        sharedAudioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (sharedAudioContext.state === 'suspended') sharedAudioContext.resume();
    return sharedAudioContext;
}

function playSound(isCorrect) {
    try {
        const audioContext = getAudioContext();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        if (isCorrect) {
            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2);
        } else {
            oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(350, audioContext.currentTime + 0.08);
        }
        
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(isCorrect ? 0.1 : 0.05, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + (isCorrect ? 0.3 : 0.2));
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + (isCorrect ? 0.3 : 0.2));
    } catch (error) {
        console.log('Audio not supported');
    }
}

function playClickSound() {
    try {
        const audioContext = getAudioContext();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.05);
        
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.04, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
        console.log('Audio not supported');
    }
}

initializeData();
