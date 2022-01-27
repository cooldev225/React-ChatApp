$(document).ready(function() {
    // $.ajax({
    //     url: '/setting/getPhoneNumber',
    //     headers: {
    //         'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    //     },
    //     cache: false,
    //     contentType: false,
    //     processData: false,
    //     type: 'POST',
    //     dataType: "json",
    //     success: function(res) {
    //         console.log(res);
    //     },
    //     error: function(response) {}
    // });
    var telInput = $("#phone"),
        errorMsg = $("#error-msg"),
        validMsg = $("#valid-msg");

    // initialise plugin
    telInput.intlTelInput({
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.4/js/utils.js"
    });

    var reset = function() {
        telInput.removeClass("error");
        errorMsg.addClass("hide");
        validMsg.addClass("hide");
    };

    // on blur: validate
    telInput.blur(function() {
        reset();
        if ($.trim(telInput.val())) {
            if (telInput.intlTelInput("isValidNumber")) {
                validMsg.removeClass("hide");
            } else {
                telInput.addClass("error");
                errorMsg.removeClass("hide");
            }
        }
    });

    // on keyup / change flag: reset
    telInput.on("keyup change", reset);

    $('.phoneNumberConfirmBtn').on('click', () => {
        if ($("#phone").intlTelInput("isValidNumber")) {
            let dialCode = $("#phone").intlTelInput("getSelectedCountryData").dialCode;
            let isoCode2 = $("#phone").intlTelInput("getSelectedCountryData").iso2;
            // let phoneNumber = $('#phone').val().replace(/[^0-9]/g, '');
            let phoneNumber = $('#phone').val();
            var form_data = new FormData();
            console.log(dialCode);
            console.log(phoneNumber);
            form_data.append('isoCode2', isoCode2);
            form_data.append('dialCode', dialCode);
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
        } else {
            alert('Please input valid phone number')
        }

    });

    //notificatin setting
    $('.js-switch8').on('change', () => {
        let state = $('.js-switch8').prop('checked') ? 1 : 0;
        var form_data = new FormData();
        form_data.append('state', state);
        $.ajax({
            url: '/setting/setNotification',
            headers: {
                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
            },
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            dataType: "json",
            data: form_data,
            success: function(res) {
                console.log(res);
            },
            error: function(response) {}
        });
    })

})