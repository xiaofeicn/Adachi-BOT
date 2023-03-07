import fetch from "node-fetch";

async function speech(msg) {
    let response;
    let fs = require('fs');
    if (msg.raw_message.length < 1) {
        return msg.bot.say(msg.sid, "干嘛！", msg.type, msg.uid, true);
    }
    const botCommands =['绑定','米游社','uid','深渊','上期深渊','我的','游戏内uid','信息','抽卡','卡池','定轨','查看定轨','取消定轨','圣遗物','强化',
        '副本','评分','周日','周一','周二','周三','周四','周五','周六','今日素材','周本 ','天赋 ','武器 ','点歌 ','音乐源','吃什么',
        '喝什么 ','求签 ','roll','带话','管理命令 ','help']
    var say=true;
    for (const botCommand in botCommands){
        if (msg.raw_message.toString().startsWith(botCommand) && msg.raw_message.toString().startsWith("#")){
            break;
        }else {
            fs.appendFile("/raw_log.log", msg.raw_message.toString(), 'utf8', function (err) {
                if (err) {
                    throw new Error("追加数据失败")
                } else {

                    console.log("追加数据成功")
                }
            });


        }
    }

}

export { speech };
