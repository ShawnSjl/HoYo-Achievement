export const categories = ['生活', '战术', '探索'];

export const lifeClasses = ['丽都之旅', '绳匠业务', '代理人信赖', '法厄同纪事', '代理人秘闻', '独家视界', '际会之时', '绳网热议']
export const tacticsClasses = ['迷失之地', '枯萎之都', '作战技巧', '敌对目标', '战斗成就']
export const explorationClasses = ['空洞探索指南', '零号密钥']

export const zzzGetClassByCategory = (category) => {
    switch (category) {
        case '生活':
            return lifeClasses;
        case '战术':
            return tacticsClasses;
        case '探索':
            return explorationClasses;
        default:
            return lifeClasses;
    }
}

export const zzzGetClassIdByName = (class_name) => {
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