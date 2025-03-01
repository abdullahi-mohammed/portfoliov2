import Card from "./card"
import html from '../assets/html5-original.svg'
import css from '../assets/css3-original.svg'
import tailwindcss from '../assets/tailwindcss-original.svg'
import javascript from '../assets/javascript-original.svg'
import react from '../assets/react-original.svg'
import next from '../assets/nextjs-original.svg'
import node from '../assets/nodejs-original.svg'
import express from '../assets/express-original.svg'
import mysql from '../assets/mysql-original.svg'
import mongodb from '../assets/mongodb-original.svg'
import wordpress from '../assets/wordpress-original.svg'
import typescript from '../assets/typescript-original.svg'
import figma from '../assets/figma-original.svg'
import git from '../assets/git-original.svg'
import github from '../assets/github-_1_.svg'
import graphql from '../assets/graphql-plain.svg'
import ethIcon from '../assets/ethereum-eth-logo.svg'
import tonIcon from '../assets/toncoin-ton-logo.svg'
import solIcon from '../assets/solana-sol-logo.svg'
import SCIcon from '../assets/smart-contracts.png'
import vueIcon from '../assets/vue-svgrepo-com.svg'
import nuxtIcon from '../assets/nuxt-icon-svgrepo-com.svg'
import angularIcon from '../assets/angular-svgrepo-com.svg'
import truffleIcon from '../assets/truffle.png'
import hardhhatIcon from '../assets/hardhat-logo-dark.svg'
import IconCard from './iconCard';

const Qualifications = () => {

    const frontendTechnologies = [
        {
            title: "HTML5",
            image: html
        },
        {
            title: "CSS3",
            image: css
        },
        {
            title: "TailwindCss",
            image: tailwindcss
        },
        {
            title: "JavaScript",
            image: javascript
        },
        {
            title: "React.js",
            image: react
        },
        {
            title: "Next.js",
            image: next
        },
        {
            title: "Vue.js",
            image: vueIcon
        },
        {
            title: "Nuxt.js",
            image: nuxtIcon
        }
    ]

    const backendTechnologies = [
        {
            title: "Node.js",
            image: node
        },
        {
            title: "Express.js",
            image: express
        },
        {
            title: "MySQL",
            image: mysql
        },
        {
            title: "MongoDB",
            image: mongodb
        }
    ]

    const blockchainTechnologies = [
        {
            title: "Ethereum Blockchain",
            image: ethIcon
        },
        {
            title: "Solana Blockchain",
            image: solIcon
        },
        {
            title: "Ton Blockchain",
            image: tonIcon
        },
        {
            title: "Solidity Language",
            image: tonIcon
        },
        {
            title: "Tact Language",
            image: tonIcon
        },
        {
            title: "Token Smart Contract",
            image: SCIcon
        },
        {
            title: "NFT Smart Contract",
            image: SCIcon
        },
        {
            title: "Staking Smart Contract",
            image: SCIcon
        },
    ]

    const otherTools = [
        {
            title: "Wordpress",
            image: wordpress
        },
        {
            title: "wix",
            image: html
        },
        {
            title: "Typescript",
            image: typescript
        },
        {
            title: "Web3.js",
            image: html
        },
        {
            title: "Figma",
            image: figma
        },
        {
            title: "Git",
            image: git
        },
        {
            title: "GitHub",
            image: github
        },
        {
            title: "Graphql",
            image: graphql
        },
        {
            title: "Truffle",
            image: truffleIcon
        },
        {
            title: "Hardart",
            image: hardhhatIcon
        },
    ]

    return (
        // <Element name="qualifications" className="element">
        <section id="qualifications" className="mt-10 md:mt-20 scroll-mt-[120px]">
            <div>
                <div>
                    <p>My Skills</p>
                </div>
                <div>
                    <h1 className="font-bold text-[24px] inline mr-4">Qualifications</h1>
                    <p className="px-2 py-1 rounded-md bg-[#9410D2] w-fit inline">MERN</p>
                </div>
            </div>
            <Card dataAos="slide-up" className="mt-5">
                <div>
                    <div className="flex items-center justify-between">
                        <h4><span className="font-semibold text-[16px] md:text-[20px]">Frontend Development -</span> Udemy 2022</h4>
                        <p className="px-2 py-1 rounded-md bg-[#9410D2] w-fit">Expert</p>
                    </div>
                    <div className="mt-4 md:mt-8">
                        <p>Technologies Used</p>
                        <ul className="mt-3 md:mt-5 flex flex-wrap gap-3 items-center">
                            {frontendTechnologies.map((tech, i) =>
                                <li key={i} className="flex items-center gap-2 select-none"><IconCard src={tech.image}>{tech.title}</IconCard></li>
                            )}
                        </ul>
                    </div>
                </div>
            </Card>
            <Card dataAos="slide-up" className="mt-5">
                <div>
                    <div className="flex items-center justify-between">
                        <h4><span className="font-semibold text-[16px] md:text-[20px]">Backend Development -</span> Udemy 2023</h4>
                        <p className="px-2 py-1 rounded-md bg-[#9410D2] w-fit">Expert</p>
                    </div>
                    <div className="mt-4 md:mt-8">
                        <p>Technologies Used</p>
                        <ul className="mt-3 md:mt-5 flex flex-wrap gap-3 items-center">
                            {backendTechnologies.map((tech, i) =>
                                <li key={i} className="flex items-center gap-2 select-none"><IconCard src={tech.image}>{tech.title}</IconCard></li>
                            )}
                        </ul>
                    </div>
                </div>
            </Card>
            <Card dataAos="slide-up" className="mt-5">
                <div>
                    <div className="flex items-center justify-between">
                        <h4><span className="font-semibold text-[16px] md:text-[20px]">Blockchain Development (Smart Contracts) -</span> Udemy 2024</h4>
                        <p className="px-2 py-1 rounded-md bg-[#9410D2] w-fit">Expert</p>
                    </div>
                    <div className="mt-4 md:mt-8">
                        <p>Technologies Used</p>
                        <ul className="mt-3 md:mt-5 flex flex-wrap gap-3 items-center">
                            {blockchainTechnologies.map((tech, i) =>
                                <li key={i} className="flex items-center gap-2 select-none"><IconCard src={tech.image}>{tech.title}</IconCard></li>
                            )}
                        </ul>
                    </div>
                </div>
            </Card>
            <Card dataAos="slide-up" className="mt-5">
                <div>
                    <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-[16px] md:text-[20px]">Other Development Tools</h4>
                        <p className="px-2 py-1 rounded-md bg-[#9410D2] w-fit">Expert</p>
                    </div>
                    <div className="mt-4 md:mt-8">
                        <p>Technologies Used</p>
                        <ul className="mt-3 md:mt-5 flex gap-3 flex-wrap items-center">
                            {otherTools.map((tech, i) =>
                                <li key={i} className="flex items-center gap-2 select-none"><IconCard src={tech.image}>{tech.title}</IconCard></li>
                            )}
                        </ul>
                    </div>
                </div>
            </Card>
        </section>
        // </Element>
    )
}

export default Qualifications