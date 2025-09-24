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
        'kazakh': 'Қазақ тілі',
        
        // Аватар
        'avatar_view_dev': 'Просмотр аватара - в разработке',
        'avatar_change_dev': 'Изменение аватара - в разработке',
        'avatar_delete_dev': 'Удаление аватара - в разработке',
        
        // Дополнительные тексты
        'welcome_learning': 'Добро пожаловать в FunGlish!',
        'select_section': 'Выберите раздел для изучения из меню слева.',
        'remember_me': 'Запомнить меня',
        'login_google': 'Войти через Google',
        'premium_features': 'Дополнительные возможности',
        'premium_description': 'Для доступа к расширенным функциям необходима регистрация:',
        'premium_tests': '✨ Итоговые тесты с сертификатами',
        'premium_hints': '💡 Подсказки и объяснения',
        'premium_progress': '📊 Прогресс обучения',
        'premium_achievements': '🏆 Достижения',
        'premium_chat': '💬 Общение с другими учениками',
        'premium_register': 'Зарегистрироваться',
        
        // Тесты
        'how_translate_english': 'Как по-английски будет',
        'arrange_letters': 'Расставьте буквы правильно',
        'enter_correct_word': 'Введите правильное слово',
        'check': 'Проверить',
        'correct': 'Правильно',
        'incorrect': 'Неправильно',
        'correct_answer': 'Правильный ответ',
        'excellent_word': 'Отлично знаете это слово!',
        'remember_word': 'Запомните это слово!',
        'excellent_result': 'Отлично! 🎉',
        'good_result': 'Хорошо! 😊',
        'need_repeat': 'Нужно повторить 💪',
        'test_results': 'Результаты теста',
        'correct_answers': 'Правильных ответов',
        'out_of': 'из',
        'repeat_test': 'Повторить тест',
        'back_to_learning': 'К обучению',
        
        // Ошибки валидации
        'name_required': 'Имя обязательно',
        'surname_required': 'Фамилия обязательна',
        'birth_required': 'Дата рождения обязательна',
        'gender_required': 'Пол обязателен',
        'email_invalid': 'Введите корректный email',
        'password_required': 'Пароль обязателен',
        'password_weak': 'Пароль должен содержать минимум 8 символов, заглавную и строчную буквы, цифру и спецсимвол',
        'passwords_mismatch': 'Пароли не совпадают',
        'invalid_credentials': 'Неверный email или пароль',
        'verify_email_first': 'Подтвердите ваш email перед входом',
        'send_code': 'Отправить код',
        'user': 'Пользователь',
        'google_login_error': 'Ошибка входа через Google',
        'test_code': 'Для теста: код',
        'code_not_sent': 'Код не был отправлен. Попробуйте снова',
        'enter_your_email': 'Введите ваш email:',
        'reset_link_sent': 'Ссылка для сброса пароля отправлена на почту!',
        'error': 'Ошибка',
        'enter_valid_email': 'Пожалуйста, введите корректный email',
        'signin_link_sent': 'Ссылка для входа отправлена на {email}!\n\nПроверьте почту и нажмите на ссылку для входа.',
        'sending_error': 'Ошибка отправки',
        
        // Лендинг
        'hero_title': 'FunGlish — учим английский играя',
        'hero_subtitle': 'Изучайте английские слова через ассоциации. Просто, весело и эффективно.',
        'advantage_associations': 'Метод ассоциаций',
        'advantage_associations_desc': 'Запоминайте слова через яркие образы и смешные истории',
        'advantage_tests': 'Игровые тесты',
        'advantage_tests_desc': 'Проверяйте знания в интерактивном формате с мгновенной обратной связью',
        'advantage_languages': 'Два языка',
        'advantage_languages_desc': 'Русский и казахский интерфейс для удобства всех пользователей',
        'gamification_title': 'Отслеживайте прогресс',
        'gamification_desc': 'Система достижений, счетчики прогресса и награды мотивируют продолжать обучение каждый день',
        'cta_title': 'Готовы начать?',
        'cta_subtitle': 'Присоединяйтесь к тысячам учеников, которые уже изучают английский с FunGlish',
        'try_free': 'Попробовать бесплатно'
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
        'kazakh': 'Қазақ тілі',
        
        // Аватар
        'avatar_view_dev': 'Аватарды қарау - әзірлеуде',
        'avatar_change_dev': 'Аватарды өзгерту - әзірлеуде',
        'avatar_delete_dev': 'Аватарды жою - әзірлеуде',
        
        // Дополнительные тексты
        'welcome_learning': 'FunGlish-ке қош келдіңіз!',
        'select_section': 'Сол жақтағы мәзірден оқу бөлімін таңдаңыз.',
        'remember_me': 'Мені есте сақта',
        'login_google': 'Google арқылы кіру',
        'premium_features': 'Қосымша мүмкіндіктер',
        'premium_description': 'Кеңейтілген функцияларға қол жеткізу үшін тіркелу қажет:',
        'premium_tests': '✨ Сертификаттармен қорытынды тесттер',
        'premium_hints': '💡 Кеңестер мен түсініктемелер',
        'premium_progress': '📊 Оқу прогресі',
        'premium_achievements': '🏆 Жетістіктер',
        'premium_chat': '💬 Басқа студенттермен қарым-қатынас',
        'premium_register': 'Тіркелу',
        
        // Тесттер
        'how_translate_english': 'Ағылшынша қалай болады',
        'arrange_letters': 'Әріптерді дұрыс орналастырыңыз',
        'enter_correct_word': 'Дұрыс сөзді енгізіңіз',
        'check': 'Тексеру',
        'correct': 'Дұрыс',
        'incorrect': 'Қате',
        'correct_answer': 'Дұрыс жауап',
        'excellent_word': 'Осы сөзді өте жақсы білесіз!',
        'remember_word': 'Осы сөзді есте сақтаңыз!',
        'excellent_result': 'Өте жақсы! 🎉',
        'good_result': 'Жақсы! 😊',
        'need_repeat': 'Қайталау керек 💪',
        'test_results': 'Тест нәтижелері',
        'correct_answers': 'Дұрыс жауаптар',
        'out_of': 'ішінен',
        'repeat_test': 'Тестті қайталау',
        'back_to_learning': 'Оқуға қайту',
        
        // Валидация қателері
        'name_required': 'Аты міндетті',
        'surname_required': 'Тегі міндетті',
        'birth_required': 'Туған күні міндетті',
        'gender_required': 'Жынысы міндетті',
        'email_invalid': 'Дұрыс email енгізіңіз',
        'password_required': 'Құпия сөз міндетті',
        'password_weak': 'Құпия сөз кемінде 8 таңба, бас және кіші әріптер, сан және арнайы таңба болуы керек',
        'passwords_mismatch': 'Құпия сөздер сәйкес келмейді',
        'invalid_credentials': 'Қате email немесе құпия сөз',
        'verify_email_first': 'Кіру алдында email-ды растаңыз',
        'send_code': 'Код жіберу',
        'user': 'Пайдаланушы',
        'google_login_error': 'Google арқылы кіру қатесі',
        'test_code': 'Тест үшін: код',
        'code_not_sent': 'Код жіберілмеді. Қайта көріңіз',
        'enter_your_email': 'Сіздің email-ыңызды енгізіңіз:',
        'reset_link_sent': 'Құпия сөзді қалпына келтіру сілтемесі поштаға жіберілді!',
        'error': 'Қате',
        'enter_valid_email': 'Дұрыс email енгізіңіз',
        'signin_link_sent': 'Кіру сілтемесі {email} мекенжайына жіберілді!\n\nПоштаңызды тексеріңіз және кіру үшін сілтемені басыңыз.',
        'sending_error': 'Жіберу қатесі',
        
        // Лендинг
        'hero_title': 'FunGlish — ағылшын тілін ойын арқылы үйренеміз',
        'hero_subtitle': 'Ағылшын сөздерін ассоциация арқылы үйреніңіз. Қарапайым, қызықты және тиімді.',
        'advantage_associations': 'Ассоциация әдісі',
        'advantage_associations_desc': 'Сөздерді жарқын образдар мен қызықты әңгімелер арқылы есте сақтаңыз',
        'advantage_tests': 'Ойын тесттері',
        'advantage_tests_desc': 'Білімді интерактивті форматта лезде кері байланыспен тексеріңіз',
        'advantage_languages': 'Екі тіл',
        'advantage_languages_desc': 'Барлық пайдаланушылардың қолайлылығы үшін орыс және қазақ интерфейсі',
        'gamification_title': 'Прогрессті қадағалаңыз',
        'gamification_desc': 'Жетістіктер жүйесі, прогресс санауыштары және марапаттар күн сайын оқуды жалғастыруға уәждейді',
        'cta_title': 'Бастауға дайынсыз ба?',
        'cta_subtitle': 'FunGlish арқылы ағылшын тілін үйреніп жатқан мыңдаған оқушыларға қосылыңыз',
        'try_free': 'Тегін сынап көру'
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
