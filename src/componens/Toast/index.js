
class ToastExample {
    @readonly
    show(v) {
      console.log(v)
      return '---------------'
    }
    @realName
    myName = "Ruban";
    greet() {
      return "Hi, I'm " + this.myName;
    }
}
function readonly(target, key, decorator) {
  // descriptor对象原来的值如下
  // {
  //     value: specifiedFunction,
  //     enumerable: false,
  //     configurable: true,
  //     writable: true
// }
console.log('target', target)
console.log('key', key)
console.log('decorator', decorator)
 var oldValue =  decorator.value
 decorator.value = function() {
  console.log(`Calling "${key}" with`, arguments,target);
  let value = oldValue.apply(null, arguments);
  return value
 }
// console.log('decorator', decorator.value)
// console.log('oldValue', oldValue)

  // decorator.writable = false;  // 不可写
  return decorator;
}

function realName(target, key, decorator) {
  console.log('---------', target)
  console.log('-----', key)
  console.log('-----', decorator.value)
  // property value
  // var _val = target[key];

  // // property getter
  // var getter = function () {
  //   return "Ragularuban(" + _val + ")";
  // };

  // // property setter
  // var setter = function (newVal) {
  //   _val = newVal;
  // };

  // Create new property with getter and setter
  // Object.defineProperty(target, key, {
  //   get: getter,
  //   set: setter
  // });
}

export default ToastExample