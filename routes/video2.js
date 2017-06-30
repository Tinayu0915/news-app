var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var conn = require('../sql/conn.js');

router.get('/', function(req,res,next){
    res.render('video2',{title:'详情'});
});
module.exports = router;