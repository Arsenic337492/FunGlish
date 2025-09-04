// Firebase конфигурация
const firebaseConfig = {
    apiKey: "AIzaSyDxdOy1x8p7X32GBRsvquW6D2cn0xfbOBY",
    authDomain: "funglish-f72b1.firebaseapp.com",
    projectId: "funglish-f72b1",
    storageBucket: "funglish-f72b1.firebasestorage.app",
    messagingSenderId: "902036164648",
    appId: "1:902036164648:web:6548ff003949716145a51d",
    measurementId: "G-M8SDMJ3H9D"
};

let auth;
let db;

function showAvatarMenu(event) {
    event.stopPropagation();
    const menu = event.currentTarget.nextElementSibling;
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

function viewAvatar() {
    alert('Просмотр аватара - в разработке');
}

function changeAvatar() {
    alert('Изменение аватара - в разработке');
}

function deleteAvatar() {
    alert('Удаление аватара - в разработке');
}

function showAchievements() {
    // Закрываем сайдбар
    const overlay = document.querySelector('.profile-sidebar-overlay');
    const sidebar = document.querySelector('.profile-sidebar');
    overlay.classList.remove('active');
    sidebar.classList.remove('active');

    // Создаем модальное окно достижений
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    
    const modal = document.createElement('div');
    modal.className = 'achievements-modal';
    modal.innerHTML = '<h2>Достижения</h2>';
    
    modalOverlay.appendChild(modal);
    document.body.appendChild(modalOverlay);
    
    // Показываем модальное окно
    setTimeout(() => modalOverlay.classList.add('active'), 0);
    
    // Закрытие при клике вне модального окна
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
            setTimeout(() => modalOverlay.remove(), 300);
        }
    });
}

function showSettings() {
    // Закрываем сайдбар
    const overlay = document.querySelector('.profile-sidebar-overlay');
    const sidebar = document.querySelector('.profile-sidebar');
    overlay.classList.remove('active');
    sidebar.classList.remove('active');

    // Создаем модальное окно настроек
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    
    const modal = document.createElement('div');
    modal.className = 'settings-modal';
    modal.innerHTML = '<h2>Настройки</h2>';
    
    modalOverlay.appendChild(modal);
    document.body.appendChild(modalOverlay);
    
    // Показываем модальное окно
    setTimeout(() => modalOverlay.classList.add('active'), 0);
    
    // Закрытие при клике вне модального окна
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
            setTimeout(() => modalOverlay.remove(), 300);
        }
    });
}

