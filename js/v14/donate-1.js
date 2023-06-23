var lastPayments = $.cookie('lastPayments'),
    donateForm = $('.donate-form'),
    loader = $('.loader'),
    formAlert = donateForm.find('.form-alert');

if(lastPayments == null) {
    $('.lastpaymentstext').remove();
    $('.lastpayments').remove();
}

function setAlert(group, text) {
    if(group == null) return false;

    donateForm.find('.form-group').removeClass('error');
    group.addClass('error');
    formAlert.find('.alert__text').text(text);
    formAlert.fadeIn(350);
    formAlert.css('top', group.position().top + group.height() / 2);
}

donateForm.find('.form__input').on('focus', function() {
    var _this = $(this),
        _this_group = _this.parent('.form-group');

    _this_group.addClass('focus');
});

donateForm.find('.form__input').on('focusout', function() {
    var _this = $(this),
        _this_group = _this.parent('.form-group');

    _this_group.removeClass('focus');
});

donateForm.find('.x-sum-options').on('click', '.option__item', function() {

    let _this = $(this),
        _this_sum = parseInt(_this.data('sum'));

    donateForm.find('.x-sum-options .option__item').removeClass('active');
    _this.addClass('active');

    donateForm.find('.form__input.sum-input').val(_this_sum);
    inputHandler(donateForm.find('.form__input.sum-input'));

});

donateForm.find('.form__input').on('input', function() {

    let _this = $(this);

    inputHandler(_this);

});

function inputHandler(_this) {

    let _this_value = parseInt(_this.val()),
        _this_x = parseInt(_this.data('x')) || 1;

    if(formAlert.is(':visible')) formAlert.fadeOut(350);
    donateForm.find('.form-group').removeClass('error');

    if(_this.hasClass('sum-input')) {

        let gift_sum = 0;

        if(_this_value > 0) {

            donateForm.find('.x-sum-options .option__item').removeClass('active');

            if(_this_x <= 1)
                switch(true) {

                    case (_this_value >= 350 && _this_value < 500) : {

                        gift_sum = _this_value + (_this_value / 100 * 7);
                        donateForm.find('.x-sum-options .option__item[data-sum="350"]').addClass('active');

                        break;
                    }
                    case (_this_value >= 500 && _this_value < 1000) : {

                        gift_sum = _this_value + (_this_value / 100 * 12);
                        donateForm.find('.x-sum-options .option__item[data-sum="500"]').addClass('active');

                        break;
                    }
                    case (_this_value >= 1000 && _this_value < 2000) : {

                        gift_sum = _this_value + (_this_value / 100 * 17);
                        donateForm.find('.x-sum-options .option__item[data-sum="1000"]').addClass('active');

                        break;
                    }
                    case (_this_value >= 2000 && _this_value < 3000) : {
                        
                        gift_sum = _this_value + (_this_value / 100 * 22);
                        donateForm.find('.x-sum-options .option__item[data-sum="2000"]').addClass('active');

                        break;
                    }
                    case (_this_value >= 3000 && _this_value < 5000) : {

                        gift_sum = _this_value + (_this_value / 100 * 27);
                        donateForm.find('.x-sum-options .option__item[data-sum="3000"]').addClass('active');

                        break;
                    }
                    case (_this_value >= 5000) : {

                        gift_sum = _this_value + (_this_value / 100 * 32);
                        donateForm.find('.x-sum-options .option__item[data-sum="5000"]').addClass('active');
                        
                        break;
                    }

                    default : gift_sum = _this_value; break;

                }
            else
                switch(true) {

                    case (_this_value >= 1 && _this_value < 500) : {

                        gift_sum = _this_value + (_this_value / 100 * 100);
                        donateForm.find('.x-sum-options .option__item[data-sum="350"]').addClass('active');

                        break;
                    }
                    case (_this_value >= 500 && _this_value < 1000) : {

                        gift_sum = _this_value + (_this_value / 100 * 112);
                        donateForm.find('.x-sum-options .option__item[data-sum="500"]').addClass('active');

                        break;
                    }
                    case (_this_value >= 1000 && _this_value < 2000) : {

                        gift_sum = _this_value + (_this_value / 100 * 117);
                        donateForm.find('.x-sum-options .option__item[data-sum="1000"]').addClass('active');

                        break;
                    }
                    case (_this_value >= 2000 && _this_value < 3000) : {
                        
                        gift_sum = _this_value + (_this_value / 100 * 122);
                        donateForm.find('.x-sum-options .option__item[data-sum="2000"]').addClass('active');

                        break;
                    }
                    case (_this_value >= 3000 && _this_value < 5000) : {

                        gift_sum = _this_value + (_this_value / 100 * 127);
                        donateForm.find('.x-sum-options .option__item[data-sum="3000"]').addClass('active');

                        break;
                    }
                    case (_this_value >= 5000) : {

                        gift_sum = _this_value + (_this_value / 100 * 132);
                        donateForm.find('.x-sum-options .option__item[data-sum="5000"]').addClass('active');
                        
                        break;
                    }

                    default : gift_sum = _this_value; break;

                }

        }

        _this.siblings('.x-sum-amount').text('=' + Math.ceil(parseInt(gift_sum)) + 'р');

    }

}

donateForm.on('submit', function(event) {
    var _this = $(this),
        _this_submit = _this.find('.form__submit'),
        _server = _this.find('.server-input'),
            _server_val = _server.val(),
            _server_group = $('.form-group.server'),
        _name = _this.find('.name-input'),
            _name_val = _name.val(),
            _name_group = $('.form-group.name'),
        _sum = _this.find('.sum-input'),
            _sum_val = _sum.val(),
            _sum_group = $('.form-group.sum'),
        _email = _this.find('.email-input'),
            _email_val = _email.val(),
            _email_group = $('.form-group.email');

    $.get('/donate-confirm', {
        server: _server_val,
        account: _name_val,
        sum: _sum_val,
        email: _email_val,
        ajax: true
    },
    function(data) {
        data = JSON.parse(data);
        switch(data.type) {
            case 'redirect' : {
                donateForm.fadeOut(250, function() {
                    loader.fadeIn(250);
                });
                if(data.content) location.href = data.content;
                break;
            }
            default : {
                $.each(data.errors, function(index, value) {
                    switch(value.error_field) {
                        case 'timeout' : {
                            _this_submit.addClass('disabled');
                            _this_submit.attr('disabled', true);
                            setTimeout(function() {
                                _this_submit.removeClass('disabled');
                                _this_submit.attr('disabled', false);
                            }, value.timeout_sec * 1000);
                            break;
                        }
                        case 'server' : {
                            setAlert(_server_group, value.error_text);
                            break;
                        }
                        case 'name' : {
                            setAlert(_name_group, value.error_text);
                            break;
                        }
                        case 'sum' : {
                            setAlert(_sum_group, value.error_text);
                            break;
                        }
                        case 'email' : {
                            setAlert(_email_group, value.error_text);
                            break;
                        }
                    }
                });
                break;
            }
        }
    });

    event.preventDefault();
});

/*
$('.form-checkbox').on('click', function() {
    var _this = $(this)

    _this.toggleClass('active');
});
*/