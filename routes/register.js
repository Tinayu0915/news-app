var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var conn = require('../sql/conn.js');

router.get('/', function(req, res, next){
    res.render('register', {title: '注册'});
});

router.post('/', function(req, res){
    var name = req.body.name; //向服务器请求js.js文件里面的'name': val;
    var pwd = req.body.pwd; //向服务器请求js.js文件里面的'pwd': pwd;
    var ph= req.body.phone;
    

    if(req.body.style == "select_"){
        conn.select({"username":ph},function(data){
            if(data.length>0){
                res.send('10')
            }else{
                res.send('20')
            }
        });
    }else if(req.body.style == "insert_"){
        conn.insert({'username': name, 'userpwd': pwd,"login_status":false}, function(data){
        console.log(data);
        if(data.result.ok == 1){ //result.ok为内部的参数，值只有0和1，insert成功的时候就会输出1；可以console.log（data）在npm的cmd里看看；
                res.send('true');
            }else {
                res.send('false');
            }
        // res.send(data);
        })
    }
});



module.exports = router;