var $contact_active;
var currentContactId;
var contactorInfo = {};
var usersList = [];
var socket;
var typingTime;
var timerId;
$(document).ready(() => {

    socket = io.connect("http://ojochat.com:3000", { query: "currentUserId=" + currentUserId});
    // socket = io.connect("http://localhost:3000", { query: "currentUserId=" + currentUserId });


    socket.on('message', message => {
        var contentwidth = jQuery(window).width();
        if (contentwidth <= '768') {
            $('.chitchat-container').toggleClass("mobile-menu");
        }
        let target = '.contact-chat ul.chatappend';
        message.from = Number(message.from);
        if (message.from == currentUserId || message.from == currentContactId) {
            addChatItem(target, message.from, message);
            $('.typing-m').remove();
            // $(".messages").animate({ scrollTop: $('.contact-chat').height() }, "fast");
        } else {
            // if (currentContactId) {
            //     $(`ul.chat-main li[key=${currentContactId}]`).removeClass('active');
            // }
            // currentContactId = Number(message.from);
            if (!$(`ul.chat-main li[key=${Number(message.from)}]`).length) {
                let senderInfo = usersList.find(item => item.id == Number(message.from));
                let userListTarget = $('.recent-default .recent-chat-list');
                addChatUserListItem(userListTarget, senderInfo);
            }
            // $(`ul.chat-main li[key=${currentContactId}]`).addClass('active');
            // setCurrentChatContent(currentContactId);
        }
    });

    socket.on('receive:typing', data => {
        if (data == currentContactId) {
            typingMessage();
        }
    });
    getRecentChatUsers();
    getUsersList();
    searchAndAddRecentChatList();
    getContactList();
    displayTypingAction();
    // displayChatData();
    $('ul.chat-main.chat-item-list').on('click', 'li', (e) => {
        $('.section-py-space').css('display', 'none');
        $('.app-list').css('display', 'block');
        $('#content').css('display', 'block');
        if (currentContactId) {
            $(`ul.chat-item-list li[key=${currentContactId}]`).removeClass('active');
        }
        currentContactId = Number($(e.currentTarget).attr('key'));
        $(`ul.chat-item-list li[key=${currentContactId}]`).addClass('active');

        setCurrentChatContent(currentContactId);
        var contentwidth = jQuery(window).width();
        if (contentwidth <= '768') {
            $('.chitchat-container').toggleClass("mobile-menu");
        }
    });
    //createPhoto by click Media
    $('#createPhotoBtn').on('click', () => {
        $('#createPhoto').modal('show');
        $('#createPhoto .preview-paid').addClass('d-none');
        $('#createPhoto .emojis-price').removeClass('d-none');
        $('#createPhoto .save-send').css('margin-left', '0px');
    });

    $('#acceptPhotoRequestBtn').on('click', () => {
        // $('#createPhoto').modal('show');
        $('#createPhoto .preview-paid').removeClass('d-none');
        $('#createPhoto .emojis-price').addClass('d-none');
        $('#createPhoto .save-send').css('margin-left', '-20px');

    });


    // $('ul.chat-main.request-list').on('click', 'li', (e) => {
    //     let from = $(e.currentTarget).data('from');
    //     let to = $(e.currentTarget).data('to');
    //     $('#detailRequestModal .request-title').text($(e.currentTarget).find('.title').text());
    //     $('#detailRequestModal .request-description').text($(e.currentTarget).find('.description').val());
    //     $('#detailRequestModal .request-price').text($(e.currentTarget).find('.price').val() + "$");
    // });
    $('#profileImageUploadBtn').css('pointer-events', 'none');
    //profile Image Ajax Change
    changeProfileImageAjax();



});
function getCertainUserInfoById(id) {
    return usersList.find(item => item.id == id);
}

function getRecentChatUsers() {
    $.ajax({
        url: '/home/getRecentChatUsers',
        headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        dataType: "json",
        success: function (res) {
            if (res.state == 'true') {
                let { recentChatUsers, lastChatUserId } = res;
                currentContactId = lastChatUserId;
                let userListTarget = $('.recent-default .recent-chat-list');
                userListTarget.empty();
                recentChatUsers.forEach(item => {
                    addChatUserListItem(userListTarget, item);
                });
                displayRecentChatFriends(recentChatUsers);
                $(`ul.chat-main li[key=${currentContactId}]`).addClass('active');
                setCurrentChatContent(lastChatUserId);
            } else {
                $('.section-py-space').css('display', 'block');
                $('#content').css('display', 'none');
                $('.app-list').css('display', 'none');

            }
        },
        error: function (res) {
            alert('The operation is failed');
        }
    });
}

