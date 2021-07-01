<template>
    <el-row class="index" id="transparentDiv" ref="transparentDiv" :style="transparentDiv">
        <NewHeader></NewHeader>
        <div v-if="IS_MOBILE">
            <el-row id="mobile_section">
                <el-col>
                    <el-row>
                        <el-col :offset="3" :span="18" style="height: 100%">
                            <el-row>
                                <el-col align="center" class="title" style="height: 100%">
                                    <div class="name">
                                        <div>
                                            <p><span>C</span>ontributor</p>
                                            <p><span>L</span>icense</p>
                                            <p><span>A</span>greement</p>
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>
                            <div class="mobile_backgroundBox">
                                <img class="mobile_img" src="../assets/images/backgroundx1.png" alt="">
                            </div>
                            <el-row class="signType" style="height: 100%">
                                <el-col id="mobile_sign" style="height: 100%">
                                    <el-row>
                                        <el-col align="center" class="buttonBox">
                                            <div id="mobile_btBox">
                                                <div>
                                                    <button :disabled="!isBindCorpCLA" class="mobile_button"
                                                            @click="submit('corporation')">
                                                        {{ $t('signType.corpBt') }}
                                                    </button>
                                                </div>
                                                <div>
                                                    <button :disabled="!isBindCorpCLA"
                                                            class="mobile_button"
                                                            @click="submit('employee')">
                                                        {{ $t('signType.empBt') }}
                                                    </button>
                                                </div>
                                                <button class="mobile_button"
                                                        @click="submit('individual')">
                                                    {{ $t('signType.individualBt') }}
                                                </button>
                                                <button class="mobile_button"
                                                        @click="submit('corporationManager')">
                                                    {{$t('index.corp_login')}}
                                                </button>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </el-col>

                            </el-row>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-row class="guideTitle">
                                {{ $t('signType.mobileGuideTitle') }}
                            </el-row>
                            <el-row class="guide-border padding-half-1rem">
                                <el-col>
                                    <el-row class="pointer" @click.native="clickCorpGuide()" type="flex" align="middle">
                                        <el-col :offset="1" :span="4">
                                            <svg-icon icon-class="Enterprise" class="mobile_SignTypeIcon"></svg-icon>
                                        </el-col>
                                        <el-col align="left" :span="14">
                                            <span class="font-bold">{{ $t('signType.corp') }}</span>
                                        </el-col>
                                        <el-col :span="3">
                                            <svg-icon v-if="corpGuideIsOpen" icon-class="down-arrow"
                                                      class="mobile_SignTypeIcon_arrow"></svg-icon>
                                            <svg-icon v-else icon-class="right-arrow"
                                                      class="mobile_SignTypeIcon_arrow"></svg-icon>
                                        </el-col>
                                    </el-row>
                                    <el-row v-if="corpGuideIsOpen" class="mobile-guideBox padding-bottom-5rem">
                                        <el-col>
                                            <el-row class="stepBox">
                                                <el-col class="iconBox" :offset="1" :span="4">
                                                    <svg-icon class="stepIcon" icon-class="click"></svg-icon>
                                                </el-col>
                                                <el-col :span="19" class="textCol">
                                                    <div class="rightText padding-left-1rem">
                                                        {{ $t('signType.corpStep1_1') }}<span class="pointer"
                                                                                              @click="submit('corporation')">{{ $t('signType.corpBt') }}</span>{{
                                                        $t('signType.corpStep1_2') }}
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col class="lineBox" :offset="1" :span="4">
                                                    <div class="greenLine">
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row class="stepBox">
                                                <el-col class="iconBox" :offset="1" :span="4">
                                                    <svg-icon class="stepIcon" icon-class="sign"></svg-icon>
                                                </el-col>
                                                <el-col :span="19" class="textCol">
                                                    <div class="rightText padding-left-1rem">
                                                        {{ $t('signType.corpStep2') }}
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col class="lineBox" :offset="1" :span="4">
                                                    <div class="greenLine">
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row class="stepBox">
                                                <el-col class="iconBox" :offset="1" :span="4">
                                                    <svg-icon class="stepIcon" icon-class="send"></svg-icon>
                                                </el-col>
                                                <el-col :span="19" class="textCol">
                                                    <div class="rightText padding-left-1rem">
                                                        {{ $t('signType.corpStep3') }}
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col class="lineBox" :offset="1" :span="4">
                                                    <div class="greenLine">
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row class="stepBox">
                                                <el-col class="iconBox" :offset="1" :span="4">
                                                    <svg-icon class="stepIcon" icon-class="auth"></svg-icon>
                                                </el-col>
                                                <el-col :span="19" class="textCol">
                                                    <div class="rightText padding-left-1rem">
                                                        {{ $t('signType.corpStep4') }}
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col class="lineBox" :offset="1" :span="4">
                                                    <div class="greenLine">
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row class="stepBox">
                                                <el-col class="iconBox" :offset="1" :span="4">
                                                    <svg-icon class="stepIcon" icon-class="success"></svg-icon>
                                                </el-col>
                                                <el-col :span="19" class="textCol">
                                                    <div class="rightText padding-left-1rem">
                                                        {{ $t('signType.corpStep5') }}
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col class="lineBox" :offset="1" :span="4">
                                                    <div class="greenLine">
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row class="stepBox">
                                                <el-col class="iconBox" :offset="1" :span="4">
                                                    <svg-icon class="stepIcon" icon-class="manage"></svg-icon>
                                                </el-col>
                                                <el-col :span="19" class="textCol">
                                                    <div class="rightText padding-left-1rem">
                                                        {{ $t('signType.corpStep6_1') }}<span class="func-link"
                                                                                              @click="toCorpLogin()">{{ $t('signType.admin_platform') }}</span>{{
                                                        $t('signType.corpStep6_2') }}
                                                    </div>
                                                </el-col>
                                            </el-row>
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                            <el-row class="padding-half-1rem">
                                <el-col>
                                    <el-row class="pointer" @click.native="clickEmpGuide()" type="flex" align="middle">
                                        <el-col :offset="1" :span="4">
                                            <svg-icon icon-class="Employee" class="mobile_SignTypeIcon"></svg-icon>
                                        </el-col>
                                        <el-col align="left" :span="14">
                                            <span class="font-bold">{{ $t('signType.emp') }}</span>
                                        </el-col>
                                        <el-col :span="3">
                                            <svg-icon v-if="employeeGuideIsOpen" icon-class="down-arrow"
                                                      class="mobile_SignTypeIcon_arrow"></svg-icon>
                                            <svg-icon v-else icon-class="right-arrow"
                                                      class="mobile_SignTypeIcon_arrow"></svg-icon>
                                        </el-col>
                                    </el-row>
                                    <el-row v-if="employeeGuideIsOpen" class="mobile-guideBox padding-bottom-5rem">
                                        <el-col>
                                            <el-row class="stepBox">
                                                <el-col class="iconBox" :offset="1" :span="4">
                                                    <svg-icon class="stepIcon " icon-class="click"></svg-icon>
                                                </el-col>
                                                <el-col :span="19" class="textCol">
                                                    <div class="rightText padding-left-1rem">
                                                        {{ $t('signType.empStep1_1')}}
                                                        <span class="pointer" @click="submit('employee')">{{ $t('signType.empBt') }}</span>
                                                        {{$t('signType.corpStep1_2')}}
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col class="lineBox" :offset="1" :span="4">
                                                    <div class="greenLine">
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row class="stepBox">
                                                <el-col class="iconBox" :offset="1" :span="4">
                                                    <svg-icon class="stepIcon" icon-class="sign"></svg-icon>
                                                </el-col>
                                                <el-col :span="19" class="textCol">
                                                    <div class="rightText padding-left-1rem">
                                                        {{ $t('signType.empStep2') }}
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col class="lineBox" :offset="1" :span="4">
                                                    <div class="greenLine">
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row class="stepBox">
                                                <el-col class="iconBox" :offset="1" :span="4">
                                                    <svg-icon class="stepIcon" icon-class="send"></svg-icon>
                                                </el-col>
                                                <el-col :span="19" class="textCol">
                                                    <div class="rightText padding-left-1rem">
                                                        {{ $t('signType.corpStep2') }}
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col class="lineBox" :offset="1" :span="4">
                                                    <div class="greenLine">
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row class="stepBox">
                                                <el-col class="iconBox" :offset="1" :span="4">
                                                    <svg-icon class="stepIcon" icon-class="auth"></svg-icon>
                                                </el-col>
                                                <el-col :span="19" class="textCol">
                                                    <div class="rightText padding-left-1rem">
                                                        {{ $t('signType.empStep4') }}
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col class="lineBox" :offset="1" :span="4">
                                                    <div class="greenLine">
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row class="stepBox">
                                                <el-col class="iconBox" :offset="1" :span="4">
                                                    <svg-icon class="stepIcon" icon-class="success"></svg-icon>
                                                </el-col>
                                                <el-col :span="19" class="textCol">
                                                    <div class="rightText padding-left-1rem">
                                                        {{ $t('signType.empStep5') }}
                                                    </div>
                                                </el-col>
                                            </el-row>
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                            <el-row :class="{'border-bottom':!individualGuideIsOpen}"
                                    class="border-top padding-half-1rem">
                                <el-col>
                                    <el-row class="pointer" @click.native="clickIndividualGuide()" type="flex"
                                            align="middle">
                                        <el-col :offset="1" :span="4">
                                            <svg-icon icon-class="Individual" class="mobile_SignTypeIcon"></svg-icon>
                                        </el-col>
                                        <el-col align="left" :span="14">
                                            <span class="font-bold">{{ $t('signType.individual') }}</span>
                                        </el-col>
                                        <el-col :span="3">
                                            <svg-icon v-if="individualGuideIsOpen" icon-class="down-arrow"
                                                      class="mobile_SignTypeIcon_arrow"></svg-icon>
                                            <svg-icon v-else icon-class="right-arrow"
                                                      class="mobile_SignTypeIcon_arrow"></svg-icon>
                                        </el-col>
                                    </el-row>
                                    <el-row v-if="individualGuideIsOpen" class="mobile-guideBox">
                                        <el-col>
                                            <el-row class="stepBox">
                                                <el-col class="iconBox" :offset="1" :span="4">
                                                    <svg-icon class="stepIcon" icon-class="click"></svg-icon>
                                                </el-col>
                                                <el-col :span="19" class="textCol">
                                                    <div class="rightText padding-left-1rem">
                                                        {{ $t('signType.individualStep1_1')
                                                        }}<span class="pointer" @click="submit('employee')">{{ $t('signType.individualBt') }}</span>{{
                                                        $t('signType.corpStep1_2') }}
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col class="lineBox" :offset="1" :span="4">
                                                    <div class="greenLine">
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row class="stepBox">
                                                <el-col class="iconBox" :offset="1" :span="4">
                                                    <svg-icon class="stepIcon" icon-class="sign"></svg-icon>
                                                </el-col>
                                                <el-col :span="19" class="textCol">
                                                    <div class="rightText padding-left-1rem">
                                                        {{ $t('signType.individualStep2') }}
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col class="lineBox" :offset="1" :span="4">
                                                    <div class="greenLine">
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row class="stepBox">
                                                <el-col class="iconBox" :offset="1" :span="4">
                                                    <svg-icon class="stepIcon" icon-class="send"></svg-icon>
                                                </el-col>
                                                <el-col :span="19" class="textCol">
                                                    <div class="rightText padding-left-1rem">
                                                        {{ $t('signType.corpStep2') }}
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col class="lineBox" :offset="1" :span="4">
                                                    <div class="greenLine">
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row class="stepBox">
                                                <el-col class="iconBox" :offset="1" :span="4">
                                                    <svg-icon class="stepIcon" icon-class="success"></svg-icon>
                                                </el-col>
                                                <el-col :span="19" class="textCol">
                                                    <div class="rightText padding-left-1rem">
                                                        {{ $t('signType.individualStep4') }}
                                                    </div>
                                                </el-col>
                                            </el-row>
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
        <div v-else>
            <el-row id="section">
                <el-col>
                    <el-row class="actionBox">
                        <div class="backgroundBox">
                            <img src="../assets/images/backgroundx1.png" alt="">
                        </div>
                        <el-col :span="14" style="height: 100%">
                            <el-row style="height: 100%">
                                <el-col class="title" style="height: 100%">
                                    <div class="name">
                                        <div>
                                            <p><span>C</span>ontributor</p>
                                            <p><span>L</span>icense</p>
                                            <p><span>A</span>greement</p>
                                        </div>
                                    </div>
                                </el-col>

                            </el-row>
                        </el-col>
                        <el-col :span="10" style="height: 100%;">
                            <el-row class="signType" style="height: 100%">
                                <div id="sign">
                                    <el-row style="height: 75%">
                                        <el-col align="right" class="buttonBox">
                                            <div id="btBox">
                                                <div>
                                                    <el-tooltip :content="corpBtTooltip" placement="left" effect="light"
                                                                popper-class="my_tooltip" :enterable="false">
                                                        <div class="display-inline-block margin-1D2rem border-radius-2rem">
                                                            <button :disabled="!isBindCorpCLA" class="button"
                                                                    @click="submit('corporation')">
                                                                {{ $t('signType.corpBt') }}
                                                            </button>
                                                        </div>

                                                    </el-tooltip>
                                                </div>
                                                <div>
                                                    <el-tooltip :content="empBtTooltip" placement="left" effect="light"
                                                                popper-class="my_tooltip" :enterable="false">
                                                        <div class="display-inline-block margin-1D2rem border-radius-2rem">
                                                            <button :disabled="!isBindCorpCLA"
                                                                    class="button"
                                                                    @click="submit('employee')">
                                                                {{ $t('signType.empBt') }}
                                                            </button>
                                                        </div>

                                                    </el-tooltip>
                                                </div>
                                                <el-tooltip :content="individualBtTooltip" placement="left"
                                                            effect="light" :enterable="false"
                                                            popper-class="my_tooltip">
                                                    <div class="display-inline-block margin-1D2rem border-radius-2rem">
                                                        <button class="button"
                                                                @click="submit('individual')">
                                                            {{ $t('signType.individualBt') }}
                                                        </button>
                                                    </div>
                                                </el-tooltip>
                                                <el-tooltip :content="$t('index.corp_bt_tip')" placement="left"
                                                            effect="light" :enterable="false"
                                                            popper-class="my_tooltip">
                                                    <div class="display-inline-block margin-1D2rem border-radius-2rem">
                                                        <button class="button"
                                                                @click="submit('corporationManager')">
                                                            {{$t('index.corp_login')}}
                                                        </button>
                                                    </div>
                                                </el-tooltip>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-row>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-row class="guideTitle">
                                {{ $t('signType.guideTitle') }}
                            </el-row>
                            <el-row>
                                <el-col :span="8" class="SignTypeCol" :class="{'typeShadow':signType==='corporation'}"
                                        @click.native="clickSignTypeGuide('corporation')">
                                    <div class="SignTypeBox">
                                        <svg-icon icon-class="Enterprise" class="SignTypeIcon"></svg-icon>
                                        <p>{{ $t('signType.corp') }}</p>
                                    </div>
                                    <div v-if="signType==='corporation'" class="coverBox">
                                    </div>
                                </el-col>
                                <el-col :span="8" class="SignTypeCol" :class="{'typeShadow':signType==='employee'}"
                                        @click.native="clickSignTypeGuide('employee')">
                                    <div class="SignTypeBox">
                                        <svg-icon icon-class="Employee" class="SignTypeIcon"></svg-icon>
                                        <p>{{ $t('signType.emp') }}</p>
                                    </div>
                                    <div v-if="signType==='employee'" class="coverBox">
                                    </div>
                                </el-col>
                                <el-col :span="8" class="SignTypeCol" :class="{'typeShadow':signType==='individual'}"
                                        @click.native="clickSignTypeGuide('individual')">
                                    <div class="SignTypeBox">
                                        <svg-icon icon-class="Individual" class="SignTypeIcon"></svg-icon>
                                        <p>{{ $t('signType.individual') }}</p>
                                    </div>
                                    <div v-if="signType==='individual'" class="coverBox">
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row v-if="signType==='corporation'" class="guideBox">
                                <div class="stepCoverBox">
                                </div>
                                <el-col>
                                    <el-row class="stepBox">
                                        <el-col class="iconBox" :offset="10" :span="4">
                                            <svg-icon class="stepIcon" icon-class="click"></svg-icon>
                                        </el-col>
                                        <el-col :span="10" class="textCol">
                                            <div class="rightText">
                                                {{ $t('signType.corpStep1_1') }}
                                                <span class="pointer" @click="submit('corporation')">{{ $t('signType.corpBt') }}</span>{{
                                                $t('signType.corpStep1_2') }}
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row>

                                        <el-col class="lineBox" :offset="10" :span="4">
                                            <div class="greenLine">

                                            </div>
                                        </el-col>

                                    </el-row>

                                    <el-row class="stepBox">
                                        <el-col :span="10" class="textCol">
                                            <div class="leftText">
                                                {{ $t('signType.corpStep2') }}
                                            </div>
                                        </el-col>
                                        <el-col class="iconBox" :span="4">
                                            <svg-icon class="stepIcon" icon-class="sign"></svg-icon>
                                        </el-col>
                                        <el-col :span="10">
                                            <div>

                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row>

                                        <el-col class="lineBox" :offset="10" :span="4">
                                            <div class="greenLine">

                                            </div>
                                        </el-col>

                                    </el-row>
                                    <el-row class="stepBox">

                                        <el-col class="iconBox" :offset="10" :span="4">
                                            <svg-icon class="stepIcon" icon-class="send"></svg-icon>
                                        </el-col>
                                        <el-col :span="10" class="textCol">
                                            <div class="rightText">
                                                {{ $t('signType.corpStep3') }}
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row>

                                        <el-col class="lineBox" :offset="10" :span="4">
                                            <div class="greenLine">

                                            </div>
                                        </el-col>

                                    </el-row>
                                    <el-row class="stepBox">
                                        <el-col :span="10" class="textCol">
                                            <div class="leftText">
                                                {{ $t('signType.corpStep4') }}
                                            </div>
                                        </el-col>
                                        <el-col class="iconBox" :span="4">
                                            <svg-icon class="stepIcon" icon-class="auth"></svg-icon>
                                        </el-col>
                                        <el-col :span="10">
                                            <div>

                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row>

                                        <el-col class="lineBox" :offset="10" :span="4">
                                            <div class="greenLine">

                                            </div>
                                        </el-col>

                                    </el-row>
                                    <el-row class="stepBox">

                                        <el-col class="iconBox" :offset="10" :span="4">
                                            <svg-icon class="stepIcon" icon-class="success"></svg-icon>
                                        </el-col>
                                        <el-col :span="10" class="textCol">
                                            <div class="rightText">
                                                {{ $t('signType.corpStep5') }}
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row>

                                        <el-col class="lineBox" :offset="10" :span="4">
                                            <div class="greenLine">

                                            </div>
                                        </el-col>

                                    </el-row>
                                    <el-row class="stepBox">
                                        <el-col :span="10" class="textCol">
                                            <div class="leftText">
                                                {{ $t('signType.corpStep6_1') }}<span @click="toCorpLogin()">{{ $t('signType.admin_platform') }}</span>{{
                                                $t('signType.corpStep6_2') }}
                                            </div>
                                        </el-col>
                                        <el-col class="iconBox" :span="4">
                                            <svg-icon class="stepIcon" icon-class="manage"></svg-icon>
                                        </el-col>
                                        <el-col :span="10">
                                            <div>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                            <el-row v-if="signType==='employee'" class="guideBox">
                                <el-col>
                                    <el-row class="stepBox">
                                        <el-col class="iconBox" :offset="10" :span="4">
                                            <svg-icon class="stepIcon" icon-class="click"></svg-icon>
                                        </el-col>
                                        <el-col :span="10" class="textCol">
                                            <div class="rightText">
                                                {{ $t('signType.empStep1_1')}}
                                                <span class="pointer" @click="submit('employee')">{{ $t('signType.empBt') }}</span>
                                                {{$t('signType.corpStep1_2')}}
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col class="lineBox" :offset="10" :span="4">
                                            <div class="greenLine">
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row class="stepBox">
                                        <el-col :span="10" class="textCol">
                                            <div class="leftText">
                                                {{ $t('signType.empStep2') }}
                                            </div>
                                        </el-col>
                                        <el-col class="iconBox" :span="4">
                                            <svg-icon class="stepIcon" icon-class="sign"></svg-icon>
                                        </el-col>
                                        <el-col :span="10">
                                            <div>
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col class="lineBox" :offset="10" :span="4">
                                            <div class="greenLine">
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row class="stepBox">
                                        <el-col class="iconBox" :offset="10" :span="4">
                                            <svg-icon class="stepIcon" icon-class="send"></svg-icon>
                                        </el-col>
                                        <el-col :span="10" class="textCol">
                                            <div class="rightText">
                                                {{ $t('signType.corpStep2') }}
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col class="lineBox" :offset="10" :span="4">
                                            <div class="greenLine">
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row class="stepBox">
                                        <el-col :span="10" class="textCol">
                                            <div class="leftText">
                                                {{ $t('signType.empStep4') }}
                                            </div>
                                        </el-col>
                                        <el-col class="iconBox" :span="4">
                                            <svg-icon class="stepIcon" icon-class="auth"></svg-icon>
                                        </el-col>
                                        <el-col :span="10">
                                            <div>
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col class="lineBox" :offset="10" :span="4">
                                            <div class="greenLine">
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row class="stepBox">
                                        <el-col class="iconBox" :offset="10" :span="4">
                                            <svg-icon class="stepIcon" icon-class="success"></svg-icon>
                                        </el-col>
                                        <el-col :span="10" class="textCol">
                                            <div class="rightText">
                                                {{ $t('signType.empStep5') }}
                                            </div>
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                            <el-row v-if="signType==='individual'" class="guideBox">
                                <el-col>
                                    <el-row class="stepBox">
                                        <el-col class="iconBox" :offset="10" :span="4">
                                            <svg-icon class="stepIcon" icon-class="click"></svg-icon>
                                        </el-col>
                                        <el-col :span="10" class="textCol">
                                            <div class="rightText">
                                                {{ $t('signType.individualStep1_1')
                                                }}<span class="pointer" @click="submit('employee')">{{ $t('signType.individualBt') }}</span>{{
                                                $t('signType.corpStep1_2') }}
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col class="lineBox" :offset="10" :span="4">
                                            <div class="greenLine">
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row class="stepBox">
                                        <el-col :span="10" class="textCol">
                                            <div class="leftText">
                                                {{ $t('signType.individualStep2') }}
                                            </div>
                                        </el-col>
                                        <el-col class="iconBox" :span="4">
                                            <svg-icon class="stepIcon" icon-class="sign"></svg-icon>
                                        </el-col>
                                        <el-col :span="10">
                                            <div>
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col class="lineBox" :offset="10" :span="4">
                                            <div class="greenLine">
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row class="stepBox">
                                        <el-col class="iconBox" :offset="10" :span="4">
                                            <svg-icon class="stepIcon" icon-class="send"></svg-icon>
                                        </el-col>
                                        <el-col :span="10" class="textCol">
                                            <div class="rightText">
                                                {{ $t('signType.corpStep2') }}
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col class="lineBox" :offset="10" :span="4">
                                            <div class="greenLine">
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row class="stepBox">
                                        <el-col :span="10" class="textCol">
                                            <div class="leftText">
                                                {{ $t('signType.individualStep4') }}
                                            </div>
                                        </el-col>
                                        <el-col class="iconBox" :span="4">
                                            <svg-icon class="stepIcon" icon-class="success"></svg-icon>
                                        </el-col>
                                        <el-col :span="10">
                                            <div>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
        <NewFooter></NewFooter>
        <ReTryDialog :dialogVisible="reTryDialogVisible" :message="reLoginMsg"></ReTryDialog>
        <EmailReTryDialog :dialogVisible="emailReTryDialogVisible"></EmailReTryDialog>
    </el-row>
