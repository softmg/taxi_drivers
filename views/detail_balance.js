"use strict";

TaxiDrivers.detail_balance = function(params) {

    var updateDetailBalance = function(detail_balance)
    {

        $('.detail_balance').html('');
        var debit_credit = '';
        for(var k = detail_balance.length - 1; k>=0; k--) {
            if (typeof detail_balance[k].debit != 'undefined') {
                debit_credit = "Приход: " + detail_balance[k].debit;
            }
            else {
                debit_credit = "Расход: " + detail_balance[k].credit;
            }
            var html = "<div style='border-bottom: 2px solid black; width: 100%;' ><div>Дата:" + detail_balance[k].datetime + "</div><div>" + debit_credit + " Баланс: " + detail_balance[k].balance + "</div> <div>Комментарий: " + detail_balance[k].comment + "</div></div><div style='clear:both'></div>";
            $('.detail_balance').append(html);
        }

    }

    function printObject(o) {
        var out = '';
        for (var p in o) {
            out += p + ': ' + o[p] + '\n';
        }
    }

    function viewShown() {


        _getTransactions(TaxiDrivers.config.push_token,
            function() {
                updateDetailBalance(TaxiDrivers.config.detail_balance );
            }
            , function(detail_balance) {
            updateDetailBalance(detail_balance);
        });
        $('.layout-header .dx-button').show();

    }

    return {

       // detailBalance: detailBalance,

        viewShown: viewShown
    };
};
