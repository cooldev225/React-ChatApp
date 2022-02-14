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
                    console.log(res);
                    if (res.messageData) {
                        let target = '.contact-chat ul.chatappend';
                        res.messageData.forEach(item => {
                            item.messageId = item.id;
                            addChatItem(target, item.sender, item, true);
                        });
                        console.log($('.contact-chat').height())
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
        // console.log("Open Modal");
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
})