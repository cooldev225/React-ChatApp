let globalImage;
let ori_image;
let tempImage;
let text;
let selectedEmojis = [];
let lockImage;
let unlockImage;
let priceImage;

fabric.Image.fromURL('/images/lock.png', (oImg) => {
    lockImage = oImg;
});
fabric.Image.fromURL('/images/unlock.png', (oImg) => {
    unlockImage = oImg;
});
fabric.Image.fromURL('/images/normal.png', (oImg) => {
    priceImage = oImg;
});

var viewportWidth = jQuery(window).width();
if (viewportWidth > 650) {
    var canvasDimension = 400
} else if (viewportWidth <= 510) {
    var canvasDimension = 300
} else if(viewportWidth <= 650) {
    var canvasDimension = 350
}
console.log(canvasDimension)
var canvas = new fabric.Canvas('back_canvas', {
    width: canvasDimension,
    height: canvasDimension,
    preserveObjectStacking: true
});
var photo_canvas = new fabric.Canvas('photo_canvas', {
    width: canvasDimension,
    height: canvasDimension,
    preserveObjectStacking: true
});
var fonts = ["Arial", "monospace", "cursive", "fantasy", "emoji", "math",
    "fangsong", "Verdana", "Trebuchet MS", "Gill Sans", "Optima"];

$(document).ready(function () {

    let elem = document.querySelector('.sticky-switch');
    let init = new Switchery(elem, { color: '#3fcc35', size: 'small' });


    addFont();
    getRequestList();
    selectBackPhoto();
    blurPhoto();
    addEmojisOnPhoto();
    sendPhoto();
    showPhoto();
    showPhotoPriceAndOption();
    payWholePhotoPrice();
    setContentRate();
    addTextOnPhoto();
    document.getElementById("input_btn")
        .addEventListener('click', function () {
            document.getElementById("input_file").click();
        }, false);

    socket.on('receive:request', data => {
        let senderInfo = getCertainUserInfoById(data.from);
        let receiverInfo = getCertainUserInfoById(currentUserId);
        addRequestItem(senderInfo, receiverInfo, data);
        if (data.from != currentUserId)
            $('.photo-request-icon').addClass('dot-btn');
    });

    // socket.on('receive:photo', data => {
    //     console.log(data);
    // });

    socket.on('get:rate', data => {
        let target = $('.chatappend').find(`.replies .msg-box>li[key=${data.messageId}]`);
        getContentRate(target, data.rate);
    })

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
        if (currentUserId == from && currentContactId != to) {
            setCurrentChatContent(to);
        } else if (currentUserId == to && currentContactId != from) {
            setCurrentChatContent(from);
        }
        currentUserId == from ? setCurrentChatContent(to) : setCurrentChatContent(from);

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
        socket.emit('reject:request');
    });

});

function addFont() {
    fonts.unshift('Times New Roman');
    // Populate the fontFamily select
    var select = document.getElementById("font-family");
    fonts.forEach(function (font) {
        var option = document.createElement('option');
        option.innerHTML = font;
        option.value = font;
        select.appendChild(option);
    });
}
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
                            addRequestItem(senderInfo, receiverInfo, item);
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
}

