$('#header_wrapper').load('header-footer.html .header',function(){
	header();
	judgeLogin();
	getCart();
});
$('#footer_wrapper').load('header-footer.html .footer');


//导入购物车
function getCarts(){
	//alert(1)
	//$.cookie('goodscart')
	$.ajax({
		url:'jsons/newproject.json',
		type:'GET',
		success:function(res){
			//var str = $.cookie('goodscart');
			var str = localStorage.getItem('goodscart');
			//console.log(str)
			if(str){
				var obj = eval(str);
				var num = 0;//记录商品总件数
				var htmlList = '';//动态生成购物车商品的列表
				var allPrice = 0;//记录商品总价格
				for(var i in obj){
					htmlList += '<dd class="clear"><div class="clear"><img src="'+res[obj[i].id].url+'" /><i class="goods_name"><p><a href="javascript:;">'+res[obj[i].id].name+'</a></p><p class="c_buy">此商品在中国有出售</p></i></div><div>其他：<span>'+res[obj[i].id].style[obj[i].style]+'</span></div><div><b>'+res[obj[i].id].price+'</b></div><div><i class="goods_num"><a href="javascript:;" class="min">-</a><input name="goodsnum" type="text" value="'+obj[i].num+'" /><a href="javascript:;" class="max">+</a></i></div><div><b class="cre lPrice">'+parseInt(res[obj[i].id].price)*parseInt(obj[i].num)+'</b></div><div><a href="javascript:;"><i class="qc"></i></a></div></dd>';
					num += parseInt(obj[i].num);
					allPrice += parseInt(res[obj[i].id].price)*parseInt(obj[i].num);
				}
				//购物车的表头和结算
				var html = '<p class="cart_title"><em>全部商品</em><span class="title_num"><i class="title_num_border"></i>'+num+'</span></p><div class="cart_box"><dl class="clear"><dt class="clear"><span><em class="fl">商品名称</em></span><span>属性</span><span>单价</span><span>数量</span><span>小记</span><span>操作</span></dt>'+htmlList+'<dd class="clear"><div class="buy"><p>共<span>'+num+'</span>件商品 总价（不含运费）：<b class="cre" id="allPrice">￥'+allPrice+'</b></p><p><a href="javascript:;" class="buy_btn">立即结算</a></p></div></dd></dl></div>';
				$('.cart').html(html);
				//判断是否存在商品，如果没有则将结算按钮边变灰色
				if(obj.length == 0){
					$('.buy_btn').css({
						background:'#999',
						cursor:'default'
					})
				}
			}else{//存在商品则红色
				$('.buy_btn').css({
						background:'#999',
						cursor:'default'
					})
			}
			//调用购买函数
			buyCart()
		}
	})	
}//getCarts函数结束
getCarts();


