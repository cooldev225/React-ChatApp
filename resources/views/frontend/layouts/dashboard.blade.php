<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=0,minimal-ui">
  <meta name="description" content="Chit,Chat">
  <meta name="keywords" content="Chit,Chat">
  <meta name="author" content="DongLong Cui">

  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>{{ config('app.name', 'Laravel') }}</title>

  <link rel="icon" href="/chat/images/favicon/favicon.png" type="image/x-icon">
  <link rel="shortcut icon" href="/chat/images/favicon/favicon.png" type="image/x-icon">
  {{--
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"> --}}
  {{--
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-colorpicker@3.4.0/dist/js/bootstrap-colorpicker.min.js"
    rel="stylesheet"> --}}
  <link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700,800&amp;display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Roboto:400,500,600&amp;display=swap" rel="stylesheet">
  <link
    href="https://fonts.googleapis.com/css?family=Rubik:300,300i,400,400i,500,500i,700,700i,900,900i&amp;display=swap"
    rel="stylesheet">

  <link href="https://www.jquery-az.com/boots/css/bootstrap-colorpicker/bootstrap-colorpicker.css" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="/chat/css/date-picker.css">
  <link rel="stylesheet" type="text/css" href="/chat/css/magnific-popup.css">
  <link rel="stylesheet" type="text/css" href="/chat/css/style.css" media="screen" id="color">
  <link rel="stylesheet" type="text/css" href="/chat/css/tour.css">
  <link rel="stylesheet" type="text/css" href="/chat/js/ckeditor/skins/moono-lisa/editor.css?t=HBDD">
  <link rel="stylesheet" type="text/css" href="/chat/js/ckeditor/plugins/scayt/skins/moono-lisa/scayt.css">
  <link rel="stylesheet" type="text/css" href="/chat/js/ckeditor/plugins/scayt/dialogs/dialog.css">
  <link rel="stylesheet" type="text/css" href="/chat/js/ckeditor/plugins/tableselection/styles/tableselection.css">
  <link rel="stylesheet" type="text/css" href="/chat/js/ckeditor/plugins/wsc/skins/moono-lisa/wsc.css">
  <link rel="stylesheet" type="text/css" href="/chat/js/ckeditor/plugins/copyformatting/styles/copyformatting.css">
  {{--
  <link rel="stylesheet" type="text/css" href="/frontend/css/normalize.css"> --}}
  <link rel="stylesheet" type="text/css" href="/frontend/css/custom.css">
  <link rel="stylesheet" type="text/css" href="/frontend/css/star.css">
</head>

<body class="sidebar-active">
  <script src="/chat/js/jquery-3.3.1.min.js"></script>

  {{-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous">
  </script> --}}

  <script src="/frontend/js/pages/fabric.js"></script>
  <script src="/frontend/js/constant.js"></script>

  @yield('content')
  <script src="/chat/js/owl.carousel.js"></script>
  <script src="/chat/js/popper.min.js"></script>
  <script src="/chat/js/tippy-bundle.iife.min.js"></script>
  <script src="/chat/js/bootstrap.bundle.js"></script>
  <script src="/chat/js/switchery.js"></script>
  <script src="/chat/js/easytimer.min.js"> </script>
  <script src="/chat/js/index.js"> </script>
  <script src="/chat/js/feather-icon/feather.min.js"></script>
  <script src="/chat/js/feather-icon/feather-icon.js"></script>
  <script src="/chat/js/ckeditor/ckeditor.js"></script>
  <script src="/chat/js/ckeditor/styles.js"></script>
  <script src="/chat/js/ckeditor/adapters/jquery.js"></script>
  <script src="/chat/js/ckeditor/ckeditor.custom.js"></script>
  <script src="/chat/js/date-picker/datepicker.js"></script>
  <script src="/chat/js/date-picker/datepicker.en.js"></script>
  <script src="/chat/js/date-picker/datepicker.custom.js"></script>
  <script src="/chat/js/tour/intro.js"></script>
  <script src="/chat/js/tour/intro-init.js"></script>
  <script src="/chat/js/jquery.magnific-popup.js"></script>
  <script src="/chat/js/zoom-gallery.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.2.0/socket.io.js"
    integrity="sha512-WL6WGKMPBiM9PnHRYIn5YEtq0Z8XP4fkVb4qy7PP4vhmYQErJ/dySyXuFIMDf1eEYCXCrQrMJfkNwKc9gsjTjA=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="https://www.jquery-az.com/boots/js/bootstrap-colorpicker/bootstrap-colorpicker.js"></script>
  <script src="/chat/js/script.js"></script>
</body>
<script type="module">
  // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";
    import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging.js";
    import { onBackgroundMessage } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-sw.js";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
  
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyCtUMVxCkTF2UNRzFtAfJQEqSzPn6Q4r9E",
      authDomain: "ojochat-d1140.firebaseapp.com",
      projectId: "ojochat-d1140",
      storageBucket: "ojochat-d1140.appspot.com",
      messagingSenderId: "770960315589",
      appId: "1:770960315589:web:6bdfd75181192b30c24cac",
      measurementId: "G-KE3GZR108J"
    };
  
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const messaging = getMessaging();
    // Add the public key generated from the console here.
    getToken(messaging, { vapidKey: 'BHdq142w8AuKvJe_QC8-emy54z0S1oklfs_xFr7b1HFP0gQRdWs5k1s5I6DScHw6aVgVTVOHVcTAeE0vk0p_XJg' }).then((currentToken) => {
      if (currentToken) {
        // Send the token to your server and update the UI if necessary
        // ...
        console.log('------------');
        console.log(currentToken);
        console.log('------------');
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // ...
    });
    let APILINK = "http://localhost:8000";
    self.addEventListener('push', async function(event) {
      console.log(event);
      event.waitUntil(fetch(APILINK)).then(function(response) {
        return response.json().then(function(data) {
          console.log(data);
          var title = data.title;
          var body = data.message;
          var icon = data.image;
          var tag = 'temp-tag';
          var urlOpen = data.URL;
          return self.registration.showNotification(title, {
            body, icon, tag
          })
        });
      })
    });
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
    });
    
</script>

</html>