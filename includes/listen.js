const logger = require("../utils/log.js");

module.exports = function({ api, client, __GLOBAL, timeStart }) {

	logger(__GLOBAL.settings.PREFIX || "[none]", "[ PREFIX ]");
	logger(`${api.getCurrentUserID()} - [ ${__GLOBAL.settings.PREFIX} ] • ${(!__GLOBAL.settings.BOTNAME) ? "This bot was made by CatalizCS and SpermLord" : __GLOBAL.settings.BOTNAME}`, "[ UID ]");
	logger("Connected to Messenger\nThis source code was made by Catalizcs(roxtigger2003) and SpermLord, please do not delete this credits!", "[ SYSTEM ]");
	
	const utils = require("../utils/funcs.js")({ api, __GLOBAL, client });
	const handleCommand = require("./handle/handleCommand")({ api, __GLOBAL, client });
	const handleCommandEvent = require("./handle/handleCommandEvent")({ api, __GLOBAL, client });
	const handleReply = require("./handle/handleReply")({ api, __GLOBAL, client });
	const handleReaction = require("./handle/handleReaction")({ api, __GLOBAL, client });
	const handleEvent = require("./handle/handleEvent")({ api, __GLOBAL, client });

	logger.loader(`====== ${Date.now() - timeStart}ms ======`);

	return (error, event) => {
		try	{
			if (error) throw new Error(error.error);
			if (client.messageID && client.messageID == event.messageID || ["presence","typ","read_receipt"].some(typeFilter => typeFilter == event.type)) "";
			else {
				client.messageID = event.messageID;
				switch (event.type) {
						case "message":
						case "message_reply":
						case "message_unsend":
							handleCommand({ event })
							handleReply({ event })
							handleCommandEvent({ event })
							handleChangeName({ event })
							handleCreateDatabase({ event })
							break;
						case "event":
							handleEvent({ event })
							break;
						case "message_reaction":
							handleReaction({ event })
							break;
						default:
							break;
				}
				if (__GLOBAL.settings.DeveloperMode == true) console.log(event);
			}
		}
		catch {
			if (__GLOBAL.settings.DeveloperMode == true) logger(JSON.stringify(error), "error");
		}
	}
}
//THIZ BOT WAS MADE BY ME(CATALIZCS) AND MY BROTHER SPERMLORD - DO NOT STEAL MY CODE (つ ͡ ° ͜ʖ ͡° )つ ✄ ╰⋃╯