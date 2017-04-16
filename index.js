$(function() {
    // Uncomment the line below to disable platform-specific look and feel and to use the Generic theme for all devices
    // DevExpress.devices.current({ platform: "generic" });

  //  dev_log('start init js');

    TaxiDrivers.app = new DevExpress.framework.html.HtmlApplication({
        namespace: TaxiDrivers,
        navigationType: TaxiDrivers.config.navigationType
    });


    TaxiDrivers.app.viewShown.add(function(args) {
        var viewName = args.viewInfo.viewName;
        if(viewName === "home_register") {
            $('.layout-header').hide();
            if(!$('.layout-content').hasClass(viewName)) {
                $('.layout-content').addClass(viewName);
            }
        } else {
            $('.layout-header').show();
            $('.layout-content').removeClass('home_register');
        }
        $('.layout-content')
    });

    //mobile
    document.addEventListener("deviceready", onDeviceReady, true);
    //костыль, так как перестал запускаться deviceready
    //onDeviceReady();

    //test browser
    $(document).ready(function(){
        if(!is_mobile)
        {
            onDeviceReady();
        }
    });

    function onDeviceReady() {

       // storeWrite("push_token", 'test');
       // _data_init['push'] = 'test';// закомментить потом
       // pushToken = 'test';

        if(is_mobile)
        {
            navigator.splashscreen.hide();

            if(!_data_init['push'])
            {
                _initPush(function(pushToken){
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
                _getStatus(token);

                _getBalance(token, true, function(){
                 //   dev_log('get balance error!');
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
