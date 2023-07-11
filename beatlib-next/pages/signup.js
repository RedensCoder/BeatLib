import Head from "next/head";
import Link from "next/link";
import {useForm} from "react-hook-form";

import {BiError} from "react-icons/bi"

import style from "../styles/auth.module.css";
import Auth from "../store/Auth";
import {useRedirect} from "../components/CustomHooks";
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

const Signup = ({data}) => {
    const {
        register,
        formState: {
            errors
        },
        handleSubmit,
    } = useForm()

    const onSubmit = (data) => {
        Auth.register(data);
    }

    if (data === "") {
        return (
            <>
                <Head>
                    <title>BEATLIB - Регистрация</title>
                </Head>
                <div className={style.wrapper}>
                    <Link href="/">
                        <h1>BEAT<span>LIB</span></h1>
                    </Link>
                    <p>Регистрация!</p>
                    <form onSubmit={handleSubmit(onSubmit)} className={style.wrapper__form} method="POST">
                        <label>Имя пользователя</label>
                        <input placeholder="Введите имя пользователя" required
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
                        <label>Адрес эл. почты</label>
                        <input type="email" placeholder="Введите ваш адрес электронной почты" required
                               {...register("email", {})}
                        />
                        <div>
                            {errors?.email && <p className={style.error}>
                                <BiError/>{errors?.email?.message || "Ошибка заполнения поля!"}</p>}
                        </div>
                        <label>Пароль</label>
                        <input type="password" placeholder="Введите пароль" required
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
                        <label>Подтвердите пароль</label>
                        <input type="password" placeholder="Введите пароль повторно" required
                               {...register("sub_password", {
                                   minLength: {
                                       value: 8,
                                       message: "Минимальное кол-во символов 8"
                                   }
                               })}
                        />
                        <div>
                            {errors?.sub_password && <p className={style.error}>
                                <BiError/>{errors?.sub_password?.message || "Ошибка заполнения поля!"}</p>}
                        </div>
                        <p className={style.form__info}>У вас есть аккаунт? <Link
                            href="/signin"><span>Авторизация</span></Link></p>
                        <button type="submit">Регистрация</button>
                        <p className={style.error}>{Auth.error}</p>
                    </form>
                </div>
            </>
        )
    } else {
        useRedirect("/");
    }
};

export default Signup;