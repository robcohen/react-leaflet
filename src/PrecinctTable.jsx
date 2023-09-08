import Airtable from 'airtable'
import { useEffect, useState} from 'react';

export function getPrecinctData() {
    const [precinctData, setData] = useState();

    useEffect(() => {
        async function GetAirtableRecords() {
          const base = new Airtable({apiKey: import.meta.env.VITE_AIRTABLE_KEY}).base(import.meta.env.VITE_AIRTABLE_BASE);
          const save = await base(import.meta.env.VITE_AIRTABLE_TABLE).select().all();
          return save;
        }
        GetAirtableRecords()
        .then(res => setData(res))
      }, []
    );
    return precinctData; 
  }