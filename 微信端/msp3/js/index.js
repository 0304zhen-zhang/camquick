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
		$(".middle1 .tit").html($(this).children(".span").html())
	})
//	点击大头针 出现下单页面
	$(".msp").click(function () {
		$("#first_order").slideDown("slow");
		$("#black").show();
	});
//	点击返回,返回首页
	$('.first').click(function(){
		$("#first_order").css("display","none");
	})
//	摄影师详情页
	$(".middle3 .choose ").click(function(){
//		alert(1)
		$("#details").addClass("up");
	})
	$(".middle3 .price").click(function(){
		$(".people").addClass("up");
	})
	$(".close").click(function(){
		$("#details").removeClass("up");
		$(".people").removeClass("up");
	})
	$(".content1").click(function(){
		$("#details").removeClass("up");
		$(".choose p").html("人民摄影师");
		$(".choose p").css("background","url(img/g.jpg) no-repeat center");
		$('.middle3 b').html('60分钟/9张/99元');
		
	})
	
	$(".content2").click(function(){
		$("#details").removeClass("up");
		$(".choose p").html("优选摄影师");
		$(".choose p").css("background","url(img/2.jpg) no-repeat center");
		$('.middle3 b').html('60分钟/12张/199元')
	})
	$(".content3").click(function(){
		$("#details").removeClass("up");
		$(".choose p").html("金牌摄影师");
		$(".choose p").css("background","url(img/3.jpg) no-repeat center");
		$('.middle3 b').html('60分钟/12张/399元')
	})
//	替他人约拍
	$(".sure").click(function(){
		var uName = $('input[id=user]').val();
//		console.log(uName)
		var uTel = $('input[id=tel]').val();
        if(uTel == '' && uName == ""){
        	
            $('.message').html('请输入您手机号或姓名!');
            $('.message').css('display','block');
        }
        else if(uTel.length != 11 || isNaN(uTel) || !/^1[3578]\d{9}$/.test(uTel)){
           
            $('.message').html('手机号格式不正确 请重新输入!');
            $('.message').css('display','block');
        }else{
        	
        		$("#other_box").css("display","none");  
        		$(".middle2 .strong").html(uName);
        		document.title="马上拍"
        	
        }
		
	})
	$(".oneself").click(function(){
		$("#other_box").css("display","none"); 
	})
	$(".film").click(function(){
		$("#other_box").css("display","block")
		document.title="为他人约拍"
	})
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

	})
//	点击按钮进入通知摄影师界面
	$(".middle4 .button").click(function(){
		window.location.href ='notice.html';
	})
	// 百度地图API功能
	var map = new BMap.Map("container"); // 创建Map实例
	var point = new BMap.Point(116.3964,39.9093); // 创建点坐标,其中116.404表示经度，39.915表示纬度。
	map.centerAndZoom(point,13);//初始化地图,设置中心点坐标和地图级别。
	map.enableScrollWheelZoom();//开启鼠标滚轮缩放
	map.setCurrentCity("北京");  // 设置地图显示的城市 此项是必须设置的 
//	var marker = new BMap.Marker(point); // 创建标注  
//	map.addOverlay(marker); // 将标注添加到地图中

	

})