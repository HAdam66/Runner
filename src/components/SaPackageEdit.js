import React from 'react';
import { packageEdit, packageEditDataDisplay, packageShipped } from '../service/package-service';
import { useNavigate, useParams } from "react-router-dom";

import EditPage from '../CSS-styles/EditPage.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SaPackageEdit() {
    let navigate = useNavigate();
    const params = useParams();
    const [id, setId] = React.useState("");
    const [packageCategory, setPackageCategory] = React.useState("");
    const [status, setStatus] = React.useState("");
    const [date, setDate] = React.useState("");
    const [senderAddress, setSenderAddress] = React.useState("");
    const [receiverAddress, setReceiverAddress] = React.useState("")
    const [runner, setRunner] = React.useState("");
    const [packageId, setPackageId] = React.useState("");
    const [feedbackShipped, setFeedbackShipped] = React.useState(undefined);
    const [feedbackEdit, setFeedbackEdit] = React.useState(undefined);
    const [weight, setWeight] = React.useState("");
    const [user, setUser] = React.useState("")
    console.log(weight)

    React.useEffect(() => {
        packageEditDataDisplay(params)
            .then(data => {
                console.log(data)
                setUser(data.user)
                setWeight(data.packageWeight)
                setStatus(data.status);
                setPackageCategory(data.category);
                setDate(data.createdAt);
                setId(params.packageId);
                setPackageId(params.packageId);
                setSenderAddress(data.senderAddress);
                setReceiverAddress(data.receiverAddress);
                setRunner(data.runner)
            })
    }, [])


    console.log(params.packageId)
    console.log(runner);

    return (
        <div className={EditPage.EditMainContainer}>
            <div className={EditPage.EditLogo}>
                <h1>Csomag Szerkesztése</h1>
            </div>
            <div className={EditPage.EditContainer}>
                <div className={EditPage.EditBox}>
                    <div className={EditPage.EditInput}>
                        <p>Azonosító : </p>
                        <input
                            disabled
                            type="text"
                            value={packageId}

                        >
                        </input>

                        <p>Létrehozás időpontja : </p>
                        <input
                            disabled
                            type="text"
                            value={date}

                        >
                        </input>

                        <p>Kategória :</p>
                        <input
                            type="text"
                            value={packageCategory}
                            placeholder="csomag kategória"
                            onChange={e => setPackageCategory(e.target.value)}
                        >
                        </input>
                    </div>
                    <div className={EditPage.EditInput}>
                        <p>Státusz :</p>
                        <input
                            type="text"
                            value={status}
                            placeholder="csomag státusz( várakozik, szállítás altt, leadott )"
                            onChange={e => setStatus(e.target.value)}
                        >
                        </input>

                        <p>Feladó címe :</p>
                        <input
                            type="text"
                            value={senderAddress}
                            placeholder="Feladó cím"
                            onChange={e => setSenderAddress(e.target.value)}
                        >
                        </input>

                        <p>Címzett címe :</p>
                        <input
                            type="text"
                            value={receiverAddress}
                            placeholder="Címzett címe"
                            onChange={e => setReceiverAddress(e.target.value)}
                        >
                        </input>
                    </div>
                </div>
            </div>
            <div className={EditPage.EditButton}>

                <button onClick={() => {
                    toast.info("Sikeres módosítás!")
                    let modifiedPackage = {
                        packageId, packageCategory, status, date, senderAddress, receiverAddress, weight, user, runner
                    }
                    packageEdit(modifiedPackage,params.packageId)
                        .then((success) => {
                            console.log("Sikeres módosítás", success);
                            setFeedbackEdit(success);
                            console.log(feedbackEdit);
                        })

                }}>Módosít</button>
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
                     let modifiedPackage = {
                        id, packageCategory, status, date, senderAddress, receiverAddress, weight, user, runner
                    }
                    packageShipped(modifiedPackage, runner)
                        .then((success) => {
                            console.log("Sikeres leadások", success);
                            setFeedbackShipped(success);
                            console.log(feedbackShipped);
                        })
                        toast.info("Sikeres csomagleadás!")
                }}>Leadás</button>

                <button className={`${'backButton'} ${EditPage.BackButton}`} onClick={() => {
                    navigate("/SaCsomagListazas");
                }}>Vissza</button>
            </div>


        </div>
    );
}

export default SaPackageEdit