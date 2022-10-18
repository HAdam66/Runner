import React from "react";
import { GoogleMap, Marker, InfoWindow, } from "@react-google-maps/api";
import MapStyle from '../CSS-styles/MapStyles.module.css'
import { Link } from "react-router-dom";
import { getDatabase, ref,  onValue } from 'firebase/database';
import { app } from '../service/firebaseconfig'

const containerStyle = {
    width: '100%',
    height: '100vh'
};

const center = {
    lat: 47.51,
    lng: 19.04
};

function SaMap() {
    const [userPackages, setUserPackages] = React.useState([]);
    const [choosenMarker, setChoosenMarker] = React.useState(null)
    const [selectedPackage, setSelectedPackage] = React.useState(null)
    const [viewReceiverInfoWindow, setViewReceiverInfoWindow] = React.useState(null)
    console.log(userPackages)

    let blueIcon = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"

  

    React.useEffect(() => {
        
        // listPackages()
        //     .then(data => {
        //         let packageArray = []
        //         data.map(currentPackages => {
        //             packageArray.push(currentPackages)
        //         })
        //         setUserPackages(packageArray)
        //     })
        let db = getDatabase(app)
    let pathRef = ref(db, "Csomagok")
    let packagesArray = [];
    onValue(pathRef, csomagok => {
        csomagok.forEach((pack) => {
            const key = pack.key;
            const values = pack.val()
            packagesArray.push({id: key, ...values})
        })
        setUserPackages(packagesArray)
    })
       
    }, [])

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={8}
            onClick={() => {
                setChoosenMarker(null);
                setSelectedPackage(null)
                setViewReceiverInfoWindow(null)
            }}
        >
            
            {userPackages.map(currentPackage => {
                    
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
                            // label="Honnan"
                            icon={blueIcon}
                            key={currentPackage.senderAddress}
                            onClick={() => {
                                setChoosenMarker(currentPackage)
                                setSelectedPackage(currentPackage)

                            }
                            }>
                            {choosenMarker == currentPackage ?
                                (<InfoWindow
                                    // onClick={() => {
                                    //     setSelectedPackage(currentPackage)
                                        
                                    // }}
                                    onCloseClick={() => {
                                        setChoosenMarker(null);
                                    }}>
                                    <div className={MapStyle.SmallInfoWindow}>
                                        <h3>Hova: {currentPackage.receiverAddress}</h3>
                                        <Link to={`/SaCsomagSzerkesztes/${currentPackage.id}`}>Részletek</Link>
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
                                        <h5><span>Futár: </span><br></br>{currentPackage.runner != null? currentPackage.runner : "Futárra vár"}</h5>
                                        <Link to={`/SaCsomagSzerkesztes/${currentPackage.id}`}>Részletek</Link>
                                    </div>
                                </InfoWindow>)
                                :
                                null
                            }
                            </Marker>
                       
                    </>
                );
                
            })}


        </GoogleMap>
    )
}

export default SaMap;