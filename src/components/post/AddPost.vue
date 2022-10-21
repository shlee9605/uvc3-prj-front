<template>
    <v-app inspire>
		<v-container fluid class="fill-height background justify-center xcontainer-profilebox">
        <!-- 작성 완료 버튼 -->
        <!-- title -->
		<v-card elevation="5" outlined class="pa-10 mt-10 justify-center card-bottom">
		<v-app-bar-title class="text-center titlestyle">나의 메이트를 구해줘!</v-app-bar-title>
		<ValidationObserver
                ref="signUpForm"
                v-slot="{ handleSubmit, invalid, validate }">
		<form  @submit.prevent="handleSubmit(signUp)">
					
        <main class="input-main">
			<form>		
				<div class="title">
				<ValidationProvider
                    name="제목"
                    rules="required"
                    v-slot="{ errors }">
					<v-text-field
						label="제목"
						hide-details="auto"
						v-model="title"
						:error-messages="errors"
					></v-text-field>
				</ValidationProvider>
				</div>
				<form class="category-form">
					<div class="category-form-div">
						<div class="category-list" style="width:400px">
							<div class="category-time-list">
								<v-col class="category-select-date"
									cols="2"
									sm="3"
									md="5"
									>
									<v-menu
										ref="menu"
										v-model="menu"
										:close-on-content-click="false"
										:return-value.sync="date"
										transition="scale-transition"
										offset-y
										min-width="auto"
									>
										<template v-slot:activator="{ on, attrs }">
											<v-text-field
												full-width: true
												v-model="date"
												prepend-icon="mdi-calendar"
												readonly
												style="font-size:0.7em;"
												v-bind="attrs"
												v-on="on"
											></v-text-field>
										</template>
										<v-date-picker
											v-model="date"
											no-title
											scrollable
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
												@click="$refs.menu.save(date)"
											>
												OK
											</v-btn>
										</v-date-picker>
									</v-menu>
								</v-col>
								<!-- <h5 v-if="TimeValue.HH === '' || TimeValue.mm === '' ">입력해주세요</h5> -->
								<div class="category-time">
									<vue-timepicker
										v-if="TimeValue"
										v-model="TimeValue"
										@error="errorHanlder"
										:minute-interval="10"
										:required="true"
										close-on-complete
										@change="changeHandler"> 
			
									</vue-timepicker>
									<div v-if="(TimeValue.HH=== ''||TimeValue.mm==='')&&timestatus">
										<h6 style="color:red;">
											시간 항목을 입력해주세요.
										</h6>
									</div>

								</div>
							</div>
							<div style="display: flex;">
								<div class="category-region">
									<ValidationProvider
									name="지역"
									rules="required"
									v-slot="{ errors }">
									<v-col 
										class="d-flex"
										cols="5"
										sm="8"
										style="margin-left:0px"
										>
										<v-select
											v-model="region"
											:items="items"
											label="지역 선택"
											:error-messages="errors"
										></v-select>
									</v-col>
									</ValidationProvider>
								</div>
								<div class="category-region">
									<ValidationProvider
									name="카테고리"
									rules="required"
									v-slot="{ errors }">
									<v-col 
										class="d-flex"
										cols="5"
										sm="8"
										>
										<v-select
											v-model="categoryId"
											:items="categoryList"
											label="카테고리"
											:error-messages="errors"
										></v-select>
									</v-col>
									</ValidationProvider>
								</div>
							</div>
						</div>
						<div style="display: flex;">
							<div class="div-capacipy" style="margin-left:250px">
								<div>
									<div style="display:flex;">
										<v-icon style="margin-left:5px;">mdi-human-child</v-icon>
										<h4>모집인원</h4>
									</div>
									<div class="wrapper" style="margin:5px 0 0 5px;">
										<button class="btn btn--minus" @click="changeCounter('-1')" type="button" name="button">
											-
										</button>
										<input class="quantity" type="text" name="name" :value="counter">
										<button class="btn btn--plus" @click="changeCounter('1')" type="button" name="button">
											+
										</button>
									</div>
								</div>
							</div>    
						</div>
					</div>
				</form>
				<div class="region-detail" >
					<ValidationProvider
                    name="상세주소"
                    rules="required"
                    v-slot="{ errors }">
					<v-text-field
						label="상세주소"
						v-model="address"
						:error-messages="errors"
						></v-text-field>
				</ValidationProvider>
				</div>
				<!-- 내용  -->
				<div class="description">
					<ValidationProvider
                    name="상세설명"
                    rules="required|min:5"
                    v-slot="{ errors }">
						<v-textarea
							color="black"
							label="설명"
							v-model="content"
							:error-messages="errors"
						></v-textarea>
					</ValidationProvider>
				</div>
				<div class="form-fotter">
					<!-- <v-spacer></v-spacer> -->
					<div style="margin-left:-25px">
						<v-container fluid>
							<ValidationProvider
							name="정수"
							rules="required|numeric"
							v-slot="{ errors }">
							<v-row>
								<v-col cols="">
								</v-col>
								<v-col cols="10">
								<v-text-field
									label="회비"
									value="0"
									prefix="￦"
									type="number"
									v-model.number="cost"
									:error-messages="errors"
								></v-text-field>
								</v-col>
							</v-row>
							</ValidationProvider>
						</v-container>
					</div>
					<!-- 저장버튼 -->
					<div class="checkbox" style="margin-left: 30px;">
					</div>
						<v-spacer></v-spacer>
						<div class="div-save-btn">
						<v-btn 
						:disabled="(invalid || !validate)||(TimeValue.HH=== ''||TimeValue.mm==='')" type="submit"
						:loading="loading"
						color="primary"
						rounded
						@click="onSubmit">저장</v-btn>
						</div>
				</div>
			</form>
        </main>
		</form>
		</ValidationObserver>
		</v-card>
	</v-container>
    </v-app>
