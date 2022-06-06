

$(document).ready(function () {
    $('#group_chat').on('click', '.leave_group_btn', function () {
        if (confirm("You will leave this Group")) {
            if (currentGroupId) {
                socket.emit('leave:Group', { currentGroupId, currentGroupUsers });
            }
        }
    });

    socket.on('leave:group', data => {
        console.log(data);
        if (data.state == true) {
            currentGroupId = $('#group .group-main>li.active').next().attr('groupId') || $('#group .group-main>li.active').prev().attr('groupId');
            currentGroupUsers = $('#group .group-main>li.active').next().attr('groupUsers') || $('#group .group-main>li.active').prev().attr('groupUsers');
            $('#group .group-main>li.active').remove();
            $(`#group > ul.group-main>li[groupId="${currentGroupId}"]`).click();
        } else {
            // alert("You are owner of this group. You can't leave group.")
        }
    })

    $('#group_chat').on('click', '.remove_group_btn', function () {
        let content = 'You will remove this Group?'
        let removeGroupAction = () => {
            currentGroupId = $('#group .group-main>li.active').next().attr('groupId') || $('#group .group-main>li.active').prev().attr('groupId');
            setTimeout(() => {
                $('#group .group-main>li.active').slideUp(300, () => {
                    $(`#group > ul.group-main>li[groupId="${currentGroupId}"]`).click();
                    if (!currentGroupId) {
                        $('#group_chat .chatappend').empty();
                    }
                });
            });
        }
        confirmModal('', content, removeGroupAction);
    });

    $('#group_chat .chat-frind-content').on('click', '.add_users_btn', function () {
        console.log(currentGroupId)
        console.log(currentGroupUsers)
        let groupTitle = $('#group .group-main li.active .details h5').text() || 'Group Title is undefined';
        $('#custom_modal').modal('show');
        $('#custom_modal .modal-content').addClass('edit_group_modal');
        $('#custom_modal').find('.modal-title').text('Add/Remove Group Users');
        $('#custom_modal').find('.sub_title span').text('Group Title');
        $('#custom_modal').find('.sub_title input').val(groupTitle);
        $('#custom_modal').find('.btn_group .btn').text('Save');
        new Promise((resolve) => getUsersList(resolve)).then((contactList) => {
            let target = '#custom_modal .chat-main';
            $(target).empty();
            let statusItem = '<input class="form-check-input" type="checkbox" value="" aria-label="...">';
            contactList.filter(item => item.id != currentUserId).forEach(item => addUsersListItem(target, item, statusItem));
            currentGroupUsers.split(',').forEach(userId => {
                $(`#custom_modal ul.chat-main li[key=${userId}] input`).prop('checked', true);
                $(`#custom_modal ul.chat-main li[key=${userId}]`).addClass('active');
            });
        });
    });

    $('#custom_modal').on('click', '.modal-content.edit_group_modal .btn_group .btn', function () {
        groupUsers = Array.from($('#custom_modal ul.chat-main li.active')).map(listItem => $(listItem).attr('key')).join(',') + ',' + currentUserId;
        console.log(groupUsers);
        socket.emit('edit:groupUsers', { currentGroupId, groupUsers });
    });
});


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


function addUsersListItem(target, data, statusItem) {
    $(target).prepend(
        `<li data-to="blank" key="${data.id}">
            <div class="chat-box">
                <div class="profile ${data.logout ? 'offline' : 'online'} bg-size" style="background-image: url(${data.avatar ? 'v1/api/downloadFile?path=' + data.avatar : "/images/default-avatar.png"}); background-size: cover; background-position: center center; display: block;">
                    
                </div>
                <div class="details">
                    <h5>${data.username}</h5>
                    <h6>${data.description || 'Hello'}</h6>
                </div>
                <div class="date-status">
                    ${statusItem}
                </div>
            </div>
        </li>`
    );
}
