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
                        console.log('true')
                        let target = '.contact-chat ul.chatappend';
                        res.messageData.forEach(item => {
                            item.messageId = item.id;
                            addChatItem(target, item.sender, item);
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
})