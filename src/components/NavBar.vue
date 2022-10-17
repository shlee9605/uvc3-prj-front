<template>
<v-app>
    <nav>
        <v-app-bar app flat color="white">
            <div>
                <router-link to='/'>
                    <img src="../assets/logo.png" stye="width: 100px; height: 36px;">
                </router-link>
            </div>

            <!-- 왼쪽 -->
            <div>
                <router-link to="/posts" v-if="$route.name === 'posts'">
                    <v-btn plain text style="color: red;">
                        <v-icon dark left size="30">mdi-post</v-icon>
                        게시글
                    </v-btn>
                </router-link>
                <router-link to="/posts" v-else>
                    <v-btn plain text>
                        <v-icon dark left size="30">mdi-post</v-icon>
                        게시글
                    </v-btn>
                </router-link>
            </div>

            <v-spacer></v-spacer>

            <!-- 오른쪽 -->
            <div v-if="!isAuth">
                <v-btn elevation="2" rounded router to="/Login">
                    <v-icon left size="26">mdi-account-circle</v-icon>
                    시작하기
                </v-btn>
            </div>
            <div v-else>

            <v-menu offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn plain icon v-on="on" class="Nav-bell-btn">
                        <v-avatar size="32" >
                            <img src="../assets/bell.png">
                        </v-avatar>
                    </v-btn>
                </template>

                <v-card>
                    <v-list>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>알림이 왓습니다</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-menu>



            <v-menu offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn plain icon v-on="on" class="Nav-btn">
                        <v-avatar>
                            <img src="../assets/human.jpg">
                        </v-avatar>
                    </v-btn>
                </template>

                <v-card>
                    <v-list>
                        <v-list-item router to="/myProfile">
                            <v-list-item-content>
                                <v-list-item-title>
                                    <v-icon left>mdi-account</v-icon>
                                    내 프로필</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>
                                    <v-icon left>mdi-login-variant</v-icon>
                                    로그아웃</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-menu>
        </div>
        </v-app-bar>
    </nav>
</v-app>
</template>

<script>
import { mapGetters } from 'vuex'

    export default {
        name: 'NavBar',
        data(){
            return {
                GET_LOGIN_STATUS: localStorage.getItem('token') ? true : false,
            items: ['내 프로필', '로그아웃']
            }
        },
        watch: {
            GET_USER_DATA() {
                const data = JSON.parse(localStorage.getItem('user')) || null;
                this.GET_USER_DATA = data;
            },
        },
        computed: {
            ...mapGetters('Auth',[
                'isAuth'
            ])
        }
        
    }
</script>

<style>
.v-application--wrap {
    min-height: 0vh;
}

.Nav-bell-btn {
    cursor: pointer;
}

.v-btn__content{
    cursor: pointer;
}

.v-btn__content:hover {
    color: red;
    text-decoration: none;
}
</style>