function addRequestItem(senderInfo, receiverInfo, data) {
    let sendFlag = senderInfo.id == currentUserId ? true : false;
    $("ul.request-list").append(
        `<li class="${sendFlag ? 'sent' : ''}" key="${data.id || data.requestId}" data-from="${senderInfo.id}" data-to="${receiverInfo.id}">
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
    photoFileInput.on('change', (e) => {
        let reader = new FileReader();
        files = e.target.files;
        reader.onload = () => {
            fabric.Image.fromURL(reader.result, function (oImg) {
                ori_image = reader.result;
                globalImage = oImg;

                let imgWidth = oImg.width;
                let imgHeight = oImg.height;
                let imgRatio = imgWidth / imgHeight;

                if (imgWidth > canvasDimension || imgHeight > canvasDimension) {
                    if (imgWidth > imgHeight) {
                        var width = canvasDimension;
                        var height = width / imgRatio;
                    } else {
                        var height = canvasDimension;
                        var width = height * imgRatio;
                    }

                } else {
                    var width = imgWidth;
                    var height = imgHeight;
                }
                canvas.setWidth(width);
                canvas.setHeight(height);

                canvas.setBackgroundImage(oImg, canvas.renderAll.bind(canvas), {
                    scaleX: width / oImg.width,
                    scaleY: height / oImg.height
                });
                ori_image = canvas.toDataURL('image/png');

            });

        }
        reader.readAsDataURL(files[0]);

    });

    $('#input_reset').on('click', () => {
        // canvas.setDimensions({
        //     width: canvasDimension + 'px',
        //     height: canvasDimension + 'px'
        // }, {
        //     cssOnly: true
        // });
        canvas.setWidth(canvasDimension);
        canvas.setHeight(canvasDimension);
        canvas.clear();
        globalImage = undefined;
    });
}

function blurPhoto() {
    $('#blurRange').on('input', e => {
        if (globalImage) {

            let obj = Object.assign(globalImage);
            let filter = new fabric.Image.filters.Blur({
                blur: e.currentTarget.value
            });
            obj.filters = [];
            obj.filters.push(filter);
            obj.applyFilters();
            canvas.renderAll();
        }
    })
    $('#removeBlur').on('input', e => {
        let obj = photo_canvas.backgroundImage;
        if (obj) {
            let filter = new fabric.Image.filters.Blur({
                blur: e.currentTarget.value
            });
            obj.filters = [];
            obj.filters.push(filter);
            obj.applyFilters();
            photo_canvas.renderAll();
        }
    });
}

function addEmojisOnPhoto() {
    var touchtime = 0;
    $(".emojis-tool img").on("click", e => {
        if (touchtime == 0) {
            touchtime = new Date().getTime();
        } else {
            if (((new Date().getTime()) - touchtime) < 800) {

                fabric.Image.fromURL(e.target.src, function (oImg) {
                    if ($('#createPhoto .switch-list').hasClass('d-none')) {
                        oImg.price = $('.emojis-price').val();
                    } else {
                        $('.sticky-switch').is(':checked') ? oImg.price = -1 : oImg.price = 0;
                    }

                    oImg.on({
                        'mouseup': () => {
                            if (tempImage) canvas.remove(tempImage);
                            if (text) canvas.remove(text);
                            let timeout = 1500;
                            if (oImg.left < -10 || oImg.left > canvas.width || oImg.top < -10 || oImg.top > canvas.height) {
                                canvas.remove(canvas.getActiveObject());
                                canvas.remove(tempImage);
                                canvas.remove(text);
                            }
                            if (oImg.price == -1) tempImage = lockImage;
                            else if (oImg.price == 0) tempImage = unlockImage;
                            else {
                                tempImage = priceImage;
                                timeout = 3000;
                            }
                            tempImage.scale(0.5);
                            if (oImg.price > 9) tempImage.scaleX *= 1.2;
                            tempImage.left = oImg.aCoords.tr.x - 0.25 * tempImage.width;
                            tempImage.top = oImg.aCoords.tr.y - 0.25 * tempImage.height;
                            if (oImg.aCoords.tr.x + 30 > canvas.width) {
                                tempImage.left = oImg.aCoords.tl.x - 0.25 * tempImage.width;
                            }
                            if (oImg.aCoords.tr.y < 30)
                                tempImage.top = oImg.aCoords.br.y - 0.25 * tempImage.height;
                            tempImage.kind = 'temp';
                            tempImage.selectable = false;
                            tempImage.hasControls = false;
                            canvas.add(tempImage);
                            if (oImg.price > 0) {
                                text = new fabric.Text('$' + oImg.price, {
                                    left: tempImage.left + 3,
                                    top: tempImage.top + 3,
                                    fontFamily: 'Ubuntu',
                                    fontWeight: 'bold',
                                    fontStyle: 'italic',
                                    fontSize: '15'
                                });
                                text.kind = 'temp';
                                text.selectable = false;
                                text.hasControls = false;
                                canvas.add(text);
                            }
                            if (oImg.price == -1) {
                                oImg.selectable = false;
                            }
                            setTimeout(() => {
                                canvas.remove(tempImage);
                                canvas.remove(text);
                            }, timeout);
                        },
                        'moving': () => {
                            if (tempImage)
                                canvas.remove(tempImage);
                            if (text)
                                canvas.remove(text);
                        }

                    });

                    canvas.add(oImg);
                    canvas.centerObject(oImg);
                });

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
        canvas._objects.filter(item => item.kind == 'temp').forEach(item => canvas.remove(item));
        console.log(canvas._objects);
        let data = {};
        data.from = currentUserId;
        data.to = currentContactId;
        data.photo = canvas.toDataURL('image/png');
        data.back = ori_image;
        data.blur = $('#blurRange').val();
        data.content = getEmojisInfo(canvas._objects);
        socket.emit('send:photo', data);
    });
}

function showPhoto() {
    $('.contact-chat ul.chatappend').on('click', '.receive_photo', e => {
        let id = $(e.currentTarget).closest('li').attr('key');
        $('.selected-emojis').empty();
        selectedEmojis = [];
        if (id) {
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
                    console.log(res);
                    $('.selected-emojis').css('left', canvasDimension + 40 + 'px');
                    if (res.state == 'true') {
                        let emojis = JSON.parse(res.data[0].content);

                        $('#photo_item').modal('show');
                        $('#photo_item .modal-content').attr('key', id);
                        $('#photo_item .modal-content').removeClass('sent');
                        if (res.data[0].from == currentUserId) {
                            $('#photo_item .modal-content').addClass('sent');
                        }

                        photo_canvas.clear();
                        getContentRate('#photo_item', res.data[0].rate);
                        $('#removeBlur').attr('disabled', '');
                        $('#removeBlur').val(res.data[0].blur);
                        new Promise(resolve => {
                            fabric.Image.fromURL(res.data[0].back, function (oImg) {
                                let filter = new fabric.Image.filters.Blur({
                                    blur: res.data[0].blur
                                });
                                oImg.filters = [];
                                oImg.filters.push(filter);
                                oImg.applyFilters();
                                // oImg.scale(canvasDimension / oImg.width)
                                // if (oImg.width > canvasDimension)
                                //     oImg.width = canvasDimension;
                                // if (oImg.height > canvasDimension)
                                //     oImg.height = canvasDimension;
                                photo_canvas.setWidth(oImg.width);
                                photo_canvas.setHeight(oImg.height);
                                photo_canvas.setBackgroundImage(oImg, photo_canvas.renderAll.bind(photo_canvas));

                                resolve();
                            });
                        }).then(() => {
                            let photoPrice = 0;
                            emojis.forEach(item => {
                                if (item.type == 'image') {
                                    fabric.Image.fromURL(item.src, function (oImg) {
                                        oImg.left = item.position[0];
                                        oImg.top = item.position[1];
                                        oImg.scaleX = item.size[0];
                                        oImg.scaleY = item.size[1];
                                        oImg.angle = item.angle;
                                        oImg.price = item.price;
                                        if (item.price != 0) {
                                            oImg.selectable = false;
                                        }
                                        photo_canvas.add(oImg);
                                        oImg.on({
                                            'mouseup': () => {
                                                let timeout = 2000;
                                                if (tempImage) photo_canvas.remove(tempImage);
                                                if (text) photo_canvas.remove(text);

                                                if (oImg.left < -10 || oImg.left > photo_canvas.width || oImg.top < -10 || oImg.top > photo_canvas.height) {
                                                    photo_canvas.remove(photo_canvas.getActiveObject());
                                                    photo_canvas.remove(tempImage);
                                                    photo_canvas.remove(text);
                                                }
                                                if (oImg.price == -1) tempImage = lockImage;
                                                else if (oImg.price == 0) tempImage = unlockImage;
                                                else {
                                                    tempImage = priceImage;
                                                    timeout = 5000;
                                                }
                                                tempImage.scale(0.5);
                                                if (oImg.price > 9) tempImage.scaleX *= 1.2;
                                                tempImage.left = oImg.aCoords.tr.x - 0.25 * tempImage.width;
                                                tempImage.top = oImg.aCoords.tr.y - 0.25 * tempImage.height;
                                                if (oImg.aCoords.tr.x + 30 > photo_canvas.width) {
                                                    tempImage.left = oImg.aCoords.tl.x - 0.25 * tempImage.width;
                                                }
                                                if (oImg.aCoords.tr.y < 30)
                                                    tempImage.top = oImg.aCoords.br.y - 0.25 * tempImage.height;
                                                tempImage.kind = "temp";
                                                tempImage.selectable = false;
                                                tempImage.hasControls = false;
                                                photo_canvas.add(tempImage);
                                                if (oImg.price > 0) {
                                                    text = new fabric.Text('$' + oImg.price, {
                                                        left: tempImage.left + 3,
                                                        top: tempImage.top + 3,
                                                        fontFamily: 'Ubuntu',
                                                        fontWeight: 'bold',
                                                        fontStyle: 'italic',
                                                        fontSize: '15'
                                                    });
                                                    text.kind = 'temp';
                                                    text.selectable = false;
                                                    text.hasControls = false;
                                                    photo_canvas.add(text);
                                                    text.on('mouseup', () => {
                                                        console.log(oImg.price);
                                                    });
                                                }

                                                setTimeout(() => {
                                                    photo_canvas.remove(tempImage);
                                                    photo_canvas.remove(text);

                                                }, timeout);
                                            },
                                            'moving': () => {
                                                photo_canvas.remove(tempImage);
                                                photo_canvas.remove(text);
                                            }
                                        });
                                        // add to cart
                                        var touchtime = 0;
                                        oImg.on("mouseup", e => {
                                            if (touchtime == 0) {
                                                touchtime = new Date().getTime();
                                            } else {
                                                if (((new Date().getTime()) - touchtime) < 800) {
                                                    if (oImg.price == -1) {
                                                        alert('This is static Emoji')
                                                        return;
                                                    }
                                                    if (selectedEmojis.find(item => item == oImg.cacheKey)) {
                                                        $(`.selected-emojis img[key=${oImg.cacheKey}]`).remove();
                                                        selectedEmojis = selectedEmojis.filter(item => item != oImg.cacheKey);
                                                    } else {
                                                        selectedEmojis.push(oImg.cacheKey);
                                                        var img = document.createElement('img');
                                                        img.src = oImg.getSrc();
                                                        $(img).attr('key', oImg.cacheKey);
                                                        $('.selected-emojis').append(img);
                                                    }
                                                    let price = selectedEmojis.reduce((total, item) => Number(photo_canvas._objects.find(oImg => oImg.cacheKey == item).price) + total, 0);
                                                    price == 0 ? price = photoPrice : '';
                                                    $('#photo_item .modal-content .photo-price').text('$' + price)
                                                    console.log(price);
                                                    touchtime = 0;
                                                } else {
                                                    // not a double click so set as a new first click
                                                    touchtime = new Date().getTime();
                                                }
                                            }
                                        });
                                    });
                                } else if (item.type == 'text') {
                                    let textBox = new fabric.Textbox(item.text, {
                                        scaleX: item.size[0],
                                        scaleY: item.size[1],
                                        left: item.position[0],
                                        top: item.position[1],
                                        angle: item.angle,
                                        price: item.price,
                                        selectable: item.selectable,
                                        fontSize: item.fontSize,
                                        fontFamily: item.fontFamily,
                                        fontSize: item.fontSize,
                                        fontWeight: item.fontWeight,
                                        fontStyle: item.fontStyle,
                                        fill: item.fill
                                    });
                                    photo_canvas.add(textBox);

                                }
                                if (item.price > 0) {
                                    photoPrice += Number(item.price);
                                }

                            });
                            $('#photo_item .modal-content .photo-price').text('$' + photoPrice);

                        });
                    } else {
                        $('#photo_item').modal('show');
                        // let image = $(e.currentTarget).attr('src');
                        // $('#photo_item .modal-content img').attr('src', image);
                    }
                },
                error: function (response) {

                }
            });
        } else {
            $('#createPhoto').modal('show');
        }

    });
}

function getEmojisInfo(obj) {
    return JSON.stringify(obj.filter((item => item.kind != 'temp')).map((item, index) => {
        if (item.type == 'image')
            return {
                type: 'image',
                src: item._element.src,
                size: [item.scaleX, item.scaleY],
                position: [item.left, item.top],
                angle: item.angle,
                price: item.price,
                selectable: item.selectable
            }
        else
            return {
                type: 'text',
                text: item.text,
                size: [item.scaleX, item.scaleY],
                position: [item.left, item.top],
                angle: item.angle,
                price: item.price,
                selectable: item.selectable,
                fontSize: item.fontSize,
                fontFamily: item.fontFamily,
                fontSize: item.fontSize,
                fill: item.fill,
                fontWeight: item.fontWeight,
                fontStyle: item.fontStyle
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

function payWholePhotoPrice() {
    $('.payWholePriceBtn').on('click', () => {
        $('#removeBlur').removeAttr('disabled');
        // let price = selectedEmojis.reduce((total, item) => photo_canvas._objects.find(oImg => oImg.cacheKey == item).price + sum, 0);
        if (selectedEmojis.length) {
            photo_canvas._objects.filter(item => selectedEmojis.includes(item.cacheKey)).forEach(item => {
                if (item.price > 0) {
                    item.price = 0;
                    item.selectable = true;
                    photo_canvas.renderAll();
                }
            });
            alert(`You can control ${selectedEmojis.length} emojis which you selected`);
        } else {
            photo_canvas._objects.forEach(item => {
                if (item.price > 0) {
                    item.price = 0;
                    item.selectable = true;
                    photo_canvas.renderAll();
                }
            });
        }
    });
}

function getContentRate(target, rate) {
    $(target).find(`.photoRating div`).removeClass('checked');
    $(target).find(`.photoRating div:nth-child(${6 - rate})`).addClass('checked');
}

function setContentRate() {
    $(document).on('click', '.photoRating div', function (e) {
        let rate = 5 - $(this).index();

        if ($('#photo_item').hasClass('show') && !$('#photo_item .modal-content').hasClass('sent')) {
            var messageId = $('#photo_item .modal-content').attr('key');

        } else {
            var messageId = $(this).parents('li.sent').find('.msg-box>li').attr('key');
        }
        if (messageId) {
            $(e.target).closest('.photoRating').find('div').removeClass('checked');
            $(this).toggleClass('checked');
            socket.emit('give:rate', { messageId, rate, currentContactId });
        }
    });
}
function addTextOnPhoto() {
    $('.addText').on('click', () => {
        let text = $('.text-tool .text').val();
        let textBox = new fabric.Textbox(text, {
            left: 50,
            top: 50,
            with: 150,
            fontSize: 20,
            editable: false
        });
        // textBox.on('mouseup', () => {
        //     if (textBox.left < -10 || textBox.left > canvas.width || textBox.top < -10 || textBox.top > canvas.height) {
        //         canvas.remove(canvas.getActiveObject());
        //         // photo_canvas.remove(tempImage);
        //         // photo_canvas.remove(text);
        //     }
        // });
        canvas.add(textBox).setActiveObject(textBox);
        // canvas.centerObject(textBox);

    });
    $('#font-family').on('change', function () {
        if (canvas.getActiveObject()) {
            canvas.getActiveObject().set("fontFamily", this.value);
            canvas.requestRenderAll();
        }
    });
    $('#colorPicker').on('input', function () {
        if (canvas.getActiveObject()) {
            canvas.getActiveObject().set("fill", this.value);
            canvas.requestRenderAll();
        }
    });
    $('.font-style').on('click', function (e) {
        if (canvas.getActiveObject()) {
            if ($(e.target).hasClass('bold')) {
                if ($(e.target).hasClass('active')) {
                    canvas.getActiveObject().set("fontWeight", '400');
                } else {
                    canvas.getActiveObject().set("fontWeight", 'bold');
                }
            } else {
                if ($(e.target).hasClass('active')) {
                    canvas.getActiveObject().set("fontStyle", 'normal');
                } else {
                    canvas.getActiveObject().set("fontStyle", 'italic');
                }
            }
            $(e.target).toggleClass('active');
            canvas.requestRenderAll();
        }
    });
}