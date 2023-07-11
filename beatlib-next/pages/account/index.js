import Header from "../../components/Header";
import Image from "next/image";

import Link from "next/link";
import Head from "next/head";

import style from "../../styles/account.module.css";
import Beats from "../../components/Beats";
import {deleteCookie} from "cookies-next";
import FetchStore from "../../store/FetchStore";
import {useRedirect} from "../../components/CustomHooks";

export const getServerSideProps = async (context) => {
    const token = context.req.cookies["user"];

    if (token !== undefined) {
        return { props: { data: await FetchStore.getData(context), stats: await FetchStore.getStats(context), beats: await FetchStore.getBeats(context), exp: await FetchStore.getExp(context) } }
    } else {
        const data = "";
        return { props: { data } }
    }
}
//{data, stats, beats, exp}
const Index = (props) => {
    const logoff = () => {
        deleteCookie("user");
    }

    if (props.data !== "") {
        return (
            <>
                <Head>
                    <title>BEATLIB - {props.data.username}</title>
                </Head>
                <Header avatar={props.data.avatar} />
                <div className={style.wrapper}>
                    <div className={style.wrapper__accountpanel}>
                        <Image src={props.data.avatar} width={195} height={195} alt="avatar" />
                        <h6>{props.data.username}</h6>
                        <div className={style.level_bar}>
                            <div style={{width: props.exp.exp / props.exp.max_exp * 100 + "%"}} className={style.level_progres}><p className={style.level_info}>Уровень {props.data.level}</p></div>

                        </div>
                        <Link href="/account/edit">
                            <button>Редактировать профиль</button>
                        </Link>
                        <p className={style.headerline}>Обо мне</p>
                        <p className={style.subtitle}>{props.data.about}</p>
                        <p className={style.headerline}>Статистика</p>
                        <p className={style.subtitle}>Подписчики: {props.stats.subs}</p>
                        <p className={style.subtitle}>Прослушивания: {props.stats.listeners}</p>
                        <Link href="/pages">
                            <button onClick={logoff} id="quit">Выйти</button>
                        </Link>
                    </div>

                <Beats beats={props.beats} />
                </div>
                <props.player />
            </>
        );
    } else {
        useRedirect("/");
    }
}

export default Index;