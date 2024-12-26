import Card from './card'

const Blog = () => {
    return (
        <section id="blog" className="mt-10 md:mt-20 scroll-mt-[120px]">
            <div>
                <p>Recent Happenings</p>
                <h1 className="font-bold text-[20px] md:text-[24px]">Blog</h1>
            </div>
            <div className='mt-5 grid grid-cols-1 gap-5'>
                <Card>
                    <div className='cursor-pointer select-none' onClick={() => { window.open('https://bolu.hashnode.dev/errors-regarding-hover-state', '_blank') }}>
                        <div className='flex justify-between items-center'><span>Nov 07, 2024</span> <a href='https://bolu.hashnode.dev/errors-regarding-hover-state'>Go</a></div>
                        <div><span className='text-[14px]'>19 Views ▫ </span><h4 className='inline'>How I Activated Founder Mode at 20; 2024 - 2min read</h4></div>
                        <p>During the Telegram boom earlier this year, numerous projects were launched on the Ton Blockchain ecosystem. This surge provided developers with opportunities to create innovative products and earn rewards...</p>
                    </div>
                </Card>
                <Card>
                    <div className='cursor-pointer select-none' onClick={() => { window.open('https://bolu.hashnode.dev/errors-regarding-hover-state', '_blank') }}>
                        <div className='flex justify-between items-center'><span>Nov 30, 2022</span> <a href='https://bolu.hashnode.dev/errors-regarding-hover-state'>Go</a></div>
                        <div><span className='text-[14px]'>24 Views ▫ </span><h4 className='inline'>Errors Regarding Hover State - 1min read</h4></div>
                        <p>The purpose of this article is to explain the errors that you might come accross whole using ":hover" psuedo element in CSS...</p>
                    </div>
                </Card>
            </div>
        </section>
    )
}

export default Blog