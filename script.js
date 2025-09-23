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

// Инициализация EmailJS (для отправки кодов)
// Вам нужно будет создать аккаунт на emailjs.com и получить ключи
if (typeof emailjs !== 'undefined') {
    emailjs.init('YOUR_PUBLIC_KEY'); // Замените на ваш ключ
}

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
    
    // Проверяем язык
    checkLanguageOnLoad();

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
                const content = typeof contentById[contentId] === 'function' ? contentById[contentId]() : contentById[contentId];
                lessonContent.innerHTML = content;
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

                // Отправляем ссылку для подтверждения email
                const actionCodeSettings = {
                    url: window.location.origin + '/email-signin.html?mode=verify&email=' + encodeURIComponent(email),
                    handleCodeInApp: true
                };
                await user.sendEmailVerification(actionCodeSettings);
                
                // Сохраняем данные пользователя в Firestore
                await db.collection('users').doc(user.uid).set({
                    name: name,
                    surname: surname,
                    email: email,
                    birth: birth,
                    gender: gender,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });

                // Сохраняем данные для подтверждения
                window.tempUserData = { user, email };
                
                // Отправляем код подтверждения
                await sendEmailVerificationCode(email);
                
                // Закрываем форму регистрации и открываем модальное окно подтверждения
                document.getElementById('authModal').classList.remove('active');
                document.getElementById('emailVerificationModal').classList.add('active');
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
            const emailInput = loginForm.querySelector('input[type="text"]') || loginForm.querySelector('input[type="email"]');
            const passwordInput = loginForm.querySelector('input[type="password"]');
            if (submitButton) submitButton.disabled = true;
            // Удаляем старые ошибки
            let errorBlock = loginForm.querySelector('.form-errors');
            if (errorBlock) errorBlock.remove();
            try {
                const userCredential = await auth.signInWithEmailAndPassword(emailInput.value, passwordInput.value);
                const user = userCredential.user;
                
                // Проверяем нашу систему подтверждения
                const userDoc = await db.collection('users').doc(user.uid).get();
                if (userDoc.exists && !userDoc.data().emailVerified) {
                    const errDiv = document.createElement('div');
                    errDiv.className = 'form-errors';
                    errDiv.style.color = 'orange';
                    errDiv.style.marginBottom = '10px';
                    errDiv.innerHTML = `
                        <p>Подтвердите ваш email перед входом.</p>
                        <button type="button" onclick="sendNewVerificationCode('${user.email}')" style="background: #ff9800; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
                            Отправить код
                        </button>
                    `;
                    loginForm.insertBefore(errDiv, loginForm.firstChild);
                    await auth.signOut();
                    return;
                }
                
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
            
            // Загружаем язык пользователя
            if (userData.language) {
                currentLanguage = userData.language;
                localStorage.setItem('selectedLanguage', userData.language);
                updateLanguageInterface();
            }

            // Обновляем кнопку входа
            loginButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span data-translate="profile">Профиль</span>
            `;
            // Обновляем перевод
            updateLanguageInterface();
            loginButton.onclick = () => {
                // Удаляем старые элементы
                const oldOverlay = document.querySelector('.profile-sidebar-overlay');
                const oldSidebar = document.querySelector('.profile-sidebar');
                if (oldOverlay) oldOverlay.remove();
                if (oldSidebar) oldSidebar.remove();
                
                // Создаем новые
                const overlay = document.createElement('div');
                overlay.className = 'profile-sidebar-overlay';
                document.body.appendChild(overlay);
                
                const sidebar = document.createElement('div');
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
                        
                        <div class="profile-stats" id="profile-stats">
                            <div class="stat-item">
                                <span class="stat-value" id="learned-words">0</span>
                                <span class="stat-label">Изучено слов</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-value" id="streak-days">0</span>
                                <span class="stat-label">Дней подряд</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-value" id="accuracy">0%</span>
                                <span class="stat-label">Точность ответов</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-value" id="total-tests">0</span>
                                <span class="stat-label">Всего тестов</span>
                            </div>
                        </div>

                        <div class="profile-actions">    
                            <button class="action-button language-btn" onclick="showLanguageSettings()">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M5 8l6 6"></path>
                                    <path d="M4 14l6-6 2-3"></path>
                                    <path d="M2 5h12"></path>
                                    <path d="M7 2h1l8 22"></path>
                                    <path d="M22 9h-7"></path>
                                </svg>
                                Язык: <span id="current-language">Русский</span>
                            </button>
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
                
                // Показываем сайдбар
                setTimeout(() => {
                    overlay.classList.add('active');
                    sidebar.classList.add('active');
                }, 10);
                
                // Обработчик закрытия
                overlay.onclick = () => {
                    overlay.classList.remove('active');
                    sidebar.classList.remove('active');
                    setTimeout(() => {
                        overlay.remove();
                        sidebar.remove();
                    }, 300);
                };
                
                // Загружаем статистику
                loadUserStats();
            };
        } else {
            // Пользователь не залогинен
            loginButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15"/>
                    <path d="M10 17L15 12L10 7"/>
                    <path d="M15 12H3"/>
                </svg>
                <span data-translate="login">Вход</span>
            `;
            // Обновляем перевод
            updateLanguageInterface();
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
    const isCorrect = button.getAttribute('data-correct') === 'true';
    
    for (let btn of buttons) {
        btn.disabled = true;
        if (btn.getAttribute('data-correct') === 'true') {
            btn.style.background = '#4caf50';
            btn.style.color = 'white';
        }
    }
    
    if (isCorrect) {
        button.insertAdjacentHTML('beforeend', ' ✓');
        // Сохраняем правильный ответ
        saveTestResult(true);
    } else {
        button.style.background = '#f44336';
        button.style.color = 'white';
        button.insertAdjacentHTML('beforeend', ' ✗');
        // Сохраняем неправильный ответ
        saveTestResult(false);
    }
}

