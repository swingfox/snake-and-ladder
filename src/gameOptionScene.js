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
	difficulty:false,
	sounds:false,
	music:false,
	onHoldMusic:false,
	onHoldSounds:false,
	onHoldDifficulty:false,
	ctor:function () {
		this._super();
		this.init();
	},
	init:function(){
		scene = ccs.load(res.GameOptionScene).node;
		twoPlayer = scene.getChildByName("optionsSprite");
		
		this.initializeButtons();
		this.initializeSprites();
		this.addChild(scene);
	},
	initializeButtons:function(){
		btnBack = scene.getChildByName("btnBack");
		btnCredits = scene.getChildByName("btnCredits");
		btnDifficulties = scene.getChildByName("btnDifficulties");
		btnMusic = scene.getChildByName("btnMusic");
		btnSounds = scene.getChildByName("btnSounds");

		this.initializeListener();
		cc.log("INITIALIZED BUTTONS");
	},
	initializeListener:function(){
		btnBack.addTouchEventListener(this.goBack,this);
		btnCredits.addTouchEventListener(this.credits,this);
		btnDifficulties.addTouchEventListener(this.setDifficulties,this);
		btnMusic.addTouchEventListener(this.setMusic,this);
		btnSounds.addTouchEventListener(this.setSounds,this);
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
		cc.director.popScene();
	},
	credits:function(){
		cc.director.pushScene(new CreditsScene());
	},
	setMusic:function(){
		if(this.onHoldMusic==false){
			if(this.music==false){
				onMusic.setOpacity(255);
				offMusic.setOpacity(255);
				this.music=true;
				if(cc.audioEngine.isMusicPlaying())
				cc.audioEngine.pauseMusic();
			}
			else{
				onMusic.setOpacity(0);
				offMusic.setOpacity(0);
				this.music=false;
				cc.audioEngine.resumeMusic()
			}
			this.onHoldMusic = true;
			
		}
		else
			this.onHoldMusic = false;
	},
	setSounds:function(){
		if(this.onHoldSounds==false){
			if(this.sounds==false){
				onSounds.setOpacity(255);
				offSounds.setOpacity(255);
				this.sounds=true;
			}
			else{
				onSounds.setOpacity(0);
				offSounds.setOpacity(0);
				this.sounds=false;
			}
			this.onHoldSounds = true;
		}
		else
			this.onHoldSounds = false;

	},
	setDifficulties:function(){
		if(this.onHoldDifficulty==false){
			if(this.difficulty==false){
				onEasy.setOpacity(255);
				onHard.setOpacity(255);
				this.difficulty=true;
			}
			else{
				onEasy.setOpacity(0);
				onHard.setOpacity(0);
				this.difficulty=false;
			}
			this.onHoldDifficulty = true;
		}
		else
			this.onHoldDifficulty = false;
	},
	onMouseDown:function( event ) {
    var rawLoc = event.getLocation();
    var loc = this.getOnPanelPos(rawLoc);
    cc.log("MOUSE DOWN");
    //here you can do anything using converted loc
	}
});

var GameOptionScene = cc.Scene.extend({
  	onEnter:function () {
        this._super();
        var layer = new GameOptionLayer();
        this.addChild(layer);
    }
});