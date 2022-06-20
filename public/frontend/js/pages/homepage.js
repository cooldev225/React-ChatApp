var $contact_active;
var currentContactId;
var contactorInfo = {};
var usersList = [];
var typingTime;
var timerId;
let State = ['', 'sent', 'arrived', 'read'];

let currentGroupId;
let currentGroupUsers;
let currentDirectId;
let currentDirectUsers;
let currentCastId;
let currentCastUsers;
let globalGroupId;
let globalGroupUsers;

$(document).ready(() => {

    new Promise(resolve => {
        getUsersList(resolve);
    }).then(() => {
        $('.balance-amount').text(`$${getCertainUserInfoById(currentUserId).balances.toFixed(2)}`)
        getRecentChatUsers(1);
        getRecentChatUsers(2);
        getRecentChatUsers(3);
        searchAndAddRecentChatList();
        displayTypingAction();
        deleteMessages();
        displayRate();
        getUsersListBySearch();
    });

    $('#logoutBtn').on('click', () => {
        socket.emit('logout', {
            currentUserId
        });
    });


    //createPhoto by click Media
    $('#createPhotoBtn').on('click', () => {
        $('#createPhoto').modal('show');
        $('#createPhoto .preview-paid').addClass('d-none');
        $('#createPhoto .emojis-price').removeClass('d-none');
        $('#createPhoto .save-send').css('margin-left', '0px');
    });

    $('#mediaBtn').on('click', () => {
        $('#mediaPhoto').modal('show');

    });

    $('#acceptPhotoRequestBtn').on('click', () => {
        // $('#createPhoto').modal('show');
        $('#createPhoto .preview-paid').removeClass('d-none');
        $('#createPhoto .emojis-price').addClass('d-none');
        $('#createPhoto .save-send').css('margin-left', '-20px');

    });

    $('.self_profile_btn').on('click', () => {
        displayProfileContent(currentUserId);
        $('.chitchat-container').toggleClass("mobile-menu");
        if ($(window).width() <= 768) {
            $('.main-nav').removeClass("on");
        }
    });

    $('.menu-trigger').on('click', () => {
        if (currentContactId)
            displayProfileContent(currentContactId);
    });

    $('.balance-amount').on('click', () => {
        displayPaymentHistory(currentUserId);
    });

    $('#profileImageUploadBtn').css('pointer-events', 'none');
    //profile Image Ajax Change
    changeProfileImageAjax();

});

function getCertainUserInfoById(id) {
    return usersList.find(item => item.id == id);
}

function getRecentChatUsers(type) {
    let form_data = new FormData();
    form_data.append('type', type);
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
        data: form_data,
        success: function (res) {
            if (res.state == 'true') {
                globalGroupId = res.data.slice(-1)[0] ? res.data.slice(-1)[0].id : 0;
                globalGroupUsers = res.data.slice(-1)[0] ? res.data.slice(-1)[0].users.join(',') : '';
                if (type == 1) {
                    var itemTarget = '#direct .chat-main';
                    var messageTarget = '#direct_chat .chatappend'
                    currentDirectId = globalGroupId;
                    currentDirectUsers = globalGroupUsers;
                    let recentChatUsers = res.data.map(item => item.users.find(userId => userId != currentUserId)).map(id => getCertainUserInfoById(id));
                    displayRecentChatFriends(recentChatUsers);
                    var pageSettingFlag = 1;
                } else if (type == 2) {
                    var itemTarget = '#group .chat-main';
                    var messageTarget = '#group_chat .chatappend'
                    currentGroupId = globalGroupId;
                    currentGroupUsers = globalGroupUsers;
                    var pageSettingFlag = 2;
                } else if (type == 3) {
                    var itemTarget = '#cast .chat-main';
                    var messageTarget = '#cast_chat .chatappend'
                    currentCastId = globalGroupId;
                    currentCastUsers = globalGroupUsers;
                    var pageSettingFlag = 3;
                }
                if (globalGroupId) {
                    showCurrentChatHistory(messageTarget, globalGroupId, globalGroupUsers, pageSettingFlag);
                } else {
                    $(messageTarget).empty();
                }
                $(itemTarget).empty();
                res.data.forEach(item => {
                    if (item.lastMessage) {
                        var content = item.lastMessage.kind == 0 ? item.lastMessage.content : item.lastMessage.kind == 1 ? 'You have been received PhotoRequest' : 'You have been received Blink';
                        item.lastMessage = content;
                    }
                    addNewGroupItem(itemTarget, item);
                });
                convertListItems();
                $(`${itemTarget}>li:first-child`).addClass('active');
                
                // currentGroupUsers = $('#group .group-main>li.active').attr('groupUsers');
                // let contentwidth = jQuery(window).width();
                // if (contentwidth > 768) {
                //     $('#group > ul.group-main>li.active').click();
                // }

            } else {
                $('.section-py-space').css('display', 'block');
                $('#content').css('display', 'none');
                $('.app-list').css('display', 'none');
            }
        },
        error: function (res) {
            alert('Get Recent User Failed');
            // document.location.href = '/login';
        }
    });
}

