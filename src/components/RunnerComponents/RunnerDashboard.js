import React from 'react';
import { packageShipped } from '../../service/package-service';
import { AuthContext } from '../AuthContext';
import DashboardStyles from '../../CSS-styles/DashboardStyles.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { addressToCoordinates, arrayStatusToUnderDelivery, arrayUpdate } from '../../service/runners-service';
import { getDatabase, ref, onValue } from 'firebase/database';
import { app } from '../../service/firebaseconfig';
import { realTimePairing } from '../../service/realtime-service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RunnerDashboard() {
  let loginContext = React.useContext(AuthContext)
  const [packagesUnderDelivery, setPackagesUnderDelivery] = React.useState([])
  const [numOfPackUnderDelivery, setNumOfPackUnderDelivery] = React.useState(0)
  const [totalNumOfAwaitingP, setTotalNumOfAwaitingP] = React.useState(0)
  const [activeTab, setActiveTab] = React.useState("szállításalatt")
  const [packages, setPackages] = React.useState([])
  const [accuracy, setAccuracy] = React.useState(0)
  const [runnerCoordinates, setRunnerCoordinates] = React.useState({});
  console.log(packages)
  const navigate = useNavigate();

  React.useEffect(() => {

    let db = getDatabase(app)
    let pathRef = ref(db, "Csomagok")
    onValue(pathRef, packs => {
      let packagesArray = [];
      packs.forEach(pack => {
        const key = pack.key;
        const values = pack.val()
        packagesArray.push({ id: key, ...values })
      })
      setPackages(packagesArray)
      let numOfAwaitingResult = packagesArray.filter(x => x.status == "várakozik").length
      console.log(numOfAwaitingResult)
      setTotalNumOfAwaitingP(numOfAwaitingResult)

      let numOfUnderDeliveryResult = packagesArray.filter(x => x.status == "szállítás alatt").length
      console.log(numOfUnderDeliveryResult)
      setNumOfPackUnderDelivery(numOfUnderDeliveryResult)
    })
  }, [])

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);
        let runnerCoordinates = new window.google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        setAccuracy(position.coords.accuracy)
        //    console.losg(coordinates);
        //    return runnerCoordinates;
        setRunnerCoordinates(runnerCoordinates);
        // settes firebase IDE
    });
}, [])

  return (
    <div className={DashboardStyles.Container}>
      <h1>Hello {loginContext.userData.userName}!</h1>


      {activeTab == "szállításalatt" &&
        <>
          <h2>Szállítás alatt lévő csomagjaid: {numOfPackUnderDelivery}</h2>
          <Link to="/FolyamatbanLevoCsomagok">Összes folyamatban lévő csomag</Link>
          {packages.map(currentPackage => {
            console.log(currentPackage)
            if (currentPackage.status == "szállítás alatt") {
              return (
                <ul key={currentPackage.id} className={DashboardStyles.UlItems}>
                  <div className={DashboardStyles.Tabs}>
                    <li> <span>ID: </span><br></br> {currentPackage.id}</li>
                    <li> <span>Kategória: </span><br></br> {currentPackage.category}</li>
                    <li> <span>Súly: </span><br></br> {currentPackage.packageWeight}</li>
                    <li> <span>Feladó címe: </span><br></br> {currentPackage.senderAddress}</li>
                    <li> <span>Címzett címe: </span><br></br> {currentPackage.receiverAddress}</li>
                    <li> <span>Feladó felhasználó: </span><br></br> {currentPackage.user}</li>
                    <li> <span>Feladva: </span><br></br> {currentPackage.createdAt}</li>

                    <div className={DashboardStyles.TwoSmallerButton}>
                      <button onClick={() => {
                        addressToCoordinates(currentPackage.receiverAddress, runnerCoordinates)
                          .then((distance) => {
                            if ((distance - accuracy) < 15) {
                              packageShipped(currentPackage, loginContext.userData.userName)
                                .then(() => {
                                  setPackages(arrayUpdate(packages, currentPackage))
                                  setNumOfPackUnderDelivery(numOfPackUnderDelivery - 1)
                                  console.log("distance figyelés BENT");
                                  console.log("valami leadott");
                                })
                            } else {
                              alert("Túl messze vagy " + distance + " méter távolságra");
                            }
                          })
                        // console.log(currentPackage)
                        // packageShipped(currentPackage, loginContext.userData.userName)
                        // .then(() => {
                        //   console.log("nincs benne distance figyelés, csak leadja")
                        //   console.log("realtime array updata ujabb fetch nélkül a tömb módosítással, leadásnál megy")
                        //   setPackagesUnderDelivery(arrayUpdate(packagesUnderDelivery, currentPackage))
                        //   setNumOfPackUnderDelivery(numOfPackUnderDelivery - 1)
                        // })
                      }}>Leadás QR kód nélkül</button>


                      <button onClick={() => {
                        loginContext.setDeliveryData(currentPackage)
                        console.log(currentPackage)
                        navigate("/FutarQr");
                      }}>Leadás QR kóddal</button>
                    </div>
                  </div>
                </ul>

              )
            }
          })}
        </>
      }


      {activeTab == "felvételrevárakozó" &&
        <>

          <h2>Felvételre várakozó csomagok: {totalNumOfAwaitingP}</h2>
          <Link to="/FutarraVaroCsomagok">Összes elérhető csomag</Link>
          {packages.map(availablePack => {
            if (availablePack.status == "várakozik") {
              return (
                <ul key={availablePack.id} className={DashboardStyles.UlItems}>
                  <div className={DashboardStyles.Tabs}>
                    <li> <span>ID: </span><br></br> {availablePack.id}</li>
                    <li> <span>Kategória: </span><br></br> {availablePack.category}</li>
                    <li> <span>Súly: </span><br></br> {availablePack.packageWeight}</li>
                    <li> <span>Feladó címe: </span><br></br> {availablePack.senderAddress}</li>
                    <li> <span>Címzett címe: </span><br></br> {availablePack.receiverAddress}</li>
                    <li> <span>Létrehozás dátuma: </span><br></br> {availablePack.createdAt}</li>
                    <li> <span>Feladva: </span><br></br> {availablePack.createdAt}</li>

                    <button className={DashboardStyles.SmallerButton} onClick={() => {
                      realTimePairing(availablePack, loginContext.userData.userName)
                      setPackages(arrayStatusToUnderDelivery(packages, availablePack, loginContext.userData.userName))
                      setNumOfPackUnderDelivery(numOfPackUnderDelivery + 1)
                      setTotalNumOfAwaitingP(totalNumOfAwaitingP - 1)
                      console.log("dashboard masik agan felvett");
                      toast.info("Sikeres csomagfelvétel!")
                    }}>Csomag felvétele</button>
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
                </ul>)
            }
          })}

        </>
      }

      {activeTab == "hasznosinfok" &&
        <>
          <h2>Hasznos infók</h2>
          <ul className={DashboardStyles.UlItems} >
            <div className={DashboardStyles.Tabs}>

              <li>Közlekedj óvatosan</li>
              <li>Igyekezz teljesíteni a szállításokat</li>
              <li>Ügyelj a csomagok épségére</li>
              <li>Jelezd a megrendelőnek az érkezésed</li>
              <li>A megfelelő csomagot add át a címzettnek</li>
              <li>Menj biztosra, ha lehet használd a QR-kódos csomagleadást</li>
              <li>Légy kedves az kliensekkel</li>
            </div>
          </ul>

          <h2>Kapcsolat</h2>
          <ul className={DashboardStyles.UlItems} >
            <div className={DashboardStyles.Tabs}>
              <li><span>E-mail: </span>support@rnnr.hu</li>
              <li> <span>Telefon: </span>+3611111111</li>
              <li><span>Székház: </span>Budapest, random cím 1</li>
            </div>
          </ul>
        </>

      }
      
      <div className={DashboardStyles.Positioning}>
        <div className={DashboardStyles.CoverBox}></div>
        <div className={DashboardStyles.BottomTabs}>
          <div className={activeTab == "szállításalatt" && DashboardStyles.ActiveTab} onClick={() => setActiveTab("szállításalatt")}><h3>Szállítás</h3></div>
          <div className={activeTab == "felvételrevárakozó" && DashboardStyles.ActiveTab} onClick={() => setActiveTab("felvételrevárakozó")}><h3>Felvétel</h3></div>
          <div className={activeTab == "hasznosinfok" && DashboardStyles.ActiveTab} onClick={() => setActiveTab("hasznosinfok")}><h3>Hasznos</h3></div>
        </div>
      </div>
    </div>

  )
}

export default RunnerDashboard;