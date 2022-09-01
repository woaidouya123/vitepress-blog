/**
 * 此脚本用来创建图片代理服务已实现对禁止跨域加载的图片进行加载
 */
const express  = require('express');
const axios = require('axios');
const app = express();
const params = process.argv;
const prefix = (params.find(v => v.startsWith('--prefix=')) || "--prefix=pic_server").slice(9);
const port = (params.find(v => v.startsWith('--port=')) || "--port=7777").slice(7);
app.get(`/${prefix}`, function (req, res) {
    const url = req.query.url;
    axios.get(url, {
        responseType: 'arraybuffer',
        headers: {
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
        },
    }).then((response) => {
        res.end(response.data)
    }).catch((e) => {
        console.log(e);
    })
})

const server = app.listen(parseInt(port), function () {
    var host = server.address().address
    var port = server.address().port
    console.log("http://%s:%s/%s", host, port, prefix)
})
