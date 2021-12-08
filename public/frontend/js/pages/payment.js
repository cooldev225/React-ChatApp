$(document).ready(function() {

    $('#checkoutModal').on('shown.bs.modal', function(e) {
        let userInfo = getCertainUserInfoById(currentContactId);
        $('#checkoutModal .recipientName').text(userInfo.username);
        $('#checkoutModal .recipientMail').text(userInfo.email);
        if (!selectedEmojis.length) {
            photo_canvas._objects.filter(item => item.kind != 'temp').forEach(item => selectedEmojis.push(item.id));
        }
        let totalPrice = 0;
        $('#checkoutModal .product-list .product-item').remove();
        photo_canvas._objects.filter(oImg => selectedEmojis.includes(oImg.id)).forEach(item => {
            $('#checkoutModal .product-list .bottom-hr').before(
                `<div class="product-item mt-2 mb-2">
                    <img src="${item.type == 'image' ? item.getSrc() : '/images/text.png'}" />
                    <span>$${item.price}</span>
                </div>`);
            totalPrice += Number(item.price);
        });
        $('#checkoutModal .total-price span:last-child').text(`$${totalPrice}`);
        // selectedEmojis.forEach(item => {
        //     // $('#checkoutModal .product-list')
        // });
    });

    // paypal.Button.render({
    //     env: 'sandbox', // Or 'production'
    //     style: {
    //         size: 'medium',
    //         color: 'gold',
    //         shape: 'pill',
    //     },
    //     // Set up the payment:
    //     // 1. Add a payment callback
    //     payment: function(data, actions) {
    //         // 2. Make a request to your server
    //         console.log('aaa');
    //         return actions.request.post('/api/create-paypal-transaction', {
    //                 "_token": "{{ csrf_token() }}"
    //             })
    //             .then(function(res) {
    //                 // 3. Return res.id from the response
    //                 // console.log(res);
    //                 return res.id
    //             })
    //     },
    //     // Execute the payment:
    //     // 1. Add an onAuthorize callback
    //     onAuthorize: function(data, actions) {
    //         // 2. Make a request to your server
    //         return actions.request.post('/api/confirm-paypal-transaction', {
    //                 "_token": "{{ csrf_token() }}",
    //                 payment_id: data.paymentID,
    //                 payer_id: data.payerID
    //             })
    //             .then(function(res) {
    //                 console.log(res)
    //                 alert('Payment successfully done!!')
    //                     // 3. Show the buyer a confirmation message.
    //             })
    //     }
    // }, '#paypal-button')
});