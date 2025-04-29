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
        imageSrc: 'животные/бык.jpg', 
        word: 'Bull [бул]', 
        translation: 'Бык', 
        association: 'Бык ест булку. Представьте большого быка, который с аппетитом ест свежую булку.'
    },
    { 
        imageSrc: 'животные/жук.jpg', 
        word: 'Beetle [битл]', 
        translation: 'Жук', 
        association: 'Жук с битой. Представьте жука, который держит биту.'
    },
    { 
        imageSrc: 'животные/орел.jpg', 
        word: 'Eagle [игл]', 
        translation: 'Орел', 
        association: 'Орел смотрит на иглу. Представьте орла, который внимательно разглядывает иглу.'
    },
    { 
        imageSrc: 'животные/муравей.jpg', 
        word: 'Ant [энт]', 
        translation: 'Муравей', 
        association: 'Муравей держит антенну. Представьте муравья, который несет телевизионную антенну.'
    },
    { 
        imageSrc: 'животные/кролик.jpg', 
        word: 'Bunny [бани]', 
        translation: 'Кролик', 
        association: 'Кролик идет в баню. Представьте кролика с полотенцем, который направляется в баню.'
    },
    { 
        imageSrc: 'животные/медведь.jpg', 
        word: 'Bear [бэа]', 
        translation: 'Медведь', 
        association: 'Медведь с биркой. Представьте медведя, на котором висит большая бирка с ценой.'
    },
    { 
        imageSrc: 'животные/индейка.jpg', 
        word: 'Turkey [тёки]', 
        translation: 'Индейка', 
        association: 'Индейка натирает на терке. Представьте индейку, которая что-то натирает на терке.'
    },
    { 
        imageSrc: 'животные/суслик.jpg', 
        word: 'Gopher [гофэ]', 
        translation: 'Суслик', 
        association: 'Суслик играет в гольф. Представьте суслика с клюшкой для гольфа.'
    },
    { 
        imageSrc: 'животные/осел.jpg', 
        word: 'Donkey [донки]', 
        translation: 'Осел', 
        association: 'Тонкий осел. Представьте очень худого, тонкого осла.'
    },
    { 
        imageSrc: 'животные/тюлень.jpg', 
        word: 'Seal [сил]', 
        translation: 'Тюлень', 
        association: 'У тюленя много сил. Представьте сильного тюленя, поднимающего тяжести.'
    }
];

const foodData = [
    { 
        imageSrc: 'еда/каша.jpg', 
        word: 'Porridge [поридж]', 
        translation: 'Каша', 
        association: 'Каша в париже. Представьте, как вы едите кашу возле Эйфелевой башни.'
    },
    { 
        imageSrc: 'еда/огурец.jpg', 
        word: 'Cucumber [кьюкамбэ]', 
        translation: 'Огурец', 
        association: 'Огурец с крюком. Представьте огурец, к которому прикреплен крюк.'
    },
    { 
        imageSrc: 'еда/сосиска.jpg', 
        word: 'Sausage [сосидж]', 
        translation: 'Сосиска', 
        association: 'Сосиска с соской. Представьте сосиску, которая держит соску.'
    },
    { 
        imageSrc: 'еда/газировка.jpg', 
        word: 'Soda [сода]', 
        translation: 'Газировка', 
        association: 'Газировка в соде. Представьте стакан газировки в пачке соды.'
    },
    { 
        imageSrc: 'еда/свекла.jpg', 
        word: 'Beetroot [битрут]', 
        translation: 'Свекла', 
        association: 'Свекла с битой. Представьте свеклу, держащую бейсбольную биту.'
    },
    { 
        imageSrc: 'еда/семечка.jpg', 
        word: 'Seed [сид]', 
        translation: 'Семечка', 
        association: 'Семечка сидит в кресле. Представьте семечку, которая удобно расположилась в кресле.'
    },
    { 
        imageSrc: 'еда/слива.jpg', 
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
