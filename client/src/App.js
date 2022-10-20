import * as React from 'react';
import Map from 'react-map-gl';

const App = () => {
  const [viewState, setViewState] = React.useState({
    longitude: -74.006,
    latitude: 40.7128,
    zoom: 5,
  });

  // Make request to backend here
  React.useEffect(() => {}, []);

  return (
    <Map
      {...viewState}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      style={{ width: '100vw', height: '100vh' }}
      onMove={(evt) => setViewState(evt.viewState)}
      mapStyle="mapbox://styles/dylbrad/cl9h7i0r900it14pi0yg2sacm"
    />
  );
};

export default App;
