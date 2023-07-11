import Header from "../components/Header";
import Image from "next/image";
import Head from "next/head";

import style from "../styles/search.module.css";

const Search = () => {
    return (
        <>
            <Head>
                <title>BEATLIB - Поиск</title>
            </Head>
            <Header/>
            <div className={style.wrapper}>
                <h1>Битмейкеры</h1>
                <div className={style.wrapper__beatmakers}>
                    <div className={style.beatmakers__beatmaker}>
                        <Image src="" alt="avatar"/>
                            <div className={style.beatmaker__info}>
                                <div className={style.beatmaker__buttons}>
                                    <p className={style.beatmaker__name}>LadaBeatZ</p>
                                    <a href="">
                                        <button>Перейти в профиль</button>
                                    </a>
                                </div>
                                <p className={style.beatmaker__about}>Описание битмаряОписание битмаряОписание битмаряОписание
                                    битмаряОписание
                                    битмаряОписание битмаряОписание битмаряОписание битмаряОписание битмаряОписание
                                    битмаря</p>
                            </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Search;