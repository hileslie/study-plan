// 行为型：观察者模式
// 一对多的依赖关系，多个观察者对象同时监听某一个目标对象，当目标对象发送改变，通知所有观察者
// 发布-订阅

// 发布者类
class Publisher {
    constructor() {
        this.observers = [];
        console.log('Publisher created')
    }

    // 增加订阅者
    add(observer) {
        this.observers.push(observer);
        console.log('Publisher.add invoked');
    }

    // 移除订阅者
    remove(observer) {
        this.observers.forEach((item, index) => {
            if (item === observer) {
                this.observers.splice(index, 1)
            }
        })
        console.log('Publisher.remove invoked');
    }

    // 通知所有订阅者
    notify() {
        this.observers.forEach((observer) => {
          observer.update(this)
        })
        console.log('Publisher.notify invoked');
    }
}

// 订阅者类 - 被通知 去执行
class Observer {
    constructor() {
        console.log('Observer created');
    }
    update() {
        console.log('Observer.update invoked');
    }
}

// 具体发布类
class PrdPublisher extends Publisher {
    constructor() {
        super()
        this.prdState = null;
        this.observers = [];
    }

    getState() {
        return this.prdState;
    }

    setState(state) {
        this.prdState = state;
        this.notify();
    }
}

// 具体订阅类
class DeveloperObserver extends Observer {
    constructor() {
        super()
        this.prdState = {};
    }

    update(publisher) {
        this.prdState = publisher.getState();
        this.work();
    }

    work() {
        const prd = this.prdState;
        console.log('work.');
    }
}

const P = new DeveloperObserver();
const A = new DeveloperObserver();
const B = new DeveloperObserver();

const H = new PrdPublisher();
const prd = {
    a: 123,
}
H.add(P);
H.add(A);
H.add(B);
H.setState(prd);