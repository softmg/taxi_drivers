<?php

    define('PW_AUTH', 'YSmSRgvNi7ECvw53W5xAUoZGVHK4raO9YuGpY9nfd83Zv8EPwKQ6mwMx3Nrt2dkURfuljMJV2Kbb44gc0Lbm');
    define('PW_APPLICATION', 'E18AE-FAACA');
    define('PW_DEBUG', true);

function pwCall($method, $data) {
    $url = 'https://cp.pushwoosh.com/json/1.3/' . $method;
    $request = json_encode(['request' => $data]);

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    curl_setopt($ch, CURLOPT_ENCODING, 'gzip, deflate');
    curl_setopt($ch, CURLOPT_HEADER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $request);

    $response = curl_exec($ch);
    $info = curl_getinfo($ch);
    curl_close($ch);

    if (defined('PW_DEBUG') && PW_DEBUG) {
        print "[PW] request: $request\n";
        print "[PW] response: $response\n";
        print "[PW] info: " . print_r($info, true);
    }
}


pwCall('createMessage', [
    'application' => PW_APPLICATION,
    'auth' => PW_AUTH,
    'notifications' => [
            [
                'send_date' => 'now',
                'content' => 'test',
                'data' => ['custom' => 'json data'],
                //'link' => 'http://pushwoosh.com/'
            ]
        ]
    ]
);
?>