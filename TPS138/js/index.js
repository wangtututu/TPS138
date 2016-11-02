$('#header_wrapper').load('header-footer.html .header',function(){
	header();
	judgeLogin();
	getHistory();
	getCart();
	toTop();
	topMenu();
})

$('#footer_wrapper').load('header-footer.html .footer')
$('#history').load('header-footer.html .history')

// 侧边楼梯的封装函数
function floor(){
	$(document).scroll(function(){// 滚轴事件
		//console.log($(document).scrollTop())
		// 当滚动条距离大于第一块模板的到页面顶部的距离减去250px时，让楼梯出现
		if($(document).scrollTop() < $('.fb').eq(0).offset().top-250){
			$('#floor').css('display','none');
		
		}else{// 否则让楼梯消失
			$('#floor').css('display','block')
			/*for(var i=0;i<$('.fb').length;i++){
				if($(document).scrollTop() < $('.fb').eq(i).offset().top+100){
					$('#floor').children('p').eq(i).addClass('bcr').siblings().removeClass('bcr')
				}
			}*/
			//判断滚动轴距离，使相应模块对应楼梯的位置改变样式
			if($(document).scrollTop() < $('.fb').eq(0).offset().top+100){
				$('#floor').children('p').eq(0).addClass('bcr').siblings().removeClass('bcr')
			}else if($(document).scrollTop() < $('.fb').eq(1).offset().top+100){
				$('#floor').children('p').eq(1).addClass('bcr').siblings().removeClass('bcr')
			}else if($(document).scrollTop() < $('.fb').eq(2).offset().top+100){
				$('#floor').children('p').eq(2).addClass('bcr').siblings().removeClass('bcr')
			}else if($(document).scrollTop() < $('.fb').eq(3).offset().top+100){
				$('#floor').children('p').eq(3).addClass('bcr').siblings().removeClass('bcr')
			}else if($(document).scrollTop() < $('.fb').eq(4).offset().top+100){
				$('#floor').children('p').eq(4).addClass('bcr').siblings().removeClass('bcr')
			}else if($(document).scrollTop() < $('.fb').eq(5).offset().top+100){
				$('#floor').children('p').eq(5).addClass('bcr').siblings().removeClass('bcr')
			}else if($(document).scrollTop() < $('.fb').eq(6).offset().top+100){
				$('#floor').children('p').eq(6).addClass('bcr').siblings().removeClass('bcr')
			}else{
				$('#floor').children('p').eq(7).addClass('bcr').siblings().removeClass('bcr')
			}
		}
		
	})
	
	//当点击楼梯对应模块按钮时，页面滚动到相应模块位置
	$('#floor').children('p').click(function(){
		//alert($(this).index())
		var offsetTop = $('.fb').eq($(this).index()).offset().top;
		//console.log(offsetTop);
		//$(this).addClass('bcr').siblings().removeClass('bcr')
		//$(document).scrollTop(offsetTop) 
		$('html,body').stop().animate({
			scrollTop:offsetTop+'px'
		})
	})
	//点击置顶按钮，页面滚动回顶部
	$('#floor').children('a').click(function(){
		//当滚动回顶部时，用$('html,body')为dom对象进行动画操作
		$('html,body').stop().animate({
			scrollTop:'0px'
		})
	})
}//floor函数结束
//调用函数
floor();


