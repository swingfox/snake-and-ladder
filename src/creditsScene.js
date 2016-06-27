var CreditsLayer = cc.Layer.extend({
	ctor:function(){
		this._super();
		this.init();
	},
	init:function(){
		scene = ccs.load(res.GameDevelopersScene).node;
		credits = scene.getChildByName("creditsSprite");
		this.initializeButtons();
		this.addChild(scene);
	},
    initializeButtons:function(){
        btnOK = credits.getChildByName("btnOK");
        this.initializeListener();
    },
	initializeListener:function(){
		btnOK.addTouchEventListener(this.goBack,this);
	},
	goBack:function(){
		if(cc.sys.localStorage.getItem("sounds")=="on")
			cc.audioEngine.playEffect(res.ClickPlay);
		
		cc.director.popScene();
	}
});

var CreditsScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new CreditsLayer();
        this.addChild(layer);
    }
});

