$(document).ready(function() {
    // $("#mobile-number").intlTelInput();
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
            let phoneNumber = $('#phone').val().replace(/[^0-9]/g, '');;
            var form_data = new FormData();
            console.log(dialCode);
            console.log(phoneNumber);
            form_data.append('phoneNumber', dialCode + '-' + phoneNumber);
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
})