
export const zzzGetClassId = (class_name) => {
    switch (class_name) {
        case '丽都之旅':
            return 1001;
        case '绳匠业务':
            return 1003;
        case '代理人信赖':
            return 1004;
        case '法厄同纪事':
            return 1005;
        case '代理人秘闻':
            return 1006;
        case '独家视界':
            return 1007;
        case '际会之时':
            return 1008;
        case '绳网热议':
            return 1009;
        case '迷失之地':
            return 2005;
        case '枯萎之都':
            return 2001;
        case '作战技巧':
            return 2002;
        case '敌对目标':
            return 2003;
        case '战斗成就':
            return 2004;
        case '空洞探索指南':
            return 3001;
        case '零号密钥':
            return 3002;
        default:
            return 0;
    }
}