import Link from "next/link";
import Head from "next/head";

import style from "../styles/auth.module.css";
import {useForm} from "react-hook-form";
import {BiError} from "react-icons/bi";
import {useState} from "react";
import {useRedirect} from "../components/CustomHooks";
import Auth from "../store/Auth";
import FetchStore from "../store/FetchStore";

export const getServerSideProps = async (context) => {
    const token = context.req.cookies["user"];

    if (token !== undefined) {
        return { props: { data: await FetchStore.getData(context) } }
    } else {
        const data = "";
        return { props: { data } }
    }
}

const Signin = ({data}) => {
    const [error, setErorr] = useState("")

    const {
        register,
        formState: {
            errors
        },
        handleSubmit,
    } = useForm()

    const onSubmit = async (data) => {
        await Auth.auth(data);
    }

    if (data === "") {
        return (
            <>
                <Head>
                    <link rel="shortcut icon" href="../public/favicon.ico" type="image/x-icon"/>
                    <title>BEATLIB - Авторизация</title>
                </Head>
                <div className={style.wrapper}>
                    <Link href="/">
                        <h1>BEAT<span>LIB</span></h1>
                    </Link>
                    <p>Авторизация!</p>
                    <form onSubmit={handleSubmit(onSubmit)} className={style.wrapper__form} method="POST">
                        <label>Имя пользователя</label>
                        <input name="username" placeholder="Введите имя пользователя" required
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
                        <input name="password" type="password" placeholder="Введите пароль" required
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
                        <p className={style.form__info}>У вас ещё нет аккаунта? <Link
                            href="/signup"><span>Регистрация</span></Link></p>
                        <button type="submit">Войти</button>
                        <p className={style.error}>{Auth.error}</p>
                    </form>
                </div>
            </>
        );
    } else {
        useRedirect("/")
    }
};

export default Signin;