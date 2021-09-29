$(document).ready(function() {

    socket.on('receive:request', data => {
        
        let senderInfo = getCertainUserInfoById(data.from);
        let receiverInfo = getCertainUserInfoById(currentUserId);
        addRequestItem(senderInfo, receiverInfo, data.data);
        $('.photo-request-icon').addClass('dot-btn');
    });
    $('ul.chat-main.request-list').on('click', 'li', (e) => {
        let from = $(e.currentTarget).data('from');
        let to = $(e.currentTarget).data('to');
        $('#detailRequestModal .request-title').text($(e.currentTarget).find('.title').text());
        $('#detailRequestModal .request-description').text($(e.currentTarget).find('.description').val());
        $('#detailRequestModal .request-price').text($(e.currentTarget).find('.price').val() + "$");
        $('.photo-request-icon').removeClass('dot-btn');

    });
});

function sendPhotoRequest() {
    let title = $('#photoRequestModal .title').val();
    let description = $('#photoRequestModal .description').val();
    let price = $('#photoRequestModal .price').val();
    let type = 1;
    let to = currentContactId;
    let data = { title, description, price, type, to };
    console.log(data);
    let form_data = new FormData();
    form_data.append('title', title);
    form_data.append('description', description);
    form_data.append('price', price);
    form_data.append('type', 0);
    socket.emit('send:request', data);

    // let to = currentContactId;
    // var form_data = new FormData();
    // form_data.append('title', title);
    // form_data.append('description', description);
    // form_data.append('price', price);
    // form_data.append('type', price);
    // $.ajax({
    //     url: '/home/sendRequest',
    //     headers: {
    //         'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    //     },
    //     data: form_data,
    //     cache: false,
    //     contentType: false,
    //     processData: false,
    //     type: 'POST',
    //     dataType: "json",
    //     success: function (res) {
    //         if (res.state == 'true') {
    //             let data = res.data;

    //         } else {

    //         }
    //     },
    //     error: function (response) {
    //         alert('The operation is failed');
    //     }
    // });

}

function addRequestItem(senderInfo, receiverInfo, data) {
    $("ul.request-list").append(
        `<li data-to="blank" data-from="${senderInfo.id}" data-to="${receiverInfo.id}">
            <a data-bs-toggle="modal" data-bs-target="#detailRequestModal">
                <div class="chat-box">
                    <div class="profile bg-size" style="background-image: url(${senderInfo.avatar ? 'v1/api/downloadFile?path=' + senderInfo.avatar : "/chat/images/contact/2.jpg"}); background-size: cover; background-position: center center; display: block;">
                        
                    </div>
                    <div class="details">
                        <h5>${senderInfo.username}</h5>
                        <h6 class="title">${data.title || ''}</h6>
                        <input class="description" type="hidden" value="${data.description}">
                        <input class="price" type="hidden" value="${data.price}">
                        <input class="status" type="hidden" value="1">
                    </div>
                    <div class="date-status">
                        <a data-bs-toggle="modal" data-bs-target="#detailRequestModal"><i class="fa fa-eye"></i></a>
                        <h6 class="font-success status" request-status="4"> Completed</h6>
                    </div>
                </div>
            </a>    
        </li>`
    );
}