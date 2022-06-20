

$(document).ready(function () {
    // create newGroup start
    $('.create_new_group_btn').on('click', function (e) {
        $('#custom_modal').modal('show');
        $('#custom_modal .modal-content').addClass('create_new_group_modal');
        $('#custom_modal').find('.modal-title').text('Create New Group');
        $('#custom_modal').find('.sub_title span').text('Group Title');
        $('#custom_modal').find('.sub_title input').val('');
        $('#custom_modal').find('.btn_group .btn').text('Create');
        new Promise((resolve) => getUsersList(resolve)).then((contactList) => {
            let target = '#custom_modal .chat-main';
            $(target).empty();
            let statusItem = '<input class="form-check-input" type="checkbox" value="" aria-label="...">';
            contactList.filter(item => item.id != currentUserId).forEach(item => addUsersListItem(target, item, statusItem));
        });
    });
    $('#custom_modal').on('click', '.modal-content.create_new_group_modal .btn_group .btn', function () {
        let title = $('#custom_modal').find('.sub_title input').val();
        if (!title) {
            $('#custom_modal .sub_title input').addClass('is-invalid');
            setTimeout(() => {
                $('#custom_modal .sub_title input').removeClass('is-invalid');
            }, 2000);
            return;
        }
        let users = Array.from($('#custom_modal .chat-main li.active')).map(item => $(item).attr('key'));
        users.push(currentUserId);
        socket.emit('create:group', { title, users, type: 2 });
        $('#custom_modal').modal('hide');
        $(`.chat-cont-setting`).removeClass('open');
        $('#custom_modal .modal-content').removeClass('create_new_group_modal');
        setTimeout(() => {
            $(`#group-tab`).click();
        }, 100);

    });
    // create new group end

    // create new cast start
    $('.create_new_cast_btn').on('click', function (e) {
        $('#custom_modal').modal('show');
        $('#custom_modal .modal-content').addClass('create_new_cast_modal');
        $('#custom_modal').find('.modal-title').text('Create New Cast');
        $('#custom_modal').find('.sub_title span').text('Cast Title');
        $('#custom_modal').find('.sub_title input').val('');
        $('#custom_modal').find('.btn_group .btn').text('Create');
        new Promise((resolve) => getUsersList(resolve)).then((contactList) => {
            let target = '#custom_modal .chat-main';
            $(target).empty();
            let statusItem = '<input class="form-check-input" type="checkbox" value="" aria-label="...">';
            contactList.filter(item => item.id != currentUserId).forEach(item => addUsersListItem(target, item, statusItem));
        });
    });
    $('#custom_modal').on('click', '.modal-content.create_new_cast_modal .btn_group .btn', function () {
        let title = $('#custom_modal').find('.sub_title input').val();
        if (!title) {
            $('#custom_modal .sub_title input').addClass('is-invalid');
            setTimeout(() => {
                $('#custom_modal .sub_title input').removeClass('is-invalid');
            }, 2000);
            return;
        }
        let users = Array.from($('#custom_modal .chat-main li.active')).map(item => $(item).attr('key'));
        users.push(currentUserId);
        socket.emit('create:group', { title, users, type: 3 });
        $('#custom_modal').modal('hide');
        $(`.chat-cont-setting`).removeClass('open');
        $('#custom_modal .modal-content').removeClass('create_new_cast_modal');
        setTimeout(() => {
            $(`#cast-tab`).click();
        }, 100);

    });
    // create new cast end

    socket.on('create:group', data => {
        if (data.type == 1) {
            var target = '#direct > ul.chat-main';
        } else if (data.type == 2) {
            var target = '#group > ul.group-main';
        } else if (data.type == 3) {
            var target = '#cast > ul.group-main';
        }
        // $(`#myTabContent .tab-pane.active .chat-main li[groupId=${data.id}`).addClass('active');
        addNewGroupItem(target, data);
        $(`#myTabContent1 .tab-pane.active .group-main li[groupId=${data.id}]`).click();
        convertListItems();
    });


    socket.on('send:groupMessage', data => {
        $(`#direct > ul.chat-main li[groupId=${Number(data.globalGroupId)}]`).insertBefore('#direct > ul.chat-main li:eq(0)');
        $(`#group > ul.chat-main li[groupId=${Number(data.globalGroupId)}]`).insertBefore('#group > ul.chat-main li:eq(0)');
        $(`#cast > ul.chat-main li[groupId=${Number(data.globalGroupId)}]`).insertBefore('#cast > ul.chat-main li:eq(0)');
        if (currentDirectId == data.globalGroupId) {
            var target = '#direct_chat .contact-chat ul.chatappend';
        } else if (currentGroupId == data.globalGroupId) {
            var target = '#group_chat .contact-chat ul.chatappend';
        } else if (currentCastId == data.globalGroupId) {
            var target = '#cast_chat .contact-chat ul.chatappend';
        }
        else if (!$(`#group > ul.chat-main li[groupId=${Number(data.globalGroupId)}]`).length) {

        }
        addGroupChatItem(target, data);
        $(".messages.active").animate({ scrollTop: $('.messages.active .contact-chat').height() }, 'fast');

        // SMS notification
        if (currentUserId != data.sender) {
            let type = data.kind == 2 ? 'photo' :
                data.kind == 1 ? 'request' :
                    data.kind == 0 ? 'text' : "new";
            //arrived message
            // socket.emit('arrive:message', data);
            if (document.visibilityState == "visible") {
                if (currentContactId == data.sender) {
                    //unread -> read
                    socket.emit('read:message', data);
                }
            } else {
                socket.emit('send:notification', {
                    sender: data.sender,
                    recipient: currentUserId,
                    groupId: data.globalGroupId,
                    senderName: data.senderName,
                    type
                });
            }
        }
    });

    $('#group_chat').on('click', '.leave_group_btn', function () {
        if (confirm("You will leave this Group")) {
            if (currentGroupId) {
                socket.emit('leave:group', { currentGroupId, currentGroupUsers });
            }
        }
    });

    socket.on('leave:group', data => {
        if (data.state == true) {
            currentGroupId = $('#group .group-main>li.active').next().attr('groupId') || $('#group .group-main>li.active').prev().attr('groupId');
            currentGroupUsers = $('#group .group-main>li.active').next().attr('groupUsers') || $('#group .group-main>li.active').prev().attr('groupUsers');
            $('#group .group-main>li.active').remove();
            $(`#group > ul.group-main>li[groupId="${currentGroupId}"]`).click();
        } else {
            // alert("You are owner of this group. You can't leave group.")
        }
    });

    $('#group_chat').on('click', '.remove_group_btn', function () {
        let content = 'You will remove this Group?'
        let removeGroupAction = () => {
            socket.emit('remove:group', { currentGroupId });
            // currentGroupId = $('#group .group-main>li.active').next().attr('groupId') || $('#group .group-main>li.active').prev().attr('groupId');
            // setTimeout(() => {
            //     $('#group .group-main>li.active').slideUp(300, () => {
            //         $(`#group > ul.group-main>li[groupId="${currentGroupId}"]`).click();
            //         if (!currentGroupId) {
            //             $('#group_chat .chatappend').empty();
            //         }
            //     });
            // });
        }
        confirmModal('', content, removeGroupAction);
    });
    socket.on('remove:group', data => {
        if (data.state == true) {
            currentGroupId = $('#group .group-main>li.active').next().attr('groupId') || $('#group .group-main>li.active').prev().attr('groupId');
            setTimeout(() => {
                $('#group .group-main>li.active').slideUp(300, () => {
                    $(`#group > ul.group-main>li[groupId="${currentGroupId}"]`).click();
                    if (!currentGroupId) {
                        $('#group_chat .chatappend').empty();
                    }
                });
            });
        } else {
            // alert("You are owner of this group. You can't leave group.")
        }
    });

    // add/remove user in group
    $('#group_chat .chat-frind-content').on('click', '.add_users_btn', function () {
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
        let groupUsers = Array.from($('#custom_modal ul.chat-main li.active')).map(listItem => $(listItem).attr('key'));
        groupUsers.push(currentUserId);
        socket.emit('edit:groupUsers', { currentGroupId, groupUsers: groupUsers.join(',') }, (res) => {
            if (res.status == 'OK') {
                $('#group-tab').click();
            }
        });
        $('#custom_modal .modal-content').removeClass('edit_group_modal');
        $('#custom_modal').modal('hide');
    });

    //invite users in group 
    $('#group_chat .chat-frind-content').on('click', '.invite_users_btn', function () {
        let groupTitle = $('#group .group-main li.active .details h5').text() || 'Group Title is undefined';
        $('#custom_modal').modal('show');
        $('#custom_modal .modal-content').addClass('invite_group_modal');
        $('#custom_modal').find('.modal-title').text('Invite Users');
        $('#custom_modal').find('.sub_title span').text('Group Title');
        $('#custom_modal').find('.sub_title input').val(groupTitle);
        $('#custom_modal').find('.btn_group .btn').text('Invite');
        new Promise((resolve) => getUsersList(resolve)).then((contactList) => {
            let target = '#custom_modal .chat-main';
            $(target).empty();
            let statusItem = '<input class="form-check-input" type="checkbox" value="" aria-label="...">';
            contactList.filter(item => !currentGroupUsers.split(',').find(id => item.id == id)).forEach(item => addUsersListItem(target, item, statusItem));
            // contactList.filter(item => item.id != currentUserId).forEach(item => addUsersListItem(target, item, statusItem));
        });
    });

    $('#custom_modal').on('click', '.modal-content.invite_group_modal .btn_group .btn', function () {
        let groupUsers = Array.from($('#custom_modal ul.chat-main li.active')).map(listItem => $(listItem).attr('key')).join(',');
        socket.emit('invite:groupUsers', { currentGroupId, groupUsers }, (res) => {
            if (res.status == 'OK') {
                $('#group-tab').click();
            }
        });
        $('#custom_modal .modal-content').removeClass('invite_group_modal');
        $('#custom_modal').modal('hide');
    });
});

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

