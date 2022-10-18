import React from "react";
import { QRCodeSVG } from 'qrcode.react';
import { AuthContext } from "../AuthContext";
import FixStyle from "../../CSS-styles/FixStyles.module.css"
export default function RunnerQr() {
    let loginContext = React.useContext(AuthContext)
    console.log(loginContext.deliveryData)

    return(
        <div className={FixStyle.QrContainer}>
            <h1 className={FixStyle.QrH1}>QR kódos csomagleadás</h1>
            <div className={FixStyle.QrDiv}>
            <QRCodeSVG className={FixStyle.QrCode} value={`http://localhost:3000/Csomagatvetel?futar=${loginContext.userData.userName}&felado=${loginContext.deliveryData.user}&csomagid=${loginContext.deliveryData.id}`} />,
            </div>
        </div>
    );
}