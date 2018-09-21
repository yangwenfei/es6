#Generator#

协程：多个线程互相协作，完成异步任务。解决js的异步问题

协程的运行流程大致如下：

* 第一步，协程A开始执行。

* 第二步，协程A执行到一半，进入暂停，执行权转移到协程B。

* 第三步，（一段时间后）协程B交还执行权。

* 第四步，协程A恢复执行。

上面流程的协程A，就是异步任务，因为它分成两段（或多段）执行。
Generator，通过yield暂停正在执行的任务，将执行权交给其他协程。整个Generator函数就是一个异步任务的容器，异步操作需要暂停的地方都用yield语句注明。  
Generator 函数可以暂停执行和恢复执行，这是它能封装异步任务的根本原因。


yield命令用于将程序的执行权移出 Generator 函数,它的自动执行，当异步操作有了结果，能够自动交回执行权。



#async函数#

###promise对象的状态变化###

async函数返回的promise对象，必须等到内部所有await命令后面的Promise对象执行完成，才会发生状态改变，除非遇到return语句或者抛出错误。  
也就是只有async函数内部的所有异步操作执行完，才会执行then方法指定的回调函数

	async function getTitle(url) {
  		let response = await fetch(url);
  		let html = await response.text();
  		return html.match(/<title>([\s\S]+)<\/title>/i)[1];
	}
	getTitle('https://tc39.github.io/ecma262/').then(console.log)
	// "ECMAScript 2017 Language Specification"

上面代码中，函数getTitle内部有三个操作：抓取网页、取出文本、匹配页面标题。只有这三个操作全部完成，才会执行then方法里面的console.log。

###await命令###

* 正常情况下，await命令后面是一个 Promise 对象。如果不是，会被转成一个立即resolve的 Promise 对象。
* 只要一个await语句后面的 Promise 变为reject，那么整个async函数都会中断执行。

使用时要注意的点 
（1）最好把await命令放在try...catch代码块中。
	async function myFunction() {
  		try {
    		await somethingThatReturnsAPromise();
  		} catch (err) {
    		console.log(err);
  		}
	}
	
（2）多个await命令后面的异步操作，如果不存在继发关系，最好让他们同事触发
	let foo = await getFoo();
	let bar = await getBar();
上面代码中，getFoo和getBar是两个独立的异步操作（即互不依赖），被写成继发关系。这样比较耗时，因为只有getFoo完成以后，才会执行getBar，完全可以让它们同时触发。

	// 写法一
	let [foo, bar] = await Promise.all([getFoo(), getBar()]);

	// 写法二
	let fooPromise = getFoo();
	let barPromise = getBar();
	let foo = await fooPromise;
	let bar = await barPromise;
上面两种写法，getFoo和getBar都是同时触发，这样就会缩短程序的执行时间