function addNewGroupItem(target, data) {

    let { id, title, avatar, type, users } = data;
    if (type == 1) {
        let directId = users.find(item => item != currentUserId);
        let userInfo = getCertainUserInfoById(directId);
        avatar = userInfo.avatar;
        title = userInfo.username;
        var description = userInfo.description;
    }
    let groupUsersAvatar = users.filter((item, index) => index < 3).map(item => {
        let avatar = getCertainUserInfoById(item).avatar;
        return avatar ? `v1/api/downloadFile?path=${avatar}` : '/images/default-avatar.png';
    });
    let avatarContents = groupUsersAvatar.reduce((content, item) => content + `<li><a class="group-tp" href="#" data-tippy-content="John Doe"> <img src="${item}" alt="group-icon-img"/></a></li>\n`, '');
    avatarContents = type == 1 ? '' : avatarContents;
    // let displayNames = groupUsers.length > 24 ? groupUsers.slice(0, 24) + '...' : groupUsers;
    let countRecipients = users.length;
    $(target).prepend(
        `<li class="" data-to="group_chat" groupId=${id} groupUsers=${users.join(',')}>
            <div class="group-box">
                <div class="profile">
                    <img class="bg-img" src=${avatar ? 'v1/api/downloadFile?path=' + avatar : '/images/default-avatar.png'} alt="Avatar"/>
                </div>
                <div class="details">
                    <h5>${title}</h5>
                    <h6 >${data.lastMessage || description}</h6>
                </div>
                <div class="date-status">
                    <ul class="grop-icon">
                        ${avatarContents}
                        ${countRecipients > 3 ? "<li>+" + (countRecipients - 3) + "</li>" : ""}
                    </ul>
                </div>
            </div>
        </li>`
    );
}

