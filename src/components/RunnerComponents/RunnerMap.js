import React from "react";
import { GoogleMap, Marker, InfoWindow, } from "@react-google-maps/api";
import { Link } from "react-router-dom";
import { getDatabase, ref, onValue } from 'firebase/database';
import { app } from '../../service/firebaseconfig';
import MapStyle from '../../CSS-styles/MapStyles.module.css'
import { AuthContext } from "../AuthContext";
import { packageRunnerPairing } from "../../service/package-service";
import { arrayUpdate } from "../../service/runners-service";
import { realTimePairing } from "../../service/realtime-service";


function RunnerMap() {
    let loginContext = React.useContext(AuthContext);
    const [packages, setPackages] = React.useState([]);
    let blueIcon = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
    let riderIcon = "https://www.allianceforthebay.org/wp-content/themes/acb/img/marker-blue.png"
    const [choosenMarker, setChoosenMarker] = React.useState(null)
    const [selectedPackage, setSelectedPackage] = React.useState(null)
    const [viewReceiverInfoWindow, setViewReceiverInfoWindow] = React.useState(null)
    console.log(loginContext.userData)

const containerStyle = {
    width: '100%',
    height: '100vh'
};

const center = {
    lat: loginContext.userData.runnerCoordinates.lat,
    lng: loginContext.userData.runnerCoordinates.lng
};
    React.useEffect(() => {
        let db = getDatabase(app)
        let pathRef = ref(db, "Csomagok")
        let packagesArray = [];
        onValue(pathRef, packages => {
            packages.forEach((pack) => {
                const key = pack.key;
                const values = pack.val()
                packagesArray.push({ id: key, ...values })
            })
            setPackages(packagesArray)
            console.log("frissülünk e egyáltalán?")
        })

    }, [])



    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onClick={() => {
                setChoosenMarker(null);
                setSelectedPackage(null)
                setViewReceiverInfoWindow(null)

            }}
        >
            <>
                <Marker
                    icon={riderIcon}
                    key={loginContext.userData.userName}
                    label="Ez te vagy"
                    position={
                        {
                            lat: loginContext.userData.runnerCoordinates.lat,
                            lng: loginContext.userData.runnerCoordinates.lng
                        }}
                >
                </Marker>

            {packages.map(currentPackage => {
                if(currentPackage.status == "várakozik")
                    // kell a consolelog mindenkepp!!!!!
                return (

                    <>

                    
                    {console.log(currentPackage)}
                        <Marker
                            opacity={selectedPackage == null || selectedPackage == currentPackage ? 1.0 : 0.0 }
                            position={
                                {
                                    lat: currentPackage.senderCoordinates.lat,
                                    lng: currentPackage.senderCoordinates.lng
                                }}
                            label="Elérhető"
                            icon={blueIcon}
                            key={currentPackage.senderAddress}
                            onClick={() => {
                                setChoosenMarker(currentPackage)
                                setSelectedPackage(currentPackage)

                            }
                            }>
                            {choosenMarker == currentPackage ?
                                (<InfoWindow
                                    position={
                                        {
                                            lat: currentPackage.senderCoordinates.lat,
                                            lng: currentPackage.senderCoordinates.lng
                                        }}
                                    onCloseClick={() => {
                                        setChoosenMarker(null);
                                    }}>
                                    <div className={MapStyle.SmallInfoWindow}>
                                        <h3>Honnan: {currentPackage.senderAddress}</h3>
                                        <h3>Hova: {currentPackage.receiverAddress}</h3>

                                    </div>
                                </InfoWindow>)
                                :
                                null
                            }
                        </Marker>
                        <Marker
                            opacity={currentPackage != selectedPackage ? 0.0 : 1.0}
                            position={
                                {
                                    lat: currentPackage.receiverCoordinates.lat,
                                    lng: currentPackage.receiverCoordinates.lng
                                }}
                            label="Hova"
                            key={currentPackage.receiverAddress}
                            onClick={() => {
                               setViewReceiverInfoWindow(currentPackage)
                               setChoosenMarker(null)
                            }
                            }>
                                {viewReceiverInfoWindow == currentPackage ?
                                (<InfoWindow
                                    position={
                                        {
                                            lat: currentPackage.receiverCoordinates.lat,
                                            lng: currentPackage.receiverCoordinates.lng
                                        }}
                                    onClick={() => {
                                        setSelectedPackage(currentPackage)


                                    }}
                                    onCloseClick={() => {
                                        setChoosenMarker(null);
                                    }}>
                                    <div className={MapStyle.InfoWindow}>

                                        <h3><span>ID: </span>
                                            <br></br>{currentPackage.id}</h3>
                                        <h3><span>Hova: </span>
                                            <br></br>{currentPackage.receiverAddress}</h3>
                                        <h5><span>Feladó: </span><br></br>{currentPackage.user}</h5>
                                        <button onClick={() => {
                                            realTimePairing(currentPackage, loginContext.userData.userName)
                                            console.log("csomag felvéve")
                                            setPackages(arrayUpdate(packages, currentPackage))
                                        }}>Felvétel</button>
                                    </div>
                                </InfoWindow>)
                                :
                                null
                            }
                            </Marker>

                    </>
                );

            })}
        </>

        </GoogleMap>
    )
}

export default RunnerMap