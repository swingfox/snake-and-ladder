
var SnakeAndLadderLayer = cc.Layer.extend({
    sprite:null,
    btnSingle:null,
    btnMultiplayer:null,
    btnOptions:null,
    btnInstructions:null,
    btnHallofFame:null,
    homeSprite:null,
    menu:null,
    ctor:function () {
        this._super();
        this.init();
        var size = cc.winSize;

       

        /* you can create scene with following comment code instead of using csb file.
        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 200;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite, 0);
        */

        return true;
    },
    init:function(){
         homeSprite = ccs.load(res.MainScene).node;
         menu = homeSprite.getChildByName("homeBackground");
         this.initializeButtons();
         
         this.addChild(homeSprite);

    },
    initializeButtons:function(){
        btnSingle = menu.getChildByName("btnSingle");
        btnMultiplayer = menu.getChildByName("btnMultiPlayer");
        btnOptions = menu.getChildByName("btnOptions");
        btnInstructions = menu.getChildByName("btnInstructions");
        btnHallofFame = menu.getChildByName("btnHallofFame");
        cc.log("INITIALIZED BUTTONS " +btnSingle);
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
        cc.log("SINGLE PLAYER");
    },
    multiPlayerScene:function(){
        cc.director.pushScene(new TwoPlayerScene());
        cc.log("MULTI PLAYER");
    },
    optionsScene:function(){
         cc.director.pushScene(new GameOptionScene());
        cc.log("OPTIONS");
    },
    instructionsScene:function(){
        cc.director.pushScene(new InstructionScene());
        cc.log("INSTRUCTION");
    },
    creditsScene:function(){
        cc.director.pushScene(new HallOfFameScene());
        cc.log("CREDITS");
    }
});

var SnakeAndLadderScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new SnakeAndLadderLayer();
        this.addChild(layer);
    }
});

