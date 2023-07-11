import {useEffect, useState} from "react";
import Link from "next/link";

import style from "../styles/aside.module.css";

import {HiNewspaper} from "react-icons/hi";

import {BsFillBarChartFill, BsFillPeopleFill} from "react-icons/bs";
import {AiFillMessage} from "react-icons/ai";
import {MdOutlinePiano} from "react-icons/md";
import {IoIosPeople} from "react-icons/io";
import {ImEqualizer2} from "react-icons/im";
import Scroll from "../store/Scroll";
import {observer} from "mobx-react-lite";

const Aside = observer(() => {
    const [mobile, setMobile] = useState(false);

    const MobileStyle = {
        top: Scroll.in_height + Scroll.scroll_y - 60
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (window.outerWidth > 425) {
                setMobile(false);
            } else {
                setMobile(true);

                Scroll.scroll_fn(scrollY, outerHeight)
            }
        }
    })

    const AdaptiveAsideMenu = () => {
            if (!mobile) {
                return (
                    <ul>
                        <li><HiNewspaper/><Link href="/feed"> Лента</Link></li>
                        <li><BsFillPeopleFill/><Link href="/following"> Подписки</Link></li>
                        <li><AiFillMessage/><Link href="/messanger"> Сообщения</Link></li>
                        <li><BsFillBarChartFill/><Link href="/charts"> Топ Чарты</Link></li>
                        <li><MdOutlinePiano/><Link href="/freebeats"> Бесплатные Биты</Link></li>
                        <li><IoIosPeople/><Link href="/union"> Объединения</Link></li>
                        <li><ImEqualizer2/><Link href="/studio"> Студия</Link></li>
                    </ul>
                )
            } else {
                return (
                    <ul>
                        <li><Link href="/feed"><HiNewspaper/></Link></li>
                        <li><Link href="/messenger"><AiFillMessage/></Link></li>
                        <li><Link href="/union"><IoIosPeople/></Link></li>
                        <li><Link href="/studio"><ImEqualizer2/></Link></li>
                    </ul>
                )
            }
    }

    return (
        <>
            <aside style={MobileStyle} className={style.aside}>
                <div className={style.navbar}>
                        <AdaptiveAsideMenu/>
                </div>
            </aside>
        </>
    );
});

export default Aside;