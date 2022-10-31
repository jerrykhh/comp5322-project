import Page from "../components/template/Page";

const AboutUsPage = () => {
    return (
        <Page
            category={null}
            title="About Us">

            <div className="container mx-auto">
                <div className="sm:px-8 mt-16 sm:mt-32">
                    <div className="relative px-4 sm:px-8 lg:px-12">
                        <div className="mx-auto max-w-2xl lg:max-w-5xl">
                            <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
                                <div className="lg:pl-20">
                                    <div className="max-w-xs px-2.5 lg:max-w-none ">
                                        <img src="/images/logo.jpg" className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800 shadow-md border" alt="logo image" />
                                    </div>

                                </div>
                                <div className="lg:order-first lg:row-span-2">
                                    <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">We are Society for Animal Adoption </h1>


                                    <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
                                        <p>We believes that animals deserve our protection, compassion and respect. We aim to prevent their suffering wherever we can through:

                                            Rescue of abandoned, sick and injured animals.
                                            Operating an Inspectorate to rescue animals including wildlife, help enforce animal welfare laws and initiate prosecution of offenders.
                                            Providing of low-cost desexing for cats and dogs to prevent unwanted litters.
                                            Rehoming abandoned and rescued animals.
                                            Hospitalisation of homeless animals whenever possible, providing necessary basic veterinary care, treatment of disease or major surgery.
                                            Helping to control the animal population by working within the community on programmes to desex loosely owned and feral animals, territory wide.
                                            Monitoring of food animal welfare standards.
                                            Lobbying and working with government to bring about improved animal welfare legislation.
                                            Public education on responsible pet ownership and animal welfare concepts. </p>


                                        <h3>Our Mission</h3>
                                        <p>To promote kindness to animals, to protect their health and welfare, to prevent cruelty and alleviate suffering, and through education to cultivate a deep respect for life in the community so that all living creatures may live together in harmony.</p>

                                        <h3>Our Aims</h3>
                                        <p>To promote kindness and to confront and prevent cruelty to animals.</p>

                                    </div>
                                </div>
                                <div className="lg:pl-20">
                                    <ul role='list'>
                                        <li className="flex"></li>
                                        <li className="mt-4 flex  cursor-pointer">
                                            <a href="https://www.instagram.com/" className="group flex text-sm font-medium transition text-gray-500 hover:text-black">
                                                <svg viewBox="0 0 24 24" aria-hidden="true" className=" h-6 w-6 flex-none transition text-gray-500 group-hover:text-black">
                                                    <path d="M12 3c-2.444 0-2.75.01-3.71.054-.959.044-1.613.196-2.185.418A4.412 4.412 0 0 0 4.51 4.511c-.5.5-.809 1.002-1.039 1.594-.222.572-.374 1.226-.418 2.184C3.01 9.25 3 9.556 3 12s.01 2.75.054 3.71c.044.959.196 1.613.418 2.185.23.592.538 1.094 1.039 1.595.5.5 1.002.808 1.594 1.038.572.222 1.226.374 2.184.418C9.25 20.99 9.556 21 12 21s2.75-.01 3.71-.054c.959-.044 1.613-.196 2.185-.419a4.412 4.412 0 0 0 1.595-1.038c.5-.5.808-1.002 1.038-1.594.222-.572.374-1.226.418-2.184.044-.96.054-1.267.054-3.711s-.01-2.75-.054-3.71c-.044-.959-.196-1.613-.419-2.185A4.412 4.412 0 0 0 19.49 4.51c-.5-.5-1.002-.809-1.594-1.039-.572-.222-1.226-.374-2.184-.418C14.75 3.01 14.444 3 12 3Zm0 1.622c2.403 0 2.688.009 3.637.052.877.04 1.354.187 1.67.31.421.163.72.358 1.036.673.315.315.51.615.673 1.035.123.317.27.794.31 1.671.043.95.052 1.234.052 3.637s-.009 2.688-.052 3.637c-.04.877-.187 1.354-.31 1.67-.163.421-.358.72-.673 1.036a2.79 2.79 0 0 1-1.035.673c-.317.123-.794.27-1.671.31-.95.043-1.234.052-3.637.052s-2.688-.009-3.637-.052c-.877-.04-1.354-.187-1.67-.31a2.789 2.789 0 0 1-1.036-.673 2.79 2.79 0 0 1-.673-1.035c-.123-.317-.27-.794-.31-1.671-.043-.95-.052-1.234-.052-3.637s.009-2.688.052-3.637c.04-.877.187-1.354.31-1.67.163-.421.358-.72.673-1.036.315-.315.615-.51 1.035-.673.317-.123.794-.27 1.671-.31.95-.043 1.234-.052 3.637-.052Z"></path><path d="M12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm0-7.622a4.622 4.622 0 1 0 0 9.244 4.622 4.622 0 0 0 0-9.244Zm5.884-.182a1.08 1.08 0 1 1-2.16 0 1.08 1.08 0 0 1 2.16 0Z"></path>
                                                    </svg>
                                                <span className="ml-4 mt-[2px]">Follow on Instagram</span>
                                            </a>
                                        </li>
                                        <li className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40 flex">

                                            <a className="group flex text-sm font-medium transition text-gray-500 hover:text-black" href="mailto:contact@ap.com">
                                                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 flex-none transition text-gray-500 group-hover:text-black">
                                                    <path fill-rule="evenodd" d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"></path>
                                                </svg>
                                                <span className="ml-4 mt-[2px]">contact@ap.com</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Page >
    )
}

export default AboutUsPage;