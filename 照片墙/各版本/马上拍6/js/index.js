$(function(){
	//FastClick解决延迟问题
	var notNeed = FastClick.notNeeded(document.body);
	$.fn.triggerFastClick=function(){
	    this.trigger("click");
	        if(!notNeed){
	        this.trigger("click");
	    }
	}
	
	var total = 200;
	var zWin = $(window);
	var render = function(){
		var li = '';
		var padding = 1;
		var winWidth = $(window).width();
		var picWidth = Math.floor((winWidth-padding*3)/4);

		for(var i=1;i<=total;i++){
			var p = padding;
			if(i%4==1){
				p = 0;
			}
			li+='<li data-id="'+i+'" class="animated bounceIn" style="width:'+picWidth+'px;height:'+picWidth+'px;padding-left:'+p+'px;padding-top:'+padding+'px;"><img src="img/'+i+'.jpg"></li>';
		}
			$('#container').html(li);
	}
	render();
	//img懒加载
	$("img").lazyload({
	    effect: "fadeIn"
	});
	
	//	点击出现大图			
	var wImage = $('#large_img');
	var domImage = wImage[0];
	var loadImg = function(id,callback){
		$('#container').css({height:zWin.height(),'overflow':'hidden'})
		$('#large_container').css({
			width:zWin.width(),
			height:zWin.height(),
//			top:$(window).scrollTop()
		}).show()
		
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
				if(direction=="left"){
					id = parseInt(id) + 1;
					loadImg(id,function(){
						domImage.addEventListener('webkitAnimationEnd',function(){
							wImage.removeClass('animated slideInRight');
							domImage.removeEventListener('webkitAnimationEnd',false);	
						},false);
						wImage.addClass('animated slideInRight');	
					})
				}else if(direction=="right" && id!==0){
					id = parseInt(id) - 1;
					loadImg(id,function(){
						domImage.addEventListener('webkitAnimationEnd',function(){
							wImage.removeClass('animated slideInLeft');
							domImage.removeEventListener('webkitAnimationEnd',false);
						},false);
						wImage.addClass('animated slideInLeft');
					});
					
				}else{
					id = id;
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
		$('#container').css({height:'auto','overflow':'auto'})
		$('#large_container').hide();
	});
	$('#large_container').mousedown(function(ev){
		if(ev){
			ev.preventDefault();
		} else {
			event.returnValue = false;
		}
		return false;
	});
	
//	返回历史页面的历史点击位置
	$(window).scroll(function(){
		var top = $(document).scrollTop();
		if(window.localStorage){
			localStorage.setItem("menuTitle",top);
		} else {
			Cookie.write("menuTitle",top);
		}
		console.log(localStorage.getItem("menuTitle"));
		
	})
	var strSroreDate = window.localStorage? localStorage.getItem("menuTitle"): Cookie.read("menuTitle");
	console.log(strSroreDate)
	$(document).scrollTop(strSroreDate);
})

     