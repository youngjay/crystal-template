#Crystal

![Crystal icon](http://i2.dpfile.com/ba/crystal.jpg)

#概览
**crystal** 一个基于**组件**的快速开发前端框架

#基于
- 数据绑定：[knockout](http://www.knockoutjs.com/) 
- 包管理：[browserify](http://browserify.org/) 
- 模块编译：[crystal-modulify](https://github.com/youngjay/crystal-modulify) 
- 路由：[crystal-page](https://github.com/youngjay/crystal-page) 
- 应用状态：[crystal-state](https://github.com/youngjay/crystal-state) 


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
|-- app/                 -- 存放本应用有关代码
|-- dist/                -- 编译后的文件
|-- gulpfile.js          -- gulp task
|-- index.html           -- 启动页面      
|-- node_modules/        -- 存放nodejs的库
|-- package.json         -- nodejs 库的配置
|-- server-config.js     -- 模拟的后台代码
|-- server.js            -- 启动server的脚本
`-- vendor/              -- 非nodejs的库

```



