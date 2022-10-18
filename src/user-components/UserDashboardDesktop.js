import React from 'react'
import { AuthContext } from '../components/AuthContext'
import { packagesSentByUser, userListPackages } from '../service/user-service'
import Styles from '../CSS-styles/DesktopDashboardStyle.module.css'
import { Link } from 'react-router-dom'


function UserDashboardDesktop() {

  let loginContext = React.useContext(AuthContext)
  const [incomingPackages, setIncomingPackages] = React.useState([])
  const [createdPackages, setCreatedPackages] = React.useState([])
  const [numOfPackIncoming, setNumOfPackIncoming] = React.useState(0)
  const [numOfSentPacks, setNumOfSentPacks] = React.useState(0)


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
        console.log(receiverPackagesArray)
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

  return (
    <div className={Styles.GridContainer}>
      <div className={Styles.HeaderAndBody}>
        <div className={Styles.HeaderSection}>
          <h1 className={Styles.Hello}>Hello {loginContext.userData.userName}!</h1>
          <p>RnnR - A közösségi csomagküldő alkalmazás, ahol bárki lehet futár vagy feladó</p>
        </div>
        <div className={Styles.Body}>

          <div className={Styles.SectionsAndInfo}>
            <div className={Styles.PackInfos}>

              <div className={Styles.SentPacks}>
                <div className={Styles.H2nLink}>
                  <h2>Aktív érkező csomagjaid: {numOfPackIncoming}</h2>
                  <Link className={Styles.BlackLink} to="/NekemCimzettCsomagok">Összes érkező csomag</Link>
                </div>
                <div className={Styles.LiDiv}>
                  <ul className={`${Styles.SentPUl} ${Styles.Bold}`}>
                    <li>ID:</li>
                    <li>Kategória:</li>
                    <li>Státusz:</li>
                    <li>Létrehozva:</li>
                  </ul>
                  {incomingPackages.map(packbelongstouser => {
                    return (
                      <ul className={Styles.SentPUl} key={packbelongstouser.id} >
                          <li> {packbelongstouser.id}</li>
                          <li> {packbelongstouser.category}</li>
                           {packbelongstouser.status == "várakozik" ? <li>Keresés folyamatban</li>: <li>{packbelongstouser.runner}</li>}
                          <li> {packbelongstouser.createdAt}</li>
                      </ul>)

                  })}
                </div>
              </div>

              <div className={Styles.SentPacks}>
                <div className={Styles.H2nLink}>
                  <h2>Feladott csomagok: {numOfSentPacks}</h2>
                  <Link className={Styles.BlackLink} to="/FeladottCsomagok">Összes feladott csomag</Link>
                </div>
                <div className={Styles.LiDiv}>
                  <ul className={`${Styles.SentPUl} ${Styles.Bold}`}>
                    <li>ID:</li>
                    <li>Kategória:</li>
                    <li>Státusz:</li>
                    <li>Létrehozva:</li>
                  </ul>
                  {createdPackages.map(pack => {
                    return (

                      <ul className={`${Styles.SentPUl} `} key={pack.id}>

                        <li> {pack.id}</li>
                        <li> {pack.category}</li>
                        <li>  {pack.status}</li>

                        <li> {pack.createdAt}</li>
                      </ul>

                    )
                  })}
                </div>
              </div>
            </div>

            <div className={Styles.Info}>
              <div className={Styles.Usefull}>
                <h2>Hasznos infók</h2>
                <ul  >
                  <div >
                    <li>Figyelj hogy mindig pontos címet adj meg</li>
                    <li>Légy a címen a csomag felvételnél</li>
                    <li>Megfelelően csomagold be a küldeményt</li>
                    <li>Menj biztosra, ha lehet átvételkor használd a QR-kódos átvételt</li>
                    <li>Légy kedves a futárokkal</li>
                    <li>Légy türelmes</li>
                  </div>
                </ul>
              </div>
              <div className={Styles.SideImg}>

              </div>
              <div className={Styles.Contact}>
                <h2>Kapcsolat</h2>
                <ul  >
                  <div >
                    <li><span>E-mail: </span>support@rnnr.hu</li>
                    <li> <span>Telefon: </span>+3611111111</li>
                    <li><span>Székház: </span>Budapest, random cím 1</li>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default UserDashboardDesktop