// 轮播图的封装函数，通过改变透明度，进行轮播运动
function banner(){
	// alert(1)
   	//轮播
   	var index = 0;//计数器
   	var timer = setInterval(banner_fn,3000);//计时器
   	//alert($('.banner_img').children().length)
   	function banner_fn(){
   		if(index == $('.banner_img').children().length-1){
   			index = 0;
   		}else{
   			index ++;
   		}
   		$('.banner_img').children().eq(index).fadeIn(1000).siblings().fadeOut(1000);
   		$('.banner_list').children().eq(index).css('background','rgba(255,0,0,0.8)').siblings().css('background','rgba(255,255,255,0.8)')
   	}
   	// 鼠标划入，取消定时器，显示list
   	$('.banner').mouseenter(function(){
   		clearInterval(timer);
   		$(this).find('.banner_list').stop().fadeIn();
   		$(this).find('.banner_bl').stop().fadeIn();
   		$(this).find('.banner_br').stop().fadeIn();
   	})
   	// 鼠标划出事件，开启定时器，list消失
   	$('.banner').mouseleave(function(){
   		clearInterval(timer);
   		$(this).find('.banner_list').stop().fadeOut();
   		$(this).find('.banner_bl').stop().fadeOut();
   		$(this).find('.banner_br').stop().fadeOut();
   		timer = setInterval(banner_fn,3000);
   	})
   	// 点击小圆点事件
   	$('.banner_list').children().click(function(){
   		clearInterval(timer);
   		index = $(this).index();
   		//alert(index)
   		$('.banner_img').children().eq(index).fadeIn(1000).siblings().fadeOut(1000);
   		$('.banner_list').children().eq(index).css('background','rgba(255,0,0,0.8)').siblings().css('background','rgba(255,255,255,0.8)');
   		timer = setInterval(banner_fn,3000);
   	})
   	// 左按钮
   	$('.banner_bl').click(function(){
   		clearInterval(timer);
   		if(index == 0){
   			index = $('.banner_img').children().length-1;
   		}else{
   			index --;
   		}
   		$('.banner_img').children().eq(index).fadeIn(1000).siblings().fadeOut(1000);
   		$('.banner_list').children().eq(index).css('background','rgba(255,0,0,0.8)').siblings().css('background','rgba(255,255,255,0.8)');
   		timer = setInterval(banner_fn,3000);
   	})
   	//右按钮
   	$('.banner_br').click(function(){
   		clearInterval(timer);
   		if(index == $('.banner_img').children().length-1){
   			index = 0;
   		}else{
   			index ++;
   		}
   		$('.banner_img').children().eq(index).fadeIn(1000).siblings().fadeOut(1000);
   		$('.banner_list').children().eq(index).css('background','rgba(255,0,0,0.8)').siblings().css('background','rgba(255,255,255,0.8)');
   		timer = setInterval(banner_fn,3000);
   	})
}//banner函数结束
banner();

