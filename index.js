const TelegramBot = require('node-telegram-bot-api');
const html2jade = require('html2jade');

const token = '';

const bot = new TelegramBot(token, {polling: true});

bot.on('message', function (msg) {
    let chatId = msg.chat.id;
    let regexp = msg.text.match(/\/\w+| ((.+|\n+)+)/g);
    let operator = regexp[0];
    if (operator == '/h') {
        html2jade.convertHtml(regexp[1], {}, (err, jade) => {
            if (!err) {
                bot.sendMessage(chatId, jade)
            }
            else {
                bot.sendMessage(chatId, 'Ошибка, что-то пошло не так')
            }
        });
    }
    else {
        bot.sendMessage(chatId, 'Отправьте /h <html>(где <html> - желаемый html код для преобразования)');
    }
});
