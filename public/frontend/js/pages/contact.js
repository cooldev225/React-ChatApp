$(document).ready(() => {
    $('#direct_chat .add_contact_user').on('click', () => {
        new Promise(resolve => getUsersListByGroupId(currentDirectId, resolve)).then(data => {
            console.log(data);
            let userId = data.find(id => id != currentUserId);
            let contactorInfo = getCertainUserInfoById(userId);
            if (contactorInfo.email) {
                addContact(contactorInfo.email);
            }

        })
    });

    // show Cast List
    $('.sidebar-top li.contact_list_btn').on('click', () => {
        let target = '.contact-list-tab .chat-main';
        new Promise(resolve => getContactListData(resolve)).then(data => {
            console.log(data);
            $(target).empty();
            data.forEach(item => addNewUserItem(target, item))
        });
    });

});

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
                addNewUserItem(target, data);
                if (email) {
                    let username = getCertainUserInfoById(currentContactId).username;
                    alert(`${username} has been added to contacts successfully`);
                }
            }
        },
        error: function (response) {
            // document.location.href = '/';
            alert('Add Contact Error');
        }
    });
}

function getContactListData(resolve) {
    $.ajax({
        url: '/home/getContactList',
        headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        dataType: "json",
        success: function (res) {
            resolve(res);
        },
        error: function (response) {

        }
    });
}

function addNewUserItem(target, data) {
    $(target).prepend(
        `<li data-to="blank" userId="${data.id}">
            <div class="chat-box">
                <div class="profile ${data.logout ? 'offline' : 'online'} bg-size" style="background-image: url(${data.avatar ? 'v1/api/downloadFile?path=' + data.avatar : "/images/default-avatar.png"}); background-size: cover; background-position: center center; display: block;">
                    
                </div>
                <div class="details">
                    <h5>${data.username}</h5>
                    <h6>${data.description || 'Hello'}</h6>
                </div>
                <div class="date-status">
                    <i class="ti-trash"></i>
                    <h6></h6>
                    <h6 class="font-success status"></h6>
                    <div class="badge badge-primary sm"></div>
                </div>
            </div>
        </li>`
    );
}