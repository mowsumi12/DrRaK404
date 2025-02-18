module.exports.config = {
    name: "uuuss",
    version: "1.0.1",
    hasPermssion: 1,
    credits: "nazrul",
    description: "reply [unsend]",
    commandCategory: "system",
    usePrefix: true,
    usages: "unsend admin only",
    cooldowns: 0
};

module.exports.languages = {
     "en": {
        "returnCant": "Can't unsend message from other user.",
        "missingReply": "Reply to the message you want to unsend."
    }
};

module.exports.handleReaction = async function({ api, event, handleReaction }) {
	try {
		if (event.userID != handleReaction.author) return;
		const { threadID, messageID } = event;
    const { messageID, reaction } = event;
    if (reaction === '🤬') {
        api.unsendMessage(handleReaction.messageID);
    }
};

module.exports.run = function({ api, event, getText }) {
    if (event.messageReply.senderID != api.getCurrentUserID()) {
        return api.sendMessage(getText("returnCant"), event.threadID, event.messageID);
    }
    if (event.type != "message_reply") {
        return api.sendMessage(getText("missingReply"), event.threadID, event.messageID);
    }
    return api.unsendMessage(event.messageReply.messageID);
};

global.client.handleReaction.push({
			name: "reaction",
			messageID: info.messageID,
			author: event.senderID,
				});
			}, messageID);
		}
