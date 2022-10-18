import React from 'react'
import { AuthContext } from '../components/AuthContext';
import { generateDate, packageReg } from "../service/package-service";
import FormStyle from '../CSS-styles/FormStyles.module.css';
import FixStyle from '../CSS-styles/FixStyles.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserPackageCreate() {
   
    const [packageCategory, setPackageCategory] = React.useState("");
    const [status, setStatus] = React.useState("várakozik");
    const [senderAddress, setSenderAddress] = React.useState("")
    const [receiverAddress, setReceiverAddress] = React.useState("")
    const [packageWeight, setPackageWeight] = React.useState("")
    let loginContext = React.useContext(AuthContext);

    return (
        <div className={FormStyle.Form}>
            <div>
                <h1>Csomag Feladás</h1>
            </div>
            <div className={FormStyle.InputContainer}>
                <div className={FormStyle.InputBox}>
                    <p>Add meg a feladó címét: </p>
                    <input
                        type="text"
                        placeholder="feladó címe"
                        onChange={(e) => {
                            setSenderAddress(e.target.value);
                        }}
                    >
                    </input>

                    <p>Add meg a szállítási címet: </p>
                    <input
                        type="text"
                        placeholder="címzett címe"
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
                        placeholder="csomag súlya (g)"
                        onChange={e => setPackageWeight(e.target.value)}
                    />
                    <button 
                        className={FixStyle.Button}
                        onClick={() => {
                            toast.info("Sikeres csomagfeladás!")
                        let createdAt = generateDate()
                        let packageToRegister = {
                            packageCategory, status, createdAt, senderAddress, receiverAddress, packageWeight
                        }
                        packageReg(packageToRegister, loginContext.userData.userName)
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
                    pauseOnHover/>
                </div>
                <div className={`${FormStyle.ImageInfo}`}>
                <h1>RnnR</h1>
            </div>
            </div>
            


        </div>
    )
}

export default UserPackageCreate