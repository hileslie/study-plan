// 创建型：单例模式
// 保证类仅有一个实例，并提供一个访问它的全局访问点

// 如何保证一个类仅有一个实例？
class SingleDog {
    show() {
        console.log('单例对象')
    }
}
const s1 = new SingleDog()
const s2 = new SingleDog()
console.log('s1 === s2：', s1 === s2);
// s1 === s2    => false
// s1和s2各占一块内存空间。

// 具备判断自己是否创建过实例的能力
class SingleDog2 {
    show() {
        console.log('单例对象')
    }
    static getInstance() {
        // 判断是否已经new过实例
        if (!SingleDog2.instance) {
            // 没有，则创建
            SingleDog2.instance = new SingleDog2()
        }
        // 有则直接返回
        return SingleDog2.instance;
    }
}
// 或者闭包实现getInstance
// SingleDog2.getInstance = (function() {
//     let instance = null;
//     return function() {
//         if (!instance) {
//             instance = new SingleDog2();
//         }
//         return instance;
//     }
// })()
const s21 = SingleDog2.getInstance();
const s22 = SingleDog2.getInstance();
console.log('s21 === s22', s21 === s22);
// s21 === s22    => true
