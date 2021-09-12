import { create } from 'axios';
let url

if (process.env.NODE_ENV === 'development'){
    url = 'http://localhost:4000/'
} else {
    url = '/'
}

const api = create({
    baseURL: url
})

export default api