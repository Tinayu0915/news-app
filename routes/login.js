var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var conn = require('../sql/conn.js');

router.get('/', function(req, res, next){
    res.render('login', {title: '登录'});
});

router.post('/', function(req, res){
    var name = req.body.name; //向服务器请求js.js文件里面的'name': val;
    var pwd = req.body.pwd; //向服务器请求js.js文件里面的'pwd': pwd;
    var q_name = req.body.q_name;
    var q_pwd = req.body.q_pwd;
    if(req.body.obj == "user"){
        conn.select({'username':name},function(data){
            console.log(data);
            if(data.length>0){
                res.send('true')
            }else{
                res.send('false')
            }
        })
    }else if(req.body.obj == "pwd"){
        conn.select({'username': name, 'userpwd': pwd}, function(data){
            console.log(data);
            if(data.length>0){ //result.ok为内部的参数，值只有0和1，insert成功的时候就会输出1；可以console.log（data）在npm的cmd里看看；
                    res.send('true');
                }else {
                    res.send('false');
                }
            // res.send(data);
        })
    }else if(req.body.style == "new_default"){//增加默认密码
        conn.insert({'username':q_name,'userpwd':q_pwd,"login_status":true},function(data){
            console.log(q_name);
            console.log(q_pwd);
            console.log(data);
            if(data.result.ok == 1){
                res.send('true')
            }else{
                res.send('false')
            }
        })
    }//打算在数据库中设置登录状态，但此处用不上
//    else if(req.body.style == "status"){
//        conn.update({"username":name},{$set:{"login_status":true}},function(data){
//            if(data.result.ok == 1){
//                res.send('true')
//            }else{
//                res.send('false')
//            }
//        })
//    }
});



module.exports = router;