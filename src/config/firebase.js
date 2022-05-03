import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBj2E_SNMcCXuBJBdvHxFc8sE7t5SNHDEg",
    authDomain: "onlytrakteer.firebaseapp.com",
    projectId: "onlytrakteer",
    storageBucket: "onlytrakteer.appspot.com",
    messagingSenderId: "1090837879025",
    appId: "1:1090837879025:web:d090d78566d08951a23150",
    measurementId: "G-VZY05M7B9N"
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp