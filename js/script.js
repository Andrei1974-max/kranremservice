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
  if (!form) return;

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
    formData.append("access_key", "ТВОЙ_КЛЮЧ_С_WEB3FORMS");

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
// 6. ЭФФЕКТ ИСКР НА КНОПКАХ (ВЫПЕНДРЕЖ)
// =========================================
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".btn-primary").forEach((btn) => {
    btn.addEventListener("mouseenter", (e) => {
      for (let i = 0; i < 20; i++) {
        const spark = document.createElement("div");
        spark.className = "spark";
        const x = (Math.random() - 0.5) * 100;
        const y = (Math.random() - 0.5) * 100;
        spark.style.setProperty("--x", x + "%");
        spark.style.setProperty("--y", y + "%");
        spark.style.background = ["#e67e22", "#f1c40f", "#d35400"][
          Math.floor(Math.random() * 3)
        ];
        btn.appendChild(spark);
        setTimeout(() => spark.remove(), 800);
      }
    });
  });
});
