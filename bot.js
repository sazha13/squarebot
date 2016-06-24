var TelegramBot = require('node-telegram-bot-api');
var bot = new TelegramBot(process.env.TOKEN, { polling: true });
var bot1 = new TelegramBot(process.env.TOKEN1, { polling: true });
//bot.setWebHook('https://telegrambot13.heroku.com/' + bot.token);
//bot1.setWebHook('https://telegrambot13.heroku.com/' + bot.token);

//var chat1 = new chat();
bot.on('message', function (msg) {
    var chatId = msg.chat.id;
    console.log(msg);
    var num = Number(msg.text);

    var answer = "Необходимо вводить числа ";
    if (num < 0)
        answer = "Введите положительное число ";
    if (num >= 0)
        answer = Math.sqrt(num).toString();

    bot.sendMessage(chatId, answer, { caption: "I'm a bot!" });
    // bot1.sendMessage(chatId, answer, { caption: "I'm a bot!" });

});
