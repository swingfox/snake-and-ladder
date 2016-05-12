var TwoPlayerLayer = cc.Layer.extend({
	playerOneName:null,
	playerTwoName:null,
	textField1:null,
	textField2:null,
	ctor:function () {
		this._super();
		this.init();
		
	},
	init:function(){
		scene = ccs.load(res.TwoPlayerScene).node;
		twoPlayer = scene.getChildByName("playersSprite");
		this.initializeButtons();
		this.addChild(scene);
		btnNext.setVisible(false); 
		this.storage = cc.sys.localStorage;

		size = cc.winSize;

		
		this.playerOneName="";
		this.playerTwoName="";

		this.textField1 = new ccui.TextField();
		this.textField1.setTouchEnabled(true);
		this.textField1.fontName = "neuropol x rg";
		this.textField1.placeHolder = "                            ";
		this.textField1.fontSize = 30;
		this.textField1.x = 450;
		this.textField1.y = 430;
		this.textField1.setLocalZOrder(100);
		this.textField1.setMaxLengthEnabled(true);
		this.textField1.setMaxLength(7);
		this.textField1.addEventListener(this.textFieldEvent1,this);
		this.addChild(this.textField1);

		this.textField2 = new ccui.TextField();
		this.textField2.setTouchEnabled(true);
		this.textField2.fontName = "neuropol x rg";
		this.textField2.placeHolder = "                            ";
		this.textField2.fontSize = 30;
		this.textField2.x = 450;
		this.textField2.y = 310;
		this.textField2.setLocalZOrder(100);
		this.textField2.setMaxLengthEnabled(true);
		this.textField2.setMaxLength(7);
		this.textField2.addEventListener(this.textFieldEvent2,this);
		this.addChild(this.textField2);

		cc.sys.localStorage.setItem("fifty","5");
		cc.sys.localStorage.setItem("pass","5");
		cc.sys.localStorage.setItem("cq","5");
		cc.sys.localStorage.setItem("life","100");
		cc.sys.localStorage.setItem("fifty2","5");
		cc.sys.localStorage.setItem("pass2","5");
		cc.sys.localStorage.setItem("cq2","5");
		cc.sys.localStorage.setItem("questionExit","0");

	},
	textFieldEvent1:function(sender,type){
		switch(type){
			case ccui.TextField.EVENT_ATTACH_WITH_IME:
			cc.log("Activate");
			break;
			case ccui.TextField.EVENT_DETACH_WITH_IME:
			cc.log("Deactivate");
			break;
			case ccui.TextField.EVENT_INSERT_TEXT:
			this.playerOneName = this.textField1.string;
			cc.log(this.playerOneName);
			if(this.playerOneName!=""){
				if(this.playerTwoName!="")
					btnNext.setVisible(true); 
			}
			else
				btnNext.setVisible(false); 
			break;
			case ccui.TextField.EVENT_DELETE_BACKWARD:
			this.playerOneName = this.textField1.string;
			cc.log(this.playerOneName);
			if(this.playerOneName!=""){
				if(this.playerTwoName!="")
					btnNext.setVisible(true); 
			}
			else
				btnNext.setVisible(false); 
		
			if(this.playerOneName.length==0) btnNext.setVisible(false);
			if(this.playerTwoName.length==0) btnNext.setVisible(false);
			break;
		}
	},
	textFieldEvent2:function(sender,type){
		switch(type){
			case ccui.TextField.EVENT_ATTACH_WITH_IME:
			cc.log("Activate");
			break;
			case ccui.TextField.EVENT_DETACH_WITH_IME:
			cc.log("Deactivate");
			break;
			case ccui.TextField.EVENT_INSERT_TEXT:
			this.playerTwoName = this.textField2.string;
			cc.log(this.playerTwoName);
			if(this.playerOneName!=""){
				if(this.playerTwoName!="")
					btnNext.setVisible(true); 
			}
			else
				btnNext.setVisible(false); 
			case ccui.TextField.EVENT_DELETE_BACKWARD:
			this.playerTwoName = this.textField2.string;
			cc.log(this.playerTwoName);
			if(this.playerOneName!=""){
				if(this.playerTwoName!="")
					btnNext.setVisible(true); 
			}
			else
				btnNext.setVisible(false); 

			if(this.playerOneName.length==0) btnNext.setVisible(false);
			if(this.playerTwoName.length==0) btnNext.setVisible(false);
			break;
		}
	},
	initializeButtons:function(){
		btnBack = twoPlayer.getChildByName("btnBack");
		btnNext = twoPlayer.getChildByName("btnNext");
		playerOne = twoPlayer.getChildByName("playerOneSprite");
		playerTwo = twoPlayer.getChildByName("playerTwoSprite");

		this.initializeListener();
		cc.log("INITIALIZED BUTTONS");
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
		cc.director.pushScene(new cc.TransitionFade(0.5,new PlayScene("TWO_PLAYER",this.playerOneName,this.playerTwoName)));
	}
});

var TwoPlayerScene = cc.Scene.extend({
  	onEnter:function () {
        this._super();
        this.addChild(new TwoPlayerLayer());
    }
});