"use strict";

TaxiDrivers.home_register = function(params) {

    var title = ko.observable('');

    function register()
    {
        var push_token = TaxiDrivers.config.push_token;

        //dev_log('start register');

        var title_cur = title();

        _sendToken(push_token, title_cur, function(){
               // console.warn('store write title: ' + title_cur);

                storeWrite('title', title_cur);
                TaxiDrivers.config.title = title_cur;

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

        register: register,
    };
};