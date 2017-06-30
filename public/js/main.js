$(function(){
    /*公共部分*/
    //设置表头颜色变化及跳转
    if($.cookie(".nav_ind") == ''|| $.cookie(".nav_ind") == undefined){
        $(".nav").eq(0).css({"color":"#e94220"});
    }else{
        $(".nav").eq($.cookie(".nav_ind")).css({"color":"#e94220"})
    }
    
    $(".nav").on("hover",function(){
       $.cookie(".nav_ind",$(this).index());
 $(this).css({"color":"#e94220"}).siblings(".nav").css({"color":"#9d9d9d"});
        location.href = "video"+$.cookie(".nav_ind"); 
    })
    
    
    
    //设置页脚颜色变化
    if($.cookie(".items_ind") == ''|| $.cookie(".items_ind") == undefined){
        $(".items").eq(3).css({"color":"#e94220"});
    }else{
        $(".items").eq($.cookie(".items_ind")).css({"color":"#e94220"})
    }
    
    $(".items").on("hover",function(){
       $.cookie(".items_ind",$(this).index());
 $(this).css({"color":"#e94220"}).siblings(".items").css({"color":"#9d9d9d"});
        location.href = "video"+$.cookie(".items_ind"); 
    })
    
    /*注册页面*/
    
    //输入手机号并判断手机号格式
    var EP_ph=/^1[34578]\d{9}$/;
    var ph_status=false;
    $(".input_num").on("input change",function(){
        if($(this).val()){
            $(".input_delete").html('&#xe60e;');//手机号输入框是否为空，叉号出现
            if($(this).val().length==11){
                $(".code_get").addClass("a");//发送验证码背景色变深
                if(EP_ph.test($(".input_num").val())){    //判断手机号格式是否正确
                    ph_status=true;                    
                }else{
                    ph_status=false;                    
                }
            }else{
                $(".code_get").removeClass("a");//发送验证码背景色变淡
                ph_status=false;
            }
            
        }else{
            $(".input_delete").html("");
            $(".code_get").removeClass("a");
            ph_status=false;
        }
    });
    
    //点击叉号，手机号删除
    $(".input_delete").on("click",function(){
        $(".input_num").val("");
        $(this).html("");
        $(".code_send").removeClass("a");
        ph_status=false;
    })  
    
    //点击发送验证码，如果手机号正确跳到输入验证码环节
    var code_status=false;
    var code_time=6;
    var code_i = code_time;
    $(".code_get").on("click",function(){
        var ph=$(".input_num").val();
        if(ph_status==false && $(this).hasClass("a")){
            pop(".code_get_pop")
        }else if(ph_status){
            $.post('/register',{"phone":ph,"style":"select_"},function(data){
                if(data == '10'){
                    pop(".submitted_pop")
                }
            else if(data == '20'){
                
                $(".input_num_wrapper,.code_get").hide();
            $(".input_code_wrapper,.code_submit").show();
            $(".code_shower").html(NewCode());
            code_send();
            $(".input_tip").eq(2).css({"color":'#f3a08e'}).siblings(".input_tip").css({"color":'#333'});
                
            }
            })
        }
    });
    
    //点击可以重新发送验证码
    $(".code_send").on("click",function(){
        if(!code_status){
            
           code_status=true;
           code_send();
//            
        }
    });
    
    //输入验证码为四位数，则“提交验证码”框背景色加深
    $(".input_code").on("input change",function(){
        if($(".input_code").val().length==4){
            $(".code_submit").addClass("a")
        }else{
            $(".code_submit").removeClass("a")
        }
    })
    //点击提交验证码，如果验证码正确则跳转到设置密码环节
    $(".code_submit").on("click",function(){
           if($(this).hasClass("a")){ if($(".input_code").val()==$(".code_shower").html()){
                $(".input_code_wrapper,.code_submit").hide();
                $(".input_pw_wrapper,.click_submit").show();
                $(".input_tip").eq(4).css({"color":'#f3a08e'}).siblings(".input_tip").css({"color":'#333'});            
            }else{
                pop(".code_submit_pop")
            }
        }
    })
    //发送验证码函数
    function  code_send(){
        $(".code_send").removeClass("a").html("重新发送(" + code_i+ ")");
        setTimeout(function(){
            if(code_i>0){
                code_status=true;
                code_i--;
                code_send();
                
                $(".code_send").removeClass("a").html("重新发送(" + code_i+ ")");
            }else{
                code_i = code_time;
                code_status = false;
                $(".code_send").addClass("a").html("重新发送")
            }
        },1000)
    }
        
    
    //判断密码是否为空
    var EP_pwd=/(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/;
    $(".input_pw").on("input change",function(){
        if($(".input_pw").eq(0).val() && $(".input_pw").eq(1).val()){
            $(".click_submit").addClass("a")
        }else{
            $(".click_submit").removeClass("a")
        }
    })
    
    //点击提交，密码一致且符合要求则提示注册成功
//    $(".click_submit").on("click",function(){
//        if($(".input_pw").eq(0).val()==$(".input_pw").eq(1).val()){
//            if(EP_pwd.test($(".input_pw").eq(0).val())){
////                pop(".submit_pop_success")
//            }else{
//                pop(".submit_pop_error")
//            }
//        }else{
//            pop(".submit_pop")
//        }        
//        
//    })
    
    //已有账号，点击跳转登录
    $(".submitted_tip").on("click",function(){
        location.href="login"
    })
    
    
    
    
    
    /*密码重置页面*/
    
    //输入手机号并判断手机号格式
    $(".reset_inp1").on("input change",function(){
        ph_status=false;
        if($(this).val()){
            $(".reset_delete").html('&#xe60e;');//手机号输入框不为空，叉号出现
            if($(this).val().length==11){
                $(".reset_tab1").addClass("a");//下一步背景色变深
                if(EP_ph.test($(this).val())){    //判断手机号格式是否正确
                    ph_status=true;                    
                }else{
                    ph_status=false;                    
                }
            }else{
                $(".reset_tab1").removeClass("a");//下一步背景色变淡
                ph_status=false;
            }
            
        }else{
            $(".reset_delete").html("");
            $(".reset_tab1").removeClass("a");
            ph_status=false;
        }
    });
    
    //点击叉号，手机号删除
    $(".reset_delete").on("click",function(){
        $(".reset_inp1").val("");
        $(this).html("");
        $(".reset_tab1").removeClass("a");
        ph_status=false;
    })  
    
    //点击下一步，如果手机号正确跳到输入验证码环节
    var reset_time=6;
    var reset_i=reset_time;
    var reset_status=false;
    
    $(".reset_tab1").on("click",function(){
        var ph=$(".reset_inp1").val();
        console.log(ph);
        if(ph_status==false && $(this).hasClass("a")){
            pop(".reset_style_pop")
        }else if(ph_status){
            $.post('/reset',{"phone":ph,"obj":'user'},function(data){
                if(data == 'false'){//说明未注册，提示进行注册
                    pop(".reset_unregistered_pop")
                }else
             if(data == 'true'){//说明已注册
                
                $(".reset_inp1_wrapper,.reset_tab1").hide();
                $(".reset_inp2_wrapper,.reset_tab2").show();
                $(".reset_code_shower").html(NewCode());
                code_send2();
                $(".reset_tip").eq(2).css({"color":'#f3a08e'}).siblings(".reset_tip").css({"color":'#333'});

                }
            })
        }
    });
    
    //点击可以重新发送验证码
    $(".reset_code_send").on("click",function(){
        if(!reset_status){
            reset_status=true;
            code_send2();
        }
    });
    
    
    //输入验证码为四位数，则“下一步”背景色加深
    $(".reset_inp2").on("input change",function(){
        if($(this).val().length==4){
            $(".reset_tab2").addClass("a")
        }else{
            $(".reset_tab2").removeClass("a")
        }
    })
    //点击下一步，如果验证码正确则跳转到设置密码环节
    $(".reset_tab2").on("click",function(){
       if($(this).hasClass("a")){ if($(".reset_inp2").val()==$(".reset_code_shower").html()){
            $(".reset_inp2_wrapper,.reset_tab2").hide();
            $(".reset_inp3_wrapper,.reset_tab3").show();
            $(".reset_tip").eq(4).css({"color":'#f3a08e'}).siblings(".reset_tip").css({"color":'#333'});            
        }else{
            pop(".reset_code_pop")
        }
        }
    })
    
    
    //发送验证码函数
    function  code_send2(){
        $(".reset_code_send").removeClass("a").html("重新发送(" + reset_i+ ")");
        setTimeout(function(){
            if(reset_i>0){
                reset_status=true;
                reset_i--;
                code_send2();
                
                $(".reset_code_send").removeClass("a").html("重新发送(" + reset_i+ ")");
            }else{
                reset_i = reset_time;
                reset_status = false;
                $(".reset_code_send").addClass("a").html("重新发送")
            }
        },1000)
    }
    
    
    //判断密码是否为空
    $(".reset_inp3,.reset_inp4").on("input change",function(){
        if($(".reset_inp3").val() && $(".reset_inp4").val()){
            $(".reset_tab3").addClass("a")
        }else{
            $(".reset_tab3").removeClass("a")
        }
    })
    
    //点击提交，密码一致且符合要求则提示重置成功
    $(".reset_tab3").on("click",function(){
//        alert(1);
//        console.log(name);
        var name = $(".reset_inp1").val();//手机号
        var pwd = $(".reset_inp3").val();//密码
        var pwd2= $(".reset_inp4").val();//再次输入的密码
//        console.log(pwd);
////       console.log(ph);
//        console.log(pwd2);
//       console.log(ph);
       if($(".reset_tab3").hasClass("a")){
           
        if(pwd==pwd2){
            if(EP_pwd.test(pwd)){

                $.post('/reset',{"name":name,"pwd":pwd,"obj":'both'},function(data){
                    if(data == 'true'){
//                        pop(".reset_success_pop");
                        location.href="login";
                    }else{
                        pop(".reset_error_pop")
                    }
                })
//                 $.post("/reset",{"name":name,"pwd":pwd,"obj":'both'},function(data){
//                if(data == 'true'){
//                      alert('密码与之前重复');
//                   
//                }else if(data == 'false'){
//                    alert(1); 
////                  pop(".submit_pop_error");
//                }
//                     
//          })
                
                
            }else{
                pop(".reset_pwd1_pop")
            }
        }else{
            pop(".reset_pwd2_pop")
        }        
        }
    })
    
    //未注册，点击跳转至注册页面
    $(".unregistered_tip").on("click",function(){
        location.href="register"
    })
    
    
    
    
    /*登录页面*/
    
    /*账号登录*/
 $(".inp1,.inp2").show().siblings(".inp3,.inp4").hide();
    $(".cross1,.cross2,.cross3,.cross4").hide();
    
    $(".inp1,.inp2").on("input change",function(){
        if($(".inp1").val()){$(".cross1").show()}else{$(".cross1").hide()};//叉号的出现与隐去
        if($(".inp2").val()){
            $(".cross2").show();$(".inp2_icon").show()//叉号和眼睛图标的出现与隐去
        }else{
            $(".cross2").hide();$(".inp2_icon").hide()
        };
        if($(".inp1").val() && $(".inp2").val()){
            $(".bottom_left").addClass("a");//登录背景框颜色变深
        }else{
            $(".bottom_left").removeClass("a");////登录背景框颜色变浅
        }
    })
    
    $(".top .left").on("mouseover",function(){
            $(".left_underline,.bottom_left").show();
            $(".cross1,.cross2,.cross3,.cross4").hide();
            $(".right_underline,.bottom").hide();
//            $(".middle").find("div,input").addClass("account");
//            $(".inp1.account").attr("placeholder","请输入手机号码或邮箱");
//            $(".inp2_icon").show();
            $(".inp1,.inp2").show();
            $(".inp3,.inp4").hide();

    });

    
    //点击跳转页面
    $(".quick_register").on("click",function(){
        location.href="register"
    });
    $(".reset_pw").on("click",function(){
        location.href="reset"
    })
    
    
    //密码可见情况切换
        var icon_click=false; //密码图标点击状态
        $(".inp2_icon").on("click",function(){
            if(icon_click==false){
               $(".inp2").prop("type","text");
                $(".inp2_icon").html("&#xe604;");
               icon_click=true
            }else{
                $(".inp2").prop("type","password");
               $(".inp2_icon").html("&#xe676;"); 
//               $(".inp2_account").val(inp2_val).show().siblings(".inp2").hide().val("");
                icon_click=false
            }
         }) 
        
    
    
    
    
    
    /*快捷登录*/
    
    var EP_num = /^\+?[0-9][0-9]*.*$/;
//    var EP_ph = /^1[34578]\d{9}$/;    
    
    //输入手机号并判断手机号格式
    $(".inp3,.inp4").on("input change",function(){
        if($(".inp3").val()){
            $(".cross3").show();
            if(EP_ph.test($(".inp3").val())){
                $(".mes").addClass("a");//发送验证码背景框颜色变深
            }else{
                $(".mes").removeClass("a");//发送验证码背景框颜色变浅
            }
        }else{
            $(".cross3").hide()}//叉号的出现与隐去
        if($(".inp4").val()){$(".cross4").show()}else{$(".cross4").hide()}
        if($(".inp3").val() && $(".inp4").val()){
            
            $(".bottom").addClass("a");
            
        }else{
            $(".bottom").removeClass("a")
        }
    });
    
    $(".top .right").on("mouseover",function(){
            $(".left_underline,.bottom_left").hide();
            $(".right_underline,.bottom").show();
            $(".cross1,.cross2,.cross3,.cross4").hide();
//            $(".middle").find("div,input").removeClass("account");
            $(".inp3,.inp4").show();
            $(".inp1,.inp2").hide();
    });
    
    //点击叉号，手机号删除
    login_delete(".cross1",".inp1");
//    login_delete(".cross2",".inp2");
    login_delete(".cross3",".inp3");
    login_delete(".cross4",".inp4");
    $(".cross2").on("click",function(){
        $(".inp2").val("");
        $(".inp2_icon").val("");
        $(this).hide();
        $(".mes").removeClass("a");
        $(".bottom").removeClass("a")
    });
    
    function login_delete(dom1,dom2){
        $(dom1).on("click",function(){
            $(dom2).val("");
            $(this).hide();
            $(".mes").removeClass("a");
            $(".bottom").removeClass("a")
        })
    }
//    $(".cross3").on("click",function(){
//        $(".inp3").val("");
//        $(this).hide();
//        $(".mes").removeClass("a");
//        ph_status=false;
//        $(".bottom").removeClass("a")
//    }) 
    
    
    //点击发送验证码并倒计时
    var time=6;
    var i=time;
    var click_status=false;  //按钮的点击状态
    var set;
    var codeArr=[];
    $(".mes").on("click",function(){
        codeArr=[];
        var ph3=$(".ph3").val();
        if($(this).hasClass("a")){
            if(click_status==false){                
                codeArr.push(NewCode());
                $(".mes").removeClass("a").html("重新发送(" + i+ ")");
                click_status=true;
                pop(".login_code_success");
                
                set=setInterval(function(){
                    if(i>0){
                        i--;
                        $(".mes").html("重新发送(" + i+ ")");

                    }else{
                        $(".mes").addClass("a").html("重新发送");
                        i=time;
                        click_status=false;
                        clearInterval(set);
                    }
                },1000);
            }
        }else{
            pop(".login_pop");
        }
    })
    
    //输入验证码
//    $(".inp4").on("input change",function(){
//        if(ph_status){
//            if($(".inp4").val()){
//                $(".bottom").addClass("a")
//            }else{
//                $(".bottom").removeClass("a")
//            }
//        }else{
//            $(".bottom").removeClass("a")
//        }
//    })
    
      
    //判断验证码是否正确
    $(".bottom").on("click",function(){
        if(EP_ph.test($(".inp3").val())){  //必须手机号格式正确才进行判断
            if($(".inp4").val() == codeArr[0]){
                
                    //查看账号是否存在
                    $.post('/login',{"name":$(".inp3").val(),"obj":"user"},function(data){
                        if(data == 'true'){//账号存在，直接登录
                            
//                            $.post('/login',{"name":$(".inp3").val(),"style":"status"},function(data1){
//                                if(data1=="true"){
//                                    alert("login success")
//                                }
//                            });
                            $.cookie("sta",1);
                            location.href = "list"
//                            pop(".login_success");
                        }else{
                            var d_pwd = NewPwd();
                            $.post('/login',{"q_name":$(".inp3").val(),"q_pwd":d_pwd,"style":"new_default"},function(data){
                                if(data == 'true'){
                                   $(".login_success_pwd").html("登录成功，已为您免费注册，密码:"+d_pwd); pop(".login_success");
                                    $.cookie("sta",1);
                                    setTimeout(function(){
                                        location.href="detail"
                                    },3000);                            
                                }else{
                                    pop(".login_failure_error")//数据传递出现问题
                                }
                            })
                        }
                    })            
                
            }else{
                pop(".login_code");
                $.cookie("sta",0);
            }
        }
    })   
        
    
    //弹窗渐隐渐显效果
     function pop(dom){     
         $(dom).fadeIn(600,function(){  
                setTimeout(function(){
                    $(dom).fadeOut()
                },2000)
            })
     }   
        
     //随机生成四位验证码 
    var code;
    var code_val="";
    function NewCode(){
        var code={
            fir:Math.floor(Math.random()*9),
            s:Math.floor(Math.random()*9),
            t:Math.floor(Math.random()*9),
            fou:Math.floor(Math.random()*9),
        };
        var code_val=""+code.fir+code.s+code.t+code.fou;
        console.log(code_val);
        return code_val;
    }    
        
    //随机生成八位随机密码
    function NewPwd(){
        var default_pwd="";
        for(var i=0;i<8;i++){
            default_pwd += Math.floor(Math.random()*9);
        }
//        var code={
//            fir:Math.floor(Math.random()*9),
//            s:Math.floor(Math.random()*9),
//            t:Math.floor(Math.random()*9),
//            fou:Math.floor(Math.random()*9),
//        };
//        var code_val=""+code.fir+code.s+code.t+code.fou;
        console.log(default_pwd);
        return default_pwd;
    }    
    
    
    
    /*列表页面*/
    
var EP_num=/^[0-9]*$/;
var a="";
var image1=[]; //存放图片为一张的信息
var image2=[]; //存放图片为三张的信息
   
//先设置好添加图片的dom结构
function bodyfiller(json,check,num){
    var structure1='<li  class="news clearFix">'+
                        '<a class="news_tit">'+ json[num].tit+'</a>'+
                        '<a class="news_pic">'+
                            '<img src=' + '../img/'+json[num].pic[0] + '>'+
                        '</a>'+
                        '<div class="relative_info">'+
                            '<span class="source">' + json[num].source + '</span>'+
                            '<span class="eval_num">' + json[num].evaluate + "评" + '</span>'+
                            '<span class="news_delete">' + '&#xe772;' + '</span>'+
                        '</div>'+
                    '</li>';
    
    var structure2 = '<li  class="news clearFix">'+
                        '<a class="news_tit top_">'+ json[num].tit +'</a>'+
                        '<a class="news_pic top_">'+
                            '<img src=' + '../img/'+ json[num].pic[0] + '>'+
                        '</a>'+
                        '<a class="news_pic top_">'+
                            '<img src=' + '../img/'+ json[num].pic[1] + '>'+
                        '</a>'+
                        '<a class="news_pic top_">'+
                            '<img src=' + '../img/'+ json[num].pic[2] + '>'+
                        '</a>'+
                        '<div class="relative_info">'+
                            '<span class="source">' + json[num].source + '</span>'+
                            '<span class="eval_num">' + json[num].evaluate +"评" + '</span>'+
                            '<span class="news_delete">' + '&#xe772;' + '</span>'+
                        '</div>'+
                    '</li>';
    
        return (EP_num.test(check/3)) ? structure2 : structure1/*一定注意,num1与num2应分开来分别表示索引，混在一块写将造成难以查询的错误*/           
}

    
var arr_=[];
//$.post('/list',function(data){
//    arr_=data;//数据库传过来的数据赋值给一个空数组
//    console.log(data);
//    //将数组中的数据按照图片的个数分别传给两个空数组
//    for(var i=0;i<arr_.length;i++){
//        if(arr_[i].pic.length==1){
//            image1.push(arr_[i]);
//        }else{
//            image2.push(arr_[i])
//        }
//    }
//    //将dom结构渲染进html中
//    function bodyInitializer(){
//        var data_len=arr_.length;
//        var s_i=0;
//        var t_i=0;
//        for(var i=0;i<data_len;i++){
//            if(!EP_num.test(i/3)){
//                if(t_i<image1.length){
//                    $(".content").append(bodyfiller(image1,i,t_i));
//                    t_i++;
//                }
//            }else{
//                if(s_i<image2.length){
//                    $(".content").append(bodyfiller(image2,i,s_i));
//                    s_i++;
//                }
//            }
//        }
//    }
//    bodyInitializer()
//});
//
    
//点击列表页新闻，获取点击新闻标题，存到cookie中
$("body").on("click",".news",function(){    
    var list_tit_=$(".news").eq($(this).index()).children(".news_tit").html();
    console.log(list_tit_);
    $.cookie("list_info",list_tit_);
    console.log($.cookie("list_info"));
    
    location.href="detail?t="+list_tit_;
});

    
/*鼠标进入搜索框的焦点，侧边搜索页面出现*/
var w_w = $(window).width();
var search_content = [];//存放历史搜索关键词
$(".list_search").on("focus",function(){

  $(".leftSide-page").animate({"left":0})
})

$(".leftSide-page-arrow").on("click",function(){
   $(".leftSide-page").animate({"left":-w_w}) 
})
$(".side_search").on("focus",function(){         $(".side_search_icon").css({"color":"red"})
}).on("blur",function(){
    $(".side_search_icon").css({"color":"#999"})
})

$(".search-text").on("click",function(){
    $(".sideHistory").html('<li class="sideHistory-list">历史搜索</li>');
    var search_keyWords = $(".side_search").val();
    //历史搜索最多出现六条记录
    
    if(search_keyWords){
        
        if(search_content.length<8){
            search_content.unshift(search_keyWords);
        }else{
            search_content.pop();
            search_content.unshift(search_keyWords);
        };
        $.each(search_content,function(key,val){

                $(".sideHistory").append('<li class="sideHistory-list">'+val+'</li>');
        })
        console.log(search_content);
        };
    $(".side_search").val("")
})
//清除历史记录
$(".delete-history").on("click",function(){
    $(".sideHistory").html('<li class="sideHistory-list">历史搜索</li>');
    search_content = [];
})
    
    


/*详细页面*/
$(".detail_tit").html($.cookie("list_info"));
var detail_images=['li1.jpg','li2.jpg','li3.jpg'];
    for(var i=0;i<detail_images.length-1;i++){
        $(".detail_img").eq(0).append('<img src="../img/'+detail_images[i]+' ">')
    }; 
    $(".detail_img").eq(2).append('<img src="../img/'+detail_images[detail_images.length-1]+' ">')
    
    var detail_link=[{text:'李沁：爱上那个风韵万千又悲情的田小娥',img:'li_link1.jpg'},
                     {text:'她是娱乐圈的一股清流，马上开启刷屏模式，迪丽热巴都比不上',img:'li_link2.jpg'},
                     {text:'赵丽颖曾给她当小配角，现在终于轮到她要火了',img:'li_link3.jpg'}];
    for(var j=0;j<detail_link.length;j++){
        $(".detail_link_wrapper").
        append('<ul class="detail_link">'+
                    '<li class="detail_link_text">'+detail_link[j].text+'</li>'+
                    '<li class="detail_link_img">'+
                         '<img src="../img/'+detail_link[j].img+'">'+
                    '</li>'+
               '</ul>');
        $(".detail_link").eq(detail_link.length-1).css({"border-bottom":"none"})
    }
    
    //点击文章下的点赞图标
    var like_st=0;
    $(".detail_like").on("click",function(){
        var like_n=parseInt($(this).children(".detail_like_num").html());
        if(like_st==0){
            like_st=1;
            $(this).css({"color":"#e94220"}).children(".detail_like_icon").html('&#xe620;');
            like_n++
        }else{
            like_st=0;
            $(this).css({"color":"#666"}).children(".detail_like_icon").html('&#xe63f;');
            like_n--
        }
        $(".detail_like_num").html(like_n)
    })
    
    
    //评论输入框切换
    $(".comment_insert").on("focus",function(){
        $(this).hide();
        $(".comment_insert_text,.comment_deliver").show();
        $(".comment_insert_wrapper").addClass("a")
    })
    
    //评论输入框移除焦点，在框外点击则可以回到小的输入框
    $(window).on("click",function(e){
        var m_y=e.clientY;//获取鼠标相对浏览器视口左上角的垂直距离
        var w_h=$(window).height();
        var f_h=$(".detail_footer_wrapper").height();
        if((w_h-m_y)>f_h){
            comment_insert()
        }
        
    })
    $(".comment_insert_text").on("input change",function(){
        
        if($(".comment_insert_text").val()){
            $(".comment_deliver").css({"background":'#e94220','color':'#fff'});
        }else{
            $(".comment_deliver").css({"background":'#ccc','color':'#666'});
        }
    });
    
    
    $(".comment_deliver").on("click",function(){ 
        if(login_status==0){
//            alert("good");
            location.href = "login"
        }else{
        var comment_time=new Date().getDate();
        comment_click_status = true;
        //插入评论到数据库
        $.post('/detail',{user:$(".comment_insert_text").val(),source:"气质范",time:"21小时前",like_num:$(".detail_like_num").html(),comment:$(".comment_insert_text").val(),style:"comment_insert"},function(data){
            if(data == "true"){
                
                comment_add();
            }else{
                alert(2)
            }            
        });
        }
        if($(".comment_insert_text").val()){
            comment_insert();      
        }
    }) 
    
    comment_add();
    
    function comment_add(){
    //从数据库获取数据
    $.post('/detail',{style:"comment_select"},function(data){
    var detail_comment = data;

    //从数据库获取数据，渲染评论页面
    for(var i=0;i<detail_comment.length;i++){
    $(".detail_comment_lists").
        append('<div class="detail_comment_info">'+
              '<div class="detail_comment_info_left">'+
                   '<div class="detail_comment_user">'+detail_comment[i].user+'</div>' +
                        '<span class="detail_comment_user_source">'+
                              detail_comment[i].source+
                        '</span>'+'&nbsp;'+
                        '<span class="detail_comment_time">'+
                              detail_comment[i].time+
                        '</span>'+                     
              '</div>'+
              '<div class="detail_comment_info_right">'+
                   '<span class="comment_like_icon">'+'&#xe6e1;'+'</span>'+'&nbsp;'+
                   '<span class="comment_like_num">'+
                        detail_comment[i].like_num+
                   '</span>&nbsp;&nbsp;'+
                   '<span class="comment_reply_icon">'+'&#xe65a;'+'</span>&nbsp;'+
                   '<span class="comment_reply_text">'+"回复"+'</span>'+
              '</div>'+
          '</div>'+
       '<div class="detail_comment_content">'+detail_comment[i].comment+'</div>');
    $(".detail_comment_content").eq(detail_comment.length-1).css({"border-bottom":"none"});
};   


    });
    }
        
    
    //初始评论框显示
    function comment_insert(){
        $(".comment_insert").show();
        $(".comment_insert_text,.comment_deliver").hide();
        $(".comment_insert_wrapper").removeClass("a")
    }    
    
    
    
    
    
       /*前后端交互*/
    
    //注册 
    //点击提交，密码一致且符合要求则提示注册成功
    $(".click_submit").on("click",function(){
        var name = $(".input_num").val();//手机号
        var pwd = $(".input_pw").eq(0).val();//密码
        var pwd2= $(".input_pw").eq(1).val();//再次输入的密码
        console.log(pwd);
       
       if($(".click_submit").hasClass("a")){
           
        if(pwd==pwd2){
            if(EP_pwd.test(pwd)){
                
                 $.post("/register",{"name":name,"pwd":pwd,"style":"insert_"},function(data){
                if(data == 'true'){
//                      alert('注册成功');
                    location.href = "login"
                   
                }else if(data == 'false'){
                     
                  pop(".submit_pop_error");
                }       
          })
            }else{
                pop(".submit_style_error")
            }
        }else{
            pop(".submit_pop")
        }        
        }
    })
    
    
    
    
    //登录
    $(".bottom_left").on("click",function(){
        var name = $(".inp1").val();//手机号
        var pwd = $(".inp2").val();//密码
        if($(".bottom_left").hasClass("a")){
           if(!EP_ph.test(name)){     //手机格式错误
              pop(".login_pop")
           }else{
              $.post("/login",{"name":name,"obj":"user"},function(data){
                if(data == 'true'){//判断用户是否存在
                    $.post("/login",{"name":name,"pwd":pwd,"obj":"pwd"},function(data){
                        if(data == 'true'){//判断密码是否正确
//                            $.post('/login',{"name":name,"style":"status"},function(data1){
//                                if(data1=="true"){
//                                    alert("1")
//                                }
//                            });
                            $.cookie("sta",1);
                            location.href = "list"
//                            alert('登录成功');
                        }else{
                            pop(".login_error");
                            $.cookie("sta",0)
                        }
                    })
                        

                }else{
                  pop(".login_unregistered")
                }
          }) 
           } 
        }
    });
    
    
    //设置登录状态
    var login_status;
    if($.cookie("sta") == undefined || $.cookie("sta") == ''){
        login_status = 0;
        $.cookie("sta",login_status);
    }else{
        login_status = $.cookie("sta");
    }
    
    if(login_status == 0){
        $(".login_status,.items .text").eq(3).html("未登录")
    }else{
        $(".login_status,.items .text").eq(3).html("我的")
    }
        
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
})