</template>
<script>
    import NewHeader from '@components/NewHeader'
    import NewFooter from '@components/NewFooter'
    import * as util from '../util/util'
    import * as url from '../util/api'
    import _axios from '../util/_axios'
    import _cookie from 'js-cookie'
    import {mapActions} from 'vuex'
    import ReTryDialog from '../components/ReTryDialog'
    import EmailReTryDialog from '../components/EmailReTryDialog'

    export default {
        name: 'SignType',
        components: {
            NewHeader,
            NewFooter,
            ReTryDialog,
            EmailReTryDialog,
        },
        computed: {
            corpBtTooltip() {
                if (this.isBindCorpCLA) {
                    return `${this.$t('signType.corpStep1_1')}${this.$t('signType.corpBt')}${this.$t('signType.corpStep1_2')}`
                } else {
                    return this.$t('signType.not_support_corp')
                }
            },
            empBtTooltip() {
                if (this.isBindCorpCLA) {
                    return `${this.$t('signType.empStep1_1')}${this.$t('signType.empBt')}${this.$t('signType.corpStep1_2')}`
                } else {
                    return this.$t('signType.not_support_emp')
                }
            },
            individualBtTooltip() {
                return `${this.$t('signType.individualStep1_1')}${this.$t('signType.individualBt')}${this.$t('signType.corpStep1_2')}`
            },
            emailReTryDialogVisible() {
                return this.$store.state.emailErrVisible
            },
            reTryDialogVisible() {
                return this.$store.state.reTryDialogVisible
            },
            reLoginMsg() {
                return this.$store.state.dialogMessage
            },
            domain() {
                return this.$store.state.domain
            },
        },
        data() {
            return {
                isBindCorpCLA: false,
                corpGuideIsOpen: false,
                individualGuideIsOpen: false,
                employeeGuideIsOpen: false,
                base64Params: '',
                platform: '',
                org: '',
                repo: '',
                signType: 'corporation',
                transparentDiv: {
                    height: '',
                },
            }
        },
        provide() {
            return {
                setClientHeight: this.setClientHeight
            }
        },
        methods: {
            ...mapActions(['setLoginTypeAct', 'setRepoInfoAct']),
            clickIndividualGuide() {
                this.individualGuideIsOpen = !this.individualGuideIsOpen;
            },
            clickEmpGuide() {
                this.employeeGuideIsOpen = !this.employeeGuideIsOpen;
            },
            clickCorpGuide() {
                this.corpGuideIsOpen = !this.corpGuideIsOpen
            },
            toCorpLogin() {
                this.$store.commit('setLoginType', 'corporationManager');
                this.$router.push('/corporationManagerLogin')
            },
            setLangLocale() {
                if (parseInt(localStorage.getItem('lang'))) {
                    this.value = parseInt(localStorage.getItem('lang'))
                }
                switch (this.value) {
                    case 0:
                        this.$i18n.locale = 'en-us';
                        break;
                    case 1:
                        this.$i18n.locale = 'zh-cn';
                        break;
                }
            },
            getRepoInfo() {
                this.setLangLocale();
                let params = window.location.href.split('/sign/')[1];
                if (params === 'auth_failed') {
                    let cookie = document.cookie;
                    let cookieArr = cookie.split(';');
                    for (let i = 0; i < cookieArr.length; i++) {
                        let cookieKeyValue = cookieArr[i].split('=');
                        let name = cookieKeyValue[0].trim();
                        let value = cookieKeyValue[1].trim();
                        _cookie.remove(name, {path: '/'});
                        if (name === "error_code") {
                            switch (value) {
                                case 'auth_failed':
                                    this.$store.commit('errorCodeSet', {
                                        dialogVisible: true,
                                        dialogMessage: this.$t('tips.refuse_authorize', {platform: this.$store.state.repoInfo.platform}),
                                    });
                                    break;
                                case EMAIL_UNAUTHORIZE:
                                    this.$store.commit('errorCodeSet', {
                                        dialogVisible: true,
                                        dialogMessage: this.$t('tips.not_authorize_email'),
                                    });
                                    break;
                                case NO_PUBLIC_EMAIL:
                                    this.$store.commit('setEmailErr', true,);
                                    break;
                                case SYSTEM_ERROR:
                                    this.$store.commit('errorCodeSet', {
                                        dialogVisible: true,
                                        dialogMessage: this.$t('tips.system_error'),
                                    });
                                    break;
                            }
                        }
                    }

                    let params = '';
                    let repoInfo = this.$store.state.repoInfo;
                    this.platform = repoInfo.platform;
                    this.org = repoInfo.org_id;

                    if (repoInfo.repo_id) {
                        this.repo = repoInfo.repo_id;
                        params = `${repoInfo.platform}/${repoInfo.org_id}/${repoInfo.repo_id}`
                    } else {
                        params = `${repoInfo.platform}/${repoInfo.org_id}`
                        this.repo = ''
                    }
                    let base64Params = util.strToBase64(params);
                    this.$router.replace(`${SIGN_ROUTER}/${base64Params}`);
                } else {
                    let repoInfoParams = '';
                    if (params.indexOf('/') !== -1) {
                        repoInfoParams = params.substring(0, params.indexOf('/'));
                        let orgAddress = params.substring(params.indexOf('/') + 1);
                        sessionStorage.setItem('orgAddress', orgAddress)
                    } else {
                        sessionStorage.removeItem('orgAddress');
                        repoInfoParams = params
                    }
                    let arg = util.base64ToStr(repoInfoParams);
                    if (arg) {
                        let args = arg.split('/');
                        if (args.length < 2) {
                            this.$router.push({name: 'ErrorPath'})
                        } else {
                            this.platform = args[0];
                            this.org = args[1];
                            if (args[2]) {
                                this.repo = args[2]
                            } else {
                                this.repo = ''
                            }
                            this.setRepoInfoAct({platform: this.platform, org_id: this.org, repo_id: this.repo});
                            this.getSignPage(this.platform, this.org, this.repo, 'corporation')
                        }
                    } else {
                        this.$router.push({name: 'ErrorPath'})
                    }

                }

            },
            getSignPage(platform, org_id, repo_id, applyTo) {
                let _url = '';
                if (repo_id) {
                    _url = `${url.getSignPage}/${platform}/${org_id}:${repo_id}/${applyTo}`
                } else {
                    _url = `${url.getSignPage}/${platform}/${org_id}/${applyTo}`
                }
                _axios({
                    url: _url,
                }).then(res => {
                    if (res && res.data.data && res.data.data.clas) {
                        if (res.data.data.clas.length && applyTo === 'corporation') {
                            this.isBindCorpCLA = true
                        }
                    }
                }).catch(err => {
                })
            },

            submit(loginType) {
                this.setLoginTypeAct(loginType);
                if (loginType === 'corporationManager') {
                    this.$router.push('/corporationManagerLogin')
                }else {
                    this.$router.push('/sign-cla')
                }
            },
            clickSignTypeGuide(type) {
                this.signType = type;
            },
            setClientHeight() {
                this.$nextTick(() => {
                    document.getElementById("transparentDiv").style.minHeight = '0px';
                    if (util.getClientHeight() > document.getElementById('transparentDiv').offsetHeight) {
                        document.getElementById("transparentDiv").style.minHeight = util.getClientHeight() + 'px'
                    } else {
                        document.getElementById("transparentDiv").style.minHeight = document.getElementById('transparentDiv').offsetHeight + 'px'
                    }
                })
            },
            setDomain() {
                this.$store.commit('setDomain', window.location.href.split('/sign')[0])
            },
            clearSignPageSession() {
                this.$store.commit('setSignEmail', '');
                this.$store.commit('setSignUser', '');
                sessionStorage.removeItem('sign_email');
                sessionStorage.removeItem('sign_user');
            },
        },
        created() {
            this.clearSignPageSession();
            this.setDomain();
            this.getRepoInfo();
        },
        mounted() {
            if (!this.IS_MOBILE) {
                util.setMinHeight('sign', 'btBox');
            }
            this.setClientHeight();
            window.onresize = () => {
                if (util.getClientHeight() > document.getElementById('transparentDiv').offsetHeight) {
                    document.getElementById("transparentDiv").style.minHeight = util.getClientHeight() + 'px';
                }
            }
        },
        destroyed() {
            window.onresize = null;
        }
    }