function getLastMessage(groupId, resolve) {
    let form_data = new FormData();
    form_data.append('groupId', groupId);
    $.ajax({
        url: '/message/getLastMessage',
        headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        dataType: "json",
        data: form_data,
        success: function (res) {
            if (res.data) {
                var content = res.data.kind == 0 ? res.data.content : res.data.kind == 1 ? 'You has been received PhotoRequest' : 'You has been received Blink';
            } else {
                var content = 'Hello';
            }
            resolve(content)
        },
        error: function (res) {
            // document.location.href = '/login';
        }
    });
}

function setCurrentChatContent(groupId) {
    $('.spining').css('display', 'flex');

    var form_data = new FormData();
    form_data.append('currentGroupId', groupId);
    $.ajax({
        url: '/home/getCurrentGroupChatContent',
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
                getUsersList();
                let { messageData } = res;
                let contactorInfo = getCertainUserInfoById(contactorId);
                currentContactId = contactorId;
                $('.section-py-space').css('display', 'none');
                $('.app-list').css('display', 'block');
                $('#content').css('display', 'block');
                //profile info display
                $('.chat-content .contactor-name').html(contactorInfo.firstName || contactorInfo.username);
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
                } else {
                    $('.profile.menu-trigger').css('background-image', `url("/images/default-avatar.png")`);
                }
                //whole rate display
                // displayProfileContent(rateData)
                displayProfileContent(contactorId)

                //Chat data display
                $('#direct_chat .contact-chat ul.chatappend').empty();

                new Promise(resolve => {
                    if (messageData) {
                        let target = '#direct_chat .contact-chat ul.chatappend';
                        messageData.reverse().forEach(item => {
                            if (item.state != 3 && currentUserId != item.sender) {
                                let message = {
                                    from: item.sender,
                                    to: item.recipient,
                                    content: item.content,
                                    messageId: item.id,
                                    state: item.state,
                                }
                                socket.emit('read:message', message);
                            }
                            item.messageId = item.id;
                            addChatItem(target, item.sender, item);
                        });
                    }
                    resolve();
                }).then(() => {
                    $(".messages").animate({
                        scrollTop: $('#direct_chat .contact-chat').height()
                    }, 'fast');
                    setTimeout(() => {
                        $('.spining').css('display', 'none');
                    }, 1000);
                });
            }
        },
        error: function (response) { }
    });


}

function getUsersList(resolve) {
    $.ajax({
        url: '/home/getUsersList',
        headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        dataType: "json",
        success: function (res) {
            usersList = res.data;
            if (resolve) {
                resolve(res.data);
            }
        },
        error: function (response) {
            // document.location.href = '/';
            alert('UserList Error');
        }
    });
}

function searchAndAddRecentChatList() {
    let keyuptimer;
    let target = $('.recent-default .recent-chat-list');
    $('.new-chat-search').bind('keyup', function () {
        if ($('#direct-tab').hasClass('active')) {
            clearTimeout(keyuptimer);
            keyuptimer = setTimeout(function () {
                let value = $('.new-chat-search').val();
                let users = Array.from($('.recent-chat-list .details h5')).map(item => item.innerText);
                if (value) {
                    target.empty();
                    usersList.reverse().filter(item => item.id != currentUserId && item.username.toLowerCase().includes(value.toLowerCase())).forEach(item => {
                        addNewUserListItem(target, item);
                    });
                    $(`ul.chat-main li[key=${currentContactId}]`).addClass('active');
                } else {
                    getRecentChatUsers();
                }
            }, 100);
        }
        if ($('#newChatModal').hasClass('show')) {
            let target = $('#newChatModal .chat-main');
            target.empty();
            usersList.reverse().forEach(item => addNewUserListItem(target, item));
        }
    });
    // $('.recent-default.dynemic-sidebar.active .text-end .close-search').on('click', () => {
    //     // if ($('#direct-tab').hasClass('active')) {
    //     $('.new-chat-search').val('');
    //     getRecentChatUsers();
    //     // }
    // });
}