// 新品上架和热卖推荐模块的封装函数
function newProject(box,url){//函数需要传入两个参数，box为要动态加入的div盒子，url为要引用的json文件路径，路径相对于html页面
	//调用ajax
	var ajax = new XMLHttpRequest();
	ajax.open('get',url,true);
	ajax.send(null);
	ajax.onreadystatechange = function(){
	    if (ajax.readyState == 4 && ajax.status == 200) {
	        var res = eval(ajax.responseText);
	        fn_succ(res,box); 
	    }
   	};
   	function fn_succ(res,box){
   		var html1 = ' ';// 第一个ul
   		var html2 = ' ';// 第二个ul
   		var html3 = ' ';// 第三个ul
   		var html4 = ' ';// 第四个ul
   		var html5 = ' ';// 第五个ul
   		//alert(res.length)
   		//console.log($('.containWrap').children('ul').length);

   		for(var i=0;i<10;i++){// 第一个ul
			html1 += '<li><div class="img_box fl"><p class="icon"><s class="imgNew" style="display:'+res[i].new+'" title="新品上架"></s><s class="imgFree" style="display:'+res[i].free+'" title="包邮专区"></s><s class="imgSalle" style="display:'+res[i].salle+'" title="特惠促销"></s><s class="imgHot" style="display:'+res[i].hot+'" title="热卖推荐"></s></p><i class="top"></i><i class="right"></i><i class="bottom"></i><i class="left"></i><a id="'+res[i].id+'" class="containImg" href="javascript:;"><img src="'+res[i].url+'" /></a><dl class="containTitle clear"><dt class="fl"><p><a id="'+res[i].id+'" href="javascript:;">'+res[i].name+'</a></p><p class="ced">￥'+res[i].price+'</p></dt><dd class="fr"><img src="'+res[i].flag+'" /><p class="cbb">'+res[i].nation+'</p></dd></dl></div></li>';
		}
		$(box).find('.containWrap').children('ul').eq(0).html(html1);
		
		for(var i=10;i<20;i++){// 第二个ul
			html2 += '<li><div class="img_box fl"><p class="icon"><s class="imgNew" style="display:'+res[i].new+'" title="新品上架"></s><s class="imgFree" style="display:'+res[i].free+'" title="包邮专区"></s><s class="imgSalle" style="display:'+res[i].salle+'" title="特惠促销"></s><s class="imgHot" style="display:'+res[i].hot+'" title="热卖推荐"></s></p><i class="top"></i><i class="right"></i><i class="bottom"></i><i class="left"></i><a id="'+res[i].id+'" class="containImg" href="javascript:;"><img src="'+res[i].url+'" /></a><dl class="containTitle clear"><dt class="fl"><p><a id="'+res[i].id+'" href="javascript:;">'+res[i].name+'</a></p><p class="ced">￥'+res[i].price+'</p></dt><dd class="fr"><img src="'+res[i].flag+'" /><p class="cbb">'+res[i].nation+'</p></dd></dl></div></li>';
		}
		$(box).find('.containWrap').children('ul').eq(1).html(html2);
		
		for(var i=20;i<30;i++){// 第三个ul
			html3 += '<li><div class="img_box fl"><p class="icon"><s class="imgNew" style="display:'+res[i].new+'" title="新品上架"></s><s class="imgFree" style="display:'+res[i].free+'" title="包邮专区"></s><s class="imgSalle" style="display:'+res[i].salle+'" title="特惠促销"></s><s class="imgHot" style="display:'+res[i].hot+'" title="热卖推荐"></s></p><i class="top"></i><i class="right"></i><i class="bottom"></i><i class="left"></i><a id="'+res[i].id+'" class="containImg" href="javascript:;"><img src="'+res[i].url+'" /></a><dl class="containTitle clear"><dt class="fl"><p><a id="'+res[i].id+'" href="javascript:;">'+res[i].name+'</a></p><p class="ced">￥'+res[i].price+'</p></dt><dd class="fr"><img src="'+res[i].flag+'" /><p class="cbb">'+res[i].nation+'</p></dd></dl></div></li>';
		}
		$(box).find('.containWrap').children('ul').eq(2).html(html3);
		
		for(var i=30;i<40;i++){// 第四个ul
			html4 += '<li><div class="img_box fl"><p class="icon"><s class="imgNew" style="display:'+res[i].new+'" title="新品上架"></s><s class="imgFree" style="display:'+res[i].free+'" title="包邮专区"></s><s class="imgSalle" style="display:'+res[i].salle+'" title="特惠促销"></s><s class="imgHot" style="display:'+res[i].hot+'" title="热卖推荐"></s></p><i class="top"></i><i class="right"></i><i class="bottom"></i><i class="left"></i><a id="'+res[i].id+'" class="containImg" href="javascript:;"><img src="'+res[i].url+'" /></a><dl class="containTitle clear"><dt class="fl"><p><a id="'+res[i].id+'" href="javascript:;">'+res[i].name+'</a></p><p class="ced">￥'+res[i].price+'</p></dt><dd class="fr"><img src="'+res[i].flag+'" /><p class="cbb">'+res[i].nation+'</p></dd></dl></div></li>';
		}
		$(box).find('.containWrap').children('ul').eq(3).html(html4);
		
		for(var i=40;i<50;i++){// 第五个ul
			html5 += '<li><div class="img_box fl"><p class="icon"><s class="imgNew" style="display:'+res[i].new+'" title="新品上架"></s><s class="imgFree" style="display:'+res[i].free+'" title="包邮专区"></s><s class="imgSalle" style="display:'+res[i].salle+'" title="特惠促销"></s><s class="imgHot" style="display:'+res[i].hot+'" title="热卖推荐"></s></p><i class="top"></i><i class="right"></i><i class="bottom"></i><i class="left"></i><a id="'+res[i].id+'" class="containImg" href="javascript:;"><img src="'+res[i].url+'" /></a><dl class="containTitle clear"><dt class="fl"><p><a id="'+res[i].id+'" href="javascript:;">'+res[i].name+'</a></p><p class="ced">￥'+res[i].price+'</p></dt><dd class="fr"><img src="'+res[i].flag+'" /><p class="cbb">'+res[i].nation+'</p></dd></dl></div></li>';
		}
		$(box).find('.containWrap').children('ul').eq(4).html(html5);
		
		goods();
		
   	}//fn_succ函数结束
	
	// 模块内ul的轮播事件，，通过改变定位的left值，进行轮播运动
	$(box).find('.containWrap').css('width',$('.containWrap').children().length*1200+'px')
	var index = 0;
	var timer = setInterval(fn1,5000);
	function fn1(){
		if(index == $(box).find('.containWrap').children().length-1){
   			index = 0;
   		}else{
   			index ++;	
   		}
		$(box).find('.containWrap').stop().animate({
			left:-index*1200+'px'
		},800)
		//当每次轮播运动时，相应的小圆点改变样式
		$(box).find('.box_top').find('li').eq(index).addClass('listOn').siblings().removeClass('listOn')
	}
	//模块顶部小圆点的点击事件
	$(box).find('.box_top').find('li').click(function(){
		//alert($(this).index())
		index = $(this).index();
		clearInterval(timer);
		$(box).find('.containWrap').stop().animate({
			left:-index*1200+'px'
		},800)
		$(box).find('.box_top').find('li').eq(index).addClass('listOn').siblings().removeClass('listOn');
		timer = setInterval(fn1,5000);
	})
	//当鼠标划入图片时，停止定时器
	$(box).find('.box_bot').mouseenter(function(){
		clearInterval(timer);
	})
	//当鼠标划出图片时，打开定时器
	$(box).find('.box_bot').mouseleave(function(){
		clearInterval(timer);
		timer = setInterval(fn1,5000);
	})
	//点击小圆点，使之变为对应的轮播图
	$(box).find('.box_top').find('li').click(function(){
		clearInterval(timer);
		index = $(this).index();
		//alert($(this).index())
		$(box).find('.containWrap').stop().animate({
			left:-index*1200+'px'
		},800)
		$(this).eq(index).addClass('listOn').siblings().removeClass('listOn');
		timer = setInterval(fn1,5000);
	})
}//newProject函数结束
//调用函数,如需改变内容，改变函数的第二个参数，json文件路径即可
newProject('.New_box','jsons/newproject.json');
newProject('.Hot_box','jsons/newproject.json');

