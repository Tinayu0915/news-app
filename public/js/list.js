$(function(){
    
//设置模拟数据库,分为左右单张小图，及上下三张图两种情况
var image_=[
         {pic:['med.jpg'],tit:'医药电商平台“未名企鹅”再获数千万元A+轮融资',source:'企鹅问答',evaluate:121},
         {pic:['fu.jpg'],tit:'BBC盘点中文网络流行语:“洪荒之力火爆全网”',source:'企鹅问答',evaluate:121},
         {pic:['science.jpg'],tit:'美科技和商界联合声明：没有政府领导，我们依然遵守巴黎协定',source:'企鹅问答',evaluate:121},
         {pic:['iphone.jpg'],tit:'苹果智能音箱设计上的这处缺陷,最终会让它葬送在猫的爪里',source:'企鹅问答',evaluate:121},
         {pic:['med.jpg'],tit:'医药电商平台“未名企鹅”再获数千万元A+轮融资',source:'企鹅问答',evaluate:121},
         {pic:['fu.jpg'],tit:'BBC盘点中文网络流行语:“洪荒之力火爆全网”',source:'企鹅问答',evaluate:121},
         {pic:['dan.jpg'],tit:'机器如何分清王珞丹白百合?加州理工找到大脑人脸密码',source:'企鹅问答',evaluate:121},
         {pic:['med.jpg'],tit:'医药电商平台未名企鹅再获数千万元A+轮融资',source:'企鹅问答',evaluate:121},
         {pic:['fu.jpg'],tit:'BBC盘点中文网络流行语:洪荒之力火爆全网',source:'企鹅问答',evaluate:121},
         {pic:['li1.jpg','li1.jpg','li3.jpg'],tit:'《白鹿原》李沁走路姿势也太难看了，解释原因后又获赞中国好演员',source:'八吧八吧',evaluate:24},
         {pic:['science.jpg'],tit:'美科技和商界联合声明:没有政府领导，我们依然遵守巴黎协定',source:'企鹅问答',evaluate:121},
         {pic:['war1.jpg',"war2.jpg","war3.jpg"],tit:'断交潮下的卡塔尔：民众囤货买空超市',source:'企鹅问答',evaluate:121},
         {pic:['town1.jpg','town2.jpg','town3.jpg'],tit:'小镇连续22年百里送考 3万乡亲放炮壮行',source:'企鹅问答',evaluate:121},
         {pic:['twin1.jpg','twin2.jpg','twin3.jpg'],tit:'18岁双胞胎拼搏高考 家中断网3年',source:'企鹅问答',evaluate:121},
         {pic:['old1.jpg','old2.jpg','old3.jpg'],tit:'82岁老人正睡觉 石块砖头突然飞进屋',source:'企鹅问答',evaluate:121},
         {pic:['twin1.jpg','twin2.jpg','twin3.jpg'],tit:'18岁双胞胎拼搏高考 家中断网3年',source:'企鹅问答',evaluate:121},
         {pic:['old1.jpg','old2.jpg','old3.jpg'],tit:'82岁老人正睡觉 石块砖头突然飞进屋',source:'企鹅问答',evaluate:121}
    ];

var EP_num=/^[0-9]*$/;
var a="";
var image1=[]; //存放图片为一张的信息
var image2=[]; //存放图片为三张的信息
    
for(var i=0;i<image_.length;i++){
    if(image_[i].pic.length==1){
        image1.push(image_[i]);
    }else{
        image2.push(image_[i])
    }
}    
    
//先设置好添加图片的dom结构
function bodyfiller(json,check,num){
    var structure1='<li  class="news clearFix">'+
                        '<a href="" class="news_tit">'+ json[num].tit+'</a>'+
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
                        '<a href="" class="news_tit top_">'+ json[num].tit +'</a>'+
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

//将dom结构渲染进html中
function bodyInitializer(){
    var data_len=image_.length;
    var s_i=0;
    var t_i=0;
    for(var i=0;i<data_len;i++){
        if(!EP_num.test(i/3)){
            if(t_i<image1.length){
                $(".content").append(bodyfiller(image1,i,t_i));
                t_i++;
            }
        }else{
            if(s_i<image2.length){
                $(".content").append(bodyfiller(image2,i,s_i));
                s_i++;
            }
        }
    }
}
bodyInitializer()






})