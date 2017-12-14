Module.register("Klimatampio", {
	default: {
		ip: "10.0.0.215",
		id1: "322",
		id2: "323",
		id3: "324"
	},

	start: function(){
		this.instertData();
	},

	getStyles: function() {
		return ["style_klimatampio.css"];
	},

	getDom: function() {
		var self = this;
		var wrapper = document.createElement("div");
			wrapper.id = "klimatampio";
		return wrapper;
	},

	instertData: function (){
		var link = "http://"+this.config.ip+":8060/api/json/devices";
		var tempid = this.config.id1-1; 
		var wilgid = this.config.id2-1;
		var cisid = this.config.id3-1;
		var xhttp = new XMLHttpRequest();
		var json = [];
  		setInterval(function (){
  			xhttp.open("get", link, true);
			xhttp.setRequestHeader("Authorization", "Basic " + btoa("admin:ampio"));
  			xhttp.send();
  			xhttp.onreadystatechange = function() {
    			if (this.readyState == 4) {
      				json = JSON.parse(this.response).List;
				var temp = (json[tempid].stan*100)/100;
				var wilg = json[wilgid].stan;
				var cis = json[cisid].stan;
      				document.getElementById("klimatampio").innerHTML = "<table class='tg'><tr><td class='tg-baqh'><img class='icon-klimat' src='modules/Klimatampio/temp.png'><span class='txt-klimat'>Temperatura</span></br><span class='txt-klimat big-klimat'>"+temp+"<sup style='font-size:20px;'>°C</sup></span></td><td class='tg-baqh'><img class='icon-klimat' src='modules/Klimatampio/drop.png'><span class='txt-klimat'>Wilgotność</span></br><span class='txt-klimat big-klimat'>"+wilg+"<sup style='font-size:20px;'>%</sup></span></td><td class='tg-baqh'><img class='icon-klimat' src='modules/Klimatampio/press.png'></br><span class='txt-klimat'>Ciśnienie</span></br><span class='txt-klimat big-klimat'>"+cis+" <sup style='font-size:20px;'>hPa</sup></span></td></tr></table>";
    				}
  			}
  		}, 3000)
	},
});
