<template>
    <div>
        <form class="SignUp-box" @submit.prevent="onSubmit">
            <div>
                <h2>Sign Up</h2>
            </div>
            <div class="input-table">
                <div>
                    <label for="name">Name:</label>
                    <input class="form-control" type="text" name="name"
                    v-model="name" placeholder="Your Name">
                </div>
                <div>
                    <label for="email">Email:</label>
                    <input class="form-control" type="text" name="email"
                    v-model="email" placeholder="Your Email">
                </div>
                <div>
                    <label for="userId">Id:</label>
                    <input class="form-control" type="text" name="userId"
                    v-model="userId" placeholder="Your Id">
                </div>
                <div>
                    <label for="password">Password:</label>
                    <input class="form-control" type="password"
                    v-model="password" placeholder="Your password">
                </div>
                <div>
                    <label for="age">Age:</label>
                    <input class="form-control" type="text"
                    v-model.number="age" placeholder="Your age">
                </div>
                <div>
                    Gender:
                    <input type="radio" id="male"
                    v-model="gender" value="Male" />
                    <label for="male">Male</label>

                    <input type="radio" id="female"
                    v-model="gender" value="Female" />
                    <label for="female">Female</label>
                </div>
                <div>
                    <label for="photoUrl">Profile Photo:</label>
                    <picture-input
                        ref="pictureInput"
                        width="150" height="150" margin="5" accept="image/*" size="10" button-class="btn"
                        :custom-strings="{
                            upload: '<h1>Upload Here!</h1>',
                            drag: 'Drag your photo'
                         }"
                        @change="onChange">
                    </picture-input>
                </div>
                <div>
                    <label for="profileMessage">Profile Message:</label>
                    <input class="form-control" type="text"
                    v-model="profileMessage" placeholder="Write your bio">
                </div>
                <div>
                    <v-btn class="SignUp-btn" type="submit">Sign Up</v-btn>
                </div>
                <div>
                    <a class="auth-font" href="/Login">이미 유저입니다</a>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import PictureInput from 'vue-picture-input'
import { mapActions } from 'vuex'

export default {
    data() {
        return {
            name: '',
            email: '',
            userId: '',
            password: '',
            age: '',
            gender: '',
            photoUrl: '',
            profileMessage: '',
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
                this.image = image
            } else {
                console.log('FileReader API not supported.')
            }
        },

        onSubmit() {
            console.log(this.name);
            console.log(this.email);
            console.log(this.userId);
            console.log(this.password);
            console.log(this.age);
            console.log(this.gender);
            console.log(this.photoUrl);
            console.log(this.profileMessage);
        }
    }
    }
</script>

<style>
.SignUp-box {
    margin-top: 50px;
    width: 500px;
    /* height: 500px; */
    position: absolute;
    padding: 30px 30px 30px 30px;
    top: 10%;
    left: 15%;
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

.SignUp-btn {
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

</style>