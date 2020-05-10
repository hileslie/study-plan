// 结构型：代理模式
// 一个对象不能直接访问另一个对象，需要第三者（代理）牵线搭桥，达到访问目的

// 科学上网 ——》代理服务器
// 客户端 (1)-》 DNS (2)-》 目标服务器
// (1)、针对某一url发起网络请求
// (2)、根据url查出ip地址，请求目标ip地址对应的服务器
// 客户端 -》 DNS -》 代理服务器-》 目标服务器

// ES6
// obj：目标对象   handler：代理行为
// const proxy = new Proxy(obj, handler);
const present = {
    type: '巧克力',
    value: 60,
}
const person = {
    name: 'zc',
    about: 'coding',
    age: 27,
    career: 'engineer',
    phone: '1122333',
    presents: [],
    bottomValue: 50,
    lastPresent: present,
}
const baseInfo = ['name', 'career'];
const privateInfo = ['age', 'avatar', 'phone'];
const user = {
    name: 'zjs',
    isValidated: true,
    isVIP: false,
}
const handlerFn = new Proxy(person, {
    get: function(person, key) {
        console.log('key: ', key);
        if (!user.isValidated) {
            console.log('您还没有完成验证哦');
            return;
        }

        if (user.isValidated && privateInfo.indexOf(key) > -1 && !user.isVIP) {
            console.log('只有VIP才可以查看该信息哦')
            return;
        }
    },

    set: function(person, key, val) {
        if (key === 'lastPresent') {
            if (val.value < person.bottomValue) {
                console.log('sorry，您的礼物被拒收了')
                return;
            }

            person[lastPresent] = val;
            person[present] = [...present, val];
        }
    }
})
console.log(handlerFn.name);
console.log(handlerFn.age);


// 四种代理类型：事件代理、虚拟代理、缓存代理、保护代理

// 事件代理
// const aNodes = document.getElementById('father').getElementsByTagName('a')
// console.log('aNodes: ', aNodes);
// const aLength = aNodes.length
// for(let i=0;i<aLength;i++) {
//     aNodes[i].addEventListener('click', function(e) {
//         e.preventDefault()
//         console.log(`我是${aNodes[i].innerText}`)                  
//     })
// }
const father = document.getElementById('father');
father.addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
        e.preventDefault();
        console.log(`我是${e.target.innerText}`);
    }
})

// 虚拟代理
// 例子：
// 图片预加载：首先img地址指向占位图，当真实图片缓存好之后，展示真实图片
class PreLoadImage {
    // static LOADING_URL = 'xxx';
    constructor(imgNode) {
        // 获取真实的DOM节点
        this.imgNode = imgNode;
    }

    setStr(targetUrl) {
        // this.imgNode.src = PreLoadImage.LOADING_URL
        // const image = new Image();
        // image.onload = () => {
        //     this.imgNode.src = targetUrl
        // }
        // image.src = targetUrl
        
        // 操作img节点的src属性
        this.imgNode.src = targetUrl;
    }
}
class ProxyImage {
    // 占位图url地址
    static LOADING_URL = 'xxx';
    
    constructor(targetImage) {
        // 目标Image，即PreLoadImage实例
        this.targetImage = targetImage;
    }

    // 操作虚拟Image，完成加载
    setStr(targetUrl) {
        // 真实img节点初始化时展示的是一个占位图
        this.targetImage.setStr(ProxyImage.LOADING_URL);

        // 创建一个帮我们加载图片的虚拟Image实例
        const virtualImage = new Image();
        // 监听目标图片加载的情况，完成时再将DOM上的真实img节点的src属性设置为目标图片的url
        virtualImage.onload = () => {
            this.targetImage.setSrc(targetUrl)
        }
        virtualImage.src = targetUrl
    }
}
const dom = new PreLoadImage('DOM_NODE');
const domIMG = new ProxyImage(dom);
// domIMG.setStr('真实url');

// 缓存代理
// 计算量较大的场景里，用到某个已经计算过的值的时候，不想再耗时进行二次计算，从内存里去取出现成的计算结果
const addAll = function() {
    console.log('进行了一次新计算');
    let result = 0;
    const len = arguments.length;
    for(let i = 0; i < len; i++) {
        result += arguments[i];
    }
    return result;
}
const proxyAddAll = (function() {
    const resultCache = {};
    return function() {
        const args = Array.prototype.join.call(arguments, ',');
        console.log('args: ', args);
        if(args in resultCache) {
            return resultCache[args];
        }
        return resultCache[args] = addAll(...arguments);
    }
})()
// proxyAddAll(1,23,3,4)

// 保护代理
// ES6 中的 Proxy
// 所谓“保护代理”，就是在访问层面做文章，在 getter 和 setter 函数里去进行校验和拦截，确保一部分变量是安全的。