class Details{
    constructor(){
        //插入数据
        this.cont = document.querySelector(".msg");
        this.look = document.querySelector('.look');
        this.url = "http://localhost/lianxiang_project/dist/libs/data/goods.json";
        // 请求数据
        this.load();
        this.getId();
    }
    getId(){
        this.id = location.search.slice(1).split("=")[1];
    }
    load(){
        var that = this;
        $.getJSON(this.url,function(data){
            that.display(data);
        })
    }
    display(data){
        console.log(data)
        data.forEach(val => {
            if(val.goodsId === this.id){
                this.cont.innerHTML = `
                <h2>${val.name}</h2>
                <h4>${val.type}</h4>
                <h3>
                <span>商城价</span>&nbsp;&nbsp;   <span class ="price">${val.price}</span> 
            </h3>
             <div class="msg-two">
                 <ul class="list-one">
                     <li>操作系统</li>
                     <li>配置</li>
                     <li>选择配置</li>
                 </ul>
                 <ul class="list-two">
                     <li> Windows 10 家庭中文版</li>
                     <li> 2020新品</li>
                     <li> 
                         <p> 【i7/8GB/1TB HDD 256G SSD/1660...</p>
                         <p>【i5/8GB/1TB HDD 256G SSD/1660...
                          <p>【i5/16GB/512G SSD/2060】幻影黑</p>
                          <p>【i5/16GB/512G SSD/2060】幻影黑</p>
                          <p>【i5/16GB/512G SSD/2060】幻影黑</p>
                          <p>【i5/16GB/512G SSD/2060】幻影黑</p>
                          <p>【i5/16GB/512G SSD/2060】幻影黑</p>
                          <p>【i5/16GB/512G SSD/2060】幻影黑</p>
                          <p>【i5/16GB/512G SSD/2060】幻影黑</p>
                        </li>
                 </ul>
             </div>
             <div class="msg-three">
                <ul class="list-three">
                    <li>分期付款</li>
                    <li>购买数量</li>
                </ul>
                <ul class="list-four">
                    <li> <p>花呗分期</p>
                       <p>白条分期</p>
                   </li>
                    <li>
                       <a href="javascript:;" class="minus">-</a>
                       <span>1</span>
                       <a href="javascript:;" class="plus">+</a>
                    </li>
                </ul>
            </div>
            <div class="msg-foot">
             <button class="msg-foot-one">立即购买</button>
             <button class="msg-foot-two">加入购物车</button>
            </div>
               `;
            }
        }); 
        let $buy = $(".msg-foot-one");
        let $add = $(".msg-foot-two");
       /*  //点击更改购买的件数
        $(".minus").click(function(){
           if($(".list-four span").html()=="1"){
            $(".list-four span").html(1);
           }else{
            $(".list-four span").html(parseInt($(".num span").html())-1)
           }
        });
        $("plus").click(function(){
            $(".list-four span").html(parseInt($(".num span").html())+1);
        })
        console.log($(".list-four span").html()) */
        //购物车点击跳转
        $buy.click(function () {
            location.href = "http://localhost/lianxiang_project/dist/pages/carts.html";
        });
        //添加到购物车
        $add.on('click', function (event) {
            //id
            let goodsId = location.search.slice(1).split("=")[1];
            //name
            let goodsName = $(".msg h2").html();
            //src
            let goodsSrc = $("#cont .box a").css('background-image');
            let goodsImg = goodsSrc.slice(5,goodsSrc.length-2);
            //price
            let goodsPrice = $(".msg h3 .price").html();
            //创建storage对象
            let storage = window.localStorage;
            //获取storage记录
            let storage_str = storage.getItem('carts') ? storage.getItem('carts') : '';
            //转成对象
            let storage_obj = convertStrToObj(storage_str);
            //判断当前购买商品是否在购物车中存在 
            if(goodsId in storage_obj){
            //存在:找到当前商品的数量 + 1
            storage_obj[goodsId].num ++;
            }else{
                storage_obj[goodsId] = {
                    "name" : goodsName,
                    "price" : goodsPrice,
                    "src" : goodsImg,
                    "num" : 1
                }
            }
            //重新存入storage
            storage.setItem('carts',JSON.stringify(storage_obj));

        })
        
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
    new Details();
}

