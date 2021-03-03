// Creating map object
var myMap = L.map("mapid", {
    center: [30.7128, -17.1145],
    zoom: 3
});
  
  // Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 10,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(myMap);
  
// Use this link to get the geojson data.
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";
// var global_plates; 

// Function that will determine the color of a earthquake magnitude
function chooseColor(value) {
    switch (true) {
    case value > 90:
      return "red";
    case value > 69:
      return "salmon";
    case value > 49:
      return "orange";
    case value > 29:
      return "yellow";
    case value > 9:
      return "greenyellow";
    case value > -10:
      return "green";
    }
}

// Grabbing our GeoJSON data..
d3.json(link).then(function (data) {
  d3.json("static/data/tetonicPlates.json").then(function(plate) {
    // Creating a geoJSON layer with the retrieved data
    console.log(data);
    var quakeLayer = L.layerGroup();
    var tetonicPlates = L.layerGroup();
    var plateMap = L.geoJson(plate, {
      color: 'orange', 
      weight: 2
    });
    var quakeMap = L.geoJson(data, {
          pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng);
          },
          onEachFeature: function (feature, layer) {
          layer.bindPopup(
              "<h2>" +
              "Magnitude: " +
              feature.properties.mag +
              "<br>" + "Depth: " +
              feature.geometry.coordinates[2] +
              "</h2><hr>"+
              "<h3>"+
              "Location: " +
              feature.properties.place +
              "</h3><p>" +
              new Date(feature.properties.time) +
              "</p>"
          );
          
          },
          // Style each feature
          style: function(feature) {
              return {
              color: "white",
              // Call the chooseColor function to decide which color to color the magnitude
              fillColor: chooseColor(feature.geometry.coordinates[2]),
              fillOpacity: 0.5,
              weight: 1.5,
              radius: feature.properties.mag * 2,
              };
          }
      })
      quakeMap.addTo(quakeLayer);
      plateMap.addTo(tetonicPlates);

    // Define variables for our tile layers
    var light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "light-v10",
      accessToken: API_KEY
    });

    var dark = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "dark-v10",
      accessToken: API_KEY
    });

    var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 10,
      id: "mapbox/satellite-v9",
      accessToken: API_KEY
    });

    // Only one base layer can be shown at a time
    var baseMaps = {
      Satellite: satellite,
      Grayscale: light,
      Dark: dark
    };

    // Overlays that may be toggled on or off
    var overlayMaps = {
      Earthquakes: quakeLayer,
      Tetonic_Plates: tetonicPlates
    };

    // Pass our map layers into our layer control
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps).addTo(myMap);

    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function () {

        var div = L.DomUtil.create('div', 'info legend'),
            grades = [-10, 10, 30, 50, 70, 90];
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
});
