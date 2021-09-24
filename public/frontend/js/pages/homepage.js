var $contact_active;
var currentContactId;
var contactorInfo = {};
var usersList = [];

$(document).ready(() => { 

   
    getRecentChatUsers();
    getUsersList();
    searchAndAddRecentChatList();
    getContactList();
    // displayChatData();
    $('ul.chat-main').on('click', 'li', (e) => { 
        if (currentContactId) {
            $(`ul.chat-main li[key=${currentContactId}]`).removeClass('active');
        }
        currentContactId = $(e.currentTarget).attr('key');
        $(`ul.chat-main li[key=${currentContactId}]`).addClass('active');

        
        setCurrentChatContent(currentContactId);

    });
    $('#profileImageUploadBtn').css('pointer-events', 'none');
    //profile Image Ajax Change
    changeProfileImageAjax();
    
});

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
                let [contactorInfo] = res.contactorInfo;
                
                currentContactId = contactorId;
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
                console.log(contactorInfo);
                $('.contact-profile .name h5').html(contactorInfo.location);
                $('.contact-profile .name h6').html(contactorInfo.description)

                //Chat data display
                $('.contact-chat ul.chatappend').html('');

                if (messageData) {
                    let target = '.contact-chat ul.chatappend';
                    messageData.forEach(item => {
                        let data = {};
                        data.type = item.sender == currentUserId ? 'replies' : 'sent';
                        data.username = item.sender == currentUserId ? currentUsername : contactorInfo.username;
                        data.content = item.content;
                        addChatItem(target, data);
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
                usersList.filter(item => item.username.includes(value)).forEach(item => {
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
            <div class="profile ${data.logout ? 'offline' : 'online'} bg-size" style="background-image: url(${data.avatar ? 'v1/api/downloadFile?path='+data.avatar : "/chat/images/contact/2.jpg"}); background-size: cover; background-position: center center; display: block;">
                
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
                    console.log(res);
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
            console.log(res);
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





function addChatItem(target, data) {
    $(target).append(`<li class="${data.type}">
        <div class="media">
            <div class="profile me-4"><img class="bg-img" src="/chat/images/contact/2.jpg" alt="Avatar"/></div>
            <div class="media-body">
                <div class="contact-name">
                    <h5>${data.username}</h5>
                    <h6>01:40 AM</h6>
                    <ul class="msg-box">
                        <li class="msg-setting-main">
                            
                            <h5>${data.content}</h5>
                        </li>  
                    </ul>
                </div>
            </div>
        </div>
    </li>`);
}

function displayChatData() {
    if ($('#content .chat-content').hasClass('active')) {
        var form_data = new FormData();
        form_data.append('currentContactId', currentContactId);
        $.ajax({
            url: '/home/getChatData',
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
                let { contactor, message } = res;
                if (contactor) {
                    contactorInfo = Object.assign(contactor || {});
                    $('.chat-content .contactor-name').html(contactor.username);
                    if (contactorInfo.avatar) {
                        $('.profile.menu-trigger').css('background-image', `url("v1/api/downloadFile?path=${contactorInfo.avatar}")`);
                    }
                    currentContactId = contactor.id;
                }
                $('.contact-chat ul.chatappend').html('');

                if (res.message != 'no data' && res.message) {
                    let target = '.contact-chat ul.chatappend';
                    message.forEach(item => {
                        let data = {};
                        data.type = item.sender == currentUserId ? 'replies' : 'sent';
                        data.username = item.sender == currentUserId ? currentUsername : contactor.username;
                        data.content = item.content;
                        addChatItem(target, data);
                    });
                }
            },
            error: function (response) {

            }
        });
    }
}

function sendMessage() {
    var form_data = new FormData();
    form_data.append('content', $('#setemoj').val());
    form_data.append('currentContactId', currentContactId);

    $.ajax({
        url: '/home/sendMessage',
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
            if (res.insertion == true) {
                let data = {};
                data.username = 'You';
                data.content = $('#setemoj').val();
                let target = '.contact-chat ul.chatappend';
                addChatItem(target, data);
            } else {

            }
        },
        error: function (response) {
            alert('The operation is failed');
        }
    });
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

function changeProfileInfo() {

}