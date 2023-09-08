import React, { useEffect, useState} from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import geoJSON from '../static/geo.json';
import LeafletControlGeocoder from "./LeafletControlGeocoder";
import "leaflet/dist/leaflet.css";
import { getPrecinctData } from './PrecinctTable';
 
export default function PrecinctMap() { 
  const precinctData = getPrecinctData();
    return (
        <div>
            {precinctData && <MapContainer
            center={[30.267, -97.743]}
            zoom={10}
            style={{ width: '100vw', height: '100vh'}}
            className="map"
            >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <GeoJSON
              data={geoJSON}
              onEachFeature={(feature, layer) => {
                if (feature.properties && feature.properties.Precinct) {
                  const precRec = precinctData.find(record => record.fields['Precinct Number'].toString() === feature.properties.Precinct);
                  if (precRec.fields['Precinct Chair'] !== undefined) {
                    layer.bindPopup(
                    `<p><b>Precinct #:</b> ${precRec.fields['Precinct Number']}</p>
                     <p><b>Precinct Chair:</b> ${precRec.fields['Precinct Chair']}</p>
                     <p><b>Email:</b> <a href="mailto:${precRec.fields['Precinct Email']}">${precRec.fields['Precinct Email']}</a></p>`
                     );
                  } else {
                  layer.bindPopup(
                    `<p><b>Precinct #:</b> ${precRec.fields['Precinct Number']}</p>
                     <p><b>Precinct Chair:</b> No Precinct Chair</p>`
                     );
                  }
                }
              }}
            />
            <LeafletControlGeocoder
              collapsed={false}
            />
          </MapContainer>}
        </div>
    );
}
