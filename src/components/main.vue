<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col md=3>
            <div class="font-weight-black display-2 indigo--text text--lighten-1 my-3" align="center">스탬프</div>
            <div class="font-weight-black headline indigo--text text--lighten-1" align="center">기숙사 노트북 대여 시스템.beta</div>
                <v-card-text>
                    <div class="my-4">
                        <v-btn x-large color="indigo lighten-1" dark block v-on:click="routePage('register')">회원가입</v-btn>
                    </div>
                    <div class="my-4">
                        <v-btn x-large color="indigo lighten-1" dark block v-on:click="routePage('login')">로그인</v-btn>
                    </div>
                </v-card-text>
        </v-col>
        </v-row>        
      </v-container>
    </v-content>
        <v-footer padless absolute>
      <v-col
        class="py-2 text-center caption">
벌점왕HS.com
 - SitSeeGSM.com 으로 자동 연결
SitSeeGSM.com
 - CloudWatch NameServer를 통해 현재 AWS 서버 연결 예정
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
    data () {
        return {
            
        }
    },

    methods: {
        routePage(pathName){
            this.$router.push({name: pathName})
        }
    }
}
</script>