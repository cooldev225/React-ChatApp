let totalPrice = 0;

$(document).ready(function() {

    $('#checkoutModal').on('shown.bs.modal', function(e) {
        totalPrice = 0;
        let userInfo = getCertainUserInfoById(currentContactId);
        $('#checkoutModal .recipientName').text(userInfo.username);
        $('#checkoutModal .recipientMail').text(userInfo.email);
        $('#checkoutModal .product-list .product-item').remove();
        if (!selectedEmojis.length) {
            photo_canvas._objects.filter(item => item.kind != 'temp').forEach(item => selectedEmojis.push(item.id));
            selectedEmojis.push('blur');
        }
        let blurPrice = $('#photo_item .blur-image').attr('price');

        photo_canvas._objects.filter(oImg => selectedEmojis.includes(oImg.id) && oImg.price > 0).forEach(item => {
            $('#checkoutModal .product-list .bottom-hr').before(
                `<div class="product-item mt-2 mb-2">
                    <img src="${item.type == 'image' ? item.getSrc() : '/images/text.png'}" />
                    <span>$${item.price}</span>
                </div>`);
            totalPrice += Number(item.price);
        });
        if (selectedEmojis.includes('blur')) {
            $('#checkoutModal .product-list .bottom-hr').before(
                `<div class="product-item mt-2 mb-2">
                    <img src="/images/blur.png" />
                    <span>$${blurPrice}</span>
                </div>`);
            totalPrice += Number(blurPrice);
        }
        $('#checkoutModal .total-price span:last-child').text(`$${totalPrice}`);
        if (!$('#paypal-button div').length)
            paypal.Button.render({
                env: 'sandbox', // Or 'production'
                style: {
                    size: 'medium',
                    color: 'gold',
                    shape: 'pill',
                },
                // Set up the payment:
                // 1. Add a payment callback
                payment: function(data, actions) {
                    // 2. Make a request to your server
                    return actions.request.post('/api/create-paypal-transaction', {
                            "_token": "{{ csrf_token() }}",
                            totalPrice
                        })
                        .then(function(res) {
                            // 3. Return res.id from the response
                            // console.log(res);
                            return res.id
                        })
                },
                // Execute the payment:
                // 1. Add an onAuthorize callback
                onAuthorize: function(data, actions) {
                    // 2. Make a request to your server
                    return actions.request.post('/api/confirm-paypal-transaction', {
                            "_token": "{{ csrf_token() }}",
                            payment_id: data.paymentID,
                            payer_id: data.payerID
                        })
                        .then(function(res) {
                            tempAction();
                            // 3. Show the buyer a confirmation message.
                        })
                }
            }, '#paypal-button')
    });
    $('.payWithBalanceBtn').on('click', () => {
        let userInfo = getCertainUserInfoById(currentUserId);
        if (!totalPrice) {
            payWholePhotoPrice();
            return;
        }
        if (userInfo.balances >= totalPrice) {
            tempAction();
        } else {
            alert('You have no enough balance. Please pay via Paypal or Card');
        }
    });

});

function tempAction() {
    let messageId = $('#photo_item .modal-content').attr('key');
    let photoId = $('#photo_item .modal-content').attr('photoId');
    let addBalance = totalPrice * 0.7;
    socket.emit('pay:photo', {
        photoId,
        selectedEmojis,
        addBalance
    });
    payWholePhotoPrice();
    $('#checkoutModal').modal('hide');
    alert('You paid Successfully');
}