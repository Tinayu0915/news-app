var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var conn = require('../sql/conn.js');
//
//var reset = require('./routes/');

router.get('/', function(req, res, next){
    res.render('reset', {title: '密码重置'});
});

router.post('/',function(req,res){
    var name = req.body.name;
    var pwd = req.body.pwd;
    var phone = req.body.phone;
//    console.log(pwd);
//    console.log(name);
    if(req.body.obj == 'user'){
        conn.select({'username':phone},function(data){
            if(data.length>0){
                res.send('true')
            }else{
                res.send('false')
            }
        })
    }else if(req.body.obj == 'both'){
        conn.update({'username':name},{$set:{'userpwd':pwd}},function(data){
            console.log(data);
            if(data.result.ok == 1){
                res.send('true')
            }
            else{
                res.send('false')
            }
        })
    }
});

module.exports = router;