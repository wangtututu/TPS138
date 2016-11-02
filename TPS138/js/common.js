function header(){
	
	// 顶部栏事件
	//console.log($('.Topli').length)	
	// 划入语言、货币、个人中心，显示
	$('.Topli').mouseenter(function(){
		$(this).children('ol').css('display','block')
	})
	// 划出语言、货币、个人中心，消失
	$('.Topli').mouseleave(function(){
		$(this).children('ol').css('display','none')
	})
	
	// 菜单栏事件
	// 三级菜单
	$('.allList').children('h3').mouseenter(function(){
		
		$(this).next('.allList_detail').css('display','block');

	})
	$('.allList').mouseleave(function(){
		
		$(this).children('.allList_detail').css('display','none')
		
	})
	//鼠标划入第二层菜单时，改变自身的样式，并使第三层菜单出现
	$('.allList_detail').find('dt').mouseenter(function(){
		$(this).css({
			borderLeft:'3px solid red',
			background:'#f1f1f1'
		})
		$(this).find('span').css('display','block');
		$(this).next('.submenu').eq(0).css('display','block');
		$(this).stop().animate({
			paddingLeft:'35px',
		})
	})
	//鼠标离开第二层菜单
	$('.allList_detail').find('dt').mouseleave(function(){
		
		$(this).css({
			borderLeft:'none',
			background:'#fff'
		})
		$(this).find('span').css('display','none');
		$(this).next('.submenu').eq(0).css('display','none');
		$(this).stop().animate({
			paddingLeft:'20px',
		})
	})
	//鼠标进入第三层菜单
	$('.submenu').mouseenter(function(){
		$(this).css('display','block')
		$(this).prev().css({
			borderLeft:'3px solid red',
			background:'#f1f1f1'
		})
		$(this).prev().find('span').css('display','block');
		$(this).prev().stop().animate({
			paddingLeft:'35px',
		})
	})
	//鼠标划出第三层菜单
	$('.submenu').mouseleave(function(){
		$(this).css('display','none')
		$(this).prev().css({
			borderLeft:'none',
			background:'#fff'
		})
		$(this).prev().find('span').css('display','none');
		$(this).prev().stop().animate({
			paddingLeft:'20px',
		})
	})
	//鼠标出范围后，三级菜单消失
	$('.allList_detail').mouseleave(function(){
		$(this).css('display','none')
	})
	
}//header函数结束
//header();

// 判断是否登录封装函数
function judgeLogin(){
	//console.log($.cookie('userName'))
	if($.cookie('userName')){//当存在userName时，使表头的文字改为登录用户名
		//$('#username').html('你好 '+$.cookie('userName'));
		//$('.headerTop_right').children('li').eq(2).find('a').html('注销');
		$('.headerTop_right').children('li').eq(0).html('<a class="ced plr-8 unline" class="br" href="#javascript:;">'+$.cookie('userName')+'</a> 你好 !');
		$('.headerTop_right').children('li').eq(2).html('<a class="ced plr-8 unline" href="">注销</a>')
	}else{//当不存在userName时，将文字变为登录、注册
		//alert(1)
		$('.headerTop_right').children('li').eq(0).html('<a class="ced plr-8 unline" class="br" href="login.html">登录</a>');
		$('.headerTop_right').children('li').eq(2).html('<a class="ced plr-8 unline" href="login.html">注册</a>')
	}
	
	//console.log($('.headerTop_right').children('li').eq(2).text())
	//当第二个按钮的文字为注销时，清除userName的cookie和密码
	$('.headerTop_right').children('li').eq(2).children('a').click(function(){
		//$.cookie('userName',null);
		if($('.headerTop_right').children('li').eq(2).text() == '注销'){
			$.cookie('userName',null,{path:'/'});
			$.cookie('userPwd',null,{path:'/'});
			location.reload();//重新加载页面
		}
	})	
}//judgeLogin函数结束
//judgeLogin();

//获取购物车数量封装函数
function getCart(){
	var str = $.cookie('goodscart');
	//console.log(str)
	if(str){//如果购物车的cookie存在
		var obj = eval(str);
		var num = 0;
		for(var i in obj){//遍历数组的所有对象，将所有的num相加
			num += parseInt(obj[i].num);
		}
		$('#header_cart_num').html(num);//将header的购物车数量值改变
	}
}//getCart函数结束

//获取浏览历史的封装函数
function getHistory(){
	//console.log($.cookie('history'))
	$.ajax({
		url:'jsons/newproject.json',
		type:'GET',
		success:function(res){
			//console.log($.cookie('history'))
			if($.cookie('history')){//存在浏览历史的cookie时
				var res = eval(res)
				var oHistory = eval($.cookie('history'));
				//console.log(oHistory)
				var html = '';
				for(var i in oHistory){//遍历数组，将所有的商品信息动态加载进页面
					html += '<li><div class="img_box fl"><p class="icon"><s class="imgNew" style="display:'+res[oHistory[i].id].new+'" title="新品上架"></s><s class="imgFree" style="display:'+res[oHistory[i].id].free+'" title="包邮专区"></s><s class="imgSalle" style="display:'+res[oHistory[i].id].salle+'" title="特惠促销"></s><s class="imgHot" style="display:'+res[oHistory[i].id].hot+'" title="热卖推荐"></s></p><i class="top"></i><i class="right"></i><i class="bottom"></i><i class="left"></i><a id="'+res[oHistory[i].id].id+'" class="containImg" href="javascript:;"><img src="'+res[oHistory[i].id].url+'" /></a><dl class="containTitle clear"><dt class="fl"><p><a id="'+res[oHistory[i].id].id+'" href="javascript:;">'+res[oHistory[i].id].name+'</a></p><p class="ced">'+res[oHistory[i].id].price+'</p></dt><dd class="fr"><img src="'+res[oHistory[i].id].flag+'" /><p class="cbb">'+res[oHistory[i].id].nation+'</p></dd></dl></div></li>'
				}
				$('#history').find('.containWrap').children('ul').html(html);
			}
		}
	})
}//getHistory函数结束

//置顶的封装函数
function toTop(){
	//滚轴运动事件
	$(document).scroll(function(){
		//console.log($(document).scrollTop())
		if($(document).scrollTop() > 800){//当滚动轴top大于800px时，置顶框出现
			$('#toTop').css('display','block');
		}else{
			$('#toTop').css('display','none');
		}
	})
	//点击返回顶部
	$('#toTop').click(function(){
		//alert(1)
		$('html,body').stop().animate({
			scrollTop:'0px'
		})
	})
}//toTop函数结束
