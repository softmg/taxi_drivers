window.TaxiDrivers = $.extend(true, window.TaxiDrivers, {
    "config": {
        "navigationType": "simple",
        "backend_url": "http://5960.ru/",
        "backend_uri_send_email": "send_email",
        "backend_uri_push_token": "get_token",
        "backend_uri_balance": "get_driver_balance",
        "backend_uri_detail_balance": "get_driver_transactions",
        "backend_uri_set_purse": "set_qiwi_purse",
        "backend_uri_get_purse": "get_qiwi_purse",
        "backend_uri_cashout": "qiwi_cashout_test",
        "backend_uri_get_status": "get_driver_status",
        "backend_uri_app_version": "set_actual_app_version",
        "backend_upload_photo": "upload_photo",
        "push_token": "",
        "title": "",
        "balance_update": 6000,
        "store_actual_time" : 100000,
        "is_qiwi_driver": "",
        "purse": "",
        "can_cashout": "",
        "can_cashout_update": true,
        "version": "8.8.9",
        "photo_max_num": 20
        }
});
