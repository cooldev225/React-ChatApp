let globalImage;
let ori_image;
let tempImage;
let text;
let selectedEmojis = [];
let lockImage;
let unlockImage;
let priceImage;
let blurPrice = 0;
let photoPrice = 0;

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
} else if (viewportWidth <= 650) {
    var canvasDimension = 350
}
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
    "fangsong", "Verdana", "Trebuchet MS", "Gill Sans", "Optima"
];

$(document).ready(function() {

    // let elem = document.querySelector('.sticky-switch');
    // let init = new Switchery(elem, { color: '#3fcc35', size: 'small' });

    addFont();
    getRequestList();
    selectBackPhoto();
    blurPhoto();
    addEmojisOnPhoto();
    sendPhoto();
    showPhoto();
    showPhotoPriceAndOption();
    setContentRate();
    addTextOnPhoto();
    lockResizeEmojis();

    document.getElementById("input_btn")
        .addEventListener('click', function() {
            document.getElementById("input_file").click();
        }, false);
    document.getElementById("input_emoji_btn")
        .addEventListener('click', function() {
            document.getElementById("input_emoji_select").click();
        }, false);

    socket.on('receive:request', data => {
        let senderInfo = getCertainUserInfoById(data.from);
        let receiverInfo = getCertainUserInfoById(currentUserId);
        addRequestItem(senderInfo, receiverInfo, data);
        if (data.from != currentUserId)
            $('.photo-request-icon').addClass('dot-btn');
    });

    socket.on('get:rate', data => {
        let target = $('.chatappend').find(`.replies .msg-item[key=${data.messageId}]`);
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

    $('.restoreBtn').on('click', () => {
        let id = $('#photo_item .modal-content').attr('key');
        if (id) {
            showPhotoContent(id);
        }
    })
    $('.payWholePriceBtn').on('click', () => {
        payWholePhotoPrice();
    });

});

function addFont() {
    fonts.unshift('Times New Roman');
    // Populate the fontFamily select
    var select = document.getElementById("font-family");
    fonts.forEach(function(font) {
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
                success: function(res) {
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
                error: function(response) {

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
            fabric.Image.fromURL(reader.result, function(oImg) {
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
        canvas.setWidth(canvasDimension);
        canvas.setHeight(canvasDimension);
        canvas.clear();
        globalImage = undefined;
    });
}

function blurPhoto() {
    $('#blurRange').on('input', e => {
        if (canvas.getActiveObject()) {
            let obj = canvas.getActiveObject();
            let filter = new fabric.Image.filters.Blur({
                blur: e.currentTarget.value
            });
            obj.filters = [];
            obj.filters.push(filter);
            obj.applyFilters();
            obj.blur = e.currentTarget.value;
            canvas.renderAll();
        } else if (globalImage) {
            if ($('#createPhoto .preview-paid').hasClass('d-none')) {
                blurPrice = $('.emojis-price').val();
            } else {
                blurPrice = $('.preview-paid').val();
                // blurPrice = $('.sticky-switch').is(':checked') ? -1 : 0;
            }
            let obj = Object.assign(globalImage);

            let filter = new fabric.Image.filters.Blur({
                blur: e.currentTarget.value
            });
            obj.filters = [];
            obj.filters.push(filter);
            obj.applyFilters();
            obj.blur = e.currentTarget.value;
            canvas.renderAll();
        }
    })
}

function addEmojisOnPhoto() {
    var touchtime = 0;
    $(".emojis-tool img").on("click", (e) => {
        if (touchtime == 0) {
            touchtime = new Date().getTime();
        } else {
            if (((new Date().getTime()) - touchtime) < 800) {

                fabric.Image.fromURL(e.target.src, function(oImg) {
                    if ($('#createPhoto .preview-paid').hasClass('d-none')) {
                        oImg.price = $('.emojis-price').val();
                    } else {
                        oImg.price = $('.preview-paid').val();
                        // $('.sticky-switch').is(':checked') ? oImg.price = -1 : oImg.price = 0;
                    }
                    oImg.id = Date.now();
                    addEventAction(canvas, oImg);

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

    $('#input_emoji_select').on('change', e => {
        let reader = new FileReader();
        files = e.target.files;
        reader.onload = () => {
            fabric.Image.fromURL(reader.result, function(oImg) {
                if ($('#createPhoto .preview-paid').hasClass('d-none')) {
                    oImg.price = $('.emojis-price').val();
                } else {
                    oImg.price = $('.preview-paid').val();
                    // $('.sticky-switch').is(':checked') ? oImg.price = -1 : oImg.price = 0;
                }

                let ratio = oImg.width / oImg.height;
                let width = 50;
                let height = 50 / ratio;
                oImg.scaleX = 50 / oImg.width;
                oImg.scaleY = 50 / ratio / oImg.height;
                oImg.id = Date.now();
                addEventAction(canvas, oImg);

                canvas.add(oImg);
                canvas.centerObject(oImg);
            });

        }
        reader.readAsDataURL(files[0]);

    })
}

function sendPhoto() {
    $('#send-photo').on('click', (e) => {
        if (!ori_image && !canvas._objects.length) {
            return;
        }
        canvas._objects.filter(item => item.kind == 'temp').forEach(item => canvas.remove(item));
        let data = {};
        data.from = currentUserId;
        data.to = currentContactId;
        data.photo = canvas.toDataURL('image/png');
        data.back = ori_image || canvas.toDataURL('image/png');
        data.blur = canvas.backgroundImage && canvas.backgroundImage.blur || 0;
        data.blurPrice = blurPrice;
        data.content = getEmojisInfo(canvas._objects);
        socket.emit('send:photo', data);
    });
}

function showPhoto() {
    let touchtime = 0;
    $('.contact-chat ul.chatappend').on('click', '.receive_photo', e => {
        if (touchtime == 0) {
            touchtime = new Date().getTime();

        } else {
            if (((new Date().getTime()) - touchtime) < 800) {
                if ($(e.currentTarget).closest('li.msg-item').hasClass('replies')) {
                    $('.previewBtn').removeClass('d-none');
                    $('.payBtn').addClass('d-none');
                } else {
                    $('.previewBtn').addClass('d-none');
                    $('.payBtn').removeClass('d-none');
                }
                let id = $(e.currentTarget).closest('li.msg-item').attr('key');
                $('.selected-emojis').empty();
                selectedEmojis = [];
                if (id) {
                    showPhotoContent(id);

                } else {
                    $('#createPhoto').modal('show');
                }
            } else {
                // not a double click so set as a new first click
                touchtime = new Date().getTime();
            }
        }
    });
}

function getEmojisInfo(obj) {
    return JSON.stringify(obj.filter((item => item.kind != 'temp')).map((item, index) => {
        console.log(item.blur);
        if (item.type == 'image')
            return {
                id: item.id,
                type: 'image',
                src: item._originalElement.src,
                size: [item.scaleX, item.scaleY],
                position: [item.left, item.top],
                angle: item.angle,
                price: item.price,
                blur: item.blur,
                // selectable: item.selectable
            }
        else
            return {
                id: item.id,
                type: 'text',
                text: item.text,
                width: item.width,
                height: item.height,
                size: [item.scaleX, item.scaleY],
                position: [item.left, item.top],
                angle: item.angle,
                price: item.price,
                // selectable: item.selectable,
                fontSize: item.fontSize,
                fontFamily: item.fontFamily,
                fontSize: item.fontSize,
                fill: item.fill,
                backgroundColor: item.backgroundColor,
                fontWeight: item.fontWeight,
                fontStyle: item.fontStyle,
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
            success: function(res) {
                if (res.state == 'true') {
                    let data = JSON.parse(res.data[0].content);
                    // return res.data[0].photo;
                    resolve(res.data[0].photo);
                } else {
                    // return'/chat/images/contact/2.jpg';
                }
            },
            error: function(response) {

            }
        });
    }).then(v => {
        target.find('.receive_photo').src = v;
    });
}

function payWholePhotoPrice() {
    let messageId = $('#photo_item .modal-content').attr('key');
    let photoId = $('#photo_item .modal-content').attr('photoId');
    // $('#removeBlur').removeAttr('disabled');
    // let price = selectedEmojis.reduce((total, item) => photo_canvas._objects.find(oImg => oImg.cacheKey == item).price + sum, 0);
    if (!selectedEmojis.length) {
        photo_canvas._objects.filter(item => item.kind != 'temp').forEach(item => selectedEmojis.push(item.id));
        selectedEmojis.push('blur');
    }
    photo_canvas._objects.filter(item => selectedEmojis.includes(item.id)).forEach(item => {
        if (item.price > 0) {
            item.price = 0;
            item.selectable = true;
        }
        if (item.blur) {
            let filter = new fabric.Image.filters.Blur({
                blur: 0
            });
            item.filters = [];
            item.filters.push(filter);
            item.applyFilters();
        }
        photo_canvas.renderAll();
    });
    if (selectedEmojis.includes('blur')) {
        let obj = photo_canvas.backgroundImage;
        if (obj) {
            let filter = new fabric.Image.filters.Blur({
                blur: 0
            });
            obj.filters = [];
            obj.filters.push(filter);
            obj.applyFilters();
        }
        photo_canvas.renderAll();
    }
    // alert(`You can control emojis which you selected`);
    // alert(`You can control ${selectedEmojis.length} emojis which you selected`);

}

function getContentRate(target, rate) {
    $(target).find(`.photoRating div`).removeClass('checked');
    $(target).find(`.photoRating div:nth-child(${6 - rate})`).addClass('checked');
}

function setContentRate() {
    $(document).on('click', '.photoRating div', function(e) {
        let rate = 5 - $(this).index();

        if ($('#photo_item').hasClass('show') && !$('#photo_item .modal-content').hasClass('sent')) {
            var messageId = $('#photo_item .modal-content').attr('key');
            var kind = 2;

        } else {
            var messageId = $(this).parents('li.sent').attr('key');
            var kind = $(this).parents('li.sent').attr('kind');
        }
        if (messageId) {
            $(e.target).closest('.photoRating').find('div').removeClass('checked');
            $(this).toggleClass('checked');
            socket.emit('give:rate', { messageId, rate, currentContactId, kind });
        }
    });
}

function addTextOnPhoto() {

    $('.addText').on('click', function() {
        if ($('#createPhoto .preview-paid').hasClass('d-none')) {
            var price = $('.emojis-price').val();
        } else {
            var price = $('.preview-paid').val();
            // var price = $('.sticky-switch').is(':checked') ? -1 : 0;
        }
        let text = $('.text-tool .text').val();
        if (text) {
            let textBox = new fabric.Textbox(text, {
                with: 200,
                fontSize: 20,
                fill: '#4700B3',
                textAlign: 'center',
                backgroundColor: '#C4E6C1',
                editable: false,
                price: price
            });
            addEventAction(canvas, textBox);
            textBox.id = Date.now();
            canvas.add(textBox).setActiveObject(textBox);
            canvas.centerObject(textBox);
            $('.text-tool .text').val('');
        }

    });
    $('#font-family').on('change', function() {
        if (canvas.getActiveObject()) {
            canvas.getActiveObject().set("fontFamily", this.value);
            canvas.requestRenderAll();
        }
    });

    $('#backColorPicker').colorpicker().on('changeColor', e => {
        let color = e.color.toString();
        $('#backColorPicker').css('backgroundColor', color);
        $('#backColorPicker').attr('value', color);
        if (canvas.getActiveObject()) {
            canvas.getActiveObject().set("backgroundColor", color);
            canvas.requestRenderAll();
        }
    })
    $('#fontColorPicker').colorpicker().on('changeColor', e => {
        let color = e.color.toString();
        $('#fontColorPicker').css('backgroundColor', color);
        $('#fontColorPicker').attr('value', color);
        if (canvas.getActiveObject()) {
            canvas.getActiveObject().set("fill", color);
            canvas.requestRenderAll();
        }
    })

    $('.font-style').on('click', function(e) {
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

function addEventAction(panel, element) {
    element.on({
        'mouseup': () => {
            if (tempImage) panel.remove(tempImage);
            if (text) panel.remove(text);
            let timeout = 1500;
            if (element.left < -10 || element.left > panel.width || element.top < -10 || element.top > panel.height) {
                panel.remove(panel.getActiveObject());
                panel.remove(tempImage);
                panel.remove(text);
                photoPrice -= element.price;
            }
            if (element.price == -1) tempImage = lockImage;
            else if (element.price == 0) tempImage = unlockImage;
            else {
                tempImage = priceImage;
                timeout = 5000;
            }
            tempImage.scale(0.5);
            if (element.price > 9) tempImage.scaleX *= 1.2;
            tempImage.left = element.aCoords.tr.x - 0.25 * tempImage.width;
            tempImage.top = element.aCoords.tr.y - 0.25 * tempImage.height;
            if (element.aCoords.tr.x + 30 > panel.width) {
                tempImage.left = element.aCoords.tl.x - 0.25 * tempImage.width;
            }
            if (element.aCoords.tr.y < 30)
                tempImage.top = element.aCoords.br.y - 0.25 * tempImage.height;
            tempImage.kind = 'temp';
            tempImage.selectable = false;
            tempImage.hasControls = false;
            panel.add(tempImage);
            if (element.price > 0) {
                text = new fabric.Text('$' + element.price, {
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
                panel.add(text);
            }
            setTimeout(() => {
                panel.remove(tempImage);
                panel.remove(text);
            }, timeout);
        },
        'moving': () => {
            if (tempImage)
                panel.remove(tempImage);
            if (text)
                panel.remove(text);
        }

    });
}

function showPhotoContent(id) {
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
        success: function(res) {
            $('.selected-emojis').css('left', canvasDimension + 40 + 'px');
            if (res.state == 'true') {
                let emojis = JSON.parse(res.data[0].content);
                $('#photo_item').modal('show');
                $('#photo_item .modal-content').attr('key', id);
                $('#photo_item .modal-content').attr('photoId', res.data[0].id);
                $('#photo_item .modal-content').removeClass('sent');
                if (res.data[0].from == currentUserId) {
                    $('#photo_item .modal-content').addClass('sent');
                }
                photo_canvas.clear();
                selectedEmojis = [];
                $('.selected-emojis').empty();
                //add blur price 
                $('#photo_item .blur-image').attr('price', res.data[0].blur_price);
                let touchtime = 0;
                $('#photo_item .blur-image').off().on('mouseup', () => {
                    if (touchtime == 0) {
                        touchtime = new Date().getTime();
                    } else {
                        if (((new Date().getTime()) - touchtime) < 800) {

                            if (res.data[0].blur_price) {
                                if (selectedEmojis.find(item => item == 'blur')) {
                                    $(`.selected-emojis img[key=blur]`).remove();
                                    selectedEmojis = selectedEmojis.filter(item => item != 'blur');
                                } else {
                                    selectedEmojis.push('blur');
                                    var img = document.createElement('img');
                                    img.src = '/images/blur.png';
                                    $(img).attr('key', 'blur');
                                    $('.selected-emojis').append(img);
                                }
                                let price = selectedEmojis.filter(item => item != 'blur').reduce((total, item) => Number(photo_canvas._objects.find(oImg => oImg.id == item).price) + total, 0);
                                if (selectedEmojis.includes('blur')) price += res.data[0].blur_price;
                                price == 0 ? price = photoPrice : '';
                                $('#photo_item .modal-content .photo-price').text('$' + price)
                            }
                            touchtime = 0;
                        } else {
                            // not a double click so set as a new first click
                            touchtime = new Date().getTime();
                        }
                    }
                });
                //5 star rating
                getContentRate('#photo_item', res.data[0].rate);
                //background
                new Promise(resolve => {
                    fabric.Image.fromURL(res.data[0].back, function(oImg) {
                        let filter = new fabric.Image.filters.Blur({
                            blur: res.data[0].blur
                        });
                        oImg.filters = [];
                        oImg.filters.push(filter);
                        oImg.applyFilters();
                        photo_canvas.setWidth(oImg.width);
                        photo_canvas.setHeight(oImg.height);
                        photo_canvas.setBackgroundImage(oImg, photo_canvas.renderAll.bind(photo_canvas));
                        resolve();
                    });
                }).then(() => {
                    photoPrice = 0;
                    Promise.all(emojis.map(item => {
                        return new Promise(resolve => {
                            if (item.type == 'image') {
                                fabric.Image.fromURL(item.src, function(oImg) {
                                    oImg.id = item.id;
                                    oImg.left = item.position[0];
                                    oImg.top = item.position[1];
                                    oImg.scaleX = item.size[0];
                                    oImg.scaleY = item.size[1];
                                    oImg.angle = item.angle;
                                    oImg.price = item.price;
                                    let filter = new fabric.Image.filters.Blur({
                                        blur: item.blur || 0
                                    });
                                    oImg.blur = item.blur;
                                    oImg.filters = [];
                                    oImg.filters.push(filter);
                                    oImg.applyFilters();
                                    let touchtime = 0;
                                    oImg.on("mouseup", e => {
                                        if (touchtime == 0) {
                                            touchtime = new Date().getTime();
                                        } else {
                                            if (((new Date().getTime()) - touchtime) < 800) {
                                                if (oImg.price == -1) {
                                                    alert('This is static Element')
                                                    return;
                                                }
                                                if (selectedEmojis.find(item => item == oImg.id)) {
                                                    $(`.selected-emojis img[key=${oImg.id}]`).remove();
                                                    selectedEmojis = selectedEmojis.filter(item => item != oImg.id);
                                                } else {
                                                    selectedEmojis.push(oImg.id);
                                                    var img = document.createElement('img');
                                                    img.src = oImg.getSrc();
                                                    $(img).attr('key', oImg.id);
                                                    $('.selected-emojis').append(img);
                                                }
                                                let price = selectedEmojis.filter(item => item != 'blur').reduce((total, item) => Number(photo_canvas._objects.find(oImg => oImg.id == item).price) + total, 0);
                                                if (selectedEmojis.includes('blur')) price += res.data[0].blur_price;
                                                price == 0 ? price = photoPrice : '';
                                                $('#photo_item .modal-content .photo-price').text('$' + price)
                                                touchtime = 0;
                                            } else {
                                                // not a double click so set as a new first click
                                                touchtime = new Date().getTime();
                                            }
                                        }
                                    });
                                    resolve(oImg);
                                });
                            } else if (item.type == 'text') {
                                let textBox = new fabric.Textbox(item.text, {
                                    id: item.id,
                                    width: item.width,
                                    height: item.height,
                                    scaleX: item.size[0],
                                    scaleY: item.size[1],
                                    left: item.position[0],
                                    top: item.position[1],
                                    angle: item.angle,
                                    price: item.price,
                                    fontSize: item.fontSize,
                                    fontFamily: item.fontFamily,
                                    fontSize: item.fontSize,
                                    fontWeight: item.fontWeight,
                                    fontStyle: item.fontStyle,
                                    fill: item.fill,
                                    backgroundColor: item.backgroundColor,
                                    textAlign: 'center'
                                });
                                let touchtime = 0;
                                textBox.on("mouseup", e => {
                                    if (touchtime == 0) {
                                        touchtime = new Date().getTime();
                                    } else {
                                        if (((new Date().getTime()) - touchtime) < 800) {
                                            if (textBox.price == -1) {
                                                alert('This is static Element')
                                                return;
                                            }
                                            if (selectedEmojis.find(item => item == textBox.id)) {
                                                $(`.selected-emojis img[key=${textBox.id}]`).remove();
                                                selectedEmojis = selectedEmojis.filter(item => item != textBox.id);
                                            } else {
                                                selectedEmojis.push(textBox.id);
                                                var img = document.createElement('img');
                                                img.src = '/images/text.png';
                                                $(img).attr('key', textBox.id);
                                                $('.selected-emojis').append(img);

                                            }
                                            let price = selectedEmojis.filter(item => item != 'blur').reduce((total, item) => Number(photo_canvas._objects.find(oImg => oImg.id == item).price) + total, 0);
                                            if (selectedEmojis.includes('blur')) price += res.data[0].blur_price;
                                            price == 0 ? price = photoPrice : '';
                                            $('#photo_item .modal-content .photo-price').text('$' + price)
                                            touchtime = 0;
                                        } else {
                                            // not a double click so set as a new first click
                                            touchtime = new Date().getTime();
                                        }
                                    }
                                });
                                resolve(textBox);
                            }
                        })
                    })).then(objects => {
                        for (var object of objects) {
                            if (+object.price != 0) {
                                object.selectable = false;
                            }
                            photo_canvas.add(object);
                            addEventAction(photo_canvas, object);
                            if (+object.price > 0) {
                                photoPrice += Number(object.price);
                            }
                        }
                        if (res.data[0].blur_price) photoPrice += res.data[0].blur_price;
                        $('#photo_item .modal-content .photo-price').text('$' + photoPrice);
                    });
                });
            } else {
                $('#photo_item').modal('show');
            }
        },
        error: function(response) {

        }
    });
}

function lockResizeEmojis() {
    $('.lock-tool').on('click', event => {
        $(event.currentTarget).toggleClass('lock');
        $(event.currentTarget).toggleClass('unlock');
        $(event.currentTarget).find('.icon-btn').toggleClass('btn-outline-danger');
        $(event.currentTarget).find('.icon-btn').toggleClass('btn-outline-success');
        let myCanvas = $('#photo_item').hasClass('show') ? photo_canvas : canvas;
        let lock = $(event.currentTarget).hasClass('lock');
        if (myCanvas.getActiveObject()) {
            myCanvas.getActiveObject().lockScalingX = lock;
            myCanvas.getActiveObject().lockScalingY = lock;
        } else {
            myCanvas._objects.forEach(item => {
                item.lockScalingX = lock;
                item.lockScalingY = lock;
            });
        }
        myCanvas.renderAll();
    });
}