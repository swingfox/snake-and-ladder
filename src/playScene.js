var PlayLayer = cc.Layer.extend({
	firstPlayer:null,
	secondPlayer:null,
	btnRoll:null,
	_playerOneName:null,
	_playerTwoName:null,
	ctor:function(typeOfGame,playerOneName,playerTwoName,playScene){
		this._super();
		this._playerOneName = playerOneName;
		this._playerTwoName = playerTwoName;
		this.init();
		this.initializeListeners();
		cc.log("TYPE OF GAME: " + typeOfGame);
		this.checkMusic();
		this.storage = cc.sys.localStorage;

		this.storage.setItem("questionAnswer","null");

		// flag = 0 is white flag, 1 is black flag
		this.storage.setItem("flag","1");
		this.storage.setItem("switch","0");

		this._typeOfGame = typeOfGame;
		if(typeOfGame=="SINGLE_PLAYER"){
			this._playerTwoName = "computer";
			this.storage.setItem("life2","---");
		}
		if(typeOfGame=="TWO_PLAYER"){
			this.storage.setItem("life2","100");
		}

		this._movesWhite = 0;
		this.totalMovesWhite = 0;

		this.schedule(this.resetMoves,0.3);

		this.schedule(this.finishingSquareCheck,0.5);
		this.schedule(this.checkLifeOver,0.1);
	
		this.pausePopUp = false;


	},
	finishingSquareCheck:function(){
		var playerOneBounding;
    	var playerTwoBounding;
    	var playerName = "computer";
    	var minute = "00";
    	var seconds = "00";

    	if(turnText != null)
    		playerName = turnText.getString();

    	if(this.firstPlayer!=null)
    		playerOneBounding = this.firstPlayer.getBoundingBox();
    	
    	if(this.secondPlayer!=null)
    		playerTwoBounding = this.secondPlayer.getBoundingBox();

    	if(this.storage.getItem("player")=="playerOne"){
    		minute = this.min;
    		seconds = this.sec;
    	}
    	else if(this.storage.getItem("player")=="playerTwo"){
    		minute = this.min2;
    		seconds = this.sec2;
    	}

			if(cc.rectIntersectsRect(playerOneBounding,this.cornerRect[9].getBoundingBox())){
				cc.audioEngine.end();
				
				this.stopPlayerActions();
				cc.log("TOTAL TIME: "+ minute +" mins " + seconds + " secs");
				cc.director.pushScene(new cc.TransitionFade(0,new CongratulationsScene(playerName,minute,seconds,this._typeOfGame)));
			}

			if(this._typeOfGame=="SINGLE_PLAYER" && cc.rectIntersectsRect(playerTwoBounding,this.cornerRect[9].getBoundingBox())){
				cc.audioEngine.end();
				cc.log("SINGLE + WHITE");
				this.stopPlayerActions();
				cc.log("TOTAL TIME: "+ minute +" mins " + seconds + " secs");

				cc.director.pushScene(new cc.TransitionFade(0,new GameOverScene(playerName,this._typeOfGame)));
			}
			else if(this._typeOfGame=="TWO_PLAYER" && cc.rectIntersectsRect(playerTwoBounding,this.cornerRect[9].getBoundingBox())){
				cc.audioEngine.end();
				cc.log("TWO + WHITE");
				this.stopPlayerActions();
				cc.log("TOTAL TIME: "+ minute +" mins " + seconds + " secs");
				
				cc.director.pushScene(new cc.TransitionFade(0,new CongratulationsScene(playerName,minute,seconds,this._typeOfGame)));
			}
		
	},
	checkLifeOver:function(){
		var c = cc.sys.localStorage;
		var l;
		var l2;
		if(c.getItem("life") != undefined || c.getItem("life") != null){
			l = parseInt(c.getItem("life"));
		}
		if(c.getItem("life2") != undefined || c.getItem("life2") != null){
			l2 = parseInt(c.getItem("life2"));
		}

		if(turnText != null)
    		playerName = turnText.getString();

		if(l == 0){
			cc.director.pushScene(new cc.TransitionFade(0,new GameOverScene(this._playerOneName,this._typeOfGame)));
		}

		if(l2 == 0 && this._typeOfGame=="TWO_PLAYER"){
			cc.director.pushScene(new cc.TransitionFade(0,new GameOverScene(this._playerTwoName,this._typeOfGame)));
		}

	},
	stopPlayerActions:function(){
		this.firstPlayer.stopAction(this.blackDiceAction);
		this.secondPlayer.stopAction(this.whiteDiceAction);
	},
	onEnter:function(){
		this._super();
	},
	playerCheck:function(){
		if(this.blackCheck() && this.btnRollClicked == true && this._typeOfGame == "SINGLE_PLAYER" && this.storage.getItem("player")=="playerOne"){ // RUN THIS AFTER BLACK FINISHES
			this.computer();
			this.btnRollClicked = false;
			this.storage.setItem("player","null");
		}
	},
	whiteCheck:function(){
		var ok = false;
		if(this.whiteDiceAction != null && this.whiteDiceAction.isDone())
			ok = true;
		return ok;
	},
	blackCheck:function(){
		var ok = false;
		if(this.blackDiceAction!=null && this.blackDiceAction.isDone())
			ok = true;
		return true;
	},
	checkEffects:function(){

	},
	debugInformation:function(){
		cc.log("first player rectangle x: " + this.firstPlayer.x + " y: " + this.firstPlayer.y);
		cc.log("second player rectangle x: " + this.secondPlayer.x + " y: " + this.secondPlayer.y);

	},
	checkMusic:function(){
		if(cc.sys.localStorage.getItem("music")=="off"){
			if(cc.audioEngine.isMusicPlaying())
				cc.audioEngine.end();
		}
		else
			this.playMusic();
	},
	playMusic:function(){
        cc.audioEngine.playMusic(res.BackgroundPlay, true);
	},
	stopMusic:function(){
        cc.audioEngine.stopMusic();
	},
	computer:function(){
	    cc.eventManager.removeListener(this.touchListener);
		this.rollTheDice();
		cc.log("COMPUTER PLAYING");
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

		turnText=  new cc.LabelTTF(this._playerOneName, "neuropol x rg", 28, cc.size(510, 100), cc.TEXT_ALIGNMENT_CENTER);
	    turnText.setName("txtAnswer1");
	    turnText.attr({x: 800,y: 550});
	    turnText.setColor(cc.color(0,0,0,50));
		turnText.setAnchorPoint(cc.p(0.5,0.5));
   		turnText.setLocalZOrder(100);
	    this.addChild(turnText);

		diceSprite = woodSprite.getChildByName("dice1Sprite");
		diceSprite1 = woodSprite.getChildByName("dice1Sprite");
		diceSprite2 = new cc.Sprite(res.dice2);
		diceSprite3 = new cc.Sprite(res.dice3);
		diceSprite4 = new cc.Sprite(res.dice4);
		diceSprite5 = new cc.Sprite(res.dice5);

		this.btnRoll = scene.getChildByName("btnRoll");

		lifeText = woodSprite.getChildByName("lifeText");

        this.stage = 1;
        this.stageWhite = 1;

        this.previousFlagValue = "";
    	
        this.initializeRectangles();
        this.timer();
        this.scheduleUpdate();
         
        this.addChild(scene);	
        this.totalMoves = 0;     


		var rotate1 = cc.rotateBy(1, 360);
        this.firstPlayer.runAction(rotate1.repeatForever());


		this.schedule(this.checkLadder,0.5);
		this.schedule(this.checkSliders,0.5);

		this.btnRollClicked = false;

		this.pauseSprite = scene.getChildByName("pauseSprite");
		cc.log("PAUSE SPRITE" + this.pauseSprite);


	},
	reinitializeListener:function(){
	    cc.eventManager.addListener(this.touchListener, this.btnRoll);
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
			    target.opacity = 180;
	
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
			    target.opacity = 255;
        		
        		if(main.storage.getItem("sounds")=="on")
        			cc.audioEngine.playEffect(res.ClickPlay);

        		if(objectName=="btnRoll"){
				    main.rollTheDice();
				    main.btnRollClicked = true;
	    			cc.eventManager.removeListener(main.touchListener);
				}
			}

	    }
	});

		this.pauseListener = cc.EventListener.create({
	    event: cc.EventListener.TOUCH_ONE_BY_ONE,
	    swallowTouches: true,
	    onTouchBegan: function (touch, event) {	
		    var target = event.getCurrentTarget();	
		    var locationInNode = target.convertToNodeSpace(touch.getLocation());	
		    var s = target.getContentSize();
		    var rect = cc.rect(0, 0, s.width, s.height);
		    var objectName = target.getName();

		    if (cc.rectContainsPoint(rect, locationInNode)) {	
			    target.opacity = 180;
	
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
			    target.opacity = 255;
        		
        		if(main.storage.getItem("sounds")=="on")
        			cc.audioEngine.playEffect(res.ClickPlay);

 					if(objectName=="pauseSprite"){
						main.pausePopUp = true;
					}
			}

	    }
	});
	    cc.eventManager.addListener(this.touchListener, this.btnRoll);
	    cc.eventManager.addListener(this.pauseListener.clone(), this.pauseSprite);
	},
	blackDiceAction:null,
	ladderRect:[],
    update:function(dt){
    	if(this.storage.getItem("player")=="playerOne"){
			lifeText.setString(this.storage.getItem("life"));
		}
		else
			lifeText.setString(this.storage.getItem("life2"));
    },
    checkSliders:function(){
    	var playerOneBounding = this.firstPlayer.getBoundingBox();
    	var playerTwoBounding = this.secondPlayer.getBoundingBox();
		var slidersBounding = [];
    	var player = turnText.getString() == this._playerOneName ? "playerOne" : "playerTwo";


		for(var i = 0 ; i < 5; i++){
			slidersBounding[i] = this.sliders[i].getBoundingBox();
		}

		if(cc.rectIntersectsRect(playerOneBounding,slidersBounding[0])){
			if(this.storage.getItem("questionAnswer")=="wrong" && this.storage.getItem("switch")=="0"){
				var action = [cc.moveTo(1,cc.p(280,20)),cc.moveTo(0.5,cc.p(280,45))];
				
				this.firstPlayer.runAction(cc.sequence(action[0],action[1]));
				this.secondPlayer.stopAction(this.whiteDiceAction);
				this.stage--;
				this.storage.setItem("questionAnswer","null");
				if(this.storage.getItem("sounds")=="on")
					cc.audioEngine.playEffect(res.ChutesShortPlay);
				this.scheduleOnce(this.reinitializeListener,1.8);

			}
			else if(this.blackDiceAction != null && this.blackDiceAction.isDone()==true){
    			this.firstPlayer.stopAction(this.blackDiceAction);	
    			if(player=="playerOne" && this._typeOfGame=="SINGLE_PLAYER")
					this.scheduleOnce(this.newScene,0);
    			else if(this._typeOfGame=="TWO_PLAYER")
					this.scheduleOnce(this.newScene,0.5);
				this.scheduleOnce(this.reinitializeListener,0.7);

			}
				this.storage.setItem("questionAnswer","null");
				cc.log("ON SLIDER 0");

		}

		else if(cc.rectIntersectsRect(playerOneBounding,slidersBounding[1])){
			if(this.storage.getItem("questionAnswer")=="wrong" && this.storage.getItem("switch")=="0"){
				var action = [cc.moveTo(1,cc.p(85,45))];
				
				this.firstPlayer.runAction(cc.sequence(action[0]));
				this.secondPlayer.stopAction(this.whiteDiceAction);
				this.stage-=3;
				this.storage.setItem("questionAnswer","null");
				if(this.storage.getItem("sounds")=="on")
					cc.audioEngine.playEffect(res.ChutesLongPlay);

				this.scheduleOnce(this.reinitializeListener,1.3);

			}
			else if(this.blackDiceAction != null && this.blackDiceAction.isDone()==true){
    			this.firstPlayer.stopAction(this.blackDiceAction);	
				if(player=="playerOne" && this._typeOfGame=="SINGLE_PLAYER")
					this.scheduleOnce(this.newScene,0);
    			else if(this._typeOfGame=="TWO_PLAYER")
					this.scheduleOnce(this.newScene,0.5);

				this.scheduleOnce(this.reinitializeListener,0.7);
			}
				this.storage.setItem("questionAnswer","null");
		cc.log("ON SLIDER 1");

		}

		else if(cc.rectIntersectsRect(playerOneBounding,slidersBounding[2])){
			if(this.storage.getItem("questionAnswer")=="wrong" && this.storage.getItem("switch")=="0"){
				var action = [cc.moveTo(1,cc.p(275,365)),cc.moveTo(1,cc.p(410,170))];
				
				this.firstPlayer.runAction(cc.sequence(action[0],action[1]));
				this.secondPlayer.stopAction(this.whiteDiceAction);
				this.stage-=7;
				this.storage.setItem("questionAnswer","null");

				this.scheduleOnce(this.reinitializeListener,2.3);

				cc.audioEngine.playEffect(res.ChutesLongPlay);
			}
			else if(this.blackDiceAction != null && this.blackDiceAction.isDone()==true){
    			this.firstPlayer.stopAction(this.blackDiceAction);	
    			if(player=="playerOne" && this._typeOfGame=="SINGLE_PLAYER")
					this.scheduleOnce(this.newScene,0);
    			else if(this._typeOfGame=="TWO_PLAYER")
					this.scheduleOnce(this.newScene,0.5);
				this.scheduleOnce(this.reinitializeListener,0.7);

			}
				this.storage.setItem("questionAnswer","null");
		cc.log("ON SLIDER 2");

		}

		else if(cc.rectIntersectsRect(playerOneBounding,slidersBounding[3])){
			if(this.storage.getItem("questionAnswer")=="wrong" && this.storage.getItem("switch")=="0"){
				var action = [cc.moveTo(1,cc.p(474,432)),cc.moveTo(1,cc.p(520,307)),cc.moveTo(0.5,cc.p(540,307))];
				
				this.firstPlayer.runAction(cc.sequence(action[0],action[1],action[2]));
				this.secondPlayer.stopAction(this.whiteDiceAction);
				this.stage-=4;
				this.storage.setItem("questionAnswer","null");

				this.scheduleOnce(this.reinitializeListener,2.8);


				cc.audioEngine.playEffect(res.ChutesLongPlay);
			}
			else if(this.blackDiceAction != null && this.blackDiceAction.isDone()==true){
    			this.firstPlayer.stopAction(this.blackDiceAction);	
    			if(player=="playerOne" && this._typeOfGame=="SINGLE_PLAYER")
					this.scheduleOnce(this.newScene,0);
    			else if(this._typeOfGame=="TWO_PLAYER")
					this.scheduleOnce(this.newScene,0.5);

				this.scheduleOnce(this.reinitializeListener,0.7);

			}
				this.storage.setItem("questionAnswer","null");
		cc.log("ON SLIDER 3");

		}

		else if(cc.rectIntersectsRect(playerOneBounding,slidersBounding[4])){
			if(this.storage.getItem("questionAnswer")=="wrong" && this.storage.getItem("switch")=="0"){
				var action = [cc.moveTo(1,cc.p(520,429)),cc.moveTo(0.5,cc.p(535,429))];
				
				this.firstPlayer.runAction(cc.sequence(action[0],action[1]));
				this.secondPlayer.stopAction(this.whiteDiceAction);
				this.stage-=2;
				this.storage.setItem("questionAnswer","null");
				if(this.storage.getItem("sounds")=="on")
					cc.audioEngine.playEffect(res.ChutesLongPlay);

				this.scheduleOnce(this.reinitializeListener,1.8);

			}
			else if(this.blackDiceAction != null && this.blackDiceAction.isDone()==true){
    			this.firstPlayer.stopAction(this.blackDiceAction);	
				if(player=="playerOne" && this._typeOfGame=="SINGLE_PLAYER")
					this.scheduleOnce(this.newScene,0);
    			else if(this._typeOfGame=="TWO_PLAYER")
					this.scheduleOnce(this.newScene,0.5);

				this.scheduleOnce(this.reinitializeListener,0.7);

			}
				this.storage.setItem("questionAnswer","null");
		cc.log("ON SLIDER 4");

		}


		// WHITE PLAYER

		if(cc.rectIntersectsRect(playerTwoBounding,slidersBounding[0]) && this._playerTwoName != undefined){
			if(this.storage.getItem("questionAnswer2")=="wrong" && this.storage.getItem("switch")=="1"){
				var action = [cc.moveTo(1,cc.p(280,20))];
				
				this.secondPlayer.runAction(cc.sequence(action[0]));
				this.stageWhite--;
				this.storage.setItem("questionAnswer2","null");
				if(this.storage.getItem("sounds")=="on")
					cc.audioEngine.playEffect(res.ChutesShortPlay);
			}
			else if(this.whiteDiceAction != null && this.whiteDiceAction.isDone()==true){
    			this.secondPlayer.stopAction(this.whiteDiceAction);	
    			if(this._typeOfGame=="TWO_PLAYER")
					this.scheduleOnce(this.newScene,0.5);
			}
				this.storage.setItem("questionAnswer2","null");
		cc.log("ON SLIDER 0");

		}
		else if(cc.rectIntersectsRect(playerTwoBounding,slidersBounding[1]) && this._playerTwoName != undefined){
			if(this.storage.getItem("questionAnswer2")=="wrong" && this.storage.getItem("switch")=="1"){
				var action = [cc.moveTo(1,cc.p(85,20))];
				
				this.secondPlayer.runAction(cc.sequence(action[0]));
				this.stageWhite-=3;
				this.storage.setItem("questionAnswer2","null");
				if(this.storage.getItem("sounds")=="on")
					cc.audioEngine.playEffect(res.ChutesLongPlay);
			}
			else if(this.whiteDiceAction != null && this.whiteDiceAction.isDone()==true){
    			this.secondPlayer.stopAction(this.whiteDiceAction);	
    			if(this._typeOfGame=="TWO_PLAYER")
					this.scheduleOnce(this.newScene,0.5);
			}
				this.storage.setItem("questionAnswer2","null");
		cc.log("ON SLIDER 1");

		}
		else if(cc.rectIntersectsRect(playerTwoBounding,slidersBounding[2]) && this._playerTwoName != undefined){
			if(this.storage.getItem("questionAnswer2")=="wrong" && this.storage.getItem("switch")=="1"){
				var action = [cc.moveTo(1,cc.p(275,365)),cc.moveTo(1,cc.p(410,143))];
				
				this.secondPlayer.runAction(cc.sequence(action[0],action[1]));
				this.stageWhite-=7;
				this.storage.setItem("questionAnswer2","null");
				if(this.storage.getItem("sounds")=="on")
					cc.audioEngine.playEffect(res.ChutesLongPlay);
			}
			else if(this.whiteDiceAction != null && this.whiteDiceAction.isDone()==true){
    			this.secondPlayer.stopAction(this.whiteDiceAction);	
    			if(this._typeOfGame=="TWO_PLAYER")
					this.scheduleOnce(this.newScene,0.5);
			}
				this.storage.setItem("questionAnswer2","null");
		cc.log("ON SLIDER 2");

		}
		else if(cc.rectIntersectsRect(playerTwoBounding,slidersBounding[3]) && this._playerTwoName != undefined){
			if(this.storage.getItem("questionAnswer2")=="wrong" && this.storage.getItem("switch")=="1"){
				var action = [cc.moveTo(0.5,cc.p(474,432)),cc.moveTo(0.5,cc.p(520,307)),cc.moveTo(0.5,cc.p(540,279))];
				
				this.secondPlayer.runAction(cc.sequence(action[0],action[1],action[2]));
				this.stage-=4;
				this.storage.setItem("questionAnswer2","null");
				if(this.storage.getItem("sounds")=="on")
					cc.audioEngine.playEffect(res.ChutesLongPlay);
			}
			else if(this.whiteDiceAction != null && this.whiteDiceAction.isDone()==true){
    			this.secondPlayer.stopAction(this.whiteDiceAction);	
    			if(this._typeOfGame=="TWO_PLAYER")
					this.scheduleOnce(this.newScene,0.5);
			}
				this.storage.setItem("questionAnswer2","null");
		cc.log("ON SLIDER 3");

		}
		else if(cc.rectIntersectsRect(playerTwoBounding,slidersBounding[4]) && this._playerTwoName != undefined){
			if(this.storage.getItem("questionAnswer2")=="wrong" && this.storage.getItem("switch")=="1"){
				var action = [cc.moveTo(0.5,cc.p(520,429)),cc.moveTo(0.5,cc.p(540,408))];
				
				this.secondPlayer.runAction(cc.sequence(action[0],action[1]));
				this.stage-=2;
				this.storage.setItem("questionAnswer2","null");
				if(this.storage.getItem("sounds")=="on")
					cc.audioEngine.playEffect(res.ChutesLongPlay);
			}
			else if(this.whiteDiceAction != null && this.whiteDiceAction.isDone()==true){
    			this.secondPlayer.stopAction(this.whiteDiceAction);	
    			if(this._typeOfGame=="TWO_PLAYER")
					this.scheduleOnce(this.newScene,0.5);
			}
				this.storage.setItem("questionAnswer2","null");
		cc.log("ON SLIDER 4");

		}
    },
    checkLadder:function(){
		var playerOneBounding = this.firstPlayer.getBoundingBox();
		var playerTwoBounding = this.secondPlayer.getBoundingBox();
		var ladder = [];
    	var player = turnText.getString() == this._playerOneName ? "playerOne" : "playerTwo";

    	cc.log("checkLadder: " + player);
		for(var i = 0 ; i < 4; i++){
			ladder[i] = this.ladderRect[i].getBoundingBox();
		}
		cc.log(this._typeOfGame+"   GAME");
		if(cc.rectIntersectsRect(playerOneBounding,ladder[0])){
			this.storage.setItem("onLadder","true");
			if(this.storage.getItem("questionAnswer")=="correct" && this.storage.getItem("switch")=="0"){
				var up = cc.moveBy(0.5,cc.p(0,70));
				this.firstPlayer.runAction(up);
				this.stage++;
				if(this.storage.getItem("sounds")=="on")
    				cc.audioEngine.playEffect(res.StairShort);

    			this.secondPlayer.stopAction(this.whiteDiceAction);	

				this.storage.setItem("questionAnswer","null");
			}
			else if(this.blackDiceAction != null && this.blackDiceAction.isDone()==true){
    			this.firstPlayer.stopAction(this.blackDiceAction);	
    			if(player=="playerOne" && this._typeOfGame=="SINGLE_PLAYER")
					this.scheduleOnce(this.newScene,0);
    			else if(this._typeOfGame=="TWO_PLAYER")
					this.scheduleOnce(this.newScene,0.5);
			}
				this.storage.setItem("questionAnswer","null");
		cc.log("ON LADDER");

		}

		else if(cc.rectIntersectsRect(playerOneBounding,ladder[1])){
			this.storage.setItem("onLadder","true");
			if(this.storage.getItem("questionAnswer")=="correct" && this.storage.getItem("switch")=="0"){
				var up = cc.moveBy(1,cc.p(-70,198));
				this.firstPlayer.runAction(up);
				this.stage+=5;

				this.storage.setItem("questionAnswer","null");
				if(this.storage.getItem("sounds")=="on")
    				cc.audioEngine.playEffect(res.StairPlay);
    			this.secondPlayer.stopAction(this.whiteDiceAction);
			}
			else if(this.blackDiceAction != null && this.blackDiceAction.isDone()==true){
    			this.firstPlayer.stopAction(this.blackDiceAction);	
				if(player=="playerOne" && this._typeOfGame=="SINGLE_PLAYER")
					this.scheduleOnce(this.newScene,0);
    			else if(this._typeOfGame=="TWO_PLAYER")
					this.scheduleOnce(this.newScene,0.5);
			}
				this.storage.setItem("questionAnswer","null");
		cc.log("ON LADDER");

		}

		else if(cc.rectIntersectsRect(playerOneBounding,ladder[2])){
			if(this.storage.getItem("questionAnswer")=="correct" && this.storage.getItem("switch")=="0"){
				var up = cc.moveBy(1,cc.p(0,325));
				this.firstPlayer.runAction(up);
				this.stage+=5;
				this.storage.setItem("questionAnswer","null");
				if(this.storage.getItem("sounds")=="on")
    				cc.audioEngine.playEffect(res.StairPlay);
			}
			else if(this.blackDiceAction != null && this.blackDiceAction.isDone()==true){
    			this.firstPlayer.stopAction(this.blackDiceAction);
				if(player=="playerOne" && this._typeOfGame=="SINGLE_PLAYER")
					this.scheduleOnce(this.newScene,0);
    			else if(this._typeOfGame=="TWO_PLAYER")
					this.scheduleOnce(this.newScene,0.5);
			}
				this.storage.setItem("questionAnswer","null");
		cc.log("ON LADDER");

		}

		else if(cc.rectIntersectsRect(playerOneBounding,ladder[3])){
			if(this.storage.getItem("questionAnswer")=="correct" && this.storage.getItem("switch")=="0"){
				var up = cc.moveBy(1,cc.p(0,190));
				this.firstPlayer.runAction(up);
				this.stage+=3;
				this.storage.setItem("questionAnswer","null");

				if(this.storage.getItem("sounds")=="on")
    				cc.audioEngine.playEffect(res.StairPlay);
    			this.secondPlayer.stopAction(this.whiteDiceAction);
			}
			else if(this.blackDiceAction != null && this.blackDiceAction.isDone()==true){
    			this.firstPlayer.stopAction(this.blackDiceAction);	
    			this.secondPlayer.stopAction(this.whiteDiceAction);	
				if(player=="playerOne" && this._typeOfGame=="SINGLE_PLAYER")
					this.scheduleOnce(this.newScene,0);
    			else if(this._typeOfGame=="TWO_PLAYER")
					this.scheduleOnce(this.newScene,0.5);
			}
				this.storage.setItem("questionAnswer","null");
		cc.log("ON LADDER");


		}

		// WHITE PLAYER

		if(cc.rectIntersectsRect(playerTwoBounding,ladder[0]) && this._playerTwoName != undefined){
			this.storage.setItem("onLadder","true");
			if(this.storage.getItem("questionAnswer2")=="correct" && this.storage.getItem("switch")=="1"){
				var up = cc.moveBy(0.5,cc.p(0,70));
				this.secondPlayer.runAction(up);
				this.stageWhite++;
				this.storage.setItem("questionAnswer2","null");

				if(this.storage.getItem("sounds")=="on")
    				cc.audioEngine.playEffect(res.StairShort);

    			this.secondPlayer.stopAction(this.whiteDiceAction);
			}
			else if(this.whiteDiceAction != null && this.whiteDiceAction.isDone()==true){
				if(this._typeOfGame=="TWO_PLAYER")
					this.scheduleOnce(this.newScene,0.5);
			}
				this.storage.setItem("questionAnswer2","null");
		cc.log("ON LADDER");
		

		}

		else if(cc.rectIntersectsRect(playerTwoBounding,ladder[1]) && this._playerTwoName != undefined){
			this.storage.setItem("onLadder","true");
			if(this.storage.getItem("questionAnswer2")=="correct" && this.storage.getItem("switch")=="1"){
				var up = cc.moveBy(1,cc.p(-70,198));
				this.secondPlayer.runAction(up);
				this.stageWhite+=5;
				this.storage.setItem("questionAnswer2","null");
				if(this.storage.getItem("sounds")=="on")
    				cc.audioEngine.playEffect(res.StairPlay);

    			this.secondPlayer.stopAction(this.whiteDiceAction);
			}
			else if(this.whiteDiceAction != null && this.whiteDiceAction.isDone()==true){
    			this.secondPlayer.stopAction(this.whiteDiceAction);	
    			if(this._typeOfGame=="TWO_PLAYER")
					this.scheduleOnce(this.newScene,0.5);
			}
				this.storage.setItem("questionAnswer2","null");
		cc.log("ON LADDER");

		}

		else if(cc.rectIntersectsRect(playerTwoBounding,ladder[2]) && this._playerTwoName != undefined){
			this.storage.setItem("onLadder","true");
			if(this.storage.getItem("questionAnswer2")=="correct" && this.storage.getItem("switch")=="1"){
				var up = cc.moveBy(1,cc.p(0,325));
				this.secondPlayer.runAction(up);
				this.stageWhite+=5;
				this.storage.setItem("questionAnswer2","null");
				if(this.storage.getItem("sounds")=="on")
    				cc.audioEngine.playEffect(res.StairPlay);

    			this.secondPlayer.stopAction(this.whiteDiceAction);
			}
			else if(this.whiteDiceAction != null && this.whiteDiceAction.isDone()==true){
    			this.secondPlayer.stopAction(this.whiteDiceAction);	
    			if(this._typeOfGame=="TWO_PLAYER")
					this.scheduleOnce(this.newScene,0.5);
			}
				this.storage.setItem("questionAnswer2","null");
		cc.log("ON LADDER");

		}

		else if(cc.rectIntersectsRect(playerTwoBounding,ladder[3]) && this._playerTwoName != undefined){
			this.storage.setItem("onLadder","true");
			if(this.storage.getItem("questionAnswer2")=="correct" && this.storage.getItem("switch")=="1"){
				var up = cc.moveBy(1,cc.p(0,190));
				this.secondPlayer.runAction(up);
				this.stageWhite+=3;
				this.storage.setItem("questionAnswer2","null");
				if(this.storage.getItem("sounds")=="on")
    				cc.audioEngine.playEffect(res.StairPlay);

    			this.secondPlayer.stopAction(this.whiteDiceAction);
			}
			else if(this.whiteDiceAction != null && this.whiteDiceAction.isDone()==true){
    			this.secondPlayer.stopAction(this.whiteDiceAction);	
    			if(this._typeOfGame=="TWO_PLAYER")
					this.scheduleOnce(this.newScene,0.5);
			}
				this.storage.setItem("questionAnswer2","null");
		cc.log("ON LADDER");

		}
    },
    newScene:function(node){
    	var playerName = turnText.getString();
    	var player = playerName == this._playerOneName ? "playerOne" : "playerTwo";

    	this.storage.setItem("player",player);
    	this.storage.setItem("minutes",(player == "playerOne") ? this.min:this.min2);
    	this.storage.setItem("seconds",(player == "playerTwo") ? this.sec:this.sec2);
    	this.storage.setItem("playerName",playerName);


		this.reinitializeListener();

    	cc.director.pushScene(new cc.TransitionFade(0.1,new QuestionScene()));
    	this.blackDiceAction = null;
    	this.whiteDiceAction = null;
    },
    resetMoves:function(){
		var movesLeft = this.totalMoves - this._moves;
    	if(movesLeft==0){
			this._moves = 0;
			this.totalMoves = 0;
		}

		if(this._moves < 0)
			this._moves = 0;

		var movesLeft2 = this.totalMovesWhite - this._movesWhite;
    	if(movesLeft2==0){
			this._movesWhite = 0;
			this.totalMovesWhite = 0;
		}

		if(this._movesWhite < 0)
			this._movesWhite = 0;
    },
    removeListeners:function(){
    	cc.log("PAUSE LISTENER " + this.btnRoll);
    //	cc.eventManager.pauseTarget(this.btnRoll);
    },
    resumeListeners:function(){
    	cc.log("RESUME LISTENER");
    	
    },
	cornerRect:[],
	sliders:[],
	initializeRectangles:function(){
		this.firstPlayer = cc.Sprite.create();
		this.firstPlayer.setColor(cc.color(0,0,0));
		this.firstPlayer.setPosition(20, 45);
	//	this.firstPlayer.setPosition(340, 595);
	//	this.stage = 8; 	

		this.firstPlayer.setTextureRect(cc.rect(0, 0, 15, 15));
		this.firstPlayer.setOpacity(255);
		this.firstPlayer.setName("blackRect");
		this.addChild(this.firstPlayer, 100);

		var WIDTH = 35;
		var INVISIBLE = 0;
		var VISIBLE = 255;

		this.ladderRect[0] = this.getRectangle(cc.p(490,35),INVISIBLE,WIDTH,60);
		this.ladderRect[1] = this.getRectangle(cc.p(525,100),INVISIBLE,WIDTH,60);
		this.ladderRect[2] = this.getRectangle(cc.p(420,290),INVISIBLE,45,60);
		this.ladderRect[3] = this.getRectangle(cc.p(78,355),INVISIBLE,WIDTH,60);

		this.sliders[0] =  this.getRectangle(cc.p(333,100),INVISIBLE,WIDTH,60);
		this.sliders[1] =  this.getRectangle(cc.p(138,228),INVISIBLE,WIDTH,60);
		this.sliders[2] =  this.getRectangle(cc.p(150,605),INVISIBLE,WIDTH,60);
		this.sliders[3] =  this.getRectangle(cc.p(490,545),INVISIBLE,WIDTH,60);
		this.sliders[4] =  this.getRectangle(cc.p(620,545),INVISIBLE,WIDTH,60);



		for(var i = 0; i < 4; i++)
			this.addChild(this.ladderRect[i], 2);
		for(var i = 0; i < 5; i++)
			this.addChild(this.sliders[i], 2);

		

		this.secondPlayer = cc.Sprite.create();
		this.secondPlayer.setColor(cc.color(255,255,255));
	/*	this.secondPlayer.setPosition(340, 595);
		this.stageWhite=10;*/
		this.secondPlayer.setPosition(20, 20);
		this.secondPlayer.setTextureRect(cc.rect(0, 0, 15, 15));
		this.secondPlayer.setOpacity(255);
		this.secondPlayer.setName("whiteRect");
		this.addChild(this.secondPlayer, 100);
    	var rotate = cc.rotateBy(1, 360);
    	var rotate2 = cc.rotateBy(1, 360);
    	var secondAction = cc.moveTo(2,cc.p(100,100));
    	this.secondPlayer.runAction(cc.repeatForever(rotate2));

    	var points = [cc.p(603,35),cc.p(603,160),cc.p(603,290),cc.p(603,420),cc.p(603,545),
    				  cc.p(31,100),cc.p(31,225),cc.p(31,353),cc.p(31,481),cc.p(31,609),cc.p(31,700)];
    	for(var i = 0; i < 10 ; i++){
    		this.cornerRect[i] = this.getRectangle(cc.p(points[i].x,points[i].y),INVISIBLE,60,60);
    		this.addChild(this.cornerRect[i],50);
    	}
	},
	getRectangle:function(point,opacity,width,height){
		var rect = cc.Sprite.create();
		rect.setColor(cc.color(0,0,0));
		rect.setPosition(point);
		rect.setTextureRect(cc.rect(0, 0, width, height));
		rect.setOpacity(opacity);
		return rect;
	},
	sec:0,
	min:0,
	sec2:0,
	min2:0,
	timer:function(){
		this.schedule(this.tick,1);
	},
	tick:function(){
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
	},
	tick2:function(){
		var strMin = "";
    	var strSec = "";
    	if(this.sec2==59){
	    	this.sec2 = 0;
	    	this.min2++;
	    }
    	if(this.min2<10)
    		strMin = "0";
    	if(this.sec2<10)
    		strSec = "0";
	    timeText.setString(strMin+this.min2+":"+strSec+this.sec2++);
	},
	goUp:function(){
		var value = (this.stage<=6) ? this.stage+1:this.stage-5;
		var up = cc.sequence(cc.moveBy(0.5,cc.p(0,60+value)));
		this._moves++;


		this.firstPlayer.stopAction(this.blackDiceAction);
		this.firstPlayer.runAction(up.clone());
		this.stage++;
	
		cc.log("MOVES SPENT: " + this._moves);

		var movesLeft = this.totalMoves - this._moves;
		cc.log("MOVES LEFT: " + movesLeft);


		if(this.stage%2==0 && movesLeft > 0){
			this.unschedule(this.runBlackSprite);
			if(movesLeft==1){
				this.scheduleOnce(this.runBlackSpriteReverse,0.5);
			}
			else{
				this.schedule(this.runBlackSpriteReverse,0.5,movesLeft-1);
			}
		}
		else{
			this.unschedule(this.runBlackSpriteReverse);
			if(movesLeft==1){
				this.scheduleOnce(this.runBlackSprite,0.5);
			}
			else{
				this.schedule(this.runBlackSprite,0.5,movesLeft-1);
			}
		}
		this.resetMoves();
	},
	goUpWhite:function(){
		var value = (this.stageWhite<=6) ? this.stageWhite-5:this.stageWhite-10;
		var up = cc.sequence(cc.moveBy(0.5,cc.p(0,65+value)));
		this._movesWhite++;


		this.secondPlayer.stopAction(this.whiteDiceAction);
		this.secondPlayer.runAction(up.clone());
		this.stageWhite++;
	
		cc.log("MOVES SPENT: " + this._movesWhite);

		var movesLeft = this.totalMovesWhite - this._movesWhite;
		cc.log("MOVES LEFT: " + movesLeft);


		if(this.stageWhite%2==0 && movesLeft > 0){
			this.unschedule(this.runWhiteSprite);
			if(movesLeft==1){
				this.scheduleOnce(this.runWhiteSpriteReverse,0.5);
			}
			else{
				this.schedule(this.runWhiteSpriteReverse,0.5,movesLeft-1);
			}
		}
		else{
			this.unschedule(this.runWhiteSpriteReverse);
			if(movesLeft==1){
				this.scheduleOnce(this.runWhiteSprite,0.5);
			}
			else{
				this.schedule(this.runWhiteSprite,0.5,movesLeft-1);
			}
		}

		this.resetMoves();
	},
	rollTheDice:function(){
		var random = this.getRandom(1,5); // TODO
		cc.log("RANDOM: " + random);
		var clone = new cc.Sprite(diceSprite);
		diceSprite.removeFromParent(true);
		switch(random){
		    case 1:
		    diceSprite = diceSprite1;
		    this.totalMoves = 1;
		    this.totalMovesWhite = 1;
		    break;
		    case 2:
		    diceSprite = diceSprite2;
		    this.totalMoves = 2;
		    this.totalMovesWhite = 2;
		    break;
		    case 3:
		    diceSprite = diceSprite3;
		    this.totalMoves = 3;
		    this.totalMovesWhite = 3;
		    break;
		    case 4:
		    diceSprite = diceSprite4;
		    this.totalMoves = 4;
		    this.totalMovesWhite = 4;
		    break;
		    case 5:
		    diceSprite = diceSprite5;
		    this.totalMoves = 5;
		    this.totalMovesWhite = 5;
		    break;
		}
		diceSprite.setScaleX(0.53);
		diceSprite.setScaleY(0.49);
		diceSprite.setPosition(805,216);
		this.addChild(diceSprite);
		if(this.storage.getItem("flag")=="1"){ // from black flag to white
			this.storage.setItem("flag","0");
			this.storage.setItem("switch","0");
			this.unschedule(this.tick2);
			this.schedule(this.tick,1);
			this.runFirstPlayer();
			
		}
		else{
			this.storage.setItem("flag","1");
			this.storage.setItem("switch","1");
			this.unschedule(this.tick);
			this.schedule(this.tick2,1);
			this.runSecondPlayer();
		}
	},
	getRandom:function(min,max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
	_moves:0,
	runBlackSprite:function(){
		var first = cc.moveBy(0.5,cc.p(65,0));
		var playerOneBounding = this.firstPlayer.getBoundingBox();
		this.blackDiceAction = this.firstPlayer.runAction(first);
		
        if(this.storage.getItem("sounds")=="on")
			cc.audioEngine.playEffect(res.MovePlay);

    	if(cc.rectIntersectsRect(playerOneBounding,this.cornerRect[0].getBoundingBox())){
	    	this.firstPlayer.stopAction(this.blackDiceAction);
			this.scheduleOnce(this.goUp,0.1);

		}
		else if(cc.rectIntersectsRect(playerOneBounding,this.cornerRect[1].getBoundingBox())){
	    	this.firstPlayer.stopAction(this.blackDiceAction);
			this.scheduleOnce(this.goUp,0.1);
		}
		else if(cc.rectIntersectsRect(playerOneBounding,this.cornerRect[2].getBoundingBox())){
	    	this.firstPlayer.stopAction(this.blackDiceAction);
			this.scheduleOnce(this.goUp,0.1);
		}
		else if(cc.rectIntersectsRect(playerOneBounding,this.cornerRect[3].getBoundingBox())){
	    	this.firstPlayer.stopAction(this.blackDiceAction);
			this.scheduleOnce(this.goUp,0.1);
		}
		else if(cc.rectIntersectsRect(playerOneBounding,this.cornerRect[4].getBoundingBox())){
	    	this.firstPlayer.stopAction(this.blackDiceAction);
			this.scheduleOnce(this.goUp,0.1);
		}
		else
			this._moves++;
		cc.log("MOVES SPENT: " + this._moves);
		this.debugInformation();
		this.resetMoves();
	},
	runBlackSpriteReverse:function(){
		var first = cc.moveBy(0.5,cc.p(-65,0));
		var playerOneBounding = this.firstPlayer.getBoundingBox();
		this.blackDiceAction = this.firstPlayer.runAction(first);

        if(this.storage.getItem("sounds")=="on")
			cc.audioEngine.playEffect(res.MovePlay);
		if(cc.rectIntersectsRect(playerOneBounding,this.cornerRect[5].getBoundingBox())){
	    	this.firstPlayer.stopAction(this.blackDiceAction);
	    	cc.log("COLLIDE RECT " + 5 + "!");
			this.scheduleOnce(this.goUp,0.1);
		}
		else if(cc.rectIntersectsRect(playerOneBounding,this.cornerRect[6].getBoundingBox())){
	    	this.firstPlayer.stopAction(this.blackDiceAction);
	    	cc.log("COLLIDE RECT " + 6 + "!");
			this.scheduleOnce(this.goUp,0.1);
		}
		else if(cc.rectIntersectsRect(playerOneBounding,this.cornerRect[7].getBoundingBox())){
	    	this.firstPlayer.stopAction(this.blackDiceAction);
	    	cc.log("COLLIDE RECT " + 7 + "!");
			this.scheduleOnce(this.goUp,0.1);
		}
		else if(cc.rectIntersectsRect(playerOneBounding,this.cornerRect[8].getBoundingBox())){
	    	this.firstPlayer.stopAction(this.blackDiceAction);
	    	cc.log("COLLIDE RECT " + 8 + "!");
			this.scheduleOnce(this.goUp,0.1);
		}
		else if(cc.rectIntersectsRect(playerOneBounding,this.cornerRect[9].getBoundingBox())){
	    	this.firstPlayer.stopAction(this.blackDiceAction);
	    	cc.log("COLLIDE RECT " + 9 + "!");
		}
		else
			this._moves++;
		
		cc.log("MOVES SPENT: " + this._moves);
		this.debugInformation();
		this.resetMoves();

	},
	runWhiteSprite:function(){
		var first = cc.moveBy(0.5,cc.p(65,0));
		var playerOneBounding = this.secondPlayer.getBoundingBox();
		var ladderOneBounding = this.ladderRect[0].getBoundingBox();
		this.whiteDiceAction = this.secondPlayer.runAction(first);
        if(this.storage.getItem("sounds")=="on")
			cc.audioEngine.playEffect(res.MovePlay);
    	if(cc.rectIntersectsRect(playerOneBounding,this.cornerRect[0].getBoundingBox())){
	    	this.secondPlayer.stopAction(this.whiteDiceAction);
	    	cc.log("WHITE COLLIDE RECT " + 0 + "!");
			this.scheduleOnce(this.goUpWhite,0.1);
		}
		else if(cc.rectIntersectsRect(playerOneBounding,this.cornerRect[1].getBoundingBox())){
	    	this.secondPlayer.stopAction(this.whiteDiceAction);
	    	cc.log("WHITE COLLIDE RECT " + 1 + "!");
			this.scheduleOnce(this.goUpWhite,0.1);
		}
		else if(cc.rectIntersectsRect(playerOneBounding,this.cornerRect[2].getBoundingBox())){
	    	this.secondPlayer.stopAction(this.whiteDiceAction);
	    	cc.log("WHITE COLLIDE RECT " + 2 + "!");
			this.scheduleOnce(this.goUpWhite,0.1);
		}
		else if(cc.rectIntersectsRect(playerOneBounding,this.cornerRect[3].getBoundingBox())){
	    	this.secondPlayer.stopAction(this.whiteDiceAction);
	    	cc.log("WHITE COLLIDE RECT " + 3 + "!");
			this.scheduleOnce(this.goUpWhite,0.1);
		}
		else if(cc.rectIntersectsRect(playerOneBounding,this.cornerRect[4].getBoundingBox())){
	    	this.secondPlayer.stopAction(this.whiteDiceAction);
	    	cc.log("WHITE COLLIDE RECT " + 4 + "!");
			this.scheduleOnce(this.goUpWhite,0.1);
		}
		else
			this._movesWhite++;
		cc.log("MOVES SPENT: " + this._movesWhite);
		this.resetMoves();
		this.debugInformation();

	},
	runWhiteSpriteReverse:function(){
		var first = cc.moveBy(0.5,cc.p(-65,0));
		var playerOneBounding = this.secondPlayer.getBoundingBox();
		this.whiteDiceAction = this.secondPlayer.runAction(first);
        if(this.storage.getItem("sounds")=="on")
			cc.audioEngine.playEffect(res.MovePlay);
		if(cc.rectIntersectsRect(playerOneBounding,this.cornerRect[5].getBoundingBox())){
	    	this.secondPlayer.stopAction(this.whiteDiceAction);
	    	cc.log("WHITE COLLIDE RECT " + 5 + "!");
			this.scheduleOnce(this.goUpWhite,0.1);
		}
		else if(cc.rectIntersectsRect(playerOneBounding,this.cornerRect[6].getBoundingBox())){
	    	this.secondPlayer.stopAction(this.whiteDiceAction);
	    	cc.log("WHITE COLLIDE RECT " + 6 + "!");
			this.scheduleOnce(this.goUpWhite,0.1);
		}
		else if(cc.rectIntersectsRect(playerOneBounding,this.cornerRect[7].getBoundingBox())){
	    	this.secondPlayer.stopAction(this.whiteDiceAction);
	    	cc.log("WHITE COLLIDE RECT " + 7 + "!");
			this.scheduleOnce(this.goUpWhite,0.1);
		}
		else if(cc.rectIntersectsRect(playerOneBounding,this.cornerRect[8].getBoundingBox())){
	    	this.secondPlayer.stopAction(this.whiteDiceAction);
	    	cc.log("WHITE WHITE COLLIDE RECT " + 8 + "!");
			this.scheduleOnce(this.goUpWhite,0.1);
		}
		else
			this._movesWhite++;
		
		cc.log("MOVES SPENT: " + this._movesWhite);
		this.resetMoves();
		this.debugInformation();

	},
	runFirstPlayer:function(x,y){
		turnText.setString(this._playerOneName);
    	this.storage.setItem("player","playerOne");
    	this.player = "playerOne";

		if(this.stage%2==0){
			switch(this.totalMoves){
				case 1:
				this.runBlackSpriteReverse();
				this.scheduleOnce(this.reinitializeListener,0.8+0.5);
				if(this._typeOfGame=="SINGLE_PLAYER"){
					this.scheduleOnce(this.resumeListeners,1);
					this.scheduleOnce(this.playerCheck,1+1.0);
				}
				break;
				case 2:
				this.schedule(this.runBlackSpriteReverse,0.5,1);
				this.scheduleOnce(this.reinitializeListener,1.3+0.5);
				if(this._typeOfGame=="SINGLE_PLAYER"){
					this.scheduleOnce(this.resumeListeners,1.5);
					this.scheduleOnce(this.playerCheck,1.5+1.5);
				}
				break;
				case 3: 
				this.schedule(this.runBlackSpriteReverse,0.5,2);
				this.scheduleOnce(this.reinitializeListener,1.8+0.5);
				if(this._typeOfGame=="SINGLE_PLAYER"){
					this.scheduleOnce(this.resumeListeners,2);
					this.scheduleOnce(this.playerCheck,2+1.5);
				}
				break;
				case 4:
				this.schedule(this.runBlackSpriteReverse,0.5,3);
				this.scheduleOnce(this.reinitializeListener,2.3+0.5);
				if(this._typeOfGame=="SINGLE_PLAYER"){
					this.scheduleOnce(this.resumeListeners,2.5);
					this.scheduleOnce(this.playerCheck,2.5+1.5);
				}
				break;
				case 5:
				this.schedule(this.runBlackSpriteReverse,0.5,4);
				this.scheduleOnce(this.reinitializeListener,2.8+0.5);
				if(this._typeOfGame=="SINGLE_PLAYER"){
					this.scheduleOnce(this.resumeListeners,3);
					this.scheduleOnce(this.playerCheck,3+1.5);
				}
				break;
			}
		}
		else{
			switch(this.totalMoves){
				case 1:
				this.runBlackSprite();
				this.scheduleOnce(this.reinitializeListener,0.8+0.5);
				if(this._typeOfGame=="SINGLE_PLAYER"){
					this.scheduleOnce(this.resumeListeners,1);
					this.scheduleOnce(this.playerCheck,1+.5+0.5);
				}
				this._secondsForWhite = 1;

				break;
				case 2:
				this.schedule(this.runBlackSprite,0.5,1);
				this.scheduleOnce(this.reinitializeListener,1.3+0.5);
				if(this._typeOfGame=="SINGLE_PLAYER"){
					this.scheduleOnce(this.resumeListeners,1.5);
					this.scheduleOnce(this.playerCheck,1.5+1.0+0.5);
				}
				this._secondsForWhite = 1.5;
				break;
				case 3:
				this.schedule(this.runBlackSprite,0.5,2);
				this.scheduleOnce(this.reinitializeListener,1.8+0.5);
				if(this._typeOfGame=="SINGLE_PLAYER"){
					this.scheduleOnce(this.resumeListeners,2);
					this.scheduleOnce(this.playerCheck,2+1.0+0.5);
				}
				this._secondsForWhite = 2;
				break;
				case 4:
				this.schedule(this.runBlackSprite,0.5,3);
				this.scheduleOnce(this.reinitializeListener,2.3+0.5);
				if(this._typeOfGame=="SINGLE_PLAYER"){
					this.scheduleOnce(this.resumeListeners,2.5);
					this.scheduleOnce(this.playerCheck,2.5+1.0+0.5);
				}
				this._secondsForWhite = 2.5;
				break;
				case 5:
				this.schedule(this.runBlackSprite,0.5,4);
				this.scheduleOnce(this.reinitializeListener,2.8+0.5);
				if(this._typeOfGame=="SINGLE_PLAYER"){
					this.scheduleOnce(this.resumeListeners,3);
					this.scheduleOnce(this.playerCheck,3+1.0+0.5);
				}
				this._secondsForWhite = 3;
				break;
			}
		}
	},
	runSecondPlayer:function(x,y){
		turnText.setString(this._playerTwoName);
    	this.storage.setItem("player","playerTwo");
    	this.player = "playerTwo";
		if(this.stageWhite%2==0){
			switch(this.totalMovesWhite){
				case 1:
				this.runWhiteSpriteReverse();
				this.scheduleOnce(this.reinitializeListener,1.0);
				break;
				case 2:
				this.schedule(this.runWhiteSpriteReverse,0.5,1);
				this.scheduleOnce(this.reinitializeListener,1.5+0.5);
				break;
				case 3:
				this.schedule(this.runWhiteSpriteReverse,0.5,2);
				this.scheduleOnce(this.reinitializeListener,2.5+0.5);
				break;
				case 4:
				this.schedule(this.runWhiteSpriteReverse,0.5,3);
				this.scheduleOnce(this.reinitializeListener,3.0+0.5);
				break;
				case 5:
				this.schedule(this.runWhiteSpriteReverse,0.5,4);
				this.scheduleOnce(this.reinitializeListener,3.5+0.5);
				break;
			}
		}
		else{
			switch(this.totalMovesWhite){
				case 1:
				this.runWhiteSprite();
				this.scheduleOnce(this.reinitializeListener,1.0+0.5);
				this.scheduleOnce(this.resumeListeners,1);
				break;
				case 2:
				this.schedule(this.runWhiteSprite,0.5,1);
				this.scheduleOnce(this.reinitializeListener,1.5+0.5);
				this.scheduleOnce(this.resumeListeners,1.5);
				break;
				case 3:
				this.schedule(this.runWhiteSprite,0.5,2);
				this.scheduleOnce(this.reinitializeListener,2.5+0.5);
				this.scheduleOnce(this.resumeListeners,2.5);
				break;
				case 4:
				this.schedule(this.runWhiteSprite,0.5,3);
				this.scheduleOnce(this.reinitializeListener,3.0+0.5);
				this.scheduleOnce(this.resumeListeners,2.5);
				break;
				case 5:
				this.schedule(this.runWhiteSprite,0.5,4);
				this.scheduleOnce(this.reinitializeListener,3.5+0.5);
				this.scheduleOnce(this.resumeListeners,3);
				break;
			}
		}
	},
	getPauseStatus:function(){
		return this.pausePopUp;
	},
	setPauseStatus:function(value){
		this.pausePopUp = value;
	},
	getPlayer:function(){
		return this.player;
	}
});

