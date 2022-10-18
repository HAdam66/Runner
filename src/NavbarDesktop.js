import React from 'react';
import NavigationStyles from './CSS-styles/NavigationStyles.module.css';
import { Link } from 'react-router-dom'
import { logout } from './service/auth-service';
import { AuthContext } from './components/AuthContext';

function NavbarDesktop() {

    const loginContext = React.useContext(AuthContext);

    return (
        <nav className={NavigationStyles.Navigation}>

            <header className={NavigationStyles.topBar}>
                <span className='logo'>RnnR</span>
                <span>
                    {!loginContext.userData &&
                        <span>
                            <Link to="/">Home</Link>
                            <Link to="Bejelentkezes">Bejelentkezés</Link>
                            <Link to="Regisztracio">Regisztráció</Link>
                            {/* <Link to="FelhasznaloRegisztracio">Regisztráció felhasználóként</Link>
                            <Link to="FutarRegisztracio">Regisztrálás futárként</Link> */}
                            <Link to="CsomagKovetes">Csomag nyomonkövetés</Link>
                        </span>}


                    {loginContext.userData && loginContext.userData.role == "runner" &&
                        <span>
                            <Link to="FutarDashboard">Futár dashboard</Link>
                            <Link to="FutarraVaroCsomagok">Elérhető csomagok</Link>
                            <Link to="FolyamatbanLevoCsomagok">Szállítás alatt</Link>
                            <Link to="FutarTerkep">Térkép</Link>
                            <Link to={`FutarProfil/${loginContext.userData.userName}`}>Saját profil</Link>
                        </span>
                    }

                    {loginContext.userData && loginContext.userData.role == "user" &&
                        <span>
                            <Link to="FelhasznaloDashboard">Felhasználó dashboard</Link>
                            <Link to="CsomagFeladas">Csomag feladás</Link>
                            <Link to="FeladottCsomagok">Feladott csomagok</Link>
                            <Link to="NekemCimzettCsomagok">Nekem címzett csomagok</Link>
                            <Link to={`FelhasznaloProfil/${loginContext.userData.userName}`}>Saját profil</Link>
                            <Link to="CsomagKovetes">Csomag nyomonkövetés</Link>
                        </span>
                    }

                    {loginContext.userData && loginContext.userData.role == "superadmin" &&
                        <span>
                            <Link to="SaFutarReg">Futár reg</Link>
                            <Link to="SaFutarListazas">Futárlista</Link>
                            <Link to="SaCsomagLetrehozas">Csomagfeladás</Link>
                            <Link to="SaCsomagListazas">Csomaglista</Link>
                            <Link to="SaCsomagFutarhozRendeles">Csomag hozzárendelés</Link>
                            <Link to="SaTerkep">Térkép</Link>
                        </span>
                    }
                    {loginContext.userData &&
                        <span className={NavigationStyles.ExitButton}>
                            <Link to="/"
                                onClick={() => {
                                    logout().then(success => {
                                        loginContext.setUserData(null);
                                    })
                                }}>Kijelentkezés</Link>
                        </span>

                    }
                </span>
            </header>
        </nav>
    )
}

export default NavbarDesktop