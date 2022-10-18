import React from 'react';
import { Link } from 'react-router-dom';
import { listPackages } from "../service/package-service";
import { superadminPackageShipped } from '../service/sa-service';
import DashboardStyles from '../CSS-styles/DashboardStyles.module.css';
import { arrayDataChange } from '../service/runners-service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SaPackageListing() {
    const [packages, setPackages] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    console.log(packages)

    React.useEffect(() => {
        listPackages()
            .then(data => setPackages(data))
            .then(setIsLoading(false))
            .catch((reason) => {
                console.warn("hiba: ", reason)
            })

    }, [])

    if (isLoading) return <p>Loading</p>;

    return (
        <div className={DashboardStyles.Container}>
            <h1 className={`${DashboardStyles.H2Listing} ${DashboardStyles.Heading}`}>Csomaglistázás</h1>
            {/* <div className={DashboardStyles.Tabs}> */}
            <div className={DashboardStyles.CardContainer}>
                {packages.map(incomingPackage => {
                    console.log(incomingPackage);
                    return (
                        <ul key={incomingPackage.id} className={DashboardStyles.UlItems}>
                            <div className={DashboardStyles.Tabs}>
                                {/* <h3>ID: {incomingPackage.id}</h3> */}
                                <li> <span>ID: </span><br></br> {incomingPackage.id}</li>
                                <li> <span>Kategória: </span><br></br> {incomingPackage.category}</li>
                                <li> <span>Súly: </span><br></br> {incomingPackage.packageWeight}</li>
                                <li> <span>Státusz: </span><br></br> {incomingPackage.status}</li>
                                <li> <span>Feladó felhasználó: </span><br></br> {incomingPackage.user}</li>
                                <li> <span>Futár: </span><br></br> {incomingPackage.runner}</li>
                                <li> <span>Feladó címe: </span><br></br> {incomingPackage.senderAddress}</li>
                                <li> <span>Címzett címe: </span><br></br> {incomingPackage.receiverAddress}</li>
                                <li> <span>Létrehozás dátuma: </span><br></br> {incomingPackage.createdAt}</li>



                                <div className={DashboardStyles.Links}>
                                    <Link to={`/SaCsomagSzerkesztes/${incomingPackage.id}`}>Csomag szerkesztése</Link>
                                    <Link to={`/SaCsomagTorles/${incomingPackage.id}`} state={{ from: incomingPackage }} >Csomag törlése</Link>
                                </div>

                                {incomingPackage.status == "szállítás alatt" &&
                                    <div className={DashboardStyles.SmallerButton}>

                                        <button onClick={() => {
                                            toast.info("Sikeres csomagleadás!")
                                            superadminPackageShipped(incomingPackage, incomingPackage.runner)
                                                .then((success) => {
                                                    setPackages(arrayDataChange(packages, incomingPackage, incomingPackage.runner))
                                                })
                                        }}>Leadás</button>
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
                                    </div>
                                }
                            </div>
                        </ul>

                    )
                })}
                {/* </div> */}
            </div>
        </div>
    )
}

export default SaPackageListing