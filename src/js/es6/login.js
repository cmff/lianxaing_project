$("input[type=text]").focus(function(){
    $(".login .email").css("border-color","red")
    $(".login .pwd").css("border-color","red")
})
$("input[type=password]").focus(function(){
    $(".login .pwd").css("border-color","red")
    $(".login .email").css("border-color","red")
})
$(".loginWays span").click(function(){
    $(".loginWays span").removeClass("active");
    $(this).addClass("active");
})
$(".loginWays span").eq(0).click(function(){
    $(".login .tel").css("display","none")
    $(".login .email").css("display","block")
})
$(".loginWays span").eq(1).click(function(){
    $(".login .email").css("display","none")
    $(".login .tel").css("display","block")
});
let $check = $(".check .checkbox");
var a = 0;
$check.click(function(){
    if(a===0){
        $(this).css({"background":"red","border-color":"red"})
        a=1;
    }else{
        $(this).css({"background":"white","border-color":"#cbcbcb"})
        a=0;
    }
})
$(".email #mail").on("input",function(){
    //邮箱正则验证
    var reg = /^[0-9a-zA-Z]{4,10}@[\da-zA-Z]{2,9}\.[a-zA-Z]{2,4}$/;
    if(reg.test($(this).val()) || $(this).val()===""){
        $(".tips1").css("display","none")
    }else{
        $(".tips1").css({"display":"block","margin":"-10px 0 10px 0"})
    }
})
$(".pwd #pwd").on("input",function(){
    if($(this).val()===""){
        $(".tips2").css({"display":"block","margin":"10px 0 10px 0"})
    }else{
        $(".tips2").css({"display":"none"})
    }
})
$(".pwd #pwd").on("input",function(){
    if($(this).val()===""){
        $(".tips2").css({"display":"block","margin":"-10px 0 10px 0"})
    }else{
        $(".tips2").css({"display":"none"})
    }
})
let $email = $(".email #mail");
let $pwd1 = $(".pwd #pwd");
let $login = $(".loginBtn");
let $register = $(".registerBtn");
$login.click(function(){
    var userEmail = $email.val();
    var userPwd1 = $pwd1.val();
    if(!userEmail){
        alert("邮箱不能为空");
        return;
    }
    let cookieStr = $.cookie('register') ? $.cookie('register') : '';
    let cookieObj = convertCookieStrToCookieObj(cookieStr);
    if(userEmail in cookieObj){
        if(cookieObj[userEmail] === userPwd1){
            alert("登录成功");
            location.href = "http://localhost/lianxiang_project/dist/index.html"
        }else{
            alert("请确认您的密码是否正确！");
        }
    }else{
        alert('该用户不存在！');
    }
    var loginObj = {};
    loginObj[userEmail]=userPwd1
    console.log(loginObj)
    $.cookie('login',JSON.stringify(loginObj),{expires : 7,path : '/'});
})
$register.click(function(){
    location.href = "http://localhost/lianxiang_project/dist/pages/registor.html"
})
function convertCookieStrToCookieObj(str){
    if(!str){
        return {};
    }
    return JSON.parse(str);
}