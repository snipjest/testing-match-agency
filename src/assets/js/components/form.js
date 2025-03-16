// === Валидация формы ===
// Маска input tel
const telInputs = document.querySelectorAll('input[name="tel"]')
telInputs.forEach((input) => {
  IMask(input, { mask: '+{7} (000) 000-00-00' })
})

// Функция для проверки поля имени
function validateName(input) {
  if (!input.value.trim()) {
    addError(input, 'Необходимо заполнить это поле')
    return false
  } else {
    removeError(input)
    input.classList.add('form__input--filled')
    return true
  }
}

// Функция для проверки поля телефона
function validatePhone(input) {
  const phonePattern = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/
  if (!input.value.trim() || !phonePattern.test(input.value)) {
    addError(input, 'Необходимо заполнить это поле')
    return false
  } else {
    removeError(input)
    input.classList.add('form__input--filled')
    return true
  }
}

// Функция для проверки чекбокса
function validateCheckbox(input) {
  if (!input.checked) {
    input.classList.add('checkbox__input--error')
    return false
  } else {
    input.classList.remove('checkbox__input--error')
    input.classList.add('checkbox__input--filled')
    return true
  }
}

// Функция для проверки textarea (не обязательное поле)
function validateTextarea(textarea) {
  if (textarea.value.trim()) {
    textarea.classList.add('form__input--filled')
  } else {
    textarea.classList.remove('form__input--filled')
  }
  return true // Всегда возвращает true, так как поле не обязательное
}

// Основная функция валидации формы
function validateForm(form) {
  let isValid = true

  // Проверка поля имени
  const nameInput = form.querySelector('input[name="name"]')
  if (nameInput && !validateName(nameInput)) {
    isValid = false
  }

  // Проверка поля телефона
  const telInput = form.querySelector('input[name="tel"]')
  if (telInput && !validatePhone(telInput)) {
    isValid = false
  }

  // Проверка чекбокса
  const checkboxInput = form.querySelector('.checkbox__input')
  if (checkboxInput && !validateCheckbox(checkboxInput)) {
    isValid = false
  }

  // Проверка textarea (не обязательное поле)
  const textarea = form.querySelector('textarea')
  if (textarea) {
    validateTextarea(textarea) // Просто обновляем классы, не влияем на isValid
  }

  return isValid
}

// Добавление ошибки
function addError(input, message) {
  const existingError = input.nextElementSibling
  if (!existingError || !existingError.classList.contains('form__msg-error')) {
    input.classList.add('form__input--error')
    const errorElement = document.createElement('div')
    errorElement.classList.add('form__msg-error')
    errorElement.textContent = message
    input.parentNode.insertBefore(errorElement, input.nextSibling)
  }
}

// Удаление ошибки
function removeError(input) {
  input.classList.remove('form__input--error')
  const errorElement = input.nextElementSibling
  if (errorElement && errorElement.classList.contains('form__msg-error')) {
    errorElement.remove()
  }
}

// Добавление loader
function showLoader(form) {
  const popupBtn = form.querySelector('button[type="submit"]')
  if (popupBtn) {
    popupBtn.disabled = true
    popupBtn.classList.add('loader')
  }
}

// Удаление loader
function hideLoader(form) {
  const popupBtn = form.querySelector('button[type="submit"]')
  if (popupBtn) {
    popupBtn.disabled = false
    popupBtn.classList.remove('loader')
  }
}

// Функция для отправки данных формы (имитация асинхронного запроса)
function submitFormData(form) {
  return new Promise((resolve, reject) => {
    showLoader(form)
    setTimeout(() => {
      const isSuccess = Math.random() > 0.5 // Рандомный ответ
      if (isSuccess) {
        resolve()
      } else {
        reject()
      }
    }, 3000)
  })
}

// Инициализация обработчиков событий
document.querySelectorAll('.form').forEach((form) => {
  const nameInput = form.querySelector('input[name="name"]')
  const telInput = form.querySelector('input[name="tel"]')
  const checkboxInput = form.querySelector('.checkbox__input')
  const textarea = form.querySelector('textarea')

  if (nameInput) {
    nameInput.addEventListener('input', () => {
      validateName(nameInput)
    })
  }

  if (telInput) {
    telInput.addEventListener('input', () => {
      validatePhone(telInput)
    })
  }

  if (checkboxInput) {
    checkboxInput.addEventListener('change', () => {
      validateCheckbox(checkboxInput)
    })
  }

  if (textarea) {
    textarea.addEventListener('input', () => {
      validateTextarea(textarea)
    })
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault()
    if (validateForm(form)) {
      submitFormData(form)
        .then(() => {
          popup_open('popup-success')
          hideLoader(form)
        })
        .catch(() => {
          popup_open('popup-error')
          hideLoader(form)
        })
    }
  })
})

// Возвращает последнюю форму в которой произошла ошибка
document.getElementById('back-btn').addEventListener('click', function () {
  console.log(last_popup_id)
  popup_open(last_popup_id)
})
