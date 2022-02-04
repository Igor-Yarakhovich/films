import axios from "axios";
import {dataType} from "../redux/CardReducer";

export const instance = axios.create({
    baseURL: 'https://www.omdbapi.com/',
    // withCredentials: true
})

export const cardApi = {
    getFilms(title: string, pageNumber: number) {
        return instance.get<dataType>(`?i=tt3896198&apikey=8523cbb8&s=${title}&page=${pageNumber}`, {})
    }
}
