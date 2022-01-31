@extends('frontend.layouts.dashboard')
@inject('dateFormat', 'App\Services\DateService')
@include('frontend.photoCreation')
@include('checkout')
@section('content')
    <style>
        .hide {
            display: none;
        }
        #loader {
            width: 20px;
            height: 20px;
            margin: auto;
            position: absolute;
            left: 50%;
            transform: translate(-50%, 92px);
            display: none;
        }
    </style>
    <script>
        var currentUserId = {{ Auth::id() }};
    </script>
    <div class="chitchat-loader">
        <div><img src="/chat/images/logo/logo_big.png" alt="" />
            <h3>Simple, secure messaging for fast connect to world..!</h3>
        </div>
    </div>
    <div class="chitchat-container sidebar-toggle">
        <nav class="main-nav on custom-scroll">
            <div class="logo-warpper">
                <div>
                    <img src="/chat/images/logo/logo.png" alt="logo" />
                </div>
                <a class="button-effect balance" href="payment-histories">
                    <div class="">
                        <span class="balance-amount">$0.00</span>
                    </div>
                </a>
            </div>
            <div class="sidebar-main">
                <ul class="sidebar-top">
                    <li>
                        <!-- <a class="button-effect" data-intro="Check Status here"> -->
                        <div class="user-popup status one selfProfileBtn">
                            <div>
                                <img class="bg-img"
                                    src="{{ !Auth::user()->avatar ? '/images/default-avatar.png' : 'v1/api/downloadFile?path=' . Auth::user()->avatar }}"
                                    alt="Avatar" />
                            </div>
                        </div>
                        <!-- </a> -->
                    </li>
                    <!-- <li><a class="icon-btn btn-light button-effect" href="favourite" data-tippy-content="Favourite"><i class="fa fa-star">               </i></a></li> -->

                    <li><a class="icon-btn btn-light button-effect" href="contact-list" data-tippy-content="Contact List">
                            <i class="fa fa-users"> </i></a></li>
                    <li>
                        <div class="dot-danger grow"><a class="icon-btn btn-light button-effect" href="notification"
                                data-tippy-content="Notification"> <i class="fa fa-bell"></i></a></div>
                    </li>
                    <li>
                        <div class="dot-danger grow photo-request-icon">
                            <a class="icon-btn btn-light button-effect" href="request" data-tippy-content="PhotoRequest"> <i
                                    class="fa fa-image"></i></a>
                        </div>
                    </li>
                    <li><a class="icon-btn btn-light button-effect" href="settings" data-tippy-content="Setting"> <i
                                class="fa fa-cog"></i></a></li>
                </ul>
                <ul class="sidebar-bottom">
                    <li><a class="icon-btn btn-light button-effect mode" href="#" data-tippy-content="Theme Mode"><i
                                class="fa fa-moon-o"></i></a></li>
                    <li><a class="icon-btn btn-light" id="logoutBtn" href="/logout" data-tippy-content=" SignOut"> <i
                                class="fa fa-power-off"> </i></a></li>
                </ul>
            </div>
        </nav>
        <aside class="chitchat-left-sidebar left-disp">
            <div class="recent-default dynemic-sidebar active">
                <div class="recent">
                    <div class="theme-title">
                        <div class="media">
                            <div>
                                <h2>Recent</h2>
                                <h4>Chat from your friends &#128536;</h4>
                            </div>
                            <div class="media-body"><a
                                    class="icon-btn btn-outline-light button-effect pull-right mobile-back" href="#"><i
                                        class="ti-angle-right"></i></a><a
                                    class="icon-btn btn-outline-light button-effect pull-right mainnav" href="#"><i
                                        class="ti-layout-grid2"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="recent-slider recent-chat owl-carousel owl-theme">
                        <div class="item">
                            <div class="recent-box">
                                <div class="dot-btn dot-danger grow"></div>
                                <div class="recent-profile"><img class="bg-img" src="/images/default-avatar.png"
                                        alt="Avatar" />
                                    <h6> John deo</h6>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="recent-box">
                                <div class="dot-btn dot-success grow"></div>
                                <div class="recent-profile online"><img class="bg-img"
                                        src="/chat/images/avtar/big/audiocall.jpg" alt="Avatar" />
                                    <h6> John </h6>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="recent-box">
                                <div class="dot-btn dot-warning grow"></div>
                                <div class="recent-profile"><img class="bg-img" src="/chat/images/avtar/2.jpg"
                                        alt="Avatar" />
                                    <h6> Jpny</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="chat custom-scroll">
                    <!-- <ul class="chat-cont-setting">
                                                                                                                                                                                                                                    <li> <a href="#" data-bs-toggle="modal" data-bs-target="#msgchatModal"><span>new chat</span>
                                                                                                                                                                                                                                        <div class="icon-btn btn-outline-primary button-effect btn-sm"><i data-feather="message-square"></i></div></a></li>
                                                                                                                                                                                                                                    <li><a href="#" data-bs-toggle="modal" data-bs-target="#msgcallModal"><span>new call</span>
                                                                                                                                                                                                                                        <div class="icon-btn btn-outline-success button-effect btn-sm"><i data-feather="phone"></i></div></a></li>
                                                                                                                                                                                                                                    <li><a href="#" data-bs-toggle="modal" data-bs-target="#exampleModalCenter"><span>new Contact</span>
                                                                                                                                                                                                                                        <div class="icon-btn btn-outline-danger button-effect btn-sm"><i data-feather="users"></i></div></a></li>
                                                                                                                                                                                                                                </ul> -->
                    <div class="theme-title">
                        <div class="media">
                            <div>
                                <h2>Chat</h2>
                                <h4>Start New Conversation</h4>
                            </div>
                            <div class="media-body text-end"> <a
                                    class="icon-btn btn-outline-light btn-sm search contact-search" href="#"> <i
                                        data-feather="search"></i></a>
                                <form class="form-inline search-form">
                                    <div class="form-group">
                                        <input class="form-control-plaintext new-chat-search" type="search"
                                            placeholder="Search.." />
                                        <div class="icon-close close-search"> </div>
                                    </div>
                                </form>
                                <!-- <a class="icon-btn btn-primary btn-fix chat-cont-toggle outside" href="#"><i data-feather="plus"></i></a> -->
                            </div>
                        </div>
                    </div>
                    <div class="theme-tab tab-sm chat-tabs">
                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item" data-to="chat-content"><a class="nav-link button-effect active"
                                    id="chat-tab" data-bs-toggle="tab" href="#chat" role="tab" aria-controls="chat"
                                    aria-selected="true"><i data-feather="message-square">
                                    </i>Chat</a></li>
                            <li class="nav-item" data-to="call-content"><a class="nav-link button-effect"
                                    id="call-tab" data-bs-toggle="tab" href="#call" role="tab" aria-controls="call"
                                    aria-selected="false"><i data-feather="phone"> </i>Call</a></li>
                            <li class="nav-item" data-to="contact-content"><a class="nav-link button-effect"
                                    id="contact-tab" data-bs-toggle="tab" href="#contact" role="tab" aria-controls="contact"
                                    aria-selected="false"> <i data-feather="users"> </i>Contact</a></li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="chat" role="tabpanel" aria-labelledby="chat-tab">
                                <div class="theme-tab">
                                    <div class="tab-content" id="myTabContent1">
                                        <div class="tab-pane fade show active" id="direct" role="tabpanel"
                                            aria-labelledby="direct-tab">
                                            <ul class="chat-main recent-chat-list chat-item-list">

                                            </ul>
                                        </div>
                                        <div class="tab-pane fade" id="group" role="tabpanel" aria-labelledby="group-tab">
                                            <div class="search2">
                                                <div>
                                                    <div class="input-group">
                                                        <div class="input-group-append"><span class="input-group-text"><i
                                                                    class="fa fa-search"></i></span></div>
                                                        <input class="form-control" type="text"
                                                            placeholder="Start Chat" />
                                                    </div>
                                                </div>
                                            </div>
                                            <ul class="group-main">

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="call" role="tabpanel" aria-labelledby="call-tab">
                                <div class="theme-tab tab-icon">
                                    <ul class="nav nav-tabs" id="contactTab" role="tablist">
                                        <li class="nav-item"><a class="nav-link active" id="con1-tab"
                                                data-bs-toggle="tab" href="#con1" role="tab" aria-controls="con1"
                                                aria-selected="true">All</a>
                                        </li>
                                        <li class="nav-item"><a class="nav-link" id="con3-tab"
                                                data-bs-toggle="tab" href="#con3" role="tab" aria-controls="con3"
                                                aria-selected="false"> <i data-feather="phone-incoming"></i></a></li>
                                        <li class="nav-item"><a class="nav-link" id="con4-tab"
                                                data-bs-toggle="tab" href="#con4" role="tab" aria-controls="con4"
                                                aria-selected="false"> <i data-feather="phone-outgoing"></i></a></li>
                                        <li class="nav-item"><a class="nav-link" id="con2-tab"
                                                data-bs-toggle="tab" href="#con2" role="tab" aria-controls="con2"
                                                aria-selected="false"> <i data-feather="phone-missed"></i></a></li>
                                    </ul>
                                    <div class="tab-content" id="contactTabContent">
                                        <div class="tab-pane fade show active" id="con1" role="tabpanel"
                                            aria-labelledby="con1-tab">
                                            <ul class="call-log-main">

                                            </ul>
                                        </div>
                                        <div class="tab-pane fade" id="con2" role="tabpanel" aria-labelledby="con2-tab">
                                            <ul class="call-log-main">

                                            </ul>
                                        </div>
                                        <div class="tab-pane fade" id="con3" role="tabpanel" aria-labelledby="con3-tab">
                                            <ul class="call-log-main">

                                            </ul>
                                        </div>
                                        <div class="tab-pane fade" id="con4" role="tabpanel" aria-labelledby="con4-tab">
                                            <ul class="call-log-main">

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                                <ul class="contact-log-main">
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="fevorite-tab dynemic-sidebar" id="payment-histories">
                <div class="theme-title">
                    <div class="media">
                        <div>
                            <h2>Transactions</h2>
                            <h4>Last Recent</h4>
                        </div>
                        <div class="media-body text-end"> <a class="icon-btn btn-outline-light btn-sm m-r-15 search"
                                href="#"> <i data-feather="search"></i></a>
                            <form class="form-inline search-form">
                                <div class="form-group">
                                    <input class="form-control-plaintext" type="search" placeholder="Search.." />
                                    <div class="icon-close close-search"></div>
                                </div>
                            </form>

                            <a class="icon-btn btn-outline-light btn-sm close-panel" href="#"><i data-feather="x"></i></a>
                        </div>
                    </div>
                </div>
                <ul class="chat-main history-list">

                </ul>
            </div>
            <div class="document-tab dynemic-sidebar" id="request">
                <div class="theme-title">
                    <div class="media">
                        <div>
                            <h2>Request</h2>
                            <h4>List of PhotoRequests</h4>
                        </div>
                        <div class="media-body text-end"> <a class="icon-btn btn-outline-light btn-sm m-r-15 search"
                                href="#"> <i data-feather="search"></i></a>
                            <form class="form-inline search-form">
                                <div class="form-group">
                                    <input class="form-control-plaintext" type="search" placeholder="Search.." />
                                    <div class="icon-close close-search"> </div>
                                </div>
                            </form><a class="icon-btn btn-outline-light btn-sm close-panel" href="#"><i
                                    data-feather="x"></i></a>
                        </div>
                    </div>
                </div>
                <ul class="chat-main request-list">

                </ul>
            </div>
            <div class="contact-list-tab dynemic-sidebar custom-scroll" id="contact-list">
                <div class="theme-title">
                    <div class="media">
                        <div>
                            <h2>Contact</h2>
                            <h4>Start talking now</h4>
                        </div>
                        <div class="media-body text-end"> <a class="icon-btn btn-outline-light btn-sm m-r-15 search"
                                href="#"> <i data-feather="search"></i></a>
                            <form class="form-inline search-form">
                                <div class="form-group">
                                    <input class="form-control-plaintext" type="search" placeholder="Search.." />
                                    <div class="icon-close close-search"> </div>
                                </div>
                            </form><a class="icon-btn btn-outline-light btn-sm m-r-15" href="#" data-bs-toggle="modal"
                                data-bs-target="#exampleModalCenter"><i data-feather="plus"> </i></a><a
                                class="icon-btn btn-outline-light btn-sm close-panel" href="#"><i data-feather="x"></i></a>
                        </div>
                    </div>
                </div>
                <ul class="chat-main chat-item-list">

                </ul>
            </div>
            <div class="notification-tab dynemic-sidebar custom-scroll" id="notification">
                <div class="theme-title">
                    <div class="media">
                        <div>
                            <h2>Notification</h2>
                            <h4>List of notification</h4>
                        </div>
                        <div class="media-body text-end"> <a class="icon-btn btn-outline-light btn-sm close-panel"
                                href="#"><i data-feather="x"></i></a></div>
                    </div>
                </div>
                <ul class="chat-main">

                </ul>
            </div>
            <div class="settings-tab dynemic-sidebar custom-scroll" id="settings">
                <div class="theme-title">
                    <div class="media">
                        <div>
                            <h2>Settings</h2>
                            <h4>Change your app setting.</h4>
                        </div>
                        <div class="media-body text-end">
                            <a class="icon-btn btn-outline-light btn-sm close-panel" href="#">
                                <i data-feather="x"></i>
                            </a>
                        </div>
                    </div>
                    <div class="profile-box">
                        <div class="media">
                            <div class="profile" style="position: relative">
                                <img class="bg-img" id="profileImage"
                                    src="{{ !Auth::user()->avatar ? '/images/default-avatar.png' : 'v1/api/downloadFile?path=' . Auth::user()->avatar }}"
                                    alt="Avatar" />
                                <input type="file" id="profileImageUploadBtn" />
                            </div>
                            <div class="details">
                                <h5 class="setting__profile--name">{{ Auth::user()->username }}</h5>
                                <h6 class="setting__profile--location">{{ Auth::user()->location }}</h6>
                                <h6 class="setting__profile--description">{{ Auth::user()->description }}</h6>
                            </div>
                            <div class="details edit">
                                <form class="form-radious form-sm">
                                    <div class="form-group mb-2">
                                        <input class="form-control username" type="text" name="username"
                                            value="{{ Auth::user()->username }}" placeholder="John Doe" />
                                    </div>
                                    <div class="form-group mb-2">
                                        <input class="form-control location" type="text" name="address"
                                            value="{{ Auth::user()->location }}" placeholder="Alabma, USA" />
                                    </div>
                                    <div class="form-group">
                                        <textarea class="form-control description" placeholder="Description"
                                            style="font-size: 12px;" row="5">{{ Auth::user()->description }}</textarea>
                                    </div>
                                </form>
                            </div>
                            <div class="media-body">
                                <a class="icon-btn btn-outline-light btn-sm pull-right edit-btn" href="#">
                                    <i data-feather="edit"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="setting-block">
                    <div class="block">
                        <div class="media">
                            <div class="media-body">
                                <h3>Account</h3>
                            </div>
                            <div class="media-right"><a class="icon-btn btn-outline-light btn-sm pull-right previous"
                                    href="#"> <i data-feather="chevron-left"> </i></a></div>
                        </div>
                        <div class="theme-according" id="accordion">
                            <div class="card">
                                <div class="card-header" id="headingSeven" role="heading" data-bs-toggle="collapse"
                                    data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                                    <a><i class="fa fa-angle-down"></i> Payment</a>
                                </div>
                                <div class="collapse" id="collapseSeven" aria-labelledby="headingSeven"
                                    data-parent="#accordion">
                                    <div class="card-body">
                                        <a class="p-0 font-primary button-effect balance" href="payment-histories"> Show
                                            History
                                        </a>
                                        <a class="p-0 font-primary" href="#"> Connect Payment </a>
                                        <div class="content">
                                            <div class="links">
                                                <div id="deposit-button"></div>
                                            </div>
                                        </div>
                                        <p> <b>Note :</b>You can deposit the balance of OJOChat or withdraw money.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-header" id="headingTwo" role="heading" data-bs-toggle="collapse"
                                    data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                    <a>Notification<i class="fa fa-angle-down"></i></a>
                                </div>
                                <div class="collapse show" id="collapseTwo" aria-labelledby="headingTwo"
                                    data-parent="#accordion">
                                    <div class="card-body">
                                        <div class="media">
                                            <div class="media-body">
                                                <h5>Show notification</h5>
                                            </div>
                                            <div class="media-right">
                                                <input class="js-switch8" type="checkbox" />
                                            </div>
                                        </div>
                                        <p> <b>Note : </b>turn on this setting to recive notification when you get message.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-header" id="headingOne" role="heading" data-bs-toggle="collapse"
                                    data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                    <a>Privacy<i class="fa fa-angle-down"></i></a>
                                </div>
                                <div class="collapse" id="collapseOne" aria-labelledby="headingOne"
                                    data-parent="#accordion">
                                    <div class="card-body">
                                        <ul class="privacy">
                                            <li>
                                                <h5>Last seen</h5>
                                                <input class="js-switch10" type="checkbox" checked="" />
                                                <p> <b>Note : </b>turn on this setting to whether your contact can see last
                                                    seen or not.</p>
                                            </li>
                                            <li>
                                                <h5>Profile Photo</h5>
                                                <input class="js-switch11" type="checkbox" />
                                                <p>
                                                    turn on this setting to whether your contact can see your profile or
                                                    not.</p>
                                            </li>
                                            <li>
                                                <h5>About</h5>
                                                <input class="js-switch12" type="checkbox" />
                                                <p> <b>Note : </b>turn on this setting to whether your contact can see about
                                                    status or not.</p>
                                            </li>
                                            <li>
                                                <h5>Status</h5>
                                                <input class="js-switch14" type="checkbox" />
                                                <p> <b>Note : </b>turn on this setting to whether your contact can see your
                                                    status or not. </p>
                                            </li>
                                            <li>
                                                <h5>Read receipts</h5>
                                                <input class="js-switch16" type="checkbox" />
                                                <p> <b>Note : </b>If turn off this option you won't be able to see read
                                                    recipts from contact. read receipts are always sent for group chats.
                                                </p>
                                            </li>
                                            <li>
                                                <h5>Groups</h5>
                                                <input class="js-switch13" type="checkbox" checked="" />
                                                <p> <b>Note : </b>turn on this setting to whether your contact can add in
                                                    groups or not. </p>
                                            </li>
                                            <li>
                                                <h5>Screen Lock(Require Touch ID)</h5>
                                                <input class="js-switch17" type="checkbox" />
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-header" id="headingThree" role="heading" data-bs-toggle="collapse"
                                    data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    <a>Two Step verification<i class="fa fa-angle-down"></i></a>
                                </div>
                                <div class="collapse" id="collapseThree" aria-labelledby="headingThree"
                                    data-parent="#accordion">
                                    <div class="card-body">
                                        <div class="media">
                                            <div class="media-body">
                                                <h5>Enable</h5>
                                            </div>
                                            <div class="media-right">
                                                <input class="js-switch9" type="checkbox" />
                                            </div>
                                        </div>
                                        <p> <b>Note : </b>For added security, enable two-step verifiation, which will
                                            require a PIN when registering your phone number with Ojochat again.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-header" id="headingFour" role="heading" data-bs-toggle="collapse"
                                    data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                    <a>Phone Number<i class="fa fa-angle-down"></i></a>
                                </div>
                                <div class="collapse" id="collapseFour" aria-labelledby="headingFour"
                                    data-parent="#accordion">
                                    <div class="card-body change-number phoneNumber">
                                        <h5>Input your phone number</h5>
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                {{-- <span class="input-group-text form-control m-0">+</span> --}}
                                                {{-- <input type="tel" id="mobile-number" placeholder="e.g. +1 702 123 4567"> --}}
                                                <input class="form-control" id="phone" type="tel">
                                                <span id="valid-msg" class="hide">✓ Valid</span>
                                                <span id="error-msg" class="hide">Invalid number</span>
                                                {{-- <select class="form-control" id="phone" name="phone">
                                                    <option>Select Counry</option>
                                                    <option value="93">Afghanistan +93</option>
                                                    <option value="358">Aland Islands +358</option>
                                                    <option value="355">Albania +355</option>
                                                    <option value="213">Algeria +213</option>
                                                    <option value="1684">American Samoa +1684</option>
                                                    <option value="376">Andorra +376</option>
                                                    <option value="244">Angola +244</option>
                                                    <option value="1264">Anguilla +1264</option>
                                                    <option value="672">Antarctica +672</option>
                                                    <option value="1268">Antigua and Barbuda +1268</option>
                                                    <option value="54">Argentina +54</option>
                                                    <option value="374">Armenia +374</option>
                                                    <option value="297">Aruba +297</option>
                                                    <option value="61">Australia +61</option>
                                                    <option value="43">Austria +43</option>
                                                    <option value="994">Azerbaijan +994</option>
                                                    <option value="1242">Bahamas +1242</option>
                                                    <option value="973">Bahrain +973</option>
                                                    <option value="880">Bangladesh +880</option>
                                                    <option value="1246">Barbados +1246</option>
                                                    <option value="375">Belarus +375</option>
                                                    <option value="32">Belgium +32</option>
                                                    <option value="501">Belize +501</option>
                                                    <option value="229">Benin +229</option>
                                                    <option value="1441">Bermuda +1441</option>
                                                    <option value="975">Bhutan +975</option>
                                                    <option value="591">Bolivia +591</option>
                                                    <option value="599">Bonaire, Sint Eustatius and Saba +599</option>
                                                    <option value="387">Bosnia and Herzegovina +387</option>
                                                    <option value="267">Botswana +267</option>
                                                    <option value="55">Bouvet Island +55</option>
                                                    <option value="55">Brazil +55</option>
                                                    <option value="246">British Indian Ocean Territory +246</option>
                                                    <option value="673">Brunei Darussalam +673</option>
                                                    <option value="359">Bulgaria +359</option>
                                                    <option value="226">Burkina Faso +226</option>
                                                    <option value="257">Burundi +257</option>
                                                    <option value="855">Cambodia +855</option>
                                                    <option value="237">Cameroon +237</option>
                                                    <option value="1">Canada +1</option>
                                                    <option value="238">Cape Verde +238</option>
                                                    <option value="1345">Cayman Islands +1345</option>
                                                    <option value="236">Central African Republic +236</option>
                                                    <option value="235">Chad +235</option>
                                                    <option value="56">Chile +56</option>
                                                    <option value="86">China +86</option>
                                                    <option value="61">Christmas Island +61</option>
                                                    <option value="672">Cocos (Keeling) Islands +672</option>
                                                    <option value="57">Colombia +57</option>
                                                    <option value="269">Comoros +269</option>
                                                    <option value="242">Congo +242</option>
                                                    <option value="242">Congo, Democratic Republic of the Congo +242
                                                    </option>
                                                    <option value="682">Cook Islands +682</option>
                                                    <option value="506">Costa Rica +506</option>
                                                    <option value="225">Cote D'Ivoire +225</option>
                                                    <option value="385">Croatia +385</option>
                                                    <option value="53">Cuba +53</option>
                                                    <option value="599">Curacao +599</option>
                                                    <option value="357">Cyprus +357</option>
                                                    <option value="420">Czech Republic +420</option>
                                                    <option value="45">Denmark +45</option>
                                                    <option value="253">Djibouti +253</option>
                                                    <option value="1767">Dominica +1767</option>
                                                    <option value="1809">Dominican Republic +1809</option>
                                                    <option value="593">Ecuador +593</option>
                                                    <option value="20">Egypt +20</option>
                                                    <option value="503">El Salvador +503</option>
                                                    <option value="240">Equatorial Guinea +240</option>
                                                    <option value="291">Eritrea +291</option>
                                                    <option value="372">Estonia +372</option>
                                                    <option value="251">Ethiopia +251</option>
                                                    <option value="500">Falkland Islands (Malvinas) +500</option>
                                                    <option value="298">Faroe Islands +298</option>
                                                    <option value="679">Fiji +679</option>
                                                    <option value="358">Finland +358</option>
                                                    <option value="33">France +33</option>
                                                    <option value="594">French Guiana +594</option>
                                                    <option value="689">French Polynesia +689</option>
                                                    <option value="262">French Southern Territories +262</option>
                                                    <option value="241">Gabon +241</option>
                                                    <option value="220">Gambia +220</option>
                                                    <option value="995">Georgia +995</option>
                                                    <option value="49">Germany +49</option>
                                                    <option value="233">Ghana +233</option>
                                                    <option value="350">Gibraltar +350</option>
                                                    <option value="30">Greece +30</option>
                                                    <option value="299">Greenland +299</option>
                                                    <option value="1473">Grenada +1473</option>
                                                    <option value="590">Guadeloupe +590</option>
                                                    <option value="1671">Guam +1671</option>
                                                    <option value="502">Guatemala +502</option>
                                                    <option value="44">Guernsey +44</option>
                                                    <option value="224">Guinea +224</option>
                                                    <option value="245">Guinea-Bissau +245</option>
                                                    <option value="592">Guyana +592</option>
                                                    <option value="509">Haiti +509</option>
                                                    <option value="0">Heard Island and Mcdonald Islands +0</option>
                                                    <option value="39">Holy See (Vatican City State) +39</option>
                                                    <option value="504">Honduras +504</option>
                                                    <option value="852">Hong Kong +852</option>
                                                    <option value="36">Hungary +36</option>
                                                    <option value="354">Iceland +354</option>
                                                    <option value="91">India +91</option>
                                                    <option value="62">Indonesia +62</option>
                                                    <option value="98">Iran, Islamic Republic of +98</option>
                                                    <option value="964">Iraq +964</option>
                                                    <option value="353">Ireland +353</option>
                                                    <option value="44">Isle of Man +44</option>
                                                    <option value="972">Israel +972</option>
                                                    <option value="39">Italy +39</option>
                                                    <option value="1876">Jamaica +1876</option>
                                                    <option value="81">Japan +81</option>
                                                    <option value="44">Jersey +44</option>
                                                    <option value="962">Jordan +962</option>
                                                    <option value="7">Kazakhstan +7</option>
                                                    <option value="254">Kenya +254</option>
                                                    <option value="686">Kiribati +686</option>
                                                    <option value="850">Korea, Democratic People's Republic of +850</option>
                                                    <option value="82">Korea, Republic of +82</option>
                                                    <option value="381">Kosovo +381</option>
                                                    <option value="965">Kuwait +965</option>
                                                    <option value="996">Kyrgyzstan +996</option>
                                                    <option value="856">Lao People's Democratic Republic +856</option>
                                                    <option value="371">Latvia +371</option>
                                                    <option value="961">Lebanon +961</option>
                                                    <option value="266">Lesotho +266</option>
                                                    <option value="231">Liberia +231</option>
                                                    <option value="218">Libyan Arab Jamahiriya +218</option>
                                                    <option value="423">Liechtenstein +423</option>
                                                    <option value="370">Lithuania +370</option>
                                                    <option value="352">Luxembourg +352</option>
                                                    <option value="853">Macao +853</option>
                                                    <option value="389">Macedonia, the Former Yugoslav Republic of +389
                                                    </option>
                                                    <option value="261">Madagascar +261</option>
                                                    <option value="265">Malawi +265</option>
                                                    <option value="60">Malaysia +60</option>
                                                    <option value="960">Maldives +960</option>
                                                    <option value="223">Mali +223</option>
                                                    <option value="356">Malta +356</option>
                                                    <option value="692">Marshall Islands +692</option>
                                                    <option value="596">Martinique +596</option>
                                                    <option value="222">Mauritania +222</option>
                                                    <option value="230">Mauritius +230</option>
                                                    <option value="269">Mayotte +269</option>
                                                    <option value="52">Mexico +52</option>
                                                    <option value="691">Micronesia, Federated States of +691</option>
                                                    <option value="373">Moldova, Republic of +373</option>
                                                    <option value="377">Monaco +377</option>
                                                    <option value="976">Mongolia +976</option>
                                                    <option value="382">Montenegro +382</option>
                                                    <option value="1664">Montserrat +1664</option>
                                                    <option value="212">Morocco +212</option>
                                                    <option value="258">Mozambique +258</option>
                                                    <option value="95">Myanmar +95</option>
                                                    <option value="264">Namibia +264</option>
                                                    <option value="674">Nauru +674</option>
                                                    <option value="977">Nepal +977</option>
                                                    <option value="31">Netherlands +31</option>
                                                    <option value="599">Netherlands Antilles +599</option>
                                                    <option value="687">New Caledonia +687</option>
                                                    <option value="64">New Zealand +64</option>
                                                    <option value="505">Nicaragua +505</option>
                                                    <option value="227">Niger +227</option>
                                                    <option value="234">Nigeria +234</option>
                                                    <option value="683">Niue +683</option>
                                                    <option value="672">Norfolk Island +672</option>
                                                    <option value="1670">Northern Mariana Islands +1670</option>
                                                    <option value="47">Norway +47</option>
                                                    <option value="968">Oman +968</option>
                                                    <option value="92">Pakistan +92</option>
                                                    <option value="680">Palau +680</option>
                                                    <option value="970">Palestinian Territory, Occupied +970</option>
                                                    <option value="507">Panama +507</option>
                                                    <option value="675">Papua New Guinea +675</option>
                                                    <option value="595">Paraguay +595</option>
                                                    <option value="51">Peru +51</option>
                                                    <option value="63">Philippines +63</option>
                                                    <option value="64">Pitcairn +64</option>
                                                    <option value="48">Poland +48</option>
                                                    <option value="351">Portugal +351</option>
                                                    <option value="1787">Puerto Rico +1787</option>
                                                    <option value="974">Qatar +974</option>
                                                    <option value="262">Reunion +262</option>
                                                    <option value="40">Romania +40</option>
                                                    <option value="70">Russian Federation +70</option>
                                                    <option value="250">Rwanda +250</option>
                                                    <option value="590">Saint Barthelemy +590</option>
                                                    <option value="290">Saint Helena +290</option>
                                                    <option value="1869">Saint Kitts and Nevis +1869</option>
                                                    <option value="1758">Saint Lucia +1758</option>
                                                    <option value="590">Saint Martin +590</option>
                                                    <option value="508">Saint Pierre and Miquelon +508</option>
                                                    <option value="1784">Saint Vincent and the Grenadines +1784</option>
                                                    <option value="684">Samoa +684</option>
                                                    <option value="378">San Marino +378</option>
                                                    <option value="239">Sao Tome and Principe +239</option>
                                                    <option value="966">Saudi Arabia +966</option>
                                                    <option value="221">Senegal +221</option>
                                                    <option value="381">Serbia +381</option>
                                                    <option value="381">Serbia and Montenegro +381</option>
                                                    <option value="248">Seychelles +248</option>
                                                    <option value="232">Sierra Leone +232</option>
                                                    <option value="65">Singapore +65</option>
                                                    <option value="1">Sint Maarten +1</option>
                                                    <option value="421">Slovakia +421</option>
                                                    <option value="386">Slovenia +386</option>
                                                    <option value="677">Solomon Islands +677</option>
                                                    <option value="252">Somalia +252</option>
                                                    <option value="27">South Africa +27</option>
                                                    <option value="500">South Georgia and the South Sandwich Islands +500
                                                    </option>
                                                    <option value="211">South Sudan +211</option>
                                                    <option value="34">Spain +34</option>
                                                    <option value="94">Sri Lanka +94</option>
                                                    <option value="249">Sudan +249</option>
                                                    <option value="597">Suriname +597</option>
                                                    <option value="47">Svalbard and Jan Mayen +47</option>
                                                    <option value="268">Swaziland +268</option>
                                                    <option value="46">Sweden +46</option>
                                                    <option value="41">Switzerland +41</option>
                                                    <option value="963">Syrian Arab Republic +963</option>
                                                    <option value="886">Taiwan, Province of China +886</option>
                                                    <option value="992">Tajikistan +992</option>
                                                    <option value="255">Tanzania, United Republic of +255</option>
                                                    <option value="66">Thailand +66</option>
                                                    <option value="670">Timor-Leste +670</option>
                                                    <option value="228">Togo +228</option>
                                                    <option value="690">Tokelau +690</option>
                                                    <option value="676">Tonga +676</option>
                                                    <option value="1868">Trinidad and Tobago +1868</option>
                                                    <option value="216">Tunisia +216</option>
                                                    <option value="90">Turkey +90</option>
                                                    <option value="7370">Turkmenistan +7370</option>
                                                    <option value="1649">Turks and Caicos Islands +1649</option>
                                                    <option value="688">Tuvalu +688</option>
                                                    <option value="256">Uganda +256</option>
                                                    <option value="380">Ukraine +380</option>
                                                    <option value="971">United Arab Emirates +971</option>
                                                    <option value="44">United Kingdom +44</option>
                                                    <option value="1">United States +1</option>
                                                    <option value="1">United States Minor Outlying Islands +1</option>
                                                    <option value="598">Uruguay +598</option>
                                                    <option value="998">Uzbekistan +998</option>
                                                    <option value="678">Vanuatu +678</option>
                                                    <option value="58">Venezuela +58</option>
                                                    <option value="84">Viet Nam +84</option>
                                                    <option value="1284">Virgin Islands, British +1284</option>
                                                    <option value="1340">Virgin Islands, U.s. +1340</option>
                                                    <option value="681">Wallis and Futuna +681</option>
                                                    <option value="212">Western Sahara +212</option>
                                                    <option value="967">Yemen +967</option>
                                                    <option value="260">Zambia +260</option>
                                                    <option value="263">Zimbabwe +263</option>
                                                </select> --}}
                                            </div>
                                            <!-- All countries -->
                                            {{-- <input class="form-control country-code" type="number" placeholder="1" /> --}}
                                            {{-- <input class="form-control realPhoneNumber" type="number"
                                                placeholder="1234567895" /> --}}
                                        </div>
                                        {{-- <h5>Your new country code & phone number</h5>
                                        <div class="input-group">
                                            <div class="input-group-prepend"><span
                                                    class="input-group-text form-control m-0">+</span></div>
                                            <input class="form-control country-code" type="number" placeholder="01" />
                                            <input class="form-control" type="number" placeholder="" />
                                        </div> --}}
                                        <div class="text-end"> <a
                                                class="btn btn-outline-primary button-effect btn-sm phoneNumberConfirmBtn"
                                                href="#">confirm</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-header" id="headingFive" role="heading" data-bs-toggle="collapse"
                                    data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                    <a>Request account info<i class="fa fa-angle-down"></i></a>
                                </div>
                                <div class="collapse" id="collapseFive" aria-labelledby="headingFive"
                                    data-parent="#accordion">
                                    <div class="card-body"><a class="p-0 req-info" id="demo" href="#"
                                            onclick="document.getElementById(&quot;demo&quot;).innerHTML = &quot;Request sent&quot;">Request
                                            Info </a>
                                        <p> <b>Note : </b>Create a report of your account information and settings, which
                                            you can access ot port to another app.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-header" id="headingSix" role="heading" data-bs-toggle="collapse"
                                    data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                                    <a>Delete My account<i class="fa fa-angle-down"></i></a>
                                </div>
                                <div class="collapse" id="collapseSix" aria-labelledby="headingSix"
                                    data-parent="#accordion">
                                    <div class="card-body"><a class="p-0 req-info font-danger" href="#">Delete
                                            Account </a>
                                        <p> <b>Note :</b>Deleting your account will delete your account info, profile photo,
                                            all groups & chat history.</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="media">
                        <div class="media-body">
                            <h3>Account</h3>
                            <h4>Update Your Account Details</h4>
                        </div>
                        <div class="media-right"> <a class="icon-btn btn-outline-light btn-sm pull-right next"
                                href="#"> <i data-feather="chevron-right"> </i></a></div>
                    </div>
                </div>
                <div class="setting-block">
                    <div class="block">
                        <div class="media">
                            <div class="media-body">
                                <h3>Chat</h3>
                            </div>
                            <div class="media-right"><a class="icon-btn btn-outline-light btn-sm pull-right previous"
                                    href="#"> <i data-feather="chevron-left"> </i></a></div>
                        </div>
                        <ul class="help">
                            <li>
                                <h5>Chat Backup</h5>
                                <ul class="switch-list">
                                    <li>
                                        <input class="js-switch5" type="checkbox" checked="" />
                                        <h5>Auto Backup</h5>
                                    </li>
                                    <li>
                                        <input class="js-switch6" type="checkbox" />
                                        <h5>Include document</h5>
                                    </li>
                                    <li>
                                        <input class="js-switch7" type="checkbox" />
                                        <h5>Include Videos</h5>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <h5>Chat wallpaper</h5>
                                <ul class="wallpaper">
                                    <li><img class="bg-img" src="/chat/images/wallpaper/2.jpg" alt="Avatar" /></li>
                                    <li><img class="bg-img" src="/chat/images/wallpaper/1.jpg" alt="Avatar" /></li>
                                    <li><img class="bg-img" src="/chat/images/wallpaper/3.jpg" alt="Avatar" /></li>
                                    <li><img class="bg-img" src="/chat/images/wallpaper/4.jpg" alt="Avatar" /></li>
                                    <li><img class="bg-img" src="/chat/images/wallpaper/5.jpg" alt="Avatar" /></li>
                                    <li><img class="bg-img" src="/chat/images/wallpaper/6.jpg" alt="Avatar" /></li>
                                </ul>
                            </li>
                            <li>
                                <h5> <a href="#">Archive all chat</a></h5>
                            </li>
                            <li>
                                <h5> <a href="#"> Clear all chats</a></h5>
                            </li>
                            <li>
                                <h5> <a class="font-danger" href="#">Delete all chats</a></h5>
                            </li>
                        </ul>
                    </div>
                    <div class="media">
                        <div class="media-body">
                            <h3>Chat</h3>
                            <h4>Control Your Chat Backup</h4>
                        </div>
                        <div class="media-right"> <a class="icon-btn btn-outline-light btn-sm pull-right next"
                                href="#"> <i data-feather="chevron-right"> </i></a></div>
                    </div>
                </div>
                <div class="setting-block">
                    <div class="block">
                        <div class="media">
                            <div class="media-body">
                                <h3>Integratin</h3>
                            </div>
                            <div class="media-right"> <a class="icon-btn btn-outline-light btn-sm pull-right previous"
                                    href="#"> <i data-feather="chevron-left"> </i></a></div>
                        </div>
                        <ul class="integratin">
                            <li>
                                <div class="media">
                                    <div class="media-left"> <a class="fb"
                                            href="https://www.facebook.com/login" target="_blank"><i
                                                class="fa fa-facebook"></i>
                                            <h5>Facebook </h5>
                                        </a></div>
                                    <div class="media-right">
                                        <div class="profile"><img class="bg-img"
                                                src="/chat/images/contact/1.jpg" alt="Avatar" /></div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="media">
                                    <div class="media-left"> <a class="insta"
                                            href="https://www.instagram.com/accounts/login/?hl=en" target="_blank"><i
                                                class="fa fa-instagram"></i>
                                            <h5>instagram</h5>
                                        </a></div>
                                    <div class="media-right">
                                        <div class="profile"><img class="bg-img"
                                                src="/images/default-avatar.png" alt="Avatar" /></div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="media">
                                    <div class="media-left"> <a class="twi"
                                            href="https://twitter.com/login" target="_blank"><i class="fa fa-twitter"></i>
                                            <h5>twitter </h5>
                                        </a></div>
                                    <div class="media-right">
                                        <div class="profile"><img class="bg-img"
                                                src="/images/default-avatar.png" alt="Avatar" /></div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="media">
                                    <div class="media-left"> <a class="ggl"
                                            href="https://accounts.google.com/signin/v2/identifier?service=mail&amp;passive=true&amp;rm=false&amp;continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&amp;ss=1&amp;scc=1&amp;ltmpl=default&amp;ltmplcache=2&amp;emr=1&amp;osid=1&amp;flowName=GlifWebSignIn&amp;flowEntry=ServiceLogin"
                                            target="_blank"><i class="fa fa-google"></i>
                                            <h5>google </h5>
                                        </a></div>
                                    <div class="media-right">
                                        <div class="profile"><img class="bg-img"
                                                src="/images/default-avatar.png" alt="Avatar" /></div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="media">
                                    <div class="media-left"> <a class="slc" href="#"><i
                                                class="fa fa-slack"></i>
                                            <h5>Slack </h5>
                                        </a></div>
                                    <div class="media-right">
                                        <div class="profile"><a href="https://slack.com/get-started#/"
                                                target="_blank"><i data-feather="plus-circle"></i></a></div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="media">
                        <div class="media-body">
                            <h3>Integratin</h3>
                            <h4>Sync Your Other Social Account</h4>
                        </div>
                        <div class="media-right"> <a class="icon-btn btn-outline-light btn-sm pull-right next"
                                href="#"> <i data-feather="chevron-right"> </i></a></div>
                    </div>
                </div>
                <div class="setting-block">
                    <div class="block">
                        <div class="media">
                            <div class="media-body">
                                <h3>Help</h3>
                            </div>
                            <div class="media-right"> <a class="icon-btn btn-outline-light btn-sm pull-right previous"
                                    href="#"> <i data-feather="chevron-left"> </i></a></div>
                        </div>
                        <ul class="help">
                            <li>
                                <h5> <a href="#">FAQ</a></h5>
                            </li>
                            <li>
                                <h5> <a href="#"> Contact Us</a></h5>
                            </li>
                            <li>
                                <h5> <a href="#">Terms and Privacy Policy</a></h5>
                            </li>
                            <li>
                                <h5> <a href="#">Licenses</a></h5>
                            </li>
                            <li>
                                <h5> <a href="#">2019 - 20 Powered by Pixelstrap</a></h5>
                            </li>
                        </ul>
                    </div>
                    <div class="media">
                        <div class="media-body">
                            <h3>Help</h3>
                            <h4>You are Confusion, Tell me</h4>
                        </div>
                        <div class="media-right"> <a class="icon-btn btn-outline-light btn-sm pull-right next"
                                href="#"> <i data-feather="chevron-right"></i></a></div>
                    </div>
                </div>
            </div>
        </aside>

        <div class="chitchat-main small-sidebar" id="content">
            <div class="chat-content tabto active">
                <div class="spining">
                    <div class="spinner">
                        <div class="double-bounce1"></div>
                        <div class="double-bounce2"></div>
                    </div>
                    <!-- <div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> -->
                    <!-- <div class="lds-ring"><div></div><div></div><div></div><div></div></div> -->
                    <!-- <div class="spinner-border" role="status">
                                                                                                                                                                                                                            <span class="sr-only">Loading...</span>
                                                                                                                                                                                                                        </div> -->
                </div>
                <div class="messages custom-scroll active" id="chating">
                    <div class="contact-details">
                        <div class="row">
                            <form class="form-inline search-form">
                                <div class="form-group">
                                    <input class="form-control-plaintext" type="search" placeholder="Search.." />
                                    <div class="icon-close close-search"> </div>
                                </div>
                            </form>
                            <div class="col-7">
                                <div class="media left">
                                    <div class="media-left me-3">
                                        <div class="profile online menu-trigger"><img class="bg-img"
                                                src="/images/default-avatar.png" alt="Avatar" /></div>
                                    </div>
                                    <div class="media-body">
                                        <h5 class="contactor-name">John Doe</h5>
                                        <div class="badge badge-success contactor-status">Active</div>
                                    </div>
                                    <div class="media-right">
                                        <ul>
                                            <li><a class="icon-btn btn-light button-effect mute" href="#"><i
                                                        class="fa fa-volume-up"></i></a></li>
                                            <li><a class="icon-btn btn-light search-right" href="#"><i
                                                        data-feather="search"></i></a></li>
                                            <li><a class="icon-btn btn-light button-effect mobile-sidebar" href="#"><i
                                                        data-feather="chevron-left"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <ul class="calls text-end">
                                    <li><a class="icon-btn btn-light button-effect" href="#"
                                            data-tippy-content="Quick Audio Call" data-bs-toggle="modal"
                                            data-bs-target="#audiocall"><i data-feather="phone"></i></a></li>
                                    <li><a class="icon-btn btn-light button-effect" href="#"
                                            data-tippy-content="Quick Video Call" data-bs-toggle="modal"
                                            data-bs-target="#videocall"><i data-feather="video"></i></a></li>
                                    <li><a class="icon-btn btn-light button-effect apps-toggle" href="#"
                                            data-tippy-content="All Apps"><i class="ti-layout-grid2"></i></a></li>
                                    <li class="chat-friend-toggle">
                                        <a class="icon-btn btn-light bg-transparent button-effect outside" href="#"
                                            data-tippy-content="Quick action"><i data-feather="more-vertical"></i></a>
                                        <div class="chat-frind-content">
                                            <ul>
                                                <li>
                                                    <a class="icon-btn btn-outline-primary button-effect btn-sm"
                                                        href="#"><i data-feather="user"></i></a>
                                                    <h5>Profile</h5>
                                                </li>
                                                <li>
                                                    <a class="icon-btn btn-outline-danger button-effect btn-sm" href="#"><i
                                                            data-feather="trash-2"></i></a>
                                                    <h5>Delete</h5>
                                                </li>
                                                <li>
                                                    <a class="icon-btn btn-outline-light button-effect btn-sm" href="#"><i
                                                            data-feather="slash"></i></a>
                                                    <h5>Block</h5>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <img id="loader" src='http://opengraphicdesign.com/wp-content/uploads/2009/01/loader64.gif'>

                    <div class="contact-chat">
                        <ul class="chatappend">
                            
                        </ul>
                    </div>
                </div>
                <div class="messages custom-scroll" id="blank">
                    <div class="contact-details">
                        <div class="row">
                            <div class="col">
                                <div class="media left">
                                    <div class="media-left me-3">
                                        <div class="profile online menu-trigger"><img class="bg-img"
                                                src="/images/default-avatar.png" alt="Avatar" /></div>
                                    </div>
                                    <div class="media-body">
                                        <h5>John Doe</h5>
                                        <h6>Last Seen 5 hours</h6>
                                    </div>
                                    <div class="media-right">
                                        <ul>
                                            <li><a class="icon-btn btn-light button-effect mute" href="#"><i
                                                        class="fa fa-volume-up"></i></a></li>
                                            <li><a class="icon-btn btn-light search search-right" href="#"> <i
                                                        data-feather="search"></i></a>
                                                <form class="form-inline search-form">
                                                    <div class="form-group">
                                                        <input class="form-control-plaintext" type="search"
                                                            placeholder="Search.." />
                                                        <div class="icon-close close-search"> </div>
                                                    </div>
                                                </form>
                                            </li>
                                            <li><a class="icon-btn btn-light button-effect mobile-sidebar" href="#"><i
                                                        data-feather="chevron-left"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <ul class="calls text-end">
                                    <li><a class="icon-btn btn-light button-effect" href="#"
                                            data-tippy-content="Quick Audio Call" data-bs-toggle="modal"
                                            data-bs-target="#audiocall"><i data-feather="phone"></i></a></li>
                                    <li><a class="icon-btn btn-light button-effect" href="#"
                                            data-tippy-content="Quick Video Call" data-bs-toggle="modal"
                                            data-bs-target="#videocall"><i data-feather="video"></i></a></li>
                                    <li><a class="icon-btn btn-light button-effect apps-toggle" href="#"
                                            data-tippy-content="All Apps"><i class="ti-layout-grid2"></i></a></li>
                                    <li class="chat-friend-toggle"><a
                                            class="icon-btn btn-light bg-transparent button-effect outside" href="#"
                                            data-tippy-content="Quick action"><i data-feather="more-vertical"></i></a>
                                        <div class="chat-frind-content">
                                            <ul>
                                                <li><a class="icon-btn btn-outline-primary button-effect btn-sm"
                                                        href="#"><i data-feather="user"></i></a>
                                                    <h5>profile</h5>
                                                </li>
                                                <li><a class="icon-btn btn-outline-success button-effect btn-sm"
                                                        href="#"><i data-feather="plus-circle"></i></a>
                                                    <h5>archive</h5>
                                                </li>
                                                <li><a class="icon-btn btn-outline-danger button-effect btn-sm" href="#"><i
                                                            data-feather="trash-2"></i></a>
                                                    <h5>delete</h5>
                                                </li>
                                                <li><a class="icon-btn btn-outline-light button-effect btn-sm" href="#"><i
                                                            data-feather="slash"></i></a>
                                                    <h5>block</h5>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="contact-chat">
                        <div class="rightchat animat-rate">
                            <div class="bg_circle">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                            <div class="cross"></div>
                            <div class="cross1"></div>
                            <div class="cross2"></div>
                            <div class="dot"></div>
                            <div class="dot1"> </div>
                        </div>
                    </div>
                    <div class="call-list-center">
                        <img src="/chat/images/chat.png" alt="" />
                        <div class="animated-bg"><i></i><i></i><i></i></div>
                        <p>Select a chat to read messages</p>
                    </div>
                </div>
                <div class="messages custom-scroll" id="group_chat">
                    <div class="contact-details">
                        <div class="row">
                            <div class="col">
                                <div class="media left">
                                    <div class="media-left me-3">
                                        <div class="profile online menu-trigger"><img class="bg-img"
                                                src="/chat/images/avtar/teq.jpg" alt="Avatar" /></div>
                                    </div>
                                    <div class="media-body">
                                        <h5>Tech Ninjas</h5>
                                        <div class="badge badge-success">Active</div>
                                    </div>
                                    <div class="media-right">
                                        <ul>
                                            <li><a class="icon-btn btn-light button-effect mute" href="#"><i
                                                        class="fa fa-volume-up"></i></a></li>
                                            <li><a class="icon-btn btn-light search search-right" href="#"> <i
                                                        data-feather="search"></i></a>
                                                <form class="form-inline search-form">
                                                    <div class="form-group">
                                                        <input class="form-control-plaintext" type="search"
                                                            placeholder="Search.." />
                                                        <div class="icon-close close-search"> </div>
                                                    </div>
                                                </form>
                                            </li>
                                            <li><a class="icon-btn btn-light button-effect mobile-sidebar" href="#"><i
                                                        data-feather="chevron-left"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <ul class="calls text-end">
                                    <li><a class="icon-btn btn-light button-effect" href="#"
                                            data-tippy-content="Start Audio Conference" data-bs-toggle="modal"
                                            data-bs-target="#confercall"><i data-feather="phone"></i></a></li>
                                    <li><a class="icon-btn btn-light button-effect" href="#"
                                            data-tippy-content="Start Video Conference" data-bs-toggle="modal"
                                            data-bs-target="#confvideocl"><i data-feather="video"></i></a></li>
                                    <li><a class="icon-btn btn-light button-effect apps-toggle" href="#"
                                            data-tippy-content="All Apps"><i class="ti-layout-grid2"></i></a></li>
                                    <li class="chat-friend-toggle"><a
                                            class="icon-btn btn-light bg-transparent button-effect outside" href="#"
                                            data-tippy-content="Quick action"></a>
                                        <div class="chat-frind-content">
                                            <ul>
                                                <li><a class="icon-btn btn-outline-primary button-effect btn-sm"
                                                        href="#"><i data-feather="user"></i></a>
                                                    <h5>profile</h5>
                                                </li>
                                                <li><a class="icon-btn btn-outline-success button-effect btn-sm"
                                                        href="#"><i data-feather="plus-circle"></i></a>
                                                    <h5>archive</h5>
                                                </li>
                                                <li><a class="icon-btn btn-outline-danger button-effect btn-sm" href="#"><i
                                                            data-feather="trash-2"></i></a>
                                                    <h5>delete</h5>
                                                </li>
                                                <li><a class="icon-btn btn-outline-light button-effect btn-sm" href="#"><i
                                                            data-feather="slash"></i></a>
                                                    <h5>block</h5>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="contact-chat">
                        <ul class="chatappend">
                            <li class="groupuser">
                                <h4>Jewellery project</h4>
                                <div class="gr-chat-friend-toggle"><a class="icon-btn btn-sm pull-right add-grbtn outside"
                                        href="#" data-tippy-content="Add User"><i data-feather="plus"></i></a>
                                    <div class="gr-chat-frind-content">
                                        <ul class="chat-main">
                                            <li>
                                                <div class="chat-box">
                                                    <div class="media">
                                                        <div class="profile offline"><img class="bg-img"
                                                                src="/chat/images/contact/1.jpg" alt="Avatar" /></div>
                                                        <div class="details">
                                                            <h5>John Doe</h5>
                                                            <h6>Alabma , USA</h6>
                                                        </div>
                                                        <div class="media-body"><a
                                                                class="icon-btn btn-outline-primary btn-sm" href="#"
                                                                data-tippy-content="Add User"><i
                                                                    class="fa fa-plus"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="chat-box">
                                                    <div class="media">
                                                        <div class="profile"><img class="bg-img"
                                                                src="/images/default-avatar.png" alt="Avatar" /></div>
                                                        <div class="details">
                                                            <h5>John Doe</h5>
                                                            <h6>Alabma , USA</h6>
                                                        </div>
                                                        <div class="media-body"><a
                                                                class="icon-btn btn-outline-primary btn-sm" href="#"
                                                                data-tippy-content="Add User"><i
                                                                    class="fa fa-plus"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="chat-box">
                                                    <div class="media">
                                                        <div class="profile"><img class="bg-img"
                                                                src="/images/default-avatar.png" alt="Avatar" /></div>
                                                        <div class="details">
                                                            <h5>John Doe</h5>
                                                            <h6>Alabma , USA</h6>
                                                        </div>
                                                        <div class="media-body"><a
                                                                class="icon-btn btn-outline-primary btn-sm" href="#"
                                                                data-tippy-content="Add User"><i
                                                                    class="fa fa-plus"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="chat-box">
                                                    <div class="media">
                                                        <div class="profile unreachable"><img class="bg-img"
                                                                src="/images/default-avatar.png" alt="Avatar" /></div>
                                                        <div class="details">
                                                            <h5>John Doe</h5>
                                                            <h6>Alabma , USA</h6>
                                                        </div>
                                                        <div class="media-body"><a
                                                                class="icon-btn btn-outline-primary btn-sm" href="#"
                                                                data-tippy-content="Add User"><i
                                                                    class="fa fa-plus"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="gr-profile dot-btn dot-success grow"><img class="bg-img"
                                        src="/chat/images/avtar/3.jpg" alt="Avatar" /></div>
                                <div class="gr-profile dot-btn dot-success grow"><img class="bg-img"
                                        src="/chat/images/avtar/5.jpg" alt="Avatar" /></div>
                            </li>
                            <li class="sent">
                                <div class="media">
                                    <div class="profile me-4"><img class="bg-img"
                                            src="/images/default-avatar.png" alt="Avatar" /></div>
                                    <div class="media-body">
                                        <div class="contact-name">
                                            <h5>John Doe</h5>
                                            <h6>01:35 AM</h6>
                                            <ul class="msg-box">
                                                <li class="msg-setting-main">
                                                    <h5>Hi I am John, can you help me to find best chat app?. </h5>
                                                    <div class="msg-dropdown-main">
                                                        <div class="msg-setting"><i class="ti-more-alt"></i></div>
                                                        <div class="msg-dropdown">
                                                            <ul>
                                                                <li><a href="#"><i class="fa fa-share"></i>forward</a>
                                                                </li>
                                                                <li><a href="#"><i class="fa fa-clone"></i>copy</a></li>
                                                                <li><a href="#"><i class="fa fa-star-o"></i>rating</a>
                                                                </li>
                                                                <li><a href="#"><i class="ti-trash"></i>delete</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="msg-setting-main">
                                                    <h5> it should from elite auther &#128519;</h5>
                                                    <div class="badge badge-success sm ms-2"> R</div>
                                                    <div class="msg-dropdown-main">
                                                        <div class="msg-setting"><i class="ti-more-alt"></i></div>
                                                        <div class="msg-dropdown">
                                                            <ul>
                                                                <li><a href="#"><i class="fa fa-share"></i>forward</a>
                                                                </li>
                                                                <li><a href="#"><i class="fa fa-clone"></i>copy</a></li>
                                                                <li><a href="#"><i class="fa fa-star-o"></i>rating</a>
                                                                </li>
                                                                <li><a href="#"><i class="ti-trash"></i>delete</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="replies">
                                <div class="media">
                                    <div class="profile me-4"><img class="bg-img" src="/images/default-avatar.png"
                                            alt="Avatar" /></div>
                                    <div class="media-body">
                                        <div class="contact-name">
                                            <h5>Alan josheph</h5>
                                            <h6>01:40 AM</h6>
                                            <ul class="msg-box">
                                                <li class="msg-setting-main">
                                                    <div class="msg-dropdown-main">
                                                        <div class="msg-setting"><i class="ti-more-alt"></i></div>
                                                        <div class="msg-dropdown">
                                                            <ul>
                                                                <li><a href="#"><i class="fa fa-share"></i>forward</a>
                                                                </li>
                                                                <li><a href="#"><i class="fa fa-clone"></i>copy</a></li>
                                                                <li><a href="#"><i class="fa fa-star-o"></i>rating</a>
                                                                </li>
                                                                <li><a href="#"><i class="ti-trash"></i>delete</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <h5>Sure, Ojochat is best theme for chating project, you can it check<a
                                                            class="ms-1"
                                                            href="https://themeforest.net/user/pixelstrap/portfolio"
                                                            target="_blank">here.</a></h5>
                                                </li>
                                                <li class="msg-setting-main">
                                                    <div class="msg-dropdown-main">
                                                        <div class="msg-setting"><i class="ti-more-alt"></i></div>
                                                        <div class="msg-dropdown">
                                                            <ul>
                                                                <li><a href="#"><i class="fa fa-share"></i>forward</a>
                                                                </li>
                                                                <li><a href="#"><i class="fa fa-clone"></i>copy</a></li>
                                                                <li><a href="#"><i class="fa fa-star-o"></i>rating</a>
                                                                </li>
                                                                <li><a href="#"><i class="ti-trash"></i>delete</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div class="document"><i
                                                            class="fa fa-file-excel-o font-primary"></i>
                                                        <div class="details">
                                                            <h5>Document.xlsx</h5>
                                                            <h6>25mb Seprate file</h6>
                                                        </div>
                                                        <div class="icon-btns"><a class="icon-btn btn-outline-light"
                                                                href="/chat/doc/Document.xlsx" target="_blank"><i
                                                                    data-feather="download"> </i></a></div>
                                                    </div>
                                                    <div class="badge badge-dark sm ms-2"> D</div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="sent">
                                <div class="media">
                                    <div class="profile me-4"><img class="bg-img"
                                            src="/images/default-avatar.png" alt="Avatar" /></div>
                                    <div class="media-body">
                                        <div class="contact-name">
                                            <h5>John Doe</h5>
                                            <h6>01:42 AM</h6>
                                            <ul class="msg-box">
                                                <li class="msg-setting-main">
                                                    <h5>I think it's best for my project.</h5>
                                                    <div class="msg-dropdown-main">
                                                        <div class="msg-setting"><i class="ti-more-alt"></i></div>
                                                        <div class="msg-dropdown">
                                                            <ul>
                                                                <li><a href="#"><i class="fa fa-share"></i>forward</a>
                                                                </li>
                                                                <li><a href="#"><i class="fa fa-clone"></i>copy</a></li>
                                                                <li><a href="#"><i class="fa fa-star-o"></i>rating</a>
                                                                </li>
                                                                <li><a href="#"><i class="ti-trash"></i>delete</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="msg-setting-main">
                                                    <ul class="auto-gallery">
                                                        <li><img class="bg-img" src="/chat/images/media/1.jpg"
                                                                alt="Avatar" /></li>
                                                        <li> <img class="bg-img" src="/chat/images/media/2.jpg"
                                                                alt="Avatar" /></li>
                                                        <li> <img class="bg-img" src="/chat/images/media/3.jpg"
                                                                alt="Avatar" /></li>
                                                    </ul>
                                                    <div class="badge badge-danger sm ms-2"></div>
                                                    <div class="badge badge-outline-primary refresh sm ms-2"> <i
                                                            data-feather="rotate-cw"></i></div>
                                                    <div class="msg-dropdown-main">
                                                        <div class="msg-setting"><i class="ti-more-alt"></i></div>
                                                        <div class="msg-dropdown">
                                                            <ul>
                                                                <li><a href="#"><i class="fa fa-share"></i>forward</a>
                                                                </li>
                                                                <li><a href="#"><i class="fa fa-clone"></i>copy</a></li>
                                                                <li><a href="#"><i class="fa fa-star-o"></i>rating</a>
                                                                </li>
                                                                <li><a href="#"><i class="ti-trash"></i>delete</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="replies">
                                <div class="media">
                                    <div class="profile me-4"><img class="bg-img" src="/images/default-avatar.png"
                                            alt="Avatar" /></div>
                                    <div class="media-body">
                                        <div class="contact-name">
                                            <h5>Alan josheph</h5>
                                            <h6>01:45 AM</h6>
                                            <ul class="msg-box">
                                                <li class="msg-setting-main">
                                                    <div class="msg-dropdown-main">
                                                        <div class="msg-setting"><i class="ti-more-alt"></i></div>
                                                        <div class="msg-dropdown">
                                                            <ul>
                                                                <li><a href="#"><i class="fa fa-share"></i>forward</a>
                                                                </li>
                                                                <li><a href="#"><i class="fa fa-clone"></i>copy</a></li>
                                                                <li><a href="#"><i class="fa fa-star-o"></i>rating</a>
                                                                </li>
                                                                <li><a href="#"><i class="ti-trash"></i>delete</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <h5>If you have any other query then feel free to ask us.</h5>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="messages custom-scroll" id="group_blank">
                    <div class="contact-details">
                        <div class="row">
                            <div class="col">
                                <div class="media left">
                                    <div class="media-left me-3">
                                        <div class="profile online menu-trigger"><img class="bg-img"
                                                src="/chat/images/avtar/family.jpg" alt="Avatar" /></div>
                                    </div>
                                    <div class="media-body">
                                        <h5>Family Ties</h5>
                                        <h6>Last Seen 2 hours</h6>
                                    </div>
                                    <div class="media-right">
                                        <ul>
                                            <li><a class="icon-btn btn-light button-effect mute" href="#"><i
                                                        class="fa fa-volume-up"></i></a></li>
                                            <li><a class="icon-btn btn-light search search-right" href="#"> <i
                                                        data-feather="search"></i></a>
                                                <form class="form-inline search-form">
                                                    <div class="form-group">
                                                        <input class="form-control-plaintext" type="search"
                                                            placeholder="Search.." />
                                                        <div class="icon-close close-search"> </div>
                                                    </div>
                                                </form>
                                            </li>
                                            <li><a class="icon-btn btn-light button-effect mobile-sidebar" href="#"><i
                                                        data-feather="chevron-left"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <ul class="calls text-end">
                                    <li><a class="icon-btn btn-light button-effect" href="#"
                                            data-tippy-content="Quick Audio Call" data-bs-toggle="modal"
                                            data-bs-target="#confercall"><i data-feather="phone"></i></a></li>
                                    <li><a class="icon-btn btn-light button-effect" href="#"
                                            data-tippy-content="Quick Video Call" data-bs-toggle="modal"
                                            data-bs-target="#confvideocl"><i data-feather="video"></i></a></li>
                                    <li><a class="icon-btn btn-light button-effect apps-toggle" href="#"
                                            data-tippy-content="All Apps"><i class="ti-layout-grid2"></i></a></li>
                                    <li class="chat-friend-toggle"><a
                                            class="icon-btn btn-light bg-transparent button-effect outside" href="#"
                                            data-tippy-content="Quick action"><i data-feather="more-vertical"></i></a>
                                        <div class="chat-frind-content">
                                            <ul>
                                                <li><a class="icon-btn btn-outline-primary button-effect btn-sm"
                                                        href="#"><i data-feather="user"></i></a>
                                                    <h5>profile</h5>
                                                </li>
                                                <li><a class="icon-btn btn-outline-success button-effect btn-sm"
                                                        href="#"><i data-feather="plus-circle"></i></a>
                                                    <h5>archive</h5>
                                                </li>
                                                <li><a class="icon-btn btn-outline-danger button-effect btn-sm" href="#"><i
                                                            data-feather="trash-2"></i></a>
                                                    <h5>delete</h5>
                                                </li>
                                                <li><a class="icon-btn btn-outline-light button-effect btn-sm" href="#"><i
                                                            data-feather="slash"></i></a>
                                                    <h5>block</h5>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="contact-chat">
                        <div class="rightchat animat-rate">
                            <div class="bg_circle">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                            <div class="cross"></div>
                            <div class="cross1"></div>
                            <div class="cross2"></div>
                            <div class="dot"></div>
                            <div class="dot1"></div>
                        </div>
                    </div>
                    <div class="call-list-center"><img src="/chat/images/chat.png" alt="" />
                        <div class="animated-bg"><i></i><i></i><i></i></div>
                        <p>Select a chat to read messages</p>
                    </div>
                </div>
                <div class="message-input">
                    <div class="wrap emojis-main">

                        <div class="contact-poll">
                            <a class="icon-btn btn-outline-primary me-4 outside" href="#">
                                <i class="fa fa-plus"></i>
                            </a>
                            <div class="contact-poll-content">
                                <ul>
                                    <li><a data-bs-toggle="modal" data-bs-target="#photoRequestModal"><i
                                                data-feather="camera"></i>Photo Request</a></li>
                                    {{-- <li><a data-bs-toggle="modal" data-bs-target="#createPhoto"><i
                                            data-feather="image"></i>Media</a></li> --}}
                                    <li><a id="createPhotoBtn"><i data-feather="image"></i>Media</a></li>
                                    <li><a href="#"><i data-feather="clipboard"> </i>File</a></li>
                                </ul>
                            </div>
                        </div>
                        <input class="setemoj" id="setemoj" type="text" placeholder="Write your message..." />
                        <a class="icon-btn btn-outline-primary button-effect me-3 ms-3" href="#">
                            <i data-feather="mic"></i>
                        </a>
                        <button class="submit icon-btn btn-primary disabled" id="send-msg" disabled="disabled">
                            <i data-feather="send"></i></button>

                    </div>
                </div>
            </div>
            <div class="call-content tabto"><a class="icon-btn btn-outline-primary button-effect mobile-back mb-3"
                    href="#"><i class="ti-angle-left"> </i></a>
                <div class="row">
                    <div class="col-sm-5">
                        <div class="user-profile mb-3">
                            <div class="user-content"><img class="img-fluid" src="/images/default-avatar.png"
                                    alt="user-img" />
                                <h3>John Doe</h3>
                                <h4 class="mt-2">+0 1800 76855</h4>
                                <ul>
                                    <li><i class="fa fa-twitch"></i>massage</li>
                                    <li><i class="fa fa-phone" data-bs-toggle="modal"
                                            data-bs-target="#audiocall"></i>voice
                                        call</li>
                                    <li><i class="fa fa-video-camera" data-bs-toggle="modal"
                                            data-bs-target="#videocall"></i>video call</li>
                                </ul>
                            </div>
                        </div>
                        <div class="user-profile">
                            <div class="document">
                                <div class="filter-block">
                                    <div class="collapse-block open">
                                        <h5 class="block-title">Shared Document
                                            <label class="badge badge-success sm ms-2">3</label>
                                        </h5>
                                        <div class="block-content">
                                            <ul class="document-list">
                                                <li>
                                                    <i class="ti-folder font-danger"></i>
                                                    <h5>Simple_practice_project-zip</h5>
                                                </li>
                                                <li>
                                                    <i class="ti-write font-success"></i>
                                                    <h5>Word_Map-jpg</h5>
                                                </li>
                                                <li>
                                                    <i class="ti-zip font-primary"></i>
                                                    <h5>Latest_Design_portfolio.pdf</h5>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-7 position-relative">
                        <div class="call-log-main custom-scroll">
                            <div class="coll-log-group">
                                <div class="log-content-left">
                                    <div class="media"><i data-feather="phone-incoming"></i>
                                        <div class="media-body">
                                            <h5>incoming call</h5>
                                        </div>
                                    </div>
                                </div>
                                <div class="log-content-right">
                                    <h6>15 Minutes ago 5:10 &nbsp;(22/10/19)</h6>
                                </div>
                            </div>
                        </div>
                        <div class="call-log-clear"> <i class="ti-trash font-danger"></i><span
                                class="font-danger">Delete
                                call log</span></div>
                    </div>
                </div>
            </div>
            <div class="contact-content tabto">
                <div class="contact-sub-content"><a class="icon-btn btn-outline-primary button-effect mobile-back mb-3"
                        href="#"><i class="ti-angle-left"></i></a>
                    <div class="row">
                        <div class="col-sm-5">
                            <div class="user-profile">
                                <div class="user-content"><img class="img-fluid bg-icon"
                                        src="/images/default-avatar.png" alt="user-img" />
                                    <h3>John Doe</h3>
                                    <ul>
                                        <li><i class="fa fa-twitch"> </i>massage</li>
                                        <li><i class="fa fa-phone"> </i>voice call</li>
                                        <li> <i class="fa fa-video-camera"> </i>video call</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="personal-info-group">
                                <div class="social-info-group">
                                    <ul class="integratin mt-0">
                                        <li>
                                            <div class="media">
                                                <div class="media-left"><a class="fb"
                                                        href="https://www.facebook.com/login" target="_blank"><i
                                                            class="fa fa-facebook"></i>
                                                        <h5>Facebook </h5>
                                                    </a></div>
                                                <div class="media-right">
                                                    <div class="profile bg-size"><img class="bg-img"
                                                            src="/chat/images/contact/1.jpg" alt="Avatar" /></div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="media">
                                                <div class="media-left"><a class="twi"
                                                        href="https://twitter.com/login" target="_blank"><i
                                                            class="fa fa-twitter"></i>
                                                        <h5>twitter</h5>
                                                    </a></div>
                                                <div class="media-right">
                                                    <div class="profile bg-size"><img class="bg-img"
                                                            src="/images/default-avatar.png" alt="Avatar" /></div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="media">
                                                <div class="media-left"><a class="ggl"
                                                        href="https://accounts.google.com/signin/v2/identifier?service=mail&amp;passive=true&amp;rm=false&amp;continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&amp;ss=1&amp;scc=1&amp;ltmpl=default&amp;ltmplcache=2&amp;emr=1&amp;osid=1&amp;flowName=GlifWebSignIn&amp;flowEntry=ServiceLogin"
                                                        target="_blank"><i class="fa fa-google"></i>
                                                        <h5>google </h5>
                                                    </a></div>
                                                <div class="media-right">
                                                    <div class="profile bg-size"><img class="bg-img"
                                                            src="/images/default-avatar.png" alt="Avatar" /></div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-7">
                            <div class="personal-info-group">
                                <h3>contact info</h3>
                                <ul class="basic-info">
                                    <li>
                                        <h5>name</h5>
                                        <h5 class="details">Nick</h5>
                                    </li>
                                    <li>
                                        <h5>gender</h5>
                                        <h5 class="details">male</h5>
                                    </li>
                                    <li>
                                        <h5>Birthday</h5>
                                        <h5 class="details">9 april 1994</h5>
                                    </li>
                                    <li>
                                        <h5>Favorite Book</h5>
                                        <h5 class="details">Perfect Chemistry</h5>
                                    </li>
                                    <li>
                                        <h5>Personality</h5>
                                        <h5 class="details">Cool</h5>
                                    </li>
                                    <li>
                                        <h5>City</h5>
                                        <h5 class="details">Moline Acres</h5>
                                    </li>
                                    <li>
                                        <h5>mobile no</h5>
                                        <h5 class="details">+0 1800 76855</h5>
                                    </li>
                                    <li>
                                        <h5>email</h5>
                                        <h5 class="details">pixelstrap@test.com</h5>
                                    </li>
                                    <li>
                                        <h5>Website</h5>
                                        <h5 class="details">www.test.com</h5>
                                    </li>
                                    <li>
                                        <h5 class="m-0">Interest</h5>
                                        <h5 class="details">Photography</h5>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <section class="section-py-space chitchat-main light-bg">
            <div class="container-fluid">
                <div class="landing-title">
                    <div class="sub-title">
                        <div>
                            <h4>Welcome to OJOChat</h4>
                            <h2>OJOChat is fully responsive excellent choice</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div class="custom-container">
                <div class="row chit-chat-block">
                    <div class="col-md-6">
                        <div class="chitchat-contain"><img class="img-fluid chitchat-img"
                                src="/chat/images/landing/chitchat/4.png" alt="chit-chat" /></div>
                    </div>
                    <div class="col-md-6">
                        <div class="chitchat-contain">
                            <div>
                                <div class="chitchat-logo"><img class="img-fluid"
                                        src="/chat/images/logo/landing-logo.png" alt="landing-logo" /></div>
                                <h3>Easy to use<span>Our Application</span></h3>
                                <h1>All-in-one responsive app for you</h1>

                                <h4> It is about us being able to offer help with the branding campaign, product
                                    presentation, and advertisement running across social media.</h4>
                                <ul class="detial-price">
                                    <li><i class="fa fa-check"></i>Customer First Content-focused Displaying Effects
                                    </li>
                                    <li><i class="fa fa-check"> </i>High Definition Full-screen Sliders & Backgrounds
                                    </li>
                                    <li><i class="fa fa-check"> </i>Try for free, Forever! </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="chitchat-back-block"><img class="img-fluid chit-chat1" src="/chat/images/landing/chitchat/2.png"
                    alt="chit-chat-back-img" /><img class="img-fluid chit-chat2" src="/chat/images/landing/chitchat/1.png"
                    alt="chit-chat-back-img" /><img class="img-fluid chit-chat3" src="/chat/images/landing/chitchat/3.png"
                    alt="chit-chat-back-img" /></div>
        </section>

        <aside class="chitchat-right-sidebar" id="slide-menu">
            <div class="custom-scroll right-sidebar">
                <div class="contact-profile">
                    <div class="theme-title">
                        <div class="media">
                            <div>
                                <h2>Profile</h2>
                                <h4>Personal Information</h4>
                            </div>
                            <div class="media-body text-end"> <a
                                    class="icon-btn btn-outline-light btn-sm close-profile ms-3" href="#"> <i
                                        data-feather="x"> </i></a></div>
                        </div>
                    </div>
                    <div class="photoRating">
                        <div>★</div>
                        <div>★</div>
                        <div>★</div>
                        <div>★</div>
                        <div>★</div>
                    </div>
                    <div class="details">
                        <div class="contact-top"><img class="bg-img" src="/chat/images/avtar/2.jpg" alt="" />
                        </div>
                        <div class="name">
                            <h3>John Doe</h3>
                            <h5 class="mb-2">Alabma USA</h5>
                            <h6>add description</h6>
                        </div>
                        <ul class="medialogo">
                            <li><a class="icon-btn btn-danger button-effect" href="#"><i class="fa fa-google"></i></a>
                            </li>
                            <li><a class="icon-btn btn-primary button-effect" href="#"><i class="fa fa-twitter"></i></a>
                            </li>
                            <li><a class="icon-btn btn-facebook button-effect" href="#"><i
                                        class="fa fa-facebook-f"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="document">
                    <div class="filter-block">
                        <div class="collapse-block open">
                            <h5 class="block-title">Content Ratings
                                <label class="badge badge-success sm ms-2">3</label>
                            </h5>
                            <div class="block-content">
                                <ul class="document-list content-rating-list">
                                    <li class="text-rating"><i class="ti-text font-danger" title="text"></i>
                                        <div class="photoRating">
                                            <div>★</div>
                                            <div>★</div>
                                            <div>★</div>
                                            <div>★</div>
                                            <div>★</div>
                                        </div>
                                    </li>
                                    <li class="photo-rating"><i class="ti-camera font-success" title="photo"></i>
                                        <div class="photoRating">
                                            <div>★</div>
                                            <div>★</div>
                                            <div>★</div>
                                            <div>★</div>
                                            <div>★</div>
                                        </div>
                                    </li>
                                    <li class="video-rating"><i class="ti-video-clapper font-primary" title="video"></i>
                                        <div class="photoRating">
                                            <div>★</div>
                                            <div>★</div>
                                            <div>★</div>
                                            <div>★</div>
                                            <div>★</div>
                                        </div>
                                    </li>
                                    <li class="audio-rating"><i class="ti-music font-danger" title="audio"></i>
                                        <div class="photoRating">
                                            <div>★</div>
                                            <div>★</div>
                                            <div>★</div>
                                            <div>★</div>
                                            <div>★</div>
                                        </div>
                                    </li>
                                    <li class="video-call-rating"><i class="ti-video-camera font-success"
                                            title="video call"></i>
                                        <div class="photoRating">
                                            <div>★</div>
                                            <div>★</div>
                                            <div>★</div>
                                            <div>★</div>
                                            <div>★</div>
                                        </div>
                                    </li>
                                    <li class="voice-call-rating"><i class="ti-headphone-alt font-primary"
                                            title="voice call"></i>
                                        <div class="photoRating">
                                            <div>★</div>
                                            <div>★</div>
                                            <div>★</div>
                                            <div>★</div>
                                            <div>★</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="media-gallery portfolio-section grid-portfolio">
                    <div class="collapse-block open">
                        <h5 class="block-title">Shared Media
                            <label class="badge badge-primary sm ms-2">2</label>
                        </h5>
                        <div class="block-content">
                            <div class="row share-media zoom-gallery">
                                <div class="col-12">
                                    <h6 class="mb-2">22/03/2019</h6>
                                </div>
                                <div class="col-4 isotopeSelector filter">
                                    <div class="media-big">
                                        <div class="overlay">
                                            <div class="border-portfolio"><a href="/chat/images/gallery/1.jpg">
                                                    <div class="overlay-background"><i class="ti-plus"
                                                            aria-hidden="true"></i></div><img class="img-fluid bg-img"
                                                        src="/chat/images/gallery/1.jpg" alt="portfolio-image" />
                                                </a></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="media-small isotopeSelector filter">
                                        <div class="overlay">
                                            <div class="border-portfolio"><a href="/chat/images/gallery/2.jpg">
                                                    <div class="overlay-background"><i class="ti-plus"
                                                            aria-hidden="true"></i></div><img class="img-fluid bg-img"
                                                        src="/chat/images/gallery/2.jpg" alt="portfolio-image" />
                                                </a></div>
                                        </div>
                                    </div>
                                    <div class="media-small isotopeSelector filter">
                                        <div class="overlay">
                                            <div class="border-portfolio"><a href="/chat/images/gallery/3.jpg">
                                                    <div class="overlay-background"><i class="ti-plus"
                                                            aria-hidden="true"></i></div><img class="img-fluid bg-img"
                                                        src="/chat/images/gallery/3.jpg" alt="portfolio-image" />
                                                </a></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="media-small isotopeSelector filter">
                                        <div class="overlay">
                                            <div class="border-portfolio"><a href="/chat/images/gallery/4.jpg">
                                                    <div class="overlay-background"><i class="ti-plus"
                                                            aria-hidden="true"></i></div><img class="img-fluid bg-img"
                                                        src="/chat/images/gallery/4.jpg" alt="portfolio-image" />
                                                </a></div>
                                        </div>
                                    </div>
                                    <div class="media-small isotopeSelector filter fashion">
                                        <div class="overlay">
                                            <div class="border-portfolio"><a href="/chat/images/gallery/5.jpg">
                                                    <div class="overlay-background"><i class="ti-plus"
                                                            aria-hidden="true"></i></div><img class="img-fluid bg-img"
                                                        src="/chat/images/gallery/5.jpg" alt="portfolio-image" />
                                                </a></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <h6 class="mb-2 mt-2">20/04/2019</h6>
                                </div>
                                <div class="col-4">
                                    <div class="media-small isotopeSelector filter">
                                        <div class="overlay">
                                            <div class="border-portfolio"><a href="/chat/images/gallery/2.jpg">
                                                    <div class="overlay-background"><i class="ti-plus"
                                                            aria-hidden="true"></i></div><img class="img-fluid bg-img"
                                                        src="/chat/images/gallery/2.jpg" alt="portfolio-image" />
                                                </a></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="media-small isotopeSelector filter">
                                        <div class="overlay">
                                            <div class="border-portfolio"><a href="/chat/images/gallery/3.jpg">
                                                    <div class="overlay-background"><i class="ti-plus"
                                                            aria-hidden="true"></i></div><img class="img-fluid bg-img"
                                                        src="/chat/images/gallery/3.jpg" alt="portfolio-image" />
                                                </a></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="media-small isotopeSelector filter">
                                        <div class="overlay">
                                            <div class="border-portfolio"><a href="/chat/images/gallery/4.jpg">
                                                    <div class="overlay-background"><i class="ti-plus"
                                                            aria-hidden="true"></i></div><img class="img-fluid bg-img"
                                                        src="/chat/images/gallery/4.jpg" alt="portfolio-image" />
                                                </a></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="status">
                    <div class="collapse-block open">
                        <h5 class="block-title">Starred Messages
                            <label class="badge badge-outline-dark sm ms-2">2</label>
                        </h5>
                        <div class="block-content">
                            <div class="contact-chat p-0 m-0">
                                <ul class="str-msg">
                                    <li>
                                        <div class="media">
                                            <div class="profile me-4"><img class="bg-img"
                                                    src="/images/default-avatar.png" alt="Avatar" /></div>
                                            <div class="media-body">
                                                <div class="contact-name">
                                                    <h5>Alan josheph</h5>
                                                    <h6>01:35 AM</h6>
                                                    <ul class="msg-box">
                                                        <li>
                                                            <h5>Hi I am Alan,</h5>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="media">
                                            <div class="profile me-4"><img class="bg-img"
                                                    src="/images/default-avatar.png" alt="Avatar" /></div>
                                            <div class="media-body">
                                                <div class="contact-name">
                                                    <h5>John Doe</h5>
                                                    <h6>01:35 AM</h6>
                                                    <ul class="msg-box">
                                                        <li>
                                                            <h5>Can you help me to find best chat app?.</h5>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="status">
                    <div class="collapse-block open">
                        <h5 class="block-title">Common groups
                            <label class="badge badge-outline-dark sm ms-2">3</label>
                        </h5>
                        <div class="block-content">
                            <ul class="group-main">
                                <li>
                                    <div class="group-box">
                                        <div class="profile"><img class="bg-img"
                                                src="/chat/images/avtar/teq.jpg" alt="Avatar" /></div>
                                        <div class="details">
                                            <h5>Tech Ninjas</h5>
                                            <h6>johan, deo, Sufiya Elija, Pabelo & you</h6>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="group-box">
                                        <div class="profile"><img class="bg-img"
                                                src="/chat/images/avtar/family.jpg" alt="Avatar" /></div>
                                        <div class="details">
                                            <h5>Family Ties</h5>
                                            <h6>Mukrani, deo & you</h6>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="status other">
                    <h5 class="block-title p-b-25">Contact info</h5>
                    <ul>
                        <li>
                            <h5> <a href="#"> <i data-feather="smartphone"></i>+12 3456789587</a></h5>
                        </li>
                        <li>
                            <h5><a href="https://themeforest.net/user/pixelstrap/portfolio"> <i
                                        data-feather="crosshair"></i>https://pixelstrap</a></h5>
                        </li>
                        <li>
                            <h5><a href="#"> <i data-feather="map-pin"></i>1766 Fidler Drive Texas, 78238.</a></h5>
                        </li>
                    </ul>
                </div>
                <div class="status">
                    <ul>
                        <li>
                            <input class="js-switch" type="checkbox" />
                            <h5>Block </h5>
                        </li>
                        <li>
                            <input class="js-switch1" type="checkbox" />
                            <h5>Mute </h5>
                        </li>
                        <li>
                            <input class="js-switch2" type="checkbox" checked="" />
                            <h5>Get Notification</h5>
                        </li>
                    </ul>
                </div>
                <div class="status other">
                    <ul>
                        <li>
                            <h5> <a href="#"> <i data-feather="share-2"></i>share Contact</a></h5>
                        </li>
                        <li>
                            <h5><a href="#"> <i data-feather="trash-2"></i>Clear Chat</a></h5>
                        </li>
                        <li>
                            <h5><a href="#"> <i data-feather="external-link"></i>Export Chat</a></h5>
                        </li>
                        <li>
                            <h5><a href="#"> <i data-feather="alert-circle"></i>Report Contact </a></h5>
                        </li>
                    </ul>
                </div>
            </div>
        </aside>
        <aside class="app-sidebar active">
            <div class="apps">
                <ul class="apps-ul">
                    <li id="todo">
                        <div class="todo-main">
                            <div class="theme-title">
                                <div class="media">
                                    <div>
                                        <h2>Todo</h2>
                                        <h4>to create your task</h4>
                                    </div>
                                    <div class="media-body media-body text-end"><a
                                            class="icon-btn btn-sm btn-outline-light close-apps" href="#"><i
                                                data-feather="x"></i></a></div>
                                </div>
                            </div>
                            <div class="todo-name">
                                <form class="default-form">
                                    <select class="custom-scroll" name="support[support_type]">
                                        <option>All Conversations</option>
                                        <option>John Doe</option>
                                        <option>Jony Lynetin</option>
                                        <option>Sufiya Elija</option>
                                        <option>Mukrani Pabelo</option>
                                        <option>Jhon Deo</option>
                                    </select>
                                </form>
                            </div>
                            <div class="todo-tab theme-tab custom-scroll">
                                <ul class="nav nav-tabs">
                                    <li class="nav-item"><a class="nav-link button-effect active show"
                                            data-bs-toggle="pill" href="#todo1">All</a></li>
                                    <li class="nav-item"><a class="nav-link button-effect" data-bs-toggle="pill"
                                            href="#todo2">My to-dos</a></li>
                                    <li><a class="icon-btn btn-light button-effect btn-sm" data-bs-toggle="modal"
                                            data-bs-target="#todoModal"><i data-feather="plus"> </i></a></li>
                                </ul>
                                <div class="tab-content">
                                    <div class="tab-pane active show" id="todo1">
                                        <div class="tab-card text-start">
                                            <div class="todo-task">
                                                <h4>Designer Discussion </h4>
                                                <div class="todo-main-content">
                                                    <div class="input-text">
                                                        <input type="checkbox"
                                                            aria-label="Checkbox for following text input" />
                                                        <input id="user_input12" type="text" name="todo-text"
                                                            placeholder="Give me review on our side" />
                                                    </div>
                                                    <div class="drop-picker">
                                                        <div class="dropdown currency" tabindex="1">
                                                            <div class="select"><span>Assign To</span></div>
                                                            <input type="hidden" name="currency" />
                                                            <ul class="dropdown-menu">
                                                                <li class="dropdown-divider">
                                                                    <div class="fa fa-user"></div>
                                                                    <h5 class="text-muted">Assign To</h5>
                                                                </li>
                                                                <li><a href="#">John Doe</a></li>
                                                                <li><a href="#">Lynetin john</a></li>
                                                                <li><a href="#">Sufiya john</a></li>
                                                                <li><a href="#">Jhon john</a></li>
                                                            </ul>
                                                        </div>
                                                        <input class="datepicker-here form-control digits" type="url"
                                                            data-language="en" placeholder="Due date" />
                                                    </div>
                                                </div>
                                                <div class="todo-list">
                                                    <div class="element" id="div_3"><span
                                                            class="add add-to-do">Add-To-Do</span></div>
                                                </div>
                                                <div class="todo-main-content">
                                                    <div class="input-text">
                                                        <input type="checkbox"
                                                            aria-label="Checkbox for following text input" />
                                                        <input id="user_input13" type="text" name="todo-text"
                                                            placeholder="Redesign Your Design" />
                                                    </div>
                                                    <div class="drop-picker">
                                                        <div class="dropdown currency" tabindex="1">
                                                            <div class="select"><span>Assign To</span></div>
                                                            <input type="hidden" name="currency" />
                                                            <ul class="dropdown-menu">
                                                                <li class="dropdown-divider">
                                                                    <div class="fa fa-user"></div>
                                                                    <h5 class="text-muted">Assign To</h5>
                                                                </li>
                                                                <li><a href="#">John Doe</a></li>
                                                                <li><a href="#">Lynetin john</a></li>
                                                                <li><a href="#">Sufiya john</a></li>
                                                                <li><a href="#">Jhon john</a></li>
                                                            </ul>
                                                        </div>
                                                        <input class="datepicker-here form-control digits" type="url"
                                                            data-language="en" placeholder="Due date" />
                                                    </div>
                                                </div>
                                                <div class="todo-list">
                                                    <div class="element" id="div_2"><span
                                                            class="add add-to-do">Add-To-Do</span></div>
                                                </div>
                                                <div class="todo-main-content">
                                                    <div class="input-text">
                                                        <input type="checkbox"
                                                            aria-label="Checkbox for following text input" />
                                                        <input id="user_input14" type="text" name="todo-text"
                                                            placeholder=" Complete Project report" />
                                                    </div>
                                                    <div class="drop-picker">
                                                        <div class="dropdown currency" tabindex="1">
                                                            <div class="select"><span>Assign To</span></div>
                                                            <input type="hidden" name="currency" />
                                                            <ul class="dropdown-menu">
                                                                <li class="dropdown-divider">
                                                                    <div class="fa fa-user"></div>
                                                                    <h5 class="text-muted">Assign To</h5>
                                                                </li>
                                                                <li><a href="#">John Doe</a></li>
                                                                <li><a href="#">Lynetin john</a></li>
                                                                <li><a href="#">Sufiya john</a></li>
                                                                <li><a href="#">Jhon john</a></li>
                                                            </ul>
                                                        </div>
                                                        <input class="datepicker-here form-control digits" type="url"
                                                            data-language="en" placeholder="Due date" />
                                                    </div>
                                                </div>
                                                <div class="todo-list">
                                                    <div class="element" id="div_1"><span
                                                            class="add add-to-do">Add-To-Do</span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="todo2">
                                        <div class="converstaion-docs tab-card"><i class="fa fa-sticky-note-o"></i>
                                            <h5 class="mb-3">No Open To-Dos Here </h5><a
                                                class="btn btn-primary btn-sm" data-bs-toggle="modal"
                                                data-bs-target="#createtodoModal">Create A To-Do</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li id="files">
                        <div class="theme-title">
                            <div class="media">
                                <div>
                                    <h2>Files</h2>
                                    <h4>Shared Media</h4>
                                </div>
                                <div class="media-body media-body text-end"><a
                                        class="icon-btn btn-sm btn-outline-light close-apps" href="#"><i data-feather="x">
                                        </i></a></div>
                            </div>
                        </div>
                        <div class="theme-tab">
                            <ul class="nav nav-tabs">
                                <li class="nav-item"><a class="nav-link button-effect active" data-bs-toggle="pill"
                                        href="#tab1">Media</a></li>
                                <li class="nav-item"><a class="nav-link button-effect" data-bs-toggle="pill"
                                        href="#tab2">Link</a></li>
                                <li class="nav-item"><a class="nav-link button-effect" data-bs-toggle="pill"
                                        href="#tab3">Docs</a></li>
                            </ul>
                        </div>
                        <div class="file-tab">
                            <div class="tab-content custom-scroll">
                                <div class="tab-pane active" id="tab1">
                                    <div class="media-gallery portfolio-section grid-portfolio">
                                        <div class="collapse-block open">
                                            <h5 class="block-title">12/12/2019
                                                <label class="badge badge-primary sm ms-2">8</label>
                                            </h5>
                                            <div class="block-content">
                                                <div class="row share-media zoom-gallery">
                                                    <div class="col-4 isotopeSelector filter">
                                                        <div class="media-big">
                                                            <div class="overlay">
                                                                <div class="border-portfolio"><a
                                                                        href="/chat/images/gallery/1.jpg">
                                                                        <div class="overlay-background"><i
                                                                                class="ti-plus"
                                                                                aria-hidden="true"></i></div><img
                                                                            class="img-fluid bg-img"
                                                                            src="/chat/images/gallery/1.jpg"
                                                                            alt="portfolio-image" />
                                                                    </a></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-4">
                                                        <div class="media-small isotopeSelector filter">
                                                            <div class="overlay">
                                                                <div class="border-portfolio"><a
                                                                        href="/chat/images/gallery/2.jpg">
                                                                        <div class="overlay-background"><i
                                                                                class="ti-plus"
                                                                                aria-hidden="true"></i></div><img
                                                                            class="img-fluid bg-img"
                                                                            src="/chat/images/gallery/2.jpg"
                                                                            alt="portfolio-image" />
                                                                    </a></div>
                                                            </div>
                                                        </div>
                                                        <div class="media-small isotopeSelector filter">
                                                            <div class="overlay">
                                                                <div class="border-portfolio"><a
                                                                        href="/chat/images/gallery/3.jpg">
                                                                        <div class="overlay-background"><i
                                                                                class="ti-plus"
                                                                                aria-hidden="true"></i></div><img
                                                                            class="img-fluid bg-img"
                                                                            src="/chat/images/gallery/3.jpg"
                                                                            alt="portfolio-image" />
                                                                    </a></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-4">
                                                        <div class="media-small isotopeSelector filter">
                                                            <div class="overlay">
                                                                <div class="border-portfolio"><a
                                                                        href="/chat/images/gallery/4.jpg">
                                                                        <div class="overlay-background"><i
                                                                                class="ti-plus"
                                                                                aria-hidden="true"></i></div><img
                                                                            class="img-fluid bg-img"
                                                                            src="/chat/images/gallery/4.jpg"
                                                                            alt="portfolio-image" />
                                                                    </a></div>
                                                            </div>
                                                        </div>
                                                        <div class="media-small isotopeSelector filter fashion">
                                                            <div class="overlay">
                                                                <div class="border-portfolio"><a
                                                                        href="/chat/images/gallery/5.jpg">
                                                                        <div class="overlay-background"><i
                                                                                class="ti-plus"
                                                                                aria-hidden="true"></i></div><img
                                                                            class="img-fluid bg-img"
                                                                            src="/chat/images/gallery/5.jpg"
                                                                            alt="portfolio-image" />
                                                                    </a></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <h5 class="block-title">10/01/2020
                                                <label class="badge badge-primary sm ms-2">5</label>
                                            </h5>
                                            <div class="block-content">
                                                <div class="row share-media zoom-gallery">
                                                    <div class="col-4 isotopeSelector filter">
                                                        <div class="media-big">
                                                            <div class="overlay">
                                                                <div class="border-portfolio"><a
                                                                        href="/chat/images/gallery/1.jpg">
                                                                        <div class="overlay-background"><i
                                                                                class="ti-plus"
                                                                                aria-hidden="true"></i></div><img
                                                                            class="img-fluid bg-img"
                                                                            src="/chat/images/gallery/1.jpg"
                                                                            alt="portfolio-image" />
                                                                    </a></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-4">
                                                        <div class="media-small isotopeSelector filter">
                                                            <div class="overlay">
                                                                <div class="border-portfolio"><a
                                                                        href="/chat/images/gallery/2.jpg">
                                                                        <div class="overlay-background"><i
                                                                                class="ti-plus"
                                                                                aria-hidden="true"></i></div><img
                                                                            class="img-fluid bg-img"
                                                                            src="/chat/images/gallery/2.jpg"
                                                                            alt="portfolio-image" />
                                                                    </a></div>
                                                            </div>
                                                        </div>
                                                        <div class="media-small isotopeSelector filter">
                                                            <div class="overlay">
                                                                <div class="border-portfolio"><a
                                                                        href="/chat/images/gallery/3.jpg">
                                                                        <div class="overlay-background"><i
                                                                                class="ti-plus"
                                                                                aria-hidden="true"></i></div><img
                                                                            class="img-fluid bg-img"
                                                                            src="/chat/images/gallery/3.jpg"
                                                                            alt="portfolio-image" />
                                                                    </a></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-4">
                                                        <div class="media-small isotopeSelector filter">
                                                            <div class="overlay">
                                                                <div class="border-portfolio"><a
                                                                        href="/chat/images/gallery/4.jpg">
                                                                        <div class="overlay-background"><i
                                                                                class="ti-plus"
                                                                                aria-hidden="true"></i></div><img
                                                                            class="img-fluid bg-img"
                                                                            src="/chat/images/gallery/4.jpg"
                                                                            alt="portfolio-image" />
                                                                    </a></div>
                                                            </div>
                                                        </div>
                                                        <div class="media-small isotopeSelector filter fashion">
                                                            <div class="overlay">
                                                                <div class="border-portfolio"><a
                                                                        href="/chat/images/gallery/5.jpg">
                                                                        <div class="overlay-background"><i
                                                                                class="ti-plus"
                                                                                aria-hidden="true"></i></div><img
                                                                            class="img-fluid bg-img"
                                                                            src="/chat/images/gallery/5.jpg"
                                                                            alt="portfolio-image" />
                                                                    </a></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <h5 class="block-title">30/04/2020
                                                <label class="badge badge-primary sm ms-2">2</label>
                                            </h5>
                                            <div class="block-content">
                                                <div class="row share-media zoom-gallery">
                                                    <div class="col-4 isotopeSelector filter">
                                                        <div class="media-big">
                                                            <div class="overlay">
                                                                <div class="border-portfolio"><a
                                                                        href="/chat/images/gallery/1.jpg">
                                                                        <div class="overlay-background"><i
                                                                                class="ti-plus"
                                                                                aria-hidden="true"></i></div><img
                                                                            class="img-fluid bg-img"
                                                                            src="/chat/images/gallery/1.jpg"
                                                                            alt="portfolio-image" />
                                                                    </a></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-4">
                                                        <div class="media-small isotopeSelector filter">
                                                            <div class="overlay">
                                                                <div class="border-portfolio"><a
                                                                        href="/chat/images/gallery/2.jpg">
                                                                        <div class="overlay-background"><i
                                                                                class="ti-plus"
                                                                                aria-hidden="true"></i></div><img
                                                                            class="img-fluid bg-img"
                                                                            src="/chat/images/gallery/2.jpg"
                                                                            alt="portfolio-image" />
                                                                    </a></div>
                                                            </div>
                                                        </div>
                                                        <div class="media-small isotopeSelector filter">
                                                            <div class="overlay">
                                                                <div class="border-portfolio"><a
                                                                        href="/chat/images/gallery/3.jpg">
                                                                        <div class="overlay-background"><i
                                                                                class="ti-plus"
                                                                                aria-hidden="true"></i></div><img
                                                                            class="img-fluid bg-img"
                                                                            src="/chat/images/gallery/3.jpg"
                                                                            alt="portfolio-image" />
                                                                    </a></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-4">
                                                        <div class="media-small isotopeSelector filter">
                                                            <div class="overlay">
                                                                <div class="border-portfolio"><a
                                                                        href="/chat/images/gallery/4.jpg">
                                                                        <div class="overlay-background"><i
                                                                                class="ti-plus"
                                                                                aria-hidden="true"></i></div><img
                                                                            class="img-fluid bg-img"
                                                                            src="/chat/images/gallery/4.jpg"
                                                                            alt="portfolio-image" />
                                                                    </a></div>
                                                            </div>
                                                        </div>
                                                        <div class="media-small isotopeSelector filter fashion">
                                                            <div class="overlay">
                                                                <div class="border-portfolio"><a
                                                                        href="/chat/images/gallery/5.jpg">
                                                                        <div class="overlay-background"><i
                                                                                class="ti-plus"
                                                                                aria-hidden="true"></i></div><img
                                                                            class="img-fluid bg-img"
                                                                            src="/chat/images/gallery/5.jpg"
                                                                            alt="portfolio-image" />
                                                                    </a></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-4">
                                                        <div class="media-small isotopeSelector filter">
                                                            <div class="overlay">
                                                                <div class="border-portfolio"><a
                                                                        href="/chat/images/gallery/2.jpg">
                                                                        <div class="overlay-background"><i
                                                                                class="ti-plus"
                                                                                aria-hidden="true"></i></div><img
                                                                            class="img-fluid bg-img"
                                                                            src="/chat/images/gallery/2.jpg"
                                                                            alt="portfolio-image" />
                                                                    </a></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-4">
                                                        <div class="media-small isotopeSelector filter">
                                                            <div class="overlay">
                                                                <div class="border-portfolio"><a
                                                                        href="/chat/images/gallery/3.jpg">
                                                                        <div class="overlay-background"><i
                                                                                class="ti-plus"
                                                                                aria-hidden="true"></i></div><img
                                                                            class="img-fluid bg-img"
                                                                            src="/chat/images/gallery/3.jpg"
                                                                            alt="portfolio-image" />
                                                                    </a></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-4">
                                                        <div class="media-small isotopeSelector filter">
                                                            <div class="overlay">
                                                                <div class="border-portfolio"><a
                                                                        href="/chat/images/gallery/4.jpg">
                                                                        <div class="overlay-background"><i
                                                                                class="ti-plus"
                                                                                aria-hidden="true"></i></div><img
                                                                            class="img-fluid bg-img"
                                                                            src="/chat/images/gallery/4.jpg"
                                                                            alt="portfolio-image" />
                                                                    </a></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <h5 class="block-title">10/01/2020
                                                <label class="badge badge-primary sm ms-2">2</label>
                                            </h5>
                                            <div class="block-content">
                                                <div class="row share-media zoom-gallery">
                                                    <div class="col-4 isotopeSelector filter">
                                                        <div class="media-big">
                                                            <div class="overlay">
                                                                <div class="border-portfolio"><a
                                                                        href="/chat/images/gallery/1.jpg">
                                                                        <div class="overlay-background"><i
                                                                                class="ti-plus"
                                                                                aria-hidden="true"></i></div><img
                                                                            class="img-fluid bg-img"
                                                                            src="/chat/images/gallery/1.jpg"
                                                                            alt="portfolio-image" />
                                                                    </a></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-4">
                                                        <div class="media-small isotopeSelector filter">
                                                            <div class="overlay">
                                                                <div class="border-portfolio"><a
                                                                        href="/chat/images/gallery/2.jpg">
                                                                        <div class="overlay-background"><i
                                                                                class="ti-plus"
                                                                                aria-hidden="true"></i></div><img
                                                                            class="img-fluid bg-img"
                                                                            src="/chat/images/gallery/2.jpg"
                                                                            alt="portfolio-image" />
                                                                    </a></div>
                                                            </div>
                                                        </div>
                                                        <div class="media-small isotopeSelector filter">
                                                            <div class="overlay">
                                                                <div class="border-portfolio"><a
                                                                        href="/chat/images/gallery/3.jpg">
                                                                        <div class="overlay-background"><i
                                                                                class="ti-plus"
                                                                                aria-hidden="true"></i></div><img
                                                                            class="img-fluid bg-img"
                                                                            src="/chat/images/gallery/3.jpg"
                                                                            alt="portfolio-image" />
                                                                    </a></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-4">
                                                        <div class="media-small isotopeSelector filter">
                                                            <div class="overlay">
                                                                <div class="border-portfolio"><a
                                                                        href="/chat/images/gallery/4.jpg">
                                                                        <div class="overlay-background"><i
                                                                                class="ti-plus"
                                                                                aria-hidden="true"></i></div><img
                                                                            class="img-fluid bg-img"
                                                                            src="/chat/images/gallery/4.jpg"
                                                                            alt="portfolio-image" />
                                                                    </a></div>
                                                            </div>
                                                        </div>
                                                        <div class="media-small isotopeSelector filter fashion">
                                                            <div class="overlay">
                                                                <div class="border-portfolio"><a
                                                                        href="/chat/images/gallery/5.jpg">
                                                                        <div class="overlay-background"><i
                                                                                class="ti-plus"
                                                                                aria-hidden="true"></i></div><img
                                                                            class="img-fluid bg-img"
                                                                            src="/chat/images/gallery/5.jpg"
                                                                            alt="portfolio-image" />
                                                                    </a></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-4">
                                                        <div class="media-small isotopeSelector filter">
                                                            <div class="overlay">
                                                                <div class="border-portfolio"><a
                                                                        href="/chat/images/gallery/2.jpg">
                                                                        <div class="overlay-background"><i
                                                                                class="ti-plus"
                                                                                aria-hidden="true"></i></div><img
                                                                            class="img-fluid bg-img"
                                                                            src="/chat/images/gallery/2.jpg"
                                                                            alt="portfolio-image" />
                                                                    </a></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-4">
                                                        <div class="media-small isotopeSelector filter">
                                                            <div class="overlay">
                                                                <div class="border-portfolio"><a
                                                                        href="/chat/images/gallery/3.jpg">
                                                                        <div class="overlay-background"><i
                                                                                class="ti-plus"
                                                                                aria-hidden="true"></i></div><img
                                                                            class="img-fluid bg-img"
                                                                            src="/chat/images/gallery/3.jpg"
                                                                            alt="portfolio-image" />
                                                                    </a></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-4">
                                                        <div class="media-small isotopeSelector filter">
                                                            <div class="overlay">
                                                                <div class="border-portfolio"><a
                                                                        href="/chat/images/gallery/4.jpg">
                                                                        <div class="overlay-background"><i
                                                                                class="ti-plus"
                                                                                aria-hidden="true"></i></div><img
                                                                            class="img-fluid bg-img"
                                                                            src="/chat/images/gallery/4.jpg"
                                                                            alt="portfolio-image" />
                                                                    </a></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="tab2">
                                    <div class="link-group">
                                        <div class="media"><i data-feather="link"></i>
                                            <div class="media-body">
                                                <h5 class="mt-0">Jquery Template</h5>
                                                <h6>12:05 PM Today </h6>
                                            </div>
                                        </div><a
                                            href="https://themeforest.net/item/endless-react-admin-template/25365098">https://themeforest.net/item/endless-react-admin-template</a>
                                        <div class="media"><img class="img-fluid"
                                                src="/chat/images/file_icons/12.png" alt="media-img" />
                                            <div class="media-body">
                                                <h5>React Template</h5>
                                                <h6 class="mt-0">Functionality integration project.</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="link-group">
                                        <div class="media"><i data-feather="link"></i>
                                            <div class="media-body">
                                                <h5 class="mt-0">Multikart Template</h5>
                                                <h6>05:12 AM Today</h6>
                                            </div>
                                        </div><a
                                            href="https://themeforest.net/item/multikart-responsive-vuejs-ecommerce-template/25174665">https://themeforest.net/item/multikart-responsive-template</a>
                                        <div class="media"><img class="img-fluid"
                                                src="/chat/images/file_icons/3.png" alt="media-img" />
                                            <div class="media-body">
                                                <h5>Multipurpose Vuejs.</h5>
                                                <h6 class="mt-0">Template is a multi-use Vue template.</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="link-group">
                                        <div class="media"><i data-feather="link"></i>
                                            <div class="media-body">
                                                <h5 class="mt-0">Unice-Multipurpose</h5>
                                                <h6>03:26 PM</h6>
                                            </div>
                                        </div><a
                                            href="https://themeforest.net/item/unice-angular-multipurpose-template/24776272">https://themeforest.net/item/unice-angular-template</a>
                                        <div class="media"><img class="img-fluid"
                                                src="/chat/images/file_icons/8.png" alt="media-img" />
                                            <div class="media-body">
                                                <h5>Angular Template.</h5>
                                                <h6 class="mt-0">Unice is a Perfect Respon.</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="link-group">
                                        <div class="media"><i data-feather="link"></i>
                                            <div class="media-body">
                                                <h5 class="mt-0">Endless-Angular</h5>
                                                <h6>02:26 AM</h6>
                                            </div>
                                        </div><a
                                            href="https://themeforest.net/item/endless-angular-admin-template/23884779">https://themeforest.net/item/endless-angular-admin-template</a>
                                        <div class="media"><img class="img-fluid"
                                                src="/chat/images/file_icons/12.png" alt="media-img" />
                                            <div class="media-body">
                                                <h5>Endless Document.</h5>
                                                <h6 class="mt-0">Help you understand angular.</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="link-group">
                                        <div class="media"><i data-feather="link"></i>
                                            <div class="media-body">
                                                <h5 class="mt-0">Bigdeal-eCommerce</h5>
                                                <h6>04:00 PM</h6>
                                            </div>
                                        </div><a
                                            href="https://themeforest.net/item/bigdeal-ecommerce-htms-template/24809149">https://themeforest.net/item/bigdeal-ecommerce-template</a>
                                        <div class="media"><img class="img-fluid"
                                                src="/chat/images/file_icons/9.png" alt="media-img" />
                                            <div class="media-body">
                                                <h5>HTML Template.</h5>
                                                <h6 class="mt-0">eCommerce HTML Template.</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="link-group">
                                        <div class="media"><i data-feather="link"></i>
                                            <div class="media-body">
                                                <h5 class="mt-0">Multikart-Responsive.</h5>
                                                <h6>11:05 PM</h6>
                                            </div>
                                        </div><a
                                            href="https://themeforest.net/item/multikart-responsive-react-ecommerce-template/23067773">https://themeforest.net/item/multikart-responsive-react-ecommerce</a>
                                        <div class="media"><img class="img-fluid"
                                                src="/chat/images/file_icons/3.png" alt="media-img" />
                                            <div class="media-body">
                                                <h5>Multipurp eComme.</h5>
                                                <h6 class="mt-0">Well with multi-purpose websites.</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="link-group">
                                        <div class="media"><i data-feather="link"></i>
                                            <div class="media-body">
                                                <h5 class="mt-0">Creative - Responsive</h5>
                                                <h6>12:26 PM</h6>
                                            </div>
                                        </div><a
                                            href="https://themeforest.net/item/creative-responsive-admin-template/24978419">https://themeforest.net/item/creative-responsive</a>
                                        <div class="media"><img class="img-fluid"
                                                src="/chat/images/file_icons/11.png" alt="media-img" />
                                            <div class="media-body">
                                                <h5>Dashboard Templa.</h5>
                                                <h6 class="mt-0">Creative Admin is a full featured.</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="link-group">
                                        <div class="media"><i data-feather="link"></i>
                                            <div class="media-body">
                                                <h5 class="mt-0">eComme Template</h5>
                                                <h6>12:26 PM</h6>
                                            </div>
                                        </div><a
                                            href="https://themeforest.net/item/multikart-responsive-angular-ecommerce-template/22905358">https://themeforest.net/item/multikart-responsive-angular</a>
                                        <div class="media"><img class="img-fluid"
                                                src="/chat/images/file_icons/3.png" alt="media-img" />
                                            <div class="media-body">
                                                <h5>Responsive Ang.</h5>
                                                <h6 class="mt-0">Multikart – Multipurpose.</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="link-group">
                                        <div class="media">
                                            <div class="media"></div><i data-feather="link"></i>
                                            <div class="media-body">
                                                <h5 class="mt-0">Multikart Templat.</h5>
                                                <h6>12:26 PM</h6>
                                            </div>
                                        </div><a
                                            href="https://themeforest.net/item/multikart-responsive-ecommerce-htms-template/22809967">https://themeforest.net/item/multikart-responsive-ecommerce</a>
                                        <div class="media"><img class="img-fluid"
                                                src="/chat/images/file_icons/10.png" alt="media-img" />
                                            <div class="media-body">
                                                <h5>Multi Responsive.</h5>
                                                <h6 class="mt-0">Ecommerce HTML Theme.</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="link-group">
                                        <div class="media">
                                            <div class="media"></div><i data-feather="link"></i>
                                            <div class="media-body">
                                                <h5 class="mt-0">BigBoost Template</h5>
                                                <h6>04:26 PM</h6>
                                            </div>
                                        </div><a
                                            href="https://themeforest.net/item/bigboost-ecommerce-htms-template/24168053">https://themeforest.net/item/bigboost-ecommerce-htms-template</a>
                                        <div class="media"><img class="img-fluid"
                                                src="/chat/images/file_icons/7.png" alt="media-img" />
                                            <div class="media-body">
                                                <h5>Fully Responsive.</h5>
                                                <h6 class="mt-0">Multiple Header Varations.</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="link-group">
                                        <div class="media"><i data-feather="link"></i>
                                            <div class="media-body">
                                                <h5 class="mt-0">App Landing </h5>
                                                <h6>10:05 PM 20/05/2019</h6>
                                            </div>
                                        </div><a
                                            href="https://themeforest.net/item/unice-app-landing-corporate-and-portfolio-multipurpose-template/24581311">https://themeforest.net/item/unice-app-landing-corporate-and-portfolio-multipurpose-template</a>
                                        <div class="media"><img class="img-fluid"
                                                src="/chat/images/file_icons/4.png" alt="media-img" />
                                            <div class="media-body">
                                                <h5>Multi-Purpos theme.</h5>
                                                <h6 class="mt-0">Unice is a Perfect Responsive.</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="link-group">
                                        <div class="media"><i data-feather="link"></i>
                                            <div class="media-body">
                                                <h5 class="mt-0">Reno - Tools Store</h5>
                                                <h6>12:26 PM</h6>
                                            </div>
                                        </div><a
                                            href="https://themeforest.net/item/reno-multipurpose-htms-template/24141678">https://themeforest.net/item/reno-multipurpose-htms-template</a>
                                        <div class="media"><img class="img-fluid"
                                                src="/chat/images/file_icons/6.png" alt="media-img" />
                                            <div class="media-body">
                                                <h5>Reno Template is a busines.</h5>
                                                <h6 class="mt-0">Android Mobile or tablets.</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="link-group">
                                        <div class="media"><i data-feather="link"></i>
                                            <div class="media-body">
                                                <h5 class="mt-0">Shop - Mart</h5>
                                                <h6>12:26 PM 03/11/2019</h6>
                                            </div>
                                        </div><a
                                            href="https://themeforest.net/item/shopmart-multipurpose-shopify-theme/24040917?s_rank=12">https://themeforest.net/item/shopmart-multipurpose-shopify-theme</a>
                                        <div class="media"><img class="img-fluid"
                                                src="/chat/images/file_icons/5.png" alt="media-img" />
                                            <div class="media-body">
                                                <h5>Shop Mart Landing Page.</h5>
                                                <h6 class="mt-0">This is App Landing Template.</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="tab3">
                                    <ul class="chat-main">
                                        <li>
                                            <div class="chat-box">
                                                <div class="media">
                                                    <div class="profile"><a
                                                            class="icon-btn btn-outline-danger btn-xl pull-right rouded15"
                                                            href="#"><i class="fa fa-file-code-o"></i></a></div>
                                                    <div class="details">
                                                        <h5>messenger.html</h5>
                                                        <h6>2, octomber 2019</h6>
                                                    </div>
                                                    <div class="media-body"><a
                                                            class="icon-btn btn-outline-light btn-sm pull-right"
                                                            href="/chat/doc/messenger.html" target="_blank"><i
                                                                data-feather="download"></i></a></div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="chat-box">
                                                <div class="media">
                                                    <div class="profile"><a
                                                            class="icon-btn btn-outline-success btn-xl pull-right rouded15"
                                                            href="#"><i class="fa fa-file-video-o"></i></a></div>
                                                    <div class="details">
                                                        <h5>chapter1.MP4</h5>
                                                        <h6>3, Octomber 2019</h6>
                                                    </div>
                                                    <div class="media-body"><a
                                                            class="icon-btn btn-outline-light btn-sm pull-right"
                                                            href="/chat/doc/chapter1.MP4" target="_blank"><i
                                                                data-feather="download"></i></a></div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="chat-box">
                                                <div class="media">
                                                    <div class="profile"><a
                                                            class="icon-btn btn-outline-primary btn-xl pull-right rouded15"
                                                            href="#"><i class="fa fa-file-word-o"></i></a></div>
                                                    <div class="details">
                                                        <h5>salary.xlsx</h5>
                                                        <h6>5, Octomber 2019</h6>
                                                    </div>
                                                    <div class="media-body"><a
                                                            class="icon-btn btn-outline-light btn-sm pull-right"
                                                            href="/chat/doc/salary.xlsx" target="_blank"><i
                                                                data-feather="download"></i></a></div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="chat-box">
                                                <div class="media">
                                                    <div class="profile"><a
                                                            class="icon-btn btn-outline-warning btn-xl pull-right rouded15"
                                                            href="#"><i class="fa fa-file-pdf-o"></i></a></div>
                                                    <div class="details">
                                                        <h5>document.pdf</h5>
                                                        <h6>7, Octomber 2019</h6>
                                                    </div>
                                                    <div class="media-body"><a
                                                            class="icon-btn btn-outline-light btn-sm pull-right"
                                                            href="/chat/doc/document.pdf" target="_blank"><i
                                                                data-feather="download"></i></a></div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="chat-box">
                                                <div class="media">
                                                    <div class="profile"><a
                                                            class="icon-btn btn-outline-danger btn-xl pull-right rouded15"
                                                            href="#"><i class="fa fa-file-text-o"></i></a></div>
                                                    <div class="details">
                                                        <h5>details.txt</h5>
                                                        <h6>20, Octomber 2019</h6>
                                                    </div>
                                                    <div class="media-body"><a
                                                            class="icon-btn btn-outline-light btn-sm pull-right"
                                                            href="/chat/doc/details.txt" target="_blank"><i
                                                                data-feather="download"></i></a></div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="chat-box">
                                                <div class="media">
                                                    <div class="profile"><a
                                                            class="icon-btn btn-outline-success btn-xl pull-right rouded15"
                                                            href="#"><i class="fa fa-file-code-o"></i></a></div>
                                                    <div class="details">
                                                        <h5>messenger.html</h5>
                                                        <h6>2, octomber 2019</h6>
                                                    </div>
                                                    <div class="media-body"><a
                                                            class="icon-btn btn-outline-light btn-sm pull-right"
                                                            href="/chat/doc/messenger.html" target="_blank"><i
                                                                data-feather="download"></i></a></div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li id="notes">
                        <div class="notes-main">
                            <div class="theme-title">
                                <div class="media">
                                    <div>
                                        <h2>Notes</h2>
                                        <h4>Notes List</h4>
                                    </div>
                                    <div class="media-body media-body text-end"><a
                                            class="icon-btn btn-sm btn-outline-light close-apps" href="#"><i
                                                data-feather="x"></i></a></div>
                                </div>
                            </div>
                            <form class="default-form">
                                <div class="form-group notes-content">
                                    <select>
                                        <option>Contact Or Channel</option>
                                        <option>Weekdays (Mon-Fri)</option>
                                        <option>Daily</option>
                                        <option>Weekly (Custom)</option>
                                    </select>
                                    <ul>
                                        <li><a class="icon-btn btn-light button-effect btn-sm" data-bs-toggle="modal"
                                                data-bs-target="#notesModal"><i data-feather="plus"></i></a></li>
                                    </ul>
                                </div>
                            </form>
                            <div class="notes-list">
                                <h6 class="mb-2 text-muted">Joshephin Water.10 Jan</h6>
                                <div class="media"><img class="img-fluid me-3"
                                        src="/chat/images/file_icons/5.png" alt="media-img" />
                                    <div class="media-body">
                                        <h5 class="mt-0">Joshephin Water</h5>
                                    </div>
                                </div>
                                <h5 class="mb-2">Imporatnt project link</h5>
                                <h6 class="mb-2">Please start testing task of your projects.</h6>
                                <div class="forward-main"><a class="line fa fa-mail-forward" href="#">Forward </a>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li id="reminder">
                        <div class="reminder-main">
                            <div class="theme-title">
                                <div class="media">
                                    <div>
                                        <h2>Reminders</h2>
                                        <h4>Set reminders</h4>
                                    </div>
                                    <div class="media-body media-body text-end"><a
                                            class="icon-btn btn-sm btn-outline-light close-apps" href="#"><i
                                                data-feather="x"></i></a></div>
                                </div>
                            </div>
                            <div class="reminder-content tab-card"><i class="ti-alarm-clock"></i>
                                <p>Never forget important tasks. Set personal and group reminders.</p><a
                                    class="setreminder btn btn-primary button-effect btn-sm" data-bs-toggle="modal"
                                    data-bs-target="#setReminder">set reminder</a>
                            </div>
                            <div class="reminder-list-disp">
                                <h5>Themeforest Discusssion</h5>
                                <h6>Project Discussion</h6><span>11:22 PM | 15 FAB</span>
                                <ul class="reminder-disp">
                                    <li class="reminder-list-toggle"><a class="icon-btn bg-transparent" href="#"><i
                                                data-feather="more-vertical"></i></a>
                                        <div class="reminder-contentlist-toggle">
                                            <ul>
                                                <li><a class="icon-btn btn-sm" href="#"><i data-feather="trash"></i></a>
                                                    <h5>Delete</h5>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="reminder-list">
                                <button class="Show-reminder">Show Completed</button>
                                <button class="Hide-reminder">Hide Completed</button>
                                <div class="target-reminder-list">
                                    <h5>Session Start</h5>
                                    <h6>Project Discussion</h6>
                                    <h6>05:22 PM | 1 JAN</h6>
                                    <ul class="reminder-disp">
                                        <li class="reminder-toggle"><a class="icon-btn bg-transparent" href="#"
                                                data-tippy-content="Quick action"><i data-feather="more-vertical"></i></a>
                                            <div class="reminder-content-toggle">
                                                <ul>
                                                    <li><a class="icon-btn btn-sm" href="#"><i
                                                                data-feather="trash"></i></a>
                                                        <h5>Delete</h5>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="app-list">
                <ul class="app-list-ul custom-scroll">
                    <li class="title apps-toggle"><i data-feather="grid"></i>
                        <h5>Apps</h5>
                    </li>
                    <li><a class="icon-btn btn-outline-success btn-sm button-effect" href="files"><i
                                data-feather="file"></i></a>
                        <h5>Files </h5>
                    </li>
                    <li><a class="icon-btn btn-outline-primary btn-sm button-effect" href="notes"><i
                                data-feather="book"></i></a>
                        <h5>Notes </h5>
                    </li>
                    <li><a class="icon-btn btn-outline-danger btn-sm button-effect" href="todo"><i
                                data-feather="list"></i></a>
                        <h5>Todo </h5>
                    </li>
                    <li><a class="icon-btn btn-outline-warning btn-sm button-effect" href="reminder"><i
                                data-feather="clock"></i></a>
                        <h5>Reminder</h5>
                    </li>
                    <li class="close-app"><a class="icon-btn btn-danger" href="#" onclick="removedefault()"><i
                                data-feather="x"></i></a>
                        <h5>close</h5>
                    </li>
                </ul>
            </div>
        </aside>
    </div>
    <div class="modal fade add-popup add-contact-modal" id="exampleModalCenter" tabindex="-1" role="dialog"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title">
                        Add Contact</h2>
                    <button class="close" type="button" data-bs-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                </div>
                <div class="modal-body">
                    <form class="default-form" id="addContactForm">
                        <div class="form-group">
                            <h5>Email or Username</h5>
                            <input class="form-control" id="exampleInputEmail1" type="text" placeholder="John Doe" />
                            <span class="text-danger addContactError"></span>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-danger button-effect btn-sm" type="button"
                        data-bs-dismiss="modal">Cancel</button>
                    <button class="btn btn-primary button-effect btn-sm" type="button" onclick="addContact()">Add
                        contact</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal pol-modal-main add-popup" id="pollModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title"><i data-feather="bar-chart-2"></i>poll</h2>
                    <button class="close" type="button" data-bs-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                </div>
                <div class="modal-body">
                    <form class="default-form">
                        <h3>create poll</h3>
                        <div class="form-group">
                            <input class="form-control" type="text" placeholder="ask que" />
                            <input class="form-control" type="text" placeholder="add commatn" />
                        </div>
                        <div class="form-group">
                            <input class="form-control" type="text" placeholder="option 1" />
                            <input class="form-control" type="text" placeholder="option 2" /><a class="add-option"
                                href="#">add an option</a>
                        </div>
                        <div class="form-group">
                            <div class="post-poll">
                                <ul>
                                    <li>post poll in
                                        <p class="pt-0">test name</p>
                                    </li>
                                    <li>poll expier in 7 days
                                        <p class="pt-0">test name</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="allow-group">
                                <input class="allow-check" type="checkbox" />Allow users to vote anonymously
                            </div>
                        </div>
                        <div class="creat-poll-btn"><a class="btn btn-primary button-effect btn-sm" href="#"
                                data-bs-dismiss="modal" aria-label="Close">Create poll</a></div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div class="modal notes-modal-main add-popup" id="notesModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title"><i class="ti-bookmark-alt"></i>notes</h2>
                    <button class="close" type="button" data-bs-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                </div>
                <div class="modal-body custom-scroll p-0">
                    <div class="card">
                        <div class="card-header">
                            <h5>Inline Editor</h5>
                        </div>
                        <div class="card-body">
                            <div class="cke_editable cke_editable_inline cke_contents_ltr cke_show_borders" id="area1"
                                contenteditable="true" tabindex="0" spellcheck="false" role="textbox"
                                aria-label="Rich Text Editor, area1" title="Rich Text Editor, area1">
                                <h1>Your title</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at vulputate urna, sed
                                    dignissim arcu. Aliquam at ligula imperdiet, faucibus ante a, interdum enim. Sed in
                                    mauris a lectus lobortis condimentum. Sed in nunc magna. Quisque massa urna, cursus
                                    vitae commodo eget, rhoncus nec erat. Sed sapien turpis, elementum sit amet elit vitae,
                                    elementum gravida eros. In ornare tempus nibh ut lobortis. Nam venenatis justo ex, vitae
                                    vulputate neque laoreet a.</p>
                            </div>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-danger button-effect btn-sm" type="button">Save</button>
                            <button class="btn btn-primary button-effect btn-sm" type="button"
                                data-bs-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal reminder-modal-main add-popup" id="setReminder" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title">
                        Set redminders</h2>
                    <button class="close" type="button" data-bs-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                </div>
                <div class="modal-body">
                    <form class="form default-form">
                        <div class="lable">Reminder for (Groups or contacts)</div>
                        <div class="form-group">
                            <input class="form-control" type="text" placeholder="contact or channel" />
                        </div>
                        <div class="lable">Remind about</div>
                        <div class="form-group">
                            <textarea class="form-control dib" rows="3" placeholder="Some details about task"></textarea>
                        </div>
                        <div class="lable">Remind about</div>
                        <div class="form-group">
                            <ul class="reminder-count">
                                <li class="active">
                                    <div class="reminder-box">
                                        <h3 class="remi-num">15</h3>
                                        <h5 class="remi-val">minutes</h5>
                                    </div>
                                </li>
                                <li>
                                    <div class="reminder-box">
                                        <h3 class="remi-num">1</h3>
                                        <h5 class="remi-val">hour</h5>
                                    </div>
                                </li>
                                <li>
                                    <div class="reminder-box">
                                        <h3 class="remi-num">5 PM</h3>
                                        <h5 class="remi-val">today</h5>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="form-group mb-0">
                            <div class="lable">select custom time</div>
                            <div class="custom-remider-main">
                                <div class="custom-remider-content">
                                    <div class="custom-reminder-inline">
                                        <input class="form-control" type="date" />
                                        <input class="form-control" type="time" />
                                    </div>
                                    <div class="custom-reminder-block">
                                        <select>
                                            <option>Do not repeat</option>
                                            <option>Weekdays (Mon-Fri)</option>
                                            <option>Daily</option>
                                            <option>Weekly (Custom)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="reminder-btn"><a class="btn btn-primary button-effect">set reminder</a></div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div class="modal photo-modal-main add-popup" id="photoRequestModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title"><i class="fa fa-image"></i>photo request</h2>
                    <button class="close" type="button" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form class="default-form">
                        <!-- <h3>creat snippets</h3> -->
                        <div class="form-group">
                            <input class="form-control title" type="text" placeholder="Title" />
                        </div>

                        <div class="form-group">
                            <textarea class="form-control description" rows="5" placeholder="Description"></textarea>
                        </div>
                        <div class="form-group">
                            <input class="form-control mb-0 price" type="number" placeholder="Price($)" />
                        </div>
                        <div class="form-group mb-0">
                            <div class="btn-snipate">
                                <a class="btn btn-danger button-effect btn-sm me-3" href="#" data-bs-dismiss="modal"
                                    aria-label="Close">Cancel</a>
                                <a class="btn btn-primary button-effect btn-sm" href="#" data-bs-dismiss="modal"
                                    aria-label="Close" onclick="sendPhotoRequest();">Send Request</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="audiocall" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-body">
                <div class="audiocall1 call-modal"><img class="bg-img"
                        src="/chat/images/avtar/big/audiocall.jpg" alt="Avatar" />
                    <div class="center-con text-center">
                        <div class="title2">John Doe</div>
                        <h6>log angelina california</h6>
                        <ul>
                            <li><a class="icon-btn btn-success button-effect btn-xl is-animating" href="#"
                                    data-bs-toggle="modal" data-bs-target="#audiorcvcall" data-bs-dismiss="modal"> <i
                                        data-feather="phone"></i></a></li>
                            <li> <a class="icon-btn btn-danger button-effect btn-xl is-animating cancelcall" href="#"
                                    data-bs-dismiss="modal"> <i data-feather="phone"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="viddiolog modal fade" id="videocall" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-body">
                <div class="videocall call-modal"><img class="bg-img"
                        src="/chat/images/avtar/big/videocall_bg.jpg" alt="Avatar" />
                    <div class="small-image"><img class="bg-img" src="/chat/images/avtar/big/videocall.jpg"
                            alt="Avatar" />
                    </div>
                    <div class="media videocall-details">
                        <div class="usersprof">
                            <div class="profile"><img class="bg-img" src="/chat/images/avtar/2.jpg"
                                    alt="Avatar" /></div>
                            <div class="profile"><img class="bg-img" src="/chat/images/avtar/3.jpg"
                                    alt="Avatar" /></div>
                        </div>
                        <div class="media-body">
                            <h5>John Doe</h5>
                            <h6>America ,California</h6>
                        </div>
                        <div id="basicUsage">00:00:00</div>
                        <div class="zoomcontent"><a class="text-dark" href="#!"
                                onclick="javascript:toggleFullScreen()" data-tippy-content="Zoom Screen"><img
                                    src="/chat/images/logo/maximize.svg" alt="zoom screen" /></a></div>
                    </div>
                    <div class="center-con text-center">
                        <ul>
                            <li><a class="icon-btn btn-light button-effect pause" href="#" data-tippy-content="Hold"><i
                                        class="ti-control-pause"></i></a></li>
                            <li><a class="icon-btn btn-danger button-effect btn-xl is-animating" href="#"
                                    data-bs-dismiss="modal" data-tippy-content="Hangup"> <i data-feather="phone"></i></a>
                            </li>
                            <li><a class="icon-btn btn-light button-effect mic" href="#" data-tippy-content="Mute"><i
                                        class="fa fa-microphone"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="confercall" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-body">
                <div class="conferencecall call-modal"><img class="bg-img"
                        src="/chat/images/avtar/big/audiocall.jpg" alt="Avatar" />
                    <div class="center-con text-center">
                        <div class="usersprof">
                            <div class="profile"><img class="bg-img" src="/chat/images/avtar/2.jpg"
                                    alt="Avatar" /></div>
                            <div class="profile"><img class="bg-img" src="/chat/images/avtar/3.jpg"
                                    alt="Avatar" /></div>
                            <div class="profile"><img class="bg-img" src="/chat/images/avtar/5.jpg"
                                    alt="Avatar" /></div>
                            <div class="profile"><img class="bg-img"
                                    src="/chat/images/avtar/big/videocall_bg.jpg" alt="Avatar" /></div>
                        </div>
                        <p>Incoming Call</p>
                        <h3>Conference Call</h3>
                        <ul>
                            <li> <a class="icon-btn btn-danger button-effect btn-xl is-animating cancelcall" href="#"
                                    data-bs-dismiss="modal"> <i data-feather="phone"></i></a></li>
                            <li><a class="icon-btn btn-success button-effect btn-xl is-animating" href="#"> <i
                                        data-feather="video"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="confvideocl" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="row confimg">
                        <div class="col-6">
                            <div class="vclimg"><img class="bg-img"
                                    src="/chat/images/avtar/big/videocall_bg.jpg" alt="Avatar" /></div>
                        </div>
                        <div class="col-6">
                            <div class="vclimg"><img class="bg-img" src="/chat/images/avtar/5.jpg"
                                    alt="Avatar" /></div>
                        </div>
                        <div class="col-6">
                            <div class="vclimg"><img class="bg-img" src="/chat/images/avtar/2.jpg"
                                    alt="Avatar" /></div>
                        </div>
                        <div class="col-6">
                            <div class="vclimg"><img class="bg-img" src="/chat/images/avtar/3.jpg"
                                    alt="Avatar" /></div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer clfooter">
                    <div id="basicUsage3">00:00:00</div>
                    <ul>
                        <li><a class="icon-btn btn-light button-effect" href="#" data-tippy-content="speaker"><i
                                    data-feather="volume-2"></i></a></li>
                        <li><a class="icon-btn btn-light button-effect" href="#" data-tippy-content="Camera"><i
                                    data-feather="camera-off"></i></a></li>
                        <li><a class="icon-btn btn-light button-effect" href="#" data-tippy-content="Add Call"><i
                                    data-feather="user-plus"></i></a></li>
                        <li><a class="icon-btn btn-danger button-effect btn-sm is-animating" href="#"
                                data-bs-dismiss="modal" data-tippy-content="Hangup"><i data-feather="phone"></i></a></li>
                        <li><a class="icon-btn btn-light button-effect" href="#" data-tippy-content="Disable Video"><i
                                    data-feather="video-off"></i></a></li>
                        <li><a class="icon-btn btn-light button-effect mic" href="#" data-tippy-content="Mute"><i
                                    data-feather="mic-off"></i></a></li>
                        <li><a class="icon-btn btn-light button-effect" href="#" data-tippy-content="Hold"><i
                                    data-feather="pause"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade audiorcvcall" id="audiorcvcall" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-body">
                <div class="audiocall2 call-modal"><img class="bg-img"
                        src="/chat/images/avtar/big/audiocall.jpg" alt="Avatar" />
                    <div class="center-con text-center">
                        <div id="basicUsage2">00:00:00</div>
                        <div class="title2">John Doe</div>
                        <h6>log angelina california</h6>
                        <ul>
                            <li><a class="icon-btn btn-light button-effect mute" href="#" data-tippy-content="Mute"><i
                                        class="fa fa-microphone"></i></a></li>
                            <li><a class="icon-btn btn-light button-effect mute" href="#" data-tippy-content="Speaker"><i
                                        class="fa fa-volume-up"></i></a></li>
                            <li><a class="icon-btn btn-danger button-effect btn-xl is-animating" href="#"
                                    data-tippy-content="Hangup" data-bs-dismiss="modal"> <i data-feather="phone"></i></a>
                            </li>
                            <li><a class="icon-btn btn-light button-effect" href="#" data-tippy-content="Add Call"><i
                                        data-feather="user-plus"></i></a></li>
                            <li><a class="icon-btn btn-light button-effect" href="#" data-tippy-content="Pause"><i
                                        data-feather="pause"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade fev-addcall-main add-popup" id="addcallmodal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title">
                        Add Contact</h2>
                    <button class="close" type="button" data-bs-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                </div>
                <div class="modal-body">
                    <form class="default-form">
                        <div class="form-group">
                            <h5>Email or Username</h5>
                            <input class="form-control" id="exampleInputEmail12" type="text" placeholder="John Doe" />
                        </div>
                        <!-- <div class="form-group">
                                                                                                                                                                                                                                                                    <h5>Contact number</h5>
                                                                                                                                                                                                                                                                    <input class="form-control" id="examplemsg2" type="number" placeholder="12345678912"/>
                                                                                                                                                                                                                                                                    </div> -->
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-danger button-effect btn-sm" type="button"
                        data-bs-dismiss="modal">Cancel</button>
                    <!-- <button class="btn btn-primary button-effect btn-sm" type="button" >Add contact</button> -->
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade add-popup todo-main-modal" id="todoModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title">
                        Welcome to Ojochat</h2>
                    <button class="close" type="button" data-bs-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                </div>
                <div class="modal-body">
                    <form class="default-form">
                        <div class="todo-task">
                            <h5>Felling Lonely</h5>
                            <div class="todo-main-content">
                                <div class="form-group">
                                    <input type="checkbox" aria-label="Checkbox for following text input" />
                                    <input class="w-100" id="user_input123" type="text"
                                        placeholder="Fill Your Fillings " />
                                </div>
                                <div class="drop-picker">
                                    <div class="dropdown currency" tabindex="1">
                                        <div class="select"><span>Assign To</span></div>
                                        <input type="hidden" name="currency" />
                                        <ul class="dropdown-menu">
                                            <li class="dropdown-divider">
                                                <div class="fa fa-user text-muted"></div>
                                                <h5 class="text-muted">Assign To</h5>
                                            </li>
                                            <li>John Doe</li>
                                            <li>Lynetin john</li>
                                            <li>Sufiya john</li>
                                            <li>Jhon john</li>
                                        </ul>
                                    </div>
                                    <input class="datepicker-here form-control digits" type="url" data-language="en"
                                        placeholder="Due date" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-danger button-effect btn-sm" type="button">Save</button>
                    <button class="btn btn-primary button-effect btn-sm" type="button"
                        data-bs-dismiss="modal">Cancel</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade add-popup create-todo-main-modal" id="createtodoModal" tabindex="-1" role="dialog"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title">
                        Today's ToDo</h2>
                    <button class="close" type="button" data-bs-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                </div>
                <div class="modal-body">
                    <form class="default-form">
                        <div class="todo-task">
                            <h5>Felling Lonely</h5>
                            <div class="todo-main-content">
                                <div class="form-group">
                                    <input type="checkbox" aria-label="Checkbox for following text input" />
                                    <input class="w-100" id="user_input123" type="text"
                                        placeholder="Fill Your Fillings " />
                                </div>
                                <div class="drop-picker">
                                    <div class="dropdown currency" tabindex="1">
                                        <div class="select"><span>Assign To</span></div>
                                        <input type="hidden" name="currency" />
                                        <ul class="dropdown-menu">
                                            <li class="dropdown-divider">
                                                <div class="fa fa-user text-muted"></div>
                                                <h5 class="text-muted">Assign To</h5>
                                            </li>
                                            <li>John Doe</li>
                                            <li>Lynetin john</li>
                                            <li>Sufiya john</li>
                                            <li>Jhon john</li>
                                        </ul>
                                    </div>
                                    <input class="datepicker-here form-control digits" type="url" data-language="en"
                                        placeholder="Due date" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-danger button-effect btn-sm" type="button">Save</button>
                    <button class="btn btn-primary button-effect btn-sm" type="button"
                        data-bs-dismiss="modal">Cancel</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade add-popup msg-chat-modal" id="msgchatModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title">
                        Create New Message</h2>
                    <button class="close" type="button" data-bs-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                </div>
                <div class="modal-body">
                    <div class="chat-msg-search">
                        <div class="input-group">
                            <input class="form-control" type="text" placeholder="Search"
                                aria-label="Recipient's username" aria-describedby="basic-addon21" />
                            <div class="input-group-append"><span class="input-group-text" id="basic-addon21">@</span>
                            </div>
                        </div>
                    </div>
                    <ul class="chat-main custom-scroll">
                        <li data-to="blank">
                            <div class="chat-box">
                                <div class="profile offline"><img class="bg-img"
                                        src="/chat/images/contact/1.jpg" alt="Avatar" /></div>
                                <div class="details">
                                    <h5>John Doe</h5>
                                    <h6>Hi, i am John. How are you.. ! There are many variations of passages.</h6>
                                </div>
                                <div class="date-status"><i class="ti-pin2"></i>
                                    <h6>22/10/19</h6>
                                    <h6 class="font-success status"> Seen</h6>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade add-popup msg-chat-modal" id="msgcallModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title">
                        Create New Message</h2>
                    <button class="close" type="button" data-bs-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                </div>
                <div class="modal-body">
                    <div class="chat-msg-search">
                        <div class="input-group">
                            <input class="form-control" type="text" placeholder="Search"
                                aria-label="Recipient's username" aria-describedby="basic-addon20" />
                            <div class="input-group-append"><span class="input-group-text" id="basic-addon20">@</span>
                            </div>
                        </div>
                    </div>
                    <ul class="call-log-main custom-scroll">
                        <li class="active">
                            <div class="call-box">
                                <div class="profile offline"><img class="bg-img"
                                        src="/images/default-avatar.png" alt="Avatar" /></div>
                                <div class="details">
                                    <h5>Jony Lynetin</h5>
                                    <h6> <i data-feather="arrow-down-left"></i>3:30 pm</h6>
                                </div>
                                <div class="call-status">
                                    <div class="icon-btn btn-outline-success button-effect btn-sm"><i
                                            data-feather="phone"></i></div>
                                </div>
                            </div>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade add-popup request-modal" id="detailRequestModal" tabindex="-1" role="dialog"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title">Photo Request</h2>
                    <button class="close" type="button" data-bs-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                </div>
                <div class="modal-body">
                    <div class="request-detail">
                        <div class="request-content">
                            <div class="d-flex justify-between">
                                <div class="request-title">I need your photo</div>
                                <div class="request-price">100$</div>
                            </div>
                            <div class="request-description">Hello, DongLong Cui. Nice to meet you. How are you. I am very
                                interested in your photo. Could you send me your photo as 10$ to me? If you agree with my
                                request, I will be very appreciated with your kind support. Thank you very much.</div>
                        </div>

                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-success button-effect btn-sm" id="acceptPhotoRequestBtn" type="button"
                        data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#createPhoto">Accept</button>
                    <button class="btn btn-primary button-effect btn-sm" type="button"
                        data-bs-dismiss="modal ">Raise</button>
                    <button class="btn btn-warning button-effect btn-sm" type="button"
                        data-bs-dismiss="modal">Reject</button>
                    <button class="btn btn-danger button-effect btn-sm" type="button"
                        data-bs-dismiss="modal">Cancel</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade add-popup request-modal" id="createPhoto" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title">Photo Creation</h2>
                    <div class="btn-group d-flex">
                        <input class="input-file" type="file" id="input_file">
                        <img class="input-btn" id="input_btn" src="/images/gallery.png"></button>
                        {{-- <img class="input-btn" id="" src="/images/camera-icon.png"></button> --}}
                        <img class="input-btn" id="input_reset" src="/images/reset.png"></button>
                    </div>
                    <button class="close" type="button" data-bs-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                    <span class="price-mode">Mode:</span>
                    <span class="text-input">Text:</span>
                </div>
                <div class="modal-body">
                    <div class="request-detail">
                        @yield('photoCreation')
                    </div>
                </div>

            </div>
        </div>
    </div>
    <div class="modal fade add-popup request-modal" id="photo_item" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="rate-blur">
                    <div class="photoRating">
                        <div>★</div>
                        <div>★</div>
                        <div>★</div>
                        <div>★</div>
                        <div>★</div>
                    </div>
                    <div>
                        <div class="lock-tool unlock">
                            <a class="icon-btn btn-outline-success outside mb-3" href="#">
                                <i class="fa fa-lock"></i>
                                <i class="fa fa-unlock-alt"></i>
                            </a>
                        </div>
                        <div class="blur-image">
                            <img src="/images/blur.png" alt="">
                            {{-- <input type="range" class="form-range" id="removeBlur" min="0" max="1.5" step="0.1"
                            value="0"> --}}
                        </div>
                    </div>
                </div>
                <div>
                    <canvas id="photo_canvas"></canvas>
                </div>
                <div class="btn-group">
                    <div class="photo-price"></div>
                    <div class="btn previewBtn d-none payWholePriceBtn" title="Preview"><img src="/images/preview.png"
                            alt="Pay"> </div>
                    <div class="btn payBtn" title="Pay"><img src="/images/pay.png" alt="Pay"> </div>
                    <div class="btn sharePhotoBtn disabled" title="Share"><img src="/images/share.png" alt="Share"></div>
                    <div class="btn restoreBtn" title="Restore"><img src="/images/restore.png" alt="Restore"> </div>
                    <div class="btn " href="#" data-bs-dismiss="modal" title="Cancel"><img
                            src="/images/cancel.png" alt="Cancel"></div>
                </div>
                <div class="selected-emojis"></div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="checkoutModal" tabindex="-1" aria-labelledby="checkoutModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="checkoutModalLabel">Photo Payment</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div>
                        <span class="">To: </span>
                        <span class="recipientName"></span>
                    </div>
                    <div>
                        <span class="">Mail:</span>
                        <span class="recipientMail"></span>
                    </div>
                    <div class="product-payment">
                        <div class="product-list">
                            <hr>
                            <hr class="bottom-hr">
                            <div class="total-price">
                                <span>Total: </span>
                                <span> </span>
                            </div>
                        </div>
                        <div class="payment-options">
                            <button type="button" class="btn btn-primary payWithBalanceBtn">Balance</button>
                            <div class="content">
                                <div class="links">
                                    <div id="paypal-button"></div>
                                </div>
                            </div>
                            {{-- <button type="button" class="btn btn-primary">Stripe</button>
                            <button type="button" class="btn btn-primary">Crypto</button> --}}
                        </div>
                    </div>
                </div>
                <!-- <div class="modal-footer">
                                                                                <button type="button" class="btn btn-primary payWholePriceBtn" data-bs-dismiss="modal">OK</button>
                                                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                                                            </div> -->
            </div>
        </div>
    </div>
    <div class="modal fade" id="confirmModal" tabindex="-1" aria-labelledby="confirmModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="confirmModalLabel">Photo Operation</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h3>Continue with payment?</h3>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary payWholePriceBtn" data-bs-dismiss="modal">OK</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                </div>
            </div>
        </div>
    </div>
    <script src="/frontend/js/pages/homepage.js"></script>
    <script src="/frontend/js/pages/requestpage.js"></script>
    <script src="https://www.paypalobjects.com/api/checkout.js"></script>

    <script src="/frontend/js/pages/payment.js"></script>
    <script src="/frontend/js/pages/setting.js"></script>
    <script src="/frontend/js/pages/notification.js"></script>
    <script src="/frontend/js/pages/message.js"></script>

@endsection
