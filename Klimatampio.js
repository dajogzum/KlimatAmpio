Module.register("Klimatampio", {
	default: {
		ip: "192.168.0.23",
		usr: "admin",
		pswd: "ampio",
		bloki: [
			["Temperatura","temp.png","°C","",001,false],
			["Ciśnienie","press.png","hPa","",002,false],
			["Wilgotność","drop.png","%","",003,false],
			["Licznik","power.png","kWh","",004,false],
			["Moc","bolt.png","W","",005,false],
			["Ogród","plant.png","%","",006,false],
		],
	},

	start: function(){
		this.instertData();
	},

	getStyles: function() {
		return ["style_klimatampio.css"];
	},

	  getDom: function() {
		self = this;
		var cnt = 0;
		var tabele = this.config.bloki.length/2;
    		var wrapper = document.createElement("div");
    		table = document.createElement('table');
		table.className = 'tg';
    		for(var i = 0; i < tabele; i++){
        		var tr = table.insertRow();
        		tr.style.top = "-"+(55*i)+"px";
        		for(var j = 0; j < 2; j++){
          			var td = tr.insertCell();
          			td.className = "tg-baqh";
          			td.innerHTML = "<img class='icon-klimat' src='modules/Klimatampio/icons/"+self.config.bloki[cnt][1]+"'></br><span class='txt-klimat'>"+self.config.bloki[cnt][0]+"</span></br><span id='blok_"+(cnt+1)+"' class='txt-klimat big-klimat'>...</span>";
          			tr.appendChild(td);
          			cnt++;
        		}
    		}
    		wrapper.id = "klimatampio";
    		wrapper.appendChild(table);
    		return wrapper;
		},
	
        instertData: function (){
                var len = this.config.bloki.length
                var links = [];
                for (var i=0;i<len;i++){
                        links[i] = "http://"+this.config.ip+":8060/api/json/device/"+this.config.bloki[i][4]+"/state";
                };
                var xhttp = new XMLHttpRequest();
                var json = [];
                var self = this;
                setInterval(function (){
                        for(var i =0;i<len;i++)
                        {
console.log("for: "+i);
                                xhttp.open("get", links[i], false);
                                xhttp.setRequestHeader("Authorization", "Basic " + btoa(self.config.usr+":"+self.config.pswd));
                                xhttp.send();
                                xhttp.onreadystatechange = function() {
                                if (this.readyState == 4) {
                                        value = JSON.parse(this.response).Results.state;
                                        if(value == null){
                                                value = "Error";
                                        }else{
console.log("http: "+(i-1));
console.log(self.config.bloki[i]);
                                                value = eval(value+self.config.bloki[i][3]);
                                        }
                                        var target = document.getElementById("blok_"+(i+1));
                                        target.innerHTML = value+"<sup style='font-size:20px;'>"+self.config.bloki[i][2]+"</sup>";
                                        var color = self.color(value, self.config.bloki[i][5], self.config.bloki[i][6], self.config.bloki[i][7], self.config.bloki[i][8], self.config.bloki[i][9]);
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

	values: function(val, len, json, valid){
		self = this;
		for (var i = 0; i<len; i++){
			val[i] = json[valid[i]].stan;
			if(val[i] == null){
				val[i] = "Error";
			}else{
				val[i] = eval(val[i]+self.config.bloki[i][3]);
			}
		};
	return val;
	},
});
