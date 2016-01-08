window.TaxiDrivers = window.TaxiDrivers || {};

window.onerror = function(msg, url, line, col, error) {
   // Note that col & error are new to the HTML 5 spec and may not be
   // supported in every browser.  It worked for me in Chrome.
   var extra = !col ? '' : '\ncolumn: ' + col;
   extra += !error ? '' : '\nerror: ' + error;

   last_error = msg;

   // You can view the information in an alert to see things working like this:
   console.warn("Error: " + msg + "\nurl: " + url + "\nline: " + line + extra);

   var suppressErrorAlert = true;
   // If you return true, then error alerts (like in older versions of
   // Internet Explorer) will be suppressed.
   return suppressErrorAlert;
};

var store;
var store_data;
var pushNotification;
var is_mobile = false;
var last_error;
var interval;

if(DevExpress.devices && DevExpress.devices.current() && DevExpress.devices.current().platform !== 'generic')
{
    is_mobile = true; //set false for emulator debug
}

var mycallback = function(data)
{
    console.warn('callback jsonp ajax config');
    alert("Here: "+data.name);
}

var storeWrite = function(name, value)
{
    store.insert({
        name: name,
        value: value
    });

    store.update(name, {
        value: value
    });
}

var _getBalance = function(token, to_home, callback_error, callback_success)
{
    var balance_url = TaxiDrivers.config.backend_url + TaxiDrivers.config.backend_uri_balance;
    var push_token = TaxiDrivers.config.push_token;

    $.ajax({
        type: "get",
        data:{
            user_token: push_token,
        },
        dataType: 'jsonp',
        url: balance_url,
        jsonp: "mycallback",
        timeout: 3000,
        error: function(x,e){
                        if(x.status==0){
                            console.warn('You are offline!!\n Please Check Your Network.');
                        }else if(x.status==404){
                            console.warn('Requested URL not found.' + balance_url);
                        }else if(x.status==500){
                            console.warn('Internel Server Error.');
                        }else if(e=='parsererror'){
                            console.warn('Error.\nParsing JSON Request failed. '+x.status);
                        }else if(e=='timeout'){
                            console.warn('Request Time out.');
                        }else {
                            console.warn('Unknow Error.\n'+x.responseText);
                        }
                        if(typeof(callback_error) !== 'undefined')
                        {
                          callback_error();
                        }
                    },
        success: function(data){

            //dev_log('config success!');

            storeWrite("date_config", new Date().valueOf());

            storeWrite("balance", data.balance);

            TaxiDrivers.config.balance   = data.balance;

            if(to_home)
            {
                TaxiDrivers.app.router.register(":view", { view: "home" });
                TaxiDrivers.app.navigate("home");
            }
            else{
                if(callback_success){
                    callback_success(data.balance);
                }
            }
        }
    })
}

var _getTransactions = function(token, callback_error, callback_success)
{

    var detail_balance_url = TaxiDrivers.config.backend_url + TaxiDrivers.config.backend_uri_detail_balance;
    var push_token = TaxiDrivers.config.push_token;
    //console.warn('url get detail balance: ' + detail_balance_url);
    //console.warn('push_token: ' + push_token);
    $.ajax({
        type: "get",
        data:{
            user_token: push_token,
        },
        dataType: 'jsonp',
        url: detail_balance_url,
        jsonp: "mycallback",
        timeout: 3000,
        error: function(x,e){
            if(x.status==0){
                console.warn('You are offline!!\n Please Check Your Network.');
            }else if(x.status==404){
                console.warn('Requested URL not found.' + balance_url);
            }else if(x.status==500){
                console.warn('Internel Server Error.');
            }else if(e=='parsererror'){
                console.warn('Error.\nParsing JSON Request failed. '+x.status);
            }else if(e=='timeout'){
                console.warn('Request Time out.');
            }else {
                console.warn('Unknow Error.\n'+x.responseText);
            }
            if(typeof(callback_error) !== 'undefined')
            {
                callback_error();
            }
        },
        success: function(data){
            storeWrite("date_config", new Date().valueOf());

            storeWrite("detail_balance", data.data);

            TaxiDrivers.config.detail_balance   = data.data;

            if(callback_success){
                callback_success(data.data);
            }

        }
    })
}

var _getPurse = function(token, callback_error, callback_success)
{
    var purse_url = TaxiDrivers.config.backend_url + TaxiDrivers.config.backend_uri_get_purse;
    var push_token = TaxiDrivers.config.push_token;

    $.ajax({
        type: "get",
        data:{
            user_token: push_token,
        },
        dataType: 'jsonp',
        url: purse_url,
        jsonp: "mycallback",
        timeout: 3000,
        error: function(x,e){

            if(x.status==0){
                alert('You are offline!!\n Please Check Your Network.');
            }else if(x.status==404){
                alert('Requested URL not found.' + balance_url);
            }else if(x.status==500){
                alert('Internel Server Error.');
            }else if(e=='parsererror'){
                alert('Error.\nParsing JSON Request failed. '+x.status);
            }else if(e=='timeout'){
                alert('Request Time out.');
            }else {
                alert('Unknow Error.\n'+x.responseText);
            }

        },
        success: function(data){

            storeWrite("purse", data.purse);

            TaxiDrivers.config.purse   = data.purse;

            if(callback_success){
                callback_success(data.purse);
            }
        }
    })
}

