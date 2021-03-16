module.exports = function({ api, __GLOBAL, client, utils }) {
	const logger = require("../../utils/log.js");
	return async function({ event }) {
		let commands = client.commandRegister.get("event") || [];
		for (const command of commands) {
			const commandModule = client.commands.get(command);
			try {
				commandModule.event({ event, api, __GLOBAL, client, utils });
			}
			catch (error) {
				logger(error + " at event command: " + commandModule.config.name , "error");
			}
		}
	}
}