/* eslint-disable @next/next/no-img-element */
import { DataStore, withSSRContext } from "aws-amplify";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import ImageView from "../../components/lib/element/imageView";
import Page from "../../components/template/Page"
import { UserContext } from "../../contexts/user/user";
import { Adoption, AdoptionStatus, Pet, PetAdoptionStatus, PetType } from "../../models";
import Moment from 'react-moment';
import { getUserContextUserId } from "../../components/lib/user/user";

// export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
//     try {
//         const { Auth } = withSSRContext({ req });
//         const user = await Auth.currentSession();
//         console.log(user);

//         const { id } = query;
//         if (!id)
//             throw Error("id not found")

//         const pet = await DataStore.query(Pet, id!.toString())
//         const petData = JSON.stringify(pet)

//         return {
//             props: {
//                 petData
//             }
//         }

//     } catch (err) {
//         console.log('err')
//         console.log(err)
//     }

//     return {
//         redirect: {
//             permanent: false,
//             destination: "/adoptions"
//         },
//         props: {}
//     }
// }


const CreateAdoptionPage = () => {

    const router = useRouter();



    const [pet, setPet] = useState<Pet>({
        id: '',
        name: '',
        breed: '',
        size: 'Little <10kg',
        gender: 'M',
        birthday: '',
        note: '',
        description: '',
        adoption_status: PetAdoptionStatus.SBO,
        type: PetType.CAT,
        microchip: '',
        image: ''
    });

    const [errMess, setErrMes] = useState<String>('');

    const { user, setUser } = useContext(UserContext);

    const [adoptionRequest, setAdoptionRequest] = useState<Adoption>({
        id: v4(),
        contact: '',
        status: AdoptionStatus.REQUEST,
        description: '',
        Pet: null,
        userId: '',
    })

    const request = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setErrMes('')
        if (adoptionRequest.contact === '' || adoptionRequest.description === '') {
            setErrMes('Please enter all fields!')
            return;
        } else {

            try {
                console.log(adoptionRequest)
                const res = await DataStore.save(new Adoption(adoptionRequest))
                router.push(`/user/adoptions?id=${res!.id}`);

            } catch (err) {
                setErrMes('Unknow Error ' + err)
            }
        }
    }



    useEffect(() => {

        if (!router.isReady)
            return;

        const { id } = router.query;
        console.log(id);
        if (!user || user === null)
            router.back()


        if (!id)
            router.push('/adoptions/')
        else {

            const fetechData = async (i: string) => {
                try {
                    const petData = await DataStore.query(Pet, i)
                    console.log(petData);

                    const userId = await getUserContextUserId(user!, 'email')
                    console.log(userId);

                    setPet(petData!)

                    setAdoptionRequest(preState => ({
                        ...preState,
                        adoptionPetId: petData!.id.toString(),
                        Pet: petData,
                        userId: userId
                    }))
                } catch (err) {
                    router.back()
                }
            }

            fetechData(id!.toString());

        }



    }, [router, router.isReady, router.query, user])


    return (

        <Page
            category={

                (pet) ?
                    <React.Fragment>
                        <div className="hidden md:block relative mx-auto w-48 overflow-hidden rounded-lg bg-slate-200 shadow-xl shadow-slate-200 sm:w-64 sm:rounded-xl md:w-auto md:rounded-2xl">

                            {pet === null ?
                                <img src="/images/logo.jpg" alt="Logo image" />
                                : (pet!.image && pet!.image !== '') ?
                                    <ImageView src={pet!.image!} alt={`${pet!.name} image`} />
                                    : <ImageView default={true} alt="default image" />
                            }

                            <div className="inset-0 rounded-lg ring-1 ring-inset ring-black/10 sm:rounded-xl lg:rounded-2xl"></div>
                        </div>
                        <div className="mt-10 text-center lg:mt-12 lg:text-left">
                            {pet === null ?
                                <div className="text-xl font-bold text-slate-900">Animals for Adoption</div>
                                :
                                pet!.name ?
                                    <div className="text-xl font-bold text-slate-900">{pet!.name}</div>
                                    : <></>
                            }
                            {pet === null ?
                                <div className="mt-3 text-lg font-medium leading-8 text-slate-700">
                                    One adoption saves two lives. Every time a lucky animal leaves our adoption center, a place will be vacated so that another animal can wait in the center to find a new home!

                                </div>
                                :
                                pet!.description ?
                                    <div className="mt-3 text-lg font-medium leading-8 text-slate-700">{pet.description}</div>
                                    : <></>
                            }

                        </div>

                        <section className="mt-3 hidden  lg:block">
                            <h2 className="flex items-center font-mono text-sm font-medium leading-7 text-slate-900">
                                <svg aria-hidden="true" viewBox="0 0 10 10" className="h-2.5 w-2.5">
                                    <path d="M0 5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5Z" className="fill-violet-300"></path>
                                    <path d="M6 1a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V1Z" className="fill-pink-300"></path>
                                </svg>
                                <span className="ml-2.5">About</span>
                            </h2>
                            <div className="mt-2 text-base leading-7 text-slate-700 lg:line-clamp-4">

                                {Object.keys(pet).map((key, i) => {
                                    const value = pet[key as keyof typeof pet];
                                    if (key.charAt(0) === '_' || key.toLowerCase() === "image" || key.toLowerCase() === 'name')
                                        return;
                                    // console.log(key)
                                    if (key.toLowerCase() === "createdat" || key.toLowerCase() === "updatedat") {
                                        return (
                                            (value && value !== '') ? <p className="py-2 text-sm text-gray-600">{key.charAt(0).toUpperCase() + key.slice(1)}: <Moment>{value}</Moment></p> : <></>
                                        )
                                    } else {
                                        return (
                                            (value) ?
                                                <p key={i} className="py-2 text-sm text-gray-600">
                                                    {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                                                </p>
                                                : <></>


                                        )
                                    }

                                })}
                            </div>
                        </section>

                    </React.Fragment>
                    : <></>



            }
            title={`Adoption > ${pet?.id}`}>
            <div className="container mx-auto">

                <div className="mt-20 md:mt-12 3xl:mt-32">


                    <div className="sm:overflow-hidden sm:rounded-md">
                        <div className="space-y-6 bg-white px-4 py-5 sm:p-6">

                            <div className="mb-6">
                                <button className="back-btn" onClick={() => router.back()}> &lt; Back</button>
                            </div>

                            {errMess !== "" ?
                                <React.Fragment>

                                    <div className="bg-white border-l-4 border-red-500 text-red-700 p-4 mb-10 border" role="alert">
                                        <p className="font-bold">Error Message</p>
                                        <p>{errMess}</p>
                                    </div>

                                </React.Fragment>
                                : <></>

                            }
                            <h2>Adoption Form #{pet!.id}</h2>
                            <div className="grid grid-cols-3 gap-6">
                                <div className="col-span-3 sm:col-span-2">
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700" >
                                        Phone No.
                                    </label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="text"
                                        maxLength={12}
                                        autoComplete="email"
                                        required
                                        className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Phone No."
                                        value={adoptionRequest.contact}
                                        onChange={(e) => setAdoptionRequest(preStatus => ({
                                            ...preStatus,
                                            contact: e.target.value
                                        }))}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        id="about"
                                        name="about"
                                        rows={4}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="About you"
                                        value={adoptionRequest.description!}
                                        onChange={(e) => setAdoptionRequest(preStatus => ({
                                            ...preStatus,
                                            description: e.target.value
                                        }))}
                                    />
                                </div>
                                <p className="mt-2 text-sm text-gray-500">
                                    Brief description for your profile.
                                </p>
                            </div>



                        </div>
                        <div className="lg:bg-gray-50 px-4 py-3 text-right sm:px-6 lg:mt-32 mt-12">
                            <button
                                type="submit"
                                className="inline-flex w-full md:w-auto justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={(e) => request(e)}
                            >
                                Request
                            </button>
                        </div>
                    </div>

                </div>
            </div>

        </Page>



    )
}

export default CreateAdoptionPage;