"use strict";

TaxiDrivers.home_unactive = function(params) {

    function activeConf()
    {
        _getBalance(
            function(){
                alert(Globalize.localize('error_init') + ' ' + Globalize.localize('server_problem'));
            }
        );
    }

    return {
        activeConf: activeConf,
        version: 'Version: ' + TaxiDrivers.config.version
    };
};