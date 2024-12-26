import { useState, useEffect } from "react"
import arrowUpRight from '../assets/arrow-up-right-01.png'
import darkMode from '../assets/light-mode_svgrepo.com (2).png'
// import lightMode from '../../public/'

import { Link } from 'react-scroll';

const Header = () => {
    const [theme, setTheme] = useState('')

    const wdwdSolorScheme = window.matchMedia('(prefers-color-scheme: dark)')

    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    useEffect(() => {
        if (localStorage.theme === 'dark' || theme == "dark") {
            document.documentElement.classList.add('dark')
            setTheme('dark')
            console.log("add dark class");

        } else {
            document.documentElement.classList.remove('dark')
            setTheme('')
            console.log("remove dark class");
        }
    }, [localStorage.theme, theme])

    useEffect(() => {
        if (wdwdSolorScheme.matches) {
            document.documentElement.classList.add('dark')
            setTheme('dark')
            console.log("add dark class");
        }

        //   return () => {
        //     second
        //   }
    }, [])

    wdwdSolorScheme.addEventListener('change', (e) => {
        console.log(e)
        if (e.matches) {
            document.documentElement.classList.add('dark')
            console.log("add dark class");
        } else {
            document.documentElement.classList.remove('dark')
            console.log("remove dark class");
        }
    })

    return (
        <header className="z-[99999] md:sticky top-5 md:flex justify-between items-center md:gap-24">

            <ul className="z-10 hover:text-[#9410D2] md:relative fixed right-[4%] left-[4%] md:left-auto md:right-auto top-5 md:top-0 dark:bg-[#030303] dark:text-white bg-[#dedede] text-[#030303] flex flex-1 justify-between items-center md:px-12 md:py-3 p-3 rounded-lg border-solid border">
                <li><Link
                    activeClass="active"
                    to="about"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={700}
                    href="about"
                    className="hover:text-[#9410D2] duration-500 active:text-[#9410D2]">About Me</Link></li>
                <li>
                    <Link
                        activeClass="active"
                        to="qualifications"
                        spy={true}
                        smooth={true}
                        offset={-100}
                        duration={700}
                        href="qualifications"
                        className="hover:text-[#9410D2] duration-500 active:text-[#9410D2]" >Qualifications</Link>
                </li>
                <li>
                    <Link
                        activeClass="active"
                        to="portfolio"
                        spy={true}
                        smooth={true}
                        offset={-100}
                        duration={700}
                        href="portfolio"
                        className="hover:text-[#9410D2] duration-500 active:text-[#9410D2]" >Portfolio</Link>
                </li>
                <li>
                    <Link
                        activeClass="active"
                        to="contact"
                        spy={true}
                        smooth={true}
                        offset={-100}
                        duration={700}
                        href="contact"
                        className="hover:text-[#9410D2] duration-500 active:text-[#9410D2]" >Contact</Link>
                </li>
            </ul>

            <ul className="dark:bg-[#030303] relative mt-16 md:mt-0 dark:text-white bg-[#dedede] text-[#030303] flex justify-between items-center gap-5 px-12 py-3 rounded-lg border-solid border">
                <li><a className="flex items-center justify-center gap-1 px-2 py-1 rounded-md bg-[#9410D2]" href='/abdullahi-resume.pdf' download='Abdullahi Mohammed Resume' target="_blank"><p>Resume</p> <img className="w-5" src={arrowUpRight} alt="" /></a></li>
                <li><button className="m-auto p-1 rounded-md bg-[#9410D2]" onClick={() => {
                    setTheme(prev => prev == "" ? "dark" : "")
                }}><img src={darkMode} alt="" /> </button></li>
            </ul>
        </header>
    )
}

export default Header