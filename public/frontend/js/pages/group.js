

$(document).ready(function () {
    $('#group_chat').on('click', '.leave_group_btn', function () {
        if (confirm("You will leave this Group")) {
            if (currentGroupId) {
                socket.emit('leave:Group', { currentGroupId,  currentGroupUsers});
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
        if (confirm("You will remove this Group")) {
            if (currentGroupId) {
                socket.emit('remove:Group', { currentGroupId,  currentGroupUsers});
            }
        }
    });
});

