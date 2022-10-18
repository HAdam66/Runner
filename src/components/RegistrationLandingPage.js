import React from 'react'
import { useNavigate } from "react-router-dom";
import Register from '../CSS-styles/Register.module.css';

function RegistrationLandingPage() {
  const navigate = useNavigate();

  return (
    <div className={Register.Form}>
      <div className={Register.RegisterContainer}>
        <div className={Register.RegisterBox}>
          <button onClick={() => {
            navigate("/FutarRegisztracio")
          }}>Regisztrálás futárként</button>
        </div>
        <div className={Register.RegisterBox}>
          <button onClick={() => {
            navigate("/FelhasznaloRegisztracio")
          }}>Regisztrálás felhasználóként</button>
        </div>
      </div>
    </div>
  )
}

export default RegistrationLandingPage