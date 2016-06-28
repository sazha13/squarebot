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

    var answer = "Необходимо вводить числа(лучше положительные). Андрей, тестировщик плохой из тебя. Отрицательные не вводил. ";
    if (num < 0)
        answer = "Введите положительное число ";
    if (num >= 0)
        answer = Math.sqrt(num).toString();

    // bot.sendMessage(chatId, answer, { caption: "I'm a bot!" });
    bot1.sendMessage(chatId, answer, { caption: "I'm a bot!" });
    bot.sendMessage(chatId, answer, { caption: "I'm a bot!" });

    Providers.find({ name: 'Alex' }, function(err, exmpl1) {
      if (err) return console.error(err);
      // console.dir(exmpl1);
      bot.sendMessage(chatId, msg.from.username, { caption: "I'm a bot!" });
    });


});


var mongoose = require('mongoose');

var db = mongoose.connection;

var providersSchema = new mongoose.Schema({
    name: { type: String }
    , chatID: Number
  });
var Providers = mongoose.model('Providers', providersSchema);

db.on('error', console.error);
db.once('open', function() {
  console.log("connection DB ok");
  // Здесь создаём схемы и модели.


    // Компиляция модели Providers с помощью ProvidersSchema в качестве структуры.
    // Mongoose также создаёт для этих документов коллекцию под названием Providers.

    // var exmpl = new Providers({
    //   name: 'Alex'
    //   , chatID: '123444567'
    // });

    // exmpl.save(function(err, exmpl) {
    //   if (err) return console.error(err);
    //   // console.dir(exmpl);
    // });
    // console.log("HERE");
    // Providers.find({ name: 'Alex' }, function(err, exmpl1) {
    //   if (err) return console.error(err);
    //   console.dir(exmpl1);
    // });
});

mongoose.connect('mongodb://localhost:27017/test');
