import style from "../styles/account.module.css";
import FetchStore from "../store/FetchStore";
import Image from "next/image";
import Link from "next/link";

export const getServerSideProps = (context) => {
    return FetchStore.getUserData(context);
}

const UserBeats = (props) => {
    return (
        <>
            <div className={style.wrapper__beats}>
                <div className={style.beats__header}>
                    <p>Биты {props.username}</p>
                </div>
                <div className={style.beats__blocks}>
                    {
                        props.beats.map(b =>
                            <div className={style.beats_beat} key={b.id}>
                                <Image className={style.beats__img} src={b.avatar} alt="beat" width={250} height={250} />
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

export default UserBeats;