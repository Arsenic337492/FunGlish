// Переводы для русского и казахского языков
const translations = {
    ru: {
        // Навигация
        'start_learning': 'Начать обучение',
        'profile': 'Профиль',
        'login': 'Войти',
        
        // Главная страница
        'welcome_title': 'Добро пожаловать в FunGlish!',
        'welcome_subtitle': 'Изучайте английские слова через ассоциации!',
        
        // Сайдбар
        'sections': 'Разделы',
        'animals': 'Животные',
        'food': 'Еда',
        'materials': 'Материалы',
        'training': 'Тренировка',
        
        // Формы
        'enter_email': 'Введите email',
        'enter_password': 'Введите пароль',
        'enter_name': 'Введите имя',
        'enter_surname': 'Введите фамилию',
        'confirm_password': 'Повторите пароль',
        'register': 'Зарегистрироваться',
        'forgot_password': 'Забыли пароль?',
        'no_account': 'Нет аккаунта?',
        'have_account': 'Уже есть аккаунт?',
        'male': 'Мужской',
        'female': 'Женский',
        'birth_date': 'Дата рождения',
        'gender': 'Пол',
        
        // Профиль
        'learned_words': 'Изучено слов',
        'streak_days': 'Дней подряд',
        'accuracy': 'Точность ответов',
        'total_tests': 'Всего тестов',
        'language': 'Язык',
        'achievements': 'Достижения',
        'settings': 'Настройки',
        'completed': 'пройдено',
        'remaining': 'осталось',
        
        // Модальные окна
        'select_language': 'Выберите язык',
        'confirm_email': 'Подтвердите email',
        'verification_code': 'Код подтверждения',
        'enter_6_digit_code': 'Введите 6-значный код',
        'confirm': 'Подтвердить',
        'resend_code': 'Отправить код повторно',
        'cancel': 'Отмена',
        'we_sent_code': 'Мы отправили 6-значный код на ваш email.',
        
        // Уведомления
        'language_changed_ru': 'Язык изменен на русский',
        'language_changed_kz': 'Тіл қазақ тіліне өзгертілді',
        'code_sent': 'Код отправлен на ваш email!',
        'new_code_sent': 'Новый код отправлен!',
        'email_verified': 'Email успешно подтвержден! Теперь вы можете войти.',
        'invalid_code': 'Неверный код. Попробуйте снова.',
        'code_expired': 'Код устарел. Отправьте новый.',
        
        // Обучение
        'association': 'Ассоциация:',
        'examples': 'Примеры использования:',
        'testing': 'Тестирование',
        'question_of': 'Вопрос {current} из {total}',
        'how_translate': 'Как переводится слово',
        
        // Языки
        'russian': 'Русский',
        'kazakh': 'Қазақ тілі'
    },
    kz: {
        // Навигация
        'start_learning': 'Оқуды бастау',
        'profile': 'Профиль',
        'login': 'Кіру',
        
        // Главная страница
        'welcome_title': 'FunGlish-ке қош келдіңіз!',
        'welcome_subtitle': 'Ағылшын сөздерін ассоциация арқылы үйреніңіз!',
        
        // Сайдбар
        'sections': 'Бөлімдер',
        'animals': 'Жануарлар',
        'food': 'Тамақ',
        'materials': 'Материалдар',
        'training': 'Жаттығу',
        
        // Формы
        'enter_email': 'Email енгізіңіз',
        'enter_password': 'Құпия сөзді енгізіңіз',
        'enter_name': 'Атыңызды енгізіңіз',
        'enter_surname': 'Тегіңізді енгізіңіз',
        'confirm_password': 'Құпия сөзді қайталаңыз',
        'register': 'Тіркелу',
        'forgot_password': 'Құпия сөзді ұмыттыңыз ба?',
        'no_account': 'Аккаунт жоқ па?',
        'have_account': 'Аккаунт бар ма?',
        'male': 'Ер',
        'female': 'Әйел',
        'birth_date': 'Туған күні',
        'gender': 'Жынысы',
        
        // Профиль
        'learned_words': 'Үйренген сөздер',
        'streak_days': 'Қатарынан күндер',
        'accuracy': 'Жауап дәлдігі',
        'total_tests': 'Барлық тесттер',
        'language': 'Тіл',
        'achievements': 'Жетістіктер',
        'settings': 'Баптаулар',
        'completed': 'аяқталды',
        'remaining': 'қалды',
        
        // Модальные окна
        'select_language': 'Тілді таңдаңыз',
        'confirm_email': 'Email растаңыз',
        'verification_code': 'Растау коды',
        'enter_6_digit_code': '6 таңбалы кодты енгізіңіз',
        'confirm': 'Растау',
        'resend_code': 'Кодты қайта жіберу',
        'cancel': 'Болдырмау',
        'we_sent_code': 'Біз сіздің email-ға 6 таңбалы код жібердік.',
        
        // Уведомления
        'language_changed_ru': 'Язык изменен на русский',
        'language_changed_kz': 'Тіл қазақ тіліне өзгертілді',
        'code_sent': 'Код сіздің email-ға жіберілді!',
        'new_code_sent': 'Жаңа код жіберілді!',
        'email_verified': 'Email сәтті расталды! Енді сіз кіре аласыз.',
        'invalid_code': 'Қате код. Қайта көріңіз.',
        'code_expired': 'Код ескірді. Жаңасын жіберіңіз.',
        
        // Обучение
        'association': 'Ассоциация:',
        'examples': 'Қолдану мысалдары:',
        'testing': 'Тестілеу',
        'question_of': '{current} сұрақ {total} ішінен',
        'how_translate': 'Сөз қалай аударылады',
        
        // Языки
        'russian': 'Орыс тілі',
        'kazakh': 'Қазақ тілі'
    }
};

// Функция перевода
function t(key, params = {}) {
    let text = translations[currentLanguage] && translations[currentLanguage][key] 
        ? translations[currentLanguage][key] 
        : translations['ru'][key] || key;
    
    // Заменяем параметры в тексте
    Object.keys(params).forEach(param => {
        text = text.replace(`{${param}}`, params[param]);
    });
    
    return text;
}