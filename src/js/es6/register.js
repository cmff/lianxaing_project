$(".email input").focus(function(){
    $(".register .email").css("border-color","red")
    $(".register .pwd").css("border-color","red")
    $(".register .confirm").css("border-color","red")
})
$(".pwd input").focus(function(){
    $(".register .pwd").css("border-color","red")
    $(".register .email").css("border-color","red")
    $(".register .code").css("border-color","red")
    $(".register .confirm").css("border-color","red")
})
$(".confirm input").focus(function(){
    $(".register .confirm").css("border-color","red")
    $(".register .pwd").css("border-color","red")
    $(".register .email").css("border-color","red")
})
$(".tel input").focus(function(){
    $(".register .confirm").css("border-color","red")
    $(".register .pwd").css("border-color","red")
    $(".register .tel").css("border-color","red")
    $(".register .code").css("border-color","red")
})
$(".code input").focus(function(){
    $(".register .confirm").css("border-color","red")
    $(".register .pwd").css("border-color","red")
    $(".register .code").css("border-color","red")
    $(".register .tel").css("border-color","red")
})
$(".registerWays span").click(function(){
    $(".registerWays span").removeClass("active");
    $(this).addClass("active");
})
$(".registerWays span").eq(0).click(function(){
    $(".register .tel").css("display","none")
    $(".register .code").css("display","none")
    $(".register .random").css("display","none")
    $(".register .email").css("display","block")
})
$(".registerWays span").eq(1).click(function(){
    $(".register .email").css("display","none")
    $(".register .code").css("display","block")
    $(".register .tel").css("display","block")
    $(".register .random").css("display","block")
});
let $check = $(".check .checkbox");
var a = 0;
$check.click(function(){
    if(a===0){
        $(this).css({"background":"#FF5224","border-color":"#FF5224"})
        a=1;
    }else{
        $(this).css({"background":"white","border-color":"#cbcbcb"})
        a=0;
    }
})
function random(min,max){
    if(min > max){
        var t = min;
        min = max;
        max = t;
    }
    return Math.floor(Math.random() * (max - min + 1) + min);
}
$(".random").html(function(){
    return random(1000,9999)
});
$(".random").css({
    "color":function(){
        return "rgb("+random(0,255)+","+random(0,255)+","+random(0,255)+")"
    }
})
$(".random").click(function(){
    $(".random").html(random(1000,9999))
    $(".random").css({
        "color":function(){
            return "rgb("+random(0,255)+","+random(0,255)+","+random(0,255)+")"
        }
    })
})
$(".email #mail").on("input",function(){
    var reg = /^[0-9a-zA-Z]{4,10}@[\da-zA-Z]{2,9}\.[a-zA-Z]{2,4}$/;
    if(reg.test($(this).val()) || $(this).val()===""){
        $(".tips1").css("display","none")
    }else{
        $(".tips1").css({"display":"block","margin":"-10px 0 10px 0"})
    }
})
$(".pwd #pwd").on("input",function(){
    if($(this).val()===""){
        $(".tips2").css({"display":"block","margin":"-10px 0 10px 0"})
    }else{
        $(".tips2").css({"display":"none"})
    }
})
$(".confirm #pwd2").on("input",function(){
    if($(this).val()===""){
        $(".tips3").css({"display":"block","margin":"10px 0 0px 0"})
    }else{
        $(".tips3").css({"display":"none"})
    }
})
let $email = $(".email #mail");
let $pwd1 = $(".pwd #pwd");
let $pwd2 = $(".confirm #pwd2");
let $register = $(".registerBtn");
$register.click(function(){
    var userEmail = $email.val();
    var userPwd1 = $pwd1.val();
    var userPwd2 = $pwd2.val();
    if(!userEmail){
        alert("邮箱不能为空");
        return;
    }
    let cookieStr = $.cookie('register') ? $.cookie('register') : '';
    let cookieObj = convertCookieStrToCookieObj(cookieStr);
    if(userEmail in cookieObj){
        alert('用户已存在！');
        return ;
    }else if(userPwd1 === userPwd2){
        cookieObj[userEmail] = userPwd1;
        location.href = "http://localhost/lianxiang_project/dist/pages/login.html";
    }else{
        alert("两次输入密码不一致")
    }
    $.cookie('register',JSON.stringify(cookieObj),{expires : 7,path : '/'});
    
});
function convertCookieStrToCookieObj(str){
        if(!str){
            return {};
        }
        return JSON.parse(str);
    }