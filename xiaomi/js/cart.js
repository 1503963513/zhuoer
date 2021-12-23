
class Cart {//购物车
    constructor() {
        this.sCon = document.querySelector('.s-con')
        this.tbody = document.querySelector('#cartTable tbody')
        this.init()
        //单选按钮的实现,因为单选按钮都在tbody中，我们使用事件监听来给按钮设置，DOM2级事件指向事件对象，使用bind修改this指向
        this.$('#cartTable tbody').addEventListener('click', this.oneClick.bind(this))
        //多选删除
        this.$('#deleteAll').addEventListener('click', this.deleteAll.bind(this))

    }
    init() {

        //显示未登录状态notlogin()
        this.notLogIn()
        this.goods()
        this.allSelect()
    }
    notLogIn() {
        let firstCli = this.sCon.firstElementChild
        let cartTab = firstCli.nextElementSibling// => cartTable 节点
        let foot = cartTab.nextElementSibling   // => foot 节点
        let nfo = this.$('.h-info') // => h-info节点
        // 获取localstorage，登录状态隐藏,未登录提示前去登录
        let age = localStorage.getItem('name')
        if (!age) {
            firstCli.style.display = "block"
            foot.style.display = "none"
            cartTab.style.display = "none"
            
        } else {
            firstCli.style.display = "none"
            foot.style.display = "block"
            nfo.innerHTML = age + ' 您的购物车'
            nfo.style.color = '#ff6700'
        }
    }
    goods() {
        let firstCli = this.sCon.firstElementChild
        let cartTab = firstCli.nextElementSibling// => cartTable 节点
        let foot = cartTab.nextElementSibling   // => foot 节点
        //获取购物车数据先要获取用户id,根据用户id查询数据库
        let urName = localStorage.getItem('name')
        axios.get({
            url: "./php/celliphone.php",
            data: { fn: "gain", urName }
        }).then(async (data) => {
            //返回数组 转换成js对象,判断返回数据为空，停止执行
            data = JSON.parse(data)
            if (data == ""){ 
                firstCli.style.display = "block"
                foot.style.display = "none"
                cartTab.style.display = "none"
                return;
            }

            // 获取json数据
            let cartList = await axios.get({ url: './json/phoneDates.json', data: {} })
            cartList = JSON.parse(cartList)
            //遍历数据，提取出用户的商品数据 相当于过滤数据,返回符合条件的数据
            let cont = []
            let trId = []
            data.forEach(ele => {
                trId.push(ele.serial)
                cartList.forEach(i => {
                    if (ele.serial == i.id) {
                        cont.push(i)
                    }
                })
            });
            this.callback(cont, data, trId)

        }).catch((data) => {
            console.log(data)
        })
    }
    callback(cont, data, trId) {
        //处理图片
        let Pic = []        // => ["图片"]
        cont.forEach((ele) => {
            let iPic = ele.img.split(',')
            Pic.push(iPic[0])
        })

        //需要的图片 Pic
        let template = ""
        data.forEach((v, i) => {
            template += `<tr id="">
            <td class="checkbox">
              <input class="check-one check" type="checkbox" />
            </td>
            <td class="goods">
              <img src="${Pic[0]}" alt="" />
              <span>${v.proName}</span><span>${v.info}</span>
            </td>
            <td class="price">${v.price}</td>
            <td class="count">
              <span class="reduce">-</span>
              <input class="count-input" type="text" value="${v.num}" />
              <span class="add">+</span>
            </td>
            <td class="subtotal">${v.price * v.num}</td>
            <td class="operation">
              <span class="delete">删除</span>
            </td>
          </tr>`

        })
        this.xun(template, Pic, trId)  // ！回调渲染，解决同异步问题
    }
    xun(template, Pic, trId) {
        this.tbody.innerHTML = template //追加渲染
        this.han(Pic, trId)
        // 处理我们需要的id  tr添加一个当前商品的id
    }
    han(Pic, trId) {
        //每个商品追加id
        let trObj = this.$$('#cartTable tbody tr')
        let trObj1 = Array.from(trObj)
        trObj1.forEach((v, i) => {
            v.id = trId[i]
        })
        // 追加图片
        let good = document.querySelectorAll('.goods img')
        let goods = Array.from(good)
        goods.forEach((v, i) => {
            v.src = Pic[i]
        })
    }
    /**实现选择功能**/
    allSelect() {
        let allObj = this.$$('.check-all')
        //获取设置事件委托 多选按钮绑定事件，改变this执向
        allObj[0].addEventListener('click', this.clickAllSelect.bind(this, 1))
        allObj[1].addEventListener('click', this.clickAllSelect.bind(this, 0))
    }
    clickAllSelect(index, event) {
        let status = event.target.checked
        // console.log(this.$$('.check-all')[index])
        this.$$('.check-all')[index].checked = status
        this.clickAll(status)   //判断多选框状态，为true，让所有单选框等于多选框的状态
        this.staticMag(status) // 调用时传入多选框状态，为true珍惜循环
    }
    oneClick(event) {//使用事件监听给所有的单选框设置事件
        let e = event || window.Event
        //contains() 方法用于判断字符串中是否包含指定的字符或字符串
        e.target.classList.contains('check-one') && this.clickOneGoods(e.target)
        e.target.classList.contains('add') && this.addQue(e.target)
        e.target.classList.contains('reduce') && this.subQue(e.target)
        e.target.classList.contains('delete') && this.deleteClick(e.target)
    }
    clickOneGoods(e) {
        this.staticMag()
        if (e.checked) {
            //当我们点击单选框按钮的时候，判断状态为true则筛选所有的check-one状态都满足条件才返回true
            let res = Array.from(this.$$('.check-one')).every(v => {
                return v.checked
            })
            if (res) {//根据所有单选框状态返回进行控制多选按钮
                this.$$('.check-all')[0].checked = true
                this.$$('.check-all')[1].checked = true
            }
        } else {
            this.$$('.check-all')[0].checked = false
            this.$$('.check-all')[1].checked = false
        }
    }
    clickAll(status) {
        Array.from(this.$$('.check-one')).forEach(ele => {
            ele.checked = status    //所有单选框等于多选框的状态 true
        })
    }
    /**统计价格和数量
     * 思路，
     * 1、遍历所有的单选框按钮,当选择框为true的时候调用，通过当前选择框获取当前选择框的上上级tr
     * 2、获取价格和数量，追加
     * **/
    staticMag(tar = true) {//获取全选框状态，全选框为false不执行循环
        let staticNum = 0; let staticPrice = 0;//数量和价格
        tar && Array.from(this.$$('.check-one')).forEach(ele => {//遍历所有的单选框按钮
            if (ele.checked) {//当选择框为true的时候调用
                let trObj = ele.parentNode.parentNode//通过当前选择框获取当前选择框的上上级tr
                staticNum += trObj.querySelector(".count input").value * 1//数量
                staticPrice += trObj.querySelector(".subtotal").innerHTML * 1//价格
            }
        })
        this.$('#selectedTotal').innerHTML = staticNum
        this.$('#priceTotal').innerHTML = staticPrice;
    }

