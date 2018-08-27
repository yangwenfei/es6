#安装#

	npm install jest --save

#运行#

目录结构

* test
	* sum.js
	* sum.test.js  
	
sum.js文件

	function sum(a, b) {
  		return a + b;
	}
	module.exports = sum

sum.test.js文件
	
	const sum = require('./sum');

	test('adds 1 + 2 to equal 3', () => {
  		expect(sum(1, 2)).toBe(3);
	});

命令行运行

	$ jest test/sum.test.js

