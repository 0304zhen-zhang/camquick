$(function() {
	
	$('.div9 .span1').tap(function(){
		$(this).css({
			background:"url(img/zan@2x.png) no-repeat  0.4rem 0.12rem",
			color:"#e62129"
		})
		localStorage.setItem('style', JSON.stringify({color:"#e62129",background:"url(img/zan@2x.png) no-repeat  0.4rem 0.12rem"}))
	})
	var key_a=localStorage.getItem('style');
	
	console.log(key_a)
	
})