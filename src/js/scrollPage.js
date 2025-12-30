// скрол
window.addEventListener('scroll', () => {
  let scrollDistance = window.scrollY;

  // Отримуємо всі пункти меню лише один раз
  const navItems = document.querySelectorAll('.nav li');

  document.querySelectorAll('.scroll').forEach((el, i) => {
    if (
      el.offsetTop - document.querySelector('.nav').clientHeight <=
      scrollDistance
    ) {
      // 1. Знімаємо 'active' з усіх посилань
      document.querySelectorAll('.nav a').forEach(link => {
        link.classList.remove('active');
      });

      // 2. ДОДАЄМО ПЕРЕВІРКУ: перевіряємо, чи існує відповідний пункт меню
      const targetNavItem = navItems[i];

      if (targetNavItem) {
        // Якщо елемент існує, продовжуємо
        targetNavItem.querySelector('a').classList.add('active');
      }
    }
  });
});
