import React from "react";
import { generateDate, packageReg } from "../service/package-service";
import FormStyle from '../CSS-styles/FormStyles.module.css';
import FeedbackStyle from '../CSS-styles/FeedbackStyles.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SaPackageCreate() {
    const [packageCategory, setPackageCategory] = React.useState("");
    const [status, setStatus] = React.useState("várakozik");
    const [senderAddress, setSenderAddress] = React.useState("");
    const [receiverAddress, setReceiverAddress] = React.useState("");
    const [senderUser, setSenderUser] = React.useState("");
    const [packageWeight, setPackageWeight] = React.useState("");
    
    

    return (
        <div className={FormStyle.Form}>
            <div>
                <h1>Szuper Admin Csomag Létrehozás</h1>
            </div>

            <div className={FormStyle.InputContainer}>
                <div className={FormStyle.InputBox}>
                    <p>Add meg a csomag feladóját: </p>
                    <input
                        type="text"
                        placeholder="csomag feladója"
                        onChange={e => setSenderUser(e.target.value)}
                    >
                    </input>

                    <p>Add meg a feladó címét: </p>
                    <input
                        type="text"
                        placeholder="feladó cím"
                        onChange={(e) => {
                            setSenderAddress(e.target.value);
                        }}
                    >
                    </input>

                    <p>Add meg a címzett címét: </p>
                    <input
                        type="text"
                        placeholder="címzett cím"
                        onChange={(e) => {
                            setReceiverAddress(e.target.value);
                        }}
                    >
                    </input>

                    <p>Add meg a csomag kategóriáját: </p>
                    <input
                        type="text"
                        placeholder="csomag kategória"
                        onChange={e => setPackageCategory(e.target.value)}
                    >
                    </input>
                    <p>Add meg a csomag súlyát: </p>
                    <input
                        type="text"
                        placeholder="csomag súly (g)"
                        onChange={e => setPackageWeight(e.target.value)}
                    />
                    {/* <span className={FormStyle.WeightSpan}>g</span> */}
                    <div className={FeedbackStyle.ButtonSection}>
                        <button onClick={() => {
                            toast.info("Sikeres csomagfeladás!")
                            let createdAt = generateDate()
                            let packageToRegister = {
                                packageCategory, status, createdAt, senderAddress, receiverAddress, senderUser, packageWeight
                            }
                            packageReg(packageToRegister, senderUser)
                        }}>Létrehoz</button>
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
                <div className={FormStyle.ImageInfo}>
                    <h1>RnnR</h1>
                </div>
            </div>

        </div>
    );
}