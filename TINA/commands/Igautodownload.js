module.exports = {
	config: {
		name: "autodownload",
		version: "1.0.0",
		hasPermssion: 2,
		credits: "Priyansh Rajput",
		description: "Auto download videos from Facebook and Instagram links.",
		commandCategory: "Media",
		usages: "[fb/insta video link]",
		cooldowns: 5,
		dependencies: {
			"axios": ""
		}
	},
	run: async function({ api, event, args }) {
		const axios = require('axios');
		const url = args[0];

		if (!url || !url.startsWith('https://')) {
			return api.sendMessage("Please provide a valid Facebook or Instagram video URL.", event.threadID, event.messageID);
		}

		try {
			const response = await axios.get(`https://priyansh-ai.onrender.com/autodown?url=${encodeURIComponent(url)}`);
			const videoData = response.data.data[0];

			if (!response.data.success || !videoData) {
				return api.sendMessage("Failed to fetch video details. Please try again with a valid video URL.", event.threadID, event.messageID);
			}

			const { title, like_count, videoUrl } = videoData;

			await axios({
				method: 'get',
				url: videoUrl,
				responseType: 'stream'
			}).then(videoStream => {
				api.sendMessage({
					body: `Title: ${title}\nLikes: ${like_count}`,
					attachment: videoStream.data
				}, event.threadID, event.messageID);
			}).catch(error => {
				api.sendMessage("Error downloading video.", event.threadID, event.messageID);
			});

		} catch (error) {
			api.sendMessage("An error occurred while processing your request. Please try again later.", event.threadID, event.messageID);
		}
	}
};