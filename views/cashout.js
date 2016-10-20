"use strict";

TaxiDrivers.cashout = function(params) {

    //var cashout = ko.observable('');
    var user_token = TaxiDrivers.config.push_token;
    var purse = TaxiDrivers.config.purse;

    function cashOut() {

        var send_email_url = TaxiDrivers.config.backend_url + TaxiDrivers.config.backend_uri_cashout;

        $('.cashoutButton').hide();
        $.ajax({
            type: "GET",
            data:{
                cashout_value: $('#messageInput').val(),//cashout(),
                user_token: user_token
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
                alert(data.status == 'email_sent' ? 'Запрос успешно отправлен! Ожидайте получения денег.' :  data.error);

                $('.cashoutButton').show();
                // после успешного запроса не разрешаем больше сюда входить

               // storeWrite('can_cashout', false);
               // TaxiDrivers.config.can_cashout = false;

                //TaxiDrivers.app.router.register(":view", { view: "home" });
                //TaxiDrivers.app.navigate("home");
            }
        })
    }

    function viewShown() {


        $('.layout-header .dx-button').show();
        $('.purse_data').text(purse);
    }

    return {
        //cashout: cashout,

        cashOut: cashOut,

        viewShown: viewShown
    };
};
