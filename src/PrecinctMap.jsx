import React from 'react';
import { MapContainer, TileLayer, GeoJSON, Popup } from 'react-leaflet'
import geoJSON from '../static/geo.json';
import "leaflet/dist/leaflet.css";
import LeafletControlGeocoder from "./LeafletControlGeocoder";

const geoJSONData = geoJSON;

export default function PrecinctMap() {

    const onEachFeature = (feature, layer) => {
        if (feature.properties && feature.properties.Precinct) {
            const popupContent = feature.properties.Precinct;
            layer.bindPopup(`Value: ${popupContent}`);
          }
    }

    return (
        <div>
            <MapContainer
            center={[30.267, -97.743]}
            zoom={10}
            style={{ width: '90vw', height: '90vh'}}
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
            <LeafletControlGeocoder
              collapsed={false}
            />
          </MapContainer>
        </div>
    );
}
