"use strict";
//console.warn('load home.js');
TaxiDrivers.home = function(params) {

    var balance = TaxiDrivers.config.balance;
    var is_qiwi_driver = TaxiDrivers.config.is_qiwi_driver;
    var purse = TaxiDrivers.config.purse;
    var can_cashout = TaxiDrivers.config.can_cashout;
    var identified = TaxiDrivers.config.identified;

    function updateBalance(balance)
    {

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

    function ShowHideCashoutIdentify(can_cashout, identified)
    {
        if(!identified){
            $('.no_documents').show();
            $('.cashout_error').show();
            $('.cashout_process').hide();
            $('.cashout_button').hide();
        }
        else {
            $('.cashout_error').hide();
            $('.no_documents').hide();
            if (can_cashout){
                $('.cashout_success').show();
                $('.cashout_button').show();
                $('.cashout_process').hide();
            } else {
                $('.cashout_button').hide();
                $('.cashout_process').show();
                $('.cashout_success').hide();
            }
        }
    }

    function beforeViewSetup()
    {
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

        ShowHideCashoutIdentify(can_cashout, identified);

        _getPurse(TaxiDrivers.config.push_token, false, function(purse){
            updatePurseInfo(purse);
        });



        if(!interval)
        {
            interval = window.setInterval(function(){
                    _getBalance(TaxiDrivers.config.push_token, false, false, function(balance){
                        updateBalance(balance);
                    });

                    if( is_qiwi_driver != '' && typeof is_qiwi_driver !== 'undefined') {
                        _getStatus(TaxiDrivers.config.push_token, function(data){
                            ShowHideCashoutIdentify(data.can_cashout, data.identified);
                        });

                    }
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