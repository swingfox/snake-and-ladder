var PlayLayer = cc.Layer.extend({
	scene:null,
	woodSprite:null,
	btnOK:null,
	dice:null,
	firstPlayer:null,
	secondPlayer:null,
	sec:null,
	min:null,
	timeText:null,
	turnText:null,
	rollSprite:null,
	diceSprite1:null,
	diceSprite2:null,
	diceSprite3:null,
	diceSprite4:null,
	diceSprite5:null,
	diceSprite:null,
	btnRoll:null,
	deltaX:100,
	rollOnce:false,
	_playerOneName:null,
	_playerTwoName:null,
	ctor:function(typeOfGame,playerOneName,playerTwoName){
		this._super();
		this._playerOneName = playerOneName;
		this._playerTwoName = playerTwoName;
		this.init();
		cc.log("TYPE OF GAME: " + typeOfGame);
		cc.log("PLAYER TWO: " + this._playerTwoName);

	},
	readTextFile:function(file)
	{
	   /* var rawFile = new XMLHttpRequest();
	    rawFile.open("GET", file, true);
	    rawFile.onreadystatechange = function ()
	    {
	        if(rawFile.readyState === 4)
	        {
	            if(rawFile.status === 200 || rawFile.status == 0)
	            {
	                var allText = rawFile.responseText;
	                alert(allText);
	            }
	        }
	    }
	    rawFile.send(null);*/
	    cc.loader.loadTxt("res/text.txt", function(error, data){
    		cc.log(data); //data is the json object
		});
		// You should do a check before using it
	if (cc.sys.isNative) {
	    jsb.fileUtils;
		jsb.fileUtils.writeStringToFile("TRY!","text2.txt");
	}
	else
		cc.log("NOT SUPPORTED!");
	},
	computer:function(){
		this.rollTheDice();
	},
	init:function(){
		
		scene = ccs.load(res.PlayScene).node;
		woodSprite = scene.getChildByName("woodSprite");
		timeText = woodSprite.getChildByName("timeText");
		turnText= woodSprite.getChildByName("turnText");
		rollSprite = woodSprite.getChildByName("rollSprite");
		diceSprite = woodSprite.getChildByName("dice1Sprite");
		diceSprite1 = woodSprite.getChildByName("dice1Sprite");
		btnRoll = scene.getChildByName("btnRoll");
		cc.log("BUTTON: " + btnRoll);
		diceSprite2 = new cc.Sprite(res.dice2);
		diceSprite3 = new cc.Sprite(res.dice3);
		diceSprite4 = new cc.Sprite(res.dice4);
		diceSprite5 = new cc.Sprite(res.dice5);
		var delay = cc.DelayTime.create(5);
		this.initializeObjects();
		this.addChild(scene);
		this.readTextFile("file:///C:/Users/Totz/Desktop/text.txt");
		this.initializeListeners();
		this.firstPlayer = cc.Sprite.create();
		this.firstPlayer.setColor(cc.color(0,0,0));
		this.firstPlayer.setPosition(20, 50);
		this.firstPlayer.setTextureRect(cc.rect(0, 0, 15, 15));
		this.firstPlayer.setOpacity(255);
		this.addChild(this.firstPlayer, 2);

    	var rotate1 = cc.rotateBy(1, 360);
    	var rotate2 = cc.rotateBy(2, 360);

    	turnText.setString(this._playerOneName);
   		

    	this.secondPlayer = cc.Sprite.create();
		this.secondPlayer.setColor(cc.color(255,255,255));
		this.secondPlayer.setPosition(20, 20);
		this.secondPlayer.setTextureRect(cc.rect(0, 0, 15, 15));
		this.secondPlayer.setOpacity(255);
		this.addChild(this.secondPlayer, 2);
    	var rotate = cc.RotateBy.create(1, 360);
    	this.secondPlayer.runAction(cc.repeatForever(rotate2));
    //	this.runFirstPlayer(90,50);
    	this.min = 0;
    	this.sec = 0;
    	btnRoll.addTouchEventListener(this.rollTheDice,this);
    /*  var ebox = cc.EditBox.create(cc.Size(170, 50), cc.Scale9Sprite.create("res/images/button.png"), cc.Scale9Sprite.create("res/images/button.png"));
    ebox.setPlaceHolder("Password");
    ebox.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
    ebox.setPosition(cc.p(20,20));
    ebox.setFontColor({"r": 0, "g": 0, "b": 0});
    ebox.setDelegate(this);
    this.addChild(ebox,1);*/

        var secondAction = cc.moveTo(2,cc.p(100,100));
      	var firstAction = cc.moveBy(0.5,cc.p(70,0));
		 var sequenceOne = cc.Sequence.create(firstAction,rotate1);
        this.firstPlayer.runAction(sequenceOne.repeatForever());

       
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
		         	break;
		         	case 2:
		         	diceSprite = diceSprite2;
		         	break;
		         	case 3:
		         	diceSprite = diceSprite3;
		         	break;
		         	case 4:
		         	diceSprite = diceSprite4;
		         	break;
		         	case 5:
		         	diceSprite = diceSprite5;
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
    initializeListeners:function(){
            //Create a "one by one" touch event listener (processes one touch at a time)
            this.touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            // When "swallow touches" is true, then returning 'true' from the onTouchBegan method will "swallow" the touch event, preventing other listeners from using it.
            swallowTouches: true,
            //onTouchBegan event callback function                      
            onTouchBegan: function (touch, event) { 
                // event.getCurrentTarget() returns the *listener's* sceneGraphPriority node.   
                var target = event.getCurrentTarget();  

                //Get the position of the current point relative to the button
                var locationInNode = target.convertToNodeSpace(touch.getLocation());    
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                var name = target.getName();
                
                if (cc.rectContainsPoint(rect, locationInNode)) {            
                    cc.log("Sprite Name: " + name);  cc.log("Target Name: " + target.getParent().getName());
                   
                    if(name=="homeSprite"){
                        target.opacity = 180;
                        if(optionsNode.isVisible()){
                            optionsNode.setVisible(false);
                        }
                        else{
                            optionsNode.setVisible(true);
                        }
                    }
                }
            }
        });
            this.manageListeners();
            cc.log("INITIALIZED LISTENERS");
    },
     manageListeners:function(){
        cc.eventManager.addListener(this.touchListener, rollSprite);
    },
	getDigits:function(digit){
		var i = 0;
		while(digit>0){
			i++;
			digit /= 10;
		}
		return i;
	},
	initializeObjects:function(){
		cc.log("INITIALIZED OBJECTS");
	},
	runFirstPlayer:function(x,y){
		for(var i = x; i < 100; i++){
			this.firstPlayer.setPosition(x+i,y);
		}
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