//js写法
/*
    缓动动画封装
    + 注意点：缓动动画的步长需要使用缓动动画公式直接计算出来，所以不需要自己传值进去
    @param {object} ele 表示要做动画的元素
    @param {number} target 表示目标值
    @param {string} attr 表示要做动画的属性
    @param {function} callback 回调函数，当前函数执行完毕后，后面的回调函数执行
*/
function animation(ele, target, attr, callback) {
    clearInterval(ele.timer)
    ele.timer = setInterval(function () {
        //开始位置  width:200px  200px + 10px  210px + 10px
        var begin = parseFloat(getStyle(ele, attr))
        //步长
        var step = (target - begin) / 10
        //判断
        step = step > 0 ? Math.ceil(step) : Math.floor(step)
        //赋值结果
        var res = begin + step
        //给元素进行赋值操作
        ele.style[attr] = res + 'px'
        //清除下定时器
        if (res == target) {
            clearInterval(ele.timer)
            //如果咱们传递了这个函数，那就执行，如果没有就不执行
            if (callback) {
                callback()
            }
        }
    }, 30)
}
//获取属性封装
function getStyle(ele, attr) {
    if (window.getComputedStyle) {
        return getComputedStyle(ele, null)[attr]
    } else {
        return ele.currentStyle[attr]
    }
}

