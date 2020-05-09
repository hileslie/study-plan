// 创建型：工厂模式-》复杂工厂

// 开放封闭原则：对拓展开放，对修改封闭

// 例如：量产手机
// 手机由操作系统(OS)和硬件(HW)组成

// 抽象工厂约定基本组成
class MobilePhoneFactory {
    createOS() {
        throw new Error("抽象工厂方法不允许直接调用，你需要将我重写！");
    }

    createHardWare() {
        throw new Error("抽象工厂方法不允许直接调用，你需要将我重写！");
    }
}

// 抽象工厂不干活，具体工厂干活

// 生产xxx手机 具体工厂继承自抽象工厂
class FakeStarFactory extends MobilePhoneFactory {
    createOS() {
        // 提供安卓系统实例(抽象产品类)
        return new AndroidOS()
    }

    createHardWare() {
        // 提供高通硬件实例(抽象产品类)
        return new QualcommHardWare()
    }
}

// 定义操作系统这类产品的抽象产品类
class OS {
    controlHardWare() {
        throw new Error('抽象产品方法不允许直接调用，你需要将我重写！'); 
    }
}
// 定义具体操作系统的具体产品类
class AndroidOS extends OS {
    controlHardWare() {
        console.log('我会用安卓的方式去操作硬件')
    }
}
class AppleOS extends OS {
    controlHardWare() {
        console.log('我会用Apple的方式去操作硬件')
    }
}

// 定义手机硬件这类产品的抽象产品
class HardWare {
    // 手机硬件的共性方法，这里提取了“根据命令运转”这个共性
    operateByOrder() {
        throw new Error('抽象产品方法不允许直接调用，你需要将我重写！');
    }
}
// 定义具体硬件的具体产品类
class QualcommHardWare extends HardWare {
    operateByOrder() {
        console.log('我会用高通的方式去运转')
    }
}
class MiWare extends HardWare {
    operateByOrder() {
        console.log('我会用小米的方式去运转')
    }
}

// 我的手机
const myPhone = new FakeStarFactory();
// 创建系统
const myOS = myPhone.createOS();
// 创建硬件
const myHardWare = myPhone.createHardWare();
// 启动操作系统
myOS.controlHardWare();
// 唤醒硬件
myHardWare = operateByOrder();
//
//
//
//