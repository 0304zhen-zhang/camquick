$(function() {
	$("#five .choose ").click(function(){
		$("#wrap").show();
		$("section").fadeOut()
	})
	$(".close").click(function(){
		$("#wrap").css("display","none");
		$("section").show()
	})
	$(".content1").click(function(){
		$("#wrap").css("display","none");
		$("section").show();
		$(".choose p").html("人民摄影师");
		$(".choose p").css("background","url(img/twoyear.jpg) no-repeat 50% 24%")
	})
	$(".content2").click(function(){
		$("#wrap").css("display","none");
		$("section").show();
		$(".choose p").html("优选摄影师");
		$(".choose p").css("background","url(img/fiveyear.jpg) no-repeat 50% 24%")
	})
	$(".content3").click(function(){
		$("#wrap").css("display","none");
		$("section").show();
		$(".choose p").html("金牌摄影师");
		$(".choose p").css("background","url(img/tenyear.jpg) no-repeat 50% 24%")
	})
})