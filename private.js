//私有变量(Proxy)
const proxy = function (obj) {
    return new Proxy(obj, {
        get(target, key) {
            if (key.startsWith('_')) {
                throw new Error('private key')
            }
            return Reflect.get(target, key)
        },
        //拦截所有遍历操作
        ownKeys(target) {
            return Reflect.ownKeys(target).filter(key => !key.startsWith('_'))
        }
    })
}

class Person {
    constructor(name) {
        this._name = name
        return proxy(this)
    }

    get name() {
        return this._name
    }
}


let person = new Person('zhl')

try {
    console.log(person._name)
} catch (e) {
    console.error(e)
}
console.log(person.name)


//私有变量(Symbol)
const _name = Symbol('name')

class Person1 {
    constructor(name) {
        this[_name] = name
    }

    getName() {
        return this[_name]
    }
}

let person1 = new Person1('zhl')

console.log(person1._name) //undefined
console.log(person1)
console.log(person1.getName())


//私有变量(WeakMap)
//WeakMap相对于Map当对象不存在的时候自动从映射表中移除,自动减少内存占用率
let wp = new WeakMap()

class Person2 {
    constructor(name) {
        //存储当前实例和当前实例的私有变量
        wp.set(this, {name})
    }

    getName() {
        return wp.get(this).name
    }
}

let person2 = new Person2('zhl')
console.log(person2)
console.log(person2.getName())


//私有变量(闭包)
const Person4 = (function () {
    let _name
    class Person4{
        constructor(name) {
            _name = name
        }
        getName() {
            return _name
        }
    }
    return Person4
})()


let person4 = new Person4('zhl')
console.log(person4)
console.log(person4.getName())
