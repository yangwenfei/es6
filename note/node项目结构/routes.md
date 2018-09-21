#routes 路由层 #

目录结构  

* routes  
	* users.js
	* article.js
	* ....(.js)
	* index.js

users.js、article.js ...这些每一个js文件对应一个service，（我理解为对应某个具体的表做出的各种具体的请求)
  
user.js文件，对应用户对user表发出的各种请求

	示例:user.js文件

	const express = require('express')
	const router = express.Router()
	const debug = require('debug')('srv:route')
	const person = require('../service/person')

	/**
 	*  获取所有信息列表
 	*  uri = /users/all
 	*/
	router.get('/all', function(req, res) {
    	person.findAll().then(result => {
        	// debug(result)
        	res.send(result)
    	})
	})

	module.exports = router

article.js文件，对应用户对article表发出的各种请求
	
	示例：article.js文件
	const express = require('express')
	const router = express.Router()
	const debug = require('debug')('srv:route')
	const article = require('../service/article')

	/**
 	*  获取所有信息列表
 	*  uri = /article/all
 	*/
	router.get('/all', function(req, res) {
    	article.findAll().then(result => {
        	// debug(result)
        	res.send(result)
    	})
	})

	/**
 	*  获取所有最新列表
 	*  uri = /article/lastest
 	*/
	router.get('/lastest', function(req, res) {
    	article.findAll().then(result => {
        	// debug(result)
        	res.send(result)
    	})
	})

	module.exports = router

index.js文件对所有的路由文件进行汇总
	
	index.js文件

	var db = require('../models/index')
	var debug = require('debug')('srv:route')

	/* GET home page. */
	router.get('/', function(req, res, next) {
    	debug(111111111111)
    	res.render('index', { title: 'Express' })
	})

	const users = require('./users')
	router.use('/users', users)
	const article = require('./article')
	router.use('/article', article)
	......
	module.exports = router
	
	/**在发送请求的时候，获取user信息的请求路径是
	*localhost:port/user/all 
	*获取article信息的请求路径是
	*localhost:3000/article/all
	*localhost:3000/article/lastes
	**/
	最终请求路径的格式是 => 主机:端口/在index.js文件中use设置的不同路由节点/具体的路由名（或参数）

在html页面，想要获取user信息（注意请求地址）

	示例
	<!DOCTYPE html>
	<html>
	<head>
    <meta charset="UTF-8">
    <title>傲世群英传</title>
    <link rel="stylesheet" type="text/css" href="css/index.css" />
    <link rel="stylesheet" type="text/css" href="css/layui.css">
	</head>

	<body>
    	<div id="app">
        	<ul>
            	<li v-for="item in list" :key="item.id">item</li>
        	</ul>
    	</div>

    	<script type="text/javascript" src="js/vue.js"></script>
    	<script type="text/javascript" src="js/axios.min.js"></script>
    	<script>
        	new Vue({
            	el: "#app",
            	data: {
                	list: []
            	},
            	mounted() {
                	this.getList()
            	},
            	methods: {
                	getList() {
                    	console.log(111111111)
                    	axios.get('/users/all').then(res => {
                        	console.log(res)
							this.list=res
                    	}).catch(error => {
                        	console.log(error)
                    	})
                	}
            	}
        	})
    	</script>
	</body>
	</html>