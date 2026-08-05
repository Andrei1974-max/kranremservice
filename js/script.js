// 1. Плавная прокрутка к ФОРМЕ (исправлен ID)
function scrollToForm() {
  const formSection = document.getElementById("application"); // Было "contact", стало "application"
  if (formSection) {
    formSection.scrollIntoView({ behavior: "smooth" });
  }
}

// 2. Обработка отправки формы
function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;

  // Имитация отправки (здесь потом будет fetch)
  form.style.display = "none";
  document.getElementById("successMessage").style.display = "block";
}

// 3. Плавный скролл для всех якорных ссылок меню
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});

// 5. АВТОМАТИЧЕСКАЯ ПОДСВЕТКА МЕНЮ (ИСПРАВЛЕНО ДЛЯ ФУТЕРА)
document.addEventListener("DOMContentLoaded", () => {
  // Ищем ВСЕ секции И футер
  const sections = document.querySelectorAll("section, footer");
  const navLinks = document.querySelectorAll(".nav-item");

  window.addEventListener("scroll", () => {
    let current = "";
    const scrollPosition = window.scrollY + 150; // +150px смещение для точного срабатывания под шапкой

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      // Если мы прокрутили до начала этой секции
      if (scrollPosition >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    // Специальная проверка для самого дна страницы (для Контактов)
    const isAtBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
    if (isAtBottom) {
      current = "contact"; // Принудительно включаем контакты, если мы внизу
    }

    // Переключаем класс active
    navLinks.forEach((link) => {
      link.classList.remove("active");
      // Проверяем, содержит ли ссылка текущий ID
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
});
// Пример инициализации карты с кучей "наворотов"
var myMap = new ymaps.Map("map-id", {
  center: [53.867766, 27.536888],
  zoom: 16,
  controls: ["zoomControl", "geolocationControl", "fullscreenControl"], // Какие кнопки показать
});

// Включить слой пробок
myMap.controls.add("trafficControl");

// Включить панорамы
myMap.controls.add("panoramaControl");
