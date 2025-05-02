document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.tree-view a');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            links.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            const contentId = this.getAttribute('data-content-id');
            currentIndex = 0;

            if (contentId === 'animals-material') {
                currentData = animalsData;
                showCard('Животные');
            } else if (contentId === 'food-material') {
                currentData = foodData;
                showCard('Еда');
            } else if (contentId === 'animals-test') {
                startTest(animalsData, 'Животные');
            } else if (contentId === 'food-test') {
                startTest(foodData, 'Еда');
            } else if (contentId.includes('-test')) {
                const content = document.getElementById('lesson-content');
                content.innerHTML = `
                    <div class="test-container">
                        <h2>Итоговый тест: ${contentId.includes('animals') ? 'Животные' : 'Еда'}</h2>
                        <p>Тест в разработке...</p>
                    </div>
                `;
            }
        });
    });
});

// Глобальные массивы данных
const animalsData = [
    { 
        imageSrc: 'IMG_20250430_092619_498.jpg', 
        word: 'Bull', 
        translation: 'Бык', 
        association: 'Бык ест булку. Представьте большого быка, который с аппетитом ест свежую булку.'
    },
    { 
        imageSrc: 'IMG_20250430_093403_754.jpg', 
        word: 'Beetle', 
        translation: 'Жук', 
        association: 'Жук с битой. Представьте жука, который держит биту.'
    },
    { 
        imageSrc: 'IMG-20250428-WA0009.jpg', 
        word: 'Eagle', 
        translation: 'Орел', 
        association: 'Орел смотрит на иглу. Представьте орла, который внимательно разглядывает иглу.'
    },
    { 
        imageSrc: 'IMG-20250428-WA0014.jpg', 
        word: 'Ant', 
        translation: 'Муравей', 
        association: 'Муравей держит антенну. Представьте муравья, который несет телевизионную антенну.'
    },
    { 
        imageSrc: 'IMG_20250430_092617_980.jpg', 
        word: 'Bunny', 
        translation: 'Кролик', 
        association: 'Кролик идет в баню. Представьте кролика с полотенцем, который направляется в баню.'
    },
    { 
        imageSrc: 'IMG_20250430_092551_201.jpg', 
        word: 'Bear', 
        translation: 'Медведь', 
        association: 'Медведь с биркой. Представьте медведя, на котором висит большая бирка с ценой.'
    },
    { 
        imageSrc: 'IMG_20250430_093409_921.jpg', 
        word: 'Turkey', 
        translation: 'Индейка', 
        association: 'Индейка натирает на терке. Представьте индейку, которая что-то натирает на терке.'
    },
    { 
        imageSrc: 'IMG_20250430_092554_524.jpg', 
        word: 'Gopher', 
        translation: 'Суслик', 
        association: 'Суслик играет в гольф. Представьте суслика с клюшкой для гольфа.'
    },
    { 
        imageSrc: 'IMG_20250430_093402_253.jpg', 
        word: 'Donkey', 
        translation: 'Осел', 
        association: 'Тонкий осел. Представьте очень худого, тонкого осла.'
    },
    { 
        imageSrc: 'IMG_20250430_092611_874.png', 
        word: 'Seal', 
        translation: 'Тюлень', 
        association: 'У тюленя много сил. Представьте сильного тюленя, поднимающего тяжести.'
    }
];

const foodData = [
    { 
        imageSrc: 'IMG_20250430_092546_303.jpg', 
        word: 'Porridge', 
        translation: 'Каша', 
        association: 'Каша в париже. Представьте, как вы едите кашу возле Эйфелевой башни.'
    },
    { 
        imageSrc: 'IMG_20250430_092616_187.png', 
        word: 'Cucumber', 
        translation: 'Огурец', 
        association: 'Огурец с крюком. Представьте огурец, к которому прикреплен крюк.'
    },
    { 
        imageSrc: 'IMG_20250430_092521_394.jpg', 
        word: 'Sausage', 
        translation: 'Сосиска', 
        association: 'Сосиска с соской. Представьте сосиску, которая держит соску.'
    },
    { 
        imageSrc: 'IMG_20250430_092527_385.jpg', 
        word: 'Soda', 
        translation: 'Газировка', 
        association: 'Газировка в соде. Представьте стакан газировки в пачке соды.'
    },
    { 
        imageSrc: 'IMG_20250430_092535_000.jpg', 
        word: 'Beetroot', 
        translation: 'Свекла', 
        association: 'Свекла с битой. Представьте свеклу, держащую бейсбольную биту.'
    },
    { 
        imageSrc: 'IMG_20250430_092539_239.jpg', 
        word: 'Seed', 
        translation: 'Семечка', 
        association: 'Семечка сидит в кресле. Представьте семечку, которая удобно расположилась в кресле.'
    },
    { 
        imageSrc: 'IMG_20250430_092533_382.jpg', 
        word: 'Plum', 
        translation: 'Слива', 
        association: 'Слива в пламени. Представьте сливу, окруженную пламенем.'
    }
];

