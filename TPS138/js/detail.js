$('#header_wrapper').load('header-footer.html .header',function(){
	header();
	judgeLogin();
	getCart();
	toTop();
});
$('#footer_wrapper').load('header-footer.html .footer');
$('#history').load('header-footer.html .history',getHistory);

//动态引入
function goodsContain(){
	//console.log($.cookie('buygoods'))
	//var id = $.cookie('buygoods');
	var id = localStorage.getItem('buygoods');
	$.ajax({
		url:'jsons/newproject.json',
		type:'GET',
		success:function(res){
			//console.log(res)
			//顶部索引
			var html1 = '<img src="images/home.gif" style="display: inline;" /><a href="index.html">首页</a> &gt; <a href="#">'+res[8].zengyeye+'</a> &gt; <a href="">'+res[id].yelei+'</a> &gt; <a href="">'+res[id].fulei+'</a> &gt;  '+res[id].name+''
			$('.goods_point').html(html1);
			// 判断图片数量
			var htmlPic = '';
			//console.log(res[2].img[1])
			for(var i=1;i<res[id].img.length;i++){
				htmlPic += '<img src="'+res[id].img[i]+'"/>'
			}
			// 图片little
			var html2 = '<div class="mark_pic"></div><img style="display: block;" src="'+res[id].img[0]+'" />'+htmlPic+'<div class="position_pic"></div>'
			$('.pic_little').html(html2);
			// 图片large
			var html3 = '<img style="display: block;" src="'+res[id].img[0]+'" />'+htmlPic+'';
			$('.all_pic').html(html3);
			// 图片list
			var htmlPicList = ' ';
			//console.log(res[2].img[1])
			for(var i=1;i<res[id].img.length;i++){
				htmlPicList += '<li><img src="'+res[id].img[i]+'"/></li>'
			}
			var html4 = '<ul class="clear"><li class="on"><img src="'+res[id].img[0]+'"/></li>'+htmlPicList+'</ul>';
			$('.pic_list').html(html4);
			
			//商品信息
			var htmlStyle = ' ';
			for(var i=0;i<res[id].style.length;i++){
				htmlStyle += '<li class="g_l_style fl"><a class="" href="javascript:;">'+res[id].style[i]+'</a><i class=""></i></li>'
			}
			var html5 = '<div class="goods_de_title"><p><span style="margin-left: 0;">包邮</span></p><h1>'+res[id].name+'</h1><p class="ced f13">'+res[id].tip+'</p></div><p>商品编码：<i>'+res[id].coding+'</i><i class="ml40 c99">原产地：'+res[id].nation+'</i></p><div class="goods_list">'+res[id].list+'</div><dl class="clear"><dt>价格：</dt><dd class="goods_list_price fl">￥'+res[id].price+'</dd></dl><dl class="clear"><dt>规格：</dt><dd class="goods_list_style fl"><ul>'+htmlStyle+'</ul></dd></dl><dl class="clear"><dt>数量：</dt><dd class="goods_list_num fl clear"><input type="text" value="1" name="goods_num" class="goods_num fl" /><span class="goods_num_zj fl"><i>&and;</i><i style="margin-top: 3px;">&or;</i></span><em>库存：<span>'+res[id].inventory+'</span></em></dd></dl><p class="goods_address">发货地：<span>'+res[id].address+'</span></p><div class="goods_cart clear"><a href="#" class="buy">立即购买</a><a href="javascript:;" class="cart"><span class="ico_cart"></span>加入购物车</a><a href="#" class="collect"><span>&hearts; </span>添加关注(<i>'+res[id].like+'</i>)</a><div class="goods_add"><p><s></s>商品添加成功</p><a href="javascript:;" class="gocart">去结算</a><a href="javascript:;" class="gobuy">继续购物</a></div></div>'
			
			$('.goods_detail').html(html5);
			//默认选中第一个商品规格
			$('.g_l_style').children('a').eq(0).addClass('style_on').next().addClass('xuanzhong')
			//商品详情
			var htmlDetail = '';
			 for(var i=0;i<res[id].detail.length;i++){
			 	htmlDetail += '<img src="'+res[id].detail[i]+'"  />'
			 }
			var html6 = '<p class="b_i_title"></p>'+htmlDetail+'';
			$('.b_i_detail').html(html6);
			
			//置顶菜单
			var html7 = '<dl><dt><img src="'+res[id].url+'" style="width: 40px; height: 40px;" /></dt><dd><p> '+res[id].name+'</p><span>￥'+res[id].price+'</span></dd></dl><ul><li class="on"><span class="jt"></span>商品介绍</li><li><span class=""></span>商品评价</li></ul><a href="javascript:;" class="cart">加入购物车</a>'
			$('.goods_menu').html(html7);
			
			//动态生成的成功函数中调用函数
			magnifier();
			detail();
			buyGoods();
			topMenu();
		}
	})
	
	
}//goodsContain函数结束
goodsContain();


