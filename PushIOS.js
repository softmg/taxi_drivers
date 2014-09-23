var onNotificationAPN;

function registerPushIOS() {
    onNotificationAPN = function(event) {

        console.warn('onNotificationAPN');

        if ( event.alert )
        {
            navigator.notification.alert(event.alert);
        }

        if ( event.sound )
        {
            //var snd = new Media(event.sound);
            //snd.play();
        }

        if ( event.badge )
        {
            pushNotification.setApplicationIconBadgeNumber(function(x){}, function(x){}, 0);
        }
    }


    pushNotification.register(
    function(token)
    {
        console.warn(token);
        onPushiOSInitialized(token);
    },
    function(status)
    {
        console.warn('failed to register: ' + status);
    },
    {
        "badge":"true",
        "sound":"true",
        "alert":"true",
        "ecb":"onNotificationAPN"
    });

	pushNotification.setApplicationIconBadgeNumber(function(x){
	        console.warn('success reset push badget')
	    }, function(x){
	        console.warn('error reset push badget: ' + x)
	    }, 0);
}

function onPushiOSInitialized(pushToken)
{
    store.insert({
        name: "push_token",
        value: pushToken
    });

    _sendToken(pushToken);

}
