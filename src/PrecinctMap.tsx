import React from 'react';
import { MapContainer, TileLayer, GeoJSON, Popup } from 'react-leaflet'
import { GeoJsonObject, FeatureCollection, Polygon } from 'geojson'
import geoJSON from '../static/geo.json';

// interface CustomGeoJSON {
//   type: 'FeatureCollection';
//   features: {
//     type: 'Feature';
//     geometry: {
//       type: 'Polygon'; // Adjust the geometry type if needed
//       coordinates: number[][][]; // Adjust the coordinate structure for polygons
//     };
//     properties: {
//       [key: string]: any; // Adjust properties as needed
//     };
//   }[];

const geoJSONData: any = geoJSON;

export default function PrecinctMap() {

    const onEachFeature = (feature, layer) => {
        if (feature.properties && feature.properties.Precinct) {
            const popupContent = feature.properties.Precinct;
            layer.bindPopup(`Value: ${popupContent}`);
          }
    }
  
    console.log("Output Should be Here:");
    console.log(geoJSON);
    return (
        <div>
            <MapContainer
            center={[30.267, -97.743]}
            zoom={10}
            style={{ width: '50vw', height: '60vh', marginLeft:'25vw'}}
            className="map"
            >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <GeoJSON
              data={geoJSONData}
              onEachFeature={onEachFeature}
            />
          </MapContainer>
        </div>
    );
}