class ApplyColours {
    constructor() {
        //渲染商品
        this.product = document.querySelector('.product-box')

        this.hid = location.search.slice(5).trim();//获取商品pid
        this.counts = ""
        this.num = 0
        this.circled = 0
        this.flag = true
        this.init()

    }
    init() {
        this.login()
        this.applyA()
    }
    love(btnBox) {   // => btnBox 点击喜欢
        let that = this

        btnBox.onclick = function () {  // ！点击的回调函数
            that.btnClick()
        }
        // console.log(btnBox)
    }
    async btnClick() { // !这里上点击确定的回调函数
        //1、获取当前商品信息 、喜欢的商品不用选中颜色
        let selList = document.querySelector('.selected-list').firstElementChild.firstElementChild // => 商品信息的li
        let spId = document.querySelector('.selected-list').getAttribute('index') // =>商品id
        let firsSp = selList.firstElementChild.innerHTML // => 商品名称
        let lastSp = selList.lastElementChild   // => 商品价格

        // 通过id获取商品信息
        let data = await axios.get({ url: './json/phoneDates.json', data: {} }) // =>全部商品
        data = JSON.parse(data)         // => [{},{}, ...] ！所有商品信息
        let name = localStorage.getItem('name') // => 用户id
        data.forEach((ele) => {
            if (ele.id == spId) {     // ! 点击喜欢的商品id 等于 商品id的时候返回数据
                // ！ajax这一块传保存一个**商品id以及用户名**就可以了，通过id在json中获取数据
                axios.get({
                    url: "./php/celliphone.php",
                    data: { fn: "IamLike", spId, name }
                }).then((data) => {
                    data = JSON.parse(data)
                    if (data == "") {       //   ！！！ 判断商品是否存在，存在则不添加，不存在则新增
                        axios.get({         //   ！新增的数据传递，不存在新增
                            url: "./php/celliphone.php",
                            data: { fn: "like", spId, name }
                        }).then((data)=>{
                            layer.open({
                                title: '添加成功',
                                content: '商品添加成功',
                                btn: ['取消', '确认'],
                                btn2: function (index, layero) {//按钮【按钮二】的回调
                                    //return false 开启该代码可禁止点击该按钮关闭
                                }
                            })
                        }).catch((data)=>{
                            console.log('错误')
                        })
                        
                    }else{
                        layer.open({
                            title: '您喜欢的商品已存在',
                            content: '主人，您喜欢的商品已经存在了',
                            btn: ['取消', '确认'],
                            btn2: function (index, layero) {//按钮【按钮二】的回调
                                //return false 开启该代码可禁止点击该按钮关闭
                            }
                        })
                    }
                    console.log(data)
                }).catch((data) => {
                    console.log('错误')
                })
            }
        })
    }
    //登录状态和未登录状态
    login() {
        let loginNotice = document.querySelector('.login-notice')
        let name = localStorage.getItem('name')
        if (name) {
            loginNotice.style.display = "none"
        } else {
            loginNotice.style.display = "block"
        }

    }
    //**********************点击商品加入购物车*************************
    goods() {
        let than = this
        let plus = document.querySelector('.btn-box .putin')    // => 购物车按钮
        plus.onclick = function () {   
            let arrObj = {}
            let name = localStorage.getItem('name')
            if (!name) {
                layer.open({
                    title: '温馨小提示',
                    content: '请先登录',
                    btn: ['取消', '确认'],
                    btn2: function (index, layero) {//按钮【按钮二】的回调
                        //return false 开启该代码可禁止点击该按钮关闭
                        return
                    }
                })
            }
            if (!name) return;
            // if()
            let uIndexId = document.querySelector('.selected-list')
            //商品id
            let id = uIndexId.getAttribute('index')
            arrObj.name = name
            arrObj.id = id
            //商品信息
            let all = uIndexId.querySelector('ul').firstElementChild.children
            all = Array.from(all)
            //判断不能为空
            all.forEach((v, i) => {
                if (v.innerHTML == "") {
                    layer.open({
                        title: '温馨小提示',
                        content: '颜色不能为空',
                        btn: ['取消', '确认'],
                        btn2: function (index, layero) {//按钮【按钮二】的回调
                            //return false 开启该代码可禁止点击该按钮关闭
                            return
                        }
                    })

                }
                arrObj["plus" + i] = v.innerHTML
            })
            //判断不能为空
            if (all[1].innerHTML == "") return;
            let plus = all[0].innerHTML
            let color = all[1].innerHTML
            let price = all[2].innerHTML
            let num = 1

            than.callback(id, name, color, plus, price, num)    // ！ 回调追加


        }
    }
    callback(id, name, color, plus, price, num) {
        //给对象追加属性 arrObj ,并发送ajax保存在数据库中,判断数据库中存在数据则提示，不存在则添加
        axios.get({
            url: "./php/celliphone.php",
            data: { fn: "selLy", id, name, color }
        }).then((data) => {
            data = JSON.parse(data)
            let judeg = false   //开关，存在则不执行，不存在则执行
            //判断返回的数据是否存在
            if (data == "") {//如果商品存返回数据，不存在返回空数组
                judeg = true
            } else {
                data.forEach((ele) => {
                    //判断商品颜色、商品id、用户名是否存在，，，存则则不添加，在购物车可以添加数量
                    if (ele.serial == id && ele.userName == name && ele.info == color) {
                        layer.open({
                            title: '温馨小提示',
                            content: '商品已经存在',
                            btn: ['取消', '确认'],
                            btn2: function (index, layero) {//按钮【按钮二】的回调
                                //return false 开启该代码可禁止点击该按钮关闭
                            }
                        })
                        judeg = false
                    }
                })
            }
            if (judeg) {
                //判断商品不存在，或者商品存在，颜色不一致
                //则添加商品
                console.log(1111)
                axios.get({
                    url: "./php/celliphone.php",
                    data: { fn: "newly", id, name, plus, color, price, num }
                }).then((data) => {
                    //成功添加商品信息
                    layer.open({
                        title: '温馨小提示',
                        content: '商品添加成功',
                        btn: ['取消', '确认'],
                        btn2: function (index, layero) {//按钮【按钮二】的回调
                            //return false 开启该代码可禁止点击该按钮关闭
                        }
                    })
                }).catch((data) => {
                    console.log(data)
                })
            }
        }).catch((data) => {
            console.log(data)
        })
    }

