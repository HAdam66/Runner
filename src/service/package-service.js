import { geocoding } from "./map-service";
import { actualDatabaseURL } from "./database-url";

export function generateDate() {
    const unix_timestamp = Date.now();
    let date = new Date(unix_timestamp);
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let currentDate = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    return currentDate;
}

export function listPackages() {
    return fetch(`${actualDatabaseURL}/Csomagok.json`)
        .then(resp => resp.json())
        .then(data => {
            let packagesArray = [];
            Object.keys(data).forEach(packages => {
                // console.log(packages)
                packagesArray.push({ id: packages, ...data[packages] })
            })
            console.log(packagesArray)
            return packagesArray
        })

}


export function packageReg(packageToRegister, userName) {
    return geocoding(packageToRegister.senderAddress)
        .then((data) => {
            console.log("lat:" + data.results[0].geometry.location.lat());
            console.log("lng: " + data.results[0].geometry.location.lng());

            let senderCoordinates = {
                lat: data.results[0].geometry.location.lat(),
                lng: data.results[0].geometry.location.lng()
            }

            return geocoding(packageToRegister.receiverAddress)
                .then((data) => {
                    console.log("lat:" + data.results[0].geometry.location.lat());
                    console.log("lng: " + data.results[0].geometry.location.lng()); 

                    let receiverCoordinates = {
                        lat: data.results[0].geometry.location.lat(),
                        lng: data.results[0].geometry.location.lng()
                    }
                    fetch(`${actualDatabaseURL}/Csomagok.json`, {
                        method: "POST",
                        body: JSON.stringify({
                            status: packageToRegister.status,
                            category: packageToRegister.packageCategory,
                            createdAt: packageToRegister.createdAt,
                            senderAddress: packageToRegister.senderAddress,
                            receiverAddress: packageToRegister.receiverAddress,
                            user: userName,
                            senderCoordinates: senderCoordinates,
                            receiverCoordinates: receiverCoordinates,
                            packageWeight: packageToRegister.packageWeight + "g",
                            pickedUpAt: undefined,
                            arrivedAt: undefined
                        })
                    })
                        .then(resp => resp.json())
                        .then((createdPackage) => {
                            console.log("createdPackage(package-service) ", createdPackage)
                            return fetch(`${actualDatabaseURL}/Felhasznalok/${userName}/packages/${createdPackage.name}.json`, {
                                method: "PATCH",
                                body: JSON.stringify({
                                    status: packageToRegister.status,
                                    category: packageToRegister.packageCategory,
                                    createdAt: packageToRegister.createdAt,
                                    senderAddress: packageToRegister.senderAddress,
                                    receiverAddress: packageToRegister.receiverAddress,
                                    senderCoordinates: senderCoordinates,
                                    receiverCoordinates: receiverCoordinates,
                                    packageWeight: packageToRegister.packageWeight + "g",
                                    user: userName,
                                    pickedUpAt: undefined,
                                    arrivedAt: undefined
                                })
                            })
                                .then(resp => resp.json())
                        })
                }
                )
        })
        .then(() => {
            return true;
        })
        .catch((error) => {
            console.log("Hibára futottunk!");
            return false;
        });
}

export function packageEditDataDisplay(params) {
    console.log((`a komponensből átadott urlparam + ${JSON.stringify(params)}`))
    return fetch(`${actualDatabaseURL}/Csomagok/${params.packageId}.json`)
        .then(resp => resp.json())
}

export function packageEdit(modifiedPackage, packageId) {
    return geocoding(modifiedPackage.senderAddress)
        .then((data) => {
            console.log("lat:" + data.results[0].geometry.location.lat());
            console.log("lng: " + data.results[0].geometry.location.lng());

            let senderCoordinates = {
                lat: data.results[0].geometry.location.lat(),
                lng: data.results[0].geometry.location.lng()
            }

            return geocoding(modifiedPackage.receiverAddress)
                .then((data) => {
                    console.log("lat:" + data.results[0].geometry.location.lat());
                    console.log("lng: " + data.results[0].geometry.location.lng());

                    let receiverCoordinates = {
                        lat: data.results[0].geometry.location.lat(),
                        lng: data.results[0].geometry.location.lng()
                    }
                    fetch(`${actualDatabaseURL}/Csomagok/${packageId}.json`, {
                        method: "PATCH",
                        body: JSON.stringify({
                            status: modifiedPackage.status,
                            category: modifiedPackage.packageCategory,
                            createdAt: modifiedPackage.createdAt,
                            senderAddress: modifiedPackage.senderAddress,
                            receiverAddress: modifiedPackage.receiverAddress,
                            senderCoordinates: senderCoordinates,
                            receiverCoordinates: receiverCoordinates,
                            user: modifiedPackage.user,
                            runner: modifiedPackage.runner
                        })
                    })
                        .then(resp => resp.json())
                        .then((createdPackage) => {
                            console.log(receiverCoordinates)
                            console.log("createdPackage(package-service) ", createdPackage)
                            return fetch(`${actualDatabaseURL}/Felhasznalok/${createdPackage.user}/packages/${packageId}.json`, {
                                method: "PATCH",
                                body: JSON.stringify({
                                    status: createdPackage.status,
                                    category: createdPackage.category,
                                    createdAt: createdPackage.createdAt,
                                    senderAddress: createdPackage.senderAddress,
                                    receiverAddress: createdPackage.receiverAddress,
                                    senderCoordinates: createdPackage.senderCoordinates,
                                    receiverCoordinates: createdPackage.receiverCoordinates,
                                    runner: createdPackage.runner
                                })
                            })
                                .then(resp => resp.json())
                        })
                }
                )
        })
        .then(() => {
            return true;
        })
        .catch((error) => {
            console.log("Hibára futottunk!");
            return false;
        });
}

