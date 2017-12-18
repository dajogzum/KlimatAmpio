Module.register("Klimatampio", {
	default: {
		ip: "10.0.0.215",
		blok_1: ["Temperatura","temp.png","°C",322,false,50,500,false],
		blok_2: ["Ciśnienie","cis.png","hPa",332,false,50,500,false],
		blok_3: ["Wilgotność","drop.png","%",322,false,50,500,false],
		blok_4: ["Licznik","power.png","kWh",322,false,50,500,false],
		blok_5: ["Moc","bolt.png","W",322,false,50,500,false],
		blok_6: ["Ogród","plant.png","%",322,false,50,500,false],
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
		var self = this;
  		setInterval(function (){
  			xhttp.open("get", link, true);
			xhttp.setRequestHeader("Authorization", "Basic " + btoa("admin:ampio"));
  			xhttp.send();
  			xhttp.onreadystatechange = function() {
    			if (this.readyState == 4) {
      				json = JSON.parse(this.response).List;
				var color;
				var val1 = (json[tempid].stan*100)/100;
				var val2 = json[wilgid].stan;
				var val3 = json[cisid].stan;
				var val4 = json[prad1id].stan;
				var val5 = json[prad2id].stan;
				var val6 = json[roslid].stan/10;
      				document.getElementById("klimatampio").innerHTML = "<table class='tg'><tr><td class='tg-baqh'><img class='icon-klimat' src='modules/Klimatampio/icons/"+self.config.blok_1[1]+"'><span class='txt-klimat'>"+self.config.blok_1[0]+"</span></br><span class='txt-klimat big-klimat style='color: hsl("+self.color(val1, self.config.blok_1[5], self.config.blok_1[6], self.config.blok_1[7], self.config.blok_1[8])+");'>"+val1+"<sup style='font-size:20px;'>"+self.config.blok_1[2]+"</sup></span></td><td class='tg-baqh'><img class='icon-klimat' src='modules/Klimatampio/icons/"+self.config.blok_4[1]+"'></br><span class='txt-klimat'>"+self.config.blok_4[0]+"</span></br><span class='txt-klimat big-klimat style='color: hsl("+self.color(val4, self.config.blok_4[5], self.config.blok_4[6], self.config.blok_4[7], self.config.blok_4[8])+");'>"+val4+"<sup style='font-size:20px;'>"+self.config.blok_4[2]+"</sup></span></td></tr><tr style='position:relative;top:-55px;'><td class='tg-baqh'><img class='icon-klimat' src='modules/Klimatampio/icons/"+self.config.blok_2[1]+"'></br><span class='txt-klimat'>"+self.config.blok_2[0]+"</span></br><span class='txt-klimat big-klimat style='color: hsl("+self.color(val2, self.config.blok_2[5], self.config.blok_2[6], self.config.blok_2[7], self.config.blok_2[8])+");'>"+val2+"<sup style='font-size:20px;'>"+self.config.blok_2[2]+"</sup></span></td><td class='tg-baqh'><img class='icon-klimat' src='modules/Klimatampio/icons/"+self.config.blok_5[1]+"'></br> <span class='txt-klimat'>"+self.config.blok_5[0]+"</span></br><span class='txt-klimat big-klimat style='color: hsl("+self.color(val5, self.config.blok_5[5], self.config.blok_5[6], self.config.blok_5[7], self.config.blok_5[8])+");'>"+val5+"<sup style='font-size:20px;'>"+self.config.blok_5[2]+"</sup></span></td></tr><tr style='position:relative;top:-110px;'><td class='tg-baqh'> <img class='icon-klimat' src='modules/Klimatampio/icons/"+self.config.blok_3[1]+"'><span class='txt-klimat'>"+self.config.blok_3[0]+"</span></br><span class='txt-klimat big-klimatstyle='color: hsl("+self.color(val3, self.config.blok_3[5], self.config.blok_3[6], self.config.blok_3[7], self.config.blok_3[8])+");'>"+val3+"<sup style='font-size:20px;'>"+self.config.blok_3[2]+"</sup></span></td><td class='tg-baqh'><img class='icon-klimat' src='modules/Klimatampio/icons/"+self.config.blok_6[1]+"'></br><span class='txt-klimat'>"+self.config.blok_6[0]+"</span></br><span class='txt-klimat big-klimat' style='color: hsl("+self.color(val6, self.config.blok_6[5], self.config.blok_6[6], self.config.blok_6[7], self.config.blok_6[8])+");'>"+val6+"<sup style='font-size:20px;'>"+self.config.blok_6[2]+"</sup></span></td></tr></table>";
    				}
  			}
  		}, 3000)
	},
	
	color: function(value, OnOff, min, max, invert){
	  var color;
	  var factor = 120/(max-min);
	  console.log(factor);
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
