$(function(){
	//FastClick解决延迟问题
	var notNeed = FastClick.notNeeded(document.body);
	$.fn.triggerFastClick=function(){
	    this.trigger("click");
	        if(!notNeed){
	        this.trigger("click");
	    }
	}
	var total = 34;
	var zWin = $(window);
	var render = function(){
		var li = '';
		
//		var padding = 1;
//		var winWidth = $(window).width();
//		var picWidth = Math.floor((winWidth-padding*2)/3);
//		var picHeight = picWidth*2/3;
		for(var i=total;i>0;i--){
//			var p = padding;
//			此处total/3余几
//			if(i%3==0){
//				p = 0;
//			}
			li+='<li data-id="'+i+'" class="animated bounceIn pp" ><p class="img" style="background:url(img/'+i+'.jpg?1) no-repeat 50% 30%;"></p></li>';	
		}
		$('#container').html(li);
		
		
	}
	render();		
	//img懒加载
	$("img").lazyload({
	    effect: "fadeIn"
	});

	mui.init({
		pullRefresh: {
			container: '#pullrefresh',
//					down: {
//						callback: pulldownRefresh
//					},
			up: {
				contentrefresh: '正在加载...',
				callback: pullupRefresh
			}
		}
	});
	/**
	 * 下拉刷新具体业务实现
	 */
	function pulldownRefresh() {
		setTimeout(function() {
			var table = document.body.querySelector('.mui-table-view');
			var cells = document.body.querySelectorAll('.mui-table-view-cell');
			for (var i = cells.length, len = i + 3; i < len; i++) {
				var li = document.createElement('li');
				li.className = 'mui-table-view-cell';
				li.innerHTML = '<li data-id="'+i+'" class="animated bounceIn pp" ><p class="img" style="background:url(img/'+i+'.jpg?1) no-repeat 50% 30%;"></p></li>';
				//下拉刷新，新纪录插到最前面；
				table.insertBefore(li, table.firstChild);
			}
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
		}, 1500);
	}
	var count = 0;
	/**
	 * 上拉加载具体业务实现
	 */
	function pullupRefresh() {
		setTimeout(function() {
			mui('#pullrefresh').pullRefresh().endPullupToRefresh((++count > 2)); //参数为true代表没有更多数据了。
			var table = document.body.querySelector('.mui-table-view');
			var cells = document.body.querySelectorAll('.mui-table-view-cell');
			for (var i = cells.length, len = i + 20; i < len; i++) {
				var li = document.createElement('li');
				li.className = 'mui-table-view-cell';
				li.innerHTML = '<li data-id="'+i+'" class="animated bounceIn pp" ><p class="img" style="background:url(img/'+i+'.jpg?1) no-repeat 50% 30%;"></p></li>';
				table.appendChild(li);
			}
		}, 1500);
	}
	if (mui.os.plus) {
		mui.plusReady(function() {
			setTimeout(function() {
				//mui('#pullrefresh').pullRefresh().pullupLoading();
				mui('#pullrefresh').pullRefresh().setStopped(true);
			}, 1000);

		});
	} else {
		mui.ready(function() {
			mui('#pullrefresh').pullRefresh().pullupLoading();
		});
	}




	//	点击出现大图			
	var wImage = $('#large_img');
	var domImage = wImage[0];
	var loadImg = function(id,callback){
//		$('#container').css({height:zWin.height(),'overflow':'hidden'})
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
		$('#container').css({height:'auto','overflow':'auto'})
		$('#large_container').fadeOut();
		$(".close").fadeOut();
	});
	$('.close').click(function(){
		$('#container').css({height:'auto','overflow':'auto'})
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




