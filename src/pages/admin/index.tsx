/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from 'next/head';
import React from "react";
import { useState } from "react";

const AdminLogin: NextPage = () => {

    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const setUsername = (username: string) => {
        setUser(preState => ({
            ...preState,
            username: username
        }))
    };

    const setPassword = (pwd: string) => {
        setUser(preState => ({
            ...preState,
            password: pwd
        }))
    }

    const login = () => {
        console.log(user);
    }

    return (
        <div className="w-full flex h-screen items-center">
            <Head>
                <title>Admin Portal</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className="w-full p-5 -mt-12 md:w-1/2 md:max-w-xl">
                <div className="flex flex-col px-12 md:px-14">
                    <h1 className="text-4xl mb-12 font-bold">Sign in your account</h1>
                    <React.Fragment>
                        <div className="py-2">
                            <label>Username</label>
                            <input type="text" onChange={e => setUsername(e.currentTarget.value)} value={user.username} />
                        </div>
                        <div className="py-2">
                            <label>Password</label>
                            <input type="password" onChange={e => setPassword(e.currentTarget.value)} value={user.password} />
                        </div>
                        <div className="py-2 mt-6">
                            <button type="button" className="rounded text-white bg-black p-2 cursor-pointer w-full md:px-8 hover:bg-gray-900" onClick={login}>Login</button>
                        </div>
                    </React.Fragment>
                </div>
            </div>
            <div className="hidden md:h-screen md:block md:w-1/2 lg:w-8/12 xl:flex-auto relative">
                <img
                    alt="Login Background Image"
                    src="/admin-login-bg.jpg"
                    className="object-cover w-full h-screen hidden md:block"
                />
            </div>
        </div>
    )


}

export default AdminLogin;