import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { useState, useEffect, MouseEventHandler } from "react";

const VerifyPage = ({ email }: { email: string }) => {
    const router = useRouter();
    const [code, setCode] = useState<string>('');
    const [errMes, setErrMes] = useState<string>('');


    const verify = async () => {
        try {
            await Auth.confirmSignUp(email, code);
            router.push('/login')
        } catch (err) {
            setErrMes('Verify Code is incorrect')
        }
    }

    return (
        <section className="h-screen bg-gray-50 dark:bg-gray-900">
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
                            Verify Your account
                        </h1>
                        <div className="space-y-4 md:space-y-6" >
                            <div>
                                <p className=" text-gray-500 pb-8">The verify code is sending to {email}</p>

                                <input type="text"
                                    name="code" id="code"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                    placeholder="Verify code"
                                    required
                                    value={code}
                                    onChange={(e) => {
                                        setCode(e.target.value)
                                    }}
                                />
                            </div>
                            <button


                                className="cursor-pointer w-full text-white bg-[#405DE6] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:bg-[#233dc1] font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-[#667adf]"
                                onClick={() => verify()}>Verify</button>
                            <button
                                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                                onClick={(e) => {
                                    Auth.resendSignUp(email);
                                    e.currentTarget.disabled = true
                                    e.currentTarget.value = 'Please wait 60s'
                                    setTimeout(() => {
                                        e.currentTarget.disabled = false
                                    }, 1000*60)
                                }}>Resend</button>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default VerifyPage;