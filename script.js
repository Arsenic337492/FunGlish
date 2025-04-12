// Открытие и закрытие сайдбара "Профиль"
var profileSidebar = document.getElementById("profileSidebar");
var profileBtn = document.getElementById("profile-btn");
var profileClose = document.getElementsByClassName("close-profile")[0];

profileBtn.onclick = function () {
    profileSidebar.classList.add("open"); // Открываем сайдбар
};

profileClose.onclick = function () {
    profileSidebar.classList.remove("open"); // Закрываем сайдбар
};

// Открытие и закрытие модального окна "Вход"
var loginModal = document.getElementById("loginModal");
var loginBtn = document.getElementById("login-btn");
var loginClose = document.getElementsByClassName("close")[1];

loginBtn.onclick = function () {
    loginModal.style.display = "block"; // Открываем модальное окно
};

loginClose.onclick = function () {
    loginModal.style.display = "none"; // Закрываем модальное окно
};

// Открытие и закрытие модального окна "Настройки"
var settingsModal = document.getElementById("settingsModal");
var settingsBtn = document.getElementById("settings-btn");
var settingsClose = document.getElementsByClassName("close-settings")[0];

settingsBtn.onclick = function () {
    settingsModal.style.display = "block"; // Открываем модальное окно
};

settingsClose.onclick = function () {
    settingsModal.style.display = "none"; // Закрываем модальное окно
};

// Псевдо-вход
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username && password) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username);
        localStorage.setItem("avatar", "default-avatar.png"); // Устанавливаем аватар по умолчанию

        alert(`Добро пожаловать, ${username}!`);
        loginModal.style.display = "none"; // Закрываем модальное окно после успешного входа
        updateUI();
    } else {
        alert("Пожалуйста, введите логин и пароль.");
    }
});

// Выход
document.getElementById("logout-btn").onclick = function () {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("avatar");

    alert("Вы вышли из аккаунта.");
    profileSidebar.classList.remove("open"); // Закрываем сайдбар
    updateUI();
};

// Обновление интерфейса
function updateUI() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const username = localStorage.getItem("username");
    const avatar = localStorage.getItem("avatar") || "default-avatar.png";

    if (isLoggedIn === "true") {
        document.getElementById("login-btn").style.display = "none";
        document.getElementById("profile-btn").style.display = "block";
        document.getElementById("profile-username").textContent = username;
        document.querySelector(".avatar").src = avatar;
    } else {
        document.getElementById("login-btn").style.display = "block";
        document.getElementById("profile-btn").style.display = "none";
    }
}

// Применение настроек при загрузке страницы
function applySettings() {
    const theme = localStorage.getItem("theme") || "light";
    setTheme(theme);

    const avatar = localStorage.getItem("avatar") || "default-avatar.png";
    document.querySelector(".avatar").src = avatar;

    updateUI();
}

// Вызываем функцию при загрузке страницы
applySettings();

// Закрытие всех модальных окон и сайдбаров по клику вне
window.onclick = function (event) {
    const modals = document.querySelectorAll(".modal");
    modals.forEach(modal => {
        if (event.target == modal) {
            modal.style.display = "none"; // Закрываем модалку при клике вне
        }
    });

    const sidebars = document.querySelectorAll(".sidebar");
    sidebars.forEach(sidebar => {
        if (event.target == sidebar) {
            sidebar.classList.remove("open"); // Закрываем сайдбар при клике вне
        }
    });
};
