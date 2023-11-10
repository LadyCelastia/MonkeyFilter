import PogObject from "../PogData";
import {AQUA, BOLD, GOLD, GRAY, GREEN, ITALIC, RED, RESET, UNDERLINE, WHITE, YELLOW} from "./constants";

// Run on launch
if (!FileLib.exists("MonkeyFilter", "data")) new java.io.File("config/ChatTriggers/modules/MonkeyFilter/data").mkdir();
const configs = new PogObject("MonkeyFilter", {
    apiKey: "",
    minCata: 0,
    minClass: 0, // class level
    minLevel: 0, // skyblock level
    minSecrets: 0,
    minSecretsPerRun: 0,
    minCombat: 0, // combat skill level
    minMP: 0, // magical power
    minPB: null, // min personal best time
    needHype: false,
    needTerm: false,
    needDrag: "None", // None - Any pet. Any - edrag or gdrag. EDrag - edrag. GDrag - gdrag. Both - edrag AND gdrag
    needIceSpray: false,
    needLastBreath: false,
    needEffX: false,
    noDupe: false,
    kick: true
});
register("worldLoad", () => {
    if (configs.apiKey == "") {
        concatChat(`Your API key is currently not set! MonkeyFilter does not work without a valid API key.`);
        concatChat(`${RED}Use \"/mf api [Key]\" to set your API key!`);
    }
});

