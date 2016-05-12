var GameOptionLayer = cc.Layer.extend({
	scene:null,
	btnBack:null,
	btnCredits:null,
	btnDifficulties:null,
	btnMusic:null,
	btnSounds:null,
	onMusic:null,
	offMusic:null,
	onSounds:null,
	offSounds:null,
	onEasy:null,
	onHard:null,
	ctor:function () {
		this._super();
		this.init();
	},
	init:function(){
		scene = ccs.load(res.GameOptionScene).node;
		twoPlayer = scene.getChildByName("optionsSprite");
		
		this.initializeButtons();
		this.initializeSprites();
		this.restoreCurrentSettings();
		this.addChild(scene);
	},
	restoreCurrentSettings:function(){
		var storage = cc.sys.localStorage;
		var music = storage.getItem("music");
		if(music != undefined){
			if(music=="on"){
				onMusic.setOpacity(0);
				offMusic.setOpacity(0);
			}
				
			else{
				onMusic.setOpacity(255);
				offMusic.setOpacity(255);
			}
		}
		else{
			onMusic.setOpacity(0);
			offMusic.setOpacity(0);
			storage.setItem("music","on");
		}

		var sounds = cc.sys.localStorage.getItem("sounds");
		if(music != undefined){
			if(sounds=="on"){
				onSounds.setOpacity(0);
				offSounds.setOpacity(0);
			}
			else{
				onSounds.setOpacity(255);
				offSounds.setOpacity(255);
			}
		}
		else{
			onSounds.setOpacity(0);
			offSounds.setOpacity(0);
			storage.setItem("sounds","on");
		}

		var difficulty = storage.getItem("difficulties");
		if(difficulty!=undefined){
			if(difficulty=="hard"){
				onEasy.setOpacity(0);
				onHard.setOpacity(0);
			}
			else{
				onEasy.setOpacity(255);
				onHard.setOpacity(255);
			}
		}
		else{
			onEasy.setOpacity(255);
			onHard.setOpacity(255);
			storage.setItem("difficulties","easy");
		}
	},
	initializeButtons:function(){
		btnBack = scene.getChildByName("btnBack");
		btnCredits = scene.getChildByName("btnCredits");
		btnDifficulties = scene.getChildByName("btnDifficulties");
		btnMusic = scene.getChildByName("btnMusic");
		btnSounds = scene.getChildByName("btnSounds");

		this.initializeListener();
	},
	initializeListener:function(){
	/*	btnBack.addTouchEventListener(this.goBack,this);
		btnCredits.addTouchEventListener(this.credits,this);
		btnDifficulties.addTouchEventListener(this.setDifficulties,this);
		btnMusic.addTouchEventListener(this.setMusic,this);
		btnSounds.addTouchEventListener(this.setSounds,this);
*/
		var main = this;

			//Create a "one by one" touch event listener (processes one touch at a time)
        this.touchListener = cc.EventListener.create({
	    event: cc.EventListener.TOUCH_ONE_BY_ONE,
		// When "swallow touches" is true, then returning 'true' from the onTouchBegan method will "swallow" the touch event, preventing other listeners from using it.
	    swallowTouches: true,
		//onTouchBegan event callback function						
	    onTouchBegan: function (touch, event) {	
			// event.getCurrentTarget() returns the *listener's* sceneGraphPriority node.	
		    var target = event.getCurrentTarget();	

			//Get the position of the current point relative to the button
		    var locationInNode = target.convertToNodeSpace(touch.getLocation());	
		    var s = target.getContentSize();
		    var rect = cc.rect(0, 0, s.width, s.height);
		    var objectName = target.getName();
			//Check the click area
		    if (cc.rectContainsPoint(rect, locationInNode)) {	
			    target.opacity = 180;
	
			    return true;
		    }
		    return false;
	    },
		//Trigger when moving touch
	    onTouchMoved: function (touch, event) {			
		    //Move the position of current button sprite
			var target = event.getCurrentTarget();
		    var delta = touch.getDelta();
	    },
		//Process the touch end event
	    onTouchEnded: function (touch, event) {			
		    var target = event.getCurrentTarget();
		//    target.setOpacity(255);

		    var locationInNode = target.convertToNodeSpace(touch.getLocation());	
		    var s = target.getContentSize();
		    var rect = cc.rect(0, 0, s.width, s.height);
		    var objectName = target.getName();
			//Check the click area

		    if (cc.rectContainsPoint(rect, locationInNode)) {	
				target.opacity = 0;

			    cc.log(target.getName());
			    switch(objectName){
			    	case "btnBack":
			    	cc.director.runScene(new SnakeAndLadderScene());
			    	break;
			    	case "btnCredits":
			    	cc.director.pushScene(new CreditsScene());
			    	break;
			    	case "btnDifficulties":
			    	main.setDifficulties();
			    	break;
			    	case "btnSounds":
			    	main.setSounds();
			    	break;
			    	case "btnMusic":
			    	main.setMusic();
			    	break;
			    }

	    }
	}
    });

        cc.eventManager.addListener(this.touchListener, btnBack);
	    cc.eventManager.addListener(this.touchListener.clone(), btnCredits);
	    cc.eventManager.addListener(this.touchListener.clone(), btnDifficulties);
	    cc.eventManager.addListener(this.touchListener.clone(), btnMusic);
	    cc.eventManager.addListener(this.touchListener.clone(), btnSounds);
	},
	initializeSprites:function(){
		onEasy = scene.getChildByName("onEasy");
		onHard = scene.getChildByName("onHard");
		onSounds = scene.getChildByName("onSounds");
		offSounds = scene.getChildByName("offSounds");
		onMusic = scene.getChildByName("onMusic");
		offMusic = scene.getChildByName("offMusic");

	},
	goBack:function(){
		if(this.storage.getItem("sounds")=="on")
			cc.audioEngine.playEffect(res.ClickPlay);

		cc.director.runScene(new cc.TransitionFade(0.1,new SnakeAndLadderScene()));
	},
	credits:function(){
		if(this.storage.getItem("sounds")=="on")
			cc.audioEngine.playEffect(res.ClickPlay);

		cc.director.pushScene(new cc.TransitionFade(0.1,new CreditsScene()));
	},
	setMusic:function(){
		var music = cc.sys.localStorage.getItem("music");

		if(music=="on"){
			cc.audioEngine.pauseMusic();
			onMusic.setOpacity(255);
			offMusic.setOpacity(255);
			cc.sys.localStorage.setItem("music","off");
		}
			
		else{
			onMusic.setOpacity(0);
			offMusic.setOpacity(0);
			cc.audioEngine.resumeMusic();
			cc.sys.localStorage.setItem("music","on");
		}

		if(this.storage.getItem("sounds")=="on")
			cc.audioEngine.playEffect(res.ClickPlay);
	},
	setSounds:function(){
		var sounds = cc.sys.localStorage.getItem("sounds");
		if(sounds=="on"){
			onSounds.setOpacity(255);
			offSounds.setOpacity(255);
			cc.sys.localStorage.setItem("sounds","off");
		}
		else{
			onSounds.setOpacity(0);
			offSounds.setOpacity(0);
			this.sounds=false;
			cc.sys.localStorage.setItem("sounds","on");
		}

		if(this.storage.getItem("sounds")=="on")
			cc.audioEngine.playEffect(res.ClickPlay);
	},
	setDifficulties:function(){
		var difficulty = cc.sys.localStorage.getItem("difficulties");
		if(difficulty=="hard"){
			onEasy.setOpacity(255);
			onHard.setOpacity(255);
			cc.sys.localStorage.setItem("difficulties","easy");
		}
		else{
			onEasy.setOpacity(0);
			onHard.setOpacity(0);
			cc.sys.localStorage.setItem("difficulties","hard");
		}

		if(this.storage.getItem("sounds")=="on")
			cc.audioEngine.playEffect(res.ClickPlay);
	}
});

var GameOptionScene = cc.Scene.extend({
	ctor:function(){
		this._super();
		var layer = new GameOptionLayer();
        this.addChild(layer);
	},
  	onEnter:function () {
        this._super(); 
    }
});