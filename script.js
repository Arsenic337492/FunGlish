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
    let isLoggingIn = false; // Флаг для предотвращения множественных запросов

    try {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        auth = firebase.auth();
        db = firebase.firestore();        // Обработка формы входа        const loginForm = document.querySelector('.login-form');
        if (loginForm) {            loginForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                if (isLoggingIn) return;
                isLoggingIn = true;

                const submitButton = loginForm.querySelector('button[type="submit"]');
                if (submitButton) submitButton.disabled = true;

                const email = loginForm.querySelector('.inputForm input[type="text"]').value;
                const password = loginForm.querySelector('.inputForm input[type="password"]').value;

                if (!email || !password) {
                    alert('Пожалуйста, заполните все поля');
                    isLoggingIn = false;
                    if (submitButton) submitButton.disabled = false;
                    return;
                }

                try {
                    // Попытка входа через Firebase
                    const userCredential = await auth.signInWithEmailAndPassword(email, password);
                    console.log('Успешный вход:', userCredential.user.email);
                    
                    // Закрываем модальное окно и перенаправляем на страницу обучения
                    document.getElementById('authModal').classList.remove('active');
                    window.location.href = 'learning.html';
                } catch (error) {
                    let errorMessage = 'Ошибка входа: ';
                    if (error.code === 'auth/network-request-failed') {
                        errorMessage += 'Проверьте подключение к интернету';
                    } else if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
                        errorMessage += 'Неверный email или пароль';
                    } else {
                        errorMessage += error.message;
                    }
                    alert(errorMessage);
                } finally {
                    isLoggingIn = false;
                    if (submitButton) submitButton.disabled = false;
                }
            });
        }

        // Обработка кнопки входа/профиля в навбаре
        auth.onAuthStateChanged(user => {
            const loginButton = document.querySelector('.nav-right .login-button');
            if (loginButton) {
                if (user) {
                    loginButton.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        Профиль
                    `;
                    loginButton.onclick = () => {
                        auth.signOut().then(() => {
                            window.location.reload();
                        });
                    };
                } else {
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
            }
        });
    } catch (e) {
        console.error("Error initializing Firebase:", e);
    }
});
