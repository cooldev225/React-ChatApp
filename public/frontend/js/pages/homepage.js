var $contact_active;
var currentContactId;
var contactorInfo = {};
var usersList = [];
var typingTime;
var timerId;
let State = ['', 'sent', 'arrived', 'read'];
// var socket;

$(document).ready(() => {
    // socket = io.connect("http://localhost:3000", { query: "currentUserId=" + currentUserId });
    // socket = io.connect("http://ojochat.com:3000", { query: "currentUserId=" + currentUserId });
    socket.on('message', message => {
        if (currentUserId != message.from) {
            let senderName = getCertainUserInfoById(message.from).username;
            let type = message.kind == 2 ? 'photo' :
                message.kind == 1 ? 'request' :
                message.kind == 0 ? 'text' : "new";
            //arrived message
            socket.emit('arrive:message', message);
            if (document.visibilityState == "visible") {
                if (currentContactId == message.from) {
                    //unread -> read
                    socket.emit('read:message', message);
                }
            } else {
                socket.emit('send:notification', {
                    from: message.from,
                    to: message.to,
                    senderName,
                    type
                });
            }
        }
        message.from = Number(message.from);

        if ($('#group_blank').hasClass('active') && message.from == currentUserId) {
            $('#group_blank .rightchat').css('display', 'none');
            $('#group_blank .call-list-center').css('display', 'none');
            $('#group_blank .chatappend').css('display', 'flex');
            let target = '#group_blank .contact-chat ul.chatappend';
            addChatItem(target, message.from, message);
        } else if ($('#cast_chat').hasClass('active') && message.from == currentUserId) {
            // $('#group_blank .rightchat').css('display', 'none');
            // $('#group_blank .call-list-center').css('display', 'none');
            // $('#group_blank .chatappend').css('display', 'flex');
            let target = '#cast_chat > div.contact-chat > ul.chatappend';
            addChatItem(target, message.from, message);

        } else {
            if (message.from == currentUserId || message.from == currentContactId) {
                let target = '#chating .contact-chat ul.chatappend';
                addChatItem(target, message.from, message);
                $('.typing-m').remove();
                $(".messages").animate({
                    scrollTop: $('#chating .contact-chat').height()
                }, "fast");
                $(`#direct > ul.chat-main li[key=${message.to}]`).insertBefore('#direct > ul.chat-main li:eq(0)');
            } else {
                // if (currentContactId) {
                //     $(`#direct > ul.chat-main li[key=${currentContactId}]`).removeClass('active');
                // }
                // currentContactId = Number(message.from);
                if (!$(`#direct > ul.chat-main li[key=${Number(message.from)}]`).length) {
                    let senderInfo = usersList.find(item => item.id == Number(message.from));
                    let userListTarget = $('.recent-default .recent-chat-list');
                    addChatUserListItem(userListTarget, senderInfo);
                } else {
                    $(`#direct > ul.chat-main li[key=${message.from}]`).insertBefore('#direct > ul.chat-main li:eq(0)');
                    $(`#direct > ul.chat-main li[key=${message.from}] h6.status`).css('display', 'none');
                    $(`#direct > ul.chat-main li[key=${message.from}] .date-status .badge`).css('display', 'inline-flex');
                    let count = $(`#direct > ul.chat-main li[key=${message.from}] .date-status .badge`).text() || 0;
                    $(`#direct > ul.chat-main li[key=${message.from}] .date-status .badge`).html(Number(count) + 1);
                }
                // $(`#direct > ul.chat-main li[key=${currentContactId}]`).addClass('active');
                // setCurrentChatContent(currentContactId);
            }
        }

    });
    socket.on('arrive:message', message => {
        setTimeout(() => {
            $(`.chatappend .msg-item[key=${message.messageId}] h6`).removeClass('sent')
            $(`.chatappend .msg-item[key=${message.messageId}] h6`).addClass('arrived')
            $(`.chatappend .msg-item[key=${message.messageId}] h6`).removeClass('read')
        }, 1000);
    })
    socket.on('read:message', message => {
        setTimeout(() => {
            $(`.chatappend .msg-item[key=${message.messageId}] h6`).removeClass('sent')
            $(`.chatappend .msg-item[key=${message.messageId}] h6`).removeClass('arrived')
            $(`.chatappend .msg-item[key=${message.messageId}] h6`).addClass('read')
        }, 2000);
    })

    socket.on('receive:typing', data => {
        if (data == currentContactId) {
            typingMessage();
        }
    });
    socket.on('delete:message', data => {
        if (data.state) {
            let element = $('.chatappend').find(`[key=${data.id}]`).closest('li.msg-item');
            element.length ? element.remove() : '';
        } else {
            let currentContactName = getCertainUserInfoById(currentContactId).username;
            alert(`This photo has been paid by ${currentContactName}. You can not delete this. `);
        }
    })
    new Promise(resolve => {
        getUsersList(resolve);
    }).then(() => {
        $('.balance-amount').text(`$${getCertainUserInfoById(currentUserId).balances.toFixed(2)}`)
        getRecentChatUsers();
        searchAndAddRecentChatList();
        getContactList();
        displayTypingAction();
        deleteMessages();
        displayRate();

    });
    $('#logoutBtn').on('click', () => {
        socket.emit('logout', {
            currentUserId
        });
    });

    // displayChatData();
    $('ul.chat-main.chat-item-list').on('click', 'li', (e) => {

        $('.section-py-space').css('display', 'none');
        $('.app-list').css('display', 'block');
        $('#content').css('display', 'block');

        $('#chating').addClass('active');
        $('#group_blank').removeClass('active');

        if (currentContactId) {
            $(`ul.chat-item-list li[key=${currentContactId}]`).removeClass('active');
        }
        currentContactId = Number($(e.currentTarget).attr('key'));
        $(`ul.chat-item-list li[key=${currentContactId}]`).addClass('active');
        $(`ul.chat-main li[key=${currentContactId}] h6.status`).css('display', 'block');
        $(`ul.chat-main li[key=${currentContactId}] .date-status .badge`).text('');
        $(`ul.chat-main li[key=${currentContactId}] .date-status .badge`).css('display', 'none');
        setCurrentChatContent(currentContactId);
        var contentwidth = jQuery(window).width();
        if (contentwidth <= '768') {
            $('.chitchat-container').toggleClass("mobile-menu");
        }
        if (contentwidth <= '575') {
            $('.main-nav').removeClass("on");
        }
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
    $('.selfProfileBtn').on('click', () => {
        displayProfileContent(currentUserId);
        $('.chitchat-container').toggleClass("mobile-menu");
        if ($(window).width() <= 768) {
            $('.main-nav').removeClass("on");
        }
    });
    $('.menu-trigger').on('click', () => {
        if (currentContactId)
            displayProfileContent(currentContactId);
    })
    $('.balance-amount').on('click', () => {
        displayPaymentHistory(currentUserId);
    })


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
        success: function(res) {
            if (res.state == 'true') {
                let {
                    recentChatUsers,
                    lastChatUserId
                } = res;
                recentChatUsers = recentChatUsers.map(item => getCertainUserInfoById(item));
                currentContactId = lastChatUserId;
                let userListTarget = $('.recent-default .recent-chat-list');
                userListTarget.empty();
                recentChatUsers.reverse().forEach(item => {
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
        error: function(res) {
            alert('Get Recent User Failed');
            // document.location.href = '/login';
        }
    });
}

function setCurrentChatContent(contactorId) {
    $('.spining').css('display', 'flex');

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
        success: function(res) {
            if (res.state == 'true') {
                getUsersList();
                let {
                    messageData
                } = res;
                let contactorInfo = getCertainUserInfoById(contactorId);
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
                } else {
                    $('.profile.menu-trigger').css('background-image', `url("/images/default-avatar.png")`);
                }
                //whole rate display
                // displayProfileContent(rateData)
                displayProfileContent(contactorId)

                //Chat data display
                $('#chating .contact-chat ul.chatappend').empty();

                new Promise(resolve => {
                    if (messageData) {
                        let target = '#chating .contact-chat ul.chatappend';
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
                        scrollTop: $('#chating .contact-chat').height()
                    }, 'fast');
                    setTimeout(() => {
                        $('.spining').css('display', 'none');
                    }, 1000);
                });
            }
        },
        error: function(response) {}
    });


}

function getUsersList(resolve) {
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
        success: function(res) {
            usersList = res.data;
            if (resolve) resolve();
        },
        error: function(response) {
            // document.location.href = '/';
            alert('UserList Error');
        }
    });
}

