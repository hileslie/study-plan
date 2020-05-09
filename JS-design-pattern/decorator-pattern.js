// 结构型：装饰器模式
// 在不改变原对象的基础上，对其包装拓展，使原有对象可以满足用户的复杂需求
// 单一职责

// 定义打开按钮
class OpenButton {
    // 原有方法
    onClick() {
        console.log('打开')
    }
}
// 定义按钮对应的装饰器
class Decorator {
    // 将按钮实例传入
    constructor(open_button) {
        this.open_button = open_button;
    }

    onClick() {
        this.open_button.onClick()
        this.changeButtonStatus()
    }
    
    changeButtonStatus() {
        this.changeButtonText();
        this.disabledButton();
    }

    changeButtonText() {
        console.log('修改文案')
    }

    disabledButton() {
        console.log('修改状态')
    }
}

const openButton = new OpenButton();
const decorator = new Decorator(openButton);
decorator.onClick()


// // ES7 中的装饰器
// // 装饰器函数，一个参数是目标类
// function classDecorator(target) {
//     target.hasDecorator = true;
//     return target;
// }
// // 将装饰器安装到Button类上
// @classDecorator
// class Button {
//     // ...
// }

// 去装饰类里面的方法
// function funcDecorator(target, name, descriptor) {
//     let originalMethod = descriptor.value
//     descriptor.value = function() {
//     console.log('我是Func的装饰器逻辑')
//     return originalMethod.apply(this, arguments)
//   }
//   return descriptor
// }

// class Button {
//     @funcDecorator
//     onClick() { 
//         console.log('我是Func的原有逻辑')
//     }
// }

// // 验证装饰器是否生效
// const button = new Button()
// button.onClick()