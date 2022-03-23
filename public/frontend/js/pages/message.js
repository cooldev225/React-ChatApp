$(document).ready(() => {
            $('.messages').scroll(() => {
                if ($('.messages').scrollTop() == 0) {
                    // $('.chatappend').prepend(loader);

                    let firstMessageId = $('.chatappend .msg-item:first-child').attr('key');
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
                        success: function(res) {
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
                        error: function(response) {
                            $('#loader').hide();
                        }
                    });
                }
            });
            $('#mediaPhoto').on('shown.bs.modal', function(e) {

            });

            //Multimessage

            $('#new_cast').on('click', () => {

                // $('#direct').toggleClass('active');
                // $('#direct').toggleClass('show');
                // $('#group').toggleClass('active');
                // $('#group').toggleClass('show');
                $('.section-py-space').css('display', 'none');
                $('#content').css('display', 'block');
                $('.spining').css('display', 'none');


                $('#chat .tab-content .tab-pane').removeClass('active show')
                $('#chat .tab-content .tab-pane#cast').addClass('active show')
                $('#content .chat-content .messages').removeClass('active');
                $('#group_blank').addClass('active');

                $('.chat-cont-setting').removeClass('open');
                $('.chitchat-container').toggleClass("mobile-menu");
                //remove history
                $('#group_blank > .contact-details .media-body').empty();
                $('#group_blank .contact-chat ul.chatappend').empty()

                if ($(window).width() <= 768) {
                    $('.main-nav').removeClass("on");
                }
            });

            $('#cast-tab').on('click', function() {
                getCastData();
            });

            $('#cast > ul.chat-main').on('click', 'li', function() {
                        $('#cast > ul.chat-main li').removeClass('active');
                        $(this).addClass('active');

                        $('#content .chat-content .messages').removeClass('active');
                        $('#content .chat-content .messages#cast_chat').addClass('active');


                        let recipients = $(this).attr('recipients');
                        let form_data = new FormData();
                        form_data.append('recipients', recipients);
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
                                    success: function(res) {
                                            if (res.state == 'true') {
                                                //cast title display
                                                $('#cast_chat .chatappend .groupuser>h4').text(res.data[0].cast_title);
                                                $('#cast_chat .chatappend .groupuser>h4').text('');
                                                // avatar display
                                                $('#cast_chat ul.chatappend li.groupuser>div').remove();
                                                recipients.split(', ').forEach((item, index) => {
                                                        let avatar = getCertainUserInfoById(item).avatar;
                                                        let userName = getCertainUserInfoById(item).username;
                                                        avatar = avatar ? `v1/api/downloadFile?path=${avatar}` : '/images/default-avatar.png'
                                                        $('#cast_chat ul.chatappend li.groupuser').append(`
                                                            <div class="gr-profile dot-btn dot-success grow bg-size" style="background-image: url('${avatar}'); background-size: cover; background-position: center center; display: block;">
                                                                <img class="bg-img" src="/chat/images/avtar/3.jpg" alt="Avatar" style="display: none;">
                                                            </div>
                                                        `);
                                                        tippy(`#cast_chat ul.chatappend li.groupuser>div:nth-child(${index+2})`, { content: userName });
                                                        // document.querySelector('.contact-profile .photoRating')._tippy.setContent(averageRate.toFixed(2))

                                                    })
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
                                                    `<h5>${data.content}</h5>`
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
                }
            },
            error: function(response) {}
        });
    })


    $('#group_blank .mobile-sidebar').on('click', () => {
        $('#direct').addClass('active');
        $('#direct').addClass('show');
        $('#group').removeClass('active');
        $('#group').removeClass('show');
        $('#chating').addClass('active');
        $('#group_blank').removeClass('active');
    })

    $('#msgchatModal').on('shown.bs.modal', function(e) {
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
                let target = '#msgchatModal > div > div > div.modal-body > ul';
                $(target).empty();

                res.reverse().forEach(item => {
                    let data = usersList.find(user => user.id == item.contact_id)
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
                    // addChatUserListItem(target, usersList.find(user => user.id == item.contact_id))
                });

            },
            error: function(response) {

            }
        });
    });

    $('#msgchatModal ul.chat-main').on('click', 'li', function(e) {
        $(this).find('.form-check-input').prop('checked', !$(this).find('.form-check-input')[0].checked);
        $(this).toggleClass('active');

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

    $('#group_blank > .contact-details .media-body').on('click', 'span', function() {
        $(this).remove();
    });
});

function getCastData() {
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
        success: function(res) {
            if (res.state == 'true') {      
                let target = '#cast > ul.chat-main';
                $(target).empty();
                res.castData.forEach(item => {
                    let recipients = item.recipients.split(', ').map(item => getCertainUserInfoById(item).username).join(', ');
                    let countRecipients = item.recipients.split(', ').length;
                    let displayNames = recipients.length > 24 ? recipients.slice(0, 24) + '...' : recipients;
                    $(target).append(
                        `<li data-to="cast_chat" recipients="${item.recipients}">
                            <div class="chat-box">
                                <div class="profile bg-size" style="background-image: url('/images/default-avatar.png'); background-size: cover; background-position: center center; display: block;">
                                    
                                </div>
                                <div class="details">
                                    <h5>Recipients: ${countRecipients}</h5>
                                    <h6>${displayNames}</h6>
                                </div>
                                <div class="date-status">
                                
                                </div>
                            </div>
                        </li>`
                    );
                });
            }
        },
        error: function(response) {}
    });
}