let linebot = require('linebot');
var express = require('express');
var getJSON = require('get-json');

// 初始化 line bot 需要的資訊，在 Heroku 上的設定的 Config Vars，可參考 Step2
let bot = linebot({
    channelId: process.env.LINE_CHANNEL_ID,
    channelSecret: process.env.LINE_CHANNEL_SECRET,
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN
});

var timer;
var pm = [];
_getJSON();

_bot();
const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

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


    // bot.on('message', function(event) {
    //   if (event.message.type == 'text') {
    //     var msg = event.message.text;
    //     var replyMsg = '';
    //     if (msg == '貼圖') {
    //       replyMsg = "努力中";  
    //     }

    //     else if(msg == '高明'){
    //       replyMsg = "https://www.km101.com.tw/" ;
    //     }

    //     else{
    //       replyMsg = msg ;
    //     }
    //     event.reply(replyMsg).then(function(data) {
    //       console.log(replyMsg);
    //     }).catch(function(error) {
    //       console.log('error');
    //     });
    //   }
    // });
    
    function _bot() {
      bot.on('message', function(event) {
        if (event.message.type == 'text') {
          var msg = event.message.text;
          var replyMsg = '';
          if (msg.indexOf('PM2.5') != -1) {
            pm.forEach(function(e, i) {
              if (msg.indexOf(e[0]) != -1) {
                replyMsg = e[0] + '的 PM2.5 數值為 ' + e[1];
              }
            });
            if (replyMsg == '') {
              replyMsg = '請輸入正確的地點';
            }
          }
          if (replyMsg == '') {
            replyMsg = '不知道「'+msg+'」是什麼意思 :p';
          }
    
          event.reply(replyMsg).then(function(data) {
            console.log(replyMsg);
          }).catch(function(error) {
            console.log('error');
          });
        }
      });
    
    }
    
    function _getJSON() {
      clearTimeout(timer);
      getJSON('http://opendata2.epa.gov.tw/AQX.json', function(error, response) {
        response.forEach(function(e, i) {
          pm[i] = [];
          pm[i][0] = e.SiteName;
          pm[i][1] = e['PM2.5'] * 1;
          pm[i][2] = e.PM10 * 1;
        });
      });
      timer = setInterval(_getJSON, 1800000); //每半小時抓取一次新資料
    }


// Bot 所監聽的 webhook 路徑與 port，heroku 會動態存取 port 所以不能用固定的 port，沒有的話用預設的 port 5000
bot.listen('/', process.env.PORT || 5000, function () {
    console.log('機器人上線啦！');
});