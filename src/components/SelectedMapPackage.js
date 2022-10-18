import React from "react";
import {  Marker, InfoWindow,  } from "@react-google-maps/api";
import MapStyle from '../CSS-styles/MapStyles.module.css'
import { Link } from "react-router-dom";

function SelectedMapPackage({currentPackage, choosenMarker, setChoosenMarker, setSelectedPackage}) {

    let blueIcon = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
  return (
    <>
    <Marker

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
                                console.log(choosenMarker)
                                setSelectedPackage(currentPackage)

                            }
                            }>
                            {choosenMarker == currentPackage ?
                                (<InfoWindow
                                    onCloseClick={() => {
                                        setChoosenMarker(null);
                                    }}>
                                    <div className={MapStyle.InfoWindow}>

                                        <h3><span>ID: </span>
                                            <br></br>{currentPackage.id}</h3>
                                        <h3><span>Hova: </span>
                                            <br></br>{currentPackage.receiverAddress}</h3>
                                        <h5><span>Feladó: </span><br></br>{currentPackage.user}</h5>
                                        <h5><span>Futár: </span><br></br>{currentPackage.runner}</h5>
                                        <Link to={`/SaCsomagSzerkesztes/${currentPackage.id}`}>Részletek</Link>
                                    </div>
                                </InfoWindow>)
                                :
                                null
                            }
                        </Marker>
                        <Marker

                            position={
                                {
                                    lat: currentPackage.receiverCoordinates.lat,
                                    lng: currentPackage.receiverCoordinates.lng
                                }}
                            label="Hova"
                            key={currentPackage.receiverAddress}
                            onClick={() => {
                                setChoosenMarker(currentPackage)
                                console.log(choosenMarker)
                            }
                            }></Marker>
                            </>
  )
}

export default SelectedMapPackage