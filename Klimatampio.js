Module.register("Klimatampio", {
	default: {
		ip: "192.168.0.23",
		bloki: [
			["Temperatura","temp.png","°C",001,false],
			["Ciśnienie","press.png","hPa",002,false],
			["Wilgotność","drop.png","%",003,false],
			["Licznik","power.png","kWh",004,false],
			["Moc","bolt.png","W",005,false],
			["Ogród","plant.png","%",006,false],
		],
	},

	start: function(){
		this.instertData();
	},

	getStyles: function() {
		return ["style_klimatampio.css"];
	},

	getDom: function() {
		var wrapper = document.createElement("div");
		var table = document.createElement("table");
		table.className = "tg";
		var row1 = table.insertRow(0);
		var cell1 = row1.insertCell(0);
		cell1.className = "tg-baqh";
		cell1.innerHTML = "<img class='icon-klimat' src='modules/Klimatampio/icons/"+this.config.bloki[0][1]+"'></br><span class='txt-klimat'>"+this.config.bloki[0][0]+"</span></br><span id='blok_1' class='txt-klimat big-klimat'>...</span>";
		var cell2 = row1.insertCell(1);
		cell2.className = "tg-baqh";
		cell2.innerHTML = "<img class='icon-klimat' src='modules/Klimatampio/icons/"+this.config.bloki[1][1]+"'></br><span class='txt-klimat'>"+this.config.bloki[1][0]+"</span></br><span id='blok_2' class='txt-klimat big-klimat'>...</span>";
		var row2 = table.insertRow(1);
		row2.style.position = "relative";
		row2.style.top = "-55px";
		var cell3 = row2.insertCell(0);
		cell3.className = "tg-baqh";
		cell3.innerHTML = "<img class='icon-klimat' src='modules/Klimatampio/icons/"+this.config.bloki[2][1]+"'></br><span class='txt-klimat'>"+this.config.bloki[2][0]+"</span></br><span id='blok_3' class='txt-klimat big-klimat'>...</span>";
		var cell4 = row2.insertCell(1);
		cell4.className = "tg-baqh";
		cell4.innerHTML = "<img class='icon-klimat' src='modules/Klimatampio/icons/"+this.config.bloki[3][1]+"'></br><span class='txt-klimat'>"+this.config.bloki[3][0]+"</span></br><span id='blok_4' class='txt-klimat big-klimat'>...</span>";
		var row3 = table.insertRow(2);
		row3.style.position = "relative";
		row3.style.top = "-110px";
		var cell5 = row3.insertCell(0);
		cell5.className = "tg-baqh";
		cell5.innerHTML = "<img class='icon-klimat' src='modules/Klimatampio/icons/"+this.config.bloki[4][1]+"'></br><span class='txt-klimat'>"+this.config.bloki[4][0]+"</span></br><span id='blok_5' class='txt-klimat big-klimat'>...</span>";
		var cell6 = row3.insertCell(1);
		cell6.className = "tg-baqh";
		cell6.innerHTML = "<img class='icon-klimat' src='modules/Klimatampio/icons/"+this.config.bloki[5][1]+"'></br><span class='txt-klimat'>"+this.config.bloki[5][0]+"</span></br><span id='blok_6' class='txt-klimat big-klimat'>...</span>";
		wrapper.id = "klimatampio";
		wrapper.appendChild(table);
		return wrapper;
	},

	instertData: function (){
		var link = "http://"+this.config.ip+":8060/api/json/devices";
		var valid = [
			this.config.bloki[0][3]-1,
			this.config.bloki[1][3]-1,
			this.config.bloki[2][3]-1,
			this.config.bloki[3][3]-1,
			this.config.bloki[4][3]-1,
			this.config.bloki[5][3]-1
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
				for(i=1;i<7;i++){
					var target = document.getElementById("blok_"+i);
					target.innerHTML = val[i-1]+"<sup style='font-size:20px;'>"+self.config.bloki[i-1][2]+"</sup>";
					var color = self.color(val[i-1], self.config.bloki[i-1][4], self.config.bloki[i-1][5], self.config.bloki[i-1][6], self.config.bloki[i-1][7], self.config.bloki[i-1][8]);
					target.style.color = "hsl("+color+")";
					};
    				}
  			}
  		}, 3000)
	},
	
	color: function(value, OnOff, min, max, invert, range){
	  if(range == ""){
		range = 120;
	  }
	  var color;
	  var factor = range/(max-min);
	  if (OnOff) {
	    if(value>=min & value<=max){
	      color = (value-min)*factor;
	      if(invert){
	        hsl = range-color+",100%,40%";
	      }else{
	        hsl = color+",100%,40%";
	      }
	      return hsl;
	    }else if(value<min){
	      if(invert){
	        hsl = range+",100%,40%";
	      }else{
	        hsl = "0,100%,40%";
	      }
	      return hsl;
	    }else{
 	     if(invert){
	        hsl = "0,100%,40%";
	      }else{
	        hsl = range+",100%,40%";
	      }
	      return hsl;
	    }
	  }else{
	    hsl = "0,100%,100%";
	    return hsl;
	  }
	},
});
