<template>
    <el-row id="configThree">
        <div class="itemBox">
            <div class="stepTitle">
                ③ Email
            </div>
            <div class="margin-top-1rem">
                Authorize an email to send signed documents to the signer
            </div>
            <div class="margin-top-1rem">
                <el-input
                        readonly=""
                        size="medium"
                        class="emailInput"
                        placeholder="click to grant authorized email"
                        @click.native="toAuthorizedEmail()"
                        v-model="email">
                </el-input>
            </div>
        </div>
        <div class="stepBtBox">
            <el-button size="medium" type="primary" class="stepBt" @click="toConfigFields">Previous Step</el-button>
            <el-button size="medium" type="primary" class="stepBt" @click="toConfigCheck">Next Step</el-button>
        </div>
        <el-dialog
                top="5vh"
                title=""
                :visible.sync="emailDialogVisible"
                width="35%">
            <div>
                <p class="dialogDesc">You need to select an email address for your organization to contact</p>
                <div>

                    <el-row>
                        <el-col :offset="6" :span="12">
                            <el-select
                                    placeholder="Select email type"
                                    size="medium"
                                    filterable
                                    v-model="emailType"
                                    @change="changeEmailType">
                                <el-option
                                        v-for="item in emailTypeArr"
                                        :key="item.value"
                                        :value="item.value"
                                        :label="item.label">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                </div>
                <div style="padding: 0 3rem;color: #409EFF">
                </div>
                <div style="padding: 2rem 6rem;text-align: left;font-size: 1.3rem">
                    <p style="text-align: center">CLA system will...</p>
                    <ul>
                        <li>Send the white list management account number to the enterprise through the mailbox</li>
                        <li>Send PDF signature documents to the signer through this email address</li>
                    </ul>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="emailDialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="authorizeEmail()">Yes,Let's do this!</el-button>
                </span>
            </div>
        </el-dialog>
    </el-row>
</template>

<script>
    import * as url from '../until/api'
    import http from '../until/http'

    export default {
        name: "ConfigThree",
        computed: {
            isEmail() {
                return `${this.$store.state.isEmail}` === 'true';
            },
        },
        data() {
            return {
                email: '',
                emailDialogVisible: false,
                emailTypeArr: [{value: 'G-Mail', label: 'G-Mail'}],
                emailType: '',
            }
        },
        methods: {
            toConfigFields() {
                this.$router.push('/config-fields')
            },
            toConfigCheck() {
                this.$router.push('/config-check')
            },
            getCookieData() {
                if (document.cookie !== '') {
                    let cookieArr = document.cookie.split('; ');
                    let email = '';
                    cookieArr.forEach((item, index) => {
                        let arr = item.split('=');
                        let name = arr[0].trim();
                        let value = arr[1].trim();
                        if (name === 'email') {
                            email = value
                        }
                        this.$cookie.remove(name, {path: '/'});
                    });
                    this.email = email;
                    if (email) {
                        this.$store.commit('setIsEmail', true)
                    }
                }
            },
            toAuthorizedEmail() {
                this.emailDialogVisible = true;
            },
            authorizeEmail() {
                let myUrl = '';
                switch (this.emailType) {
                    case 'G-Mail':
                        myUrl = url.getAuthEmail;
                        break;
                }
                this.$axios({
                    url: '/api' + myUrl,
                    headers: {'Token': this.$store.state.access_token},
                }).then(res => {
                    window.location.href = res.data.data.url;
                }).catch(err => {
                })
            },
            changeEmailType(value) {
            },
            getEmailTypeArr() {
                this.$axios({
                    url: '/api' + url.getEmailTypeArr,
                }).then(res => {
                    this.emailTypeArr = res.data
                }).catch(err => {
                })
            },
        }
    }
</script>

<style lang="less">
    #configThree {
        .stepTitle {
            font-size: 1.2rem;
            padding: .5rem;
        }

        .itemBox {
            border-radius: 1.25rem;
            box-shadow: 0 0 20px 10px #F3F3F3;
            padding: 2rem;
            margin-bottom: 2rem;

            .emailInput {
                cursor: pointer;
            }
        }
    }
</style>