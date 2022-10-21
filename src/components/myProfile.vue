<template>
<v-app>
	<v-container fluid class="fill-height background container-profilebox">
		<v-card elevation="5" outlined class="pa-10 mt-10 justify-center card-bottom">
		<v-card-title style="font-size: 4rem"> 이게 나야!!</v-card-title>
		<v-divider class="mt-4"></v-divider>
        <div class="profileStatusOutline">
            <!-- <div class="title">내 프로필</div> -->
            <div class="profileStatus">
                <div class="profileImgDiv">
					<v-avatar size="200" class="profileImg">
						<img v-if="this.photoUrl !== 'no-photo'" :src="`${url}/uploads${this.photoUrl}`"/>	
						<img v-else src="../assets/human.jpg"/>
					</v-avatar>
						<v-btn @click="openPhotoEditModal" style="margin-top:20px;">
							프로필 사진 편집
						</v-btn>	
				</div>
                <div class="profileInfoDiv">

					<div class="profileInfoDiv2">
						<input class="userIdForm" type="text" name="id" v-model="id" placeholder="Your Id" readonly>
							<v-spacer></v-spacer>
						<v-btn v-if="this.editMode" @click="editProfile"> 프로필 편집 </v-btn>
						<v-btn v-else @click="editProfileMessageComplete"> 편집 완료 </v-btn>
						<v-btn v-if="!this.editMode" @click="cancelEdit"> 취소 </v-btn>

					</div>
					<div class="profileInfoDiv3">
						<textarea v-if="this.editMode" class="profileTextArea" cols="50" rows="3" v-model="profileMessage" readonly></textarea>
						<v-textarea filled v-else class="profileTextArea2" cols="50" rows="3" v-model="profileMessage" counter="150"></v-textarea>
						<!-- <input class="profileMessageForm" type="text" name="profileMessage" v-model="profileMessage" :disabled="this.editMode" :outline-style="this.outlineStyle"> -->
					</div>
					<div class="profileInfoDiv4">
						<span style="font-size:20px; ">생년월일</span>
							<input class="ageForm" type="text" name="Age" v-model="birthdate" placeholder="Age"  readonly>
						<span style="font-size:20px;">성별</span>
							<input class="genderForm" type="text" name="Gender" v-model="gender" placeholder="Gender" readonly>
					</div>
				</div>
            </div>
				<!-- <hr style="margin-bottom:20px"> -->
            <div class="menuList">
				<div class="menuListDiv2">
					<button v-if="showMyAttendListStatus === false" class="attendBtn" @click="loadMyAttendList"><span style="color: grey;">신청 목록({{this.myHistoryList.length}})</span></button>
					<button v-else class="attendBtn2" @click="loadMyAttendList">신청 목록({{this.myHistoryList.length}})</button>
				</div>
				<div class="menuListDiv3">
					<button v-if="showFriendListStatus === false" class="friendBtn" @click="loadFriendList"><span style="color: grey;">메이트({{this.friendInfoList.length}})</span></button>
					<button v-else class="friendBtn2" @click="loadFriendList">메이트({{this.friendInfoList.length}})</button>
				</div>
				<div class="menuListDiv4">
					<button v-if="showMyPostListStatus === false" class="postBtn" @click="loadMyPostList"><span style="color: grey;">게시물({{this.myPostList.length}})</span></button>
					<button v-else class="postBtn2" @click="loadMyPostList">게시물({{this.myPostList.length}})</button>
				</div>
			</div>
			<div v-if="showMyAttendListStatus === true" class="menuDetail3" style="margin-bottom: 0px; margin-top: 20px;width: 100%">
				<!-- <div style="margin-top:50px;"> -->

                <table class="contents-table">

                    <tbody class="contents-table-tbody">
                            <router-link 
                            class="contents-table-a"
                            v-for="item in myHistoryList"
                            :to="`/posts/${item.id}`"
                            :key="item.Id">
                                <div class="table-a-time">
                                    <p style="margin-right:20px;">
                                        {{item.time.slice(0,5)}}
                                    </p>
                                </div>
                                <div class="table-a-title">
                                    <div>
                                        <td>{{item.title}}</td>
                                    </div>
                                    <div class="postList-user" 
                                        style="font-size: 5px; color: #7b7b7b;">
                                        <td>{{item.UserId}}</td>
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
							<v-btn style="margin-left:50px" @click="deleteFriend(item.id)"> 메이트 삭제 </v-btn>
						</div>
						<v-spacer></v-spacer>	
					</div>
				</div>
			</div>
            <div v-if="showMyPostListStatus === true" class="menuDetail2" style="margin-bottom: 0px; margin-top: 20px;width: 100%">
				<!-- <div style="margin-top:50px;"> -->
                <table class="contents-table">
                    <tbody class="contents-table-tbody">
                            <router-link 
                            class="contents-table-a"
                            v-for="item in myPostList"
                            :to="`/posts/${item.id}`"
                            :key="item.Id">
                                <div class="table-a-time">
                                    <p style="margin-right:20px;">
                                        {{item.time.slice(0,5)}}
                                    </p>
                                </div>
                                <div class="table-a-title">
                                    <div>
                                        <td>{{item.title}}</td>
                                    </div>
                                    <div class="postList-user" 
                                        style="font-size: 5px; color: #7b7b7b;">
                                        <td>{{item.UserId}}</td>
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
			<UploadPhotoModal :openDialog="photoEditModalStatus "
			v-on:closeDialog="closeDialogEditPhoto"
			v-on:getMyProfile="getMyProfile">	
			</UploadPhotoModal>
		</v-card>
	</v-container>
