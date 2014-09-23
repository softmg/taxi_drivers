"use strict";

TaxiDrivers.send_email = function(params) {

    var message = ko.observable('');

    function sendEmail() {

        var send_email_url = TaxiDrivers.config.backend_url + TaxiDrivers.config.backend_uri_send_email;

        $.ajax({
            type: "POST",
            data:{
                message: message(),
            },
            url: send_email_url,
            dataType: 'jsonp',
            jsonp: "mycallback",
            error: function(x,e){
                console.warn('токен устройства не отправлен на сервер');
                if(x.status==0){
                    console.warn('You are offline!!\n Please Check Your Network.');
                }else if(x.status==404){
                    console.warn('Requested URL not found.' + send_email_url);
                }else if(x.status==500){
                    console.warn('Internel Server Error.');
                }else if(e=='parsererror'){
                    console.warn('Error.\nParsing JSON Request failed. '+x.status);
                }else if(e=='timeout'){
                    console.warn('Request Time out.');
                }else {
                    console.warn('Unknow Error.\n'+x.responseText);
                }
                alert('Ошибка сообщения. Проверьте включен ли интернет на смартфоне!');
            },
            success: function(data){
                alert('Сообщение успешно отправлено!');
            }
        })
    }

    function androidInputScroll(idScrollView) {
        if (DevExpress.devices.real().platform === 'android') {
            $(".dx-scrollview-content").attr('data-height', $(".dx-scrollview-content").closest(".dx-scrollview-content").height());
            $("input[type='text']").focusin(function () {
                var input = $(this);

                input.closest(".dx-scrollview-content").height(parseInt(input.closest(".dx-scrollview-content").attr('data-height')) + 100);

                setTimeout(function(){
                    var scroller = $(".dx-active-view .dx-scrollview").dxScrollView("instance");
                    scroller.update().then(function(){
                        var base = input.closest(".dx-scrollview-content").offset();

                        scroller.scrollTo(input.offset().top - base.top);
                    });
                }, 399);
            });
            $("input[type='text']").focusout(function () {
                var input = $(this);
                input.closest(".dx-scrollview-content").height(input.closest(".dx-scrollview-content").attr('data-height'));

                var scroller = $(".dx-active-view .dx-scrollview").dxScrollView("instance");
                scroller.update().then(function(){
                    var base = input.closest(".dx-scrollview-content").offset();

                    scroller.scrollTo(input.offset().top + base.top);
                });
            });
            $("textarea").focusin(function () {
                var input = $(this);
                setTimeout(function(){

                    input.closest(".dx-scrollview-content").height(parseInt(input.closest(".dx-scrollview-content").attr('data-height')) + 100);

                    var scroller = $(".dx-active-view .dx-scrollview").dxScrollView("instance");
                    scroller.update().then(function(){
                         var base = input.closest(".dx-scrollview-content").offset();

                         scroller.scrollTo(input.offset().top - base.top);
                    });
                }, 399);
            });

            $("textarea").focusout(function () {
                var input = $(this);
                input.closest(".dx-scrollview-content").height(input.closest(".dx-scrollview-content").attr('data-height'));

                var scroller = $(".dx-active-view .dx-scrollview").dxScrollView("instance");
                scroller.update().then(function(){
                    var base = input.closest(".dx-scrollview-content").offset();

                    scroller.scrollTo(input.offset().top + base.top);
                });
            });
        }
    }

    return {
        message: comment,

        sendEmail: sendEmail,
    };
};
