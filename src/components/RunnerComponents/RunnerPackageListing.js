import React from "react";
import { listPackages, packageShipped } from "../../service/package-service"
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom"
import { addressToCoordinates, arrayUpdate } from "../../service/runners-service";
import DashboardStyles from '../../CSS-styles/DashboardStyles.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RunnerPackageListing() {
    const [packages, setPackages] = React.useState([]);
    const [runnerCoordinates, setRunnerCoordinates] = React.useState({});
    const [accuracy, setAccuracy] = React.useState(0)
    let loginContext = React.useContext(AuthContext);
    const navigate = useNavigate();

    React.useEffect(() => {
        listPackages()
            .then(packagesArray => setPackages(packagesArray))
    }, [loginContext.deliveryData])

    React.useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position);
            let runnerCoordinates = new window.google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            setAccuracy(position.coords.accuracy)
            //    console.losg(coordinates);
            //    return runnerCoordinates;
            setRunnerCoordinates(runnerCoordinates);
            // settes firebase IDE
        });
    }, [])

    return (
        <div className={DashboardStyles.Container}>
            <h1>Folyamatban lévő csomagok</h1>
            {packages.map(currentPackage => {
                return (currentPackage.runner === loginContext.userData.userName) &&
                    (currentPackage.status === "szállítás alatt") &&
                    <ul key={currentPackage.id} className={DashboardStyles.UlItems}>
                        <div className={DashboardStyles.Tabs}>

                            <li><span>ID: </span><br></br>{currentPackage.id}</li>
                            <li><span>Kategória: </span><br></br>{currentPackage.category}</li>
                            <li><span>Súly: </span><br></br>{currentPackage.packageWeight}</li>
                            <li><span>Feladó címe: </span><br></br>{currentPackage.senderAddress}</li>
                            <li><span>Címzett címe: </span><br></br>{currentPackage.receiverAddress}</li>
                            <li><span>Feladó felhasználó: </span><br></br>{currentPackage.user}</li>
                            <li><span>Feladva: </span><br></br>{currentPackage.createdAt}</li>

                            <div className={DashboardStyles.TwoSmallerButton}>
                                <button onClick={() => {
                                    toast.info("Sikeres csomagleadás!");
                                    addressToCoordinates(currentPackage.receiverAddress, runnerCoordinates)
                                        .then((distance) => {
                                            if ((distance - accuracy) < 15) {
                                                packageShipped(currentPackage, loginContext.userData.userName)
                                                    .then(() => {
                                                        setPackages(arrayUpdate(packages, currentPackage))
                                                        console.log("distance figyelés BENT");
                                                        console.log("valami leadott");
                                                    })
                                            } else {
                                                alert("Túl messze vagy " + distance + " méter távolságra");
                                            }
                                        })
                                    
                                }}>Leadás QR kód nélkül</button>
                                <ToastContainer
                                    position="bottom-center"
                                    autoClose={3500}
                                    hideProgressBar={false}
                                    newestOnTop
                                    closeOnClick
                                    rtl={false}
                                    pauseOnFocusLoss
                                    draggable
                                    pauseOnHover />
                                <button onClick={() => {
                                    loginContext.setDeliveryData(currentPackage)
                                    console.log(currentPackage)
                                    navigate("/FutarQr");
                                }}>Leadás QR kóddal</button>

                            </div>
                        </div>
                    </ul>
            })}
        </div>
    );
}