</template>

<script>
import VueTimepicker from 'vue2-timepicker'
import Validate from '@/mixin/Validate.vue';
import {mapActions} from 'vuex'
    export default {
		
		mixins: [Validate],
        components: { VueTimepicker },
        data: () => ({
			
			checkbox1: false,
            //title
            title:'',
            //date값
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            
            //select Date status값
            menu: false,
            
            //region list
            items: ['강남', '홍대', '잠실'],
			categoryList:['식사','운동','스터디','쇼핑','놀이'],
            
            //region 값
            region: '',
			
            //address 값
            address: '',
			
			//비용
			cost:'',
			
			// 정원
			counter: 1,
			//카테고리
			categoryId: '',
            //timevalue
            TimeValue: {
                HH:'',
                mm:''
            },

			timesatatus : false,
            /*console.log(this.TimeValue)
            // outputs -> {HH: "14", mm: "30", ss: "15"} */
            //description
            content:''
        }),

        methods:{
			...mapActions('Post',[
				'CREATE_POST',
				"FETCH_POSTLIST"
			]),
			onSubmit() {
				//카테고리 Id 값으로 변환
				const CategoryId= this.categoryList.indexOf(this.categoryId) + 1
				const time = `${this.TimeValue.HH}:${this.TimeValue.mm}:00`
				
				// const cost = parseInt(this.cost)
				console.log(typeof this.cost);
				console.log("전송",this.title,this.date,time,this.counter,this.region,this.address,this.content,CategoryId,this.cost)
				console.log("전송")
				// this.fetchPostlist()
				
				
				//confirm이 취소일 경우 리턴, 확인일 경우 진행
				// if (!window.confirm('저장하시겠습니까?')) return
				
				this.CREATE_POST({
					title:this.title,
					content:this.content,
					region:this.region,
					address:this.address,
					cost: this.cost,
					capacity:this.counter,
					date:this.date,
					time,
					CategoryId
				}).then(
					this.$router.push('/posts')
				)
				.catch(err => {
					console.log(err);
				})
				.finally(() => {
					this.fetchPostlist()
				})
			
			},

			errorHandler(errordata){
				console.log(errordata)
			},

            //time
            changeHandler ({data}) {
                console.log("개발중..",data, this.date, this.address,this.region)
                this.TimeValue.HH = data.HH
                this.TimeValue.mm = data.mm
                this.TimeValue.ss = data.ss
				this.timestatus=true;
				return 1;

            },
            
			changeCounter: function(num){
				this.counter += +num
				console.log(this.counter)
				!isNaN(this.counter) && this.counter > 0 ? this.counter : this.counter = 0;
            
			},
			fetchPostlist(){
                this.FETCH_POSTLIST({cateName:'all'})
            },
			errorHanlder(eventData){
				alert('뭐죠?',eventData);
			},
        }
    }
