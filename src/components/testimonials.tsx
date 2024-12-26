import Card from './card'
const Testimonials = () => {
    return (
        <section id="blog" className="mt-10 md:mt-20 scroll-mt-[120px]">
            <div>
                <p>Clients Feedback</p>
                <h1 className="font-bold text-[20px] md:text-[24px]">Testimonials</h1>
            </div>

            <div className='mt-5'>
                <Card>
                    <div>
                        {/* <img src="/images/testimonial-1.jpg" alt="Testimonial 1" /> */}
                        <p className=" text-[14px] mt-2">Dolapo A. | Digital marketer</p>
                    </div>
                    <p className="mt-4">"Working with him to create my website was an absolute pleasure. From start to finish, they demonstrated professionalism, creativity, and exceptional attention to detail. Their team took the time to understand my vision and goals, and they delivered a final product that exceeded my expectations. I highly recommend him] to anyone looking for a reliable and talented team to bring their website vision to life."</p>
                </Card>
            </div>
        </section>
    )
}

export default Testimonials