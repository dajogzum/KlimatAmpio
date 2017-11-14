Module.register("klimatampio", {
	default: {
		ip: "192.168.1.130",
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
		var link = "http://"+this.config.ip+":8060/api/json/device";
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
				var temp = (json[tempid].state*100)/100;
				var wilg = json[wilgid].state;
				var cis = json[cisid].state;
      				document.getElementById("klimatampio").innerHTML = "Temperatura: "+temp+"&#186C</br>Wilgotność: "+wilg+"%</br>Ciśnienie: "+cis+" hPa";
    				}
  			}
  		}, 60*1000)
	},
});
