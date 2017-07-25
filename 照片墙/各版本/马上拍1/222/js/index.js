$(function(){
	var total = 40;
	var zWin = $(window);

	var h = $("#main").height();
	var render = function(){
		var li = '';
		var padding = 1;
		var winWidth = $(window).width();
		var picWidth = Math.floor((winWidth-padding*2)/3);

		for(var i=1;i<=total;i++){
			var p = padding;
			if(i%3==1){
				p = 0;
			}
			li+='<li data-id="'+i+'" class="animated bounceIn" style="width:'+picWidth+'px;height:'+picWidth+'px;padding-left:'+p+'px;padding-top:'+padding+'px;"><img src="img/'+i+'.jpg"></li>';
		}
			$('#container').html(li);
	}
	render();
	//img懒加载
	$("img").lazyload();
	
	//	点击出现大图			
	var wImage = $('#large_img');
	var domImage = wImage[0];
	var loadImg = function(id,callback){
		$('#container').css({height:zWin.height(),'overflow':'hidden'})
		$('#large_container').css({
			width:zWin.width(),
			height:zWin.height()
		}).show();
		
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
			$(document).swipe({
				swipe:function(e,dir){
					console.log(dir)
					if(dir=="left"){
						id = parseInt(id) + 1;
					}else if(dir=="right"){
						id = parseInt(id) - 1;
					}else{
						id = id;
					}
					console.log(id)
					loadImg(id)
				}
			})
	}
		
	var cid;
	$('#container').delegate('li','click',function(){
		var _id = cid = $(this).attr('data-id');
		loadImg(_id);
	});
	
	//双击大图返回img列表
	$("#large_img").click(function(){
		$('#container').css({height:'auto','overflow':'auto'})
		$('#large_container').hide();
		
		render();
	})
})
