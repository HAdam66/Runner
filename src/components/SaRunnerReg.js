import React from "react";
import { adminRunnerReg, runnerReg } from "../service/runners-service";
import FormStyle from '../CSS-styles/FormStyles.module.css';
import FeedbackStyle from '../CSS-styles/FeedbackStyles.module.css';
import Feedback from "../Feedback";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function SaRunnerReg() {
    const [name, setName] = React.useState("");
    const [userName, setUserName] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [status, setStatus] = React.useState("inactive");
    const [feedback, setFeedback] = React.useState(undefined);
    

    return (
        <div className={FormStyle.Form}>
            <div>
                <h1>Szuper Admin Futár Regisztráció</h1>
            </div>
            <div className={FormStyle.InputContainer}>
                <div className={FormStyle.InputBox}>
                    <p>Írd be a futár teljes nevét:</p>
                    <input type="text"
                        placeholder="név"
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    ></input>

                    <p >Add meg a futár felhasználó nevét:</p>
                    <input onClick={() => toast.info("Használd az angol ABC betűit")} type="text"
                        placeholder="felhasználónév"
                        onChange={(e) => {
                            setUserName(e.target.value);
                        }}
                    ></input>
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

                    <p>Add meg a futár e-mail címét:</p>
                    <input type="text"
                        placeholder="e-mail"
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                    ></input>

                    <p>Add meg a futár jelszavát:</p>
                    <input
                        placeholder="password"
                        type="password"
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    ></input>

                    <p>Add meg a futár telefonszámát:</p>
                    <input type="text"
                        placeholder="telefonszám"
                        onChange={(e) => {
                            setPhoneNumber(e.target.value)
                        }}
                    ></input>

                    <p>Írd be a futár címét:</p>
                    <input type="text"
                        placeholder="cím"
                        onChange={(e) => {
                            setAddress(e.target.value)
                        }}
                    ></input>
                    <div className={FeedbackStyle.ButtonSection}>
                        <button onClick={() => {
                            toast.info("Sikeres csomagleadás!")
                            let runnerDataObj =
                            {
                                name: name,
                                userName: userName,
                                email: email,
                                address: address,
                                phoneNumber: phoneNumber,
                                password: password,
                                status: status,
                                role: "runner"
                            }
                            adminRunnerReg(runnerDataObj)
                                .then((success) => {
                                    console.log("sikeres hozzárendelés", success);
                                    setFeedback(success);
                                    console.log(feedback);
                                })
                        }}>Futár regisztrálása</button>
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
                <div className={`${FormStyle.ImageInfo} ${FormStyle.SaRunnerEditBackground}`}>
                    <h1>RnnR</h1>
                </div>
            </div>

        </div>
    );

}