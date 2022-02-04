import React from "react";
import {FilmsType} from "../../redux/CardReducer";
import styles from './Card.module.css'
import noImage from '../../common/images/No-Image-Placeholder.svg.png'

type CardsPropsType = {
    card: FilmsType
}

export const Card = React.memo(({card}: CardsPropsType) => {
    return (<div className={styles.cardTable}>

        <img className={styles.image} alt=''
             src={card.Poster === 'N/A' ? noImage : card.Poster}
        />

        <table key={card.imdbID}>
            <tbody>
            <tr>
                <th>
                    <span className={styles.spanHeader}>Name</span>
                </th>
                <td>{card.Title}</td>
            </tr>

            <tr>
                <th>
                    <span className={styles.spanHeader}>Year</span>
                </th>
                <td>{card.Year}</td>
            </tr>
            <tr>
                <th>
                    <span className={styles.spanHeader}>imdbID</span>
                </th>
                <td>{card.imdbID}</td>
            </tr>
            <tr>
                <th>
                    <span className={styles.spanHeader}>Type</span>
                </th>
                <td>{card.Type}</td>
            </tr>

            </tbody>
        </table>
    </div>)

})