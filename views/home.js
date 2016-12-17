"use strict";
//console.warn('load home.js');
TaxiDrivers.home = function(params) {

    var balance = TaxiDrivers.config.balance;
    var is_qiwi_driver = TaxiDrivers.config.is_qiwi_driver;
    var purse = TaxiDrivers.config.purse;
    var identified = TaxiDrivers.config.identified;
    var is_qiwi_driver = TaxiDrivers.config.is_qiwi_driver;

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

    function ShowHideCashoutIdentify(can_cashout, identified, need_to_update)
    {
        if(need_to_update) {
            $('.no_documents').hide();
            $('.cashout_error').hide();
            $('.cashout_process').hide();
            $('.cashout_button').hide();
            $('.cashout_success').hide();
            $('.need_to_update').show();
        }
        else if(!identified){
            $('.no_documents').show();
            $('.cashout_error').show();
            $('.cashout_process').hide();
            $('.cashout_button').hide();
            $('.cashout_success').hide();
            $('.need_to_update').hide();
        }
        else {
            $('.cashout_error').hide();
            $('.no_documents').hide();
            $('.cashout_success').show();
            $('.cashout_process').hide();
            $('.cashout_button').hide();
            if (can_cashout){
                $('.cashout_button').show();
            } else {
                $('.cashout_process').show();
            }
            $('.need_to_update').hide();
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
                $('.purse input.set_purse').hide();
                $('.purse .purse_data').text(purse);
            } else {
                $('.purse .purse_data').hide();
                $('.purse input.set_purse').show();
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

        if( is_qiwi_driver != '' && typeof is_qiwi_driver !== 'undefined') {
             var can_cashout = TaxiDrivers.config.can_cashout;
             var need_to_update = TaxiDrivers.config.need_to_update;
            ShowHideCashoutIdentify(can_cashout, identified, need_to_update);
        }

        _getPurse(TaxiDrivers.config.push_token, false, function(purse){
            updatePurseInfo(purse);
        });



        if(!interval)
        {
            interval = window.setInterval(function(){
                    _getBalance(TaxiDrivers.config.push_token, false, false, function(balance){
                        updateBalance(balance);
                    });
                    var can_cashout_update = TaxiDrivers.config.can_cashout_update;
                    var need_to_update = TaxiDrivers.config.need_to_update;

                    if( is_qiwi_driver != '' && typeof is_qiwi_driver !== 'undefined' && can_cashout_update) {
                        _getStatus(TaxiDrivers.config.push_token, function(data){
                            ShowHideCashoutIdentify(data.can_cashout, data.identified, need_to_update);
                        });
                    }

                    _getAppVersion();
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
        version: 'Version: ' + TaxiDrivers.config.version
    };
};