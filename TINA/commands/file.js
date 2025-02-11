const fs = require('fs');
 
module.exports.config = {
 name: "file",
 version: "2.4.3",
 hasPermssion: 2,
 credits: "Nazrul",
 usePrefix: false,
 description: "send script file",
 commandCategory: "nazrul",
 usages: "{p}file name of your command {filename}.j",
 cooldowns: 5
};
 
module.exports.run = async function ({ message, args, api, event }) {
 const permission = ["100000350435589"];
 if (!permission.includes(event.senderID)) {
	return api.sendMessage("You don't have permission to use this command. 🐤", event.threadID, event.messageID);
 }
 
 const fileName = args[0];
 if (!fileName) {
	return api.sendMessage("Please provide a file name.", event.threadID, event.messageID);
 }
 
 const filePath = __dirname + `/${fileName}.js`;
 if (!fs.existsSync(filePath)) {
	return api.sendMessage(`File not found: ${fileName}.js`, event.threadID, event.messageID);
 }
 
 const fileContent = fs.readFileSync(filePath, 'utf8');
 api.sendMessage({ body: fileContent }, event.threadID);
};
