import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "./firebaseconfig";
import { generateDate } from "./package-service";
import { actualDatabaseURL } from "./database-url";


export function runnerListing () {
   return fetch(`${actualDatabaseURL}/Futarok.json`)
   .then(resp => resp.json())
    .then(runners => {
        let runnersArray = [];
        Object.keys(runners).forEach(runner => {
        runnersArray.push(runners[runner])
        })
    return runnersArray;
    })
}
export function adminRunnerReg(runnerDataObj){
    const auth = getAuth(app);
    return fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAtpNYrFGc_Oy15-rk2qtnLmzwUZ7vHc1I', {
        method: "POST",
        body: JSON.stringify({
            email: runnerDataObj.email, 
            password: runnerDataObj.password,
            returnSecureToken: true
        })
    })
    .then(resp => resp.json())
        .then((userCredential) => {
            console.log(userCredential)
            const user = userCredential.user;
            runnerDataObj.uid = userCredential.localId
            return fetch(`${actualDatabaseURL}/Futarok/${runnerDataObj.userName}.json`, {
                method: "PUT",
                body: JSON.stringify(runnerDataObj)
            })
        .then(() => runnerDataObj)
        })
        .then(() => {
            return true;
        })
        .catch((error) => {
            console.log("Hibára futottunk!");
            return false;
        });

}

export function runnerReg(runnerDataObj){
    const auth = getAuth(app);
    return createUserWithEmailAndPassword(auth, runnerDataObj.email, runnerDataObj.password)
        .then((userCredential) => {
            console.log(userCredential)
            const user = userCredential.user;
            runnerDataObj.uid = userCredential.user.uid
            return fetch(`${actualDatabaseURL}/Futarok/${runnerDataObj.userName}.json`, {
                method: "PUT",
                body: JSON.stringify(runnerDataObj)
            })
        .then(() => runnerDataObj)
        })
        .then(() => {
            return true;
        })
        .catch((error) => {
            console.log("Hibára futottunk!");
            return false;
        });

}

export function runnerEditDataDisplay (params) {
    console.log(`a komponensből átadott urlparam + ${JSON.stringify(params)}`)
    return fetch(`${actualDatabaseURL}/Futarok/${params.username}.json`)
    .then(resp => resp.json())
}    
    
export function runnerDel(runnerId){
    return fetch(`${actualDatabaseURL}/Futarok/${runnerId}.json`, {
        method: "DELETE"
    })
    .then(resp => resp.json())
}

export function runnerEdit(runnerData, params){
    console.log(runnerData)
    console.log(params)
    return fetch(`${actualDatabaseURL}/Futarok/${params}.json`, {
        method: "PATCH",
        body: JSON.stringify({
            name: runnerData.name,
            userName: runnerData.userName,
            address: runnerData.address,
            email: runnerData.email,
            password: runnerData.password,
            phoneNumber: runnerData.phoneNumber,
            status: runnerData.status,
            uid: runnerData.uid,
            role: "runner",
            packages: runnerData.packages,
        })
    })
    .then(resp => resp.json())
    .then(() => {
        console.log("RunnerEdit lefutott a runners-service-ben.")
        return true;
    })
    .catch((error) => {
        console.log("Hibára futottunk!");
        return false;
    });
}

export function loadAllRunners(){
    return fetch(`${actualDatabaseURL}/Futarok.json`)
    .then(resp => resp.json())
}

export function findRunnerByUid (uid, runners){
    let runnerKey = Object.keys(runners).find((key) => runners[key].uid == uid)
    console.log(runners[runnerKey]);
    return runners[runnerKey]
}

export function addressToCoordinates(receiverAddress, runnerCoordinates){
    let geocoder = new window.google.maps.Geocoder();
    let receiverCoordinates = {};

    return geocoder.geocode({
        address: receiverAddress
    }, (results, status) => {
        if (status == window.google.maps.GeocoderStatus.OK) {
            receiverCoordinates =  results[0].geometry.location;
            return true;
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    })
    .then((success) => {
        if(success){
            console.log(receiverCoordinates)
            console.log(runnerCoordinates)
            return coordinatesCompairing(receiverCoordinates, runnerCoordinates);
        }
    })
}

function coordinatesCompairing (receiverCoordinates, runnerCoordinates) {
    let comparison = window.google.maps.geometry.spherical.computeDistanceBetween(runnerCoordinates, receiverCoordinates)
    console.log(comparison);
        return comparison;
} 


export function arrayUpdate (originalArray, currentPackage) {
    console.log(originalArray)
    console.log(currentPackage)
    let index = originalArray.findIndex(object => {
        return object.id == currentPackage.id
    })

    console.log(index)

    let copyArray = [
        ...originalArray.slice(0, index),
        ...originalArray.slice(index + 1)
    ]
    console.log(copyArray)
    return copyArray
}

export function arrayGrowthUpdate (originalArray, currentPackage) {
    let copyArray = [
        ...originalArray, currentPackage
    ]
    console.log(copyArray)
    return copyArray

}

export function arrayDataChange (originalArray, currentPackage, runnerName) {
    let pickupTime = generateDate()
    let index = originalArray.findIndex(object => {
        return object.id == currentPackage.id
    })

    console.log(index)

    let copyArray = [
        ...originalArray.slice(0, index), {
            id: currentPackage.id,
            category: currentPackage.category,
            createdAt: currentPackage.createdAt,
            packageWeight: currentPackage.packageWeight,
            pickedUpAt: pickupTime,
            receiverAddress: currentPackage.receiverAddress,
            receiverCoordinates: currentPackage.receiverCoordinates,
            runner: runnerName,
            senderAddress: currentPackage.senderAddress,
            senderCoordinates: currentPackage.senderCoordinates,
            status: "leadott",
            user: currentPackage.user
        },
        ...originalArray.slice(index + 1)
    ]
    console.log(copyArray)
    return copyArray
}


export function arrayStatusToUnderDelivery (originalArray, currentPackage, runnerName) {
    let pickupTime = generateDate()
    let index = originalArray.findIndex(object => {
        return object.id == currentPackage.id
    })

    console.log(index)

    let copyArray = [
        ...originalArray.slice(0, index), {
            id: currentPackage.id,
            category: currentPackage.category,
            createdAt: currentPackage.createdAt,
            packageWeight: currentPackage.packageWeight,
            pickedUpAt: pickupTime,
            receiverAddress: currentPackage.receiverAddress,
            receiverCoordinates: currentPackage.receiverCoordinates,
            runner: runnerName,
            senderAddress: currentPackage.senderAddress,
            senderCoordinates: currentPackage.senderCoordinates,
            status: "szállítás alatt",
            user: currentPackage.user
        },
        ...originalArray.slice(index + 1)
    ]
    console.log(copyArray)
    return copyArray
}