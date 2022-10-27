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