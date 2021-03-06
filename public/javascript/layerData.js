const layerData = {
    userManagement: {
        name: {
            title: "姓名",
            col: 3,
        },
        uid: {

            title: "ID号",
            col: 3,
        },
        type: {

            title: "用户类型",
            col: 3,
            menu: [
                '考生',
                '教师'
            ]
        },
        college: {

            title: "所属学院",
            col: 3,
            menu: [
                '文学院',
                '历史学院',
                '音乐学院',
                '美术学院',
                '数信学院',
                '软件学院',
                '体育学院',
                '物理学院',
                '化学学院',
                '生物学院',
                '旅游学院',
                '经济学院',
                '法学院'
            ],
        },
        major: {

            title: "所属专业",
            col: 6,
        },
        grade: {

            title: "年级",
            col: 6,
        },
        username: {

            title: "登录账号",
            col: 12,
        },
        password: {
            title: "账号密码",
            col: 12,
            password: true
        }
    },
    examManagement: {
        cname: {
            title: '对应课程',
            col: 4
        },
        eid: {
            title: '考试ID',
            col: 4
        },
        cid: {
            title: '课程ID号',
            col: 4
        },
        pid: {
            title: '使用试卷ID',
            col: 4
        },
        date: {
            title: '考试日期',
            col: 8,
            date: true
        },
        time: {
            title: '考试时间',
            col: 12,
            timeRange: true
        }
    }
};