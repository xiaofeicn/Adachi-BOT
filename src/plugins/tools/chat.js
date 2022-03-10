import fetch from "node-fetch";

async function chat(msg) {
    let response;
    if (msg.raw_message.length < 1) {
        return msg.bot.say(msg.sid, "干嘛！", msg.type, msg.uid, true);
    }
    const botCommands =global.config.botCommands.split(",")
    var say=true;
    for (const botCommand in botCommands){
        if (msg.raw_message.toString().startsWith(botCommand)){
            say=false;
            break;
        }
    }
    if (!say) {
        return false;
    }
    const url =
        "https://api.ownthink.com/bot?appid=f40e478ad5d244b3b286807ec5b46880" +
        "&userid=" +
        msg.uid +
        "&spoken=" +
        msg.raw_message;
    try {
        response = await fetch(url, {
            method: "get",
        });
    } catch (e) {
        msg.bot.say(msg.sid, "说什么呢！", msg.type, msg.uid, true);
    }

    if (200 === response.status) {
        const { data } = await response.json();
        const talk = data["info"]["text"].replaceAll("小思", "派蒙").replaceAll("思知", "提瓦特");
        return msg.bot.say(msg.sid, `${talk}`, msg.type, msg.uid, true, "\n");
    }

    msg.bot.say(msg.sid, "说什么呢！", msg.type, msg.uid, true);
}

export { chat };