// 购物车内的事件总函数
function buyCart(){
	//var num ;
	//商品数量减少，“-”按钮事件
	$('.cart_box').find('.min').click(function(){
		//alert(1)
		//获取当前输入框中的数字
		var num = parseInt($(this).next('input').val());
		if(num < 2){//最小数量为1
			num = 1;
		}else{
			num --;
		}
		//改变输入框的数值
		$(this).next('input').val(num)
		//alert(typeof num)
		//修改单个价格和
		var price = parseInt($(this).parent().parent().prev().children().html());
		$(this).parent().parent().next().children().html(price*num)//$(this)指的是减号按钮
		//console.log(price)
		//console.log($(this).parent().parent().next().children().html())
		//console.log($('.lPrice').html())
		//console.log($('.lPrice').length)
		//修改总价格
		var allPrice = 0;//声明总价格
		var allGoods = 0;//声明总数量
		for(var i=0;i<$('.lPrice').length;i++){//便利数量、小记，计算总数量和总价格
			allPrice += parseInt($('.lPrice').eq(i).html());
			allGoods += parseInt($('input[name=goodsnum]').eq(i).val())
		}
		$('#allPrice').html('￥'+allPrice);
		$('.title_num').html('<i class="title_num_border"></i>'+allGoods);
		$('.buy').find('span').html(allGoods)
		$('#header_cart_num').html(allGoods)
		//每次减少数量是时，相应的改变cookie值
		//var str = $.cookie('goodscart');
		var str = localStorage.getItem('goodscart');
		var arr = eval(str);
		var number = $(this).parent().parent().parent().index()-1;//获取当前点击商品对应的cookie数组下标
		//alert($(this).parent().parent().parent().index())
		//alert(arr[number].num)
		arr[number].num = num;//对应下标的数量改变为当前数量
		//$.cookie('goodscart',JSON.stringify(arr),{path:'/'});
		localStorage.setItem('goodscart',JSON.stringify(arr));
		//console.log($.cookie('goodscart'))
	})
	//商品数量增加，“+”按钮事件，同上减少事件
	$('.cart_box').find('.max').click(function(){
		//alert(1)
		var num = parseInt($(this).prev('input').val());
		num ++;
		$(this).prev('input').val(num)
		//alert(typeof num)
		var price = parseInt($(this).parent().parent().prev().children().html());
		$(this).parent().parent().next().children().html(price*num)
		
		var allPrice = 0;
		var allGoods = 0;
		for(var i=0;i<$('.lPrice').length;i++){
			allPrice += parseInt($('.lPrice').eq(i).html());
			allGoods += parseInt($('input[name=goodsnum]').eq(i).val())
		}
		$('#allPrice').html('￥'+allPrice)
		$('.title_num').html('<i class="title_num_border"></i>'+allGoods);
		$('.buy').find('span').html(allGoods)
		$('#header_cart_num').html(allGoods)
		
		//改变cookie
		//var str = $.cookie('goodscart');
		var str = localStorage.getItem('goodscart');
		var arr = eval(str);
		var number = $(this).parent().parent().parent().index()-1;
		arr[number].num = num;
		//$.cookie('goodscart',JSON.stringify(arr),{path:'/'});
		localStorage.setItem('goodscart',JSON.stringify(arr));
	})
	
	//删除购物车
	$('.qc').click(function(){
		//alert(1)
		//alert($(this).parent().parent().parent().index())
		//点击按钮，删除此元素的父集直到dl
		$(this).parentsUntil('dl').remove();
		//console.log($.cookie('goodscart'))
		var number = $(this).parent().parent().parent().index()-1;
		var arr = eval($.cookie('goodscart'))
		//console.log(arr)
		//删除当前商品对应的数组对象
		arr.splice(number,1);
		if(arr.length == 0){//当购物车为空时，结算按钮变灰色
					$('.buy_btn').css({
						background:'#999',
						cursor:'default'
					})
				}
		//删除元素后，计算商品总个数和商品总价格
		var allPrice = 0;
		var allGoods = 0;
		for(var i=0;i<$('.lPrice').length;i++){
			allPrice += parseInt($('.lPrice').eq(i).html());
			allGoods += parseInt($('input[name=goodsnum]').eq(i).val())
		}
		$('#allPrice').html('￥'+allPrice)
		$('.title_num').html('<i class="title_num_border"></i>'+allGoods);
		$('.buy').find('span').html(allGoods)
		$('#header_cart_num').html(allGoods)
		//$.cookie('goodscart',JSON.stringify(arr),{path:'/'});
		localStorage.setItem('goodscart',JSON.stringify(arr))
		//console.log($.cookie('goodscart'))
	})
	
	//立即结算按钮事件
	$('.buy_btn').click(function(){
		if($(this).css('cursor')!='default'){//判断当前购物车有没有商品，如果指针不是箭头，则证明可以点击
			if($.cookie('userName')){//如已登录吗，则购买成功
				//$.cookie('goodscart',null,{path:'/'})
				localStorage.removeItem('goodscart');
				alert('请支付'+$('#allPrice').html()+'到支付宝账号：18833425713')
				alert('不给钱还想要东西！！！')
				alert('那不给钱我可以过吗？？？')
				alert('老师，你还欠我们一首歌......')
				location.reload()
			}else{//没有登录，跳转登录页面
				window.location.href = 'login.html'
			}
			
		}
	})
}//buyCart函数结束
buyCart()
