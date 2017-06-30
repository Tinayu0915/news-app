var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var conn = require('../sql/conn.js');

router.get('/', function(req,res,next){
    res.render('detail',{title:'详情'});
});




//router.get('/', function(req,res,next){
//    if(req.body.style == "select_info"){
//        conn.select_info({"tit":req.body.detail_tit},function(data){
////            console.log(data);
//            res.send(data);
//            
////            if(data.length>0){
////                res.send("true");
////            }else{
////                res.send("false")
////            }
//        
//        })
//    }
////    else{   
////    
////        conn.selectAll(function(data){
////            console.log(data);
//////            console.log($.cookie("list_info"));
////        res.render('detail',{val:data,title:'详情'});
////        })
//////    }
////}
//});
    
    
    
    

router.post('/',function(req,res,next){ 
    var name = req.body.id;
    var source = req.body.source;
    var time = req.body.time;
    var like_num = req.body.like_num;
    var comment = req.body.comment;
    var tit = req.body.list_tit_;
//    if(req.body.style == "select"){
//    conn.selectAll(function(data){
//        console.log(data);
//        res.send(data)
//    })
//    }else 
if(req.body.style == "comment_insert"){
        conn.insert_comment({user:name,source:source,time:time,like_num:like_num,comment:comment},function(data){
            console.log(data);
            if(data.result.ok == 1){
                res.send("true")
            }else{
                res.send("false")
            }
        })
    }
    else if(req.body.style == "comment_select"){
        conn.select_comment(function(data){
            console.log(data);
            res.send(data);
//            if(data.length>0){
//                res.send("true");
//            }else{
//                res.send("false")
//            }
        });//渲染详细页面
    }
////    else if(req.body.style == "select_info"){
////        conn.select_info({"tit":tit},function(data){
////            res.send(data);
////            console.log(data)
////        })
////    }
//    
});

module.exports = router;