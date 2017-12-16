var map;

function initialize() {
  "use strict";
  var myLatlng = new google.maps.LatLng(37.774546, -122.433523);
  var mapOptions = {
    zoom: 12,
    center: myLatlng
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
  
  var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    title: 'Compacc Complete Accountancy'
  });
  
}

google.maps.event.addDomListener(window, 'load', initialize);
