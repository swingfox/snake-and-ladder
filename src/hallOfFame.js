var HallOfFameLayer = cc.Layer.extend({
	scene:null,
	btnBack:null,
	btnCredits:null,
	hallOfFameSprite:null,
	ctor:function () {
		this._super();
		this.init();
	},
	init:function(){
		scene = ccs.load(res.HallOfFameScene).node;
		hallOfFameSprite = scene.getChildByName("hallOfFameSprite");
		
		this.initializeButtons();
		this.addChild(scene);
	},
	initializeButtons:function(){
		btnBack = scene.getChildByName("btnBack");
		this.initializeListener();
	},
	initializeListener:function(){
		btnBack.addTouchEventListener(this.goBack,this);
	},
	goBack:function(){
		cc.director.popScene();
	}
});

var HallOfFameScene = cc.Scene.extend({
  	onEnter:function () {
        this._super();
        var layer = new HallOfFameLayer();
        this.addChild(layer);
    }
});