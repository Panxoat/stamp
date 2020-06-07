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
                <div class="font-weight-black headline indigo--text text--lighten-1" align="center">회원가입</div>
              <v-card-text>
                <ValidationObserver ref="submitObserver" v-slot="{}">
                    <form>
                    <ValidationProvider v-slot="{ errors }" name="이름" rules="required|min:2|max:4">
                        <v-text-field
                        v-model="name"
                        :error-messages="errors"
                        :counter="4"
                        label="이름"
                        required
                        outlined
                        ></v-text-field>
                    </ValidationProvider>

                    <v-row>
                      <v-col class="pt-0 pb-0">
                        <ValidationProvider v-slot="{ errors }" name="학년" rules="required">
                            <v-select
                            v-model="grade"
                            :items="gradeItems"
                            :error-messages="errors"
                            label="학년"
                            suffix="학년"
                            required
                            outlined
                            ></v-select>
                        </ValidationProvider>
                      </v-col>
                      <v-col class="pt-0 pb-0">
                        <ValidationProvider v-slot="{ errors }" name="반" rules="required">
                            <v-select
                            v-model="classno"
                            :items="classItems"
                            :error-messages="errors"
                            label="반"
                            suffix="반"
                            required
                            outlined
                            ></v-select>
                        </ValidationProvider>
                      </v-col>
                      <v-col class="pt-0 pb-0">
                        <ValidationProvider v-slot="{ errors }" name="학년" rules="required">
                            <v-select
                            v-model="number"
                            :items="numberItems"
                            :error-messages="errors"
                            label="번호"
                            suffix="번"
                            required
                            outlined
                            ></v-select>
                        </ValidationProvider>
                      </v-col>                                            
                    </v-row>
                    
                    <v-row>
                      <v-col md="9" class="pt-0 pb-0">
                        <ValidationObserver ref="sendObserver" v-slot={}>
                          <ValidationProvider v-slot="{ errors }" name="이메일" rules="required">
                              <v-text-field
                              v-model="email"
                              :error-messages="errors"
                              label="이메일"
                              :disabled="sendDisabled"
                              suffix="@gsm.hs.kr"
                              required
                              outlined
                              ></v-text-field>
                          </ValidationProvider>
                        </ValidationObserver>
                      </v-col>
                      <v-col md="3" class="pt-0 pb-0">
                        <v-btn class="white--text" :disabled="sbtnDisabled" color="indigo lighten-1" block x-large @click="sendCode"><v-icon>send</v-icon></v-btn>
                      </v-col>
                    </v-row>

                    <v-row v-if="sendConfirmView === true">
                      <v-col md="9" class="pt-0 pb-0">
                        <ValidationObserver ref="confirmObserver" v-slot={}>
                          <ValidationProvider v-slot="{ errors }" name="인증코드" rules="required">
                              <v-text-field
                              v-model="code"
                              :error-messages="errors"
                              label="인증코드"
                              :disabled="confirmDisabled"
                              required
                              outlined
                              ></v-text-field>
                          </ValidationProvider>
                        </ValidationObserver>
                      </v-col>
                      <v-col md="3" class="pt-0 pb-0">
                        <v-btn class="white--text" :disabled="cbtnDisabled" color="indigo lighten-1" block x-large @click="confirmCode"><v-icon>done</v-icon></v-btn>
                      </v-col>
                    </v-row>                    

                    <ValidationProvider v-slot="{ errors }" name="비밀번호" rules="required|alpha_num|min:8|max:20" vid="pw">
                        <v-text-field
                        v-model="pw"
                        :error-messages="errors"
                        :counter="20"
                        label="비밀번호"
                        type="password"
                        required
                        outlined
                        ></v-text-field>
                    </ValidationProvider>
                    <ValidationProvider v-slot="{ errors }" name="비밀번호 확인" rules="confirmed:pw|required">
                        <v-text-field
                        v-model="pwc"
                        :error-messages="errors"
                        :counter="20"
                        label="비밀번호 확인"
                        type="password"
                        required
                        outlined
                        ></v-text-field>
                    </ValidationProvider>                    
                    <ValidationProvider v-slot="{ errors }" name="핸드폰 번호" rules="required|integer|min:11">
                        <v-text-field                        
                        v-model="phone"
                        :error-messages="errors"
                        label="핸드폰 번호"
                        required
                        outlined
                        ></v-text-field>
                    </ValidationProvider>
                    <ValidationProvider v-slot="{errors}" rules="required" name="성별">
                        <v-radio-group v-model="gender" row :error-messages="errors">
                            <v-radio label="남" value=0></v-radio>
                            <v-radio label="여" value=1></v-radio>
                        </v-radio-group>                                            
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
벌점왕HS.com
 - SitSeeGSM.com 으로 자동 연결
