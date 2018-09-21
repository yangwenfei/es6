#class#
(1)类的方法都是定义在类的proptotype属性上面。在类的实例上面调用方法其实就是调用原型上的方法  

	   class Point {
            constructor(x, y) {
                this.x = x;
                this.y = y;
            }
            toAdd() {
                return this.x + this.y
            }
        }

        let a = new Point();
        console.log(a.toAdd === Point.prototype.toAdd)//true
类的实例都是同一个原型对象，他们的原型对象都是Point.prototype,所以__proto__属性都是相等的

	var p1 = new Point(2,3);
	var p2 = new Point(3,2);

	p1.__proto__ === p2.__proto__

（2）类的私有属性和方法