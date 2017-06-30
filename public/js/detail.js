$(function(){
    var detail_images=['li1.jpg','li2.jpg','li3.jpg'];
    for(var i=0;i<detail_images.length-1;i++){
        $(".detail_img").eq(0).append('<img src="../img/'+detail_images[i]+' ">')
    } 
    $(".detail_img").eq(2).append('<img src="../img/'+detail_images[detail_images.length-1]+' ">')
    
    var detail_link=[{text:'李沁：爱上那个风韵万千又悲情的田小娥',img:'li_link1.jpg'},
                     {text:'她是娱乐圈的一股清流，马上开启刷屏模式，迪丽热巴都比不上',img:'li_link2.jpg'},
                     {text:'赵丽颖曾给她当小配角，现在终于轮到她要火了',img:'li_link3.jpg'}];
    for(var j=0;j<detail_link.length;j++){
        $(".detail_link_wrapper").append('<ul class="detail_link">'+
                                            '<li class="detail_link_text">'+detail_link[j].text+'</li>'+
                                            '<li class="detail_link_img">'+
                                                 '<img src="../img/'+detail_link[j].img+'">'+
                                            '</li>'+
                                        
                                        '</ul>');
        $(".detail_link").eq(detail_link.length-1).css({"border-bottom":"none"})
    }
    
    var detail_comment=[{user:'良人昨夜情',source:'快报网友',time:'20小时前',like_num:17,comment:'对她莫名的好感，不解释'},
                        {user:'雨过天晴1',source:'快报网友',time:'昨天',like_num:1,comment:'这才是真正的田小娥，把那种被封建枷锁镣铐强加于身无法逃出，又不停反抗，纯真简单的女人为了生存和不同的男人产生纠葛，生不逢时，时代的悲剧'},
                        {user:'良人昨夜情2',source:'快报网友',time:'20小时前',like_num:17,comment:'对她莫名的好感，不解释'},
                        {user:'雨过天晴2',source:'快报网友',time:'昨天',like_num:1,comment:'这才是真正的田小娥，把那种被封建枷锁镣铐强加于身无法逃出，又不停反抗，纯真简单的女人为了生存和不同的男人产生纠葛，生不逢时，时代的悲剧'},
                        {user:'雨过天晴3',source:'快报网友',time:'昨天',like_num:1,comment:'这才是真正的田小娥，把那种被封建枷锁镣铐强加于身无法逃出，又不停反抗，纯真简单的女人为了生存和不同的男人产生纠葛，生不逢时，时代的悲剧'},
                        {user:'雨过天晴4',source:'快报网友',time:'昨天',like_num:1,comment:'这才是真正的田小娥，把那种被封建枷锁镣铐强加于身无法逃出，又不停反抗，纯真简单的女人为了生存和不同的男人产生纠葛，生不逢时，时代的悲剧'},
                        {user:'雨过天晴5',source:'快报网友',time:'昨天',like_num:1,comment:'这才是真正的田小娥，把那种被封建枷锁镣铐强加于身无法逃出，又不停反抗，纯真简单的女人为了生存和不同的男人产生纠葛，生不逢时，时代的悲剧'},
                        {user:'雨过天晴6',source:'快报网友',time:'昨天',like_num:1,comment:'这才是真正的田小娥，把那种被封建枷锁镣铐强加于身无法逃出，又不停反抗，纯真简单的女人为了生存和不同的男人产生纠葛，生不逢时，时代的悲剧'},
                        {user:'雨过天晴7',source:'快报网友',time:'昨天',like_num:1,comment:'这才是真正的田小娥，把那种被封建枷锁镣铐强加于身无法逃出，又不停反抗，纯真简单的女人为了生存和不同的男人产生纠葛，生不逢时，时代的悲剧'}];
    
    for(var i=0;i<detail_comment.length;i++){
        $(".detail_comment_lists").append('<div class="detail_comment_info">'+
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
    
    //点击点赞图标，点赞数量加一，再次点击，点赞数量减一(针对同一用户) 
    var cl_status=[];
    for(var i=0;i<detail_comment.length;i++){
        cl_status.push(0);
    };
    $(".comment_like_icon").on("click",function(){
        var a=$(this).parent().parent().find(".detail_comment_user");
        var b=$(this);
        var l_num=parseInt($(this).siblings(".comment_like_num").html());
        $.each(detail_comment,function(key,val){
            if(a.html()==detail_comment[key].user){                
                if(cl_status[key]==0){
                    cl_status[key]=1;
                    l_num++;
                    b.css({"color":'#e94220'});
                }else{
                    cl_status[key]=0;
                    l_num--;
                    b.css({"color":'#666'});
                }
                b.siblings(".comment_like_num").html(l_num)
            }
        })
    });
    
    
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
    })
    $(".comment_deliver").on("click",function(){
  
        if($(".comment_insert_text").val()){
            comment_insert()
        }
        
    })
    
    //初始评论框显示
    function comment_insert(){
        $(".comment_insert").show();
        $(".comment_insert_text,.comment_deliver").hide();
        $(".comment_insert_wrapper").removeClass("a")
    }
})