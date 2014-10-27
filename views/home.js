"use strict";
console.warn('load home.js');
TaxiDrivers.home = function(params) {

    var balance = TaxiDrivers.config.balance;

    function updateBalance(balance)
    {
        console.warn('update balance ' + balance);

        $('.balance').removeClass('pozitive').removeClass('negative');

        if(balance > 0)
        {
            $('.balance').addClass('pozitive');
        }

        if(balance < 0)
        {
            $('.balance').addClass('negative');
        }

        $('.balance').text(balance);

    }

    function beforeViewSetup()
    {
        console.warn('beforeView');

        updateBalance(balance);
    }

    function viewShown() {

        console.warn('viewShown');

        $('.layout-header .dx-button').hide();

        updateBalance(balance);

        if(!interval)
        {
            interval = window.setInterval(function(){
                    console.warn('update driver balance');
                    _getBalance(TaxiDrivers.config.push_token, false, false, function(balance){
                        updateBalance(balance);
                    });
                },
                TaxiDrivers.config.balance_update
            );
        }
    }


    return {
        balance: balance,

        beforeViewSetup: beforeViewSetup,
        viewShown: viewShown,
    };
};