module.exports = {
    redirects: {
        '/': '/handbook',
        '/handbook': '/handbook/index',
        '/example': '/example/index'
    },
    navs: {
        example:[],
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
                    },
                    {
                        text: '复选组',
                        path: '/handbook/component/checkbox-group',
                        external: false
                    }
                ],
                external: false
            },
            {
                text: '组件开发',
                path: '/handbook/cdev/index',
                external: false
            },
            {
                text: '前端框架',
                path: '/handbook/cdev/index',
                external: false
            }

        ]
    }
}