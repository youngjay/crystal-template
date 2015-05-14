module.exports = {
    redirects: {
        '/': '/handbook',
        '/handbook': '/handbook/index',
        '/example': '/example/index'
    },
    navs:[
        {
            text: 'crystal',
            path: '/',
        },
        {
            text: '手册',
            path: '/handbook',
        },
        {
            text: '实例',
            path: '/example',
        }
    ],
    sidebars: {
        example:[
            {
                text: '基本功能',
                path: '/example/fetch',
                children: [
                    {
                        text: 'fetch',
                        path: '/example/fetch'
                    },
                    {
                        text: 'pipe',
                        path: '/example/pipe'
                    },
                    {
                        text: 'on-state-change',
                        path: '/example/on-state-change'
                    },
                    {
                        text: 'nested-module',
                        path: '/example/nested-module/index'
                    },
                    {
                        text: 'tree',
                        path: '/example/tree/index'
                    },
                    {
                        text: 'layout',
                        path: '/example/layout/lv1/lv2/content'
                    },
                    {
                        text: '操作DOM',
                        path: '/example/manipulate-dom'
                    }
                ]
            },
            {
                text: '基本组件',
                path: '/example/component/text',
                children: [
                    {
                        text: '文本',
                        path: '/example/component/text'
                    },
                    {
                        text: 'formGroup',
                        path: '/example/component/form-group'
                    },
                    {
                        text: '文本输入框',
                        path: '/example/component/text-box'
                    },
                    {
                        text: '复选组',
                        path: '/example/component/checkbox-group'
                    },
                    {
                        text: '单选组',
                        path: '/example/component/radio-group'
                    },
                    {
                        text: '智能下拉搜索',
                        path: '/example/component/typeahead'
                    },
                    {
                        text: 'validator',
                        path: '/example/service/validator'
                    },
                    {
                        text: 'notification',
                        path: '/example/service/notification'
                    },
                    {
                        text: 'modal',
                        path: '/example/modal/index'
                    },
                    {
                        text: 'tree',
                        path: '/example/tree/index'
                    },
                    {
                        text: 'pagination',
                        path: '/example/pagination/index'
                    },
                    {
                        text: 'typeahead',
                        path: '/example/typeahead/index'
                    }
                ]
            }
        ],
        handbook: [
            {
                text: '简介',
                path: '/handbook/instruction'
            },
            {
                text: '环境搭建',
                path: '/handbook/start/index'
            },
            {
                text: '组件使用',
                path: '/handbook/component/index',
                children:[
                    {
                        text: '基本介绍',
                        path: '/handbook/component/index'
                    },
                    {
                        text: 'model结构',
                        path: '/handbook/component/model'
                    },
                    {
                        text: '文本',
                        path: '/handbook/component/text'
                    },
                    {
                        text: 'formGroup',
                        path: '/handbook/component/form-group'
                    },
                    {
                        text: '文本输入框',
                        path: '/handbook/component/text-box'
                    },
                    {
                        text: '复选组',
                        path: '/handbook/component/checkbox-group'
                    },
                    {
                        text: '单选组',
                        path: '/handbook/component/radio-group'
                    },
                    {
                        text: '智能下拉搜索',
                        path: '/handbook/component/typeahead'
                    },
                    {
                        text: '日期控件',
                        path: '/handbook/component/date'
                    },
                    {
                        text: 'validator',
                        path: '/handbook/service/validator'
                    },
                    {
                        text: 'notification',
                        path: '/handbook/service/notification'
                    },
                    {
                        text: '弹出框',
                        path: '/handbook/service/modal'
                    }
                ]
            },
            {
                text: '组件开发',
                path: '/handbook/devcomponent/index'
            },
            {
                text: '前端框架',
                path: '/handbook/framework/index'
            }

        ]
    }
}