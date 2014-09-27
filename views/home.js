"use strict";
console.warn('load home.js');
TaxiDrivers.home = function(params) {

    var balance = TaxiDrivers.config.balance;

    function viewShown() {
        if(!interval)
        {
            interval = window.setInterval(function(){
                    _getBalance(TaxiDrivers.config.push_token);
                },
                TaxiDrivers.config.balance_update
            );
        }
    }

    return {
        balance: balance,

        viewShown: viewShown,
    };
};