function searchAndAddRecentChatList() {
    let keyuptimer;
    let target = $('.recent-default .recent-chat-list');
    $('.new-chat-search').bind('keyup', function() {
        if ($('#direct-tab').hasClass('active')) {
            clearTimeout(keyuptimer);
            keyuptimer = setTimeout(function() {
                let value = $('.new-chat-search').val();
                let users = Array.from($('.recent-chat-list .details h5')).map(item => item.innerText);
                // Array.from($('.recent-chat-list .details h5')).forEach(item => {
                //     if (item.innerText.toLocaleLowerCase().includes(value.toLocaleLowerCase())) {
                //         $(item).closest('li').css('display', 'block');
                //     } else {
                //         $(item).closest('li').css('display', 'none');
                //     }
                // })
                if (value) {
                    target.empty();
                    usersList.reverse().filter(item => item.id != currentUserId && item.username.toLowerCase().includes(value.toLowerCase())).forEach(item => {
                        addChatUserListItem(target, item);
                    });
                    $(`ul.chat-main li[key=${currentContactId}]`).addClass('active');
                } else {

                    getRecentChatUsers();
                }
            }, 100);
        }
    });
    $('.recent-default.dynemic-sidebar.active .text-end .close-search').on('click', () => {
        // if ($('#direct-tab').hasClass('active')) {
        $('.new-chat-search').val('');
        getRecentChatUsers();
        // }
    });
}

