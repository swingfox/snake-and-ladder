var SnakeAndLadderLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.init();
        return true;
    },
    init:function(){
         homeSprite = ccs.load(res.MainScene).node;
         menu = homeSprite.getChildByName("homeBackground");
         this.initializeButtons();
         this.storage = cc.sys.localStorage;
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
        if(this.storage.getItem("sounds")=="on")
            cc.audioEngine.playEffect(res.ClickPlay);
        cc.director.pushScene(new cc.TransitionFade(0.5,new SinglePlayerScene()));
    },
    multiPlayerScene:function(){
        if(this.storage.getItem("sounds")=="on")
            cc.audioEngine.playEffect(res.ClickPlay);
        cc.director.pushScene(new cc.TransitionFade(0.5,new TwoPlayerScene()));
    },
    optionsScene:function(){
        if(this.storage.getItem("sounds")=="on")
            cc.audioEngine.playEffect(res.ClickPlay);
        cc.director.pushScene(new cc.TransitionFade(0.5,new GameOptionScene()));
    },
    instructionsScene:function(){
        if(this.storage.getItem("sounds")=="on")
            cc.audioEngine.playEffect(res.ClickPlay);
        cc.director.pushScene(new cc.TransitionFade(0.5,new InstructionScene()));
    },
    creditsScene:function(){
        if(this.storage.getItem("sounds")=="on")
            cc.audioEngine.playEffect(res.ClickPlay);
        cc.director.pushScene(new cc.TransitionFade(0.5,new HallOfFameScene()));
    }
});

var SnakeAndLadderScene = cc.Scene.extend({
    ctor:function(){
        this._super();
        this.addChild(new SnakeAndLadderLayer());
        return true;
    },
    onEnter:function(){
        this._super();
        this.addChild(new SnakeAndLadderLayer());
    }
});