</v-app>	
</template>
<script>
import axios from 'axios';
import { mapActions, mapState} from 'vuex';
import UploadPhotoModal from '@/components/Modal/UploadPhotoModal.vue'
export default {
	name: 'myProfile',
    data() {
			return{
				id:"",
				profileMessage: "",
				gender:"",
				birthdate:"",
				friendInfoList:[],
				myPostList:[],
				myHistoryList:[],
				photoUrl: "",
				selectedPhotoUrl: "",
				oldprofileMessage: "",
				oldPhotoUrl: "",

				showFriendListStatus: false,
				showMyPostListStatus: false,
				showMyAttendListStatus: false,

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
			},


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
					if(this.showMyPostListStatus||this.showMyAttendListStatus){
						this.showMyPostListStatus = false;
						this.showMyAttendListStatus = false;
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
				this.outlineStyle = "solid";
				console.log(this.editMode);
				console.log(this.outlineStyle);
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
					this.outlineStyle = "none";
					this.getMyProfile();
					console.log(this.outlineStyle)
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
					if(response.data.data.photoUrl === "" || response.data.data.photoUrl === "no-photo.jpg"){
						this.photoUrl = "../assets/human.jpg";
					}else{
						this.photoUrl = response.data.data.photoUrl
					}
					this.id = response.data.data.id;
					this.profileMessage = response.data.data.profileMessage;
					this.oldprofileMessage = response.data.data.profileMessage;
					console.log(this.id, this.profileMessage)
					if(response.data.data.gender === "남"){
						this.gender = "Male"
					}else if(response.data.data.gender === "여"){
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
					if(this.showFriendListStatus||this.showMyAttendListStatus){
						this.showFriendListStatus = false;
						this.showMyAttendListStatus=false;
					}
					if(this.showMyPostListStatus){
						this.showMyPostListStatus = false;
					}else{
						console.log("loadMyPostList - response ", response.data.myPostList);
						console.log(response.data.myPostList);
						this.myPostList = response.data.myPostList
						this.showMyPostListStatus = true;
					}

				})
				.catch((error)=>{
					console.log("loadMyPostList - error", error);
				})

			},

			async loadMyAttendList(){
				await axios
				.get(process.env.VUE_APP_API + '/profile/myattend',{
					headers:{
						Authorization: `${localStorage.getItem('token')}`
					}
				})
				.then((response)=>{
					if(this.showFriendListStatus||this.showMyPostListStatus){
						this.showFriendListStatus = false;
						this.showMyPostListStatus=false;
					}
					if(this.showMyAttendListStatus){
						this.showMyAttendListStatus = false;
					}else{
						console.log("loadMyAttendList - response ", response);
						this.myHistoryList = response.data.myHistoryList_2;
						console.log(this.myHistoryList);
						this.showMyAttendListStatus = true;
					}

				})
				.catch((error)=>{
					console.log("loadMyAttendList - error", error);
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
<style scoped >
.main {
/* border: 1px solid black; */
height: auto;
align-items: center;
display: flex;
justify-content: center;
padding-top: 80px;
}


.profileStatusOutline {
/* align-items: center; */
/* border: 1px solid black; */
border-radius: 6px;
/* box-shadow: 1px 1px 1px 1px; */
height: auto;
margin-top: 40px;
/* outline-style: solid 1px; */
/* justify-content: center; */
width: 1080px;
/* -webkit-box-shadow: 9px 10px 15px 6px #000000;  */
/* box-shadow: 0px 1px 14px 0px rgba(0,0,0,0.12); */
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
height: 360px;
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
	height: auto;
		/* padding: 0 0 0 90px; */
}
.menuDetail2{
box-sizing: border-box;
/* background-color: red; */
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
	width: 900px;
	height: auto;
		/* padding: 0 0 0 90px; */
}
.menuDetail3{
box-sizing: border-box;
/* background-color: red; */
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
	width: 900px;
	height: auto;
		/* padding: 0 0 0 90px; */
}
.profileImgDiv{
	align-items: center;
	box-sizing: border-box;
	/* background-color: red; */
	display: flex;
	flex-direction: column;
	/* justify-content: center; */
	padding: 40px 30px;
	width: 360px;
}
.profileInfoDiv{
	box-sizing: border-box;
	/* background-color: blue; */
	padding: 40px 30px 20px 30px;
	width:720px;
}


.profileInfoDiv2{
	align-content: center;
	box-sizing: border-box;
/* background-color: grey; */
	display:flex;
	height: 50px;
}

.profileInfoDiv3{
	padding-top: 20px;
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
	/* border: 1px solid #000000; */
	border-radius: 5.5px;
	height: 74px !important;
	width: 360px;
}
.friendBtn2 {
	border-top: 1px solid;
	/* border: 1px solid #000000; */
	/* background: linear-gradient(45deg, lightCyan, skyBlue, deepSkyBlue); */
	/* background-color:#E100FF; */
	/* border-radius: 5.5px; */
	font-size: 20px;
	height: 74px !important;
	width: 360px;
}
.postBtn{
	/* border: 1px solid #000000; */
	border-radius: 5.5px;
	height: 74px !important;
	width: 360px;
}
.postBtn2{
	border-top: 1px solid;
	/* border: 1px solid #000000; */
	/* background: linear-gradient(45deg, lightCyan, skyBlue, deepSkyBlue); */
	/* background-color:#E100FF; */
	/* border-radius: 5.5px; */
	font-size: 20px;
	height: 74px !important;
	width: 360px;
}
.attendBtn{
	/* border: 1px solid #000000; */
	border-radius: 5.5px;
	height: 74px !important;
	width: 360px;
}

.attendBtn2{
	border-top: 1px solid;
	/* border: 1px solid #000000; */
	/* background: linear-gradient(45deg ,lightCyan, skyBlue, deepSkyBlue); */
	/* background-color:#E100FF; */
	/* border-radius: 5.5px; */
	font-size: 20px;
	height: 74px !important;
	width: 360px;
}

.userIdForm{
	font-size: 40px;
}
.profileMessageForm{
	font-size: 20px;
	height: 120px;
	width: 400px;
}

.profileTextArea{
	font-size:16px;
}

.profileTextArea2{
	font-size:16px;
}

.genderForm{
	padding-left: 20px;
	font-size: 20px;
}
.ageForm{
	padding-left: 20px;
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

.background {
	height:100vh;
}

.container-profilebox {
  display: flex;
  justify-content: center;
  background-color: #FFFFFF
  /* background-color: #F7D2A7; */
  /* background-color: #fafafa; */
  /* background: url("~@/assets/tmbackground_light.png") fixed; */
}
.contents-table {
    padding: 0 0 0 0;
    margin: auto;
    width: 90%;

    font-size: .9em;
}

.contents-table-tbody {
    display: grid;
}


.contents-table-a{
    display: flex;
    height: 65px;
    border-bottom: 1px #7b7b7b solid;
    text-decoration: none;
    
}
.postList-user {
    margin:0;
}

/* 테이블 time */
.table-a-time {
    padding: 0 0 0 0;
    margin: 22px 0 10px 45px;
    color: black;
}
/* 테이블 title */
.table-a-title {
    display: grid;
    color: black;
    margin: 20px 0 0 50px;
    padding: auto;
}

.content-detail{
    display: grid;
    font-size: 5px;
    color: #7b7b7b;
    margin: 0 15px 0 0;
    align-content: center;
}

/* 테이블 버튼 */
.table-a-btn{
    margin: 18px 0 0 0;
}

.apply-btn {
    text-align: center;
    padding-top: .4em;
    color: white;
    background-color: rgb(67, 91, 211);
    height: 30px;
    width: 100px;
    border-radius: 15px;
}

.apply-btn-before-end{
    text-align: center;
    padding-top: .4em;
    color: white;
    background-color: orangered;
    height: 30px;
    width: 100px;
    border-radius: 15px;
}

.apply-btn-end{
    text-align: center;
    padding-top: .4em;
    color: rgb(39, 38, 38);
    background-color: rgb(156, 155, 155);
    height: 30px;
    width: 100px;
    border-radius: 15px;
}

.background {
    background-color: #FFF7EE;
}
.theme--light.v-sheet {
    background-color: #FFF7EE;
}
.theme--light.v-sheet.v-slide-group.v-slide-item:hover {
    color: rgba(229, 134, 26, 0.927);
}
.v-btn__content:hover {
    color: rgba(229, 134, 26, 0.927);
    text-decoration: none;
}
</style>