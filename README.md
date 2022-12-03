# Todaymate FrontEnd - Vue.js

## This repo is for Vue2
You are looking at the repository for Vue2.

# 전체구조
.
├── public
│   ├── fabicon.ico
│   └── index.html                                       #글씨체 
├── src
│   ├── api                                              #Api폴더
│   │    ├── attend.js
│   │    ├── auth.js
│   │    ├── comment.js
│   │    ├── indext.js                                   #axios 처리용 함수
│   │    ├── post.js
│   │    ├── profile.js
│   │    └── relationship.js
│   ├── assets
│   ├── components                                       #component 폴더
│   │    ├── Modal
│   │    │    └── UploadPhotoModal.vue
│   │    ├── comment                                     #댓글 
│   │    ├── post
│   │    │    ├── AddPost.vue                            #게시글 작성 
│   │    │    ├── EditPost.vue                           #게시글 수정 
│   │    │    ├── Post.vue                               #게시글 상세 
│   │    │    └── Posts.vue                              #게시글 목록 
│   │    ├── Auth.vue                                    #회원가입 
│   │    ├── Login.vue                                   #로그인 
│   │    ├── NavBar.vue                                  #NavBar
│   │    ├── Profile.vue                                 #타인 프로필 조회 
│   │    ├── main.vue                                    #main 
│   │    └── myProfile.vue                               #내 프로필 조회 
│   ├── mixin
│   │    ├── SetFormat.vue
│   │    └── Validate.vue                                # validate 설정
│   ├── plugins
│   │    └── vuetify.js
│   ├── router
│   │    └── index.js                                     #router 설정 인덱스파일
│   ├── store                                             #store 폴더
│   │    ├── Attend.js                     
│   │    ├── Auth.js
│   │    ├── Comment.js
│   │    ├── Post.js
│   │    ├── Profile.js
│   │    ├── Relationship.js
│   │    └──  index.js
│   ├── APP.vue
│   └── main.js                         
├── .env                                                  #개발용 환경설정
├── .eslintrc.js                  
├── .gitignore
├── README.md
├── babrl.config.js
├── jsconfig.json                          
├── package-lock.json
├── package.json
└── vue.config.js


## 라이브러리 버전
```
    "@mdi/font": "^7.0.96",
    "@mdi/js": "^7.0.96",
    "axios": "^0.27.2",
    "core-js": "^3.8.3",
    "dayjs": "^1.11.5",
    "material-design-icons-iconfont": "^6.7.0",
    "multer": "^1.4.5-lts.1",
    "vee-validate": "^3.4.14",
    "vue": "^2.6.14",
    "vue-date-pick": "^1.5.1",
    "vue-loader": "^17.0.0",
    "vue-moment": "^4.1.0",
    "vue-picture-input": "^2.4.0",
    "vue-router": "^3.6.5",
    "vue2-timepicker": "^1.1.6",
    "vuetify": "^2.6.11",
    "vuex": "^3.6.2",
    "vuex-persistedstate": "^4.1.0"
    "eslint": "^7.32.0",
    "eslint-config-prettier": "^8.3.0",
    "eslint-plugin-prettier": "^4.0.0",
```

## Vue CLI 설치
g: 해당 패키지가 현재 디렉토리뿐만 아니라 앞으로 생성되는 모든 프로젝트에서 사용할 수 있는 global 패키지 등록

```console
> npm install -g @vue/cli
```

## Vue 프로젝트 생성
```console
> vue create vue-project 
```

## Vue 프로젝트 실행
```console
> npm run serve 
```

## Vuetify 
```console
> npm install vuetify
```

Vue Component 추가 (Add the Vue Component)
```console
# for Vue 2.x
> npm i --save @fortawesome/vue-fontawesome@latest-2
```
