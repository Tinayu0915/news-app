var mongo = require("mongodb");
var server = mongo.Server("localhost",27017,{auto_reconnect:true});
var db = new mongo.Db("test",server,{safe:true});

//function selectAll(fun){  //全部查询
//	db.open(function(err, db){
//		db.collection("user", function(err, collection){
//			collection.find({}).toArray(function(err, docs){
//                fun(docs);
//                db.close();
//			});
//		});
//	});	
//}

function select(att, fun){  //全部查询
	db.open(function(err, db){
		db.collection("user", function(err, collection){
			collection.find(att).toArray(function(err, docs){
                fun(docs);
                db.close();
			});
		});
	});	
}

function selectAll(fun){  //全部查询
	db.open(function(err, db){
		db.collection("data_info", function(err, collection){
			collection.find().toArray(function(err, docs){
                fun(docs);
                db.close();
			});
		});
	});	
}

//查询数据库集合data_info中与标题相符的文档
function select_info(att,fun){
    db.open(function(err,db){
        db.collection("data_info",function(err,collection){
            collection.find(att).toArray(function(err,docs){
                console.log('success');
                fun(docs);
                db.close();
            })
        })
    })
}

//function select(att, fun){  //全部查询
//	db.open(function(err, db){
//		db.collection("data_info", function(err, collection){
//			collection.find(att).toArray(function(err, docs){
//                fun(docs);
//                db.close();
//			});
//		});
//	});	
//}



//插入评论
function insert_comment(data,fun){
    db.open(function(err,db){
        db.collection("comment",function(err, collection){
			collection.insert(data, function(err,result){
				console.log('success');
                fun(result);
                db.close();
			});
		});
    })
}

//查询评论
function select_comment(fun){
    db.open(function(err,db){
        db.collection("comment",function(err,collection){
            collection.find().toArray(function(err,docs){
                fun(docs);
                db.close();
            })
        })
    })
};



function select(att, fun){  //条件查询
	db.open(function(err, db){
		db.collection("user", function(err, collection){
			collection.find(att).toArray(function(err, docs){
                fun(docs);
                db.close();
			});
		});
	});	
}

////复制代码 代码如下:
//
//db.users.update({age: 25}, {$set: {name: 'changeName'}}, false, true);
//相当于：update users set name = ‘changeName' where age = 25;

//修改数据
function update(obj,data,fun){
    db.open(function(err,db){
        db.collection("user",function(err,collection){
            collection.update(obj,data,function(err,result){
                console.log('success');
                fun(result);
                db.close();
            })
        })
    })
}


function insert(data, fun){  //增加一条数据
	db.open(function(err, db){
		db.collection("user", function(err, collection){
			collection.insert(data, function(err, result){
				console.log('success');
                fun(result);
                db.close();
			});
		});
	});	
}

//向数据库List中添加数据
function insert_list(data,fun){
    db.open(function(err, db){
		db.collection("list", function(err, collection){
			collection.insert(data, function(err, result){
				console.log('success');
                fun(result);
                db.close();
			});
		});
	});	
}

function del(data, fun){  //删除一条数据
	db.open(function(err, db){
		db.collection("user", function(err, collection){
			collection.remove(data, function(err, result){
				console.log('success');
                fun(result);
                db.close();
			})
		});
	});	
};


//exports.select_info = select_info;
exports.selectAll = selectAll;
exports.select = select;
exports.insert = insert;
exports.del = del;
exports.update = update;
exports.insert_list = insert_list;
exports.insert_comment = insert_comment;
exports.select_comment = select_comment;

