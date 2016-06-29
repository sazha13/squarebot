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

    Providers.findOne({ chatID: chatId }, function(err, exmpl1) {
      if (err) return console.error(err);
      // console.dir(exmpl1);
      if (exmpl1 == null)
      {
        AddRecordInDb(msg.from.username,chatId);
        bot.sendMessage(chatId, msg.from.username, { caption: "I'm a bot!" });
      }
    });


});


var mongoose = require('mongoose');

var db = mongoose.connection;
var AddRecordInDb = function(username, userchatID)
{

  var item = new Providers({
    name: username
    , chatID: userchatID
  });
  item.save();
};
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

var OnTimer1 = function()
{
  Providers.find(function(err, exmpl1) {
    if (err) return console.error(err);
    // console.dir(exmpl1);
    for (var i = 0; i<exmpl1.length; i++)
    {
      bot.sendMessage(exmpl1[i].chatID, (exmpl1[i].name == null)?"NULL1":exmpl1[i].name, { caption: "I'm a bot!" });
      console.log("record %d send to cahtid %d username %s",i,exmpl1[i].chatID,exmpl1[i].name);
    };

  });
};
setInterval(OnTimer1,10*1000);
mongoose.connect(process.env.MONGO_URI);
