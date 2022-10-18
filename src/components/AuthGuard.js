import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { AuthContext } from './AuthContext'


export default function AuthGuard(props) {
    const loginContext = React.useContext(AuthContext);
    const params = useParams()   
    let location = useLocation();

    const permissions = {
        // "/FutarRegisztracio": [],
        // "/Bejelentkezes": [],
        // "/"
        "/SaFutarReg": ["superadmin"],
        "/SaFutarListazas": ["superadmin"],
        [`/SaFutarSzerkesztes/${params.username ? params.username : null}`]: ["superadmin"], //usematch?
        [`/SaFutarTorles/${params.runnerId ? params.runnerId : null}`]: ["superadmin"],
        "/SaCsomagListazas": ["superadmin"],
        "/SaCsomagLetrehozas": ["superadmin"],
        [`/SaCsomagTorles/${params.packageId ? params.packageId : null}`]: ["superadmin"],
        [`/SaCsomagSzerkesztes/${params.packageId ? params.packageId : null}`]: ["superadmin"],
        "/SaCsomagFutarhozRendeles": ["superadmin"],
        "/SaTerkep": ["superadmin"],
        "/FelhasznaloDashboard": ["user"],
        "/FeladottCsomagok": ["user"],
        "/NekemCimzettCsomagok": ["user"],
        "/CsomagFeladas": ["user"],
        [`/FelhasznaloProfil/${params.username ? params.username : null}`]: ["user"],
        "/FutarraVaroCsomagok": ["runner"],  
        "/FolyamatbanLevoCsomagok": ["runner"], 
        "/FutarDashboard": ["runner"],
        "/FutarQr": ["runner"],
        "/FutarTerkep" : ["runner"],
        [`/FutarProfil/${params.username ? params.username : null}`]: ["runner"]
    }


    return (
        <>
            {loginContext.userData && hasPermissions(loginContext.userData.role, location.pathname) && props.children}
        </>
    );
    
    function hasPermissions(role, route) {
        return permissions[route].includes(role) || permissions[route].length === 0;
    }
}

// ide kell a user contextből kiolvasni a user role-ját, valamint a route routerrel le tudjuk kérni az aktuális útvonalat.
// Az aktuális útvonalat használjuk, hogy  apermissionsből kiolvassuk a hozzáférési opciót.

