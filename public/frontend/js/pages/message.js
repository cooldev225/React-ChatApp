var oldRecipients = '';
var oldCastTitle = '';


$(document).ready(function () {
    $('#new_cast').on('click', () => {
        if (!$('#cast .chat-main').children().length) {
            getCastData();
        }
        showNewCastPage();
        $('#group_blank > .contact-details .media-body').empty();
        $('#group_blank .contact-chat ul.chatappend').empty()

    });

    $('#editCastListbtn').on('click', () => {
        // showNewCastPage();
    });

    $('#cast-tab').on('click', function () {
        getCastData();
    });

    $('#group-tab').on('click', function () {
        $.ajax({
            url: '/home/getGroupData',
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
                    let target = '#group > ul.group-main';
                    $(target).empty();
                    res.data.forEach(data => {
                        addNewGroupItem(target, data);
                    });
                    convertListItems();
                    if (currentGroupId) {
                        $(`#group > ul.group-main>li[groupId="${currentGroupId}"]`).addClass('active');
                    } else {
                        $('#group > ul.group-main>li:first-child').addClass('active');
                    }
                    let contentwidth = jQuery(window).width();
                    if (contentwidth > 768) {
                        $('#group > ul.group-main>li.active').click();
                    }
                }
            },
            error: function (response) { }
        });
    });

    socket.on('createGroup', data => {
        let target = '#group > ul.group-main';
        // $('#group .group-main li').removeClass('active');
        addNewGroupItem(target, data);
        convertListItems();
    });

    socket.on('send:groupMessage', data => {
        let target = '#group_chat .contact-chat ul.chatappend';
        if ($('#group_chat').hasClass('active')) {
            if (currentGroupId == data.currentGroupId) {
                addGroupChatItem(target, data);
            } else if (!$(`#group > ul.chat-main li[groupId=${Number(data.currentGroupId)}]`).length) {

            } else {
                $(`#group > ul.chat-main li[groupId=${Number(data.currentGroupId)}]`).insertBefore('#direct > ul.chat-main li:eq(0)');
            }

        }
        // if (!$(`#direct > ul.chat-main li[key=${Number(message.from)}]`).length) {
        //     let senderInfo = usersList.find(item => item.id == Number(message.from));
        //     let userListTarget = $('.recent-default .recent-chat-list');
        //     addChatUserListItem(userListTarget, senderInfo);
        // } else {
        //     $(`#direct > ul.chat-main li[key=${message.from}]`).insertBefore('#direct > ul.chat-main li:eq(0)');
        //     $(`#direct > ul.chat-main li[key=${message.from}] h6.status`).css('display', 'none');
        //     $(`#direct > ul.chat-main li[key=${message.from}] .date-status .badge`).css('display', 'inline-flex');
        //     let count = $(`#direct > ul.chat-main li[key=${message.from}] .date-status .badge`).text() || 0;
        //     $(`#direct > ul.chat-main li[key=${message.from}] .date-status .badge`).html(Number(count) + 1);
        // }
    });


    function addNewGroupItem(target, data) {
        let id = data.id;
        let title = data.title;
        let groupUsers = data.users.split(',');
        let groupUsersAvatar = groupUsers.filter((item, index) => index < 3).map(item => {
            let avatar = getCertainUserInfoById(item).avatar;
            return avatar ? `v1/api/downloadFile?path=${avatar}` : '/images/default-avatar.png';
        });
        let avatarContents = groupUsersAvatar.reduce((content, item) => content + `<li><a class="group-tp" href="#" data-tippy-content="John Doe"> <img src="${item}" alt="group-icon-img"/></a></li>\n`, '');

        // let displayNames = groupUsers.length > 24 ? groupUsers.slice(0, 24) + '...' : groupUsers;
        let countRecipients = groupUsers.length;
        $(target).prepend(
            `<li class="" data-to="group_chat" groupId=${id} groupUsers=${data.users}>
                <div class="group-box">
                    <div class="profile"><img class="bg-img" src="/chat/images/avtar/teq.jpg" alt="Avatar"/></div>
                    <div class="details">
                        <h5>${title}</h5>
                        <h6>Lorem Ipsum is simply dummy text the printing and typesetting industry.</h6>
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
        $(".messages.active").animate({ scrollTop: $('#group_chat .contact-chat').height() }, 'fast');

        if (data.rate) {
            getContentRate(`li.msg-item[key="${data.id}"]`, data.rate)
        }

    }

    function showCurrentChatHistory(currentGroupId) {
        $('.spining').css('display', 'flex');

        var form_data = new FormData();
        form_data.append('currentGroupId', currentGroupId);
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
                    getUsersList();
                    let { messageData } = res;
                    //Chat data display
                    $('#group_chat .contact-chat ul.chatappend').empty();

                    new Promise(resolve => {
                        if (messageData) {
                            let target = '#group_chat .contact-chat ul.chatappend';
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
                                addGroupChatItem(target, item);
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
            error: function (response) { }
        });
    }

    socket.on('add:newCast', data => {
        let target = '#cast > ul.chat-main';
        let title = data.castTitle;
        let recipients = data.currentContactIdArr.map(item => getCertainUserInfoById(item).username).join(', ');
        let countRecipients = data.currentContactIdArr.length;
        let displayNames = recipients.length > 24 ? recipients.slice(0, 24) + '...' : recipients;
        $(target).prepend(
            `<li data-to="cast_chat" recipients="${data.currentContactIdArr.join(', ')}">
                <div class="chat-box">
                    <div class="profile bg-size" style="background-image: url('/images/default-avatar.png'); background-size: cover; background-position: center center; display: block;">
                        
                    </div>
                    <div class="details">
                        <h5>${title}</h5>
                        <h6>${countRecipients} : ${displayNames}</h6>
                    </div>
                    <div class="date-status">
                        <div class="msg-dropdown-main">
                            <div class="msg-setting"><i class="ti-more-alt"></i></div>
                            <div class="msg-dropdown">
                                <ul>
                                    <li>
                                        <a class="icon-btn btn-outline-light btn-sm list_info" href="#">
                                            <img src="/images/icons/info.svg" alt="info">
                                        </a>
                                    </li>
                                    <li>
                                        <a class="icon-btn btn-outline-light btn-sm" href="#">
                                            <i class="ti-trash"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </li>`
        );
        $(target).children().removeClass('active');
        $(target).children().first().addClass('active');

        $('#content .chat-content .messages').removeClass('active');
        $('#cast_chat').addClass('active');
    });

    socket.on('update:cast', (data) => {
        new Promise((resolve) => {
            getCastData(resolve);
        }).then(() => {
            $('#cast > ul.chat-main >li').removeClass('active');
            $('#cast > ul.chat-main >li').filter(function () {
                return $(this).find('.details>h5').text() === data.newCastTitle;
            }).addClass('active');
        })
    })

    $('.recent-chat-list').on('click', 'li .date-status .ti-trash', function (e) {
        e.stopPropagation();
        if (confirm('Delete this Thread?')) {
            let recipient = $(this).closest('.date-status').closest('li').attr('key');
            console.log(recipient);
            let form_data = new FormData();
            form_data.append('recipient', recipient);
            $.ajax({
                url: '/message/deleteChatThread',
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
                    if (res.state = 'true') {
                        $(`.recent-chat-list li[key=${recipient}]`).remove();

                    }
                },
                error: function (response) {

                }
            });
        }
    });

    $('#cast').on('click', 'li .date-status .ti-trash', function (e) {
        e.stopPropagation();
        if (confirm('Delete this Thread?')) {
            let recipients = $(this).closest('.date-status').closest('li').attr('recipients');
            let castTitle = $(this).closest('.date-status').closest('li').find('.details h5').text();
            console.log(recipients);
            console.log(castTitle);
            let form_data = new FormData();
            form_data.append('recipients', recipients);
            form_data.append('castTitle', castTitle);
            $.ajax({
                url: '/message/deleteCastThread',
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
                    if (res.state = 'true') {
                        $(e.currentTarget).closest('.date-status').closest('li').remove();
                        // $(`#cast li[recipiet=${recipient}]`).remove();
                    }
                },
                error: function (response) {

                }
            });
        }
    });

    $('.messages.active').scroll(() => {
        if ($('.messages.active').scrollTop() == 0) {
            // $('.chatappend').prepend(loader);

            let firstMessageId = $('.messages.active .chatappend .msg-item:first-child').attr('key');
            if (firstMessageId) {
                let form_data = new FormData();
                form_data.append('firstMessageId', firstMessageId);
                form_data.append('currentContactId', currentContactId);
                $.ajax({
                    url: '/home/loadMoreMessages',
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
                        if (res.messageData) {
                            let target = '#chating .contact-chat ul.chatappend';
                            res.messageData.forEach(item => {
                                item.messageId = item.id;
                                addChatItem(target, item.sender, item, true);
                            });
                            if (res.messageData.length) $('.messages').scrollTop(50);
                        }
                        $('#loader').hide();
                    },
                    error: function (response) {
                        $('#loader').hide();
                    }
                });
            }
        }
    });

    $('#cast > ul.chat-main').on('click', 'li', function () {
        $('#cast > ul.chat-main li').removeClass('active');
        $(this).addClass('active');
        $('#content .chat-content .messages').removeClass('active');
        $('#content .chat-content .messages#cast_chat').addClass('active');

        let recipients = $(this).attr('recipients');
        let castTitle = $(this).find('.details h5').text();
        let form_data = new FormData();
        form_data.append('recipients', recipients);
        form_data.append('castTitle', castTitle);
        $.ajax({
            url: '/home/displayCastChatData',
            headers: {
                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
            },
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            data: form_data,
            dataType: "json",
            success: function (res) {
                if (res.state == 'true') {
                    //cast title display
                    $('#cast_chat .chatappend .groupuser>h4').text(res.data[0].cast_title);
                    $('#cast_chat > div.contact-details div.media-body > h5').text(res.data[0].cast_title || 'Cast Title');
                    // avatar display
                    $('#cast_chat ul.chatappend li.groupuser>div').remove();
                    recipients.split(', ').forEach((item, index) => {
                        let avatar = getCertainUserInfoById(item).avatar;
                        let userName = getCertainUserInfoById(item).username;
                        avatar = avatar ? `v1/api/downloadFile?path=${avatar}` : '/images/default-avatar.png'
                        $('#cast_chat ul.chatappend li.groupuser').append(`
                            <div class="gr-profile dot-btn dot-success bg-size" style="background-image: url('${avatar}'); background-size: cover; background-position: center center; display: block;">
                                <img class="bg-img" src="/chat/images/avtar/3.jpg" alt="Avatar" style="display: none;">
                            </div>
                        `);
                        tippy(`#cast_chat ul.chatappend li.groupuser>div:nth-child(${index + 2})`, {
                            content: userName
                        });
                    });
                    // history display
                    let target = '#cast_chat > div.contact-chat > ul';
                    let senderInfo = getCertainUserInfoById(currentUserId);
                    $(target).find('li:not(:first-child)').remove();
                    res.data.reverse().forEach(data => {
                        let time = data.created_at ? new Date(data.created_at) : new Date();
                        let item = `<li class="replies msg-item" key="${data.id}" kind="${data.kind}">
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
                                `<h5 class="content">${data.content}</h5>`
                                : data.kind == 1 ?
                                    `<div class="camera-icon" requestid="${data.requestId}">$${data.content}</div>`
                                    : data.kind == 2 ? `<img class="receive_photo" castId="${data.castId}" photoId="${data.photoId}" src="${data.content}">` : ''}
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
                        $(target).append(item);
                    });
                    var contentwidth = jQuery(window).width();
                    if (contentwidth <= '768') {
                        $('.chitchat-container').toggleClass("mobile-menu");
                    }
                    if (contentwidth <= '575') {
                        $('.main-nav').removeClass("on");
                    }
                    $(".messages.active").animate({ scrollTop: $('#cast_chat .contact-chat').height() }, 'fast');

                }
            },
            error: function (response) { }
        });
    });

    $('#group_blank .mobile-sidebar').on('click', () => {
        $('#group_blank > .contact-details .media-body').empty();
        // $('#direct').addClass('active');
        // $('#direct').addClass('show');
        // $('#group').removeClass('active');
        // $('#group').removeClass('show');
        // $('#chating').addClass('active');
        // $('#group_blank').removeClass('active');
    })

    $('#msgchatModal').on('shown.bs.modal', function (e) {
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
                let target = '#msgchatModal > div > div > div.modal-body > ul';
                $(target).empty();

                res.reverse().forEach(data => {
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
                                <input class="form-check-input" type="checkbox" value="" aria-label="...">
                            </div>
                            </div>
                        </li>`
                    );
                    if ($('#group_blank > .contact-details .media-body').find(`span[userId=${data.id}]`).length) {
                        $(`#msgchatModal ul.chat-main li[key=${data.id}] input`).prop('checked', true);
                        $(`#msgchatModal ul.chat-main li[key=${data.id}]`).addClass('active');
                    }
                });

            },
            error: function (response) {

            }
        });
    });

    $('#newGroupModal').on('shown.bs.modal', function (e) {
        let modalId = $(this).attr('id');
        new Promise((resolve) => {
            getUsersList(resolve);
        }).then((usersList) => {
            console.log(usersList.filter(item => item.id != currentUserId));
            let target = $(`#${modalId} ul.chat-main`);
            target.empty();
            usersList.filter(item => item.id != currentUserId).reverse().forEach(data => {
                target.prepend(
                    `<li data-to="blank" key="${data.id}">
                        <div class="chat-box">
                        <div class="profile ${data.logout ? 'offline' : 'online'} bg-size" style="background-image: url(${data.avatar ? 'v1/api/downloadFile?path=' + data.avatar : "/images/default-avatar.png"}); background-size: cover; background-position: center center; display: block;">
                            
                        </div>
                        <div class="details">
                            <h5>${data.username}</h5>
                            <h6>${data.description || 'Hello'}</h6>
                        </div>
                        <div class="date-status">
                            <input class="form-check-input" type="checkbox" value="" aria-label="...">
                        </div>
                        </div>
                    </li>`
                );
                // if ($('#group_blank > .contact-details .media-body').find(`span[userId=${data.id}]`).length) {
                //     $(`#msgchatModal ul.chat-main li[key=${data.id}] input`).prop('checked', true);
                //     $(`#msgchatModal ul.chat-main li[key=${data.id}]`).addClass('active');
                // }
            });
        });
    });

    $('#createGroupBtn').on('click', function (e) {
        let title = $('#newGroupModal .group_title input').val();
        if (!title) {
            $('#newGroupModal .group_title input').addClass('is-invalid');
            setTimeout(() => {
                $('#newGroupModal .group_title input').removeClass('is-invalid');
            }, 2000);
            return;
        }
        let users = Array.from($('#newGroupModal .chat-main li.active')).map(item => $(item).attr('key')).join(',');
        users += `,${currentUserId}`;
        socket.emit('createGroup', { title, users });
        $('#newGroupModal').modal('hide');
        $(`.chat-cont-setting`).removeClass('open');
        document.querySelector(`#group-tab`).click();
    });

    $('#group .group-main').on('click', 'li', function () {
        $('#group .group-main li').removeClass('active');
        $(this).addClass('active');
        if (currentGroupId != $(this).attr('groupId')) {
            currentGroupId = $(this).attr('groupId');
            currentGroupUsers = $(this).attr('groupUsers');
        }
        showCurrentChatHistory(currentGroupId);

        let contentwidth = jQuery(window).width();
        if (contentwidth <= '768') {
            $('.chitchat-container').toggleClass("mobile-menu");
        }
        if (contentwidth <= '575') {
            $('.main-nav').removeClass("on");
        }
    });

    $('#msgchatModal').on('hidden.bs.modal', function (e) {
        let castTitle = $('#msgchatModal .cast_title input').val();
    });

    $('#msgchatModal .cast_title input').on('keydown', function () {
        $('#msgchatModal .cast_title input').removeClass('is-invalid');
        console.log('aaa');
    });

    $('#castUserListModal').on('shown.bs.modal', function () {
        let recipients = $('#castUserListModal').data('recipients').toString();
        let castTitle = $('#castUserListModal').data('title') || 'No Title';
        oldRecipients = recipients;
        oldCastTitle = $('#castUserListModal').data('title');
        $('#castUserListModal > div > div > div.modal-body > div.chat-msg-search > div > input').val(castTitle);
        $('#castUserListModal > div > div > div.modal-body > div.chat-msg-search > div > input').prop('disabled', true);

        $('.edit_save_cast_list').addClass('edit');
        $('.edit_save_cast_list').removeClass('save');

        let target = '#castUserListModal > div > div > div.modal-body > ul';
        $(target).empty();
        recipients.split(',').forEach(item => {
            let data = getCertainUserInfoById(item)
            $(target).append(
                `<li data-to="blank" key="${data.id}">
                    <div class="chat-box">
                        <div class="profile ${data.logout ? 'offline' : 'online'} bg-size" style="background-image: url(${data.avatar ? 'v1/api/downloadFile?path=' + data.avatar : "/images/default-avatar.png"}); background-size: cover; background-position: center center; display: block;">
                            
                        </div>
                        <div class="details">
                            <h5>${data.username}</h5>
                            <h6>${data.description || 'Hello'}</h6>
                        </div>
                    </div>
                </li>`
            );
        });
    });

    $('.modal ul.chat-main').on('click', 'li', function (e) {
        if ($(this).find('.form-check-input').length) {
            $(this).find('.form-check-input').prop('checked', !$(this).find('.form-check-input')[0].checked);
            $(this).toggleClass('active');
        }
    });

    $('#msgchatModal ul.chat-main, #castUserListModal ul.chat-main').on('click', 'li', function (e) {
        // $(this).find('.form-check-input').prop('checked', !$(this).find('.form-check-input')[0].checked);
        // $(this).toggleClass('active');

        let userId = $(this).attr('key');
        if ($(this).find('.form-check-input').is(':checked')) {

            if ($('#group_blank > .contact-details .media-body').find(`span[userId=${userId}]`).length) {
                return;
            }
            let userName = $(this).find('.details h5').text();
            $('#group_blank > .contact-details .media-body').append(`
                <span userId=${userId}>${userName}&nbsp&nbsp<b>\u2716</b></span>
            `);
        } else {
            $('#group_blank > .contact-details .media-body').find(`span[userId=${userId}]`).remove();
        }
    });

    $('#group_blank > .contact-details .media-body').on('click', 'span', function () {
        $(this).remove();
    });

    $('#cast > ul.chat-main').on('click', 'li .list_info', function (e) {
        e.stopPropagation();
        let recipients = $(this).closest('.date-status').closest('li').attr('recipients').split(', ');
        let castTitle = $(this).closest('.date-status').closest('li').find('.details h5').text();
        // showNewCastPage();
        $('#castUserListModal').attr('data-recipients', recipients.join(', '));
        $('#castUserListModal').attr('data-title', castTitle);
        $('#castUserListModal').modal('show');
        $('#castUserListModal .modal-header h2').text(`List Recipients: ${recipients.length} of Unlimited`);

        $('#group_blank > .contact-details .media-body').empty();
        recipients.forEach(userId => {
            let userName = getCertainUserInfoById(userId).username;
            if (!$('#group_blank > .contact-details .media-body').find(`span[userId=${userId}]`).length) {
                $('#group_blank > .contact-details .media-body').append(`
                <span userId=${userId}>${userName}&nbsp&nbsp<b>\u2716</b></span>
                `);
            } else { }
        })
    });

    $('.edit_save_cast_list button').on('click', function (e) {
        $(this).closest('.edit_save_cast_list').toggleClass('edit');
        $(this).closest('.edit_save_cast_list').toggleClass('save');
        $('#castUserListModal > div > div > div.modal-body > div.chat-msg-search > div > input').prop('disabled', false);

        if ($(this).closest('.edit_save_cast_list').hasClass('save')) {
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
                    let target = '#castUserListModal div.modal-body > ul';
                    $(target).empty();

                    res.reverse().forEach(data => {
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
                                <input class="form-check-input" type="checkbox" value="" aria-label="...">
                            </div>
                            </div>
                        </li>`
                        );
                        if ($('#group_blank > .contact-details .media-body').find(`span[userId=${data.id}]`).length) {
                            $(`#castUserListModal ul.chat-main li[key=${data.id}] input`).prop('checked', true);
                            $(`#castUserListModal ul.chat-main li[key=${data.id}]`).addClass('active');
                        }
                    });

                },
                error: function (response) {

                }
            });
        }


    });

    $('#saveCastListbtn').on('click', function (e) {
        let newCastTitle = $('#castUserListModal > div > div > div.modal-body > div.chat-msg-search > div > input').val();
        var newRecipients = Array.from($('#group_blank > div.contact-details .media-body span')).map(item => Number($(item).attr('userId'))).join(', ');
        socket.emit('update:cast', {
            oldCastTitle,
            oldRecipients,
            newCastTitle,
            newRecipients
        });

        $('#castUserListModal').modal('hide');

    });

    $('#castUserListModal').on('hidden.bs.modal', function () {
        $(this).removeData('title');
        $(this).removeData('recipients');

    });

    //remove Chat Thread
    // $(document).on("contextmenu", ".element", function(e){
    //     alert('Context Menu event has fired!');
    //     return false;
    //  });


    $('#cast .chat-main').on('click', '.msg-setting', function (event) {
        event.stopPropagation();
        $(this).siblings('.msg-dropdown').toggle();
        setTimeout(() => {
            $(this).siblings('.msg-dropdown').hide();
        }, 5000);
    });

    //reply message
    $('.messages').on('click', '.replyBtn', function (e) {
        let replyKind = $(this).closest('li.msg-item').attr('kind');
        console.log('replyKind:', replyKind);
        let messageContent = replyKind == 0 ? $(this).closest('li.msg-setting-main').find('.content').text() : '';
        if (replyKind == 2) {
            let imageSrc = $(this).closest('.msg-setting-main').find('.receive_photo').attr('src');
            let photoId = $(this).closest('.msg-setting-main').find('.receive_photo').attr('photoId');
            console.log(photoId)
            messageContent = `<img src="${imageSrc}" width="50">`;
        }
        let replyId = $(this).closest('li.msg-item').attr('key');
        $('#content .chat-content>.replyMessage .replyContent').html(messageContent);
        $('#content .chat-content>.replyMessage').attr('replyId', replyId);
        $('#content .chat-content>.replyMessage').attr('replyKind', replyKind);
        $('#content .chat-content>.replyMessage').show();
    });

    //edit reply message
    $('.messages').on('click', '.replyEditBtn', function (e) {
        $('#photo_item .modal-content .btn-group.edit_btn_group').css('display', 'flex');
        $('#photo_item .modal-content .btn-group.open_btn_group').css('display', 'none');
        $('#photo_item').attr('edit', 'true');
        let id = $(e.currentTarget).closest('li.msg-item').attr('key');
        $('.selected-emojis').empty();
        selectedEmojis = [];
        showPhotoContent(id);
    });


    $('#photo_item').on('hidden.bs.modal', function () {
        $(this).removeAttr('edit');
        $('.blur-tool').slideUp();
        $('.text-tool').slideUp();
    });

    $('#content').on('click', 'div.replyMessage > span.closeIcon', function (e) {
        $('#content .chat-content>.replyMessage').removeAttr('replyId');
        $('#content .chat-content>.replyMessage').removeAttr('replyKind');
        // $('#content .chat-content>.replyMessage').removeAttr('forwardId');
        // $('#content .chat-content>.replyMessage').removeAttr('forwardKind');
        $('#content .chat-content>.replyMessage').hide();
    });

    // Forward Message
    $('.messages').on('click', '.forwardBtn', function (e) {
        let forwardId = $(this).closest('li.msg-item').attr('key');
        let forwardKind = $(this).closest('li.msg-item').attr('kind');
        // console.log('replyKind:', forwardKind);
        // let messageContent = forwardKind == 0 ? $(this).closest('li.msg-setting-main').find('.content').text() : '';
        // if (forwardKind == 2) {
        //     let imageSrc = $(this).closest('.msg-setting-main').find('.receive_photo').attr('src');
        //     let photoId = $(this).closest('.msg-setting-main').find('.receive_photo').attr('photoId');
        //     console.log(photoId)
        //     messageContent = `<img src="${imageSrc}" width="50">`;
        // }
        // $('#content .chat-content>.replyMessage .replyContent').html(messageContent);
        // $('#content .chat-content>.replyMessage').attr('forwardId', forwardId);
        // $('#content .chat-content>.replyMessage').attr('forwardKind', forwardKind);
        // $('#content .chat-content>.replyMessage').show();
        $('#forwardUsersListModal').modal('show');
        $('#forwardUsersListModal').attr('forwardId', forwardId);
        $('#forwardUsersListModal').attr('forwardKind', forwardKind);

    });

    $('#forwardUsersListModal').on('shown.bs.modal', function (e) {
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
                let target = '#forwardUsersListModal .chat-main';
                $(target).empty();

                res.reverse().forEach(data => {
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
                                <button class="btn btn-outline-primary button-effect btn-sm forward_btn" type="button">Send</button>
                            </div>
                            </div>
                        </li>`
                    );

                });

            },
            error: function (response) {

            }
        });
    });

    $('#forwardUsersListModal').on('hidden.bs.modal', function (e) {
        $('#forwardUsersListModal').removeAttr('forwardId');
    });

    $('#forwardUsersListModal').on('click', '.chat-main .date-status .btn.forward_btn', function (e) {
        if ($(this).hasClass('btn-outline-primary')) {
            $(this).addClass('btn-success');
            $(this).removeClass('btn-outline-primary');
            $(this).text('Sent');
            let forwardId = $('#forwardUsersListModal').attr('forwardId');
            let forwardKind = $('#forwardUsersListModal').attr('forwardKind');
            let recipient = $(this).closest('li').attr('key');
            socket.emit('forward:message', { recipient, forwardId, forwardKind });
        }
    });
});

function showNewCastPage() {
    // $('#direct').toggleClass('active');
    // $('#direct').toggleClass('show');
    // $('#group').toggleClass('active');
    // $('#group').toggleClass('show');
    $('.section-py-space').css('display', 'none');
    $('#content').css('display', 'block');
    $('.spining').css('display', 'none');


    $('#chat .tab-content .tab-pane').removeClass('active show');
    $('#chat .tab-content .tab-pane#cast').addClass('active show');
    $('#content .chat-content .messages').removeClass('active');
    $('#group_blank').addClass('active');

    $('#myTabContent .nav-item .nav-link').removeClass('active');
    $('#myTabContent .nav-item .nav-link#cast-tab').addClass('active');
    // $('#myTab .nav-item .nav-link#cast-tab').click();


    $('.chat-cont-setting').removeClass('open');
    $('.chitchat-container').toggleClass("mobile-menu");
    //remove history
    // $('#group_blank > .contact-details .media-body').empty();
    // $('#group_blank .contact-chat ul.chatappend').empty()

    if ($(window).width() <= 768) {
        $('.main-nav').removeClass("on");
    }
}

function getCastData(resolve) {
    $.ajax({
        url: '/home/getCastData',
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
                let target = '#cast > ul.chat-main';
                $(target).empty();
                res.castData.forEach(item => {
                    let title = item.cast_title;
                    let recipients = item.recipients.split(', ').map(item => getCertainUserInfoById(item).username).join(', ');
                    let countRecipients = item.recipients.split(', ').length;
                    let displayNames = recipients.length > 24 ? recipients.slice(0, 24) + '...' : recipients;
                    $(target).append(
                        `<li data-to="cast_chat" recipients="${item.recipients}">
                            <div class="chat-box">
                                <div class="profile bg-size" style="background-image: url('/images/default-avatar.png'); background-size: cover; background-position: center center; display: block;">
                                    
                                </div>
                                <div class="details">
                                    <h5>${title}</h5>
                                    <h6>${countRecipients} : ${displayNames}</h6>
                                </div>
                                <div class="date-status">
                                    <div class="msg-dropdown-main">
                                        <div class="msg-setting"><i class="ti-more-alt"></i></div>
                                        <div class="msg-dropdown">
                                            <ul>
                                                <li>
                                                    <a class="icon-btn btn-outline-light btn-sm list_info" href="#">
                                                        <img src="/images/icons/info.svg" alt="info">
                                                    </a>
                                                </li>
                                                <li>
                                                    <a class="icon-btn btn-outline-light btn-sm" href="#">
                                                        <i class="ti-trash"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>`
                    );
                    if (resolve) resolve();
                });
            }
        },
        error: function (response) { }
    });
}

function convertListItems() {
    $(".bg-top").parent().addClass('b-top');
    $(".bg-bottom").parent().addClass('b-bottom');
    $(".bg-center").parent().addClass('b-center');
    $(".bg_size_content").parent().addClass('b_size_content');
    $(".bg-img").parent().addClass('bg-size');
    $('.bg-img').each(function () {
        var el = $(this),
            src = el.attr('src'),
            parent = el.parent();
        parent.css({
            'background-image': 'url(' + src + ')',
            'background-size': 'cover',
            'background-position': 'center',
            'display': 'block'
        });
        el.hide();
    });
}
