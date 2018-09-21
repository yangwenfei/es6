#Module语法#

在es6之前，模块加载方案主要是CommonJS和AMD种。CommonJS用于服务器，AMD用于浏览器。但是ES6实现了模块功能，成为了浏览器和服务器通用的模块解决方案

模块功能主要由两个命令构成：export和import。export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能

###export的写法###

一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取，需要通过export命令输出和暴露给外部其他模块使用

（1）在export后面直接跟要输出的内容，可以是变量，也可以方法或者类。这种方式可以export多次

	profile.js

	export var firstname="111"
	export var lastname="222"
	export function fn(){
		console.log("asdfadf")
	}

（2）另外一种写法就是export命令后面，使用大括号指定所有输出的一组变量，只需要export就可以把所有想要输出的内容全部写上。**优先采用这种方式**

	profile1.js

	var firstname="111"
	var lastname="222"
	function fn(){
		console.log("asdfadf")
	} 
	export {firstname,lastname,fn}

**注意：输出的时候必须放在大括号里。就算是只输出一个变量也要放在大括号里，不管是变量还是函数**

	// 报错
	var m = 1;
	export m;

	//正确的写法
	// 写法一
	export var m = 1;
	// 写法二
	var m = 1;
	export {m};

	--------------------
	// 报错
	function f() {}
	export f;

	// 正确写法
	// 写法一
	export function f() {};
	// 写法二
	function f() {}
	export {f};

**总结：export要不就后面直接加要导出的完整方法或者变量，要不就是用大括号的形式只导出定义好的方法或变量的名字**

###import的写法###
import命令接受一对大括号，里面指定要从其他模块导入的变量名。大括号里面的变量名，必须与被导入模块对外接口的名称相同

	import {firstname,lastname,fn} from "./profile.js"

（1）模块的整体加载  
用*指定一个对象，所有输出值都加载在这个对象上面

circle.js文件，输出两个方法area和circumference
	export function area(radius){
		return Math.PI*radius*radius;
	}
	export function circumference(radius){
		return 2*Math.PI*radius;
	}

main.js 加载circle.js模块

	(1) 逐一加载指定的方法
		import{area，circumference} from "./circle"
		console.log('圆面积'+area(4))
		console.log('圆周长'+circumference(14));

	（2）整体加载所有export的接口
		import * as circle from "./circle"
		console.log('圆面积'+circle.area(4))
		console.log('圆周长'+circle.circumference(14))

**总结：import的时候，整体导入不用{}，被导入的接口有名称而且不是default形式的都需要用{}。使用import命令的时候，用户需要知道所要加载的变量名或者函数名，否则无法加载**


export default 命令  

当其他模块加载export default 命令导出的接口时，import命令可以为该匿名函数指定任意名字，这时就不需要知道原模块输出的函数名了。**注意这时import命令后面，不能使用大括号**

	export-default.js
	export default function () {
  		console.log('foo');
	}

	// import-default.js
	import customName from './export-default';
	customName(); // 'foo'

default 用在非匿名函数前也是可以的，此时的函数名不起作用了跟匿名函数加载方式一样，如下示例

	// export-default.js
	export default function foo() {
  		console.log('foo');
	}

	// 或者写成
	function foo() {
  		console.log('foo');
	}
	export default foo;

	//导入的时候

	import www from "./export-default.js"

	因为用了default，所以函数名foo就不起作用了


###模块复合写法###
如果在一个模块之中，先输入后输出同一个模块，import语句可以与export语句写在一起。

	export { foo, bar } from 'my_module';

	// 可以简单理解为
	import { foo, bar } from 'my_module';
	export { foo, bar };

例子：
本书介绍const命令的时候说过，const声明的常量只在当前代码块有效。如果想设置跨模块的常量（即跨多个文件），或者说一个值要被多个模块共享，可以采用下面的写法。

	// constants.js 模块
	export const A = 1;
	export const B = 3;
	export const C = 4;

	// test1.js 模块
	import * as constants from './constants';
	console.log(constants.A); // 1
	console.log(constants.B); // 3

	// test2.js 模块
	import {A, B} from './constants';
	console.log(A); // 1
	console.log(B); // 3
如果要使用的常量非常多，可以建一个专门的constants目录，将各种常量写在不同的文件里面，保存在该目录下。

	// constants/db.js
	export const db = {
	  url: 'http://my.couchdbserver.local:5984',
	  admin_username: 'admin',
	  admin_password: 'admin password'
	};

	// constants/user.js
	export const users = ['root', 'admin', 'staff', 'ceo', 'chief', 'moderator'];
然后，将这些文件输出的常量，合并在index.js里面。
	
	// constants/index.js
	export {db} from './db';
	export {users} from './users';
使用的时候，直接加载index.js就可以了。

	// script.js
	import {db, users} from './constants/index';


#模块的加载实现#

###浏览器加载###
浏览器加载ES6模块，也是使用script标签，但是要加入type="module"属性
浏览器对于带有type="module"的script，都是异步加载，不会造成堵塞浏览器，即等到整个页面渲染完，再执行模块脚本，等同于打开了script标签的defer属性。

如果网页有多个script type="module"，它们会按照在页面出现的顺序依次执行。  

script标签的async属性也可以打开，这时只要加载完成，渲染引擎就会中断渲染立即执行。执行完成后，再恢复渲染。 
	 
ES6 模块也允许内嵌在网页中，语法行为与加载外部脚本完全一致。

	<script type="module">
	  import utils from "./utils.js";
	
	  // other code
	</script>


###Node加载###
Node 对 ES6 模块的处理比较麻烦，因为它有自己的 CommonJS 模块格式，与 ES6 模块格式是不兼容的。目前的解决方案是，将两者分开，ES6 模块和 CommonJS 采用各自的加载方案。

###ES6模块与CommonJS的差异###

es6模块与commonJS的两个重要差异   

* commonJS模块输出的是一个值的拷贝，ES6模块输出的是值的引用
* commonJS是运行时加载，ES6模块是编译时输出接口

第二个差异是因为 CommonJS 加载的是一个对象（即module.exports属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。

第一个差异：一旦输出一个值，模块内部的变化就影响不到这个值

	// lib.js
	var counter = 3;
	function incCounter() {
  		counter++;
	}
	module.exports = {
  		counter: counter,
  		incCounter: incCounter,
	};
	
	//main.js
	var mod = require('./lib');
	console.log(mod.counter);  // 3
	mod.incCounter();
	console.log(mod.counter); // 3


ES6模块的运行机制与CommonJS不一样，JS引擎对脚本静态分析的时候，遇到模块加载命令import，就会生成一个只读引用。等脚本真正执行的时候，根据引用到被加载的那个模块里去取值
	// lib.js
	export let counter = 3;
	export function incCounter() {
  		counter++;
	}

	// main.js
	import { counter, incCounter } from './lib';
	console.log(counter); // 3
	incCounter();
	console.log(counter); // 4



#CommonJS模块#
所有代码都运行在模块作用域，不会污染全局作用域；模块可以多次加载，但只会在第一次加载的时候运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果；模块的加载顺序，按照代码的出现顺序是同步加载的;
###ES6模块加载CommonJS模块###

###CommonJS加载ES6模块###
