var GameOptionLayer = cc.Layer.extend({
	scene:null,
	btnBack:null,
	btnCredits:null,
	ctor:function () {
		this._super();
		this.init();
	},
	init:function(){
		scene = ccs.load(res.GameOptionScene).node;
		twoPlayer = scene.getChildByName("optionsSprite");
		
		this.initializeButtons();
		this.addChild(scene);
	},
	initializeButtons:function(){
		btnBack = scene.getChildByName("btnBack");
		btnCredits = scene.getChildByName("btnCredits");
		this.initializeListener();
		cc.log("INITIALIZED BUTTONS");
	},
	initializeListener:function(){
		btnBack.addTouchEventListener(this.goBack,this);
		btnCredits.addTouchEventListener(this.credits,this);
	},
	goBack:function(){
		cc.director.popScene();
	},
	credits:function(){
		cc.director.pushScene(new CreditsScene());
	}
});

var GameOptionScene = cc.Scene.extend({
  	onEnter:function () {
        this._super();
        var layer = new GameOptionLayer();
        this.addChild(layer);
    }
});