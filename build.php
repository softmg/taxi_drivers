<?php
    $myCurl = curl_init();
    curl_setopt_array($myCurl, array(
        CURLOPT_URL => 'https://build.phonegap.com/authorize',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query(array(
            'client_id' => '0c8c5c938cd85dfb0b85',
            'client_secret' => '709e5dfcb30bf24868e5b9b3b1e47accf9b7c98d',
        ))
    ));
    $response = curl_exec($myCurl);
    curl_close($myCurl);

    echo $response;
?>