﻿$(function(){
	//FastClick解决延迟问题
//	var notNeed = FastClick.notNeeded(document.body);
//	$.fn.triggerFastClick=function(){
//	    this.trigger("click");
//	        if(!notNeed){
//	        this.trigger("click");
//	    }
//	}
	var total = 45;
	var zWin = $(window);
	var render = function(){
		var li = '';
		var padding = 1;
		var winWidth = $(window).width();
		var picWidth = Math.floor((winWidth-padding*2)/3);
		var picHeight = picWidth*2/3;
		for(var i=total;i>0;i--){
			var p = padding;
			var imgSrc='img/'+i+'.jpg';
//			此处total/3余几
			if(i%3==0){
				p = 0;
			}
			li+='<li data-id="'+i+'" class="animated bounceIn" style="width:'+picWidth+'px;height:'+picHeight+'px;padding-left:'+p+'px;padding-top:'+padding+'px;"><canvas id="cvs_'+i+'"></canvas></li>';	
			var ImageObj = new Image();
			ImageObj.index=i;
			ImageObj.onload = function(){
				var cvs=$('#cvs_'+this.index)[0].getContext('2d');
				cvs.width=this.width;
				cvs.height=this.height;
				if(cvs.width/cvs.height>=1){
					cvs.drawImage(this,8,8,cvs.width,cvs.height,0,0,cvs.width,cvs.height);
				}else{
					cvs.drawImage(this,0,38,cvs.width,cvs.height,0,0,cvs.width,cvs.height);
				}
			}
			ImageObj.src = imgSrc;
		}
		$('#container').html(li);
	}
		render();
		
	//img懒加载
//	$("img").lazyload({
//	    effect: "fadeIn"
//	});
	
	//	点击出现大图			
	var wImage = $('#large_img');
	var domImage = wImage[0];
	var li='';
	var loadImg = function(id,callback){
//		$('#container').css({height:zWin.height(),'overflow':'hidden'})
		$('#large_container').css({
			width:zWin.width(),
			height:zWin.height(),
		}).show()
		$(".close").css("z-index","999").show(2000);
	
		var oli=imgsrc = 'img/'+id+'.large.jpg';
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
		
			if(h/w>1.5){
				 wImage.attr('src',imgsrc).css('height',winHeight).css('padding-left',paddingLeft);
			}else{	
				 wImage.attr('src',imgsrc).css('width',winWidth).css('padding-top',paddingTop);
				}
			callback&&callback();
			
		}		
		ImageObj.src = imgsrc;
		
	}	
	
	var cid;
	$('#container').delegate('li','tap',function(){
		var _id = cid = $(this).attr('data-id');
		loadImg(_id);		
	});
	//单击大图返回img列表
	$('#large_container').tap(function(){
		$('#container').css({height:'auto','overflow':'auto'})
		$('#large_container').hide();
		$(".close").hide();
	});
	$('.close').tap(function(){
		$('#container').css({height:'auto','overflow':'auto'})
		$('#large_container').hide();
		$(".close").hide();
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

     