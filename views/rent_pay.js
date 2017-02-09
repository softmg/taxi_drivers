"use strict";

TaxiDrivers.rent_pay = function(params) {

    var user_token = TaxiDrivers.config.push_token;
    //var purse = TaxiDrivers.config.purse;

    function rentPay() {

        var rent_pay_url = TaxiDrivers.config.backend_url + TaxiDrivers.config.backend_rent_pay;

        $('.rentPayButton').hide();

        //storeWrite('can_cashout', false);
        //TaxiDrivers.config.can_cashout = false;
        //TaxiDrivers.app.router.register(":view", {view: "home"});
        //TaxiDrivers.app.navigate("home");

        //Блокируем обновление статуса по выводу денег пока не получим результат ( не важно положительный или отрицательный )
        //TaxiDrivers.config.can_cashout_update = false;

        $.ajax({
            type: "GET",
            data:{
                sum: $('#messageInput').val(),
                user_token: user_token
            },
            url: rent_pay_url,
            dataType: 'jsonp',
            jsonp: "mycallback",
            error: function(x,e){
                // alert(x.status + 23423);
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
                $('.rentPayButton').show();
            },
            success: function(data){
                var message;
                if(data.status == 'Ok') {
                    message = 'Спасибо! Вы успешно заплатили за аренду';
                }
                else {
                    message = data.error;
                }
                alert(message);

                $('.rentPayButton').show();
                $('#messageInput').val('');

                TaxiDrivers.app.router.register(":view", { view: "home" });
                TaxiDrivers.app.navigate("home");

            }
        });
    }

    function viewShown() {

        $('.layout-header .dx-button').show();
    }

    return {
        rentPay: rentPay,
        viewShown: viewShown,
        version: 'Version: ' + TaxiDrivers.config.version
    };
};
