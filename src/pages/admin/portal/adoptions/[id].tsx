import { API, DataStore, withSSRContext } from "aws-amplify";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getUser } from "../../../../components/lib/user/user";
import AdminPage from "../../../../components/template/AdminPage";
import { Adoption, AdoptionStatus, OrderStatus } from "../../../../models";
import { CognitoUserData } from "../../../../typing/user";
import Moment from "react-moment"
import { WarningAlert } from "../../../../components/modal";
import { GetServerSideProps } from "next";
import { useAdminSessionCheck } from "../../../../components/lib/auth/admin-auth";

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    try {
        const { Auth } = withSSRContext({ req });
        const user = await Auth.currentSession();
        console.log(user)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        if (!useAdminSessionCheck(user, true)) {
            return {
                redirect: {
                    permanent: false,
                    destination: "/admin/portal/login"
                },
                props: {}
            }
        }
    } catch (err) {
        console.log(err)
    }

    return {
        props: {}
    }
}


const AdminAdoptionDetialsPage = () => {

    const router = useRouter();
    const [adoption, setAdoption] = useState<Adoption | null>(null);
    const [sucMes, setSucMes] = useState<string>('');
    const [errMes, setErrMes] = useState<string>('');
    const [readOnlyMode, setReadOnlyMode] = useState<boolean>(false);
    const [deletingAdoption, setDeletingAdoption] = useState<Adoption| null>(null);


    const [user, setUser] = useState<CognitoUserData>({
        UserAttributes: [],
        UserCreateDate: '',
        UserLastModifiedDate: '',
        UserStatus: ''
    })

    useEffect(() => {
        if (!router.isReady)
            return;
        const { id, action } = router.query;
        if (!id)
            router.back()

        if (action)
            setReadOnlyMode(true);

        const fetchData = async (id: string) => {
            const adoptionData = await DataStore.query(Adoption, id!.toString());
            console.log(adoptionData);

            if (!adoptionData)
                router.push('/adoptions')
            const userData = await getUser(adoptionData!.userId!);
            setAdoption(adoptionData!)
            setUser(userData)
        }

        fetchData(id!.toString())

    }, [router, router.isReady, router.query]);

    const updateStatus = async (status: AdoptionStatus) => {
        try {
            setSucMes('')
            const newAdoption = await DataStore.save(
                Adoption.copyOf(adoption!, updated => {
                    updated.status = status
                })
            );

            setAdoption(newAdoption);
            setSucMes(`Status of Adoption Request ${adoption!.id} is updated`)
            if(status === AdoptionStatus.REJECT)
                router.push('/admin/portal/adoptions')
        } catch (err) {
            setErrMes(`${err}`)
        }
    }

    return (
        <AdminPage
            pageName="Adoption Request">
            {deletingAdoption !== null ?
                <WarningAlert
                    title="Deleting the Adoption request"
                    message={`Are you sure you want to Reject this Request ? This action cannot be undone`}
                    onConfirm={() => updateStatus(AdoptionStatus.REJECT)}
                    onCancel={() => setDeletingAdoption(null)} />
                : <></>
            }
            <div className="container mx-auto">
                <div className="mb-6">
                    <button onClick={() => router.back()} className="w-full bg-black text-white rounded p-2  hover:bg-gray-800 md:w-auto md:bg-white md:text-black md:hover:bg-white md:px-0 md:p-0"> &lt; Back</button>
                </div>
                {sucMes !== "" ?

                    <div className="mb-10">
                        {sucMes !== "" ?

                            <div className="bg-teal-100 border-t border-b border-teal-500 text-teal-700 px-4 py-3" role="alert">
                                <p className="font-bold">Successful Message</p>
                                <p className="text-sm">{sucMes}</p>
                            </div>
                            : <></>
                        }
                    </div>
                    : <></>
                }
                {errMes !== "" ?
                    <div className="my-12 bg-red-100 border  border-red-500 text-red-700 px-4 py-3" role="alert">
                        <p className="font-bold">Error message</p>
                        <p className="text-sm">{errMes}</p>
                    </div>
                    : <></>
                }
                {adoption && readOnlyMode ?
                    <div className="my-4 flex-col lg:flex justify-end">
                        {adoption?.status !== AdoptionStatus.REJECT ?
                            <React.Fragment>
                                <div className="lg:flex">
                                    <span className="hidden">Change Status: </span>
                                    <button
                                        type="button"
                                        className="w-full my-3 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
                                        onClick={() => {
                                            updateStatus(AdoptionStatus.CONFIRM)
                                        }}
                                    >
                                        CONFIRM
                                    </button>

                                    <button
                                        type="button"
                                        className="w-full  my-3  text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
                                        onClick={() => {
                                            updateStatus(AdoptionStatus.WAITING)
                                        }}
                                    >
                                        WAITING
                                    </button>
                                    <button
                                        type="button"
                                        className="w-full  my-3  focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                                        onClick={() => {
                                            setDeletingAdoption(adoption)
                                        }}
                                    >
                                        Reject
                                    </button>
                                </div>
                            </React.Fragment>
                            : <></>

                        }


                    </div>
                    : <></>
                }
                <div className="my-2 text-sm">
                    <p>Adoption Request ID: {adoption?.id}</p>
                    {(adoption?.createdAt) ?
                        <p>Adoption Request CreatedAt: <Moment>{adoption!.createdAt}</Moment></p>
                        : <></>
                    }
                    {(adoption?.updatedAt) ?
                        <p>Adoption Request UpdatedAt: <Moment>{adoption!.updatedAt}</Moment></p>
                        : <></>
                    }
                    <p>Status: {adoption?.status}</p>



                </div>
                <div className="bg-white shadow sm:rounded-lg my-6">

                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">User Information</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details</p>
                    </div>
                    <div className="border-t border-gray-200">
                        <dl>
                            {user.UserAttributes.map((item, i) => {
                                return (
                                    <div key={i} className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">{item.Name}</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{item.Value}</dd>
                                    </div>
                                )
                            })
                            }
                        </dl>
                        <dl>
                            <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Contact</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{adoption?.contact}</dd>
                            </div>
                        </dl>
                        <dl>
                            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Introduction</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 break-space">{adoption?.description}</dd>
                            </div>
                        </dl>
                    </div>
                </div>

                {(adoption?.Pet) ?
                    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Pet Information ({adoption?.Pet!.id})</h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">Pet details</p>
                        </div>
                        <div className="border-t border-gray-200">
                            <dl>
                                <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Name</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-4 sm:mt-0">{adoption!.Pet!.name}</dd>
                                </div>
                                <div className="bg-gray-50  px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Breed</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-4 sm:mt-0">{adoption!.Pet!.breed}</dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Size</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-4 sm:mt-0">{adoption!.Pet!.size}</dd>
                                </div>
                                <div className="bg-gray-50  px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Description</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-4 sm:mt-0">{adoption!.Pet!.note}</dd>
                                </div>

                            </dl>
                        </div>


                    </div>
                    : <></>

                }
            </div>
        </AdminPage>
    )
}

export default AdminAdoptionDetialsPage;