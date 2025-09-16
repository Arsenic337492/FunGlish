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
    if (overlay && sidebar) {
        overlay.classList.remove('active');
        sidebar.classList.remove('active');
    }

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
    if (overlay && sidebar) {
        overlay.classList.remove('active');
        sidebar.classList.remove('active');
    }

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
            const email = registerForm.querySelector('input[type="email"]').value.trim();
            const password = registerForm.querySelector('input#password').value;

            try {
                // Регистрируем пользователя
                const userCredential = await auth.createUserWithEmailAndPassword(email, password);
                const user = userCredential.user;

                // Отправляем email verification
                await user.sendEmailVerification();
                
                // Сохраняем данные пользователя в Firestore
                await db.collection('users').doc(user.uid).set({
                    name: name,
                    surname: surname,
                    email: email,
                    birth: birth,
                    gender: gender,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });

                // Показываем сообщение об успехе
                registerForm.innerHTML = '<div style="color:green;text-align:center;padding:30px;">Регистрация успешна! Пожалуйста, подтвердите ваш email по ссылке, отправленной на почту.<br><br><button type="button" class="button-submit" onclick="showLoginForm()">Войти</button></div>';
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

    // Обработка формы входа
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitButton = loginForm.querySelector('button.button-submit');
            const emailInput = loginForm.querySelector('input[type="email"]');
            const passwordInput = loginForm.querySelector('input[type="password"]');
            if (submitButton) submitButton.disabled = true;
            // Удаляем старые ошибки
            let errorBlock = loginForm.querySelector('.form-errors');
            if (errorBlock) errorBlock.remove();
            try {
                const userCredential = await auth.signInWithEmailAndPassword(emailInput.value, passwordInput.value);
                
                // Закрываем модальное окно после успешного входа
                document.getElementById('authModal').classList.remove('active');
            } catch (error) {
                const errDiv = document.createElement('div');
                errDiv.className = 'form-errors';
                errDiv.style.color = 'red';
                errDiv.style.marginBottom = '10px';
                if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
                    errDiv.innerHTML = 'Неверный email или пароль.';
                } else {
                    errDiv.innerHTML = error.message;
                }
                loginForm.insertBefore(errDiv, loginForm.firstChild);
            } finally {
                if (submitButton) submitButton.disabled = false;
            }
        });
    }

    // Отслеживание состояния авторизации
    auth.onAuthStateChanged(async user => {
        const loginButtons = document.querySelectorAll('.login-button');
        const loginButton = document.querySelector('.login-button');
        const lessonContent = document.getElementById('lesson-content');

        // Скрываем блок "премиум-фич"
        const premiumFeatures = document.getElementById('premium-features');
        if (premiumFeatures) {
            premiumFeatures.style.display = user ? 'none' : 'block';
        }

        if (user) {
            // Пользователь залогинен
            const userDoc = await db.collection('users').doc(user.uid).get();
            const userData = userDoc.exists ? userDoc.data() : { name: 'Пользователь', surname: '' };
            const displayName = userData.name || 'Пользователь';

            // Обновляем кнопку входа
            loginButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Профиль
            `;
            loginButton.onclick = () => {
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
                                    <h3>${displayName}</h3>
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

                        <div class="profile-actions">    
                            <button class="action-button achievements-btn" onclick="showAchievements()">
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
            // Пользователь не залогинен
            loginButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15"/>
                    <path d="M10 17L15 12L10 7"/>
                    <path d="M15 12H3"/>
                </svg>
                Вход
            `;
            loginButton.onclick = showLoginModal;
        }
    });
});

// Функция для переключения видимости пароля
function togglePasswordVisibility(id, button) {
    const input = document.getElementById(id);
    const icon = button.querySelector('.password-toggle-icon');
    if (input.type === 'password') {
        input.type = 'text';
        icon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.08 2.39m-4.63-4.63a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
            </svg>
        `;
    } else {
        input.type = 'password';
        icon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
            </svg>
        `;
    }
}

// Валидация email
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
// Валидация обязательных полей
function validateRegisterForm(form) {
    const name = form.querySelector('input[placeholder="Введите имя"]');
    const surname = form.querySelector('input[placeholder="Введите фамилию"]');
    const birth = form.querySelector('input[type="date"]');
    const gender = form.querySelector('input[name="gender"]:checked');
    const email = form.querySelector('input[type="email"]');
    const password = form.querySelector('input#password');
    const confirmPassword = form.querySelector('input#confirmPassword');
    let errors = [];
    if (!name.value.trim()) errors.push('Имя обязательно');
    if (!surname.value.trim()) errors.push('Фамилия обязательна');
    if (!birth.value) errors.push('Дата рождения обязательна');
    if (!gender) errors.push('Пол обязателен');
    if (!email.value.trim() || !isValidEmail(email.value)) errors.push('Введите корректный email');
    if (!password.value) errors.push('Пароль обязателен');
    else if (!isStrongPassword(password.value)) errors.push('Пароль должен содержать минимум 8 символов, заглавную и строчную буквы, цифру и спецсимвол.');
    if (password.value !== confirmPassword.value) errors.push('Пароли не совпадают');
    return errors;
}

function getPasswordStrength(password) {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) score++;
    return score;
}

function isStrongPassword(password) {
    return getPasswordStrength(password) >= 4;
}

// Подсказка о сложности пароля в реальном времени

