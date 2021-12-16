<?php
//引入mysql文件
include('./mysql.php');
//接收ajax传入数据
$fn = $_GET['fn'];
//调用fn函数
$fn();
//添加数据的方法 注册查询账户是否存在
function add()
{
    //获取传入的数据
    $name = $_GET['name'];
    $password = $_GET['password'];
    $email = $_GET['email'];
    $sql = "select * from user where iphone='$name'";
    $res = query($sql);
    $res1 = array();
    while($row = mysqli_fetch_assoc($res)){
        $res1[] = $row;
    }
    print_r(json_encode($res1)); 
}
//注册成功执行
function add1(){
    //获取传入的数据
    $name = $_GET['name'];
    $password = $_GET['password'];
    $email = $_GET['email'];
    //准备sql语句,记住，是传字符串，要加引号
    $sql = "insert into user(iphone,password,email) value('$name','$password','$email')";
    $res = query($sql);
    echo ($res);
}
//登录账户是否存在
function enter()
{
    //获取传入的数据
    $name = $_GET['uid'];
    $password = $_GET['upsd'];
    $sql = "select * from user where iphone='$name' and password='$password'";
    $res = query($sql);
    $res1 = array();
    while($row = mysqli_fetch_assoc($res)){
        $res1[] = $row;
    }
    print_r(json_encode($res1)); 
}


?>