import Head from "next/head";
import Image from "next/image";

import style from "../styles/account.module.css";

import Header from "../components/Header";
import UserBeats from "../components/UserBeats";
import FetchStore from "../store/FetchStore";
import {useRedirect} from "../components/CustomHooks";
import Subscribes from "../store/Subscribes";

export const getServerSideProps = async (context) => {
    const token = context.req.cookies["user"];

    if (token !== undefined) {
        return {props: {data: await FetchStore.getUserData(context), sub_data: await Subscribes.getUserSub(context), stats: await FetchStore.getUserStats(context), avatar: await FetchStore.getData(context), beats: await FetchStore.getUserBeats(context), exp: await FetchStore.getUserExp(context)}}
    } else {
        return { props: { data: "" } }
    }
}

const User = ({data, sub_data, stats, avatar, beats, exp}) => {
    if (data !== "" && data.username !== avatar.username) {
        let find = false;

        return (
            <>
                <Head>
                    <title>BEATLIB - {data.username}</title>
                </Head>
                <Header avatar={avatar.avatar} />
                <div className={style.wrapper}>
                    <div className={style.wrapper__accountpanel}>
                        <Image src={data.avatar} width={195} height={195} alt="avatar"/>
                        <h6>{data.username}</h6>
                        <div className={style.level_bar}>
                            <div style={{width: exp.exp / exp.max_exp * 100 + "%"}} className={style.level_progres}><p className={style.level_info}>Уровень {data.level}</p></div>

                        </div>
                        <div className={style.accountpanel__buttons}>
                            {
                                sub_data.map(s => {
                                    if (s.follow_user === data.username) {
                                        find = true
                                    }
                                })
                            }
                            {
                                find !== false ? <button onClick={async () => Subscribes.unSubscribe(avatar.username, data.username)}>Отписаться</button> : <button onClick={async () => Subscribes.subscribe(avatar.username, data.username)}>Подписаться</button>
                            }

                            <button>Написать сообщение</button>
                        </div>
                        <p className={style.headerline}>Обо мне</p>
                        <p className={style.subtitle}>{data.about}</p>
                        <p className={style.headerline}>Статистика</p>
                        <p className={style.subtitle}>Подписчики: {stats.subs}</p>
                        <p className={style.subtitle}>Прослушивания: {stats.listeners}</p>
                    </div>
                <UserBeats username={data.username} beats={beats} />
                </div>
            </>
        );
    } else {
        useRedirect("/");
    }
}

export default User;