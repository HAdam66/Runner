import React from 'react'
import { Link } from 'react-router-dom'
import { runnerListing } from '../service/runners-service'
import DashboardStyles from '../CSS-styles/DashboardStyles.module.css'



function SaRunnerListing() {

const [runnerList, setRunnerList] = React.useState([]);

    React.useEffect(() => {
        runnerListing()
        .then(runnerArray => setRunnerList(runnerArray))
    }, []

    )

    return (
        <div className={DashboardStyles.Container}>
            <h1 className={DashboardStyles.Heading}>Futárlistázás</h1>
            {/* <div className={DashboardStyles.Tabs}> */}
            <div className={DashboardStyles.CardContainer}>
           {runnerList.length > 0 && runnerList.map (runner => {
            console.log(runner)
            return(
                <ul key={runner.email} className={DashboardStyles.UlItems}>
                        <div className={DashboardStyles.Tabs}>
                            <li> <span>ID: </span><br></br> {runner.userName}</li>
                            <li> <span>Név: </span><br></br> {runner.name}</li>
                            <li> <span>Felhasználónév: </span><br></br> {runner.userName}</li>
                            <li> <span>Cím: </span><br></br> {runner.address}</li>
                            <li> <span>Telefonszám: </span><br></br> {runner.phoneNumber}</li>
                            <li> <span>E-mail: </span><br></br> {runner.email}</li>
                            <li> <span>Jelszó: </span><br></br> {runner.password}</li>

                            {/* <h3>ID: {runner.userName}</h3>
                            <li>Név: {runner.name}</li>
                            <li>Felhasználónév: {runner.userName}</li>
                            <li>Cím: {runner.address}</li>
                            <li>Telefonszám: {runner.phoneNumber}</li>
                            <li>E-mail: {runner.email}</li>
                            <li>Jelszó: {runner.password}</li> */}

                            <Link to={`/SaFutarSzerkesztes/${runner.userName}`}>Futár szerkesztése</Link>
                            <Link to={`/SaFutarTorles/${runner.userName}`}>Futár törlése</Link>
                        </div>
                    </ul>
            )
           })}
           </div>
        </div>
        )
}

export default SaRunnerListing