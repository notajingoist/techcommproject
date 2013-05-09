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
						html = data.responseText;
						//console.log(html);
						var oddRows = $(html).find(".epi-dataTable").find("tbody").find(".epi-rowOdd");
						//console.log(oddRows);
						var evenRows = $(html).find(".epi-dataTable").find("tbody").find(".epi-rowEven");
						//console.log(html);
						var allRows = [];
						for (var i = 0; i < oddRows.length; i++) {
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

function writeJson() {
    var fs = require('fs');
    var jsonstr = JSON.stringify(getPrintersJson());
    fs.writeFile('printers.json', jsonstr, function(err) {
        if(err) { console.log (err); }
        else    { console.log ('success!\n'); }
    });
}

// console.log(getPrintersJson());


$(document).ready(function(){
	var blah = getPrintersJson();
	//console.log(blah);
});



















// $.get('http://clusters.andrew.cmu.edu/printerstats/', function(res) { //get the html source of this website
//     var oddRows = $(res.responseText).find(".epi-dataTable").find("tbody").find(".epi-rowOdd");
//     var evenRows = $(res.responseText).find(".epi-dataTable").find("tbody").find(".epi-rowEven");
//     var allRows = [];
//     for (var i = 0; i < oddRows.length; i++) {
//     	if (i < evenRows.length) {
//     		allRows.push(evenRows[i]);
//     	}
//     }
// });

// $(document).ready(function() {
	// var html;

	// $.ajax({ 
	// 		async: false,
	// 		url: 'http://clusters.andrew.cmu.edu/printerstats/', 
	// 		type: "GET",
	// 		dataType: "html",
	// 		success: function(data) { 
	// 			var allRows = [];
	// 			html = data.responseText;
				
	// 			$(html).find(".epi-dataTable").find("tbody").find(".epi-rowOdd").find("td:first-child").each(function() {
	// 				// var OddRows = [];
	// 				// oddRows.push($(this).text());
	// 				console.log($(this).text());
	// 			});
	// 		}
	// 	});
// }


// /* 
//  * Sorry couldn't figure out how to save the updated results to the printers.json file
//  * So, right now, you have to call getPrintersJson() inside map.js to get the printers json object
// */

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
						html = data.responseText;

						// $(html).find(".epi-dataTable").find("tbody").find(".epi-rowOdd").find("td:first-child").each(function() {
						// 	// var OddRows = [];
						// 	// oddRows.push($(this).text());
						// 	console.log($(this).text());
						// });
						//console.log(html);
						var oddRows = $(html).find(".epi-dataTable").find("tbody").find(".epi-rowOdd");
						//console.log(oddRows);
						var evenRows = $(html).find(".epi-dataTable").find("tbody").find(".epi-rowEven");
						//console.log(html);
						var allRows = [];
						for (var i = 0; i < oddRows.length; i++) {
							allRows.push(oddRows[i]);
							if (i < evenRows.length) {
								allRows.push(evenRows[i]);
							}
						}
						//console.log(allRows.length);

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
											//console.log(printerName);
											var printerStatus = $.trim(getPrinterStatus(allRows[i]));
											// console.log(printerStatus);
											// console.log("LALAL");
											if (printerStatus === "ready to print") {
												allPrinterStats[printerName].working = true;
												//console.log(printerName);
											} else {
												allPrinterStats[printerName].working = false;
												//console.log("false");
											}
										}
										json = allPrinterStats;
										//console.log(json);
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
									// console.log(json);
									return json;
								}
							}
						})();
							
							// $.post("savePrinterStats.php", { json : JSON.stringify(blah)}, function(replyData) {
							// 	return 
							// });
						console.log("got here");
						json = changeJson.getJson();
						console.log(json);
						//console.log(json);
						//return json;
						//console.log(json);
					} 
		});
		//console.log(json);
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
			//console.log(finaljson);
			//console.log(json);
			//return json;
			// console.log(finaljson);
			// return finaljson;
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
	storeData.load();
	// console.log(json);

	// var result = 
	//return storeData.getJson();
	//console.log(json);
	//console.log(result);
	//return json;
}

