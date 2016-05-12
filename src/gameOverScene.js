var GameOverLayer = cc.Layer.extend({
	ctor:function (playerName,typeOfGame) {
        this._super();
        this.init(playerName,typeOfGame);
        this.initializeListeners();
        return true;
    },
    init:function(playerName,typeOfGame){
        var scene = new ccs.load(res.GameOverScene).node;
        txtAnnouncements = scene.getChildByName("txtAnnouncement");
        btnPlayAgain = scene.getChildByName("btnPlayAgain");
        btnMenu = scene.getChildByName("btnMenu");
        txtAnnouncements.setString(playerName + " wins!");

        this.storage = cc.sys.localStorage;
        this._typeOfGame = typeOfGame;
        this.addChild(scene);
    },
    initializeListeners:function(){
        cc.log("INIT LISTENERS GAME OVER");
        var main = this;
        this.touchListener = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) { 
            var target = event.getCurrentTarget();  

            var locationInNode = target.convertToNodeSpace(touch.getLocation());    
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);
            var objectName = target.getName();

            if (cc.rectContainsPoint(rect, locationInNode)) {   
    
                return true;
            }
            return false;
        },
        onTouchEnded: function (touch, event) {         
            var target = event.getCurrentTarget();
            var locationInNode = target.convertToNodeSpace(touch.getLocation());    
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);
            var objectName = target.getName();

            if (cc.rectContainsPoint(rect, locationInNode)) {   
                if(objectName=="btnPlayAgain")
                    main.playAgain();
                else if(objectName=="btnMenu")
                    main.menu();
            }

        }
    });
    
        cc.eventManager.addListener(this.touchListener, btnPlayAgain);
        cc.eventManager.addListener(this.touchListener.clone(), btnMenu);
    },
    playAgain:function(){
        if(this.storage.getItem("sounds")=="on")
            cc.audioEngine.playEffect(res.ClickPlay);
        if(this._typeOfGame=="SINGLE_PLAYER")
            cc.director.runScene(new cc.TransitionFade(0.2,new SinglePlayerScene()));
        else if(this._typeOfGame=="TWO_PLAYER")
            cc.director.runScene(new cc.TransitionFade(0.2,new TwoPlayerScene()));
    },
    menu:function(){
        if(this.storage.getItem("sounds")=="on")
            cc.audioEngine.playEffect(res.ClickPlay);
        
        cc.director.runScene(new cc.TransitionFade(0.2,new SnakeAndLadderScene()));
    }
});

var GameOverScene = cc.Scene.extend({
    ctor:function(playerName,typeOfGame){
        this._super();
        this.addChild(new GameOverLayer(playerName,typeOfGame));
    }
});

