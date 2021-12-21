//js写法
class Header {
    constructor() {
        this.logo = document.querySelector('.logo')
        this.heaNav = document.querySelector('.h-list')
        this.headClid = this.heaNav.children
        this.init()
    }
    init() {
        this.headNav()
        this.logoClick()
        this.search()

    }
    logoClick() {
        //1、当用户按下了鼠标没有弹起的时候执行动画，并刷新网页
        this.logo.onmousedown = function () {
            Object.assign(this.style, {
                width: '43px',
                height: '43px'
            })
        }
        this.logo.onmouseup = function () {
            Object.assign(this.style, {
                width: '56px',
                height: '56px'
            })
            window.location.reload()
        }
    }
    //2、下拉菜单
    headNav() {
        let uli = Array.from(this.headClid)
        for (let i = 0; i < uli.length - 2; i++) {
            uli[i].onmousemove = function () {
                if (uli[i].lastElementChild.style.display = 'none') {
                    uli[i].lastElementChild.style.display = 'block'
                }
                uli[i].onmouseout = function () {
                    if (uli[i].lastElementChild.style.display = 'block') {
                        uli[i].lastElementChild.style.display = 'none'
                    }
                }
            }
        }
    }
    //3、搜索框
    search(){

    }
}

new Header


//jq写法
// $(function () {
//     //1.logo点击
//     $(".logo").mousedown(function () {
//         $(this).animate({
//             width: 52,
//             height: 52,
//             marginTop: -$(".logo").height() / 2,
//             marginLeft: -$(".logo").width() / 2,
//         }, 50)
//     }).mouseup(function () {
//         $(this).animate({
//             width: 56,
//             height: 56
//         }, 50, () => {
//             window.location.reload()
//         })
//     })


//     //2.headNav下拉菜单
//     $(".h-list").children("li").mouseenter(function () {
//         let flag = false;
//         $(this).parent().find(".down-menu-wrapper").each(function (index, item) {
//             if ($(item).css("display") != "none") {
//                 flag = true;
//             }
//         })
//         if (flag) {
//             $(this).find(".down-menu-wrapper").css({ display: "block" }).end().siblings().find(".down-menu-wrapper").css({ display: "none" })
//         } else {
//             $(this).find(".down-menu-wrapper").stop().slideDown(500)
//         }

//         //取消搜索框下拉
//         $(".h-search").find("input").css({
//             "border-color": "#e0e0e0",
//         }).siblings("button").css({
//             "border-color": "#e0e0e0",
//         }).siblings(".search-list").css({
//             "display": "none",
//         })
//     })

//     $(".h-list").mouseleave(function () {
//         $(this).find(".down-menu-wrapper").stop().slideUp(0)
//     })


//     //3.h-search搜索框
//     $(".h-search").find("input").click(function (event) {
//         event.stopPropagation();//阻止事件冒泡
//         $(this).css({
//             "border-color": "#ff6700",
//         }).siblings("button").css({
//             "border-color": "#ff6700",
//         }).siblings(".search-list").css({
//             "display": "block",
//         })
//     })

//     $(".search-list").on("click", "li", function (event) {
//         $(this).parent().siblings("[ type='text']").val($(this).text());
//     })

//     $("body").click(function () {
//         $(".h-search").find("input").css({
//             "border-color": "#e0e0e0",
//         }).siblings("button").css({
//             "border-color": "#e0e0e0",
//         }).siblings(".search-list").css({
//             "display": "none",
//         })
//     })
// })