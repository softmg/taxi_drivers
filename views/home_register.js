"use strict";

TaxiDrivers.home_register = function(params) {

    var title = ko.observable('');

    function register()
    {
        var push_token = TaxiDrivers.config.push_token;

        dev_log('start register');

        _sendToken(push_token, title(), function(){
                storeWrite("title", title());
                TaxiDrivers.config.title = title();

                _getBalance(push_token, true, function(){
                    dev_log('get balance error!');
                    TaxiDrivers.app.router.register(":view", { view: "home" });
                    TaxiDrivers.app.navigate("home");
                });
            },
            function(){
                console.warn('register error');

                TaxiDrivers.app.router.register(":view", { view: "home_unactive" });
                TaxiDrivers.app.navigate("home_unactive");
            }
        );
    }


    return {
        title: title,

        register: register,
    };
};