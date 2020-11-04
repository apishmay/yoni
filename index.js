let linebot = require('linebot');
var express = require('express');

// 初始化 line bot 需要的資訊，在 Heroku 上的設定的 Config Vars，可參考 Step2
let bot = linebot({
    channelId: process.env.LINE_CHANNEL_ID,
    channelSecret: process.env.LINE_CHANNEL_SECRET,
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN
});

_japan();

// 當有人傳送訊息給 Bot 時
// bot.on('message', function (event) {
//     // 回覆訊息給使用者 (一問一答所以是回覆不是推送)
//     event.reply(`你說了 ${event.message.text}`);
// });
// bot.on('message', function(event) {
//     if (event.message.type = 'text') {
//       var msg = event.message.text;
//     }
//       event.reply(msg).then(function(data) {
//         // success 
//         console.log(msg);
//       })
//       .catch(function(error) {
//         // error 
//         console.log('error');
//       });
//     }
//   });
    bot.on('message', function(event) {
      if (event.message.type == 'text') {
        var msg = event.message.text;
        var replyMsg = '';
        if (msg == '貼圖') {
          replyMsg = "努力中";  
        }

        else if(msg == '高明'){
          replyMsg = "https://www.km101.com.tw/" ;
        }
        
        else if(msg == '請問日幣現在多少'){
          replyMsg = _japan() ;
        }

        else{
          replyMsg = msg ;
        }
        event.reply(replyMsg).then(function(data) {
          console.log(replyMsg);
        }).catch(function(error) {
          console.log('error');
        });
      }
    });
    function _japan() {
      clearTimeout(timer2);
      request({
        url: "http://rate.bot.com.tw/Pages/Static/UIP003.zh-TW.htm",
        method: "GET"
      }, function(error, response, body) {
        if (error || !body) {
          return;
        } else {
          var $ = cheerio.load(body);
          var target = $(".rate-content-sight.text-right.print_hide");
          console.log(target[15].children[0].data);
          jp = target[15].children[0].data;
          if (jp < 0.28) {
            bot.push('使用者 ID', '現在日幣 ' + jp + '，該買啦！');
          }
          timer2 = setInterval(_japan, 120000);
        }
      });
    }
// Bot 所監聽的 webhook 路徑與 port，heroku 會動態存取 port 所以不能用固定的 port，沒有的話用預設的 port 5000
bot.listen('/', process.env.PORT || 5000, function () {
    console.log('機器人上線啦！');
});