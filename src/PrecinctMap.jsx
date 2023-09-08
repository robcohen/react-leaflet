import React, { useEffect, useState} from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import geoJSON from '../static/geo.json';
import LeafletControlGeocoder from "./LeafletControlGeocoder";
import "leaflet/dist/leaflet.css";
import { getPrecinctData } from './PrecinctTable';
 
export default function PrecinctMap() { 
  const geoJSONData = geoJSON;
  const precinctData = getPrecinctData();

  
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
              onEachFeature={(feature, layer) => {
                if (feature.properties && feature.properties.Precinct) {
                  const popupContent = feature.properties.Precinct;
                  layer.bindPopup(`Value: ${feature.properties.Precinct}`);
                  console.log(precinctData);
                }
              }}
            />
            <LeafletControlGeocoder
              collapsed={false}
            />
          </MapContainer>
        </div>
    );
}
