var res = {
    HelloWorld_png : "res/HelloWorld.png",
    MainScene : "res/MainScene.json",
    GameDevelopersScene : "res/GameDevelopersScene.json",
    GameOverScene : "res/GameOverScene.json",
    CongratulationsScene : "res/CongratulationsScene.json",
    HallOfFame : "res/HallOfFame.json",
    InstructionScene : "res/InstructionScene.json",
    PlayScene : "res/PlayScene.json",
    HomeBackgroundLayer : "res/HomeBackgroundLayer.json",
    SinglePlayerScene : "res/OnePlayer.json",
    TwoPlayerScene : "res/TwoPlayer.json",
    PlayerNameScene : "res/PlayerNameScene.json"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
