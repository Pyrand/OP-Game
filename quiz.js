const quoteElement = document.getElementById('quote');
const choicesElement = document.getElementById('choices');
const nextBtn = document.getElementById('next-btn');
const scoreElement = document.getElementById('score');
const modeSelect = document.getElementById('mode');
const correctAnswerContainer = document.getElementById('correct-answer-container');

const characterList = [
    'Monkey D. Luffy', 'Roronoa Zoro', 'Nami', 'Usopp', 'Sanji', 'Tony Tony Chopper',
    'Nico Robin', 'Franky', 'Brook', 'Jinbe', 'Portgas D. Ace', 'Shanks',
    'Trafalgar Law', 'Eustass Kid', 'Boa Hancock', 'Dracule Mihawk', 'Kaido',
    'Big Mom', 'Gol D. Roger', 'Edward Newgate', 'Sabo', 'Garp', 'Smoker', 'Buggy',
    'Crocodile', 'Donquixote Doflamingo', 'Katakuri', 'Enel', 'Arlong', 'Kizaru',
    'Akainu', 'Aokiji', 'Fujitora', 'Rob Lucci', 'Vegapunk', 'Yamato', 'Oden',
    'King', 'Queen', 'Ivankov', 'Bon Clay', 'Magellan', 'Hancock', 'Kuma', 'Reiju',
    'Caesar Clown', 'Shiryu', 'Blackbeard', 'Hawkins', 'X Drake', 'Urouge'
];

let score = 0;
let highScore = 0;
let correctAnswer = '';
let quoteCache = [];
let emojiData = [];
let imageData = [];
let selectedMode = 'random';

modeSelect.addEventListener('change', () => {
    selectedMode = modeSelect.value;
    loadNextQuestion();
});

async function initializeData() {
    quoteElement.innerText = "Loading data...";
    choicesElement.innerHTML = '';
    nextBtn.style.display = 'none';

    try {
        const [quoteRes, emojiRes, imageRes] = await Promise.all([
            fetch('https://yurippe.vercel.app/api/quotes?show=one%20piece&random=10'),
            fetch('one_piece_emojis.json'),
            fetch('https://api.jikan.moe/v4/anime/21/characters')
        ]);

        if (!quoteRes.ok) throw new Error(`Quote API error: ${quoteRes.status}`);
        if (!emojiRes.ok) throw new Error(`Emoji file could not be loaded: ${emojiRes.status}`);
        if (!imageRes.ok) throw new Error(`Image data could not be retrieved: ${imageRes.status}`);

        const quotes = await quoteRes.json();
        const emojiJson = await emojiRes.json();
        const { data: imageJson } = await imageRes.json();

        emojiData = emojiJson.slice();
        quoteCache = quotes.map(q => ({ quote: q.quote, character: q.character }));
        imageData = imageJson
            .filter(c => c.character.images?.jpg?.image_url)
            .sort((a, b) => b.favorites - a.favorites)
            .slice(0, 75)
            .map(c => ({
                type: 'image',
                text: c.character.images.jpg.image_url,
                character: c.character.name
            }));

        loadNextQuestion();
    } catch (error) {
        console.error("DATA LOAD ERROR:", error);
        quoteElement.innerText = "Data could not be loaded. Please refresh the page.";
    }
}

function pickType() {
    if (selectedMode !== 'random') return selectedMode;
    const pool = [];
    if (quoteCache.length > 0) pool.push(...Array(4).fill('quote'));
    if (emojiData.length > 0) pool.push(...Array(3).fill('emoji'));
    if (imageData.length > 0) pool.push(...Array(3).fill('image'));
    return pool[Math.floor(Math.random() * pool.length)];
}

