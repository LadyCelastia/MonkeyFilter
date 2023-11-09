import PogObject from "../PogData";
import {AQUA, BOLD, GOLD, GRAY, GREEN, ITALIC, RED, RESET, UNDERLINE, WHITE} from "./constants";

// Run on launch
if (!FileLib.exists("MonkeyFilter", "data")) new java.io.File("config/ChatTriggers/modules/MonkeyFilter/data").mkdir();
const configs = new PogObject("MonkeyFilter", {
    apiKey: "",
    minCata: 0,
    minClass: 0, // class level
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
    noDupe: false
});
register("worldLoad", () => {
    if (configs.apiKey == "")
        concatChat(`Your API key is currently not set! MonkeyFilter does not work without a valid API key.`);
});

// Commands
register("command", (...args) => {
    const command = args === undefined ? undefined : args.join(" ").split(" ");
    switch (command[0].toLowerCase()) {
        case undefined:
            concatChat(`Unknown command! \"/mf help\" for a list of commands.`);
            break;
        case "settings": // display settings
            break;
        case "help": // display commands
            break;
        case "setapi":
            if (command.length == 1)
                concatChat(`${RED}Invalid API key!`);
            else {
                configs.apiKey = command[1];
                configs.save();
                concatChat(`${GREEN}API key successfully set to ` + command[1]);
            }
            break;
        case "api":
            concatChat(`Your current API key is: ` + configs.apiKey);
            break;
        default:
            concatChat(`Unknown command! \"/mf help\" for a list of commands.`);
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