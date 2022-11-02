/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps } from "next";
import React, { useRef, useState } from "react";
import AdminPage from "../../../../components/template/AdminPage";
import { DataStore } from '@aws-amplify/datastore';
import { Pet, PetAdoptionStatus, PetType } from "../../../../models";
import { useRouter } from "next/router";
import { Storage, withSSRContext } from "aws-amplify";
import { v4 as uuidv4 } from 'uuid';
import { useAdminSessionCheck } from "../../../../components/lib/auth/admin-auth";


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    try {
        const {Auth} = withSSRContext({req});
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
    }catch(err){
        console.log(err)
    }

    return {
        props: {}
    }
}


const PetCreatePage = () => {

    const router = useRouter();
    const [pet, setPet] = useState<Pet>({
        id: uuidv4(),
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

    const inputImageRef = useRef<HTMLInputElement>(null);
    const reviewImageRef = useRef<HTMLImageElement>(null);
    const [photo, setPhoto] = useState<File | null>(null);


    const create = async () => {

        try {
            if (photo && photo !== null)
                await Storage.put(`${pet.image}`, photo);
            const res = await DataStore.save(
                new Pet(pet)
            );

            router.push(`/admin/portal/pets?pk=${res.id}`)
        } catch (error) {
            console.log(error);
        }
    }


    const uploadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length == 1) {
            const file: File = e.target.files[0]; 
            const id = uuidv4();
            const fileName = `pets/${id}.${file.name.split('.').pop()}`;
            setPet(preState => ({
                ...preState,
                image: fileName
            }))
            setPhoto(e.target.files[0]);
            reviewImageRef.current!.src = URL.createObjectURL(e.target.files[0]);

        }
    }

    return (
        <AdminPage
            pageName="Pet Create">
            <React.Fragment>
                <div className="mb-6">
                    <button onClick={() => router.back()}> &lt; Back</button>
                </div>
                <div className="mx-auto">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1">
                            <div className="px-4 sm:px-0">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">Pet Information</h3>
                                <p className="mt-1 text-sm text-gray-600">Write Down the Pet Information</p>
                            </div>
                        </div>
                        <div className="mt-5 md:col-span-2 md:mt-0">
                            <form action="#" method="POST">
                                <div className="overflow-hidden shadow sm:rounded-md">
                                    <div className="bg-white px-4 py-5 sm:p-6">
                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                                                    value={pet.name}
                                                    required
                                                    onChange={(e) => setPet(preState => ({ ...preState, name: e.target.value }))}
                                                />
                                            </div>
                                            <div className="col-span-6 sm:col-span-2">
                                                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                                    Gender
                                                </label>
                                                <select
                                                    id="gender"
                                                    name="gender"
                                                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm  sm:text-sm"
                                                    value={pet.gender!}
                                                    onChange={e => setPet(preState => ({ ...preState, gender: e.target.value }))}
                                                >
                                                    <option value={'M'} defaultChecked>M</option>
                                                    <option value={'F'}>F</option>
                                                </select>
                                            </div>
                                            <div className="col-span-6 sm:col-span-2">
                                                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                                    Type
                                                </label>
                                                <select
                                                    id="petType"
                                                    name="petType"
                                                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm  sm:text-sm"
                                                    value={pet.type!}
                                                    onChange={(e) => {
                                                        const petTypeIndex = Object.keys(PetType).indexOf(e.target.value.toUpperCase());
                                                        setPet(preState => ({ ...preState, type: Object.values(PetType)[petTypeIndex] }))

                                                    }}
                                                >
                                                    <option value={'CAT'}>CAT</option>
                                                    <option value={'DOG'}>DOG</option>
                                                    <option value={'RABBIT'}>RABBIT</option>
                                                    <option value={'OTHER'}>OTHER</option>
                                                </select>
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                    Breed
                                                </label>
                                                <input
                                                    type="text"
                                                    name="breed"
                                                    id="breed"
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                                                    value={pet.breed}
                                                    required
                                                    onChange={(e) => setPet(preState => ({ ...preState, breed: e.target.value }))}
                                                />
                                            </div>


                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                                    Birthday
                                                </label>
                                                <input
                                                    type="date"
                                                    name="birthday"
                                                    id="birthday"
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                                                    value={pet.birthday!}
                                                    onChange={e => setPet(preState => ({ ...preState, birthday: e.target.value }))}
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                                    Adopiton Status
                                                </label>
                                                <select
                                                    id="adoptionStatus"
                                                    name="adoptionStatus"
                                                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm  sm:text-sm"
                                                    value={pet.adoption_status!}
                                                    onChange={e => {

                                                        const adoptionStatusIndex = Object.keys(PetAdoptionStatus).indexOf(e.target.value.toUpperCase());

                                                        setPet(preState => ({
                                                            ...preState,
                                                            adoption_status: Object.values(PetAdoptionStatus)[adoptionStatusIndex]
                                                        }))
                                                    }}
                                                >
                                                    <option value='SBO'>SBO</option>
                                                    <option value='PENDING'>Pending</option>
                                                    <option value='HOLD'>Hold</option>
                                                </select>
                                            </div>

                                            <div className="col-span-6 sm:col-span-2">
                                                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                                    Size
                                                </label>
                                                <select
                                                    id="size"
                                                    name="size"
                                                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm  sm:text-sm"
                                                    value={pet.size!}
                                                    onChange={e => {
                                                        setPet(preState => ({
                                                            ...preState,
                                                            size: e.target.value
                                                        }))
                                                    }}

                                                >
                                                    <option value='Littel <10kg'>Little &#60;10kg</option>
                                                    <option value='Medium 10-20kg'>Medium 10-20kg</option>
                                                    <option value='Large >20kg'>Large &#62;20kg</option>
                                                </select>
                                            </div>
                                            <div className="col-span-6 sm:col-span-4">
                                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                    Microchip No.
                                                </label>
                                                <input
                                                    type="text"
                                                    name="microchip"
                                                    id="microchip"
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                                                    value={pet.microchip!}
                                                    onChange={e => {
                                                        setPet(preState => ({
                                                            ...preState,
                                                            microchip: e.target.value
                                                        }))
                                                    }}
                                                />
                                            </div>

                                            <div className="col-span-6">
                                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                                                <textarea id="message" rows={6} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border focus:border-black "
                                                    placeholder="Description..."
                                                    value={pet.description}
                                                    onChange={e => setPet(preState => ({
                                                        ...preState,
                                                        description: e.target.value
                                                    }))}></textarea>
                                            </div>

                                            <div className="col-span-6">
                                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 ">Note</label>
                                                <textarea id="message" rows={2} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border focus:border-black "
                                                    placeholder="Remark..."
                                                    value={pet.note!}
                                                    onChange={e => setPet(preState => ({
                                                        ...preState,
                                                        note: e.target.value
                                                    }))}
                                                ></textarea>
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            <label className="block text-sm font-medium text-gray-700"> Photo</label>
                                            <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6  cursor-pointer" onClick={() => {
                                                inputImageRef.current?.click();
                                            }}>
                                                <div className="space-y-1 text-center">
                                                    <svg
                                                        className="mx-auto h-12 w-12 text-gray-400"
                                                        stroke="currentColor"
                                                        fill="none"
                                                        viewBox="0 0 48 48"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                            strokeWidth={2}
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                    <div className="text-sm text-gray-600" >
                                                        <label
                                                            htmlFor="file-upload"
                                                            className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                                        >
                                                            <span>Upload a file</span>
                                                            <input ref={inputImageRef} id="file-upload" name="file-upload" type="file" accept="image/*" className="sr-only" onChange={(e) => uploadPhoto(e)} />
                                                        </label>
                                                    </div>
                                                    <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`mt-6 p-5 w-1/2 border ${(photo == null) ? 'hidden' : 'block'}`}>
                                            <img ref={reviewImageRef} alt="review image" />
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm  focus:outline-none focus:ring-2  focus:ring-offset-2"
                                            onClick={() => create()}
                                        >
                                            Create
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </React.Fragment>

        </AdminPage>
    )

}

export default PetCreatePage;