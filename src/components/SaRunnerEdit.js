import React from 'react'
import { runnerEditDataDisplay, runnerEdit } from '../service/runners-service';
import { useNavigate, useParams } from "react-router-dom";
import EditPage from '../CSS-styles/EditPage.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SaRunnerEdit() {
    let params = useParams()
    let navigate = useNavigate();
    const [name, setName] = React.useState();
    const [userName, setUserName] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [status, setStatus] = React.useState("inactive");
    const [runnerCoordinates, setRunnerCoordinates] = React.useState(null)
    const [uid, setUid] = React.useState("");
    const [feedback, setFeedback] = React.useState(undefined);

    React.useEffect(() => {
        runnerEditDataDisplay(params)
            .then(data => {
                console.log(data);
                setRunnerCoordinates(data.runnerCoordinates)
                setName(data.name)
                setUserName(data.userName)
                setPhoneNumber(data.phoneNumber)
                setAddress(data.address)
                setEmail(data.email)
                setPassword(data.password)
                setUid(data.uid);
            })
    }, [])

    return (
        <div className={EditPage.EditMainContainer}>
            <div className={EditPage.EditLogo}>
                <h1>Futár Szerkesztése</h1>
            </div>
            <div className={EditPage.EditContainer}>
                <div className={EditPage.EditBox}>
                    <div className={EditPage.EditInput}>
                        <p>Név :</p>
                        <input type="text"
                            placeholder="név"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        ></input>

                        <p>Felhasználónév :</p>
                        <input type="text"
                            disabled
                            placeholder="felhasználó"
                            value={userName}
                            onChange={(e) => {
                                setUserName(e.target.value);
                            }}
                        ></input>

                        <p>E-mail :</p>
                        <input type="text"
                            disabled
                            placeholder="e-mail"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        ></input>
                    </div>
                    <div className={EditPage.EditInput}>
                        <p>Jelszó :</p>
                        <input type="text"
                            placeholder="jelszó"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        ></input>

                        <p>Telefonszám :</p>
                        <input type="text"
                            placeholder="telefonszám"
                            value={phoneNumber}
                            onChange={(e) => {
                                setPhoneNumber(e.target.value)
                            }}
                        ></input>

                        <p>Cím :</p>
                        <input type="text"
                            placeholder="cím"
                            value={address}
                            onChange={(e) => {
                                setAddress(e.target.value)
                            }}
                        ></input>
                    </div>
                </div>
            </div>
            <div className={EditPage.EditButton}>

                <button onClick={() => {
                    toast.info("Sikeres mentés!")
                    runnerEdit({
                        name,
                        userName,
                        email,
                        phoneNumber,
                        password,
                        address,
                        status,
                        uid,
                        runnerCoordinates
                    }, params.username)
                        //.then(() => navigate("/SaFutarListazas"))
                        .then((success) => {
                            console.log("sikeres futárszerkesztés", success);
                            setFeedback(success);
                            console.log(feedback);
                        })
                }
                }>Mentés</button>
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


                <button className={`${'backButton'} ${EditPage.BackButton}`} onClick={() => {
                    navigate("/SaFutarListazas");
                }}>Vissza</button>
            </div>

        </div>
    )
}

export default SaRunnerEdit
