import fetch from "node-fetch";

async function cc(msg) {
    let response;
    if (msg.raw_message.length < 1) {
        return msg.bot.say(msg.sid, "干嘛！", msg.type, msg.uid, true);
    }
    const msgs = msg.raw_message.replace("查词", "");

    const url = "https://wantwords.net/ChineseRD/?q=" + msgs + "&m=ZhZh";
    try {
        response = await fetch(url, {
            method: "get",
        });
    } catch (e) {
        msg.bot.say(msg.sid, "说什么呢！", msg.type, msg.uid, true);
    }
    global.bots.logger.debug(url);
    global.bots.logger.debug(response.status);
    if (200 === response.status) {
        const data = await response.json();

        var talk = "";
        var num = 1;
        for (let item in data) {
            // global.bots.logger.debug(data[item]);
            // global.bots.logger.debug(Object.prototype.toString.call( data[item]));
            // const json = eval("(" + data[item] + ")");
            const json = data[item];
            global.bots.logger.debug(json);
            const zi = json["w"];
            const yin = json["p"];

            global.bots.logger.debug(json["d"]);
            talk += "[词]:" + zi;
            if (json["d"] !== null && json["d"] !== undefined) {
                const yi = json["d"]
                    .replace(/<br>/g, "")
                    .replace(/<\/strong>}/g, ":")
                    .replace(/\{<strong>/g, "");
                talk += " [意]:" + yi;
            }
            num++;
            if (num > 9) {
                break;
            }
            talk += "\n";
        }
        return msg.bot.say(msg.sid, `${talk}`, msg.type, msg.uid, true, "\n");
    }

    msg.bot.say(msg.sid, "说什么呢！", msg.type, msg.uid, true);
}

export { cc };