// Commands
register("command", (...args) => {
    const command = args === undefined ? undefined : args.join(" ").split(" ");
    switch (command[0].toLowerCase()) {
        case undefined:
            concatChat(`Unknown command! \"/mf help\" for a list of commands.`);
            break;
        case "settings": // display settings
            concatChat(`${GREEN}${BOLD}Settings Overview\n`);
            ChatLib.chat(`Your current API key is: ${YELLOW}` + configs.apiKey);
            ChatLib.chat(`Minimum cata level is currently set to ${YELLOW}` + configs.minCata);
            ChatLib.chat(`Minimum class level is currently set to ${YELLOW}` + configs.minClass);
            ChatLib.chat(`Minimum skyblock level is currently set to ${YELLOW}` + configs.minLevel);
            ChatLib.chat(`Minimum secrets is currently set to ${YELLOW}` + configs.minSecrets);
            ChatLib.chat(`Minimum secrets per run is currently set to ${YELLOW}` + configs.minSecretsPerRun);
            ChatLib.chat(`Minimum combat level is currently set to ${YELLOW}` + configs.minCombat);
            ChatLib.chat(`Minimum magical power is currently set to ${YELLOW}` + configs.minMP);
            ChatLib.chat(`Minimum personal best is currently set to ${YELLOW}` + (configs.minPB === null ? "" : configs.minPB) + ` seconds.`);
            ChatLib.chat(`Wither Impact required is currently ` + (configs.needHype === true ? `${GREEN}true` : `${RED}false`));
            ChatLib.chat(`Terminator required is currently ` + (configs.needTerm === true ? `${GREEN}true` : `${RED}false`));
            ChatLib.chat(`Ice Spray required is currently ` + (configs.needIceSpray === true ? `${GREEN}true` : `${RED}false`));
            ChatLib.chat(`Last Breath required is currently ` + (configs.needLastBreath === true ? `${GREEN}true` : `${RED}false`));
            ChatLib.chat(`Efficiency X required is currently ` + (configs.needEffX === true ? `${GREEN}true` : `${RED}false`));
            ChatLib.chat(`No dupe is currently ` + (configs.noDupe === true ? `${GREEN}true` : `${RED}false`));
            ChatLib.chat(`Dragon Pet required is currently ${YELLOW}` + configs.needDrag);
            ChatLib.chat(`Instant kick is currently ` + (configs.kick === true ? `${GREEN}true` : `${RED}false`));
            ChatLib.chat(`\n${BOLD}-----------------------\n`);
            break;
        case "help": // display commands
            break;
        case "api":
            if (command.length == 1) {
                concatChat(`Your current API key is: ${YELLOW}` + configs.apiKey);
            } else {
                configs.apiKey = command[1];
                configs.save();
                concatChat(`${GREEN}API key successfully set to ` + command[1]);
            }
            break;
        case "cata":
            if (command.length == 1) {
                concatChat(`Minimum cata level is currently set to ${YELLOW}` + configs.minCata);
            } else if (!isNaN(command[1]) && !isNaN(parseFloat(command[1]))) {
                const level = parseInt(command[1]);
                if (level <= 50 && level >= 0) {
                    configs.minCata = level;
                    configs.save();
                    concatChat(`${GREEN}Minimum cata level successfully set to ` + configs.minCata);
                } else {
                    concatChat(`${RED}Invalid value!`);
                }
            } else {
                concatChat(`${RED}Invalid minimum cata level!`);
            }
            break;
        case "class":
            if (command.length == 1) {
                concatChat(`Minimum class level is currently set to ${YELLOW}` + configs.minClass);
            } else if (!isNaN(command[1]) && !isNaN(parseFloat(command[1]))) {
                const level = parseInt(command[1]);
                if (level <= 50 && level >= 0) {
                    configs.minClass = level;
                    configs.save();
                    concatChat(`${GREEN}Minimum class level successfully set to ` + configs.minClass);
                } else {
                    concatChat(`${RED}Invalid value!`);
                }
            } else {
                concatChat(`${RED}Invalid minimum class level!`);
            }
            break;
        case "level":
            if (command.length == 1) {
                concatChat(`Minimum skyblock level is currently set to ${YELLOW}` + configs.minLevel);
            } else if (!isNaN(command[1]) && !isNaN(parseFloat(command[1]))) {
                const level = parseInt(command[1]);
                if (level >= 0) {
                    configs.minLevel = level;
                    configs.save();
                    concatChat(`${GREEN}Minimum skyblock level successfully set to ` + configs.minLevel);
                } else {
                    concatChat(`${RED}Invalid value!`);
                }
            } else {
                concatChat(`${RED}Invalid minimum skyblock level!`);
            }
            break;
        case "secrets":
            if (command.length == 1) {
                concatChat(`Minimum secrets is currently set to ${YELLOW}` + configs.minSecrets);
            } else if (!isNaN(command[1]) && !isNaN(parseFloat(command[1]) && parseInt(command[1]) >= 0)) {
                configs.minSecrets = parseInt(command[1]);
                configs.save();
                concatChat(`${GREEN}Minimum secrets successfully set to ` + configs.minSecrets);
            } else {
                concatChat(`${RED}Invalid minimum secrets!`);
            }
            break;
        case "secretsperrun":
            if (command.length == 1) {
                concatChat(`Minimum secrets per run is currently set to ${YELLOW}` + configs.minSecretsPerRun);
            } else if (!isNaN(command[1]) && !isNaN(parseFloat(command[1]) && parseInt(command[1]) >= 0)) {
                configs.minSecretsPerRun = parseInt(command[1]);
                configs.save();
                concatChat(`${GREEN}Minimum secrets per run successfully set to ` + configs.minSecretsPerRun);
            } else {
                concatChat(`${RED}Invalid minimum secrets per run!`);
            }
            break;
        case "combat":
            if (command.length == 1) {
                concatChat(`Minimum combat level is currently set to ${YELLOW}` + configs.minCombat);
            } else if (!isNaN(command[1]) && !isNaN(parseFloat(command[1]))) {
                const level = parseInt(command[1]);
                if (level <= 60 && level >= 0) {
                    configs.minCombat = level;
                    configs.save();
                    concatChat(`${GREEN}Minimum combat level successfully set to ` + configs.minCombat);
                } else {
                    concatChat(`${RED}Invalid value!`);
                }
            } else {
                concatChat(`${RED}Invalid minimum combat level!`);
            }
            break;
        case "mp":
            if (command.length == 1) {
                concatChat(`Minimum magical power is currently set to ${YELLOW}` + configs.minMP);
            } else if (!isNaN(command[1]) && !isNaN(parseFloat(command[1]) && parseInt(command[1]) >= 0)) {
                configs.minMP = parseInt(command[1]);
                configs.save();
                concatChat(`${GREEN}Minimum magical power successfully set to ` + configs.minMP);
            } else {
                concatChat(`${RED}Invalid minimum magical power!`);
            }
            break;
        case "pb":
            if (command.length == 1) {
                concatChat(`Minimum personal best is currently set to ${YELLOW}` + (configs.minPB === null ? "" : configs.minPB) + " seconds.");
            } else if (!isNaN(command[1]) && !isNaN(parseFloat(command[1]) && parseInt(command[1]) >= 0)) {
                configs.minPB = parseInt(command[1]);
                configs.save();
                concatChat(`${GREEN}Minimum personal best successfully set to ` + configs.minPB + " seconds.");
            } else {
                concatChat(`${RED}Invalid minimum personal best!`);
            }
            break;
        case "hype":
            if (command.length == 1) {
                concatChat(`Wither Impact required is currently ` + (configs.needHype === true ? `${GREEN}true` : `${RED}false`));
            } else if (command[1] == "true" || command[1] == "yes") {
                configs.needHype = true;
                configs.save();
                concatChat(`${GREEN}Wither Impact required successfully set to ` + (configs.needHype === true ? "true" : "false"));
            } else if (command[1] == "false" || command[1] == "no") {
                configs.needHype = false;
                configs.save();
                concatChat(`${GREEN}Wither Impact required successfully set to ` + (configs.needHype === true ? "true" : "false"));
            } else {
                concatChat(`${RED}Invalid value! Only 'true', 'false', 'yes' and 'no' are accepted.`);
            }
            break;
        case "term":
            if (command.length == 1) {
                concatChat(`Terminator required is currently ` + (configs.needTerm === true ? `${GREEN}true` : `${RED}false`));
            } else if (command[1] == "true" || command[1] == "yes") {
                configs.needTerm = true;
                configs.save();
                concatChat(`${GREEN}Terminator required successfully set to ` + (configs.needTerm === true ? "true" : "false"));
            } else if (command[1] == "false" || command[1] == "no") {
                configs.needTerm = false;
                configs.save();
                concatChat(`${GREEN}Terminator required successfully set to ` + (configs.needTerm === true ? "true" : "false"));
            } else {
                concatChat(`${RED}Invalid value! Only 'true', 'false', 'yes' and 'no' are accepted.`);
            }
            break;
        case "icespray":
            if (command.length == 1) {
                concatChat(`Ice Spray required is currently ` + (configs.needIceSpray === true ? `${GREEN}true` : `${RED}false`));
            } else if (command[1] == "true" || command[1] == "yes") {
                configs.needIceSpray = true;
                configs.save();
                concatChat(`${GREEN}Ice Spray required successfully set to ` + (configs.needIceSpray === true ? "true" : "false"));
            } else if (command[1] == "false" || command[1] == "no") {
                configs.needIceSpray = false;
                configs.save();
                concatChat(`${GREEN}Ice Spray required successfully set to ` + (configs.needIceSpray === true ? "true" : "false"));
            } else {
                concatChat(`${RED}Invalid value! Only 'true', 'false', 'yes' and 'no' are accepted.`);
            }
            break;
        case "lastbreath":
            if (command.length == 1) {
                concatChat(`Last Breath required is currently ` + (configs.needLastBreath === true ? `${GREEN}true` : `${RED}false`));
            } else if (command[1] == "true" || command[1] == "yes") {
                configs.needLastBreath = true;
                configs.save();
                concatChat(`${GREEN}Last Breath required successfully set to ` + (configs.needLastBreath === true ? "true" : "false"));
            } else if (command[1] == "false" || command[1] == "no") {
                configs.needLastBreath = false;
                configs.save();
                concatChat(`${GREEN}Last Breath required successfully set to ` + (configs.needLastBreath === true ? "true" : "false"));
            } else {
                concatChat(`${RED}Invalid value! Only 'true', 'false', 'yes' and 'no' are accepted.`);
            }
            break;
        case "effx":
            if (command.length == 1) {
                concatChat(`Efficiency X required is currently ` + (configs.needEffX === true ? `${GREEN}true` : `${RED}false`));
            } else if (command[1] == "true" || command[1] == "yes") {
                configs.needEffX= true;
                configs.save();
                concatChat(`${GREEN}Efficiency X required successfully set to ` + (configs.needEffX === true ? "true" : "false"));
            } else if (command[1] == "false" || command[1] == "no") {
                configs.needEffX = false;
                configs.save();
                concatChat(`${GREEN}Efficiency X required successfully set to ` + (configs.needEffX === true ? "true" : "false"));
            } else {
                concatChat(`${RED}Invalid value! Only 'true', 'false', 'yes' and 'no' are accepted.`);
            }
            break;
        case "nodupe":
            if (command.length == 1) {
                concatChat(`No dupe is currently ` + (configs.noDupe === true ? `${GREEN}true` : `${RED}false`));
            } else if (command[1] == "true" || command[1] == "yes") {
                configs.noDupe = true;
                configs.save();
                concatChat(`${GREEN}No dupe successfully set to ` + (configs.noDupe === true ? "true" : "false"));
            } else if (command[1] == "false" || command[1] == "no") {
                configs.noDupe = false;
                configs.save();
                concatChat(`${GREEN}No dupe successfully set to ` + (configs.noDupe === true ? "true" : "false"));
            } else {
                concatChat(`${RED}Invalid value! Only 'true', 'false', 'yes' and 'no' are accepted.`);
            }
            break;
        case "drag":
            if (command.length == 1) {
                concatChat(`Dragon Pet required is currently ${YELLOW}` + configs.needDrag);
            } else if (command[1].toLowerCase() == "none" || command[1].toLowerCase() == "edrag" || command[1].toLowerCase() == "gdrag" || command[1].toLowerCase() == "any" || command[1].toLowerCase() == "both") {
                configs.needDrag = command[1].toLowerCase();
                configs.save();
                concatChat(`${GREEN}Dragon Pet required successfully set to ` + configs.needDrag);
            } else {
                concatChat(`${RED}Invalid value! Only 'none', 'any', 'edrag', 'gdrag' and 'both' are accepted.`);
            }
            break;
        case "kick":
            if (command.length == 1) {
                concatChat(`Instant kick is currently ` + (configs.kick === true ? `${GREEN}true` : `${RED}false`));
            } else if (command[1] == "true" || command[1] == "yes") {
                configs.kick = true;
                configs.save();
                concatChat(`${GREEN}Instant kick successfully set to ` + (configs.kick === true ? "true" : "false"));
            } else if (command[1] == "false" || command[1] == "no") {
                configs.kick = false;
                configs.save();
                concatChat(`${GREEN}Instant kick successfully set to ` + (configs.kick === true ? "true" : "false"));
            } else {
                concatChat(`${RED}Invalid value! Only 'true', 'false', 'yes' and 'no' are accepted.`);
            }
            break;
        default:
            concatChat(`${RED}Unknown command! \"/mf help\" for a list of commands.`);
            break;
    }
}).setName("monkeyfilter").setAliases("mf", "monkey", "filter");

// Functions
function concatChat(string) {
    ChatLib.chat(`${BOLD}[${GOLD}${BOLD}Monkey${WHITE}${BOLD}Filter]:${RESET} ` + string);
}

function concatAPIURL(uuid) {
    return "https://api.hypixel.net/skyblock/profiles?key=" + configs.apiKey + "&uuid=" + uuid;
}