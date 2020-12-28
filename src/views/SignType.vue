<template>
    <el-row class="index" id="transparentDiv" ref="transparentDiv" :style="transparentDiv">
        <NewHeader></NewHeader>
        <div v-if="isMobile">
            <el-row id="mobile_section">
                <el-col>
                    <el-row>
                        <el-col :offset="3" :span="18" style="height: 100%">
                            <el-row>
                                <el-col align="center" class="title" style="height: 100%">
                                    <div class="name mobile_name">
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

                                                    <button class="mobile_button" @click="submit('corporation')">
                                                        {{ $t('signType.corpBt') }}
                                                    </button>
                                                </div>
                                                <div>
                                                    <button class="mobile_button" @click="submit('employee')">
                                                        {{ $t('signType.empBt') }}
                                                    </button>
                                                </div>
                                                <button class="mobile_button" @click="submit('individual')">
                                                    {{ $t('signType.individualBt') }}
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
                                        <el-col :offset="10" :span="4">
                                            <svg-icon class="stepIcon" icon-class="click"></svg-icon>
                                        </el-col>
                                        <el-col :span="10" class="textCol">
                                            <div class="rightText">
                                                {{ $t('signType.corpStep1_1') }}<span>{{ $t('signType.corpBt') }}</span>{{
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

                                        <el-col :offset="10" :span="4">
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
                                        <el-col :span="4">
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

                                        <el-col :offset="10" :span="4">
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
                                        <el-col :span="4">
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
                                        <el-col :offset="10" :span="4">
                                            <svg-icon class="stepIcon" icon-class="click"></svg-icon>
                                        </el-col>
                                        <el-col :span="10" class="textCol">
                                            <div class="rightText">
                                                {{ $t('signType.corpStep1_1') }}<span>{{ $t('signType.empBt') }}</span>{{
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

                                        <el-col :offset="10" :span="4">
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
                                        <el-col :span="4">
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

                                        <el-col :offset="10" :span="4">
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
                                        <el-col :offset="10" :span="4">
                                            <svg-icon class="stepIcon" icon-class="click"></svg-icon>
                                        </el-col>
                                        <el-col :span="10" class="textCol">
                                            <div class="rightText">
                                                {{ $t('signType.corpStep1_1')
                                                }}<span>{{ $t('signType.individualBt') }}</span>{{
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

                                        <el-col :offset="10" :span="4">
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
                                        <el-col :span="4">
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
                                <el-col id="sign" style="height: 100%">
                                    <el-row style="height: 50%">
                                    </el-row>
                                    <el-row style="height: 50%">
                                        <el-col align="right" class="buttonBox">
                                            <div id="btBox">
                                                <div>

                                                    <button class="button" @click="submit('corporation')">
                                                        {{ $t('signType.corpBt') }}
                                                    </button>
                                                </div>
                                                <div>
                                                    <button class="button" @click="submit('employee')">
                                                        {{ $t('signType.empBt') }}
                                                    </button>
                                                </div>
                                                <button class="button" @click="submit('individual')">
                                                    {{ $t('signType.individualBt') }}
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
                                        <el-col :offset="10" :span="4">
                                            <svg-icon class="stepIcon" icon-class="click"></svg-icon>
                                        </el-col>
                                        <el-col :span="10" class="textCol">
                                            <div class="rightText">
                                                {{ $t('signType.corpStep1_1') }}<span>{{ $t('signType.corpBt') }}</span>{{
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

                                        <el-col :offset="10" :span="4">
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
                                        <el-col :span="4">
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

                                        <el-col :offset="10" :span="4">
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
                                        <el-col :span="4">
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
                                        <el-col :offset="10" :span="4">
                                            <svg-icon class="stepIcon" icon-class="click"></svg-icon>
                                        </el-col>
                                        <el-col :span="10" class="textCol">
                                            <div class="rightText">
                                                {{ $t('signType.corpStep1_1') }}<span>{{ $t('signType.empBt') }}</span>{{
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

                                        <el-col :offset="10" :span="4">
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
                                        <el-col :span="4">
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

                                        <el-col :offset="10" :span="4">
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
                                        <el-col :offset="10" :span="4">
                                            <svg-icon class="stepIcon" icon-class="click"></svg-icon>
                                        </el-col>
                                        <el-col :span="10" class="textCol">
                                            <div class="rightText">
                                                {{ $t('signType.corpStep1_1')
                                                }}<span>{{ $t('signType.individualBt') }}</span>{{
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

                                        <el-col :offset="10" :span="4">
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
                                        <el-col :span="4">
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
    </el-row>
</template>
<script>
    import NewHeader from '@components/NewHeader'
    import NewFooter from '@components/NewFooter'
    import * as until from '../until/until'
    import * as url from '../until/api'
    import http from '../until/http'
    import Select from '@components/Select'
    import {mapActions} from 'vuex'
    import ReTryDialog from '../components/ReTryDialog'

    window.onresize = () => {
        if (until.getClientHeight() > document.getElementById('transparentDiv').offsetHeight) {
            document.getElementById("transparentDiv").style.height = until.getClientHeight() + 'px';
        }
    }
    export default {
        name: 'Login',
        components: {
            Select,
            NewHeader,
            NewFooter,
            ReTryDialog,
        },

        computed: {
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
                isMobile: false,
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
            browserRedirect() {
                var sUserAgent = navigator.userAgent.toLowerCase();
                var bIsIpad = sUserAgent.match(/ipad/i) === "ipad";
                var bIsIphoneOs = sUserAgent.match(/iphone os/i) === "iphone os";
                var bIsMidp = sUserAgent.match(/midp/i) === "midp";
                var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) === "rv:1.2.3.4";
                var bIsUc = sUserAgent.match(/ucweb/i) === "ucweb";
                var bIsAndroid = sUserAgent.match(/android/i) === "android";
                var bIsCE = sUserAgent.match(/windows ce/i) === "windows ce";
                var bIsWM = sUserAgent.match(/windows mobile/i) === "windows mobile";
                this.isMobile = bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM;
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
                        this.$cookie.remove(name, {path: '/'});
                        if (name === "error_code") {
                            switch (value) {
                                case 'auth_failed':
                                    this.$store.commit('errorCodeSet', {
                                        dialogVisible: true,
                                        dialogMessage: this.$t('tips.not_authorize_email'),
                                    });
                                    break;
                                case 'unauthorized':
                                    this.$store.commit('errorCodeSet', {
                                        dialogVisible: true,
                                        dialogMessage: this.$t('tips.not_authorize_email'),
                                    });
                                    break;
                                case 'system_error':
                                    this.$store.commit('errorCodeSet', {
                                        dialogVisible: true,
                                        dialogMessage: this.$t('tips.not_commit_email', {platform: this.$store.state.repoInfo.platform}),
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
                    let base64Params = until.strToBase64(params);
                    this.$router.replace(`${this.$store.state.signRouter}/${base64Params}`);
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
                    let arg = until.base64ToStr(repoInfoParams);
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
                        }
                    } else {
                        this.$router.push({name: 'ErrorPath'})
                    }

                }

            },
            submit(loginType) {
                this.setLoginTypeAct(loginType)
                if (this.platform === 'gitee') {
                    if (loginType === 'individual' || loginType === 'employee') {
                        http({
                            url: `${url.getAuthCodeUrl}/${this.platform}/sign`,
                        }).then(res => {
                            window.location.href = res.data.data.url
                        }).catch(err => {
                            if (err.data.hasOwnProperty('data')) {
                                switch (err.data.data.error_code) {
                                    case 'cla.invalid_parameter':
                                        let repoInfo = this.$store.state.repoInfo
                                        let params = repoInfo.repo_id ? `${repoInfo.platform}/${repoInfo.org_id}/${repoInfo.repo_id}` : `${repoInfo.platform}/${repoInfo.org_id}`
                                        let path = '';
                                        if (sessionStorage.getItem('orgAddress')) {
                                            path = `${this.signRouter}/${until.strToBase64(params)}/${sessionStorage.getItem('orgAddress')}`
                                        } else {
                                            path = `${this.signRouter}/${until.strToBase64(params)}`
                                        }
                                        this.$router.replace(path)
                                        break;
                                    case 'cla.invalid_token':
                                        this.$store.commit('setSignReLogin', {
                                            dialogVisible: true,
                                            dialogMessage: this.$t('tips.invalid_token'),
                                        });
                                        break;
                                    case 'cla.missing_token':
                                        this.$store.commit('setSignReLogin', {
                                            dialogVisible: true,
                                            dialogMessage: this.$t('tips.missing_token'),
                                        });
                                        break;
                                    case 'cla.unknown_token':
                                        this.$store.commit('setSignReLogin', {
                                            dialogVisible: true,
                                            dialogMessage: this.$t('tips.unknown_token'),
                                        });
                                        break;
                                    case 'cla.system_error':
                                        this.$store.commit('errorCodeSet', {
                                            dialogVisible: true,
                                            dialogMessage: this.$t('tips.system_error'),
                                        });
                                        break;
                                    default :
                                        this.$store.commit('errorCodeSet', {
                                            dialogVisible: true,
                                            dialogMessage: this.$t('tips.unknown_error'),
                                        });
                                        break;
                                }
                            } else {
                                this.$store.commit('errorCodeSet', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.system_error'),
                                })
                            }
                        })
                    } else {
                        this.$router.push('/sign-cla')
                    }
                } else if (this.platform === 'github') {
                    if (this.$store.state.loginType === 'individual' || this.$store.state.loginType === 'employee') {
                    } else {
                        this.$router.push('/signCla')
                    }
                }
            },

            clickSignTypeGuide(type) {
                this.signType = type;
            },
            setClientHeight() {
                this.$nextTick(() => {
                    if (until.getClientHeight() > document.getElementById('transparentDiv').offsetHeight) {
                        this.transparentDiv.height = until.getClientHeight() + 'px'
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
            this.browserRedirect();
            this.clearSignPageSession();
            this.setDomain();
            this.getRepoInfo();
        },
        mounted() {
            if (this.isMobile) {
                until.setMinHeight('sign', 'btBox');
            } else {
                until.setMinHeight('mobile_sign', 'mobile_btBox');
            }
            this.setClientHeight();
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

        .el-dialog {
            border-radius: 1rem;
        }

        display: flex;
        flex-direction: column;

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
                display: flex;
                flex-direction: column;
                justify-content: space-between;
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

        .mobile_button:focus {
            outline: none;
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
            margin: 1.2rem 0;
        }

        .button:focus {
            outline: none;
        }

        .disabledButton {
            width: 15rem;
            height: 4rem;
            border-radius: 2rem;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            /*background: linear-gradient(to right, #97DB30, #319E55);*/
            background-color: lightgrey;
            margin: 1.2rem 0;
        }

        .disabledButton:focus {
            outline: none;
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

    .stepBox {
        height: 5rem;

        .stepIcon {
            width: 5rem;
            height: 5rem;
        }
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

    .mobile_name {

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
