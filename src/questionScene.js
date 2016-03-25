var QuestionLayer = cc.Layer.extend({
	scene:null,
	credits:null,
	btnOK:null,
	string:null,
	ctor:function(){
		this._super();
		this.init();
	},
	init:function(){
		scene = ccs.load(res.QuestionScene).node;
		this.initializeButtons();
		this.addChild(scene);
		this.readTextFile("file:///C:/Users/Totz/Desktop/text.txt");
      
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
		var main = this;
	    cc.loader.loadTxt("res/text.txt", function(error, data){
    		
    		var result = data.split("\n");
    		txtQuestion = new cc.LabelTTF(result[0], "Arial", 28, cc.size(510, 100), cc.TEXT_ALIGNMENT_LEFT );
	        txtQuestion.setName("txtQuestion");
	        txtQuestion.attr({
	            x: 490,
	            y: 530
	        });
	        txtQuestion.setColor(cc.color(255,255,255,50));
	        main.addChild(txtQuestion);

	        txtAnswer1 = new cc.LabelTTF(result[1], "Arial", 28, cc.size(510, 100), cc.TEXT_ALIGNMENT_LEFT );
	        txtAnswer1.setName("txtAnswer1");
	        txtAnswer1.attr({
	            x: 540,
	            y: 320
	        });
	        txtAnswer1.setColor(cc.color(255,255,255,50));
	        main.addChild(txtAnswer1);

	        txtAnswer2 = new cc.LabelTTF(result[2], "Arial", 28, cc.size(510, 100), cc.TEXT_ALIGNMENT_LEFT );
	        txtAnswer2.setName("txtAnswer1");
	        txtAnswer2.attr({
	            x: 540,
	            y: 250
	        });
	        txtAnswer2.setColor(cc.color(255,255,255,50));
	        main.addChild(txtAnswer2);

	        txtAnswer3 = new cc.LabelTTF(result[3], "Arial", 28, cc.size(510, 100), cc.TEXT_ALIGNMENT_LEFT );
	        txtAnswer3.setName("txtAnswer1");
	        txtAnswer3.attr({
	            x: 540,
	            y: 180
	        });
	        txtAnswer3.setColor(cc.color(255,255,255,50));
	        main.addChild(txtAnswer3);

	        txtAnswer4 = new cc.LabelTTF(result[4], "Arial", 28, cc.size(510, 100), cc.TEXT_ALIGNMENT_LEFT );
	        txtAnswer4.setName("txtAnswer1");
	        txtAnswer4.attr({
	            x: 540,
	            y: 110
	        });
	        txtAnswer4.setColor(cc.color(255,255,255,50));
	        main.addChild(txtAnswer4);
		});
		cc.log("STRING2: " + this.string); //data is the json object
		// You should do a check before using it
		if (cc.sys.isNative) {
		    jsb.fileUtils;
			jsb.fileUtils.writeStringToFile("TRY!","res/text2.txt");
		}
		else
			cc.log("NOT SUPPORTED!");
	},
    initializeButtons:function(){
        btnOK = scene.getChildByName("btnOK");
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

