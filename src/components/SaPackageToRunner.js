import React from 'react';
import { listPackages } from '../service/package-service.js';
import { runnerListing } from '../service/runners-service.js';
import { superadminPackageRunnerPairing } from '../service/sa-service.js';
import FeedbackStyle from '../CSS-styles/FeedbackStyles.module.css';
import FormStyles from '../CSS-styles/FormStyles.module.css';
import Styles from '../CSS-styles/SaPackageToRunner.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function SaPackageToRunner() {
    const [packages, setPackages] = React.useState([]);
    const [runners, setRunners] = React.useState([]);
    const [selectedRunner, setSelectedRunner] = React.useState("--válassz futárt--");
    const [selectedPackage, setSelectedPackage] = React.useState();
    console.log(selectedPackage)
    console.log(selectedPackage)
    React.useEffect(() => {
        listPackages()
            .then(data => {
                setPackages(data)
            })
        runnerListing()
            .then(data => {
                setRunners(data)
            })
    }, [])

    return (
        <div className={FormStyles.Form}>
            <div className={FormStyles.InputContainer}>
                <div className={`${Styles.Container} ${Styles.EmptyContainer}`}>
                    <div className={Styles.InputBox}>
                        <h1>Csomagok futárhoz rendelése</h1>
                        <select className={Styles.DropDown} onChange={(e) => setSelectedPackage(e.target.value)}>
                            <option>--válassz csomagot--</option>
                            {packages.map(data => {
                                console.log("hello data" + JSON.stringify(data))
                                return <option>{data.id}</option>
                            })}
                        </select>
                        <select className={Styles.DropDown} onChange={(e) => setSelectedRunner(e.target.value)}>
                            <option>--válassz futárt--</option>
                            {runners.map(data => {
                                return <option>{data.userName}</option>
                            })}
                        </select>
                        {selectedPackage != "--válassz csomagot--" &&
                            packages.map(pack => {
                                if (pack.id == selectedPackage)
                                    return (
                                        <div className={`${Styles.Tabs} ${FormStyles.Card}`}>
                                            <ul key={pack.id} className={Styles.UlItems}>
                                                <li><span>ID: </span><br></br>{pack.id}</li>
                                                <li><span>Kategória: </span><br></br>{pack.category}</li>
                                                <li><span>Létrehozva: </span><br></br>{pack.createdAt}</li>
                                                <li><span>Feladó: </span><br></br>{pack.senderAddress}</li>
                                                <li><span>Címzett: </span><br></br> {pack.receiverAddress}</li>
                                                <li><span>csomag státusz: </span><br></br> {pack.status}</li>

                                                {selectedRunner != "--válassz futárt--" && <h4 className={FormStyles.RunnerQuestion}>Hozzárendeled {selectedRunner} futárt a csomaghoz?</h4>}
                                            </ul>
                                            <div style={{ width: "100%" }} className={FeedbackStyle.ButtonSection}>

                                                <button className={selectedRunner === "--válassz futárt--" && FeedbackStyle.Disabled} style={{ width: "280px", margin: "auto" }} onClick={() => {
                                                    if (selectedRunner !== "--válassz futárt--") {
                                                        toast.info("Sikeres hozzárendelés!")
                                                        superadminPackageRunnerPairing(selectedRunner, pack)

                                                    }
                                                }}>Hozzárendelés
                                                </button>
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
                                        </div>
                                    )
                            })}


                    </div>
                </div>
                <div className={`${FormStyles.ImageInfo} ${FormStyles.SaRunnerEditBackground}`}>
                    <h1>RnnR</h1>
                </div>
            </div>
        </div>
    )

}

export default SaPackageToRunner