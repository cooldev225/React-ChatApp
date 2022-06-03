

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

