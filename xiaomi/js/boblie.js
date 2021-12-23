//全部手机
class AlpPhone {
    constructor() {
        this.headed = document.querySelector('#main section ul')
        this.head = document.querySelector('#main #header ul')
        this.init()
    }
    init() {
        this.phone()
        this.paging()
    }
    //分页
    paging() {
        let that = this
        let uli = Array.from(this.head.children)
        for (let i = 0; i < uli.length; i++) {
            // 设置自定义样式
            uli[i].setAttribute('index', i);
            //添加事件
            uli[i].onclick = function () {
                let index = this.getAttribute('index');
                //清空所有样式
                for (let j = 0; j < uli.length; j++) {
                    uli[j].classList.remove('active')
                }
                //添加样式
                this.classList.add('active')
                that.home(index)
            }

        }
    }
    async home(index) {
        this.headed.innerHTML = ""
        if (index == '0') {
            let data = await axios.get({ url: './json/iphoneData.json', data: {} })
            this.clickApply(data)
        }
        if (index == '1') {
            let data = await axios.get({ url: './json/homeAppliances.json', data: {} })
            this.clickApply(data)
        }
        if(index == '2'){
            let data = await axios.get({ url: './json/television.json', data: {} })
            this.clickApply(data)
        }
        if (index == '3') {
            let data = await axios.get({ url: './json/homeAppliances.json', data: {} })
            this.clickApply(data)
        }
        if(index == '4'){
            let data = await axios.get({ url: './json/television.json', data: {} })
            this.clickApply(data)
        }
        if(index == '5'){
            let data = await axios.get({ url: './json/homeAppliances.json', data: {} })
            this.clickApply(data)
        }
        if(index == '6'){
            let data = await axios.get({ url: './json/television.json', data: {} })
            this.clickApply(data)
        }
        if(index == '7'){
            let data = await axios.get({ url: './json/television.json', data: {} })
            this.clickApply(data)
        }
        
    }
    clickApply(data){
        //追加商品
        let count = ''
        data = JSON.parse(data)
        data.forEach((item) => {
            count += `<a href="./goods-details.html?pid=${item.id}" >
                <li class="item">
                    <img src="${item.src}" alt="">
                    <h3 class="item-name">${item.name}</h3>
                    <p class="item-info">${item.into}</p>
                    <p class="item-price">
                        <span class="present-price">${item.price}</span>
                        <span class="primary-price">${item.price1}</span>
                    </p>
                </li>
                <button>加入购物车</button>
            </a>`
        })
        this.headed.innerHTML = count
    }
    async phone() {//选择框按钮
        let count = ''
        let data = await axios.get({ url: './json/iphoneData.json', data: {} })
        data = JSON.parse(data)
        //追加商品
        data.forEach((item) => {
            count += `<a href="./goods-details.html?pid=${item.id}" >
                <li class="item">
                    <img src="${item.src}" alt="">
                    <h3 class="item-name">${item.name}</h3>
                    <p class="item-info">${item.into}</p>
                    <p class="item-price">
                        <span class="present-price">${item.price}</span>
                        <span class="primary-price">${item.price1}</span>
                    </p>
                      <button>加入购物车</button>
                </li>
                
            </a>`
        })
        this.headed.innerHTML = count
    }
}
new AlpPhone