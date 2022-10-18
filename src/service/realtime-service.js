import { getDatabase, ref, set,  onValue } from 'firebase/database';
import { app } from './firebaseconfig'
import { generateDate } from './package-service';

export function realTimeListPackages () {
    let db = getDatabase(app)
    let pathRef = ref(db, "Csomagok")
    let packagesArray = [];
    onValue(pathRef, csomagok => {
        csomagok.forEach((pack) => {
            const key = pack.key;
            const values = pack.val()
            packagesArray.push({id: key, ...values})
        })
        console.log(packagesArray)
    })
    return packagesArray
}

export function realTimePairing (currentPackage, runnerName) {
    let pickupTime = generateDate()

    let db = getDatabase(app);

    // Csomagoknál fetch
    let packagePathRef = ref(db, `Csomagok/${currentPackage.id}`);
    let packageUpdateData = {
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
    };

    // futároknál fetch 
    let runnerPathRef = ref(db, `Futarok/${runnerName}/packages/${currentPackage.id}`);
    let runnerUpdateData = {
        packageId: currentPackage.id
    }

    // user fetch
    let userPathRef = ref(db, `Felhasznalok/${currentPackage.user}/packages/${currentPackage.id}`)
    let userUpdateData = {
            category: currentPackage.category,
            createdAt: currentPackage.createdAt,           
            receiverAddress: currentPackage.receiverAddress,    
            receiverCoordinates: currentPackage.receiverCoordinates,      
            senderAddress: currentPackage.senderAddress,
            senderCoordinates: currentPackage.senderCoordinates,
            runner: runnerName,
            status: "szállítás alatt",
            packageWeight: currentPackage.packageWeight,
            pickedUpAt: pickupTime,
    }


    set(packagePathRef, packageUpdateData);
    set(runnerPathRef, runnerUpdateData);
    set(userPathRef, userUpdateData);
}

export function realTimeRunnerGPS(userData, runnerCoordinates) {
    let db = getDatabase(app)

    let runnerPathRef = ref(db, `Futarok/${userData.userName}`)
    let updatedRunnerInfo = {
        address: userData.address,
        email: userData.email,
        name: userData.name,
        password: userData.password,
        phoneNumber: userData.phoneNumber,
        role: userData.role,
        status: userData.status,
        uid: userData.uid,
        userName: userData.userName,
        runnerCoordinates: runnerCoordinates
    }

    return set(runnerPathRef, updatedRunnerInfo);
} 