// 放大镜
function magnifier(){
	//在显示框中的鼠标移动事件
		var oMarkBox = document.getElementsByClassName('mark_pic')[0];
		var oPositionBox = document.getElementsByClassName('position_pic')[0];
		var oBigBox = document.getElementsByClassName('pic_large')[0];	
		var oBigBoxAll = document.getElementsByClassName('all_pic')[0];
		//console.log(oMarkBox)
		oMarkBox.onmousemove = function(event){
			var evt = event || window.event;
			var left = evt.offsetX - oPositionBox.offsetWidth/2;
			var top = evt.offsetY - oPositionBox.offsetHeight/2;
			//console.log(left+':'+top)
			// 边界检测
				//console.log(left);
				left = left < 0 ? 0 : left;
				top = top < 0 ? 0 : top;
				left = left > oMarkBox.offsetWidth - oPositionBox.offsetWidth ? oMarkBox.offsetWidth - oPositionBox.offsetWidth : left;
				top = top > oMarkBox.offsetHeight - oPositionBox.offsetHeight ? oMarkBox.offsetHeight - oPositionBox.offsetHeight : top;
				
				oPositionBox.style.left = left + "px";
				oPositionBox.style.top = top + "px" ;
				
				// 百分比
				
				var precentLeft = left / (oMarkBox.offsetWidth - oPositionBox.offsetWidth);
				var precentTop = top / (oMarkBox.offsetHeight - oPositionBox.offsetHeight);
				// console.log(precentLeft + ':'+ precentTop);
				
				oBigBoxAll.style.left = - precentLeft * (oBigBoxAll.offsetWidth - oBigBox.offsetWidth) + 'px';
				oBigBoxAll.style.top = - precentTop * (oBigBoxAll.offsetHeight - oBigBox.offsetHeight) + 'px';
		}
		//鼠标划入
		oMarkBox.onmouseenter = function(){
			//alert(1)	
			oPositionBox.style.display = 'block';
			oBigBox.style.display = 'block';
				
		}
		//鼠标划出
		oMarkBox.onmouseleave = function(){
				
			oPositionBox.style.display = 'none';
			oBigBox.style.display = 'none';
				
		}
	//选取图片列表，切换放大镜图片
	$('.pic_list').children('ul').children('li').mouseenter(function(){
		//alert($(this).index())
		//console.log($(this).currentSrc)
		//console.log($('.all_pic').children('img').length)
		$(this).addClass('on').siblings().removeClass('on');
		$('.pic_little').children('img').eq($(this).index()).fadeIn().siblings('img').fadeOut();
		$('.all_pic').children('img').eq($(this).index()).fadeIn().siblings('img').fadeOut();
	})
	
	
}//magnifier函数结束
//magnifier();

