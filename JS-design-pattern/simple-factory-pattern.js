// 创建型：工厂模式-》简单工厂

// 例如：信息录入系统
// 分离变与不变
// 变
// 姓名、年龄、工种的值
// 不变
// 姓名、年龄、工种、职责的属性
// name、age、career、work

// 不变的部分
function User(name, age, career, work) {
    this.name = name;
    this.age = age;
    this.career = career;
    this.work = work;
}
// 变的部分
function Factory(name, age, career) {
    let work
    switch (career) {
        case 'code':
            work = ['写代码', '写系统', '修bug']
            break;
        case 'product manager': 
            work = ['写PRD'];
            break;
        case 'boss':
            work = ['见客户'];
            break;
        default:
            break;
    }
    return new User(name, age, career, work);
}

// 工厂模式：将创建对象的过程单独封装


