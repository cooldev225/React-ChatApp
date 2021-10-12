let globalImage;
let canvas = new fabric.Canvas('back_canvas', {width: 350, height:350});
canvas.setDimensions({width: '350px', height: '350px'}, {cssOnly: true});

$(document).ready(function () {

    displayPhoto();
    blurPhoto();
    document.getElementById("input_btn")
        .addEventListener('click', function () {
            document.getElementById("input_file").click();
        }, false);


    getRequestList();
        socket.on('receive:request', data => {
        console.log(data);
        let senderInfo = getCertainUserInfoById(data.from);
        let receiverInfo = getCertainUserInfoById(currentUserId);
        addRequestItem(senderInfo, receiverInfo, data.data);
        $('.photo-request-icon').addClass('dot-btn');
        let target = '.contact-chat ul.chatappend';
        $(target).append(`<li class="sent photo-request">
            <div class="media">
                <div class="profile me-4 bg-size" style="background-image: url(${senderInfo.avatar ? 'v1/api/downloadFile?path=' + senderInfo.avatar : "/chat/images/contact/2.jpg"}); background-size: cover; background-position: center center;">
                </div>
                <div class="media-body">
                    <div class="contact-name">
                        <h5>${senderInfo.username}</h5>
                        <h6>01:42 AM</h6>
                        <ul class="msg-box">
                            <li><div>$${data.data.price}</div></li>
                        </ul>
                    </div>
                </div>
            </div>
        </li>`);
    });

    $('ul.chat-main.request-list').on('click', 'li', (e) => {
        $('#detailRequestModal').find('.btn-success').css('display', 'block');

        let from = $(e.currentTarget).data('from');
        let to = $(e.currentTarget).data('to');
        $('#detailRequestModal .request-title').text($(e.currentTarget).find('.title').text());
        $('#detailRequestModal .request-description').text($(e.currentTarget).find('.description').val());
        $('#detailRequestModal .request-price').text($(e.currentTarget).find('.price').val() + "$");
        $('.photo-request-icon').removeClass('dot-btn');
        $('.read-status').removeClass('fa-eye-slash');
        $('.read-status').addClass('fa-eye');
        setCurrentChatContent(currentContactId);

        if (e.currentTarget.className.includes('sent')) {
            $('#detailRequestModal').find('.btn-success').css('display', 'none');
        }
    });

    $('#detailRequestModal .btn-warning').click(e => {
        let senderInfo = getCertainUserInfoById(currentUserId);
        let receiverInfo = getCertainUserInfoById(currentContactId);
        e.preventDefault();
        let reason = prompt('Please enter the reject reason.');
        if (reason) {
            let target = '.contact-chat ul.chatappend';
            $(target).append(`<li class="replies photo-request">
                <div class="media">
                    <div class="profile me-4 bg-size" style="background-image: url(${senderInfo.avatar ? 'v1/api/downloadFile?path=' + senderInfo.avatar : "/chat/images/contact/2.jpg"}); background-size: cover; background-position: center center;">
                    </div>
                    <div class="media-body">
                        <div class="contact-name">
                            <h5>${senderInfo.username}</h5>
                            <h6>01:42 AM</h6>
                            <ul class="msg-box">
                                <li><h5>You rejected Photo Request from ${receiverInfo.username}</h5></li>
                                <li><h5>Reason: ${reason}</h5></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </li>`);
        };
        $('#detailRequestModal').modal("hide");
        socket.emit('reject:request', );
    });

});

function getRequestList() {
    $('.icon-btn[data-tippy-content="PhotoRequest"]').on('click', () => {
        if ($('.document-tab.dynemic-sidebar').hasClass('active')) {
            var form_data = new FormData();
            $.ajax({
                url: '/home/getPhotoRequest',
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
                        let target = 'ul.request-list';
                        $(target).empty();
                        res.data.forEach(item => {
                            let senderInfo = getCertainUserInfoById(item.from);
                            let receiverInfo = getCertainUserInfoById(item.to);
                            let sendFlag = currentUserId == item.from ? true : false;
                            addRequestItem(senderInfo, receiverInfo, item, sendFlag);
                        });
                    }

                },
                error: function (response) {

                }
            });
        }
    });
}

