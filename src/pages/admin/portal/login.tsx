/* eslint-disable @next/next/no-img-element */
import type { GetServerSideProps, NextPage } from "next";
import Head from 'next/head';
import React from "react";
import { useState } from "react";
import { Auth, withSSRContext } from 'aws-amplify';
import { useRouter } from "next/router";

import { CognitoUser } from 'amazon-cognito-identity-js';
import { useAdminSessionCheck } from "../../../components/lib/auth/admin-auth";



export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    try {
        const {Auth} = withSSRContext({req});
        const user = await Auth.currentSession();
        console.log(user)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        if (useAdminSessionCheck(user, true)) {
            return {
                redirect: {
                    permanent: false,
                    destination: "/admin/portal/dashboard"
                },
                props: {}
            }
        }
    }catch(err){
        console.log(err)
    }

    return {
        props: {}
    }


}

type ChallengeProps = {
    gender?: string,
    password?: string,
    confirm_password?: string
    name?: string
}

const AdminLogin: NextPage = () => {

    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const [cognitoUser, setCognitoUser] = useState<CognitoUser | null>(null);
    const [challenge, setChallenge] = useState<ChallengeProps | null>(null);
    const [challengeErrMes, setChallengeErrMes] = useState<String>('');

    const [errMess, setErrMess] = useState('');
    const router = useRouter();


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

    const login = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        e.preventDefault()
        Auth.signIn(user.username, user.password)
            .then(cuser => {

                if (cuser.challengeName === 'NEW_PASSWORD_REQUIRED') {
                    const { requiredAttributes } = cuser.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
                    setCognitoUser(cuser);
                    const challenge: { [key: string]: string } = {}
                    challenge['password'] = ''
                    challenge['confirm_password'] = ''
                    requiredAttributes.forEach((attr: string) => {
                        challenge[attr] = ''
                    });

                    if ('gender' in challenge)
                        challenge['gender'] = 'M';
                    setChallenge(challenge);
                    console.log(challenge)

                } else {
                    try {
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        if (useAdminSessionCheck(cuser)) {
                            router.push('/admin/portal/dashboard');

                        }
                    } catch (err) {
                        setChallenge(null);
                        setChallengeErrMes('');
                        setErrMess(`${err}`)
                    }

                }

            })
            .catch(error => {
                setErrMess("Incorrect username or password.");
            })
    };

    const completeChallenge = () => {

        setChallengeErrMes('')
        if (challenge != null) {
            if (challenge?.confirm_password == '' || challenge?.gender == '' || challenge?.name == '' || challenge?.password == '') {
                setChallengeErrMes("Missing required Attribute, please check");
                return;
            }

            if (challenge?.confirm_password != challenge?.password) {
                setChallengeErrMes("Password and Confirm Password is not match, please check")
                return;
            }

            if ('confirm_password' in challenge)
                delete challenge['confirm_password']


            console.log(challenge);
            const newPassword = challenge.password!;
            if ('password' in challenge)
                delete challenge['password']

            Auth.completeNewPassword(cognitoUser, newPassword, challenge)
                .then(user => {
                    try {
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        if (useAdminSessionCheck(user))
                            router.push('/admin/portal/dashboard');
                    } catch (err) {
                        setChallenge(null);
                        setChallengeErrMes('');
                        setErrMess(`${err}`)
                    }

                })
                .catch((err) => {
                    setChallengeErrMes(`${err}`)
                })
        }

    }

    // console.log(res)
    // // if(res)
    // //     router.push('./dashboard');

    // // eslint-disable-next-line react-hooks/rules-of-hooks
    // // let res = await Auth.currentAuthenticatedUser();
    // //  console.log(res.getAccessToken().payload.cognito.groups[0])


    return (
        <div className="w-full flex h-screen items-center">
            <Head>
                <title>Admin Portal</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            {challenge !== null ?

                <React.Fragment>
                    <div className="w-full p-5 -mt-12 md:w-1/2 md:max-w-xl">
                        <div className="flex flex-col px-12 md:px-14">
                            {challengeErrMes !== "" ?
                                <React.Fragment>

                                    <div className="bg-white border-l-4 border-red-500 text-red-700 p-4 mb-10 border" role="alert">
                                        <p className="font-bold">Update Failed</p>
                                        <p>{challengeErrMes}</p>
                                    </div>

                                </React.Fragment>
                                : <></>

                            }
                            <div className="text-left mb-5">You need to complete following information at first time login</div>
                            {'password' in challenge ?
                                <React.Fragment>
                                    <div className="py-2">
                                        <label className="text-sm text-left">New Password</label>
                                        <input placeholder="New Password" type="password" onChange={e => {
                                            setChallenge(preState => ({ ...preState, password: e.target.value }))
                                        }} value={challenge.password} />
                                    </div>
                                    <div className="py-2">
                                        <label className="text-sm text-left">Confirm New Password</label>
                                        <input placeholder="Confirm New Password" type="password" onChange={e => setChallenge(preState => ({ ...preState, confirm_password: e.target.value }))} value={challenge.confirm_password} />
                                    </div>
                                </React.Fragment>
                                : <></>
                            }
                            {'name' in challenge ?
                                <React.Fragment>
                                    <div className="py-2">
                                        <label className="text-sm text-left">Name</label>
                                        <input placeholder="Confirm New Password" type="text" onChange={e => setChallenge(preState => ({ ...preState, name: e.target.value }))} value={challenge.name} />

                                    </div>
                                </React.Fragment>
                                : <></>
                            }
                            {'gender' in challenge ?

                                <React.Fragment>
                                    <div className="py-2">
                                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                            Gender
                                        </label>
                                        <select
                                            id="gender"
                                            name="gender"
                                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm  sm:text-sm"
                                            onChange={e => setChallenge(preState => ({ ...preState, gender: e.currentTarget.value }))}
                                        >
                                            <option value='M' defaultChecked={true}>M</option>
                                            <option value='F'>F</option>
                                        </select>
                                    </div>
                                </React.Fragment>
                                : <></>
                            }

                            <div className="py-2 mt-6">
                                <button type="button" className="rounded text-white bg-black p-2 cursor-pointer w-full md:px-8 hover:bg-gray-900" onClick={completeChallenge}>Submit</button>
                            </div>
                        </div>
                    </div>
                </React.Fragment>

                :
                <React.Fragment>
                    <div className="w-full p-5 -mt-12 md:w-1/2 md:max-w-xl">
                        <div className="flex flex-col px-12 md:px-14">
                            {errMess !== "" ?
                                <React.Fragment>

                                    <div className="bg-white border-l-4 border-red-500 text-red-700 p-4 mb-10 border" role="alert">
                                        <p className="font-bold">Login Failed</p>
                                        <p>{errMess}</p>
                                    </div>

                                </React.Fragment>
                                : <></>

                            }
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
                                    <button type="button" className="rounded text-white bg-black p-2 cursor-pointer w-full md:px-8 hover:bg-gray-900" onClick={(e) => login(e)}>Login</button>
                                </div>
                            </React.Fragment>
                        </div>
                    </div>

                </React.Fragment>


            }
            <div className="hidden md:h-screen md:block md:w-1/2 lg:w-8/12 xl:flex-auto relative">
                <img
                    alt="Login Background Image"
                    src="/admin-login-bg.jpg"
                    className="object-cover w-full h-screen hidden md:block"
                />
            </div>
        </div >
    )


}

export default AdminLogin;