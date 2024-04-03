import Card from "./card"
import abdullahi_picture from "../assets/Frame 72.png";

// import { Element } from 'react-scroll';



const Hero = () => {
    return (

        // <Element name="about" className="element">

        <div id="about" className="mt-5">
            <Card dataAos="fade" className="">
                <div><p className="px-2 py-1 rounded-md bg-[#9410D2] w-fit">Hi, I’m</p></div>
                <p><span className="text-[20px] md:text-[24px] font-bold">Abdullahi Mohammed -</span> <span>A Full-Stack Web Developer</span></p>
                <p className="mt-1">I am committed to developing high-quality websites that’s responsive from desktop to mobile screens that align with your brand identity, user experience goals and industry standards.</p>
            </Card>

            <ul className="mt-5 flex flex-col md:flex-row justify-between items-center gap-10">
                <li className="mx-auto">
                    <img className="w-[400px]" src={abdullahi_picture} alt="Abdullahi Picture" />
                </li>
                <li className="flex-1 w-full md:w-auto">
                    <Card className="py-8">
                        <p className="px-2 py-1 rounded-md bg-[#9410D2] w-fit mb-1">I will</p>
                        <ul className="list-disc ml-5">
                            <li>develop a landing page.</li>
                            <li>develop a custom website.</li>
                            <li>maintain and optimize website.</li>
                            <li>develop an e-commerce website.</li>
                            <li>build a  wix website using wix editor</li>
                            <li>build wordpress webste using elementor</li>
                        </ul>
                        <p className="px-2 py-1 rounded-md bg-[#9410D2] w-fit mt-4 mb-4 md:mb-auto
                        ">Send your proposals to</p>
                        <ul className="flex items-center justify-center gap-5">
                            <li><a href="https://www.upwork.com/freelancers/abdullahimohammed" target="_blank" className="flex p-3 items-center justify-center rounded-md dark:bg-[#161616] dark:text-white bg-[#bebebe] text-[#030303] dark:hover:bg-[#2e2e2e] hover:bg-[#9e9e9e] transition-all duration-300 w-fit"><svg xmlns="http://www.w3.org/2000/svg" className="dark:stroke-white stroke-black" width="60" height="48" fill="none"><path stroke="" stroke-linecap="round" stroke-linejoin="round" stroke-width="9" d="M5 5v15.833c0 5.175 4.269 9.5 9.375 9.5s9.375-4.325 9.375-9.5V5c3.125 7.917 8.991 25.333 20.313 25.333C50.02 30.333 55 25.287 55 19.25S50.02 8.167 44.062 8.167c-6.334 0-10.084 4.75-10.937 9.5C32.369 21.878 28.437 43 28.437 43" /></svg></a></li>
                            <li><a href="https://www.fiverr.com/abdullahi_code" target="_blank" className="flex p-3 items-center justify-center rounded-md dark:bg-[#161616] dark:text-white bg-[#bebebe] text-[#030303] dark:hover:bg-[#2e2e2e] hover:bg-[#9e9e9e] transition-all duration-300 w-fit"><svg xmlns="http://www.w3.org/2000/svg" className="dark:fill-white" width="50" height="50" version="1.0" viewBox="0 0 512 512"><path d="M213.5.6c-34.3 3.9-59.8 14.5-84.2 35.4-18.7 15.9-35.3 41.6-42.7 66.1-4 13.2-5.6 23.8-6.3 41.6l-.6 16.3H16v96h64v160H16v96h224v-96h-64V256h161v160h-65v96h224v-96h-64V160H176v-9.9c0-12.8 1.2-19 5.5-27.7 6.2-12.6 19.5-22.7 33.4-25.4 3-.5 17-1 31.2-1H272V0l-27.7.1c-15.3.1-29.1.4-30.8.5z" /><path d="M377.5.6c-6.8 1.1-15.9 4.8-21.5 9C334.8 25.2 330.1 55 345.6 76c19.1 26 57.7 26 76.8 0 15.5-21 10.8-50.8-10.4-66.4-9.1-6.8-23.9-10.6-34.5-9z" /></svg></a>
                            </li>
                            <li><a href="https://www.linkedin.com/in/abdullahi-mohammed-website-developer/" target="_blank" className="flex p-3 items-center justify-center rounded-md dark:bg-[#161616] dark:text-white bg-[#bebebe] text-[#030303] dark:hover:bg-[#2e2e2e] hover:bg-[#9e9e9e] transition-all duration-300 w-fit"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" className="dark:fill-white" ><path d="M6.25 18.75H5c-2.357 0-3.536 0-4.268.732C0 20.215 0 21.393 0 23.75V45c0 2.357 0 3.535.732 4.268C1.464 50 2.643 50 5 50h1.25c2.357 0 3.535 0 4.268-.732.732-.733.732-1.911.732-4.268V23.75c0-2.357 0-3.535-.732-4.268-.733-.732-1.911-.732-4.268-.732ZM11.25 5.625a5.625 5.625 0 1 1-11.25 0 5.625 5.625 0 0 1 11.25 0ZM25.815 18.75H23.75c-2.357 0-3.535 0-4.268.732-.732.733-.732 1.911-.732 4.268V45c0 2.357 0 3.535.732 4.268.733.732 1.911.732 4.268.732H25c2.357 0 3.535 0 4.268-.732C30 48.535 30 47.357 30 45v-8.75c0-4.142 1.32-7.5 5.22-7.5 1.95 0 3.53 1.68 3.53 3.75v11.25c0 2.357 0 3.536.732 4.268.732.732 1.91.732 4.268.732h1.247c2.356 0 3.534 0 4.267-.732.732-.732.732-1.91.733-4.267L50 30.001c0-6.213-5.91-11.25-11.758-11.25-3.33 0-6.3 1.632-8.242 4.184 0-1.575 0-2.363-.342-2.947a2.5 2.5 0 0 0-.896-.896c-.584-.342-1.372-.342-2.947-.342Z" /></svg></a></li>
                        </ul>
                        <p className="px-2 py-1 rounded-md bg-[#9410D2] w-fit my-1 ml-auto mr-0 md:mr-[10%] mt-4 md:mt-auto">And get a Quote</p>
                    </Card>
                </li>
            </ul>
        </div>
        // </Element>
    )
}

export default Hero