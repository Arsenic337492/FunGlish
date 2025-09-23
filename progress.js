// Функция загрузки статистики пользователя
function loadUserStats() {
    const user = auth.currentUser;
    if (!user) return;
    
    db.collection('userProgress').doc(user.uid).get().then((doc) => {
        if (doc.exists) {
            const data = doc.data();
            
            // Количество изученных слов
            const learnedWords = data.learnedWords ? Object.keys(data.learnedWords).length : 0;
            const learnedWordsEl = document.getElementById('learned-words');
            if (learnedWordsEl) learnedWordsEl.textContent = learnedWords;
            
            // Дни подряд
            const streak = data.streak || 0;
            const streakEl = document.getElementById('streak-days');
            if (streakEl) streakEl.textContent = streak;
            
            // Статистика тестов
            if (data.testStats) {
                const totalAnswers = data.testStats.totalAnswers || 0;
                const correctAnswers = data.testStats.correctAnswers || 0;
                const accuracy = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0;
                
                const accuracyEl = document.getElementById('accuracy');
                const totalTestsEl = document.getElementById('total-tests');
                if (accuracyEl) accuracyEl.textContent = accuracy + '%';
                if (totalTestsEl) totalTestsEl.textContent = totalAnswers;
            }
            
            // Обновляем прогресс-бар
            const totalWords = animalWords.length + foodWords.length;
            const progress = totalWords > 0 ? Math.round((learnedWords / totalWords) * 100) : 0;
            const progressBar = document.querySelector('.progress');
            if (progressBar) {
                progressBar.style.width = progress + '%';
            }
            
            // Обновляем текст прогресса
            const progressStats = document.querySelector('.progress-stats');
            if (progressStats) {
                progressStats.innerHTML = `
                    <span>${progress}% пройдено</span>
                    <span>${100 - progress}% осталось</span>
                `;
            }
        }
    }).catch((error) => {
        console.log('Ошибка загрузки статистики:', error);
    });
}