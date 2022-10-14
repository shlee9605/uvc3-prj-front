<template>
    <div class="main">
        <div class="profileStatusOutline">
            <!-- <div class="title">내 프로필</div> -->
            <div class="profileStatus">
                <div class="profileImgDiv">
					<v-avatar size="200" class="profileImg">
					<img src="../assets/subakjjang.png">
					</v-avatar>
						<v-btn style="margin-top:10px"> 프로필 사진 편집 </v-btn>
				</div>
                <div class="profileInfoDiv">
					<div class="profileInfoDiv2">
						<input class="userIdForm" type="text" name="userId" v-model="userId" placeholder="Your Id" disabled>
							<v-spacer></v-spacer>
						<v-btn v-if="this.editMode" @click="editProfile"> 프로필 편집 </v-btn>
						<v-btn v-else @click="editProfileMessageComplete"> 편집 완료 </v-btn>
					</div>
					<div class="profileInfoDiv3">
						<input class="profileMessageForm" type="text" name="profileMessage" v-model="profileMessage" :disabled="this.editMode">
						<v-space></v-space>
				
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
				<div class="menuListDiv2">	 </div>
				<div class="menuListDiv3">
					<v-btn class="friendBtn" @click="loadFriendList">친구</v-btn>
				</div>
				<div class="menuListDiv4">
					<v-btn class="postBtn">게시물</v-btn>
				</div>
			</div>
            <div v-if="showFriendListStatus === true" class="menuDetail">
				<div class="friendInfoFor" v-for="(item, index) in friendInfoList" :key="index">
					<div class="friendInfoMother">
						<div class="friendInfo">
							<v-avatar v-if="item.photoUrl !== 'no-image'" size="70" style="margin-left:40px; margin-right:20px;">
							<img
							:src="require(item.photoUrl)"
							:alt="item.userId">
							</v-avatar>
							<span v-else><v-icon>mdi-account-circle</v-icon></span>
							<span> {{ item.userId }}</span>
							<v-btn style="margin-left:50px" @click="deleteFriend(item.id)"> 친구 삭제 </v-btn>
						</div>
						<v-spacer></v-spacer>	
					</div>
				</div>
			</div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
// import axios from 'axios';
import { mapActions, mapState} from 'vuex';
export default {
    data() {
			return{
				userId:"",
				profileMessage: "",
				gender:"",
				birthdate:"",
				friendInfoList:[],
				photoUrl: "",

				showFriendListStatus: false,
				editMode : true,

			}
		},
		created() {
			this.fetchMyProfile()
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
			fetchMyProfile(){
				console.log("fetchMyProfile - this.token :", this.token)
				this.GET_PROFILE(this.token)
				.then(()=>{
					console.log("fetchMyProfile - resposne :  success" , this.user.data);
					this.userId = this.user.data.userId;
					this.profileMessage = this.user.data.profileMessage;
					if(this.user.data.gender === "M"){
						this.gender = "Male"
					}else if(this.user.data.gender === "F"){
						this.gender = "Female"
					}else{
						this.gender = " 넌 성별이 뭐니?"
					}
					this.birthdate = (this.user.data.birthdate).split('T')[0];
				})
				.catch((error)=>{
					console.log("fetchMyProfile - error : ", error);
				})
			},

			async loadFriendList(){
				await axios
				.get('http://localhost:8080/friend/list', {
					headers: {
						Authorization : `${localStorage.getItem('token')}`
					}
				})
				.then((response)=>{
					if(this.showFriendListStatus === true){
						this.showFriendListStatus = false;
						console.log(this.showFriendListStatus)
					}else{
					console.log(response);
					this.friendInfoList = response.data.friendInfoList;
					console.log("loadFriendList - response : " , this.friendInfoList)
					this.showFriendListStatus = true;
					console.log(this.showFriendListStatus)
					}	
				})
				.catch((error)=>{
					console.log(error);
				})

			},
			
			async deleteFriend(id){
				await axios
				.delete(`http://localhost:8080/friend/${id}`,{
					headers:{
						Authorization: `${localStorage.getItem('token')}`
					}
				})
				.then((response)=>{
					console.log("deleteFriend - response ", response)
					this.loadFriendList()
				})
				.catch((error)=>{
					console.log("deleteFriend - error ", error);
				})
			},
			
			async editProfile(){

				console.log(this.editMode);
				this.editMode = false;
				console.log(this.editMode);
			},

			async editProfileMessageComplete(){
				this.editMode = true;
			}



			
			// 뷰튜브식 내 프로필 데이터 불러오기
			// async getMyProfile(){
			// 	await axios
			// 	.get('http://localhost:8080/profile/my',{
			// 			headers:{
			// 				Authorization: `${localStorage.getItem('token')}`,
			// 			},
			// 		}
			// 	)
			// 	.then((response)=>{
			// 		console.log(response.data.data);
			// 		this.userId = response.data.data.userId;
			// 		this.profileMessage = response.data.data.profileMessage;
			// 		console.log(this.userId, this.profileMessage)
			// 	})
			// 	.catch((error)=>{
			// 		console.log(error)
			// 	})
			// },
			
			
			// 마운트 테스트
			// async mountChk(){
			// 	console.log("마운트!")
			// },

		},
		mounted(){
			// this.getMyProfile();
			// this.mountChk();
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
				box-shadow: 1px 1px 1px 1px;
        height: auto;
        margin-top: 40px;
        /* justify-content: center; */
        width: 1080px;
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