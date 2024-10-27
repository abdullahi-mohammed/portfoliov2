import Card from "./card";


const Contact = () => {
    return (
        <section id="contact" className="mt-10 md:mt-20">
            <h4>Connect with me through:</h4>
            <ul className="flex flex-wrap gap-5 mt-5">
                <li><a href="https://github.com/abdullahi-mohammed" target="_blank">
                    <Card className="w-fit dark:hover:bg-[#2e2e2e] hover:bg-[#9e9e9e] transition-all duration-300"><svg xmlns="http://www.w3.org/2000/svg" className="dark:fill-white" width="52" height="52" ><path d="M11.293 37.783c.986 1.443 3.98 4.524 8.061 5.3l-8.06-5.3ZM19.661 50C17.09 49.577 0 44.014 0 25.232 0 7.657 15.005 0 25.002 0 34.999 0 50 7.658 50 25.232 50 44.014 32.91 49.576 30.34 50c0 0-.523-8.544-.218-10.008.305-1.464-.734-3.82-.734-3.82 2.427-.908 6.123-2.21 7.362-5.703.962-2.711 1.567-6.647-1.123-10.347 0 0 .703-5.977-.628-6.208-1.33-.232-5.25 2.366-5.25 2.366-1.141-.324-3.688-.943-4.744-.832-1.057-.111-3.613.508-4.755.832 0 0-3.919-2.598-5.25-2.366-1.33.231-.627 6.208-.627 6.208-2.69 3.7-2.085 7.636-1.123 10.346 1.24 3.494 4.935 4.796 7.362 5.704 0 0-1.038 2.356-.734 3.82.305 1.465-.217 10.008-.217 10.008Z" /></svg></Card></a></li>
                <li><a href="https://twitter.com/haustler_" target="_blank">
                    <Card className="w-fit dark:hover:bg-[#2e2e2e] hover:bg-[#9e9e9e] transition-all duration-300"><svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" className="dark:fill-white"><path d="m1 52.964 20.968-21.776L1 52.964ZM51 1.036 30.032 22.812 51 1.036ZM30.032 22.812 14.89 1.036H1l20.968 30.152m8.064-8.376L51 52.964H37.111L21.968 31.188" /><path className="dark:stroke-white stroke-black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m1 52.964 20.968-21.776m0 0L1 1.036h13.889l15.143 21.776m-8.064 8.376L37.11 52.964H51L30.032 22.812M51 1.036 30.032 22.812" /></svg></Card></a></li>
                <li><a href="https://t.me/baulu_dev" target="_blank"><Card className="w-fit dark:hover:bg-[#2e2e2e] hover:bg-[#9e9e9e] transition-all duration-300"><svg xmlns="http://www.w3.org/2000/svg" className="dark:fill-white" width="52" height="52"><path d="m24.963 32.85 8.104 9.568c3.002 3.545 4.504 5.318 6.075 4.886 1.571-.431 2.11-2.764 3.188-7.43l5.977-25.88c1.66-7.187 2.49-10.78.645-12.552C47.108-.33 43.91.99 37.515 3.626L7.847 15.859C2.732 17.968.175 19.023.013 20.834a3.174 3.174 0 0 0-.001.558c.157 1.813 2.711 2.876 7.82 5.003 2.314.963 3.471 1.445 4.301 2.368.093.104.183.211.269.322.764.987 1.09 2.281 1.743 4.87l1.221 4.847c.635 2.52.953 3.78 1.784 3.952.832.172 1.556-.873 3.004-2.963l4.81-6.941Zm0 0-.794-.86c-.904-.98-1.356-1.468-1.356-2.077 0-.608.452-1.097 1.356-2.076l8.933-9.668" /></svg></Card></a></li>
                <li><a href="mailto:abdullahimohammed3108@gmail.com"><Card className="w-fit dark:hover:bg-[#2e2e2e] hover:bg-[#9e9e9e] transition-all duration-300"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="none"><path className="dark:stroke-white stroke-black" stroke="#D9D9D9" stroke-linejoin="round" stroke-width="5" d="m4.167 12.5 14.402 8.16c5.31 3.009 7.553 3.009 12.862 0l14.402-8.16" /><path className="dark:stroke-white stroke-black" stroke="#D9D9D9" stroke-linejoin="round" stroke-width="5" d="M4.2 28.074c.136 6.387.204 9.58 2.56 11.946 2.357 2.365 5.637 2.447 12.196 2.612 4.043.102 8.046.102 12.088 0 6.56-.165 9.84-.247 12.196-2.612 2.356-2.366 2.424-5.56 2.56-11.946.044-2.053.044-4.095 0-6.148-.136-6.387-.204-9.58-2.56-11.945-2.357-2.366-5.636-2.448-12.196-2.613a239.791 239.791 0 0 0-12.088 0c-6.56.165-9.84.247-12.196 2.613-2.356 2.365-2.424 5.558-2.56 11.945a143.896 143.896 0 0 0 0 6.148Z" /></svg></Card></a></li>
            </ul>
        </section>
    )
}

export default Contact