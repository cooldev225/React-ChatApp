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
    
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700,800&amp;display=swap"
        rel="stylesheet">
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
    {{-- <link rel="stylesheet" type="text/css" href="/frontend/css/normalize.css"> --}}
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.16/css/intlTelInput.css">
    {{-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/6.4.1/css/intlTelInput.css"> --}}
    <link rel="stylesheet" type="text/css" href="/frontend/css/custom.css">
    <link rel="stylesheet" type="text/css" href="/frontend/css/star.css">
    <link rel="stylesheet" type="text/css" href="/frontend/css/pages/message.css">
</head>

<body class="sidebar-active">
    {{-- <script src="/chat/js/jquery-3.3.1.min.js"></script> --}}
    <script src="https://code.jquery.com/jquery-latest.min.js"></script>

    <script src="/frontend/js/pages/fabric.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.2.0/socket.io.js"
    integrity="sha512-WL6WGKMPBiM9PnHRYIn5YEtq0Z8XP4fkVb4qy7PP4vhmYQErJ/dySyXuFIMDf1eEYCXCrQrMJfkNwKc9gsjTjA=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
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
    
    <script src="https://www.jquery-az.com/boots/js/bootstrap-colorpicker/bootstrap-colorpicker.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.16/js/intlTelInput.min.js"></script>
    <script src="/chat/js/script.js"></script>
    
     {{-- emojis --}}
     <script src="https://cdn.jsdelivr.net/npm/emoji-button@0.6.0/dist/index.min.js"></script>
  </body>


</html>
