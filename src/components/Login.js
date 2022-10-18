import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../service/auth-service";
import { AuthContext } from './AuthContext';
import FormStyle from '../CSS-styles/FormStyles.module.css';

export default function Login() {
    const loginContext = React.useContext(AuthContext);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [emailError, setEmailError] = React.useState(null)
    const [passwordError, setPasswordError] = React.useState(null)
    let navigate = useNavigate();

    React.useEffect(() => {
        if(loginContext.userData != null && loginContext.userData.role == "user") {
            window.alert("már be vagy lépve")
            navigate("/FelhasznaloDashboard")
        } else if (loginContext.userData != null && loginContext.userData.role == "runner") {
            window.alert("már be vagy lépve")
            navigate("/FutarDashboard")
        } else if (loginContext.userData != null && loginContext.userData.role == "superadmin") {
            window.alert("már be vagy lépve")
            navigate("/SaCsomagListazas")
        }
    }, [])

    return (
        <div className={FormStyle.Form}>
            <h1>Bejelentkezés</h1>
            <div className={FormStyle.InputContainer}>
                <div className={`${FormStyle.InputBox} ${FormStyle.Login}`}>
                    <p>E-mail cím a belépéshez:</p>
                    <input
                        className={emailError != null ? FormStyle.EmailError : "none"}
                        type="email"
                        placeholder={emailError == null? "email cím" : emailError}
                        onChange={(e) => { setEmail(e.target.value) }}
                    >
                    </input>
                    <p>Jelszó a belépéshez:</p>
                    <input
                        className={emailError != null ? FormStyle.PasswordError : "none"}
                        type="password"
                        placeholder={passwordError == null? "jelszó" : passwordError}
                        
                        onChange={(e) => { setPassword(e.target.value) }}
                    >
                    </input>
                    <div className={FormStyle.ButtonCenter}>
                        <button 
                        className={email.length < 3 || password.length < 6 ? FormStyle.DisabledBtn : "none"}
                        onClick={() => {
                            if(email.length < 3 || password.length < 6) {
                                if(email.length < 3 && password.length < 6) {
                                    setEmailError("nem létező email cím")
                                    setPasswordError("nem valid jelszó")    
                                } else if (email.length < 3) {
                                    setEmailError("nem létező email cím")
                                } else if(password.length < 6) {
                                    setPasswordError("nem valid jelszó") 
                                }
                            }
                            else {
                            login(email, password).then((userdata) => {
                                setEmailError(null)
                                setPasswordError(null)
                                loginContext.setUserData(userdata);
                                if (userdata.role == "user") {
                                    navigate("/FelhasznaloDashboard")
                                } else if (userdata.role == "runner") {
                                    navigate("/FutarDashboard")
                                } else if (userdata.role == "superadmin") {
                                    navigate("/SaCsomagListazas")
                                } else {
                                    navigate("/")
                                }

                            })}
                        }}>Bejelentkezés</button>
                    </div>
                    <div className={FormStyle.RegLinks}>
                        <Link to="/FelhasznaloRegisztracio"><h5>Regisztrálj felhasználóként.</h5></Link>
                        <Link to="/FutarRegisztracio"><h5>Regisztrálj futárként.</h5></Link>
                    </div>
                </div>
                <div className={FormStyle.ImageInfo}>
                    <h1>RnnR</h1>
                </div>
            </div>
        </div >
    )
}
