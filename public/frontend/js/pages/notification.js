// importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js');

// firebase.initializeApp({
//     apiKey: "AIzaSyBKLxxar1jazOIv01qewFOMZPGETl5tlDk",
//     projectId: "localojo-d7ffd",
//     messagingSenderId: "89368547626",
//     appId: "1:89368547626:web:90582cca1c59696ac0ce53",
// });

// const messaging = firebase.messaging();
// messaging.setBackgroundMessageHandler(function({ data: { title, body, icon } }) {
//     return self.registration.showNotification(title, { body, icon });
// });
$(document).ready(() => {
    $('#sms1TestBtn').on('click', () => {
        let dialCode = $("#phone").intlTelInput("getSelectedCountryData").dialCode;
        let phoneNumber = $('#phone').val();
        if (phoneNumber.includes('+')) {
            phoneNumber = phoneNumber.replace(`+${dialCode}`, '');
        }
        socket.emit('test:SMS', { dialCode, phoneNumber, type: 1 });
        $('.smsTestBtns .btn').removeClass('active');
        $('#sms1TestBtn').addClass('active');
    });
    $('#sms2TestBtn').on('click', () => {
        let dialCode = $("#phone").intlTelInput("getSelectedCountryData").dialCode;
        let phoneNumber = $('#phone').val();
        if (phoneNumber.includes('+')) {
            phoneNumber = phoneNumber.replace(`+${dialCode}`, '');
        }
        socket.emit('test:SMS', { dialCode, phoneNumber, type: 2 });
        $('.smsTestBtns .btn').removeClass('active');
        $('#sms2TestBtn').addClass('active');
    });
    socket.on('test:SMS', data => {
        console.log(data);
    })
});