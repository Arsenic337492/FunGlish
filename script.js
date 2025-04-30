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
        word: 'Bull [бул]', 
        translation: 'Бык', 
        association: 'Бык ест булку. Представьте большого быка, который с аппетитом ест свежую булку.'
    },
    { 
        imageSrc: 'IMG_20250430_093403_754.jpg', 
        word: 'Beetle [битл]', 
        translation: 'Жук', 
        association: 'Жук с битой. Представьте жука, который держит биту.'
    },
    { 
        imageSrc: 'IMG-20250428-WA0009.jpg', 
        word: 'Eagle [игл]', 
        translation: 'Орел', 
        association: 'Орел смотрит на иглу. Представьте орла, который внимательно разглядывает иглу.'
    },
    { 
        imageSrc: 'IMG-20250428-WA0014.jpg', 
        word: 'Ant [энт]', 
        translation: 'Муравей', 
        association: 'Муравей держит антенну. Представьте муравья, который несет телевизионную антенну.'
    },
    { 
        imageSrc: 'IMG_20250430_092617_980.jpg', 
        word: 'Bunny [бани]', 
        translation: 'Кролик', 
        association: 'Кролик идет в баню. Представьте кролика с полотенцем, который направляется в баню.'
    },
    { 
        imageSrc: 'IMG_20250430_092551_201.jpg', 
        word: 'Bear [бэа]', 
        translation: 'Медведь', 
        association: 'Медведь с биркой. Представьте медведя, на котором висит большая бирка с ценой.'
    },
    { 
        imageSrc: 'IMG_20250430_093409_921.jpg', 
        word: 'Turkey [тёки]', 
        translation: 'Индейка', 
        association: 'Индейка натирает на терке. Представьте индейку, которая что-то натирает на терке.'
    },
    { 
        imageSrc: 'IMG_20250430_092554_524.jpg', 
        word: 'Gopher [гофэ]', 
        translation: 'Суслик', 
        association: 'Суслик играет в гольф. Представьте суслика с клюшкой для гольфа.'
    },
    { 
        imageSrc: 'IMG_20250430_093402_253.jpg', 
        word: 'Donkey [донки]', 
        translation: 'Осел', 
        association: 'Тонкий осел. Представьте очень худого, тонкого осла.'
    },
    { 
        imageSrc: 'IMG_20250430_092611_874.png', 
        word: 'Seal [сил]', 
        translation: 'Тюлень', 
        association: 'У тюленя много сил. Представьте сильного тюленя, поднимающего тяжести.'
    }
];

const foodData = [
    { 
        imageSrc: 'IMG_20250430_092546_303.jpg', 
        word: 'Porridge [поридж]', 
        translation: 'Каша', 
        association: 'Каша в париже. Представьте, как вы едите кашу возле Эйфелевой башни.'
    },
    { 
        imageSrc: 'IMG_20250430_092616_187.png', 
        word: 'Cucumber [кьюкамбэ]', 
        translation: 'Огурец', 
        association: 'Огурец с крюком. Представьте огурец, к которому прикреплен крюк.'
    },
    { 
        imageSrc: 'IMG_20250430_092521_394.jpg', 
        word: 'Sausage [сосидж]', 
        translation: 'Сосиска', 
        association: 'Сосиска с соской. Представьте сосиску, которая держит соску.'
    },
    { 
        imageSrc: 'IMG_20250430_092527_385.jpg', 
        word: 'Soda [сода]', 
        translation: 'Газировка', 
        association: 'Газировка в соде. Представьте стакан газировки в пачке соды.'
    },
    { 
        imageSrc: 'IMG_20250430_092535_000.jpg', 
        word: 'Beetroot [битрут]', 
        translation: 'Свекла', 
        association: 'Свекла с битой. Представьте свеклу, держащую бейсбольную биту.'
    },
    { 
        imageSrc: 'IMG_20250430_092539_239.jpg', 
        word: 'Seed [сид]', 
        translation: 'Семечка', 
        association: 'Семечка сидит в кресле. Представьте семечку, которая удобно расположилась в кресле.'
    },
    { 
        imageSrc: 'IMG_20250430_092533_382.jpg', 
        word: 'Plum [плам]', 
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
                    <h2>${item.word}</h2>
                    <div class="word-image">
                        <img src="${item.imageSrc}" alt="Ассоциация для слова ${item.translation}">
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
    const shuffledData = [...sectionData].sort(() => Math.random() - 0.5).slice(0, 5);
    let currentQuestionIndex = 0;
    let score = 0;

    function showQuestion() {
        const item = shuffledData[currentQuestionIndex];
        const answers = [
            item.translation,
            ...sectionData
                .filter(d => d.translation !== item.translation)
                .sort(() => Math.random() - 0.5)
                .slice(0, 3)
                .map(d => d.translation)
        ].sort(() => Math.random() - 0.5);

        const content = document.getElementById('lesson-content');
        content.innerHTML = `
            <div class="test-container">
                <h2>Итоговый тест: ${sectionName}</h2>
                <div class="progress">Вопрос ${currentQuestionIndex + 1} из ${shuffledData.length}</div>
                <div class="question">
                    <h3>Как переводится слово "${item.word}"?</h3>
                    <div class="answers">
                        ${answers.map((answer, index) => `
                            <button onclick="checkAnswer('${answer}', '${item.translation}')">${answer}</button>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    window.checkAnswer = function(selected, correct) {
        const isCorrect = selected === correct;
        if (isCorrect) score++;

        const content = document.getElementById('lesson-content');
        content.innerHTML = `
            <div class="test-container">
                <h2>Итоговый тест: ${sectionName}</h2>
                <div class="result ${isCorrect ? 'correct' : 'incorrect'}">
                    <h3>${isCorrect ? 'Правильно!' : 'Неправильно!'}</h3>
                    <p>Правильный ответ: ${correct}</p>
                </div>
                <button onclick="nextQuestion()">Далее</button>
            </div>
        `;
    };

    window.nextQuestion = function() {
        currentQuestionIndex++;
        if (currentQuestionIndex < shuffledData.length) {
            showQuestion();
        } else {
            const content = document.getElementById('lesson-content');
            const percentage = (score / shuffledData.length) * 100;
            content.innerHTML = `
                <div class="test-container">
                    <h2>Тест завершен!</h2>
                    <div class="final-score">
                        <h3>Ваш результат: ${score} из ${shuffledData.length}</h3>
                        <p>${percentage}% правильных ответов</p>
                    </div>
                    <button onclick="location.reload()">Пройти тест заново</button>
                </div>
            `;
        }
    };

    showQuestion();
}