let currentData = [];
let currentIndex = 0;

function showCard(sectionName) {
    const content = document.getElementById('lesson-content');
    const item = currentData[currentIndex];

    content.innerHTML = `
        <div class="material-container">
            <h2>Раздел: ${sectionName}</h2>
            <div class="word-card">
                <div class="word-header">
                    <h2>
                        ${item.word}
                        <button class="speak-btn" onclick="speakWord('${item.word.split('[')[0].trim()}')" title="Прослушать произношение">
                            <span style="font-size:0.8em;line-height:1;">🔊</span>
                        </button>
                    </h2>
                    <div class="word-image">
                        <div class="image-frame">
                            <img src="${item.imageSrc}" alt="Ассоциация для слова ${item.translation}" onerror="this.style.display='none';this.parentNode.classList.add('error');">
                        </div>
                    </div>
                </div>
                <div class="word-content">
                    <h3>Перевод:</h3>
                    <p>${item.translation}</p>
                    
                    <h3>Ассоциация:</h3>
                    <p>${item.association}</p>

                    <div class="navigation-buttons" style="display: flex; justify-content: space-between; margin-top: 20px;">
                        <button onclick="prevCard()" ${currentIndex === 0 ? 'disabled' : ''}>← Предыдущее слово</button>
                        <button onclick="nextCard()" ${currentIndex === currentData.length - 1 ? 'disabled' : ''}>Следующее слово →</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// --- Озвучка: выбор голоса ---
let selectedVoice = null;
function pickBestVoice() {
    if (!('speechSynthesis' in window)) return null;
    const synth = window.speechSynthesis;
    let voices = synth.getVoices();
    let googleVoice = voices.find(v => v.name.includes('Google US English'));
    if (googleVoice) return googleVoice;
    let enVoice = voices.find(v => v.lang && v.lang.startsWith('en'));
    if (enVoice) return enVoice;
    return voices[0] || null;
}
if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = function() {
        selectedVoice = pickBestVoice();
    };
    setTimeout(() => { selectedVoice = pickBestVoice(); }, 100);
}

window.speakWord = function(word) {
    // Используем mp3-файлы с GitHub
    const fileName = word.toLowerCase() + '.mp3';
    const url = 'https://github.com/Arsenic337492/FunGlish/raw/refs/heads/main/' + fileName;
    let audio = new Audio(url);
    audio.play();
};

function nextCard() {
    if (currentIndex < currentData.length - 1) {
        currentIndex++;
        showCard(currentData === animalsData ? 'Животные' : 'Еда');
    }
}

function prevCard() {
    if (currentIndex > 0) {
        currentIndex--;
        showCard(currentData === animalsData ? 'Животные' : 'Еда');
    }
}

function startTest(sectionData, sectionName) {
    const shuffledData = [...sectionData].sort(() => Math.random() - 0.5).slice(0, 7);
    let currentQuestionIndex = 0;
    let score = 0;
    let lastUserAnswer = null;

    // Типы заданий: 1 - выбор перевода, 2 - ввод слова, 3 - сопоставление, 4 - правда/ложь, 5 - анаграмма
    const questionTypes = [1, 2, 3, 4, 5];

    function shuffle(arr) {
        return arr.sort(() => Math.random() - 0.5);
    }

    function showQuestion() {
        const item = shuffledData[currentQuestionIndex];
        let type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
        if (currentQuestionIndex === 0) type = 3; // Сопоставление всегда первым
        if (currentQuestionIndex === 1) type = 4; // Правда/Ложь вторым
        if (currentQuestionIndex === 2) type = 5; // Анаграмма третьим
        if (currentQuestionIndex === 3) type = 2; // Ввод слова четвертым
        if (currentQuestionIndex === 4) type = 1; // Классика пятым

        const content = document.getElementById('lesson-content');
        if (type === 3) {
            // Новый drag & drop: сопоставление слов и переводов
            const words = shuffle(sectionData.map(d => d.word.split('[')[0].trim()));
            const translations = shuffle(sectionData.map(d => d.translation));
            content.innerHTML = `
                <div class="test-container">
                    <h2>Тест: ${sectionName}</h2>
                    <div class="progress">Сопоставьте слова и переводы (перетащите слова мышкой)</div>
                    <div class="matching-list" id="matchingList">
                        ${translations.map((t, i) => `
                            <div class="match-row" data-translation="${t}">
                                <div class="match-dropzone" data-index="${i}"></div>
                                <span style="margin-left:12px;">${t}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="draggable-words" id="draggableWords" style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:20px;">
                        ${words.map(w => `
                            <div class="match-word" draggable="true" data-word="${w}"><span class="drag-handle">⋮⋮</span>${w}</div>
                        `).join('')}
                    </div>
                    <button type="button" onclick="checkMatchingDnD()">Проверить</button>
                    <div class="matching-feedback" id="matchingFeedback"></div>
                </div>
            `;

            // Drag & drop logic (новая версия)
            let draggedEl = null;

            document.querySelectorAll('.match-word').forEach(el => {
                el.addEventListener('dragstart', e => {
                    draggedEl = el;
                    setTimeout(() => el.classList.add('dragging'), 0);
                });
                el.addEventListener('dragend', e => {
                    draggedEl = null;
                    el.classList.remove('dragging');
                });
            });

            document.querySelectorAll('.match-dropzone').forEach(zone => {
                zone.addEventListener('dragover', e => {
                    e.preventDefault();
                    zone.classList.add('over');
                });
                zone.addEventListener('dragleave', e => {
                    zone.classList.remove('over');
                });
                zone.addEventListener('drop', e => {
                    e.preventDefault();
                    zone.classList.remove('over');
                    // Если уже есть слово — вернуть его обратно в пул
                    if (zone.firstChild) {
                        document.getElementById('draggableWords').appendChild(zone.firstChild);
                    }
                    if (draggedEl) {
                        zone.appendChild(draggedEl);
                        zone.classList.add('filled');
                    }
                });
            });

            // Вернуть слово обратно в пул
            document.getElementById('draggableWords').addEventListener('dragover', e => e.preventDefault());
            document.getElementById('draggableWords').addEventListener('drop', e => {
                e.preventDefault();
                if (draggedEl) {
                    document.getElementById('draggableWords').appendChild(draggedEl);
                }
            });

            window.checkMatchingDnD = function() {
                const rows = document.querySelectorAll('.match-row');
                let correct = 0;
                let total = rows.length;
                let userPairs = [];
                rows.forEach(row => {
                    const dropzone = row.querySelector('.match-dropzone');
                    const translation = row.getAttribute('data-translation');
                    const wordEl = dropzone.querySelector('.match-word');
                    let userWord = '';
                    if (wordEl) {
                        userWord = wordEl.getAttribute('data-word');
                        userPairs.push({word: userWord, translation});
                        const data = sectionData.find(d => d.word.split('[')[0].trim() === userWord);
                        if (data && data.translation === translation) {
                            correct++;
                        }
                    } else {
                        userPairs.push({word: '(не выбрано)', translation});
                    }
                });
                let isAllCorrect = correct === total;
                showResult(isAllCorrect, `${correct} из ${total} правильно`, userPairs);
            };
            return;
        }

        if (type === 1) {
            // Классический выбор перевода
            const answers = shuffle([
                item.translation,
                ...sectionData.filter(d => d.translation !== item.translation).slice(0, 3).map(d => d.translation)
            ]);
            content.innerHTML = `
                <div class="test-container">
                    <h2>Тест: ${sectionName}</h2>
                    <div class="progress">Вопрос ${currentQuestionIndex + 1} из ${shuffledData.length}</div>
                    <div class="question">
                        <h3>Как переводится слово "${item.word}"?</h3>
                        <div class="answers">
                            ${answers.map((answer, idx) => `<button class="answer-btn" type="button">${answer.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</button>`).join('')}
                        </div>
                    </div>
                </div>
            `;
            document.querySelectorAll('.answer-btn').forEach((btn, idx) => {
                btn.addEventListener('click', function() {
                    // Используем текст кнопки напрямую, чтобы избежать проблем с encode/decode
                    const selected = this.textContent.trim();
                    const correct = item.translation;
                    lastUserAnswer = selected;
                    let isCorrect = selected === correct;
                    showResult(isCorrect, correct, selected);
                });
            });
        } else if (type === 2) {
            // Ввод английского слова по переводу
            content.innerHTML = `
                <div class="test-container">
                    <h2>Тест: ${sectionName}</h2>
                    <div class="progress">Вопрос ${currentQuestionIndex + 1} из ${shuffledData.length}</div>
                    <div class="question">
                        <h3>Введите английское слово для перевода "${item.translation}"</h3>
                        <input type="text" id="wordInput" autocomplete="off" style="font-size:1.2em; padding:8px; width:220px;">
                        <button onclick="checkInputAnswer()">Проверить</button>
                    </div>
                </div>
            `;
            window.checkInputAnswer = function() {
                const val = document.getElementById('wordInput').value.trim().toLowerCase();
                const correct = item.word.split('[')[0].trim().toLowerCase();
                lastUserAnswer = val;
                const isCorrect = val === correct;
                showResult(isCorrect, correct, val);
            }
        } else if (type === 4) {
            // Правда/Ложь
            const isTrue = Math.random() > 0.5;
            let fakeTranslation = item.translation;
            if (!isTrue) {
                const other = sectionData.filter(d => d.translation !== item.translation);
                fakeTranslation = other[Math.floor(Math.random() * other.length)].translation;
            }
            content.innerHTML = `
                <div class="test-container">
                    <h2>Тест: ${sectionName}</h2>
                    <div class="progress">Вопрос ${currentQuestionIndex + 1} из ${shuffledData.length}</div>
                    <div class="question">
                        <h3>${item.word} — ${fakeTranslation}</h3>
                        <div class="answers">
                            <button class="answer-btn" type="button">Правда</button>
                            <button class="answer-btn" type="button">Ложь</button>
                        </div>
                    </div>
                </div>
            `;
            document.querySelectorAll('.answer-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const selected = this.textContent.trim();
                    lastUserAnswer = selected;
                    let isCorrect = (selected === (isTrue ? 'Правда' : 'Ложь'));
                    showResult(isCorrect, isTrue ? 'Правда' : 'Ложь', lastUserAnswer);
                });
            });
        } else if (type === 5) {
            // Анаграмма
            const word = item.word.split('[')[0].trim();
            const shuffled = shuffle(word.toLowerCase().split('')).join('');
            content.innerHTML = `
                <div class="test-container">
                    <h2>Тест: ${sectionName}</h2>
                    <div class="progress">Вопрос ${currentQuestionIndex + 1} из ${shuffledData.length}</div>
                    <div class="question">
                        <h3>Соберите английское слово из букв: <span class="anagram">${shuffled}</span></h3>
                        <input type="text" id="anagramInput" autocomplete="off" style="font-size:1.2em; padding:8px; width:220px;">
                        <button onclick="checkAnagram()">Проверить</button>
                    </div>
                </div>
            `;
            window.checkAnagram = function() {
                const val = document.getElementById('anagramInput').value.trim().toLowerCase();
                const correct = word.toLowerCase();
                lastUserAnswer = val;
                showResult(val === correct, correct, val);
            }
        }
    }

    function showResult(isCorrect, correct, userAnswer) {
        // Увеличиваем счет за правильный ответ
        if (isCorrect) {
            score++; // Добавляем эту строку
            if (typeof showSuccessEffects === 'function') {
                showSuccessEffects();
            }
        }
        
        const content = document.getElementById('lesson-content');
        let userBlock = '';
        if (Array.isArray(userAnswer)) {
            userBlock = `<div style="margin-top:10px;"><b>Ваши ответы:</b><ul>` +
                userAnswer.map(pair => `<li>${pair.word} — ${pair.translation}</li>`).join('') +
                `</ul></div>`;
        } else if (typeof userAnswer === 'string' && userAnswer !== undefined && userAnswer !== null) {
            userBlock = `<div style="margin-top:10px;"><b>Ваш ответ:</b> ${userAnswer || '(пусто)'}</div>`;
        }
        content.innerHTML = `
            <div class="test-container">
                <h2>Тест: ${sectionName}</h2>
                <div class="result ${isCorrect ? 'correct' : 'incorrect'}">
                    <h3>${isCorrect ? 'Правильно!' : 'Неправильно!'}</h3>
                    <p>Правильный ответ: ${correct}</p>
                    ${!isCorrect ? userBlock : ''}
                </div>
                <button onclick="nextQuestion()">Далее</button>
            </div>
        `;
    }

    window.nextQuestion = function() {
        currentQuestionIndex++;
        if (currentQuestionIndex < shuffledData.length) {
            showQuestion();
        } else {
            const content = document.getElementById('lesson-content');
            const percentage = ((score / shuffledData.length) * 100).toFixed(1).replace('.', ',');
            let nextSectionBtn = '';
            if (sectionName === 'Животные') {
                nextSectionBtn = `<button onclick="goToSection('food-material')">Далее</button>`;
            } else if (sectionName === 'Еда') {
                nextSectionBtn = `<button onclick="location.href='index.html'">Далее</button>`;
            } else {
                nextSectionBtn = `<button onclick="location.href='index.html'">Далее</button>`;
            }
            content.innerHTML = `
                <div class="test-container">
                    <h2>Тест завершен!</h2>
                    <div class="final-score">
                        <h3>Ваш результат: ${score} из ${shuffledData.length}</h3>
                        <p>${percentage}% правильных ответов</p>
                    </div>
                    ${nextSectionBtn}
                    <button onclick="restartTest()">Пройти тест заново</button>
                </div>
            `;
        }
    };
    window.goToSection = function(contentId) {
        // Имитируем клик по нужному пункту меню
        const link = document.querySelector(`[data-content-id="${contentId}"]`);
        if (link) link.click();
    };
    window.restartTest = function() {
        startTest(sectionData, sectionName);
    };

    showQuestion();
}
