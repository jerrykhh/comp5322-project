/* eslint-disable @next/next/no-img-element */
import { DataStore } from "aws-amplify";
import React, { useContext, useEffect, useState } from "react"
import ImageView from "../components/lib/element/imageView";
import Page from "../components/template/Page"
import { Pet, PetAdoptionStatus } from "../models";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { UserContext } from "../contexts/user/user";
import { useRouter } from "next/router";

const AdoptionPage = () => {

    const router = useRouter();
    const [pets, setPets] = useState<Pet[]>([]);
    const [pet, setPet] = useState<Pet | null>(null);

    const [openModal, setOpenModal] = useState<boolean>(false);

    const { user, setUser } = useContext(UserContext);


    const adoption = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (user === null){
            router.push('/login', {
                query: {
                    pre: 'adoptions',
                    id: `${pet!.id}`
                }
            });
        }else{
            router.push(`/adoptions/${pet!.id}`)
        }
        
    }

    useEffect(() => {

        DataStore.query(Pet, (c) =>
            c.or((c) => c.adoption_status('eq', PetAdoptionStatus.PENDING).adoption_status('eq', PetAdoptionStatus.SBO))).then((resPets) => {
                console.log(resPets)
                setPets(resPets)
            });


    }, []);

    useEffect(() => {
        console.log(pet);
    }, [pet])

    return (

        <Page
            category={
                <React.Fragment>

                    <div className="hidden md:block relative mx-auto w-48 overflow-hidden rounded-lg bg-slate-200 shadow-xl shadow-slate-200 sm:w-64 sm:rounded-xl md:w-auto md:rounded-2xl">

                        {pet === null ?
                            <img src="/images/logo.jpg" alt="Logo image" />
                            : (pet.image && pet.image !== '') ?
                                <ImageView src={pet.image!} alt={`${pet.name} image`} />
                                : <ImageView default={true} alt="default image" />
                        }

                        <div className="inset-0 rounded-lg ring-1 ring-inset ring-black/10 sm:rounded-xl lg:rounded-2xl"></div>
                    </div>
                    <div className="mt-10 text-center lg:mt-12 lg:text-left">
                        {pet === null ?
                            <p className="text-xl font-bold text-slate-900">Animals for Adoption</p>
                            :
                            pet.name ?
                                <p className="text-xl font-bold text-slate-900">{pet!.name}</p>
                                : <></>
                        }
                        {pet === null ?
                            <p className="mt-3 text-lg font-medium leading-8 text-slate-700">
                                One adoption saves two lives. Every time a lucky animal leaves our adoption center, a place will be vacated so that another animal can wait in the center to find a new home!

                            </p>
                            :
                            pet.description ?
                                <p className="mt-3 text-lg font-medium leading-8 text-slate-700">{pet.description}</p>
                                : <></>
                        }

                    </div>
                    {pet ?
                        <section className="mt-3 hidden  lg:block">
                            <h2 className="flex items-center font-mono text-sm font-medium leading-7 text-slate-900">
                                <svg aria-hidden="true" viewBox="0 0 10 10" className="h-2.5 w-2.5">
                                    <path d="M0 5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5Z" className="fill-violet-300"></path>
                                    <path d="M6 1a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V1Z" className="fill-pink-300"></path>
                                </svg>
                                <span className="ml-2.5">About</span>
                            </h2>
                            <p className="mt-2 text-base leading-7 text-slate-700 lg:line-clamp-4">

                                {Object.keys(pet).map((key, i) => {
                                    const value = pet[key as keyof typeof pet];
                                    if (key.charAt(0) === '_' || key.toLowerCase() === "image" || key.toLowerCase() === 'name')
                                        return;
                                    return (
                                        (value) ?
                                            <p key={i} className="py-2 text-sm text-gray-600">
                                                {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                                            </p>
                                            : <></>


                                    )
                                })}
                            </p>
                            <button className="default-btn w-full mt-4" onClick={(e) => adoption(e)}>Adoption</button>
                        </section>
                        : <></>
                    }
                </React.Fragment>
            }
            title={`Adoption ${(pet !== null) ? `> ${pet.id}` : ''}`} >
            <React.Fragment>
                {pet !== null && openModal ?
                    <div className="top-0 left-0 absolute z-30 w-full lg:hidden">
                        <div className="w-full bg-gray-50 z-20">

                            <XMarkIcon className="w-12 h-12 right-0 top-0 absolute m-5 cursor-pointer " onClick={() => setOpenModal(false)} />

                            <div className="px-12 py-28 md:px-44">
                                <div className="block mx-auto w-3/4">

                                    {pet === null ?
                                        <img src="/images/logo.jpg" alt="Logo image" />
                                        : (pet.image && pet.image !== '') ?
                                            <ImageView src={pet.image} alt={`${pet.name} image`} className="h-96 md:h-72 object-contain rounded " />
                                            : <ImageView default={true} alt="default image" className="h-96 md:h-72 object-contain rounded" />
                                    }

                                    <div className=" inset-0 rounded-lg ring-1 ring-inset ring-black/10"></div>
                                </div>
                                <div className="mt-10 text-center lg:mt-12 lg:text-left">
                                    {pet === null ?
                                        <p className="text-xl font-bold text-slate-900">Animals for Adoption</p>
                                        :
                                        pet.name ?
                                            <p className="text-xl font-bold text-slate-900">{pet!.name}</p>
                                            : <></>
                                    }
                                    {pet === null ?
                                        <p className="mt-3 text-lg font-medium leading-8 text-slate-700">
                                            One adoption saves two lives. Every time a lucky animal leaves our adoption center, a place will be vacated so that another animal can wait in the center to find a new home!

                                        </p>
                                        :
                                        pet.description ?
                                            <p className="mt-3 text-lg font-medium leading-8 text-slate-700">{pet.description}</p>
                                            : <></>
                                    }

                                </div>
                                {pet ?
                                    <section className="mt-3">
                                        <h2 className="flex items-center font-mono text-sm font-medium leading-7 text-slate-900">
                                            <svg aria-hidden="true" viewBox="0 0 10 10" className="h-2.5 w-2.5">
                                                <path d="M0 5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5Z" className="fill-violet-300"></path>
                                                <path d="M6 1a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V1Z" className="fill-pink-300"></path>
                                            </svg>
                                            <span className="ml-2.5">About</span>
                                        </h2>
                                        <p className="mt-2 text-base leading-7 text-slate-700">

                                            {Object.keys(pet).map((key, i) => {
                                                const value = pet[key as keyof typeof pet];
                                                if (key.charAt(0) === '_' || key.toLowerCase() === "image" || key.toLowerCase() === 'name')
                                                    return;
                                                return (
                                                    (value) ?
                                                        <p key={i} className="py-2 text-sm text-gray-600">
                                                            {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                                                        </p>
                                                        : <></>

                                                )
                                            })}
                                        </p>
                                        <button className="default-btn w-full mt-20" onClick={(e) => adoption(e)}>Adoption</button>
                                    </section>
                                    : <></>
                                }
                            </div>
                        </div>
                    </div>
                    : <></>
                }
                <div className="3xl:container 3xl:mx-auto">
                    <div className={`col-span-1 h-full xl: ${(pet !== null) ? 'xl:col-span-3' : 'xl:col-span-4'}`}>

                        <div className="bg-white px-8 py-2">

                            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 xl:grid-cols-3 xl:gap-x-12 3xl:grid-cols-4 md:p-4">
                                {pets.map((petObj, i) => (
                                    <div key={i} className={`group relative ${(i < 4) ? '' : 'mt-3'}`} onClick={() => {
                                        setOpenModal(true);
                                        setPet(petObj);

                                    }}>

                                        {(petObj.image && petObj.image !== '') ?
                                            <ImageView
                                                src={petObj.image!}
                                                alt={`${petObj.name} image`}
                                                className="object-cover h-96 w-full md:h-72 xl:h-52 2xl:h-56 3xl:h-60 rounded-lg"
                                            />
                                            : <ImageView default={true} alt="default image" className="w-full object-cover h-96 md:h-72 xl:h-52 2xl:h-56 3xl:h-60 rounded-lg" />
                                        }


                                        <div className="mt-4">

                                            <h3 className="text-sm text-gray-700">
                                                <div className="cursor-pointer">
                                                    <span aria-hidden="true" className="absolute inset-0" />
                                                    {petObj.name}
                                                </div>
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500">{petObj.breed}</p>

                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>

            </React.Fragment>


        </Page >
    )

}

export default AdoptionPage;