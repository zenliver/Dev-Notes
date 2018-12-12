# Vue心得

## Vue单文件组件

### 组件内部的数据定义方式共3种：

1. 静态数据使用 `data` 定义
2. 动态数据使用 `computed` 定义
3. 从父组件传入的数据使用 `props` 定义

3种数据都可以用于文本插值（使用 `{{}}` 或 `v-text` 或 `v-html` ），也都可以在组件内部的js逻辑中调用（使用 `this.name` ）。

### 父子组件通信机制

父组件通过props向子组件传递数据，需要在父组件中绑定props，在子组件中声明接收的props。

子组件通过 `this.$emit` 触发自定义事件，并向父组件回传数据，在父组件中使用 `v-on` 监听子组件中触发的自定义事件并调用父组件中定义的方法，调用的方法可接收从子组件回传的数据。

### vue-cli开发环境

使用vue-cli初始化项目之后需要另行安装的包：

less开发依赖
`npm i --save-dev less less-loader`

axios依赖
`npm install --save axios`