export function packageDel(currentPackage) {
    console.log(currentPackage)
    return fetch(`${actualDatabaseURL}/Csomagok/${currentPackage.id}.json`, {
        method: "DELETE"
    })
        .then(resp => resp.json())
        .then(() => {
            return fetch(`${actualDatabaseURL}/Felhasznalok/${currentPackage.user}/packages/${currentPackage.id}.json`, {
                method: "DELETE"
            })
                .then(resp => resp.json())
        })
        .then(() => {
            if (currentPackage.status != "várakozik") {
                return fetch(`${actualDatabaseURL}/Futarok/${currentPackage.runner}/packages/${currentPackage.id}.json`, {
                    method: "DELETE"
                })
                    .then(resp => resp.json())
            }
        })
        .then(() => {
            return true;
        })
        .catch((error) => {
            console.log("Hibára futottunk!");
            return false;
        });
}



export function packageRunnerPairing(runnerId, currentPackage) {

    let pickupTime = generateDate()

    return fetch(`${actualDatabaseURL}/Csomagok/${currentPackage.id}.json`, {
        method: "PATCH",
        body: JSON.stringify({
            status: "szállítás alatt",
            runner: runnerId,
            pickedUpAt: pickupTime
        }
        )
    })
        .then(resp => resp.json())
        .then(() => {
            return fetch(`${actualDatabaseURL}/Futarok/${runnerId}/packages/${currentPackage.id}.json`, {
                method: "PATCH",
                body: JSON.stringify({
                    packageId: currentPackage.id
                })
            })
                .then(resp => resp.json())
                .then(() => {
                    return fetch(`${actualDatabaseURL}/Felhasznalok/${currentPackage.user}/packages/${currentPackage.id}.json`, {
                        method: "PATCH",
                        body: JSON.stringify({

                            category: currentPackage.category,
                            createdAt: currentPackage.createdAt,
                            senderAddress: currentPackage.senderAddress,
                            receiverAddress: currentPackage.receiverAddress,
                            status: "szállítás alatt",
                            packageWeight: currentPackage.packageWeight,
                            runner: runnerId,
                            senderCoordinates: currentPackage.senderCoordinates,
                            receiverCoordinates: currentPackage.receiverCoordinates,
                            pickedUpAt: pickupTime
                        })
                    })
                })
                .then(resp => resp.json())
        })
        .then(() => {
            return true;
        })
        .catch((error) => {
            console.log("Hibára futottunk!");
            return false;
        });
}

export function packageShipped(currentPackage, runnerId) {
    let arriveTime = generateDate();

    return fetch(`${actualDatabaseURL}/Csomagok/${currentPackage.id}.json`, {
        method: "PATCH",
        body: JSON.stringify({
            status: "leadott",
            arrivedAt: arriveTime
        })
    })
        .then(resp => resp.json())
        .then(() => {
            return fetch(`${actualDatabaseURL}/Futarok/${runnerId}/packages/${currentPackage.id}.json`, {
                method: "DELETE"
            })
                .then(resp => resp.json())
                .then(() => {
                    return fetch(`${actualDatabaseURL}/Felhasznalok/${currentPackage.user}/packages/${currentPackage.id}.json`, {
                        method: "PATCH",
                        body: JSON.stringify({
                            status: "leadott",
                            id: currentPackage.id,
                            createdAt: currentPackage.createdAt,
                            pickedUpAt: currentPackage.pickedUpAt,
                            category: currentPackage.category,
                            receiverAddress: currentPackage.receiverAddress,
                            receiverCoordinates: currentPackage.receiverCoordinates,
                            senderCoordinates: currentPackage.senderCoordinates,
                            runner: currentPackage.runner,
                            senderAddress: currentPackage.senderAddress,
                            user: currentPackage.user,
                            arrivedAt: arriveTime
                        })
                    })
                        .then(resp => resp.json())
                })
        })
        .then((data) => {
            return data
        })
        .catch((error) => {
            console.log("Hibára futottunk!");
            return false;
        });
}

export function singlePackageLoading(packageId) {
    return fetch(`${actualDatabaseURL}/Csomagok/${packageId}.json`)
        .then(resp => resp.json());

}