#环境搭建#

<http://jspang.com/2017/06/03/es6/> 参考网站链接

#let 和 const#

let和const声明变量时需要知道的几个点



（1）外层作用域无法读取内层作用域的变量  

	function f1(){
  		if (true) {
    		let n = 10;
  		}
		console.log(n) // 报错
	}
 (2) 外层代码块不受内层代码块的影响，内层作用域可以定义外层作用域的同名变量
	function f1(){
		let n=5
  		if (true) {
    		let n = 10;
  		}
		console.log(n) // n=5
	}
（3）变量必须声明之后才能使用否则就会报错
（4）不允许在相同作用域内，重复声明同一个变量。

	报错的情况
	（1）function fn(){
		let a=10;
		var a=10;
		}
	(2) function fn1(){
		let a=10;
		let a=5;
		}
	(3) function func(arg) {
  			let arg; // 报错
		}

	（4）function func(arg) {
  			{
    		let arg; // 不报错
  			}
		}
（5）暂时性死区
只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。

	var tmp = 123;

	if (true) {
  		tmp = 'abc'; // ReferenceError
  		let tmp;
	}
上面代码中，存在全局变量tmp，但是块级作用域内let又声明了一个局部变量tmp，导致后者绑定这个块级作用域，所以在let声明变量前，对tmp赋值会报错。

ES6 明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。

#变量的解构和赋值#

从数组和对象中提取值，对变量进行赋值
