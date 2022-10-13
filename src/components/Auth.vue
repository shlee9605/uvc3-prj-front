<template>
<v-app>
    <v-container fluid class="fill-height teal">
        <v-row>
            <v-col cols="12" xs="12" sm="8" md="8" lg="7" class="ma-auto">
                <v-card outlined class="pa-10">
                    <v-card-title class="justify-center" style="font-size: 2rem">회원가입</v-card-title>
                    <v-spacer></v-spacer>
                    <v-card-text>
                        <form @submit.prevent="signUp">
                            <v-text-field
                                clearable
                                dense
                                outlined
                                label="이름"
                                v-model="name">                                
                            </v-text-field>
                            <v-text-field
                                clearable
                                dense
                                outlined
                                type="email"
                                label="이메일"
                                v-model="email">
                            </v-text-field>
                            <v-text-field
                                clearable
                                dense
                                outlined
                                label="아이디"
                                v-model="userId">
                            </v-text-field>
                            <v-text-field
                                clearable
                                dense
                                outlined
                                label="비밀번호"
                                type="password"
                                v-model="password">
                            </v-text-field>
                            <v-text-field
                                clearable
                                dense
                                outlined
                                label="비밀번호 확인"
                                type="password"
                                v-model="passwordChk">
                            </v-text-field>

                            <v-row align="center">
                                <v-col class="d-flex" cols="12" sm="6">
                                    <v-text-field
                                        clearable
                                        dense
                                        outlined
                                        label="나이"
                                        type="number"
                                        v-model.number="age">
                                    </v-text-field>
                                </v-col>
                                <v-col class="d-flex" cols="12" sm="6">
                                        <v-select
                                            v-model="gender"
                                            :items="genderSel"
                                            dense
                                            label="성별"
                                            outlined>
                                        </v-select>
                                </v-col>
                            </v-row>

                            <v-divider class="pa-5"></v-divider>
                            
                            <v-row>
                                <v-col class="d-flex" cols="2" sm="6">
                                    <div>
                                    <subheader>프로필 사진</subheader>
                                        <picture-input
                                            ref="pictureInput"
                                            width="150" height="160" margin="5" accept="image/*" size="10" button-class="btn"
                                            :custom-strings="{
                                                upload: '<h1>Upload Here!</h1>',
                                                drag: 'Upload your profile picture here'
                                            }"
                                            @change="onChange">
                                        </picture-input>
                                    </div>
                                </v-col>
                                <v-col class="d-flex" cols="12" sm="6">
                                    <div>
                                        <subheader>바이오</subheader>
                                        <v-textarea filled background-color="#FAEBD7"
                                        counter="150"
                                            v-model="profileMessage"  placeholder="Write your profile message here">
                                          </v-textarea>
                                    </div>
                                </v-col>
                            </v-row>

                            <v-divider class="ma-4"></v-divider>

                            <div>
                            <v-btn type="submit" :loading="loading"
                            >회원가입</v-btn>
                            <a class="auth-font" href="/Login">이미 유저입니다</a>
                            </div>
                       </form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</v-app>
</template>

<script>
import axios from 'axios';
import PictureInput from 'vue-picture-input'
import { mapActions } from 'vuex'

export default {
    data () {
        return {
            name: '',
            email: '',
            userId: '',
            password: '',
            passwordChk: '',
            age: '',
            gender: '',
            photoUrl: 'no-img.jpg',
            profileMessage: '',
            genderSel: ['여', '남'],
            loading: false,
        }
    },
    computed: {
        invalidForm() {
            return !this.userId || !this.password
        }
    },
    components: {
        PictureInput
    },
    methods: {
        onChange (image) {
            console.log("new picture selected")
            if(image) {
                console.log('picture loaded')
                this.photoUrl = image
            } else {
                console.log('FileReader API not supported.')
            }
        },

        async signUp() {
            if (this.loading) return;
            this.loading = true;

            const axiosBody = {
                name: this.name,
                email: this.email,
                userId: this.userId,
                password: this.password,
                age: this.age,
                gender: this.gender,
                photoUrl: this.photoUrl,
                profileMessage: this.profileMessage,
            };
            console.log('auth/signUp - axiosBody: ', axiosBody);
        } 
    }
    }
</script>

<style>
.auth-font{
  font-size: 8px;
  float: right;
  margin: 10px 26px 0 0;
}

</style>