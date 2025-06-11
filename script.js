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
                `;                button.onclick = () => {
                    // Создаем оверлей и сайдбар если их еще нет
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
                        document.body.appendChild(sidebar);
                    }
                    
                    // Открываем сайдбар
                    overlay.classList.add('active');
                    sidebar.classList.add('active');
                    
                    // Закрытие при клике на оверлей
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
