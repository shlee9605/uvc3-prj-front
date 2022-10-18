<template>
<v-app>
    <v-card
    class="mx-auto"
    max-width="900"
    style="border-radius: 24px; margin-top:80px;"
    >
    <main class="post-main">
        <!-- ------------------------------------------------ -->
        <div class="post-header">
            
            <div class="header-desc">
                <div class="post-title-area">
                    <div class="post-title">
                        <h1>{{post.title}}</h1>
                    </div>
                </div>
                <div class="post-user-area">
                    <div>
                        <div class="post-user">
                            <a 
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

                                    <button>{{post.UserId}}</button>

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
                    @click ="attendUser"
                    >신청하기</v-btn>
                </div>
            </div>

        </div>

        <!-- ------------------------------------------------- -->

        <form class="post-form">

            <div class="post-center">
                <div class="post-desc">
                    {{post.content}}
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
                            {{post.date.slice(0,4)}}년 {{post.date.slice(5,7)}}월 {{post.date.slice(8,10)}}일 {{post.time.slice(0,2)}}시 {{post.time.slice(3,5)}}분
                            </p>
                            <div class="text--primary">
                                장소: {{post.address}}
                            </div>
                            <br>
                            <p>회비 : {{post.cost}}원</p>
                            
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
                <v-spacer></v-spacer>    
            </div>  

        </form>

        <!-- -------------------------------------------------- -->

    </main>
    </v-card>
</v-app>
</template>

<script>
import Comment from '../comment/comment.vue'
import {mapState, mapActions} from 'vuex'
    export default {
        components:{Comment},
        data(){
            return {
                reveal: false,
                year:'',
                month:'',
                date:'',
                HH:'',
                mm:'',
                postUser:{
                    counter:'6',
                    },

            }
        },
        computed:{
            ...mapState('Post',{
                post:'post'
            })
        },
        created() {
            this.fetchpost(),
            this.dateNtime()
        },
        methods:{
            ...mapActions('Post',[
                "FETCH_POST",
            ]),
            ...mapActions('Attend',[
                "ATTEND_POST",
            ]),
            
            fetchpost(){
                this.FETCH_POST({id:this.$route.params.pid}).then( () => {
                    console.log('포스트상세 req 전송');
                })
            },

            dateNtime(){
                console.log('dateNtime',this.post.time);
            },

            attendUser(){
                return this.ATTEND_POST({id:this.$route.params.pid}).then( () => {
                    console.log('전송 성공!');
                }).catch(err => {
                    console.log('참가 실패',err);
                })
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
    margin-bottom: 50px;
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