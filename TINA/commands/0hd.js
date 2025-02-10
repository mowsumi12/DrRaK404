const axios = require('axios');
const fs = require('fs-extra');

module.exports.config = {
  name: "hd",
  version: "4.4",
  hasPermssion: 0,
  credits: "Hazeyy",
  description: "( 𝚄𝚙𝚜𝚌𝚊𝚕𝚎 )",
  commandCategory: "𝚗𝚘 𝚙𝚛𝚎𝚏𝚒𝚡",
  usages: "( 𝚂𝚌𝚊𝚕𝚒𝚗𝚐 𝙸𝚖𝚊𝚐𝚎𝚜 )",
  cooldowns: 2,
};

module.exports.handleEvent = async function ({ api, event }) {
  if (!(event.body.indexOf("hd") === 0 || event.body.indexOf("Upscale") === 0)) return;
  const args = event.body.split(/\s+/);
  args.shift();

  const pathie = __dirname + `/cache/zombie.jpg`;
  const { threadID, messageID } = event;

  const photoUrl = event.messageReply.attachments[0] ? event.messageReply.attachments[0].url : args.join(" ");

  if (!photoUrl) {
    api.sendMessage("Please reply a photo!", threadID, messageID);
    return;
  }

  api.sendMessage("🕟 | Upgrading image quality..", threadID, async () => {
    try {
      const response = await axios.get(`https://hiroshi-api.onrender.com/image/upscale?url=${encodeURIComponent(photoUrl)}`);
      const processedImageURL = response.data; // the returned URL directly
      const img = (await axios.get(processedImageURL, { responseType: "arraybuffer" })).data;

      fs.writeFileSync(pathie, Buffer.from(img, 'binary'));

      api.sendMessage({
        body: "🔮 𝚄𝚙𝚜𝚌𝚊𝚕𝚎 𝚂𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢",
        attachment: fs.createReadStream(pathie)
      }, threadID, () => fs.unlinkSync(pathie), messageID);
    } catch (error) {
      api.sendMessage(`🚫 𝙴𝚛𝚛𝚘𝚛 𝚙𝚛𝚘𝚌𝚎𝚜𝚜𝚒𝚗𝚐 𝚒𝚖𝚊𝚐𝚎: ${error}`, threadID, messageID);
    }
  });
};

module.exports.run = async function ({ api, event }) {};
