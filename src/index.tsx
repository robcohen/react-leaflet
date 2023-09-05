import * as React from "react";
import { createRoot } from "react-dom/client";
import { MapContainer, TileLayer } from "react-leaflet";
import ReactLeafletKml from "react-leaflet-kml";

function App() {
  const [kml, setKml] = React.useState(null);

  React.useEffect(() => {
    fetch(
      "https://github.com/robcohen/react-leaflet/raw/kml-pull/direct-pull-taxmaps.kmz"
    )
      .then((res) => res.text())
      .then((kmlText) => {
        const parser = new DOMParser();
        const kml = parser.parseFromString(kmlText, "text/xml");
        setKml(kml);
      });
  }, []);

  return (
    <div>
      <MapContainer
        style={{ height: "500px", width: "100%" }}
        zoom={10}
        center={[30.267, -97.743]}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {kml && <ReactLeafletKml kml={kml} />}
      </MapContainer>
      <p>The map should be above</p>
    </div>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
