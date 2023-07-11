import Link from "next/link";
import Image from "next/image";

import style from "../styles/header.module.css";

import {BiSearchAlt2} from "react-icons/bi";
import {FaShoppingCart} from "react-icons/fa";

const Header = (props) => {
    return (
        <>
            <header className={style.header}>
                <div className={style.header__header}>
                    <Link href="/">
                        <h1>BEAT<span>LIB</span></h1>
                    </Link>
                    <form method='GET' action='/search'>
                        <div className={style.search_box}>
                            <input className={style.search_text} type="text" name="search" placeholder="Что вы ищите?"
                                   autoComplete='off'
                                   required />
                                <button type='submit'><BiSearchAlt2/></button>
                        </div>
                    </form>
                    <Link className={style.basket} href="/basket">
                        <FaShoppingCart/>
                    </Link>
                </div>
                <Link href='/account'><Image className={style.avatar} src={props.avatar} width={70} height={70} alt="avatar" /></Link>
            </header>
        </>
    );
}

export default Header;