<template>
<v-app>
    <div class="main">
        <div class="profileStatusOutline">
            <!-- <div class="title">내 프로필</div> -->
            <div class="profileStatus">
                <div class="profileImgDiv">
					<v-avatar size="200" class="profileImg">
					</v-avatar>
				</div>

                <!-- Id -->
                <div class="profileInfoDiv">
					<div class="profileInfoDiv2">
						<input class="userIdForm" type="text" name="userId" v-model="userId" placeholder="Your Id" disabled>
                        <v-btn v-if="this.relationship === '1'" @click="sendRequest" > 친구 요청 </v-btn>
                        <div v-else-if="this.relationship === '2'" >
                        <v-btn @click="acceptRequest"> 수락 </v-btn>
                        <v-btn @click="rejectRequest"> 거절 </v-btn>
                        </div>
                        <v-btn v-else-if="this.relationship === '3'"> 요청 중 </v-btn>
                        <v-btn v-else> 친구입니다 </v-btn>
							<v-spacer></v-spacer>
					</div>
                    <!-- 상태 메세지 -->
					<div class="profileInfoDiv3">
						<input class="profileMessageForm" type="text" name="profileMessage" v-model="profileMessage" disabled>
						<v-spacer></v-spacer>
                    <!-- 생년월일 성별 -->
					</div>
					<div class="profileInfoDiv4">
						<span style="font-size:20px; ">생년월일</span>
							<input class="ageForm" type="text" name="Age" v-model="birthdate" placeholder="Age" disabled>
						<span style="font-size:20px;">성별</span>
							<input class="genderForm" type="text" name="Gender" v-model="gender" placeholder="Gender" disabled>
					</div>
				</div>
            </div>
				<hr style="margin-bottom:20px">
            <div class="menuList">
				<div class="menuListDiv2">
                </div>
				<div class="menuListDiv3">
				</div>
				<div class="menuListDiv4">
				</div>
			</div>
        </div>
    </div>