function setCurrentChatContent(contactorId) {
    var form_data = new FormData();
    form_data.append('currentContactorId', contactorId);
    $.ajax({
        url: '/home/getCurrentChatContent',
        headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        data: form_data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        dataType: "json",
        success: function (res) {
            if (res.state == 'true') {
                console.log(res);
                let { messageData, rateData } = res;
                [contactorInfo] = res.contactorInfo;

                currentContactId = contactorId;
                $('.section-py-space').css('display', 'none');
                $('.app-list').css('display', 'block');
                $('#content').css('display', 'block');
                //profile info display
                $('.chat-content .contactor-name').html(contactorInfo.username);
                if (contactorInfo.logout) {
                    $('.chat-content .contact-details .profile').addClass('offline');
                    $('.chat-content .contact-details .profile').removeClass('online');
                    $('.chat-content .contactor-status').html('Inactive')
                    $('.chat-content .contactor-status').addClass('badge-dark');
                    $('.chat-content .contactor-status').removeClass('badge-success');
                } else {
                    $('.chat-content .contact-details .profile').addClass('online');
                    $('.chat-content .contact-details .profile').removeClass('offline');
                    $('.chat-content .contactor-status').html('Active')
                    $('.chat-content .contactor-status').addClass('badge-success');
                    $('.chat-content .contactor-status').removeClass('badge-dark');
                }

                if (contactorInfo.avatar) {
                    $('.profile.menu-trigger').css('background-image', `url("v1/api/downloadFile?path=${contactorInfo.avatar}")`);
                    $('.contact-top').css('background-image', `url("v1/api/downloadFile?path=${contactorInfo.avatar}")`);
                } else {
                    $('.profile.menu-trigger').css('background-image', `url("/chat/images/contact/1.jpg")`);
                    $('.contact-top').css('background-image', `url("/chat/images/contact/1.jpg")`);
                }
                $('.contact-profile .name h3').html(contactorInfo.username);
                $('.contact-profile .name h5').html(contactorInfo.location);
                $('.contact-profile .name h6').html(contactorInfo.description)
                //whole rate display
                displayProfileRate(rateData)

                //Chat data display
                $('.contact-chat ul.chatappend').empty();

                if (messageData) {
                    let target = '.contact-chat ul.chatappend';
                    messageData.reverse().forEach(item => {
                        item.messageId = item.id;
                        addChatItem(target, item.sender, item);
                    });
                }
                // console.log($('.contact-chat').height());
                $(".messages").animate({ scrollTop: $('.contact-chat').height() }, 'fast');
            }
        },
        error: function (response) {
            alert('The operation is failed');
        }
    });


}

function getUsersList() {
    var form_data = new FormData();
    $.ajax({
        url: '/home/getUsersList',
        headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        data: form_data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        dataType: "json",
        success: function (res) {
            usersList = res.data;
            let target = $('.recent-default .recent-chat-list');
        },
        error: function (response) {
            alert('The operation is failed');
        }
    });
}

function searchAndAddRecentChatList() {
    let keyuptimer;
    let target = $('.recent-default .recent-chat-list');
    $('.new-chat-search').bind('keyup', function () {
        clearTimeout(keyuptimer);
        keyuptimer = setTimeout(function () {
            let value = $('.new-chat-search').val();
            target.empty();
            if (value) {
                usersList.filter(item => item.id != currentUserId && item.username.toLowerCase().includes(value.toLowerCase())).forEach(item => {
                    addChatUserListItem(target, item);
                });
                $(`ul.chat-main li[key=${currentContactId}]`).addClass('active');
            } else {
                getRecentChatUsers();
            }
        }, 100);
    })
}

