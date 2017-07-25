$(function(){
	//FastClick解决延迟问题
	var notNeed = FastClick.notNeeded(document.body);
	$.fn.triggerFastClick=function(){
	    this.trigger("click");
	        if(!notNeed){
	        this.trigger("click");
	    }
	}
	var total = 46;
	var zWin = $(window);
	var render = function(){
		var str = '';
		for(var k=total;k>0;k--){
			str+='<li data-id="'+k+'" class="animated bounceIn list" ><p class="img" style="background:url(img/'+k+'.jpg?1.2) no-repeat 50% 30%;"></p></li>';	
		}
		$('#container').html(str);	
	}
	render();	
//	下拉刷新
	refresher.init({
		id:"wrapper",
		pullDownAction:Refresh,	
	});
	var generatedCount = 0;
	function Refresh() {
		setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
			var el, li, i;
			el =document.querySelector("#wrapper ul");
			el.innerHTML='';
			for (var i=total;i>0;i--) {
				li = document.createElement('li');
				li.innerHTML = '<li data-id="'+i+'" class="animated bounceIn list" ><p class="img" style="background:url(img/'+i+'.jpg?1.2) no-repeat 50% 30%;"></p></li>';	
			el.insertBefore(li, el.childNodes[0]);
			}	
			myScroll.refresh();/****remember to refresh when you action was completed！！！****/
		}, 1000);
	}
	
	//img懒加载
	$("img").lazyload({
	    effect: "fadeIn"
	});
	
	//	点击出现大图			
	var wImage = $('#large_img');
	var domImage = wImage[0];
	var loadImg = function(id,callback){
		$('#large_container').css({
			width:zWin.width(),
			height:zWin.height(),
		}).fadeIn()
		$(".close").css("z-index","999").fadeIn(2000);
	
		var imgsrc = 'img/'+id+'.large.jpg';
		var ImageObj = new Image(); 
		ImageObj.onload = function(){
			var w=this.width;
			var h=this.height;
			var winWidth = zWin.width();
			var winHeight = zWin.height();
		    var realw =  winHeight*w/h;
			var realh = winWidth*h/w;
			var paddingLeft=parseInt((winWidth -realw)/2);
			var paddingTop=parseInt((winHeight - realh)/2);
			wImage.css('width','auto').css('height','auto');
			wImage.css('padding-left','0px').css('padding-top','0px');
		
			if(h/w>1.2){
				 wImage.attr('src',imgsrc).css('height',winHeight).css('padding-left',paddingLeft);
			}else{	
				 wImage.attr('src',imgsrc).css('width',winWidth).css('padding-top',paddingTop);
				}
			callback&&callback();
			
		}		
		ImageObj.src = imgsrc;
		//左右滑动
		$('#large_img').swipe({
			swipe:function(event, direction, distance){
				if(direction=="left"&&cid>1){
					cid--;
					loadImg(cid,function(){
						domImage.addEventListener('webkitAnimationEnd',function(){
							wImage.removeClass('animated slideInRight');
							domImage.removeEventListener('webkitAnimationEnd',false);	
						},false);
						wImage.addClass('animated slideInRight');	
					})
				}else if(direction=="right"&&cid<total){
					cid++;
					loadImg(cid,function(){
						domImage.addEventListener('webkitAnimationEnd',function(){
							wImage.removeClass('animated slideInLeft');
							domImage.removeEventListener('webkitAnimationEnd',false);
						},false);
						wImage.addClass('animated slideInLeft');
					});
					
				}else{
					cid = cid;
				}

			}

		})		
	}	
	var cid;
	$('#container').delegate('li','click',function(){
		var _id = cid = $(this).attr('data-id');
		loadImg(_id);	
		
	});
	//单击大图返回img列表
	$('#large_container').click(function(){
		$('#wrapper').css({height:'auto','overflow':'auto'})
		$('#large_container').fadeOut();
		$(".close").fadeOut();
	});
	$('.close').click(function(){
		$('#wrapper').css({height:'auto','overflow':'auto'})
		$('#large_container').fadeOut();
		$(".close").fadeOut();
	});
	$('#large_container').mousedown(function(ev){
		if(ev){
			ev.preventDefault();
		} else {
			event.returnValue = false;
		}
		return false;
	});
	
})

     
     