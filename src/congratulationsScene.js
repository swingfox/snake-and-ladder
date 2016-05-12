var CongratulationsLayer = cc.Layer.extend({
	ctor:function (name,min,sec,typeOfGame) {
        this._super();
        this.init(name,min,sec,typeOfGame);
        this.initializeListeners();
        this.setHallOfFamer();
        return true;
    },
    init:function(name,min,sec,typeOfGame){
    	var scene = ccs.load(res.congratulationsScene).node;

    	btnPlayAgain = scene.getChildByName("btnPlayAgain");
    	btnMenu = scene.getChildByName("btnMenu");
    	congratsBoard = scene.getChildByName("congratsBoard");
    	txtElapsed = congratsBoard.getChildByName("txtElapsed");
    	txtPlayer = congratsBoard.getChildByName("txtPlayer");
        this._player = name;

    	txtPlayer.setString(this._player);

    	this.storage = cc.sys.localStorage;
        this._min = min;
        this._sec = sec;
        this._typeOfGame = typeOfGame;

    	var minute;
    	var second;
    	if(this._min < 10)
    		minute = "0" + this._min;
    	if(this._sec < 10)
    		second = "0" + this._sec;
    	txtElapsed.setString("Your time is, " + minute + " mins and " + second + " sec.");

    	this.addChild(scene);
    },
    initializeListeners:function(){
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
    },
    setHallOfFamer:function(){
    	if(this._typeOfGame=="SINGLE_PLAYER" && this.storage.getItem("difficulties")=="easy"){
	    	if(this.storage.getItem("easyFirstSingle")==null)
				this.storage.setItem("easyFirstSingle",this._player);
			else if(this.storage.getItem("easySecondSingle")==null)
				this.storage.setItem("easySecondSingle",this._player);
			else if(this.storage.getItem("easyThirdSingle")==null)
				this.storage.setItem("easyThirdSingle",this._player);
		}

		if(this._typeOfGame=="TWO_PLAYER" && this.storage.getItem("difficulties")=="easy"){
			if(this.storage.getItem("easyFirstMulti")==null)
				this.storage.setItem("easyFirstMulti",this._player);
			else if(this.storage.getItem("easySecondMulti")==null)
				this.storage.setItem("easySecondMulti",this._player);
			else if(this.storage.getItem("easyThirdMulti")==null)
				this.storage.setItem("easyThirdMulti",this._player);
		}

		if(this._typeOfGame=="SINGLE_PLAYER" && this.storage.getItem("difficulties")=="hard"){
			if(this.storage.getItem("hardFirstSingle")==null)
				this.storage.setItem("hardFirstSingle",this._player);
			else if(this.storage.getItem("hardSecondSingle")==null)
				this.storage.setItem("hardSecondSingle",this._player);
			else if(this.storage.getItem("hardThirdSingle")==null)
				this.storage.setItem("hardThirdSingle",this._player);
		}

		if(this._typeOfGame=="TWO_PLAYER" && this.storage.getItem("difficulties")=="hard"){
			if(this.storage.getItem("hardFirstMulti")==null)
				this.storage.setItem("hardFirstMulti",this._player);
			if(this.storage.getItem("hardSecondMulti")==null)
				this.storage.setItem("hardSecondMulti",this._player);
			if(this.storage.getItem("hardThirdMulti")==null)
				this.storage.setItem("hardThirdMulti",this._player);
		}
    }
});

var CongratulationsScene = cc.Scene.extend({
	ctor:function(name,min,sec,typeOfGame){
 		this._super();
        this.addChild(new CongratulationsLayer(name,min,sec,typeOfGame));
	}
});