document.addEventListener('click', function(event) {
    const menus = document.querySelectorAll('.avatar-menu');
    menus.forEach(menu => {
        if (!menu.contains(event.target) && !event.target.matches('.avatar')) {
            menu.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация Firebase
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    auth = firebase.auth();
    db = firebase.firestore();

    // Инициализация обработчиков для сайдбара
    const sidebarLinks = document.querySelectorAll('.tree-view a');
    const lessonContent = document.getElementById('lesson-content');

    // Обработка кликов по ссылкам
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Убираем активный класс у всех ссылок
            sidebarLinks.forEach(l => l.classList.remove('active'));
            // Добавляем активный класс текущей ссылке
            this.classList.add('active');

            // Получаем ID контента из data-атрибута
            const contentId = this.getAttribute('data-content-id');
            
            // Отображаем соответствующий контент
            if (contentById[contentId]) {
                lessonContent.innerHTML = contentById[contentId];
            }
        });
    });

    // Инициализация intl-tel-input для телефона в форме регистрации
    const phoneInput = document.querySelector('.register-form input[type="tel"]');
    if (phoneInput && window.intlTelInput) {
        window.intlTelInput(phoneInput, {
            initialCountry: 'ru',
            utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js',
            nationalMode: false
        });
    }

    // Обработка формы регистрации
    const registerForm = document.querySelector('.register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitButton = registerForm.querySelector('button.button-submit');
            if (submitButton) submitButton.disabled = true;
            // Удаляем старые ошибки
            let errorBlock = registerForm.querySelector('.form-errors');
            if (errorBlock) errorBlock.remove();
            // Валидация
            const errors = validateRegisterForm(registerForm);
            if (errors.length > 0) {
                const errDiv = document.createElement('div');
                errDiv.className = 'form-errors';
                errDiv.style.color = 'red';
                errDiv.style.marginBottom = '10px';
                errDiv.innerHTML = errors.map(e => `<div>${e}</div>`).join('');
                registerForm.insertBefore(errDiv, registerForm.firstChild);
                if (submitButton) submitButton.disabled = false;
                return;
            }
            // Получаем значения
            const name = registerForm.querySelector('input[placeholder="Введите имя"]').value.trim();
            const surname = registerForm.querySelector('input[placeholder="Введите фамилию"]').value.trim();
            const birth = registerForm.querySelector('input[type="date"]').value;
            const gender = registerForm.querySelector('input[name="gender"]:checked').value;
            const phone = registerForm.querySelector('input[type="tel"]').value.trim();
            const email = registerForm.querySelector('input[type="email"]').value.trim();
            const password = registerForm.querySelector('input#password').value;
            try {
                // Проверяем, не занят ли email
                const methods = await auth.fetchSignInMethodsForEmail(email);
                if (methods.length > 0) {
                    throw new Error('Этот email уже зарегистрирован');
                }
                // Регистрируем пользователя
                const userCredential = await auth.createUserWithEmailAndPassword(email, password);
                // Сохраняем профиль в Firestore
                await db.collection('users').doc(userCredential.user.uid).set({
                    name, surname, birth, gender, phone, email, createdAt: new Date()
                });
                // Отправляем email verification
                await userCredential.user.sendEmailVerification();
                // Показываем сообщение о необходимости подтвердить email
                registerForm.innerHTML = '<div style="color:green;text-align:center;padding:30px;">Регистрация успешна! Пожалуйста, подтвердите ваш email по ссылке, отправленной на почту.</div>';
            } catch (error) {
                const errDiv = document.createElement('div');
                errDiv.className = 'form-errors';
                errDiv.style.color = 'red';
                errDiv.style.marginBottom = '10px';
                errDiv.innerHTML = error.message;
                registerForm.insertBefore(errDiv, registerForm.firstChild);
            } finally {
                if (submitButton) submitButton.disabled = false;
            }
        });
    }

    // Обработка формы входа: запрещаем вход, если email не подтвержден
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitButton = loginForm.querySelector('button.button-submit');
            const emailInput = loginForm.querySelector('.inputForm input[type="text"], .inputForm input[type="email"]');
            const passwordInput = loginForm.querySelector('.inputForm input[type="password"]');
            if (submitButton) submitButton.disabled = true;
            // Удаляем старые ошибки
            let errorBlock = loginForm.querySelector('.form-errors');
            if (errorBlock) errorBlock.remove();
            try {
                const userCredential = await auth.signInWithEmailAndPassword(emailInput.value, passwordInput.value);
                if (!userCredential.user.emailVerified) {
                    await auth.signOut();
                    throw new Error('Пожалуйста, подтвердите ваш email перед входом.');
                }
                document.getElementById('authModal').classList.remove('active');
            } catch (error) {
                const errDiv = document.createElement('div');
                errDiv.className = 'form-errors';
                errDiv.style.color = 'red';
                errDiv.style.marginBottom = '10px';
                errDiv.innerHTML = error.message;
                loginForm.insertBefore(errDiv, loginForm.firstChild);
            } finally {
                if (submitButton) submitButton.disabled = false;
            }
        });
    }

    // Отслеживание состояния авторизации
    auth.onAuthStateChanged(user => {
        const loginButtons = document.querySelectorAll('.login-button');
        loginButtons.forEach(button => {
            if (user) {
                button.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    Профиль
                `;
                button.onclick = () => {
                    let overlay = document.querySelector('.profile-sidebar-overlay');
                    let sidebar = document.querySelector('.profile-sidebar');
                    
                    if (!overlay) {
                        overlay = document.createElement('div');
                        overlay.className = 'profile-sidebar-overlay';
                        document.body.appendChild(overlay);
                    }
                    
                    if (!sidebar) {
                        sidebar = document.createElement('div');
                        sidebar.className = 'profile-sidebar';
                        sidebar.innerHTML = `
                            <div class="profile-header">
                                <div class="profile-top">
                                    <div class="avatar">👤</div>
                                    <div class="user-info">
                                        <h3>Никнейм</h3>
                                    </div>
                                    <button class="logout-icon" onclick="auth.signOut().then(() => window.location.reload())">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                            <polyline points="16 17 21 12 16 7"></polyline>
                                            <line x1="21" y1="12" x2="9" y2="12"></line>
                                        </svg>
                                    </button>
                                </div>

                                <div class="progress-section">
                                    <div class="progress-bar">
                                        <div class="progress" style="width: 45%"></div>
                                    </div>
                                    <div class="progress-stats">
                                        <span>45% пройдено</span>
                                        <span>55% осталось</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="profile-stats">
                                <div class="stat-item">
                                    <span class="stat-value">12</span>
                                    <span class="stat-label">Правильных ответов подряд</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-value">3</span>
                                    <span class="stat-label">Дней подряд</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-value">75%</span>
                                    <span class="stat-label">Точность ответов</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-value">2:30</span>
                                    <span class="stat-label">Время обучения</span>
                                </div>
                            </div>

                            <div class="profile-actions">                                <button class="action-button achievements-btn" onclick="showAchievements()">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>
                                        <path d="M19 15V9"></path>
                                        <path d="M5 15V9"></path>
                                        <path d="M19.8 9c0-1-.8-1.9-1.8-1.9H6c-1 0-1.8.9-1.8 1.9m15.6 0c0 4.4-3.6 8-8 8s-8-3.6-8-8"></path>
                                    </svg>
                                    Достижения
                                </button>
                                <button class="action-button settings-btn" onclick="showSettings()">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                    Настройки
                                </button>
                            </div>
                        `;
                        document.body.appendChild(sidebar);
                    }
                    
                    overlay.classList.add('active');
                    sidebar.classList.add('active');
                    
                    overlay.onclick = () => {
                        overlay.classList.remove('active');
                        sidebar.classList.remove('active');
                    };
                };
            } else {
                button.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15"/>
                        <path d="M10 17L15 12L10 7"/>
                        <path d="M15 12H3"/>
                    </svg>
                    Вход
                `;
                button.onclick = showLoginModal;
            }
        });
    });
});

