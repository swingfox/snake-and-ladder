var AnswerResultLayer = cc.Layer.extend({
	ctor:function(question,answerCheck,yourAnswer,rightAnswer,player,lifePoints) {
		this._super();
		this.init(question,answerCheck,yourAnswer,rightAnswer,player,lifePoints);
	},init:function(question,answerCheck,yourAnswer,rightAnswer,player,lifePoints){
		scene = ccs.load(res.answerResultScene).node;
		this.question = scene.getChildByName("question");
		this.rightAnswer = scene.getChildByName("rightAnswer");
		this.yourAnswer = scene.getChildByName("yourAnswer");
		this.answerDescription = scene.getChildByName("answerDescription");
		this.btnOK = scene.getChildByName("btnOK");
		this.initializeListeners();

		this.question.setString(question);
		this.rightAnswer.setString(answerCheck);
		this.yourAnswer.setString(yourAnswer);
		this.rightAnswer.setString(rightAnswer);
		wrongMsg = "Oops! " + player + " you got the wrong answer. 5 points deduction to your life, you only have " + lifePoints + " lifepoints left.";
		correctMsg = "Congrats! you got the right answer.";

		if(yourAnswer==rightAnswer){
			this.answerDescription.setString(correctMsg);
		}
		else
			this.answerDescription.setString(wrongMsg);

		
		this.addChild(scene);
	},
    initializeListeners:function(){
	    	var main = this;
			this.touchListener = cc.EventListener.create({
		    event: cc.EventListener.TOUCH_ONE_BY_ONE,
		    swallowTouches: true,
		    onTouchBegan: function (touch, event) {	
			    var target = event.getCurrentTarget();	

			    var locationInNode = target.convertToNodeSpace(touch.getLocation());	
			    var s = target.getContentSize();
			    var rect = cc.rect(0, 0, s.width, s.height);
			    var objectName = target.getName();

			    if (cc.rectContainsPoint(rect, locationInNode)) {	
		
				    return true;
			    }
			    return false;
		    },
		    onTouchEnded: function (touch, event) {			
			    var target = event.getCurrentTarget();
			    var locationInNode = target.convertToNodeSpace(touch.getLocation());	
			    var s = target.getContentSize();
			    var rect = cc.rect(0, 0, s.width, s.height);
			    var objectName = target.getName();

			    if (cc.rectContainsPoint(rect, locationInNode)) {	
				   	if(objectName=="btnOK")
				   		main.goBack();
				}

		    }
		});

			 cc.eventManager.addListener(this.touchListener, this.btnOK);
	},
	goBack:function(){
		if(cc.sys.localStorage.getItem("sounds")=="on")
        	cc.audioEngine.playEffect(res.ClickPlay);
		cc.director.popToSceneStackLevel(3);
	}
});

var AnswerResultScene = cc.Scene.extend({
	ctor:function(question,answerCheck,yourAnswer,rightAnswer,player,lifePoints){
		this._super();
		this.layer = new AnswerResultLayer(question,answerCheck,yourAnswer,rightAnswer,player,lifePoints);
		this.addChild(this.layer);
	}
});