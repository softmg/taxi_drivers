"use strict";
//console.warn('load home.js');
TaxiDrivers.home = function(params) {

    var balance = TaxiDrivers.config.balance;
    var is_qiwi_driver = TaxiDrivers.config.is_qiwi_driver;
    var purse = TaxiDrivers.config.purse;

    function updateBalance(balance)
    {
        //console.warn('update balance ' + balance);

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
        //console.warn('beforeView');

        updateBalance(balance);
    }

    function updatePurseInfo(purse)
    {
        if( is_qiwi_driver != '' && typeof is_qiwi_driver !== 'undefined') {
            $('.balance_block').hide();
            if(purse != '' && typeof purse !== 'undefined') {
                $('.purse input').hide();
                $('.purse .purse_data').text(purse);
            } else {
                $('.purse .purse_data').hide();
                $('.purse input').show();
            }
        } else {
            $('.purse').hide();
        }

    }

    function viewShown() {

        balance = TaxiDrivers.config.balance;
       // console.warn('viewShown');

        $('.layout-header .dx-button').hide();

        updateBalance(balance);

        _getPurse(TaxiDrivers.config.push_token, false, function(purse){
            updatePurseInfo(purse);
        });



        if(!interval)
        {
            interval = window.setInterval(function(){
                    //alert(TaxiDrivers.config.push_token);
                   // console.warn('update driver balance');
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
        purse: purse,
        beforeViewSetup: beforeViewSetup,
        viewShown: viewShown,
    };
};