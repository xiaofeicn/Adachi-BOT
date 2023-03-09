import fetch from "node-fetch";
import {createRequire} from 'module';

const require = createRequire(import.meta.url);

async function speech(raw_message,uid) {


    var date = new Date();
    var time = date.getFullYear() + '-' + formatNumber(date.getMonth() + 1) + '-' + formatNumber(date.getDate());

    var path=/raw_log/+time
    var file =path+"/"+uid.toString()+".log"
    console.log(file)
    var pass=true
    let response;
    let fs = require('fs');

    if (fs.existsSync(path)) {
        pass=true
    }else{
        pass=true
        fs.mkdirSync(path, { recursive: true })
    }

    if (fs.existsSync(file)) {
        pass=true
    }else{
        pass=true
        fs.writeFileSync(file, "","UTF8")
    }


    const botCommands = ['绑定', '米游社', 'uid', '深渊', '上期深渊', '我的', '游戏内uid', '信息', '抽卡', '卡池', '定轨', '查看定轨', '取消定轨', '圣遗物', '强化',
        '副本', '评分', '周日', '周一', '周二', '周三', '周四', '周五', '周六', '今日素材', '周本 ', '天赋 ', '武器 ', '点歌 ', '音乐源', '吃什么',
        '喝什么 ', '求签 ', 'roll', '带话', '管理命令 ', 'help']
    var save = true;
    for (const botCommand in botCommands) {
        if (raw_message.toString().startsWith(botCommand) || raw_message.toString().startsWith("#") || raw_message.toString().startsWith("#")) {
            save = false
            break;
        }

    }
    if (save) {

        fs.appendFile(file, raw_message.toString()+"\n", 'utf8', function (err) {
            if (err) {
                throw new Error("追加数据失败")
            } else {

                console.log("追加数据成功")
            }
        });

    }

}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}


export {speech};
