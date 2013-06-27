function initList(printersJson) {
  var printers = {};
  printers = JSON.parse(printersJson);

  var updatedList = "";
  var buildings = [];
  for (var printer in printers) {
    var status = printers[printer].working;
    var name = printers[printer].name;
    var building = printers[printer].building;
    if (status) {
      // updatedList += "<li class='go'>"+name+"</li>";
      if (inArray(buildings, building)) {
        updatedList += "<li class='go sublist'>"+name+"</li>";
      } else {
        updatedList += "<li class='list'>"+building+"</li>"+"<li class='go sublist'>"+name+"</li>";
        buildings.push(building);
      }
    } else {
      // updatedList += "<li class='stop'>"+name+"</li>";
      if (inArray(buildings, building)) {
        updatedList += "<li class='stop sublist'>"+name+"</li>";
      } else {
        updatedList += "<li class='list'>"+building+"</li>"+"<li class='stop sublist'>"+name+"</li>";
        buildings.push(building);
      }
    }
  }
  var listItems = $("#listview ul");
  listItems.html(updatedList);
  // console.log($("#listview ul").html());

  setupEvents(listItems);

};

function inArray(array, element) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === element) {
      return true;
    }
  }
  return false;
}

function setupListMarkerEvents(name, markers) {
  for (i in markers) {
    var marker = markers[i];
    if (marker.getTitle() === name) {
      makeCenter(marker);
    }
  }
}



function setupEvents(listItems) {
  var names = [];
  var printerItems = [];
  $(listItems).find(".sublist").each(function() {
    names.push($(this).text());
    printerItems.push($(this));
  });

  // $(listItems).find(".sublist").click(function () {
  //   var name = $(this).text();
  //   names.push(name);
  // });

  var markers = getMarkers();

  for (var i = 0; i < names.length; i++) {
    console.log("setting up...");
    printerItems[i].click(function() {
      
    }); 
  }
  
}








