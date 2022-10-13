<template>
    <v-app inspire>
        <!-- 작성 완료 버튼 -->
        <!-- title -->
        <main class="input-main">
            <div class="div-save-btn">
                <a href="" style="color:black; float:right">
                    <button>저장</button>
                </a>
            </div>
            <div class="title">
                <v-text-field
                    label="제목"
                    hide-details="auto"
                ></v-text-field>
            </div>
            <form class="category-form">
                <div class="category-form-div">
                    <div class="category-region">
                        <v-col 
                            class="d-flex"
                            cols="5"
                            sm="10"
                            >
                            <v-select
                                :items="items"
                                label="지역 선택"
                            ></v-select>
                        </v-col>
                    </div>
                    <v-spacer></v-spacer>    
                    
                    <v-col class="category-select-date"
                        cols="2"
                        sm="2"
                        md="2"
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
                                    style="font-size:0.8em;"
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
            </form>
            <div class="region-detail">
                <v-text-field
                    label="상세주소"></v-text-field>
            </div>
            <!-- 내용  -->
            <div class="description">
                <div>
                    <v-textarea
                        color="black"
                        label="설명"
                    ></v-textarea>
                    
                
                </div>
            </div>
        </main>
    </v-app>
</template>

<script>
import VueTimepicker from 'vue2-timepicker'
    export default {
        components: { VueTimepicker },
        data: () => ({
            //title
            title:'',

            //date값
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            
            //select Date status값
            menu: false,
            
            //region list
            items: ['강남', '홍대', '잠실'],
            
            //region 값
            region: '',
            //region detail 값
            regionDetail: '',

            //timevalue
            TimeValue: {
                HH:'',
                mm:'',
                ss:'00'
            },
            /*console.log(this.TimeValue)
            // outputs -> {HH: "14", mm: "30", ss: "15"} */


            //description
            descripdion:''


        }),
        methods:{

            //time 수정
            changeHandler (eventData) {
                console.log(eventData)
                // -> {data: {HH:..., mm:... }}
            }


        }
    }
</script>

<style>
.div-save-btn {
    float: right;
    color: black;
    /* margin-right: ; */
    margin: 30px 0 0 0 ;
    font-size: 13px;
}

.title{
    margin-top: 70px;
    margin-bottom: 30px;
}

.category-form{
    height: 5em;
}

.category-form-div{
    display: flex;    
    margin: 0px 0 0 0;
}

.input-main {
    margin: auto;
    margin-top: 50px;
    /* width: 500px; */
    width: 600px;
}

category-region{
    width: 30%px;
}

.category-time {
    width: 40%;
    margin: 15px 0 0 50px;
}

.vue-timepicker{
    border: 0px;
    color: blue;
}

.category-select-date {
    float: right;
    margin: 0 10px 0 60px;
}


.region-detail{
    margin: 5% 0 0 0;
}



.description {
    margin-top: 5%;
}

.col-xl, .col-xl-auto, .col-xl-12, .col-xl-11, .col-xl-10, .col-xl-9, .col-xl-8, .col-xl-7, .col-xl-6, .col-xl-5, .col-xl-4, .col-xl-3, .col-xl-2, .col-xl-1, .col-lg, .col-lg-auto, .col-lg-12, .col-lg-11, .col-lg-10, .col-lg-9, .col-lg-8, .col-lg-7, .col-lg-6, .col-lg-5, .col-lg-4, .col-lg-3, .col-lg-2, .col-lg-1, .col-md, .col-md-auto, .col-md-12, .col-md-11, .col-md-10, .col-md-9, .col-md-8, .col-md-7, .col-md-6, .col-md-5, .col-md-4, .col-md-3, .col-md-2, .col-md-1, .col-sm, .col-sm-auto, .col-sm-12, .col-sm-11, .col-sm-10, .col-sm-9, .col-sm-8, .col-sm-7, .col-sm-6, .col-sm-5, .col-sm-4, .col-sm-3, .col-sm-2, .col-sm-1, .col, .col-auto, .col-12, .col-11, .col-10, .col-9, .col-8, .col-7, .col-6, .col-5, .col-4, .col-3, .col-2, .col-1 {
    padding: 0;
}



</style>