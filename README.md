# Google Maps Plugin

This plugin will create an interactive map using [Google's Maps JavaScript API v3](https://developers.google.com/maps/documentation/javascript/). It will create a map in the specified HTML element, center the map on the specified Lat/Long coordinates, plot a marker for each valid marker supplied (and add in an infowindow if supplied), and will number each marker.

## Implementing

First, source the Google Maps API script with your API Key ([optional, depending on needs](http://stackoverflow.com/questions/2769148/whats-the-api-key-for-in-google-maps-api-v3)) and source the plugin JS file:

```html
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=[YOUR_KEY_HERE]"></script>
<script type="text/javascript" src="path/to/map-plugin.js"></script>
```

Next, add an emtpy HTML element for the map and some small CSS:

```html
<div id="map-holder"></div>
```

```css
#map-holder {
  display: block;
  margin: 0 auto;
  width: 600px;
  height: 100%;
  max-height: 600px;
}
```

Last, include the initialization command `mapPlugin.createMap()` at the bottom of the HTML before the closing `</body>` tag to create the map with markers:

```html
<script>
  mapPlugin.createMap('map-holder', 37.09024, -95.71289100000001, 
                      [
                        {
                          lat:39.982094,
                          long:-75.154679,
                          infoContent:'<p>Something here <a href="https://google.com">Google</a></p>',
                          maxWidth: 150
                        },
                        {
                          lat:38.982094,
                          long:-74.154679,
                          infoContent:'<p>Something over here too <a href="https://google.com">Google</a></p>',
                          maxWidth: 500
                        }
                      ],
                      true
  );
</script>
```

# License

©2015 Paul Molluzzo — MIT License