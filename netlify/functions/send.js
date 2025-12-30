const https = require('https');

exports.handler = async event => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Метод не дозволений' }),
    };
  }

  try {
    const data = JSON.parse(event.body);
    const TOKEN = process.env.TELEGRAM_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    const message =
      `<b>БЕСПЛАТНАЯ КОНСУЛЬТАЦИЯ</b>\n` +
      `<b>Имя:</b> ${data.name || 'Не вказано'}\n` +
      `<b>Телефон:</b> ${data.tel || 'Не вказано'}\n` +
      `<b>Комментарий:</b> ${data.comment || '-'}`;

    const postData = JSON.stringify({
      chat_id: CHAT_ID,
      parse_mode: 'html',
      text: message,
    });

    return new Promise(resolve => {
      const options = {
        hostname: 'api.telegram.org',
        port: 443,
        path: `/bot${TOKEN}/sendMessage`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData),
        },
      };

      const req = https.request(options, res => {
        resolve({
          statusCode: 200,
          body: JSON.stringify({ status: 'success' }),
        });
      });

      req.on('error', e => {
        resolve({
          statusCode: 500,
          body: JSON.stringify({ error: e.message }),
        });
      });

      req.write(postData);
      req.end();
    });
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Помилка сервера' }),
    };
  }
};
