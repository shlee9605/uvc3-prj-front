// 게시글
import { post, postlist } from '../api/post'
import dayjs from 'dayjs'


export const Post = {
    namespaced: true,

    state: {
        post:{},
        postlist:[],
    },

    mutations: {
        //post조회 
        SET_POST(state,post){
            state.post = post
        },
        //postlist 조회
        SET_POSTLIST(state,postlist){
            state.postlist = postlist
        }
    },

    actions: {
        async FETCH_POST({commit},{id}){
            return await post.fetch(id).then(data => {
                
                //date 안에 time DATA를 넣어줌
                const setTime = setTimeData(data.data)
                commit('SET_POST',setTime)
            })
        },

        CREATE_POST(_,{title, content, region, address, cost, capacity, date, time, visibility, CategoryId}) {
            return post.create(title, content, region, address, cost, capacity, date, time, visibility, CategoryId)
            .then(() => console.log('보내기 성공'))
        },


        async FETCH_POSTLIST({commit},{cateName}){
            return await postlist.fetch(cateName).then( response =>{
                //date에 time DATA를 넣어줌
                const Time = setTimeArr(response.data)

                //date를 기준으로 정렬
                const result = sortDate(Time)
 

                commit('SET_POSTLIST', result)
            })
        },
        
        REVICE_POST(_,{id, title, content, region, address, cost, capacity, date, time, visibility}){
            return post.revice(id, title, content, region, address, cost, capacity, date, time, visibility)
            .then(()=>console.log('수정 성공'))
        },        

        DELETE_POST(_,{id}){
            return post.delete(id)
            .then(()=>console.log('삭제 성공'))
        }

    },

}





/**시간 순으로 정렬 */
function sortDate(arr) {
    arr.sort((a,b) => new Date(a.date) - new Date(b.date))
    return arr
}

/**배열의 시간data를 날짜 data에 넣어줌 */
function setTimeArr(arr) {
    // const result = []
    
    for(let i = 0 ; i < arr.length;i++){
        
        const dateH = dayjs(arr[i].date)
        
        let Newdate = dateH.set('h', arr[i].time.slice(0,2)).format()
        
        const dateM = dayjs(Newdate)
        
        arr[i].date = dateM.set('m', arr[i].time.slice(3,5)).format() 
        // result.push(arr[i])
    }
    return arr
}

/**data의 시간data를 날짜 data에 넣어줌 */
function setTimeData(a) {
    // const result = []
    
        
        const dateH = dayjs(a.date)
        
        let Newdate = dateH.set('h', a.time.slice(0,2)).format()
        
        const dateM = dayjs(Newdate)
        
        a.date = dateM.set('m', a.time.slice(3,5)).format() 
        // result.push(arr[i])

    return a
}
