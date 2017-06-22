mapboxgl.accessToken = 'pk.eyJ1IjoiYWduaWVzemtham90IiwiYSI6ImNqMDloMDFscTAwM3UycW14ZnM1YmFvZm0ifQ.cQxnfJqnE2yCYL9MGO89aw';
var mapka = new mapboxgl.Map({
    container: 'mapka', // id kontenera (div) mapy
        style: 'mapbox://styles/agnieszkajot/cj485493d1o182slb8auqq058', //lokalizacja pliku stylów
            center: [16.8752446, 52.4079914], // centrum mapy
        zoom: 2 // bazowy zoom 
});
mapka.addControl(new mapboxgl.ScaleControl({
    maxWidth: 80,
    unit: 'imperial'

}));

function dataToString(x) {
	return x.from + ": " + x.number;
}

mapka.on('load', function() {
  mapka.addLayer({
    id: 'kartokraje',
            type: 'fill',
            source: {
                  type: 'vector',
                  url: 'mapbox://agnieszkajot.cj486gvg8090n2wlfwr62oawi-075p4'
                    },
            'source-layer': 'kartokraje',
            layout: {
                  visibility: 'visible'
                    },
            paint: {
                 'fill-color': 'rgba(200, 100, 240, 0.4)',
            'fill-outline-color': 'rgba(200, 100, 240, 1)'
                    }
          });
		
		
		
	 mapka.on('click', 'kartokraje', function (e) {
		country = e.features[0].properties.NAME;
		function f(x) {
			return x.to == country;
		}
		var filtered = data.filter(f);
		var strings = filtered.map(dataToString);
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(strings.join("<br>"))
            .addTo(mapka);
    });
});