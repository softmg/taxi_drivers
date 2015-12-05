"use strict";

TaxiDrivers.send_email = function(params) {

    var message = ko.observable('');

    function sendEmail() {

        var send_email_url = TaxiDrivers.config.backend_url + TaxiDrivers.config.backend_uri_send_email;

        $.ajax({
            type: "GET",
            data:{
                message: message(),
            },
            url: send_email_url,
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
            },
            success: function(data){
                alert('Сообщение успешно отправлено!');
            }
        })
    }

    function viewShown() {

        $('.layout-header .dx-button').show();

    }

    return {
        message: message,

        sendEmail: sendEmail,

        viewShown: viewShown
    };
};
