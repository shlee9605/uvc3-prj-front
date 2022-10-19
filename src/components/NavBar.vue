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
                    <v-card-title>알림</v-card-title>
                    <v-list>
                        <template v-if="relationship.length">
                            <v-list-item v-for="(item,index) in relationship" :key="index">
                                <v-list-item-avatar>
                                    <v-img src="../assets/human.jpg"></v-img>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <div style="display:flex; margin-right: 15px;">
                                    <v-list-item-title v-html="item.reqUserId"></v-list-item-title>
                                        <div style="display:flex;">
                                            <v-btn 
                                            small
                                            @click="acceptRequest"> 수락 </v-btn>
                                            <v-btn 
                                            small
                                            @click="rejectRequest"> 거절 </v-btn>
                                        </div>
                                    </div>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                        <template v-else>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>받은 알림이 없습니다.</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
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

                        <v-list-item @click="signOut">
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
import axios from 'axios';
import { mapGetters, mapState, mapActions } from 'vuex'

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
            
            //test
            // $route(to,from){
            //     if(to.path !== from.path) {
            //         return this.fetchRelationship() }
            // }
        },
        created(){
            this.fetchRelationship()
            
            //test
            // this.data(this.$route.params.index)
        },

        computed: {
            ...mapGetters('Auth',[
                'isAuth'
            ]),
            ...mapState('Relationship',{
                relationship:'relationship'
            })
        },
        methods: {
            async signOut() {
                await axios
                    .get(
                        process.env.VUE_APP_API + '/auth/signOut',
                        {},
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`,
                            },
                        }
                    )
                    .then((response) => {
                        console.log('logout - response:', response);
                        localStorage.removeItem('token');
                        
                        localStorage.removeItem('UserId');

                        this.GET_LOGIN_STATUS = false
                        // console.log(this.GET_LOGIN_STATUS);
                        this.GET_USER_DATA = null;
                        // console.log(this.GET_USER_DATA = null);
                        // this.$router.go('/');
                        this.$router.push({ name: "Home"})
                        this.$router.go('/')
                    })
                    .catch((error) => {
                        console.log('logout - error: ', error);
                    });
            },

            ...mapActions('Relationship',[
                'FETCH_STATUS',
                'ACCEPT_REQ',
                'REJECT_REQ',
            ]),

            fetchRelationship(){
                return this.FETCH_STATUS(localStorage.getItem('UserId')).then(() => {
                    console.log('req UserId : ',localStorage.getItem('UserId'));
                })
            },
            //친구 요청 수락
            acceptRequest(){
                console.log('수락');
                return this.ACCEPT_REQ(localStorage.getItem('UserId'))
            },

            //친구 요청 거절
            rejectRequest(){
                console.log('거절');
                return this.REJECT_REQ(localStorage.getItem('UserId'))
            },
        },
    };
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