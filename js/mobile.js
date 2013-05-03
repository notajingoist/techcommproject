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
