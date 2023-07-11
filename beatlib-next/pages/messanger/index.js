import Head from "next/head";
import Header from "../../components/Header";
import FetchStore from "../../store/FetchStore";
import {useRedirect} from "../../components/CustomHooks";
import Aside from "../../components/Aside";

import style from "../../styles/chat.module.css";
import Chat from "../../store/Chat";
import Link from "next/link";

export const getServerSideProps = async (context) => {
    const token = context.req.cookies["user"];

    if (token !== undefined) {
        return { props: { data: await FetchStore.getData(context), chats: await Chat.getChats(context)} }
    } else {
        const data = "";
        return { props: { data } }
    }
}

const Index = ({data, chats}) => {
    if (data !== "") {
        return (
            <>
                <Head>
                    <title>Beatlib - Мессенджер</title>
                </Head>
                <Header avatar={data.avatar} />
                <div className={style.main_flex}>
                    <Aside />
                    <div className={style.chat}>
                        <p className={style.label}>Чат</p>
                        <div className={style.chat__chat}>
                            <div className={style.chat__chats}>
                                {
                                    chats.map(c => {
                                        if (c.user_one === data.username) {
                                            return (
                                                <div key={c.id} className={style.chats__user}>
                                                    <Link href={"/messanger/" + c.user_two}
                                                          className={style.user_user}>{c.user_two}</Link>
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div key={c.id} className={style.chats__user}>
                                                    <Link href={"/messanger/" + c.user_one}
                                                          className={style.user_user}>{c.user_one}</Link>
                                                </div>
                                            )
                                        }
                                    }
                                    )
                                }
                            </div>
                            <div className={style.chat__companion}>
                                <p className={style.companion_name}>LadaBeatZ</p>
                            </div>
                            <div className={style.chat__messages}>

                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        useRedirect("/");
    }
}

export default Index;