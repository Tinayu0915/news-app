
$(function(){
    'use strict';
    $(".items").eq(3).addClass("a").siblings(".items").removeClass("a");//页脚登录栏为亮色
    
    //登录方式切换
    login_switch();
    icon_switch();
    $(".middle").find("div,input").addClass("account");
    $(".inp1.account").attr("placeholder","请输入手机号码或邮箱");
    $(".inp2_icon").show();
    $(window).on("resize",function(){
        login_switch()
    })
   
    function login_switch(){
        var l_left=$(".top .left_underline").offset().left;
        
        $(".underline").css({"left":l_left}).show();//打开页面,红色下划线的初始位置
        $(".top .left").on("mouseover",function(){           //为保证下划线在文字的正下方，特意创建两个隐藏的下划线，分别为左右栏的子元素，移动的下划线                                                       视鼠标移动情况获取相应下划线的位置
           l_left=$(".top .left_underline").offset().left;
            $(".underline").stop(true).animate({"left":l_left});
            
            $(".middle").find("div,input").addClass("account");
            $(".inp1.account").attr("placeholder","请输入手机号码或邮箱");
            $(".inp2_icon").show();
            $(".inp2_account").show().siblings(".inp2").hide();
            icon_switch();

        });
        $(".top .right").on("mouseover",function(){
//           var r_left=$(".top .right_underline").offset().left;
//            $(".underline").stop(true).animate({"left":r_left});
            
            $(".middle").find("div,input").removeClass("account");
            $(".inp2").show().siblings(".inp2_account").hide();
            $(".inp2_icon").hide();
            console.log($(".inp1-wrapper").width())
        });
    }
    
    //密码可见情况切换
    function icon_switch(){
        var icon_click=false; //密码图标点击状态
        var inp2_val="";//存储inp2输入框的值
        $(".inp2_icon").on("click",function(){
            inp2_val = $(".inp2").val() + $(".inp2_account").val();
            console.log(inp2_val);
            if(icon_click==false){
               $(".inp2_icon").html("&#xe604;");
               $(".inp2_account").hide().val("").siblings(".inp2").addClass("account").val(inp2_val).show();
               icon_click=true
            }else{
               $(".inp2_icon").html("&#xe676;"); 
               $(".inp2_account").val(inp2_val).show().siblings(".inp2").hide().val("");
                icon_click=false
            }
         }) 
        
    }
    
    /*快捷登录*/
    
    var EP_num = /^\+?[0-9][0-9]*.*$/;
    var EP_ph = /^1[34578]\d{9}$/;
    var ph_status=false;  //判断inp1输入值是否为手机号
    
    //输入手机号并判断手机号格式
    $(".inp1,inp2").on("input change",function(){
        if($(".inp1").val()){
            $(".cross").html("&#xe60e;");//手机号输入框是否为空，叉号和右侧背景色随之改变
            $(".mes").addClass("a");
            if(EP_ph.test($(".inp1").val())){    //判断手机号格式是否正确
                ph_status=true;
                console.log(ph_status);
                if($(".inp2").val()){    //手机格式正确且验证码输入框不为空，登录框背景色变亮
                    $(".bottom").addClass("a")
                }else{
                    $(".bottom").removeClass("a")
                }
            }else{
                ph_status=false;
                console.log(ph_status)
            }
            
        }else{
            $(".cross").html("");
            $(".mes").removeClass("a");
            ph_status=false;
            $(".bottom").removeClass("a")
        }
    });
    
    //点击叉号，手机号删除
    $(".cross").on("click",function(){
        $(".inp1").val("");
        $(this).html("");
        $(".mes").removeClass("a");
        ph_status=false;
        $(".bottom").removeClass("a")
    })    
    
    //点击发送验证码并倒计时
    var time=6;
    var i=time;
    var click_status=false;  //按钮的点击状态
    var set;
    var codeArr=[];
    $(".mes").on("click",function(){
        codeArr=[];
        if(ph_status){
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
        }else if($(".mes").hasClass("a")){   //必须至少输入一个数字，才可以触发相关动作
            pop(".login_pop");
        }
    })
    
    //输入验证码
    $(".inp2").on("input change",function(){
        if(ph_status){
            if($(".inp2").val()){
                $(".bottom").addClass("a")
            }else{
                $(".bottom").removeClass("a")
            }
        }else{
            $(".bottom").removeClass("a")
        }
    })
    
      
    //判断验证码是否正确
    $(".bottom").on("click",function(){
        if($(this).hasClass("a")){  //必须手机号格式正确才进行判断
            if($(".inp2").val() == codeArr[0]){
                pop(".login_success")
            }else{
                pop(".login_code")
            }
        }
    })   
    
    //点击页脚，跳到相应页面，颜色变为亮色
//    $(".items").on("click",function(){
//        $(this).addClass("a").siblings(".items").removeClass("a")
//    })
    
    
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
        
        
        
        
        
    })
    
    
    

