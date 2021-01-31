// Creating map object
var myMap = L.map("mapid", {
    center: [40.7128, -74.0059],
    zoom: 2
});
  
  // Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(myMap);
  
// Use this link to get the geojson data.
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";
  
// Function that will determine the color of a neighborhood based on the borough it belongs to
function chooseColor(mag) {
    switch (true) {
    case mag > 7:
      return "red";
    case mag > 6.4 :
      return "salmon";
    case mag > 5.9:
      return "orange";
    case mag > 5.4:
      return "yellow";
    case mag > 4.9:
      return "greenyellow";
    default:
      return "green";
    }
}

// Grabbing our GeoJSON data..
d3.json(link).then(function (data) {
  // Creating a geoJSON layer with the retrieved data
  console.log(data);
  L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng);
        },
        onEachFeature: function (feature, layer) {
        layer.bindPopup(
            "<h3>" +
            feature.properties.place +
            ": " +
            feature.properties.mag +
            "</h3><hr><p>" +
            new Date(feature.properties.time) +
            "</p>"
        );
        },
        // Style each feature
        style: function(feature) {
            return {
            color: "white",
            // Call the chooseColor function to decide which color to color the magnitude
            fillColor: chooseColor(feature.properties.mag),
            fillOpacity: 0.5,
            weight: 1.5,
            radius: feature.properties.mag * 2,
            };
        }
    }).addTo(myMap);

    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function () {

        var div = L.DomUtil.create('div', 'info legend'),
            grades = [4.4, 4.9, 5.4, 5.9, 6.4, 6.9];
            labels = [];
            colors = ["green", "greenyellow", "yellow", "orange", "salmon", "red"];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + colors[i] + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }

        return div;
    };

    legend.addTo(myMap);
});
