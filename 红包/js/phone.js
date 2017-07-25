$(function(){
	
	//验证注册数据是否合法
    function check(rules,str){
        var reg = new RegExp(rules);
        return reg.test(str);
    }  
	//验证用户名格式
    $('.username').blur(function(){
        var value=$(this).val();
        var reg=/^[1-3]\d{10}$/;
        if(!check(reg,value)){
        	$(".errMsg").html("");
            $('.errMsg').html('手机格式不正确');
        }
        if(value==""){
           $(".errMsg").html("");
           $('.errMsg').html('输入手机号领取红包');
        }
        if(check(reg,value)){
        	$(".errMsg").html("");
			$('.errMsg').html('领取成功');
			$('.button').click(function(){
				$("#get").css("display","block");
				$(".main_container").css("display","none");
				$(".tel").html(value)
			})
        }
    })
//  取消修改
    $(".cancel").click(function(){
		$(".cell_phone").css("display","none");
		$("#get").css("display","block");
		$(".revise").css("display","none");
	})
//  修改
	$("#get .change").click(function(){
		$(".cell_phone").css("display","none");
		$("#get").css("display","none");
		$(".revise").css("display","block");
	})
//	修改确定
	$('.sure').click(function(){
		alert(1)
		var uName = $('input[class="change_phone"]').val();
		if(uName == ''){
	        	
	       $(".msg").html("");
	       $('.msg').html('请输入修改后的手机号');
	    }
	    else if(uName.length != 11 || isNaN(uName) || !/^1[3578]\d{9}$/.test(uName)){
	       
	        $(".msg").html("");
	        $('.msg').html('手机格式不正确');
	    }else{
	    	$(".cell_phone").css("display","none");
			$("#get").css("display","block");
			$(".revise").css("display","none");
			$(".num").html(uName);
	    }
    })
//	点击立即使用
	$(".user").click(function(){
		location.href="load.html";
	})
//	$(".back").click(function(){
//		$("#get").css("display","block");
//		$(".main_container").css("display","none");
////		$(".tel").html(value)
//	})
})