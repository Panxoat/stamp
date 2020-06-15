<template>
    <v-app id="inspire">
    <v-navigation-drawer
        v-model="drawer"
        app
        >

    <v-list dense>
        <v-card-title class="subheading font-weight-bold">{{user['user_name']}}님 - 신청한 티켓</v-card-title>
        <v-divider></v-divider>
        <div v-for="(staTicket, i) in reservations" :key="i" >
            <v-list-item>
                <v-list-item-content class="font-weight-bold indigo--text text--lighten-1">티켓 이름</v-list-item-content>
                <v-list-item-content>{{staTicket.ticketname}}</v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-content class="font-weight-bold indigo--text text--lighten-1">티켓 코드</v-list-item-content>                                
                <v-list-item-content>{{staTicket.code}}</v-list-item-content>
            </v-list-item>            
        </div>
    </v-list>
    </v-navigation-drawer>

        <v-app-bar
            app
            color="indigo"
            dark
        >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title v-if="user">{{user['user_grade']}}학년 {{user['user_name']}}님</v-toolbar-title>
        <v-toolbar-title v-else>잘못된 접근</v-toolbar-title>
        
        <v-spacer></v-spacer>
        <v-dialog v-model="createDialog" persistent max-width="500">
            <template v-slot:activator="{ on }">
                <v-btn v-if="user['user_grade']==100" class="ma-4" color="indigo lighten-1" v-on="on">티켓 생성</v-btn>
            </template>
            <v-card>
                <v-card-title class="headline">티켓생성</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <ValidationObserver ref="observer" v-slot="{}">
                        <form>                       
                        <ValidationProvider v-slot="{ errors }" name="번호" rules="required">
                            <v-text-field
                            v-model="postTicketNo"
                            :error-messages="errors"
                            label="티켓번호"
                            required
                            outlined
                            ></v-text-field>
                        </ValidationProvider>
                        <ValidationProvider v-slot="{ errors }" name="제목" rules="required">
                            <v-text-field
                            v-model="postTicketTitle"
                            :error-messages="errors"
                            label="티켓제목"
                            required
                            outlined
                            ></v-text-field>
                        </ValidationProvider>
                        <ValidationProvider v-slot="{ errors }" name="최대인원" rules="required">
                            <v-text-field
                            v-model="postTicketMax"
                            :error-messages="errors"
                            label="최대인원"
                            required
                            outlined
                            ></v-text-field>
                        </ValidationProvider>
                        <ValidationProvider v-slot="{ errors }" name="열린시간" rules="required">
                            <v-text-field
                            v-model="postTicketOpen"
                            :error-messages="errors"
                            label="열린시간"
                            required
                            outlined
                            ></v-text-field>
                        </ValidationProvider>
                        <ValidationProvider v-slot="{ errors }" name="닫힌시간" rules="required">
                            <v-text-field
                            v-model="postTicketClose"
                            :error-messages="errors"
                            label="닫힌시간"
                            required
                            outlined
                            ></v-text-field>
                        </ValidationProvider>
                        <ValidationProvider v-slot="{ errors }" name="대상자" rules="required">
                            <v-text-field
                            v-model="postTicketWho"
                            :error-messages="errors"
                            label="대상자"
                            required
                            outlined
                            ></v-text-field>
                        </ValidationProvider>                        
                        <div class="text-center">
                            <v-btn class="subtitle-2 mx-2" color="indigo lighten-1" @click="postTicket" dark large>
                                <v-icon dark>done_all</v-icon>
                            </v-btn>                                      
                        </div>                    
                        </form>   
                    </ValidationObserver>                     
                </v-card-text>
            </v-card>           
        </v-dialog>

        <v-btn color="indigo lighten-1 white--text" @click="logOut">로그아웃</v-btn>
        </v-app-bar>

        <v-content>
            <v-row>
                <v-col>
                    <div class="font-weight-black headline indigo--text text--lighten-1 my-3" align="center">공지사항</div>
                </v-col>
            </v-row>
            <div class="font-weight-black title black--text ma-2" align="center">
                공지사항이 없습니다.
            </div>
            <!-- 공지사항 content -->
            <v-divider/>

            <v-row>
                <v-col>
                    <div class="font-weight-black headline indigo--text text--lighten-1 my-3" align="center">티켓목록</div>
                </v-col>
            </v-row>
            <v-row
                align="center"
                justify="center"
                class="mb-10">
                <v-sheet
                    class="mx-auto"
                    max-width="90%">
                <v-slide-group show-arrows>
                    <v-slide-item v-for="(cdx, i) in tickets" :key="i">
                            <v-card class="ma-4" width="250">
                                <v-list dense>
                                    <v-card-title class="subheading font-weight-bold">{{cdx.title}}</v-card-title>
                                    <v-divider></v-divider>
                                    <v-list-item>
                                        <v-list-item-content class="font-weight-bold indigo--text text--lighten-1">티켓 번호</v-list-item-content>
                                        <v-list-item-content class="text-right">{{cdx.no}}</v-list-item-content>
                                    </v-list-item>
                                    <v-list-item>
                                        <v-list-item-content class="font-weight-bold indigo--text text--lighten-1">최대 인원수</v-list-item-content>
                                        <v-list-item-content>{{cdx.max}}명</v-list-item-content>
                                    </v-list-item>
                                    <v-list-item>
                                        <v-list-item-content class="font-weight-bold indigo--text text--lighten-1">티켓 잔여 개수</v-list-item-content>
                                        <v-list-item-content>{{cdx.max-cdx.now}}자리</v-list-item-content>
                                    </v-list-item>
                                    <v-list-item>
                                        <v-list-item-content class="font-weight-bold indigo--text text--lighten-1">신청 대상</v-list-item-content>
                                        <v-list-item-content>{{cdx.who / 100}}학년{{cdx.who / 10 % 10 == 0 ? "전체" : cdx.who / 10 % 10 == 1 ? "남학생" : "여학생"}}</v-list-item-content>
                                    </v-list-item>
                                    <v-list-item>
                                        <v-list-item-content class="font-weight-bold indigo--text text--lighten-1">열린 시간</v-list-item-content>
                                        <v-list-item-content>{{cdx.open.split(' ')[1]}}</v-list-item-content>
                                    </v-list-item>
                                    <v-list-item>
                                        <v-list-item-content class="font-weight-bold indigo--text text--lighten-1">닫힌 시간</v-list-item-content>
                                        <v-list-item-content>{{cdx.close.split(' ')[1]}}</v-list-item-content>
                                    </v-list-item>                                                                        
                                </v-list>
                                <v-card-text>
                                    <v-dialog v-model="infoDialog" max-width="500">
                                        <template v-slot:activator="{ on }">
                                            <v-btn v-if="user['user_grade']==100" color="indigo lighten-1" @click="showTicket(cdx.link)" dark block v-on="on">조회하기</v-btn>
                                        </template>
                                        <v-card>
                                            <v-card-title class="headline">{{cdx.title}}신청정보</v-card-title>
                                            <v-card-text>
                                                {{ticketInfo.tickets}}
                                                <v-divider></v-divider>
                                                <div v-for="(cdx, i) in ticketInfo.userInfo" :key="i">
                                                    {{cdx}}
                                                </div>
                                                
                                            </v-card-text>
                                        </v-card>
                                    </v-dialog>
                                    <v-btn v-if="user['user_grade']!=100" color="indigo lighten-1" @click="buyTicket(cdx.link)" dark block>신청하기</v-btn>
                                </v-card-text>
                            </v-card>
                    </v-slide-item>
                </v-slide-group>
                </v-sheet>
            </v-row>          
        </v-content>
    </v-app>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'
