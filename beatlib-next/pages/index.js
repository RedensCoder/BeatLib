import Head from "next/head";

import style from "../styles/nonatuh.module.css";
import Image from "next/image";

import img_one from "../assets/img_one.png";
import img_two from "../assets/img_two.png";
import img_three from "../assets/img_three.png";

import {SlSocialVkontakte} from "react-icons/sl";
import {AiOutlineYoutube, AiOutlineInstagram} from "react-icons/ai";
import {FaDiscord, FaMoneyBillWaveAlt} from "react-icons/fa"
import Link from "next/link";
import Header from "../components/Header";
import Aside from "../components/Aside";
import {BsPersonPlusFill, BsPlayFill} from "react-icons/bs";
import {MdDownloading} from "react-icons/md";

import style_a from "../styles/main.module.css";
import FetchStore from "../store/FetchStore";
import Scroll from "../store/Scroll";

export const getServerSideProps = async (context) => {
    const token = context.req.cookies["user"];

    if (token !== undefined) {
        return { props: {data: await FetchStore.getData(context)} }
    } else {
        const data = "";
        return { props: { data } }
    }
}

export default function HomePage(props) {
    if (props.data === "") {
        return (
            <>
                <Head>
                    <link rel="shortcut icon" href="../public/favicon.ico" type="image/x-icon"/>
                    <title>BEATLIB</title>
                </Head>
                <header className={style.header}>
                    <Link href="/">
                        <h1>BEAT<span>LIB</span></h1>
                    </Link>
                    <div className={style.header__auth}>
                        <Link href="/signin">
                            <button>Войти</button>
                        </Link>
                        <Link href="/signup">
                            <button>Зарегистрироваться</button>
                        </Link>
                    </div>
                </header>
                <div className={style.wrapper}>
                    <section className={style.wrapper__section__one}>
                        <div className={style.section__one}>
                            <Image src={img_one} alt="img" placeholder="blur"/>
                            <div className={style.section__text}>
                                <h3>НОВАЯ СОЦИАЛЬНАЯ СЕТЬ ДЛЯ БИТМЕЙКЕРОВ</h3>
                                <p>Общайся с такими же людьми как и ты, которые всем сердцем
                                    обожают делать музыку. Тут ты также сможешь найти много
                                    интересных людей, а также артистов, а артисты, в свою
                                    очередь, смогут познакомиться с битмейкерами.</p>
                            </div>
                        </div>
                        <div className={style.section__one}>
                            <div id="reverse" className={style.section__text}>
                                <h3>ЗИПИШИ СВОЙ ХИТ, ИСПОЛЬЗУЯ БЕСПЛАТНЫЕ БИТЫ</h3>
                                <p>На нашем сайте ты сможешь найти множество бесплатных
                                    битов разных жанров. Если ты артист у которого нет бюджета,
                                    то тебе подойдет именно этот раздел. Топовые битмейкеры
                                    ежедневно загружают сюда тонны контента.</p>
                            </div>
                            <Image src={img_two} alt="img" placeholder="blur"/>
                        </div>
                        <div className={style.section__one}>
                            <Image src={img_three} alt="img" placeholder="blur"/>
                            <div className={style.section__text}>
                                <h3>ОБЪЕДИНЯЙСЯ С ДРУГИМИ БИТМЕЙКЕРАМИ И СОЗДАВАЙ КОМАНДЫ</h3>
                                <p>Вы можете создать свою собсвенную команду битмейкеров
                                    и начать писать музыку уже вместе. Вы можете стать такими
                                    же известными, как 808 Mafia или Internet Money.
                                    Вместе вы завоюете индустрию музыки в России</p>
                            </div>
                        </div>
                    </section>
                </div>
                <section className={style.section__two}>
                    <p>НАЧНИ ЗАРАБАТЫВАТЬ НА СВОЁМ ТВОРЧЕСТВЕ <br/>УЖЕ СЕЙЧАС!</p>
                    <Link href="/signup">
                        <button>Зарегистрироваться!</button>
                    </Link>
                </section>
                <div className={style.wrapper}>
                    <section className={style.wrapper__social}>
                        <p>МЫ В СОЦ. СЕТЯХ</p>
                        <div className={style.social__social}>
                            <Link href="https://vk.com/beatlib" target="_blank"><SlSocialVkontakte/></Link>
                            <AiOutlineYoutube/>
                            <FaDiscord/>
                            <AiOutlineInstagram/>
                        </div>
                    </section>
                </div>
            </>
        );
    } else {
        return (
            <>
                <Head>
                    <title>BEATLIB</title>
                </Head>
                <Header avatar={props.data.avatar}/>
                <div onTouchMove={() => Scroll.scroll_fn(scrollY, innerHeight)} className={style_a.wrapper}>
                    <Aside />
                    <div className={style_a.wrapper__stats}>
                        <p>СТАТИСТИКА ЗА 7 ДНЕЙ</p>
                        <div className={style_a.stats__stats}>
                            <p><FaMoneyBillWaveAlt/> 0.00$ Прибыли</p>
                            <p><BsPersonPlusFill/> 0 Новых Подписчиков</p>
                            <p><BsPlayFill/> 0 Прослушиваний</p>
                            <p><MdDownloading/> 0 Скачиваний</p>
                        </div>
                    </div>
                </div>
                <props.player />
            </>
        );
    }
}