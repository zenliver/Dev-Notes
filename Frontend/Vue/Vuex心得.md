# Vuex心得

## 与组件类比

store可以理解为一个特殊的组件，没有HTML模板和CSS，只有js逻辑。

`state` 相当于组件里的 `data` ，`mutations` 和 `actions` 相当于组件里的 `methods` ，`getters` 相当于组件里的 `computed` ，store中没有生命周期钩子和 `watch` 的概念。

`mutations` 和 `actions` 本质上都是方法，都相当于组件里的 `methods`，它们的区别是：

`mutations` 中只能写同步操作，且可以直接操作 `state` (实际上，提交 `mutations` 是修改 `state` 的唯一方法。)；异步操作必须写在 `actions` 中，而且 `actions` 中无法直接操作 `state` ，只能通过提交( `commit` ) `mutations` 来间接操作 `state`。
