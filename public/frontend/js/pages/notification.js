$(document).ready(() => {

    import { initializeApp } from 'firebase/app';
    import { getMessaging, getToken } from 'firebase/messaging';
    const firebaseConfig = {
        apiKey: "AIzaSyBKLxxar1jazOIv01qewFOMZPGETl5tlDk",
        authDomain: "localojo-d7ffd.firebaseapp.com",
        projectId: "localojo-d7ffd",
        storageBucket: "localojo-d7ffd.appspot.com",
        messagingSenderId: "89368547626",
        appId: "1:89368547626:web:90582cca1c59696ac0ce53",
        measurementId: "G-EQ2LGCPEX7"
    };
    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging();
    getToken(messaging, { vapidKey: 'BAPTMxyIAwCC-sQr90poTZSJNHkkziaMmrnEr9dM17zvKUds07IDDaCu9Wsil4XFNHhSeKeD0nB4WkWgwkg-_Ds' }).then((currentToken) => {
        if (currentToken) {
            console.log('currentToken: ', currentToken)
        } else {
            console.log('No registration token available. Request permission to generate one.');
        }
    }).catch((error) => {
        console.log("An Error occured while retrieving token. ", error);
    });
});