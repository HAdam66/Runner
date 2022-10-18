import React from 'react';
import { runnerReg } from '../../service/runners-service';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import FormStyle from '../../CSS-styles/FormStyles.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RunnerReg() {
  const [name, setName] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [status, setStatus] = React.useState("inactive");
  let navigate = useNavigate();
  const loginContext = React.useContext(AuthContext);

  return (
    <div className={FormStyle.Form}>
      <div>
        <h1>Futár regisztráció</h1>
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

          <p>Add meg a jelszavad:</p>
          <input
            placeholder="password"
            type="password"
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

          <p>Add meg a címed:</p>
          <input type="text"
            placeholder="cím"
            onChange={(e) => {
              setAddress(e.target.value)
            }}
          ></input>

          <div className={FormStyle.ButtonCenter}>
            <button onClick={() => {
              let runnerRegObj =
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
              runnerReg(runnerRegObj)
                .then((runnerRegObj) => {
                  loginContext.setUserData(runnerRegObj);
                  navigate("/FutarDashboard")
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

export default RunnerReg