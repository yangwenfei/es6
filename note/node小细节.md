_dirname:获取当前文件所在目录完整目录名  
如：models文件夹下的index.js文件中打印

	debug(_dirname)-> C:\Users\Administrator\Desktop\gitHub\nodejs.git.io\myapp\models  
_filename:获取当前文件带有绝对路径的完整文件名
如：models文件夹下的index.js文件中打印

	debug(_filename)-> C:\Users\Administrator\Desktop\gitHub\nodejs.git.io\myapp\models\index.js

path.basename(pathl,[ext]) 
提取出用 '/' 隔开的path的最后一部分 
path:需要处理的路径
ext :需要过滤的字符
	
	var path=require（'path')
	path.basename('/foo/bar/baz/asdf/quux.html')
	//returns
	'quux.html'

	var path=require（'path')
	path.basename('/foo/bar/baz/asdf/quux.html','html')
	//returns
	'quux'


fs.readdirSync(path):返回指定目录下所有文件称的数组对象