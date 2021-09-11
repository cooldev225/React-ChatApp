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

    <link rel="icon" href="/public/chat/images/favicon/favicon.png" type="image/x-icon">
    <link rel="shortcut icon" href="/public/chat/images/favicon/favicon.png" type="image/x-icon">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700,800&amp;display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,500,600&amp;display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Rubik:300,300i,400,400i,500,500i,700,700i,900,900i&amp;display=swap" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="/public/chat/css/date-picker.css">
    <link rel="stylesheet" type="text/css" href="/public/chat/css/magnific-popup.css">
    <link rel="stylesheet" type="text/css" href="/public/chat/css/style.css" media="screen" id="color">
    <link rel="stylesheet" type="text/css" href="/public/chat/css/tour.css">
    <link rel="stylesheet" type="text/css" href="/public/chat/js/ckeditor/skins/moono-lisa/editor.css?t=HBDD">
    <link rel="stylesheet" type="text/css" href="/public/chat/js/ckeditor/plugins/scayt/skins/moono-lisa/scayt.css">
    <link rel="stylesheet" type="text/css" href="/public/chat/js/ckeditor/plugins/scayt/dialogs/dialog.css">
    <link rel="stylesheet" type="text/css" href="/public/chat/js/ckeditor/plugins/tableselection/styles/tableselection.css">
    <link rel="stylesheet" type="text/css" href="/public/chat/js/ckeditor/plugins/wsc/skins/moono-lisa/wsc.css">
    <link rel="stylesheet" type="text/css" href="/public/chat/js/ckeditor/plugins/copyformatting/styles/copyformatting.css">
  </head>
  <body class="sidebar-active">
    @yield('content')
    <script src="/public/chat/js/jquery-3.3.1.min.js"></script>
    <script src="/public/chat/js/owl.carousel.js"></script>
    <script src="/public/chat/js/popper.min.js"></script>
    <script src="/public/chat/js/tippy-bundle.iife.min.js"></script>
    <script src="/public/chat/js/bootstrap.bundle.js"></script>
    <script src="/public/chat/js/switchery.js"></script>
    <script src="/public/chat/js/easytimer.min.js">        </script>
    <script src="/public/chat/js/index.js">        </script>
    <script src="/public/chat/js/feather-icon/feather.min.js"></script>
    <script src="/public/chat/js/feather-icon/feather-icon.js"></script>
    <script src="/public/chat/js/ckeditor/ckeditor.js"></script>
    <script src="/public/chat/js/ckeditor/styles.js"></script>
    <script src="/public/chat/js/ckeditor/adapters/jquery.js"></script>
    <script src="/public/chat/js/ckeditor/ckeditor.custom.js"></script>
    <script src="/public/chat/js/date-picker/datepicker.js"></script>
    <script src="/public/chat/js/date-picker/datepicker.en.js"></script>
    <script src="/public/chat/js/date-picker/datepicker.custom.js"></script>
    <script src="/public/chat/js/tour/intro.js"></script>
    <script src="/public/chat/js/tour/intro-init.js"></script>
    <script src="/public/chat/js/jquery.magnific-popup.js"></script>
    <script src="/public/chat/js/zoom-gallery.js"></script>
    <script src="/public/chat/js/script.js"></script>
  </body>
</html>