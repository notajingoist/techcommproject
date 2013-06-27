var json;
var html;	
function loadData(callback) {
	$.ajax({ 
		async: false,
		url: 'http://clusters.andrew.cmu.edu/printerstats/', 
		type: "GET",
		dataType: "html",
		success: function(data) {
			html = data.responseText;
			var oddRows = $(html).find(".epi-dataTable").find("tbody").find(".epi-rowOdd");
			var evenRows = $(html).find(".epi-dataTable").find("tbody").find(".epi-rowEven");
			var allRows = [];
			for (var i = 0; i < oddRows.length; i++) {
				allRows.push(oddRows[i]);
				if (i < evenRows.length) {
					allRows.push(evenRows[i]);
				}
			}


			var changeJson = (function () {
				function loadJson() {
					var allPrinterStats = {};
					
					$.ajax({
						url: "printers.json",
						dataType: 'json',
						async: false,
						type: "GET",
						success: function(data) {
							allPrinterStats = data;
							for (var i = 0; i < allRows.length; i++) {
								var printerName = $.trim(getPrinterName(allRows[i]));
								var printerStatus = $.trim(getPrinterStatus(allRows[i]));
								if (printerStatus === "ready to print") {
									allPrinterStats[printerName].working = true;
								} else {
									allPrinterStats[printerName].working = false;
								}
							}
							json = allPrinterStats;
						}
					});
				}
				return {
					loadJson : function() {
						if (json) return;
						loadJson();
					},
					getJson: function() {
						if (!json) loadJson();
						return json;
					}
				}
			})();

			json = changeJson.getJson();
			callback(json);

		}
	});
} 



function getPrinterName(html) {
	return $(html).find("td:first-child").text();
}

function getPrinterStatus(html) {
	return $(html).find("td:nth-child(4)").text();
}


function writeJson(printersJson) {
    var fs = require('fs');
    var jsonstr = JSON.stringify(printersJson);
    fs.writeFile('printers.json', jsonstr, function(err) {
        if(err) { console.log (err); }
        else    { console.log ('success!\n'); }
    });
}


$(document).ready(function(){
	loadData(function(json) {
		//writeJson(json);
		var jsonStr = JSON.stringify(json);
		initialize(jsonStr);
		initList(jsonStr);
	});
	// loadData(function(json) {
	// 	console.log(json);
	// });
});






