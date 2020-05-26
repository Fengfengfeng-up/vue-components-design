# vue-components-design
## Vue组件设计学习

### 组件通信
#### 父组件 => 子组件
+ 属性props
```
// child
props: { msg: String}

// parent
<HelloWorld msg="Welcome to Your Vue.js App"/>
```
+ 特性$attrs
```
// child: 并未在props声明foo
<P>{{$attrs.foo}}</p>

// parent
<HelloWorld foo="foo"/>
```
+ 引用refs
```
// parent
<HelloWorld res="hw"/>

mouted() {
  this.$refs.hw.xx = 'xxx'
}

// child
data() {
  return {
    xx: 'xx'
  }
}
```
+ 子元素$children
```
// parent
this.$childern[0].xx = 'xxx'

// child
data() {
  return {
    xx: 'xx'
  }
}
```
> 子元素不保证顺序

#### 子组件 => 父组件
```
// child
this.$emit('add', good)

// parent 
<Cart @add="cartAdd($event) />
```

#### 兄弟组件：通过共同祖辈组件
通过共同的祖辈组件搭桥，$parent或$root
```
// brother1
this.$parent.$on('foo', handle)

// brother2
this.$parent.$emit('foo')
```

#### 祖先和后代之间
由于嵌套层数过多，传递props不切实际，vue提供了`provide/inject`API完成该任务
+provide/inject：能够实现祖先给后台传值
```
// ancestor
provide() {
  return {foo: 'foo'}
}

// descendant
inject: ['foo']
```

#### 任意两个组件之间：事件总线 或 vuex
+ 事件总线：创建一个Bus类负责事件派发、监听和回调管理
```
// Bus：事件派发、监听和回调管理
class Bus{
  constructor() {
    this.callbacks = {}
  }
  $on(name, fn) {
    this.callbacks[name] = this.callbacks[name] || []
  }
  $emit(name, args) {
    if(this.callbacks[name]) {
      this.callbacks[name].forEach(cb => cb(args))
    }
  }
}

// main.js
Vue.prototype.$bus = new Bus()

// child1
this.$bus.$on('foo', handle)
// child2
this.$bus.$on('foo', handle)
```
>通常会使用Vue代替Bus

+ vuex：创建唯一的全局数据管理者store，通过它管理数据并通知组件状态变更