document.addEventListener('DOMContentLoaded', function() {
    // ...existing code...
    const passwordInput = document.querySelector('.register-form input#password');
    const passwordStrengthIndicator = document.querySelector('.register-form .password-strength-indicator');
    if (passwordInput && passwordStrengthIndicator) {
        passwordInput.addEventListener('input', function() {
            const strength = getPasswordStrength(this.value);
            passwordStrengthIndicator.className = 'password-strength-indicator';
            
            if (this.value === '') {
                passwordStrengthIndicator.style.display = 'none';
            } else {
                passwordStrengthIndicator.style.display = 'flex';
                let color;
                let width;
                if (strength <= 1) {
                    color = 'red';
                    width = '20%';
                } else if (strength <= 3) {
                    color = 'yellow';
                    width = '60%';
                } else {
                    color = 'green';
                    width = '100%';
                }
                passwordStrengthIndicator.querySelector('.strength-bar').style.width = width;
                passwordStrengthIndicator.querySelector('.strength-bar').style.backgroundColor = color;
            }
        });
    }

    // Инициализация кнопки "показать пароль" для формы входа
    const loginPasswordInput = document.getElementById('loginPassword');
    const loginPasswordToggle = document.querySelector('.login-form .password-toggle-btn');
    if (loginPasswordInput && loginPasswordToggle) {
        loginPasswordToggle.addEventListener('click', () => togglePasswordVisibility('loginPassword', loginPasswordToggle));
    }
    
    // Инициализация кнопки "показать пароль" для формы регистрации
    const registerPasswordInput = document.getElementById('password');
    const registerPasswordToggle = document.querySelector('.register-form .password-toggle-btn');
    if (registerPasswordInput && registerPasswordToggle) {
        registerPasswordToggle.addEventListener('click', () => togglePasswordVisibility('password', registerPasswordToggle));
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
        image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=300&fit=crop',
        audio: '#',
        association: 'Представьте, как большой бык ест аппетитную БУЛКУ (BULl). Созвучие слов поможет запомнить английское слово.',
        examples: [
            'The bull is very strong - Бык очень сильный',
            'There is a bull in the field - На поле есть бык'
        ]
    },
    {
        english: 'Bear',
        russian: 'Медведь',
        image: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=400&h=300&fit=crop',
        audio: '#',
        association: 'Представьте, как медведь БЕРёт (BEARёт) мёд из улья. Созвучие глагола "брать/берёт" с "bear" поможет запомнить слово.',
        examples: [
            'The bear loves honey - Медведь любит мёд',
            'A big brown bear - Большой бурый медведь'
        ]
    },
    {
        english: 'Cat',
        russian: 'Кошка',
        image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop',
        audio: '#',
        association: 'Представьте, как КОТ (CAT) лежит на диване. Слово "кот" очень похоже на английское "cat".',
        examples: [
            'The cat is sleeping - Кошка спит',
            'I have a black cat - У меня есть чёрная кошка'
        ]
    },
    {
        english: 'Dog',
        russian: 'Собака',
        image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop',
        audio: '#',
        association: 'Представьте собаку, которая ДОГОНЯЕТ (DOG) мячик. Начало слова "догоняет" созвучно с "dog".',
        examples: [
            'The dog is barking - Собака лает',
            'I walk my dog every day - Я гуляю с собакой каждый день'
        ]
    },
    {
        english: 'Eagle',
        russian: 'Орёл',
        image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&h=300&fit=crop',
        audio: '#',
        association: 'Представьте орла, который летит к ИГЛЕ (EAGLE ≈ игла). Орёл летит к игле - запомнить легко!',
        examples: [
            'The eagle flies high - Орёл летит высоко',
            'Eagles have sharp eyes - У орлов острое зрение'
        ]
    }
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
                    <button class="speak-btn" title="Прослушать произношение" onclick="playAudio('${word.audio}')">🔊</button>
                </h2>
            </div>
            <div class="word-image">
                <img src="${word.image}" alt="${word.english}">
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
function playAudio(audioPath) {
    if (audioPath === '#') {
        alert('Аудио в разработке');
        return;
    }
    const audio = new Audio(audioPath);
    audio.play().catch(e => console.log('Ошибка воспроизведения аудио:', e));
}

// Функции модальных окон и навигации
function showLoginModal() {
    document.getElementById('authModal').classList.add('active');
    showLoginForm();
}

function showLoginForm() {
    document.querySelector('.login-form').style.display = 'flex';
    document.querySelector('.register-form').style.display = 'none';
}

function showRegisterForm() {
    document.querySelector('.login-form').style.display = 'none';
    document.querySelector('.register-form').style.display = 'flex';
}

function showHome() {
    window.location.href = 'index.html';
}

function togglePassword(button) {
    const input = button.previousElementSibling;
    const visible = button.querySelector('.visible');
    const hidden = button.querySelector('.hidden');
    
    if (input.type === 'password') {
        input.type = 'text';
        visible.style.display = 'inline-block';
        hidden.style.display = 'none';
    } else {
        input.type = 'password';
        visible.style.display = 'none';
        hidden.style.display = 'inline-block';
    }
}

// Закрытие модального окна при клике вне его
document.addEventListener('click', function(event) {
    const modal = document.getElementById('authModal');
    if (event.target === modal) {
        modal.classList.remove('active');
    }
});

// Контент для разных разделов
const contentById = {
    'animals-material': showCurrentWord(),
    'animals-test': `
        <div class="test-container">
            <h2>Тестирование: Животные</h2>
            <div class="progress">Вопрос 1 из 5</div>
            <div class="question">
                <h3>Как переводится слово "Eagle"?</h3>
                <div class="answers">
                    <button onclick="checkAnswer(this)" data-correct="true">Орёл</button>
                    <button onclick="checkAnswer(this)">Медведь</button>
                    <button onclick="checkAnswer(this)">Бык</button>
                    <button onclick="checkAnswer(this)">Собака</button>
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
