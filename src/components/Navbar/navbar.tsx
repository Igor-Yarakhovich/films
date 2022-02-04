import styles from './navbar.module.css'
import container from '../../styles/container.module.css'
import SuperInputText from "../../common/superInputText/SuperInputText";
import {Dispatch, SetStateAction} from "react";


type NavbarPropsType = {
    setSearchValue: Dispatch<SetStateAction<string>>
}

export const Navbar = ({setSearchValue}: NavbarPropsType) => {

    return <div className={styles.navbar}>
        <div className={`${styles.wrapper} ${container.container}`}>
            <div className={styles.header}>
                movie catalog
            </div>
            <SuperInputText
                type="text"
                required
                onChangeText={setSearchValue}
                placeholder='Search...'
                name={"Search"}
            />
            <div className={styles.user}>
                User
            </div>
        </div>
    </div>
}