Module.register("klimatampio", {
	default: {
		ip: "192.168.1.130",
		id: "468",
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
		var link = "http://"+this.config.ip+":8060/api/json/device/"+this.config.id+"/state";
		var xhttp = new XMLHttpRequest();
		var json = [];
  		setInterval(function (){
  			xhttp.open("get", link, true);
			xhttp.setRequestHeader("Authorization", "Basic " + btoa("admin:ampio"));
  			xhttp.send();
  			xhttp.onreadystatechange = function() {
    			if (this.readyState == 4) {
      				json = JSON.parse(this.response).Results;
				var value = (json.state*100)/100;
				var wilg = "63%";
      				document.getElementById("klimatampio").innerHTML = "Temperatura: "+value+"&#186C</br>Wilgotność: "+wilg;
    				}
  			}
  		}, 60*1000)
	},
});