var onNotificationAPN;


function registerPushIOS(callback) {
//console.warn('start registerPushIOS');
    var callback = callback;

    onNotificationAPN = function(event) {

        console.warn('onNotificationAPN');

        if ( event.alert )
        {
            navigator.notification.alert(event.alert);
        }

        if ( event.sound )
        {
            var snd = new Media(event.sound);
            snd.play();
        }

        if ( event.badge )
        {
            pushNotification.setApplicationIconBadgeNumber(function(x){}, function(x){}, 0);
        }
    }

    /*pushNotification.unregister(function(){
        dev_log('success unregister!');
    },
    function(){
        dev_log('error unregister!');
    });*/

    function onPushiOSInitialized(pushToken, callback)
    {
        console.warn('push_token callback: ' + pushToken);

         storeWrite("push_token", pushToken);

         if(typeof(callback) !== 'undefined')
         {
           callback(pushToken);
         }
    }

    function registrationSuccessHandler(token) {
        console.warn('success push token register:' + token);
        onPushiOSInitialized(token, callback);
    };

    function registrationFailedHandler(error) {
        last_error = error;
        console.warn('failed to register: ' + error);
    };

     /*pushNotification.registerDevice({ alert:true, badge:true, sound:true,  appname: "TaxiDrivers", pw_appid : "E18AE-FAACA" },
                        registrationSuccessHandler,
                        registrationFailedHandler);*/

console.warn('pushNotification.register');

    pushNotification.register(
    registrationSuccessHandler,
    registrationFailedHandler,
    {
        "badge":"true",
        "sound":"true",
        "alert":"true",
        "ecb":"onNotificationAPN"
    });


    /*pushNotification.registerDevice({ alert:true, badge:true, sound:true, ecb: onNotificationAPN,  appname: "TaxiDrivers" },
    function(token) {
       console.warn(token);
       onPushiOSInitialized(token, callback);
    },
    function(status) {
        console.warn('failed to register: ' + status);
    });*/

	pushNotification.setApplicationIconBadgeNumber(function(x){
	        console.warn('success reset push badget')
	    }, function(x){
	        console.warn('error reset push badget: ' + x)
	    }, 0);
}
