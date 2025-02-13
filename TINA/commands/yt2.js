const fs = require("fs");
const path = require("path");
const axios = require("axios");
const yts = require("yt-search");

module.exports.config = {
  name: "yt2",
  hasPermission: 0,
  version: "1.0.0",
  description: "Download YouTube videos (under 25MB) or provide link",
  credits: "Nazrul",
  cooldowns: 10,
  commandCategory: "Utility"
};

module.exports.run = async function ({ api, event, args }) {
  if (!args[0]) {
    return api.sendMessage(`❌  দয়া করে একটি ভিডিও গানের নাম লিখুন`, event.threadID);
  }

  try {
    const query = args.join(" ");
    const findingMessage = await api.sendMessage(`🔍 | "${query}"\n\n⏳ডাউনলোড হচ্ছে দয়া করে ১ মিনিট অপেক্ষা করুন...`, event.threadID);

    const searchResults = await yts(query);
    const firstResult = searchResults.videos[0];

    if (!firstResult) {
      await api.sendMessage(`❌ | "${query}" এর জন্য কোনও ফলাফল পাওয়া যায় নি।`, event.threadID);
      return;
    }

    const { title, url } = firstResult;
    await api.editMessage(`⏳ | "${title}" \nডাউনলোড হচ্ছে দয়া করে ১ মিনিট অপেক্ষা করুন`, findingMessage.messageID);

    const apiUrl = `https://mr-prince-malhotra-ytdl.vercel.app/video?url=${encodeURIComponent(url)}`;
    const response = await axios.get(apiUrl);
    const responseData = response.data;

    if (!responseData.result || !responseData.result.url) {
      await api.sendMessage(`❌ | "${title}" কোন ভিডিও পাওয়া জায়নি`, event.threadID);
      return;
    }

    const downloadUrl = responseData.result.url;
    const filePath = path.resolve(__dirname, "cache", `${Date.now()}-${title}.mp4`);

    const videoResponse = await axios.get(downloadUrl, {
      responseType: "stream",
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    const fileStream = fs.createWriteStream(filePath);
    videoResponse.data.pipe(fileStream);

    fileStream.on("finish", async () => {
      const stats = fs.statSync(filePath);
      const fileSizeInMB = stats.size / (1024 * 1024);

      if (fileSizeInMB > 25) {
        await api.sendMessage(`❌ | "${title}" আকার ${fileSizeInMB.toFixed(2)}MB\n এই ফাইল পাঠানো জাবে না। \nলিংকে ডুকে ডাউনলোড করুন\n📥 ডাউনলোড লিঙ্ক: ${downloadUrl}`, event.threadID);
        fs.unlinkSync(filePath);
        return;
      }

      await api.sendMessage({
        body: `Your Video Download is Completed\n"${title}"`,
        attachment: fs.createReadStream(filePath)
      }, event.threadID);

      fs.unlinkSync(filePath);
      api.unsendMessage(findingMessage.messageID);
    });

    videoResponse.data.on("error", async (error) => {
      console.error(error);
      await api.sendMessage(`❌ | Video is being downloaded: ${error.message}`, event.threadID);
      fs.unlinkSync(filePath);
    });

  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    await api.sendMessage(`❌ | There was a problem in getting video: ${error.response ? error.response.data : error.message}`, event.threadID);
  }
};
