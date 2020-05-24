// 行为型：发布-订阅模式

// Vue数据双向绑定（响应式原理）
// observer（监听器、发布者）
// watcher（订阅者）
// complied（编译器）

// observe方法遍历并包装对象属性
function observer(target) {
    // 若target是一个对象，则遍历它
    if (target && typeof target === 'object') {
        Object.keys(target).forEach((key) => {
            // defineReactive方法会给目标属性装上“监听器”
            defineReactive(target, key, target[key]);
        })
    }
}
// 定义defineReactive方法
function defineReactive(target, key, val) {
    const dep = new Dep();
    // 属性值也可能是object类型，这种情况下需要调用observe进行递归遍历
    observer(val);
    // 为当前属性安装监听器
    Object.defineProperty(target, key, {
        // 可枚举
        enumerable: true,
        // 不可配置
        configurable: false,
        get: function() {
            return val;
        },
        // 监听器函数
        set: function(value) {
            // 通知所有订阅者
            dep.notify()
        }
    })
}

// 订阅者Dep
class Dep {
    constructor() {
        // 初始化订阅队列
        this.subs = [];
    }

    // 增加订阅者
    addSub(sub) {
        this.subs.push(sub);
    }

    // 通知订阅者
    notify() {
        this.subs.forEach((sub) => {
            sub.update();
        })
    }
}