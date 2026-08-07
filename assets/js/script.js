// =========================================
// 1. ПЛАВНЫЙ СКРОЛЛ ДЛЯ ВСЕХ ЯКОРНЫХ ССЫЛОК МЕНЮ
// =========================================
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

// =========================================
// 2. АВТОМАТИЧЕСКАЯ ПОДСВЕТКА МЕНЮ (ПРИ СКРОЛЛЕ)
// =========================================
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section, footer");
  const navLinks = document.querySelectorAll(".nav-item");

  window.addEventListener("scroll", () => {
    let current = "";
    const scrollPosition = window.scrollY + 150;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPosition >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    const isAtBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
    if (isAtBottom) {
      current = "contact";
    }

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
});

// =========================================
// 3. ОТКРЫТИЕ/ЗАКРЫТИЕ МОБИЛЬНОГО МЕНЮ (БУРГЕР)
// =========================================
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger-btn");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });

    document.querySelectorAll(".nav-item, .btn-sales").forEach((link) => {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
      });
    });
  }
});

// =========================================
// 4. ОТПРАВКА ФОРМЫ (ГОТОВО ДЛЯ WEB3FORMS)
// =========================================
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("requestForm");
  if (!form) return; // ЭТА СТРОЧКА ОЧЕНЬ ВАЖНА!

  // 👇 КОГДА ПОЛУЧИШЬ КЛЮЧ, ЗАМЕНИ ЭТУ СТРОКУ
  const FORM_URL = "https://api.web3forms.com/submit";

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const submitBtn = document.getElementById("submitBtn");
    const successMessage = document.getElementById("successMessage");
    if (!submitBtn || !successMessage) return;

    submitBtn.disabled = true;
    submitBtn.innerText = "Отправка...";

    const formData = new FormData(form);

    // 👇 СЮДА ВСТАВИШЬ СВОЙ КЛЮЧ
    formData.append("access_key", "78301c8e-5c71-4ad0-81cf-b4e77aaec499");

    try {
      const response = await fetch(FORM_URL, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        form.style.display = "none";
        successMessage.style.display = "block";
      } else {
        alert("Ошибка: " + result.message);
        submitBtn.disabled = false;
        submitBtn.innerText = "Отправить заявку";
      }
    } catch (error) {
      alert("Ошибка сети. Проверьте подключение.");
      submitBtn.disabled = false;
      submitBtn.innerText = "Отправить заявку";
    }
  });
});

// =========================================
// 5. ЭФФЕКТ ПОЯВЛЕНИЯ ЭЛЕМЕНТОВ ПРИ СКРОЛЛЕ (ДВИЖУХА)
// =========================================
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  document
    .querySelectorAll(
      ".service-card, .company-description .content-block, .form-box, .footer-text-block",
    )
    .forEach((el) => {
      el.classList.add("fade-up");
      observer.observe(el);
    });
});

// =========================================
// 8. АВТОМАТИЧЕСКИЙ СЛАЙДЕР ФОТО
// =========================================
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.querySelector(".next-btn");
  const prevBtn = document.querySelector(".prev-btn");
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"));
    slides[index].classList.add("active");
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  // Запуск автоматической смены каждые 4 секунды
  function startSlider() {
    slideInterval = setInterval(nextSlide, 4000);
  }

  // Остановка при наведении мыши (чтобы пользователь мог прочитать)
  const sliderWrapper = document.querySelector(".photo-slider-wrapper");
  sliderWrapper.addEventListener("mouseenter", () =>
    clearInterval(slideInterval),
  );
  sliderWrapper.addEventListener("mouseleave", startSlider);

  // Слушатели на кнопки
  nextBtn.addEventListener("click", () => {
    nextSlide();
    clearInterval(slideInterval);
    startSlider();
  });
  prevBtn.addEventListener("click", () => {
    prevSlide();
    clearInterval(slideInterval);
    startSlider();
  });

  startSlider(); // Запускаем при загрузке
});

// =========================================
// ФУНКЦИЯ ДЛЯ ЦЕНТРАЛЬНОЙ КНОПКИ
// =========================================
function scrollToForm() {
  const formSection = document.getElementById("application");
  if (formSection) {
    formSection.scrollIntoView({ behavior: "smooth" });
  }
}
// =========================================
// 10. ИСЧЕЗНОВЕНИЕ ЦЕНТРАЛЬНОЙ КНОПКИ ПРИ ОТКРЫТИИ МЕНЮ
// =========================================
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger-btn");
  const navLinks = document.querySelector(".nav-links");
  const centerBtn = document.getElementById("center-btn");

  if (hamburger && navLinks && centerBtn) {
    // 1. Проверяем при загрузке страницы — кнопка должна быть видна
    centerBtn.style.display = "inline-block";

    // 2. Следим за кликом по бургеру (открытие/закрытие)
    hamburger.addEventListener("click", function () {
      if (navLinks.classList.contains("open")) {
        centerBtn.style.display = "none"; // меню открыто — кнопка исчезает
      } else {
        centerBtn.style.display = "inline-block"; // меню закрыто — кнопка возвращается
      }
    });

    // 3. Следим за кликами по пунктам меню (Главная, О нас, Услуги, Контакты)
    document.querySelectorAll(".nav-item, .btn-sales").forEach(function (link) {
      link.addEventListener("click", function () {
        // Когда ссылка нажата — меню закрывается, и мы гарантируем, что кнопка вернётся
        navLinks.classList.remove("open");
        centerBtn.style.display = "inline-block";
      });
    });
  }
});
