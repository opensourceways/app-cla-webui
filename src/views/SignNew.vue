<template>
  <el-row
    class="index"
    id="transparentDiv"
    ref="transparentDiv"
    :style="transparentDiv"
  >
    <NewHeader></NewHeader>
    <div
      v-if="IS_MOBILE"
      style="background-image: linear-gradient(1deg, #ffffff 90%, #90d733 100%)"
    >
      <el-row id="mobile_section">
        <el-col>
          <el-row>
            <div class="titles">
              <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item :to="{ path: '/sign' }">{{
                  $t('new.sign')
                }}</el-breadcrumb-item>
                <el-breadcrumb-item>{{
                  $t('new.contribution')
                }}</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            <el-col :offset="1" :span="22" style="height: 100%">
              <el-row class="signType" style="height: 100%">
                <el-col id="mobile_sign" style="height: 100%">
                  <el-row>
                    <el-col align="center" class="buttonBox">
                      <el-row style="height: 100%; margin-top: 20px">
                        <el-col class="title" style="height: 100%">
                          <el-card>
                            <div class="cardPhone">
                              <span>{{ $t('new.corp') }}</span>
                              <div class="btn">
                                <button
                                  :disabled="!isBindCorpCLA"
                                  class="button"
                                  @click="submit('corporation')"
                                >
                                 {{ $t('org.toSign') }}
                                </button>
                              </div>
                            </div>
                          </el-card>
                        </el-col>
                      </el-row>
                      <el-row style="height: 100%; margin-top: 20px">
                        <el-col class="title" style="height: 100%">
                          <el-card>
                            <div class="cardPhone">
                              <span>{{ $t('new.employee') }}</span>
                              <div class="btn">
                                <button
                                  class="button"
                                  @click="submit('employee')"
                                >
                                 {{ $t('new.register') }}
                                </button>
                              </div>
                            </div>
                          </el-card>
                        </el-col>
                      </el-row>
                      <el-row style="height: 100%; margin-top: 20px">
                        <el-col class="title" style="height: 100%">
                          <el-card>
                            <div class="cardPhone">
                              <span> {{ $t('new.manager') }}</span>
                              <div class="btn">
                                <button
                                  class="button"
                                  @click="submit('corporationManager')"
                                >
                                  {{ $t('new.manage') }}
                                </button>
                              </div>
                            </div>
                          </el-card>
                        </el-col>
                      </el-row>
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
                  <el-row
                    class="pointer"
                    @click.native="clickCorpGuide()"
                    type="flex"
                    align="middle"
                  >
                    <el-col :offset="1" :span="4">
                      <svg-icon
                        icon-class="Enterprise"
                        class="mobile_SignTypeIcon"
                      ></svg-icon>
                    </el-col>
                    <el-col align="left" :span="14">
                      <span class="font-bold">{{ $t('signType.corp') }}</span>
                    </el-col>
                    <el-col :span="3">
                      <svg-icon
                        v-if="corpGuideIsOpen"
                        icon-class="down-arrow"
                        class="mobile_SignTypeIcon_arrow"
                      ></svg-icon>
                      <svg-icon
                        v-else
                        icon-class="right-arrow"
                        class="mobile_SignTypeIcon_arrow"
                      ></svg-icon>
                    </el-col>
                  </el-row>
                  <el-row
                    v-if="corpGuideIsOpen"
                    class="mobile-guideBox padding-bottom-5rem"
                  >
                    <el-col>
                      <el-row class="stepBox">
                        <el-col class="iconBox" :offset="1" :span="4">
                          <svg-icon
                            class="stepIcon"
                            icon-class="click"
                          ></svg-icon>
                        </el-col>
                        <el-col :span="19" class="textCol">
                          <div class="rightText padding-left-1rem">
                            <span>{{ $t('signType.corpStep1_1') }}</span>
                            <span
                              class="pointer"
                              @click="submit('corporation')"
                              >{{ $t('signType.corpBt') }}</span
                            >
                            <span>{{ $t('signType.corpStep1_2') }}</span>
                          </div>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col class="lineBox" :offset="1" :span="4">
                          <div class="greenLine"></div>
                        </el-col>
                      </el-row>
                      <el-row class="stepBox">
                        <el-col class="iconBox" :offset="1" :span="4">
                          <svg-icon
                            class="stepIcon"
                            icon-class="sign"
                          ></svg-icon>
                        </el-col>
                        <el-col :span="19" class="textCol">
                          <div class="rightText padding-left-1rem">
                            {{ $t('signType.corpStep2') }}
                          </div>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col class="lineBox" :offset="1" :span="4">
                          <div class="greenLine"></div>
                        </el-col>
                      </el-row>
                      <el-row class="stepBox">
                        <el-col class="iconBox" :offset="1" :span="4">
                          <svg-icon
                            class="stepIcon"
                            icon-class="send"
                          ></svg-icon>
                        </el-col>
                        <el-col :span="19" class="textCol">
                          <div class="rightText padding-left-1rem">
                            {{ $t('signType.corpStep3') }}
                          </div>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col class="lineBox" :offset="1" :span="4">
                          <div class="greenLine"></div>
                        </el-col>
                      </el-row>
                      <el-row class="stepBox">
                        <el-col class="iconBox" :offset="1" :span="4">
                          <svg-icon
                            class="stepIcon"
                            icon-class="auth"
                          ></svg-icon>
                        </el-col>
                        <el-col :span="19" class="textCol">
                          <div class="rightText padding-left-1rem">
                            {{ $t('signType.corpStep4') }}
                          </div>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col class="lineBox" :offset="1" :span="4">
                          <div class="greenLine"></div>
                        </el-col>
                      </el-row>
                      <el-row class="stepBox">
                        <el-col class="iconBox" :offset="1" :span="4">
                          <svg-icon
                            class="stepIcon"
                            icon-class="success"
                          ></svg-icon>
                        </el-col>
                        <el-col :span="19" class="textCol">
                          <div class="rightText padding-left-1rem">
                            {{ $t('signType.corpStep5') }}
                          </div>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col class="lineBox" :offset="1" :span="4">
                          <div class="greenLine"></div>
                        </el-col>
                      </el-row>
                      <el-row class="stepBox">
                        <el-col class="iconBox" :offset="1" :span="4">
                          <svg-icon
                            class="stepIcon"
                            icon-class="manage"
                          ></svg-icon>
                        </el-col>
                        <el-col :span="19" class="textCol">
                          <div class="rightText padding-left-1rem">
                            <span>{{ $t('signType.corpStep6_1') }}</span>
                            <span class="func-link" @click="toCorpLogin()">{{
                              $t('signType.admin_platform')
                            }}</span>
                            <span>{{ $t('signType.corpStep6_2') }}</span>
                          </div>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row class="padding-half-1rem">
                <el-col>
                  <el-row
                    class="pointer"
                    @click.native="clickEmpGuide()"
                    type="flex"
                    align="middle"
                  >
                    <el-col :offset="1" :span="4">
                      <svg-icon
                        icon-class="Employee"
                        class="mobile_SignTypeIcon"
                      ></svg-icon>
                    </el-col>
                    <el-col align="left" :span="14">
                      <span class="font-bold">{{ $t('signType.emp') }}</span>
                    </el-col>
                    <el-col :span="3">
                      <svg-icon
                        v-if="employeeGuideIsOpen"
                        icon-class="down-arrow"
                        class="mobile_SignTypeIcon_arrow"
                      ></svg-icon>
                      <svg-icon
                        v-else
                        icon-class="right-arrow"
                        class="mobile_SignTypeIcon_arrow"
                      ></svg-icon>
                    </el-col>
                  </el-row>
                  <el-row
                    v-if="employeeGuideIsOpen"
                    class="mobile-guideBox padding-bottom-5rem"
                  >
                    <el-col>
                      <el-row class="stepBox">
                        <el-col class="iconBox" :offset="1" :span="4">
                          <svg-icon
                            class="stepIcon"
                            icon-class="click"
                          ></svg-icon>
                        </el-col>
                        <el-col :span="19" class="textCol">
                          <div class="rightText padding-left-1rem">
                            {{ $t('signType.empStep1_1') }}
                            <span class="pointer" @click="submit('employee')">{{
                              $t('signType.empBt')
                            }}</span>
                            {{ $t('signType.corpStep1_2') }}
                          </div>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col class="lineBox" :offset="1" :span="4">
                          <div class="greenLine"></div>
                        </el-col>
                      </el-row>
                      <el-row class="stepBox">
                        <el-col class="iconBox" :offset="1" :span="4">
                          <svg-icon
                            class="stepIcon"
                            icon-class="sign"
                          ></svg-icon>
                        </el-col>
                        <el-col :span="19" class="textCol">
                          <div class="rightText padding-left-1rem">
                            {{ $t('signType.corpStep2') }}
                          </div>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col class="lineBox" :offset="1" :span="4">
                          <div class="greenLine"></div>
                        </el-col>
                      </el-row>
                      <el-row class="stepBox">
                        <el-col class="iconBox" :offset="1" :span="4">
                          <svg-icon
                            class="stepIcon"
                            icon-class="auth"
                          ></svg-icon>
                        </el-col>
                        <el-col :span="19" class="textCol">
                          <div class="rightText padding-left-1rem">
                            {{ $t('signType.empStep4') }}
                          </div>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col class="lineBox" :offset="1" :span="4">
                          <div class="greenLine"></div>
                        </el-col>
                      </el-row>
                      <el-row class="stepBox">
                        <el-col class="iconBox" :offset="1" :span="4">
                          <svg-icon
                            class="stepIcon"
                            icon-class="success"
                          ></svg-icon>
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
              <el-row
                :class="{ 'border-bottom': !individualGuideIsOpen }"
                class="border-top padding-half-1rem"
              >
                <el-col>
                  <el-row
                    class="pointer"
                    @click.native="clickIndividualGuide()"
                    type="flex"
                    align="middle"
                  >
                    <el-col :offset="1" :span="4">
                      <svg-icon
                        icon-class="Individual"
                        class="mobile_SignTypeIcon"
                      ></svg-icon>
                    </el-col>
                    <el-col align="left" :span="14">
                      <span class="font-bold">{{
                        $t('signType.individual')
                      }}</span>
                    </el-col>
                    <el-col :span="3">
                      <svg-icon
                        v-if="individualGuideIsOpen"
                        icon-class="down-arrow"
                        class="mobile_SignTypeIcon_arrow"
                      ></svg-icon>
                      <svg-icon
                        v-else
                        icon-class="right-arrow"
                        class="mobile_SignTypeIcon_arrow"
                      ></svg-icon>
                    </el-col>
                  </el-row>
                  <el-row v-if="individualGuideIsOpen" class="mobile-guideBox">
                    <el-col>
                      <el-row class="stepBox">
                        <el-col class="iconBox" :offset="1" :span="4">
                          <svg-icon
                            class="stepIcon"
                            icon-class="click"
                          ></svg-icon>
                        </el-col>
                        <el-col :span="19" class="textCol">
                          <div class="rightText padding-left-1rem">
                            {{ $t('signType.individualStep1_1')
                            }}<span
                              class="pointer"
                              @click="submit('employee')"
                              >{{ $t('signType.individualBt') }}</span
                            >{{ $t('signType.corpStep1_2') }}
                          </div>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col class="lineBox" :offset="1" :span="4">
                          <div class="greenLine"></div>
                        </el-col>
                      </el-row>
                      <el-row class="stepBox">
                        <el-col class="iconBox" :offset="1" :span="4">
                          <svg-icon
                            class="stepIcon"
                            icon-class="sign"
                          ></svg-icon>
                        </el-col>
                        <el-col :span="19" class="textCol">
                          <div class="rightText padding-left-1rem">
                            {{ $t('signType.corpStep2') }}
                          </div>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col class="lineBox" :offset="1" :span="4">
                          <div class="greenLine"></div>
                        </el-col>
                      </el-row>
                      <el-row class="stepBox">
                        <el-col class="iconBox" :offset="1" :span="4">
                          <svg-icon
                            class="stepIcon"
                            icon-class="success"
                          ></svg-icon>
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
    <div
      v-else
      style="background-image: linear-gradient(1deg, #ffffff 90%, #90d733 100%)"
    >
      <el-row id="section">
        <el-col>
          <el-row class="actionBox">
            <div class="titles">
              <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item :to="{ path: '/sign' }">{{
                  $t('new.sign')
                }}</el-breadcrumb-item>
                <el-breadcrumb-item>{{
                  $t('new.contribution')
                }}</el-breadcrumb-item>
              </el-breadcrumb>
            </div>

            <el-col :span="8" style="height: 60%; padding-right: 20px">
              <el-card>
                <div class="card">
                  <span>{{ $t('new.corp') }}</span>
                  <div class="btn">
                    <button
                      :disabled="!isBindCorpCLA"
                      class="button"
                      @click="submit('corporation')"
                    >
                     {{ $t('org.toSign') }}
                    </button>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8" style="height: 60%; padding-right: 20px">
              <el-card>
                <div class="card">
                  <span>{{ $t('new.employee') }}</span>
                  <div class="btn">
                    <button class="button" @click="submit('employee')">
                     {{ $t('new.register') }}
                    </button>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8" style="height: 60%; padding-right: 20px">
              <el-card>
                <div class="card">
                  <span> {{ $t('new.manager') }}</span>
                  <div class="btn">
                    <button
                      class="button"
                      @click="submit('corporationManager')"
                    >
                      {{ $t('new.manage') }}
                    </button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-row class="guideTitle">
                {{ $t('signType.guideTitle') }}
              </el-row>
              <el-row>
                <el-col
                  :span="8"
                  class="SignTypeCol"
                  :class="{ typeShadow: signType === 'corporation' }"
                  @click.native="clickSignTypeGuide('corporation')"
                >
                  <div class="SignTypeBox">
                    <svg-icon
                      icon-class="Enterprise"
                      class="SignTypeIcon"
                    ></svg-icon>
                    <p>{{ $t('signType.corp') }}</p>
                  </div>
                  <div v-if="signType === 'corporation'" class="coverBox"></div>
                </el-col>
                <el-col
                  :span="8"
                  class="SignTypeCol"
                  :class="{ typeShadow: signType === 'employee' }"
                  @click.native="clickSignTypeGuide('employee')"
                >
                  <div class="SignTypeBox">
                    <svg-icon
                      icon-class="Employee"
                      class="SignTypeIcon"
                    ></svg-icon>
                    <p>{{ $t('signType.emp') }}</p>
                  </div>
                  <div v-if="signType === 'employee'" class="coverBox"></div>
                </el-col>
                <el-col
                  :span="8"
                  class="SignTypeCol"
                  :class="{ typeShadow: signType === 'individual' }"
                  @click.native="clickSignTypeGuide('individual')"
                >
                  <div class="SignTypeBox">
                    <svg-icon
                      icon-class="Individual"
                      class="SignTypeIcon"
                    ></svg-icon>
                    <p>{{ $t('signType.individual') }}</p>
                  </div>
                  <div v-if="signType === 'individual'" class="coverBox"></div>
                </el-col>
              </el-row>
              <el-row v-if="signType === 'corporation'" class="guideBox">
                <div class="stepCoverBox"></div>
                <el-col>
                  <el-row class="stepBox">
                    <el-col class="iconBox" :offset="10" :span="4">
                      <svg-icon class="stepIcon" icon-class="click"></svg-icon>
                    </el-col>
                    <el-col :span="10" class="textCol">
                      <div class="rightText">
                        {{ $t('signType.corpStep1_1') }}
                        <span class="pointer" @click="submit('corporation')">{{
                          $t('signType.corpBt')
                        }}</span
                        >{{ $t('signType.corpStep1_2') }}
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col class="lineBox" :offset="10" :span="4">
                      <div class="greenLine"></div>
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
                      <div></div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col class="lineBox" :offset="10" :span="4">
                      <div class="greenLine"></div>
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
                      <div class="greenLine"></div>
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
                      <div></div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col class="lineBox" :offset="10" :span="4">
                      <div class="greenLine"></div>
                    </el-col>
                  </el-row>
                  <el-row class="stepBox">
                    <el-col class="iconBox" :offset="10" :span="4">
                      <svg-icon
                        class="stepIcon"
                        icon-class="success"
                      ></svg-icon>
                    </el-col>
                    <el-col :span="10" class="textCol">
                      <div class="rightText">
                        {{ $t('signType.corpStep5') }}
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col class="lineBox" :offset="10" :span="4">
                      <div class="greenLine"></div>
                    </el-col>
                  </el-row>
                  <el-row class="stepBox">
                    <el-col :span="10" class="textCol">
                      <div class="leftText">
                        {{ $t('signType.corpStep6_1')
                        }}<span @click="toCorpLogin()">{{
                          $t('signType.admin_platform')
                        }}</span
                        >{{ $t('signType.corpStep6_2') }}
                      </div>
                    </el-col>
                    <el-col class="iconBox" :span="4">
                      <svg-icon class="stepIcon" icon-class="manage"></svg-icon>
                    </el-col>
                    <el-col :span="10">
                      <div></div>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row v-if="signType === 'employee'" class="guideBox">
                <el-col>
                  <el-row class="stepBox">
                    <el-col class="iconBox" :offset="10" :span="4">
                      <svg-icon class="stepIcon" icon-class="click"></svg-icon>
                    </el-col>
                    <el-col :span="10" class="textCol">
                      <div class="rightText">
                        {{ $t('signType.empStep1_1') }}
                        <span class="pointer" @click="submit('employee')">{{
                          $t('signType.empBt')
                        }}</span>
                        {{ $t('signType.corpStep1_2') }}
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col class="lineBox" :offset="10" :span="4">
                      <div class="greenLine"></div>
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
                      <div></div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col class="lineBox" :offset="10" :span="4">
                      <div class="greenLine"></div>
                    </el-col>
                  </el-row>
                  <el-row class="stepBox">
                    <el-col class="iconBox" :offset="10" :span="4">
                      <svg-icon class="stepIcon" icon-class="auth"></svg-icon>
                    </el-col>
                    <el-col :span="10" class="textCol">
                      <div class="rightText">
                        {{ $t('signType.empStep4') }}
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col class="lineBox" :offset="10" :span="4">
                      <div class="greenLine"></div>
                    </el-col>
                  </el-row>
                  <el-row class="stepBox">
                    <el-col :span="10" class="textCol">
                      <div class="leftText">
                        {{ $t('signType.empStep5') }}
                      </div>
                    </el-col>
                    <el-col class="iconBox" :span="4">
                      <svg-icon
                        class="stepIcon"
                        icon-class="success"
                      ></svg-icon>
                    </el-col>
                    <el-col :span="10">
                      <div></div>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row v-if="signType === 'individual'" class="guideBox">
                <el-col>
                  <el-row class="stepBox">
                    <el-col class="iconBox" :offset="10" :span="4">
                      <svg-icon class="stepIcon" icon-class="click"></svg-icon>
                    </el-col>
                    <el-col :span="10" class="textCol">
                      <div class="rightText">
                        {{ $t('signType.individualStep1_1')
                        }}<span class="pointer" @click="submit('employee')">{{
                          $t('signType.individualBt')
                        }}</span
                        >{{ $t('signType.corpStep1_2') }}
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col class="lineBox" :offset="10" :span="4">
                      <div class="greenLine"></div>
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
                      <div></div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col class="lineBox" :offset="10" :span="4">
                      <div class="greenLine"></div>
                    </el-col>
                  </el-row>
                  <el-row class="stepBox">
                    <el-col class="iconBox" :offset="10" :span="4">
                      <svg-icon
                        class="stepIcon"
                        icon-class="success"
                      ></svg-icon>
                    </el-col>
                    <el-col :span="10" class="textCol">
                      <div class="rightText">
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
    </div>
    <NewFooter></NewFooter>
    <ReTryDialog
      :dialogVisible="reTryDialogVisible"
      :message="reLoginMsg"
    ></ReTryDialog>
  </el-row>
