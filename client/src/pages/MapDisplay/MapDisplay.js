import * as React from 'react';
import Map, { Marker, Popup } from 'react-map-gl';

import { listLogEntries } from '../../API';

import NewEntryForm from '../../components/NewEntryForm';

const MapDisplay = (props) => {
  const [logEntries, setLogEntries] = React.useState([]);
  const [popupInfo, setPopupInfo] = React.useState(null);
  const [newEntryLocation, setNewEntryLocation] = React.useState(null);
  const [viewState, setViewState] = React.useState({
    longitude: -6.2603,
    latitude: 53.3498,
    zoom: 11,
  });

  // Make request to backend here
  const getAllMarkers = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
  };

  React.useEffect(() => {
    getAllMarkers();
  }, []);

  const showAddMarkerPopup = (e) => {
    setNewEntryLocation({
      latitude: e.lngLat.lat,
      longitude: e.lngLat.lng,
    });
  };

  return (
    <Map
      {...viewState}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      style={{ marginLeft: '260px', width: 'auto', height: '100vh' }}
      onMove={(evt) => setViewState(evt.viewState)}
      mapStyle="mapbox://styles/dylbrad/cl9h7i0r900it14pi0yg2sacm"
      onClick={showAddMarkerPopup}
    >
      {logEntries.map((entry) => {
        return (
          <div>
            <Marker
              key={entry._id}
              longitude={entry.longitude}
              latitude={entry.latitude}
              onClick={(e) => {
                // If we let the click event propagates to the map, it will immediately close the popup
                // with `closeOnClick: true`
                e.originalEvent.stopPropagation();
                setPopupInfo(entry);
              }}
            ></Marker>
          </div>
        );
      })}
      {popupInfo && (
        <Popup
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          anchor="bottom"
          onClose={() => setPopupInfo(null)}
        >
          <div>
            <img
              className="popup-image"
              alt="location"
              src={popupInfo.image}
            ></img>
            <h3>{popupInfo.title}</h3>
            <p>{popupInfo.comments}</p>
          </div>
        </Popup>
      )}
      {newEntryLocation ? (
        <>
          <Popup
            longitude={newEntryLocation.longitude}
            latitude={newEntryLocation.latitude}
            anchor="bottom"
            onClose={() => setNewEntryLocation(null)}
          >
            <div>
              <NewEntryForm
                onClose={() => {
                  setNewEntryLocation(null);
                  getAllMarkers();
                }}
                location={newEntryLocation}
                setIsSignUp={props.setIsSignUp}
                setShowAuthModal={props.setShowAuthModal}
                setNewEntryLocation={setNewEntryLocation}
              />
            </div>
          </Popup>
        </>
      ) : null}
    </Map>
  );
};

export default MapDisplay;
