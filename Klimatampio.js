Module.register("Klimatampio", {
	default: {
		ip: "10.0.0.215",
		blok_1: ["Temperatura","temp.png","°C",322,false],
		blok_2: ["Ciśnienie","cis.png","hPa",332,false],
		blok_3: ["Wilgotność","drop.png","%",322,false],
		blok_4: ["Licznik","power.png","kWh",322,false],
		blok_5: ["Moc","bolt.png","W",322,false],
		blok_6: ["Ogród","plant.png","%",322,false],
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
		var valid = [
			this.config.blok_1[3]-1,
			this.config.blok_2[3]-1,
			this.config.blok_3[3]-1,
			this.config.blok_4[3]-1,
			this.config.blok_5[3]-1,
			this.config.blok_6[3]-1
			];
		var xhttp = new XMLHttpRequest();
		var json = [];
		var self = this;
  		setInterval(function (){
  			xhttp.open("get", link, true);
			xhttp.setRequestHeader("Authorization", "Basic " + btoa("admin:ampio"));
  			xhttp.send();
  			xhttp.onreadystatechange = function() {
    			if (this.readyState == 4) {
      				json = JSON.parse(this.response).List;
				var val = [
					(json[valid[0]].stan*100)/100,
					json[valid[1]].stan,
					json[valid[2]].stan,
					json[valid[3]].stan,
					json[valid[4]].stan,
					json[valid[5]].stan/10
				];
      				document.getElementById("klimatampio").innerHTML = "<table class='tg'><tr><td class='tg-baqh'><img class='icon-klimat' src='modules/Klimatampio/icons/"+self.config.blok_1[1]+"'><span class='txt-klimat'>"+self.config.blok_1[0]+"</span></br><span class='txt-klimat big-klimat' style='color: hsl("+self.color(val[0], self.config.blok_1[4], self.config.blok_1[5], self.config.blok_1[6], self.config.blok_1[7])+");'>"+val[0]+"<sup style='font-size:20px;'>"+self.config.blok_1[2]+"</sup></span></td><td class='tg-baqh'><img class='icon-klimat' src='modules/Klimatampio/icons/"+self.config.blok_4[1]+"'></br><span class='txt-klimat'>"+self.config.blok_4[0]+"</span></br><span class='txt-klimat big-klimat' style='color: hsl("+self.color(val[3], self.config.blok_4[4], self.config.blok_4[5], self.config.blok_4[6], self.config.blok_4[7])+");'>"+val[3]+"<sup style='font-size:20px;'>"+self.config.blok_4[2]+"</sup></span></td></tr><tr style='position:relative;top:-55px;'><td class='tg-baqh'><img class='icon-klimat' src='modules/Klimatampio/icons/"+self.config.blok_2[1]+"'></br><span class='txt-klimat'>"+self.config.blok_2[0]+"</span></br><span class='txt-klimat big-klimat' style='color: hsl("+self.color(val[1], self.config.blok_2[4], self.config.blok_2[5], self.config.blok_2[6], self.config.blok_2[7])+");'>"+val[1]+"<sup style='font-size:20px;'>"+self.config.blok_2[2]+"</sup></span></td><td class='tg-baqh'><img class='icon-klimat' src='modules/Klimatampio/icons/"+self.config.blok_5[1]+"'></br> <span class='txt-klimat'>"+self.config.blok_5[0]+"</span></br><span class='txt-klimat big-klimat' style='color: hsl("+self.color(val[4], self.config.blok_5[4], self.config.blok_5[5], self.config.blok_5[6], self.config.blok_5[7])+");'>"+val[4]+"<sup style='font-size:20px;'>"+self.config.blok_5[2]+"</sup></span></td></tr><tr style='position:relative;top:-110px;'><td class='tg-baqh'> <img class='icon-klimat' src='modules/Klimatampio/icons/"+self.config.blok_3[1]+"'><span class='txt-klimat'>"+self.config.blok_3[0]+"</span></br><span class='txt-klimat big-klimat' style='color: hsl("+self.color(val[2], self.config.blok_3[4], self.config.blok_3[5], self.config.blok_3[6], self.config.blok_3[7])+");'>"+val[2]+"<sup style='font-size:20px;'>"+self.config.blok_3[2]+"</sup></span></td><td class='tg-baqh'><img class='icon-klimat' src='modules/Klimatampio/icons/"+self.config.blok_6[1]+"'></br><span class='txt-klimat'>"+self.config.blok_6[0]+"</span></br><span class='txt-klimat big-klimat' style='color: hsl("+self.color(val[5], self.config.blok_6[4], self.config.blok_6[5], self.config.blok_6[6], self.config.blok_6[7])+");'>"+val[5]+"<sup style='font-size:20px;'>"+self.config.blok_6[2]+"</sup></span></td></tr></table>";
    				}
  			}
  		}, 3000)
	},
	
	color: function(value, OnOff, min, max, invert){
	  var color;
	  var factor = 120/(max-min);
	  if (OnOff) {
	    if(value>=min & value<=max){
	      color = (value-min)*factor;
	      if(invert){
	        hsl = 120-color+",100%,40%";
	      }else{
	        hsl = color+",100%,40%";
	      }
	      return hsl;
	    }else if(value<min){
	      if(invert){
	        hsl = "120,100%,40%";
	      }else{
	        hsl = "0,100%,40%";
	      }
	      return hsl;
	    }else{
 	     if(invert){
	        hsl = "0,100%,40%";
	      }else{
	        hsl = "120,100%,40%";
	      }
	      return hsl;
	    }
	  }else{
	    hsl = "0,100%,100%";
	    return hsl;
	  }
	},
});