//after device push register send info to the server
var _sendToken = function(push_token, title, callback, callback_error)
{
    var push_token_url = TaxiDrivers.config.backend_url + TaxiDrivers.config.backend_uri_push_token;
    if(is_mobile)
    {
        var device_platform = device.platform;
    }
    else
    {
        var device_platform = 'ios';
    }

    alert('push_token_url: ' + push_token_url + ', token: ' + push_token + ', platform: ' + device_platform);

    $.ajax({
        type: "GET",
        data:{
            platform: device_platform,
            user_token: push_token,
            title: title
        },
        url: push_token_url,
        dataType: 'jsonp',
        //timeout: 3000,
        jsonp: "mycallback",
        error: function(x,e){
            alert('токен устройства не отправлен на сервер');
            if(x.status==0){
                alert('You are offline!!\n Please Check Your Network.');
            }else if(x.status==404){
                alert('Requested URL not found.' + push_token_url);
            }else if(x.status==500){
                alert('Internel Server Error.');
            }else if(e=='parsererror'){
                alert('Error.\nParsing JSON Request failed. '+x.status);
            }else if(e=='timeout'){
                alert('Request Time out.');
            }else {
                alert('Unknow Error.\n'+x.responseText);
            }

            if(typeof(callback_error) !== 'undefined')
            {
              callback_error();
            }
        },
        success: function(data){
            alert('токен устройства зарегистрирован на сервере');

            if(data.error)
            {
                _myAlert(data.error);
            }
            else
            {
                if(typeof(callback) !== 'undefined')
                {
                  callback(data);
                }
            }
        }
    });
}

var _initLocalStore= function()
{
  //  dev_log('start init local store');

    var config = true;
    var push = true;
    var title = true;
    var is_qiwi_driver = true;
    var purse = true;

    store = new DevExpress.data.LocalStore({
        name: "mld_taxi_drivers",
        key: "name"
    });

    //store.remove('title');

    store.byKey('date_config').done(function(date_config) {
        var now = new Date();
        if(!date_config || now.valueOf() - date_config.value > TaxiDrivers.config.store_actual_time)
        {
            console.warn('non actual data!');
            config = 'non_actual';
        }
    });

    store.byKey('balance').done(function(balance) {
        if(balance && balance.value) TaxiDrivers.config.balance  = balance.value;
        else config = false;
    });

    store.byKey('push_token').done(function(push_token) {
        if(push_token && push_token.value) TaxiDrivers.config.push_token  = push_token.value;
        else push = false;
    });

    store.byKey('title').done(function(title_data) {
        if(title_data && title_data.value) TaxiDrivers.config.title  = title_data.value;
        else title = false;
    });

    store.byKey('detail_balance').done(function(detail_balance) {
        if(detail_balance && detail_balance.value)
        {
            TaxiDrivers.config.detail_balance  = detail_balance.value;
        }
        else
        {
            detail_balance = false;
        }
    });

    store.byKey('is_qiwi_driver').done(function(is_qiwi_driver) {
        if(is_qiwi_driver && is_qiwi_driver.value) TaxiDrivers.config.is_qiwi_driver  = is_qiwi_driver.value;
        else is_qiwi_driver = false;
    });

    store.byKey('purse').done(function(purse) {
        if(purse && purse.value) TaxiDrivers.config.purse  = purse.value;
        else purse = false;
    });


    // dev_log('end init local store');
    //title = false; //ПОТОМ ЗАКОММЕнтить
    /*purse = false;
    storeWrite('purse', ''); // заменить на is_qiwi_driver
    is_qiwi_driver = false;
    TaxiDrivers.config.is_qiwi_driver = '';  // заменить на is_qiwi_driver
    */

    return {'config':config, 'push':push, 'title':title, 'is_qiwi_driver':is_qiwi_driver, 'purse':purse};
}

var _initPush= function(callback) {

    //dev_log('start init push');

    pushNotification = window.plugins.pushNotification;

    if(device.platform == 'android' || device.platform == 'Android')
    {
        registerPushAndroid(callback);
    }
    else
    {
        registerPushIOS(callback);
    }

    //dev_log('end init push');
}

var _myAlert= function(info)
{
    if(is_mobile){
        alert(info);
    }
    else{
        navigator.notification.alert(info);
    }
}

var _data_init = _initLocalStore();