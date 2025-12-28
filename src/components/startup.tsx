import Card from './card'

const Startup = () => {
    return (
        <section id="startup" className="mt-10 md:mt-20 scroll-mt-[120px]">
            <div>
                <h1 className="font-bold text-[20px] md:text-[24px]">Startups</h1>
                <p>Products I’m co-building, where I handle full-stack development, deployment, and production maintenance.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-6">

                <Card className=" rounded-xl p-6  shadow-sm hover:shadow-md transition">
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold ">Kolekto</h3>
                        <p className="text-sm text-purple-600 font-medium">Co-founder & CTO</p>
                    </div>

                    <p className=" mb-4">
                        A fintech platform focused on simplifying Group payments collections for organisations. <a href="https://kolekto.com.ng" target="_blank" className="text-blue-600 underline">kolekto.com.ng</a>
                    </p>
                    <div className="mb-4 rounded-lg bg-gray-400 p-4">
                        <p className="text-sm text-gray-600 uppercase tracking-wide mb-2">
                            Key Metrics
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div>
                                <p className="text-xl font-semibold text-gray-900">₦27M+</p>
                                <p className="text-sm text-gray-600">Processed</p>
                            </div>
                            <div>
                                <p className="text-xl font-semibold text-gray-900">500+</p>
                                <p className="text-sm text-gray-600">Users</p>
                            </div>
                            <div>
                                <p className="text-xl font-semibold text-gray-900">50+</p>
                                <p className="text-sm text-gray-600">Monthly Active Users</p>
                            </div>
                            <div>
                                <p className="text-xl font-semibold text-gray-900">99.9%</p>
                                <p className="text-sm text-gray-600">Uptime</p>
                            </div>

                            <div>
                                <p className="text-xl font-semibold text-gray-900">7+ months</p>
                                <p className="text-sm text-gray-600">Live in Production</p>
                            </div>
                        </div>
                    </div>


                    <ul className="list-disc ml-5 space-y-2 text-sm">
                        <li>Led full-stack development from architecture to production.</li>
                        <li>Built and maintained backend services and frontend applications.</li>
                        <li>Handled deployment, infrastructure, and production reliability.</li>
                        <li>Collaborated on product direction and feature planning.</li>
                    </ul>

                    <div className="mt-4 text-sm">
                        <span className="font-medium ">Tech: </span>
                        React, Node.js, PostgreSQL, AWS, Docker
                    </div>
                </Card>

                <Card className="rounded-xl p-6 shadow-sm hover:shadow-md transition">
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold ">Oratora</h3>
                        <p className="text-sm text-purple-600 font-medium">Co-founder & CTO</p>
                    </div>

                    <p className=" mb-4">
                        An AI product focused on improving how people communicate and present ideas clearly. <a href="https://oratora.com.ng" target="_blank" className="text-blue-600 underline">oratora.com.ng</a>
                    </p>

                    <ul className="list-disc ml-5 space-y-2  text-sm">
                        <li>Designed and developed the core application.</li>
                        <li>Implemented APIs, databases, and authentication flows.</li>
                        <li>Managed deployments, monitoring, and ongoing improvements.</li>
                    </ul>

                    <div className="mt-4 text-sm ">
                        <span className="font-medium ">Tech: </span>
                        React, Node.js, Supabase, Gemini,  Cloud services
                    </div>
                </Card>

            </div>
        </section>
    )
}

export default Startup