Module.register("Klimatampio", {
	default: {
		ampio_IP: "192.168.0.23",
		user: "admin",
		password: "ampio",
		controls: [
				{
				name: "Temperatura",
				icon: "temp.png",
				unit: "°C",
				modifier: "*1",
				device_id: 468,
				isColor: true,
				lowColor: 19,
				hiColor: 26,
				invertColor: true,
				startColor: 240
				},
        ],
	},

    

	start: function(){
		this.InstertData();
	},

	getStyles: function() {
		return ["style_klimatampio.css"];
	},

    getDom: function() {
        rootThis = this;
        var cnt = 0;
        var tableCount = this.config.controls.length/2;
	    var wrapper = document.createElement("div");
	    table = document.createElement("table");
        table.className = "tg";
	        for(var i = 0; i < tableCount; i++){
		        var tr = table.insertRow();
		        tr.style.top = "-"+(55*i)+"px";
		        for(var j = 0; j < 2; j++){
          			var td = tr.insertCell();
          			td.className = "tg-baqh";
          			td.innerHTML = "<img class='icon-klimat' src='modules/Klimatampio/icons/"+rootThis.config.controls[cnt].icon+"'></br><span class='txt-klimat'>"+rootThis.config.controls[cnt].name+"</span></br><span id='placeholder_"+rootThis.config.controls[cnt].device_id+"' class='txt-klimat big-klimat'>...</span>";
          			tr.appendChild(td);
          			cnt++;
		        }
	        }
	        wrapper.id = "klimatampio";
	        wrapper.appendChild(table);
	        return wrapper;
    },
	
    InstertData: function (){
        var len = this.config.controls.length-1;
        var rootThis = this;
        var positionToDevice = [];
        setInterval(function (){
                for(var i=0; i<len; i++)
                {
                    let xhttp = new XMLHttpRequest();
                    xhttp.open("get", "http://"+rootThis.config.ampio_IP+":8060/api/json/devices", true);
                    xhttp.setRequestHeader("Authorization", "Basic " + btoa(rootThis.config.user+":"+rootThis.config.password));
                    xhttp.onreadystatechange = function() {
                        if (this.readyState == 4 && this.status == 200) {
                            let response = JSON.parse(this.response).List;
                            if(positionToDevice.length===0){
                                positionToDevice = rootThis.FindArrayPosistions(response);
                            }
                            rootThis.ComputeResponse(response, positionToDevice);
                        }
                    }
                    xhttp.send();
                }
        }, 3000)
    },
	
    FindArrayPosistions: function(response){
        let rootThis = this;
        let maxItems = this.config.controls.length;
        let arrayLength = response.length;
        let foundArray = [];
        for(var i=0; i<arrayLength; i++){
            for(var j=0; j<maxItems; j++){
                let device_id = rootThis.config.controls[j].device_id
                if(response[i].id===device_id){
                    console.log(response[i], i);
                    foundArray[j] = {device_id: device_id, arrayPosition: i};
                }
            }
        }
        return foundArray;
    },

    ComputeResponse: function(response, postitionToDevice){
        let arrayLength = postitionToDevice.length;
        let rootThis = this;
        for(var i=0; i<arrayLength; i++){
            let item = postitionToDevice[i]
            let valueString = response[item.arrayPosition].stan;
            let valueInt = 0;
            if(valueString === "" || valueString==null){
                valueString = "...";
            }
            else{
                valueInt = eval(valueString + rootThis.config.controls[i].modifier);
            }
            var target = document.getElementById("placeholder_"+(item.device_id));
            target.innerHTML = valueInt + "<sup style='font-size:20px;'>"+rootThis.config.controls[i].unit+"</sup>";
            var colorResult = this.GetColor(valueInt, rootThis.config.controls[i].isColor, rootThis.config.controls[i].lowColor, rootThis.config.controls[i].hiColor, rootThis.config.controls[i].invertColor, rootThis.config.controls[i].startColor);
            target.style.color = "hsl("+colorResult+")";
        }

    },

	GetColor: function(value, OnOff, min, max, invert, range){
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
