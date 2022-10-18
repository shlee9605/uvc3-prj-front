<template>
    <v-app inspire style="height: 900px;">
        <!-- 작성 완료 버튼 -->
        <!-- title -->
		<div class="input-header">
			
			<div class="checkbox" style="margin-left: 30px;">
				<v-container fluid>
					<v-checkbox
						v-model="checkbox1"
						:label="`비공개: ${checkbox1.toString()}`"
					></v-checkbox>
				</v-container>
			</div>
			<v-spacer></v-spacer>
			<div class="div-save-btn">
				<v-btn 
					color="primary"
					rounded
					@click="onSubmit">저장</v-btn>
			</div>
		</div>
					
        <main class="input-main">
			<form>
				
				<div class="title">
					<v-text-field
						label="제목"
						hide-details="auto"
						v-model="title"
					></v-text-field>
				</div>
				<form class="category-form">
					<div class="category-form-div">
						<div class="category-list" style="width:400px">
							<div class="category-time-list">
								<v-col class="category-select-date"
									cols="2"
									sm="3"
									md="3"
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
								<div class="category-time">
									<vue-timepicker
										v-model="TimeValue"
										:minute-interval="10"
										format="HH:mm"
										@change="changeHandler"
									></vue-timepicker>
								</div>
							</div>
							<div style="display: flex;">
								<div class="category-region">
									<v-col 
										class="d-flex"
										cols="5"
										sm="5"
										>
										<v-select
											v-model="region"
											:items="items"
											label="지역 선택"
										></v-select>
									</v-col>
								</div>
								<div class="category-region">
									<v-col 
										class="d-flex"
										cols="10"
										sm="10"
										>
										<v-select
											v-model="categoryId"
											:items="categoryList"
											label="카테고리"
										></v-select>
									</v-col>
								</div>
							</div>
						</div>
						<div style="display: flex;">
							<div class="div-capacipy">
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
				<div class="region-detail">
					<v-text-field
						label="상세주소"
						v-model="address"
						></v-text-field>
				</div>
				<!-- 내용  -->
				<div class="description">
					<div>
						<v-textarea
							color="black"
							label="설명"
							v-model="content"
						></v-textarea>
					</div>
				</div>
				<div class="form-fotter">
					<v-spacer></v-spacer>
					<div>
						<v-container fluid>
							<v-row>
								<v-col cols="">
								</v-col>
								<v-col cols="10">
								<v-text-field
									label="회비"
									value="0"
									prefix="￦"
									v-model.number="cost"
								></v-text-field>
								</v-col>
							</v-row>
						</v-container>
					</div>
				</div>
			</form>
        </main>
    </v-app>
</template>

<script>
import VueTimepicker from 'vue2-timepicker'
import {mapState, mapActions} from 'vuex'
    export default {
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

			//공개 비공개
			visibility:'',

			//카테고리
			categoryId: '',

            //timevalue
            TimeValue: {
                HH:'',
                mm:'',
                ss:'"00"'
            },
            /*console.log(this.TimeValue)
            // outputs -> {HH: "14", mm: "30", ss: "15"} */


            //description
            content:''


        }),
		
		computed:{
            ...mapState('Post',{
                post:'post'
            })
        },

		created() {
            this.fetchpost(),
            this.dateNtime(),
			this.title=this.post.title
			if(this.post.visibility=='Y'){
				this.checkbox1=true
			}
			else{
				this.checkbox1=false
			}
			this.cost=this.post.cost
			this.date=this.post.date
			this.categoryId=this.categoryList[this.post.CategoryId-1]
			this.counter=this.post.capacity
			this.content=this.post.content
			this.address=this.post.address
			this.TimeValue=this.post.time
			this.region=this.post.region
        },

        methods:{
			...mapActions('Post',[
				'CREATE_POST',
				'REVICE_POST',
				"FETCH_POSTLIST",
				"FETCH_POST"
			]),
			...mapActions('Attend',[
                "ATTEND_POST",
            ]),
			fetchpost(){
                this.FETCH_POST({id:this.$route.params.pid}).then( () => {
                    console.log('포스트상세 req 전송');
                })
            },

			dateNtime(){    //
                console.log(this.post.time);
            },
			
			attendUser(){
                return this.ATTEND_POST({id:this.$route.params.pid}).then( () => {
                    console.log('전송 성공!');
                }).catch(err => {
                    console.log('참가 실패',err);
                })
            },

			onSubmit() {
				//공개 비공개 Y or N 
				const visibility = this.checkbox1 ? 'Y': 'N'
				//카테고리 Id 값으로 변환
				const CategoryId= this.categoryList.indexOf(this.categoryId) + 1
				
				//this.categoryList.indexOf(this.categoryId) + 1
				
				const time = `${this.TimeValue.HH}:${this.TimeValue.mm}:00`
				
				console.log(this.TimeValue, this.date)

				// const cost = parseInt(this.cost)
				console.log(typeof this.cost);

				console.log("전송",this.title,visibility,this.date,time,this.counter,this.region,this.address,this.content,CategoryId,this.cost)
				console.log("전송")
				// this.fetchPostlist()
				
				
				//confirm이 취소일 경우 리턴, 확인일 경우 진행
				if (!window.confirm('저장하시겠습니까?')) return
				
				this.REVICE_POST({
					id:this.$route.params.pid,
					title:this.title,
					content:this.content,
					region:this.region,
					address:this.address,
					cost: this.cost,
					capacity:this.counter,
					date:this.date,
					time,
					visibility,
				}).then(this.$router.push('/posts'))
				.catch(err => {
					console.log(err);
				})
				.finally(() => {
					this.fetchPostlist()
				})
			
			},
            //time
            changeHandler ({data}) {
                console.log("개발중..",data, this.date, this.address,this.region)
				console.log(data.HH)
				console.log(this.TimeValue)
				this.TimeValue=data
            },
			changeCounter: function(num){
				this.counter += +num
				console.log(this.counter)
				!isNaN(this.counter) && this.counter > 0 ? this.counter : this.counter = 0;
            
			},
			fetchPostlist(){
                this.FETCH_POSTLIST({cateName:'all'})
                .then(data => console.log(data.data))
            },


        }



    }
</script>

<style>

.input-header{
	margin: auto;
	display: flex;
	float: right;
    /* margin-top: 50px; */
    /* width: 500px; */
	margin-top:40px;
	margin-bottom: 0;
    width: 700px;
}

.div-save-btn {
    float: right;
    color: black;
    /* margin-right: ; */
    /* margin: 30px 0 0 0 ; */
    font-size: 20px;
}

.input-main {
    margin: auto;
    margin-top: 10px;
    /* width: 500px; */
    width: 600px;
}

.title{
    /* margin-top: 70px; */
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
    width: ;
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

</style>