//var mongo = require("mongodb");
//var server = mongo.Server("localhost",27017,{auto_reconnect:true});
//var db = new mongo.Db("test",server,{safe:true});
//
////function selectAll(fun){  //全部查询
////	db.open(function(err, db){
////		db.collection("user", function(err, collection){
////			collection.find({}).toArray(function(err, docs){
////                fun(docs);
////                db.close();
////			});
////		});
////	});	
////}
//
//function select(att, fun){  //全部查询
//	db.open(function(err, db){
//		db.collection("user", function(err, collection){
//			collection.find(att).toArray(function(err, docs){
//                fun(docs);
//                db.close();
//			});
//		});
//	});	
//}
//
//function selectAll(fun){  //全部查询
//	db.open(function(err, db){
//		db.collection("info", function(err, collection){
//			collection.find({}).toArray(function(err, docs){
//                fun(docs);
//                db.close();
//			});
//		});
//	});	
//}
//

//
////插入评论
//function insert_comment(data,fun){
//    db.open(function(err,db){
//        db.collection("comment",function(err, collection){
//			collection.insert(data, function(err,result){
//				console.log('success');
//                fun(result);
//                db.close();
//			});
//		});
//    })
//}
//
////查询评论
//function select_comment(fun){
//    db.open(function(err,db){
//        db.collection("comment",function(err,collection){
//            collection.find({}).toArray(function(err,docs){
//                fun(docs);
//                db.close();
//            })
//        })
//    })
//};
//////跳转查询
////function skip_select(ind,fun){
////    db.open(function(er,db){
////        db.collection("info",function(err,collection){
////            collection.find({}).skip(ind).limit(1).toArray(function(err,docs){
////                fun(docs);
////                db.close();
////            })
////        })
////    })
////}
//
//
//function select(att, fun){  //条件查询
//	db.open(function(err, db){
//		db.collection("user", function(err, collection){
//			collection.find(att).toArray(function(err, docs){
//                fun(docs);
//                db.close();
//			});
//		});
//	});	
//}
//
//////复制代码 代码如下:
////
////db.users.update({age: 25}, {$set: {name: 'changeName'}}, false, true);
////相当于：update users set name = ‘changeName' where age = 25;
//
////修改数据
//function update(obj,data,fun){
//    db.open(function(err,db){
//        db.collection("user",function(err,collection){
//            collection.update(obj,data,function(err,result){
//                console.log('success');
//                fun(result);
//                db.close();
//            })
//        })
//    })
//}
//
//
//function insert(data, fun){  //增加一条数据
//	db.open(function(err, db){
//		db.collection("user", function(err, collection){
//			collection.insert(data, function(err, result){
//				console.log('success');
//                fun(result);
//                db.close();
//			});
//		});
//	});	
//}
//
////向数据库List中添加数据
//function insert_list(data,fun){
//    db.open(function(err, db){
//		db.collection("list", function(err, collection){
//			collection.insert(data,function(err, result){
//				console.log('success');
//                fun(result);
//                db.close();
//			});
//		});
//	});	
//}
//
//function del(data, fun){  //删除一条数据
//	db.open(function(err, db){
//		db.collection("user", function(err, collection){
//			collection.remove(data, function(err, result){
//				console.log('success');
//                fun(result);
//                db.close();
//			})
//		});
//	});	
//}
//
//
////exports.skip_select=skip_select;
//exports.selectAll = selectAll;
//exports.select = select;
//exports.insert = insert;
//exports.del = del;
//exports.update = update;
//exports.insert_list = insert_list;
//exports.insert_comment = insert_comment;
//exports.select_comment = select_comment;
//exports.select_info = select_info;
////function select(att){  //根据条件查询
////	db.open(function(err, db){
////		db.collection("user", function(err, collection){
////			collection.find(att).toArray(function(err, docs){
////			   console.log(docs);
////			   db.close();
////			});
////		});
////	});	
////}
////
////
////function insert(data){  //增加一条数据
////	db.open(function(err, db){
////		db.collection("user", function(err, collection){
////			collection.insert(data, function(err, result){
////				console.log('success')
////			})
////		});
////	});	
////}
////
////
////
////function del(data){  //删除一条数据
////	db.open(function(err, db){
////		db.collection("user", function(err, collection){
////			collection.remove(data, function(err, result){
////				console.log('success')
////			})
////		});
////	});	
////}
//
