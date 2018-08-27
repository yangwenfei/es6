# node项目目录结构 #
bin  
public (存放资源文件)   
models (数据 自定义层)  
service（服务 自定义层）  
routes(路由 index.js将其他路由文件进行汇总并在app.js中调用)  
app.js (入口文件)


# models 数据层 #
使用 mysql数据库 与 sequelize
### sequelize ###

当前数据层的目录结构

* models
	* index.js
	* user.js
	* website.js
  
1、安装

	npm install sequelize --save  
	npm install mysql2 --save

2、创建sequelize实例 （models->index.js）
	

(1)将创建sequelize实例的参数提取出来放到项目目录结构的config->database.js文件中，设置链接数据库需要配置的参数

	database.js文件
	module.exports = {
  	development: {
    	database: 'website', // 使用哪个数据库
    	username: 'root', // 用户名
    	password: 'BeShoiU!@', // 口令
   	 	dialect: 'mysql',
    	option: {
      		operatorsAliases: false,
      		host: 'localhost', // 主机名
      		port: 3306, // 端口号，MySQL默认3306
      		logging: false,
      		dialect: 'mysql',
      		define: {
        		underscored: true,
        		freezeTableName: false,
        		charset: 'utf8',
        		dialectOptions: {
          			collate: 'utf8_general_ci'
        		},
        	timestamps: false
      		},
      		pool: {
        		max: 50,
        		min: 0,
        		idle: 3000
      		}
    	}
  	},
  	qa: {
    	database: 'website', // 使用哪个数据库
    	username: 'root', // 用户名
    	password: 'Feiliu2haolou', // 口令
    	option: {
      		operatorsAliases: false,
      		host: '127.0.0.1', // 主机名
      		port: 3306, // 端口号，MySQL默认3306
      		logging: false,
      		dialect: 'mysql',
      		define: {
        		underscored: true,
        		freezeTableName: false,
        		charset: 'utf8',
        		dialectOptions: {
          			collate: 'utf8_general_ci'
        		},
        		timestamps: false
      		},
      		pool: {
        		max: 5,
        		min: 0,
        		idle: 3000
      		}
    	}
  	},
  	production: {
    	database: 'website', // 使用哪个数据库
    	username: 'root', // 用户名
    	password: 'Feiliu2haolou', // 口令
    	option: {
      		operatorsAliases: false,
      		host: '10.66.187.39', // 主机名
      		port: 3306, // 端口号，MySQL默认3306
      		logging: false,
      		dialect: 'mysql',
      		define: {
        		underscored: true,
        		freezeTableName: false,
        		charset: 'utf8',
        		dialectOptions: {
          			collate: 'utf8_general_ci'
        		},
        		timestamps: false
      		},
      		pool: {
        		max: 5,
        		min: 0,
        		idle: 3000
      		}
    	}
  	}
    }
(2) 创建Sequelize实例 models->index.js

	const path = require('path')
	const Sequelize = require('sequelize')
	const config = require('../config/database')[env]
	const debug = require('debug')('srv:model')

	//debug(config)
	console.log(env)
	const sequelize = new Sequelize(
    	config.database,
    	config.username,
    	config.password,
    	config.option
	)
(3) 设置数据库对应的表模型 ，使用配置文件(import)方式创建

	示例
	// 使用文件
	var Project = sequelize.import(__dirname + "/path/to/models/project")

	// 将模型定义存储在单个文件中。配置文件,地址/path/to/models/project.js
	module.exports = function(sequelize, DataTypes) {
		// sequelize会传入一个sequelize对象和存储数据类型的对象
  		return sequelize.define("project", {
    		name: DataTypes.STRING,
    		description: DataTypes.TEXT
  			})
		}
	}

如果有多个模块文件，通过循环的方式创建多个model，在models->index.js中接着添加上定义模块的部分

	const path = require('path')
	const fs = require('fs')
	const basename = path.basename(__filename)
	const debug = require('debug')('srv:model')
	
	const db = {}

	fs.readdirSync(__dirname)
    	.filter(file => {
        	return file !== basename
    	})
    	.forEach(file => {
        	const model = sequelize.import(path.join(__dirname, file))
        	debug('import model[%s] from file[%s]', model.name, file)
        	db[model.name] = model
    })
	module.exports = db

完整的models->index.js文件
	const path = require('path')
	const fs = require('fs')
	const basename = path.basename(__filename)
	const Sequelize = require('sequelize')
	const env = process.env.NODE_ENV || 'development'
	const config = require('../config/database')[env]
	const debug = require('debug')('srv:model')

	//debug(config)
	console.log(env)
	//在实例化的时候应该根据不同的环境设置不同参数，这个地方后续需要补充修改
	const sequelize = new Sequelize(
    	config.database,
    	config.username,
    	config.password,
    	config.option
	)
	const db = {}

	fs.readdirSync(__dirname)
    	.filter(file => {
        	return file !== basename
    	})
    	.forEach(file => {
        	const model = sequelize.import(path.join(__dirname, file))
        	debug('import model[%s] from file[%s]', model.name, file)
        	db[model.name] = model
    	})
	db.sequelize = sequelize
	debug(db)
    /* returns
    db={
        user:user
        sequelize:Sequlize实例
    }
    */
	module.exports = db

	//index.js文件最终是要导出 通过Sequelize创建的数据库表所对应的模型model
	// website 数据库里面的表 user -> user模型

简单的模型需要用到的字段参数

	相应字段有: 
	type 字段数据类型(sequlize. …) 
	allowNull(是否允许为空true,false) 
	autoIncrement(自增, true ,false) 
	unique(唯一性, true,false, string) 
	comment (解释 说明)
	primaryKey (对主键的设置, true,false) 
	defaultValue(默认值的设置) 
	field （用来表明 数据库中 相应的字段名称.）
	示例
	sequelize.define('modelname', 
	{
		id: {
            type: DataTypes.INTEGER(6),
            field: 'id',
			autoIncrement：true，
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(255),
            field: 'name'
        },
        password: {
            type: DataTypes.STRING(255),
            field: 'password'
        },
        email: {
            type: DataTypes.STRING(255),
            field: 'email'
        }
	}
	
	






	
