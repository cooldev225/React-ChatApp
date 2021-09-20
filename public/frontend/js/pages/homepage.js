var $contact_active;
var currentContactId;
var contactTimer;
var chatContentTimer;
var contactorInfo = {};
$(document).ready(() => {
    getContactList();
    displayChatData();
    $('ul.chat-main').on('click', 'li', (e) => {
        currentContactId = $(e.currentTarget).attr('key');
        // displayChatData(contactId);
    });
    $('#profileImageUploadBtn').css('pointer-events', 'none');
    //profile Image Ajax Change
    changeProfileImageAjax();

});

function addContactItem(target, data) {
    $(target).append(
        `<li key="${data.contact_id}">
            <div class="chat-box">
            <div class="profile offline">
                <img class="bg-img" src="/chat/images/contact/1.jpg" alt="Avatar" />
            </div>
            <div class="details">
                <h5>${data.username}</h5>
                <h6>Hello</h6>
            </div>
            <div class="date-status">
                <h6>${data.created_at.toLocaleDateString("en-US")}</h6>
                <h6 class="font-success status"></h6>
            </div>
            </div>
        </li>`
    );
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
                addContactItem(target, data);
            }
        },
        error: function(response) {
            alert('The operation is failed');
        }
    });
}

function getContactList() {

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
                res.forEach(item => {
                    let data = {};
                    data.contact_id = item.contact_id;
                    data.username = item.username;
                    data.created_at = new Date();
                    // data.created_at = item.created_at;
                    addContactItem(target, data);
                });

            },
            error: function(response) {

            }
        });
    }
    contactTimer = setTimeout(function() {
        getContactList();
    }, 5000);
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
                        <div class="msg-dropdown-main">
                            <div class="msg-setting"><i class="ti-more-alt"></i></div>
                            <div class="msg-dropdown"> 
                            <ul>
                                <li><a href="#"><i class="fa fa-share"></i>forward</a></li>
                                <li><a href="#"><i class="fa fa-clone"></i>copy</a></li>
                                <li><a href="#"><i class="fa fa-star-o"></i>rating</a></li>
                                <li><a href="#"><i class="ti-trash"></i>delete</a></li>
                            </ul>
                            </div>
                        </div>
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
            success: function(res) {
                let { contactor, message } = res;
                contactorInfo = Object.assign(contactor || {});
                $('.chat-content .contactor-name').html(contactor.username);
                if (contactorInfo.avatar) {
                    $('.profile.menu-trigger').css('background-image', `url("v1/api/downloadFile?path=${contactorInfo.avatar}")`);
                }

                currentContactId = contactor.id;
                $('.contact-chat ul.chatappend').html('');
                if (res.message != 'no data' && res.message) {
                    let target = '.contact-chat ul.chatappend';
                    message.forEach(item => {
                        let data = {};
                        data.type = item.sender == currentUserId ? 'replies' : 'sent';
                        data.username = item.sender == currentUserId ? 'You' : contactor.username;
                        data.content = item.content;
                        addChatItem(target, data);
                        // $('.contact-chat ul.chatappend').append(`<li class="${type}">
                        //     <div class="media">
                        //         <div class="profile me-4"><img class="bg-img" src="/chat/images/contact/2.jpg" alt="Avatar"/></div>
                        //         <div class="media-body">
                        //             <div class="contact-name">
                        //             <h5>${username}</h5>
                        //             <h6>01:40 AM</h6>
                        //             <ul class="msg-box">
                        //                 <li class="msg-setting-main">
                        //                     <div class="msg-dropdown-main">
                        //                         <div class="msg-setting"><i class="ti-more-alt"></i></div>
                        //                         <div class="msg-dropdown"> 
                        //                         <ul>
                        //                             <li><a href="#"><i class="fa fa-share"></i>forward</a></li>
                        //                             <li><a href="#"><i class="fa fa-clone"></i>copy</a></li>
                        //                             <li><a href="#"><i class="fa fa-star-o"></i>rating</a></li>
                        //                             <li><a href="#"><i class="ti-trash"></i>delete</a></li>
                        //                         </ul>
                        //                         </div>
                        //                     </div>
                        //                     <h5>${item.content}</h5>
                        //                 </li>

                        //             </ul>
                        //             </div>
                        //         </div>
                        //     </div>
                        // </li>`);
                    });
                }
            },
            error: function(response) {

            }
        });
    }
    chatContentTimer = setTimeout(function() {
        displayChatData();
    }, 3000);

}

// function getChatData() {
//     var form_data = new FormData();
//     $.ajax({
//         url: '/home/getChatData',
//         headers: {
//             'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
//         },
//         data: form_data,
//         cache: false,
//         contentType: false,
//         processData: false,
//         type: 'POST',
//         dataType: "json",
//         success: function(response) {
//             console.log(response);
//         },
//         error: function(response) {

//         }
//     });
// }

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
        success: function(res) {
            if (res.insertion == true) {
                let data = {};
                data.username = 'You';
                data.content = $('#setemoj').val();
                let target = '.contact-chat ul.chatappend';
                addChatItem(target, data);
            } else {

            }
        },
        error: function(response) {
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