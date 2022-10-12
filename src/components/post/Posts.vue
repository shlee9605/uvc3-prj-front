<template>
    <body>
        <!-- 카테고리, filter list -->
        <div>
            <h1>카테고리</h1>
        </div>

        <!-- 게시글 리스트 -->
        <div>
            <h1>게시글 리스트</h1>
        </div>

        <!-- 하단 리스트 조회 바 -->
       <div class="page-number">
            <v-pagination
                v-model="page"
                :length="5"
                value="10"
                prev-icon="mdi-menu-left"
                next-icon="mdi-menu-right"
            ></v-pagination>
        </div>
    </body>
</template>

<script>

    export default {
        data() {
            return {
                page: 1,
            }
        },
    }
</script>

<style>


.page-number{
    width: 500px;
    margin: 0 33% 0 33%
}
</style>