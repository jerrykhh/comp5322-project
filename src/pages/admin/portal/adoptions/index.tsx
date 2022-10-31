import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { DataStore, SortDirection, Predicates, withSSRContext } from "aws-amplify";
import Table from "../../../../components/table";
import router, { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { WarningAlert } from "../../../../components/modal";
import AdminPage from "../../../../components/template/AdminPage";
import { Adoption, AdoptionStatus, Pet } from "../../../../models"
import Moment from "react-moment"
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


const AdminAdoptionRequestPage = () => {
    const router = useRouter();
    const [adoptions, setAdoptions] = useState<Adoption[]>([]);
    const [deletingAdoption, setDeletingAdoption] = useState<Adoption | null>(null);

    const [sucMes, setSucMes] = useState<String>('');
    const [errMes, setErrMes] = useState<String>('');



    useEffect(() => {
        if (!router.isReady)
            return;
        const { pk, q } = router.query;
        if (q && q !== "") {
            DataStore.query(Adoption, c => c.or(p => p.id('contains', q.toString())), {
                page: 0,
                limit: 50,
                sort: p => p.createdAt(SortDirection.DESCENDING)
            }).then((ps) => {
                setAdoptions(ps);
            });
        } else {

            DataStore.query(Adoption, Predicates.ALL, {
                page: 0,
                limit: 50,
                sort: p => p.createdAt(SortDirection.DESCENDING)
            }).then((ps) => {
                setAdoptions(ps);
            });

        }

    }, [router.isReady, router.query]);


    // const read = (id: string) => {
    //     router.push(`./pets/${id}`);
    // }

    const remove = async (adoption: Adoption) => {
        const id = adoption.id;
        setSucMes('');

        try {
            if (deletingAdoption == null)
                return;
            //DataStore.delete(deletingAdoption)

            DataStore.save(
                Adoption.copyOf(deletingAdoption!, updated => {
                    updated.status = AdoptionStatus.REJECT
                })
            );
            //await DataStore.delete(adoption)

            const idx = adoptions.findIndex(item => item == adoption)
            const newAdoptions = structuredClone(adoptions);
            newAdoptions[idx].status = AdoptionStatus.REJECT;
            //setAdoptions(adoptions.filter(item => item !== adoption));
            setAdoptions(newAdoptions)
            setSucMes(`Adoption #${id} is Rejected`);
            setDeletingAdoption(null);
        } catch (error) {
            setErrMes(`Deleting Adoption #${id} failed`)

        }

    }

    return (
        <AdminPage pageName="Adoption Requests">
            {deletingAdoption !== null ?
                <WarningAlert
                    title="Deleting the Adoption request"
                    message={`Are you sure you want to Reject this Request ? This action cannot be undone`}
                    onConfirm={() => remove(deletingAdoption)}
                    onCancel={() => setDeletingAdoption(null)} />
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
                            <p className="font-bold">Error message</p>
                            <p className="text-sm">{errMes}</p>
                        </div>
                        : <></>
                    }
                </div>
                : <></>
            }
            <div className="grid md:grid my-6">


                <form action="./adoptions" method="GET" className="lg:col-end-7 lg:col-span-1 my-8 lg:my-0 ">

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
                title="Adoptions"
                description="You can Create, Update, Delete, Read the Adoption Requests ">
                <thead>
                    <tr>
                        <th>ID#</th>
                        <th>username</th>
                        <th>contact</th>
                        <th>Status</th>
                        <th>CreateAt</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {adoptions.length == 0 ?
                        <tr>
                            <td className="text-center" colSpan={5}> No any data here</td>
                        </tr>

                        :
                        adoptions.map((adoption: Adoption) => {
                            return (
                                <tr className="hover:bg-gray-100" key={adoption.id}>
                                    <td>{adoption.id}</td>
                                    <td>{adoption.userId}</td>
                                    <td>{adoption.contact}</td>
                                    <td>{adoption.status}</td>
                                    <td>{adoption.createdAt? <Moment>{adoption.createdAt}</Moment>: ''}</td>
                                    <td className="action">
                                        <button className="btn view-btn" onClick={() => router.push(`/admin/portal/adoptions/${adoption.id}`)}>
                                            <EyeIcon className="mr-1" /> View
                                        </button>

                                        <button className="btn edit-btn" onClick={() => router.push(`/admin/portal/adoptions/${adoption.id}?action=edit`)}>
                                            <PencilIcon className="mr-1" /> Edit
                                        </button>
                                        {adoption.status !== AdoptionStatus.REJECT ?
                                            <button className="btn remove-btn"
                                                onClick={() => setDeletingAdoption(adoption)}>
                                                <TrashIcon />
                                            </button>
                                            :<></>

                                        }

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

export default AdminAdoptionRequestPage