</v-app>	
</template>
<script>
import axios from 'axios';
import { mapActions, mapState} from 'vuex';
export default {
    data() {
			return{
				userId:"",
				profileMessage: "",
				gender:"",
				birthdate:"",

				photoUrl: "",

                relationship:"",

			}
		},

		
		created() {
			// this.fetchMyProfile()
		},

		computed: {
			...mapState({
				user: 'headers',
				token: 'token'
			}),
			// 여기 부터 
			profileAvatar() {
			const setprofileAvatar = "A"
			console.log('setprofileAvatar : ', setprofileAvatar);
			return setprofileAvatar;
			},

		},
		methods:{
			...mapActions([
				'GET_PROFILE'
			]),
			
			
	
            async getRelationship(){
                await axios
                .get(`http://localhost:8080/friend/${this.$route.params.id}/pending`,{
                    headers:{
                        Authorization: `${localStorage.getItem('token')}`
                    }
                })
                .then((response)=>{
                    console.log("getRelationship - response", response.data.message);
                    if(response.data.message === "내가 요청 아직 상대방 수락x"){
                        this.relationship = "3";
                    }else if(response.data.message === "상대방 요청 내가 아직 수락x"){
                        this.relationship = "2";
                    }else if(response.data.message === "아무 관계 아님"){
                        this.relationship = "1";
                    }else{
                        this.realtionship = "4";
                    }
                  
                })
                .catch((error)=>{
                    console.log("getRelationship - error", error);
                })

            },
		


			async getProfile(){
				await axios
				.get(`http://localhost:8080/profile/${this.$route.params.id}`,{
						headers:{
							Authorization: `${localStorage.getItem('token')}`,
						},
					}
				)
				.then((response)=>{
					console.log(response.data.data);
					if(response.data.data.photoUrl === "" || response.data.data.photoUrl === "no-photo"){
						this.photoUrl = "../assets/human.jpg";
					}else{
						this.photoUrl = response.data.data.photoUrl
					}
					this.userId = response.data.data.id;
					this.profileMessage = response.data.data.profileMessage;
					this.oldprofileMessage = response.data.data.profileMessage;
					console.log(this.userId, this.profileMessage)
					if(response.data.data.gender === "M"){
						this.gender = "Male"
					}else if(response.data.data.gender === "F"){
						this.gender = "Female"
					}else{
						this.gender = " 넌 성별이 뭐니?"
					}
					this.birthdate = (response.data.data.birthdate).split('T')[0];
				})
				.catch((error)=>{
					console.log(error)
				})
			},
			
            async acceptRequest(){
                await axios
                .patch(`http://localhost:8080/friend/${this.$route.params.id}`,{
                    headers:{
                        Authorization: `${localStorage.getItem('token')}`
                    }
                })
                .then((response)=>{
                    console.log("acceptRequest - response", response)
                    this.getRelationship()
                })
                .catch((error)=>{
                    console.log("acceptRequest - error", error);
                })
            },

            async rejectRequest(){
                await axios
                .delete(`http://localhost:8080/friend/${this.$route.params.id}`,{
                    headers:{
                        Authorization: `${localStorage.getItem('token')}`
                    }
                })
                .then((response)=>{
                    console.log("rejectRequest - response", response);
                    this.getRelationship()
                })
                .catch((error)=>{
                    console.log("rejecetRequest - error", error);
                })
            },

            async sendRequest(){
                await axios
                .post(`http://localhost:8080/friend/${this.$route.params.id}`, {
                    headers: {
                        Authorization: `${localStorage.getItem('token')}`
                    }
                })
                .then((response)=>{
                    console.log("sendRequest - response ", response);
                    this.getRelationship()
                })
                .catch((error)=>{
                    console.log("sendRequest - error ", error);
                })
            },


		},
		mounted(){
			this.getProfile();
            this.getRelationship();
		},

}
</script>
<style >
    .main {
		/* border: 1px solid black; */
        align-items: center;
        display: flex;
        justify-content: center;
    }


    .profileStatusOutline {
        /* align-items: center; */
        border: 1px black;
		border-radius: 15px;
		/* box-shadow: 1px 1px 1px 1px; */
        height: auto;
        margin-top: 40px;
        /* justify-content: center; */
        width: 1080px;
		-webkit-box-shadow: 9px 10px 15px 6px #000000; 
		box-shadow: 9px 10px 15px 6px #000000;
    }

    .title {
        box-sizing: border-box;
        /* background-color: yellow; */
        height: 80px;
        padding: 30px 0px;
        text-align: center;
        
    }
    .profileStatus {
        display:flex;
        box-sizing: border-box;
        /* background-color: green; */
        height: 420px;
    }

    .menuList {
        box-sizing: border-box;
        /* background-color: black; */
				display:flex;	
        height: 140px;
    }
    .menuDetail{
        box-sizing: border-box;
        /* background-color: red; */
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				justify-content: space-between;
				width: 900px;
        height: 300px;
				/* padding: 0 0 0 90px; */
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
    .profileInfoDiv{
        box-sizing: border-box;
        /* background-color: blue; */
        padding: 90px 30px 20px 30px;
        width:720px;
    }

		/* .profileImg{
			size: 200;
		} */

		.profileInfoDiv2{
			align-content: center;
			box-sizing: border-box;
      /* background-color: grey; */
			display:flex;
			height: 50px;
		}

		.profileInfoDiv3{
			box-sizing: border-box;
      /* background-color: purple; */
			height: 150px;
		}

		.profileInfoDiv4{
			box-sizing: border-box;
      /* background-color: orange; */
			display: flex;
			height: 50px;
		}

		.menuListDiv2{
			width: 360px;
			box-sizing: border-box;
      /* background-color: brown; */
		}

		.menuListDiv3{
			width: 360px;
			box-sizing: border-box;
      /* background-color: ivory; */
		}

		.menuListDiv4{
			width: 360px;
			box-sizing: border-box;
      /* background-color: aqua; */
		}
		.friendBtn{
			height: 140px;
			width: 360px;
		}
		.postBtn{
			height: 140px;
			width: 360px;
		}
		.userIdForm{
			font-size: 40px;
		}
		.profileMessageForm{
			margin-top: 30px;
			width: 400px;
			font-size: 20px;
		}
		.genderForm{
			font-size: 20px;
		}
		.ageForm{
			font-size: 20px;
		}

		.friendInfo{
			align-items: center;
			border: 1px solid black;
			border-radius: 8px;
			box-sizing: border-box;
			display: flex;
			font-size: 35px;
			height: 120px;
			/* justify-content: center; */
			width: 440px;
			margin-left: 45px;


		}
		.friendInfoMother{
			padding: left 90px;
		}

		.friendInfoFor{
			width: 350px;
			height: 120px;
		}

		
		span {
			display: flex;
			align-items: center;
			justify-content: center;
		}
</style>