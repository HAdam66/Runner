import React from 'react'
import { useParams } from 'react-router-dom';
import { runnerEdit, runnerEditDataDisplay } from '../../service/runners-service';
import FormStyle from '../../CSS-styles/FormStyles.module.css';
import FixStyle from '../../CSS-styles/FixStyles.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function RunnerProfile() {

    let params = useParams()
    console.log(params)
    const [name, setName] = React.useState();
    const [userName, setUserName] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [status, setStatus] = React.useState("inactive");
    const [uid, setUid] = React.useState("");
    const [packages, setPackages] = React.useState("")

    React.useEffect(() => {
        runnerEditDataDisplay(params)
            .then(data => {
                console.log(data);
                setName(data.name)
                setUserName(data.userName)
                setPhoneNumber(data.phoneNumber)
                setAddress(data.address)
                setEmail(data.email)
                setPassword(data.password)
                setUid(data.uid);
                setStatus(data.status)
                setPackages(data.packages)
            })
    }, [])

    return (
        <div className={FormStyle.Form}>
            <div>
                <h1>Profilom</h1>
            </div>

            <div className={FormStyle.InputContainer}>
                <p>Név :</p>
                <input type="text"
                    placeholder="név"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
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
            <div className={FormStyle.ButtonCenter}>

                <button
                    className={FixStyle.ProfileBtn}
                    onClick={() => {
                        toast.info("Sikeres adatváltoztatás!")
                        let runnerDataObj =
                        {
                            name: name,
                            userName: userName,
                            email: email,
                            address: address,
                            phoneNumber: phoneNumber,
                            password: password,
                            role: "user",
                            packages: packages,
                            uid: uid,
                            status: status

                        }
                        console.log(runnerDataObj)
                        runnerEdit(runnerDataObj, params.username)
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
            </div>
        </div>
    )
}

export default RunnerProfile