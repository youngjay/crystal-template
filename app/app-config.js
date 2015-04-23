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
                        path: '/example/fetch',
                        external: false
                    },
                    {
                        text: 'pipe',
                        path: '/example/pipe',
                        external: false
                    },
                    {
                        text: 'on-state-change',
                        path: '/example/on-state-change',
                        external: false
                    },
                    {
                        text: 'nested-module',
                        path: '/example/nested-module/index',
                        external: false
                    },
                    {
                        text: 'layout',
                        path: '/example/layout/lv1/lv2/__layout',
                        external: false
                    }
                ]
            },
            {
                text: '基本组件',
                path: '/example/component/text',
                children: [
                    {
                        text: '文本',
                        path: '/example/component/text',
                        external: false
                    },
                    {
                        text: 'formGroup',
                        path: '/example/component/form-group',
                        external: false
                    },
                    {
                        text: '文本输入框',
                        path: '/example/component/text-box',
                        external: false
                    },
                    {
                        text: '复选组',
                        path: '/example/component/checkbox-group',
                        external: false
                    },
                    {
                        text: '单选组',
                        path: '/example/component/radio-group',
                        external: false
                    },
                    {
                        text: 'validator',
                        path: '/example/service/validator',
                        external: false
                    },
                    {
                        text: 'notification',
                        path: '/example/service/notification',
                        external: false
                    },
                    {
                        text: 'modal',
                        path: '/example/modal/index',
                        external: false
                    },
                    {
                        text: 'tree',
                        path: '/example/tree/index',
                        external: false
                    },
                    {
                        text: 'pagination',
                        path: '/example/pagination/index',
                        external: false
                    },
                    {
                        text: 'typeahead',
                        path: '/example/typeahead/index',
                        external: false
                    },
                ]
            }
        ],
        handbook: [
            {
                text: '简介',
                path: '/handbook/instruction',
                external: false
            },
            {
                text: '环境搭建',
                path: '/handbook/start/index',
                external: false
            },
            {
                text: '组件使用',
                path: '/handbook/component/index',
                children:[
                    {
                        text: '基本介绍',
                        path: '/handbook/component/index',
                        external: false
                    },
                    {
                        text: 'mode结构',
                        path: '/handbook/component/mode',
                        external: false
                    },
                    {
                        text: '文本',
                        path: '/handbook/component/text',
                        external: false
                    },
                    {
                        text: 'formGroup',
                        path: '/handbook/component/form-group',
                        external: false
                    },
                    {
                        text: '文本输入框',
                        path: '/handbook/component/text-box',
                        external: false
                    },
                    {
                        text: '复选组',
                        path: '/handbook/component/checkbox-group',
                        external: false
                    },
                    {
                        text: '单选组',
                        path: '/handbook/component/radio-group',
                        external: false
                    },
                    {
                        text: 'validator',
                        path: '/handbook/service/validator',
                        external: false
                    },
                    {
                        text: 'notification',
                        path: '/handbook/service/notification',
                        external: false
                    },
                    {
                        text: '弹出框',
                        path: '/handbook/service/modal',
                        external: false
                    }
                ],
                external: false
            },
            {
                text: '组件开发',
                path: '/handbook/devcomponent/index',
                external: false
            },
            {
                text: '前端框架',
                path: '/handbook/framework/index',
                external: false
            }

        ]
    }
}