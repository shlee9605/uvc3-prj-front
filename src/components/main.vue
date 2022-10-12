<template>
        <section>
            <v-carousel 
                hide-delimiters
                height="92.5vh"
                show-arrows =true
                :cycle="true"
                :interval="4000">
                <v-carousel-item
                    v-for="(item,i) in items"
                    :key="i"
                    :src="item.src"
                ></v-carousel-item>
            </v-carousel>
        </section>
</template>

<script>
    export default {
        data() {
            return {
                items:[
                    {src: 'https://media.fastcampus.co.kr/wp-content/uploads/2020/05/unnamed-1.png'},
                    {src: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/928c0c31914107.566791aca4949.jpg'},
                    {src: 'https://s3.ap-northeast-2.amazonaws.com/icunow.co.kr/2022/06/27160523/og-image.png'}
                ]
            }
        }
    }
</script>

<style css>
body {
    margin: 0;
    
}

/* section {
    height: 80vh;
    bottom: 0; */
    /* background: url(); */
/* } */

section:before{
    content: '';
    background: linear-gradient(to right,white,transparent);
    position: absolute;
    left: 0;
}

.v-window__next {
    background:rgba(241, 239, 239, 0.15);
    top:calc(50% - 33px);
    margin-left:96%;
    }
.v-window__prev {
    background:rgba(242, 240, 240, 0.15);
    top:calc(50% - 33px);
    /* margin-left:13%; */
    float: right;
}




/* 
.v-window__prev:hover {
    display:block;
}
.v-window__next:hover {
    display:block;
} */



</style>