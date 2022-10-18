import React from "react";

import { GoogleMap, Marker } from "@react-google-maps/api";

function TrackingMap({ packageToShow }) {
  const [singlePackage, setSinglePackage] = React.useState(packageToShow);
  let blueIcon = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
  let riderIcon =
    "https://www.allianceforthebay.org/wp-content/themes/acb/img/marker-blue.png";
  const apiKey = "AIzaSyDicldcy3IXaTMHaMmE-kN_OGBVb0RikA0";

  const containerStyle = {
    width: "100%",
    height: "40vh",
  };

  const center = {
    lat: singlePackage.senderCoordinates.lat,
    lng: singlePackage.senderCoordinates.lng,
  };

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={7}>
      <>
        <Marker
          icon={riderIcon}
          key={singlePackage.runner}
          label="A futárod"
          position={{
            lat: singlePackage.runnerCoordinates.lat,
            lng: singlePackage.runnerCoordinates.lng,
          }}
        ></Marker>

        <Marker
          position={{
            lat: singlePackage.senderCoordinates.lat,
            lng: singlePackage.senderCoordinates.lng,
          }}
          label="Felvételi pont"
          icon={blueIcon}
          key={singlePackage.senderAddress}
        ></Marker>
        <Marker
          position={{
            lat: singlePackage.receiverCoordinates.lat,
            lng: singlePackage.receiverCoordinates.lng,
          }}
          label="Kiszállítási pont"
          key={singlePackage.receiverAddress}
        ></Marker>
      </>
    </GoogleMap>
  );
}

export default TrackingMap;
