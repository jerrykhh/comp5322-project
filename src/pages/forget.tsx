import { Auth } from "aws-amplify";
import { useState } from "react";
import VerifyPage from "../components/template/VerifyPage";

const ForgetPwdPage = () => {

    const [username, setUsername] = useState<string>('');
    const [errMes, setErrMes] = useState<string>('');
    const [changeToVerify, setChangeToVerify] = useState<boolean>(false);

    const forget = async () => {
        try {
            await Auth.forgotPassword(username)
            setChangeToVerify(true);
        }catch(err){
            setErrMes(`User not found`);
        }
        
    }


    return (
        (!changeToVerify) ?
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
                                Enter your email
                            </h1>
                            <div className="space-y-4 md:space-y-6" >
                                <div>
                                    <p className=" text-gray-500 pb-8">The verify code will send to following email addres</p>

                                    <input type="text"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                        placeholder="email"
                                        required
                                        value={username}
                                        onChange={(e) => {
                                            setUsername(e.target.value)
                                        }}
                                    />
                                </div>
                                <button
                                    className="text-gray-900 w-full bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                                    onClick={(e) => {
                                        forget()
                                    }}>Send Verify Code</button>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            : <VerifyPage email={username} forget={true} />


    )

}

export default ForgetPwdPage;