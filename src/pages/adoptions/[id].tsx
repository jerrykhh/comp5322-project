/* eslint-disable @next/next/no-img-element */
import { DataStore, withSSRContext } from "aws-amplify";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import ImageView from "../../components/lib/element/imageView";
import Page from "../../components/template/Page"
import { Pet } from "../../models";

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    try {
        const { Auth } = withSSRContext({ req });
        const user = await Auth.currentSession();

        const { id } = query;
        if (!id)
            throw Error("id not found")

        const pet = await DataStore.query(Pet, id!.toString())

        return {
            redirect: {
                permanent: false,
                destination: "/login"
            },
            props: {pet}
        }

    } catch (err) {
        console.log(err)
    }

    return {
        redirect: {
            permanent: false,
            destination: "/adoptions"
        },
        props: {}
    }
}


const CreateAdoptionPage = ({pet}: {pet: Pet}) => {

    const router = useRouter();

    const [petData, setPetData] = useState<Pet>(pet);

    return (
        <Page
            category={
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
                            <p className="text-xl font-bold text-slate-900">Animals for Adoption</p>
                            :
                            pet!.name ?
                                <p className="text-xl font-bold text-slate-900">{pet!.name}</p>
                                : <></>
                        }
                        {pet === null ?
                            <p className="mt-3 text-lg font-medium leading-8 text-slate-700">
                                One adoption saves two lives. Every time a lucky animal leaves our adoption center, a place will be vacated so that another animal can wait in the center to find a new home!

                            </p>
                            :
                            pet!.description ?
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
                        </section>
                        : <></>
                    }
                </React.Fragment>
            }
            title={`Adoption > ${pet?.id}`}>
            <div className="3xl:container 3xl:mx-auto">
                asd
            </div>

        </Page>
    )
}

export default CreateAdoptionPage;