async function loadNextQuestion() {
    correctAnswerContainer.innerHTML = '';
    resetUI();

    if (selectedMode === 'quote' && quoteCache.length === 0) {
        const success = await refillQuoteCache();
        if (!success) return;
    }

    if (quoteCache.length === 0 && emojiData.length === 0 && imageData.length === 0) {
        initializeData();
        return;
    }

    const randomType = pickType();
    let data;

    if (randomType === 'quote' && quoteCache.length === 0) {
        console.log("Quotes depleted, continuing with other types.");
        loadNextQuestion();
        return;
    }

    if (randomType === 'emoji' && emojiData.length > 0) {
        const i = Math.floor(Math.random() * emojiData.length);
        data = { type: 'emoji', text: emojiData[i].emoji, character: emojiData[i].character };
        emojiData.splice(i, 1);
    } else if (randomType === 'quote' && quoteCache.length > 0) {
        const i = Math.floor(Math.random() * quoteCache.length);
        data = { type: 'quote', text: quoteCache[i].quote, character: quoteCache[i].character };
        quoteCache.splice(i, 1);
    } else if (randomType === 'image' && imageData.length > 0) {
        const i = Math.floor(Math.random() * imageData.length);
        data = { type: 'image', text: imageData[i].text, character: imageData[i].character };
        imageData.splice(i, 1);
    } else {
        loadNextQuestion();
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
}

function generateChoices(correct, sourceList) {
    let choices = [correct];
    let wrongOptions = sourceList.filter(option => option !== correct);
    while (choices.length < 4 && wrongOptions.length > 0) {
        let randIndex = Math.floor(Math.random() * wrongOptions.length);
        choices.push(wrongOptions[randIndex]);
        wrongOptions.splice(randIndex, 1);
    }
    while (choices.length < 4) {
        let randIndex = Math.floor(Math.random() * sourceList.length);
        let option = sourceList[randIndex];
        if (!choices.includes(option)) choices.push(option);
    }
    return choices.sort(() => Math.random() - 0.5);
}

async function refillQuoteCache() {
  console.log("Quote cache empty, fetching new ones from API...");
  quoteElement.innerText = "Fetching new quotes...";
  choicesElement.innerHTML = '';

  try {
    const quoteRes = await fetch('https://yurippe.vercel.app/api/quotes?show=one%20piece&random=10');
    if (!quoteRes.ok) throw new Error(`Quote API error: ${quoteRes.status}`);

    const newQuotes = await quoteRes.json();
    quoteCache = newQuotes.map(q => ({ quote: q.quote, character: q.character }));
    
    console.log("Cache successfully refilled!");
    return true;
  } catch (error) {
    console.error("ERROR while reloading quotes:", error);
    quoteElement.innerText = "New quotes could not be loaded. The game will continue with other modes.";
    return false;
  }
}

function displayQuestion(questionText, choices) {
    quoteElement.innerText = questionText;
    choicesElement.innerHTML = '';
    choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.innerText = choice;
        btn.addEventListener('click', handleChoiceClick);
        choicesElement.appendChild(btn);
    });
}

function displayImageQuestion(imageUrl, choices) {
    quoteElement.innerHTML = `<img src="${imageUrl}" alt="Character Image" style="max-width: 200px; border-radius: 12px;">`;
    choicesElement.innerHTML = '';
    choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.innerText = choice;
        btn.addEventListener('click', handleChoiceClick);
        choicesElement.appendChild(btn);
    });
}

function handleChoiceClick(event) {
    const selectedBtn = event.target;
    const allChoiceBtns = document.querySelectorAll('.choice-btn');
    allChoiceBtns.forEach(btn => {
        btn.disabled = true;
        if (btn.innerText === correctAnswer) btn.classList.add('correct');
    });
    if (selectedBtn.innerText === correctAnswer) {
        score++;
        if (score > highScore) highScore = score;
        allChoiceBtns.forEach(btn => {
            btn.disabled = true;
            if (btn.innerText === correctAnswer) btn.classList.add('correct');
        });

        const correctContainer = document.getElementById('correct-answer-container');
        correctContainer.innerHTML = `<div class="correct-answer-label">✔ Correct answer: ${correctAnswer}</div>`;

        resetUI();
        nextBtn.style.display = 'inline-block';
    }
    else {
        score = 0;
        scoreElement.innerText = `Score: ${score} | Max: ${highScore}`;
        selectedBtn.classList.add('incorrect');
    }
    nextBtn.style.display = 'inline-block';
}

function resetUI() {
    choicesElement.innerHTML = '';
    nextBtn.style.display = 'none';
    const scoreText = document.createElement('div');
    scoreText.innerHTML = `<strong>Score:</strong> ${score} &nbsp; | &nbsp; <strong>Max:</strong> ${highScore}`;
    scoreElement.innerHTML = '';
    scoreElement.appendChild(scoreText);
}

nextBtn.addEventListener('click', loadNextQuestion);
initializeData();
