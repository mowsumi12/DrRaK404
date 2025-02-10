const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "rniji",
    version: "1.1",
    credits: "Mahi--",
    hasPermssion: 0,
    usePrefix: true,
    prefix: true,
    description: "Generate an anime-style image based on a prompt using the RNiji API.",
    commandCategory: "ai",
    usages: "[prompt]",
    cooldowns: 20,
  },
  run: async({ api, event, args }) => {
    const prompt = args.join(" ");

    if (!prompt) {
      return api.sendMessage("❌ | You must provide a prompt to generate an anime-style image.", event.threadID, event.messageID);
    }

    const startTime = Date.now(); // Start measuring time
    const waitMessage = await api.sendMessage("🖼 | Creating your image, please wait a moment...", event.threadID);

    try {
      const apiUrl = `https://hopeless-nijiz-8nkg.onrender.com/api/rniji?prompt=${encodeURIComponent(prompt)}`;

      // Call the API to get the image URL
      const response = await axios.get(apiUrl);
      const imageUrl = response.data.imageUrl;

      // If imageUrl is not found
      if (!imageUrl) {
        return api.sendMessage("❌ | Unable to generate the image at the moment. Please try again later.", event.threadID, event.messageID);
      }

      // Download the image from the URL
      const imageResponse = await axios.get(imageUrl, { responseType: "arraybuffer" });

      const cacheFolderPath = path.join(__dirname, "cache");
      if (!fs.existsSync(cacheFolderPath)) {
        fs.mkdirSync(cacheFolderPath);
      }

      const imagePath = path.join(cacheFolderPath, `${Date.now()}_generated_image.png`);
      fs.writeFileSync(imagePath, Buffer.from(imageResponse.data, "binary"));

      const stream = fs.createReadStream(imagePath);

      // Calculate generation time
      const generationTime = ((Date.now() - startTime) / 1000).toFixed(2); // Time in seconds

      // Send the generated image with a message
      api.unsendMessage(waitMessage.messageID); // Remove "please wait" message
      api.sendMessage(
        {
          body: `✅ | Your anime-style image is ready!\n\n🕒 Time taken: ${generationTime} seconds.`,
          attachment: stream,
        },
        event.threadID,
        event.messageID
      );

    } catch (error) {
      console.error("Error:", error);
      api.sendMessage("❌ | An error occurred while generating the image. Please try again later.", event.threadID, event.messageID);
    }
  },
};
