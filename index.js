const years = { 'Y1': 2006, 'Y2': 2010, 'Y3': 2020, 'Y4': 2030, 'Y5': 2040, 'Y6': 2050, 'Y7': 2060, 'Y8': 2070, 'Y9': 2080, 'Y10': 2090, 'Y11': 2099 };

var map, host, attribution;
var scenario, year, month;

function initMap() {
	map = L.map('map').setView([0, 0], 2);
	host = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}'; // default : https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
	attribution = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

	L.tileLayer(host, {
		attribution: attribution,
		subdomains: 'abcd',
		minZoom: 0,
		maxZoom: 20,
		ext: 'png'
	}).addTo(map);
}


// ------- GeoJSON -------

var geoLayer;

function setGeoInformations() {
	// To replace existing markers with new ones
	try {
		map.removeLayer(geoLayer);
	} catch (error) {}

	scenario = $("#scenario").val();
	year = $("#years").val();
	month = $("#months").val();

	$.get('geojson.json', function (data) {
		geoLayer = L.geoJSON(data, { onEachFeature: onEachFeature }).addTo(map);
	}, "json");

}

function onEachFeature(feature, layer) {
	layer.bindPopup(JSON.stringify(feature.properties["Y" + year]["scenario2"]["M" + month])).openPopup();
}

initMap();
setGeoInformations();

// -------------------------