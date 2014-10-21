# crystal-template


## 本项目目的
crystal搭建项目的一个模版，下载完这个项目之后稍作配置就能开发开发工作

## 使用步骤
1. 下载本项目
2. 进入项目目录
3. ```npm install```
4. ```gulp && gulp watch```
5. 在静态服务器上打开index.html#primary/secondary （可以使用[anywhere](https://www.npmjs.org/package/anywhere) ）


## module文件
module文件通常放在module目录下，使用html格式
每个module包含两块内容，一个是view，一个是model
被script标签包含的是是model，其它标签是view
每个module的model和view会自动绑定

## 编码风格
ajax notification dialog model等编码规范可以参考

<http://code.dianpingoa.com/tp-tuangou-static/customer-visit>