function getUsersListBySearch() {
    let target = $('#newChatModal .chat-main');
    let keyuptimer;

    $('.search_user').bind('keyup', function () {
        clearTimeout(keyuptimer);
        keyuptimer = setTimeout(function () {
            let value = $('.search_user').val();
            if (value) {
                target.empty();

                usersList.reverse().filter(item => item.id != currentUserId && item.username.toLowerCase().includes(value.toLowerCase())).forEach(data => {
                    $(target).prepend(`<li data-to="blank" key="${data.id}">
                        <div class="chat-box">
                            <div class="profile ${data.logout ? 'offline' : 'online'} bg-size" style="background-image: url(${data.avatar ? 'v1/api/downloadFile?path=' + data.avatar : "/images/default-avatar.png"}); background-size: cover; background-position: center center; display: block;">
                                
                            </div>
                            <div class="details">
                                <h5>${data.username}</h5>
                                <h6>${data.description || 'Hello'}</h6>
                            </div>
                        
                        </div>
                    </li>`);
                });
            } else {
                target.empty();
                usersList.reverse().filter(item => item.id != currentUserId).forEach(data => {
                    $(target).prepend(`<li data-to="blank" key="${data.id}">
                        <div class="chat-box">
                            <div class="profile ${data.logout ? 'offline' : 'online'} bg-size" style="background-image: url(${data.avatar ? 'v1/api/downloadFile?path=' + data.avatar : "/images/default-avatar.png"}); background-size: cover; background-position: center center; display: block;">
                                
                            </div>
                            <div class="details">
                                <h5>${data.username}</h5>
                                <h6>${data.description || 'Hello'}</h6>
                            </div>
                        </div>
                    </li>`);
                });
            }
        }, 100);
    });
}

$('#newChatModal').on('shown.bs.modal', function () {
    let target = '#newChatModal .chat-main';
    $(target).empty();
    let recentChatUsersList = Array.from($('#direct .chat-main').children()).map(item => $(item).attr('groupUsers')).map(item => item.split(','));
    new Promise(resolve => {
        getUsersList(resolve)
    }).then(usersList => {
        usersList.reverse().filter(item => !recentChatUsersList.some(userIds => userIds.includes(item.id.toString()))).forEach(data => {
            $(target).prepend(`<li data-to="blank" key="${data.id}">
                <div class="chat-box">
                    <div class="profile ${data.logout ? 'offline' : 'online'} bg-size" style="background-image: url(${data.avatar ? 'v1/api/downloadFile?path=' + data.avatar : "/images/default-avatar.png"}); background-size: cover; background-position: center center; display: block;">
                        
                    </div>
                    <div class="details">
                        <h5>${data.username}</h5>
                        <h6>${data.description || 'Hello'}</h6>
                    </div>
                </div>
            </li>`);
        });
        $('.chat-cont-setting').removeClass('open');
    });
});

$('#newChatModal .chat-main').on('click', 'li', function () {
    let userId = $(this).attr('key');
    new Promise(resolve => getUsersList(resolve)).then(usersList => {
        let item = usersList.find(item => item.id == userId);
        users = [userId, currentUserId];
        socket.emit('create:group', { title: item.username, users, type: 1 });
        $('#newChatModal').modal('hide');
    });
    // addNewUserListItem($('#direct .chat-main'), item);
    // $(`#direct .chat-main li[userId="${userId}"]`).click();
});


