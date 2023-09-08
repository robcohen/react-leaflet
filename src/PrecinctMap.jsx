import React, { useEffect, useState} from 'react';
import Airtable from 'airtable'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import geoJSON from '../static/geo.json';
import LeafletControlGeocoder from "./LeafletControlGeocoder";
import "leaflet/dist/leaflet.css";
 
export default function PrecinctMap() { 
  const [precinctData, setData] = useState();
  const geoJSONData = geoJSON;


    useEffect(() => {
        async function GetAirtableRecords() {
          const base = new Airtable({apiKey: import.meta.env.VITE_AIRTABLE_KEY}).base(import.meta.env.VITE_AIRTABLE_BASE);
          const save = await base(import.meta.env.VITE_AIRTABLE_TABLE).select().all();
          return save;
        }
        GetAirtableRecords()
        .then(res => setData(res))
      }, []
    ) 

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
                  layer.bindPopup(`Value: ${precinctData}`);
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
