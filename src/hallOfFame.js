var HallOfFameLayer = cc.Layer.extend({
	ctor:function () {
		this._super();
		this.init();
	},
	init:function(){
		scene = ccs.load(res.HallOfFameScene).node;
		hallOfFameSprite = scene.getChildByName("hallOfFameSprite");
		
		this.initializeButtons();
		this.initializeTextViews();
		this.loadPlayers();
		this.checkTextViewsIfNull();
		this.addChild(scene);
	},
	initializeTextViews:function(){
		/////////       EASY MODE 			/////////////

		// SINGLE PLAYER
		this.easyFirstSingle = scene.getChildByName("easyFirstSingle");
		this.easySecondSingle = scene.getChildByName("easySecondSingle");
		this.easyThirdSingle = scene.getChildByName("easyThirdSingle");

		// TWO PLAYER
		this.easyFirstMulti = scene.getChildByName("easyFirstMulti");
		this.easySecondMulti = scene.getChildByName("easySecondMulti");
		this.easyThirdMulti = scene.getChildByName("easyThirdMulti");

		/////////       HARD MODE 			/////////////

		// SINGLE PLAYER
		this.hardFirstSingle = scene.getChildByName("hardFirstSingle");
		this.hardSecondSingle = scene.getChildByName("hardSecondSingle");
		this.hardThirdSingle = scene.getChildByName("hardThirdSingle");

		// TWO PLAYER
		this.hardFirstMulti = scene.getChildByName("hardFirstMulti");
		this.hardSecondMulti = scene.getChildByName("hardSecondMulti");
		this.hardThirdMulti = scene.getChildByName("hardThirdMulti");
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
	},
	loadPlayers:function(){
		var storage = cc.sys.localStorage;

		this.easyFirstSingle.setString(storage.getItem("easyFirstSingle"));
		this.easySecondSingle.setString(storage.getItem("easySecondSingle"));
		this.easyThirdSingle.setString(storage.getItem("easyThirdSingle"));
		this.easyFirstMulti.setString(storage.getItem("easyFirstMulti"));
		this.easySecondMulti.setString(storage.getItem("easySecondMulti"));
		this.easyThirdMulti.setString(storage.getItem("easyThirdMulti"));


		this.hardFirstSingle.setString(storage.getItem("hardFirstSingle"));
		this.hardSecondSingle.setString(storage.getItem("hardSecondSingle"));
		this.hardThirdSingle.setString(storage.getItem("hardThirdSingle"));
		this.hardFirstMulti.setString(storage.getItem("hardFirstMulti"));
		this.hardSecondMulti.setString(storage.getItem("hardSecondMulti"));
		this.hardThirdMulti.setString(storage.getItem("hardThirdMulti"));
	},
	checkTextViewsIfNull:function(){
		var storage = cc.sys.localStorage;

		if(storage.getItem("easyFirstSingle")==null)
			this.easyFirstSingle.setString("");
		if(storage.getItem("easySecondSingle")==null)
			this.easySecondSingle.setString("");
		if(storage.getItem("easyThirdSingle")==null)
			this.easyThirdSingle.setString("");
		if(storage.getItem("easyFirstMulti")==null)
			this.easyFirstMulti.setString("");
		if(storage.getItem("easySecondMulti")==null)
			this.easySecondMulti.setString("");
		if(storage.getItem("easyThirdMulti")==null)
			this.easyThirdMulti.setString("");

		if(storage.getItem("hardFirstSingle")==null)
			this.hardFirstSingle.setString("");
		if(storage.getItem("hardSecondSingle")==null)
			this.hardSecondSingle.setString("");
		if(storage.getItem("hardThirdSingle")==null)
			this.hardThirdSingle.setString("");
		if(storage.getItem("hardFirstMulti")==null)
			this.hardFirstMulti.setString("");
		if(storage.getItem("hardSecondMulti")==null)
			this.hardSecondMulti.setString("");
		if(storage.getItem("hardThirdMulti")==null)
			this.hardThirdMulti.setString("");
	}
});

var HallOfFameScene = cc.Scene.extend({
  	onEnter:function () {
        this._super();
        var layer = new HallOfFameLayer();
        this.addChild(layer);
    }
});