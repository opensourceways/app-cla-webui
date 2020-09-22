<template>
    <div >
        <el-row>
            <el-col :span="8" :offset="8" style="padding:3rem ">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-select
                                v-model="platform"
                                clearable=""
                                filterable=""
                                @change="changePlatform"
                                value="">
                            <el-option
                                    v-for="item in platformOption"
                                    :key="item.value"
                                    :value="item.value"
                                    :label="item.label">

                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="8">
                        <el-select
                                clearable=""
                                filterable=""
                                v-model="org"
                                @change="changeOrg"
                                value="">
                            <el-option
                                    v-for="item in orgOption"
                                         :key="item.value"
                                         :value="item.value"
                                         :label="item.label">

                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="8">
                        <el-select
                                clearable=""
                                filterable=""
                                v-model="repo"
                                value="">
                            <el-option
                                    v-for="item in repoOption"
                                         :key="item.value"
                                         :value="item.value"
                                         :label="item.label">

                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="margin: 3rem 0">
                    <el-col :span="8" :offset="8">
                        <el-button type="primary" style="width: 100%" @click="submit">
                            SUBMIT
                        </el-button>
                    </el-col>

                </el-row>
            </el-col>
        </el-row>


    </div>
</template>

<script>
    import * as url from '../until/api'
    import {mapActions} from 'vuex'

    export default {
        name: "RepoSelect",
        data(){
            return {
                platform: '',
                platformOption: [{value: 'gitee', label: 'gitee'}, {value: 'github', label: 'github'},],
                org:'',
                orgOption: [],
                repo:'',
                repoOption: [],
            };
        },
        methods:{
            ...mapActions(['setLoginTypeAct','setRepoInfoAct']),
            changeOrg(val){
                console.log(val);

                this.getRepo()
            },
            changePlatform(){
                    this.getOrg(this.platform)
            },
            submit(){
                this.toSignCla()
                if (this.org === '') {
                    this.$message.closeAll()
                    this.$message.error("please select org or repo")
                }else {
                    if (!this.repoOption.length) {
                        console.log('直接绑定的组织');

                        this.toSignCla()

                    } else {
                        if (this.repo === '') {
                            this.$message.closeAll()
                            this.$message.error("please select repo")
                        } else {
                            this.toSignCla()
                        }
                    }
                }

            },
            toSignCla(){
                    this.setRepoInfoAct({platform:this.platform,org_id:this.org,repo_id:this.repo});
                if (this.platform === 'gitee') {
                    console.log('gitee');

                    if (this.$store.state.loginType==='individual'||this.$store.state.loginType==='employee') {
                        console.log('individual');
                        this.$axios({
                            url:`/api${url.getAuthCodeUrl}/${this.platform}/sign`,
                        }).then(res=>{
                            console.log(res);
                            window.location.href =res.data.url

                        }).catch(err=>{
                            console.log(err);
                        })
                        }else if (this.$store.state.loginType === 'corporation') {
                            this.$router.push('/signCla')
                        }else{
                        this.$router.push('/corporationManagerLogin')
                    }
                    }else if(this.platform === 'github'){
                    console.log('github');

                    if (this.$store.state.loginType==='individual'||this.$store.state.loginType==='employee') {
                            window.location.href = 'https://github.com/login/oauth/authorize?client_id=d86f4915398dad23bffc&redirect_uri=http://localhost:8080/home&scope=user,user:email'  //逗号分隔多个权限
                        }else{
                            this.$router.push('/signCla')
                        }
                    }

            },
            getOrg(platform){
                console.log(platform);
                let applyTo='';
                if (this.$store.state.loginType === 'individual' || this.$store.state.loginType === 'employee') {
                    applyTo='individual';
                }else{
                    applyTo='corporation';

                }
                    this.$axios({
                        url: `/api${url.getSignPage}/${platform}//${applyTo}`,
                        params:{
                            repo_id:'',
                        }
                    }).then(res=>{
                        console.log(res);
                        this.orgOption=[];
                        this.repoOption=[]
                        this.org=''
                        this.repo=''
                        if (res.data.length) {
                            let arr =[]
                            res.data.forEach(item=>{
                                arr.push(item.org_id)
                            })
                            let newSet = new Set(arr)
                            console.log(newSet);
                            arr = [...newSet];
                            arr.forEach(item=>{
                                this.orgOption.push({label:item,value:item})
                            })

                            console.log(this.orgOption);
                        }
                    }).catch(err=>{
                        console.log(err);
                    })

            },
            getRepo(){
                console.log(this.org);
                let applyTo='';
                if (this.$store.state.loginType === 'individual' || this.$store.state.loginType === 'employee') {
                    applyTo='individual';
                }else{
                    applyTo='corporation';

                }
                this.$axios({
                    url:`/api${url.getSignPage}/${this.platform}/${this.org}/${applyTo}`,
                    params: {
                        repo_id:'',
                    }
                }).then(res=>{
                    console.log(res);
                    this.repoOption=[];
                    this.repo=''
                    if (res.data.length) {
                        let arr =[]
                        res.data.forEach(item=>{
                            arr.push(item.repo_id)
                        })
                        let newSet = new Set(arr)
                        console.log(newSet);
                        arr = [...newSet];
                        arr.forEach(item=>{
                            this.repoOption.push({label:item,value:item})
                        })

                        console.log(this.repoOption);
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
        },
        created() {

        }
    }
</script>

<style scoped>

</style>