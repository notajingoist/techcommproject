Overview
  My goal was to try out many of the API features that I thought we would be
  likely to use. It's not meant to look pretty, but it demonstrates that we
  can do what we need with the API. The buttons on the side are simulating
  interactions with the list view. Clicking one of the buttons causes the map
  to react the same way it would when the user touches the name of a printer
  in the list view. This demo works on mobile and desktop, although neither
  has any sort of optimal arrangement.


API Features Used
  Custom markers: the circles representing printers automatically change color
    according to the data in printers.json. They're generated from built-in
    vector symbols in the API, but I think they look a little rough, so we may
    want to use our own images instead.

  Map controls: the map centers on markers when they or their corresponding
    buttons are touched. Zoom level can also be controlled, although it isn't
    in the demo.

  Custom map styles: I removed all of the labels, simplified the way roads are
    displayed, and desaturated the colors. We could completely redo the color
    scheme if we wished, selectively show or hide features and labels, etc.


How It Works
  The script pulls data (names, status, etc.) from printers.json, and then
  uses that to generate markers on the map and buttons to model interactions
  with the list view. It attaches event listeners to the buttons and markers
  so that the map will be centered on the printer the user selected.


Running the map
  I've set the API key to only work for requests from *.andrew.cmu.edu/*
  because otherwise anyone could use it and burn up our quota (several
  thousand hits per day, so we should be fine as long as we're the only ones
  using it). So it won't work if you run it locally on your own machine. You
  can view it live at http://www.andrew.cmu.edu/user/rmmontgo/map.html, or you
  should be able to run it from your own space if you want.
