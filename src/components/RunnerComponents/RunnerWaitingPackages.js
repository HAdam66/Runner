import React from 'react'
import { packageRunnerPairing } from '../../service/package-service';
import { AuthContext } from '../AuthContext';
import DashboardStyles from '../../CSS-styles/DashboardStyles.module.css'
import { arrayUpdate } from '../../service/runners-service';
import { getDatabase, ref,  onValue } from 'firebase/database';
import { app } from '../../service/firebaseconfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function RunnerWaitingPackages() {
  const [packages, setPackages] = React.useState([]);
  const loginContext = React.useContext(AuthContext);
  console.log("loginContext.userData.userName ", loginContext.userData.userName);
  console.log(packages)

  React.useEffect(() => {
    // listPackages()
    //   .then(packagesArray => setPackages(packagesArray));
    let db = getDatabase(app)
    let pathRef = ref(db, "Csomagok")
    onValue(pathRef, packs => {
      let packagesArray = [];
        packs.forEach(pack => {
            const key = pack.key;
            const values = pack.val()
            packagesArray.push({id: key, ...values})    
        })
        console.log(packagesArray)
        setPackages(packagesArray)
    })
  }, [])


  return (
    <div className={DashboardStyles.Container}>
      <h1>Felvételre várakozó csomagok</h1>
      {packages.map(currentPackage => {
        console.log(currentPackage)
        return (
          currentPackage.status === "várakozik" &&
          <ul className={DashboardStyles.UlItems}>
            <div className={DashboardStyles.Tabs}>
              <div >
                <li> <span>ID: </span><br></br> {currentPackage.id}</li>
                <li> <span>Kategória: </span><br></br> {currentPackage.category}</li>
                <li> <span>Súly: </span><br></br> {currentPackage.packageWeight}</li>
                <li> <span>Feladó címe: </span><br></br> {currentPackage.senderAddress}</li>
                <li> <span>Címzett címe: </span><br></br> {currentPackage.receiverAddress}</li>
                <li> <span>Feladás dátuma: </span><br></br> {currentPackage.createdAt}</li>

              </div>
              <div className={DashboardStyles.ButtonSection}>
                <button className={DashboardStyles.SmallerButton} onClick={
                  () => { 
                    console.log(loginContext.userData.userName)
                    console.log(currentPackage)

                    packageRunnerPairing(loginContext.userData.userName, currentPackage)
                    .then(() => {
                      setPackages(arrayUpdate(packages, currentPackage))
                      console.log("felvételnél is törölni kell a listából a meglévő csomagot");
                      toast.info("Sikeres csomagfelvétel!")
                  
                    })
               }
                }>Csomag felvétele</button>
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
          </ul>

        )
      })}
    </div>
  )
}

export default RunnerWaitingPackages