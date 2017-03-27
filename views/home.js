"use strict";
//console.warn('load home.js');
TaxiDrivers.home = function(params) {

    var balance = TaxiDrivers.config.balance;
    var purse = TaxiDrivers.config.purse;
    var identified = TaxiDrivers.config.identified;
    var is_qiwi_driver = TaxiDrivers.config.is_qiwi_driver;
    var title = TaxiDrivers.config.title;
    var card = TaxiDrivers.config.card;
    var rent_hour = TaxiDrivers.config.rent_hour;
    var rent_time_left = TaxiDrivers.config.rent_time_left;
    var car_blocked = TaxiDrivers.config.car_blocked;
    var user_token = TaxiDrivers.config.push_token;
    var is_time_left = TaxiDrivers.config.is_time_left;

    function updateBalance(balance, rent_hour, rent_time_left, car_blocked, is_time_left)
    {

        $('.balance').removeClass('pozitive').removeClass('negative');

        if(balance > 0)
        {
            $('.balance').addClass('pozitive');
        }

        if(balance < 0)
        {
            $('.balance').addClass('negative');
        }

        $('.balance div:first-child').text(balance);

        if(rent_hour) {
            $('.balance .rent_time').show();
            $('.balance span').text(rent_time_left);
        } else {
            $('.balance .rent_time').hide();
        }

        if(car_blocked) {
            $('.car_blocked_error').show();
        } else {
            $('.car_blocked_error').hide();
        }

        if(!is_time_left) {
            $('.credit_button').show();
        } else {
            $('.credit_button').hide();
        }

    }

    function ShowHideCashoutIdentify(can_cashout, identified, need_to_update)
    {
        if(need_to_update) {
            $('.no_documents').hide();
            $('.cashout_error').hide();
            $('.cashout_process').hide();
            $('.cashout_button').hide();
            $('.cashout_success').hide();
            //$('.need_to_update').show();
        }
        else if(!identified){
            $('.no_documents').show();
            $('.cashout_error').show();
            $('.cashout_process').hide();
            $('.cashout_button').hide();
            $('.cashout_success').hide();
           // $('.need_to_update').hide();
        }
        else {
            $('.cashout_error').hide();
            $('.no_documents').hide();
            $('.cashout_success').show();
            $('.cashout_process').hide();
            $('.cashout_button').hide();
            if (can_cashout){
                $('.cashout_button').show();
            } else {
                $('.cashout_process').show();
            }
           // $('.need_to_update').hide();
        }
    }

    function ShowHideUpdateBlock(need_to_update)
    {
        if(need_to_update) {
            $('.need_to_update').show();
        } else {
            $('.need_to_update').hide();
        }
    }

    function beforeViewSetup()
    {
        updateBalance(balance);
    }

    function updatePurseInfo(purse)
    {
        if( is_qiwi_driver != '' && typeof is_qiwi_driver !== 'undefined') {
            $('.balance_block').hide();
            if(purse != '' && typeof purse !== 'undefined') {
                $('.purse input.set_purse').hide();
                $('.purse .purse_data').text(purse);
                $('.purse .purse_info').show();
            } else {
                $('.purse .purse_info').hide();
                $('.purse input.set_purse').show();
            }
        } else {
            $('.purse').hide();
        }

    }

    function updateCardInfo(card)
    {
        if( is_qiwi_driver != '' && typeof is_qiwi_driver !== 'undefined') {
            if(card != '' && typeof card !== 'undefined') {
                $('.purse input.set_card').hide();
                $('.purse .card_data').text(card);
                $('.purse .card_info').show();
            } else {
                $('.purse .card_info').hide();
                $('.purse input.set_card').show();
            }
        } else {
            $('.purse').hide();
        }

    }


    function credit() {

        var credit_url = TaxiDrivers.config.backend_url + TaxiDrivers.config.backend_uri_credit;

        $('.credit_button').hide();

        $.ajax({
            type: "GET",
            data:{
                user_token: user_token,
                _format: 'jsonp'
            },
            url: credit_url,
            dataType: 'jsonp',
            jsonp: "mycallback",
            error: function(x,e){
                //console.warn('токен устройства не отправлен на сервер');
                if(x.status==0){
                    console.warn('You are offline!!\n Please Check Your Network.');
                }else if(x.status==404){
                    console.warn('Requested URL not found.' + send_email_url);
                }else if(x.status==500){
                    console.warn('Internel Server Error.');
                }else if(e=='parsererror'){
                    console.warn('Error.\nParsing JSON Request failed. '+x.status);
                }else if(e=='timeout'){
                    console.warn('Request Time out.');
                }else {
                    console.warn('Unknow Error.\n'+x.responseText);
                }
                alert('Ошибка сообщения. Проверьте включен ли интернет на смартфоне!');
                $('.credit_button').show();
            },
            success: function(data){
                var message;
                if(data.status == 'Ok') {
                    message = 'Спасибо! Вы успешно отсрочили платеж';
                }
                else {
                    message = data.error;
                }
                alert(message);

            }
        });
    }

    function viewShown() {

        balance = TaxiDrivers.config.balance;
        rent_hour = TaxiDrivers.config.rent_hour;
        rent_time_left = TaxiDrivers.config.rent_time_left;
        car_blocked = TaxiDrivers.config.car_blocked;
        is_time_left = TaxiDrivers.config.is_time_left;

        $('.layout-header .dx-button').hide();

        updateBalance(balance, rent_hour, rent_time_left, car_blocked, is_time_left);

        var need_to_update = TaxiDrivers.config.need_to_update;

        if( is_qiwi_driver != '' && typeof is_qiwi_driver !== 'undefined') { //если водила
             var can_cashout = TaxiDrivers.config.can_cashout;
            ShowHideCashoutIdentify(can_cashout, identified, need_to_update, car_blocked);
        } else { //Арендникам выводим кнопку "Заплатить аренду с таксометра"
            $('.rent_pay_button').show();
        }

        ShowHideUpdateBlock(need_to_update);

        _getPurse(TaxiDrivers.config.push_token, false, function(purse){
            updatePurseInfo(purse);
        });

        _getCard(TaxiDrivers.config.push_token, false, function(card){
            updateCardInfo(card);
        });

        if(!interval)
        {
            interval = window.setInterval(function(){
                    _getBalance(TaxiDrivers.config.push_token, false, function(balance, rent_hour, rent_time_left, car_blocked, is_time_left){
                        updateBalance(balance, rent_hour, rent_time_left, car_blocked, is_time_left);
                    });
                    var can_cashout_update = TaxiDrivers.config.can_cashout_update;
                    var need_to_update = TaxiDrivers.config.need_to_update;

                    if( is_qiwi_driver != '' && typeof is_qiwi_driver !== 'undefined' && can_cashout_update) {
                        _getStatus(TaxiDrivers.config.push_token, function(data){
                            ShowHideCashoutIdentify(data.can_cashout, data.identified, need_to_update);
                        });
                    }

                    _getAppVersion(ShowHideUpdateBlock);
                },
                TaxiDrivers.config.balance_update
            );
        }
    }


    return {
        balance: balance,
        purse: purse,
        card: card,
        beforeViewSetup: beforeViewSetup,
        viewShown: viewShown,
        version: 'Version: ' + TaxiDrivers.config.version,
        title: 'Ваш позывной: ' + title,
        credit: credit
    };
};