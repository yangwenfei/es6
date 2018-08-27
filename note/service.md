# service 层#

service的功能是对数据库进行相关的操作

###一、对查询结果进行处理###

sequelize的查询结果是一个实例对象（我理解的实例对象就是一个实例对象就对应着表里的一行记录），需要调用get()方法，才能获取到实例的值。也就是想要的查询结果。官方上的链接（http://docs.sequelizejs.com/manual/tutorial/instances.html#values-of-an-instance）

	示例（以下是一个完整的简单的service文件）
	then里面是对查询结果的处理
	const People = require('../models').people
	const debug = require('debug')('srv:person')
	let Service = {}
    //debug(Person)
	Service.findById = id => {
    	debug('id==========' + id)
        //debug(Person.findAll())
    	People.findOne({
        	where: {
            	id: 2
        	}
    	}).then(result => {
        	debug(result.get())
			//{ id: 2, name: '2', password: '2', email: '2' }
    	})
	}
	Service.findAll = () => {
    	//debug(Person.findAll())
    	People.findAll({
    	}).then(result => {
        	debug(result instanceof Array) //true，是一个实例数组
        	debug(result.map(i => i.get())) 
			//result
			//[ { id: 1, name: '1', password: '1', email: '1' },
				{ id: 2, name: '2', password: '2', email: '2' },
				{ id: 3, name: '3', password: '3', email: '3' } ] 
    	})
	}

	module.exports = Service

###二、sequelize中的查询方法###

http://docs.sequelizejs.com/manual/tutorial/models-usage.html  
1、常用的3个：  
Model.findOne()[返回一条结果];  
Modele.findAll()[返回一个结果数组];  
Model.findAndCountAll()[返回一个结果（row）及总条数count，加上limit和offset两个参数实现分页查询]

	示例一
	People.findOne({
        row: true,
        where: {
            id: 2
        }
    }).then(result => {
        debug(result.get()) //{ id: 2, name: '2', password: '2', email: '2' }
    })
	
	实例二
	Service.findAll = () => {
        //debug(Person.findAll())
        People.findAll({
            row: true
        }).then(result => {
            debug(result instanceof Array) //true
            debug(result.map(i => i.get()))
        })
    }

	示例三
    /**
     * 返回值
     * count -总记录数
     * rows-一个对象数组
     */
	Service.findAndCountAll = () => {
    	//加上limit 与offset属性就可以实现分页查询了
    	People.findAndCountAll({
        	limit: 5,
        	offset: 1 //数据库里的row的下标是从0开始的，offset=1，获取的查询结果是从第二行开始的，第二行的下标为1
    	}).then(result => {
        	debug('findandcount==========111')
			debug(result.count)
        	debug(result.rows.map(i => i.get()))
			//results
			//[ { id: 2, name: '2', password: '2', email: '2' },
  				{ id: 3, name: '3', password: '3', email: '3' },
  			    { id: 4, name: '1', password: '4', email: '4' },
  			    { id: 5, name: '5', password: '5', email: '5' },
 			    { id: 6, name: '6', password: '6', email: '6' } ] 
    	})
	}

2、Sequelize.Op 实现复杂的查询  
		
Op对象的更多用法看官网链接：<http://docs.sequelizejs.com/manual/tutorial/querying.html#Operators>
	
	Service.findByOp = () => {
    debug('findByOp========')
    People.findAll({
            where: {
                id: {
                    [Op.or]: [
                        [1, 2, 3],
                        {
                            [Op.gt]: 10
                        }
                    ]
                }
            }
        }).then(result => {
            debug('findByOp========')
            debug(result.map(i => i.get()))
        })
        //Select *
        // FROM `People`
        // WHERE (`People`.`id` IN (1,2,3) OR `People`.`id` > 10)
	}

### 三、sequelize创建更新和删除 ###
	
	create(增)
	Service.create = () => {
    	People.create({
        	name: 'sdsds',
        	password: 'ssss',
        	email: '1111'
    	}).then(result => {
        	debug('create============')
        	debug(result)
    	})
	}
	
	destroy(删)
	Service.delete = () => {
    	People.findOne({ row: true, where: { id: 23 } })
        	.then(result => {
            return result.destroy()
        	})
        	.then(res => {
            	debug('destroy==========')
            	debug(res.get())
				//return 返回删除的对象
				//{ id: 23, name: 'sdsds', password: 'ssss', email: '1111' } 
        	})
	}

	update(改)
	Service.update = () => {
    	People.findOne({ row: true, where: { id: 24 } })
        	.then(result => {
            	return result.update({
                	name: '杨文飞'
            	})
        	})
        	.then(res => {
            	debug('update==========')
            	debug(res.get())
				//return 返回修改后的对象
				// { id: 24, name: '杨文飞', password: 'ssss', email: '1111' } 
        	})
	}


	
	
未完待续......
