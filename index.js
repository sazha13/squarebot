var TelegramBot = require('node-telegram-bot-api');
var bot = new TelegramBot(process.env.TOKEN, { polling: true });


bot.on('message', function (msg) {
    var chatId = msg.chat.id;
    console.log(msg);
    var num = Number(msg.text);
    
    var answer = "Need number ";
    if (num < 0)
        answer = "Need positive number ";
    if (num >= 0)
        answer = Math.sqrt(num).toString();

    bot.sendMessage(chatId, answer, { caption: "I'm a bot!" });
});