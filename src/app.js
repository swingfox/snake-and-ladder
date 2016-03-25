
var SnakeAndLadderLayer = cc.Layer.extend({
    sprite:null,
    btnSingle:null,
    btnMultiplayer:null,
    btnOptions:null,
    btnInstructions:null,
    btnHallofFame:null,
    homeSprite:null,
    menu:null,
    isMusicStopped:false,
    ctor:function (isMusicStopped) {
        this._super();
        this.init();
        var size = cc.winSize;

        this.isMusicStopped = isMusicStopped;

        return true;
    },
    init:function(){
         homeSprite = ccs.load(res.MainScene).node;
         menu = homeSprite.getChildByName("homeBackground");
         this.initializeButtons();
         
         this.addChild(homeSprite);
       /*  if(!cc.audioEngine.isMusicPlaying())
            this.playSong();*/

    },
    playSong:function(){
        cc.audioEngine.playMusic(res.BackgroundPlay, true);
    },
    stopSong:function(){
        cc.audioEngine.stopMusic();
    },
    initializeButtons:function(){
        btnSingle = menu.getChildByName("btnSingle");
        btnMultiplayer = menu.getChildByName("btnMultiPlayer");
        btnOptions = menu.getChildByName("btnOptions");
        btnInstructions = menu.getChildByName("btnInstructions");
        btnHallofFame = menu.getChildByName("btnHallofFame");
        this.initializeListeners();
    },
    initializeListeners:function(){
        btnSingle.addTouchEventListener(this.singlePlayerScene,this);
        btnMultiplayer.addTouchEventListener(this.multiPlayerScene,this);
        btnOptions.addTouchEventListener(this.optionsScene,this);
        btnInstructions.addTouchEventListener(this.instructionsScene,this);
        btnHallofFame.addTouchEventListener(this.creditsScene,this);
    },
    singlePlayerScene:function(){
        cc.director.pushScene(new SinglePlayerScene());
    },
    multiPlayerScene:function(){
        cc.director.pushScene(new QuestionScene());
    },
    optionsScene:function(){
        cc.director.pushScene(new GameOptionScene());
    },
    instructionsScene:function(){
        cc.director.pushScene(new InstructionScene());
    },
    creditsScene:function(){
        cc.director.pushScene(new HallOfFameScene());
    }
});

var SnakeAndLadderScene = cc.Scene.extend({
    ctor:function(isMusicStopped){
        this._super();
        var layer = new SnakeAndLadderLayer(isMusicStopped);
        this.addChild(layer);
        return true;
    },
    onEnter:function (isMusicStopped) {
        this._super();
        var layer = new SnakeAndLadderLayer(isMusicStopped);
        this.addChild(layer);
    }
});

