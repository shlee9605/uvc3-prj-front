<template>
    <v-app>
        <div class="header-size">
        <!-- 카테고리, filter list -->
            <div class="contents-header-bar">
                <div style="margin: 0 5%; padding:0 5% 0 10%">
                    <v-col
                    cols="12"
                    sm="2"
                    md="12"
                    >
                    <v-sheet
                    class="py-4 px-1"
                    >
                        <v-chip-group
                        mandatory
                        active-class="primary--text"
                        >
                            <v-chip
                            v-for="time in times"
                            :key="time"
                            @click="sortdate(time.slice(8,10))">
                                {{ time.slice(8,10) }}일   
                            </v-chip>
                        </v-chip-group>
                    </v-sheet>
                    </v-col>
                </div>
                <div class="content-filter">
                    <v-col 
							class="d-flex"
							cols="2"
							sm="2"
						><v-select
							v-model="categoryId"
							:items="categoryList"
							label="카테고리"
                            @input="sortcat"
						></v-select>
					</v-col>
                    <v-col 
							class="d-flex"
							cols="2"
							sm="2"
						><v-select
                            style="margin-left:50px;"
							v-model="regionId"
							:items="regionList"
							label="지역"
                            @input="sortcat"
						></v-select>
					</v-col>
                </div>
                <router-link to="/addpost" class="addpost-btn">
                    <button style="float:right; margin-right:50px;">새모임</button>
                </router-link>
            </div>

            <!-- 게시글 리스트 -->
            <div style="margin-top:50px;">
                <table class="contents-table">
                    <tbody class="contents-table-tbody">
                            <router-link 
                            class="contents-table-a"
                            v-for="item in sortedpost"
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
                                        <td>{{item.UserId}}</td>
                                    </div>
                                </div>
                                <v-spacer></v-spacer> 
                                <div class="content-detail">
                                    <td style="text-align: right;">{{item.region}}</td>
                                    <td>{{item.cost}}원</td>
                                </div>
                                <div class="table-a-btn" >    
                                    <td class="apply-btn-end" v-if="new Date(item.date) < new Date()">
                                        마감
                                    </td>
                                    <td class="apply-btn-end" v-else-if="item.capacity === item.count">
                                        마감
                                    </td>
                                    <td class="apply-btn-before-end" v-else-if="item.capacity - item.count <= 2">
                                        마감임박
                                    </td>
                                    <td class="apply-btn" v-else>
                                        신청가능
                                    </td>
                                </div>
                            </router-link>
                    </tbody>
                </table>
            </div>
        </div>
    </v-app>
</template>

<script>
import {mapState,mapActions} from 'vuex'
    export default {
        data() {
            return {    
                
                categoryList: ['전체', '식사','운동','스터디','쇼핑','놀이'],
                //카테고리
                categoryId: '',

                regionList: ['전체', '강남','홍대','잠실'],
                //지역
                regionId: '',

                sortedpost:[],
                sortedbydate:[],

                times:[],
                chip3:true,
            }
        },
        computed:{
            ...mapState('Post',{
                postlist:'postlist'
            }),
            // ...mapState('Attend',{
            //     attendList:'attendList'
            // })
        },
        async created(){
            await this.fetchPostlist(),
            this.sortingorigin(),//날짜별 정렬

            console.log('리스트',this.postlist);
            // console.log('언탠드 리스트',this.attendList);

            // this.sortingpostlist(),     //카테고리/지역별 정렬
            this.date()
        },
        methods: {
            ...mapActions('Post',[
                "FETCH_POSTLIST"
            ]),
            // ...mapActions('Attend',[
            //     'FETCH_ATTENDLIST',
            // ]),


            async fetchPostlist(){
                await this.FETCH_POSTLIST({cateName:'all'})
                .then(console.log('postlist req 전송!'))
            },

            // //참가자 리스트 조회
            // fetchAttendList(){
            //     return this.FETCH_ATTENDLIST({id: this.$route.params.pid}).then(() => {
            //         console.log('참가자 리스트 req');
            //     }).catch(err => {
            //         console.log('참가자 리스트 조회 req 실패',err);
            //     })
            // },

            
            
            //카테고리/지역 정렬
            // sortingpostlist(){
            //     this.sortedpost=this.sortedbydate
            // },
            sortcat(){
                this.sortedpost=[];
                let num=0;
                for(let i =0; this.sortedbydate[i]!=null; i++){
                    //this.postlist[i].region=this.regionId
                    if((this.categoryList[this.sortedbydate[i].CategoryId]==this.categoryId||this.categoryId=='전체'||this.categoryId=='')&&(this.sortedbydate[i].region==this.regionId||this.regionId=='전체'||this.regionId=='')){
                        this.sortedpost[num]=this.sortedbydate[i];
                        num++;
                    }
                }
            },

            //날짜별 정렬
            sortdate(event){
                this.sortedbydate=[];
                this.sortedpost=[];
                let num=0;
                for(let i =0; this.postlist[i]!=null; i++){
                    if(this.postlist[i].date.substr(8,2)==event){
                        this.sortedbydate[num]=this.postlist[i];
                        num++;
                    }
                }

                num=0;
                for(let i =0; this.sortedbydate[i]!=null; i++){
                    //this.postlist[i].region=this.regionId
                    if((this.categoryList[this.sortedbydate[i].CategoryId]==this.categoryId||this.categoryId=='전체'||this.categoryId=='')&&(this.sortedbydate[i].region==this.regionId||this.regionId=='전체'||this.regionId=='')){
                        this.sortedpost[num]=this.sortedbydate[i];
                        num++;
                    }
                }
            },

            //날짜 default
            sortingorigin(){
                //오늘 날짜
                const Dt = new Date()
                const today = (new Date(Date.parse(Dt)));
                const todayTime = today.toISOString().split("T")[0]
                
                this.sortedbydate=[];
                let num=0;
                for(let i =0; this.postlist[i]!=null; i++){
                    if(this.postlist[i].date.substr(8,2)==todayTime.substr(8,2)){
                        this.sortedbydate[num]=this.postlist[i];
                        num++;
                    }
                }
                
                this.sortedpost=this.sortedbydate
            },

            //오늘부터 15일 후 까지 count
            date(){
                const time = []
                const Dt = new Date()
                for (let i = 0; i < 15; i++) {
                    const today = (new Date(Date.parse(Dt) + i * 1000 * 60 * 60 * 24));
                    const todayTime = today.toISOString().split("T")[0]
                    time.push(todayTime)
                }
                console.log(time);
                this.times = time
            },

        },
        // mounted(){
        //     this.fetchPostlist(),
        //     this.sortingorigin()       //날짜별 정렬
        //     // this.fetchAttendList()
        // }
        
    }
</script>

<style>
.header-size{
    width:50%;
    margin: 80px 25% 0 25%;
}


/* 카테고리 filter */
.contents-header-bar {
    /* display: grid;  */
    /* width: 300px; */
    margin: auto;
    margin-top:50px;
}


.content-filter{
    display: flex;
    padding: 5px 0 25px 0;
}

.filter {
    text-align: center;
    margin: 10px;
    height: 17px;
    width: 55px;
    font-size: 10px;
    border: 1px rgb(123, 121, 121) solid;
    border-radius: 15px;
}

/* .filter:active {
    background-color: rgb(52, 52, 234);
    color: white;
    border: 1px rgb(52, 52, 234) solid;
} */

.addpost-btn{
    margin: 15px 0 0 0; 
    color: black;
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



</style>