SitSeeGSM.com
 - CloudWatch NameServer를 통해 현재 AWS 서버 연결 예정
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
    import {required, max, integer, min, alpha_num, confirmed} from 'vee-validate/dist/rules'
    import { extend, ValidationObserver, ValidationProvider} from 'vee-validate'
    import axios from 'axios'

    extend('required', {
    ...required,
    message: '{_field_} 입력칸을 채워주세요',
  })

    extend('max', {
    ...max,
    message: '{_field_}는 최대 {length}자를 넘어갈 수 없습니다',
  })

    extend('min', {
    ...min,
    message: '{_field_}는 최대 {length}자 이상 입력해 주세요',
  })  

    extend('integer', {
    ...integer,
    message: '숫자만 입력해 주세요',
  })

    extend('alpha_num', {
    ...alpha_num,
    message: '특수문자는 포함될 수 없습니다',
  })

    extend('confirmed', {
    ...confirmed,
    message: '비밀번호가 서로 다릅니다',
  })  

  export default {
    components: {
      ValidationProvider,
      ValidationObserver,
    },    
    props: {
      source: String,
    },  
    
    data () {
      return {
        name: '',
        email: '',
        code: '',
        pw: '',
        pwc:'',
        phone: '',
        gender:'',
        grade:'',
        classno: '',
        number:'',
        gradeItems: [1, 2, 3],
        classItems: [1, 2, 3, 4],
        numberItems: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
          11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          ],
        sendConfirmView: false,
        sendDisabled: false,
        confirmDisabled: false,
        sbtnDisabled: false,
        cbtnDisabled: false,

      }
    },
    
    methods: {
      sendCode () {
        this.$refs.sendObserver.validate().then(valid => {
          if (valid) {
            axios.post('/auth/sendcode',{
              email: `${this.email}@gsm.hs.kr`
            })
              .then((response) => {
                if(response.data.message === "Success SendCode") {
                  this.sendConfirmView = true //View 변경
                  this.sendDisabled = true //제출 후 textField 비활성화
                  this.sbtnDisabled = true // 제출 후 button  비활성화
                }
              })
              .catch((e) => {
                if(e.response) {
                  alert("Error!")
                }
              })
          }
        })
      },

      confirmCode () {
        this.$refs.confirmObserver.validate().then(valid => {
          if (valid) {
            axios.post('/auth/confirmcode', {
              email: `${this.email}@gsm.hs.kr`,
              code: this.code
            })
              .then((response) => {
                console.log("res data")
                if(response.data){
                  this.$swal({
                    icon: 'success',
                    title: '좋아요!',
                    text: '인증코드 확인이 완료되었습니다.'
                  })
                  this.confirmDisabled = true //제출 후 textfield 비활성화
                  this.cbtnDisabled = true //제출 후 button 비활성화                  
                }
              })
              .catch((e) => {
                console.log("error data")
                if(e.response) {
                  if(e.response.data.explain === 'Incorrect Code') {
                    this.$swal({
                      icon: 'error',
                      title: '이런!',
                      text: '인증코드가 일치하지 않습니다.'
                    })
                  }
                }
              })
          }
        })
      },

      submit () {
        this.$refs.submitObserver.validate().then(valid => {
          if (valid) {
            axios.post('/auth/signup',
            { 
              email: `${this.email}@gsm.hs.kr`,
              pw: this.password,
              pwc: this.passwordcheck,
              grade: this.grade,
              classno: this.classno,
              number: this.number,
              phone: this.phone,
              gender: this.gender,
              name: this.name
            })
              .then((response) => {
                alert("회원가입")
            })
              .catch((e) => {
                if(e.response) {
                  if(e.response.data.explain === 'joi error') {
                    this.$swal({
                      icon: 'error',
                      title: '이런!',
                      text: '이메일 인증을 하지 않으셨나요?'
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