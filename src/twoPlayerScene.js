var TwoPlayerLayer = cc.Layer.extend({
	scene:null,
	btnBack:null,
	btnNext:null,
	twoPlayer:null,
	playerOne:null,
	playerTwo:null,
	ctor:function () {
		this._super();
		this.init();
	},
	init:function(){
		scene = ccs.load(res.TwoPlayerScene).node;
		twoPlayer = scene.getChildByName("playersSprite");
		this.initializeButtons();
		this.addChild(scene);
	},
	initializeButtons:function(){
		btnBack = twoPlayer.getChildByName("btnBack");
		btnNext = twoPlayer.getChildByName("btnNext");
		playerOne = twoPlayer.getChildByName("playerOneSprite");
		playerTwo = twoPlayer.getChildByName("playerTwoSprite");
	//	var editBoxOne = cc.EditBox(cc.Size(12,12),playerOne);
	//	editBoxOne.setName("box1");
	//	this.addChild(editBoxOne,100);
		this.initializeListener();
		cc.log("INITIALIZED BUTTONS");
	},
	initializeListener:function(){
		btnBack.addTouchEventListener(this.goBack,this);
		btnNext.addTouchEventListener(this.goNext,this);
	},
	goBack:function(){
		cc.director.popScene();
	},
	goNext:function(){

	}
});

var TwoPlayerScene = cc.Scene.extend({
  	onEnter:function () {
        this._super();
        var layer = new TwoPlayerLayer();
        this.addChild(layer);
    }
});