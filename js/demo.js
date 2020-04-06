const years = { 'Y1': 2006, 'Y2': 2010, 'Y3': 2020, 'Y4': 2030, 'Y5': 2040, 'Y6': 2050, 'Y7': 2060, 'Y8': 2070, 'Y9': 2080, 'Y10': 2090, 'Y11': 2099 };

var map, host, attribution, geoData, geoLayer, heatLayer, scenario, year, month;

// host = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}';
host = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
attribution = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

var layer = L.tileLayer(host, {
	attribution: attribution,
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
})

// Init map
map = L.map('map').setView([0, 0], 2);
map.addLayer(layer);

function init() {
	console.log("----- INITIALIZE MAP -----");
	
	// Get data from JSON and init markers & heatmap
	$.get('geojson.json', function (data) {
		geoData = data;
		console.log(data);
		

		scenario = $("#scenario").val();
		year = $("#years").val();
		month = $("#months").val();

		// ----- Init Heatmap -----
		// To replace existing heatmarkers with new ones
		try {
			map.removeLayer(heatLayer);
		} catch (error) { }

		var heatMapData = [];
		geoData.features.forEach(function (d) {
			let temperature = d.properties["Y" + year]["scenario" + scenario]["M" + month].temperature;
			heatMapData.push([d.geometry.coordinates[1], d.geometry.coordinates[0], temperature / 100]);
			console.log(temperature / 100);
		});

		heatLayer = L.heatLayer(heatMapData, {
			minOpacity: 0.5,
			// gradient: {
			// 	0: "#000000",
			// 	0.2: "#570000",
			// 	0.4: "#ff0000",
			// 	0.6: "#ffc800",
			// 	0.8: "#ffff00",
			// 	1: "#eee"
			// }
			gradient: {
				0: "#000000",
				0.2: "#570000",
				0.4: "#ff0000",
				0.6: "#ffc800",
				0.8: "#ffff00",
				1: "#eee"
			}
		});

		map.addLayer(heatLayer, { max: 20 });

		// ----- Add markers -----
		// To replace existing markers with new ones
		try {
			map.removeLayer(geoLayer);
		} catch (error) { }

		geoLayer = L.geoJSON(geoData, { onEachFeature: onEachFeature }).addTo(map);
	}, "json");

}


function onEachFeature(feature, layer) {
	layer.bindPopup(JSON.stringify(feature.properties["Y" + year]["scenario2"]["M" + month])).openPopup();
}

// ----------------------------------------------
init();