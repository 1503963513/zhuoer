
class PersonageLike{
    constructor(){
        this.span16Goods = document.querySelector('.span16 .goods-fav')  // => 商品节点
        this.init()
    }
    init(){
        this.fond()
    }
    fond(){
        let name = localStorage.getItem('name') // => 用户id
        //1、ajax获取用户喜欢的商品id
        axios.get({ 
            url: "./php/celliphone.php",
            data: { fn: "userLike", name }
        }).then((data)=>{   //  data 返回用户喜欢的商品
            data = JSON.parse(data)

            this.callback(data) // ！ 原因：因为要满足async的使用条件,使用回调函数
        }).catch((data)=>{
            console.log(data)
        })
    }
    async callback(data){  
        let nameLike = await axios.get({ url: './json/phoneDates.json', data: {} })
        nameLike = JSON.parse(nameLike)     // => 输出所有商品 以[{}{}]的形式保存
        let cont = []       // ！ 定义一个空数组来接受用户喜欢的商品数据
        //筛选出我们需要的商品数据
        data.forEach(ele => {
            nameLike.forEach(val => {
                if(ele.serial == val.id){
                    cont.push(val)          // !  筛选出我们需要的商品数据保存到 cont[]
                }
            })
        });
        // ！因为图片是一个长字符串，筛选每一件商品的第一张图片出来，便于后面追加
        let uPic = []   // !定义一个空数组用来保存每一件商品的第一张图片
        cont.forEach((ele)=>{
            let pic = ele.img.split(',')
            uPic.push(pic[0])          // => 筛选出我们要的图片链接保存成 uPic[]
        })
        this.TwoCallback(cont,uPic)
    }
    TwoCallback(cont,uPic){ //这里主要是回调追加
        let char = ''
        cont.forEach((c)=>{
            char +=`<li class="xm-goods-list" id="${c.id}">
            <figure>
                <a href="">
                    <img src="${uPic[0]}" alt="">
                </a>
                <figcaption>
                    <h3 id="aa">
                        <a href="">${c.pName}</a>
                    </h3>
                    <p class="price">
                        <span>
                            ${c.pPrice}元
                            <del>${c.price1}</del>
                        </span>
                    </p>
                    <div class="action clearfix">
                        <a href="#" class="del">删除</a>
                        <a href="" class="desc">查看详情</a>
                    </div>
                </figcaption>
            </figure>
        </li>`
        })
        this.thriceCallback(char,uPic)
    }
    thriceCallback(char,uPic){
        this.span16Goods.innerHTML = char
        let list = document.querySelectorAll(".xm-goods-list img") // => 商品的图片
        list = Array.from(list)     // => 这里输出商品的图片

        list.forEach((ele,index)=>{
            ele.src = uPic[index]   //遍历商品追加商品正确的图片
        })
        //2、未来晚上喜欢界面的功能，我们使用回调函数，给商品添加点击事件
        this.fourCallback()
        //3、给商品添加查看详情功能，使用回调函数
        this.partCallback()
    }
    fourCallback(){// 四次回调，主要完善删除功能是
        let del = document.querySelectorAll(".xm-goods-list .del")
        del = Array.from(del)   //所有商品删除按钮节点
        del.forEach((ele,index)=>{
            ele.onclick = function(){
                let delObj = this.parentNode.parentNode.parentNode.parentNode.getAttribute('id') // => 商品id
                let uName = localStorage.getItem('name') // => 用户id

                layer.open({
                    title: '确认删除吗',
                    content: '主人，确定抛弃我吗？',
                    btn: ['取消', '确认'],
                    btn2: function (index, layero) {//按钮【按钮二】的回调
                        //return false 开启该代码可禁止点击该按钮关闭
                        axios.get({
                            url: "./php/celliphone.php",
                            data: { fn: "delLice", delObj , uName}
                        }).then((data)=>{
                            
                            //已经实现删除，明天实现提示框和另一个按钮

                        }).catch((data)=>{
                            console.log(data)
                        })
                        location.reload()
                    }
                    
                })
            }  
        })
    }
    partCallback(){ //查看商品详情的回调函数
        let part = document.querySelectorAll('.xm-goods-list .desc')  // => 节点集合
        part = Array.from(part)     // => 保存为数组

        // 遍历dom节点数据
        part.forEach((ele)=>{
            let spId = ele.parentNode.parentNode.parentNode.parentNode.getAttribute('id')   //商品id
            ele.href = './goods-details.html?pid='+spId     // ! 追加商品链接跳转
        })
    }
}
new PersonageLike