    async applyA() {//渲染商品
        let that = this
        let data = await axios.get({ url: './json/phoneDates.json', data: {} })
        data = JSON.parse(data)
        //遍历数据 arr是图片
        data.forEach(ele => {
            if (ele.id == this.hid) {
                let arr = ele.img.split(",")
                let arrName = ele.color.split(",")
                this.counts = `
                <div class="img-left">
                        <div class="container">
                            <ul class="wrapper">
                                <li style="display:block">
                                    <a href="javascript:;">
                                        <img src="${arr[0]}">
                                    </a>
                                </li>
                            </ul>
                            <!--翻页按钮区域-->
                            <div class="turning">
                                <a href="javascript:;">&lt;</a>
                                <a href="javascript:;">&gt;</a>
                            </div>
                            <!--分页器区域-->
                            <div class="pagination">
                                <span class="active"></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                    <!-- 右边产品介绍 -->
                    <div class="product-con">
                        <h2>${ele.pName}</h2>
                        <p class="sale-decr">
                            ${ele.pInfo}
                        </p>
                        <p class="company-info">
                            小米自营
                        </p>
                        <p class="price-info">
                            <span>
                                ${ele.pPrice}
                            </span>
                        </p>
                        <div class="line">
        
                        </div>
                        <div class="product-address">
                            <i class="iconfont icon-dingwei icon"></i>
                            <div class="address-con">
                                <div>
                                    <div class="address-info">
                                        <span>北京</span>
                                        <span>北京市</span>
                                        <span>海淀区</span>
                                        <span>清河街道</span>
                                        <a href="javascript;">修改</a>
                                    </div>
                                </div>
                                <div class="storage">
                                    <span>有现货</span>
                                </div>
                            </div>
                        </div>
                        <div class="buychoies">
                            <div class="title fs18">
                                选择颜色
                            </div>
                            <ul class="clearfix">
                                <li title="${arrName[0]}" class="active">
                                    <a href="javascript:;">${arrName[0]}</a>
                                </li>
                                <li title="${arrName[1]}" class="active">
                                    <a href="javascript:;">${arrName[1]}</a>
                                </li>
                                <li title="${arrName[2]}" class="active">
                                    <a href="javascript:;">${arrName[2]}</a>
                                </li>
                            </ul>
                        </div>
                        <div class="selected-list">
                            <ul>
                                <li>
                                    <span>${ele.pName}</span> <span></span>
                                    <span class="fr">${ele.pPrice}</span>
                                </li>
                            </ul>
                            <div class="total-price">
                                总计：${ele.pPrice}
                            </div>
                        </div>
                        <div class="btn-box">
                            <div class="putin"> <a href="javascript:0;">加入购物车</a></div>
                            <div class="likes"> <a href="#"><i class="iconfont icon-xin"></i>喜欢</a></div>
                        </div>
                        <div class="after-sale-info">
                            <span><a href="javascript:void(0);">
                                    <i class="iconfont icon-tick"></i>
                                    <em>小米自营</em>
                                </a>
                            </span>
                            <span><a href="javascript:void(0);">
                                    <i class="iconfont icon-tick"></i>
                                    <em>小米发货</em>
                                </a>
                            </span>
                            <span><a href="javascript:void(0);">
                                    <i class="iconfont icon-tick"></i>
                                    <em>7天无理由退货</em>
                                </a>
                            </span>
                            <span><a href="javascript:void(0);">
                                    <i class="iconfont icon-tick"></i>
                                    <em>运费说明</em>
                                </a>
                            </span>
                            <span><a href="javascript:void(0);">
                                    <i class="iconfont icon-tick"></i>
                                    <em>企业信息</em>
                                </a>
                            </span>
                            <span><a href="javascript:void(0);">
                                    <i class="iconfont icon-tick"></i>
                                    <em>售后服务政策</em>
                                </a>
                            </span>
                            <span><a href="javascript:void(0);">
                                    <i class="iconfont icon-tick"></i>
                                    <em>7天价格保护</em>
                                </a>
                            </span>
                        </div>
                    </div>
                `
                this.temple(arr, ele.id)//调用传参 !回调追加内容

            }
        });
        this.buyCho = document.querySelector('.buychoies .clearfix')
        let buChild = Array.from(this.buyCho.children)
        //商品颜色遍历
        buChild.forEach((v, i) => {
            //当我们点击的时候颜色改变
            v.onclick = function () {
                //清空所有样式
                buChild.forEach(function (v) {
                    Object.assign(v.style, {
                        border: '1px solid #000',
                        height: '42px'
                    })
                })
                //点击按钮添加样式
                Object.assign(this.style, {
                    border: '2px solid #ff6700',
                    height: '40px'
                })
                //给总计添加内容
                // console.log(this)
                let title = this.getAttribute('title')
                //获取节点
                let list = document.querySelector('.selected-list ul li').firstElementChild.nextElementSibling
                list.innerHTML = title

            }
        })
    }

