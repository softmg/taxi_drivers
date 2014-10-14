$(function() {
    // Uncomment the line below to disable platform-specific look and feel and to use the Generic theme for all devices
    // DevExpress.devices.current({ platform: "generic" });

    dev_log('start init js');

    TaxiDrivers.app = new DevExpress.framework.html.HtmlApplication({
        namespace: TaxiDrivers,
        navigationType: TaxiDrivers.config.navigationType
    });

    //mobile
    document.addEventListener("deviceready", onDeviceReady, false);

    //test browser
    $(document).ready(function(){
        if(!is_mobile)
        {
            onDeviceReady();
        }
    });

    function onDeviceReady() {

        dev_log('device ready');

        dev_log('start init config');

        if(is_mobile)
        {
            navigator.splashscreen.hide();

            if(!_data_init['push'])
            {
                _initPush(function(pushToken){
                    console.warn('write push_token: ' + pushToken);
                    storeWrite("push_token", pushToken);
                    TaxiDrivers.config.push_token = pushToken;

                    init(pushToken);
                });
            }
            else
            {
                init(pushToken);
            }
        }
        else
        {
            storeWrite("push_token", 'test');
            TaxiDrivers.config.push_token = 'test';

            init('test');
        }
    }

    function init(token)
    {
        if(_data_init['title'])
        {
            if(!_data_init['config'] || _data_init['config'] == 'non_actual')
            {
                _getBalance(token, true, function(){
                    dev_log('get balance error!');
                    TaxiDrivers.app.router.register(":view", { view: "home" });
                    TaxiDrivers.app.navigate("home");
                });
            }
            else
            {
                //to home
                TaxiDrivers.app.router.register(":view", { view: "home" });
                TaxiDrivers.app.navigate("home");
            }
        }
        else
        {
            TaxiDrivers.app.router.register(":view", { view: "home_register" });
            TaxiDrivers.app.navigate("home_register");
        }
    }
});


Globalize.culture(navigator.language || navigator.browserLanguage);
