
const IconCard = (props: any) => {
    return (
        <div className="flex p-3 items-center justify-center rounded-md hover:text-[#030303] dark:bg-[#161616] dark:text-white bg-[#bebebe] text-[#030303] dark:hover:bg-[#2e2e2e] hover:bg-[#9e9e9e] transition-all duration-300 w-fit gap-3">
            <img className="w-7" src={props.src} alt={props.children} />
            <p className="dark:text-white text-[#030303] text-[14px]">{props.children}</p>
        </div>
    )
}

export default IconCard