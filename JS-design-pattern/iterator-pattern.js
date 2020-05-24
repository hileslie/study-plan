// 行为型：迭代器模式
// 解决遍历的问题

// Array.prototype.forEach无法处理类数值

// // ES6：编写一个迭代器生成函数
// function *iteratorGenerator() {
//     yield '1';
//     yield '2';
//     yield '3';
// }
// const iterator = iteratorGenerator();
// iterator.next()
// iterator.next()
// iterator.next()


// 定义生成器函数，入参是任意集合
function iteratorGenerator(list) {
    // idx记录当前访问的索引
    var idx = 0;
    // len记录传入集合的长度
    var len = list.length;
    return {
        next: function() {
            // 如果索引还没有超出集合长度，done为false
            var done = idx >= len;
            // 如果done为false，则可以继续取值
            var value = !done ? list[idx++] : undefined;
            // 将当前值与遍历是否完毕（done）返回
            return {
                done: done,
                value: value,
            }
        }
    }
}

var iterator  = iteratorGenerator([1,2,3]);
iterator.next()
iterator.next()
iterator.next()