</script>

<style scoped>
.card-bottom {
  width: auto;
  height: auto;
  box-sizing: border-box;
  padding-bottom: 5%;
  /* background-color: #FFFFFF; */
}
.input-header{
	margin: auto;
	display: flex;
	float: right;
    /* margin-top: 50px; */
    /* width: 500px; */
	margin-top:20px;
	margin-bottom: 0;
    width: 700px;
}
.div-save-btn {
    float: right;
    color: black;
    /* margin-right: ; */
    /* margin-right: 50px; */
	/* padding-top: 20px; */
    font-size: 20px;
}
.input-main {
    margin: auto;
    margin-top: 10px;
    /* width: 500px; */
    width: 600px;
}
.title{
    margin-top: 50px;
    margin-bottom: 30px;
}
.category-form{
    height: 5em;
}
.category-form-div{
    
	display: flex;    
    margin: 0px 0 0 0;
}
/* .category-list{
	padding-right: 20px;
} */
.category-time-list{
	display: flex;
}
.div-capacipy{
	padding: 50px 0 0 0;
	margin:  0 0 0 60px;
}
/* category-region{
    width: 10px;
} */
.category-time {
    width: 40%;
    margin: 18px 0 0 50px;
}
.vue-timepicker{
    border: 0px;
    color: blue;
}
.category-select-date {
    float: right;
    margin: 0 0px 0 0px;
}
.region-detail{
    margin: 10% 0 0 0;
}
.description {
    margin-top: 5%;
}
.col-xl, .col-xl-auto, .col-xl-12, .col-xl-11, .col-xl-10, .col-xl-9, .col-xl-8, .col-xl-7, .col-xl-6, .col-xl-5, .col-xl-4, .col-xl-3, .col-xl-2, .col-xl-1, .col-lg, .col-lg-auto, .col-lg-12, .col-lg-11, .col-lg-10, .col-lg-9, .col-lg-8, .col-lg-7, .col-lg-6, .col-lg-5, .col-lg-4, .col-lg-3, .col-lg-2, .col-lg-1, .col-md, .col-md-auto, .col-md-12, .col-md-11, .col-md-10, .col-md-9, .col-md-8, .col-md-7, .col-md-6, .col-md-5, .col-md-4, .col-md-3, .col-md-2, .col-md-1, .col-sm, .col-sm-auto, .col-sm-12, .col-sm-11, .col-sm-10, .col-sm-9, .col-sm-8, .col-sm-7, .col-sm-6, .col-sm-5, .col-sm-4, .col-sm-3, .col-sm-2, .col-sm-1, .col, .col-auto, .col-12, .col-11, .col-10, .col-9, .col-8, .col-7, .col-6, .col-5, .col-4, .col-3, .col-2, .col-1 {
    padding: 0;
	margin-right: 10px;
}
.form-fotter{
	display: flex;
}
.wrapper {
	height: 30px;
	display: flex;
}
.quantity {
  -webkit-appearance: none;
  border: none;
  text-align: center;
    width: 30px;
 
  font-size: 16px;
  color: #43484D;
  font-weight: 300;
	border: 1px solid #E1E8EE;
}
.btn {
	border: 1px solid #E1E8EE;
  width: 30px;
  background-color: #E1E8EE;
/*   border-radius: 6px; */
  cursor: pointer;
}
button:focus,
input:focus {
  outline:0;
}


.titlestyle {
	font-size: 38px;
	margin-top: 20px;
}

.background {
    background-color: #FFF7EE;
}
</style>