// Валидация email
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
// Валидация телефона через intl-tel-input
function isValidPhone(input) {
    if (window.intlTelInputGlobals) {
        const iti = window.intlTelInputGlobals.getInstance(input);
        return iti && iti.isValidNumber();
    }
    return false;
}
// Валидация обязательных полей
function validateRegisterForm(form) {
    const name = form.querySelector('input[placeholder="Введите имя"]');
    const surname = form.querySelector('input[placeholder="Введите фамилию"]');
    const birth = form.querySelector('input[type="date"]');
    const gender = form.querySelector('input[name="gender"]:checked');
    const phone = form.querySelector('input[type="tel"]');
    const email = form.querySelector('input[type="email"]');
    const password = form.querySelector('input#password');
    const confirmPassword = form.querySelector('input#confirmPassword');
    let errors = [];
    if (!name.value.trim()) errors.push('Имя обязательно');
    if (!surname.value.trim()) errors.push('Фамилия обязательна');
    if (!birth.value) errors.push('Дата рождения обязательна');
    if (!gender) errors.push('Пол обязателен');
    if (!phone.value.trim() || !isValidPhone(phone)) errors.push('Введите корректный номер телефона');
    if (!email.value.trim() || !isValidEmail(email.value)) errors.push('Введите корректный email');
    if (!password.value) errors.push('Пароль обязателен');
    else if (!isStrongPassword(password.value)) errors.push('Пароль должен содержать минимум 8 символов, заглавную и строчную буквы, цифру и спецсимвол.');
    if (password.value !== confirmPassword.value) errors.push('Пароли не совпадают');
    return errors;
}

function isStrongPassword(password) {
    // Минимум 8 символов, хотя бы одна заглавная, одна строчная, одна цифра и один спецсимвол
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(password);
}

// Подсказка о сложности пароля в реальном времени

document.addEventListener('DOMContentLoaded', function() {
    // ...existing code...
    const passwordInput = document.querySelector('.register-form input#password');
    const passwordStrengthText = document.querySelector('.register-form .password-strength-text');
    if (passwordInput && passwordStrengthText) {
        passwordInput.addEventListener('input', function() {
            if (!passwordInput.value) {
                passwordStrengthText.textContent = '';
                return;
            }
            if (isStrongPassword(passwordInput.value)) {
                passwordStrengthText.style.color = 'green';
                passwordStrengthText.textContent = 'Надёжный пароль';
            } else {
                passwordStrengthText.style.color = 'red';
                passwordStrengthText.textContent = 'Пароль должен содержать минимум 8 символов, заглавную и строчную буквы, цифру и спецсимвол.';
            }
        });
    }
    // ...existing code...
});

// Функция проверки ответа в тестах
function checkAnswer(button) {
    const buttons = button.parentElement.getElementsByTagName('button');
    for (let btn of buttons) {
        btn.disabled = true;
        if (btn.getAttribute('data-correct') === 'true') {
            btn.style.background = '#4caf50';
            btn.style.color = 'white';
        }
    }
    
    if (button.getAttribute('data-correct') === 'true') {
        button.insertAdjacentHTML('beforeend', ' ✓');
    } else {
        button.style.background = '#f44336';
        button.style.color = 'white';
        button.insertAdjacentHTML('beforeend', ' ✗');
    }
}

