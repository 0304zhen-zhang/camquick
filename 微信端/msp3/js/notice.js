$(function(){
	timer(intDiff);
	
	// 百度地图API功能
	var map = new BMap.Map("container"); // 创建Map实例
	var point = new BMap.Point(116.3964,39.9093); // 创建点坐标,其中116.404表示经度，39.915表示纬度。
	map.centerAndZoom(point,13);//初始化地图,设置中心点坐标和地图级别。
	map.enableScrollWheelZoom();//开启鼠标滚轮缩放
	map.setCurrentCity("北京");  // 设置地图显示的城市 此项是必须设置的 
});	
	var intDiff = parseInt(120);//倒计时总秒数量
	function timer(intDiff){
		window.setInterval(function(){
			var day=0,
				hour=0,
				minute=0,
				second=0;//时间默认值		
			if(intDiff > 0){
				minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
				second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
			}
			if (minute <= 9) minute = '0' + minute;
			if (second <= 9) second = '0' + second;
			$('#minute_show').html('<s></s>'+minute);
			$('#second_show').html('<s></s>'+second);
			intDiff--;
		}, 1000);
	} 