function newMessage() {
    let replyId = $('#content .chat-content>.replyMessage').attr('replyId');
    let replyKind = $('#content .chat-content>.replyMessage').attr('replyKind');
    // let forwardId = $('#content .chat-content>.replyMessage').attr('forwardId');
    // let forwardKind = $('#content .chat-content>.replyMessage').attr('forwardKind');
    $('#content .chat-content>.replyMessage').removeAttr('replyId');
    $('#content .chat-content>.replyMessage').removeAttr('replyKind');
    // $('#content .chat-content>.replyMessage').removeAttr('forwardId');
    // $('#content .chat-content>.replyMessage').removeAttr('forwardKind');
    $('#content .chat-content>.replyMessage').hide();
    var content = $('.message-input input').val();
    if ($.trim(content) == '') {
        return false;
    }

    $('.message-input input').val(null);
    $('.chat-main .active .details h6').html('<span>You : </span>' + content);

    // $(".messages").animate({ scrollTop: $(document).height() }, "fast");
    let senderName = getCertainUserInfoById(currentUserId).username;


    console.log("sendername v8 :", getCertainUserInfoById(currentUserId).id);
    $.ajax({
        type: "POST",
        headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        url: "/home/sendMessage",
        data: {
            id: getCertainUserInfoById(currentUserId).id,
            content,
            foo: 'bar',
            currentContactID: currentContactId
        },
        success: function (datas) {
            console.log("Request Sent");
        },
    });

    if ($('#direct_chat').hasClass('active')) {
        globalGroupId = currentDirectId;
    } else if ($('#group_chat').hasClass('active')) {
        globalGroupId = currentGroupId;
    } else if ($('#cast_chat').hasClass('active')) {
        globalGroupId = currentCastId;
        var castFlag = true;
    }
    socket.emit('send:groupMessage', { globalGroupId, globalGroupUsers, content, senderName, castFlag });
    return;
};

function displayTypingAction() {
    $('.message-input input').on('keyup', function (e) {
        if (currentContactId) {
            socket.emit('typing', {
                currentUserId,
                currentContactId
            });
        }
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
        $(`<li class="sent last typing-m"> <div class="media"> <div class="profile me-4 bg-size" style="background-image: url(${contactorInfo.avatar ? 'v1/api/downloadFile?path=' + contactorInfo.avatar : "/images/default-avatar.png"}); background-size: cover; background-position: center center; display: block;"></div><div class="media-body"> <div class="contact-name"> <h5>${contactorInfo.username}</h5> <h6>${typingTime.toLocaleTimeString()}</h6> <ul class="msg-box"> <li> <h5> <div class="type"> <div class="typing-loader"></div></div></h5> </li></ul> </div></div></div></li>`).appendTo($('.messages .chatappend'));
        $(".messages").animate({
            scrollTop: $('#direct_chat .contact-chat').height()
        }, "fast");
    }
    if (delta < 1500) {
        typingTime = new Date();
        clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
        $('.typing-m').remove();
        $(".messages").animate({
            scrollTop: $('#direct_chat .contact-chat').height()
        }, "fast");
        typingTime = undefined;
    }, 1500);


}

