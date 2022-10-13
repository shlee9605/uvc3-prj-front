<template>
    <v-app>
        <main>
        <!-- 카테고리, filter list -->
        <div class="contents-header-bar">
            <div class="content-filter">
                <a 
                class="filter">
                    <button>카테고리</button>
                </a>
                <a 
                class="filter">
                    <button>지역</button>
                </a>
                <a 
                class="filter">
                    <button>날짜</button>
                </a>
                <v-chip-group
                    mandatory
                    active-class="primary--text"
                >
                    <v-chip>
                        신청하기
                    </v-chip>
                </v-chip-group>
            </div>
            <v-spacer></v-spacer>
            <router-link to="/addpost" class="addpost-btn">
                <button>새모임</button>
            </router-link>
        </div>

            <!-- 게시글 리스트 -->
            <div>
                <table class="contents-table">
                    <tbody class="contents-table-tbody">
                            <router-link 
                            class="contents-table-a"
                             v-for="item in contents"
                             to="/posts"
                            :key="item.Id">
                                <div class="table-a-time">
                                    <p>{{item.time}}</p>
                                </div>
                                <div class="table-a-title">
                                    <div>
                                        <td>{{item.title}}</td>
                                    </div>
                                    <div class="post-user" 
                                        style="font-size: 5px; color: #7b7b7b;">
                                        <td>{{item.userId}}</td>
                                    </div>
                                </div>
                                <v-spacer></v-spacer> 
                                <div class="content-detail">
                                    <td style="text-align: right;">{{item.region}}</td>
                                    <td>{{item.price}}원</td>
                                </div>
                                <div class="table-a-btn">    
                                    <td class="apply-btn" if="">
                                        신청하기
                                    </td>
                                    <!-- <td class="apply-btn" v-else-if="">
                                        마감임박
                                    </td>
                                    <td class="apply-btn" v-else>
                                        마감
                                    </td> -->
                                </div>
                            </router-link>
                    </tbody>
                </table>
            </div>
        </main>
    </v-app>
</template>

<script>

    export default {
        data() {
            return {
                changedColor: false,
                chip3:true,
                page: 1,
                contents: [
                    {userId:'pororo1',time:"08:00", title: "공놀이", price:'10,000',region:'강남'},
                    {userId:'pororo1',time:"10:00",title:"점심식사 모임", price:'20,000',region:'강남'},
                    {userId:'pororo1', time:'10:00',title:'독서 ',price:'5,000',region:'홍대'},
                    {userId:'pororo1', time:'10:30',title:'풋살',price:'20,000',region:'잠실'},
                    {userId:'pororo1', time:'11:00',title:'같이 점심 먹고 볼링쳐요!!',price:'50,000',region:'강남'},
                    {userId:'pororo1', time:'15:00',title:'보드게임까페 조각',price:'15,000',region:'홍대'},
                    {userId:'pororo1', time:'18:00',title:'같이 술한잔 하실 분!',price:'100,000',region:'강남'},
                    {userId:'pororo1', time:'18:00',title:'같이 술한잔 하실 분!',price:'10,000,000',region:'강남'},
                    {userId:'pororo1', time:'18:00',title:'같이 술한잔 하실 분!',price:'100,000,000',region:'강남'},
                    {userId:'pororo1', time:'18:00',title:'같이 술한잔 하실 분!',price:'1,000,000,000',region:'강남'},
                    {userId:'pororo1', time:'18:00',title:'같이 술한잔 하실 분!',price:'10,000,000,000',region:'강남'},
                ],
                tags:[]
            }
        },
        methods: {
            changeColor(){
                this.changedColor = true;
                console.log(this.changedColor); 
            }
        },
    }
</script>

<style>
/* 카테고리 filter */
.contents-header-bar {
    display: flex;
    width: 60%;
    margin: auto;
}


.content-filter{
    /* margin: 50px 0 0 0; */
    display: flex;
    padding: 50px 0 25px 0;
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
    margin: 50px 0 0 0; 
    color: black;
}

.contents-table {
    padding: 0 0 0 0;
    /* margin: 0 30% 0 300px; */
    margin: auto;
    width: 60%;
    /* border: 1px #a39485 solid; */
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

/* 테이블 time */
.table-a-time {
    margin: 28px 0 0 40px;
    color: black;
}
/* 테이블 title */
.table-a-title {
    display: grid;
    color: black;
    margin: 20px 0 0 50px;
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
    background-color: rgb(52, 52, 234);
    height: 30px;
    width: 100px;
    border-radius: 15px;
}

/* 페이지 넘버 */
.page-number{
    width: 500px;
    margin: 0 33% 0 33%
}



</style>