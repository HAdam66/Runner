import React from 'react'
import { AuthContext } from '../components/AuthContext'
import { packagesSentByUser, userListPackages } from '../service/user-service'
import DashboardStyles from '../CSS-styles/DashboardStyles.module.css'
import { Link } from 'react-router-dom'
import UserDashboardDesktop from './UserDashboardDesktop'
import Style from '../CSS-styles/DesktopDashboardStyle.module.css'


function UserDashboard() {

  let loginContext = React.useContext(AuthContext)
  const [incomingPackages, setIncomingPackages] = React.useState([])
  const [createdPackages, setCreatedPackages] = React.useState([])
  const [numOfPackIncoming, setNumOfPackIncoming] = React.useState(0)
  const [numOfSentPacks, setNumOfSentPacks] = React.useState(0)
  const [activeTab, setActiveTab] = React.useState("érkezőcsomagok")
  const [windowSize, setWindowSize] = React.useState(getWindowSize());

  console.log(loginContext.userData)

  React.useEffect(() => {
    userListPackages(loginContext.userData.address)
      .then(data => {
        let receiverPackagesArray = []
        let incPNum = []
        data.forEach(pack => {
          console.log(pack)

          if (pack.receiverAddress == loginContext.userData.address && pack.status != "leadott" && receiverPackagesArray.length < 4) {
            receiverPackagesArray.push(pack)

          } if (pack.receiverAddress == loginContext.userData.address && pack.status != "leadott") {
            incPNum.push(pack)
          }
        })
        setIncomingPackages(receiverPackagesArray)
        setNumOfPackIncoming(incPNum.length)
      })
  }, [])

  React.useEffect(() => {
    packagesSentByUser(loginContext.userData.userName)
      .then((incomingPackages) => {
        let activePsentByUser = []
        let sentPNum = []
        incomingPackages.forEach(pack => {
          if (activePsentByUser.length < 4) {
            activePsentByUser.push(pack)
          }
          sentPNum.push(pack)
        })
        setCreatedPackages(activePsentByUser)
        setNumOfSentPacks(sentPNum.length)
      })
  }, [])

  React.useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <div className={Style.BiggestContainer}>
      {windowSize.innerWidth >= 1024 ?
        <UserDashboardDesktop />
        :

        <div className={DashboardStyles.Container}>
          <h1>Hello {loginContext.userData.userName}!</h1>

          {activeTab == "érkezőcsomagok" &&
            <>
              <h2>Aktív érkező csomagjaid: {numOfPackIncoming}</h2>
              <Link className={DashboardStyles.BlackLink} to="/NekemCimzettCsomagok">Összes érkező csomag</Link>
              {incomingPackages.map(packbelongstouser => {
                return (
                  <ul key={packbelongstouser.id} className={DashboardStyles.UlItems}>
                    <div className={DashboardStyles.Tabs}>

                      <li> <span>ID: </span><br></br> {packbelongstouser.id}</li>
                      <li> <span>Kategória: </span><br></br> {packbelongstouser.category}</li>
                      <li> <span>Súly: </span><br></br> {packbelongstouser.packageWeight}</li>
                      <li> <span>Státusz: </span><br></br> {packbelongstouser.status}</li>
                      {packbelongstouser.status == "szállítás alatt" && <li><span>Futár: </span>{packbelongstouser.runner}</li>}
                      <li> <span>Létrehozás dátuma: </span><br></br> {packbelongstouser.createdAt}</li>
                      <li> <span>Feladó címe: </span><br></br> {packbelongstouser.senderAddress}</li>
                    </div>
                  </ul>)

              })}
            </>
          }


          {activeTab == "feladottcsomagok" &&
            <>
              <h2>Feladott csomagok: {numOfSentPacks}</h2>
              <Link className={DashboardStyles.BlackLink} to="/FeladottCsomagok">Összes feladott csomag</Link>
              {createdPackages.map(pack => {
                return (
                  <ul key={pack.id} className={DashboardStyles.UlItems}>
                    <div className={DashboardStyles.Tabs}>
                      <li> <span>ID: </span><br></br> {pack.id}</li>
                      <li> <span>Kategória: </span><br></br> {pack.category}</li>
                      <li> <span>Súly: </span><br></br> {pack.packageWeight}</li>
                      <li> <span>Státusz: </span><br></br> {pack.status}</li>
                      <li> <span>Címzett: </span><br></br> {pack.receiverAddress}</li>
                      <li> <span>Feladva: </span><br></br> {pack.createdAt}</li>
                    </div>
                  </ul>
                )
              })}
            </>
          }


          {activeTab == "hasznosinfok" &&
            <>
              <h2>Hasznos infók</h2>
              <ul className={DashboardStyles.UlItems} >
                <div className={DashboardStyles.Tabs}>
                  <li>Figyelj hogy mindig pontos címet adj meg</li>
                  <li>Légy a címen a csomag felvételnél</li>
                  <li>Megfelelően csomagold be a küldeményt</li>
                  <li>Menj biztosra, ha lehet átvételkor használd a QR-kódos átvételt</li>
                  <li>Légy kedves a futárokkal</li>
                  <li>Légy türelmes</li>
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



          <div className={DashboardStyles.BottomSpace}></div>
          <div className={DashboardStyles.Positioning}>
            <div className={DashboardStyles.BottomTabs}>
              <div className={activeTab == "érkezőcsomagok" && DashboardStyles.ActiveTab} onClick={() => setActiveTab("érkezőcsomagok")}><h3>Érkező</h3></div>
              <div className={activeTab == "feladottcsomagok" && DashboardStyles.ActiveTab} onClick={() => setActiveTab("feladottcsomagok")}><h3>Feladott</h3></div>
              <div className={activeTab == "hasznosinfok" && DashboardStyles.ActiveTab} onClick={() => setActiveTab("hasznosinfok")}><h3>Hasznos</h3></div>
            </div>
          </div>

        </div>
      }
    </div>

  )

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }
}

export default UserDashboard