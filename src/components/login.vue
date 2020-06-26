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
          <v-col md="3">
                <div class="font-weight-black headline indigo--text text--lighten-1" align="center">로그인</div>
              <v-card-text>
                <ValidationObserver ref="observer" v-slot="{}">
                    <form>                       
                    <ValidationProvider v-slot="{ errors }" name="이메일" rules="required">
                        <v-text-field
                        v-model="auth_id"
                        :error-messages="errors"
                        label="이메일"
                        suffix="@gsm.hs.kr"
                        required
                        outlined
                        ></v-text-field>
                    </ValidationProvider>
                    <ValidationProvider v-slot="{ errors }" name="비밀번호" rules="required">
                        <v-text-field
                        v-model="auth_pw"
                        :error-messages="errors"
                        label="비밀번호"
                        type="password"
                        v-on:keyup.enter="submit"
                        required
                        outlined
                        ></v-text-field>
                    </ValidationProvider>
                    <div class="text-center">
                        <v-btn class="subtitle-2 mx-2" color="indigo lighten-1" @click="submit" dark large>
                            <v-icon dark>done_all</v-icon>
                        </v-btn>                                      
                    </div>                    
                    </form>   
                </ValidationObserver>
              </v-card-text>
                <v-spacer/>
          </v-col>
        </v-row>        
      </v-container>
    </v-content>
       <v-footer padless absolute>
      <v-col
        class="py-2 text-center caption">
스탬프.com - <a href='https://mo-hun.github.io/StampText/TermOfService'>이용약관</a> / <a href="https://mo-hun.github.io/StampText/PrivacyStatement">개인정보취급방침</a>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
    import {required} from 'vee-validate/dist/rules'
    import {extend, ValidationObserver, ValidationProvider} from 'vee-validate'
    import {mapState} from 'vuex'
    import axios from 'axios'

    extend('required', {
    ...required,
    message: '{_field_} 입력칸을 채워주세요',
  })

  export default {
    components: {
      ValidationProvider,
      ValidationObserver,
    },    
    props: {
      source: String,
    },
    
    data: () => ({
        auth_id: '',
        auth_pw: '',
    }),

    computed: {

    },
    
    methods: {
      submit () {
        this.$refs.observer.validate().then(valid => {
          if(valid) {
            let id = `${this.auth_id}@gsm.hs.kr`
            let pw = this.auth_pw
            
            this.$store.dispatch('auth/login', {auth_id: id, auth_pw: pw})
              .then(() => {
                
              })
              .catch((e) => {
                if(e.response) {
                    
                  if(e.response.data.explain === 'Incorrect') {
                    this.$swal({
                      icon: 'error',
                      title: '이런!',
                      text: '로그인 또는 비밀번호가 틀렸습니다.'
                    })
                  }
                }
            })            
          }
        })
      },
    }
  }
</script>