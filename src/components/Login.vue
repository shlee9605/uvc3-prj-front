<template>
  <v-app>
    <v-container fluid class="fill-height background container-loginbox">
        <v-card outlined class="pa-10 mt-10 justify-center card-bottom">
          <v-card-title class="justify-center" style="font-size: 2rem">로그인</v-card-title>
          <v-spacer></v-spacer>
          <v-card-text class="justify-center">
            <ValidationObserver
              ref="signInForm"
              v-slot="{ handleSubmit, invalid, validate }">
              <form @submit.prevent="handleSubmit(onSubmit)">

                <ValidationProvider
                  name="아이디"
                  rules="required"
                  v-slot="{ errors }">
                    <v-text-field
                      clearable
                      dense
                      outlined
                      label="아이디"
                      v-model="id"
                      placeholder="여기에 아이디 입력하삼"
                      
                      :error-messages="errors">
                    </v-text-field>
                </ValidationProvider>

                <ValidationProvider
                  name="비밀번호"
                  rules="required"
                  v-slot="{ errors }">
                    <v-text-field
                      clearable
                      dense
                      outlined
                      label="비밀번호"
                      type="password"
                      v-model="password"
                      placeholder="여기에 비밀번호 입력하삼"
                      
                      :error-messages="errors">
                    </v-text-field>
                </ValidationProvider>

                  <div>
                  <v-btn :disabled="invalid || !validate" type="submit" :loading="loading">
                    접속할래요</v-btn>
                    <a class="auth-font" href="/Auth">회원가입</a>
                  </div>
              </form>
            </ValidationObserver>
            </v-card-text>
        </v-card>
    </v-container>

    <v-alert>
      color="red" dense icon="$mdi-account" type="error"
    </v-alert>
  </v-app>
</template>

<script>
// import axios from 'axios'
import { mapActions } from 'vuex'
import Validate from '@/mixin/Validate.vue';

export default {
  name:'Login',
  mixins: [Validate],
  data() {
    return {
      id: '',
      password:'',
      error:'',
      rPath: '/Post',
    }
  },
  computed: {
    invalidForm() {
      return !this.id || !this.password 
    }
  },
  created() {
    this.rPath = this.$route.query.rPath || '/'
  },
        
  methods: {
          ...mapActions('Auth',[
            'LOGIN'
          ]),
          onSubmit() {
            console.log(this.id,this.password)
            
            this.LOGIN({id: this.id, password: this.password})
              // this.$store.dispatch('LOGIN',{email: this.email, password: this.password})
            // auth.login(this.email,this.password)
          .then(() => {
            // console.log('여기는 찍히나?')
            this.$router.push(this.rPath)
            // console.log("성공?")
            // console.log(data)image.png
          })
          .catch(err => {
            console.log(err);
          })
        },
		
        // 구글 로그인 이후 실행되는 함수

  },

  mounted() {
  },
    }
</script>

<style>
.Login-box {
  margin-top: 80px;
  width: 400px;
  height: 450px;
  position: absolute;
  /* margin: 100px 0 0 20%; */
  padding: 30px 30px 30px 30px;
  top: 10%;
  left: 35%;
  /* height: 240px; */
  border: 2px solid hsl(210, 2%, 49%);
  border-radius: 10%;
}
.input-table {
  padding: 30px 0 0 20px;
}


.form-control {
  width: 290px;
  box-sizing: border-box;
  background-color: #cdd2d4;
  border: 1px solid #cdd2d4;
  border-radius: 3px;
  display: block;
  margin-bottom: 12px;
  padding: 6px 8px;
  transition: background-color .3s;
}

.Log-btn {
  float: right;
  margin: 12px 26px 0 0;
  width: 290px;
}


.auth-font{
  font-size: 8px;
  float: right;
  margin: 10px 26px 0 0;
}

input[type=text].form-control,
input[type=password].form-control,
textarea.form-control {
  font-size: 14px;
}
.form-control:focus {
  background-color: #fff;
}


.another-log {
  display: flex;
  padding: 26% 0 0 0; 
}

.another-log-icon {
  margin: 0 0 0 43px
}

.background {
    height:100vh;
}

.row {
	justify-content: space-evenly;
}
.container-loginbox{
  display: flex;
  justify-content: center;
  background-color: #fafafa;
  /* background: url("~@/assets/tmlogo_sized.png") repeat center center fixed !important; */

}
.card-bottom {
  width: 400px;
  height: 400px;
  box-sizing: border-box;
  padding-bottom: 5%;
}
.v-text-field{
  width: 200px;
}

</style>