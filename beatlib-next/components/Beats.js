import style from "../styles/account.module.css";

import Link from "next/link";
import Image from "next/image";

import {FaPlay, FaPause} from "react-icons/fa";
import PlayerStore from "../store/PlayerStore";

const Beats = (props) => {
    return (
        <>
            <div className={style.wrapper__beats}>
                <div className={style.beats__header}>
                    <p>Ваши Биты</p>
                    <Link href="/upload">
                        <button>Загрузить бит</button>
                    </Link>
                </div>
                <div className={style.beats__blocks}>
                    {
                        props.beats.map((b, indx) =>
                            <div className={style.beats_beat} key={b.id}>
                                <div className={style.img__but}>
                                    {indx === PlayerStore.index ? <FaPause className={style.play_but_pause} /> : <FaPlay onClick={() => {PlayerStore.setSong(b.mp3_src); PlayerStore.setAvatar(b.avatar); PlayerStore.setClose(true)}} className={style.play_but} /> }
                                    <Image className={style.beats__img} src={b.avatar} alt="beat" width={250} height={250} />
                                </div>
                                <div className={style.beats__info}>
                                    <div className={style.block__flex}>
                                        <p className={style.price}>{b.mp3_price} Руб</p>
                                        <p>-</p>
                                        <p className={style.bpm}>{b.bpm} BPM</p>
                                    </div>
                                    <p className={style.beat_name}>{b.name}</p>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    );
}

export default Beats;