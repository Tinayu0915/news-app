$(function(){
    'use strict';
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
    var code_time=6;
    var code_i=code_time;
    var code_status=false;
    $(".code_get").on("click",function(){
        if(ph_status==false && $(this).hasClass("a")){
            pop(".code_get_pop")
        }else if(ph_status){
            $(".input_num_wrapper,.code_get").hide();
            $(".input_code_wrapper,.code_submit").show();
            $(".code_shower").html(NewCode());
            code_send();
            $(".input_tip").eq(2).css({"color":'#f3a08e'}).siblings(".input_tip").css({"color":'#333'})
        }
    });
    
    //点击可以重新发送验证码
    $(".code_send").on("click",function(){
        if(!code_status){
            code_status=true;
            code_send();
        }
    });
    
    //输入验证码为四位数，则“提交验证码”框背景色加深
    $(".input_code").on("input change",function(){
        if($(".input_code").val().length==4){
            $(".code_submit").addClass("a")
        }
    })
    //点击提交验证码，如果验证码正确则跳转到设置密码环节
    $(".code_submit").on("click",function(){
        if($(".input_code").val()==$(".code_shower").html()){
            $(".input_code_wrapper,.code_submit").hide();
            $(".input_pw_wrapper,.click_submit").show();
            $(".input_tip").eq(4).css({"color":'#f3a08e'}).siblings(".input_tip").css({"color":'#333'})
        }else{
            pop(".code_submit_pop")
        }
    })
    //发送验证码函数
    function code_send(){
        $(".code_send").removeClass("a").html("重新发送(" + code_i+ ")");
        setTimeout(function(){
            if(code_i>0){
                code_status=true;
                code_i--;
                code_send(); 
                $(".code_send").removeClass("a").html("重新发送(" + code_i+ ")");
            }else{
                code_i=code_time;
                code_status=false;
                $(".code_send").addClass("a").html("重新发送")
            }
        },1000)
    }
    
    //判断两次输入密码是否一致
    $(".input_pw").on("input change",function(){
        if($(".input_pw").eq(0).val()==$(".input_pw").eq(1).val()){
            $(".click_submit").addClass("a")
        }else{
            $(".click_submit").removeClass("a")
        }
    })
    
    //点击提交，密码一致则提示注册成功
    $(".click_submit").on("click",function(){
        if($(this).hasClass("a")){
            pop(".submit_pop_success")
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
    function NewCode(){
        var code;
        var code_val="";
        var code={
            fir:Math.floor(Math.random()*9),
            s:Math.floor(Math.random()*9),
            t:Math.floor(Math.random()*9),
            fou:Math.floor(Math.random()*9),
        };
        var code_val=""+code.fir+code.s+code.t+code.fou;
        return code_val;
        
        
    }    
    
    
    
    
    
    
    
    
})