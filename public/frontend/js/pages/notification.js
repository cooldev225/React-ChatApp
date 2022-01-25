importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyBKLxxar1jazOIv01qewFOMZPGETl5tlDk",
    projectId: "localojo-d7ffd",
    messagingSenderId: "89368547626",
    appId: "1:89368547626:web:90582cca1c59696ac0ce53",
});

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function({ data: { title, body, icon } }) {
    return self.registration.showNotification(title, { body, icon });
});