<template>
<v-app class="mainApp">
    <v-dialog persistent max-width="1000" v-model="dialog" class="dialog" content-class="elevation-0">
        <v-card class="modal">
            <div class="modalHeader">
                <h2 style="margin-left:10px; margin-top:10px"> 프로필 사진 편집 </h2>
            </div>
            <v-divider></v-divider>
            <v-card-text>
                <div class="imageUpload" style="margin-top:25px;">
                    <button :loading="isSelecting" @click="handleFileImport">
                    사진 업로드
                    </button>
                    <input id="editPhoto" ref="uploader" class="d-none" type="file" accept=".png, .jpg, .jpeg" @change="onFileChanged">
                </div>  
            </v-card-text>   
            <v-divider></v-divider>
            <v-card-text>
                <div style="margin-top:25px">
                    <button @click="changeDefaultPhotoUrl"> 기본 프로필로 변경 </button>
                </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
                <div style="margin-top:25px; color: red;">
                    <button icon text @click="closeModal"> 취소 </button>
                </div>
            </v-card-text>
        </v-card>

    </v-dialog>
</v-app>  
</template>
<script>
import axios from 'axios';
export default {
    name: "UploadPhotoModal",
     props: {
        openDialog: Boolean,
    },

    data: ()=>({
    status: false,
    isSelecting: false,
    selectedFile: null,
    imageValue: "",
    imgDataUrl:"",

    }),

    computed:{
        dialog(props){
            console.log("dialog - response",props.openDialog);
            return props.openDialog;
        },
    },

    methods:{
        closeModal(){
            this.$emit('closeDialog');
        },

        async statusChange(){
            this.status = true;
        },

        async editPhotoUrl(e){
            console.log(e.target.files[0])
        },

        async handleFileImport() {
            this.isSelecting = true;

            // After obtaining the focus when closing the FilePicker, return the button state to normal
            window.addEventListener('focus', () => {
            this.isSelecting = false
            }, { once: true });
                
            // Trigger click on the FileInput
            this.$refs.uploader.click();
        },

        

        async onFileChanged(e) {
            const imageDataForm = new FormData();
            this.selectedFile = e.target.files[0];
            console.log("onFileChange - return ", this.selectedFile)
            imageDataForm.append('img',this.selectedFile);
            await axios
            .patch(process.env.VUE_APP_API + '/profile/my', imageDataForm,{
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
                }
            })
            .then((response)=>{ 
                console.log("onFileChange - response", response)
                this.closeModal();

            })
            .catch((error)=>{
                console.log("onFileChange - error", error)
            })

            // Do whatever you need with the file, liek reading it with FileReader
        },

        async changeDefaultPhotoUrl(){
            const axiosBody = {
                photoUrl: "no-photo.jpg"
            } 
            await axios
            .patch(process.env.VUE_APP_API + '/profile/my', axiosBody, {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
                }
            })
            .then((response)=>{
                console.log("changeDefaultPhotoUrl - response", response)
                this.closeModal();
            })
            .catch((error)=>{
                console.log("changeDefaultPhotoUrl - error", error)
            })
        },

    }
}
</script>
<style >
    .modalHeader {
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  font-size: 20px;
}
.modal{
    /* box-sizing: border-box; */
    width: 40%;
    height:20%;
    margin-left:30%
}
.dialog{
    align-items: center;
    display: flex;
    justify-content: center;
}

.uploadForm{
    border-style: none !important;
}

/* .imageUpload > input
{
    display: none;
} */
</style>