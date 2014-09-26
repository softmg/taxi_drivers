var pushToken;

function registerPushWooshAndroid(callback) {
    var callback = callback;
    var pushNotification = window.plugins.pushNotification;

    document.addEventListener('push-notification', function(event) { var notification = event.notification; pushNotification.setApplicationIconBadgeNumber(0); var title = notification.title; var userData = notification.userdata; navigator.notification.alert(notification.aps.alert);

        if(typeof(userData) != "undefined") {
            showStatusMsg('user data: ' + JSON.stringify(userData));
        }
    });


    pushNotification.registerDevice({ alert:true, badge:true, sound:true,  projectid: "11819050208", appid : "AD634-0285A" },
    function(status) {
        pushToken = status;
        console.warn('push token: ' + pushToken);
    },
    function(status) {
        console.warn('failed to register: ' + status);
    });
}

function onPushAndroidInitialized(pushToken, callback)
{
    //output the token to the console
    console.warn('push token: ' + pushToken);

    if(typeof(callback) !== 'undefined')
    {
      callback(pushToken);
    }
}