/** ********* LOCATION API *********** */
function getLocation() {
  if (navigator.geolocation) {
    var options = {
      maximumAge : 30000
    // max. Alter der Position in ms
    };
    navigator.geolocation.getCurrentPosition(function(position) {
      ZeiraMobile.config.position = position;
      return position;
    }, function(error) {
      console.debug("GeoLocation error!");
      ZeiraApp.config.position = null;
    }, options);
  } else {
    console.debug("GeoLocation not supported!");
  }
}
