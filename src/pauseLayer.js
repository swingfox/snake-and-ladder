var PauseLayer = cc.LayerColor.extend({
    jsonfile:null,
    closeButton:null,   
    modal:false,
    rootNode:null,
    /** Constructor
     * @param {jsonfile}
     * @param {modal}
     */
    ctor:function (jsonfile,closeButton,modal,targets,btnRoll,layer) {
        this.jsonfile = jsonfile;
        this.closeButton = closeButton;
        this.modal = modal;     
        this._pausedTargets = targets;
        this._btnRoll = btnRoll;
        this._layer = layer;
        this._super();
        this.init();
 
        // Make layer touchable
        var listener1 = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
 
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                var objectName = target.getName();
                if (cc.rectContainsPoint(rect, locationInNode)) {
                    cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                    return true;
                }
                     
                return false;
            },
            //function drag layer
            onTouchMoved: function (touch, event) {
                var delta = touch.getDelta();
            },
            onTouchEnded: function (touch, event) {

            }
        });
 
        cc.eventManager.addListener(listener1, this);        
 
    },
    init:function () {
        this._super(cc.color(0, 0, 0, 120));
        var winSize = cc.director.getWinSize();
 
        this.rootNode = ccs.load(this.jsonfile);
 
        var centerPos = cc.p(winSize.width / 2, winSize.height / 2);

        this.addChild(this.rootNode.node,100);
 
        var button = this.rootNode.node.getChildByName( this.closeButton );  
 
        if(button !== null) {
            button.addTouchEventListener( this.closeTouchEvent, this );
        }
 
        // this.addTouchEventListener( this.swalowTouchEvent, this );
    },
    onRestart:function (sender) {
        cc.director.resume();
    },
    closeTouchEvent: function(sender, type){
        //cc.log(sender);
        var objectName = sender.getName();
        switch (type)
        {
        case ccui.Widget.TOUCH_BEGAN: 
             
            break;
 
        case ccui.Widget.TOUCH_MOVED:
 
            break;
 
        case ccui.Widget.TOUCH_ENDED:
            cc.log(sender.getName());
            cc.director.resume();

            if(objectName == "pause"){
                if(cc.sys.localStorage.getItem("sounds")=="on")
                    cc.audioEngine.playEffect(res.ClickPlay);
                sender.getParent().getParent().removeFromParent(true);
                cc.log("PAUSED GAME!");
                cc.director.getActionManager().resumeTargets(this._pausedTargets);
                var a= this._layer.getPlayer();
                if(a=="playerOne"){
                this._layer.schedule(this._layer.tick,1);
                cc.log("pause timer player one");
                }
                else if(a=="playerTwo"){
                this._layer.schedule(this._layer.tick2,1);
                cc.log("pause timer player two");
                }
                this._btnRoll.resume();
            }
            break;
 
        case ccui.Widget.TOUCH_CANCELLED:
 
            break;                
        }
    },
    swalowTouchEvent: function(sender, type){
        //cc.log(sender);
        switch (type)
        {
        case ccui.Widget.TOUCH_BEGAN:
            return false;
            break;
 
        case ccui.Widget.TOUCH_MOVED:
 
            break;
 
        case ccui.Widget.TOUCH_ENDED:
 
            break;
 
        case ccui.Widget.TOUCH_CANCELLED:
 
            break;                
        }
    }
});