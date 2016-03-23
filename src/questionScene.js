var QuestionLayer = cc.Layer.extend({
	scene:null,
	credits:null,
	btnOK:null,
	ctor:function(){
		this._super();
		this.init();
	},
	init:function(){
		scene = ccs.load(res.QuestionScene).node;
		credits = scene.getChildByName("questionSprite");
		this.initializeButtons();
		this.addChild(scene);
	},
    initializeButtons:function(){
        btnOK = credits.getChildByName("btnOK");
        cc.log("INITIALIZED BUTTONS ");
        this.initializeListener();
    },
	initializeListener:function(){
		btnOK.addTouchEventListener(this.goBack,this);
	},
	goBack:function(){
		cc.director.popScene();
	}
});

var QuestionScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new QuestionLayer();
        this.addChild(layer);
    }
});

