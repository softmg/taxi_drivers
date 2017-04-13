"use strict";

TaxiDrivers.home_register = function(params) {

    var title = ko.observable('');

    function register()
    {
        var push_token = TaxiDrivers.config.push_token;

        //dev_log('start register');

        var title_cur = $('#titleInput').val();
        var pass_cur = $('#passwordInput').val();

        if(validateField($('#titleInput'), 'Введите номер позывного!')) {
            return true;
        }

        if(validateField($('#passwordInput'), 'Введите пароль!')) {
            return true;
        }

        _sendToken(push_token, title_cur, pass_cur, function(data){
               // console.warn('store write title: ' + title_cur);

                storeWrite('title', title_cur);
                TaxiDrivers.config.title = title_cur;

                storeWrite('is_qiwi_driver', data.is_qiwi_driver); // заменить на is_qiwi_driver
                TaxiDrivers.config.is_qiwi_driver = data.is_qiwi_driver;  // заменить на is_qiwi_driver

                _getPurse(push_token);

                _getBalance(push_token, true, function(){
                  //  dev_log('get balance error!');
                    TaxiDrivers.app.router.register(":view", { view: "home" });
                    TaxiDrivers.app.navigate("home");
                });
            },
            function(){
                //console.warn('register error');

                TaxiDrivers.app.router.register(":view", { view: "home_unactive" });
                TaxiDrivers.app.navigate("home_unactive");
            }
        );
    }


    return {
        title: title,

        register: register
    };
};