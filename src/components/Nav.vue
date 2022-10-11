<template>
    <nav class="header">
        <div class="header-logo">
            <router-link to='/'>
                <img src="../assets/logo.png" style="width:100px; height:36px;">
            </router-link>
        </div>
        <v-spacer></v-spacer>
        
        <!-- 로그인, 회원가입 페이지에서는 나타나지 않음 -->
        <div class="header-auth" v-if="!componentBlackList.includes($route.name)">
            <v-btn
                class="Nav-btn" 
                rounded
                to="/Login"
                v-if="!GET_LOGIN_STATUS"
            >시작하기</v-btn>
        
        
            <v-menu offset-y v-else>
            <template v-slot:activator="{ on }">
            <v-btn
                depressed
                fab
                small
                color="red white--text"
                class="font-weight-bold"
                v-on="on">
                <v-avatar v-if="GE_USER_DATA.photoUrl !== 'no-photo.jpg'">
                <img
                    :src="`${GE_URL}/uploads/avatar/${GE_USER_DATA.photoUrl}`"
                    :alt="GE_USER_DATA.channelName" />>
                </v-avatar>

                <span v-else>{{ channelAvatar }}</span>
            </v-btn>
            </template>

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

                <v-list-item @click="openVideoModal">
                <v-list-item-icon>
                    <v-icon>mdi-video-plus</v-icon>
                </v-list-item-icon>
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
        </v-menu>
        </div>
    </nav>
</template>

<script>
    export default {
        data(){
            return {
            GET_LOGIN_STATUS: localStorage.getItem('token') ? true : false,
            
            componentBlackList: [
                'Login',
                'Auth'
            ]
            }
        }
        
    }
</script>




<style>
.header{
    display: flex;
    height: 60px;
}


.Nav-btn {
    margin: 15px 30px 0 0;
    width: 30px;
    width: 100px;
}

.Nav-btn:hover {
    color: orange;
    background-color: black;
    text-decoration: none;
}


.header-logo {
    margin: 15px 0 0 40px;
}


</style>