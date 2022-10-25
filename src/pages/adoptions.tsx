/* eslint-disable @next/next/no-img-element */
import { DataStore } from "aws-amplify";
import React, { useEffect, useState } from "react"
import Page from "../components/template/Page"
import { Pet, PetAdoptionStatus } from "../models";

const AdoptionPage = () => {

    // const [pets, setPets] = useState<Pet[]>([]);
    const [pet, setPet] = useState<Pet | null>(null);

    const pets: Pet[] = [
        {
            id: '',
            name: 'sgf1',
            breed: 'asd',
            size: '< 10',
            gender: 'M',
            birthday: '2022-0123',
            note: 'note',
            adoption_status: 'PENDING',
            type: 'CAT',
            microchip: 'sdf1234qe',
            description: 'sdafsdafasdfasd',
            image: 'https://www.cbc.ca/kids/images/chinaanimals_header.jpg'

        },
        {
            id: '',
            name: 'sgf2',
            breed: 'asd',
            size: '< 10',
            gender: 'M',
            birthday: '2022-0123',
            note: 'note',
            adoption_status: 'PENDING',
            type: 'CAT',
            microchip: 'sdf1234qe',
            description: 'sdafsdafasdfasd',
            image: 'https://www.cbc.ca/kids/images/chinaanimals_header.jpg'

        },
        {
            id: '',
            name: 'sgf3',
            breed: 'asd',
            size: '< 10',
            gender: 'M',
            birthday: '2022-0123',
            note: 'note',
            adoption_status: 'PENDING',
            type: 'CAT',
            microchip: 'sdf1234qe',
            description: 'sdafsdafasdfasd',
            image: 'https://www.cbc.ca/kids/images/chinaanimals_header.jpg'

        },
        {
            id: '',
            name: 'sgf4',
            breed: 'asd',
            size: '< 10',
            gender: 'M',
            birthday: '2022-0123',
            note: 'note',
            adoption_status: 'PENDING',
            type: 'CAT',
            microchip: 'sdf1234qe',
            description: 'sdafsdafasdfasd',
            image: 'https://www.cbc.ca/kids/images/chinaanimals_header.jpg'

        },
        {
            id: '',
            name: 'sgf5',
            breed: 'asd',
            size: '< 10',
            gender: 'M',
            birthday: '2022-0123',
            note: 'note',
            adoption_status: 'PENDING',
            type: 'CAT',
            microchip: 'sdf1234qe',
            description: 'sdafsdafasdfasd',
            image: 'https://www.cbc.ca/kids/images/chinaanimals_header.jpg'

        }, {
            id: '',
            name: 'sgf5',
            breed: 'asd',
            size: '< 10',
            gender: 'M',
            birthday: '2022-0123',
            note: 'note',
            adoption_status: 'PENDING',
            type: 'CAT',
            microchip: 'sdf1234qe',
            description: 'sdafsdafasdfasd',
            image: 'https://www.cbc.ca/kids/images/chinaanimals_header.jpg'

        }, {
            id: '',
            name: 'sgf5',
            breed: 'asd',
            size: '< 10',
            gender: 'M',
            birthday: '2022-0123',
            note: 'note',
            adoption_status: 'PENDING',
            type: 'CAT',
            microchip: 'sdf1234qe',
            description: 'sdafsdafasdfasd',
            image: 'https://www.cbc.ca/kids/images/chinaanimals_header.jpg'

        }, {
            id: '',
            name: 'sgf5',
            breed: 'asd',
            size: '< 10',
            gender: 'M',
            birthday: '2022-0123',
            note: 'note',
            adoption_status: 'PENDING',
            type: 'CAT',
            microchip: 'sdf1234qe',
            description: 'sdafsdafasdfasd',
            image: 'https://www.cbc.ca/kids/images/chinaanimals_header.jpg'

        }, {
            id: '',
            name: 'sgf5',
            breed: 'asd',
            size: '< 10',
            gender: 'M',
            birthday: '2022-0123',
            note: 'note',
            adoption_status: 'PENDING',
            type: 'CAT',
            microchip: 'sdf1234qe',
            description: 'sdafsdafasdfasd',
            image: 'https://www.cbc.ca/kids/images/chinaanimals_header.jpg'

        }, {
            id: '',
            name: 'sgf5',
            breed: 'asd',
            size: '< 10',
            gender: 'M',
            birthday: '2022-0123',
            note: 'note',
            adoption_status: 'PENDING',
            type: 'CAT',
            microchip: 'sdf1234qe',
            description: 'sdafsdafasdfasd',
            image: 'https://www.cbc.ca/kids/images/chinaanimals_header.jpg'

        }, {
            id: '',
            name: 'sgf5',
            breed: 'asd',
            size: '< 10',
            gender: 'M',
            birthday: '2022-0123',
            note: 'note',
            adoption_status: 'PENDING',
            type: 'CAT',
            microchip: 'sdf1234qe',
            description: 'sdafsdafasdfasd',
            image: 'https://www.cbc.ca/kids/images/chinaanimals_header.jpg'

        },
    ]
    useEffect(() => {

        // DataStore.query(Pet, (c) => 
        //     c.or( (c) => c.adoption_status('eq', PetAdoptionStatus.PENDING).adoption_status('eq', PetAdoptionStatus.SBO))).then((resPets) => {
        //         setPets(pets)
        //     });

    }, []);

    return (

        <Page
            category={
                <React.Fragment>

                    <div className="relative mx-auto block w-48 overflow-hidden rounded-lg bg-slate-200 shadow-xl shadow-slate-200 sm:w-64 sm:rounded-xl lg:w-auto lg:rounded-2xl">
                        
                        {pet === null ?
                            <img src="/images/logo.jpg" alt="Logo image" />
                            : pet.image && pet.image !== '' ?
                                <img src={pet.image} alt={`${pet.name} image`} />
                                : <img src="/images/default/default-pet.jpg" alt="default image" />
                        }

                        <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/10 sm:rounded-xl lg:rounded-2xl"></div>
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
                                    if (key.toLowerCase() === "image" || key.toLowerCase() === 'name')
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
                            <button className="default-btn w-full mt-4">Adoption</button>
                        </section>
                        : <></>
                    }
                </React.Fragment>
            }


            //     pet ?
            //         <React.Fragment >
            //             <div className={`hidden p-4 xl:block ${(pet !== null) ? 'xl:col-span-1' : ''}`}>
            //                 <p className="py-4">
            //                     {(pet?.image) ?
            //                         <img src={pet.image!} alt={`${pet.name} image`} className="rounded-md object-contain" />
            //                         : <img src="/default-pet.jpg" alt="pet default photo" className="rounded-md" />

            //                     }
            //                 </p>
            //                 <div className="border-b border-grey py-1"></div>
            // {Object.keys(pet).map((key, i) => {
            //     const value = pet[key as keyof typeof pet];
            //     if (key.toLowerCase() === "image")
            //         return
            //     return (
            //         (value) ?
            //             <p key={i} className="py-2 text-sm text-gray-600">
            //                 {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
            //             </p>
            //             : <></>


            //     )
            // })

            //                 }
            //                 <button className="default-btn w-full mt-4">Adoption</button>
            //             </div>
            //         </React.Fragment >
            //         : null
            // }


            title={`Adoption ${(pet !== null)? `> ${pet.id}`: ''}`} >



            <div className={`col-span-1 h-full xl: ${(pet !== null) ? 'xl:col-span-3' : 'xl:col-span-4'}`}>

                <div className="bg-white px-8 py-2">

                    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 xl:grid-cols-3 xl:gap-x-8 3xl:grid-cols-4">
                        {pets.map((pet, i) => (
                            <div key={i} className={`group relative ${(i < 3) ? '' : 'mt-3'}`} onClick={() => {
                                console.log('ert');
                                setPet(pet)
                            }}>
                                <div className="min-h-40 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75 xl:aspect-none xl:h-44">
                                    <img
                                        src={(pet.image) ? pet.image : '/default-pet.jpg'}
                                        alt={`${pet.name} image`}
                                        className="h-full w-full object-cover object-center xl:h-full xl:w-full"
                                    />
                                </div>
                                <div className="mt-4">
                                    <div>
                                        <h3 className="text-sm text-gray-700">
                                            <div className="cursor-pointer">
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                {pet.name}
                                            </div>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">{pet.breed}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>



        </Page >
    )

}

export default AdoptionPage;