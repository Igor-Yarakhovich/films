import {Dispatch} from 'redux';
import {cardApi} from "../api/CardApi";


const initialState = {
    status: 'loading' as RequestStatusType,
    films: [] as Array<FilmsType>,
    searchValue: 'batman',
    totalFilmsCount: 0,
    currentPage: 1,
    pageSize: 10,
    error: null as ErrorType
};


export const cardReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'cards/FETCH_FILMS':
            return {...state, films: action.films}

        case 'cards/SET_STATUS':
            return {...state, status: action.status}

        case 'cards/SET_SEARCH_VALUE':
            return {...state, searchValue: action.searchValue}

        case 'cards/SET_TOTAL_FILMS_COUNT':
            return {...state, totalFilmsCount: action.totalFilmsCount}

        case 'cards/SET_CURRENT_PAGE_COUNT':
            return {...state, currentPage: action.currentPage}

        case 'cards/SET_ERROR':
            return {...state, error: action.error}
        default: {
            return state
        }
    }
}

// actions
export const setFilmsAC = (films: Array<FilmsType>) =>
    ({type: 'cards/FETCH_FILMS', films} as const)

export const setStatusAC = (status: RequestStatusType) =>
    ({type: 'cards/SET_STATUS', status} as const)

export const setSearchValueAC = (searchValue: string) =>
    ({type: 'cards/SET_SEARCH_VALUE', searchValue} as const)

export const setTotalFilmsCountAC = (totalFilmsCount: number) =>
    ({type: 'cards/SET_TOTAL_FILMS_COUNT', totalFilmsCount} as const)

export const setCurrentPageAC = (currentPage: number) =>
    ({type: 'cards/SET_CURRENT_PAGE_COUNT', currentPage} as const)

export const setErrorAC = (error: ErrorType) =>
    ({type: 'cards/SET_ERROR', error} as const)


// thunks
export const fetchFilmsTC = (title: string, pageNumber: number) => async (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    try {
        let data = await cardApi.getFilms(title, pageNumber)
        dispatch(setFilmsAC(data.data.Search))
        dispatch(setTotalFilmsCountAC(+data.data.totalResults))
        dispatch(setSearchValueAC(title))
        if (data.data.Error)
            dispatch(setErrorAC(data.data.Error))

    } catch (err) {
        dispatch(setErrorAC(err))
    } finally {
        dispatch(setStatusAC('succeeded'))
    }
}


// types
type InitialStateType = typeof initialState;

type ActionType = ReturnType<typeof setFilmsAC>
    | ReturnType<typeof setStatusAC>
    | ReturnType<typeof setSearchValueAC>
    | ReturnType<typeof setTotalFilmsCountAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setErrorAC>

export type RequestStatusType = 'idle' | 'loading' | 'succeeded'

export type dataType = {
    Search: Array<FilmsType>,
    totalResults: string,
    Response: string
    Error?: null | string
    // films: FilmsType
}
export type ErrorType = string | null | unknown
export type FilmsType = {
    Title: string,
    Year: string,
    imdbID: string,
    Type: string,
    Poster: string
}