function sendPhotoRequest() {
    let title = $('#photoRequestModal .title').val();
    let description = $('#photoRequestModal .description').val();
    let price = $('#photoRequestModal .price').val();
    let type = 1;
    let to = currentContactId;
    let data = {
        title,
        description,
        price,
        type,
        to
    };
    socket.emit('send:request', data);
    let senderInfo = getCertainUserInfoById(currentUserId);
    let receiverInfo = getCertainUserInfoById(to);
    addRequestItem(senderInfo, receiverInfo, data, true);
    let target = '.contact-chat ul.chatappend';
    $(target).append(`<li class="replies photo-request">
        <div class="media">
            <div class="profile me-4 bg-size" style="background-image: url(${senderInfo.avatar ? 'v1/api/downloadFile?path=' + senderInfo.avatar : "/chat/images/contact/2.jpg"}); background-size: cover; background-position: center center;">
            </div>
            <div class="media-body">
                <div class="contact-name">
                    <h5>${senderInfo.username}</h5>
                    <h6>01:42 AM</h6>
                    <ul class="msg-box">
                        <li><div>$${data.price}</div></li>
                    </ul>
                </div>
            </div>
        </div>
    </li>`);
}

function addRequestItem(senderInfo, receiverInfo, data, sendFlag) {
    // console.log(receiverInfo);
    $("ul.request-list").append(
        `<li class="${sendFlag ? 'sent' : ''}" key="${data.id}" data-from="${senderInfo.id}" data-to="${receiverInfo.id}">
            <a data-bs-toggle="modal" data-bs-target="#detailRequestModal">
                <div class="chat-box">
                    <div class="profile bg-size" style="background-image: url(${senderInfo.avatar ? 'v1/api/downloadFile?path=' + senderInfo.avatar : "/chat/images/contact/2.jpg"}); background-size: cover; background-position: center center; display: block;">
                        
                    </div>
                    <div class="details">
                        <h5>${sendFlag ? receiverInfo.username : senderInfo.username}</h5>
                        <h6 class="title">${data.title || ''}</h6>
                        <input class="description" type="hidden" value="${data.description}">
                        <input class="price" type="hidden" value="${data.price}">
                        <input class="status" type="hidden" value="1">
                    </div>
                    <div class="date-status">
                        <a>
                            <i class="read-status fa ${!data.unread ? 'fa-eye-slash' : 'fa-eye'}"></i>
                            <i class="fa ${sendFlag ? 'fa-arrow-circle-o-right' : 'fa-arrow-circle-o-left'}"></i>
                        </a>
                        <div>$${data.price}</div>
                        <h6 class="font-success status" request-status="4"> Completed</h6>
                    </div>
                </div>
            </a>    
        </li>`
    );
}


function displayPhoto() {
    let photoFileInput = $('#input_file')
    // var canvas = new fabric.Canvas('back_canvas');
    photoFileInput.on('change', (e) => {
        let reader = new FileReader();
        files = e.target.files;
        reader.onload = () => {
            fabric.Image.fromURL(reader.result, function(oImg) {
                globalImage = oImg;
                let imgWidth = oImg.width;
                let imgHeight = oImg.height;
                if (imgWidth > 350 && imgHeight > 350) {
                    canvas.setDimensions({width: '350px', height: '350px'}, {cssOnly: true});
                    // alert('Too big image choosed, Please choose smaller image');
                    // return;
                }
                if (imgWidth < 350 && imgHeight < 350) {
                    canvas.setDimensions({width: imgWidth+'px', height: imgHeight+'px'}, {cssOnly: true});
                    // alert('Too big image choosed, Please choose smaller image');
                    // return;
                }
                let canvasWidth = canvas.getWidth();
                let canvasHeight = canvas.getHeight();

                let imgRatio = imgWidth / imgHeight;
                let canvasRatio = canvasWidth / canvasHeight;
                // let canvasRatio = 1;
                console.log(imgRatio);
                if (imgRatio <= canvasRatio) {
                    // if(imgHeight > canvasHeight){
                        oImg.scaleToHeight(canvasHeight);
                    // }
                } else {
                    // if(imgWidth >= canvasWidth){
                        console.log('width')
                        oImg.scaleToWidth(canvasWidth);
                    // }
                }
                console.log(oImg);
                canvas.clear();
                canvas.add(oImg);
                canvas.centerObject(oImg);
            });
            
        }
        reader.readAsDataURL(files[0]);
        
    });
}

function blurPhoto() {

    $('.blur-range').on('change', e => {
        let obj = Object.assign(globalImage);

        let filter = new fabric.Image.filters.Blur({
            blur: e.currentTarget.value
        });
        obj.filters.push(filter);
        obj.applyFilters();
        canvas.renderAll();
        obj.filters = [];
        console.log(obj);
    })
}