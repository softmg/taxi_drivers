function registerPushWooshIOS(callback) {
    var callback = callback;

    document.addEventListener('push-notification', function(event) {
        var notification = event.notification;
        pushNotification.setApplicationIconBadgeNumber(0);
        var title = notification.title;
        var userData = notification.userdata;
        navigator.notification.alert(notification.aps.alert);

        if(typeof(userData) != "undefined") {
        showStatusMsg('user data: ' + JSON.stringify(userData));
        }
    });

    /*pushNotification.unregister(function(){
        dev_log('success unregister!');
    },
    function(){
        dev_log('error unregister!');
    });*/

    function registrationSuccessHandler(token) {
        console.warn('success push token register:' . token);
        onPushiOSInitialized(token, callback);
    };

    function registrationFailedHandler(error) {
        last_error = error;
        console.warn('failed to register: ' + error);
    };

     /*pushNotification.registerDevice({ alert:true, badge:true, sound:true,  appname: "TaxiDrivers", pw_appid : "E18AE-FAACA" },
                        registrationSuccessHandler,
                        registrationFailedHandler);*/

    /*pushNotification.register(
    registrationSuccessHandler,
    registrationFailedHandler,
    {
        "badge":"true",
        "sound":"true",
        "alert":"true",
        "ecb":"onNotificationAPN"
    });*/

    pushNotification.registerDevice(
        { alert:true, badge:true, sound:true,  appname: "TaxiDrivers", pw_appid : "AD634-0285A" },
        registrationSuccessHandler,
        registrationFailedHandler
    );

    /*pushNotification.registerDevice({ alert:true, badge:true, sound:true, ecb: onNotificationAPN,  appname: "TaxiDrivers" },
    function(token) {
       console.warn(token);
       onPushiOSInitialized(token, callback);
    },
    function(status) {
        console.warn('failed to register: ' + status);
    });*/

	/*pushNotification.setApplicationIconBadgeNumber(function(x){
	        console.warn('success reset push badget')
	    }, function(x){
	        console.warn('error reset push badget: ' + x)
	    }, 0);*/
}

function onPushiOSInitialized(pushToken, callback)
{
     storeWrite("push_token", pushToken);

     if(typeof(callback) !== 'undefined')
     {
       callback();
     }
}