</template>
<script>
import NewHeader from '@components/NewHeader';
import NewFooter from '@components/NewFooter';
import * as util from '../util/util';
import * as url from '../util/api';
import _axios from '../util/_axios';
import { mapActions } from 'vuex';
import ReTryDialog from '../components/ReTryDialog';
import claConfig from '../lang/global';
// import { ArrowRight } from '@element-plus/icons-vue'
export default {
  name: 'SignType',
  components: {
    NewHeader,
    NewFooter,
    ReTryDialog,
  },
  computed: {
    corpBtTooltip() {
      if (this.isBindCorpCLA) {
        return `${this.$t('signType.corpStep1_1')}${this.$t(
          'signType.corpBt'
        )}${this.$t('signType.corpStep1_2')}`;
      } else {
        return this.$t('signType.not_support_corp');
      }
    },
    empBtTooltip() {
      if (this.isBindCorpCLA) {
        return `${this.$t('signType.empStep1_1')}${this.$t(
          'signType.empBt'
        )}${this.$t('signType.corpStep1_2')}`;
      } else {
        return this.$t('signType.not_support_emp');
      }
    },
    individualBtTooltip() {
      return `${this.$t('signType.individualStep1_1')}${this.$t(
        'signType.individualBt'
      )}${this.$t('signType.corpStep1_2')}`;
    },
    reTryDialogVisible() {
      return this.$store.state.reTryDialogVisible;
    },
    reLoginMsg() {
      return this.$store.state.dialogMessage;
    },
    domain() {
      return this.$store.state.domain;
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
    };
  },
  provide() {
    return {
      setClientHeight: this.setClientHeight,
    };
  },
  methods: {
    ...mapActions(['setLoginTypeAct', 'setLinkIdAct']),
    clickIndividualGuide() {
      this.individualGuideIsOpen = !this.individualGuideIsOpen;
    },
    clickEmpGuide() {
      this.employeeGuideIsOpen = !this.employeeGuideIsOpen;
    },
    clickCorpGuide() {
      this.corpGuideIsOpen = !this.corpGuideIsOpen;
    },
    toCorpLogin() {
      this.$store.commit('setLoginType', 'corporationManager');
      this.$router.push('/corporationManagerLogin');
    },
    setLangLocale() {
      if (parseInt(localStorage.getItem('lang'))) {
        this.value = parseInt(localStorage.getItem('lang'));
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
      let linkId = this.$store.state.linkId;
      // let domain = window.location.origin;
      // if (domain === claConfig.OPENLOOKENG_SIGN_URL) {
      //   linkId = claConfig.OPENLOOKENG_LINKID;
      // } else {
      //   let urlParams = this.$route.params.params;
      //   if (claConfig.STOCK_SIGN_LINK[urlParams]) {
      //     linkId = claConfig.STOCK_SIGN_LINK[urlParams];
      //   } else {
      //     linkId = urlParams;
      //   }
      // }
      this.setLangLocale();
      this.getSignPage(linkId, 'corporation');
      this.setLinkIdAct(linkId);
    },
    getSignPage(link_id, applyTo) {
      _axios({
        url: `${url.getSignPage}/${link_id}/${applyTo}`,
      })
        .then(res => {
          if (res && res.data.data) {
            if (res.data.data.length && applyTo === 'corporation') {
              this.isBindCorpCLA = true;
            }
          }
        })
        .catch(err => {
          util.catchErr(err, '', this);
        });
    },

    submit(loginType) {
      this.setLoginTypeAct(loginType);
      if (loginType === 'corporationManager') {
        this.$router.push('/corporationManagerLogin');
      } else {
        this.$router.push('/sign-cla');
      }
    },
    clickSignTypeGuide(type) {
      this.signType = type;
      this.setClientHeight();
    },
    setClientHeight() {
      this.$nextTick(() => {
        document.getElementById('transparentDiv').style.minHeight = '0px';
        if (
          util.getClientHeight() >
          document.getElementById('transparentDiv').offsetHeight
        ) {
          document.getElementById('transparentDiv').style.minHeight =
            util.getClientHeight() + 'px';
        } else {
          document.getElementById('transparentDiv').style.minHeight =
            document.getElementById('transparentDiv').offsetHeight + 'px';
        }
      });
    },
    setDomain() {
      this.$store.commit('setDomain', window.location.href.split('/sign')[0]);
    },
  },
  created() {
    this.$store.commit('setPdfData', '');
    this.setDomain();
    this.getRepoInfo();
  },
  mounted() {
    if (!this.IS_MOBILE) {
      util.setMinHeight('sign', 'btBox');
    }
    this.setClientHeight();
    window.onresize = () => {
      if (
        util.getClientHeight() >
        document.getElementById('transparentDiv').offsetHeight
      ) {
        document.getElementById('transparentDiv').style.minHeight =
          util.getClientHeight() + 'px';
      }
    };
  },
  destroyed() {
    window.onresize = null;
  },
};
</script>
<style lang="less" scoped>
@import '../assets/font/css/Roboto-Bold.css';
@import '../assets/font/css/Roboto-Black.css';
@import '../assets/font/css/Roboto-Light.css';
@import '../assets/font/css/Roboto-Regular.css';

@media screen and (min-width: 100px) and (max-width: 1200px) {
  #section {
    width: 100%;
  }

  .backgroundBox {
    width: 66.6%;
    left: 25%;
    background-color: red;
    // img {
    //   width: 51rem;
    // }
  }
}

