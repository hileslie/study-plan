// 行为型：状态模式
// 与策略模式类似

// class CoffeeMaker {
//     constructor() {
//         this.state = 'init';
//     }

//     changeState(state) {
//         this.state = state;
//         if (state === 'american') {
//             console.log('黑咖啡')
//         } else if (state === 'latte') {
//             console.log('拿铁')
//         } else if (state === 'mocha') {
//             console.log('摩卡')
//         }
//     }
// }
// const mk = new CoffeeMaker();
// mk.changeState('latte');

// 职责分离
// class CoffeeMaker {
//     constructor() {
//         this.state = 'init'
//     }
//     changeState(state) {
//         this.state = state;
//         if (state === 'american') {
//             this.americanProcess();
//         } else if (state === 'latte') {
//             this.latteProcress();
//         } else if (state === 'mocha') {
//             this.mochaProcress();
//         }
//     }
//     americanProcess() {
//         console.log('黑咖啡');
//     }
//     latteProcress() {
//         console.log('拿铁');
//     }
//     mochaProcress() {
//         console.log('摩卡');
//     }
// }
// const mk = new CoffeeMaker();
// mk.changeState('latte');

// 开放封闭
// const stateToProcessor  = {
//     american() {
//         console.log('黑咖啡');
//     },
//     latte() {
//         console.log('拿铁');
//     },
//     mocha() {
//         console.log('摩卡');
//     }
// }
// class CoffeeMaker {
//     constructor() {
//         this.state = 'init'
//     }
//     changeState(state) {
//         this.state = state;
//         if (!stateToProcessor[state]) {
//             return;
//         }
//         stateToProcessor[state];
//     }
// }
// const mk = new CoffeeMaker();
// mk.changeState('latte');


// 把咖啡机和它的状态处理函数建立关联
class CoffeeMaker {
    constructor() {
      /**
      这里略去咖啡机中与咖啡状态切换无关的一些初始化逻辑
    **/
      // 初始化状态，没有切换任何咖啡模式
      this.state = 'init';
      // 初始化牛奶的存储量
      this.leftMilk = '500ml';
    }
    stateToProcessor = {
        that: this,
        american() {
            // 尝试在行为函数里拿到咖啡机实例的信息并输出
            console.log('咖啡机现在的牛奶存储量是:', this.that.leftMilk)
            console.log('我只吐黑咖啡');
        },
        latte() {
            this.american()
            console.log('加点奶');
        },
        vanillaLatte() {
            this.latte();
            console.log('再加香草糖浆');
        },
        mocha() {
            this.latte();
            console.log('再加巧克力');
        }
    }
  
    // 关注咖啡机状态切换函数
    changeState(state) {
        this.state = state;
        if (!this.stateToProcessor[state]) {
            return;
        }
        this.stateToProcessor[state]();
    }
}
  
const mk = new CoffeeMaker();
mk.changeState('latte');