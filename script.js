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

    // Обработка формы входа
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitButton = loginForm.querySelector('button.button-submit');
            const emailInput = loginForm.querySelector('.inputForm input[type="text"]');
            const passwordInput = loginForm.querySelector('.inputForm input[type="password"]');

            if (submitButton) submitButton.disabled = true;
              try {
                console.log('Попытка входа...');
                const userCredential = await auth.signInWithEmailAndPassword(emailInput.value, passwordInput.value);
                if (userCredential.user) {
                    console.log('Успешный вход:', {
                        email: userCredential.user.email,
                        uid: userCredential.user.uid,
                        metadata: {
                            lastSignInTime: userCredential.user.metadata.lastSignInTime,
                            creationTime: userCredential.user.metadata.creationTime
                        }
                    });                    document.getElementById('authModal').classList.remove('active');
                }
            } catch (error) {
                alert(error.message);
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