</script>
<style lang="less">
    @import "../assets/font/css/Roboto-Bold.css";
    @import "../assets/font/css/Roboto-Black.css";
    @import "../assets/font/css/Roboto-Light.css";
    @import "../assets/font/css/Roboto-Regular.css";

    @media screen and (min-width: 100px) and (max-width: 1200px) {

        #section {
            width: 100%;
        }

        .backgroundBox {
            width: 66.6%;
            left: 25%;

            img {
                width: 51rem;
            }
        }
    }

    @media screen and (min-width: 1200px) {
        #section {
            width: 1200px;
            margin: auto;

        }

        .backgroundBox {
            left: 280px;
        }
    }

    #transparentDiv {
        text-align: center;
        width: 100%;

        .btTypeClass {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
        }

        .padding-bottom-5rem {
            padding-bottom: 5rem;
        }

        #mobile_section {
            margin-bottom: 5rem;
        }

        .el-dialog {
            border-radius: 1rem;
        }

        .pointer {
            cursor: pointer;
        }

        #section {
            flex-grow: 1;
            padding: 0 1rem;
        }

        .actionBox {
            position: relative;
            height: 45rem;
        }

        .mobile_backgroundBox {
            width: 100%;
            height: 0;
            padding-bottom: 100%;
            border-radius: 50%;
            margin: 1rem 0;
            overflow: hidden;
            position: relative;
        }

        .mobile_img {
            width: 180%;
            position: absolute;
            top: -1rem;
            left: -2rem;
        }

        .backgroundBox {
            background-repeat: no-repeat;
            position: absolute;
            overflow: hidden;
            top: 7.5rem;
        }

        .signType {
            font-family: Roboto-Bold, sans-serif;

            & > div {
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
            }
        }

        .buttonBox {
            height: 100%;
            display: flex;
            flex-direction: column;
        }

        .mobile_button {
            font-family: Roboto-Regular, sans-serif;
            width: 100%;
            height: 4rem;
            border-radius: 2rem;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            background: linear-gradient(to right, #97DB30, #319E55);
            margin: 1.2rem 0;
        }

        .button:focus, .mobile_button:focus {
            outline: none;
        }

        .button:disabled, .mobile_button:disabled {
            outline: none;
            background: #C0C4CC;
        }

        .button {
            font-family: Roboto-Regular, sans-serif;
            width: 17rem;
            height: 4rem;
            border-radius: 2rem;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            background: linear-gradient(to right, #97DB30, #319E55);
        }

        .guideBox {
            color: #B5B5B5;
            font-family: Roboto-Regular, sans-serif;
            box-shadow: 0 10px 20px 10px #F3F3F3;
            margin-bottom: 5rem;
            padding-top: 4rem;
            padding-bottom: 10rem;
            position: relative;

            .stepCoverBox {
                position: absolute;
                width: 100%;
                height: 20px;
                top: 0;
                left: 0;
                background-color: white;

            }
        }

        .mobile-guideBox {
            color: #B5B5B5;
            font-family: Roboto-Regular, sans-serif;
            padding-top: 4rem;
        }

        .typeShadow {
            box-shadow: 0 -10px 20px 10px #f3f3f3;
        }

        .SignTypeCol {
            cursor: pointer;
            height: 16rem;
            font-size: 1.5rem;
            font-family: Roboto-Bold, sans-serif;
            display: flex;
            justify-content: center;
            flex-direction: column;
            position: relative;

            .coverBox {
                width: 100%;
                height: 40px;
                position: absolute;
                bottom: -20px;
                left: 0;
                z-index: 1;
                background-color: white;
            }
        }

        .mobile-guide-type {
            width: 100%;
            height: 4rem;
            line-height: 4rem;
        }

        .font-bold {
            font-weight: bold;
        }

        .border-top {
            border-top: 1px solid #AAAAAA;
        }

        .border-bottom {
            border-bottom: 1px solid #AAAAAA;
        }

        .padding-half-1rem {
            padding: .5rem 0;
        }

        .guide-border {
            border-top: 1px solid #AAAAAA;
            border-bottom: 1px solid #AAAAAA;
        }

        .mobile_SignTypeIcon_arrow {
            width: 1.5rem;
            height: 1.5rem;
        }

        .mobile_SignTypeIcon {
            width: 2rem;
            height: 2rem;
            margin: .5rem;
        }

        .SignTypeIcon {
            width: 5rem;
            height: 5rem;
            margin: 1rem;
        }

        .SignTypeBox {
            p {
                font-family: Roboto-Regular, sans-serif;
                font-size: 1.5rem;
            }
        }

        .guideTitle {
            font-family: Roboto-Regular, sans-serif;
            font-size: 2.5rem;
            color: #565656;
            margin: 5rem 0;
        }
    }

    .iconBox {
        font-size: 0;
    }

    .func-link {
        cursor: pointer;
        color: #3CA550;
    }

    .stepBox {
        height: 5rem;

        .stepIcon {
            width: 5rem;
            height: 5rem;
        }
    }

    .padding-left-1rem {
        padding-left: 1rem;
    }

    .rightText {
        line-height: 2rem;
        padding-right: 5rem;
        text-align: left;

        span {
            font-family: Roboto-Bold, sans-serif;
        }
    }

    .leftText {
        line-height: 2rem;
        text-align: right;
        padding-left: 5rem;

        span {
            cursor: pointer;
            color: #3CA550;
        }
    }

    .textCol {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .lineBox {
        box-sizing: border-box;
        display: flex;
        justify-content: center;
    }

    .greenLine {
        width: 3px;
        height: 8.75rem;
        background-color: #7DCB39;

    }

    .title {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: left;
    }


    .name {
        font-family: Roboto-Regular, sans-serif;
        color: #424242;
        font-size: 5rem;
        line-height: 30px;

        p {
            span {
                font-family: Roboto-Bold, sans-serif;
                font-weight: bold;
            }
        }

    }

    .description {
        font-family: Roboto-Regular, sans-serif;
        font-size: 1.5rem;
    }


</style>