//商品的点击封装函数
function goods(){
	//新品上架中的图片和商品名称可以点击，并记录该商品信息，跳转详情页并存入浏览记录中
	$('.img_box').find('a').click(function(){
			//console.log(this.id)
			//alert(1)
			var id = this.id;//声明点击商品的id号
			var first = $.cookie('history')==null?true:false;//判断是否第一次点击商品
			var same = false;
			if(first){//如果为第一次点击，则创建名为history的cookie，并存入数组，数组中每个对象为商品id
				$.cookie('history','[{id:'+id+'}]',{expires:10,path:'/'});//cookie的path为‘/’，可以跨页面访问到cookie
			}else{//如果不是第一次则将判断是否存在该商品信息，存在则不变，不存在就添加新的对象进数组
				var str = $.cookie('history');
				var arr = eval(str);//将获取的cookie值，转换为数组类型
				for(var attr in arr){//便利数组，找寻与该商品的相同的id名
					if(arr[attr].id == id){
						$.cookie('history',JSON.stringify(arr),{expires:10,path:'/'});//原cookie值保持不变
						same = true;//说明已存在该商品信息
					}
				}
				if(!same){//如果没有找到相同的id名，则将该商品添加进数组中
					if(arr.length == 5){//历史记录保持最新的5个，当数组长度等于5时，删除最后一个对象
						arr.pop();
					}
					var obj = {id:id};
					arr.unshift(obj);//将该商品信息添加为数组中的第一个元素
					$.cookie('history',JSON.stringify(arr),{expires:10,path:'/'});//将添加过的数组转换为json格式，重新保存到cookie中
				}
			}
			//记录点击商品的id名，存入cookie，每次点击商品时更新这个id值
			//$.cookie('buygoods',id,{path:'/'});
			localStorage.setItem('buygoods',id);
			//跳转到该商品的详情页
			window.location.href = 'detail.html'
		})
}//goods函数结束

