//div随鼠标拖动
divMove={
  init:function(divId,moveDivIdTemp){
  	if(moveDivIdTemp)
  		moveDivId = moveDivIdTemp;
  	else
  		moveDivId = divId;
    jQuery(divId).bind("mousedown",divMove.start);
  },
  
  start:function(e){
    div_top = e.clientY - jQuery(this).offset().top;
	div_left = e.clientX - jQuery(this).offset().left;
	jQuery(this).bind("mousemove",divMove.move);
	jQuery(this).bind("mouseup",divMove.up);
  },
  
  move:function(e){
	  jQuery(moveDivId).css({
		top:e.clientY-div_top+"px",
		left:e.clientX-div_left+"px"
	  })
  },
  
  up:function(e){
    jQuery(this).unbind("mousemove",divMove.move);
	jQuery(this).unbind("mouseup",divMove.up);
  }
}

//使用此方便必须首先调用html。js的clientWidthAndHeight();
//获取浏览器的宽带和高度
//此方法不支持浏览器的放缩
//title可为空
function opendiv(){
	var _this = this;
	this.action;
	this.html;
	this.id;
	this.width;
	this.height;
	this.title;
	this.parameter;
	this.callback;
	this.close_callback;
	this.parent;
	this.path;
	this.async;
	this.style = 1;
	this.browser;
	
	this.clientHeight;
	this.clientWidth;
	this.init = function(parameter){
		_this.browser_version();
		this.callback = parameter['callback'];
		
		typeof parameter['id'] == "undefined" ? this.id = Math.floor(Math.random()*100000+1) : this.id = parameter['id'];
		typeof parameter['html'] == "undefined" ? this.html = "" : this.html = parameter['html'];
		typeof parameter['parent'] == "undefined" ? this.parent = false : this.parent = parameter['parent'];
		typeof parameter['action'] == "undefined" ? this.action = "url" : this.action = parameter['action'];
		typeof parameter['title'] == "undefined" ? this.title = "提示消息" : this.title = parameter['title'];
		typeof parameter['height'] == "undefined" ? this.height = 80 : this.height = parameter['height'];
		typeof parameter['width'] == "undefined" ? this.width = 170 : this.width = parameter['width'];
		typeof parameter['style'] == "undefined" ? this.style = 1 : this.style = parameter['style'];
		typeof parameter['parameter'] == "undefined" ? this.parameter = {"id":_this.id} : this.parameter = parameter['parameter'];
		
		if(typeof parameter['close_callback'] == "function"){
			_this.close_callback = parameter['close_callback'];
		}
		if(typeof parameter['async'] == "undefined"){
			if(_this.browser == "ff"){
				_this.async = false;
		    }else{
		    	_this.async = true;
		    }
		}else{
			_this.async = parameter['async'];
		}
		
		if(jQuery("#"+parameter['id']).length > 0){
		  	jsError("id is exist");
			return;
		}
		
		_this.get_js_path();
		_this.add_css();
		_this.clientWidthAndHeight();
		_this.browser_version();
		_this.create();
	}
	
	this.create = function(){
		  var ret_html;
		  /*********初始化变量*********/
		  if(_this.style == 1){
			  windowOperate = "<div class='opendiv' id='"+_this.id+"'><div class='opendivHeader' id='opendivHeader"+_this.id+"'><span>"+_this.title+"</span><div class='opendivClose'><a class='close' title='关闭'></a></div><div class='revert'><a title='还原'></a></div><div class='max'><a title='最大化'></a></div><div class='refresh'><a title='刷新'></a></div></div>";
			  //<div class='refresh'><a title='刷新'></a></div>
			  
			  windowBg = "<div class='window_bg window_center'></div><div class='window_bg window_t'></div><div class='window_bg window_rt'></div><div class='window_bg window_r'></div><div class='window_bg window_rb'></div><div class='window_bg window_b'></div><div class='window_bg window_lb'></div><div class='window_bg window_l'></div><div class='window_bg window_lt'></div></div>";
		  }
		  
		  if(_this.style == 2){
			  windowOperate = "<div class='opendiv' id='"+_this.id+"'><div class='opendivHeader' id='opendivHeader"+_this.id+"'><span>"+_this.title+"</span><div class='opendivClose'><a class='close' title='关闭'></a></div></div>";
			  
			  windowBg = "";
		  }
		  
		  if(jQuery(".loadImage").length < 1 && !_this.parent){
			  var loadDiv = "<div class='loadImage'><img src='"+_this.path+"images/loadingGray2.gif'></div>";
			  jQuery("body").append(loadDiv);
		  
		  }
		  if(_this.action == "html"){
		      var div = windowOperate+"<div class='opendivContent' id='opendivContent"+_this.id+"'>"+_this.html+"</div>";
		      div += windowBg;
		      if(_this.parent)
		    	  jQuery("body",parent.document).append(div);
		      else
		    	  jQuery("body").append(div);
		      jQuery(".loadImage").remove();
		  }else if(_this.action == "url"){
		      var div = windowOperate+"<div class='opendivContent' id='opendivContent"+_this.id+"'></div>";
		      div += windowBg;
		      if(_this.parent)
		    	  jQuery("body",parent.document).append(div);
		      else
		    	  jQuery("body").append(div);
		      
		      jQuery.ajax({
		  	    type: "POST",
				cache: false,
				url: _this.html,
				data:_this.parameter,
				async:_this.async,
				success: function(html){
					ret_html = html;
					if(_this.parent){
					   jQuery("#"+_this.id,parent.document).focus();
					   jQuery("#opendivContent"+_this.id,parent.document).html(html);
					   jQuery(".loadImage",parent.document).remove();
					}else{
					   jQuery("#"+_this.id).focus();
					   jQuery("#opendivContent"+_this.id).html(html);
					   jQuery(".loadImage").remove();
					}

				}
			  })
		  }else if(_this.action == "iframe"){
	    	var div = windowOperate+"<div class='opendivContent' name='opendivContent"+_this.id+"' id='opendivContent"+_this.id+"'><div class='iframeDiv'><iframe scrolling='auto' frameborder='no' hidefocus='' allowtransparency='true' src='"+_this.html+"' class='iframeApp' name='iframeApp_4' id='iframeApp_"+_this.id+"'></iframe></div></div>";
	    	
	    	div += windowBg;
	    	jQuery("body").append(div);
	    	jQuery(".loadImage").remove();
	    }
		  
		  _this.adjust_style();  
		  _this.ie8();
		  divMove.init(".opendivHeader","#"+_this.id); 
		  _this.bind();
		  
		  if(_this.callback){
			  if(typeof _this.callback == "function")
				  _this.callback(ret_html);
			  else
				  jsError("callback must function");
		  }
	}
	
	this.bind = function(){
		if(_this.parent){
			jQuery("#"+_this.id,parent.document).find(".close").bind("click",_this.close);
			jQuery("#"+_this.id,parent.document).find(".min").bind("click",_this.min);
			jQuery("#"+_this.id,parent.document).find(".max").bind("click",_this.max);
			jQuery("#"+_this.id,parent.document).find(".refresh").bind("click",_this.refresh);
		}else{
			jQuery("#"+_this.id).find(".close").bind("click",_this.close);
			jQuery("#"+_this.id).find(".min").bind("click",_this.min);
			jQuery("#"+_this.id).find(".max").bind("click",_this.max);
			jQuery("#"+_this.id).find(".refresh").bind("click",_this.refresh);
			jQuery("#"+_this.id).find(".revert").bind("click",_this.revert);
			
		}
		
	}
	
	this.adjust_style = function(){
		if(_this.parent){
			jQuery("#"+_this.id,parent.document).css({
		        "width":_this.width+"px",
		        "height":_this.height+"px",
		        "top":Math.abs(jQuery(window,parent.document).height()-_this.height)/2+"px",
		        "left":Math.abs(jQuery(window,parent.document).width()-_this.width)/2+"px",
		        "position":"absolute",
		        'z-index':"1001",
		        "display":"block"
		    })
		    
		    if(jQuery(".cover",parent.document).length < 1){
		    	var coverDiv = "<div class='cover'></div>";
			    jQuery("body",parent.document).append(coverDiv);
			    jQuery(".cover",parent.document).css({
			      width:jQuery(document).width()+"px",
			      height:jQuery(document).height()+"px",
			      top:"0px",
			      left:"0px",
			      position:"absolute",
			      'z-index':"1000",
			      display:"block",
			      background:"#C8C8C8",
			      filter:"alpha(opacity=50)",
			      opacity:"0.5"
			    })
		    }else{
		    	jQuery(".cover").show();
		    }
		}else{			
			if(jQuery(window).height() < 200){
				var h = jQuery(document).height();
			}else{
				var h = jQuery(window).height();
			}
			var id_top = (h/2-_this.height/2)+jQuery(document).scrollTop()-30; //加30表示稍微居上一点更好看
			if(id_top < 0) //据顶不能为负，不然关闭按钮都看不见了
				id_top = 0;
			id_top += "px";
			var id_left = jQuery(window).width();
			
			jQuery("#"+_this.id).css({
		        "width":_this.width+"px",
		        "height":_this.height+"px",
		        "top":id_top,
		        "left":(id_left-_this.width)/2+"px",
		        "position":"absolute",
		        'z-index':"1001",
		        "display":"block"
		    })
		    
		    jQuery("#"+_this.id).find(".iframeDiv").css({
		    	height:_this.height-20+"px"
		    })
		    
		    if(_this.height > 79){
		    	if(_this.style == 1){
		    		jQuery("#"+_this.id).find(".opendivContent").css({
				    	height:_this.height-35+"px"
				    })
		    	}
		    	if(_this.style == 2){
		    		jQuery("#"+_this.id).find(".opendivContent").css({
				    	height:_this.height-50+"px"
				    })
		    	}
		    	
		    }
		    
			if(_this.browser == "ff"){
				var cover_height = document.body.clientHeight+document.body.scrollTop+"px";
			}else{
				var cover_height = document.documentElement.clientHeight+document.body.scrollTop+"px";
			}
			
		    if(jQuery(".cover").length < 1){
		    	var coverDiv = "<div class='cover'></div>";
			    jQuery("body").append(coverDiv);
			    jQuery(".cover").css({
			      width:"100%",
			      height:"100%",
			      top:"0px",
			      left:"0px",
			      position:"absolute",
			      'z-index':"1000",
			      display:"block",
			      background:"#C8C8C8",
			      filter:"alpha(opacity=50)",
			      opacity:"0.5"
			    })
		    }else{
		    	jQuery(".cover").show();
		    }
		}

	    
	}
	
	this.ie8 = function(){
	    if(_this.browser == "ie8"){
	    	jQuery(".opendivClose").mouseover(function(){
	    		jQuery(this).find("a").css({
	    			background:"url('"+_this.path+"/images/opendivHeaderOperateBg.png') no-repeat -122px -51px"
	    		})
	    	})
	    	jQuery(".opendivClose").mouseout(function(){
	    		jQuery(this).find("a").css({
	    			background:"url('"+_this.path+"/images/opendivHeaderOperateBg.png') no-repeat -122px -22px"
	    		})
	    	})
	    	jQuery(".revert").mouseover(function(){
	    		jQuery(this).find("a").css({
	    			background:"url('"+_this.path+"/images/opendivHeaderOperateBg.png') no-repeat -152px -51px"
	    		})
	    	})
	    	jQuery(".revert").mouseout(function(){
	    		jQuery(this).find("a").css({
	    			background:"url('"+_this.path+"/images/opendivHeaderOperateBg.png') no-repeat -152px -22px"
	    		})
	    	})
	    	jQuery(".max").mouseover(function(){
	    		jQuery(this).find("a").css({
	    			background:"url('"+_this.path+"/images/opendivHeaderOperateBg.png') no-repeat -33px -51px"
	    		})
	    	})
	    	jQuery(".max").mouseout(function(){
	    		jQuery(this).find("a").css({
	    			background:"url('"+_this.path+"/images/opendivHeaderOperateBg.png') no-repeat -33px -22px"
	    		})
	    	})
	    	jQuery(".min").mouseover(function(){
	    		jQuery(this).find("a").css({
	    			background:"url('"+_this.path+"/images/opendivHeaderOperateBg.png') no-repeat -62px -51px"
	    		})
	    	})
	    	jQuery(".min").mouseout(function(){
	    		jQuery(this).find("a").css({
	    			background:"url('"+_this.path+"/images/opendivHeaderOperateBg.png') no-repeat -62px -22px"
	    		})
	    	})
	    }
	}
	
	this.min = function(){
		if(jQuery(".toolBar").length < 1){
			  var toolBar = "<div class='toolBar'></div>";
			  jQuery("body").append(toolBar);
		  }
		  if(jQuery(".toolBar_"+_this.id).length < 1){
			  var toolBarDiv = "<div class='toolBar_"+_this.id+" toolBarDiv'>"+_this.title+"</div>";
			  jQuery(".toolBar").append(toolBarDiv); 
			  jQuery(".toolBar").find(".toolBarDiv").bind("click",_this.show);
		  }
		  
		  jQuery("#"+_this.id).hide();
		  jQuery(".cover").hide();
	}
	
	this.max = function(){
		jQuery("#"+_this.id).css({
	        width:jQuery(window).width()-20+"px",
	        height:jQuery(window).height()-20+"px",
	        top:"8px",
	        left:"8px"
		})
		jQuery("#"+_this.id).find(".opendivContent").css({
			height:_this.clientHeight-70+"px"
		})
		jQuery("#"+_this.id).find(".iframeDiv").css({
		    height:_this.clientHeight-20+"px"
		})
	}
	
	this.refresh = function(){
		jQuery("#"+_this.id).remove();
		_this.create();
	}
	
	this.revert = function(){
		_this.adjust_style();
	}
	
	this.show = function(){
		jQuery(this).remove();
		jQuery("#"+_this.id).show();
		jQuery(".cover").show();
		divMove.init(".opendivHeader","#"+_this.id);
		if(_this.callback){
		   if(typeof _this.callback == "function")
			   _this.callback();
		   else
			   jsError("callback must function");
		}
	}
	
	this.close = function(){
		if(_this.parent){
			jQuery("#"+_this.id,parent.document).remove();
			if(jQuery(".opendiv",parent.document).size() == 0)
				jQuery(".cover",parent.document).remove();
		}else{
			if(jQuery("#iframeApp_"+_this.id).size() > 0){
				jQuery("#iframeApp_"+_this.id).remove()
			}
			jQuery("#"+_this.id).remove();
			if(jQuery(".opendiv").size() == 0)
				jQuery(".cover").remove();
			if(jQuery(".toolBar_"+_this.id).length > 0)
				jQuery(".toolBar_"+_this.id).remove();
		}
		if(typeof listHashtable != "undefined"){
			var id = (_this.id).toString();
			var select_id = id.replace("open_select","select_page_table");
			if(listHashtable.contains(select_id)){
				listHashtable.remove(select_id);
			}
		}
		
		if(typeof _this.close_callback == "function"){
			_this.close_callback();
		}
	}
	
	this.add_css = function(){
		jQuery('head link[href$="'+_this.path+'css/opendiv.css"]').remove();
		jQuery('head link[href$="'+_this.path+'css/opendiv2.css"]').remove();
		if(_this.parent){
			jQuery("head",parent.document).append("<link>");
			css = jQuery("head",parent.document).children(":last");
		}else{
			jQuery("head").append("<link>");
			css = jQuery("head").children(":last");
		}
		
		var css_path = _this.path+"css/opendiv.css";
		if(_this.style == 2){
			css_path = _this.path+"css/opendiv2.css";
		}
		css.attr({
		    rel: "stylesheet",
		    type: "text/css",
		    href: css_path
		});
	}
	
	this.get_js_path = function(){
		var js_path;
		jQuery("script").each(function(){
			var src = jQuery(this).attr("src");
			if(typeof src != "undefined" && src.indexOf("opendiv") >= 0){
				js_path = src;
			}
		})
		
		//var js_path = jQuery("script").last().attr("src");
	    var path_arr = js_path.split("/");
	    var num = path_arr.length;
	    js_path = js_path.replace(path_arr[num-1],"");

	    _this.path = js_path;
	}
	
	this.browser_version = function(){
		if(typeof _this.browser == "undefined"){
			if(typeof jQuery.browser == "undefined"){
				jQuery.browser = new Object();
				jQuery.browser.mozilla = /firefox/.test(navigator.userAgent.toLowerCase());
				jQuery.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
				jQuery.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
				jQuery.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
				jQuery.browser.safari = /safari/.test(navigator.userAgent.toLowerCase());
				if(jQuery.browser.msie){
					if(typeof(document.body.style.maxHeight) == "undefined"){
						jQuery.browser.version = 6;
					}else if (!jQuery.support.leadingWhitespace){
						jQuery.browser.version = 8;
					}
				}
			}
			if(jQuery.browser.msie && jQuery.browser.version ==6){
				_this.browser = "ie6";
			}
			
			if(jQuery.browser.msie && jQuery.browser.version ==7){
				_this.browser = "ie7";
			}
			
			if(jQuery.browser.msie && jQuery.browser.version ==8){
				_this.browser = "ie8";
			}
			
			if(jQuery.browser.msie && jQuery.browser.version ==9){
				_this.browser = "ie9";
			}
			
			if(jQuery.browser.msie && jQuery.browser.version ==10){
				_this.browser = "ie10";
			}
			
			if(jQuery.browser.msie && jQuery.browser.version ==11){
				_this.browser = "ie11";
			}
			
			if(jQuery.browser.mozilla){
				_this.browser = "ff";
			}
			
			if(jQuery.browser.safari){
			  if(window.navigator.userAgent.indexOf("Chrome") != -1)
				  _this.browser = "chrome";
			  else
				  _this.browser = "safari";
			}
		}
	}
	
	this.clientWidthAndHeight = function(){
		if(typeof _this.clientHeight == "undefined"){
			if(_this.browser == "ff"){
				_this.clientHeight = document.body.clientHeight+document.body.scrollTop+"px";
			}else{
				_this.clientHeight = document.documentElement.clientHeight+document.body.scrollTop+"px";
			}
			_this.clientWidth = document.documentElement.clientWidth;
		}
	}
}
