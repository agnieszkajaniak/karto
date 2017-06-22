mapboxgl.accessToken = 'pk.eyJ1IjoiYWduaWVzemtham90IiwiYSI6ImNqMDloMDFscTAwM3UycW14ZnM1YmFvZm0ifQ.cQxnfJqnE2yCYL9MGO89aw';
var map = new mapboxgl.Map({
    container: 'mapka', // id kontenera (div) mapy
        style: 'mapbox://styles/agnieszkajot/cj485493d1o182slb8auqq058', //lokalizacja pliku stylów
            center: [16.8752446, 52.4079914], // centrum mapy
        zoom: 2 // bazowy zoom 
});
map.addControl(new mapboxgl.ScaleControl({
    maxWidth: 80,
    unit: 'imperial'

}));

function dataToString(x) {
	return x.from + ": " + x.number;
}

function getFilteredData(e) {
	country = e.features[0].properties.NAME;
	function f(x) {
		return x.to == country;
	}
	var filtered = data.filter(f);
	return filtered;
}

map.on('load', function() {
   map.addSource("data", {
        "type": "vector",
         url: 'mapbox://agnieszkajot.cj486gvg8090n2wlfwr62oawi-075p4'
    });
  map.addLayer({
    id: 'kartokraje',
            type: 'fill',
            source: 'data',
            'source-layer': 'kartokraje',
            layout: {
                  visibility: 'visible'
                    },
            paint: {
                 'fill-color': 'rgba(200, 100, 240, 0.2)',
            'fill-outline-color': 'rgba(200, 100, 240, 1)'
                    }
          });
		
	map.addLayer({
    id: 'kraje_highlight',
            type: 'fill',
            source: 'data',
            'source-layer': 'kartokraje',
            layout: {
                  visibility: 'visible'
                    },
            paint: {
                 'fill-color': 'rgba(200, 100, 240, 0.4)',
            'fill-outline-color': 'rgba(200, 100, 240, 1)'
                    },
			"filter": ["==", "name", ""]
          });
		
		
		
	 map.on('click', 'kartokraje', function (e) {
		var filtered = getFilteredData(e);
		var strings = filtered.map(dataToString);
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(strings.join("<br>"))
            .addTo(map);
		map.setFilter("kraje_highlight", ["in", "NAME"].concat(filtered.map(e => e.from)).concat(e.features[0].properties.NAME));

    });
	
	 
});