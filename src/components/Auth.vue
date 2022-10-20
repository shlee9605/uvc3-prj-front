<template>
<v-app>
    <v-container fluid class="fill-height teal">
            <v-col cols="12" xs="12" sm="8" md="8" lg="7" class="ma-auto">
                <v-card outlined class="pa-10 mt-10">
                    <v-card-title class="justify-center" style="font-size: 2rem">회원가입</v-card-title>
                    <v-spacer></v-spacer>
                    <v-card-text>
                        <ValidationObserver
                            ref="signUpForm"
                            v-slot="{ handleSubmit, invalid, validate }">
                        <form @submit.prevent="handleSubmit(signUp)">

                            <ValidationProvider
                                name="이름"
                                rules="required"
                                v-slot="{ errors }">
                                <v-text-field
                                    clearable
                                    dense
                                    outlined
                                    label="이름"
                                    v-model="name"
                                    :error-messages="errors">
                                </v-text-field>  
                            </ValidationProvider>
                            
                            <ValidationProvider
                                name="이메일"
                                rules="required|email"
                                v-slot="{ errors }">
                                <v-text-field
                                    clearable
                                    dense
                                    outlined
                                    type="email"
                                    label="이메일"
                                    v-model="email"
                                    :error-messages="errors"
                                    @change="checkEmail">
                                </v-text-field>
                            </ValidationProvider>

                            <ValidationProvider
                                name="아이디"
                                rules="required|min:3"
                                v-slot="{ errors }">
                                <v-text-field
                                    clearable
                                    dense
                                    outlined
                                    label="아이디"
                                    v-model="id"
                                    :error-messages="errors"
                                    @change="checkId">
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
                                    :error-messages="errors">
                                </v-text-field>
                            </ValidationProvider>

                            <ValidationProvider
                                name="비밀번호"
                                rules="required|confirmed:'비밀번호'"
                                v-slot="{ errors }">
                                <v-text-field
                                    clearable
                                    dense
                                    outlined
                                    label="비밀번호 확인"
                                    type="password"
                                    v-model="passwordChk"
                                    :error-messages="errors">
                                </v-text-field>
                            </ValidationProvider>

                            <ValidationProvider
                                name="성별"
                                rules="required"
                                v-slot="{ errors }">
                                <!-- <v-field type="text" name="성별" v-model="gender" style="display:none;"></v-field> -->
                                <v-select
                                    outlined
                                    dense
                                    label="성별"
                                    v-model="gender"
                                    :items="genderSel"
                                    :error-messages="errors">
                                </v-select>
                            </ValidationProvider>

                            <v-menu
                                ref="menu"
                                v-model="menu"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="auto">
                            <template v-slot:activator="{ on, attrs }">

                                <ValidationProvider
                                    name="생년월일"
                                    rules="required"
                                    v-slot="{ errors }">
                                    <v-text-field
                                        v-model="birthdate"
                                        label="생년월일"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        :error-messages="errors">
                                    </v-text-field>
                                </ValidationProvider>

                            </template>
                                <v-date-picker
                                v-model="birthdate"
                                @input="menu=false">
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
                            <v-checkbox
                                v-model="agreebox"
                                :rules="[v=> !!v || '']"
                                label="서비스 이용 약관 및 개인정보 이용 및 수집 방침에 동의합니다."
                                required>
                            </v-checkbox>
                            <v-btn :disabled="invalid || !validate" type="submit" :loading="loading"
                            >회원가입</v-btn>
                            <a class="auth-font" href="/Login">이미 유저입니다</a>
                            </div>
                       </form>
                       </ValidationObserver>
                    </v-card-text>
                </v-card>
            </v-col>
    </v-container>
</v-app>
</template>

<script>
import axios from 'axios';
import Validate from '../mixin/Validate.vue';
// import UploadPhotoModal from '@/components/Modal/UploadPhotoModal.vue'
// import PictureInput from 'vue-picture-input'

export default {
	name: 'signUp',
    mixins: [Validate],
    data () {
        return {
            name: '',
            email: '',
            id: '',
            password: '',
            passwordChk: '',
            birthdate: '',
            gender: '',
            photoUrl: 'no-photo',
            profileMessage: '',
            genderSel: ['여', '남'],
            loading: false,
			picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0,10),
			menu: false,
			rPath: '/Post',
            valid: true,
            agreebox: false,

            selectedFile: null,
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
    async signUp() {
            if (this.loading) return;
            this.loading = true;

            const axiosBody = {
                name: this.name,
                email: this.email,
                id: this.id,
                password: this.password,
                birthdate: this.birthdate,
                gender: this.gender,
                photoUrl: this.photoUrl,
                profileMessage: this.profileMessage,
            };
            

			console.log('auth/signUp - axiosBody: ', axiosBody);

			await axios
				.post(process.env.VUE_APP_API + '/auth/signUp', axiosBody)
					// console.log('this is postS');
				.then(async (response) => {
					console.log('auth/signUp - response: ', response);	
				})
				.catch((error) => {
					console.log('auth/signUp - error: ', error);
				})
				.finally(() => {
					this.loading = false;
					console.log('here?')
                    this.$router.push({ name: 'Login'});
				})
        },

    async checkId() {
        const axiosBody = {
            id: this.id,
        }
        console.log(axiosBody);

        await axios
            .post(process.env.VUE_APP_API + '/auth/userIdChk/', axiosBody)
            .then(async (response) => {
                console.log('checkId - response', response);
            })
            .catch((error) => {
                console.log('checkId - error:', error);
                // 에러문구 표시
                this.$refs.signUpForm.setErrors({
                    아이디: ['이미 존재하는 아이디 입니다.'],
                });
            })
        },

    async checkEmail() {
        const axiosBody = {
            email: this.email,
        }
        console.log(axiosBody);

        await axios
            .post(process.env.VUE_APP_API + '/auth/emailChk', axiosBody)
            .then(async (response) => {
                console.log('checkEmail - response', response);
            })
            .catch((error) => {
                console.log('checkEmail - error:', error);

                // 에러문구 표시
                this.$refs.signUpForm.setErrors({
                    이메일: ['이미 가입된 이메일 입니다.'],
                });
            })
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