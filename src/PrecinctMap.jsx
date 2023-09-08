import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import geoJSON from '../static/geo.json';
import "leaflet/dist/leaflet.css";
import Airtable from 'airtable'
import LeafletControlGeocoder from "./LeafletControlGeocoder";
import env from "react-dotenv";
const geoJSONData = geoJSON;
console.log(env.AIRTABLE_KEY);
console.log(env.AIRTABLE_BASE);
console.log(env.AIRTABLE_TABLE);

export default function PrecinctMap() {
    async function GetAirtableRecords() {
      const base = new Airtable({apiKey: env.AIRTABLE_KEY}).base(env.AIRTABLE_BASE);
      const records = await base(env.AIRTABLE_TABLE).select().all();

      return records;
    }

    const records = GetAirtableRecords()
      .then((res)=>console.log("DONE: ", res))
      .catch((err)=>{console.log("ERR: ", err)});



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
