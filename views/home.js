"use strict";
console.warn('load home.js');
TaxiDrivers.home = function(params) {

    var balance = TaxiDrivers.config.balance;

    function updateBalance(balance)
    {
        $('.balance').replaceWith('<div class="balance" data-bind="text: balance">' + balance + '</div>');

        //$('.balance').removeClass('pozitive').removeClass('negative');

        if(balance > 0)
        {
            //$('.balance').addClass('pozitive');
            $('.balance').replaceWith('<div class="balance pozitive" data-bind="text: balance">' + balance + '</div>');
        }

        if(balance < 0)
        {
            //$('.balance').addClass('negative');
            $('.balance').replaceWith('<div class="balance negative" data-bind="text: balance">' + balance + '</div>');
        }

        //$('.balance').text(balance);

    }

    function beforeViewSetup()
    {
        //updateBalance(balance);
    }

    function viewShown() {

        $('.layout-header .dx-button').hide();

        updateBalance(balance);

        if(!interval)
        {
            /*interval = window.setInterval(function(){
                    console.warn('update driver balance');
                    _getBalance(TaxiDrivers.config.push_token, false, false, function(balance){
                        updateBalance(balance);
                    });
                },
                TaxiDrivers.config.balance_update
            );*/
        }
    }


    return {
        balance: balance,

        beforeViewSetup: beforeViewSetup,
        viewShown: viewShown,
    };
};