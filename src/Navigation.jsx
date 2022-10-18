import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {AuthContext} from './components/AuthContext';
import {login, logout} from './service/auth-service';
import NavigationStyles from './CSS-styles/NavigationStyles.module.css'
import Hamburger from "./components/Hamburger/Hamburger";
import MenuDrawer from "./components/MenuDrawer";


function Navigation() {
    const loginContext = React.useContext(AuthContext);

    const [isMenuVisible, setIsMenuVisible] = React.useState(false);

    return (
        <nav className={` ${NavigationStyles.Navigation}`}>

            <header className={NavigationStyles.topBar}>
                <span className='logo'>RnnR</span>
                <Hamburger isOpen={isMenuVisible}
                           color='#00c2ce'
                           menuClicked={setIsMenuVisible}
                           width={24} height={20}/>
            </header>

            <MenuDrawer open={isMenuVisible} setOpen={setIsMenuVisible} >
                {!loginContext.userData &&
                    <div onClick={() => setIsMenuVisible(false)}>
                        <Link to="/">Home</Link>
                        <Link to="Bejelentkezes">Bejelentkezés</Link>
                        {/* <Link to="FelhasznaloRegisztracio">Regisztráció felhasználóként</Link>
                        <Link to="FutarRegisztracio">Regisztrálás futárként</Link> */}
                        <Link to="Regisztracio">Regisztráció</Link> 
                        <Link to="CsomagKovetes">Csomag nyomonkövetés</Link>
                    </div>}


                {loginContext.userData && loginContext.userData.role == "runner" &&
                    <div onClick={() => setIsMenuVisible(false)}>
                        <Link to="FutarDashboard">Futár dashboard</Link>
                        <Link to="FutarraVaroCsomagok">Elérhető csomagok</Link>
                        <Link to="FolyamatbanLevoCsomagok">Szállítás alatt</Link>
                        <Link to="FutarTerkep">Térkép</Link>
                        <Link to={`FutarProfil/${loginContext.userData.userName}`}>Saját Profil</Link>
                    </div>
                }

                {loginContext.userData && loginContext.userData.role == "user" &&
                    <div onClick={() => setIsMenuVisible(false)}>
                        <Link to="FelhasznaloDashboard">Felhasználó dashboard</Link>
                        <Link to="CsomagFeladas">Csomag feladás</Link>
                        <Link to="FeladottCsomagok">Feladott csomagok</Link>
                        <Link to="NekemCimzettCsomagok">Nekem címzett csomagok</Link>
                        <Link to={`FelhasznaloProfil/${loginContext.userData.userName}`}>Saját Profil</Link>
                        <Link to="CsomagKovetes">Csomag nyomonkövetés</Link>
                    </div>
                }

                {loginContext.userData && loginContext.userData.role == "superadmin" &&
                    <div onClick={() => setIsMenuVisible(false)}>
                        <Link to="SaFutarReg">Futár Reg</Link>
                        <Link to="SaFutarListazas">Futárlistázás</Link>
                        <Link to="SaCsomagLetrehozas">Csomag Létrehozás</Link>
                        <Link to="SaCsomagListazas">Csomag Listázás</Link>
                        <Link to="SaCsomagFutarhozRendeles">Csomag Futárhoz Rendelése</Link>
                        <Link to="SaTerkep">Térkép</Link>
                    </div>
                }
                {loginContext.userData &&
                    <Link to="/"
                          className={NavigationStyles.ExitButton}
                          onClick={() => {
                              logout().then(success => {
                                  loginContext.setUserData(null);
                                  setIsMenuVisible(false)
                              })
                          }}>Kijelentkezés</Link>
                }
            </MenuDrawer>
        </nav>
    )
}

export default Navigation