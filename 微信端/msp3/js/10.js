$(function() {
	$('.msg_nav li').on('click',function(){
		$(this).addClass("show").siblings().removeClass("show");
		//注意此处的>千万不能忘
        $("#tab>div:eq("+$(this).index()+")").addClass("apper").siblings().removeClass("apper");
	})
	$(".tab_one li").on('click',function(){
		$(this).addClass("active").siblings().removeClass("active");
	})
})