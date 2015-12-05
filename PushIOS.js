var onNotificationAPN;
var pushNotification;





function registerPushIOS(callback) {
//console.warn('start registerPushIOS');
    var callback = callback;
    
    pushNotification = window.plugins.pushNotification;
    
    
    
    // handle APNS notifications for iOS
    function onNotificationAPN(e) {
        if (e.alert) {
            $("#app-status-ul").append('<li>push-notification: ' + e.alert + '</li>');
            // showing an alert also requires the org.apache.cordova.dialogs plugin
            navigator.notification.alert(e.alert);
        }
        
        if (e.sound) {
            // playing a sound also requires the org.apache.cordova.media plugin
            var snd = new Media(e.sound);
            snd.play();
        }
        
        if (e.badge) {
            pushNotification.setApplicationIconBadgeNumber(successHandler, e.badge);
        }
    }
    
    function tokenHandler (result) {
        //$("#app-status-ul").append('<li>token: '+ result +'</li>');
       
        if(typeof(callback) !== 'undefined')
        {
            callback(result);
        }
        //alert(result);
        // Your iOS push server needs to know the token before it can push to this device
        // here is where you might want to send it the token for later use.
    }
    
    function successHandler (result) {
        //$("#app-status-ul").append('<li>success:'+ result +'</li>');
    }
    
    function errorHandler (error) {
        last_error = error;
        //  $("#app-status-ul").append('<li>error:'+ error +'</li>');
    }

   /* onNotificationAPN = function(event) {

        console.warn('onNotificationAPN');
        console.warn('event.sound ' + event.sound);

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
    */

    /*pushNotification.unregister(function(){
        dev_log('success unregister!');
    },
    function(){
        dev_log('error unregister!');
    });*/

    /*
    function onPushiOSInitialized(pushToken, callback)
    {
         alert(pushToken);
        //console.warn('push_token callback: ' + pushToken);

         storeWrite("push_token", pushToken);

         if(typeof(callback) !== 'undefined')
         {
           callback(pushToken);
         }
    }

    function registrationSuccessHandler(token) {
        alert(token);
        console.warn('success push token register:' + token);
        onPushiOSInitialized(token, callback);
    };

    function registrationFailedHandler(error) {
        alert(error);
        last_error = error;
        console.warn('failed to register: ' + error);
    };
    */

     /*pushNotification.registerDevice({ alert:true, badge:true, sound:true,  appname: "TaxiDrivers", pw_appid : "E18AE-FAACA" },
                        registrationSuccessHandler,
                        registrationFailedHandler);*/

  //console.warn('pushNotification.register');
 
    /*pushNotification.register(
    registrationSuccessHandler,
    registrationFailedHandler,
    {
        "badge":"true",
        "sound":"true",
        "alert":"true",
        "ecb":"onNotificationAPN"
    });*/
    
    pushNotification.register(tokenHandler, errorHandler, {"badge":"true","sound":"true","alert":"true","ecb":"onNotificationAPN"});
    
 

    /*pushNotification.registerDevice({ alert:true, badge:true, sound:true, ecb: onNotificationAPN,  appname: "TaxiDrivers" },
    function(token) {
       console.warn(token);
       onPushiOSInitialized(token, callback);
    },
    function(status) {
        console.warn('failed to register: ' + status);
    });*/
    
    /*

	pushNotification.setApplicationIconBadgeNumber(function(x){
	        console.warn('success reset push badget')
	    }, function(x){
	        console.warn('error reset push badget: ' + x)
	    }, 0); */
}
