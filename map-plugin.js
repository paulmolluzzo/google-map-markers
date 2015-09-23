/**
 * Create a map with markers using Google's Maps JavaScript API v3
 * Author: Paul Molluzzo - paul@molluzzo.com
 * ©2015 MIT License
 */

(function(ns, google){

  'use strict';

  var marker;

  /**
   * Check if a Marker has a valid lat/long
   * @param  {object} markerObj This is an individual marker from the array supplied in the createMap() function
   * @return {boolean}          Returns true/false depending on validity of the MarkerObj lat/long
   */
  function validateLatLong(markerObj) {
    if (typeof markerObj.lat !== 'undefined' && typeof markerObj.lat === 'number' && typeof markerObj.long !== 'undefined' && typeof markerObj.long === 'number') {
      return true;
    }

    return false;
  }

  /**
   * Check if a Marker has valid content for an info window
   * @param  {object} markerObj This is an individual marker from the array supplied in the createMap() function
   * @return {boolean}          Returns true/false depending on validity of the MarkerObj infoContent
   */
  function validateInfoContent(markerObj) {
    if (typeof markerObj.infoContent !== 'undefined' && typeof markerObj.infoContent === 'string')
      return true;

    return false;
  }

  /**
   * initialize the Map Plugin
   * @param  {string}   mapElementId The HTML element that will hold the map. Must be an id not a class.
   * @param  {integer}  startingLat  The latitude used to center the map if no markers are listed.
   * @param  {integer}  startingLong The longitude used to center the map if no markers are listed.
   * @param  {array}    markersArr   An array of markers to add to the map. Each marker is an object with the following key/values:
   *         For each marker Object
   *                    lat         {integer}   The latitude for the marker (required)
   *                    long        {integer}   The longitude for the marker (required)
   *                    infoContent {string}    The HTML content of the info window shown when clicking a marker
   *                    maxWidth    {integer}   The max width of the info window in px. Defaults to 400.
   * @param  {boolean}  showNumber  If true, will number the markers placed on the map.
   */
  ns.createMap = function(mapElementId, startingLat, startingLong, markersArr, showNumber) {

    // default the number param to false
    var willShow = showNumber || false;

    // initialize the map
    var map = new google.maps.Map(document.getElementById(mapElementId), {
      zoom: 4,
      center: new google.maps.LatLng(startingLat,startingLong)
    });

    // take the array of requested markers provided, create Google Maps LatLng objects, fit the map, add a marker to the map
    if (markersArr.length > 0) {

      var markerCount = 1;

      var bounds = new google.maps.LatLngBounds(),
          markerList = [];

      // iterate over the array, check the data, create a marker
      for (var i = 0; i < markersArr.length; i++) {

        // check that lat and long are there and are numbers
        if (validateLatLong(markersArr[i])) {

          // add lat/long to markerList as google.maps.LatLng
          markerList.push(new google.maps.LatLng(markersArr[i].lat,markersArr[i].long));

          // set the center of the map to that new marker
          map.setCenter(new google.maps.LatLng(markersArr[i].lat,markersArr[i].long));

          // expand the map to fit the whole list of added markers
          bounds.extend(markerList[markerCount-1]);

          // add the marker to the map
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(markersArr[i].lat,markersArr[i].long),
            map: map,
            icon: ''
          });

          // if the showNumber param is true, number the marker
          if (willShow) {
            marker.icon = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld='+markerCount+'|FF0000|000000';
          }

          // add an info window if there is something in the info window key
          if (validateInfoContent(markersArr[i])) {

            // set marker HTML to the infoContent
            marker.html = markersArr[i].infoContent;
            marker.infoWidth = markersArr[i].maxWidth || 400;

            // create an info window
            var infowindow = new google.maps.InfoWindow({
                content: markersArr[i].infoContent,
                maxWidth: marker.infoWidth
            });

            //add event listener to show info window
            google.maps.event.addListener(marker, 'click', function() {
              infowindow.setContent(this.html);
              infowindow.maxWidth = this.infoWidth;
              infowindow.open(map, this);
            });
          }

          // increment added marker count
          markerCount++;
        }
      }

      // ensure that the map isn't too small when there are few markers that are very close together
      if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
         var extendPoint1 = new google.maps.LatLng(bounds.getNorthEast().lat() + 0.01, bounds.getNorthEast().lng() + 0.01);
         var extendPoint2 = new google.maps.LatLng(bounds.getNorthEast().lat() - 0.01, bounds.getNorthEast().lng() - 0.01);
         bounds.extend(extendPoint1);
         bounds.extend(extendPoint2);
      }

      // fit the map to show all the markers
      map.fitBounds(bounds);
      }

      console.log(map.center);
  };
}(this.mapPlugin = this.mapPlugin || {}, google));