function addGroupChatItem(target, data, loadFlag) {
    if (data.reply_id) {
        if (data.reply_kind == 0) {
            var replyContent = $('.chatappend').find(`li.msg-item[key="${data.reply_id}"]`).find('.msg-setting-main .content').text();
        } else if (data.reply_kind == 2) {
            let imageSrc = $('.chatappend').find(`li.msg-item[key="${data.reply_id}"]`).find('.receive_photo').attr('src');
            var replyContent = `<img src="${imageSrc}" width="50">`;
        }
    }
    let senderInfo = getCertainUserInfoById(data.sender);
    let type = senderInfo.id == currentUserId ? "replies" : "sent";
    let time = data.created_at ? new Date(data.created_at) : new Date();
    let item = `<li class="${type} msg-item" key="${data.id || data.messageId}" kind="${data.kind || 0}">
        <div class="media">
            <div class="profile me-4 bg-size" style="background-image: url(${senderInfo.avatar ? 'v1/api/downloadFile?path=' + senderInfo.avatar : "/images/default-avatar.png"}); background-size: cover; background-position: center center;">
            </div>
            <div class="media-body">
                <div class="contact-name">
                    <h5>${senderInfo.username}</h5>
                    <h6 class="${State[data.state || 0]}">${displayTimeString(time)}</h6>
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
    // $(".messages.active").animate({ scrollTop: $('.messages.active .contact-chat').height() }, 'fast');

    if (data.rate) {
        getContentRate(`li.msg-item[key="${data.id}"]`, data.rate)
    }

}

function showCurrentChatHistory(target, groupId, groupUsers, pageSettingFlag) {
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
                $(target).empty();
                getUsersList();
                let { messageData, groupInfo } = res;
                // chat page setting
                if (pageSettingFlag == 1) {
                    groupInfo.avatar = $('#direct .chat-main li.active .profile .bg-img').attr('src');
                    groupInfo.title = $('#direct .chat-main li.active .details h5').text();
                    $(`.messages:nth-of-type(${pageSettingFlag + 1})`).find('.profile.menu-trigger').css('background-image', `url(${groupInfo.avatar})`)
                } else {
                    if (groupInfo.avatar) {
                        $(`.messages:nth-of-type(${pageSettingFlag + 1})`).find('.profile.menu-trigger').css('background-image', `url("v1/api/downloadFile?path=${groupInfo.avatar}")`);
                    }
                    console.log(groupUsers);
                    
                    let groupUsersTarget = $(`.messages:nth-of-type(${pageSettingFlag + 1})`).find('.contact-chat .groupuser');
                    groupUsersTarget.empty();
                    let groupUsersAvatar = groupUsers.split(',').filter(id => id != currentUserId).map(id => {
                        let avatar = getCertainUserInfoById(id).avatar;
                        return avatar ? `v1/api/downloadFile?path=${avatar}` : '/images/default-avatar.png';
                    });
                    groupUsersAvatar.forEach(avatar => {
                        groupUsersTarget.append(`<div class="gr-profile dot-btn dot-success"><img class="bg-img" src="${avatar}" alt="Avatar"/></div>`);
                    })
                    convertListItems();
                }
                $(`.messages:nth-of-type(${pageSettingFlag + 1})`).find('.group_title').html(groupInfo.title);


                // show chat page display
                $('.section-py-space').css('display', 'none');
                $('.app-list').css('display', 'block');
                $('#content').css('display', 'block');

                // chat history append
                new Promise(resolve => {
                    if (messageData.length) {
                        messageData.reverse().forEach(item => {
                            if (item.state != 3 && currentUserId != item.sender) {
                                let message = {
                                    from: item.sender,
                                    to: currentUserId,
                                    content: item.content,
                                    messageId: item.id,
                                    state: item.state,
                                }
                                socket.emit('read:message', message);
                            }
                            addGroupChatItem(target, item);
                        });
                    }
                    resolve();
                }).then(() => {
                    $(".messages").animate({ scrollTop: $('.messages.active .contact-chat').height() }, 'fast');
                    setTimeout(() => {
                        $('.spining').css('display', 'none');
                    }, 1000);
                });
            } else {
                $('.section-py-space').css('display', 'block');
                $('#content').css('display', 'none');
                $('.app-list').css('display', 'none');
            }
        },
        error: function (response) { }
    });
}

function getUsersListByGroupId(groupId, resolve) {
    var form_data = new FormData();
    form_data.append('groupId', groupId);
    $.ajax({
        url: '/home/getUsersListByGroupId',
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
                console.log(res.data);
                resolve(res.data);
            } else {
               
            }
        },
        error: function (response) { }
    });
}