    /**数量的增加
     * addQue()增加
     * subQu() 减少
     * 理解：使用事件委托判断我们点击的是是不是add增加按钮
     * 获取value值，++
     * **/
    addQue(target) {
        let num = target.previousElementSibling
        num.value = Number(num.value) + 1;//因为是字符串，所有转换一下
        let tr = target.parentNode.parentNode
        let unit = tr.querySelector('.price').innerHTML//获取价格
        let subtotal = num.value * unit  //小计 = 数量 * 价格
        tr.querySelector('.subtotal').innerHTML = subtotal // 追加
        tr.querySelector('.check-one').checked && this.staticMag()
        this.openATion(tr.getAttribute('id'), target, num.value) //传参
    }
    subQue(target) {
        let num = target.nextElementSibling
        num.value = Number(num.value) - 1;      // ! 因为是字符串，所有转换一下
        let tr = target.parentNode.parentNode
        let unit = tr.querySelector('.price').innerHTML// => 获取价格
        let subtotal = num.value * unit  // => 小计 = 数量 * 价格
        tr.querySelector('.subtotal').innerHTML = subtotal // ! 追加
        tr.querySelector('.check-one').checked && this.staticMag()
        this.openATion(tr.getAttribute('id'), target, num.value)
    }
    /** 
     * 1、传参tr的id属性值，传参我们点击的当前DOM节点对象，传参我们的数量值
     * 2、获取数据库为数量，条件上传入商品id，商品颜色，登录用户名
     * 3、商品颜色可以通过节点信息获取，商品数据库id渲染的时候追加了id，登录名直接获取
     * 4、商品为0的时候删除数据库商品信息，并刷新页面
     * **/
    openATion(goodsId, target, num = 0) {
        // console.log(goodsId, target, num)   // num => 数量
        let color = target.parentNode.parentNode.querySelector('.goods').lastElementChild.innerHTML // => 当前商品颜色
        let nameId = target.parentNode.parentNode.getAttribute("id")    // =>商品id
        let urName = localStorage.getItem('name')  // => 用户名
        axios.get({
            url: "./php/celliphone.php",
            data: { fn: "changeNum", urName, color, nameId, num }
        }).then((data) => {
            //添加成功
        }).catch((data) => {
            console.log(data)
        })
        target.parentNode.parentNode.querySelector('.count input').value == 0 && location.reload()
    }
    /**删除按钮的实现
     * 1、事件委托指向当前节点对象
     * 2、给当前事件添加layer提示框
     * 3、通过当前节点的上上级，直接删除
     * 4、判断单选框状态重新调用staticMag()
     * **/
    deleteClick(target) {
        let then = this
        let trObj = target.parentNode.parentNode
        let color = target.parentNode.parentNode.querySelector('.goods').lastElementChild.innerHTML // => 当前商品颜色
        let nameId = target.parentNode.parentNode.getAttribute("id")    // =>商品id
        let urName = localStorage.getItem('name')  // => 用户名
        layer.open({
            title: '确认删除框',
            content: '确认抛弃奴家吗?',
            btn: ['取消', '确认'],
            btn2: function (index, layero) {//按钮【按钮二】的回调
                //return false 开启该代码可禁止点击该按钮关闭
                trObj.remove()  //删除当前行
                target.parentNode.parentNode.querySelector('.check-one').checked && then.staticMag()
                then.delCallback(color, nameId, urName)  //执行完毕回调
            }
        })
    }
    delCallback(color, nameId, urName) {
        // console.log(color, nameId, urName)
        location.reload()
        axios.get({
            url: "./php/celliphone.php",
            data: { fn: "oneDel", urName, color, nameId }
        }).then((data) => {
            layer.open({
                title: '确认删除框',
                content: '删除成功',
                btn: ['取消', '确认'],
                btn2: function (index, layero) {//按钮【按钮二】的回调
                    //return false 开启该代码可禁止点击该按钮关闭

                }
            })
        }).catch((data) => {
            console.log(data)
        })
    }
    /**多选删除按钮实现
     * 1、使用事件监听，当我们点击按钮的时候执行 deleteAllClick()函数
     * 2、获取所有单选框，遍历input单选框的状态checked状态
     * 3、
     * **/
    deleteAll() {
        let then = this
        layer.open({
            title: '确认删除框',
            content: '确认全部删除吗?',
            btn: ['取消', '残忍拒绝'],
            btn2: function (index, layero) {//按钮【按钮二】的回调
                //return false 开启该代码可禁止点击该按钮关闭
                then.deleteAllClick()
            }
        })
    }
    deleteAllClick() {

        let urName = localStorage.getItem('name')  // => 用户名
        let cheOne = Array.from(this.$$('.check-one'))// => 所有的单选框状态
        console.log(cheOne)
        cheOne.forEach((v, i) => {
            if (v.checked == true) {
                let trObj = v.parentNode.parentNode
                let color = v.parentNode.parentNode.querySelector('.goods').lastElementChild.innerHTML // => 当前商品颜色
                let nameId = v.parentNode.parentNode.getAttribute("id")    // =>商品id
                // 获取数据库数据
                axios.get({
                    url: "./php/celliphone.php",
                    data: { fn: "oneDel", urName, color, nameId}
                }).then((data)=>{
                    console.log(data)
                    trObj.remove()
                    //回调出现提示框
                    this.allDelCallback()
                }).catch((data)=>{
                    console.log(data)
                })
            }
        })
    }
    allDelCallback(){
        layer.open({
            title: '确认删除框',
            content: '已成功删除',
            btn: ['取消', '确认'],
            btn2: function (index, layero) {//按钮【按钮二】的回调
                //return false 开启该代码可禁止点击该按钮关闭
                location.reload()
            }
        })
    }
    //获取元素封装
    $(ele) {
        return document.querySelector(ele)
    }
    $$(ele) {
        return document.querySelectorAll(ele)
    }
}
new Cart


