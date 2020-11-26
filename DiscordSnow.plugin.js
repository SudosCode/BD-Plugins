/**
 * @name DiscordSnow
 * @version 1.0.0
 * @authorLink https://twitter.com/VampyreKittie85
 */

var z = 8;
var mf = 100; //initialize this variable now so it can be used properly
var date = new Date().getMonth();

function snowPls() {
	var exist = document.getElementById("sky"); //stop making new ones if there already is one for christ's sake
	if (!exist){
	var canvas = document.createElement('canvas');

		canvas.id = "sky";
		canvas.width = 420;
		canvas.height = 69;
		canvas.style.zIndex = z; //this might need to be increased if snowflakes are going under stuff
		canvas.style.position = "absolute";
		canvas.style.pointerEvents = "none";

		var body = document.getElementsByTagName("body")[0];
		body.appendChild(canvas);

		var canvas=document.getElementById("sky");
		var ctx=canvas.getContext("2d");
		var W=window.innerWidth;
		var H=window.innerHeight;
		canvas.width=W;
		canvas.height=H;
		var flakes=[];
		for(var i=0;i<mf;i++){
			flakes.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*5+2,d:Math.random()+1})
		}
		function drawFlakes(){
			ctx.clearRect(0,0,W,H);
			ctx.fillStyle="white";
			ctx.beginPath();
			for(var i=0;i<mf;i++){
				var f=flakes[i];ctx.moveTo(f.x,f.y);ctx.arc(f.x,f.y,f.r,0,Math.PI*2,true);
			}
			ctx.fill();
			moveFlakes();
		}
		var angle=0;
		function moveFlakes(){
			//angle+=0.01;
			for(var i=0;i<mf;i++){
				var f=flakes[i];
				f.y+=Math.pow(f.d,2)+1;
				f.x+=Math.sin(angle)*2;
				if(f.y>H){flakes[i]={x:Math.random()*W,y:0,r:f.r,d:f.d};
				}
			}
		}
		setInterval(drawFlakes,25);
	}
}

var timer = setInterval(function() { //add a timer to check if it's december every minute
			if (date != 11 && BdApi.loadData('DiscordSnow', 'limitOn') == true) {
				var canvas=document.getElementById("sky");
				canvas.remove(); //kills the fun if it's not ho ho ho month
			}
			if (date == 11 || BdApi.loadData('DiscordSnow', 'limitOn') == false) {
				snowPls(); //starts the fun if it is ho ho ho month
			}
		}, 60 * 1000);

class DiscordSnow {
	//Meta
	getName() { return "DiscordSnow"; }
    getShortName() { return "YaySnow"; }
    getDescription() { return "A plugin that adds javascript snow to your discord window."; }
    getVersion() { return "1.0.0"; }
    getAuthor() { return "Sudonim"; }
	
	start() {
		var date = new Date().getMonth();
		z = BdApi.loadData('DiscordSnow', 'zIndex')
		mf = BdApi.loadData('DiscordSnow', 'mfConfig')
		console.log(date);
		if (date == 11 || BdApi.loadData('DiscordSnow', 'limitOn') == false) {
			snowPls(); //starts the fun if it is ho ho ho month
		}
	}
	
	stop() { //properly kills everything the script started when turned off
		clearInterval(timer);
		var canvas=document.getElementById("sky");
		if (canvas){
			canvas.remove();
		}
	}
	
	getSettingsPanel() {
		//TODO: make the month check setting not reset
		window.saveConfig = function() { 
			BdApi.saveData('DiscordSnow', 'zIndex', document.getElementById("zIndex").value);
			z = BdApi.loadData('DiscordSnow', 'zIndex');
			BdApi.saveData('DiscordSnow', 'mfConfig', document.getElementById("mfConfig").value);
			mf = BdApi.loadData('DiscordSnow', 'mfConfig')
			var canvas=document.getElementById("sky");
			if (canvas){
			document.getElementById("sky").style.zIndex = BdApi.loadData('DiscordSnow', 'zIndex');
			canvas.remove();
			}
			BdApi.saveData('DiscordSnow', 'limitOn', document.getElementById("limitOn").checked);
			if (date == 11 || BdApi.loadData('DiscordSnow', 'limitOn') == false) { //reset the snow with the new variables
				snowPls(); 
			} 
			//document.getElementById("limitOn").checked = BdApi.loadData('DiscordSnow', 'limitOn');
		
		}
		//this options panel html is absolutely disgusting, this needs to be redone and improved at some point
		return '<div style="height: 50px;"><div style="width: 300px; float: left;">zIndex of snow (Increase this if snow is falling under some elements)</div><input id="zIndex" max="65535" min="-1" step="1" type="number" value="'+ z +'" /></div><div style="width: 357px; float: left;">Maximum number of snowflakes<input style="float: right;" id="mfConfig" max="65535" min="1" step="1" type="number" value="'+ mf +'" /></div><div style="width: 360px; float: left;">Only snows in December? <input id="limitOn" style="float: right;"  type="checkbox" value="limitOn" checked></div><p><button id="saveButton" style="background-color: var(--bd-blue); color: #fff; float: right;" type="button" onClick="saveConfig(); return false;">Save</button></p>';
		
	}
}