    temple(data, id) {
        this.product.innerHTML = this.counts // =>回调追加

        let btnBox = document.querySelector('.btn-box').lastElementChild // => 喜欢 节点
        this.love(btnBox) //回调函数 ! 传入节点方便使用
        //追加一个商品id方便后续使用
        let indeed = document.querySelector('.selected-list')
        indeed.setAttribute('index', id)
        //商品详情轮播
        this.goods()    //点击按钮加入购物车方法调用
        let that = this
        // console.log(data)
        setTimeout(function () {
            that.imgLeft = document.querySelector('.product-box')
            // let leftPic = that.imgLeft.firstElejentChild
            //图片ul
            let uPic = document.querySelector('.wrapper')
            //图片拼接
            let con = ""
            for (var j = 0; j < data.length; j++) {
                con += `<li><a href="javascript:;"><img src="${data[j]}"></a></li>`
            }
            uPic.innerHTML = con + `<li><a href="javascript:;"><img src="${data[0]}"></a></li>`
            //轮播
            that.carousel()
        }, 1000)
    }
    carousel() {//轮播
        this.wap = document.querySelector('.wrapper')
        this.imgWidth = this.wap.children[0].offsetWidth
        this.imgPIc = Array.from(this.wap.children)
        this.cont = document.querySelector('.container')
        // 下方小圆点
        let circle = this.cont.lastElementChild
        //左右方向键
        let leRi = this.cont.lastElementChild.previousElementSibling
        let circles = Array.from(circle.children)
        //小圆点实现点击切换
        let that = this
        let items
        function banLis() {
            //实现移入变色，小圆点点击
            for (let i = 0; i < circles.length; i++) {
                //第一个小圆点设置默认样式，并给所有小圆点设置index属性
                circles[0].classList.add('active')
                circles[i].setAttribute('index', i)
                circles[i].onclick = function () {
                    let index = circles[i].getAttribute('index')
                    that.num = index
                    that.circled = index
                    for (var j = 0; j < circles.length; j++) {
                        circles[j].classList.remove('active')
                    }
                    circles[i].classList.add('active')
                    // 移动
                    // console.log(that.wap)
                    animation(that.wap, -that.imgWidth * index, "left")
                }
            }
        }
        banLis()
        //右侧按钮点击
        function rightCk() {
            let riCk = leRi.lastElementChild
            riCk.onclick = function () {
                that.flag = false
                that.num++
                animation(that.wap, -that.imgWidth * that.num, "left", function () {
                    if (that.num == that.imgPIc.length - 1) {
                        that.num = 0
                        that.wap.style.left = 0
                    }
                    that.flag = true
                })
                that.circled++
                if (that.circled > circles.length - 1) {
                    that.circled = 0
                }
                for (let j = 0; j < circles.length; j++) {
                    circles[j].classList.remove('active')
                }
                circles[that.circled].classList.add('active')

            }
        }
        rightCk()//右侧按钮点击
        function leftCk() {
            let leCk = leRi.firstElementChild
            leCk.onclick = function () {
                if (that.flag) {
                    that.flag = false
                    console.log(that.imgPIc)
                    if (that.num == 0) {
                        that.num = that.imgPIc.length - 1
                        that.wap.style.left = -that.imgWidth * that.num + 'px'
                    }
                    that.num--
                    animation(that.wap, -that.imgWidth * that.num, "left", function () {
                        that.flag = true
                    })
                    that.circled--
                    if (that.circled < 0) {
                        that.circled = circles.length - 1
                    }
                    for (let j = 0; j < circles.length; j++) {
                        circles[j].classList.remove('active')
                    }
                    circles[that.circled].classList.add('active')
                }
            }
        }
        leftCk()
        //自动轮播
        autoPic()
        function autoPic() {
            /**
         * 使用定时器，每两秒执行一次
         * 使用开关防止其他操作
         * 执行一遍翻页操作
         * **/
            items = setInterval(() => {
                let riCk = leRi.lastElementChild
                riCk.onclick = function () {
                    that.flag = false
                    that.num++
                    animation(that.wap, -that.imgWidth * that.num, "left", function () {
                        if (that.num == that.imgPIc.length - 1) {
                            that.num = 0
                            that.wap.style.left = 0
                        }
                        that.flag = true
                    })
                    that.circled++
                    if (that.circled > circles.length - 1) {
                        that.circled = 0
                    }
                    for (let j = 0; j < circles.length; j++) {
                        circles[j].classList.remove('active')
                    }
                    circles[that.circled].classList.add('active')
                }
                riCk.onclick()
            }, 2000);
        }
        this.cont.onmouseover = () => {
            clearInterval(items)
        }
        this.wap.onmouseout = () => {
            autoPic()
        }
    }
}
new ApplyColours