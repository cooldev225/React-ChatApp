let globalImage;
let ori_image;
let canvas = new fabric.Canvas('back_canvas', {
    width: 350,
    height: 350,
    preserveObjectStacking: true
});
canvas.setDimensions({
    width: '350px',
    height: '350px'
}, {
    cssOnly: true
});
let photo_canvas = new fabric.Canvas('photo_canvas', {
    width: 350,
    height: 350,
    preserveObjectStacking: true
});
photo_canvas.setDimensions({
    width: '350px',
    height: '350px'
}, {
    cssOnly: true
});
let ctx1 = canvas.getContext("2d");
let ctx2 = photo_canvas.getContext("2d");

$(document).ready(function () {

    var elem = document.querySelector('.infinite-switch');
    var init = new Switchery(elem, { color: '#3fcc35', size: 'small' });
    
    getRequestList();
    selectBackPhoto();
    blurPhoto();
    addEmojisOnPhoto();
    sendPhoto();
    showPhoto();
    showPhotoPriceAndOption();
    document.getElementById("input_btn")
        .addEventListener('click', function () {
            document.getElementById("input_file").click();
        }, false);

    socket.on('receive:request', data => {
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

    socket.on('receive:photo', data => {
        let senderInfo = getCertainUserInfoById(data.from);
        let receiverInfo = getCertainUserInfoById(currentUserId);
        let target = '.contact-chat ul.chatappend';
        console.log(data.id);
        $(target).append(`<li class="sent" key="${data.id}">
            <div class="media">
                <div class="profile me-4 bg-size" style="background-image: url(${senderInfo.avatar ? 'v1/api/downloadFile?path=' + senderInfo.avatar : "/chat/images/contact/2.jpg"}); background-size: cover; background-position: center center;">
                </div>
                <div class="media-body">
                    <div class="contact-name">
                        <h5>${senderInfo.username}</h5>
                        <h6>01:42 AM</h6>
                        <ul class="msg-box">
                            <li key="${data.id}"><img class="receive_photo" src="${data.photo}"></li>
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
        $(e.currentTarget).find('.read-status').removeClass('fa-eye-slash');
        $(e.currentTarget).find('.read-status').addClass('fa-eye');
        // currentContactId = to;
        if (currentContactId)
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

function selectBackPhoto() {
    let photoFileInput = $('#input_file')
    // var canvas = new fabric.Canvas('back_canvas');
    photoFileInput.on('change', (e) => {
        let reader = new FileReader();
        files = e.target.files;
        reader.onload = () => {
            fabric.Image.fromURL(reader.result, function (oImg) {
                ori_image = reader.result;
                globalImage = oImg;

                let imgWidth = oImg.width;
                let imgHeight = oImg.height;
                if (imgWidth > 350 && imgHeight > 350) {
                    canvas.setDimensions({
                        width: '350px',
                        height: '350px'
                    }, {
                        cssOnly: true
                    });
                }
                if (imgWidth < 350 && imgHeight < 350) {
                    canvas.setDimensions({
                        width: imgWidth + 'px',
                        height: imgHeight + 'px'
                    }, {
                        cssOnly: true
                    });
                }
                let canvasWidth = canvas.getWidth();
                let canvasHeight = canvas.getHeight();

                let imgRatio = imgWidth / imgHeight;
                let canvasRatio = canvasWidth / canvasHeight;
                if (imgRatio <= canvasRatio) {
                    oImg.scaleToHeight(canvasHeight);
                } else {
                    oImg.scaleToWidth(canvasWidth);
                }
                canvas.clear();
                canvas.add(oImg);
                canvas.centerObject(oImg);

            });

        }
        reader.readAsDataURL(files[0]);

    });

    $('#input_reset').on('click', () => {
        canvas.setDimensions({
            width: '350px',
            height: '350px'
        }, {
            cssOnly: true
        });
        canvas.clear();
        globalImage = undefined;
    });
}

function blurPhoto() {
    $('.blur-range').on('input', e => {
        let obj = Object.assign(globalImage);
        let filter = new fabric.Image.filters.Blur({
            blur: e.currentTarget.value
        });
        obj.filters = [];
        obj.filters.push(filter);
        obj.applyFilters();
        canvas.renderAll();
    })
}

function addEmojisOnPhoto() {
    var touchtime = 0;
    $(".emojis img").on("click", e => {
        if (touchtime == 0) {
            touchtime = new Date().getTime();
        } else {
            if (((new Date().getTime()) - touchtime) < 800) {
                if (globalImage) {
                    fabric.Image.fromURL(e.target.src, function (oImg) {
                        // oImg.selectable = false;
                        oImg.price = $('.emojis-price').val();
                        oImg.on('mouseup', () => {
                            console.log(oImg.price);
                            console.log(oImg.left, oImg.top);
                            ctx1.font = "20px Arial";
                            ctx1.fillText("$" + oImg.price, oImg.left, oImg.top);
                            if (oImg.left < -10 || oImg.left > canvas.width || oImg.top < -10 || oImg.top > canvas.height) {
                                canvas.remove(canvas.getActiveObject());
                            }
                            // ctx1.fillText("$" + oImg.price, 10, 30);
                        });
                        canvas.add(oImg);
                        canvas.centerObject(oImg);
                    });
                }
                touchtime = 0;
            } else {
                // not a double click so set as a new first click
                touchtime = new Date().getTime();
            }
        }
    });
}

function sendPhoto() {
    $('#send-photo').on('click', () => {
        let data = {};
        data.from = currentUserId;
        data.to = currentContactId;
        data.photo = canvas.toDataURL('image/png');
        data.blur = $('.blur-range').val();
        data.content = getEmojisInfo(canvas._objects);
        socket.emit('send:photo', data);

        let target = '.contact-chat ul.chatappend';
        let senderInfo = getCertainUserInfoById(currentUserId);
        $(target).append(`<li class="replies" key="">
            <div class="media">
                <div class="profile me-4 bg-size" style="background-image: url(${senderInfo.avatar ? 'v1/api/downloadFile?path=' + senderInfo.avatar : "/chat/images/contact/2.jpg"}); background-size: cover; background-position: center center;">
                </div>
                <div class="media-body">
                    <div class="contact-name">
                        <h5>${senderInfo.username}</h5>
                        <h6>01:42 AM</h6>
                        <ul class="msg-box">
                            <li><img class="receive_photo" src="${data.photo}"></li>
                        </ul>
                    </div>
                </div>
            </div>
        </li>`);

    });
}

function showPhoto() {
    $('.contact-chat ul.chatappend').on('click', '.receive_photo', e => {
        let id = $(e.currentTarget).closest('li').attr('key');
        var form_data = new FormData();
        form_data.append('id', id);
        $.ajax({
            url: '/home/getPhotoData',
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
                    let data = JSON.parse(res.data[0].content);

                    $('#photo_item').modal('show');
                    photo_canvas.clear();

                    // $('#photo_item .modal-content img').attr('src', image);
                    new Promise(resolve => {
                        let item = data[0];
                        fabric.Image.fromURL(item.src, function (oImg) {
                            oImg.left = item.position[0]
                            oImg.top = item.position[1]
                            oImg.scaleX = item.size[0]
                            oImg.scaleY = item.size[1]
                            oImg.angle = item.angle;
                            oImg.selectable = false;
                            photo_canvas.add(oImg);
                            resolve();
                        });
                    }).then(() => {
                        data.filter((item, index) => index != 0).forEach(item => {
                            fabric.Image.fromURL(item.src, function (oImg) {
                                oImg.left = item.position[0];
                                oImg.top = item.position[1];
                                oImg.scaleX = item.size[0];
                                oImg.scaleY = item.size[1];
                                oImg.angle = item.angle;
                                oImg.on('mouseup', e => {
                                    ctx2.font = "20px Arial";
                                    ctx2.fillText("$" + item.price, oImg.left, oImg.top);
                                    if (oImg.left < -10 || oImg.left > photo_canvas.width || oImg.top < -10 || oImg.top > photo_canvas.height) {
                                        photo_canvas.remove(photo_canvas.getActiveObject());
                                    }
                                });
                                if (item.price > 0) {
                                    oImg.selectable = false;
                                }
                                photo_canvas.add(oImg);
                            });
                        });
                    });
                } else {
                    $('#photo_item').modal('show');
                    let image = $(e.currentTarget).attr('src');
                    $('#photo_item .modal-content img').attr('src', image);
                }
            },
            error: function (response) {

            }
        });
    });
}

function getEmojisInfo(obj) {
    return JSON.stringify(obj.map((item, index) => {
        return {
            src: item._element.src,
            size: [item.scaleX, item.scaleY],
            position: [item.left, item.top],
            angle: item.angle,
            price: item.price
        }
    }));
}

function showPhotoPriceAndOption() {
    // canvas.on('selection:updated', function () {
    //     console.log('Event object:moving Triggered');
    // });
}


function getPhotoSrcById(id, target) {
    let form_data = new FormData();
    form_data.append('id', id);
    new Promise(resolve => {
        $.ajax({
            url: '/home/getPhotoData',
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
                console.log(res);
                if (res.state == 'true') {
                    let data = JSON.parse(res.data[0].content);
                    // return res.data[0].photo;
                    resolve(res.data[0].photo);
                } else {
                    // return'/chat/images/contact/2.jpg';
                }
            },
            error: function (response) {

            }
        });
    }).then(v => {
        target.find('.receive_photo').src = v;
    });
}
