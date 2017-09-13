  var router = require('express').Router();
  // 引用 wechat 库，详细请查看 https://github.com/node-webot/wechat
  var wechat = require('wechat');
  var config = {
    token: 'weixinDemo',
    appid: 'iiq3L2bwUYsKbIx83btJkfCg-gzGzoHsz',
    encodingAESKey: 'REjDyAZGbHUa83YM9hKQ8jo5PO95f0mOyF9nV3FIbpF'
  };

  var WechatAPI = require('wechat-api');
  var api = new WechatAPI('iiq3L2bwUYsKbIx83btJkfCg-gzGzoHsz',
    '9m6bSDBb1iHYrlKcLlg2wdUp');

  router.use('/', wechat(config.token).text(function(message, req, res, next) {
    // message为文本内容
    // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
    // CreateTime: '1359125035',
    // MsgType: 'text',
    // Content: 'http',
    // MsgId: '5837397576500011341' }

    /*
    var keyArray = ['你好', '约吗'];
    var content = message.Content;
    var keyIndex = keyArray.indexOf(content);
    switch (keyIndex) {
      case 0:
        {
          res.reply({
            type: "text",
            content: '您好，大家好才是真的好！'
          });

        }
        break;
      case 1:
        {
          res.reply({
            type: "text",
            content: '不约，不约，叔叔我们不约！'
          });

        }
        break;
      default:
        res.reply({
          type: "text",
          content: '服务器挂掉了，你的要求暂时无法满足……'
        });
        break;
    }
    */


    var content = message.Content;

    var request = require("request")


      if(content.indexOf('http') === 0){
        arr=content.split('/')
        arr2 = arr[arr.length-1]
        content = arr2
      }


    var url = "http://api.kanzhihu.com/searchuser/"+ content

  request({
    url: url,
    json: true
  }, function (error, response, body) {

    if (!error && response.statusCode === 200) {
        //console.log(body) // Print the json response
        //console.log(body.users)
          //content: body.users[1].hash
          //console.log()
          if (body.error ==='') {
            //console.log('no user')
            //console.log(body)
            //console.log(body)
            var url = "http://api.kanzhihu.com/userdetail2/"+body.users[0].hash
            request({
              url: url,
              json: true
            }, function (error, response, body) {

              if (!error && response.statusCode === 200) {
            res.reply({
              type: "text",

       // content: "对不起，租的服务器太差，出了问题，已经在查了，正常了会发通知的。" 



       content: body.name + "，您的关注者数量：" + body.detail.follower 
       + "，最近7日关注者数量增加：" + body.detail.followeriw 
            //+ "，最近1日赞同数增加：" + body.detail.agreei
            + "，回答与专栏总赞同数：" + body.detail.agree
            + "，最近7日总赞同数增加：" + body.detail.agreeiw
            //+ "，最近1日粉丝数增加：" + body.detail.followeri          
            + "。在知乎数千万网友中，关注者数量排行：" + body.star.followerrank
            + "，回答与专栏总数目排行：" + body.star.answerrank
            + "，回答与专栏总赞同数排行：" + body.star.agreerank
            + "，最高赞同数的回答与专栏：" + body.topanswers[0].title
            + "，其赞同数：" + body.topanswers[0].agree
            + "。数据每日更新，觉得好用的话，推荐公众号给朋友们吧~~~"



          });


      }
    })


          }
          else{

            var url = "http://api.kanzhihu.com/userdetail2/"+content
            request({
              url: url,
              json: true
            }, function (error, response, body) {

              if (!error && response.statusCode === 200) {

                if (body.error === ''){
            res.reply({
              type: "text",

       // content: "对不起，租的服务器太差，出了问题，已经在查了，正常了会发通知的。" 



       content: body.name + "，您的关注者数量：" + body.detail.follower 
       + "，最近7日关注者数量增加：" + body.detail.followeriw 
            //+ "，最近1日赞同数增加：" + body.detail.agreei
            + "，回答与专栏总赞同数：" + body.detail.agree
            + "，最近7日总赞同数增加：" + body.detail.agreeiw
            //+ "，最近1日粉丝数增加：" + body.detail.followeri          
            + "。在知乎数千万网友中，关注者数量排行：" + body.star.followerrank
            + "，回答与专栏总数目排行：" + body.star.answerrank
            + "，回答与专栏总赞同数排行：" + body.star.agreerank
            + "，最高赞同数的回答与专栏：" + body.topanswers[0].title
            + "，其赞同数：" + body.topanswers[0].agree
            + "。数据每日更新，觉得好用的话，推荐公众号给朋友们吧~~~"


          });
            }else{
                            res.reply({
                type: "text",

  //content: "对不起，租的服务器太差，出了问题，已经在查了，正常了会发通知的。" 

                content: "经查询，无结果。可能原因：1、粉丝排名在10万以外，即粉丝数量小于60(具体数字会浮动)；"                
                + "2、输入错误，请打开浏览器或者手机App再次检查ID，因为知乎用户昵称可以重名，所以需要根据ID查找。" 

            });
            }


      }
    })




          }

      }

  })



  }).image(function(message, req, res, next) {
    // message为图片内容
    // { ToUserName: 'gh_d3e07d51b513',
    // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
    // CreateTime: '1359124971',
    // MsgType: 'image',
    // PicUrl: 'http://mmsns.qpic.cn/mmsns/bfc815ygvIWcaaZlEXJV7NzhmA3Y2fc4eBOxLjpPI60Q1Q6ibYicwg/0',
    // MediaId: 'media_id',
    // MsgId: '5837397301622104395' }}).voice(function(message, req, res, next) {
    // TODO
  }).voice(function(message, req, res, next) {
    // message为音频内容
    // { ToUserName: 'gh_d3e07d51b513',
    // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
    // CreateTime: '1359125022',
    // MsgType: 'voice',
    // MediaId: 'OMYnpghh8fRfzHL8obuboDN9rmLig4s0xdpoNT6a5BoFZWufbE6srbCKc_bxduzS',
    // Format: 'amr',
    // MsgId: '5837397520665436492' }
  }).video(function(message, req, res, next) {
    // message为视频内容
    // { ToUserName: 'gh_d3e07d51b513',
    // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
    // CreateTime: '1359125022',
    // MsgType: 'video',
    // MediaId: 'OMYnpghh8fRfzHL8obuboDN9rmLig4s0xdpoNT6a5BoFZWufbE6srbCKc_bxduzS',
    // ThumbMediaId: 'media_id',
    // MsgId: '5837397520665436492' }
    // TODO
  }).shortvideo(function(message, req, res, next) {
    // message为短视频内容
    // { ToUserName: 'gh_d3e07d51b513',
    // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
    // CreateTime: '1359125022',
    // MsgType: 'shortvideo',
    // MediaId: 'OMYnpghh8fRfzHL8obuboDN9rmLig4s0xdpoNT6a5BoFZWufbE6srbCKc_bxduzS',
    // ThumbMediaId: 'media_id',
    // MsgId: '5837397520665436492' }
    // TODO
  }).location(function(message, req, res, next) {
    // message为链接内容
    // { ToUserName: 'gh_d3e07d51b513',
    // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
    // CreateTime: '1359125022',
    // MsgType: 'link',
    // Title: '公众平台官网链接',
    // Description: '公众平台官网链接',
    // Url: 'http://1024.com/',
    // MsgId: '5837397520665436492' }
    // TODO
  }).link(function(message, req, res, next) {
    // message为链接内容
    // { ToUserName: 'gh_d3e07d51b513',
    // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
    // CreateTime: '1359125022',
    // MsgType: 'link',
    // Title: '公众平台官网链接',
    // Description: '公众平台官网链接',
    // Url: 'http://1024.com/',
    // MsgId: '5837397520665436492' }
    // TODO
  }).event(function(message, req, res, next) {
    // message为事件内容
    // { ToUserName: 'gh_d3e07d51b513',
    // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
    // CreateTime: '1359125022',
    // MsgType: 'event',
    // Event: 'LOCATION',
    // Latitude: '23.137466',
    // Longitude: '113.352425',
    // Precision: '119.385040',
    // MsgId: '5837397520665436492' }
    // TODO
  }).device_text(function(message, req, res, next) {
    // message为设备文本消息内容
    // { ToUserName: 'gh_d3e07d51b513',
    // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
    // CreateTime: '1359125022',
    // MsgType: 'device_text',
    // DeviceType: 'gh_d3e07d51b513'
    // DeviceID: 'dev1234abcd',
    // Content: 'd2hvc3lvdXJkYWRkeQ==',
    // SessionID: '9394',
    // MsgId: '5837397520665436492',
    // OpenID: 'oPKu7jgOibOA-De4u8J2RuNKpZRw' }
    // TODO
  }).device_event(function(message, req, res, next) {
    // message为设备事件内容
    // { ToUserName: 'gh_d3e07d51b513',
    // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
    // CreateTime: '1359125022',
    // MsgType: 'device_event',
    // Event: 'bind'
    // DeviceType: 'gh_d3e07d51b513'
    // DeviceID: 'dev1234abcd',
    // OpType : 0, //Event为subscribe_status/unsubscribe_status时存在
    // Content: 'd2hvc3lvdXJkYWRkeQ==', //Event不为subscribe_status/unsubscribe_status时存在
    // SessionID: '9394',
    // MsgId: '5837397520665436492',
    // OpenID: 'oPKu7jgOibOA-De4u8J2RuNKpZRw' }
    // TODO
  }).middlewarify());

  module.exports = router;
