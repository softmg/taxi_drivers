"use strict";

TaxiDrivers.cashout = function(params) {

    //var cashout = ko.observable('');
    var user_token = TaxiDrivers.config.push_token;
    var purse = TaxiDrivers.config.purse;
    var card = TaxiDrivers.config.card;

    function cashOut() {

        var send_email_url = TaxiDrivers.config.backend_url + TaxiDrivers.config.backend_uri_cashout;

        $('.cashoutButton').hide();

        storeWrite('can_cashout', false);
        TaxiDrivers.config.can_cashout = false;
        TaxiDrivers.app.router.register(":view", {view: "home"});
        TaxiDrivers.app.navigate("home");

        //Блокируем обновление статуса по выводу денег пока не получим результат ( не важно положительный или отрицательный )
        TaxiDrivers.config.can_cashout_update = false;

        $.ajax({
            type: "GET",
            data:{
                cashout_value: $('#messageInput').val(),//cashout(),
                user_token: user_token,
                where_to_pay: $('input[name=where_to_pay]:checked').val()
            },
            url: send_email_url,
            dataType: 'jsonp',
            jsonp: "mycallback",
            error: function(x,e){
                //alert(x.status + 23423);
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
                $('.cashoutButton').show();
            },
            success: function(data){
                var message;
                if(data.status == 'email_sent') {
                    message = 'Запрос успешно отправлен! Ожидайте получения денег. ';
                    if (data.payment_id) {
                        message = message + 'Ваш номер перевода: ' + data.payment_id;
                    }
                    setInterval("TaxiDrivers.config.can_cashout_update = true;", 60000);
                }
                else {
                    message = data.error;
                    TaxiDrivers.config.can_cashout_update = true;
                }
                alert(message);

                $('.cashoutButton').show();

                //Разрешаем апдейт статуса возможности снятия средств
               // TaxiDrivers.config.can_cashout_update = true;


                // после успешного запроса не разрешаем больше сюда входить

               // storeWrite('can_cashout', false);
               // TaxiDrivers.config.can_cashout = false;
                /*if(data.status == 'email_sent') {
                    storeWrite('can_cashout', false);
                    TaxiDrivers.config.can_cashout = false;
                    TaxiDrivers.app.router.register(":view", {view: "home"});
                    TaxiDrivers.app.navigate("home");
                }*/
            }
        })
    }

    function viewShown() {


        $('.layout-header .dx-button').show();
        if(purse) {
            $('.purse_data').text(purse);
            $('.purse_label').show();
        } else {
            $('.purse_label').hide();
        }
        if(card) {
            $('.card_data').text(card);
            $('.card_label').show();
        } else {
            $('.card_label').hide();
        }
    }

    function setWhereToPay() {
        $('.where_to_pay_choice').html($('input[name=where_to_pay]:checked').val() == 'card' ? 'на карту' : 'на КИВИ-кошелёк');
        return true
    }

    return {
        //cashout: cashout,

        cashOut: cashOut,

        viewShown: viewShown,
        version: 'Version: ' + TaxiDrivers.config.version,
        setWhereToPay : setWhereToPay
    };
};
