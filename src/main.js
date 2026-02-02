// Простой скрипт для эффекта липкого хедера
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (window.scrollY > 50) {
      header.style.padding = '12px 0';
      header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
  } else {
      header.style.padding = '20px 0';
      header.style.boxShadow = 'none';
  }
});

// Плавная прокрутка для ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});
// Анимация появления заголовка по словам
const title = document.getElementById('hero-title');
const text = title.innerText;
title.innerHTML = text.split(' ').map(word => `<span>${word}</span>`).join(' ');

const spans = title.querySelectorAll('span');
spans.forEach((span, idx) => {
    setTimeout(() => {
        span.style.opacity = '1';
        span.style.transform = 'translateY(0)';
    }, 100 * idx);
});

// Параллакс эффект для декора
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    const decor1 = document.querySelector('.hero__decor--1');
    if(decor1) {
        decor1.style.transform = `translate(${x * 50}px, ${y * 50}px)`;
    }
});
// Нативный Intersection Observer для анимации при скролле
const observerOptions = {
  threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.classList.add('active');
      }
  });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
  observer.observe(el);
});
// Функция анимации цифр
function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  const speed = 200; // Чем выше число, тем медленнее

  counters.forEach(counter => {
      const updateCount = () => {
          const target = +counter.getAttribute('data-target');
          const count = +counter.innerText;
          const inc = target / speed;

          if (count < target) {
              counter.innerText = Math.ceil(count + inc);
              setTimeout(updateCount, 1);
          } else {
              counter.innerText = target;
          }
      };
      updateCount();
  });
}

// Модифицируем существующий Intersection Observer
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          if (entry.target.classList.contains('stats-grid')) {
              animateCounters();
              statsObserver.unobserve(entry.target); // Запускаем только один раз
          }
      }
  });
}, { threshold: 0.5 });

const statsGrid = document.querySelector('.stats-grid');
if (statsGrid) statsObserver.observe(statsGrid);

// Капча
const num1 = Math.floor(Math.random() * 10) + 1;
const num2 = Math.floor(Math.random() * 10) + 1;
const captchaQuestion = document.getElementById('captcha-question');
if(captchaQuestion) captchaQuestion.innerText = `${num1} + ${num2}`;

// Валидация телефона (только цифры)
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '');
});

// Обработка формы
const careerForm = document.getElementById('careerForm');
const formStatus = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');
const btnText = submitBtn.querySelector('.btn-text');
const loader = document.getElementById('loader');

careerForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Проверка капчи
    const userAnswer = parseInt(document.getElementById('captcha-answer').value);
    if (userAnswer !== (num1 + num2)) {
        alert('Неверный ответ на капчу!');
        return;
    }

    // Имитация AJAX
    btnText.style.display = 'none';
    loader.style.display = 'block';
    submitBtn.disabled = true;

    setTimeout(() => {
        loader.style.display = 'none';
        btnText.style.display = 'block';
        btnText.innerText = 'Отправлено!';
        formStatus.innerText = 'Спасибо! Мы получили вашу заявку и свяжемся с вами в ближайшее время.';
        formStatus.classList.add('success');
        careerForm.reset();
    }, 2000);
});
// Мобильное меню
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-menu__link');

function toggleMenu() {
    burger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
}

burger.addEventListener('click', toggleMenu);

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenu.classList.contains('active')) toggleMenu();
    });
});

// Логика Cookie Popup
const cookiePopup = document.getElementById('cookiePopup');
const acceptBtn = document.getElementById('acceptCookies');

window.addEventListener('load', () => {
    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            cookiePopup.classList.add('active');
        }, 2000);
    }
});

acceptBtn.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    cookiePopup.classList.remove('active');
});