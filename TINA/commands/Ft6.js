const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports.config = {
    name: "ft6",
    description: "Generate image from fal ai flux pro",
    cooldown: 5,
    commandCategory: "𝚗𝚘 𝚙𝚛𝚎𝚏𝚒𝚡",
    hasPermssion: 0,
    hasPrefix: false,
    cooldowns: 5,
    credits: "nazrul", //api by samir
    usage: "{p}{n} ",
};

module.exports.run = async function ({ api, event, args }) {
    try {
        const { messageID } = event;
        const prompt = args.join(' ');

        if (!prompt) {
            return api.sendMessage('Please provide a prompt', event.threadID, messageID);
        }

        const cliff = await new Promise(resolve => { 
            api.sendMessage(`֎ 𝖦𝖾𝗇𝖾𝗋𝖺𝗍𝗂𝗇𝗀 ${prompt} 𝗂𝗆𝖺𝗀𝖾...`, event.threadID, (err, info1) => {
                resolve(info1);
            }, event.messageID);
        });

        const apiUrl = `https://priyansh-ai.onrender.com/imagine?prompt=${encodeURIComponent(prompt)}`;

        const h = await axios.get(apiUrl, { responseType: 'stream' });

        const message = {
            attachment: h.data,   
        };

        api.unsendMessage(cliff.messageID);

        api.sendMessage(message, event.threadID, event.messageID);
    } catch (error) {
        api.sendMessage(`An error occurred: ${error.message}`, event.threadID);
    }
};
