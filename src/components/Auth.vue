<template>
<v-app>
    <v-container fluid class="fill-height teal">
            <v-col cols="12" xs="12" sm="8" md="8" lg="7" class="ma-auto">
                <v-card outlined class="pa-10 mt-10">
                    <v-card-title class="justify-center" style="font-size: 2rem">회원가입</v-card-title>
                    <v-spacer></v-spacer>
                    <v-card-text>
                        <form @submit.prevent="signUp">
							<!-- <div class="profileImgDiv"> -->
                                <!-- <v-avatar size="200">
                                    <img :src="`/src/assets/human.jpg`" />	
                                </v-avatar>
                                <v-btn @click="handleFileImport" style="margin-top:20px;">
                                프로필 사진 등록
                                 </v-btn> -->
                                 <!-- <input id="editPhoto" ref="uploader" class="d-none" type="file" accept=".png, .jpg, .jpeg" @change="onFileChanged"> -->
                            <!-- <div>
								<picture-input type="file"
									ref="pictureInput"
									width="150" height="160" margin="5" accept="image/*" size="10" button-class="btn"
									:custom-strings="{
										upload: '<h1>Upload Here!</h1>',
										drag: '프로필 사진 등록'
									}"
									@change="onChange">
								</picture-input>
							</div> -->
                            <div class="dropbox">
                                <input class="input-file" type="file" name="myfile" @change="upload($event.target.name, $event.target.files)"
                                @drop="upload($event.target.name, $event.target.files)">
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
                                v-model="id">
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
                            <v-checkbox
                                v-model="agreebox"
                                :rules="[v=> !!v || '']"
                                label="서비스 이용 약관 및 개인정보 이용 및 수집 방침에 동의합니다."
                                required>
                            </v-checkbox>
                            <v-btn :disabled="!valid" type="submit" :loading="loading"
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
// import UploadPhotoModal from '@/components/Modal/UploadPhotoModal.vue'
// import PictureInput from 'vue-picture-input'

export default {
	name: 'signUp',
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
    components: {
        // UploadPhotoModal
        // PictureInput,
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

            const dataForm = new FormData();
            dataForm.append('name', this.name);
            dataForm.append('email', this.email);
            dataForm.append('id', this.id);
            dataForm.append('password', this.password);
            dataForm.append('birthdate', this.birthdate);
            dataForm.append('gender', this.gender);
            dataForm.append('photoUrl', this.photoUrl);
            dataForm.append('profileMessage', this.profileMessage);
            

			console.log('auth/signUp - dataForm: ', dataForm);
            for(let item of dataForm.entries()) {
                console.log(item);
            }

			await axios
				.post(process.env.VUE_APP_API + '/auth/signUp', dataForm)
					// console.log('this is postS');
				.then(async (response) => {
					console.log('auth/signUp - response: ', response);
                    
                    // 폼 데이터 설정
                    this.dataForm.name = response.data.data.name;
                    this.dataForm.email = response.data.data.email;
                    this.dataForm.id = response.data.data.id;
                    this.dataForm.password = response.data.data.password;
                    this.dataForm.birthdate = response.data.data.birthdate;
                    this.dataForm.gender = response.data.data.gender;
                    this.dataForm.photoUrl = response.data.data.photoUrl;
                    this.dataForm.profileMessage = response.data.data.profileMessage;

                    // 로그인 페이지로 리라우팅
					
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
        upload(name, files) {
            const formData = new FormData();
            formData.append(name, files[0], files[0].name);
            const url = 'VUE_APP_API/upload/'
        },

		onChange (image) {        
            if(image) {
                console.log('picture loaded')
                this.photoUrl = image
            } else {
                console.log('FileReader API not supported.')
            }
        },


        async handleFileImport() {
            this.isSelecting = true;

            // After obtaining the focus when closing the FilePicker, return the button state to normal
            window.addEventListener('focus', () => {
            this.isSelecting = false
            }, { once: true });
                
            // Trigger click on the FileInput
            this.$refs.uploader.click();
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

.profileImgDiv{
				align-items: center;
				box-sizing: border-box;
        /* background-color: red; */
				display: flex;
				flex-direction: column;
				justify-content: center;
        padding: 60px 30px;
        width: 360px;
    }

    .dropbox {
    outline: 2px dashed #aaa;
    background: #7fb4dd;
    width: 300px;
    height: 300px;
    position: relative; 
     margin: 0 auto;
  } 
  .dropbox > h2{
    position: absolute;
    top: 50px;
    left: 0;
    z-index: 2;
  }
  .input-file{
    position: absolute;
    opacity: 0;
    width:100%;
    height:100%;
    top:0;
    left:0;
     z-index: 3;
  }
</style>