import Card from "./card"
import htmldemo from "../assets/HTMLDemo.png";
import burgerapp from "../assets/burgerapp.png";
import greencandlestick from "../assets/greencandlestick.png";
import breej from "../assets/breej.png";
import tipcalculator from "../assets/tipcalculator.png";
import plut from "../assets/plut.png";

const Portfolio = () => {

    const projects = [{
        heading: "wowtouche",
        image: htmldemo,
        paragraph: "Wowtouche is a hair braiding place that is built to enhance the business sales. And it has improved sales by 80%",
        stacks: [{ stack: "wix" }],
        links: [{ title: "GitHub", link: "html" }, { title: "Website", link: "css" }]
    }, {
        heading: "Burger Builder",
        image: burgerapp,
        paragraph: "hello",
        stacks: [{ stack: "html" }, { stack: "css" }],
        links: [{ title: "GitHub", link: "html" }, { title: "Website", link: "css" }]
    },
    {
        heading: "wowtouche",
        image: greencandlestick,
        paragraph: "hello",
        stacks: [{ stack: "html" }, { stack: "css" }],
        links: [{ title: "GitHub", link: "html" }, { title: "Website", link: "css" }]
    },
    {
        heading: "wowtouche",
        image: tipcalculator,
        paragraph: "hello",
        stacks: [{ stack: "html" }, { stack: "css" }],
        links: [{ title: "GitHub", link: "html" }, { title: "Website", link: "css" }]
    },
    {
        heading: "wowtouche",
        image: breej,
        paragraph: "hello",
        stacks: [{ stack: "html" }, { stack: "css" }],
        links: [{ title: "GitHub", link: "html" }, { title: "Website", link: "css" }]
    },
    {
        heading: "wowtouche",
        image: plut,
        paragraph: "hello",
        stacks: [{ stack: "html" }, { stack: "css" }],
        links: [{ title: "GitHub", link: "html" }, { title: "Website", link: "css" }]
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
                                    return <li className="bg-[#161616] text-[14px] rounded-lg py-1 px-2" key={i}>{stack.stack}</li>
                                })}
                            </ul>
                            <div className="flex justify-between items-center mt-auto">
                                {project.links.map((link, i) => {
                                    return <a href={link.link} key={i}>{link.title}</a>
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