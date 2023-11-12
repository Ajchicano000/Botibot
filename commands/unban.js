var alice = {
 command: "unban",
 type: "prefix",
 author: "leiamnash",
 restrict: "admin",
 cooldown: 1
}

async function react({ alice, api, axios, bot, cache, database, event, font, fs, language, log, message, path, react, scraper, wrapper }) {
try {
 if (react.type == "leiamnashA") {
 const leiamA = (await bot.getThreadInfo(react.leiam)).threadName;
 await database.removeBanGroup(react.leiam);
 return bot.chat(await font(`█░█ █▄░█ █▄▄ ▄▀█ █▄░█\n█▄█ █░▀█ █▄█ █▀█ █░▀█\nsuccess\n\nthis group ${leiamA} is now removed on  ban list and it can now have the bot access ${react.leiam}`), event.threadID, react.author);
 }
if (react.type == "leiamnashB") {
 const leiamA = (await bot.getUserInfo(react.leiam))[react.leiam].name;
 await database.removeBanUser(react.leiam);
 return bot.chat(await font(`█░█ █▄░█ █▄▄ ▄▀█ █▄░█\n█▄█ █░▀█ █▄█ █▀█ █░▀█\nsuccess\n\nthis user ${leiamA} is now removed on ban list and it can now have the bot access ${react.leiam}`), event.threadID, react.author);
 }
} catch (error) {
 log.error(`[ ${this.alice.command} ] » ${error}`);
  return bot.chat(`[ ${this.alice.command} ] » ${language.error}`, event.threadID, event.messageID);
 }
}

async function command({ alice, api, axios, bot, cache, chat, database, event, font, fs, language, log, message, path, scraper, wrapper }) {
try {
  if (!chat) return message(await font(`please add your options\n\nhow to use?\n${alice.prefix}${this.alice.command} (group/user) [TID/UID]\n\nexample:\n${alice.prefix}${this.alice.command} group 123456789\n${alice.prefix}${this.alice.command} user 123456789`), "🗨️");
if (chat.toLowerCase().startsWith("group")) {
  const leiam = await database.banGroupData();
  const leiamA = (chat.split(" "))[1];
  const leiamB = (await bot.getThreadInfo(leiamA)).threadName;
  if (isNaN(leiamA)) return message(await font(`please enter a valid facebook group tid, to get the group tid use ⟨ ${alice.prefix}tid ⟩`), "🆔");
  if (!leiam.includes(leiamA)) return message(await font(`this group ${leiamB} is currently not available in ban list`), "💮");
  return bot.chat(await font(`you're currently removing this group on ban list, please double check the info\n\ngroup: ${leiamB}\ntid: ${leiamA}\n\nplease react to this message to continue`), event.threadID, (err, info) => {
    global.react.push({
    command: this.alice.command,
    messageID: info.messageID,
    author: event.messageID,
    type: "leiamnashA",
    leiam: leiamA
   });
 }, event.messageID);
}
if (chat.toLowerCase().startsWith("user")) {
  const leiam = await database.banUserData();
  const leiamA = (chat.split(" "))[1];
  const leiamB = (await bot.getUserInfo(leiamA))[leiamA].name;
  if (isNaN(leiamA)) return message(await font(`please enter a valid facebook uid, to get the user uid use ⟨ ${alice.prefix}uid ⟩`), "🆔");
  if (!leiam.includes(leiamA)) return message(await font(`this user ${leiamB} is currently not available in ban list`), "💮");
  return bot.chat(await font(`you're currently removing this user from ban list, please double check the info\n\nname: ${leiamB}\nuid: ${leiamA}\n\nplease react to this message to continue`), event.threadID, (err, info) => {
    global.react.push({
    command: this.alice.command,
    messageID: info.messageID,
    author: event.messageID,
    type: "leiamnashB",
    leiam: leiamA
   });
 }, event.messageID);
}
return message(await font(`please add your options\n\nhow to use?\n${alice.prefix}${this.alice.command} (group/user) [TID/UID]\n\nexample:\n${alice.prefix}${this.alice.command} group 123456789\n${alice.prefix}${this.alice.command} user 123456789`), "🗨️");
 } catch (error) {
 log.error(`[ ${this.alice.command} ] » ${error}`);
 return bot.chat(`[ ${this.alice.command} ] » ${language.error}`, event.threadID, event.messageID);
 }
}

module["exports"] = {
  alice,
  command,
  react
}