import Card from "./card"
// import htmldemo from "../assets/HTMLDemo.png";
import wowtouche from '../assets/wowtouche.png'
import burgerapp from "../assets/burgerapp.png";
import greencandlestick from "../assets/greencandlestick.png";
import breej from "../assets/breej.png";
import tipcalculator from "../assets/tipcalculator.png";
import plut from "../assets/plut.png";

const Portfolio = () => {

    const projects = [{
        heading: "wowtouche",
        image: wowtouche,
        paragraph: "Wowtouche is a hair braiding place that is built to enhance the business sales. And it has improved sales by 80%",
        stacks: [{ stack: "wix" }, { stack: "wix editor" }],
        links: [{ title: "GitHub: private", link: "#" }, { title: "Website", link: "https://www.wowtouche.com/" }]
    }, {
        heading: "Burger Builder",
        image: burgerapp,
        paragraph: "i built this app when i was learning react from jonas schmedtmann course.",
        stacks: [{ stack: "react" }, { stack: "firebase" }],
        links: [{ title: "GitHub", link: "https://github.com/mabdul45/burger-app" }, { title: "Website", link: "https://burger-app-delta.vercel.app/" }]
    },
    {
        heading: "Green Candle Stick",
        image: greencandlestick,
        paragraph: "Green candle stick is a web3 staking dapp. Users can connect their wallets, stake and claim tokens. its secured.",
        stacks: [{ stack: "react" }, { stack: "web3.js" }],
        links: [{ title: "GitHub", link: "https://github.com/mabdul45/green-candle-stick-demo" }, { title: "Website", link: "https://green-candle-stick-demo.vercel.app/" }]
    },
    {
        heading: "Tip Calculator",
        image: tipcalculator,
        paragraph: "tip calcultor is a web app that is used to calculate individual tips based on input. it's built from frontend mentor.",
        stacks: [{ stack: "react" }],
        links: [{ title: "GitHub", link: "https://github.com/mabdul45/tip-calculator" }, { title: "Website", link: "https://tip-calculator-mabdul45.vercel.app/" }]
    },
    {
        heading: "Breej",
        image: breej,
        paragraph: "breej is a platform for freelancers. it's not only for selling of services but also products. I helped built the buying and swapping features of this website.",
        stacks: [{ stack: "Next.js" }, { stack: "TypeScript" }, { stack: "TailwindCSS" }],
        links: [{ title: "GitHub: private repo", link: "#" }, { title: "Website", link: "https://breej.io/" }]
    },
    {
        heading: "Plut",
        image: plut,
        paragraph: "plut is a platform for selling giftcards and coins. I helped integrate content management sysytem into this website whiich made it possible for the client to be able to change contents on the website easily.",
        stacks: [{ stack: "React.js" }, { stack: "TypesScript" }, { stack: "Ionic Framework" }, { stack: "Firebase" }],
        links: [{ title: "GitHub: private repo", link: "#" }, { title: "Website", link: "https://plut.ng/" }]
    },
    ]

    return (
        <section id="portfolio" className="mt-10 md:mt-20 scroll-mt-[120px]">
            <div>
                <p>Projects Done</p>
                <h1 className="font-bold text-[20px] md:text-[24px]">Portfolio</h1>
            </div>
            <div className="flex mt-5 justify-between flex-wrap gap-2 gap-y-5">
                {
                    projects.map((project, i) => {
                        return <Card className="hover:scale-110 hover:transition-transform hover:duration-300 hover:transform-cpu w-[290px] flex gap-1 flex-col basis-[290px] flex-1" key={i}>
                            <img className="rounded-lg object-cover" src={project.image} alt="" />
                            <h4 className="font-bold">{project.heading}</h4>
                            <p>{project.paragraph}</p>
                            <ul className="flex gap-2">
                                {project.stacks.map((stack, i) => {
                                    return <li className="dark:bg-[#161616] dark:text-white bg-[#bebebe] text-[#030303] text-[14px] rounded-lg py-1 px-2" key={i}>{stack.stack}</li>
                                })}
                            </ul>
                            <div className="flex justify-between items-center mt-auto">
                                {project.links.map((link, i) => {
                                    return <a className="hover:underline" href={link.link} target="_blank" key={i}>{link.title}</a>
                                })}
                            </div>
                        </Card>
                    })
                }
            </div>
        </section>
    )
}

export default Portfolio