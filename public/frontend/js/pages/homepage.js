var $contact_active;
$(document).ready(() => {
    getContactList();
});

function addContactItem(target, data) {
    $(target).append(
        `<li>
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
                data.create_at = new Date();
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
    let timer = setTimeout(function() {
        getContactList();
    }, 5000);
}

function getChatData() {
    var form_data = new FormData();
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
        success: function(response) {
            console.log(response);
        },
        error: function(response) {

        }
    });
}