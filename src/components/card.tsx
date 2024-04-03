
const Card = (props: any) => {
    return (
        <div data-aos={props.dataAos} className={`${props.className} dark:bg-[#030303] dark:text-white bg-[#dedede] text-[#030303] p-3 md:p-5 rounded-lg`}>
            {props.children}
        </div>
    )
}

export default Card