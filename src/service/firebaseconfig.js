import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAtpNYrFGc_Oy15-rk2qtnLmzwUZ7vHc1I",
    authDomain: "rnnr-d9bce.firebaseapp.com",
    projectId: "rnnr-d9bce",
    databaseURL: "https://rnnr-d9bce-default-rtdb.europe-west1.firebasedatabase.app/",
    storageBucket: "rnnr-d9bce.appspot.com",
    messagingSenderId: "102781305985",
    appId: "1:102781305985:web:b711d0a5c310c49440b980"
};

export const app = initializeApp(firebaseConfig);