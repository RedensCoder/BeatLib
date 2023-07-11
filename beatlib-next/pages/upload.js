import Image from "next/image";
import Head from "next/head";

import style from "../styles/upload.module.css";

import Header from "../components/Header";
import axios from "axios";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {getCookie} from "cookies-next";
import FetchStore from "../store/FetchStore";
import {useParseJWT} from "../components/CustomHooks";

export const getServerSideProps = async (context) => {
    const token = context.req.cookies["user"];

    if (token !== undefined) {
        return {props: {data: await FetchStore.getData(context)}}
    } else {
        const data = "";
        return { props: { data } }
    }
}

const Upload = ({data}) => {
    const {
        register,
        formState: {
            errors
        },
        handleSubmit,
        reset
    } = useForm()

    const [img, setImg] = useState("");
    const [mp3, setMp3] = useState("");
    const [wav, setWav] = useState("");
    const [track, setTrack] = useState("");
    const [streaming, setStreaming] = useState("");

    const UploadBeat = async (data1) => {
        const file = new FormData();

        file.append("username", data.username)
        file.append("name", data1.name)
        file.append("descript", data1.descript)
        file.append("bpm", data1.bpm)
        file.append("mp3_price", data1.mp3_price)
        file.append("wav_price", data1.wav_price)
        file.append("track_price", data1.track_price)
        file.append("exclusive", data1.exclusive)
        file.append("avatar", img);
        file.append("streaming_src", streaming)
        file.append("mp3_src", mp3)
        file.append("wav_src", wav)
        file.append("track_src", track)

        const req = await axios.post("http://localhost:8080/api/v1/uploadbeat", await file, {
            headers: {
                "Authorization": getCookie("user"),
                "Content-Type": "multipart/form-data"
            }
        })
        await FetchStore.addUserExp(useParseJWT(getCookie("user")).username, 1);
        reset();
    }

    return(
        <>
            <Head>
                <title>BEATLIB - Публикация Бита</title>
            </Head>
            <Header avatar={data.avatar} />
        <div className={style.wrapper}>
            <div className={style.wrapper__form}>
                <form onSubmit={handleSubmit(UploadBeat)}>
                <div className={style.wrapper__flex}>
                    <div className={style.flex__info}>
                        <label className={style.label__label}>Название</label>
                        <input name="name" type="text" placeholder="Введите название бита" autoComplete="off" required
                               {...register("name")}
                        />
                            <label className={style.label__label}>BPM</label>
                            <input name="bpm" type="number" placeholder="Кол-во BPM" autoComplete="off" min="0" max="500" required
                                   {...register("bpm")}
                            />
                                <label className={style.label__label}>Описание</label>
                                <input name="description" type="text" placeholder="Опишите ваш бит" autoComplete="off"
                                       {...register("descript")}
                                />
                    </div>
                    <div className={style.flex__image}>
                        {img === "" ? <Image src={data.avatar} width={300} height={300} alt="beat_avatar" /> : <Image src={URL.createObjectURL(img)} width={300} height={300} alt="beat_avatar" />}
                            <input onChange={e => setImg(e.target.files[0])} className={style.form__file} id="file_upload" accept=".png, .jpg, .jpeg" type="file" name="avatar" required />
                                <label htmlFor="file_upload" className={style.file__button}>Изменить изображение</label>
                    </div>
                </div>
                <div className={style.wrapper__file}>
                    <div className={style.file__name}>
                        <div className={style.file__name__flex}>
                            <p>MP3</p>
                            <div className={style.price__price}>
                                <input name="mp3_price" type="number" placeholder="Введите цену" autoComplete="off" required
                                       {...register("mp3_price")}
                                />
                                    <p>₽</p>
                            </div>
                        </div>
                        <div className={style.file__name__flex}>
                            <p>WAV</p>
                            <div className={style.price__price}>
                                <input name="wav_price" type="number" placeholder="Введите цену" autoComplete="off" required
                                       {...register("wav_price")}
                                />
                                    <p>₽</p>
                            </div>
                        </div>
                        <div className={style.file__name__flex}>
                            <p>Track Out</p>
                            <div className={style.price__price}>
                                <input name="trackout_price" type="number" placeholder="Введите цену" autoComplete="off" required
                                       {...register("track_price")}
                                />
                                    <p>₽</p>
                            </div>
                        </div>
                        <div className={style.file__name__flex}>
                            <p>Exclusive</p>
                            <div className={style.price__price}>
                                <input name="exclusive_price" type="number" placeholder="Введите цену" autoComplete="off" required
                                       {...register("exclusive")}
                                />
                                    <p>₽</p>
                            </div>
                        </div>
                    </div>
                    <div className={style.file__price}>
                        <input onChange={e => setStreaming(e.target.files[0])} className={style.form__file} id="tagged_mp3_upload" type="file" accept=".mp3" name="tagged_mp3_file" required />
                            <label htmlFor="tagged_mp3_upload" className={style.file__button}>Загрузить Tagged MP3</label>
                            <input onChange={e => setMp3(e.target.files[0])} className={style.form__file} id="mp3_upload" type="file" accept=".mp3" name="mp3_file" required />
                                <label htmlFor="mp3_upload" className={style.file__button}>Загрузить MP3</label>
                                <input onChange={e => setWav(e.target.files[0])} className={style.form__file} id="wav_upload" type="file" accept=".wav" name="wav_file" required />
                                    <label htmlFor="wav_upload" className={style.file__button}>Загрузить WAV</label>
                                    <input onChange={e => setTrack(e.target.files[0])} className={style.form__file} id="trackout_upload" type="file" accept=".zip, .rar" name="track_out_file" required />
                                        <label htmlFor="trackout_upload" className={style.file__button}>Загрузить Track Out (ZIP)</label>
                    </div>
                </div>
                <button type="submit">Опубликовать</button>
            </form>
        </div>
        </div>
        </>
    );
}

export default Upload;