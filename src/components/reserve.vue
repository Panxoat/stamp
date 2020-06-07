<template>
    <v-app id="inspire">
    <v-navigation-drawer
        v-model="drawer"
        app
        >

    <v-list dense>
        <v-card-title class="subheading font-weight-bold">신청한 티켓 - 님</v-card-title>
        <v-divider></v-divider>
            <v-list-item>
                <v-list-item-content class="font-weight-bold indigo--text text--lighten-1">티켓 번호</v-list-item-content>
                <v-list-item-content>T-01-0001</v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-content class="font-weight-bold indigo--text text--lighten-1">티켓 제목</v-list-item-content>                                
                <v-list-item-content>LAB1실</v-list-item-content>
            </v-list-item>
    </v-list>
    <v-card-text>
        <v-btn color="indigo lighten-1" dark block>취소하기</v-btn>
    </v-card-text>
    </v-navigation-drawer>

        <v-app-bar
            app
            color="indigo"
            dark
        >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title v-if="isLogin">로그인</v-toolbar-title>
        <v-toolbar-title v-else>노 데이터</v-toolbar-title>
        </v-app-bar>

        <v-content>
            <v-row>
                <v-col>
                    <div class="font-weight-black headline indigo--text text--lighten-1 my-3" align="center">공지사항</div>
                </v-col>
            </v-row>
            <v-row
                align="center"
                justify="center"
                class="mb-10">
                <v-col md="4" cols="12">
                    <v-card hover class="ma-2">
                        <v-card-text>
                            <tbody>
                                <tr>
                                    <td class="td_section"><v-chip label color="red" dark>공지</v-chip></td>
                                    <td class="td_title font-weight-black">기숙사 입소시간 안내</td>
                                    <td class="td_writer">모훈</td>
                                    <td class="td_time">2:08</td>
                                </tr>
                            </tbody>
                        </v-card-text>
                    </v-card>
                    <v-card hover class="ma-2">
                        <v-card-text>
                            <tbody>
                                <tr>
                                    <td class="td_section"><v-chip label color="red" dark>공지</v-chip></td>
                                    <td class="td_title font-weight-black">기숙사 내 주의사항 안내</td>
                                    <td class="td_writer">박건은</td>
                                    <td class="td_time">13:02</td>
                                </tr>
                            </tbody>
                        </v-card-text>
                    </v-card>                                        
                </v-col>
            </v-row>
            
            <v-divider/>

            <v-row>
                <v-col>
                    <div class="font-weight-black headline indigo--text text--lighten-1 my-3" align="center">티켓목록</div>
                    <v-switch v-model="closeTicket" label="닫힌 티켓"></v-switch>
                </v-col>
            </v-row>
            <v-row
                align="center"
                justify="center"
                class="mb-10">
                <!-- <div v-if="closeTicket == false"> -->
                <v-slide-group show-arrows>
                    <v-slide-item v-for="n in 10" :key="n">
                            <v-card class="ma-4" width="250">
                                <v-list dense>
                                    <v-card-title class="subheading font-weight-bold">LAB1실</v-card-title>

                                    <v-divider></v-divider>
                                    <v-list-item>
                                        <v-list-item-content class="font-weight-bold indigo--text text--lighten-1">티켓 번호</v-list-item-content>
                                        <v-list-item-content class="text-right">T-01-0001</v-list-item-content>
                                    </v-list-item>
                                    <v-list-item>
                                        <v-list-item-content class="font-weight-bold indigo--text text--lighten-1">티켓 제목</v-list-item-content>                                
                                        <v-list-item-content>LAB1실</v-list-item-content>
                                    </v-list-item>
                                    <v-list-item>
                                        <v-list-item-content class="font-weight-bold indigo--text text--lighten-1">티켓 인원수</v-list-item-content>
                                        <v-list-item-content>20명</v-list-item-content>
                                    </v-list-item>
                                    <v-list-item>
                                        <v-list-item-content class="font-weight-bold indigo--text text--lighten-1">티켓 잔여 개수</v-list-item-content>
                                        <v-list-item-content>1자리</v-list-item-content>
                                    </v-list-item>
                                    <v-list-item>
                                        <v-list-item-content class="font-weight-bold indigo--text text--lighten-1">신청 대상</v-list-item-content>
                                        <v-list-item-content>3학년</v-list-item-content>
                                    </v-list-item>
                                </v-list>
                                <v-card-text>
                                    <v-btn color="indigo lighten-1" dark block>신청하기</v-btn>
                                </v-card-text>
                            </v-card>
                    </v-slide-item>
                </v-slide-group>
                <!-- </div> -->
            </v-row>          
        </v-content>
    </v-app>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'

export default {
 
 data () {
     return {
        drawer: null,
        closeTicket: false,
     }
 },

 created () {
    this.$store.dispatch('getMemberInfo')
 },

 mounted () {

 },

 methods: {
     ...mapActions('getMemeberInfo', {
         getInfo: ''
     })
 },

 computed: {
     ...mapState('auth', ["isLogin"])
 }
}
</script>

<style lang="stylus" scoped>

.td_section{
    width:12%
}

.td_title{
    width:75%
}

.td_writer{
    width:10%
}

.td_time{
    width:10%
}
</style>