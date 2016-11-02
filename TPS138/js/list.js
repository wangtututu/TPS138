$('#header_wrapper').load('header-footer.html .header',function(){
	header();
	judgeLogin();
	getCart();
	toTop();
});
$('#footer_wrapper').load('header-footer.html .footer')
$('#history').load('header-footer.html .history',getHistory)

//分页函数
	function getMsg(num){
		//alert(1)
            $.ajax({
                url:'jsons/newproject.json',
                type:'GET',
                dataType:'json',
                success:function(res){
                    //1.计算分页数量
                    var showNum=num;
                    var dataL=res.length;
                    var pageNum=Math.ceil(dataL/showNum);
                    $('#Pagination').pagination(pageNum,{
                        num_edge_entries: 1, //边缘页数
                        num_display_entries: 4, //主体页数
                        items_per_page: 1, //每页显示1项
                        prev_text: "上一页",
                        next_text: "下一页",
                        callback:function(index){
                            var html=' '

                           // console.log(showNum*index+'~'+parseInt(showNum*index)+parseInt(showNum))
                            for(var i = showNum*index; i < showNum*index+showNum;i++){
                               // console.log(i)
                                if(i<dataL){
                                	html += '<li class="img_box fl"><p class="icon"><s class="imgNew" style="display:'+res[i].new+'" title="新品上架"></s><s class="imgFree" style="display:'+res[i].free+'" title="包邮专区"></s><s class="imgSalle" style="display:'+res[i].salle+'" title="特惠促销"></s><s class="imgHot" style="display:'+res[i].hot+'" title="热卖推荐"></s></p><i class="top"></i><i class="right"></i><i class="bottom"></i><i class="left"></i><a id="'+res[i].id+'" class="containImg" href="javascript:;"><img src="'+res[i].url+'" /></a><dl class="containTitle clear"><dt class="fl"><p><a id="'+res[i].id+'" href="javascript:;">'+res[i].name+'</a></p><p class="ced">￥'+res[i].price+'</p></dt><dd class="fr"><img src="'+res[i].flag+'" /><p class="cbb">'+res[i].nation+'</p></dd></dl></li>'
                                }
                            }
                            
                            $('.listwrap').html(html)
                        }
                    })
                    goods();
                }
            })
        }
	getMsg(40);


//商品的点击封装函数 原理同主页的goods函数
function goods(){
	$('.listwrap').find('a').click(function(){
			//console.log(this.id)
			//alert(1)
			var id = this.id;
			var first = $.cookie('history')==null?true:false;
			var same = false;
			if(first){
				$.cookie('history','[{id:'+id+'}]',{expires:10,path:'/'});
			}else{
				var str = $.cookie('history');
				var arr = eval(str);
				for(var attr in arr){
					if(arr[attr].id == id){
						$.cookie('history',str,{expires:10,path:'/'});
						same = true;
					}
				}
				if(!same){
					//console.log(str)
					if(arr.length == 5){
						arr.pop();
					}
					var obj = {id:id};
					arr.unshift(obj);
					//console.log(arr.length)
					$.cookie('history',JSON.stringify(arr),{expires:10,path:'/'});
				}
			}
		
			//$.cookie('buygoods',this.id,{path:'/'});
			localStorage.setItem('buygoods',this.id);
			window.location.href = 'detail.html'
		})
}