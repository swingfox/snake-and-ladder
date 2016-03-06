var SinglePlayerLayer = cc.Layer.extend({
	scene:null,
	singlePlayer: null,
	btnBack:null,
	btnNext:null,
	ctor:function () {
		this._super();
		this.init();
	},
	init:function(){
		scene = ccs.load(res.SinglePlayerScene).node;
		singlePlayer = scene.getChildByName("playerOneSprite");
		this.initializeButtons();
		this.addChild(scene);
		//var box = cc.EditBox.create(12,)
	},
	initializeButtons:function(){
		btnBack = singlePlayer.getChildByName("btnBack");
		btnNext = singlePlayer.getChildByName("btnNext");
		this.initializeListener();
	},
	initializeListener:function(){
		btnBack.addTouchEventListener(this.goBack,this);
		btnNext.addTouchEventListener(this.goNext,this);
	},
	goBack:function(){
		cc.director.popScene();
	},
	goNext:function(){
		cc.director.pushScene(new PlayScene());
	}
});


var SinglePlayerScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new SinglePlayerLayer();
        this.addChild(layer);
    }
});

