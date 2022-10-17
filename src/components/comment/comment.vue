<template>
    <v-app>
        <form action="" @submit.prevent="onSubmit">
            <div class="post-comment">
                <h3>댓글</h3>
                <div style="display:flex;">
                    <v-col
                    cols="20"
                    sm="9"
                    >
                        <v-text-field
                        v-model="content"
                        solo
                        height=5
                        clearable
                        ></v-text-field>
                    </v-col>
                    <div style="margin:5px 0 0 0;">
                        <v-btn
                        type="submit"
                        >작성</v-btn>
                        <!-- @click="method" -->
                    </div>
                </div>
                <table>
                    <tr>
                        <td 
                        class="content-item"
                        v-for=" (content,index) in contentlist" :key="index">
                            <h3>{{content.UserId}} : {{content.content}}</h3>
                            <!-- <a>
                                <button @click="inputnewCon=true">수정</button>
                            </a>
                            <a>
                                <button @click="deleteComment">삭제</button>
                            </a> -->
                        </td>
                        <!-- <td v-if="inputnewCon">
                            <form @submit.prevent="updateComment">
                                <input type="text" v-model="newContent">
                                <v-btn type="submit" @click="inputnewCon=false">수정완료</v-btn>
                                <v-btn @click="inputnewCon=false">취소</v-btn>
                            </form>
                        </td> -->
                    </tr>
                </table>
            </div>
        </form>
    </v-app>
</template>

<script>
import {mapState,mapActions} from 'vuex'
    export default {
        data() {
            return{
                content:'',
                 newContent:'',
                inputnewCon:false,
            }
        },
        computed:{
            ...mapState('Comment',{
                contentlist: 'contentlist'
            })
        },
        created(){
            this.fetchCommentList()
        },

        methods:{
            ...mapActions('Comment',[
                'CREATE_COMMENT',
                'FETCH_COMMENT',
                'UPDATE_COMMENT',
                'DELETE_COMMENT',
            ]),
            onSubmit() {
                this.CREATE_COMMENT({pid: this.$route.params.pid,content: this.content})
                .then(() => console.log('onsubmit 댓글 전송'))
            },
             //댓글 리스트 조회
            fetchCommentList(){
                console.log(1)
                this.FETCH_COMMENT({pid: this.$route.params.pid}).then(() => {
                    console.log('조회됨');
                }).catch(err => {
                    console.log("댓글 조회x",err);
                })
                console.log(1)
            },

            // //댓글 수정
            // updateComment(){
            //     console.log('수정');
            //     this.UPDATE_COMMENT({pid:this.$route.params.pid, cid:this.$route.params.cid , content:this.newContent})
            // },

            // //댓글 삭제
            // deleteComment(){
            //     console.log("삭제");
            //     this.DELETE_COMMENT({pid:this.$route.params.pid, cid:this.$route.params.cid})
            // },
        }
    }
</script>

<style>

</style>