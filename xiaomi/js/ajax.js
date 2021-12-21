/*
            @params = {}
            method  方法
            url     地址
            data    发送的数据
            dataType    数据类型
            succeed     成功
            error       失败 
        */
class axios {
    static get(params = {}) {
        return this.http('get', params)
    }

    static post(params = {}) {
        return this.http('post', params)
    }

    //http是通用样式
    static http(method, params) {
        //解构参数
        let { url, dataType, data } = params;
        //判断url是否为空
        if (!url) {
            //抛出问题
            throw new Error("url不能为空");
        }
        //判断data,处理data传进来的数据，数据是以对象形式保存的，咱们把他处理成字符串，并拼接上
        let param = null;
        if (data) {
            param = [];
            //forin遍历对象，data上以对象形式保存的
            for (let attr in data) {
                // 使用push以数组的方式保存
                param.push(`${attr}=${data[attr]}`)
            }
        }
        //使用join把数组以字符串的形式保存
        param = param.join("&");
        //回调
        if (method == 'get') {
            url = url + '?' + param
            param = null
        }
        //promise检查ajax请求状态
        return new Promise(function (resolve, reject) {

            //实例化ajax
            let xhr = new XMLHttpRequest();
            //设置传输方式
            xhr.open(method, url, true);
            if (method == 'post') {
                xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded")
            }
            xhr.send(param);
            xhr.onreadystatechange = function () {
                //先判断一次，当ajax状态为4的时候执行，不然0-4会执行多次
                if (xhr.readyState === 4) {
                    //当ajax状态为4，服务器状态200的时候执行
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        //接收服务器返回值
                        let res = xhr.response
                        //判断是不是json，是则json转对象
                        if (dataType == 'json') {
                            res = JSON.parse(res)
                        }
                        //成功时返回
                        resolve(res)
                    } else {
                        // 失败时返回状态码
                        reject(xhr.status)
                    }
                }
            }
        })
    }
}