import {extend, ValidationObserver, ValidationProvider} from 'vee-validate'

export default {

components: {
    ValidationProvider,
    ValidationObserver,
},    
 
 data () {
     return {
        drawer: null,
        createDialog: false,
        infoDialog: false,
        tickets : [],
        reservations: [],
        reservation: {
            ticketTitle : '',
            ticketNo: ''
        },
        postTicketNo: '',
        postTicketTitle: '',
        postTicketMax: '',
        postTicketOpen: '',
        postTicketClose: '',
        postTicketWho: '',
        ticketInfo: [],
     }
 },

 created () {
    this.$store.dispatch('auth/getMemberInfo')

    let getToken = localStorage.getItem('token')

    axios.get('/ticket/info', {
        headers: {
            token: getToken
        }
    }).then((response) => {
        let resTicket = response.data.ticket
        for(let i = 0; i<resTicket.length; i++) {
            if(resTicket[i] !== '') {
                this.tickets.push(resTicket[i])
            }
        }
    })

    axios.post('/ticket/status', {
        token: getToken
    })
        .then((response) => {
            let statusTicket = response.data.tickets
            for(let i = 0; i<statusTicket.length; i++) {
                if(statusTicket[i] !== '') {
                    this.reservations.push(statusTicket[i])
                }
            }
        })
    
 },

 mounted () {
     
 },

 methods: {
     logOut() {
         this.$store.dispatch('auth/logout')
     },
     
     buyTicket(ticketLink) {
         let getToken = localStorage.getItem('token')
         axios.post('/ticket/purchase', {
             token: getToken,
             link: ticketLink
         })
            .then((response) => {
                this.$swal({
                    icon: 'success',
                    title: '좋아요!',
                    text: '티켓이 성공적으로 신청되었습니다.'
                })
                setTimeout(() => {
                    this.$router.go()
                },1000)
            })
            .catch((e) => {
                if(e.response.data.explain === 'Ticket Who') {
                    this.$swal({
                      icon: 'error',
                      title: '이런!',
                      text: '학생은 신청 대상이 아닙니다'
                    })
                } else if(e.response.data.explain === 'Ticket Is Reserveded') {
                    this.$swal({
                      icon: 'error',
                      title: '이런!',
                      text: '이미 신청한 티켓입니다'
                    })                    
                }
            })
     },

     showTicket(ticketLink) {
         let getToken = localStorage.getItem('token')
         axios.post('/ticket/show', {
             token: getToken,
             link: ticketLink
         })
            .then((response) => {
                let ticketInfo = response.data
                this.ticketInfo = response.data
            })
     },

     postTicket() {
         let getToken = localStorage.getItem('token')
         axios.post('/ticket/info', {
             no: this.postTicketNo,
             title: this.postTicketTitle,
             max : parseInt(this.postTicketMax),
             open : this.postTicketOpen,
             close : this.postTicketClose,
             who : parseInt(this.postTicketWho),
             token: getToken
         })
            .then((response) => {
                if(response.data) {
                    this.$router.go() // redirect
                }
            })
            .catch((e) => {
                alert("오류", e.response.data)
            })
     }
 },

 computed: {
    ...mapState({
        user: state => state.auth.userInfo,
    })
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