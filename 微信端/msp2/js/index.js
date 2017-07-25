$(function() {
//	点击头部地址，让阴影盒子出现和消失
	$('.adress').click(function(){
		if($("#shadow").is(":hidden")){
			$("#shadow").show();
			$('.adress').css('background',"url(img/shang.png) no-repeat 66% 0.3rem");
		} else{
			$("#shadow").hide();
			$('.adress').css('background',"url(img/xia.png) no-repeat 66% 0.3rem");
		}
	})
	$(".switch_city_b").click(function(){
		$("#shadow").hide();
		$('.adress').css('background',"url(img/xia.png) no-repeat 66% 0.3rem");
	})
//	点击切换城市,城市列表出现
	$(".switch_city span").click(function(){
		$("#city_box").css("display","block");
		$("#shadow").css("display","none");
		$('.adress').css('background',"url(img/xia.png) no-repeat 66% 0.3rem");
	})
	
	
//	tab切换
	$(".main_nav ul li").click(function(){
		$(this).addClass("active").siblings().removeClass("active");
		$(".main_tap>div:eq("+$(this).index()+")").addClass("show");
		$(".main_tap>div:eq("+$(this).index()+")").siblings().removeClass("show");
	})
//	点击轻写真,出现拍摄类型
	$(".middle1").click(function(){
		$(".pho_type").slideDown("slow");
	})
	$(".pho_type ul li").click(function(){
		$(".pho_type").fadeOut("slow");
		$(".middle1 .tit").html("")
		$(".middle1 .log").html($(this).children(".img").html())
		$(".middle1 .tit").html($(this).children(".span").html())
	})
//	点击大头针 出现下单页面
	$(".msp").click(function () {
		$("#first_order").slideDown("slow");
	});
//	点击返回,返回首页
	$('.first').click(function(){
		$("#first_order").css("display","none");
	})
//	摄影师详情页
	$(".middle3 .choose ").click(function(){
		$("#details").addClass("up");
	})
	$(".close").click(function(){
		$("#details").removeClass("up");
	})
	$(".content1").click(function(){
		$("#details").removeClass("up");
		$(".choose p").html("人民摄影师");
		$(".choose p").css("background","url(img/g.jpg) no-repeat center")
	})
	$(".content2").click(function(){
		$("#details").removeClass("up");
		$(".choose p").html("优选摄影师");
		$(".choose p").css("background","url(img/2.jpg) no-repeat center")
	})
	$(".content3").click(function(){
		$("#details").removeClass("up");
		$(".choose p").html("金牌摄影师");
		$(".choose p").css("background","url(img/3.jpg) no-repeat center")
	})
//	
	
	

//	时间
    var curr = new Date().getFullYear();
    var opt={};
	opt.date = {preset : 'date'};
	opt.datetime = {preset : 'datetime'};
	opt.time = {preset : 'time'};

  opt.default = {
		theme: 'android-holo light', //皮肤样式
        display: 'modal', //显示方式 
        mode: 'scroller', //日期选择模式
		dateFormat: 'yyyy-mm-dd',
		lang: 'zh',
		showNow: true,
		nowText: "今天",
		stepMinute: 5,
        startYear: curr - 0, //开始年份
        endYear: curr + 0 //结束年份
	};
    $('.settings').bind('change', function() {
        var demo = 'datetime';
        if (!demo.match(/select/i)) {
            $('.demo-test-' + demo).val('');
        }
        $('.demo-test-' + demo).scroller('destroy').scroller($.extend(opt['datetime'], opt['default']));
        $('.demo').hide();
        $('.demo-' + demo).show();
    });
    $('#demo').trigger('change');
       
//	city_box
	$(".hot li").click(function(){
		$(".now span").html($(this).html());
		$(".adress").html($(this).html());
		$("#city_box").css("display","none");
		$("#main").show();
	})
	$(".city li a").click(function(){
		$(".now span").html($(this).html());
		$(".adress").html($(this).html());
		$("#city_box").css("display","none");
		$("#main").show();
//alert($(this).html())
	})
	
	// 百度地图API功能
	// 创建地图对象并初始化
//	var mp = new BMap.Map("map_container",{
//	    enableHighResolution: true //是否开启高清
//	});
//	var point = new BMap.Point(116.404, 39.915);
//	mp.centerAndZoom(point, 14); //初始化地图
//	mp.enableInertialDragging(); //开启关系拖拽
//	mp.enableScrollWheelZoom();  //开启鼠标滚动缩放
//	
//	// 添加定位控件
//	var geoCtrl = new BMap.GeolocationControl({
//	    showAddressBar       : true //是否显示
//	    , enableAutoLocation : false //首次是否进行自动定位
//	    , offset             : new BMap.Size(0,25) 
//	    //, locationIcon     : icon //定位的icon图标
//	});
//	
//	//监听定位成功事件
//	geoCtrl.addEventListener("locationSuccess",function(e){
//	        console.log(e);
//	});
//	
//	//监听定位失败事件
//	geoCtrl.addEventListener("locationError",function(e){
//	        console.log(e);
//	});
//	
//	// 将定位控件添加到地图
//	mp.addControl(geoCtrl);
//	
//	//检索类型
//	var type = "";
//	//type = LOCAL_SEARCH ;   //周边检索
//	//type = TRANSIT_ROUTE; //公交检索
//	//type = DRIVING_ROUTE; //驾车检索
//	
//	//创建鱼骨控件
//	var navCtrl = new BMap.NavigationControl({
//	        anchor: BMAP_ANCHOR_TOP_LEFT //设置鱼骨控件的位置
//	});
//	// 将鱼骨添加到地图当中
//	mp.addControl(navCtrl);
	
	
	//创建检索控件
	//var searchControl = new BMapLib.SearchControl({
	//  container : "searchBox" //存放检索控件的容器
	//  , map     : mp          //检索的关联地图
	//  , type    : type        //检索类型
	//});
	
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