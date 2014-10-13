var pushToken;

function registerPushWooshIOS(callback) {
    var callback = callback;

    document.addEventListener('push-notification', function(event) {
        console.warn('on notification');
        var notification = event.notification;
        pushNotification.setApplicationIconBadgeNumber(0);
        var title = notification.title;
        var userData = notification.userdata;
        navigator.notification.alert(notification.aps.alert);

        if(typeof(userData) != "undefined") {
        showStatusMsg('user data: ' + JSON.stringify(userData));
        }
    });


    pushNotification.registerDevice(
        { alert:true, badge:true, sound:true,  appname: "TaxiDrivers", pw_appid : "AD634-0285A" },
        function(status) {
            pushToken = status;
            console.warn('push token: ' + pushToken.deviceToken);
        },
        function(status) {
            console.warn('failed to register ' + status);
        }
    );

}

function onPushiOSInitialized(pushToken, callback)
{
     storeWrite("push_token", pushToken);

     if(typeof(callback) !== 'undefined')
     {
       callback();
     }
}
