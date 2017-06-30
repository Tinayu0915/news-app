var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var conn = require('../sql/conn.js');


router.get('/', function(req, res, next){
    res.render('list', {title: '新闻列表'});
});

router.get('/', function(req, res, next){
    conn.selectAll(function(data){
        console.log(data);
        res.render('/list', {val:data, title: '新闻列表'});
//        res.send(data)
    });
});


router.post('/list', function(req, res, next){
    conn.selectAll(function(data){
//        res.render('list', {val:data, title: '新闻列表'});
        res.send(data)
    })
});




module.exports = router;