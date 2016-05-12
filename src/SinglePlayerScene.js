var SinglePlayerLayer = cc.Layer.extend({
	ctor:function () {
		this._super();
		this.init();
	},
	init:function(){
		scene = ccs.load(res.SinglePlayerScene).node;
		singlePlayer = scene.getChildByName("playerOneSprite");
		this.storage = cc.sys.localStorage;

		size = cc.winSize;

		this.initializeButtons();
		this.addChild(scene);
		this.textField = new ccui.TextField();
		this.textField.setTouchEnabled(true);
		this.textField.fontName = "neuropol x rg";
		this.textField.placeHolder = "                            ";
		this.textField.fontSize = 30;
		this.textField.x = size.width/2;
		this.textField.y = 350;
		this.textField.setLocalZOrder(100);
		this.textField.setMaxLengthEnabled(true);
		this.textField.setMaxLength(7);
		this.textField.addEventListener(this.textFieldEvent,this);
		this.addChild(this.textField);


		cc.sys.localStorage.setItem("fifty","5");
		cc.sys.localStorage.setItem("pass","5");
		cc.sys.localStorage.setItem("cq","5");
		cc.sys.localStorage.setItem("life","100");
		cc.sys.localStorage.setItem("questionExit","0");
	},
	textFieldEvent:function(sender,type){
		switch(type){
			case ccui.TextField.EVENT_ATTACH_WITH_IME:
			cc.log("Activate");
			this.textField.string = "";
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
        if(this.storage.getItem("sounds")=="on")
			cc.audioEngine.playEffect(res.ClickPlay);
		cc.director.popToRootScene();
	},
	goNext:function(){
        if(this.storage.getItem("sounds")=="on")
			cc.audioEngine.playEffect(res.ClickPlay);
		cc.director.pushScene(new cc.TransitionFade(0.0,new PlayScene("SINGLE_PLAYER",this.playerOneName)));
	}
});


var SinglePlayerScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        this.addChild(new SinglePlayerLayer());
    }
});

