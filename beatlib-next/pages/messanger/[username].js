import Head from "next/head";
import Header from "../../components/Header";
import FetchStore from "../../store/FetchStore";
import {useRedirect} from "../../components/CustomHooks";
import Aside from "../../components/Aside";

import style from "../../styles/chat.module.css";
import Chat from "../../store/Chat";

export const getServerSideProps = async (context) => {
    const token = context.req.cookies["user"];

    if (token !== undefined) {
        let messages = [];
        for (let m of await Chat.getMessages(context)) {
            messages.push(m);
        }

        let sorted_messages = messages.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

        return { props: { data: await FetchStore.getData(context), msg: sorted_messages } }
    } else {
        const data = "";
        return { props: { data } }
    }
}

const Messages = ({data, msg}) => {
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
                            <div className={style.chat__companion}>

                                <p className={style.companion_name}>LadaBeatZ</p>
                            </div>
                            <div className={style.chat__messages}>
                                {
                                    msg.map(m =>
                                        m.from_msg === data.username ? <div key={m.id} className={style.from_msg}>{m.message}</div> : <div key={m.id} className={style.to_msg}>{m.message}</div>
                                    )
                                }
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

export default Messages;