/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ChartBarIcon, XMarkIcon, ShoppingBagIcon, GiftTopIcon, UsersIcon, Bars3Icon } from '@heroicons/react/24/outline'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { createPopper } from "@popperjs/core";
import { Auth } from "aws-amplify";


type AdminPageProps = {
    pageName: string,
    children: React.ReactNode
}


const AdminPage = ({ pageName, children }: AdminPageProps): JSX.Element => {
    return (
        <React.Fragment>
            <AdminNav />
            <div className="relative md:ml-64">
                <AdminHeader pageName={pageName} />
                <div className="relative bg-bluegray-800 md:pt-32 pb-32 pt-12 -z-10" />
                <div className="px-4 md:px-10 mx-auto w-full">
                    <div className="px-4 md:px-10 mx-auto w-full -m-36 z-10">
                        <div className="bg-white min-h-screen md:min-h-fit md:min-h-[85vh] border">
                            <div className="p-12">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}


const AdminHeader = ({ pageName }: { pageName: string }) => {
    return (
        <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
            <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
                <div
                    className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
                    onClick={(e) => e.preventDefault()}
                >
                    {pageName}
                </div>

                {/* User */}
                <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
                    <UserDropdown />
                </ul>
            </div>
        </nav>
    )
}

type routersProps = {

    [key: string]: {
        url: string,
        icon: React.ReactNode
    }

}

const AdminNav = () => {

    const [collapseShow, setCollapseShow] = React.useState<String>("hidden");
    const router = useRouter();
    const [routers, setRouters] = React.useState<routersProps>({
        "dashboard": {
            url: "/admin/portal/",
            icon: <ChartBarIcon className="h-6 w-6 text-sm" />
        },
        "pets": {
            url: "/admin/portal/pets",
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-6 w-6 text-sm bg-g"><path d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z" /></svg>
        },
        "orders": {
            url: "/admin/portal/orders",
            icon: <ShoppingBagIcon className="h-6 w-6 text-sm " />
        },
        "products": {
            url: "/admin/portal/products",
            icon: <GiftTopIcon className="h-6 w-6 text-sm " />
        },
        // "user": {
        //     url: "/admin/portal/users",
        //     icon: <UsersIcon className="h-6 w-6 text-sm" />
        // }

    })

    return (
        <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
            <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
                <button
                    className="cursor-pointer text-black opacity-50 md:hidden py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    type="button"
                    onClick={() => setCollapseShow("bg-white")}
                >
                    <Bars3Icon className="w-8 h-8" />
                </button>

                <div
                    className="hidden md:block text-left md:pb-2 text-blueGray-600 mr-0 whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
                    Admin Portal
                </div>

                <ul className="md:hidden items-center flex flex-wrap list-none">
                    <li className="inline-block relative">
                        <UserDropdown />
                    </li>
                </ul>
                <div
                    className={
                        collapseShow +
                        " px-4 md:px-0 md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded "
                    }
                >
                    {/* Collapse header */}
                    <div className="md:min-w-full md:hidden block mb-4 ">
                        <div className="flex flex-wrap">
                            <div className="w-6/12">
                                <div
                                    className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                                >
                                    Admin Portal
                                </div>

                            </div>
                            <div className="w-6/12 flex justify-end">
                                <button
                                    type="button"
                                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                                    onClick={() => setCollapseShow("hidden")}
                                >
                                    <XMarkIcon className="w-8 h-8" />
                                </button>
                            </div>
                        </div>
                    </div>


                    <hr className="my-4 md:min-w-full" />

                    <label className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                        Pages
                    </label>


                    <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                        {Object.keys(routers).map((key: string) => {

                            const route = routers[key];
                            return (
                                <li className="items-center" key={key}>
                                    <a href={route.url}
                                        className={
                                            "text-xs uppercase py-2 font-bold block " +
                                            (router.pathname.indexOf(route.url) !== -1
                                                ? "text-lightBlue-500 hover:text-lightBlue-600"
                                                : "text-blueGray-700 hover:text-gray-500")
                                        }
                                    >
                                        <span className="flex">
                                            <div className="mr-4">{route.icon}</div>
                                            <div className="self-center text-sm font-light">{key}</div>
                                        </span>

                                    </a>
                                </li>
                            )
                        })

                        }


                    </ul>

                    <hr className="my-4 md:min-w-full" />

                </div>
            </div>
        </nav>
    )
};

const UserDropdown = () => {

    const router = useRouter();
    const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
    const btnDropdownRef = React.createRef<HTMLButtonElement>();
    const popoverDropdownRef = React.createRef<HTMLDivElement>();

    const openDropdownPopover = () => {
        createPopper(btnDropdownRef.current!, popoverDropdownRef.current!, {
            placement: "bottom-end",
        });
        setDropdownPopoverShow(true);
    };

    const closeDropdownPopover = () => {
        setDropdownPopoverShow(false);
    };


    const signOut = async () => {
        try {
            await Auth.signOut();


        } catch (error) {
            console.log('error signing out: ', error);
        }

        router.push('/admin/portal/login');
    }


    return (
        <React.Fragment>
            <button
                className="text-blueGray-500 block"
                ref={btnDropdownRef}
                onClick={(e) => {
                    e.preventDefault();
                    dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
                }}
            >
                <div className="items-center flex">
                    <span className="w-10 h-10 text-sm inline-flex items-center justify-center rounded-full md:text-white">
                        <UserCircleIcon
                            className="w-full rounded-full align-middle border-none shadow-lg"
                        />
                    </span>
                </div>
            </button>
            <div
                ref={popoverDropdownRef}
                className={
                    (dropdownPopoverShow ? "block " : "hidden ") +
                    "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
                }
            >
                <a
                    href="#pablo"
                    className={
                        "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                    }
                    onClick={(e) => e.preventDefault()}
                >
                    Profile Setting
                </a>
                <div className="h-0 my-2 border border-solid border-blueGray-100" />
                <a
                    href="#pablo"
                    className={
                        "text-sm py-2 px-4 font-normal text-right block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                    }
                    onClick={(e) => signOut()}
                >
                    Logout
                </a>
            </div>

        </React.Fragment>
    )
};

export default AdminPage;