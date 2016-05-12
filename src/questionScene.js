var QuestionLayer = cc.Layer.extend({
	radioBtnUncheckedA:null,
	radioBtnUncheckedB:null,
	radioBtnUncheckedC:null,
	radioBtnUncheckedD:null,
	radioBtnCheckedA:null,
	radioBtnCheckedB:null,
	radioBtnCheckedC:null,
	radioBtnCheckedD:null,
	correctAnswer:null,
	yourAnswer:null,
	easy:0,
	hard:45,
	answer:null,
	trigger:null,
	_player:null,
	answerLetter:"",
	ctor:function(){
		this._super();
		this.init();

		return true;
	},
	init:function(){
		scene = ccs.load(res.QuestionScene).node;
		this._player = cc.sys.localStorage.getItem("player");
		cc.log(this._player + " TYPE OF PLAYER");
		this.storage = cc.sys.localStorage;

		this._playerName = this.storage.getItem("playerName");
		this._min = this.storage.getItem("minutes");
		this._sec = this.storage.getItem("seconds");
		this.initTextViews();
		this.initializeButtons();
		this.initializeSprites();
		this.addChild(scene);
        this.initializeListener();
        this.scheduleOnce(this.tick,1);
     //   this.tick();

        var currentIndex = (cc.sys.localStorage.getItem("difficulties")=="easy") ?  this.generateEasyQuestion() : this.generateHardQuestion();
        this.loadXML(currentIndex);
        currentIndex++;
	},
	generateEasyQuestion:function(){
		this.easy = this.getRandom(0,44);
		return this.easy;
	},
	generateHardQuestion:function(){
		this.hard = this.getRandom(45,89);
		return this.hard;
	},
	getRandom:function(min,max){
    	return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    shuffle:function(o){
        for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    },
    tick:function(){
        cc.log("SCHEDULE ONCE TICK");

 		var strMin = "";
    	var strSec = "";
    	if(this._sec==59){
	    	this._sec = 0;
	    	this._min++;
	    }
    	if(this._min<10)
    		strMin = "0";
    	if(this._sec<10)
    		strSec = "0";
    	cc.log(this._sec + " SECONDS");
    	cc.log(this._min + " MINUTES");

	    txtTimeElapsed.setString(strMin+this._min+":"+strSec+this._sec++);
	},
	initTextViews:function(){
		txtPlayer = this.addTextView(this._playerName + "'s Question","txtPlayer",cc.p(490,540),20);
		txtTime = this.addTextView("Time: ","txtTimeElapsed",cc.p(1040,380),20,cc.color(0,0,0,50));
		var minutes = (this._min < 10) ? "0"+this._min:this._min;
		var seconds = (this._sec < 10) ? "0"+this._sec:this._sec;
		txtTimeElapsed = this.addTextView("[" + minutes + ":" + seconds +"]","txtTimeElapsed",cc.p(1120,380),20,cc.color(0,0,0,50));
		txtQuestion = this.addTextView("question","txtQuestion",cc.p(490,510));

	    txtAnswer1 = this.addTextView("a","txtAnswer1",cc.p(520,320)); 
	    txtAnswer2 = this.addTextView("b","txtAnswer2",cc.p(520,250));  
	    txtAnswer3 = this.addTextView("c","txtAnswer3",cc.p(520,180));
	    txtAnswer4 = this.addTextView("d","txtAnswer4",cc.p(520,110));

	    this.addChild(txtPlayer);
	    this.addChild(txtTime);
	    this.addChild(txtTimeElapsed);
	    this.addChild(txtQuestion);
	    this.addChild(txtAnswer1);
	    this.addChild(txtAnswer2);
	    this.addChild(txtAnswer3);
	    this.addChild(txtAnswer4);
	},
	loadXML:function(index){
    	var main = this;
    	var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
		    if(xhttp.readyState == 4 && xhttp.status == 200) {
		    	main.parseXML(xhttp,index);
		    }
		};

		xhttp.open("GET", res.questionXML, true);
		xhttp.send();
	},
	parseXML:function(xml,index){
		 var xmlDoc = xml.responseXML;
		 var storage = cc.sys.localStorage;
         var currentIndex = (cc.sys.localStorage.getItem("difficulties")=="easy") ?  this.generateEasyQuestion() : this.generateHardQuestion();
		 

		 var itemList = xmlDoc.getElementsByTagName("itemList")[currentIndex];
		 var question = itemList.getElementsByTagName("question")[0].childNodes[0].nodeValue;
		 var choices = [];
		 var answerXML = itemList.getElementsByTagName("answer")[0].childNodes[0].nodeValue;
		 for(var i = 0; i < 4; i++){
		 	choices[i] = itemList.getElementsByTagName("choices")[i].childNodes[0].nodeValue;
		 }

		 var indexes = [0,1,2,3];
		 var r = this.shuffle(indexes)	// randomized choices
		 cc.log("answer: " + answerXML);

		 txtQuestion.setString(question);
		 txtAnswer1.setString(choices[r[0]]);
		 txtAnswer2.setString(choices[r[1]]);
		 txtAnswer3.setString(choices[r[2]]);
		 txtAnswer4.setString(choices[r[3]]);



	    this.correctAnswer = answerXML;

	    this.storage = cc.sys.localStorage;

	    this.storage.setItem("question",question);
	    this.storage.setItem("a",choices[r[0]]);
	    this.storage.setItem("b",choices[r[1]]);
	    this.storage.setItem("c",choices[r[2]]);
	    this.storage.setItem("d",choices[r[3]]);
	    this.storage.setItem("answer",answerXML);

	    for(var i = 0; i < 4; i++){
	    	if(choices[i]==answerXML){
	    		this.answerLetter = String.fromCharCode(97 + i);
	    	}
	    }
	    
	    cc.log("ANSWER LETTER: " + this.answerLetter);
	}, 
	addTextView:function(text,txtViewLabel,points,fontSize,color){
		if (fontSize == null)
			fontSize = 25;
		if (color == null)
			color = cc.color(255,255,255,50);

		var label = new cc.LabelTTF(text, "neuropol x rg", fontSize, cc.size(510, 100), cc.TEXT_ALIGNMENT_LEFT );
	        label.setName(txtViewLabel);
	        label.attr({
	            x: points.x,
	            y: points.y
	        });
	        label.setColor(color);
	        label.setLocalZOrder(90);
	    return label;
	},
    initializeButtons:function(){
        btnOK = scene.getChildByName("btnOK");
        btnFifty = scene.getChildByName("btnFifty");
        btnPass = scene.getChildByName("btnPass");
        btnCQ = scene.getChildByName("btnCQ");
        var storage = cc.sys.localStorage;
        if(this._player=="playerOne"){
	        btnCQ.setTitleText(storage.getItem("cq"));
	        btnPass.setTitleText(storage.getItem("pass"));
	        btnFifty.setTitleText(storage.getItem("fifty"));
    	}
    	else if(this._player=="playerTwo"){
    		btnCQ.setTitleText(storage.getItem("cq2"));
	        btnPass.setTitleText(storage.getItem("pass2"));
	        btnFifty.setTitleText(storage.getItem("fifty2"));
    	}
    },
    changeQuestion:function(){
    	var n = parseInt(this._player == "playerOne" ? this.storage.getItem("cq"):this.storage.getItem("cq2"));
		var currentIndex = (cc.sys.localStorage.getItem("difficulties")=="easy") ?  this.easy++ : this.hard++;

		if(n>0 && this._player=="playerOne"){
			this.loadXML(currentIndex);
			n--;
			btnCQ.setTitleText(n+"");
			this.storage.setItem("cq",n+"");
		}
		else if(n>0 && this._player=="playerTwo"){
			this.loadXML(currentIndex);
			n--;
			btnCQ.setTitleText(n+"");
			this.storage.setItem("cq2",n+"");
		}
    },
    pause:function() {
        this._pausedTargets = cc.director.getActionManager().pauseAllRunningActions();
    },
    resume:function() {
        cc.director.getActionManager().resumeTargets(this._pausedTargets);
    },
	initializeListener:function(){
	    var main = this;
	    main.radioBtnCheckedA.visible = false;
	    main.radioBtnCheckedB.visible = false;
	    main.radioBtnCheckedC.visible = false;
	    main.radioBtnCheckedD.visible = false;
	    	//Create a "one by one" touch event listener (processes one touch at a time)
        this.touchListeners = cc.EventListener.create({
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
		    var objectName = target.getName();
			//Check the click area
		    if (cc.rectContainsPoint(rect, locationInNode)) {	
			    target.opacity = 180;
	
			    return true;
		    }
		    return false;
	    },
		//Trigger when moving touch
	    onTouchMoved: function (touch, event) {			
		    //Move the position of current button sprite
			var target = event.getCurrentTarget();
		    var delta = touch.getDelta();
	    },
		//Process the touch end event
	    onTouchEnded: function (touch, event) {			
		    var target = event.getCurrentTarget();
		//    target.setOpacity(255);

		    var locationInNode = target.convertToNodeSpace(touch.getLocation());	
		    var s = target.getContentSize();
		    var rect = cc.rect(0, 0, s.width, s.height);
		    var objectName = target.getName();
			//Check the click area
		    if (cc.rectContainsPoint(rect, locationInNode)) {	
			    target.opacity = 255;
			    cc.log(target.getName());
			    if(objectName == "radioBtnCheckedA"){
			    	main.radioBtnCheckedA.visible = true;
				    main.radioBtnCheckedB.visible = false;
				    main.radioBtnCheckedC.visible = false;
				    main.radioBtnCheckedD.visible = false;
				    main.yourAnswer = main.storage.getItem("a");
				    main.storage.setItem("yourAnswer",main.yourAnswer);
				    if(main.storage.getItem("sounds")=="on")
				    cc.audioEngine.playEffect(res.ClickRadioPlay);
			    }
			    else if(objectName == "radioBtnCheckedB"){
			    	main.radioBtnCheckedA.visible = false;
				    main.radioBtnCheckedB.visible = true;
				    main.radioBtnCheckedC.visible = false;
				    main.radioBtnCheckedD.visible = false;
				    main.yourAnswer = main.storage.getItem("b");
				    main.storage.setItem("yourAnswer",main.yourAnswer);
				    if(main.storage.getItem("sounds")=="on")
				    cc.audioEngine.playEffect(res.ClickRadioPlay);
			    }
			    else if(objectName == "radioBtnCheckedC"){
			    	main.radioBtnCheckedA.visible = false;
				    main.radioBtnCheckedB.visible = false;
				    main.radioBtnCheckedC.visible = true;
				    main.radioBtnCheckedD.visible = false;
				    main.yourAnswer = main.storage.getItem("c");
				    main.storage.setItem("yourAnswer",main.yourAnswer);
				    if(main.storage.getItem("sounds")=="on")
				    cc.audioEngine.playEffect(res.ClickRadioPlay);
			    }
			    else if(objectName == "radioBtnCheckedD"){
			    	main.radioBtnCheckedA.visible = false;
				    main.radioBtnCheckedB.visible = false;
				    main.radioBtnCheckedC.visible = false;
				    main.radioBtnCheckedD.visible = true;
				    main.yourAnswer = main.storage.getItem("d");
				    main.storage.setItem("yourAnswer",main.yourAnswer);
				    if(main.storage.getItem("sounds")=="on")
				    cc.audioEngine.playEffect(res.ClickRadioPlay);
			    }

			    else if(objectName == "btnCQ"){
			    	main.changeQuestion();
					main.disableButtons();
				    cc.audioEngine.playEffect(res.ClickPlay);
			    }

			    else if(objectName == "btnFifty"){
			    	cc.log("BUTTON FIFTY");
			    	main.fiftyPercent();
					main.disableButtons();
				    cc.audioEngine.playEffect(res.ClickPlay);
			    }

			    else if(objectName == "btnPass"){
			    	main.passQuestion();
					main.disableButtons();
				    cc.audioEngine.playEffect(res.ClickPlay);
			    }

			    else if(objectName == "btnOK"){
			    	cc.log("BUTTON Pass");
			    	if(main.yourAnswer!=null)
			    		main.goBack();
				    cc.audioEngine.playEffect(res.ClickPlay);
			    }

	    }
	}
    });

        cc.eventManager.addListener(this.touchListeners, this.radioBtnCheckedA);
	    cc.eventManager.addListener(this.touchListeners.clone(), this.radioBtnCheckedB);
	    cc.eventManager.addListener(this.touchListeners.clone(), this.radioBtnCheckedC);
	    cc.eventManager.addListener(this.touchListeners.clone(), this.radioBtnCheckedD);
	    cc.eventManager.addListener(this.touchListeners.clone(), btnCQ);
	    cc.eventManager.addListener(this.touchListeners.clone(), btnFifty);
	    cc.eventManager.addListener(this.touchListeners.clone(), btnPass);
	    cc.eventManager.addListener(this.touchListeners.clone(), btnOK);
	

	},
	goResult:function(){
	},
	disableButtons:function(){
		cc.eventManager.pauseTarget(btnFifty);
		cc.eventManager.pauseTarget(btnPass);
		cc.eventManager.pauseTarget(btnCQ);
	},
	passQuestion:function(){
		var pass = parseInt(this._player == "playerOne" ? this.storage.getItem("pass"):this.storage.getItem("pass2"));
		if(pass>0 && this._player=="playerOne"){
			pass--;
			this.storage.setItem("pass",pass);
			cc.director.popScene();
		}
		else if(pass>0 && this._player=="playerTwo"){
			pass--;
			this.storage.setItem("pass2",pass);
			cc.director.popScene();
		}
	},
	fiftyPercent:function(){
		var fifty = parseInt(this._player == "playerOne" ? this.storage.getItem("fifty"):this.storage.getItem("fifty2"));
		if(fifty>0 && this._player=="playerOne"){
			fifty--;
			this.storage.setItem("fifty",fifty);
			btnFifty.setTitleText(fifty);

			var unchecked = [this.radioBtnUncheckedA,this.radioBtnUncheckedB,this.radioBtnUncheckedC,this.radioBtnUncheckedD];
			var checked = [this.radioBtnCheckedA,this.radioBtnCheckedB,this.radioBtnCheckedC,this.radioBtnCheckedD];
			var remove = [];
			var r;
			var letter;

			for(var i = 0; i <= 1 ; i++){
				r = this.getRandom(0,3);
				letter = String.fromCharCode(97 + r)+"";

				while(letter==this.answerLetter || this.containsRandom(remove,r)){
					r = this.getRandom(0,3);
					letter = String.fromCharCode(97 + r)+"";
				}

				remove[i] = r;
			}

			var first = remove[0];
			var second = remove[1];

			unchecked[first].setVisible(false);
			checked[first].setVisible(false);

			unchecked[second].setVisible(false);
			checked[second].setVisible(false);
		}
		else if(fifty>0 && this._player=="playerTwo"){
			fifty--;
			this.storage.setItem("fifty2",fifty);
			btnFifty.setTitleText(fifty);

			var unchecked = [this.radioBtnUncheckedA,this.radioBtnUncheckedB,this.radioBtnUncheckedC,this.radioBtnUncheckedD];
			var checked = [this.radioBtnCheckedA,this.radioBtnCheckedB,this.radioBtnCheckedC,this.radioBtnCheckedD];
			var remove = [];
			var r;
			var letter;

			for(var i = 0; i <= 1 ; i++){
				r = this.getRandom(0,3);
				letter = String.fromCharCode(97 + r)+"";

				while(letter==this.answerLetter || this.containsRandom(remove,r)){
					r = this.getRandom(0,3);
					letter = String.fromCharCode(97 + r)+"";
				}

				remove[i] = r;
			}

			var first = remove[0];
			var second = remove[1];

			unchecked[first].setVisible(false);
			checked[first].setVisible(false);

			unchecked[second].setVisible(false);
			checked[second].setVisible(false);
		}
	},
	containsRandom:function(array,number){
		var flag = false;

		for(var i = 0; i < array.length; i++){
			if(array[i] == number){
				flag = true;
				break;
			}
		}

		return flag;
	},
	initializeSprites:function(){
		this.radioBtnCheckedA = scene.getChildByName("radioBtnCheckedA");
		this.radioBtnCheckedB = scene.getChildByName("radioBtnCheckedB");
		this.radioBtnCheckedC = scene.getChildByName("radioBtnCheckedC");
		this.radioBtnCheckedD = scene.getChildByName("radioBtnCheckedD");
		this.radioBtnUncheckedA = scene.getChildByName("radioBtnUnselectedA");
		this.radioBtnUncheckedB = scene.getChildByName("radioBtnUnselectedB");
		this.radioBtnUncheckedC = scene.getChildByName("radioBtnUnselectedC");
		this.radioBtnUncheckedD = scene.getChildByName("radioBtnUnselectedD");
	},
	goBack:function(){
		var lifepoints;
		var answerValue;
		if(this.storage.getItem("answer") == this.yourAnswer){
			if(this._player=="playerOne"){
				this.storage.setItem("switch","0");
				this.storage.setItem("questionAnswer","correct");
			}

			if(this._player=="playerTwo"){
				this.storage.setItem("switch","1");
				this.storage.setItem("questionAnswer2","correct");
			}
			if(this.storage.getItem("questionAnswer")=="correct" && this.storage.getItem("switch")=="1")
			cc.log("GOT IT " + this._player);
			answerValue = "correct";

		}
		else{
			var life;
			if(this._player=="playerOne"){
				life = parseInt(this.storage.getItem("life"));
				life -= 5;
				lifepoints = life;
				this.storage.setItem("life",life);
				this.storage.setItem("switch","0");
				this.storage.setItem("questionAnswer","wrong");

			}

			if(this._player=="playerTwo"){
				life = parseInt(this.storage.getItem("life2"));
				life -= 5;
				lifepoints = life;
				this.storage.setItem("life2",life);
				this.storage.setItem("switch","1");
				this.storage.setItem("questionAnswer2","wrong");
			}
			answerValue = "wrong";
		}
		var question = this.storage.getItem("question");
		var a = this.storage.getItem("a");
		var b = this.storage.getItem("b");
		var c = this.storage.getItem("c");
		var d = this.storage.getItem("d");
		var yourAnswer = this.storage.getItem("yourAnswer");
		var correct = this.storage.getItem("answer");
		cc.director.pushScene(new AnswerResultScene(question,answerValue,yourAnswer,correct,this._playerName,lifepoints));
		
	}
});

var QuestionScene = cc.Scene.extend({
    onEnter:function() {
        this._super();
        this.addChild(new QuestionLayer());
    }
});

