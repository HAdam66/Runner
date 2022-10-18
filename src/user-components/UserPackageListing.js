import React from 'react'
import { AuthContext } from '../components/AuthContext';
import { userListPackages, packagesSentByUser } from '../service/user-service'
import DashboardStyles from '../CSS-styles/DashboardStyles.module.css'

function UserPackageListing() {
    const [packages, setPackages] = React.useState([]);
    const [selected, setSelected] = React.useState("all");
    let loginContext = React.useContext(AuthContext)
    console.log("P A C K A G E S : ", packages);

    React.useEffect(() => {
        packagesSentByUser(loginContext.userData.userName)
            .then((incomingPackages) => {
                setPackages(incomingPackages);
            })

    }, [])


    return (

            <div className={DashboardStyles.Content}>
                <div className={DashboardStyles.InputOnly}>
                    <select className={DashboardStyles.DropDown} onChange={(e) => setSelected(e.target.value)}>
                        <option value="all">--válasszd ki a csomag státuszát--</option>
                        <option value="várakozik">Várakozik</option>
                        <option value="szállítás alatt">Szállítás alatt</option>
                        <option value="leadott">Leadott</option>
                    </select>

                </div>
                <div  className={DashboardStyles.HeadingContainer}>
                    <h1 className={DashboardStyles.Heading}>Csomagjaid:</h1>
                </div>
                <div className={DashboardStyles.Container}>


                    {packages.length === 0
                        ?
                        null
                        :
                        packages.map(userPackage => {
                            if (userPackage.status == selected) {
                                return (
                                    (<ul key={userPackage.id} className={DashboardStyles.UlItems}>
                                        <div className={DashboardStyles.Tabs}>
                                            <li> <span>ID: </span><br></br> {userPackage.id}</li>
                                            <li> <span>Kategória: </span><br></br> {userPackage.category}</li>
                                            <li> <span>Súly: </span><br></br> {userPackage.packageWeight}</li>
                                            <li> <span>Státusz: </span><br></br> {userPackage.status}</li>
                                            {userPackage.status == "szállítás alatt" && <li><span>Futár: </span> <br></br> {userPackage.runner}</li>}
                                            <li> <span>Feladó címe: </span><br></br> {userPackage.senderAddress}</li>
                                            <li> <span>Címzett címe: </span><br></br> {userPackage.receiverAddress}</li>
                                            <li> <span>Feladva: </span><br></br> {userPackage.createdAt}</li>
                                        </div>
                                    </ul>)
                                )
                            } else if (selected == "all") {
                                return (
                                    <ul key={userPackage.id} className={DashboardStyles.UlItems}>
                                        <div className={DashboardStyles.Tabs}>
                                            <li> <span>ID: </span><br></br> {userPackage.id}</li>
                                            <li> <span>Kategória: </span><br></br> {userPackage.category}</li>
                                            <li> <span>Súly: </span><br></br> {userPackage.packageWeight}</li>
                                            <li> <span>Státusz: </span><br></br> {userPackage.status}</li>
                                            <li> <span>Feladó címe: </span><br></br> {userPackage.senderAddress}</li>
                                            <li> <span>Címzett címe: </span><br></br> {userPackage.receiverAddress}</li>
                                            <li> <span>Feladva: </span><br></br> {userPackage.createdAt}</li>
                                        </div>
                                    </ul>
                                )
                            }
                        })}
                </div>
            </div>
       
    )
}

export default UserPackageListing