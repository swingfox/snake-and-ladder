var InstructionLayer = cc.Layer.extend({
	scene:null,
	btnOK:null,
	instruction:null,
	ctor:function () {
		this._super();
		this.init();
	},
	init:function(){
		scene = ccs.load(res.InstructionScene).node;
		instruction = scene.getChildByName("instructionScene");
		this.initializeButtons();
		this.addChild(scene);
	},
	initializeButtons:function(){
		btnOK = instruction.getChildByName("btnOK");
		this.initializeListener();
		cc.log("INITIALIZED BUTTONS");
	},
	initializeListener:function(){
		btnOK.addTouchEventListener(this.goBack,this);
	},
	goBack:function(){
		cc.director.popScene();
	}
});

var InstructionScene = cc.Scene.extend({
	onEnter:function () {
        this._super();
        var layer = new InstructionLayer();
        this.addChild(layer);
    }
});