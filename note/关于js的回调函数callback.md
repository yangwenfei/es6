#什么是回调函数#
<https://www.jianshu.com/p/6bc353e5f7a3>

回调函数就是一个函数，它作为一个函数的参数当它的父函数执行完之后再被唤醒触发

###几个回调函数代码,很常用的集中情形###

（1）异步请求的回调函数
	
	$.get("ajax/tes.html",function(data){
		$(".result").html(data)
		alert('Load was performed')
	})

（2）点击事件的回调函数
	
	$("#target").click(function(){
		alert("Handler for click called")
	})
	
（3）数组中遍历每一项调用的回调函数
	
	this.tabs.forEach(function(tab,index){
		if(tab.selected){
			this.focustab=this.tabs[index]
		}
	}).bind(this))

（4）同步回调的例子
	
	function getNodes(params,callback){
		var list=JSON.stringfy(params)
		typeof((callback)==='function'&&callback(list)
	}
	getNodes('[1,2,3]',funcion(nodes){
		//拿到nodes之后用它去做一些其他的操作
	})

所以回调与同步、异步并没有直接的联系，回调只是一种现实方式。既可以有同步回调，也可以有异步回调，还可以有事件处理回调（也属于异步回调的一种）和延迟函数回调（定时器也是异步回调的一种）

　js的异步主要有三部分:定时器setTimeout/setInterval;HTTP请求;事件响应。

###js的单线程浏览器内核的多线程###

js的异步是如何实现的呢，了解了下表面这幅图就可以明白了  
![](https://raw.githubusercontent.com/yangwenfei/es6/master/note/js_async.png)

浏览器常驻三大线程：js引擎线程、GUI渲染线程，浏览器事件触发线程

因为浏览器是一个多线程的执行环境，在浏览器内核中分配了多个线程，最主要的线程之一即是js引擎的线程，同时js事件队列中的异步请求，事件交互触发，定时器等事件都是由浏览器的事件触发线程进行监听的，浏览器的事件触发线程被触发后会把任务加入到js引擎的任务队列中，当js引擎空闲时就会开始执行该任务
