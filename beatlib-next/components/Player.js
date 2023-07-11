import style from "../styles/player.module.css";
import Image from "next/image";

import {BsFillPlayFill} from "react-icons/bs";
import {BiPause, BiSkipNext, BiSkipPrevious} from "react-icons/bi";
import {RiCloseFill} from "react-icons/ri";

import {createRef, useEffect, useState} from "react";
import PlayerStore from "../store/PlayerStore";
import {observer} from "mobx-react-lite";

const Player = observer (() => {
    const [play, setPlay] = useState(true);
    const [dur, setDur] = useState(0);

    const playerRef = createRef();
    const barRef = createRef();

    const next = () => {
        // if (index+1 > props.beats.length -1) {
        //     setIndex(0);
        // } else {
        //     setIndex(index + 1);
        // }

        setPlay(true);
        PlayerStore.setTime(0);
        //PlayerStore.setIndex(index);
    }

    const prev = () => {
        // if (index - 1 < 0) {
        //     setIndex(props.beats.length - 1);
        // } else {
        //     setIndex(index-1);
        // }

        setPlay(true);
        PlayerStore.setTime(0);
        //PlayerStore.setIndex(index);
    }

    const updatedProgress = (event) => {
        PlayerStore.setTime(event.target.currentTime)
        setDur(event.target.duration);
    }

    const setProgress = (event) => {
        const width = barRef.current.clientWidth;
        const clickX = event.nativeEvent.offsetX;

        playerRef.current.currentTime = (clickX / width) * dur;
    }

    const onPlay = () => {
        if (PlayerStore.currentTime !== 0) {
            playerRef.current.currentTime = PlayerStore.currentTime;
        }
    }

    useEffect(() => {
        playerRef.current.play();
        setPlay(true);
        playerRef.current.currentTime = 0;

    }, [PlayerStore.close]);

    return (
        <>
            <div className={PlayerStore.close ? style.player__active : style.player}>
                <Image className={style.player__img} src={PlayerStore.avatar} width={100} height={100} loading="lazy" alt="beat" />
                <audio onPlay={onPlay} onEnded={() => {next(); PlayerStore.setTime(0)}} onTimeUpdate={updatedProgress} ref={playerRef} src={PlayerStore.song}></audio>
                <div className={style.player__controls}>
                    <div className={style.controls__button}>
                        <BiSkipPrevious onClick={prev} />
                        {play ? <BiPause onClick={() => {setPlay(false); playerRef.current.pause()}} /> : <BsFillPlayFill onClick={() => {setPlay(true); playerRef.current.play()}}/> }
                        <BiSkipNext onClick={next} />
                    </div>
                    <div onClick={setProgress} ref={barRef} className={style.player__progressbar}>
                        <div style={{width: (PlayerStore.currentTime / dur) * 100 + "%"}} className={style.progressbar__progress}></div>
                    </div>
                </div>
                <RiCloseFill onClick={() => PlayerStore.setClose(false)} className={style.close} />
            </div>
        </>
    );
});

export default Player;