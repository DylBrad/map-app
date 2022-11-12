import * as React from 'react';
import Map, { Marker, Popup } from 'react-map-gl';

import { listLogEntries } from '../../API';

import NewEntryForm from '../../components/NewEntryForm';
import AuthModal from '../../components/AuthModal/AuthModal';
import Nav from '../../components/Nav/Nav';

const MapDisplay = () => {
  const [logEntries, setLogEntries] = React.useState([]);
  const [popupInfo, setPopupInfo] = React.useState(null);
  const [newEntryLocation, setNewEntryLocation] = React.useState(null);
  const [viewState, setViewState] = React.useState({
    longitude: -74.006,
    latitude: 40.7128,
    zoom: 11,
  });

  // login stuff
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const [isSignUp, setIsSignUp] = React.useState(true);

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
      style={{ width: '100vw', height: '100vh' }}
      onMove={(evt) => setViewState(evt.viewState)}
      mapStyle="mapbox://styles/dylbrad/cl9h7i0r900it14pi0yg2sacm"
      onClick={showAddMarkerPopup}
    >
      <Nav setIsSignUp={setIsSignUp} setShowAuthModal={setShowAuthModal} />

      {showAuthModal && (
        <AuthModal
          setShowAuthModal={setShowAuthModal}
          isSignUp={isSignUp}
          setIsSignUp={setIsSignUp}
        />
      )}
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
              />
            </div>
          </Popup>
        </>
      ) : null}
    </Map>
  );
};

export default MapDisplay;
