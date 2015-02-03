#Crystal
**Crystal** 是一个基于**组件**的快速开发前端框架

![Crystal icon](http://i2.dpfile.com/ba/crystal.jpg)

#目录
- [基于](#基于)
- [启动](#启动)
- [目录结构](#目录结构)
- [module](#module)
  - [view](#view)
  - [model](#model)
- [页面加载](#页面加载)
- [布局](#布局)
- [重定向](#重定向)
- [service](#service)
  - [ajax](#ajax)
  - [modal](#modal)
  - [notification](#notification)
  - [validator](validator)
  - [validator-handlers](#validator-handlers)


#基于
- 数据绑定：[knockout]
- 包管理：[browserify]
- 模块编译：[crystal-modulify]
- 路由：[crystal-page]
- 应用状态：[crystal-state]

#启动
- 安装node或者iojs
- 安装gulp ``` npm install gulp -g ``` 
- 下载[项目模版](https://github.com/youngjay/crystal-template/archive/master.zip)，以下操作都在改文件解压之后的目录里进行 
- 安装nodejs依赖 ``` npm install ```
- 启动编译 ``` gulp && gulp watch ```
- 启动server，需要另开一个命令行窗口 ``` node server.js ```
- 打开浏览器访问 ``` http://localhost:3000 ```，应该能在页面上看到``` hello world ```

#目录结构

```
|-- README.md                      
|-- app                  -- 存放本应用有关代码
|   |-- asset            -- 存放资源文件，包括stylus以及图片
|   |-- binding-handler  -- knockout的binding handlers
|   |-- module           -- 存放组件，这是开发业务逻辑的主要目录
|   `-- service          -- 各个组件需要用到的公用服务
|-- dist/                -- 编译后的文件
|-- gulpfile.js          -- gulp task
|-- index.html           -- 启动页面      
|-- node_modules/        -- 存放nodejs的库
|-- package.json         -- nodejs 库的配置
|-- server-config.js     -- 模拟的后台代码
|-- server.js            -- 启动server的脚本
`-- vendor/              -- 非nodejs的库
```

#module
module的编译是由crystal-
module文件是一个html文件，可以包含一个script标签,例如

- 只含有html

```html
<div>hello world</div>
```

- 含html和script
```html
<div>hello world</div>
<script>
    model = [
        
    ]
</script>
```

- 也可以只含script
```html
<script>
    model = [
        
    ]
</script>
```
module文件一般存放在app/module目录下
module文件包含
- [view](#view) —— html内容
- [model](#model) —— script标签内容

##view
view基于[knockout]的绑定语法，默认导入了[knockout.punches]的语法。knockout的配置可以看
``` app/setup-knockout.js ```

##model
crystal会把model转化成一个[mixin-class]

model可以是一个array（推荐），function，或者object。

如果是数组的话，数组里面的function会被作为构造函数（可以多个，顺序执行）；object会被作为prototype；数组可以嵌套

#页面加载
当使用state.Location的时候访问 ```http://localhost:3000/a/b?c=1&d=2```

或使用state.Hash的时候访问 ```http://localhost:3000/any/path/#/a/b?c=1&d=2```

crystal会加载 ``` app/module/a/b ``` 

额外的，如果这个module有onStateChange，则这个方法会被调用，并且传入state.getData().query作为参数

``` js
model = [
    function() {
        // 这里是构造函数
    },
    {
        onStateChange: function(query) {
            console.log(query);
        }
    }
]
```

#布局
在module每一层文件夹下面都一个添加一个``` __layout.html ```文件，该文件会作为对应目录的布局文件。

__layout文件内必须包含一个{{content}}
```html
<main>{{content}}</main>
```
在生成module的时候，{{content}}将会被替换成该目录下module的view

__layout.html可以嵌套在多个目录下

#重定向
在```app/app-config```中定义

``` js
module.exports = {
    redirects: {
        '/': '/rotate',

        '/rotate': '/rotate/territory',
        '/rotate/territory': '/rotate/territory/hierarchy',

        '/rotate/team': '/rotate/team/list'
    }
}
```
当state发生变化的时候，crystal查找重定向配置，反复应用，直到最终。

如果当你配置上面那个重定向设置，并且访问 ```/``` 的时候

页面会进行如下重定向操作
/ > /rotate > /rotate/territor > /rotate/territory/hierarchy

#service

##ajax
##modal
##notification
##validator
##validator-handlers

[knockout]: http://www.knockoutjs.com/ 
[browserify]: http://browserify.org/
[crystal-modulify]: https://github.com/youngjay/crystal-modulify
[crystal-page]: https://github.com/youngjay/crystal-page
[crystal-state]: https://github.com/youngjay/crystal-state
[knockout.punches]: http://mbest.github.io/knockout.punches/
[mixin-class]: https://github.com/youngjay/mixin-class
