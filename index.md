---
layout: default
---

<div class="wrapper">
  <div id="map-holder"></div>
</div>

Create a new map by calling `mapPlugin.createMap()` with the id of the DOM element that contains the map, the lat/long for centering the map, an array of map markers to add, and a boolean for whether or not to number the pins.

For each map marker you can add the lat/long, the HTML content if the infowindow, and the maximum width of the infowindow. Clicking on the pin will show the infowindow and move the map to ensure it fits.

An example:

```javascript

var markers = [
                {
                  lat:40.7412541,
                  long:-74.0031284,
                  infoContent:'<p>This is <a href="https://google.com">Google</a></p>',
                  maxWidth: 150
                },
                {
                  lat:40.7638337,
                  long:-73.9729656,
                  infoContent:'<p>This is <a href="https://apple.com">Apple</a></p>',
                  maxWidth: 500
                }
              ];

mapPlugin.createMap('map-holder',
                    37.09024, -95.71289100000001,
                    markers,
                    true
                    )
```

<script>
  var markers = [
                {
                  lat:40.7412541,
                  long:-74.0031284,
                  infoContent:'<p>This is <a href="https://google.com">Google</a></p>',
                  maxWidth: 150
                },
                {
                  lat:40.7638337,
                  long:-73.9729656,
                  infoContent:'<p>This is <a href="https://apple.com">Apple</a></p>',
                  maxWidth: 500
                }
              ];

mapPlugin.createMap('map-holder',
                    40.7638337, -73.97296560000001,
                    markers,
                    true
                    )
</script>