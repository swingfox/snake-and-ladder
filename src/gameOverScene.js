var GameOverLayer = cc.Layer.extend({
	ctor:function () {
        this._super();
        this.init();
        var size = cc.winSize;

        return true;
    }
});

var GameOverScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameOverLayer();
        this.addChild(layer);
    }
});

