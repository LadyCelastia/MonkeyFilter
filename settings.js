class Settings {
    apiKey = "";
    minCata = 0;
    minClass = 0; // class level
    minSecrets = 0;
    minSecretsPerRun = 0;
    minCombat = 0; // combat skill level
    minMP = 0; // magical power
    minPB = null; // min personal best time
    needHype = false;
    needTerm = false;
    needDrag = "None"; // None - Any pet. Any - edrag or gdrag. EDrag - edrag. GDrag - gdrag. Both - edrag AND gdrag
    needIceSpray = false;
    needLastBreath = false;
    needEffX = false;
    noDupe = false;
}

export default new Settings