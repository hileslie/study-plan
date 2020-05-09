// 创建型：原型模型

// 构造函数.prototype.方法 -》 原型对象
// 实例对象.方法 -》（__proto__） -》 原型对象

function deepClone(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj
    }

    let copy = {}

    if (obj.constructor === Array) {
        copy = []
    }

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            copy[key] = deepClone(obj[key])
        }
    }

    return copy
}