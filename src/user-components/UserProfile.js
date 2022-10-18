import React from 'react'
import { useParams } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext'
import { userEdit, userEditDataDisplay } from '../service/user-service';
import FormStyle from '../CSS-styles/FormStyles.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserProfile() {
    let params = useParams();
    let loginContext = React.useContext(AuthContext)
    const [name, setName] = React.useState("");
    const [userName, setUserName] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [packages, setPackages] = React.useState("")
    const [uid, setUid] = React.useState("");
    //ki kell menteni a packaget és a uid is h atadjuk vagy különben elveszik a putnal
    console.log(params)
    // azért useeffectbe h rögtön updatelodjön a data 

    React.useEffect(() => {
        userEditDataDisplay(params)
            .then(data => {
                console.log(data);

                setName(data.name)
                setUserName(data.userName)
                setPhoneNumber(data.phoneNumber)
                setAddress(data.address)
                setEmail(data.email)
                setPassword(data.password)
                setUid(data.uid);
                setPackages(data.packages)
            })
    }, [])
    return (
        <div className={FormStyle.Form}>
            <div>
                <h1>Profilom</h1>
            </div>

            <div className={FormStyle.InputContainer}>
                <div className={FormStyle.InputBox}>
                    <p>Név szerkesztése:</p>
                    <input type="text"
                        placeholder="név"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    ></input>

                    <p>E-mail szerkesztése:</p>
                    <input type="text"
                        placeholder="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                    ></input>

                    <p>Jelszó szerkesztése:</p>
                    <input type="text"
                        placeholder="jelszó"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    ></input>

                    <p>Telefonszám szerkesztése:</p>
                    <input type="text"
                        placeholder="telefonszám"
                        value={phoneNumber}
                        onChange={(e) => {
                            setPhoneNumber(e.target.value)
                        }}
                    ></input>

                    <p>Cím szerkesztése:</p>
                    <input type="text"
                        placeholder="cím"
                        value={address}
                        onChange={(e) => {
                            setAddress(e.target.value)
                        }}
                    ></input>
                    <div className={FormStyle.ButtonCenter}>
                        <button onClick={() => {
                            toast.info("Sikeres adatváltoztatás!")
                            let userDataObj =
                            {
                                name: name,
                                userName: userName,
                                email: email,
                                address: address,
                                phoneNumber: phoneNumber,
                                password: password,
                                role: "user",
                                packages: packages,
                                uid: uid

                            }
                            console.log(userDataObj)
                            userEdit(userDataObj)
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
                    pauseOnHover/>
                    </div>
                </div>
                <div className={`${FormStyle.ImageInfo} ${FormStyle.UserProfileEditBackground}`}>
                    <h1>RnnR</h1>
                </div>
            
        </div>

        </div >
    )
}

export default UserProfile