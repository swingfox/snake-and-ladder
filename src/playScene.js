var PlayLayer = cc.Layer.extend({
	scene:null,
	woodSprite:null,
	btnOK:null,
	dice:null,
	ctor:function(){
		this._super();
		this.init();
	},
	init:function(){
		scene = ccs.load(res.PlayScene).node;
		woodSprite = scene.getChildByName("woodSprite");
		this.initializeObjects();
		this.addChild(scene);
	},
	initializeObjects:function(){
		cc.log("INITIALIZED OBJECTS");
	}
});


var PlayScene = cc.Scene.extend({
	onEnter:function () {
        this._super();
        var layer = new PlayLayer();
        this.addChild(layer);
    }
});