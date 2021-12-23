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
class Subjectivity{
    constructor(){
        this.uList = document.querySelector('.l-list')
        this.banner = document.querySelector('.banner')
        this.homeLoft = document.querySelector('.home-loft')
        this.init()
        this.num = 0
        this.circle = 0
        this.flag = true

    }
    init(){
        // 1、banner的列表
        this.banList()
        // 2、轮播图
        this.autPic()
        this.bannerLun()
        this.rightCk()
        this.dropdown()
        
    }
    banList(){
        let uli = Array.from(this.uList.children)
        //实现移入变色，弹出框弹出
        for(let i=0;i<uli.length;i++){
            let liChild = uli[i].lastElementChild
            let lists = liChild.querySelectorAll('li')
            lists = Array.from(lists)
            uli[i].onmouseover = function(){
                uli[i].style.backgroundColor = "#ff6700"
                liChild.style.display = 'block'
                for(let j=0;j<lists.length;j++){
                    lists[j].onmouseover = function(){
                        lists[j].style.color = 'red'
                    }
                }
            }
            uli[i].onmouseout =function(){
                uli[i].style.backgroundColor = ""
                liChild.style.display = 'none'
                for(let j=0;j<lists.length;j++){
                    lists[j].onmouseout = function(){
                        lists[j].style.color = ''
                    }
                }
            }
        }
    }
    bannerLun(){
        //轮播图图片
        let bannerImg = this.banner.firstElementChild
        let banImg = bannerImg.children
        //轮播图按钮
        let bannerDisc = this.banner.lastElementChild.children
        // console.log(bannerImg,bannerArr,bannerDisc)
        //下方小圆点
        bannerDisc = Array.from(bannerDisc)
        for(let i=0;i<bannerDisc.length;i++){
            bannerDisc[0].classList.add('active')
            bannerDisc[i].setAttribute('index',i)
            bannerDisc[i].onclick = function(){
                let index = bannerDisc[i].getAttribute('index')
                this.num = index
                this.circle = index
                for (var j = 0; j < bannerDisc.length; j++) {
                    bannerDisc[j].classList.remove('active')
                }
                bannerDisc[i].classList.add('active')
                // 移动
                animation(bannerImg,-banImg[0].offsetWidth*index,"left")
                
            }
        }
    }
    rightCk(){
        //右侧点击按钮
        let bannerArr = this.banner.firstElementChild.nextElementSibling
        let bannerDisc = this.banner.lastElementChild.children
        let bannerImg = this.banner.firstElementChild
        let banImg = bannerImg.children
        let right = Array.from(bannerArr.children)[1]
        let that = this
        right.onclick = () => {
            if(this.flag){
                that.flag = false
                that.num++
                animation(bannerImg,-banImg[0].offsetWidth*that.num,"left",function(){
                    if(that.num == banImg.length-1){
                        that.num = 0
                        bannerImg.style.left = 0
                    }
                    that.flag = true
                })
                that.circle++
                if (that.circle > bannerDisc.length - 1) {
                    that.circle = 0
                }
                for(let j=0;j<bannerDisc.length;j++){
                    bannerDisc[j].classList.remove('active')
                }
                bannerDisc[that.circle].classList.add('active')
            }
        }
        let left = Array.from(bannerArr.children)[0]
        //左侧点击按钮
        left.onclick=()=>{
            if(this.flag){
                that.flag = false
                if(that.num == 0){
                    that.num = banImg.length-1
                    bannerImg.style.left = -banImg[0].offsetWidth*that.num+'px'
                }
                that.num--
                animation(bannerImg,-banImg[0].offsetWidth*that.num,"left",function(){
                    that.flag = true
                })
                that.circle--
                if (that.circle < 0) {
                    that.circle = bannerDisc.length - 1
                }
                for(let j=0;j<bannerDisc.length;j++){
                    bannerDisc[j].classList.remove('active')
                }
                bannerDisc[that.circle].classList.add('active')
            }
        }
    }
    //自动轮播
    autPic(){
        let bannerArr = this.banner.firstElementChild.nextElementSibling
        let bannerImg = this.banner.firstElementChild
        let bannerDisc = this.banner.lastElementChild.children
        let banImg = bannerImg.children
        let that = this
        let items
        /**
         * 使用定时器，每两秒执行一次
         * 使用开关防止其他操作
         * 执行一遍翻页操作
         * **/
        function auto(){
            items =  setInterval(() => {
                that.rightCk.onclick = function (){
                    if(that.flag){
                        that.flag = false
                        that.num++
                        animation(bannerImg,-banImg[0].offsetWidth*that.num,"left",function(){
                            if(that.num == banImg.length-1){
                                that.num = 0
                                bannerImg.style.left = 0
                            }
                            that.flag = true
                        })
                        that.circle++
                        if (that.circle > bannerDisc.length - 1) {
                            that.circle = 0
                        }
                        for(let j=0;j<bannerDisc.length;j++){
                            bannerDisc[j].classList.remove('active')
                        }
                        bannerDisc[that.circle].classList.add('active')
                    }
                }
                that.rightCk.onclick()
            }, 2000);
        }
        auto()
        this.banner.onmouseover = ()=>{
            clearInterval(items)
        }
        this.banner.onmouseout = ()=>{
            auto()
        }
    }
    //左侧滚轮
    dropdown(eve){
        let homeLoft = this.homeLoft
        let uli = homeLoft.lastElementChild.children
            // console.log(homeLoft)
            let  leftLi =Array.from(uli)
            Array.from(uli)
            let e = eve || window.event
            for(let i=0;i<=leftLi.length-1;i++){
                // console.log(leftLi[i])
                // leftLi[i].
            }
        //判断下拉滚轮到一定程度的时候出现侧栏
        window.onscroll = function (){
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            // console.log(scrollTop)
            if(scrollTop >= 970){
                homeLoft.style.display = 'block'
                homeLoft.style.position = 'fixed'
                homeLoft.style.top = 50+'px'
                homeLoft.style.left = 0  
            }else{
                homeLoft.style.display = ''
            }
            scrollTop >= 970  && scrollTop <= 1660 ? uli[0].classList.add('active') : uli[0].classList.remove('active')
            scrollTop > 1660 && scrollTop <= 2340? uli[1].classList.add('active') : uli[1].classList.remove('active')
            scrollTop > 2340 && scrollTop <= 3200? uli[2].classList.add('active') : uli[2].classList.remove('active')
            scrollTop > 3200 && scrollTop <= 3900? uli[3].classList.add('active') : uli[3].classList.remove('active')
            scrollTop > 3900 && scrollTop <= 4600? uli[4].classList.add('active') : uli[4].classList.remove('active')
            scrollTop > 4600 && scrollTop <= 5400? uli[5].classList.add('active') : uli[5].classList.remove('active')
            scrollTop >  5400 ? uli[6].classList.add('active') : uli[6].classList.remove('active')
        }
    }
    

}
new Subjectivity

class CutHovered{
    constructor(){
        //家电
        this.home2 = document.querySelector('#domeHover2')
        this.anchor2 = document.querySelector('#anchorele2')
        this.do = this.home2.children
        this.init()
    }
    init(){
        //移入切换
        this.cutHover()
    }
    cutHover(){
        //家电切换 热门和电视影音的切换
        let chor2 = this.anchor2.children
        let to = Array.from(this.do)
        for(let i=0;i<to.length; i++){
            this.do[i].onmouseover = function(){
                for(let j=0;j<to.length;j++){
                    to[j].classList.remove('active')
                    chor2[j+1].classList.remove('active')
                }
                to[i].classList.add('active')
                chor2[i+1].classList.add('active')
            }
        }
    }
    //家电点击实现
    
}
new CutHovered
