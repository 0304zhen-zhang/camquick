$(function(){
//弹框出现和消失
	$(".apply").tap(function(){
		$("#cont").show();
		$("#box").show();
		
	})
	$(".close").tap(function(){
		$("#cont").hide();
		$("#box").hide();
	})
	
	$('#user').on('tap',function(){
		$('.message').css('visibility','hidden');
	})
	$("#cont #btnSendCode").on('touchend',function(){
		//alert(1)
		$('#user').css('border-color', 'red');
        var uName = $('input[id=user]').val();
        if(uName == ''){
        	
            $('.message').html('请输入您手机号!');
            $('.message').css('visibility','visible');
        }
        else if(uName.length != 11 || isNaN(uName) || !/^1[3578]\d{9}$/.test(uName)){
           
            $('.message').html('手机号格式不正确 请重新输入!');
            $('.message').css('visibility','visible');
        }else{
        	$("#shadow").show();
        	var code = ""; //验证码
			curCount = count;
			var dealType; //验证方式
			var uid=$("#uid").val();//用户uid
			var phone = $("#user").val();
			//产生验证码
			for (var i = 0; i < 4; i++) {
				code += parseInt(Math.random() * 9).toString();
			}
			console.log(code);
			//设置button效果，开始计时
//			$("#btnSendCode").attr("disabled", "disabled");
			SetRemainTime()
			$("#btnSendCode").val( + curCount + "秒再获取");
			InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
			//以下为ajax区域－－－－－－
			$.ajax({
				type: "POST", //用POST方式传输
				dataType: "json", //数据格式:JSON
				url: $('.codeNum').attr('top'), //目标地址
				data: "phone=" + phone +"&uid=" + uid + "&code=" + code,
				error: function (XMLHttpRequest, textStatus, errorThrown) {},
				success: function (msg){ 
//					alert(2)
					switch(msg){
						case '0':
							$('.message').html('手机号已注册过 或已接受过邀请！').css('visibility','visible');
							window.clearInterval(InterValObj);//停止计时器
							$("#btnSendCode").val("发送验证码");
							code = ""; //清除验证码。如果不清除，过时间后，输入收到的验证码依然有效 
						break;

						case '2':
							$('.message').html('发送失败！').css('visibility','visible');
							window.clearInterval(InterValObj);//停止计时器
							$("#btnSendCode").val("发送验证码");
							code = ""; //清除验证码。如果不清除，过时间后，输入收到的验证码依然有效 
						break;

						default:
						$("#acode").val(msg);
						break;

					}
				
				}
			});
			
        }
	})
	
	var InterValObj; //timer变量，控制时间
	var count = 60; //间隔函数，1秒执行
	var curCount;//当前剩余秒数
	//timer处理函数
	function SetRemainTime() {
		
		if (curCount == 0) {                
			window.clearInterval(InterValObj);//停止计时器
			$("#btnSendCode").removeAttr("disabled");//启用按钮
			$("#shadow").hide();
			$("#btnSendCode").val("发送验证码");
			code = ""; //清除验证码。如果不清除，过时间后，输入收到的验证码依然有效    
		}
		else {
			curCount--;
			$("#btnSendCode").val( + curCount + "秒再获取");
		}
	}
		
    
    $('.btn').click(function(){
    	$('#code').css('border-color','red');
    	var sureInner = $('input[id=code]').val();	
        var codeInner = $("#acode").val();//获取的验证码的值
        
		if(sureInner == ''){
            $('.message').html('请输入验证码！').css('visibility','visible');
      	} else if(sureInner != codeInner){
      		$('.message').html('验证码错误！').css('visibility','visible');
      	} else {
      		window.location.href ='load.html';
      	}
       	
       
		
    });

})


