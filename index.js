let linebot = require('linebot');
// var express = require('express');

// 初始化 line bot 需要的資訊，在 Heroku 上的設定的 Config Vars，可參考 Step2
let bot = linebot({
    channelId: process.env.LINE_CHANNEL_ID,
    channelSecret: process.env.LINE_CHANNEL_SECRET,
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN
});

// 當有人傳送訊息給 Bot 時
// bot.on('message', function (event) {
//     // 回覆訊息給使用者 (一問一答所以是回覆不是推送)
//     event.reply(`${event.message.text}`);   
// });
bot.on('message', function(event) {
    if (event.message.type = 'text') {
      var msg = event.message.text;
    }
      event.reply(msg).then(function(data) {
        // success 
        // console.log(msg);
        // timetest();
      })
      .catch(function(error) {
        // error 
        console.log('error');
      });
      
    });

  
  setTimeout(function(){
    bot.push('Uc8ae0ad12f3c9af4821652761f8a4abc', [{
      type: 'text',
      text: '這是測試!'
    },
  ]);
    },5000);
  //   const line = require('@line/bot-sdk');

  //   const client = new line.Client({
  //     channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN
  //   });
    
  // client.getGroupMemberProfile('<groupId>', '<userId>')
  // .then((profile) => {
  //   console.log(profile.displayName);
  //   console.log(profile.userId);
  //   console.log(profile.pictureUrl);
  //   console.log(profile.statusMessage);
  // })
  // .catch((err) => {
  //   // error handling
  //   console.log('error');
  // });
  


    // function timetest(){
    //   setTimeout(function(){
    //   var userId = '@apishmay@gmail.com';
    //   var sendMsg = '測試';
    //   bot.push(userId,sendMsg);
    //   console.log('send: '+sendMsg);
    // },5000);
    // }

    // bot.on('message', function(event) {
    //   if (event.message.type == 'text') {
    //     var msg = event.message.text;
    //     var replyMsg = '';
    //     if (msg == '貼圖') {
    //       replyMsg = "努力中";  
    //     }

    //     else if(msg == '高明'){
    //       replyMsg = "https://www.km101.com.tw/"
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

// Bot 所監聽的 webhook 路徑與 port，heroku 會動態存取 port 所以不能用固定的 port，沒有的話用預設的 port 5000
bot.listen('/', process.env.PORT || 5000, function () {
    console.log('機器人上線啦！');
});