var $contact_active;
$(document).ready(() => {
    startContactProcess();
});
function startContactProcess(){
    setTimeout(function () {
        startContactProcess();
    }, 5000);
    if($('.contact-list-tab.dynemic-sidebar').hasClass('active')){
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
                var obj='.recent-default .chat-tabs #myTabContent #direct .chat-main';
                $(obj).html('');
                for(var i=0;i<res.length;i++){
                    
                }
            },
            error: function (response) {

            }
        });
    }
}
function getChatData() {
    var form_data = new FormData();
	$.ajax({
        url: '/home/getChatData',
        headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        data: form_data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        dataType: "json",
        success: function (response) {
            console.log(response);
        },
        error: function (response) {

        }
    });
}