$(function() {
	$(".hot li").click(function(){
		$(".now span").html($(this).html());
		
		
	})
	$(".city li a").click(function(){
		$(".now span").html($(this).html());
	})
	
})