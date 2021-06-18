import axios from "axios";


const moveDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: 'f8dbd6b2f077078e35d8ced417078c09',
        language: 'es-ES'
    }
});

export default moveDB;