var PlayScene = cc.Scene.extend({
	ctor:function (typeOfGame,playerOneName,playerTwoName) {
    	this._super();
    	this.layer = new PlayLayer(typeOfGame,playerOneName,playerTwoName,this);
        this.addChild(this.layer);
		this.scheduleUpdate();

		
    },
	onEnter:function () {
        this._super();
		this.scheduleUpdate();

    },
    pause:function() {
        this._pausedTargets = cc.director.getActionManager().pauseAllRunningActions();
    },
    resume:function() {
        cc.director.getActionManager().resumeTargets(this._pausedTargets);
    },
    update:function(){
    	if(this.layer.getPauseStatus()==true){
    		this.pause();
    		this.p = new PauseLayer(res.pauseLayer,"pause",true,this._pausedTargets,this,this.layer);
    		this.addChild(this.p,100);
    		this.layer.setPauseStatus(false);
    		var a= this.layer.getPlayer();
    		if(a=="playerOne"){
    		this.layer.unschedule(this.layer.tick);
    		cc.log("pause timer player one");
    		}
    		else if(a=="playerTwo"){
    		this.layer.unschedule(this.layer.tick2);
    		cc.log("pause timer player two");

    		}
    	
    		//this.layer.btnRoll.setEnabled(true);
    	}
    }
});