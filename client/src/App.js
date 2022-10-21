import * as React from 'react';
import Map, { Marker } from 'react-map-gl';

import { listLogEntries } from './API';

const App = () => {
  const [logEntries, setLogEntries] = React.useState([]);
  const [viewState, setViewState] = React.useState({
    longitude: -74.006,
    latitude: 40.7128,
    zoom: 11,
  });

  // Make request to backend here
  React.useEffect(() => {
    (async () => {
      const logEntries = await listLogEntries();
      setLogEntries(logEntries);
    })();
  }, []);

  return (
    <Map
      {...viewState}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      style={{ width: '100vw', height: '100vh' }}
      onMove={(evt) => setViewState(evt.viewState)}
      mapStyle="mapbox://styles/dylbrad/cl9h7i0r900it14pi0yg2sacm"
    >
      {logEntries.map((entry) => {
        return (
          <Marker
            key={entry._id}
            longitude={entry.longitude}
            latitude={entry.latitude}
          ></Marker>
        );
      })}
    </Map>
  );
};

export default App;