function addChatUserListItem(target, data) {
    $(target).prepend(
        `<li data-to="blank" key="${data.id}">
            <div class="chat-box">
            <div class="profile ${data.logout ? 'offline' : 'online'} bg-size" style="background-image: url(${data.avatar ? 'v1/api/downloadFile?path=' + data.avatar : "/images/default-avatar.png"}); background-size: cover; background-position: center center; display: block;">
                
            </div>
            <div class="details">
                <h5>${data.username}</h5>
                <h6>${data.description || 'Hello'}</h6>
            </div>
            <div class="date-status"><i class="ti-pin2"></i>
                <h6>22/10/19</h6>
                <h6 class="font-success status"></h6>
                <div class="badge badge-primary sm"></div>
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
                success: function(res) {
                    let target = '#contact-list .chat-main';
                    $(target).empty();
                    res.reverse().forEach(item => {
                        addChatUserListItem(target, usersList.find(user => user.id == item.contact_id))
                    });

                },
                error: function(response) {

                }
            });
        }
    });
}

function addContact(email) {
    var form_data = new FormData();
    form_data.append('email', email || $('#exampleInputEmail1').val());
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
        success: function(res) {
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
                if (email) {
                    let username = getCertainUserInfoById(currentContactId).username;
                    alert(`${username} has been added to contacts successfully`);
                }
            }
        },
        error: function(response) {
            // document.location.href = '/';
            alert('Add Contact Error');
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
    let senderName = getCertainUserInfoById(currentUserId).username;

    if ($('#group_blank').hasClass('active')) {
        var currentContactIdArr = Array.from($('#group_blank > div.contact-details .media-body span')).map(item => Number($(item).attr('userId')));
        var castTitle = $('#msgchatModal .cast_title input').val();
        socket.emit('send:castMessage', { currentContactIdArr, message, senderName, castTitle, kind: 0 });
        $('#msgchatModal .cast_title input').val('');

    } else if ($('#cast_chat').hasClass('active')) {
        var currentContactIdArr = $('#cast > ul.chat-main > li.active').attr('recipients').split(', ').map(item => Number(item));
        var castTitle = $('#cast_chat > div.contact-details div.media-body > h5').text();
        socket.emit('send:castMessage', { currentContactIdArr, message, senderName, castTitle, kind: 0 });
    } else {
        var currentContactIdArr = [currentContactId];
    }
    if (currentContactIdArr.length) {
        socket.emit('message', {
            currentContactIdArr,
            message,
            senderName,
        });
    }
};

function displayTypingAction() {
    $('.message-input input').on('keyup', function(e) {
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
            scrollTop: $('#chating .contact-chat').height()
        }, "fast");
    }
    if (delta < 1500) {
        typingTime = new Date();
        clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
        $('.typing-m').remove();
        $(".messages").animate({
            scrollTop: $('#chating .contact-chat').height()
        }, "fast");
        typingTime = undefined;
    }, 1500);


}

function addChatItem(target, senderId, data, loadFlag) {
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
                                `<h5>${data.content}</h5>`
                                : data.kind == 1 ?
                                    `<div class="camera-icon" requestid="${data.requestId}">$${data.content}</div>`
                                    : data.kind == 2 ? `<img class="receive_photo" messageId="${data.messageId}" photoId="${data.photoId}" src="${data.content}">` : ''}
                            <div class="msg-dropdown-main">
                                <div class="msg-open-btn"><span>Open</span></div>
                                <div class="msg-setting"><i class="ti-more-alt"></i></div>
                                <div class="msg-dropdown"> 
                                    <ul>
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
    // $(".messages").animate({ scrollTop: $('#chating .contact-chat').height() }, 'fast');

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
    $('.contact-profile .name h3').html(userInfo.username);
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
        error: function (response) {}
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
                <div class="recent-profile"><img class="bg-img" src="${item.avatar ? 'v1/api/downloadFile?path=' + item.avatar : '/images/default-avatar.png'}"
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
            socket.emit('deleteMessage', {
                currentContactId,
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
                    let amount = sendFlag ? (item.amount / 0.7).toFixed(2) : (item.amount).toFixed(2);
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
                                    <span class=${sendFlag?'font-danger':'font-success'}>${sendFlag ? '-' : ''}$${amount}</span>
                                    <h6 class="status ${item.state ? 'font-success' : 'font-warning'}" request-status="4"> ${status[item.state]}</h6>
                                </div>
                            </div>
                        </a>
                    </li>`)

                })
            }
        },
        error: function (response) {}
    });
}

function displayTimeString(time) {
    let dateString = time.toDateString();
    let timeString = time.toLocaleTimeString();
    let nowDateString = new Date().toDateString();
    let timeDiffer = parseInt((new Date(nowDateString) - new Date(dateString)) / (1000 * 60 * 60 * 24), 10);
    switch(timeDiffer) {
        case 0:
            return timeString;
        case 1:
            return 'Yesterday ' + timeString;
        default:
            return dateString + ' ' + timeString;
    }
}