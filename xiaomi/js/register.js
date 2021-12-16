// 前端验证
window.onload = function () {
    let isub = document.querySelector(".input-sub")
    let psd = document.querySelector('.input-psd')
    let cpsd = document.querySelector('.input-cpsd')
    let cell = document.querySelector('.input-id')
    let emailL = document.querySelector('input[type=email]')
    // flag = true
    //当所有文件加载完毕的时候执行
    isub.onclick = function() {
        if(!psd.value || !cpsd.value || !emailL.value || !cell.value) return;
        //正则验证
        let uCelliPhone = /^1[3-9]{1}\d{9}/
        let uPassword = /\w{6,12}/
        let uEmail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
        
        //判断正则是否一致
        if(!uCelliPhone.test(cell.value)){
            alert('账户错误');
            return
        }if(!uPassword.test(psd.value)){
            alert('密码错误');
            return
        }if(!uEmail.test(emailL.value)){
            alert('邮箱错误');
            return
        }
        //判断两次密码是否一致
        if(psd.value != cpsd.value) {
            cpsd.value = ""
            // cpsd.setAttribute("data-missing", "密码不一致")
            // flag = false
            return
        }else{   //账户密码一致
            let name = cell.value
            let password = psd.value
            let email = emailL.value
            sign(name,password,email)
        }
    }
}
function sign(name,password,email){
        // console.log(name,password,email)
            axios.get({
                url:'./php/celliphone.php',
                data:{fn:"add",name,password,email}
            }).then((data)=>{
                data = JSON.parse(data)
                let judge = false
                data.forEach(ele => {
                    console.log(ele.iphone)
                    if(ele.iphone == name){
                        judge = true
                    }else{
                        judge = false
                    }
                });
                if(judge){
                    alert('用户名已重复')
                }else{
                    axios.get({
                        url:'./php/celliphone.php',
                        data:{fn:"add1",name,password,email}
                    }).then((data)=>{
                        alert('注册成功')
                        setTimeout(()=>{
                            location.href = "./login2.html"
                        },1000)
                    }).catch((data)=>{
                            console.log('错误')
                    })
                }
            }).catch((data)=>{
                console.log(data)
            })
    }
