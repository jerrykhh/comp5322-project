import Table from "../../../components/table";
import AdminPage from "../../../components/template/AdminPage";
import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/router";
import { useState } from "react";
import WarningAlert from "../../../components/modal";


const AdminPetPage = () => {

    const router = useRouter();
    const [status, setStatus] = useState(-1);

    const [deletingPet, setDeletingPet] = useState(null);

    const create = () => {

    }

    const read = (id: string) => {
        router.push(`./pets/${id}`);
    }

    const update = (id: string) => {

    }

    const remove = (id: string) => {
        /*
            remove logic
        */
        setDeletingPet(null);
    }

    return (
        <AdminPage pageName="Pets">
            {deletingPet !== null ?
                <WarningAlert 
                    title="Deleting the Pet" 
                    message={`Are you sure you want to delete ? All data will be permanently removed. This action cannot be undone`}
                    onConfirm={() => remove('1')} 
                    onCancel={() => setDeletingPet(null)} />
                : <></>
            }
            {status !== -1 ?

                <div className="mb-10">
                    {status == 1 ?

                        <div className="bg-teal-100 border-t border-b border-teal-500 text-teal-700 px-4 py-3" role="alert">
                            <p className="font-bold">Informational message</p>
                            <p className="text-sm">Some additional text to explain said message.</p>
                        </div>
                        :
                        status == 0 ?
                            <div className="bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3" role="alert">
                                <p className="font-bold">Informational message</p>
                                <p className="text-sm">Some additional text to explain said message.</p>
                            </div>
                            : <></>
                    }
                </div>
                : <></>
            }


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
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="action">
                            <button className="btn view-btn" onClick={() => read('1')}>
                                <EyeIcon className="mr-1" /> View
                            </button>

                            <button className="btn edit-btn" onClick={() => update('1')}>
                                <PencilIcon className="mr-1" /> Edit
                            </button>
                            <button className="btn remove-btn">
                                <TrashIcon />
                            </button>
                        </td>
                    </tr>
                </tbody>


            </Table>
        </AdminPage>
    )
}

export default AdminPetPage;