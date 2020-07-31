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


### 插槽
+ 匿名插槽
```
// compo1
<div>
  <slot></slot>
</div>

// parent
<Compo1>hello</Compo1>
```
+ 具名插槽
将内容分发到子组件指定位置
```
// compo2
<div>
  <slot></slot>
  <slot name="content"></slot>
</div>

// parent
<Compo2>
  <!-- 默认插槽使用default作为参数 -->
  <template v-slot:default>具名插槽</template>
  <!-- 具名插槽用插槽名作为参数 -->
  <template v-slot:content>内容...</template>
</Compo2>
```
+ 作用域插槽
父组件要用到子组件中的数据
```
// compo3
<div>
  <slot :foo="foo"></slot>
  <slot name="content" :content="content">
</div>

// parent
<Compo3>
  <!-- 把v-slot的值指定为作用域上下文对象 -->
  <template v-slot:default="slotProps">
    来自子组件数据：{{slotProps.foo}}
  </template>
  <template v-slot:content="{content}">
    来自子组件数据：{{content}}
  </template>
</Compo3>
```





