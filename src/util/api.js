export const login = '/v1/login';                                                   //loginIn
export const uploadCla = '/v1/cla';                                                 //上传Cla post 参数  text,name,language,user
export const getCla = '/v1/cla';                                                    //获取Cla get 参数 /:link_id
export const getClaInfo = '/v1/link';                                               //获取cla get  params /${org_cla_id}/cla
export const delCla = '/v1/cla';                                                    //删除cla delete
export const getGiteeOrgsInfo = 'https://gitee.com/api/v5/user/orgs';               //获取gitee授权用户的组织信息
export const getGithubOrgsInfo = 'https://api.github.com/user/orgs';                //获取github授权用户的组织信息
export const linkRepository = '/v1/link';                                           //绑定开源项目  post
export const getLinkedRepoList = '/v1/link';                                        //获取已绑定的开源项目list  method:get
export const unLinkRepository = '/v1/link';                                         //解除绑定开源项目 delete
export const individual_signing = '/v1/individual-signing';                         //个人签署协议 方式post 参数/cla_org_id,  name,email,info
export const corporation_signing = '/v1/corporation-signing';                       //企业签署协议 方式post 参数  link_id,email,info
export const getCorporationSigning = '/v1/corporation-signing';                     //拉取已签署的企业列表 method:get params  /:link_id
export const getDeletedCorpInfo = '/v1/corporation-signing/deleted';                //拉取已删除的企业列表 method:get params  /:link_id
export const employee_signing = '/v1/employee-signing';                             //企业个人签署协议 方式post 参数 /cla_org_id,  name,email,info,verification_code
export const deleteCon = '/v1/deleteContributor';                                   //删除企业白名单
export const changeActive = '/v1/changeActive';                                     //修改企业白名单人员状态
export const getSignPage = '/v1/link';                                              //获取已绑定cla的组织   方式get   参数platform、org_id、apply_to
export const corporationManager = '/v1/corporation-manager';                        //激活企业发送root账号   方式post   参数cla_org_id、email
export const corporationManagerAuth = '/v1/corporation-manager/auth';               //企业管理员登陆      方式post   参数org_id、repo_id,platform,user,password
export const resetPassword = '/v1/corporation-manager';                             //企业管理员重置密码      方式put   参数cla_org_id、email,old_password,new_password
export const addEmployeeManager = '/v1/employee-manager';                           //添加企业个人签署者管理员   方式post   参数cla_org_id、emails
export const deleteEmployeeManager = '/v1/employee-manager';                        //删除企业个人签署者管理员   方式delete   参数cla_org_id、emails
export const queryEmployeeManager = '/v1/employee-manager';                         //获取企业个人签署者管理员   方式get   参数cla_org_id、email
export const queryEmployee = '/v1/employee-signing';                                //获取企业个人签署者   方式get   参数platform、org_id,repo_id,corporation_email
export const enableEmployee = '/v1/employee-signing';                               //激活企业个人签署者   方式put   参数/email,
export const deleteEmployee = '/v1/employee-signing';                               //激活企业个人签署者   方式delete   参数/email,
export const getAuthCodeUrl = '/v1/auth/authcodeurl';                               //获取授权登陆的链接   方式get   参数/platform,/purpose
export const getAuthEmail = '/v1/email/authcodeurl/gmail/init_auth';                //邮箱授权             方式get
export const getReAuthEmail = '/v1/email/authcodeurl/gmail/reauth';                 //邮箱重新授权          方式get
export const sendVerifyCode = '/v1/verification-code';                              //给邮箱发送验证码       方式post  参数：/link_id,email
export const uploadSignature = '/v1/org-signature';                                 //上传pdf签名页        方式post  参数：/link_id
export const downloadSignature = '/v1/org-signature';                               //下载pdf签名页        方式get  参数：/:link_id/:language
export const getPrivacy = '/v1/getPrivacy';                                         //获取隐私声明          方式get
export const corporationPdf = '/v1/corporation-pdf';                                //上传pdf签名页        方式patch  参数：/link_id/email
export const resend_pdf = '/v1/corporation-signing';                                //重发企业签名pdf      方式post  参数：/link_id/email
export const getBlankSignature = 'v1/org-signature/blank';                          //下载空白签名页       方式get  参数：/:language
export const addCla = 'v1/cla';                                                     //增加其他语言的CLA     方式post  参数：/:link_id/:apply_to
export const findPwdSendCode = 'v1/findPwdSendCode';                                //忘记密码发送验证码     方式  参数：
export const submitVerifyCode = 'v1/submitVerifyCode';                              //忘记密码比对验证码     方式  参数：
export const submitNewPassword = 'v1/submitNewPassword';                            //提交新密码        方式  参数：
export const getOrg = 'v1/org-repo';                                                //获取org列表      方式get
export const checkRepo = 'v1/org-repo';                                             //检查repo是否存在   方式get  参数   /:org/:repo

