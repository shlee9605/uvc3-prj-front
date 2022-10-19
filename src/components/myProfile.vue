<template>
<v-app>
    <div class="main">
        <div class="profileStatusOutline">
            <!-- <div class="title">내 프로필</div> -->
            <div class="profileStatus">
                <div class="profileImgDiv">
					<v-avatar size="200" class="profileImg">
						<img v-if="this.photoUrl !== 'no-image'" :src="`${url}/uploads${this.photoUrl}`"/>	
						<p v-else>x</p>
					</v-avatar>
						<v-btn @click="openPhotoEditModal" style="margin-top:20px;">
							프로필 사진 편집
						</v-btn>	
				</div>
                <div class="profileInfoDiv">

					<div class="profileInfoDiv2">
						<input class="userIdForm" type="text" name="id" v-model="id" placeholder="Your Id" disabled>
							<v-spacer></v-spacer>
						<v-btn v-if="this.editMode" @click="editProfile"> 프로필 편집 </v-btn>
						<v-btn v-else @click="editProfileMessageComplete"> 편집 완료 </v-btn>
						<v-btn v-if="!this.editMode" @click="cancelEdit"> 취소 </v-btn>

					</div>
					<div class="profileInfoDiv3">
						<input class="profileMessageForm" type="text" name="profileMessage" v-model="profileMessage" :disabled="this.editMode" :outline-style="this.outlineStyle">
						<v-spacer></v-spacer>
				
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
					<v-btn class="friendBtn" @click="loadFriendList">친구({{this.friendInfoList.length}})</v-btn>
				</div>
				<div class="menuListDiv4">
					<v-btn class="postBtn" @click="loadMyPostList">게시물({{this.myPostList.length}})</v-btn>
				</div>
			</div>
            <div v-if="showFriendListStatus === true" class="menuDetail">
				<div class="friendInfoFor" v-for="(item, index) in friendInfoList" :key="index">
					<div class="friendInfoMother">
						<div class="friendInfo">	
							<router-link :to="'profile/'+ item.id">		
							<v-avatar v-if="item.photoUrl !== 'no-image'" size="70" style="margin-left:40px; margin-right:20px;">
							<img
							:src="`${url}/uploads/${item.photoUrl}`">
							</v-avatar>
							<span v-else>
							<v-avatar>
							<img src="../assets/human.jpg">
							</v-avatar>
							</span>
							</router-link>
							<span> {{ item.id }}</span>
							<v-btn style="margin-left:50px" @click="deleteFriend(item.id)"> 친구 삭제 </v-btn>
						</div>
						<v-spacer></v-spacer>	
					</div>
				</div>
			</div>
            <div v-if="showMyPostListStatus === true" class="menuDetail2">
				<div style="margin-top:50px;">
                <table class="contents-table">
                    <tbody class="contents-table-tbody">
                            <router-link 
                            class="contents-table-a"
                            v-for="item in myPostList"
                            :to="`/posts/${item.id}`"
                            :key="item.Id">
                                <div class="table-a-time">
                                    <p style="margin-righ:20px;">
                                        {{item.time.slice(0,5)}}
                                    </p>
                                </div>
                                <div class="table-a-title">
                                    <div>
                                        <td>{{item.title}}</td>
                                    </div>
                                    <div class="postList-user" 
                                        style="font-size: 5px; color: #7b7b7b;">
                                        <td>{{item.id}}</td>
                                    </div>
                                </div>
                                <v-spacer></v-spacer> 
                                <div class="content-detail">
                                    <td style="text-align: right;">{{item.region}}</td>
                                    <td>{{item.cost}}원</td>
                                </div>
                            </router-link>
                    </tbody>
                </table>
            </div>
			</div>
        </div>
		<UploadPhotoModal :openDialog="photoEditModalStatus"
		v-on:closeDialog="closeDialogEditPhoto">	
		</UploadPhotoModal>
    </div>
</v-app>	
</template>
<script>
import axios from 'axios';
import { mapActions, mapState} from 'vuex';
import UploadPhotoModal from '@/components/Modal/UploadPhotoModal.vue'
export default {
    data() {
			return{
				id:"",
				profileMessage: "",
				gender:"",
				birthdate:"",
				friendInfoList:[],
				myPostList:[],
				photoUrl: "",
				selectedPhotoUrl: "",
				oldprofileMessage: "",
				oldPhotoUrl: "",

				showFriendListStatus: false,
				showMyPostListStatus: false,
				editPhotoStatus: false,
				photoEditModalStatus: false,
				editMode: true,
				outlineStyle: "none",

			}
		},

		components:{
			UploadPhotoModal,
		},
		
		created() {
			// this.fetchMyProfile()
		},

		computed: {
			...mapState({
				user: 'headers',
				token: 'token'
			}),

			url (){
				return process.env.VUE_APP_API;
			}


		},
		methods:{
			...mapActions([
				'GET_PROFILE'
			]),

			async loadFriendList(){
				await axios
				.get(process.env.VUE_APP_API + '/friend/list', {
					headers: {
						Authorization : `${localStorage.getItem('token')}`
					}
				})
				.then((response)=>{
					if(this.showMyPostListStatus){
						this.showMyPostListStatus = false;
					}
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
					console.log("loadFriendList - error ", error);
				})

			},
			
			async deleteFriend(id){
				await axios
				.delete(process.env.VUE_APP_API + `/${id}`,{
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
				const axiosBody = {
					profileMessage: this.profileMessage,
				};
				await axios
				.patch(process.env.VUE_APP_API + '/profile/my', axiosBody,{
					headers:{
						Authorization: `${localStorage.getItem('token')}`
					}
				})
				.then((response)=>{
					console.log(response);
					this.editMode = true;
					this.getMyProfile();
				})
				.catch((error)=>{
					console.log(error);
				})
			},

			async cancelEdit(){
				this.editMode = true;
				this.profileMessage = this.oldprofileMessage
			},


			async getMyProfile(){
				await axios
				.post(process.env.VUE_APP_API + '/profile/my',{
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
					this.id = response.data.data.id;
					this.profileMessage = response.data.data.profileMessage;
					this.oldprofileMessage = response.data.data.profileMessage;
					console.log(this.id, this.profileMessage)
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
			
			async openPhotoEditModal(){
				this.photoEditModalStatus = true;
				console.log(this.photoEditModalStatus);
			},
			
			async closeDialogEditPhoto(){
				this.photoEditModalStatus = false;
				console.log(this.photoEditModalStatus);
			},
			
			async loadMyPostList(){
				await axios
				.get(process.env.VUE_APP_API + '/post/my',{
					headers:{
						Authorization: `${localStorage.getItem('token')}`
					}
				})
				.then((response)=>{
					if(this.showFriendListStatus){
						this.showFriendListStatus = false;
					}
					if(this.showMyPostListStatus){
						this.showMyPostListStatus = false;
					}else{
						console.log("loadMyPostList - response ", response.data.myPostList);
						this.myPostList = response.data.myPostList
						this.showMyPostListStatus = true;
					}

				})
				.catch((error)=>{
					console.log("loadMyPostList - error", error);
				})

			}

		},

		beforeMount(){
			this.getMyProfile();
		},


		mounted(){
			this.getMyProfile();
		},

}
</script>
<style >
    .main {
		/* border: 1px solid black; */
        align-items: center;
        display: flex;
        justify-content: center;
		padding-top: 80px;
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
			height: 110px !important;
			width: 360px;
		}
		.postBtn{
			height: 110px !important;
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