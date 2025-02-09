const axios = require('axios');

function convert(time) {

const date = new Date(`${time}`);

const year = date.getFullYear();

const month = date.getMonth() + 1;

const day = date.getDate();

const hours = date.getHours();

const minutes = date.getMinutes();

const seconds = date.getSeconds();

return `${day < 10 ? "0" + day : day}/${month < 10 ? "0" + month : month}/${year}||${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;

}

module.exports.config = {

name: "stalk2",

credits: "cliff",

version: "1.5",

cooldown: 5,

hasPermssion: 0,

usages: "[reply/uid/@mention]",

hasPrefix: false,

description: "Get info using uid/mention/reply to a message",

commandCategory: "𝚗𝚘 𝚙𝚛𝚎𝚏𝚒𝚡",

};

module.exports.run = async function({ api, event, args }) {

const id = (args.join().indexOf('@') !== -1) ? Object.keys(event.mentions)[0] 

: event.type === "message_reply" ? event.messageReply.senderID 

: args[0] || event.senderID;

try {

api.getUserInfo(id, async (err, userInfo) => {

if (err) {

return api.sendMessage(`Error: ${err.message}`, event.threadID, event.messageID);

}

const user = userInfo[id];

const avatar = `https://api-canvass.vercel.app/profile?uid=${id}`;

const messageBody = `•——𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗧𝗜𝗢𝗡——•

Name: ${user.name}

First name: ${user.firstName}

Creation Date: ${user.createdTime ? convert(user.createdTime) : "N/A"}

Profile link: ${user.profileUrl}

Gender: ${user.gender}

Relationship Status: ${user.relationshipStatus || "N/A"}

Birthday: ${user.isBirthday ? convert(new Date()) : "N/A"}

Follower(s): ${user.followersCount || "N/A"}

Verified: ${user.isVerified ? "Yes" : "No"}

Hometown: ${user.hometown || "N/A"}

Locale: ${user.locale || "N/A"}

•——𝗘𝗡𝗗——•`;

const response = await axios.get(avatar, { responseType: 'stream' });

const attachment = response.data;

api.sendMessage({ body: messageBody, attachment }, event.threadID, event.messageID);

});

} catch (error) {

api.sendMessage(`Error: ${error.message}`, event.threadID, event.messageID);

}

};