//购买的事件
function buyGoods(){
	// 规格选择
	$('.g_l_style').click(function(){
		//alert(1)
		$(this).children('a').addClass('style_on').end().children('i').addClass('xuanzhong')
		$(this).siblings('.g_l_style').children('a').removeClass('style_on')
		$(this).siblings('.g_l_style').children('i').removeClass('xuanzhong')
		//console.log($('.g_l_style').children('a').hasClass('on').parent())
	})
	// 数量选择
	$('.goods_num_zj').children('i').click(function(){
		//alert(1)
		var num = parseInt($('input[name=goods_num]').val())
		//alert(typeof num)
		if($(this).index() == 0){
			num ++;
			//alert(num)
			//$('input[name=goods_num]').val(num);
			//alert(parseInt($('.goods_list_num').children('em').children('span').html()))
			//判断数量不能大于总库存量
			if(num > parseInt($('.goods_list_num').children('em').children('span').html())){
				$('input[name=goods_num]').val(parseInt($('.goods_list_num').children('em').children('span').html()));
			}else{
				$('input[name=goods_num]').val(num);
			}
		}else{
			num --;
			if(num < 1){//数量不能小于1
				$('input[name=goods_num]').val('1');
			}else{
				$('input[name=goods_num]').val(num);
			}
		}
		
	})//数量加减点击事件的结束

	//购买按钮的点击事件
	$('.buy').click(function(){
		//var id = $.cookie('buygoods')//获取当前商品的id
		var id = localStorage.getItem('buygoods')
		//var first = $.cookie('goodscart') == null?true:false;//判断是否第一次加入购物车
		var first = localStorage.getItem('goodscart') == null?true:false;
		var num = parseInt($('input[name=goods_num]').val());//获取购买的数量
		//console.log(num)
		var style = $('.style_on').parent().index();//获取够买的规格
		var same = false;
		if(first){//第一次加入购物车，创建cookie格式并储存
			//$.cookie('goodscart','[{id:'+id+',num:'+num+',style:'+style+'}]',{path:'/'});
			localStorage.setItem('goodscart','[{id:'+id+',num:'+num+',style:'+style+'}]');
		}else{//不是第一次添加，判断并添加或更改cookie
			//var str = $.cookie('goodscart');
			var str = localStorage.getItem('goodscart');
			var arr = eval(str);
			for(var attr in arr){//遍历数组，找寻id和规格都一样的商品，如果有就增加数量，没有就新添加一个对象
				if(arr[attr].id == id && arr[attr].style == style){
					arr[attr].num = arr[attr].num +num;
					var cookieStr = JSON.stringify(arr);
					//$.cookie('goodscart',cookieStr,{path:'/'});
					localStorage.setItem('goodscart',cookieStr);
					same = true;
				}
			}
			if(!same){//没有就新添加一个对象
				var obj = {id:id,num:num,style:style};
				arr.push(obj);
				var cookieStr = JSON.stringify(arr);
				//$.cookie('goodscart',cookieStr,{path:'/'});
				localStorage.setItem('goodscart',cookieStr);
			}
		}
		if($.cookie('userName')){//判断是否已经登录，登录就跳转购物车
			window.location.href = 'cart.html'
		}else{//没有跳转就跳转登录注册页面
			window.location.href = 'login.html'
		}
	
	})//购买按钮事件结束
	//加入购物车按钮点击事件
	$('.cart').click(function(){
		//alert(1)
		//console.log($('.style_on').parent().index())
		//判断是否存在cookie，并添加、更改cookie，同购买事件中相同
		//var id = $.cookie('buygoods');
		var id = localStorage.getItem('buygoods');
		//var first = $.cookie('goodscart') == null?true:false;
		var first = localStorage.getItem('goodscart') == null?true:false;
		var num = parseInt($('input[name=goods_num]').val());
		var style = $('.style_on').parent().index();
		//console.log(typeof id)
		//console.log(num)
		var same = false;
		if(first){
			//$.cookie('goodscart','[{id:'+id+',num:'+num+',style:'+style+'}]',{path:'/'});
			localStorage.setItem('goodscart','[{id:'+id+',num:'+num+',style:'+style+'}]');
		}else{
			//var str = $.cookie('goodscart');
			var str = localStorage.getItem('goodscart');
			var arr = eval(str);
			for(var attr in arr){
				if(arr[attr].id == id && arr[attr].style == style){
					arr[attr].num = arr[attr].num +num;
					var cookieStr = JSON.stringify(arr);
					//$.cookie('goodscart',cookieStr,{path:'/'});
					localStorage.setItem('goodscart',cookieStr);
					same = true;
				}
			}
			if(!same){
				var obj = {id:id,num:num,style:style};
				arr.push(obj);
				var cookieStr = JSON.stringify(arr);
				//$.cookie('goodscart',cookieStr,{path:'/'});
				localStorage.setItem('goodscart',cookieStr);
			}
		}
		//点击添加购物车，弹出添加成功弹窗
		$('.goods_add').css({
			display:'block'
		})
		//使屏幕可以显示弹出框
		$('html,body').stop().animate({
			scrollTop:'300px'
		})
	})
	//继续购买按钮点击事件
	$('.gobuy').click(function(){
		//$(this).parent().css('display','none')
		location.reload()
	})
	//去结算按钮事件
	$('.gocart').click(function(){
		window.location.href = 'cart.html'
	})
}//buyGoods函数结束

//置顶菜单封装函数
function topMenu(){
	$(document).scroll(function(){
		//console.log($(document).scrollTop())
		/*置顶时添加class名fixed，则两边元素透明度变为1，出现
		 .main .fixed dl,.main .fixed .cart{
			opacity: 1;
		}*/
		if($(document).scrollTop() > 1030){
			$('.goods_menu').addClass('fixed')
		}else{
			$('.goods_menu').removeClass('fixed')
		}
	})
}//topMenu函数结束

//详情事件
function detail(){
	//详情、评论按钮点击变为相应界面
	$('.goods_menu').find('li').click(function(){
		//alert(1)
		$(this).addClass('on').siblings('li').removeClass('on');
		$(this).children('span').addClass('jt').end().siblings('li').children('span').removeClass('jt');
		$('.box_img').find('li').eq($(this).index()).stop().fadeIn().siblings('li').fadeOut();
	})
}
