Module.register("Klimatampio", {
	default: {
		ip: "10.0.0.215",
		blok_1: ["Temperatura","temp.png","°C",322],
		blok_2: ["Ciśnienie","cis.png","hPa",322],
		blok_3: ["Wilgotność","wilg.png","%",322],
		blok_4: ["Licznik","power.png","kWh",322],
		blok_5: ["Moc","bolt.png","W",322],
		blok_6: ["Ogród","plant.png","%",322],
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
		var tempid = this.config.blok_1[3]-1; 
		var wilgid = this.config.blok_2[3]-1;
		var cisid = this.config.blok_3[3]-1;
		var prad1id = this.config.blok_4[3]-1;
		var prad2id = this.config.blok_5[3]-1;
		var roslid = this.config.blok_6[3]-1;
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
					if(rosl>=20 & rosl<=50){
						color = (rosl-20)*4;
					}else if(rosl<20){
						color = 0;
					}else{
						color = 120;
					}
      				document.getElementById("klimatampio").innerHTML = "<table class='tg'><tr><td class='tg-baqh'><img class='icon-klimat' src='modules/Klimatampio/icons/"+blok_1[1]+"'><span class='txt-klimat'>"+blok_1[0]+"</span></br><span class='txt-klimat big-klimat'>"+temp+"<sup style='font-size:20px;'>"+blok_1[2]+"</sup></span></td><td class='tg-baqh'><img class='icon-klimat' src='modules/Klimatampio/icons/"+blok_4[1]+"'></br><span class='txt-klimat'>"+blok_4[0]+"</span></br><span class='txt-klimat big-klimat'>"+prad1+"<sup style='font-size:20px;'>"+blok_4[2]+"</sup></span></td></tr><tr style='position:relative;top:-55px;'><td class='tg-baqh'><img class='icon-klimat' src='modules/Klimatampio/icons/"+blok_2[1]+"'></br><span class='txt-klimat'>"+blok_2[0]+"</span></br><span class='txt-klimat big-klimat'>"+cis+"<sup style='font-size:20px;'>"+blok_2[2]+"</sup></span></td><td class='tg-baqh'><img class='icon-klimat' src='modules/Klimatampio/icons/"+blok_5[1]+"'></br> <span class='txt-klimat'>"+blok_5[0]+"</span></br><span class='txt-klimat big-klimat'>"+prad2+"<sup style='font-size:20px;'>"+blok_5[2]+"</sup></span></td></tr><tr style='position:relative;top:-110px;'><td class='tg-baqh'> <img class='icon-klimat' src='modules/Klimatampio/icons/"+blok_3[1]+"'><span class='txt-klimat'>"+blok_3[0]+"</span></br><span class='txt-klimat big-klimat'>"+wilg+"<sup style='font-size:20px;'>"+blok_4[2]+"</sup></span></td><td class='tg-baqh'><img class='icon-klimat' src='modules/Klimatampio/icons/"+blok_6[1]+"'></br><span class='txt-klimat'>"+blok_6[0]+"</span></br><span class='txt-klimat big-klimat' style='color: hsl("+color+", 100%, 40%);'>"+rosl+"<sup style='font-size:20px;'>"+blok_6[2]+"</sup></span></td></tr></table>";
    				}
  			}
  		}, 3000)
	},
});
