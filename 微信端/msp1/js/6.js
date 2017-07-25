$(function() {
	$(".div2 ul li ").click(function(){
		$(this).children().addClass("active");
		$(this).siblings().children().removeClass("active")
	})
})