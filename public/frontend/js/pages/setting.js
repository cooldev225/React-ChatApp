$(document).ready(function() {
    $('.phoneNumberConfirmBtn').on('click', () => {
        let phoneNumber = $('.phoneNumber .country-code').val() + $('.phoneNumber .realPhoneNumber').val();
        var form_data = new FormData();
        form_data.append('phoneNumber', phoneNumber);
        $.ajax({
            url: '/setting/setPhoneNumber',
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
            },
            error: function(response) {}
        });
    });
})