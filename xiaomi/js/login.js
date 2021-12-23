
let isub = document.querySelector(".input-sub")
let id = document.querySelector('.input-id')
let psd = document.querySelector('.input-psd')
//点击按钮执行
isub.onclick = function () {
    let uid = id.value
    let upsd = psd.value
    if (!id.value || !psd.value) return;
    //正则判断输入的账户密码
    let uCelliPhone = /^1[3-9]{1}\d{9}/
    let uPassword = /\w{6,12}/
    if(!uCelliPhone.test(id.value)){
        // alert('账户错误');
        layer.open({
            title: '账户错误',
            content: '请输入正确的账户',
            btn: ['取消', '确认'],
            btn2: function (index, layero) {//按钮【按钮二】的回调
                //return false 开启该代码可禁止点击该按钮关闭
            }
        })
        return
    }
    if(!uCelliPhone.test(id.value))return;
    if(!uPassword.test(psd.value)){
        // alert('密码错误');
        layer.open({
            title: '密码错误',
            content: '请输入正确的密码',
            btn: ['取消', '确认'],
            btn2: function (index, layero) {//按钮【按钮二】的回调
                //return false 开启该代码可禁止点击该按钮关闭
            }
        })
        return
    }
    if(!uPassword.test(psd.value))return;
    //发送ajax判断账户是否存在
    axios.get({
        url: './php/celliphone.php',
        data: { fn: 'enter', uid, upsd }
    }).then((data)=>{
        data = JSON.parse(data)
        let flag = false
        data.forEach(ele => {
            console.log(ele.iphone)
            console.log(ele.password)
            if(ele.iphone == uid && ele.password == upsd){
                flag = true
            }else{
                flag = false
            }
        });
        if(flag){
            ringUp(uid,upsd)
        }
    }).catch((data)=>{
        console.log(data)
    })
}
function ringUp(id,pwd){
    layer.open({
        title: '登录成功',
        content: '开始您的购物之旅↘点击确定将在1秒后跳转到首页',
        btn: ['取消', '确认'],
        btn2: function (index, layero) {//按钮【按钮二】的回调
            //return false 开启该代码可禁止点击该按钮关闭
            //登录成功跳转
            setTimeout(()=>{
                location.href = "./index.html"
            },1000)
        }
    })
    // 保存用户信息到localstorage上
    localStorage.clear()//清空localstorage数据
    //保存新用户的个人数据
    localStorage.setItem('name',id)
    localStorage.setItem('password',pwd)
    
    
}





