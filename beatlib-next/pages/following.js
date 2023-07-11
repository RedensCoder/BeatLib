import FetchStore from "../store/FetchStore";
import Header from "../components/Header";
import Head from "next/head";
import Aside from "../components/Aside";

import style from "../styles/following.module.css";
import Subscribes from "../store/Subscribes";
import {useRedirect} from "../components/CustomHooks";
import Image from "next/image";
import Link from "next/link";
import Scroll from "../store/Scroll";

export const getServerSideProps = async (context) => {
    const token = context.req.cookies["user"];

    if (token !== undefined) {
        let sub_datas = [];
        let sub = await Subscribes.getUserSub(context);

        for (let s of sub) { sub_datas.push(await FetchStore.getUserByName(s.follow_user, token)) }

        return { props: { data: await FetchStore.getData(context),  sub: sub, sub_data: sub_datas} }
    } else {
        const data = "";
        return { props: { data } }
    }
}

const Following = ({data, sub, sub_data}) => {
    if (data !== "") {
        return <>
            <Head>
                <title>BEATLIB - Подписки</title>
            </Head>
            <Header avatar={data.avatar}/>
            <div onTouchMove={() => Scroll.scroll_fn(scrollY, outerHeight)} className={style.main_flex}>
                <Aside/>
                <div className={style.main__follow}>
                    <div className={style.following}>
                        <p className={style.label}>Подписки</p>
                        <div className={style.following__following}>
                            {
                                sub.map(s =>
                                    <div className={style.follow} key={s.id}>
                                        <Link href={"/" + s.follow_user}>
                                        <Image src={sub_data.filter(d => d.username === s.follow_user)[0].avatar} width={300} height={300} alt="follow"/>
                                        <div className={style.follow_info}>
                                            <p className={style.follow__username}>{s.follow_user}</p>
                                            <div className={style.follow_lvl}>
                                                <p>{sub_data.filter(d => d.username === s.follow_user)[0].level}</p>
                                            </div>
                                        </div>
                                        </Link>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    } else {
        useRedirect("/");
    }
}

export default Following;