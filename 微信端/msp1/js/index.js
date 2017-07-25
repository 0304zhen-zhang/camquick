$(function() {
	$(".adress").click(function(){
		$(".box").toggle()
	})
	$("#nav ul li").click(function(){
		$(this).addClass("active").siblings().removeClass("active");
	})
	$(".switch_city span").click(function(){
		$(".city_box").css("display","block");
		$(".main").hide()
	})
//	city_box
	$(".hot li").click(function(){
		$(".now span").html($(this).html());
		$(".adress").html($(this).html());
		$(".city_box").css("display","none");
		$(".box").css("display","none");
		$(".main").show();
	})
	$(".city li a").click(function(){
		$(".now span").html($(this).html());
		$(".adress").html($(this).html());
		$(".city_box").css("display","none");
		$(".box").css("display","none");
		$(".main").show();
//alert($(this).html())
	})
	
	// 百度地图API功能
	// 创建地图对象并初始化
var mp = new BMap.Map("map_container",{
    enableHighResolution: true //是否开启高清
});
var point = new BMap.Point(116.404, 39.915);
mp.centerAndZoom(point, 14); //初始化地图
mp.enableInertialDragging(); //开启关系拖拽
mp.enableScrollWheelZoom();  //开启鼠标滚动缩放

// 添加定位控件
var geoCtrl = new BMap.GeolocationControl({
    showAddressBar       : true //是否显示
    , enableAutoLocation : false //首次是否进行自动定位
    , offset             : new BMap.Size(0,25) 
    //, locationIcon     : icon //定位的icon图标
});

//监听定位成功事件
geoCtrl.addEventListener("locationSuccess",function(e){
        console.log(e);
});

//监听定位失败事件
geoCtrl.addEventListener("locationError",function(e){
        console.log(e);
});

// 将定位控件添加到地图
mp.addControl(geoCtrl);

//检索类型
var type = "";
type = LOCAL_SEARCH ;   //周边检索
//type = TRANSIT_ROUTE; //公交检索
//type = DRIVING_ROUTE; //驾车检索

//创建鱼骨控件
var navCtrl = new BMap.NavigationControl({
        anchor: BMAP_ANCHOR_TOP_LEFT //设置鱼骨控件的位置
});
// 将鱼骨添加到地图当中
mp.addControl(navCtrl);


//创建检索控件
var searchControl = new BMapLib.SearchControl({
    container : "searchBox" //存放检索控件的容器
    , map     : mp          //检索的关联地图
    , type    : type        //检索类型
});

//document.getElementById("selectType").onchange = function () {
//  searchControl.setType(this.value);
//};

  
//添加路况控件
//var ctrl = new BMapLib.TrafficControl({
// showPanel: false //是否显示路况提示面板
//});      
//mp.addControl(ctrl);
//ctrl.setAnchor(BMAP_ANCHOR_TOP_RIGHT);

	
})