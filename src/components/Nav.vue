<template>
    <nav class="header">
        <div class="header-logo">
            <router-link to='/'>
                <img src="../assets/logo.png" style="width:100px; height:36px;">
            </router-link>
        </div>
        <div class="Nav-point">
            <router-link to="/posts" v-if="$route.name === 'posts'">
                <button class="Nav-point-btn" style="color:red;">
                    피드
                </button>
            </router-link>
            <router-link to="/posts" v-else>
                <button class="Nav-point-btn">
                    피드
                </button>
            </router-link>
        </div>
        <v-spacer></v-spacer>
        
        <!-- 로그인, 회원가입 페이지에서는 나타나지 않음 -->
        <div class="header-auth" v-if="!componentBlackList.includes($route.name)">    
            <div v-if="isAuth">
                <!-- 종버튼 -->
                    <a>
                        <button 
                        icon x-large 
                        class="Nav-bell-btn"
                        type="submit">
                            <v-avatar
                            size="20"
                            color="red white--text">
                                    <img src="../assets/bell.png">
                            </v-avatar>
                        </button>
                    </a>                
                <!-- 프로필 -->
                    <a href="" >
                        <v-btn
                        icon x-large 
                        class="Nav-profile-btn"
                        type="submit">
                            <v-avatar
                            
                            color="red white--text">
                                    <img src="../assets/human.jpg">
                            </v-avatar>
                        </v-btn>
                    </a>
            </div>
            <div v-else>
                <!-- 로그인 페이지 이동 -->
                <a 
                class="input-avatar">
                    <v-btn
                        class="Nav-btn" 
                        rounded
                        to="/Login"
                        v-if="!GET_LOGIN_STATUS"
                    >시작하기</v-btn>
                </a>
            </div>
        <!-- <v-menu offset-y v-else> -->
            <!-- <a class="input-avatar">
              <button type="submit">
                <v-avatar 
                color="red white--text"
                v-if="GE_USER_DATA.photoUrl !== 'no-photo.jpg'">
                    <img
                      :src="`${GE_URL}/uploads/avatar/${GE_USER_DATA.photoUrl}`"
                      :alt="GE_USER_DATA.channelName" />
                  </v-avatar>
                  <span v-else>
                    <v-avatar
                      color="red white--text">
                      {{ channelAvatar }}
                    </v-avatar>
                  </span>
                </button>
            </a>

            <v-card>
            <v-list>
                <v-list-item>
                <v-list-item-avatar
                    small
                    color="red white--text"
                    class="align-center d-flex font-weight-bold justify-center">
                    <v-avatar v-if="GE_USER_DATA.photoUrl !== 'no-photo.jpg'">
                    <img
                        :src="`${GE_URL}/uploads/avatar/${GE_USER_DATA.photoUrl}`"/>
                    </v-avatar>

                    <span v-else>{{ channelAvatar }}</span>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title>{{
                    GE_USER_DATA.channelName
                    }}</v-list-item-title>
                    <v-list-item-subtitle>{{
                    GE_USER_DATA.email
                    }}</v-list-item-subtitle>
                </v-list-item-content>
                </v-list-item>

                <v-divider class="mt-3"></v-divider>

                <v-list-item>
                <v-list-item-title>프로필</v-list-item-title>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item @click="signOut">
                <v-list-item-icon>
                    <v-icon>mdi-login-variant</v-icon>
                </v-list-item-icon>
                <v-list-item-title>로그아웃</v-list-item-title>
                </v-list-item>
            </v-list>
            </v-card>
        </v-menu> -->
        </div>
    </nav>
</template>

<script>
// import store from '../store'
import { mapGetters } from 'vuex'
    export default {
        data(){
            return {
            // isAuth: false,
            GET_LOGIN_STATUS: localStorage.getItem('token') ? true : false,
            GET_USER_DATA: JSON.parse(localStorage.getItem('user')) || null,
            componentBlackList: [
                'Login',
                'Auth'
            ]
            }
        },
        watch: {
            GE_USER_DATA() {
                const data = JSON.parse(localStorage.getItem('user')) || null;
                this.GE_USER_DATA = data;
            },
        },
        computed: {
            channelAvatar() {
                const setChannelAvatar = this.GE_USER_DATA.channelName
                    .split('')[0]
                    .toUpperCase();
                console.log('setChannelAvatar : ', setChannelAvatar);
                return setChannelAvatar;
            },
            ...mapGetters([
                'isAuth'
            ])
        },
        // created: {
        //     isAuthMethod() {
        //          this.isAuth = store.getters.isAuth
        //     }
        // }
        
    }
</script>




<style>
.header{
    display: flex;
    height: 60px;
}

.Nav-point{
    margin: 24px 0 0 20px;
}

.Nav-point-btn {
    font-size: 14px;
    color: rgb(84, 82, 82);
    font-weight: 700;
    font-style: initial;
}

.Nav-point-btn:hover {
    text-decoration:underline;
}

.header-auth {
    display: flex;
}


.Nav-btn {
    margin: 15px 30px 0 0;
    width: 30px;
    width: 100px;
}

.Nav-btn:hover {
    color: red;
    background-color: black;
    text-decoration: none;
}

.Nav-bell-btn {
    margin-top: 20px;
    border-radius: 20%;
    cursor: pointer;
}
/* .Nav-bell-btn:active{
    background-color: #606060;
    border-radius: 50%;
} */

.Nav-profile-btn {
    margin: 0 30px 0 0;
}

.header-logo {
    margin: 15px 0 0 40px;
    color: red;
}


</style>