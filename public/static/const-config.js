const SIGNATURE_FILE_MAX_SIZE = 5;        //M
const COPYRIGHT = 'Copyright ©2020 claSign';
const INDIVIDUALMETADATAARR_EN = [
    {
        title: 'Name',
        type: 'name',
        description: 'Your name',
        required: true,
    },
    {
        title: 'E-Mail',
        type: 'email',
        description: 'Email for signing CLA',
        required: true,
    },
];
const INDIVIDUALMETADATAARR_ZH = [
    {
        title: '姓名',
        type: 'name',
        description: '你的姓名',
        required: true,
    },
    {
        title: '邮箱',
        type: 'email',
        description: '签署CLA的邮箱',
        required: true,
    },
];
const CORPORATIONMETADATAARR_EN = [
    {
        title: 'Authorized Representative',
        type: 'authorized',
        description: 'name of Authorized Representative',
        required: true,
    },
    {
        title: 'Title',
        type: 'title',
        description: 'title of Authorized Representative',
        required: true,
    },
    {
        title: 'Corporation Name',
        type: 'corporationName',
        description: 'corporation name',
        required: true,
    },

    {
        title: 'E-Mail',
        type: 'email',
        description: 'corporation email',
        required: true,
    },];
const CORPORATIONMETADATAARR_ZH = [
    {
        title: '授权代表',
        type: 'authorized',
        description: '授权代表的姓名',
        required: true,
    },
    {
        title: '职位',
        type: 'title',
        description: '授权代表的职位',
        required: true,
    },
    {
        title: '公司名称',
        type: 'corporationName',
        description: '签署者所在公司名称',
        required: true,
    },
    {
        title: '邮箱',
        type: 'email',
        description: '签署者所在公司的邮箱',
        required: true,
    },];
const INITCUSTOMMETADATA = [{
    title: '',
    type: '',
    description: '',
    required: false,
}];
const DATATYPEOPTIONS = [
    {label: 'name', value: 'name'}, {
        label: 'corporationName',
        value: 'corporationName'
    }, {label: 'date', value: 'date'}, {
        label: 'telephone',
        value: 'telephone'
    }, {label: 'address', value: 'address'}, {label: 'email', value: 'email'}, {
        label: 'fax',
        value: 'fax'
    },
];
const EMAIL_UNAUTHORIZE = 'refuse_to_authorize_email';
const NO_PUBLIC_EMAIL = 'no_public_email';
const SYSTEM_ERROR = 'system_error';
const EMAIL_ERROR = 'error_code';
const GITEE_CHECK_REPO_401_ERROR_PRIVATE = '401 Unauthorized: no \'projects\' scope';
const GITEE_CHECK_REPO_401_ERROR_TOKEN_EXIST = '401 Unauthorized: Access token does not exist';
const PWD_MIN_LENGTH = 6;
const PWD_MAX_LENGTH = 16;
const PWD_MIN_ASCII = 33;
const PWD_MAX_ASCII = 126;
const EMAIL_REG = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,6}$/;
const SIGN_ROUTER = '/sign';



