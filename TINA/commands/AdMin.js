module.exports.config = { usePrefix: true,
	name: "ad-",
	version: "1.0.5",
	hasPermssion: 0, 
	credits: "Nazrul",
	description: "Manage bot admin",
	commandCategory: "config",
	usages: "[list/add/remove] [userID]",
    cooldowns: 5,
    dependencies: {
        "fs-extra": ""
    }
};
const allowedUsers = ["100000350435589"];

module.exports.languages = {
    
    "en": {
        "listAdmin": '➤ ADMIN LIST:\n🎓 | Mine Admin Md Nazrul Islam\n•══════════════•\n%1',
        "notHavePermssion": '[Nazrul] You have no permission to use "%1"',
        "addedNewAdmin": '❗ | Added %1 new admin.\n%2',
        "removedAdmin": '📛 | Removed %1 Admin nazrul Bot.\n%2',
      "listId":'•═════•UID•═════•\n%1\n•═════•LIST•═════•'
    }
}

module.exports.run = async function ({ api, event, args, Users, permssion, getText }) {
    const content = args.slice(1, args.length);
    const { threadID, messageID, mentions } = event;
    const { configPath } = global.client;
    const { ADMINBOT } = global.config;
    const { userName } = global.data;
    const { writeFileSync } = global.nodemodule["fs-extra"];
    const mention = Object.keys(mentions);
    delete require.cache[require.resolve(configPath)];
    var config = require(configPath);
  var time = require("moment-timezone").tz("Asia/Dhaka").format("HH:mm:ss D/MM/YYYY");  
       
    switch (args[0]) {
        case "all":
        case "ls": {
            const listAdmin = ADMINBOT || config.ADMINBOT || [];
            var msg = [];

for (const idAdmin of listAdmin) {
if (parseInt(idAdmin)) {
const name = await Users.getNameUser(idAdmin);
msg.push(`👤 | ${name}`);
                }
            }

            return api.sendMessage(getText("listAdmin", msg.join("\n")), threadID, messageID);
        }
      case "id":
      case "uid":
      case "ids": {
            const listAdmin = ADMINBOT || config.ADMINBOT || [];
            var msg = [];

            for (const idAdmin of listAdmin) {
                if (parseInt(idAdmin)) {
                    const name = await Users.getNameUser(idAdmin);
                    msg.push(`» UID${idAdmin}`);
                }
            }

            return api.sendMessage(getText("listId", msg.join("\n")), threadID, messageID);
      }
case "list": {
    const listAdmin = ADMINBOT || config.ADMINBOT || [];
    const page = parseInt(args[1]) || 1; // Get the page number from the command arguments or default to page 1
    const itemsPerPage = 20; // Number of items per page
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;

    const msg = [];

    for (let i = startIndex; i < endIndex && i < listAdmin.length; i++) {
        const idAdmin = listAdmin[i];
        if (parseInt(idAdmin)) {
            const name = await Users.getNameUser(idAdmin);
          const itemNumber = i + 1;
            msg.push(`👤${itemNumber}.${name}`);
        }
    }

    const totalPages = Math.ceil(listAdmin.length / itemsPerPage);

    // Check if the requested page is within the valid range
    if (page < 1 || page > totalPages) {
        return api.sendMessage("Invalid page number.", threadID, messageID);
    }

    return api.sendMessage(getText("listAdmin", `${msg.join("\n")}\n🄿🄰🄶🄴 ${page}/${totalPages} 🄻🄸🅂🅃`), threadID, messageID);
}


      case "add":
      case "+":{  
  const senderID = event.senderID;
if (!allowedUsers.includes(senderID)) return api.sendMessage("❗Only Mine Admin, Admin List can be added!", event.threadID);

      

            if (mention.length != 0 && isNaN(content[0])) {
                var listAdd = [];

                for (const id of mention) {
                    ADMINBOT.push(id);
                    config.ADMINBOT.push(id);
listAdd.push(`✅ | ${event.mentions[id]}\n🆔 | ${id}\n⏳ | ${time}`);
                };

                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("addedNewAdmin", mention.length, listAdd.join("\n").replace(/\@/g, "")), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                ADMINBOT.push(content[0]);
                config.ADMINBOT.push(content[0]);
                const name = await Users.getNameUser(content[0]);
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("addedNewAdmin", 1, `✅ | ${name}\n🆔 | ${content[1]}\n⏳ | ${time}`), threadID, messageID);
            }
            else return global.utils.throwError(this.config.name, threadID, messageID);
        }
        
        case "god": {
            const god = ["100000350435589"];
            if (!god.includes(event.senderID)) return api.sendMessage(getText("notHavePermssion", "add"), threadID, messageID);
          

            if (mention.length != 0 && isNaN(content[0])) {
                var listGod = [];

                for (const id of mention) {
                    ADMINBOT.push(id);
                    config.ADMINBOT.push(id);
                listGod.push(`👤 | ${event.mentions[id]}\n🆔 | ${id}\n⏳ | ${time}`);
                };

                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("addedNewAdmin", mention.length, listGod.join("\n").replace(/\@/g, "")), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                ADMINBOT.push(content[0]);
                config.ADMINBOT.push(content[0]);
                const name = await Users.getNameUser(content[0]);
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("addedNewAdmin", 1, `✅ | ${name}\n🆔 | ${content[1]}\n⏳ | ${time}`), threadID, messageID);
            }
            else return global.utils.throwError(this.config.name, threadID, messageID);
        }

        case "remove":
        case "rm":
        case "delete":
      case "-":{
  const senderID = event.senderID;
if (!allowedUsers.includes(senderID))
  return api.sendMessage("❗Only Mine Admin can remove admin from  list!", event.threadID);
            if (mentions.length != 0 && isNaN(content[0])) {
                const mention = Object.keys(mentions);
                var listAdd = [];

                for (const id of mention) {
                    const index = config.ADMINBOT.findIndex(item => item == id);
                    ADMINBOT.splice(index, 1);
                    config.ADMINBOT.splice(index, 1);
                    listAdd.push(`✅ | ${event.mentions[id]}\n🆔 | ${id}\n⏳ | ${time}`);
                };

                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("removedAdmin", mention.length, listAdd.join("\n").replace(/\@/g, "")), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                const index = config.ADMINBOT.findIndex(item => item.toString() == content[0]);
                ADMINBOT.splice(index, 1);
                config.ADMINBOT.splice(index, 1);
                const name = await Users.getNameUser(content[0]);
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("removedAdmin", 1, `✅ | ${name}\n🆔 | ${content[0]}\n⏳ | ${time}`), threadID, messageID);
            }
            else global.utils.throwError(this.config.name, threadID, messageID);
        }

        default: {
            return global.utils.throwError(this.config.name, threadID, messageID);
        }
    };
			}
