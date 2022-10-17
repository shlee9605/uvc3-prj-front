<template>
<v-app>
    <v-card
    class="mx-auto"
    max-width="900"
    style="border-radius: 24px; margin-top:30px;"
    >
    <main class="post-main">
        <!-- ------------------------------------------------ -->

        <div class="post-header">
            
            <div class="header-desc">
                <div class="post-title-area">
                    <div class="post-title">
                        <h1>간단하게 맥주 한잔 하실 분</h1>
                    </div>
                </div>
                <div class="post-user-area">
                    <div>
                        <div class="post-user">
                            <a 
                            href=""
                            style="display:flex;">
                                <v-row>
                                    <v-avatar
                                        class="userIcon"
                                        color="red"
                                        size="36"
                                    >
                                        <span class="white--text text-h5">C</span>
                                    </v-avatar>
                                </v-row>
                                <div style="margin:5px 0 0 25px; color:black;">
                                    <button>{{postUser.id}}</button>
                                </div>
                            </a>
                        </div>
                    </div>
                    <v-spacer></v-spacer>
                </div>
            </div>

            <div class="header-btn-area">
                <div class="header-btn">
                    <v-btn
                    rounded
                    color="primary"
                    >신청하기</v-btn>
                </div>
            </div>

        </div>

        <!-- ------------------------------------------------- -->

        <form class="post-form">

            <div class="post-center">
                <div class="post-desc">
                    {{postUser.content}}
                </div>
                
                <Comment />

            </div>
            
            <div class="post-sub">
                <div class="post-detail">
                    <v-card
                    class="mx-auto"
                    max-width="344"
                    >
                        <v-card-text>
                            <div></div>
                            <p class="text-h7 text--primary">
                            {{year}}년 {{month}}월 {{date}}일 {{hour}}:{{min}}
                            </p>
                            <div class="text--primary">
                                장소: {{postUser.address}}
                            </div>
                            <br>
                            <p>회비 : {{postUser.cost}}원</p>
                            
                        </v-card-text>
                    </v-card>
                </div>    
                <div class="participant">
                    <v-card
                    class="mx-auto"
                    max-width="344"
                    >
                        <div>
                            <h2>참가자</h2>
                        </div>
                        <div style="font-size: 80px;">
                            1/{{postUser.counter}}
                        </div>
                    </v-card>
                </div>    
                <div class="applicant">
                    <h2>신청자(x명) or ?</h2>
                </div>
                <v-spacer></v-spacer>    
            </div>  

        </form>

        <!-- -------------------------------------------------- -->

    </main>
    </v-card>
</v-app>
</template>

<script>
import Comment from '../comment.vue'
    export default {
        components:{Comment},
        data(){
            return {
                reveal: false,
                year:'',
                month:'',
                date:'',
                hour:'',
                min:'',
                userlist:[
                    {id:1, id:'pororo1'},
                    {id:2, id:'pororo1'},
                    {id:3, id:'pororo1'},
                    {id:4, id:'pororo1'},
                    {id:5, id:'pororo1'},
                ],
                postUser:{
                    postId:1,
                    id:'crong1',
                    content:
                    ' 함께 맥주 마실 인원모집합니다!',
                    region:'강남',
                    cost:'20000',
                    address:'서울시 강남구 역삼동 826-39',
                    time:'15:30:00',
                    date:'2022-10-22',
                    counter:'6',
                    },

            }
        },
        created() {
            this.changeDate(),
            this.changeTime()
        },
        methods:{
            changeDate(){
                const DateArr = this.postUser.date.split('-')
                console.log(DateArr);
                this.year = DateArr[0]
                this.month = DateArr[1]
                this.date = DateArr[2]
            },
            changeTime(){
                const TimeArr = this.postUser.time.split(':')
                console.log(TimeArr);
                this.hour = TimeArr[0],
                this.min = TimeArr[1]
            },
        },
    }
</script>

<style>
/* 게시글 body(header + form) 전체 */
.post-main{
    width: 900px;
    height: 100%;
    margin:auto;
    /* border-radius: 5%; */
    /* border: 1px black solid; */
    /* box-shadow: 3px 2px 1px 0px; */
}
/* --------------------------- header ----------------------------------- */
/* header 전체 */
.post-header{
    margin: auto;
    margin-top: 50px;
    display: flex;
    height: 20%;
}
/* 버튼 영역 */
/* .header-btn-area{
    background-color: bisque;
} */

.header-btn{
    margin: 40px 60px 0 0;
}


/* title,user정보 영역 */
.header-desc{
/* background-color: goldenrod; */
    width: 900px;
}
/* title */
.post-title-area{
    padding: 40px 0 0 60px;
    height: 100px;
    /* background-color: grey; */
}
.post-title{
    margin: 0 0 0 0;
}


/* user정보 */
.post-user-area{
/* background-color: green; */
height: 60px;
margin-top: 10px;
}

.userIcon{
    margin: 10px 0 0 0;
}
.post-user{
    margin: 20px 0 0 70px;
    display: flex;
}


/* ------------------------- body-form --------------------------------- */
/* form 전체영역 */
.post-form{
    display: flex;
}


/* 게시글, 댓글 전체 */
.post-center{
    display: grid;
    width: 600px;
    /* height: 900px; */
}

.post-desc{
    padding: 10%;
    font-size: 13px;
}


.post-comment{
    margin: 0 0 0 50px;
}


/* 서브내용 전체 */
.post-sub{
    display: grid;
}

/* 상세내용 */
.post-detail{
    /* background-color: gold; */
    width: 250px;
    margin: 0;
}

/* 참가자 */
.participant{
    text-align: center;
    height:160px;
    margin-top: 10px;
    
}


/* 신청자 */
/* .applicant{
    background-color: mediumorchid;
} */

.v-card--reveal {
bottom: 0;
opacity: 1 !important;
position: absolute;
width: 100%;
}




</style>