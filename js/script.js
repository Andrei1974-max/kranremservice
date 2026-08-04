// Плавная прокрутка к форме
function scrollToForm() {
  document.getElementById("contact").scrollIntoView({
    behavior: "smooth",
  });
}

// Обработка отправки формы
function handleSubmit(event) {
  event.preventDefault();

  // Получаем данные формы
  const form = event.target;
  const formData = new FormData(form);

  // Здесь можно добавить отправку данных на сервер
  // Пока просто показываем сообщение об успехе

  form.style.display = "none";
  document.getElementById("successMessage").style.display = "block";

  // В реальном проекте здесь будет AJAX запрос:
  /*
    fetch('/api/send-request', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        form.style.display = 'none';
        document.getElementById('successMessage').style.display = 'block';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Произошла ошибка. Попробуйте позже.');
    });
    */
}

// Добавляем плавную прокрутку для всех якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const socialIcons = document.querySelectorAll(".social-link");

  socialIcons.forEach((icon) => {
    // При наведении запускаем анимацию
    icon.addEventListener("mouseenter", () => {
      icon.style.animation =
        "pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite";
    });

    // Убираем анимацию, когда курсор уходит
    icon.addEventListener("mouseleave", () => {
      icon.style.animation = "none";
    });
  });
});
