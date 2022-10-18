import React from "react";
import Navigation from "./Navigation";
import { Outlet } from 'react-router-dom'
import { AuthContext } from "./components/AuthContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./service/firebaseconfig";
import { loadAllUsers, findUserByUid } from "./service/user-service";
import { loadAllRunners } from "./service/runners-service";
import { objectToArray } from "./service/auth-service";
import "./overall.css";
import Footer from "./components/Footer/Footer";
import NavbarDesktop from "./NavbarDesktop";
import Register from './CSS-styles/Register.module.css';
import { realTimeRunnerGPS } from "./service/realtime-service";

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}

function App() {
  
  const [deliveryData, setDeliveryData] = React.useState(null)
  const [userData, setUserData] = React.useState(null);
  const [windowSize, setWindowSize] = React.useState(getWindowSize());
  
  React.useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        
        loadAllUsers().then((users) => {
          loadAllRunners().then((runners) => {
            let everybody = [...objectToArray(users), ...objectToArray(runners)];
            let currentUser = findUserByUid(uid, everybody)
            console.log(currentUser)
            if (currentUser != undefined) {
              if (currentUser.role == "runner") {
                navigator.geolocation.getCurrentPosition(function (position) {
                  let runnerCoordinates = new window.google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                  if (runnerCoordinates != null) {
                    let runnerCoord = {
                      lat: position.coords.latitude,
                      lng: position.coords.longitude,
                    }
                    realTimeRunnerGPS(currentUser, runnerCoord).then(() => {
                      setUserData({...currentUser, runnerCoordinates: runnerCoord})
                    })                    
                  }
                });
              } else if (currentUser.role == "user" || currentUser.role == "superadmin") {
                setUserData(findUserByUid(uid, everybody));
              }
            }
                
          })
        })
        
      } else if (!user) {
        setUserData(null);
      }
    })
  }, []);

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
    <div >
      <AuthContext.Provider value={{ userData, setUserData, deliveryData, setDeliveryData }}>  
      {windowSize.innerWidth >= 1024 ? <NavbarDesktop />
      :
        <Navigation />
      }
        <section className={`${"main"} ${Register.RegisterMain}`}>
          <Outlet />
        </section>
        <Footer/>
      </AuthContext.Provider>
    </div>
  );
  
}

// A value-ban nem csak annit tárolunk, h be van-e lépve, hanem minden user adatot, amit a firebase-ben tárolunk. 
// Innen jön a resolvePath.

export default App;
