
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
        alert('账户错误');
        return
    }if(!uPassword.test(psd.value)){
        alert('密码错误');
        return
    }
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
            ringUp()
        }
    }).catch((data)=>{
        console.log(data)
    })
}
function ringUp(){
    alert('登录成功')
    setTimeout(()=>{
        location.href = "./index.html"
    },1000)
}





