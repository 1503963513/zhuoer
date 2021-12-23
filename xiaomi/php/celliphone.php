<?php
//引入mysql文件
include('./mysql.php');
//接收ajax传入数据
$fn = $_GET['fn'];
//调用fn函数
$fn();
//删除用户喜欢的商品
function delLice(){
    $uName = $_GET['uName'];  // => 用户id
    $delObj = $_GET['delObj'];  // => 商品id
    $sql = "DELETE FROM ilick WHERE serial='${delObj}' AND userName='${uName}'";
    $res = query($sql); 
    echo ($res);
}

//查询用户喜欢的商品
function userLike(){
    $username = $_GET['name'];  // => 用户id
    $sql = "SELECT * from ilick WHERE userName='$username'";
    $res = query($sql); 
    $res1 = array();
    while($row = mysqli_fetch_assoc($res)){
        $res1[] = $row;
    }
    print_r(json_encode($res1)); 
}
// 查询喜欢的商品是否存在
function IamLike(){
    $username = $_GET['name'];  // => 用户id
    $spId = $_GET['spId'];  // => 商品id
    $sql = "SELECT * FROM ilick WHERE serial='$spId' AND userName='$username'";
    $res = query($sql); 
    $res1 = array();
    while($row = mysqli_fetch_assoc($res)){
        $res1[] = $row;
    }
    print_r(json_encode($res1)); 
}
//喜欢添加商品
function like(){
    $username = $_GET['name'];  // => 用户id
    $spId = $_GET['spId'];  // => 商品id
    $sql = "INSERT INTO ilick(serial,userName) VALUES('$spId','$username')";
    $res = query($sql); 
    echo ($res);
}

//单选删除 和多选删除的方法
function oneDel(){
    $userName = $_GET['urName']; // =>用户名
    $color = $_GET['color'];    // =>商品颜色
    $nameId = $_GET['nameId'];  // =>商品ID
    $sql = "DELETE FROM showping WHERE serial='$nameId' and userName='$userName' and info='$color'";
    $res = query($sql); 
    echo ($res);
}
//更改商品数量
function changeNum(){
    $userName = $_GET['urName']; // =>用户名
    $color = $_GET['color'];    // =>商品颜色
    $nameId = $_GET['nameId'];  // =>商品ID
    $num = $_GET['num'];  // =>商品数量
    //根据四个参数选中我们要更新的数据
    $sql = "UPDATE showPing set num='$num' WHERE serial='$nameId' and userName='$userName' and info='$color'";
    $sql1 = "DELETE FROM showping WHERE num='0' and serial='$nameId' and userName='$userName' and info='$color'";
    $res = query($sql);     
    $res1 = query($sql1);   //当商品为0的时候直接删除
    echo ($res);
}

//获取购物车数据
function gain(){
    $userName = $_GET['urName'];
    $sql = "select * from showPing WHERE userName='$userName'";
    $res = query($sql);
    //空数组
    $res1 = array();
    while($row = mysqli_fetch_assoc($res)){
        $res1[] = $row;
    }
    print_r(json_encode($res1)); 
}
//添加用户商品数据的方法
function newly(){
    //获取传入的数据 id, name, plus, color, price
    $id = $_GET['id']; 
    $name = $_GET['name'];
    $plus = $_GET['plus'];
    $color = $_GET['color'];
    $price = $_GET['price'];
    $num = $_GET['num'];
    $sql = "insert into showPing(serial,userName,proName,info,price,num) VALUES('$id','$name','$plus','$color','$price','$num')";
    $res = query($sql);
    echo ($res);
}
//检查数据库中是否存在商品数据
function selLy(){
    //获取传入的数据 id, name, plus, color, price
    $id = $_GET['id']; 
    $name = $_GET['name'];
    $color = $_GET['color'];
    $sql = "select * from showPing WHERE userName='$name' and serial='$id' and info='$color'";
    $res = query($sql);
    //空数组
    $res1 = array();
    while($row = mysqli_fetch_assoc($res)){
        $res1[] = $row;
    }
    print_r(json_encode($res1)); 
}

//添加数据的方法 注册查询账户是否存在
function add(){
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
//保存用户商品信息
?>