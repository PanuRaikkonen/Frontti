let url = "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql";
let markerCollection = {
  type: "FeatureCollection",
  features: [],
};

let map = undefined;

map = new mapboxgl.Map({
  // uuden kartan launch
  container: "map",
  style:
    "https://tiles.stadiamaps.com/styles/alidade_smooth.json?optimize=true", // hakee karttastylen
  center: [24.97647089113386, 60.20995013106471], // alkupiste kartalle
  zoom: 14.16, // zoomaus oikeaan paikkaan
});

map.on("load", () => {
  // lataa staattisen kartan, ja hakee sen jälkeen netistä karttastylen
  const mapContainerEl = document.getElementById("map");
  mapContainerEl.style.visibility = "visible";
});

fetchStations(); // hakee fetchstation

mapboxgl.setRTLTextPlugin(
  "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.1/mapbox-gl-rtl-text.js"
); // fiksaa mapbox gl js bugin RTL-hallinnan kanssa

async function fetchStations() {
  // hakee asemat digitransitin apista graphql avulla
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
    {
  bikeRentalStations {
    bikesAvailable
    lat
    lon
  }
}
      `,
    }),
  });

  const res = await response.json();

  // pitää kertoa mapboxille millainen markercollection kyseessä, ja sen jälkeen collectionin startti oikealla infolla

  for (let i of res["data"]["bikeRentalStations"]) {
    // tiedon looppaus tiedosta mitä apista tulee
    let collection = {
      // parsetaan tiedot apista oikeaan muotoon mapboxia varten
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [i.lon, i.lat],
      },
      properties: {
        bikesAvailable: i.bikesAvailable,
      },
    };

    // pusketaan collection markercollectioniin
    markerCollection.features.push(collection);
  } //console.log(markerCollection);

  drawMarkers();
}

function drawMarkers() {
  // console.log("beginning to draw")
  let z = 0;
  // lisätään markerit kartalle
  markerCollection.features.forEach(function (point) {
    // koska markerit ovat HTML-muodossa, luodaan ensin DOM-elementti, joka myöhemmin annetaan markerin constructorille
    let elem = document.createElement("div");
    elem.className = "marker";
    // lisätään data-id attribuutti uniikilla arvolla markerille jotta saadaan oikeat tiedot oikeasta markerista
    elem.setAttribute("data-id", z);

    // rakennetaan marker ja asetetaan koordinaatit GeoJSONista
    let marker = new mapboxgl.Marker(elem);
    marker.setLngLat(point.geometry.coordinates);

    // popup luodaan ja sitä voi muokata CSS:stä miten haluaa
    let popup = new mapboxgl.Popup({ offset: 24, closeButton: false });
    popup.setHTML("<div>" + point.properties.bikesAvailable + "</div>");

    // markerin popup
    marker.setPopup(popup);

    // lisätään popup kartalle
    marker.addTo(map);
    z++;
  });
}
