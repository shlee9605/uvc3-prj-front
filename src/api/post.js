import { request} from '../api'



export const post =  {
    create(title, content, region, address, cost, capacity, date, time, visibility, CategoryId) {
        return request('post', '/post',{title, content, region, address, cost, capacity, date, time, visibility, CategoryId})
    }
}
