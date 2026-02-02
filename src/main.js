/**
 * ECHO-SPARK.LIFE - Универсальный скрипт
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. МОБИЛЬНОЕ МЕНЮ (Работает на всех страницах) ---
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link');

  if (burger && mobileMenu) {
      const toggleMenu = () => {
          burger.classList.toggle('active');
          mobileMenu.classList.toggle('active');
          document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
      };

      burger.addEventListener('click', toggleMenu);

      mobileLinks.forEach(link => {
          link.addEventListener('click', () => {
              if (mobileMenu.classList.contains('active')) toggleMenu();
          });
      });
  }

  // --- 2. АНИМАЦИЯ ГЛАВНОГО ЗАГОЛОВКА (Только для главной) ---
  const title = document.getElementById('hero-title');
  if (title) {
      const text = title.innerText;
      title.innerHTML = text.split(' ').map(word => `<span>${word}</span>`).join(' ');

      const spans = title.querySelectorAll('span');
      spans.forEach((span, idx) => {
          setTimeout(() => {
              span.style.opacity = '1';
              span.style.transform = 'translateY(0)';
          }, 100 * idx);
      });
  }

  // --- 3. ИНТЕРАКТИВНЫЙ ДЕКОР (Параллакс) ---
  document.addEventListener('mousemove', (e) => {
      const decor1 = document.querySelector('.hero__decor--1');
      if (decor1) {
          const x = e.clientX / window.innerWidth;
          const y = e.clientY / window.innerHeight;
          decor1.style.transform = `translate(${x * 50}px, ${y * 50}px)`;
      }
  });

  // --- 4. СКРОЛЛ-АНИМАЦИИ (Intersection Observer) ---
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  entry.target.classList.add('active');
              }
          });
      }, { threshold: 0.15 });

      revealElements.forEach(el => observer.observe(el));
  }

  // --- 5. ЖИВЫЕ СЧЕТЧИКИ (Только где есть .stats-grid) ---
  const statsGrid = document.querySelector('.stats-grid');
  if (statsGrid) {
      const animateCounters = () => {
          const counters = document.querySelectorAll('.counter');
          const speed = 200;
          counters.forEach(counter => {
              const target = +counter.getAttribute('data-target');
              const count = +counter.innerText;
              const inc = target / speed;
              const updateCount = () => {
                  const currentCount = +counter.innerText;
                  if (currentCount < target) {
                      counter.innerText = Math.ceil(currentCount + inc);
                      setTimeout(updateCount, 10);
                  } else {
                      counter.innerText = target;
                  }
              };
              updateCount();
          });
      };

      const statsObserver = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
              animateCounters();
              statsObserver.unobserve(statsGrid);
          }
      }, { threshold: 0.5 });
      statsObserver.observe(statsGrid);
  }

  // --- 6. КОНТАКТНАЯ ФОРМА И КАПЧА ---
  const careerForm = document.getElementById('careerForm');
  if (careerForm) {
      const num1 = Math.floor(Math.random() * 10) + 1;
      const num2 = Math.floor(Math.random() * 10) + 1;
      const captchaQuestion = document.getElementById('captcha-question');
      const phoneInput = document.getElementById('phone');

      if (captchaQuestion) captchaQuestion.innerText = `${num1} + ${num2}`;

      if (phoneInput) {
          phoneInput.addEventListener('input', function() {
              this.value = this.value.replace(/[^0-9]/g, '');
          });
      }

      careerForm.addEventListener('submit', function(e) {
          e.preventDefault();
          const userAnswer = parseInt(document.getElementById('captcha-answer').value);
          if (userAnswer !== (num1 + num2)) {
              alert('Неверный ответ на капчу!');
              return;
          }

          const submitBtn = document.getElementById('submitBtn');
          const btnText = submitBtn.querySelector('.btn-text');
          const loader = document.getElementById('loader');
          const formStatus = document.getElementById('formStatus');

          btnText.style.display = 'none';
          loader.style.display = 'block';
          submitBtn.disabled = true;

          setTimeout(() => {
              loader.style.display = 'none';
              btnText.style.display = 'block';
              btnText.innerText = 'Отправлено!';
              formStatus.innerText = 'Спасибо! Мы получили вашу заявку.';
              formStatus.classList.add('success');
              careerForm.reset();
          }, 2000);
      });
  }

  // --- 7. COOKIE POPUP ---
  const cookiePopup = document.getElementById('cookiePopup');
  const acceptBtn = document.getElementById('acceptCookies');

  if (cookiePopup && acceptBtn) {
      if (!localStorage.getItem('cookiesAccepted')) {
          setTimeout(() => cookiePopup.classList.add('active'), 2000);
      }
      acceptBtn.addEventListener('click', () => {
          localStorage.setItem('cookiesAccepted', 'true');
          cookiePopup.classList.remove('active');
      });
  }

  // --- 8. ЭФФЕКТ ХЕДЕРА ПРИ СКРОЛЛЕ ---
  const header = document.querySelector('.header');
  if (header) {
      window.addEventListener('scroll', () => {
          if (window.scrollY > 50) {
              header.style.padding = '12px 0';
              header.style.background = 'rgba(15, 23, 42, 0.95)';
          } else {
              header.style.padding = '20px 0';
              header.style.background = 'rgba(15, 23, 42, 0.8)';
          }
      });
  }
});