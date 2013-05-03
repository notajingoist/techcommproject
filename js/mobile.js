function close_list() {
  var list = document.getElementById("list");
  var map_overlay = document.getElementById("map-overlay");
  var list_overlay = document.getElementById("list-overlay");
  list.style.left = "85%";
  map_overlay.style.display = "none";
  list_overlay.style.display = "block";
}

function open_list() {
  var list = document.getElementById("list");
  var map_overlay = document.getElementById("map-overlay");
  var list_overlay = document.getElementById("list-overlay");
  list.style.left = "15%";
  list_overlay.style.display = "none";
  map_overlay.style.display = "block";
}

printers = JSON.parse(getPrintersJson());

function create_list() {
  var list = document.getElementById("list-content");
  for (printer in printers) {
    var label = document.createElement("p");
    label.id = printer;
    var label_text = document.createTextNode(printer.name);
    label.appendChild(label_text);
    label.onclick = makePanToCenter(printer);
    list.appendChild(label);
  }
}

function makePanToCenter(printerId) {
  function panToCenter() {
    var target = new google.maps.LatLng(printers[printerId].lat, printers[printerId].lon);
    map.panTo(target);
  };
  return panToCenter;
};

create_list();