@media screen and (min-width: 1200px) {
  #section {
    width: 1200px;
    margin: 0 auto;
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
    .titles {
      font-size: 12px;
      text-align: start;
      padding: 16px 0px 0px 20px;
    }
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
    .titles {
      font-size: 46px;
      text-align: start;
      margin: 60px auto;
    }
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
    background: linear-gradient(to right, #97db30, #319e55);
    margin: 1.2rem 0;
  }

  .button:focus,
  .mobile_button:focus {
    outline: none;
  }

  .button:disabled,
  .mobile_button:disabled {
    outline: none;
    background: #c0c4cc;
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
    background: linear-gradient(to right, #97db30, #319e55);
  }

  .guideBox {
    color: #b5b5b5;
    font-family: Roboto-Regular, sans-serif;
    box-shadow: 0 10px 20px 10px #f3f3f3;
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
    color: #b5b5b5;
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
    border-top: 1px solid #aaaaaa;
  }

  .border-bottom {
    border-bottom: 1px solid #aaaaaa;
  }

  .padding-half-1rem {
    padding: 0.5rem 0;
  }

  .guide-border {
    border-top: 1px solid #aaaaaa;
    border-bottom: 1px solid #aaaaaa;
  }

  .mobile_SignTypeIcon_arrow {
    width: 1.5rem;
    height: 1.5rem;
  }

  .mobile_SignTypeIcon {
    width: 2rem;
    height: 2rem;
    margin: 0.5rem;
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
  color: #3ca550;
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
    color: #3ca550;
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
  background-color: #7dcb39;
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

.cardPhone {
  padding: 22px 58px;
  font-family: Roboto-Bold, sans-serif;
  font-size: 14px;
  min-height: 100px;
  .btn {
    margin-top: 40px;
    width: 100%;
    text-align: center;
  }
}
.card {
  font-family: Roboto-Bold, sans-serif;
  font-size: 22px;
  min-height: 350px;
  position: relative;
  margin: 20px 20px;
  text-align: start;
  .btn {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
  }
}
</style>
