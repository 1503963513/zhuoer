<?php
function con(){
    //连接数据库
    $link = mysqli_connect('127.0.0.1','root','root','xiaomi',3306);
    if(!$link){
        die("连接失败");
    }  
    return $link;
}

//执行查询操作
function query($sql){//执行查询操作的时候传参，传入sql语句执行
    $link = con();
    $res = mysqli_query($link,$sql);
    //返回值
    return $res;
}
?>