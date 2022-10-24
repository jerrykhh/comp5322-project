import Table from "../../../components/table";
import AdminPage from "../../../components/template/AdminPage";
import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {WarningAlert} from "../../../components/modal";
import { Pet } from "../../../models";
import { DataStore, Predicates, SortDirection } from "aws-amplify";


const AdminPetPage = () => {

    const router = useRouter();
    const [deletingPet, setDeletingPet] = useState<Pet | null>(null);
    const [sucMes, setSucMes] = useState<String>('');
    const [errMes, setErrMes] = useState<String>('');

    const [pets, setPets] = useState<Pet[]>([]);

    useEffect(() => {
        if (!router.isReady)
            return;
        const { pk, q } = router.query;
        if (pk)
            setSucMes(`Pet #${pk} is created`);

        if (q && q !== "") {
            DataStore.query(Pet, c => c.or(p => p.id('contains', q.toString())), {
                page: 0,
                limit: 50,
                sort: p => p.createdAt(SortDirection.DESCENDING)
            }).then((ps) => {
                setPets(ps);
            });
        } else {

            DataStore.query(Pet, Predicates.ALL, {
                page: 0,
                limit: 50,
                sort: p => p.createdAt(SortDirection.DESCENDING)
            }).then((ps) => {
                setPets(ps);
            });

        }

    }, [router.isReady, router.query]);


    const read = (id: string) => {
        router.push(`./pets/${id}`);
    }

    const remove = async (pet: Pet) => {
        const id = pet.id;
        setSucMes('');

        try {
            if (deletingPet == null)
                return;

            await DataStore.delete(pet)
            setPets(pets.filter(item => item !== pet));
            setSucMes(`Pet #${id} is deleted`);
            setDeletingPet(null);
        } catch (error) {
            setErrMes(`Deleting Pet #${id} failed`)

        }

    }

    return (
        <AdminPage pageName="Pets">
            {deletingPet !== null ?
                <WarningAlert
                    title="Deleting the Pet"
                    message={`Are you sure you want to delete ? All data will be permanently removed. This action cannot be undone`}
                    onConfirm={() => remove(deletingPet)}
                    onCancel={() => setDeletingPet(null)} />
                : <></>
            }
            {sucMes !== "" || errMes !== "" ?

                <div className="mb-10">
                    {sucMes !== "" ?

                        <div className="bg-teal-100 border-t border-b border-teal-500 text-teal-700 px-4 py-3" role="alert">
                            <p className="font-bold">Successful Message</p>
                            <p className="text-sm">{sucMes}</p>
                        </div>
                        : <></>
                    }

                    {errMes !== "" ?
                        <div className="bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3" role="alert">
                            <p className="font-bold">Informational message</p>
                            <p className="text-sm">{errMes}</p>
                        </div>
                        : <></>
                    }
                </div>
                : <></>
            }
            <div className="grid md:grid my-6">

                <div className="">
                    <button className="btn w-full lg:w-32 justify-center text-white bg-sky-500 hover:bg-sky-600" onClick={() => router.push('/admin/portal/pets/create')}>Create</button>
                </div>

                <form action="./pets" method="GET" className="lg:col-end-7 lg:col-span-1 my-8 lg:my-0 ">
                
                        <div className="flex ">

                            <input
                                type="text"
                                name="q"
                                id="q"
                                placeholder="Search"
                                className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                            />
                            <button className="btn edit-btn ml-2" type="submit">Search</button>
                        </div>
                 
                </form>
            </div>


            <Table
                title="Pets"
                description="You can Create, Update, Delete, Read the Pets Data ">
                <thead>
                    <tr>
                        <th>ID#</th>
                        <th>Name</th>
                        <th>Breed</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {pets.length == 0 ?
                        <tr>
                            <td className="text-center" colSpan={5}> No any data here</td>
                        </tr>

                        :
                        pets.map((pet: Pet) => {
                            return (
                                <tr className="hover:bg-gray-100" key={pet.id}>
                                    <td>{pet.id}</td>
                                    <td>{pet.name}</td>
                                    <td>{pet.breed}</td>
                                    <td>{pet.adoption_status}</td>
                                    <td className="action">
                                        <button className="btn view-btn" onClick={() => router.push(`/admin/portal/pets/${pet.id}`)}>
                                            <EyeIcon className="mr-1" /> View
                                        </button>

                                        <button className="btn edit-btn" onClick={() => router.push(`/admin/portal/pets/${pet.id}?action=edit`)}>
                                            <PencilIcon className="mr-1" /> Edit
                                        </button>
                                        <button className="btn remove-btn"
                                            onClick={() => setDeletingPet(pet)}>
                                            <TrashIcon />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>


            </Table>
        </AdminPage>
    )
}

export default AdminPetPage;