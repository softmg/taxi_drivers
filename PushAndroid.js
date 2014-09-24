var onNotificationGCM;

function registerPushAndroid(callback) {
    var callback = callback;
    var pushNotification = window.plugins.pushNotification;

    onNotificationGCM = function (e) {

        console.warn('push notification: ' + e.event);
        switch( e.event )
        {
        case 'registered':
            if ( e.regid.length > 0 )
            {
                console.warn("regID = " + e.regid);
                onPushAndroidInitialized(e.regid, callback);
            }
        break;

        case 'message':
            if ( e.foreground )
            {
                console.warn('push notification foreground: ' + e.soundname);
            }
            else
            {  // otherwise we were launched because the user touched a notification in the notification tray.
                if ( e.coldstart )
                {
                    console.warn('COLDSTART NOTIFICATION');
                }
                else
                {
                    console.warn('BACKGROUND NOTIFICATION');
                }
            }

            navigator.notification.alert(e.payload.message);

            console.warn('push notification message count: ' + e.payload.msgcnt);
        break;

        case 'error':
            console.warn('push notification error: ' + e.msg);
        break;

        default:
            console.warn('push notification: Unknown, an event was received and we do not know what it is');
        break;
      }
    }


    pushNotification.register(
    function(token)
    {
        console.warn(token);
    },
    function(status)
    {
        console.warn('failed to register: ' + status);
    },
    {
        "senderID":"11819050208",
        "ecb":"onNotificationGCM"
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