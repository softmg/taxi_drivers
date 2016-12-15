"use strict";

TaxiDrivers.set_purse = function(params) {

    var purse = ko.observable('');
    var user_token = TaxiDrivers.config.push_token;

    function setPurse() {

        var set_purse_url = TaxiDrivers.config.backend_url + TaxiDrivers.config.backend_uri_set_purse;

        var purse_param = purse().replace(/[^0-9]/gi, '');
            if(purse_param.length < 10) {
                alert('Введите корректный номер телефона');
                if (!$('.mask').hasClass('error')) {
                    $('.mask').addClass('error');
                }
                return true;
            }
            else {
                purse_param = '7' + purse_param;
            }

        $.ajax({
            type: "GET",
            data:{
                purse: purse_param,
                user_token: user_token
            },
            url: set_purse_url,
            dataType: 'jsonp',
            jsonp: "mycallback",
            error: function(x,e){
                //console.warn('токен устройства не отправлен на сервер');
                if(x.status==0){
                    console.warn('You are offline!!\n Please Check Your Network.');
                }else if(x.status==404){
                   /* storeWrite("purse", purse());
                    TaxiDrivers.config.purse = purse();
                    TaxiDrivers.app.router.register(":view", { view: "home" });
                    TaxiDrivers.app.navigate("home");
                    */
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
                storeWrite("purse", purse());
                TaxiDrivers.config.purse = purse();
                alert('Кошелёк успешно сохранён!');
                TaxiDrivers.app.router.register(":view", { view: "home" });
                TaxiDrivers.app.navigate("home");
            }
        })
    }

    function viewShown() {

        $('.layout-header .dx-button').show();
        $(".mask").inputmask({
                                "mask": "(999) 999-9999",
                                "oncomplete": function(){ $(this).removeClass('error');},
                                "onKeyValidation": function(key, result){
                                                        if (!$(this).hasClass('error')) {
                                                            $(this).addClass('error');
                                                        }
                                                    }
        });

    }

    return {
        purse: purse,

        setPurse: setPurse,

        viewShown: viewShown,
        version: 'Version: ' + TaxiDrivers.config.version
    };
};