function addChatUserListItem(target, data) {
    $(target).append(
        `<li data-to="blank" key="${data.id}">
            <div class="chat-box">
            <div class="profile ${data.logout ? 'offline' : 'online'} bg-size" style="background-image: url(${data.avatar ? 'v1/api/downloadFile?path=' + data.avatar : "/chat/images/contact/2.jpg"}); background-size: cover; background-position: center center; display: block;">
                
            </div>
            <div class="details">
                <h5>${data.username}</h5>
                <h6>${data.description || ''}</h6>
            </div>
            <div class="date-status"><i class="ti-pin2"></i>
                <h6>22/10/19</h6>
                <h6 class="font-success status"> Seen</h6>
            </div>
            </div>
        </li>`
    );
}

function getContactList() {
    $('.icon-btn[data-tippy-content="Contact List"]').on('click', () => {
        if ($('.contact-list-tab.dynemic-sidebar').hasClass('active')) {
            var form_data = new FormData();
            $.ajax({
                url: '/home/getContactList',
                headers: {
                    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                },
                data: form_data,
                cache: false,
                contentType: false,
                processData: false,
                type: 'POST',
                dataType: "json",
                success: function (res) {
                    let target = '#contact-list .chat-main';
                    $(target).empty();
                    res.forEach(item => {
                        addChatUserListItem(target, usersList.find(user => user.id == item.contact_id))
                    });

                },
                error: function (response) {

                }
            });
        }
    });
}

function addContact() {
    var form_data = new FormData();
    form_data.append('email', $('#exampleInputEmail1').val());
    $.ajax({
        url: '/home/addContactItem',
        headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        data: form_data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        dataType: "json",
        success: function (res) {
            if (res.insertion == false) {
                $('.addContactError').html(res.message);
                setTimeout(() => {
                    $('.addContactError').html('');
                }, 1000);

            } else {
                let data = res.data;
                data.created_at = new Date();
                let target = '#contact-list .chat-main';
                addChatUserListItem(target, data);
            }
        },
        error: function (response) {
            alert('The operation is failed');
        }
    });
}

function newMessage() {
    var message = $('.message-input input').val();
    if ($.trim(message) == '') {
        return false;
    }

    $('.message-input input').val(null);
    $('.chat-main .active .details h6').html('<span>You : </span>' + message);
    // $(".messages").animate({ scrollTop: $(document).height() }, "fast");
    socket.emit('message', { currentContactId, message });
};

function displayTypingAction() {
    $('.message-input input').on('keyup', function (e) {
        socket.emit('typing', { currentUserId, currentContactId });
    });
}

function typingMessage() {
    if (!typingTime) {
        typingTime = new Date();
    }
    // else {
    var delta = (new Date() - typingTime);
    // }
    if (!$('.typing-m').length) {
        let contactorInfo = getCertainUserInfoById(currentContactId);
        $(`<li class="sent last typing-m"> <div class="media"> <div class="profile me-4 bg-size" style="background-image: url(${contactorInfo.avatar ? 'v1/api/downloadFile?path=' + contactorInfo.avatar : "/chat/images/contact/2.jpg"}); background-size: cover; background-position: center center; display: block;"></div><div class="media-body"> <div class="contact-name"> <h5>${contactorInfo.username}</h5> <h6>${typingTime.toLocaleTimeString()}</h6> <ul class="msg-box"> <li> <h5> <div class="type"> <div class="typing-loader"></div></div></h5> </li></ul> </div></div></div></li>`).appendTo($('.messages .chatappend'));
        $(".messages").animate({ scrollTop: $('.contact-chat').height() }, "fast");
    }
    if (delta < 2000) {
        typingTime = new Date();
        clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
        $('.typing-m').remove();
        $(".messages").animate({ scrollTop: $('.contact-chat').height() }, "fast");
        typingTime = undefined;
    }, 2000);


}


function addChatItem(target, senderId, data) {
    let senderInfo = getCertainUserInfoById(senderId);
    let type = senderInfo.id == currentUserId ? "replies" : "sent";
    let time = new Date(data.created_at);
    let item = `<li class="${type}">
        <div class="media">
            <div class="profile me-4 bg-size" style="background-image: url(${senderInfo.avatar ? 'v1/api/downloadFile?path=' + senderInfo.avatar : "/chat/images/contact/2.jpg"}); background-size: cover; background-position: center center;">
            </div>
            <div class="media-body">
                <div class="contact-name">
                    <h5>${senderInfo.username}</h5>
                    <h6>${time.toLocaleTimeString()}</h6>
                    <ul class="msg-box">
                        <li key="${data.messageId}" kind="${data.kind}">
                            <div class="photoRating">
                                <div>★</div><div>★</div><div>★</div><div>★</div><div>★</div>
                            </div>
                            ${data.kind == 0 ?
            `<h5>${data.content}</h5>`
            : data.kind == 1 ?
                `<div class="camera-icon" requestid="${data.requestId}">$${data.content}</div>`
                : data.kind == 2 ? `<img class="receive_photo" messageId="${data.messageId}" photoId="${data.photoId}" src="${data.content}">` : ''}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </li>`;
    $(target).append(item);
    if (data.rate) {
        getContentRate(`.msg-box li[key="${data.messageId}"]`, data.rate)
    }

}

