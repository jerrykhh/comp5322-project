import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import validateEmail from "../components/lib/auth/email";
import VerifyPage from '../components/template/VerifyPage'

const SignupPage = () => {

    const router = useRouter();
    const [submitDisable, setSubmitDisable] = useState<boolean>(true);
    const [verifyAccount, setVerifyAccount] = useState<boolean>(false);


    const [user, setUser] = useState({
        username: '',
        name: '',
        pwd: '',
        cpwd: '',
        gender: 'M',
        term: true
    });

    const [errMes, setErrMes] = useState<String>('');


    useEffect(() => {
        if (user.username === '' || user.pwd === '' || user.cpwd === '' || !user.term || user.name === '') {

            setSubmitDisable(true);
        } else {
            setSubmitDisable(false);
        }
    }, [user]);

    const create = async () => {

        try {
            if (!validateEmail(user.username)) {
                setErrMes('Email format incoreect')
                setSubmitDisable(true);
                return;
            }

            if (user.pwd !== user.cpwd) {
                setErrMes('Password and Confirm Password not match!')
                setSubmitDisable(true)
                return;
            }


            if (submitDisable)
                return;
            console.log('click');
            const username = user.username;
            const password = user.pwd;
            const email = user.username;
            const name = user.name;
            const gender = user.gender;


            const signUpUser = await Auth.signUp({
                username,
                password,
                attributes: {
                    email,
                    name,
                    gender
                }
            });

            console.log(signUpUser)
            setVerifyAccount(true);
        } catch (err) {
            console.log(err)
            setErrMes('Create Account failed ' + err)
        }

    }


    return (
        (!verifyAccount) ?
            <React.Fragment>
                <section className="bg-gray-50 h-screen">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
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
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Create Account
                                </h1>
                                <div className="space-y-4 md:space-y-6" >
                                    <div>
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Your name</label>
                                        <input type="name"
                                            name="name" id="name"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                            placeholder="Name"
                                            required
                                            value={user.name}
                                            onChange={(e) => {
                                                setUser(preState => ({
                                                    ...preState,
                                                    name: e.target.value
                                                }))
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                            placeholder="name@company.com"
                                            required
                                            value={user.username}
                                            onChange={(e) => {
                                                setUser(preState => ({
                                                    ...preState,
                                                    username: e.target.value
                                                }))
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                        <input type="password" name="password" id="password"
                                            placeholder="••••••••"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                            required
                                            value={user.pwd}
                                            onChange={(e) => {
                                                setUser(preState => ({
                                                    ...preState,
                                                    pwd: e.target.value
                                                }))
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
                                        <input type="password" name="confirm-password" id="confirm-password"
                                            placeholder="••••••••"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                            required
                                            value={user.cpwd}
                                            onChange={(e) => {
                                                setUser(preState => ({
                                                    ...preState,
                                                    cpwd: e.target.value
                                                }))
                                            }} />
                                    </div>
                                    <div>
                                        <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 ">Select your Gender</label>
                                        <select id="gender"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                            value={user.gender}
                                            onChange={(e) => {
                                                setUser(preState => ({
                                                    ...preState,
                                                    gender: e.target.value
                                                }))
                                            }}>
                                            <option value={'M'} defaultChecked>M</option>
                                            <option value={'F'}>F</option>
                                        </select>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                                                required
                                                defaultChecked
                                                onChange={(e) => {
                                                    setUser(preState => ({
                                                        ...preState,
                                                        term: e.target.checked
                                                    }))
                                                }} />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline" href="#">Terms and Conditions</a></label>
                                        </div>
                                    </div>

                                    <button
                                        disabled={submitDisable}
                                        type="submit"
                                        className="cursor-pointer w-full text-white bg-[#405DE6] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:bg-[#233dc1] font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-[#667adf]"
                                        onClick={() => create()}>Create Account</button>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Already have an account? <a href="#" className="font-medium text-primary-600 hover:underline" onClick={() => router.push('./login')}>Login here</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                </React.Fragment>
                : <VerifyPage email={user.username} />

        
    )
}

export default SignupPage;