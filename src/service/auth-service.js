import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./firebaseconfig";
import { signOut } from "firebase/auth";
import { findUserByUid, loadAllUsers } from "./user-service";
import { findRunnerByUid, loadAllRunners } from "./runners-service";

const auth = getAuth(app);

export function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)

        .then((userCredential) => {

            const user = userCredential.user;
            return (

                loadAllUsers().then((users) => {
                    return loadAllRunners().then((runners) => {
                      let everybody = [...objectToArray(users), ...objectToArray(runners)];
                      console.log(findUserByUid(userCredential.user.uid, everybody));
                      return findUserByUid(userCredential.user.uid, everybody);
                      
                    })
                  })
            )   
        })
        .catch((error) => {
            return false;
        });
}

export function logout() {

    const auth = getAuth();
    return signOut(auth).then(() => {
        return false;
    }).catch((error) => {
        return true;
    });
}

export function objectToArray(o){
    let tomb = [];
    Object.keys(o).forEach(k => tomb.push(o[k]));
    return tomb
  }
// objectben eltároljuk, h milyen útvonalra milyen jogosultság kell. kulcs útvonal, hozzárendelve egy tömb, ami tartalmazza a megszorítást. ha a tömb üres, mindenki eléri, ha nem üres, akkor csak a benne szerepllők érik else.
// authguargdan  - amikor nézzük, h be van-e lépve vagy setTimeout, azt is megnézzük, hogy a user a roleja alapján a megtekinteni szándékozott oldalhoz van-e hozzáférése.
// A route alapján tudjuk, hogy melyik kulcsot kell nézni a permissionsben, a usercontext alapján, hogy mit kell keresni.

