<template>
    <div class="post-comment">
        <h3>댓글</h3>
        <div style="display:flex;">
            <v-col
            cols="20"
            sm="9"
            >
                <v-text-field
                v-model="comment"
                solo
                height=5
                clearable
                ></v-text-field>
            </v-col>
            <div style="margin:5px 0 0 0;">
                <v-btn>작성</v-btn>
            </div>
        </div>
        <div>                    
        
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return{
                comment:''
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>