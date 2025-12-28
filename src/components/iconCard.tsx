
const IconCard = (props: any) => {
    return (
        <div className="flex p-1.5 md:p-3 items-center justify-center rounded-sm md:rounded-md hover:text-[#030303] dark:bg-[#161616] dark:text-white bg-[rgb(190,190,190)] text-[#030303] dark:hover:bg-[#2e2e2e] hover:bg-[#9e9e9e] transition-all duration-300 w-fit gap-1.5 md:gap-3">
            {props.src && <img className="max-h-3 md:max-h-7 w-3 md:w-7" src={props.src} alt={props.children} />}
            <p className="dark:text-white text-[#030303] text-[12px] md:text-[14px]">{props.children}</p>
        </div>
    )
}

export default IconCard