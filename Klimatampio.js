Module.register("Klimatampio", {
	default: {
		ip: "10.0.0.215",
		id1: "322",
		id2: "323",
		id3: "324",
		id4: "324",
		id5: "324",
		id6: "324",
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
		var prad1id = this.config.id4-1;
		var prad2id = this.config.id5-1;
		var roslid = this.config.id6-1;
		var xhttp = new XMLHttpRequest();
		var json = [];
  		setInterval(function (){
  			xhttp.open("get", link, true);
			xhttp.setRequestHeader("Authorization", "Basic " + btoa("admin:ampio"));
  			xhttp.send();
  			xhttp.onreadystatechange = function() {
    			if (this.readyState == 4) {
      				json = JSON.parse(this.response).List;
				var color;
				var temp = (json[tempid].stan*100)/100;
				var wilg = json[wilgid].stan;
				var cis = json[cisid].stan;
				var prad1 = json[prad1id].stan;
				var prad2 = json[prad2id].stan;
				var rosl = json[roslid].stan/10;
					if(rosl>=20 & rosl=<50){
						color = (rosl-20)*4;
					}else if(rosl<20){
						color = 0;
					}else{
						color = 120;
					}
      				document.getElementById("klimatampio").innerHTML = "<table class='tg'><tr><td class='tg-baqh'><img class='icon-klimat' src='modules/Klimatampio/icons/temp.png'><span class='txt-klimat'>Temperatura</span></br><span class='txt-klimat big-klimat'>"+temp+"<sup style='font-size:20px;'>°C</sup></span></td><td class='tg-baqh'><img class='icon-klimat' src='modules/Klimatampio/icons/power.png'></br><span class='txt-klimat'>Licznik</span></br><span class='txt-klimat big-klimat'>"+prad1+"<sup style='font-size:20px;'>kWh</sup></span></td></tr><tr style='position:relative;top:-55px;'><td class='tg-baqh'><img class='icon-klimat' src='modules/Klimatampio/icons/press.png'></br><span class='txt-klimat'>Ciśnienie</span></br><span class='txt-klimat big-klimat'>"+cis+"<sup style='font-size:20px;'>hPa</sup></span></td><td class='tg-baqh'><img class='icon-klimat' src='modules/Klimatampio/icons/bolt.png'></br> <span class='txt-klimat'>Moc</span></br><span class='txt-klimat big-klimat'>"+prad2+"<sup style='font-size:20px;'>W</sup></span></td></tr><tr style='position:relative;top:-110px;'><td class='tg-baqh'> <img class='icon-klimat' src='modules/Klimatampio/icons/drop.png'><span class='txt-klimat'>Wilgotność</span></br><span class='txt-klimat big-klimat'>"+wilg+"<sup style='font-size:20px;'>%</sup></span></td><td class='tg-baqh'><img class='icon-klimat' src='modules/Klimatampio/icons/plant.png'></br><span class='txt-klimat'>Ogród</span></br><span class='txt-klimat big-klimat' style='color: hsl("color", 100%, 40%);'>"+rosl+"<sup style='font-size:20px;'>%</sup></span></td></tr></table>";
    				}
  			}
  		}, 3000)
	},
});
