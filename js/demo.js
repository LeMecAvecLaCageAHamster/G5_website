const years = { 'Y1': 2006, 'Y2': 2010, 'Y3': 2020, 'Y4': 2030, 'Y5': 2040, 'Y6': 2050, 'Y7': 2060, 'Y8': 2070, 'Y9': 2080, 'Y10': 2090, 'Y11': 2099 };

var map, host, attribution, geoData, geoLayer, heatLayer, scenario, year, month;

// host = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}';
host = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
attribution = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

var layer = L.tileLayer(host, {
	attribution: attribution,
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 5,
	ext: 'png'
})

// Init map
map = L.map('map').setView([0, 0], 2);
map.addLayer(layer);

function init() {
	scenario = $("#scenario").val();
	year = $("#years").val();
	month = $("#months").val();

	if (year < 3) {
		$("#scenario").prop('disabled', true);
	} else {
		$("#scenario").prop('disabled', false);
	}
	
	// Get data from JSON and init markers & heatmap
	$.get('geojson.json', function (data) {
		geoData = data;
	
		// ----- Init Heatmap -----
		// To replace existing heatmarkers with new ones
		try {
			map.removeLayer(heatLayer);
		} catch (error) { }

		var heatMapData = [];
		geoData.features.forEach(function (d) {
			
			let temperature;
			if (year < 3) {
				temperature = d.properties["Y" + year]["M" + month].temperature;
			} else {
				temperature = d.properties["Y" + year]["scenario" + scenario]["M" + month].temperature;
			}

			for (let i = 0; i < temperature; i++) {
				heatMapData.push([d.geometry.coordinates[1]+i/200, d.geometry.coordinates[0]+i/200, temperature / 100]);				
			}
		});

		heatLayer = L.heatLayer(heatMapData, {
			minOpacity: .5,
			max: 2,
			gradient: {
				0: "green",
				0.5: "yellow",
				0.75: "red",
				1: "blue",
			}
		});

		map.addLayer(heatLayer);
	}, "json");

}

// ----------------------------------------------
init();

console.log(`                             *(#%&%(/.                                          
                    (&&&&&&&%/.     ,(%&&&&&&&,                                 
               *&&&&/                         #&&&&.                            
            %&&&.                                 /&&&*                         
         *&&&                                        ,&&&                       
       (&&*             .(((((((                (((,    %&&.                    
     ,&&*             (((((((((((((((  ..     ((((((      %&&                   
    %&%        .(((/*(((((((((((((((((((((((((((((((((((((((&&*                 
   &&(    ((((((((((((((((((((((((((((((((((((##((((((((((*  &&/   ,,..((((     
  &&(  .((((((((((((((((((((((((((((((((((((((%#(((((((((((((((((((((       //  
 /&&  .((((((((((((#((((((((((((((((((((((###&#%((((((((((((((((((((            
 &&*    ((((((((((#&###%(#####%&###########&&######(((((*      ##/             /
 &&  ((((((((((((###&%&%#%&&%%####&&&&&%(((((((((((((((((      /&%         .//* 
.&& ,(((((((&########%&#######%%&####(((##((((((#((#(((((((((((((&     *        
 &&   (((((((#&&%#####&#####&&####%###(((((((((%#(((((((((     (&%              
 &&(    /(((((((&%####%&&&&&&&&&&&&&&#(((((##&#((((#%#((*      &&/              
 ,&&    *(((((((((((#&&&&&&&&&%##(((((#%%#((((#&&%##(((.    .///# .             
  %&&    (((((((((((((%&&&&&(((((((((((((((((((((((((((/(((*  &&                
   %&&       .. ,(((((%&&&&%((((   ,,   /((((((((((/        .#&, *,             
    (&&            /(#&&&&&(/*     (                       #&&   ///            
      &&%           .&&&&&.                              .&&(  .**              
        &&&         *&&&&&/                            ,&&%                     
          %&&/      #&&&&&&%                         %&&/                       
            .&&&#//&&&&&&&&&&&&,                 ,&&&#                          
                *&&&&&&&&&&&&&&&&&&&&%(, ,/#%&&&&&.                             
					 ,%&&&&&&&&&&&&&&&&&&&&&(.    
						                              
						FOR A BETTER WORLD`);