var mySwiper = new Swiper ('.swiper-container', {
    loop: true, // 循环模式选项
    autoplay:true,//自动轮播
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
      clickable :true,
      bulletElement : 'span',
      bulletClass : 'swiper-pagination-bullet',
    },
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  })   
  $( ".list-tab" ).tabso(
    {
    cntSelect:".list-wrap",
    tabEvent:"mouseover" ,
    tabStyle:"normal",
  
  }); 
  $("#example-one").on("mouseenter",".list-tab .nav",function(){
    $(".list-wrap").css("height","325px")
    $(".list-tab .nav").removeClass("active");
    $(this).addClass("active");
    $(".list-wrap ul").eq($(".list-tab .nav").index($(".active"))).css({"height":"325px","z-index":"100","background":"white"})
  })
  $("#example-one").mouseleave(function(){
    $(".list-wrap").css("height","0")
    $(".list-wrap ul").css({"height":"0","overflow":"hidden"})
  })
  $(".list-tab .nav").mouseleave(function(){
    $(".list-wrap ul").eq($(".list-tab .nav").index($(".active"))).css({"z-index":"10"})
  })
  var login = document.cookie;
if(login.split(";")[1]){
    $(".search .icon-gouwuche").click(function(){
        location.href = "http://localhost/lianxiang_project/dist/pages/carts.html"
    })
}

class user{
  constructor(){
      this.msg = $(".search .login");
      this.logout = $("#logout");
      this.init();
      this.addEvent();
  }
  init(){
      this.mStr = $.cookie("login") ? $.cookie('login') : '';
      this.mObj = this.convertCookieStrToCookieObj(this.mStr);
      for(var i in this.mObj){
           if(i){
              this.msg.html(i);
          }
      }
  }
  convertCookieStrToCookieObj(str){
      if(!str){
          return {};
      }
      return JSON.parse(str);
  }
  addEvent(){
      var that = this;
      this.logout.click(function(){
          $.removeCookie('login',{expires : 7,path : '/'})
          location.reload();
      })
  }
}
new user;

