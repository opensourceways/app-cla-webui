const SIGNATURE_FILE_MAX_SIZE = 5;        //M
const INDIVIDUALMETADATAARR_EN = [
    {
        title: 'Name',
        type: 'name',
        description: 'Your name',
        required: true
    },
    {
        title: 'E-Mail',
        type: 'email',
        description: 'Email for signing CLA',
        required: true
    }
];
const INDIVIDUALMETADATAARR_ZH = [
    {
        title: '姓名',
        type: 'name',
        description: '你的姓名',
        required: true
    },
    {
        title: '邮箱',
        type: 'email',
        description: '签署CLA的邮箱',
        required: true
    }
];
const CORPORATIONMETADATAARR_EN = [
    {
        title: 'Authorized Representative',
        type: 'authorized',
        description: 'name of Authorized Representative',
        required: true
    },
    {
        title: 'Title',
        type: 'title',
        description: 'title of Authorized Representative',
        required: true
    },
    {
        title: 'Corporation Name',
        type: 'corporationName',
        description: 'corporation name',
        required: true
    },

    {
        title: 'E-Mail',
        type: 'email',
        description: 'corporation email',
        required: true
    }];
const CORPORATIONMETADATAARR_ZH = [
    {
        title: '授权代表',
        type: 'authorized',
        description: '授权代表的姓名',
        required: true
    },
    {
        title: '职位',
        type: 'title',
        description: '授权代表的职位',
        required: true
    },
    {
        title: '公司名称',
        type: 'corporationName',
        description: '签署者所在公司名称',
        required: true
    },
    {
        title: '邮箱',
        type: 'email',
        description: '签署者所在公司的邮箱',
        required: true
    }];
const INITCUSTOMMETADATA = [{
    title: '',
    type: '',
    description: '',
    required: false
}];
const EMAIL_UNAUTHORIZE = 'refuse_to_authorize_email';
const NO_PUBLIC_EMAIL = 'no_public_email';
const SYSTEM_ERROR = 'system_error';
const EMAIL_ERROR = 'error_code';
const GITEE_CHECK_REPO_401_ERROR_PRIVATE = '401 Unauthorized: no \'projects\' scope';
const GITEE_CHECK_REPO_401_ERROR_TOKEN_EXIST = '401 Unauthorized: Access token does not exist';
const PWD_MIN_LENGTH = 8;
const PWD_MAX_LENGTH = 18;
const PWD_MIN_ASCII = 33;
const PWD_MAX_ASCII = 126;
const EMAIL_REG = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,6}$/;
const COPYRIGHT = 'MIT Licensed | Copyright © opensourceways infrastructure | ';
const ICP = '蜀ICP备20009468号-1';
const ICP_LINK = 'https://icp.chinaz.com/home/info?host=osinfra.cn';
const POLICE_RECORD = '粤公网安备 44030702003822号';
const POLICE_RECORD_LINK = 'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030702003822';
const PRIVACY_POLICY_DATA = [                            //如需添加其他语言的隐私声明，只需按照数组中对象的格式添加一个对象即可
    {
        platform: 'github',                              //隐私声明存储的平台，支持gitee和github
        owner: 'opensourceways',                         //隐私声明存储的公开组织
        repo: 'app-cla-server',                          //隐私声明存储的公开仓库
        path: 'clasign_privacy_policy_en.md',      //隐私声明在仓库中的路径
        language: 'English'                             //隐私声明的语言类别
    },
    {
        platform: 'github',                              //隐私声明存储的平台，支持gitee和github
        owner: 'opensourceways',                         //隐私声明存储的公开组织
        repo: 'app-cla-server',                          //隐私声明存储的公开仓库
        path: 'clasign_privacy_policy_zh.md',      //隐私声明在仓库中的路径
        language: 'Chinese'                             //隐私声明的语言类别
    }
];
const SIGN_ROUTER = '/sign';
const TITLE_OPTIONS_EN = [
    {label: 'Telephone', value: 'Telephone'},
    {label: 'Address', value: 'Address'},
    {label: 'Fax', value: 'Fax'}
];
const TITLE_OPTIONS_ZH = [
    {label: '电话', value: '电话'},
    {label: '地址', value: '地址'},
    {label: '传真', value: '传真'}
];
const STOCK_SIGN_LINK = {
    'Z2l0ZWUlMkZvcGVuZXVsZXI=': 'gitee_openeuler-1611298811283968340',
    'Z2l0ZWUlMkZhc2NlbmQ=': 'gitee_ascend-1611222220829317930',
    'Z2l0ZWUlMkZvcGVuZ2F1c3M=': 'gitee_opengauss-1614047760000855378',
    'Z2l0ZWUlMkZvcGVubG9va2VuZw==': 'gitee_openlookeng-1614322910578209320',
    'Z2l0ZWUlMkZlZGFoZWxwZXI=': 'gitee_edahelper-1620887083478580559',
    'Z2l0ZWUlMkZIVy1QTExhYg==': 'gitee_HW-PLLab-1628740605522948013',
    'Z2l0aHViJTJGa3VucGVuZ2NvbXB1dGU=': 'github_kunpengcompute-1623060284995657822',
    'Z2l0ZWUlMkZtaW5kc3BvcmU=': 'gitee_mindspore-1614155835277678289'
};
const OPENLOOKENG_SIGN_URL = 'https://clasign.openlookeng.io';
const OPENLOOKENG_LINKID = 'gitee_openlookeng-1614322910578209320';
