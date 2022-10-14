//게시글
import { post } from '../api/post'



export const Post = {

    state: {

    },

    mutations: {

    },

    actions: {
        CREATE_POST(_,{title, content, region, address, cost, capacity, date, time, visibility, CategoryId}) {
            return post.create(title, content, region, address, cost, capacity, date, time, visibility, CategoryId)
            .then(() => console.log('보내기 성공'))
        }

    },

}