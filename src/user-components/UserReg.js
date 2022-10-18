import React from 'react'
import { useNavigate } from 'react-router-dom';
import { userReg } from '../service/user-service';
import { AuthContext } from '../components/AuthContext';
import FormStyle from '../CSS-styles/FormStyles.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserReg() {
    const [name, setName] = React.useState("");
    const [userName, setUserName] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    let navigate = useNavigate();
    const loginContext = React.useContext(AuthContext);
    return (
        <div className={FormStyle.Form}>
            <div>
                <h1>Felhasználó regisztráció</h1>
            </div>
            <div className={FormStyle.InputContainer}>
                <div className={FormStyle.InputBox}>
                    <p>Add meg a neved:</p>
                    <input type="text"
                        placeholder="név"
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    ></input>

                    <p>Add meg a felhasználóneved:</p>
                    <input onClick={() =>
                        toast.info("Használd az angol ABC betűit")}
                        type="text"
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

                    <p>Add meg az E-mailed:</p>
                    <input type="text"
                        placeholder="e-mail"
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                    ></input>

                    <p>Írd be a jelszavad:</p>
                    <input
                        type="password"
                        placeholder="password"
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    ></input>

                    <p>Add meg a telefonszámod:</p>
                    <input type="text"
                        placeholder="telefonszám"
                        onChange={(e) => {
                            setPhoneNumber(e.target.value)
                        }}
                    ></input>

                    <p>Írd be a címed:</p>
                    <input type="text"
                        placeholder="cím"
                        onChange={(e) => {
                            setAddress(e.target.value)
                        }}
                    ></input>
                    <div className={FormStyle.ButtonCenter}>
                        <button onClick={() => {
                            let userDataObj =
                            {
                                name: name,
                                userName: userName,
                                email: email,
                                address: address,
                                phoneNumber: phoneNumber,
                                password: password,
                                role: "user"
                            }
                            userReg(userDataObj)

                                .then((userDataObj) => {
                                    loginContext.setUserData(userDataObj);
                                    navigate("/FelhasznaloDashboard")
                                })
                        }}>Regisztráció</button>
                    </div>
                </div>
                <div className={FormStyle.ImageInfo}>
                    <h1>RnnR</h1>
                </div>
            </div>
        </div>
    )
}

export default UserReg