import React from 'react'
import { AuthContext } from '../components/AuthContext'
import { userListPackages } from '../service/user-service'
import DashboardStyles from '../CSS-styles/DashboardStyles.module.css'

function UserAsReceiverPackageList() {
    const [receiverPackages, setReceiverPackages] = React.useState([])
    let loginContext = React.useContext(AuthContext)
    console.log(receiverPackages)
    React.useEffect(() => {
        userListPackages(loginContext.userData.address)
            .then(data => {
                let receiverPackagesArray = []
                data.forEach(pack => {
                    console.log(pack)

                    if (pack.receiverAddress == loginContext.userData.address) {
                        receiverPackagesArray.push(pack)
                    } else {
                        console.log("no package belongs to u")
                    }
                })
                setReceiverPackages(receiverPackagesArray)
                console.log(receiverPackagesArray)
            })
    }, [])
    return (
        <>
            <div className={DashboardStyles.Content}>
                <div className={DashboardStyles.HeadingContainer}>
                    <h1 className={DashboardStyles.Heading}>Az érkező csomagjaid:</h1>
                </div>
                <div className={DashboardStyles.Container}>

                    {receiverPackages.length === 0
                        ?
                        null
                        :
                        receiverPackages.map(pack => {
                            return (
                                <ul key={pack.id} className={DashboardStyles.UlItems}>
                                    <div className={DashboardStyles.Tabs}>
                                        <li> <span>ID: </span><br></br> {pack.id}</li>
                                        <li> <span>Kategória: </span><br></br> {pack.category}</li>
                                        <li> <span>Súly: </span><br></br> {pack.packageWeight}</li>
                                        <li> <span>Státusz: </span><br></br> {pack.status}</li>
                                        {pack.status == "szállítás alatt" && <li><span>Futár: </span> <br></br> {pack.runner}</li>}
                                        <li> <span>Feladó címe: </span><br></br> {pack.senderAddress}</li>
                                        <li> <span>Címzett címe: </span><br></br> {pack.receiverAddress}</li>
                                        <li> <span>Feladó felhasználó: </span><br></br> {pack.user}</li>
                                        <li> <span>Feladva: </span><br></br> {pack.createdAt}</li>
                                    </div>
                                </ul>
                            )
                        })}

                </div>
            </div>
        </>
    )
}

export default UserAsReceiverPackageList