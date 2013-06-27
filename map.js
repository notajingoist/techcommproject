// $(document).ready(function(){
//   initialize();
// });

/* ##########################################
 * Initialize the map and customize its style
 * ########################################## */


/* loads the map and sets options like initial location and zoom */
function initialize(printersJson) {
  var printers = {};
  printers = JSON.parse(printersJson);

  console.log('initializing');
  var myLatlng = new google.maps.LatLng(40.44258, -79.94333);
  var mapOptions = {
    center: myLatlng,
    zoom: 17,
    disableDefaultUI: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById("map-canvas"),
      mapOptions);

  /* applies the style below (no labels, desaturated colors) */
  map.setOptions({styles: styles});

  createButtons(printers);
  drawMarkers(printers);
  setupMarkerEvents(printers);
};

var styles = [
  {
    stylers: [
      { saturation: -20 }
    ]
  },{
    featureType: "road",
    elementType: "geometry",
    stylers: [
      { lightness: 100 },
      { visibility: "simplified" }
    ]
  },{
    featureType: "all",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  }
];

/* ##########################################
 * Create the markers and control buttons
 * ########################################## */

function createMarkers() {

}

var map;
var markers = [];

/* get JSON file with information about the printers */
// var printers = {};
// printers = printersJson;
// var http_request = new XMLHttpRequest();
// http_request.open("GET", "printers.json", true);

// http_request.onreadystatechange = function () {
//   var done = 4, ok = 200;
//   if (http_request.readyState == done && http_request.status == ok) {
//     printers = JSON.parse(http_request.responseText);
    
//     //printers = JSON.parse(getPrintersJson());
//     /* when data is received, create markers and controls using it */
    // createButtons();
    // drawMarkers();
    // setupMarkerEvents();
//   }
// };
// http_request.send(null);

/* creates the buttons that simulate interactions with the list view */
function createButtons(printers) {
  var div = document.getElementById("button-tray");
  for (printer in printers) {
    var button = document.createElement("button");
    button.style = "display:block";
    button.id = printer;
    button.innerHTML = printers[printer].name;
    button.onclick = makePanToCenter(printers, printer);
    div.appendChild(button);
  }
};

/* creates the marker for a printer */
function addMarker(printers, buttonId) {
  var working;
  if (printers[buttonId].working) {
    working = "00b303";
  }
  else {
    working = "e30000";
  }
  markers.push(new google.maps.Marker({
    position: new google.maps.LatLng(printers[buttonId].lat,
                                     printers[buttonId].lon),
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 6,
      strokeColor: "1f1f1f",
      strokeWeight: 2,
      strokeOpacity: .3,
      fillColor: working,
      fillOpacity: 1
    },
    map: map,
    draggable: false,
    title: printers[buttonId].name
  }));
};

/* iterates through all printers and creates markers for them */
function drawMarkers(printers) {
  for (printer in printers) {
    addMarker(printers, printer);
  }
};

/* ##########################################
 * Respond to user interaction
 * ########################################## */

/* attaches events to markers that center the map on them when touched */
function setupMarkerEvents(printers) {
  for (i in markers) {
    var marker = markers[i];
    google.maps.event.addListener(marker, 'click', makeCenter(marker) );
  }
};

function getMarkers() {
  return markers;
}

// var setupListMarkerEvents = function setupListMarkerEvents(name) {
//   for (i in markers) {
//     var marker = markers[i];
//     if (marker.getTitle() === name) {
//       makeCenter(marker);
//     }
//   }
//   // for (var printer in printers) {
//   //   if (printers[printer].name === name) {

//   //   }
//   // }
// };

/* helper for setupMarkerEvents */
function makeCenter(marker) {
  function center() {
    map.panTo(marker.getPosition());
  };
  return center;
}

/* used by the buttons to center the map on the markers */
function makePanToCenter(printers, printerId) {
  function panToCenter() {
    var target = new google.maps.LatLng(printers[printerId].lat,
                                        printers[printerId].lon);
    map.panTo(target);
  };
  return panToCenter;
};
