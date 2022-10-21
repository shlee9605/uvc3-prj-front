<template>
<v-app>
    <nav>
        <v-app-bar elevation="4" app flat color="white">
            <div class="paddingmargin_left">
                <router-link to='/'>
                    <img src="../assets/tmlogo.png">
                </router-link>
            </div>
            <div>
                <router-link to='/'>
                    <span class="titletext">오늘의 메이트</span>
                </router-link>
            </div>

            <v-spacer></v-spacer>

            <!-- 왼쪽 -->
            <div class="posttab">
                <router-link to="/posts" v-if="$route.name === 'posts'">
                    <v-btn icon plain style="color: red;">
                        <v-icon dark size="30">mdi-home</v-icon>
                        
                    </v-btn>
                </router-link>
                <router-link to="/posts" v-else>
                    <v-btn icon plain class="black--text">
                        <v-icon dark size="30">mdi-home</v-icon>
                        
                    </v-btn>
                </router-link>
            </div>

            

            <!-- 오른쪽 -->
            <div v-if="!isAuth" class="paddingmargin_right">
                <v-btn elevation="2" rounded router to="/Login">
                    <v-icon left size="26">mdi-account-circle</v-icon>
                    시작하기
                </v-btn>
            </div>
            <div v-else style="margin-right:50px">
            <v-menu offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on" @click="fetchRelationship" class="Nav-bell-btn">
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
                                    <v-img src="../assets/tmlogo_sized.png"></v-img>
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
                <template v-slot:activator="{ on }" >
                    <v-btn plain icon v-on="on">
                        <v-avatar v-if="`${getUserPhotoUrl}` === 'no-photo'" size="32">
                            <img src="../assets/human.jpg">
                        </v-avatar>
                        <v-avatar v-else>
                            <img
							:src="`${url}/uploads${getUserPhotoUrl}`">
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
                items: ['내 프로필', '로그아웃'],
                // UserPhotoUrl: localStorage.getItem('UserPhotoUrl'),
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
        async created(){
            const relationshipcheck = await this.fetchRelationship()
            relationshipcheck;
            //test
            // this.data(this.$route.params.index)
        },

        computed: {
            ...mapGetters('Auth',[
                'isAuth'
            ]),
            ...mapState('Relationship',{
                relationship:'relationship'
            }),
            url (){
				return process.env.VUE_APP_API;
			},
            getUserPhotoUrl (){
                const UserPhotoUrl = localStorage.getItem('UserPhotoUrl');
                console.log("NavBar - computed ", UserPhotoUrl);
                return UserPhotoUrl
            }
        },
        mounted(){
            this.fetchRelationship();
            
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
                        localStorage.removeItem('UserPhotoUrl');
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
            //친구 요청 상태값
            async fetchRelationship(){
                return await this.FETCH_STATUS(localStorage.getItem('UserId')).then(() => {
                    console.log('(store friend) req UserId : ',localStorage.getItem('UserId'));
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
.logo{
    margin: 5px 0 0 50px;
}

.menu{
    margin-left: 30px;
}

.v-application--wrap {
    min-height: 0vh;
}

.Nav-bell-btn {
    cursor: pointer;
}

.v-btn__content{
    cursor: pointer;
}
.toPost
.v-btn__content:hover {
    color: red;
    text-decoration: none;
}

.paddingmargin_left {
    padding-left: 5%;
    margin-left: 4%;
}

.paddingmargin_right {
    padding-right: 8%;
    /* padding-left: 8%; */
}
.titletext {
    color: black;
    display: flex;
    padding-left: 4%;
    width: 100px;
}
.theme--light.v-btn.v-btn--has-bg {
    background-color: #FFFFFF !
}
.posttab {
    margin-left: 2%;
}

</style>