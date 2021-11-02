
var $contact_active;
var currentContactId;
var contactorInfo = {};
var usersList = [];
var socket;

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
        } else {
            if (currentContactId) {
                $(`ul.chat-main li[key=${currentContactId}]`).removeClass('active');
            }
            currentContactId = Number(message.from);
            if (!$(`ul.chat-main li[key=${currentContactId}]`).length) {
                let currentContactorInfo = usersList.find(item => item.id == currentContactId);
                let userListTarget = $('.recent-default .recent-chat-list');
                addChatUserListItem(userListTarget, currentContactorInfo);
            }
            $(`ul.chat-main li[key=${currentContactId}]`).addClass('active');
            setCurrentChatContent(currentContactId);
        }
    });

    getRecentChatUsers();
    getUsersList();
    searchAndAddRecentChatList();
    getContactList();
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
        $('#createPhoto .switch-list').addClass('d-none');
        $('#createPhoto .emojis-price').removeClass('d-none');
        $('#createPhoto .save-send').css('margin-left', '0px');
    });

    $('#acceptPhotoRequestBtn').on('click', () => {
        // $('#createPhoto').modal('show');
        $('#createPhoto .switch-list').removeClass('d-none');
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
                let { messageData } = res;
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

                //Chat data display
                $('.contact-chat ul.chatappend').empty();

                if (messageData) {
                    let target = '.contact-chat ul.chatappend';
                    messageData.reverse().forEach(item => {
                        item.messageId = item.id;
                        addChatItem(target, item.sender, item);
                    });
                }
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
                usersList.filter(item => item.id != currentUserId && item.username.includes(value)).forEach(item => {
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
    // let target = '.contact-chat ul.chatappend';
    // let data = usersList.find(user => user.id == currentUserId);
    var message = $('.message-input input').val();
    if ($.trim(message) == '') {
        return false;
    }
    // data.type = "replies";
    // data.kind = 0;
    // data.create_at = new Date();
    // data.content = message;
    // addChatItem(target, data);

    $('.message-input input').val(null);
    $('.chat-main .active .details h6').html('<span>You : </span>' + message);
    // $(".messages").animate({ scrollTop: $(document).height() }, "fast");
    socket.emit('message', { currentContactId, message });
};

function typingMessage() {
    //   $('<li class="sent last typing-m"> <div class="media"> <div class="profile mr-4 bg-size" style="background-image: url(&quot;/chat/images/contact/2.jpg&quot;); background-size: cover; background-position: center center; display: block;"><img class="bg-img" src="/chat/images/contact/2.jpg" alt="Avatar" style="display: none;"></div><div class="media-body"> <div class="contact-name"> <h5>Josephin water</h5> <h6>01:42 AM</h6> <ul class="msg-box"> <li> <h5> <div class="type"> <div class="typing-loader"></div></div></h5> </li></ul> </div></div></div></li>').appendTo($('.messages .chatappend'));
    //   $(".messages").animate({ scrollTop: $(document).height() }, "fast");   
    //   setTimeout(function() {
    //     $('.typing-m').hide(); 
    //     $('<li class="sent"> <div class="media"> <div class="profile mr-4 bg-size" style="background-image: url(&quot;/chat/images/contact/2.jpg&quot;); background-size: cover; background-position: center center; display: block;"></div><div class="media-body"> <div class="contact-name"> <h5>Josephin water</h5> <h6>01:35 AM</h6> <ul class="msg-box"> <li> <h5> Sorry I busy right now, I will text you later </h5> <div class="badge badge-success sm ml-2"> R</div></li></ul> </div></div></div></li>').appendTo($('.messages .chatappend'));
    //     $(".messages").animate({ scrollTop: $(document).height() }, "fast");   
    // }, 2000);
}


function addChatItem(target, senderId, data) {
    let senderInfo = getCertainUserInfoById(senderId);
    let type = senderInfo.id == currentUserId ? "replies" : "sent";
    let time = new Date(data.created_at);

    $(target).append(`<li class="${type}">
        <div class="media">
            <div class="profile me-4 bg-size" style="background-image: url(${senderInfo.avatar ? 'v1/api/downloadFile?path=' + senderInfo.avatar : "/chat/images/contact/2.jpg"}); background-size: cover; background-position: center center;">
            </div>
            <div class="media-body">
                <div class="contact-name">
                    <h5>${senderInfo.username}</h5>
                    <h6>${time.toLocaleTimeString()}</h6>
                    <ul class="msg-box">
                        <li key="${data.messageId}">
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
    </li>`);
    if (data.rate) {
        getContentRate(`.msg-box li[key="${data.messageId}"]`, data.rate)
    }
    $(".messages").animate({ scrollTop: $('.contact-chat').height() }, "fast");

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

