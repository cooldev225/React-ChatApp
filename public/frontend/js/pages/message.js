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
        // const player = document.getElementById('player');
        // const mediaCanvas = document.getElementById('mediaCanvas');
        // const context = mediaCanvas.getContext('2d');
        // const captureButton = document.getElementById('capture');

        // const constraints = {
        //     video: true,
        // };

        // captureButton.addEventListener('click', () => {
        //     // Draw the video frame to the canvas.
        //     context.drawImage(player, 0, 0, mediaCanvas.width, mediaCanvas.height);
        // });

        // // Attach the video stream to the video element and autoplay.
        // if (navigator.mediaDevices.getUserMedia) {
        //     navigator.mediaDevices.getUserMedia(constraints)
        //         .then((stream) => {
        //             player.srcObject = stream;
        //         }).catch(function(error) {
        //             console.log("Something went wrong!");
        //         });;
        // }
    });

    //Multimessage

    $('#new_chat').on('click', () => {

        // $('#direct').toggleClass('active');
        // $('#direct').toggleClass('show');
        // $('#group').toggleClass('active');
        // $('#group').toggleClass('show');

        $('.chat-cont-setting').removeClass('open');

        $('#chating').removeClass('active');
        $('#group_blank').addClass('active');
        $('#group_chat').removeClass('active');
        $('.chitchat-container').toggleClass("mobile-menu");
        if ($(window).width() <= 768) {
            $('.main-nav').removeClass("on");
        }
    });

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
                    addChatUserListItem(target, usersList.find(user => user.id == item.contact_id))
                });

            },
            error: function(response) {

            }
        });
    });

    $('#msgchatModal ul.chat-main').on('click', 'li', (e) => {
        // console.log(e.currentTarget);
        let userId = $(e.currentTarget).attr('key');
        console.log($(e.currentTarget).attr('key'));
        if ($('#group_blank > .contact-details .media-body').find(`span[userId=${userId}]`).length) {
            return;
        }
        let userName = $(e.currentTarget).find('.details h5').text();
        $('#group_blank > .contact-details .media-body').append(`
            <span userId=${userId}>${userName}&nbsp&nbsp<b>\u2716</b></span>
        `);
    });

    $('#group_blank > .contact-details .media-body').on('click', 'span', function() {
        $(this).remove();
    });
})