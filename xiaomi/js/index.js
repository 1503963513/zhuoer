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



