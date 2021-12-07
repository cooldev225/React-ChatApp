$(document).ready(function() {
    $('#checkoutModal').on('shown.bs.modal', function(e) {
        let userInfo = getCertainUserInfoById(currentContactId);
        $('#checkoutModal .recipientName').text(userInfo.username);
        $('#checkoutModal .recipientMail').text(userInfo.email);
        if (!selectedEmojis.length) {
            photo_canvas._objects.filter(item => item.kind != 'temp').forEach(item => selectedEmojis.push(item.id));
        }
        let totalPrice = 0;
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
});