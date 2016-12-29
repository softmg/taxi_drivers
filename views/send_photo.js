"use strict";

TaxiDrivers.send_photo = function(params) {

    var message = ko.observable('');
    var user_token = TaxiDrivers.config.push_token;



    function sendPhoto() {

        _sendPhoto();

    }

    function viewShown() {

        $('.layout-header .dx-button').show();

    }

    function openCamera() {
        _openCamera();
    }

    return {
        message: message,

        sendPhoto: sendPhoto,

        viewShown: viewShown,
        openCamera: openCamera,
        version: 'Version: ' + TaxiDrivers.config.version
    };
};
