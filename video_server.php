<?php

    // 获取图像数据
    $imageData = $_POST['image'];
    
    // 将图像数据保存到文件
    $image = base64_decode(str_replace('data:image/jpeg;base64,', '', $imageData)); // 根据实际图像格式调整
    $filename = 'captured-image.jpg'; // 设置文件名

    if (file_put_contents($filename, $image)) {
        echo '图像已成功保存到文件: ' . $filename;
    } else {
        echo '保存图像时出现错误';
    }        
        
?>
