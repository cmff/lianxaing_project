class Cart{
    constructor(){
        this.blank =document.querySelector(".blank");
        this.button = document.querySelector(".blank button")
        this.init();
    }
    init(){
        let storage = window.localStorage;
        let storage_str = storage.getItem('carts') ? storage.getItem('carts') : '';
        let storage_arr=Array.from(storage_str);
        //判断是否有商品信息
        if(storage_arr.length==2){
            this.blank.style.display = 'block';
            this.button.onclick=function(){
                location.href = "http://localhost/lianxiang_project/dist/pages/list.html";
            }
        }else{
            //转对象
            let storage_obj = convertStrToObj(storage_str);
            for (let key in storage_obj){
                let good = storage_obj[key];
                let str =`
                <ul class="goodInfo container" data-good-id="${key}">
                <li class = "xuan">
                <input type="checkbox">
            </li>
            <li><img src=${good.src} />
                <div>${good.name}</div>
            </li>
            <li></li>
            <li>${good.price}</li>
            <li class="num">
                <a href="javascript:;" class="minus">-</a>
                <input type="text" name="" id="" value="${good.num}" />
                <a href="javascript:;" class="plus">+</a>
            </li>
            <li class="total">${good.num*good.price}</li>
            <li><a href="javascript:;" class="del">删除</a></li>
            </ul> 
           `;
                $('#main').append(str);
            }
            let str2 =" ";
            str2 = ` <ul class="goodFoot container" >
            <li class = "all">
                <input type="checkbox">
                <a href="javascript:;">全选</a>
            </li>
            <li>
                <p class ="total-price1">商品总价：计算中...</p>
            </li>
        </ul>`;
        $('#pay').append(str2);
            //获取所有的-
            let minus = document.querySelectorAll('.goodInfo .minus');
            //添加事件
            for(let i = 0,len = minus.length;i < len;i ++){
                minus[i].onclick = function(){
                    //获取id
                    let goodId = document.querySelector(".goodInfo").getAttribute('data-good-id');
                    //创建storage
                    let storage = window.localStorage;
                    //获取内容
                    let storage_str = storage.getItem('carts') ? storage.getItem('carts') : '';
                    //转对象
                    let storage_obj = convertStrToObj(storage_str);
                    //改变数量
                    if(storage_obj[goodId].num > 1){
                        storage_obj[goodId].num --;
                    }
                    //存入storage
                    storage.setItem('carts',JSON.stringify(storage_obj));
                    //改变数量框中数量
                    this.nextElementSibling.value = storage_obj[goodId].num;
                    //改变金额的值
                    this.parentNode.nextElementSibling.innerHTML = storage_obj[goodId].price * storage_obj[goodId].num;
                }
            }
            //获取所有的+
            let plus = document.querySelectorAll('.goodInfo .plus');
            for(let i = 0,len = plus.length;i < len;i ++){
                plus[i].onclick = function(){
                    let id = this.parentNode.parentNode.getAttribute('data-good-id');
                    //创建storage
                    let storage = window.localStorage;
                    //获取内容
                    let storage_str = storage.getItem('carts') ? storage.getItem('carts') : '';
                    //转对象
                    let storage_obj = convertStrToObj(storage_str);
                    //数量 + 1
                    storage_obj[id].num ++;
                    //存入storage
                    storage.setItem('carts',JSON.stringify(storage_obj));
                    //数量框
                    this.previousElementSibling.value = storage_obj[id].num;
                    //小计
                    this.parentNode.nextElementSibling.innerHTML = storage_obj[id].price * storage_obj[id].num;
                }
                //获取所有的数量框
            let num_inp = document.querySelectorAll('.goodInfo .num input');
            for(let i = 0,len = num_inp.length;i < len ;i ++){
                num_inp[i].onblur = function(){
                    let id = this.parentNode.parentNode.getAttribute('data-good-id');
                     //创建storage
                     let storage = window.localStorage;
                     //获取内容
                     let storage_str = storage.getItem('carts') ? storage.getItem('carts') : '';
                     //转对象
                     let storage_obj = convertStrToObj(storage_str);
                     if(isNaN(this.value) || this.value < 1){
                         this.value = 1;
                     }
                     storage_obj[id].num = this.value;
                    //存入storage
                    storage.setItem('carts',JSON.stringify(storage_obj));
                    //数据变量
                    // this.value = storage_obj[id].num;
                    this.parentNode.nextElementSibling.innerHTML = storage_obj[id].price * storage_obj[id].num;
                }
            }
            //获取所有的删除按钮
            let del = document.querySelectorAll('.goodInfo .del');
            for(let i = 0,len = del.length;i < len;i ++){
                del[i].onclick = function(){
                    let id = this.parentNode.parentNode.getAttribute('data-good-id');
                     //创建storage
                     let storage = window.localStorage;
                     //获取内容
                     let storage_str = storage.getItem('carts') ? storage.getItem('carts') : '';
                     //转对象
                     let storage_obj = convertStrToObj(storage_str);
                     //delete ：删除对象中的属性
                     delete storage_obj[id];
                      //存入storage
                    storage.setItem('carts',JSON.stringify(storage_obj));
                    this.parentNode.parentNode.remove();
                }

            }

        }
        //获取所有的数量框
        let num_inp = document.querySelectorAll('.goodInfo .num input');
        for(let i = 0,len = num_inp.length;i < len ;i ++){
            num_inp[i].onblur = function(){
                let id = this.parentNode.parentNode.getAttribute('data-good-id');
                 //创建storage
                 let storage = window.localStorage;
                 //获取内容
                 let storage_str = storage.getItem('carts') ? storage.getItem('carts') : '';
                 //转对象
                 let storage_obj = convertStrToObj(storage_str);
                 if(isNaN(this.value) || this.value < 1){
                     this.value = 1;
                 }
                 storage_obj[id].num = this.value;
                //存入storage
                storage.setItem('carts',JSON.stringify(storage_obj));
                //数据变量
                this.value = storage_obj[id].num;
                this.parentNode.nextElementSibling.innerHTML = storage_obj[id].price * storage_obj[id].num;
            }
        }
        //获取所有的删除按钮
        let del = document.querySelectorAll('.goodInfo .del');
        for(let i = 0,len = del.length;i < len;i ++){
            del[i].onclick = function(){
                alert('确认删除吗？')
                let id = this.parentNode.parentNode.getAttribute('data-good-id');
                 //创建storage
                 let storage = window.localStorage;
                 //获取内容
                 let storage_str = storage.getItem('carts') ? storage.getItem('carts') : '';
                 //转对象
                 let storage_obj = convertStrToObj(storage_str);
                 //delete ：删除对象中的属性
                 delete storage_obj[id];
                 
                  //存入storage
                storage.setItem('carts',JSON.stringify(storage_obj));
                this.parentNode.parentNode.remove();
                location.reload()
            }
        }
        //获取所有的全选按钮
         let xuan = document.querySelectorAll('.xuan input');
         let all =document.querySelectorAll(".all input");

         for (var i = 0; i < all.length; i++) {
            let on_off = true;
            all[i].onclick = function() {
                if (on_off) {
                    let a = 0;
                    for (let j = 0; j < xuan.length; j++) {
                        xuan[j].checked = true;
                        // 选中所有商品 计算数量 计算总价  渲染页面		
                        a += Number($(".total").html());
                    }
                    $(".total-price1").html("商品总价:￥" + a.toFixed(2) + "元");
                    on_off = false;
                } else {
                    for (var j = 0; j < xuan.length; j++) {
                        xuan[j].checked = false;
                    }
                    on_off = true;
                    $(".total-price1").html("商品总价:￥0.00元");
                }
            }
        }
        //点击选择
       /*  $(".xuan input").click(function  (){
            // console.log(this.checked);
            let b = Number($(".total").html());
            let re = /((\d|\.)+)/;
            let sum = parseInt($(".total-price1").html())
           /*  let sum = Number(re.exec($(".total-price1").html())[1]); */
            // console.log($(".total-price1").html());
            // if (this.checked) {
            //     // 选中时计算商品总价
            //     $(".total-price1").html("总计应付:<br>￥" + (b).toFixed(2) + "元");
            // } else {
            //     // 选中时计算商品总价
            //     $(".total-price1").html("总计应付:￥" + (sum - b).toFixed(2) + "元");
            // }

    }
}
}
function convertStrToObj(str){
    if(!str){
        return {};
    }else{
        return JSON.parse(str);
    }
}
window.onload = function(){
    new Cart();
}
var login = document.cookie;
        if(!login.split(";")[1]){
            $("head").append("<meta http-equiv='refresh'content='0.1;url=http://localhost/lianxiang_project/dist/pages/login.html'></meta http-equiv>")
        }