function changeProfileImageAjax() {
    let profileImageBtn = $('#profileImageUploadBtn')
    let avatarImage = $('#profileImage');

    profileImageBtn.on('change', (e) => {
        let reader = new FileReader();
        files = e.target.files;
        reader.onload = () => {
            avatarImage.attr('src', reader.result);
            avatarImage.parent().css('background-image', `url("${reader.result}")`);
        }
        reader.readAsDataURL(files[0]);
    });
}

function displayProfileRate(rateData) {
    let data = rateData[0];
    if (rateData.length) {
        var textRate = (data.text_rate / data.text_count) || 0;
        var photoRate = (data.photo_rate / data.photo_count) || 0;
        var videoRate = (data.video_rate / data.video_count) || 0;
        var audioRate = (data.audio_rate / data.audio_count) || 0;
        var videoCallRate = (data.video_call_rate / data.video_call_count) || 0;
        var voiceCallRate = (data.voice_call_rate / data.voice_call_count) || 0;
        var averageRate = ((data.text_rate + data.photo_rate) / (data.text_count + data.photo_count)) || 0;
    } else {
        var textRate = 0;
        var photoRate = 0;
        var videoRate = 0;
        var audioRate = 0;
        var videoCallRate = 0;
        var voiceCallRate = 0;
        var averageRate = 0;
    }
    // var averageRate = (textRate + photoRate + videoRate + audioRate + videoCallRate + voiceCallRate) / 6;
    getContentRate('.contact-profile', Math.round(averageRate));
    $('.contact-profile').attr('title', averageRate.toFixed(2));

    getContentRate('.content-rating-list .text-rating', Math.round(textRate));
    getContentRate('.content-rating-list .photo-rating', Math.round(photoRate));
    getContentRate('.content-rating-list .video-rating', Math.round(videoRate));
    getContentRate('.content-rating-list .audio-rating', Math.round(audioRate));
    getContentRate('.content-rating-list .video-call-rating', Math.round(videoCallRate));
    getContentRate('.content-rating-list .voice-call-rating', Math.round(voiceCallRate));
    $('.content-rating-list .text-rating').attr('title', textRate.toFixed(2));
    $('.content-rating-list .photo-rating').attr('title', photoRate.toFixed(2));
    $('.content-rating-list .video-rating').attr('title', videoRate.toFixed(2));
    $('.content-rating-list .audio-rating').attr('title', audioRate.toFixed(2));
    $('.content-rating-list .video-call-rating').attr('title', videoCallRate.toFixed(2));
    $('.content-rating-list .voice-call-rating').attr('title', voiceCallRate.toFixed(2));

}

function displayRecentChatFriends(recentChatUsers) {
    console.log(recentChatUsers);
    $('.recent-slider').empty();
    recentChatUsers.forEach(item => {
        $('.recent-slider').append(`<div class="item">
            <div class="recent-box">
            
                <div class="dot-btn dot-success grow"></div>
                <div class="recent-profile"><img class="bg-img" src="${item.avatar  ?'v1/api/downloadFile?path=' + item.avatar : '/chat/images/avtar/1.jpg'}"
                        alt="Avatar" />
                    <h6>${item.username}</h6>
                </div>
            </div>
        </div>`);
    });
    $('.recent-slider').owlCarousel({
        items: 3,
        dots: false,
        loop: true,
        margin: 60,
        nav: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: false,
        responsive: {
            320: {
                items: 1,
                margin: 25,
            },

            601: {
                items: 2,
                margin: 25,
            },
            1070: {
                items: 3,
                margin: 25,
            },
            1600: {
                items: 3
            },
        }
    })
}

