const formText1 = document.querySelector('.form__text2');
const formBlock1 = document.querySelector('.form_answer2');
const formElement = document.getElementById('form2');

if (formElement) {
  formElement.addEventListener('submit', async function (e) {
    e.preventDefault(); // Зупиняємо перезавантаження

    // 1. Збираємо дані
    const formData = {
      name: this.name.value,
      tel: this.tel.value,
      comment: this.comment.value,
    };

    try {
      // 2. Відправляємо на функцію Netlify
      const response = await fetch('/.netlify/functions/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // 3. Очищаємо поля
        this.reset();

        // 4. Ваша анімація успіху
        if (formText1) formText1.classList.add('form__none2');
        if (formBlock1) formBlock1.classList.add('form_answer-block2');

        console.log('Успішно відправлено!');
      } else {
        throw new Error('Помилка сервера');
      }
    } catch (error) {
      console.error('Помилка відправки:', error);
      alert('Помилка! Спробуйте ще раз або перевірте налаштування бота.');
    } finally {
      console.log('Запит завершено');
    }
  });
}
