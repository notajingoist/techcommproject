/* 
 * Sorry couldn't figure out how to save the updated results to the printers.json file
 * So, right now, you have to call getPrintersJson() inside map.js to get the printers json object
*/

var storeData = (function () {
	var html;
	var json;
	function load() {
		$.ajax({ 
			async: false,
			url: 'http://clusters.andrew.cmu.edu/printerstats/', 
			type: "GET",
			dataType: "html",
			success: function(data) { 
						html = data;
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
											var printerName = getPrinterName(allRows[i]);
											var printerStatus = getPrinterStatus(allRows[i]);
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
							
							// $.post("savePrinterStats.php", { json : JSON.stringify(blah)}, function(replyData) {
							// 	return 
							// });
						json = changeJson.getJson();
					} 
		});
	}

	return {
		load : function() {
			if (html) return;
			load();
		},
		getHtml: function() {
			if (!html) load();
			return html;
		},
		getJson: function() {
			if (!json) load();
			return json;
		}
	}
	
})();

function getPrinterName(html) {
	return $(html).find("td:first-child").text();
}

function getPrinterStatus(html) {
	return $(html).find("td:nth-child(4)").text();
}

function getPrintersJson() {
	return storeData.getJson();
}


// $(document).ready(function(){
// 	var blah = getPrintersJson();
// 	console.log(blah);
// });