// Массив слов для раздела "Животные"
const animalWords = [
    {
        english: 'Bull',
        russian: 'Бык',
        imageId: 'bull',
        audioId: 'bull-audio',
        association: 'Представьте, как большой бык ест аппетитную БУЛКУ (BULl). Созвучие слов поможет запомнить английское слово.',
        examples: [
            'The bull is very strong - Бык очень сильный',
            'There is a bull in the field - На поле есть бык'
        ]
    },
    {
        english: 'Bear',
        russian: 'Медведь',
        imageId: 'bear',
        audioId: 'bear-audio',
        association: 'Представьте, как медведь БЕРёт (BEARёт) мёд из улья. Созвучие глагола "брать/берёт" с "bear" поможет запомнить слово.',
        examples: [
            'The bear loves honey - Медведь любит мёд',
            'A big brown bear - Большой бурый медведь'
        ]
    },
    {
        english: 'Cat',
        russian: 'Кошка',
        imageId: 'cat',
        audioId: 'cat-audio',
        association: 'Представьте, как КОТ (CAT) лежит на диване. Слово "кот" очень похоже на английское "cat".',
        examples: [
            'The cat is sleeping - Кошка спит',
            'I have a black cat - У меня есть чёрная кошка'
        ]
    }
    // Остальные животные будут добавлены аналогично
];

let currentWordIndex = 0;

// Функция для отображения текущего слова
function showCurrentWord() {
    const word = animalWords[currentWordIndex];
    return `
        <div class="word-card">
            <div class="word-header">
                <h2>
                    ${word.english} / ${word.russian}
                    <button class="speak-btn" title="Прослушать произношение" onclick="playAudio('${word.audioId}')">🔊</button>
                </h2>
            </div>
            <div class="word-image">
                <img src="животные/${word.imageId}.jpg" alt="${word.english}">
            </div>
            <div class="word-content">
                <h3>Ассоциация:</h3>
                <p class="association-text">${word.association}</p>
                <div class="examples">
                    <h3>Примеры использования:</h3>
                    <ul>
                        ${word.examples.map(example => `<li>${example}</li>`).join('')}
                    </ul>
                </div>
            </div>
            <div class="navigation-buttons">
                ${currentWordIndex > 0 ? 
                '<button class="prev-word" onclick="showPreviousWord()" title="Предыдущее слово">←</button>' : ''}
                ${currentWordIndex < animalWords.length - 1 ? 
                '<button class="next-word" onclick="showNextWord()" title="Следующее слово">→</button>' : ''}
            </div>
        </div>
    `;
}

function showNextWord() {
    if (currentWordIndex < animalWords.length - 1) {
        currentWordIndex++;
        document.getElementById('lesson-content').innerHTML = showCurrentWord();
    }
}

function showPreviousWord() {
    if (currentWordIndex > 0) {
        currentWordIndex--;
        document.getElementById('lesson-content').innerHTML = showCurrentWord();
    }
}

// Функция для воспроизведения аудио
function playAudio(audioId) {
    // Здесь будет код для воспроизведения аудио файла
    const audio = new Audio(`audio/${audioId}.mp3`);
    audio.play();
}

// Контент для разных разделов
const contentById = {
    'animals-material': showCurrentWord(),
    'animals-test': `
        <div class="test-container">
            <h2>Тестирование: Животные</h2>
            <div class="progress">Вопрос 1 из 5</div>
            <div class="question">
                <h3>Как переводится слово "Cat"?</h3>
                <div class="answers">
                    <button onclick="checkAnswer(this)" data-correct="true">Кошка</button>
                    <button onclick="checkAnswer(this)">Собака</button>
                    <button onclick="checkAnswer(this)">Птица</button>
                    <button onclick="checkAnswer(this)">Рыба</button>
                </div>
            </div>
        </div>
    `,
    'food-material': `
        <div class="word-card">
            <div class="word-header">
                <h2>Apple / Яблоко</h2>
            </div>
            <div class="word-image">
                <img src="https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6" alt="Apple">
            </div>
            <div class="word-content">
                <h3>Ассоциации:</h3>
                <ul>
                    <li>APPLE - ЭППЛ (компания Apple)</li>
                    <li>Яблоко в логотипе Apple</li>
                </ul>
                <button class="next-word">Следующее слово →</button>
            </div>
        </div>
    `,
    'food-test': `
        <div class="test-container">
            <h2>Тестирование: Еда</h2>
            <div class="progress">Вопрос 1 из 5</div>
            <div class="question">
                <h3>Как переводится слово "Apple"?</h3>
                <div class="answers">
                    <button onclick="checkAnswer(this)" data-correct="true">Яблоко</button>
                    <button onclick="checkAnswer(this)">Банан</button>
                    <button onclick="checkAnswer(this)">Апельсин</button>
                    <button onclick="checkAnswer(this)">Груша</button>
                </div>
            </div>
        </div>
    `
};