//母婴用品、美妆个护等模块的轮播图封装函数，函数需要传入一个参数，box为对应模块的div，通过改变绝对定位的left值，进行轮播运动
function bannerProject(box){
	var index = 0;
	var timer = setInterval(fn1,5000);
	$(box).find('.box_center').children('ul').css('width',$(box).find('.box_center').children('ul').children().length*356+'px')
	function fn1(){
		//console.log($('.box_center').children('ul').children().length)
		if(index == $(box).find('.box_center').children('ul').children().length-1){
			index = 0;
		}else{
			index ++;
		}
		//console.log(index)
		$(box).find('.box_center').children('ul').stop().animate({
			left:-index*356+'px'
		})
		$(box).find('.box_center').children('ol').children().eq(index).addClass('listOn').siblings().removeClass('listOn');
	}
	//鼠标划入时，使左右按钮和小圆点出现，并停止定时器
	$(box).find('.box_center').mouseenter(function(){
		clearInterval(timer);
		$(this).find('ol').stop().fadeIn();
   		$(this).find('.banner_bl').stop().fadeIn();
   		$(this).find('.banner_br').stop().fadeIn();
   		
	})
	//鼠标划出时，使左右按钮和小圆点消失，并停止定时器
	$(box).find('.box_center').mouseleave(function(){
		clearInterval(timer);
		$(this).find('ol').stop().fadeOut();
   		$(this).find('.banner_bl').stop().fadeOut();
   		$(this).find('.banner_br').stop().fadeOut();
		timer = setInterval(fn1,5000);
	})
	//点击小圆点，改变轮播图位置
	$(box).find('.box_center').children('ol').children().click(function(){
		//alert($(this).index())
		clearInterval(timer);
		index = $(this).index();
		$(box).find('.box_center').children('ul').stop().animate({
			left:-index*356+'px'
		})
		$(this).addClass('listOn').siblings().removeClass('listOn');
		timer = setInterval(fn1,5000);
	})
	//点击左按钮，改变轮播位置
	$(box).find('.box_center').find('.banner_bl').click(function(){
		clearInterval(timer);
		if(index == 0){
			index = $(box).find('.box_center').children('ul').children().length-1;
		}else{
			index --;
		}
		$(box).find('.box_center').children('ul').stop().animate({
			left:-index*356+'px'
		})
		$(box).find('.box_center').children('ol').children().eq(index).addClass('listOn').siblings().removeClass('listOn');
		timer = setInterval(fn1,5000);
	})
	//点击右按钮，改变轮播位置
	$(box).find('.box_center').find('.banner_br').click(function(){
		clearInterval(timer);
		if(index == $(box).find('.box_center').children('ul').children().length-1){
			index = 0;
		}else{
			index ++;
		}
		$(box).find('.box_center').children('ul').stop().animate({
			left:-index*356+'px'
		})
		$(box).find('.box_center').children('ol').children().eq(index).addClass('listOn').siblings().removeClass('listOn');
		timer = setInterval(fn1,5000);
	})
}//bannerProject函数结束
//调用函数
bannerProject('.Baby_box');
bannerProject('.Cos_box');
bannerProject('.Food_box');
bannerProject('.Watch_box');
bannerProject('.Health_box');
bannerProject('.Home_box');
bannerProject('.Com_box');

function topMenu(){
	$(document).scroll(function(){
		if($(document).scrollTop() > 1030){
			$('.header_logo').addClass('fixed')
		}else{
			$('.header_logo').removeClass('fixed')
		}
	})
}//topMenu函数结束