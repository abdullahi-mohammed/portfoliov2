
const Footer = () => {

    let date = new Date().getFullYear()

    return (
        <footer className="m-5">
            <ul className="flex flex-col md:flex-row gap-4 md:gap-auto justify-between items-center
            ">
                <li>Built using react and tailwind</li>
                <li>{date} - Designed and Developed by me 😎</li>
                <li>Contract to Hire</li>
            </ul>
        </footer>
    )
}

export default Footer