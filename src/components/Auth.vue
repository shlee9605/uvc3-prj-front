<template>
<v-app>
    <v-container fluid class="fill-height teal">
            <v-col cols="12" xs="12" sm="8" md="8" lg="7" class="ma-auto">
                <v-card outlined class="pa-10 mt-10">
                    <v-card-title class="justify-center" style="font-size: 2rem">회원가입</v-card-title>
                    <v-spacer></v-spacer>
                    <v-card-text>
                        <form @submit.prevent="signUp">
							<div class="mb-5">
								<picture-input
									ref="pictureInput"
									width="150" height="160" margin="5" accept="image/*" size="10" button-class="btn"
									:custom-strings="{
										upload: '<h1>Upload Here!</h1>',
										drag: '프로필 사진 등록'
									}"
									@change="onChange">
								</picture-input>
							</div>
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
							<v-select
								v-model="gender"
								:items="genderSel"
								dense
								label="성별"
								outlined>
							</v-select>
							<v-menu
								ref="menu"
								v-model="menu"
								:close-on-content-click="false"
								:nudge-right="40"
								transition="scale-transition"
								offset-y
								min-width="auto">
								<template v-slot:activator="{ on, attrs }">
								<v-text-field
									v-model="birthdate"
									label="생년월일"
									prepend-icon="mdi-calendar"
									readonly
									v-bind="attrs"
									v-on="on"
								></v-text-field>
								</template>
								<v-date-picker
								v-model="birthdate"
								@input="menu=false"
								>
								<v-spacer></v-spacer>
								<v-btn
									text
									color="primary"
									@click="menu = false"
								>
									Cancel
								</v-btn>
								<v-btn
									text
									color="primary"
									@click="$refs.menu.save(birthdate)"
								>
									OK
								</v-btn>
								</v-date-picker>
							</v-menu>

							<v-subheader>상태 메세지</v-subheader>
							<v-textarea filled background-color="#FAEBD7"
							counter="150"
							v-model="profileMessage"  placeholder="원하는 상태 메시지를 작성하세요!">
							</v-textarea>
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
            birthdate: '',
            gender: '',
            photoUrl: 'no-img.jpg',
            profileMessage: '',
            genderSel: ['여', '남'],
            loading: false,
			picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0,10),
			menu: false,
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
    components: {
        PictureInput,
    },
    methods: {
		...mapActions([
			'SIGNUP'
		]),
        signUp() {
            if (this.loading) return;
            this.loading = true;

            const axiosBody = {
                name: this.name,
                email: this.email,
                userId: this.userId,
                password: this.password,
                birthdate: this.birthdate,
                gender: this.gender,
                photoUrl: this.photoUrl,
                profileMessage: this.profileMessage,
            };
			console.log(axiosBody);
				this.SIGNUP( axiosBody )
			.then(
				this.$router.push(this.rPath)
			)
			.catch(err=> {
				console.log(err);
			})
        },
		onChange (image) {
            console.log("new picture selected")
            if(image) {
                console.log('picture loaded')
                this.photoUrl = image
            } else {
                console.log('FileReader API not supported.')
            }
        },
    }
}
</script>

<style>
.auth-font{
  font-size: 8px;
  float: right;
  margin: 10px 26px 0 0;
}

.row {
	justify-content: space-evenly;
}
</style>