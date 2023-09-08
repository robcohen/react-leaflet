import * as React from "react";
import { createRoot } from "react-dom/client";
import PrecinctMap from './PrecinctMap'

function App() {
  return ( 
    <React.StrictMode>
        <PrecinctMap />
    </React.StrictMode>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
