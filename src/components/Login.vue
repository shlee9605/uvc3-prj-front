<template>
  <div>
    <form class="Login-box" @submit.prevent="onSubmit">
      <div>
        <h2>Login</h2>
      </div>
      <div class="input-table">
        <div>
          <label for="userId">Id:</label>
          <input class="form-control" type="text" name="userId"
          v-model="userId" placeholder="123@xxx.com">
        </div>
        <div>
          <label for="password">Password:</label>
          <input class="form-control" type="password"
          v-model="password" placeholder="password">
        </div>
        <div>
          <v-btn class="Log-btn" type="submit">Login</v-btn>
        </div>
        <div>
          <a class="auth-font" href="/Auth">회원가입</a>
        </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
      </div>
      <div class="another-log">
          <div class="another-log-icon">
            <a href="">
              <v-btn icon x-large>
                <v-avatar 
                  color="primary">
                  <img src="../assets/Google.png" alt="">
                </v-avatar>
              </v-btn>
            </a>
          </div>
          <div class="another-log-icon">
            <a href="">
              <v-btn icon x-large>
                <v-avatar color="red white--text" >
                  <img src="../assets/Naver.png" alt="">
                </v-avatar>
              </v-btn>
            </a>
          </div>
          <div class="another-log-icon">
            <a href="">
              <v-btn icon x-large>
                <v-avatar color="black white--text">
                  <img src="../assets/kakao.png" alt="">
                </v-avatar>
              </v-btn>
            </a>
          </div>
      </div>
      </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      userId: '',
      password:'',
      error:'',
      rPath: '/Post',
    }
  },
  computed: {
    invalidForm() {
      return !this.userId || !this.password 
    }
  },
  created() {
    this.rPath = this.$route.query.rPath || '/'
  },
        
  methods: {
          ...mapActions([
            'LOGIN'
          ]),
          onSubmit() {
            console.log(this.userId,this.password)
            
            this.LOGIN({userId: this.userId, password: this.password})
              // this.$store.dispatch('LOGIN',{email: this.email, password: this.password})
            // auth.login(this.email,this.password)
          .then(
            // console.log('여기는 찍히나?')
            this.$router.push(this.rPath)
            // console.log("성공?")
            // console.log(data)image.png
          )
          .catch(err => {
            console.log(err);
          })
        }
      }
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




</style>