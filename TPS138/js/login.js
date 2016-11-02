$('#header_wrapper').load('header-footer.html .header',function(){
	header();
	judgeLogin();
	getCart();
});
$('#footer_wrapper').load('header-footer.html .footer')


//登录函数
function logIn(){
	//alert($.cookie('regName'))
	$('.login_btn').click(function(){
		//alert(1)
		var logName = $('input[name=loginName]').val();
		var logPwd = $('input[name=loginPwd]').val();
		//console.log(logName +'+'+ logPwd)
		//$('input[name=loginPwd]').nextAll('p').css('display','block').html('* 您的邮箱/ID不存在。')
		$.ajax({
			url:"http://datainfo.duapp.com/shopdata/userinfo.php",
			type:"POST",
			data:{
				status:"login",
				userID:logName,
				password:logPwd
			},
			success:function(res){
				switch(res){
					case "0":$('input[name=loginPwd]').nextAll('p').css('display','block').html('* 您的邮箱/ID不存在。');
					$('input[name=loginPwd]').val('');
					break;
					case "2":$('input[name=loginPwd]').nextAll('p').css('display','block').html('* 您输入的密码错误。');
					$('input[name=loginPwd]').val('');
					break;
					default:window.location.href='index.html';
					$.cookie('userName',logName,{expires:99,path:'/'});
					$.cookie('userPwd',logPwd,{expires:99,path:'/'});
					//alert(1);
					break;
				}
				
			}
		})
	})
}//logIn函数结束
logIn();
// 判断是否注册
$(function(){
	//console.log($.cookie('regName'))
	if($.cookie('regName') != null){
		//console.log('不等于')
		$('input[name=loginName]').val($.cookie('regName')).css('background','lightgoldenrodyellow');
		$('input[name=loginPwd]').val($.cookie('regPwd')).css('background','lightgoldenrodyellow');
	}
			
})

function register(){
	//
	//注册输入框的判断
	$('input[name=regName]').blur(function(){
		var regName = $(this).val();
		//alert(regName)
		//判断是否符合邮箱、手机格式
		if(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(regName) || /^[1][0-9]{10}$/.test(regName)){// 符合正则，进一步判断是否可用
			//alert(1);
			//$(this).nextAll('span').css('background-position','-33px 0px')
			// 用登录接口，检验输入的用户名是否已经存在
			$.ajax({
				url:"http://datainfo.duapp.com/shopdata/userinfo.php",
				type:"POST",
				data:{
					status:"login",// 登录接口
					userID:regName,
				},
				success:function(res){
					//alert(res)
					//console.log($(this))
					// 返回值为0，代表用户名不存在，
					// 返回值为2，代表密码错误，
					if(res != 0){// 当返回值不为0时，代表用户名已存在，则报错，提醒“用户名已存在”
						$('input[name=regName]').nextAll('p').css('display','block').html('用户名已存在').end().nextAll('span').css('background-position','-14px 0px');
					}else{//当返回值为0的时候，用户名不存在，则代表注册的用户名可用
						$('input[name=regName]').nextAll('p').css('display','none').end().nextAll('span').css('background-position','-33px 0px');
						return true;
					}
					/*switch(res){
						case "0":$('input[name=regName]').nextAll('p').css('display','block').html('用户名已存在').end().nextAll('span').css('background-position','-14px 0px');
						break;
						case "1":$('input[name=regName]').nextAll('p').css('display','none').end().nextAll('span').css('background-position','-33px 0px');
					}*/
				}
			})
		}else{// 不符合正则，则提醒输入错误
			//alert(2)
			//console.log($(this).nextAll('p'))
			$(this).nextAll('p').css('display','block')
			$(this).nextAll('span').css('background-position','-14px 0px')
		}
	})
	// 密码输入框判断
	$('input[name=regPwd]').blur(function(){
		var regPwd = $('input[name=regPwd]').val();
		if(/^\w{6,18}$/.test(regPwd) && !/^[0-9]{6,18}$/.test(regPwd)){
			$(this).nextAll('span').css('background-position','-33px 0px');
			$(this).nextAll('p').css('display','none')
			return true;
		}else{
			$(this).nextAll('p').css('display','block')
			$(this).nextAll('span').css('background-position','-14px 0px')
		}
	})
	// 验证码判断
	
	$('input[name=regCode]').blur(function(){
		//console.log( $('input[name=Code]').val())
		if($(this).val() == $('.ipt_code').html()){
			$(this).nextAll('p').css('display','none')
			$(this).nextAll('span').css('background-position','-33px 0px');
			return true;
		}else{
			$(this).nextAll('p').css('display','block')
			$(this).nextAll('span').css('background-position','-14px 0px')
		}
	})
	//必选项
	//alert($('input[type=checkbox]').is(':checked'))
	/*if($('input[type=checkbox]').is(':checked')){
			return true;
	}*/
	// 随机生成验证码
	$('.ipt_code').click(function(){
		//alert(1)
		var num = number()+''+number()+''+number()+''+number();
		$(this).html(num)
	})
	//随机数函数
	function number(){
		var a= Math.floor(Math.random()*9);
		return a; 
	}
	// 注册按钮
	$('.register_btn').click(function(){
		//alert(1)
		//console.log($('.register').find('p').eq(0))
		//alert($('.register').find('span').eq(0).css('background-position-x') == '-53px')
		var index = 0;//计数器
		for(var i=0;i<$('.register').find('p').length;i++){
			if($('.register').find('span').eq(i).css('background-position-x') == '-33px'){//通过背景图片位置判断该条信息是否符合条件，符合条件则index+1
				index ++;
				continue;
			}else if($('.register').find('span').eq(i).css('background-position-x') == '-33px' != true){//背景图片位置不对时，错误提醒信息出现
				//alert($('.register').find('p').eq(i).index());
				$('.register').find('p').eq(i).css('display','block');				
			}
		}
		//当index为3，即上边三个都满足条件，且必选框选中时，连接注册借口
		if(index == 3 && $('input[type=checkbox]').is(':checked')){
			//alert(1)
			var regName = $('input[name=regName]').val();
			var regPwd = $('input[name=regPwd]').val();
			$.ajax({
				url:"http://datainfo.duapp.com/shopdata/userinfo.php",
				type:"POST",
				data:{
					status:"register",
					userID:regName,
					password:regPwd,
				},
				success:function(res){
					if(res == 1){//注册成功后刷新页面，保存注册的账号和密码
						//alert("注册成功");
						$.cookie('regName',regName);
						$.cookie('regPwd',regPwd);
						
						window.location.href='login.html'
					}else{
						alert("系统出现错误，请稍后再试");
					}
				}

			})
		}
	})	
}//register函数结束
register();
