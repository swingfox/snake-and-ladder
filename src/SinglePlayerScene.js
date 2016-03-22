var SinglePlayerLayer = cc.Layer.extend({
	scene:null,
	singlePlayer: null,
	btnBack:null,
	btnNext:null,
	textField:null,
	playerOneName:null,
	ctor:function () {
		this._super();
		this.init();
	},
	init:function(){
		scene = ccs.load(res.SinglePlayerScene).node;
		singlePlayer = scene.getChildByName("playerOneSprite");
		var size = cc.winSize;
		this.initializeButtons();
		this.addChild(scene);
		this.textField = new ccui.TextField();
		this.textField.setTouchEnabled(true);
		this.textField.fontName = res.font;
		this.textField.placeHolder = "Name";
		this.textField.fontSize = 30;
		this.textField.x = size.width/2;
		this.textField.y = 350;
		this.textField.setLocalZOrder(100);
		this.textField.setMaxLengthEnabled(true);
		this.textField.setMaxLength(12);
		this.textField.addEventListener(this.textFieldEvent,this);
		this.addChild(this.textField);
	},
	textFieldEvent:function(sender,type){
		switch(type){
			case ccui.TextField.EVENT_ATTACH_WITH_IME:
			cc.log("Activate");
			break;
			case ccui.TextField.EVENT_DETACH_WITH_IME:
			cc.log("Deactivate");
			break;
			case ccui.TextField.EVENT_INSERT_TEXT:
			this.playerOneName = this.textField.string;
			cc.log(this.playerOneName);
			if(this.playerOneName!="")
				btnNext.setVisible(true); 
			else
				btnNext.setVisible(false); 
			break;
			case ccui.TextField.EVENT_DELETE_BACKWARD:
			this.playerOneName = this.textField.string;
			cc.log(this.playerOneName);
			if(this.playerOneName!="")
				btnNext.setVisible(true); 
			else
				btnNext.setVisible(false); 
			break;
		}
	},
	initializeButtons:function(){
		btnBack = singlePlayer.getChildByName("btnBack");
		btnNext = singlePlayer.getChildByName("btnNext");
		btnNext.setVisible(false); 
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
		cc.log("GO NEXT: " + this.playerOneName);
		cc.director.pushScene(new PlayScene("SINGLE_PLAYER",this.playerOneName));
	}
});


var SinglePlayerScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new SinglePlayerLayer();
        this.addChild(layer);
    }
});

