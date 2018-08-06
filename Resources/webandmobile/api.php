<?php
$dir = './';
$files = scandir($dir);


$data = ['ip_address'=>$_SERVER['SERVER_ADDR'],'links'=>[]];
$links = [];
foreach ($files as $file) {
    if (is_dir($file)) {
        $subdir = scandir($dir . $file);
        //$subdir = removeDots($subdir);
        if(in_array('config.json',$subdir)){
            $json = json_decode(file_get_contents($dir.$file.'/config.json'),true);
            $json['folder_name'] = $file;
            $data['links'][] = $json;
        }
    }
}

header('Content-Type: application/json');
echo json_encode($data);

?>