function writeJson() {
    var fs = require('fs');
    var jsonstr = JSON.stringify(getPrintersJson());
    fs.writeFile('printers.json', jsonstr, function(err) {
        if(err) { console.log (err); }
        else    { console.log ('success!\n'); }
    });
}

// console.log(getPrintersJson());


$(document).ready(function(){
	var blah = getPrintersJson();
	//console.log(blah);
});






// $.get('http://clusters.andrew.cmu.edu/printerstats/', function(res) { //get the html source of this website
//     var oddRows = $(res.responseText).find(".epi-dataTable").find("tbody").find(".epi-rowOdd");
//     var evenRows = $(res.responseText).find(".epi-dataTable").find("tbody").find(".epi-rowEven");
//     var allRows = [];
//     for (var i = 0; i < oddRows.length; i++) {
//     	if (i < evenRows.length) {
//     		allRows.push(evenRows[i]);
//     	}
//     }
// });

// $(document).ready(function() {
	// var html;

	// $.ajax({ 
	// 		async: false,
	// 		url: 'http://clusters.andrew.cmu.edu/printerstats/', 
	// 		type: "GET",
	// 		dataType: "html",
	// 		success: function(data) { 
	// 			var allRows = [];
	// 			html = data.responseText;
				
	// 			$(html).find(".epi-dataTable").find("tbody").find(".epi-rowOdd").find("td:first-child").each(function() {
	// 				// var OddRows = [];
	// 				// oddRows.push($(this).text());
	// 				console.log($(this).text());
	// 			});
	// 		}
	// 	});
// }


// /* 
//  * Sorry couldn't figure out how to save the updated results to the printers.json file
//  * So, right now, you have to call getPrintersJson() inside map.js to get the printers json object
// */
var load = function(html) {
	var json;
	// $(html).find(".epi-dataTable").find("tbody").find(".epi-rowOdd").find("td:first-child").each(function() {
	// 	// var OddRows = [];
	// 	// oddRows.push($(this).text());
	// 	console.log($(this).text());
	// });
	//console.log(html);
	var oddRows = $(html).find(".epi-dataTable").find("tbody").find(".epi-rowOdd");
	//console.log(oddRows);
	var evenRows = $(html).find(".epi-dataTable").find("tbody").find(".epi-rowEven");
	//console.log(html);
	var allRows = [];
	for (var i = 0; i < oddRows.length; i++) {
		allRows.push(oddRows[i]);
		if (i < evenRows.length) {
			allRows.push(evenRows[i]);
		}
	}
	//console.log(allRows.length);

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
						//console.log(printerName);
						var printerStatus = $.trim(getPrinterStatus(allRows[i]));
						// console.log(printerStatus);
						// console.log("LALAL");
						if (printerStatus === "ready to print") {
							allPrinterStats[printerName].working = true;
							//console.log(printerName);
						} else {
							allPrinterStats[printerName].working = false;
							//console.log("false");
						}
					}
					json = allPrinterStats;
					//console.log(json);
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
				// console.log(json);
				return json;
			}
		}
	})();
		
		// $.post("savePrinterStats.php", { json : JSON.stringify(blah)}, function(replyData) {
		// 	return 
		// });
	console.log("got here");
	json = changeJson.getJson();
	console.log(json);

	return json;
	//return json;
	//return json;
	//console.log(json);
	//return json;
	//console.log(json);
}

function storeData (callback) {
	// var html;
	// function load() {
		$.ajax({ 
			async: false,
			url: 'http://clusters.andrew.cmu.edu/printerstats/', 
			type: "GET",
			dataType: "html",
			success: function(data) { 
						//html = data.responseText;
						callback(data.responseText);
						//console.log(json);
			} 
		});

}