// Система прогресса пользователя
function saveWordProgress(wordEnglish, category) {
    const user = auth.currentUser;
    if (!user) return;
    
    const progressRef = db.collection('userProgress').doc(user.uid);
    const wordKey = `${category}_${wordEnglish.toLowerCase()}`;
    
    progressRef.set({
        [`learnedWords.${wordKey}`]: {
            word: wordEnglish,
            category: category,
            learnedAt: firebase.firestore.FieldValue.serverTimestamp(),
            viewCount: firebase.firestore.FieldValue.increment(1)
        },
        lastActivity: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
}

function saveTestResult(isCorrect) {
    const user = auth.currentUser;
    if (!user) return;
    
    const progressRef = db.collection('userProgress').doc(user.uid);
    
    progressRef.set({
        testStats: {
            totalAnswers: firebase.firestore.FieldValue.increment(1),
            correctAnswers: firebase.firestore.FieldValue.increment(isCorrect ? 1 : 0),
            lastTestDate: firebase.firestore.FieldValue.serverTimestamp()
        },
        lastActivity: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
}

function updateStreak() {
    const user = auth.currentUser;
    if (!user) return;
    
    const progressRef = db.collection('userProgress').doc(user.uid);
    const today = new Date().toDateString();
    
    progressRef.get().then((doc) => {
        const data = doc.data() || {};
        const lastActivity = data.lastActivityDate;
        const currentStreak = data.streak || 0;
        
        if (lastActivity !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            
            const newStreak = lastActivity === yesterday.toDateString() ? currentStreak + 1 : 1;
            
            progressRef.set({
                streak: newStreak,
                lastActivityDate: today,
                lastActivity: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });
        }
    });
}

// Массив слов для раздела "Животные"
const animalWords = [
    {
        english: 'Ant',
        russian: 'Муравей',
        image: 'https://github.com/Arsenic337492/FunGlish/blob/main/%D0%B6%D0%B8%D0%B2%D0%BE%D1%82%D0%BD%D1%8B%D0%B5/ant-%D0%B0%D0%BD%D1%82%D0%B5%D0%BD%D0%BD%D0%B0.jpg?raw=true',
        audio: '#',
        association: 'Представь маленького муравьишку, который держит в лапках большую АНТЕННУ (ANT ≈ антенна)! Муравей хочет поговорить по рации со своими друзьями в муравейнике.',
        examples: [
            'The ant is very small - Муравей очень маленький',
            'Ants work together - Муравьи работают вместе'
        ]
    },
    {
        english: 'Bear',
        russian: 'Медведь',
        image: 'https://github.com/Arsenic337492/FunGlish/blob/main/%D0%B6%D0%B8%D0%B2%D0%BE%D1%82%D0%BD%D1%8B%D0%B5/bear-%D0%B1%D0%B8%D1%80%D0%BA%D0%B0.jpg?raw=true',
        audio: '#',
        association: 'Посмотри на мишку с яркой БИРКОЙ в ушке (BEAR ≈ бирка)! Как в магазине игрушек - у каждого плюшевого мишки есть бирочка с именем.',
        examples: [
            'The bear loves honey - Медведь любит мёд',
            'A big brown bear - Большой бурый медведь'
        ]
    },
    {
        english: 'Beetle',
        russian: 'Жук',
        image: 'https://github.com/Arsenic337492/FunGlish/blob/main/%D0%B6%D0%B8%D0%B2%D0%BE%D1%82%D0%BD%D1%8B%D0%B5/beetle-%D0%B1%D0%B8%D1%82%D0%B0.jpg?raw=true',
        audio: '#',
        association: 'Смотри, какой сильный жучок держит в лапках БИТУ (BEETLE ≈ бита)! Он собирается играть в бейсбол со своими друзьями-насекомыми.',
        examples: [
            'The beetle is black - Жук чёрный',
            'Beetles can fly - Жуки умеют летать'
        ]
    },
    {
        english: 'Bull',
        russian: 'Бык',
        image: 'https://github.com/Arsenic337492/FunGlish/blob/main/%D0%B6%D0%B8%D0%B2%D0%BE%D1%82%D0%BD%D1%8B%D0%B5/bull-%D0%B1%D1%83%D0%BB%D0%BA%D0%B0.jpg?raw=true',
        audio: '#',
        association: 'Посмотри, как большой добрый бычок кушает вкусную БУЛОЧКУ (BULL ≈ булка)! Он очень любит хлебобулочные изделия на завтрак.',
        examples: [
            'The bull is very strong - Бык очень сильный',
            'There is a bull in the field - На поле есть бык'
        ]
    },
    {
        english: 'Bunny',
        russian: 'Кролик',
        image: 'https://github.com/Arsenic337492/FunGlish/blob/main/%D0%B6%D0%B8%D0%B2%D0%BE%D1%82%D0%BD%D1%8B%D0%B5/bunny-%D0%B1%D0%B0%D0%BD%D1%8F.jpg?raw=true',
        audio: '#',
        association: 'Какой чистенький зайчик моется в БАНЬКЕ (BUNNY ≈ баня)! Он трёт спинку мочалкой и поёт весёлые песенки.',
        examples: [
            'The bunny is white - Кролик белый',
            'Bunny likes carrots - Кролик любит морковку'
        ]
    },
    {
        english: 'Donkey',
        russian: 'Ослик',
        image: 'https://github.com/Arsenic337492/FunGlish/blob/main/%D0%B6%D0%B8%D0%B2%D0%BE%D1%82%D0%BD%D1%8B%D0%B5/donkey-%D1%82%D0%BE%D0%BD%D0%BA%D0%B8%D0%B9.jpg?raw=true',
        audio: '#',
        association: 'Смотри на этого ТОНЕНЬКОГО ослика (DONKEY ≈ тонкий)! Он такой худенький, надо его покормить.',
        examples: [
            'The donkey is grey - Ослик серый',
            'Donkey carries bags - Ослик носит сумки'
        ]
    },
    {
        english: 'Eagle',
        russian: 'Орёл',
        image: 'https://github.com/Arsenic337492/FunGlish/blob/main/%D0%B6%D0%B8%D0%B2%D0%BE%D1%82%D0%BD%D1%8B%D0%B5/eagle-%D0%B8%D0%B3%D0%BB%D0%B0.jpg?raw=true',
        audio: '#',
        association: 'Посмотри, как гордый орёл смотрит на ИГЛУ (EAGLE ≈ игла)! Он думает: "Какая острая железная игла"',
        examples: [
            'The eagle flies high - Орёл летит высоко',
            'Eagles have sharp eyes - У орлов острое зрение'
        ]
    },
    {
        english: 'Gopher',
        russian: 'Суслик',
        image: 'https://github.com/Arsenic337492/FunGlish/blob/main/%D0%B6%D0%B8%D0%B2%D0%BE%D1%82%D0%BD%D1%8B%D0%B5/gopher-%D0%B3%D0%BE%D0%BB%D1%8C%D1%84.jpg?raw=true',
        audio: '#',
        association: 'Какой умный суслик играет в ГОЛЬФ (GOPHER ≈ гольф)! Он держит клюшку и целится в лунку, как настоящий спортсмен.',
        examples: [
            'The gopher lives underground - Суслик живёт под землёй',
            'Gopher has small eyes - У суслика маленькие глазки'
        ]
    },
    {
        english: 'Seal',
        russian: 'Тюлень',
        image: 'https://github.com/Arsenic337492/FunGlish/blob/main/%D0%B6%D0%B8%D0%B2%D0%BE%D1%82%D0%BD%D1%8B%D0%B5/seal-%D1%81%D0%B8%D0%BB%D0%B0.png?raw=true',
        audio: '#',
        association: 'Посмотри, какой СИЛЬНЫЙ тюлень (SEAL ≈ сила)! Он показывает свои мускулы и гордится своей силой, как настоящий богатырь.',
        examples: [
            'The seal swims fast - Тюлень быстро плавает',
            'Seals live in cold water - Тюлени живут в холодной воде'
        ]
    },
    {
        english: 'Turkey',
        russian: 'Индейка',
        image: 'https://github.com/Arsenic337492/FunGlish/blob/main/%D0%B6%D0%B8%D0%B2%D0%BE%D1%82%D0%BD%D1%8B%D0%B5/turkey-%D1%82%D1%91%D1%80%D0%BA%D0%B0.jpg?raw=true',
        audio: '#',
        association: 'Смотри, как забавная индейка трёт сыр на ТЁРКЕ (TURKEY ≈ тёрка)! Она готовит вкусный салатик для своих цыплят.',
        examples: [
            'The turkey is big - Индейка большая',
            'Turkey has colorful feathers - У индейки разноцветные перья'
        ]
    }
];

// Массив слов для раздела "Еда"
const foodWords = [
    {
        english: 'Beetroot',
        russian: 'Свекла',
        image: 'https://github.com/Arsenic337492/FunGlish/blob/main/%D0%B5%D0%B4%D0%B0/beetrot-%D0%B1%D0%B8%D1%82%D0%B0.jpg?raw=true',
        audio: '#',
        association: 'Представьте свеклу с битой. BEET-root.',
        examples: [
            'I like beetroot salad - Мне нравится салат из свеклы',
            'Beetroot is very healthy - Свекла очень полезная'
        ]
    },
    {
        english: 'Cucumber',
        russian: 'Огурец',
        image: 'https://github.com/Arsenic337492/FunGlish/blob/main/%D0%B5%D0%B4%D0%B0/cucumber-%D0%BA%D1%80%D1%8E%D0%BA.png?raw=true',
        audio: '#',
        association: 'Представьте огурец, держащий в руке КРЮК (Cucumber ≈ крюк).',
        examples: [
            'Fresh cucumber in salad - Свежий огурец в салате',
            'Cucumber is very crispy - Огурец очень хрустящий'
        ]
    },
    {
        english: 'Plum',
        russian: 'Слива',
        image: 'https://github.com/Arsenic337492/FunGlish/blob/main/%D0%B5%D0%B4%D0%B0/plum-%D0%BF%D0%BB%D0%B0%D0%BC%D1%8F(%D1%81%D0%BB%D0%B8%D0%B2%D0%B0%20%D0%B3%D0%BE%D1%80%D0%B8%D1%82).jpg?raw=true',
        audio: '#',
        association: 'Представьте сливу, которая горит ярким ПЛАМЕНЕМ (PLUM ≈ пламя).',
        examples: [
            'Sweet purple plum - Сладкая фиолетовая слива',
            'Plum tree in garden - Сливовое дерево в саду'
        ]
    },
    {
        english: 'Porridge',
        russian: 'Каша',
        image: 'https://github.com/Arsenic337492/FunGlish/blob/main/%D0%B5%D0%B4%D0%B0/porridge-%D0%BF%D0%B0%D1%80%D0%B8%D0%B6.jpg?raw=true',
        audio: '#',
        association: 'Представьте кашу в Париже, на фоне Эйфелевой башни (Porridge ≈ Париж).',
        examples: [
            'Hot porridge for breakfast - Горячая каша на завтрак',
            'Oatmeal porridge is healthy - Овсяная каша полезная'
        ]
    },
    {
        english: 'Sausage',
        russian: 'Сосиска',
        image: 'https://github.com/Arsenic337492/FunGlish/blob/main/%D0%B5%D0%B4%D0%B0/sausage-%D1%81%D0%BE%D1%81%D0%B8%D1%81%D0%BA%D0%B0%20%D1%81%20%D1%81%D0%BE%D1%81%D0%BA%D0%BE%D0%B9.jpg?raw=true',
        audio: '#',
        association: 'Представьте СОСИСКУ с СОСКОЙ (SAUSage ≈ сосиска). Созвучие поможет запомнить слово.',
        examples: [
            'Grilled sausage for dinner - Жареная колбаса на ужин',
            'German sausage is famous - Немецкая колбаса знаменита'
        ]
    },
    {
        english: 'Seed',
        russian: 'Семя/Семечко',
        image: 'https://github.com/Arsenic337492/FunGlish/blob/main/%D0%B5%D0%B4%D0%B0/seed-%D1%81%D0%B8%D0%B4%D0%B8%D1%82.jpg?raw=true',
        audio: '#',
        association: 'Представьте семечко, которое СИДИТ (SEED ≈ сидит) на стуле.',
        examples: [
            'Plant the seed in soil - Посади семя в землю',
            'Sunflower seeds are tasty - Семечки подсолнуха вкусные'
        ]
    },
    {
        english: 'Soda',
        russian: 'Газировка',
        image: 'https://github.com/Arsenic337492/FunGlish/blob/main/%D0%B5%D0%B4%D0%B0/soda-%D0%B3%D0%B0%D0%B7%D0%B8%D1%80%D0%BE%D0%B2%D0%BA%D0%B0%20%D0%B2%20%D1%81%D0%BE%D0%B4%D0%B5.jpg?raw=true',
        audio: '#',
        association: 'Представьте газировку в упаковке СОДЫ (SODA = сода).',
        examples: [
            'Cold soda on hot day - Холодная газировка в жаркий день',
            'Orange soda is sweet - Апельсиновая газировка сладкая'
        ]
    }
];

let currentWordIndex = 0;
let currentCategory = 'animals'; // 'animals' или 'food'

// Функция для отображения текущего слова
function showCurrentWord() {
    const words = currentCategory === 'animals' ? animalWords : foodWords;
    const word = words[currentWordIndex];
    
    // Сохраняем прогресс просмотра слова
    saveWordProgress(word.english, currentCategory);
    updateStreak();
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
                ${currentWordIndex < words.length - 1 ? 
                '<button class="next-word" onclick="showNextWord()" title="Следующее слово">→</button>' : ''}
            </div>
        </div>
    `;
}

function showNextWord() {
    const words = currentCategory === 'animals' ? animalWords : foodWords;
    if (currentWordIndex < words.length - 1) {
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

// Функция восстановления пароля
function resetPassword() {
    const email = prompt('Введите ваш email:');
    if (email && isValidEmail(email)) {
        auth.sendPasswordResetEmail(email)
            .then(() => {
                alert('Ссылка для сброса пароля отправлена на почту!');
            })
            .catch((error) => {
                alert('Ошибка: ' + error.message);
            });
    } else if (email) {
        alert('Пожалуйста, введите корректный email');
    }
}

// Вход через Google
function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    
    auth.signInWithPopup(provider)
        .then(async (result) => {
            const user = result.user;
            
            // Сохраняем данные пользователя в Firestore (если новый)
            const userDoc = await db.collection('users').doc(user.uid).get();
            if (!userDoc.exists) {
                await db.collection('users').doc(user.uid).set({
                    name: user.displayName || 'Пользователь',
                    email: user.email,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    loginMethod: 'google'
                });
            }
            
            // Закрываем модальное окно
            document.getElementById('authModal').classList.remove('active');
        })
        .catch((error) => {
            console.error('Ошибка входа через Google:', error);
            alert('Ошибка входа через Google: ' + error.message);
        });
}

// Повторная отправка верификации
// Генерация и отправка кода подтверждения
let verificationCodeData = null;

function generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendEmailVerificationCode(email) {
    const code = generateVerificationCode();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 минут
    
    verificationCodeData = {
        code: code,
        email: email,
        expiresAt: expiresAt
    };
    
    // В реальном приложении здесь бы была отправка email
    // Отправляем реальный email через EmailJS
    try {
        await emailjs.send('service_gmail', 'template_verification', {
            to_email: email,
            verification_code: code,
            to_name: 'Пользователь'
        });
        showNotification('Код отправлен на ваш email!', 'success');
    } catch (error) {
        console.log('Ошибка отправки email:', error);
        // Для тестирования показываем код
        showNotification(`Для теста: код ${code}`, 'info');
    }
}

function verifyEmailCode() {
    const inputCode = document.getElementById('verificationCode').value.trim();
    
    if (!verificationCodeData) {
        showNotification('Код не был отправлен. Попробуйте снова.', 'error');
        return;
    }
    
    if (Date.now() > verificationCodeData.expiresAt) {
        showNotification('Код устарел. Отправьте новый.', 'error');
        return;
    }
    
    if (inputCode === verificationCodeData.code) {
        // Код верный - подтверждаем email
        if (window.tempUserData && window.tempUserData.user) {
            // Отмечаем email как подтвержденный в базе
            db.collection('users').doc(window.tempUserData.user.uid).update({
                emailVerified: true,
                verifiedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        }
        
        // Закрываем модальное окно
        document.getElementById('emailVerificationModal').classList.remove('active');
        
        // Показываем успех
        showNotification('✅ Email успешно подтвержден! Теперь вы можете войти.', 'success');
        
        // Очищаем данные
        verificationCodeData = null;
        window.tempUserData = null;
        
        // Показываем форму входа
        showLoginModal();
    } else {
        showNotification('Неверный код. Попробуйте снова.', 'error');
    }
}

function resendEmailCode() {
    if (verificationCodeData && verificationCodeData.email) {
        sendEmailVerificationCode(verificationCodeData.email);
        showNotification('Новый код отправлен!', 'success');
    }
}

function sendNewVerificationCode(email) {
    window.tempUserData = { email };
    sendEmailVerificationCode(email);
    document.getElementById('emailVerificationModal').classList.add('active');
}

function closeEmailVerificationModal() {
    document.getElementById('emailVerificationModal').classList.remove('active');
    verificationCodeData = null;
    window.tempUserData = null;
}

// Система уведомлений
function showNotification(message, type = 'info') {
    // Удаляем старые уведомления
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: inherit; font-size: 18px; cursor: pointer; margin-left: 10px;">×</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Показываем с анимацией
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Автоудаление через 5 секунд
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Система языков
let currentLanguage = 'ru'; // по умолчанию русский

function selectLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('selectedLanguage', lang);
    
    // Закрываем модальное окно
    document.getElementById('languageModal').classList.remove('active');
    
    // Обновляем интерфейс
    updateLanguageInterface();
    
    // Сохраняем в профиль пользователя (если авторизован)
    const user = auth.currentUser;
    if (user) {
        db.collection('users').doc(user.uid).update({
            language: lang
        });
    }
    
    showNotification(
        t(lang === 'ru' ? 'language_changed_ru' : 'language_changed_kz'), 
        'success'
    );
}

function showLanguageSettings() {
    // Закрываем сайдбар
    const overlay = document.querySelector('.profile-sidebar-overlay');
    const sidebar = document.querySelector('.profile-sidebar');
    if (overlay && sidebar) {
        overlay.classList.remove('active');
        sidebar.classList.remove('active');
    }
    
    // Открываем модальное окно выбора языка
    document.getElementById('languageModal').classList.add('active');
}

function updateLanguageInterface() {
    // Обновляем отображение текущего языка в профиле
    const currentLangElement = document.getElementById('current-language');
    if (currentLangElement) {
        currentLangElement.textContent = t('kazakh');
    }
    
    // Переводим все элементы с data-translate
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (element.tagName === 'INPUT' && (element.type === 'text' || element.type === 'email' || element.type === 'password')) {
            element.placeholder = t(key);
        } else {
            element.textContent = t(key);
        }
    });
    
    // Переводим заголовки страниц
    const welcomeTitle = document.querySelector('.welcome-message h1');
    if (welcomeTitle) {
        welcomeTitle.textContent = t('welcome_title');
    }
    
    const welcomeSubtitle = document.querySelector('.welcome-message p');
    if (welcomeSubtitle) {
        welcomeSubtitle.textContent = t('welcome_subtitle');
    }
}

function checkLanguageOnLoad() {
    // Проверяем сохраненный язык
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
        currentLanguage = savedLanguage;
        updateLanguageInterface();
    } else {
        // Если язык не выбран - показываем модальное окно
        setTimeout(() => {
            document.getElementById('languageModal').classList.add('active');
        }, 500);
    }
}

// Отправка ссылки для входа по email
function sendSignInLink() {
    const email = prompt('Введите ваш email:');
    if (!email || !isValidEmail(email)) {
        alert('Пожалуйста, введите корректный email');
        return;
    }

    const actionCodeSettings = {
        url: window.location.origin + '/email-signin.html',
        handleCodeInApp: true
    };

    firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
        .then(() => {
            window.localStorage.setItem('emailForSignIn', email);
            alert(`Ссылка для входа отправлена на ${email}!\n\nПроверьте почту и нажмите на ссылку для входа.`);
        })
        .catch((error) => {
            console.error('Ошибка отправки ссылки:', error);
            alert('Ошибка отправки: ' + error.message);
        });
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

// Функция для переключения категории
function switchCategory(category) {
    currentCategory = category;
    currentWordIndex = 0;
    return showCurrentWord();
}

// Контент для разных разделов
const contentById = {
    'animals-material': () => switchCategory('animals'),
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
    'food-material': () => switchCategory('food'),
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
