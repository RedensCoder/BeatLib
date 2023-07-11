import Head from "next/head";
import Image from "next/image";

import Header from "../../components/Header";

import style from "../../styles/edit.module.css";
import {useForm} from "react-hook-form";
import axios from "axios";
import {BiError} from "react-icons/bi";
import {useParseJWT} from "../../components/CustomHooks";
import {getCookie} from "cookies-next";
import {useState} from "react";
import FetchStore from "../../store/FetchStore";

export const getServerSideProps = async (context) => {
    const token = context.req.cookies["user"];

    if (token !== undefined) {
        return {props: {data: await FetchStore.getData(context)}};
    } else {
        const data = "";
        return { props: { data } }
    }
}

const Edit = ({data}) => {
    const {
        register,
        formState: {
            errors
        },
        handleSubmit,
        reset
    } = useForm()

    const [img, setImg] = useState("");

    const onSubmit = (data1) => {
        const file = new FormData();
        file.append("avatar", img)

        axios.post("http://localhost:8080/api/v1/changeUser", {
           "oldUsername": data.username,
            "username": data1.username,
            "password": data1.password,
            "about": data1.about
        }, {
            headers: {
                "Authorization": getCookie("user"),
                "Content-Type": "application/json"
            }
        }).then(res => {
            console.log(res)
            if (res.data === "user successful changed!") {
                axios.post(`http://localhost:8080/api/v1/uploadAvatar/${useParseJWT(getCookie("user")).username}`, file, {
                    headers: {
                        "Authorization": getCookie("user"),
                        "Content-Type": "multipart/form-data"
                    }
                });
            }
        });
        reset()
        location.reload()
    }

    return(
        <>
            <Head>
                <title>BEATLIB - Редактирование Профиля</title>
            </Head>
            <Header avatar={data.avatar} />
            <div className={style.wrapper}>
                <p className={style.header}>Настройки Профиля</p>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={style.wrapper__image}>
                                {img === "" ? <Image src={data.avatar} alt="avatar" width={200} height={200} /> : <Image src={URL.createObjectURL(img)} alt="avatar" width={200} height={200} />}
                                <input onChange={e => setImg(e.target.files[0])} className={style.form__file} accept="image/png, image/jpg, image/jpeg" id="file_upload" type="file" name="avatar" />
                                <label htmlFor="file_upload" className={style.file__button}>Изменить изображение</label>
                            </div>
                            <div className={style.form__form}>
                        <label>Логин</label>
                        <input type="text" name="username" placeholder="Логин / Отображаемое имя на сайте"
                               {...register("username", {
                                   minLength: {
                                       value: 5,
                                       message: "Минимальное кол-во символов 5"
                                   }
                               })}
                        />
                                <div>
                                    {errors?.username && <p className={style.error}>
                                        <BiError/>{errors?.username?.message || "Ошибка заполнения поля!"}</p>}
                                </div>
                            <label>Пароль</label>
                            <input type="password" name="password" placeholder="Введите пароль" required
                                   {...register("password", {
                                       minLength: {
                                           value: 8,
                                           message: "Минимальное кол-во символов 8"
                                       }
                                   })}
                            />
                                <div>
                                {errors?.password && <p className={style.error}>
                                    <BiError/>{errors?.password?.message || "Ошибка заполнения поля!"}</p>}
                            </div>

                                <label>Расскажите о себе</label>
                                <input type="text" name="about_user" autoComplete="off"
                                       {...register("about")}
                                />
                                    <button type="submit">Сохранить изменения</button>
                    </div>
                        </form>
            </div>
        </>
    );
}

export default Edit;