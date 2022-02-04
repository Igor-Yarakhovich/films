import React from "react";
import spinner from "./preloader.gif"
import styles from './Preloader.module.css'

export let Preloader = () => {

    return <div className={styles.preloader}>
        <img alt='' src={spinner}/>
    </div>
}