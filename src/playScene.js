var PlayLayer = cc.Layer.extend({
	scene:null,
	woodSprite:null,
	btnOK:null,
	dice:null,
	firstPlayer:null,
	secondPlayer:null,
	timeText:null,
	turnText:null,
	rollSprite:null,
	btnRoll:null,
	deltaX:100,
	rollOnce:false,
	_playerOneName:null,
	_playerTwoName:null,
	_number:null,
	_gap:5,
	_FIXED_POINT:70,
	_ladderOne:null,
	movesCount:null,
	ctor:function(typeOfGame,playerOneName,playerTwoName){
		this._super();
		this._playerOneName = playerOneName;
		this._playerTwoName = playerTwoName;
		this.init();
		cc.log("TYPE OF GAME: " + typeOfGame);
		cc.log("PLAYER TWO: " + this._playerTwoName);

	},
	computer:function(){
		this.rollTheDice();
	},
	diceSprite1:null,
	diceSprite2:null,
	diceSprite3:null,
	diceSprite4:null,
	diceSprite5:null,
	diceSprite:null,
	init:function(){
		scene = ccs.load(res.PlayScene).node;
		woodSprite = scene.getChildByName("woodSprite");
		timeText = woodSprite.getChildByName("timeText");
		turnText=  new cc.LabelTTF(this._playerOneName, "Arial", 28, cc.size(510, 100), cc.TEXT_ALIGNMENT_CENTER);
	    turnText.setName("txtAnswer1");
	    turnText.attr({
	        x: 800,
	        y: 550
	    });
	    turnText.setColor(cc.color(0,0,0,50));

		turnText.setAnchorPoint(cc.p(0.5,0.5));
   		turnText.setLocalZOrder(100);
	    this.addChild(turnText);
		diceSprite = woodSprite.getChildByName("dice1Sprite");
		diceSprite1 = woodSprite.getChildByName("dice1Sprite");
		btnRoll = scene.getChildByName("btnRoll");

		diceSprite2 = new cc.Sprite(res.dice2);
		diceSprite3 = new cc.Sprite(res.dice3);
		diceSprite4 = new cc.Sprite(res.dice4);
		diceSprite5 = new cc.Sprite(res.dice5);


		
    	
    	btnRoll.addTouchEventListener(this.rollTheDice,this);
      
        this._number =1;
    	
        this.initializeRectangles();
        this.timer();
        this.scheduleUpdate();

      
        this.addChild(scene);	         
	},
	ladderOneExited:false,
    update:function(dt){
		var playerOneBounding = this.firstPlayer.getBoundingBox();
		var ladderOneBounding = this._ladderOne.getBoundingBox();
		var ladderOneSequence = cc.Sequence.create(cc.delayTime(1), cc.callFunc(this.newScene,this));
		if(cc.rectIntersectsRect(playerOneBounding,ladderOneBounding)){
			cc.log("INSIDE LADDER");
			
				this.firstPlayer.runAction(ladderOneSequence);
		}
		else cc.log("OUTSIDE RECTANGLE");
    },
    newScene:function(node){
    	if(this.ladderOneExited==false){
    		cc.director.pushScene(new QuestionScene());
    		this.ladderOneExited = true;
   		}
    },
    rect0:null,
	rect1:null,
	rect2:null,
	rect3:null,
	rect4:null,
	rect5:null,
	rect6:null,
	rect7:null,
	rect8:null,
	rect9:null,
	initializeRectangles:function(){
		this.firstPlayer = cc.Sprite.create();
		this.firstPlayer.setColor(cc.color(0,0,0));
		this.firstPlayer.setPosition(20, 45);
		this.firstPlayer.setTextureRect(cc.rect(0, 0, 15, 15));
		this.firstPlayer.setOpacity(255);
		this.addChild(this.firstPlayer, 2);

		this._ladderOne = cc.Sprite.create();
		this._ladderOne.setColor(cc.color(0,0,0));
		this._ladderOne.setPosition(475, 35);
		this._ladderOne.setTextureRect(cc.rect(0, 0, 60, 60));
		this._ladderOne.setOpacity(0);
		this.addChild(this._ladderOne, 2);

		

		this.secondPlayer = cc.Sprite.create();
		this.secondPlayer.setColor(cc.color(255,255,255));
		this.secondPlayer.setPosition(20, 20);
		this.secondPlayer.setTextureRect(cc.rect(0, 0, 15, 15));
		this.secondPlayer.setOpacity(255);
		this.addChild(this.secondPlayer, 2);
    	var rotate = cc.RotateBy.create(1, 360);
    	var rotate2 = cc.rotateBy(2, 360);
    	var secondAction = cc.moveTo(2,cc.p(100,100));
    	this.secondPlayer.runAction(cc.repeatForever(rotate2));



    	this.rect0 = cc.Sprite.create();
		this.rect0.setColor(cc.color(0,0,0));
		this.rect0.setPosition(603, 35);
		this.rect0.setTextureRect(cc.rect(0, 0, 60, 60));
		this.rect0.setOpacity(255);
		this.addChild(this.rect0, 2);

		this.rect1 = cc.Sprite.create();
		this.rect1.setColor(cc.color(0,0,0));
		this.rect1.setPosition(603, 160);
		this.rect1.setTextureRect(cc.rect(0, 0, 60, 60));
		this.rect1.setOpacity(255);
		this.addChild(this.rect1, 2);

		this.rect2 = cc.Sprite.create();
		this.rect2.setColor(cc.color(0,0,0));
		this.rect2.setPosition(603, 290);
		this.rect2.setTextureRect(cc.rect(0, 0, 60, 60));
		this.rect2.setOpacity(255);
		this.addChild(this.rect2, 2);

		this.rect3 = cc.Sprite.create();
		this.rect3.setColor(cc.color(0,0,0));
		this.rect3.setPosition(603, 420);
		this.rect3.setTextureRect(cc.rect(0, 0, 60, 60));
		this.rect3.setOpacity(255);
		this.addChild(this.rect3, 2);

		this.rect4 = cc.Sprite.create();
		this.rect4.setColor(cc.color(0,0,0));
		this.rect4.setPosition(603, 545);
		this.rect4.setTextureRect(cc.rect(0, 0, 60, 60));
		this.rect4.setOpacity(255);
		this.addChild(this.rect4, 2);

		this.rect5 = cc.Sprite.create();
		this.rect5.setColor(cc.color(0,0,0));
		this.rect5.setPosition(31, 100);
		this.rect5.setTextureRect(cc.rect(0, 0, 60, 60));
		this.rect5.setOpacity(255);
		this.addChild(this.rect5, 2);

		this.rect6 = cc.Sprite.create();
		this.rect6.setColor(cc.color(0,0,0));
		this.rect6.setPosition(31, 225);
		this.rect6.setTextureRect(cc.rect(0, 0, 60, 60));
		this.rect6.setOpacity(255);
		this.addChild(this.rect6, 2);

		this.rect7 = cc.Sprite.create();
		this.rect7.setColor(cc.color(0,0,0));
		this.rect7.setPosition(31, 353);
		this.rect7.setTextureRect(cc.rect(0, 0, 60, 60));
		this.rect7.setOpacity(255);
		this.addChild(this.rect7, 2);

		this.rect8 = cc.Sprite.create();
		this.rect8.setColor(cc.color(0,0,0));
		this.rect8.setPosition(31, 481);
		this.rect8.setTextureRect(cc.rect(0, 0, 60, 60));
		this.rect8.setOpacity(255);
		this.addChild(this.rect8, 2);

		this.rect9 = cc.Sprite.create();
		this.rect9.setColor(cc.color(0,0,0));
		this.rect9.setPosition(31, 609);
		this.rect9.setTextureRect(cc.rect(0, 0, 60, 60));
		this.rect9.setOpacity(255);
		this.addChild(this.rect9, 2);
	},
	sec:null,
	min:null,
	timer:function(){
		this.min = 0;
    	this.sec = 0;
		cc.director.getScheduler().scheduleCallbackForTarget(this,function(){
    		 var strMin = "";
    		 var strSec = "";
    		 if(this.sec==59){
	    		this.sec = 0;
	    		this.min++;
	    	  }
    		 if(this.min<10)
    		 	strMin = "0";
    		 if(this.sec<10)
    		 	strSec = "0";
	         timeText.setString(strMin+this.min+":"+strSec+this.sec++);
	          },1);
	},
	goUp:function(){

	},
	singlePlayer:function(){

	},
	doublePlayer:function(){

	},
	rollTheDice:function(){
			//var rotate1 = cc.rotateBy(2, 360);
		if(this.rollOnce==false){
				  var random =this.getRandomBySix();
		          cc.log("RANDOM: " + random);
		          var clone = new cc.Sprite(diceSprite);
		          cc.log("scale X: " + diceSprite.getScaleX() + " " + "scale Y: " + diceSprite.getScaleY());
		         diceSprite.removeFromParent(true);
		         switch(random){
		         	case 1:
		         	diceSprite = diceSprite1;
		         	this._number = 1;
		         	this.runFirstPlayer();
		         	break;
		         	case 2:
		         	diceSprite = diceSprite2;
		         	this._number = 2;
		         	this.runFirstPlayer();
		         	break;
		         	case 3:
		         	diceSprite = diceSprite3;
		         	this._number = 3;
		         	this.runFirstPlayer();
		         	break;
		         	case 4:
		         	diceSprite = diceSprite4;
		         	this._number = 4;
		         	this.runFirstPlayer();
		         	break;
		         	case 5:
		         	diceSprite = diceSprite5;
		         	this._number = 5;
		         	this.runFirstPlayer();	
		         	break;
		         }
		         diceSprite.setScaleX(0.53);
		         diceSprite.setScaleY(0.49);
		         diceSprite.setPosition(805,216);
			  	 this.addChild(diceSprite);
			  	 this.rollOnce = true;
       	}

       	else 
       		this.rollOnce = false;

	},
	getRandomBySix:function(){
        return Math.floor(((Math.random() * 10)%6)+1);
    },
	getDigits:function(digit){
		var i = 0;
		while(digit>0){
			i++;
			digit /= 10;
		}
		return i;
	},
	_moves:0,
	countMoves:function(){
		cc.delayTime(0.5);
		this._moves++;
		cc.log("INCREMENTED: " + this._moves);
	},
	runFirstPlayer:function(x,y){
		var rotate1 = cc.rotateBy(1, 360);
		var first = cc.moveBy(0.5,cc.p(65,0));
		var second = cc.moveBy(1,cc.p(60,0));
		var third = cc.moveBy(1,cc.p(60,0));
		var fifth = cc.moveBy(1,cc.p(65,0));
		var sequenceOne;
		this.movesCount = 0;

		 var check = cc.CallFunc.create(function(node) {
                        if(cc.rectContainsPoint(this.firstPlayer, this._ladderOne)){
			//				cc.log("INSIDE RECTANGLE");
						}
					//	else cc.log("OUTSIDE RECTANGLE");
        }, this);  

		switch(this._number){
			case 1:
			sequenceOne = cc.Sequence.create(cc.callFunc(this.countMoves,this),first);
			break;
			case 2:
			sequenceOne = cc.Sequence.create(cc.callFunc(this.countMoves,this),first,cc.callFunc(this.countMoves,this),first);
			break;
			case 3:
			sequenceOne = cc.Sequence.create(cc.callFunc(this.countMoves,this),first,cc.callFunc(this.countMoves,this),first,cc.callFunc(this.countMoves,this),first);
			break;
			case 4:
			sequenceOne = cc.Sequence.create(cc.callFunc(this.countMoves,this),first,cc.callFunc(this.countMoves,this),first,cc.callFunc(this.countMoves,this),first,cc.callFunc(this.countMoves,this),first);
			break;
			case 5:
			sequenceOne = cc.Sequence.create(cc.callFunc(this.countMoves,this),first,cc.callFunc(this.countMoves,this),first,cc.callFunc(this.countMoves,this),first,cc.callFunc(this.countMoves,this),first,cc.callFunc(this.countMoves,this),first);
			break;
		}
        this.firstPlayer.runAction(sequenceOne);
        this.firstPlayer.runAction(rotate1.repeatForever());
       // this.firstPlayer.stopAction(sequenceOne);s
  
       this._number = 0;
       this._gap += 1; 
	}
});


var PlayScene = cc.Scene.extend({
	ctor:function (typeOfGame,playerOneName,playerTwoName) {
    		this._super();
    		var layer = new PlayLayer(typeOfGame,playerOneName,playerTwoName);
        	this.addChild(layer);
    },
	onEnter:function () {
        this._super();
    }
});