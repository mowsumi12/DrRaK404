module.exports.config = {
  name: "bank",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Judas",
  description: "economy",
  commandCategory: "Finance",
  usages: "register",
  cooldowns: 3
};
const laisuat = 0.005
const timeIM = 3600
async function makeimg(i){
  console.log(i)
  const x = `${i}`
   const fs = require('fs');
const axios = require('axios')
 if(!fs.existsSync(__dirname+'/cache/SplineSans-Medium.ttf')) { 
      let getfont = (await axios.get(`https://drive.google.com/u/0/uc?id=102B8O3_0vTn_zla13wzSzMa-vdTZOCmp&export=download`, { responseType: "arraybuffer" })).data;
       fs.writeFileSync(__dirname+"/cache/SplineSans-Medium.ttf", Buffer.from(getfont, "utf-8"));
    };
    if(!fs.existsSync(__dirname+'/cache/SplineSans.ttf')) { 
      let getfont2 = (await axios.get(`https://drive.google.com/u/0/uc?id=1--V7DANKLsUx57zg8nLD4b5aiPfHcmwD&export=download`, { responseType: "arraybuffer" })).data;
       fs.writeFileSync(__dirname+"/cache/SplineSans.ttf", Buffer.from(getfont2, "utf-8"));
    };
    const { loadImage, createCanvas, registerFont } = require("canvas");
    let path = __dirname + "/cache/atmaraxy.png";
    let bg = (await axios.get(`https://i.imgur.com/j6oeXJs.png`, {responseType: "arraybuffer" })).data;
    fs.writeFileSync(path, Buffer.from(bg, "utf-8"));
    let bgBase = await loadImage(path);
    let canvas = createCanvas(bgBase.width, bgBase.height);
    let ctx = canvas.getContext("2d");
    const Canvas = global.nodemodule["canvas"];
    ctx.drawImage(bgBase, 0, 0, canvas.width, canvas.height);
    registerFont(__dirname+`/cache/SplineSans-Medium.ttf`, {
        family: "SplineSans-Medium"
    });
    registerFont(__dirname+`/cache/SplineSans.ttf`, {
        family: "SplineSans"
    });
    ctx.font = "50px SplineSans-Medium";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    ctx.fillText('' + `${i}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '$', 530, 359);
    const imageBuffer = canvas.toBuffer();
    fs.writeFileSync(path, imageBuffer);
    return path;
}
function replace(i) {
  var u = `${i}`
  var x = u.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return x
}
module.exports.onLoad = function({ }) {
  const { existsSync, writeFileSync } = require('fs-extra')
  const { join } = require('path');
  const pathData = join(__dirname, "cache", "bankmirai.json");
  if (!existsSync(pathData)) return writeFileSync(pathData, "[]", "utf-8");
}
module.exports.run = async ({ event, api, Currencies, args, Users, permssion }) => {
  const axios = require('axios')
  var msg = [];
  var date = new Date();
  var duocsui = date.getDay();
  const moment = require("moment-timezone");
  var timeNow = moment.tz("Asia/Dhaka").format("DD:MM:YYYY");
  const stk = String(Math.floor(Math.random() * (900000000)) + 1000000)
  const { threadID, messageID, senderID, mentions } = event;
  const { readFileSync, writeFileSync, unlinkSync, createReadStream } = require("fs-extra");
  var lozz = (await Users.getData(senderID)).name
  const { join } = require("path")
  const pathData = join(__dirname, "cache", "bankmirai.json");
  const user = (args.slice(1, args.length)).join(" ");
  var dataJson = JSON.parse(readFileSync(pathData, "utf-8"));
  var userData = dataJson.find(item => item.senderID == senderID) || { senderID: senderID, name: lozz, money: 500000, stk: stk, time: timeNow, status: true, vay: { solan: 0, davay: false, sotien: 0, noxau: false, time: "" } };
  const moneyUser = (await Currencies.getData(senderID)).money
  if (duocsui == "9") {
    return api.sendMessage(`[ WARNING ] ➜ CN is not working now`, threadID, messageID)
  }
  if (args[0] == '-r' || args[0] == 'register') {
    if (!dataJson.some(i => i.senderID == senderID)) {
      dataJson.push(userData);
      writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
      return api.sendMessage(`[ SUCCESS ] ➜ You have successfully registered, your account number is ${stk}, we give you 500000$ and then you have to deposit at least 500000$ to get profit💰\n[ ${timeNow} ]`, threadID, messageID)
    }
    else return api.sendMessage(`[ WARNING ] ➜ You already have an account on the system SAKIBIN Bank🏦`, threadID, messageID)
  }
  if (args[0] == "loan") {
    if (userData.vay.solan == 5 || userData.status == false) { return api.sendMessage(`[ WARNING ] ➜ Did you ${userData.vay.solan == 5 ? "reached the number of loans of 5": "having bad debt"} reached the number of loans of 5": "having bad debt so cannot continue to borrow`, threadID, messageID) }
    if (!dataJson.find(i => i.senderID == senderID)) { return api.sendMessage(`[ WARNING ] ➜ You do not have an account on the system yet SAKIBIN Bank🏦\n[ ${timeNow} ]`, threadID) }
    if (isNaN(args[1]) || !args[1]) { return api.sendMessage(`[ WARNING ] ➜ The amount you entered is incorrect`, threadID) }
    if (args[1] < 500000 || args[1] > 50000000000000) { return api.sendMessage(`[ WARNING ] ➜ The amount you enter ${args[1] < 500000 ? "Less" : "Bigger"} our loan request level`, threadID) }
    else {
      return api.sendMessage("[ BANKING ] ➜ Please React to This Message to Verify the Real Information", threadID,
        async (err, info) => {
          global.client.handleReaction.push({
            thread: event.threadID,
            type: "vay",
            name: this.config.name,
            money: args[1],
            author: senderID,
            messageID: info.messageID
          });
        })
    }
  }
  if (args[0] == "pay") {
    if (!dataJson.find(i => i.senderID == senderID)) { return api.sendMessage(`[ WARNING ] ➜ You do not have an account on the system yet SAKIBIN Bank🏦\n[ ${timeNow} ]`, threadID) }
    if (isNaN(args[1]) || !args[1]) { return api.sendMessage(`[ WARNING ] ➜ The amount you entered is incorrect`, threadID) }
    const tra_v = parseInt(userData.vay.sotien) - parseInt(args[1]);
    if (tra_v < -1) { return api.sendMessage(`[ WARNING ] ➜ The amount you pay for your loan is greater than the amount you borrowed before, please pay in full ${replace(parseInt(userData.vay.sotien))}$`, threadID, messageID) }
    if (userData.vay.sotien == 0) { return api.sendMessage('[ WARNING ] ➜ Debt paid off', threadID) }
    else {
      return api.sendMessage("[ BANKING ] ➜ Please React This Message To Verify Information..", threadID,
        async (err, info) => {
          global.client.handleReaction.push({
            thread: event.threadID,
            type: "tra",
            name: this.config.name,
            money: args[1],
            author: senderID,
            messageID: info.messageID
          });
        })
    }
  }
  if (args[0] == 'all' || args[0] == '-a') {
    for (let stt in dataJson) {
      var title = dataJson[stt].stk;
      var name = dataJson[stt].name;
      var sender = dataJson[stt].senderID;
      msg += `[👤]➜ Owner: ${name}\n[❗]➜ SenderID: ${sender}\n[🖥️]➜ STK: ${title}\n•━━━━━━━━━━━━━━━━•\n`
    }
    return api.sendMessage({ body: msg }, event.threadID);
  }
  if (args[0] == "send" || args[0] == "send") {
    var money = args[1];
    if (!money || money < 50 || isNaN(money)) return api.sendMessage("[ BANKING ] ➜ Please Enter Correct Amount", threadID, messageID);
    if (moneyUser < money) return api.sendMessage(`[ BANKING ] ➜ Balance Not Enough For Trading`, threadID, messageID);
    if (!userData) { return api.sendMessage('[ BANKING ] ➜ You Have Not Registered for Banking', threadID, messageID) }
    else {
      return api.sendMessage("[ BANKING ] ➜ (Please React This Message To Verify Information)", threadID,
        async (err, info) => {
          global.client.handleReaction.push({
            thread: event.threadID,
            type: "trade",
            name: this.config.name,
            send: money,
            author: senderID,
            messageID: info.messageID
          });
        })
    }
  }
  if (args[0] == "cashout") {
    var money = args[1];
    if (!money || money < 500000 || isNaN(money)) return api.sendMessage("[ BANKING ] ➜ Please Enter Correct Amount", threadID, messageID);
    if (userData.money < money) return api.sendMessage(`[ BANKING ] ➜ Balance Not Enough For Trading`, threadID, messageID);
    if (!userData) { return api.sendMessage('[ BANKING ] ➜ You Have Not Registered for Banking', threadID, messageID) }
    else {
      return api.sendMessage("[ BANKING ] ➜ Please React This Message To Verify Information", threadID,
        async (err, info) => {
          global.client.handleReaction.push({
            thread: event.threadID,
            type: "rut",
            name: this.config.name,
            send: money,
            author: senderID,
            messageID: info.messageID
          });
        })
    }
  }
  if (args[0] == "top") {
    var i = 0
    var option = parseInt(1000);
    var data, msg = "";
    dataJson.sort((a, b) => {
      if (a.money > b.money) return -1;
      if (a.money < b.money) return 1;
    })
    if (dataJson.length < option) option = dataJson.length;
    for (const dataUser of dataJson) {
      if (i == option) break;
      msg += `[⚜️]➜ Top ${i + 1}\n[⚜️]➜ Name: ${dataUser.name}\n[⚜️]➜ UID: ${dataUser.senderID}\n[⚜️]➜ STK: ${dataUser.stk}\n[⚜️]➜ With ${replace(dataUser.money)}$\n===================\n`;
      i += 1;
    }
    return api.sendMessage(msg, threadID)
  }
  if (args[0] == 'pay' || args == '-p') {
    var userStk = dataJson.find(i => i.stk == args[1])
    if (!userStk) return api.sendMessage('[ WARNING ] ➜ Not Found', threadID, messageID)
    else {
      return api.sendMessage('[ BANKING ] ➜ Please Reply Message To Enter The Amount You Want To Transfer', threadID, (error, info) => {
        return global.client.handleReply.push({
          name: this.config.name,
          type: "pay",
          messageID: info.messageID,
          author: senderID,
          stk: userStk.stk
        })
        messageID
      })
    }
  }
  if (args[0] == 'check' || args[0] == 'coins') {
    if (Object.keys(event.mentions).length == 1) {
      var mention = (Object.keys(mentions))[0];
      var users = dataJson.find(item => item.senderID == mention)
      if (!dataJson.find(i => i.senderID == mention)) return api.sendMessage('[ WARNING ] ➜ Unregistered users use banking, banking register to register🏦', threadID, messageID)
      return api.sendMessage(`[ WARNING ] ➜ You are not the owner of this account, so if you want to see this account information, please ask ${users.name} This React Account Goes`, threadID, (error, info) => {
        return global.client.handleReaction.push({
          name: this.config.name,
          type: "check",
          messageID: info.messageID,
          author: mention,
        })
        messageID
      })
    }
    else {
      if (!dataJson.find(i => i.senderID == senderID)) { return api.sendMessage('[ WARNING ] ➜ Unregistered users use banking, banking register to register🏦', threadID, messageID) }
      var userMoney = userData.money;
      var userStk = userData.stk;
      return makeimg(userMoney).then(path => api.sendMessage({ body: `[ SUCCESS ] ➜ The amount you are depositing with SAKIBIN Bank.\n💵➜ Balance: ${replace(userMoney)}$\n🕔➜ Join Date: ${userData.time}\n💹➜ Accuracy ${userData.status}\n👤➜ Account number To be: ${userStk}\n🤑➜ Interest: +${laisuat * 100}% in ${12000 / 60} minute`, attachment: createReadStream(path) }, threadID, () => unlinkSync(path), messageID));
    }
  } else {
    const t = (await axios.get(`https://i.imgur.com/9Juopfv.png`, {
      responseType: "stream"
    })).data;

    return api.sendMessage({
      body: "🏦⚜️𝗦𝗔𝗞𝗜𝗕𝗜𝗡 𝗕𝗔𝗡𝗞⚜️🏦\n•━━━━━━━━━━━━━━━━•\n®️➜ register - register sakibin bank\n💹➜ trade - deposit money Sakibin bank to make profit\n🏧➜ cashout - withdraw money from Sakibin bank\n🧾➜ check - show information banking\n💸➜ pay - transfer money to others\n💰➜ loan - take loan (not recommended)\n💵➜ repay - repay loan",
      attachment: t
    }, threadID)
  }
}
module.exports.handleReply = async function({ api, event, args, handleReply, Threads, Users, Currencies }) {
  if (handleReply.author !== event.senderID) return
  const { readFileSync, writeFileSync, unlinkSync, createReadStream } = require("fs-extra");
  const { join } = require("path")
  const pathData = join(__dirname, "cache", "bankmirai.json");
  var dataJson = JSON.parse(readFileSync(pathData, "utf-8"));
  var userData = dataJson.find(item => item.senderID == event.senderID)
  if (!event.body || event.body < 50 || isNaN(event.body)) return api.sendMessage("[ BANKING ] ➜ Please Enter Correct Amount", event.threadID);
  if (userData.money < event.body) return api.sendMessage(`[ BANKING ] ➜ Balance Not Enough For Trading`, event.threadID);
  return api.sendMessage(`[ BANKING ] ➜ You have entered the amount to transfer ${replace(event.body)}, (React this message to complete the transaction)`, event.threadID, (err, info) => {
    if (err) console.log(err)
    return global.client.handleReaction.push({
      name: this.config.name,
      type: "pay",
      money: event.body,
      author: handleReply.author,
      stk: handleReply.stk,
      messageID: info.messageID
    })
    messageID
  })
}
module.exports.handleReaction = async function({ event, api, handleReaction, Currencies, Users }) {
  try {
    api.unsendMessage(handleReaction.messageID);
    const moment = require("moment-timezone");
    var timeNow = moment.tz("Asia/Dhaka").format("HH:mm - DD:MM:YYYY");
    var timeva = moment.tz("Asia/Dhaka").format("DD:MM:YYYY");
    if (handleReaction.author != event.userID) return
   const { readFileSync, writeFileSync, unlinkSync, createReadStream } = require("fs-extra");
    const { join } = require("path")
    const pathData = join(__dirname, "cache", "bankmirai.json");
    var dataJson = JSON.parse(readFileSync(pathData, "utf-8"));
    var userData = dataJson.find(item => item.senderID == handleReaction.author)
    var userMoney = userData.money;
    var userstk = userData.stk;
    var money = userData.money;
    if (handleReaction.type == "check") {
      return makeimg(userMoney).then(path => api.sendMessage({ body: `[ SUCCESS ] ➜ Amount of money ${userData.name} sending SAKIBIN Bank To be: ${replace(userMoney)}$\n➜ Join Date: ${userData.time}\n➜ Accuracy ${userData.status}\n➜ The account number is: ${userstk}\n➜ Interest: +${laisuat * 100}% in ${12000 / 60} minute`, attachment: createReadStream(path) }, event.threadID, () => unlinkSync(path), event.messageID));
    }
    if (handleReaction.type == "trade") {
      userData.money = parseInt(userMoney) + parseInt(handleReaction.send);
      writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
      await Currencies.decreaseMoney(event.userID, parseInt(handleReaction.send))
      return api.sendMessage(`[ SUCCESS ] ➜ You have sent ${replace(handleReaction.send)}$ enter SAKIBIN Bank\n💷 Interest: +${laisuat * 100}% in ${timeIM / 60} minute\n[ ${timeNow} ]`, event.threadID)
    }
    if (handleReaction.type == "rut") {
      userData.money = parseInt(userMoney) - parseInt(handleReaction.send);
      writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
      await Currencies.increaseMoney(event.userID, parseInt(handleReaction.send))
      return api.sendMessage(`[ SUCCESS ] ➜ You have withdrawn ${replace(handleReaction.send)}$ from Sakibin Bank\n[ ${timeNow} ]`, event.threadID)
    }
    if (handleReaction.type == "pay") {
      var userStk = dataJson.find(i => i.stk == handleReaction.stk)
      var lmao = userStk.money;
      userStk.money = parseInt(lmao) + parseInt(handleReaction.money);
      userData.money = parseInt(money) - parseInt(handleReaction.money)
      writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
      return api.sendMessage(`[ SUCCESS ] ➜ Money transfer successful ${replace(parseInt(handleReaction.money))}$, The remaining balance is ${replace(parseInt(money) - parseInt(handleReaction.money))}$\n\n•━━━━━━━━━━━━━━━━━•\n[ ${timeNow} ]`, event.threadID)
    }
    if (handleReaction.type == "loan") {
      if (userData.vay.solan == 0) {
        userData.vay.davay = true
        userData.vay.time = `${timeva}`
        userData.vay.sotien = parseInt(userData.vay.sotien) + parseInt(handleReaction.money)
        userData.vay.solan = parseInt(userData.vay.solan) + 1
      } else {
        userData.vay.sotien = parseInt(userData.vay.sotien) + parseInt(handleReaction.money)
        userData.vay.solan = parseInt(userData.vay.solan) + 1
      }
      writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
      await Currencies.increaseMoney(event.userID, parseInt(handleReaction.money))
      return api.sendMessage(`[ SUCCESS ] ➜ Take Loan money successfully ${replace(parseInt(userData.vay.sotien))}$`, event.threadID)
    }
    if (handleReaction.type == "repay") {
      if ((parseInt(userData.vay.sotien) - parseInt(handleReaction.money)) == 0) {
        userData.vay.davay = false
        userData.vay.time = ""
        userData.vay.sotien = parseInt(userData.vay.sotien) - parseInt(handleReaction.money)
        userData.vay.solan = 0
      } else {
        userData.vay.sotien = parseInt(userData.vay.sotien) - parseInt(handleReaction.money)
      }
      writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
      await Currencies.decreaseMoney(event.userID, parseInt(handleReaction.money))
      return api.sendMessage(`[ SUCCESS ] ➜ Successfully repay the loan ${replace(parseInt(userData.vay.sotien))}$`, event.threadID)
    }
  } catch (e) {
    console.log(e)
  }
}
/////////////////////////////////////////////////////////
async function nhantien() {
  const { readdirSync, readFileSync, writeFileSync, existsSync, copySync } = require('fs-extra');
  const { join, resolve } = require('path');
  const pathData = join(__dirname, "cache", "bankmirai.json");
  const user = require('./cache/bankmirai.json');
  if (user[0] == undefined) return
  while (true) {
    for (let id of user) {
      var userData = user.find(i => i.senderID == id.senderID);
      var money = userData.money;
      userData.money = (parseInt(money + money * laisuat))
      writeFileSync(pathData, JSON.stringify(user, null, 2));
    }
    console.log("DANG XU LI BANKING");
    await new Promise(resolve => setTimeout(resolve, `${timeIM}` * 1000))
  }
}
async function vay() {
  const { readdirSync, readFileSync, writeFileSync, existsSync, copySync } = require('fs-extra');
  const { join, resolve } = require('path');
  const pathData = join(__dirname, "cache", "bankmirai.json");
  const user = require('./cache/bankmirai.json');
  if (user[0] == undefined) return
  while (true) {
    for (let id of user) {
      var userData = user.find(i => i.senderID == id.senderID);
      if (userData.vay.davay == true) {
        var money = userData.vay.sotien;
        userData.vay.sotien = (parseInt(money + money * 0.05))
        writeFileSync(pathData, JSON.stringify(user, null, 2));
      }
    }
    console.log("loan processing");
    await new Promise(resolve => setTimeout(resolve, `${timeIM}` * 1000))
  }
}
async function checkvay() {
  const { readdirSync, readFileSync, writeFileSync, existsSync, copySync } = require('fs-extra');
  const { join, resolve } = require('path');
  const pathData = join(__dirname, "cache", "bankmirai.json");
  const user = require('./cache/bankmirai.json');
  if (user[0] == undefined) return
  while (true) {
    for (let id of user) {
      var userData = user.find(i => i.senderID == id.senderID);
      const gb = userData.vay.time.split("/")
      const t = Date.parse(new Date()) - Date.parse(`${gb[1]} ${gb[0]}, ${gb[2]} 00:00:00`)
      const days = Math.floor(t / (1000 * 60 * 60 * 24));
      if (userData.vay.davay == true) {
        if (days == 7) {
          userData.status = false
          userData.vay.noxau = true
          userData.vay.sotien = (parseInt(money + money * 0.05))
          writeFileSync(pathData, JSON.stringify(user, null, 2));
        }
      }
    }
    console.log("xữ lý vay");
    await new Promise(resolve => setTimeout(resolve, `${timeIM}` * 1000))
  }
}
nhantien();
vay();
checkvay();