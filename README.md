# USGS Earthquake Mapping

The purpose of this project is to create an interactive data visualization of earthquakes that occurred 
worldwide. Data is collected from [United States Geological Survey](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php), drawing on a revolving 7-day significant earthquake (4.5 and greater magnitude) dataset. Both the magnitude and depth of the earthquakes are captured using radius size for magnitude and color for the depth. In addition, options are given to show the map with tetonic plates, and with different mapping topographies.

The program is written using javascript Leaflet and D3 libraries, and Mapbox is utilized for mapping and location via an API call.

## Launch

#### Simple Map
[Leaflet-Step-1](https://github.com/fisher1916/Leaflet-Challenge/tree/main/Leaflet-Step-1) provides a basic map for magnitude size visualization. 
* [Leaflet-Step-1/index.html](https://github.com/fisher1916/Leaflet-Challenge/blob/main/Leaflet-Step-1/index.html) provides the javascript and main html to view the output. 
* [Leaflet-Step-1/static/js/logic.js](https://github.com/fisher1916/Leaflet-Challenge/blob/main/Leaflet-Step-1/static/js/logic.js) is the main code file to run the application. It calls the API for both USGS and Mapbox, creates the legend, sets tooltips, and configures color scheme based on magnitude size.
* [Leaflet-Step-1/static/css/style.css](https://github.com/fisher1916/Leaflet-Challenge/blob/main/Leaflet-Step-1/static/css/style.css) creates the styling for the webpage.

#### More Complex Map
[Leaflet-Step-2](https://github.com/fisher1916/Leaflet-Challenge/tree/main/Leaflet-Step-2) provides an interactive map with controls for earthquake magnitude and depth, and tetonics plates in an overlay. It also allows for 3 different mapping topographies in the base layer. 
* [Leaflet-Step-2/index.html](https://github.com/fisher1916/Leaflet-Challenge/blob/main/Leaflet-Step-2/index.html) provides the javascript and main html to view the output. 
* [Leaflet-Step-2/static/js/logic.js](https://github.com/fisher1916/Leaflet-Challenge/blob/main/Leaflet-Step-2/static/js/logic.js) is the main code file to run the application. It calls the API for both USGS and Mapbox, creates the legend, sets tooltips, and configures color scheme based on magnitude size.
* [Leaflet-Step-2/static/data/tetonicPlates.json](https://github.com/fisher1916/Leaflet-Challenge/blob/main/Leaflet-Step-2/static/data/tetonicPlates.json) is the data file for the tetonic plates. 
* [Leaflet-Step-2/static/css](https://github.com/fisher1916/Leaflet-Challenge/tree/main/Leaflet-Step-2/static/css) creates the styling for the webpage.

## Screenshots

[`Earthquake Magnitude`](Images/earthquakeMagnitude.PNG)
[`Greyscale`](Images/Greyscale.PNG) - Displays world map with tetonic plates, and earthquake magnitude and depth.
[`Satellite`](Images/satEarthquake.PNG) - Displays satellite view of world map with tetonic plates, and earthquake magnitude and depth.

## Contributions
The data to map the tetonic plates was provided by [https://github.com/fraxen/tectonicplates](https://github.com/fraxen/tectonicplates/blob/master/GeoJSON/PB2002_boundaries.json)
