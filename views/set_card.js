"use strict";

TaxiDrivers.set_card = function(params) {

    var card = ko.observable('');
    var user_token = TaxiDrivers.config.push_token;

    function setCard() {
        var set_card_url = TaxiDrivers.config.backend_url + TaxiDrivers.config.backend_uri_set_card;

        var card_num = card().replace(/_/gi, '').replace(/-/gi, '');
        if(card_num.length < 16) {
            alert('Введите корректный номер карты');
            if (!$('.card_num').hasClass('error')) {
                $('.card_num').addClass('error');
            }
            return true;
        }

        $.ajax({
            type: "GET",
            data:{
                driver_card: card_num,
                user_token: user_token
            },
            url: set_card_url,
            dataType: 'jsonp',
            jsonp: "mycallback",
            error: function(x,e){
                //console.warn('токен устройства не отправлен на сервер');
                if(x.status==0){
                    console.warn('You are offline!!\n Please Check Your Network.');
                }else if(x.status==404){

                    console.warn('Requested URL not found.' + set_card_url);
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
                storeWrite("card", card());
                TaxiDrivers.config.card = card();
                alert('Карта успешно сохранена!');
                TaxiDrivers.app.router.register(":view", { view: "home" });
                TaxiDrivers.app.navigate("home");
            }
        });

    }

    function viewShown() {

        $('.layout-header .dx-button').show();
        $(".card_num").inputmask({
             "mask": "9999-9999-9999-9999",
             "oncomplete": function(){ $(this).removeClass('error');},
             "onKeyValidation": function(key, result) {
                 if (!$(this).hasClass('error')) {
                    $(this).addClass('error');
                 }
             }
         });

    }

    return {
        card: card,

        setCard: setCard,

        viewShown: viewShown,
        version: 'Version: ' + TaxiDrivers.config.version
    };
};
