/* eslint-disable @next/next/no-img-element */
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import validateEmail from "../components/lib/auth/email";
import { UserContext } from "../contexts/user/user";


const LoginPage = () => {

    const router = useRouter();

    const [loginUser, setLoginUser] = useState({
        username: '',
        password: ''
    });

    const [errMes, setErrMes] = useState<string>('');
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        if (loginUser.username !== '' && loginUser.password !== '')
            setSubmitDisable(false)
        else
            setSubmitDisable(true)
    }, [loginUser]);

    const signin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        console.log('click')
        if (!validateEmail(loginUser.username)) {
            setErrMes('Incorrect Email Format, please check');
            return;
        }
        try {
            const user = await Auth.signIn(loginUser.username, loginUser.password);
            if (user) {
                console.log(user)
                
                const session = await Auth.currentSession();
                setUser(session);

                const { pre, id } = router.query;
                console.log(id, pre)
                if (pre) {
                    if (pre.toString().toLowerCase() === 'adoptions' && id){
                        router.push(`/${pre}/[id]}`, `/${pre}/${id}`)
                    }else{
                        router.push(`/${pre}`);
                    }
                } else {
                    router.push(`/`);
                }

            }
        } catch (err) {
            setErrMes('Username or Password incorrect');
        }
    };



    const [submitDisable, setSubmitDisable] = useState<boolean>(true);


    return (
        <section className="bg-gray-50 h-screen">

            <div className=" flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                <div className="hidden md:flex items-center mb-6 text-2xl font-semibold text-gray-900 md:-mt-32">
                    <img className="w-52 h-52 border-2" src="/images/logo.jpg" alt="logo" />

                </div>

                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">

                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

                        <div className="w-full">

                            {errMes !== "" ?
                                <div className="bg-red-100 border rounded border-red-500 text-red-700 px-4 py-3" role="alert">
                                    <p className="font-bold">Error message</p>
                                    <p className="text-sm">{errMes}</p>
                                </div>
                                : <></>
                            }
                        </div>
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Sign in to your account
                        </h1>
                        <div className="space-y-4 md:space-y-6">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="name@company.com"
                                    value={loginUser.username}
                                    onChange={(e) => {
                                        setLoginUser(preState => ({
                                            ...preState,
                                            username: e.target.value
                                        }))
                                    }}
                                    required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password"
                                    name="password"
                                    id="password"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                    placeholder="password"
                                    value={loginUser.password}
                                    onChange={(e) => {
                                        setLoginUser(preState => ({
                                            ...preState,
                                            password: e.target.value
                                        }))
                                    }}
                                    required />
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <a href="#" className="text-sm font-medium hover:underline dark:text-primary-500">Forgot password?</a>
                            </div>
                            <button disabled={submitDisable} type="submit" className="cursor-pointer w-full text-white bg-[#405DE6] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:bg-[#233dc1] font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-[#667adf]"
                             onClick={(e) => signin(e)}>Sign in</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <a href="#" className="font-medium text-[#405DE6] hover:underline" onClick={() => router.push('./signup')}>Sign up</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default LoginPage