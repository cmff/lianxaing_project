class List{
constructor(){
    this.url ="http://localhost/lianxiang_project/dist/libs/data/goods.json";
    this.$goods = $("#main");
    this.load();
}
load(){
    var that =this;
    $.getJSON(this.url,function(data){
        that.display(data)
    })
}
display(data){
    let str = "";
    for(var i = 0;i<data.length;i++){
        str+=`<li index=${data[i].goodsId}">
        <a href="http://localhost/lianxiang_project/dist/pages/details.html?id=${data[i].goodsId}">
        <div>
           <img src=${data[i].imgs.largeImg[0]} alt="">
        </div>
        <h2>${data[i].name}</h2>
        <p> ${data[i].type}</p>
        <h1>${data[i].price}</h1>
        </a>
    </li>`
    }
this.$goods.append(str);
}
}
new List();