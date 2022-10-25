/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router"
import React, { useState } from "react"
import { Bars3Icon, UserCircleIcon, UserIcon } from '@heroicons/react/24/solid'
import Head from "next/head"

type PageProps = {
    title: string,
    category?: React.ReactNode | null | undefined,
    children: React.ReactNode
}

const Page = ({ title, category, children }: PageProps) => {


    return (
        <React.Fragment>

            {/* <div className="min-h-screen w-full h-full bg-slate-50">
                <PageNav />
                <div className="rounded-t-3xl md:rounded-xl bg-white min-h-[vh] max-w-7x lg:mx-12 shadow">
                    <div className="p-8 h-full">
                        {children}
                    </div>
                        
                    
                    
                </div>
            </div> */}

            <div className="flex max-h-screen overflow-hidden">
                <header className="bg-slate-50 lg:inset-y-0 lg:left-0 lg:flex lg:w-112 lg:items-start xl:w-120 ">

                    <div className="hidden overflow-hidden lg:sticky lg:top-0 lg:flex lg:w-16 lg:flex-none lg:items-center lg:whitespace-nowrap lg:py-12 lg:text-sm lg:leading-7 lg:[writing-mode:vertical-rl]">
                        <span className="font-mono text-slate-500">{title}</span>
                    </div>
                    {category !== null ?
                        <div className="hidden relative z-10 mx-auto px-4 pb-4 pt-10 lg:block sm:px-6 md:max-w-2xl md:px-4 lg:min-h-full lg:flex-auto lg:border-x lg:border-slate-200 lg:py-12 lg:px-8 xl:px-12">
                            {category}
                        </div>

                        : <></>

                    }
                </header>
                <main className="border-t border-slate-200 lg:relative lg:mb-28 lg:ml-112 lg:border-t-0 xl:ml-120 w-full h-screen">
                    <div className="relative">

                        <div className="pt-8 pb-12 sm:pb-4 lg:pt-8">
                            <PageNav />
                            <div className="py-4">
                                {children}
                            </div>

                        </div>
                    </div>
                </main>
            </div>

        </React.Fragment>
    )
}

type RoutesProps = {

    url: string,
    children: React.ReactNode

}


const PageNav = () => {


    const router = useRouter();

    const [routes, setRoutes] = useState<RoutesProps[]>([
        {
            url: '/',
            children: 'Home'
        },
        {
            url: '/about',
            children: 'About Us'
        },
        {
            url: 'adoptions',
            children: 'Adoption'
        },
        {
            url: 'shop',
            children: 'Shop'
        }
    ]);

    const [openModal, setOpenModal] = useState<boolean>(false);

    return (
        <React.Fragment>
            <nav>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center">
                        <div className="w-1/2">
                            <div className="flex items-center justify-between">
                                <div className="hidden lg:block">
                                    <div className="flex items-baseline space-x-4">
                                        {routes.map((route, i) => {

                                            console.log(router.pathname)
                                            return (


                                                <a key={i} href={route.url} className="px-3 py-2 rounded-md text-black">
                                                    {(route.url !== '/' && router.pathname.includes(route.url)) ?
                                                        <div className="border-b-2 border-black">
                                                            {route.children}
                                                        </div>
                                                        :
                                                        <React.Fragment>{route.children}</React.Fragment>
                                                    }

                                                </a>

                                            )
                                        })

                                        }
                                    </div>
                                </div>
                            </div></div>

                        <div className="w-1/2">
                            <div className="hidden lg:block">
                                <div className="flex items-center justify-right">
                                    {/* <button type="button" className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        <span className="sr-only">View notifications</span>

                                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                                        </svg>
                                    </button> */}


                                    <div className="relative ml-3">

                                        <div className="flex cursor-pointer max-w-xs items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" aria-expanded="false" aria-haspopup="true" onClick={() => setOpenModal(!openModal)}>
                                            <UserIcon className="w-6 h-6 text-gray-600" />
                                        </div>

                                        <div className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${openModal ? '' : 'hidden'}`} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex={-1}>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-0">Adoption</a>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-0">Orders</a>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-2">Sign out</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex lg:hidden justify-right">
                                {/* <!-- Mobile menu button --> */}
                                <button type="button" className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" aria-controls="mobile-menu" aria-expanded="false" onClick={() => setOpenModal(!openModal)}>
                                    <span className="sr-only">Open main menu</span>

                                    <Bars3Icon className="block h-6 w-6 text-white" />

                                </button>
                            </div></div>


                    </div>
                </div>

                <div className={`lg:hidden ${(openModal) ? '' : 'hidden'}`} id="mobile-menu">
                    <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                        {routes.map((route, i) => {
                            return (
                                <a key={i} href={route.url} className="hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" aria-current="page">{route.children}</a>
                            )
                        })
                        }

                    </div>
                    <div className="border-t border-gray-300 pt-4 pb-3">
                        <div className="flex items-center px-5">
                            <div className="flex-shrink-0">
                                <UserIcon className="w-6 h-6" />
                            </div>
                            <div className="ml-3">
                                <div className="font-medium leading-none ">tom@example.com</div>
                            </div>
                        </div>
                        <div className="mt-3 space-y-1 px-2">
                            <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Adoptions</a>
                            <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Orders</a>
                            <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Sign out</a>
                        </div>
                    </div>
                </div>
            </nav>





        </React.Fragment>
    )
}

export default Page;