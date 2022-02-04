import React, {useEffect, useState} from 'react';
import styles from './App.module.css';
import container from '../styles/container.module.css'
import {Navbar} from "../components/Navbar/navbar";
import {Card} from "../components/Card/Card";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../redux/store";
import {ErrorType, fetchFilmsTC, FilmsType, RequestStatusType, setCurrentPageAC} from "../redux/CardReducer";
import {Preloader} from "../common/Preloader/Preloader";
import Pagination from "../common/Pagination/Pagination";

function App() {

    const films = useSelector<AppRootStateType, Array<FilmsType>>(state => state.cardReducer.films)
    const totalItemsCount = useSelector<AppRootStateType, number>(state => state.cardReducer.totalFilmsCount)
    const currentPage = useSelector<AppRootStateType, number>(state => state.cardReducer.currentPage)
    const pageSize = useSelector<AppRootStateType, number>(state => state.cardReducer.pageSize)
    const error = useSelector<AppRootStateType, ErrorType>(state => state.cardReducer.error)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.cardReducer.status)

    const dispatch = useDispatch()

    const [searchValue, setSearchValue] = useState<string>('batman')

    const processedSearchValue = searchValue.toLowerCase().trim()

    const [width, setWidth] = useState(window.innerWidth)
    window.addEventListener('resize', () => {
        setWidth(window.innerWidth)
    })

    useEffect(() => {
        let timer = setTimeout(() => dispatch(fetchFilmsTC(processedSearchValue, 1)), 1000)
        return () => clearTimeout(timer)
    }, [processedSearchValue, dispatch])

    const onPageChanged = (pageNumber: number) => {
        dispatch(setCurrentPageAC(pageNumber))
        dispatch(fetchFilmsTC(processedSearchValue, pageNumber))
    }

    if (status === 'loading') {
        return <Preloader/>
    }

    const widthDevice = width > 767 ? 10 : 5

    return (
        <div className={styles.App}>
            <Navbar setSearchValue={setSearchValue}/>
            <div className={`${styles.inputValue}' ${container.container}`}>
                <div className={styles.search}>You searched for
                    : {processedSearchValue}, {totalItemsCount
                        ? totalItemsCount + ' results found' : "returned no results"} </div>
            </div>
            {
                films
                    ? <div className={styles.CardsContainer}>
                        {
                            films.map((el) => {
                                return <Card card={el} key={el.imdbID}/>
                            })
                        }
                    </div>
                    : <div className={`${styles.Error} ${container.container}`}>Error: {error}</div>
            }

            <div className={styles.Pagination}>
                <Pagination totalItemsCount={totalItemsCount}
                            currentPage={currentPage}
                            pageSize={pageSize}
                            onPageChanged={onPageChanged}
                            portionSize={widthDevice}
                />
            </div>
        </div>
    );
}

export default App;
