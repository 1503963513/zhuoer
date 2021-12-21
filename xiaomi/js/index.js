async function iphoneData() {
    let con = ""
    let data = await axios.get({ url: './json/iphoneData.json', data: {} })
    data = JSON.parse(data)
    data.forEach((item) => {
        con += `<a href="./goods-details.html?pid=${item.id}" >
                <li class="item">
                    <img src="${item.src}" alt="">
                    <h3 class="item-name">${item.name}</h3>
                    <p class="item-info">${item.into}</p>
                    <p class="item-price">
                        <span class="present-price">${item.price}</span>
                        <span class="primary-price">${item.price1}</span>
                    </p>
                </li>
            </a>`
    })
    // console.log(con)
    let ind = document.querySelector('.items')
    // console.log(ind)
    ind.innerHTML = con
}
iphoneData()
// $(function () {
    // $.ajax({
    //     url: 'http://mine233.com/lsl/findgoods',
    //     type: 'get',
    //     getType: 'json',
    //     success: function (result) {
    //         console.log(result)
    //         const data = JSON.parse(result.message);
    //         data.forEach(item => {
    //             if (item.img) {
    //                 let arr = item.img.split(",")
    //                 item.img = arr
    //             }
    //         });
    //         console.log(data);
    //         let htmlStr = template('tpl', {
    //             data
    //         });
    //         // console.log(htmlStr);
    //         $('.item-con').find('ul').eq(0).html(htmlStr);
    //     }
    // })
    // 登录之后添加用户账号
    // if (localStorage.getItem("login") == 'true') {
    //     console.log(111);
    //     var acc = localStorage.getItem("account");
    //     $('.header-info').children().eq(0).find('a').html(acc)
    // }
// })



