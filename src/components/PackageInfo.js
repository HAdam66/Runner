import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { singlePackageLoading } from "../service/package-service";
import DashboardStyles from "../CSS-styles/DashboardStyles.module.css";
import { getDatabase, ref, onValue } from "firebase/database";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { app } from "../service/firebaseconfig";
import TrackingStyle from "../CSS-styles/PackageTracking.module.css"

function PackageInfo() {
  const [singlePackage, setSinglePackage] = React.useState(null);
  const [runner, setRunner] = React.useState(null);
  let blueIcon = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
  let riderIcon =
    "https://www.allianceforthebay.org/wp-content/themes/acb/img/marker-blue.png";
 
  const params = useParams();
  const navigate = useNavigate();

  console.log(runner);
  console.log(singlePackage);

  const containerStyle = {
    width: "100%",
    height: "80vh",
  };


  React.useEffect(() => {
    // singlePackageLoading(params.packageId)
    //   .then(data => setSinglePackage(data));
    let db = getDatabase(app);
    let pathRef = ref(db, `Csomagok/${params.packageId}`);
    onValue(pathRef, (snapshot) => {
      const data = snapshot.val();
      setSinglePackage(data);
    });
  }, []);

  React.useEffect(() => {
    let db = getDatabase(app);
    if (singlePackage != null) {
      let pathRef = ref(db, `Futarok/${singlePackage.runner}`);
      onValue(pathRef, (snapshot) => {
        const data = snapshot.val();
        setRunner(data);
        console.log(data);
        console.log("futar frissítés");
      });
    }
  }, [singlePackage]);

  return (
    <div className={`${TrackingStyle.MapContainer} ${DashboardStyles.Container}`}>
      {singlePackage != null && (
        <div>
          <div className={TrackingStyle.Header}>
            <h1 className={TrackingStyle.VisibleH1}>ID:</h1>
            <h2 className={`${TrackingStyle.H2Short} ${DashboardStyles.NoMarginH2}`}>{params.packageId}</h2>
          </div>

          <div className={DashboardStyles.Tabs}>
            <ul>
              <h3>Csomag státusz: {singlePackage.status}</h3>
              <h2>Részletek</h2>

              <li>Kategória: {singlePackage.category}</li>
              <li>Súly: {singlePackage.packageWeight}</li>

              <li>Feladó: {singlePackage.user}</li>
              {singlePackage.status == "szállítás alatt" && (
                <li>Futár: {singlePackage.runner}</li>
              )}
              <li>Csomag feladás ideje: {singlePackage.createdAt}</li>
              {singlePackage.pickedUpAt !== undefined && (
                <li>Kiszállítás kezdete: {singlePackage.pickedUpAt}</li>
              )}
              {singlePackage.arrivedAt !== undefined && (
                <li>Kézbesítve: {singlePackage.arrivedAt}</li>
              )}
            </ul>
          </div>
            <button
              className={TrackingStyle.BackButton}
              onClick={() => {
                navigate("/CsomagKovetes");
              }}
            >
              Vissza
            </button>
        </div>
      )}

      {singlePackage != null && (
      <div className={TrackingStyle.MapDiv}>
        <GoogleMap
          className={TrackingStyle.Map}
          mapContainerStyle={containerStyle}
          center={{
            lat: singlePackage.senderCoordinates.lat,
            lng: singlePackage.senderCoordinates.lng,
          }}
          zoom={11.5}
        >
          <>
            {(runner != null || runner != undefined) && singlePackage.status != "leadott" && (
              <Marker
                icon={riderIcon}
                key={singlePackage.runner}
                label="A futárod"
                position={{
                  lat: runner.runnerCoordinates.lat,
                  lng: runner.runnerCoordinates.lng,
                }}
              ></Marker>
            )}

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
      </div>
      )}


    </div>
  );
}

export default PackageInfo;