function addChatItem(target, senderId, data, loadFlag) {
    if (data.reply_id) {
        if (data.reply_kind == 0) {
            var replyContent = $('.chatappend').find(`li.msg-item[key="${data.reply_id}"]`).find('.msg-setting-main .content').text();
        } else if (data.reply_kind == 2) {
            let imageSrc = $('.chatappend').find(`li.msg-item[key="${data.reply_id}"]`).find('.receive_photo').attr('src');
            var replyContent = `<img src="${imageSrc}" width="50">`;
        }
    }
    // else if (data.forward_id) {
    //     if (data.forward_kind == 0) {
    //         var replyContent = $('.chatappend').find(`li.msg-item[key="${data.forward_id}"]`).find('.msg-setting-main .content').text();
    //     } else if (data.forward_kind == 2) {
    //         let imageSrc = $('.chatappend').find(`li.msg-item[key="${data.forward_id}"]`).find('.receive_photo').attr('src');
    //         var replyContent = `<img src="${imageSrc}" width="50">`;
    //     }
    // }
    let senderInfo = getCertainUserInfoById(senderId);
    let type = senderInfo.id == currentUserId ? "replies" : "sent";
    let time = data.created_at ? new Date(data.created_at) : new Date();
    let item = `<li class="${type} msg-item" key="${data.messageId}" kind="${data.kind}">
        <div class="media">
            <div class="profile me-4 bg-size" style="background-image: url(${senderInfo.avatar ? 'v1/api/downloadFile?path=' + senderInfo.avatar : "/images/default-avatar.png"}); background-size: cover; background-position: center center;">
            </div>
            <div class="media-body">
                <div class="contact-name">
                    <h5>${senderInfo.username}</h5>
                    <h6 class="${State[data.state]}">${displayTimeString(time)}</h6>
                    <div class="photoRating">
                        <div>★</div><div>★</div><div>★</div><div>★</div><div>★</div>
                    </div>
                    <ul class="msg-box">
                        <li class="msg-setting-main">
                            ${data.kind == 0 ?
            `${data.reply_id ? '<div class="replyMessage">\
                <span class="replyIcon"><i class="fa fa-reply"></i></span>\
                <span class="replyContent">' + replyContent + '</span>\
                <hr style="color: black">\
                <span class="content">' + data.content + '</span>\
            </div>' : '<h5 class="content">' + data.content + '</h5>'}`
            : data.kind == 1 ?
                `<div class="camera-icon" requestid="${data.requestId}">$${data.content}</div>`
                : data.kind == 2 ? `<img class="receive_photo" messageId="${data.messageId}" photoId="${data.photoId}" src="${data.content}">` : ''}
                            <div class="msg-dropdown-main">
                                <div class="msg-open-btn"><span>Open</span></div>
                                <div class="msg-setting"><i class="ti-more-alt"></i></div>
                                <div class="msg-dropdown"> 
                                    <ul>
                                        <li class="replyBtn"><a href="#"><i class="fa fa-reply"></i>reply</a></li>
                                        <li class="forwardBtn"><a href="#"><i class="fa fa-share"></i>forward</a></li>
                                        ${data.kind == 2 ? '<li class="replyEditBtn"><a href="#"><i class="fa fa-edit"></i> edit</a></li>' : ''}
                                        <li class="rateBtn"><a href="#"><i class="fa fa-star-o"></i>rating</a></li>
                                        <li class="deleteMessageBtn"><a href="#"><i class="ti-trash"></i>delete</a></li>
                                    </ul>
                                </div>
                        </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </li>`;
    if (loadFlag) {
        $(target).prepend(item);
    } else {
        $(target).append(item);
    }
    // $(".messages").animate({ scrollTop: $('#direct_chat .contact-chat').height() }, 'fast');

    if (data.rate) {
        getContentRate(`li.msg-item[key="${data.messageId}"]`, data.rate)
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

function displayProfileContent(userId) {
    let userInfo = getCertainUserInfoById(userId)
    if (userInfo.avatar) {
        $('.contact-top').css('background-image', `url("v1/api/downloadFile?path=${userInfo.avatar}")`);
    } else {
        $('.contact-top').css('background-image', `url("/images/default-avatar.png")`);
    }
    $('.contact-profile .name h3').html(userInfo.firstName || userInfo.username);
    $('.contact-profile .name h5').html(userInfo.location);
    $('.contact-profile .name h6').html(userInfo.description);

    var form_data = new FormData();
    form_data.append('userId', userId);
    $.ajax({
        url: '/home/getRateData',
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
                let [data] = res.rateData;
                if (res.rateData.length) {
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
                getContentRate('.contact-profile', Math.round(averageRate));
                document.querySelector('.contact-profile .photoRating')._tippy.setContent(averageRate.toFixed(2))

                getContentRate('.content-rating-list .text-rating', Math.round(textRate));
                getContentRate('.content-rating-list .photo-rating', Math.round(photoRate));
                getContentRate('.content-rating-list .video-rating', Math.round(videoRate));
                getContentRate('.content-rating-list .audio-rating', Math.round(audioRate));
                getContentRate('.content-rating-list .video-call-rating', Math.round(videoCallRate));
                getContentRate('.content-rating-list .voice-call-rating', Math.round(voiceCallRate));
                document.querySelector('.content-rating-list .text-rating')._tippy.setContent(textRate.toFixed(2))
                document.querySelector('.content-rating-list .photo-rating')._tippy.setContent(photoRate.toFixed(2))
                document.querySelector('.content-rating-list .video-rating')._tippy.setContent(videoRate.toFixed(2))
                document.querySelector('.content-rating-list .audio-rating')._tippy.setContent(audioRate.toFixed(2))
                document.querySelector('.content-rating-list .video-call-rating')._tippy.setContent(videoCallRate.toFixed(2))
                document.querySelector('.content-rating-list .voice-call-rating')._tippy.setContent(voiceCallRate.toFixed(2))
            }
        },
        error: function (response) { }
    });
}

function displayRecentChatFriends(recentChatUsers) {
    $owl = $('.recent-slider');
    $owl.trigger('destroy.owl.carousel');
    $owl.html($owl.find('.owl-stage-outer').html()).removeClass('owl-loaded');
    $('.recent-slider').empty();
    recentChatUsers.forEach(item => {
        $('.recent-slider').append(`<div class="item">
            <div class="recent-box">
                <div class="dot-btn dot-success grow"></div>
                <div class="recent-profile">
                    <img class="bg-img" src="${item.avatar ? 'v1/api/downloadFile?path=' + item.avatar : '/images/default-avatar.png'}" alt="Avatar" />
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
            300: {
                items: 2,
                margin: 30,
            },
            320: {
                items: 3,
                margin: 20,
            },
            500: {
                items: 3,
                margin: 30,
            },
            560: {
                items: 3,
                margin: 80,
            },
            660: {
                items: 4,
                margin: 40,
            },
            800: {
                items: 2,
                margin: 30,
            },
        }
    })
}

function deleteMessages() {
    $('.chatappend').on('click', '.deleteMessageBtn', event => {
        if (confirm('Are you sure?')) {
            let element = $(event.currentTarget).closest('.msg-item');
            let messageId = element.attr('key');

            if (element.attr('kind') == '2') {
                var photoId = element.find('.receive_photo').attr('photoid');
                let price = element.find('.receive_photo').attr('price');
                if (price) {
                    alert("You can't delete this photo");
                }
            } else {
                console.log('not photo');
            }
            console.log(globalGroupId)
            globalGroupId = $('#myTabContent1 .tab-pane.active .chat-main li.active').attr('groupId');
            socket.emit('delete:message', {
                globalGroupId,
                messageId,
                photoId
            });
            $(this).closest('.msg-dropdown').hide();
        }
    });
}

function displayRate() {
    $('.chatappend').on('click', '.rateBtn', event => {
        let element = $(event.currentTarget).closest('.msg-item');
        element.find('.photoRating').css('display', 'flex');
        $(this).closest('.msg-dropdown').hide();
        setTimeout(() => {
            element.find('.photoRating').css('display', 'none');
        }, 5000);
    });
}

function displayPaymentHistory(userId) {
    var form_data = new FormData();
    form_data.append('userId', userId);
    $.ajax({
        url: '/home/getPaymentHistories',
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
                $('.history-list').empty();
                res.data.forEach(item => {
                    let status = ['Holding', 'Completed'];
                    let senderInfo = getCertainUserInfoById(item.sender);
                    let receiverInfo = getCertainUserInfoById(item.recipient);
                    let sendFlag = item.sender == currentUserId ? true : false;
                    let avatar = sendFlag ? receiverInfo.avatar : senderInfo.avatar;
                    let amount = sendFlag ? (item.amount).toFixed(2) : (item.amount * 0.7).toFixed(2);
                    $('.history-list').append(`<li class="sent">
                        <a>
                            <div class="chat-box">
                                <div class="profile bg-size"
                                    style="background-image: url(${avatar ? 'v1/api/downloadFile?path=' + avatar : "/images/default-avatar.png"}); background-size: cover; background-position: center
                                    center; display: block;">
                                </div>
                                <div class="details">
                                    <h5>${sendFlag ? receiverInfo.username : senderInfo.username}</h5>
                                    <h6 class="title">${new Date(item.created_at).toLocaleDateString()}</h6>
                                </div>
                                <div class="date-status">
                                    <span class=${sendFlag ? 'font-danger' : 'font-success'}>${sendFlag ? '-' : ''}$${amount}</span>
                                    <h6 class="status ${item.state ? 'font-success' : 'font-warning'}" request-status="4"> ${status[item.state]}</h6>
                                </div>
                            </div>
                        </a>
                    </li>`)

                })
            }
        },
        error: function (response) { }
    });
}

function displayTimeString(time) {
    let dateString = time.toDateString();
    let timeString = time.toLocaleTimeString();
    let nowDateString = new Date().toDateString();
    let timeDiffer = parseInt((new Date(nowDateString) - new Date(dateString)) / (1000 * 60 * 60 * 24), 10);
    switch (timeDiffer) {
        case 0:
            return timeString;
        case 1:
            return 'Yesterday ' + timeString;
        default:
            return dateString + ' ' + timeString;
    }
}

function confirmModal(title, content, okAction, cancelAction) {
    $.confirm({
        title,
        content,
        buttons: {
            Ok: {
                btnClass: 'btn-primary',
                action: okAction
            },
            Cancel: {
                btnClass: 'btn-danger',
                action: cancelAction
            }
        }
    });
}