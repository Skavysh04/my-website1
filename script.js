// --- Автоформатирование номера телефона ---
document.getElementById('phone').addEventListener('input', function(e) {
    // Удаляем все нецифровые символы
    let input = e.target.value.replace(/\D/g, '');
    
    // Если номер не начинается с "8", добавляем её
    if (!input.startsWith('8')) {
      input = '8' + input;
    }
    // Ограничиваем длину до 11 цифр (8 + 10 цифр)
    input = input.substring(0, 11);
    
    // Форматируем номер: 8 (123) 456-78-90
    let formatted = input[0] || '';
    if (input.length > 1) {
      formatted += ' (' + input.substring(1, 4);
    }
    if (input.length >= 4) {
      formatted += ') ';
    }
    if (input.length >= 4) {
      formatted += input.substring(4, 7);
    }
    if (input.length >= 7) {
      formatted += '-' + input.substring(7, 9);
    }
    if (input.length >= 9) {
      formatted += '-' + input.substring(9, 11);
    }
    
    e.target.value = formatted;
  });
  
  // --- Обработка отправки формы ---
  document.getElementById('registrationForm').addEventListener('submit', function(e) {
    // Отключаем стандартную валидацию, чтобы контролировать её через JS:
    e.preventDefault();
    
    // Сбрасываем кастомные тексты ошибок перед каждой проверкой
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput  = document.getElementById('lastName');
    const emailInput     = document.getElementById('email');
    const phoneInput     = document.getElementById('phone');
    const passwordInput  = document.getElementById('password');
    
    firstNameInput.setCustomValidity('');
    lastNameInput.setCustomValidity('');
    emailInput.setCustomValidity('');
    phoneInput.setCustomValidity('');
    passwordInput.setCustomValidity('');
    
    // Берём значения
    const firstName = firstNameInput.value.trim();
    const lastName  = lastNameInput.value.trim();
    const email     = emailInput.value.trim();
    const phone     = phoneInput.value.trim();
    const password  = passwordInput.value;
    
    // Регулярные выражения для проверки
    const namePattern     = /^[A-Za-zА-Яа-яЁё]+$/;
    const emailPattern    = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|ru|net|org|info|yandex)$/i;
    const phonePattern    = /^8 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    
    let formValid = true; // Флаг, указывающий, всё ли корректно

    // --- Проверка Имени ---
    if (!firstName) {
      // Поле пустое
      firstNameInput.setCustomValidity('Вы пропустили это поле.');
      formValid = false;
    } else if (!namePattern.test(firstName)) {
      // Формат не подходит
      firstNameInput.setCustomValidity('Имя должно содержать только буквы.');
      formValid = false;
    }

    // --- Проверка Фамилии ---
    if (!lastName) {
      lastNameInput.setCustomValidity('Вы пропустили это поле.');
      formValid = false;
    } else if (!namePattern.test(lastName)) {
      lastNameInput.setCustomValidity('Фамилия должна содержать только буквы.');
      formValid = false;
    }

    // --- Проверка Email ---
    if (!email) {
      emailInput.setCustomValidity('Вы пропустили это поле.');
      formValid = false;
    } else if (!emailPattern.test(email)) {
      emailInput.setCustomValidity('Электронная почта некорректна (допустимые домены: com, ru, net, org, info, yandex).');
      formValid = false;
    }

    // --- Проверка Телефона ---
    if (!phone) {
      phoneInput.setCustomValidity('Вы пропустили это поле.');
      formValid = false;
    } else if (!phonePattern.test(phone)) {
      phoneInput.setCustomValidity('Телефон должен быть в формате 8 (123) 456-78-90.');
      formValid = false;
    }

    // --- Проверка Пароля ---
    if (!password) {
      passwordInput.setCustomValidity('Вы пропустили это поле.');
      formValid = false;
    } else if (!passwordPattern.test(password)) {
      passwordInput.setCustomValidity('Пароль должен содержать минимум 8 символов, включая буквы и цифры.');
      formValid = false;
    }
    
    // Если форма не валидна, просим браузер показать всплывающие подсказки
    if (!formValid) {
      // reportValidity() покажет встроенные подсказки для первого же невалидного поля
      this.reportValidity();
    } else {
      // Если всё ок, перенаправляем
      window.location.href = 'glaw.html';
    }
  });
  
 