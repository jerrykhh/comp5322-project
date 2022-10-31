import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { DataStore, Predicates, SortDirection, withSSRContext } from "aws-amplify";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAdminSessionCheck } from "../../../../components/lib/auth/admin-auth";
import { WarningAlert } from "../../../../components/modal";
import Table from "../../../../components/table";
import AdminPage from "../../../../components/template/AdminPage";
import { Order } from "../../../../models";
import Memont from "react-moment"

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


const PetOrdersPage = () => {

    const router = useRouter();

    const [deletingOrder, setDeletingOrder] = useState<Order | null>(null);
    const [sucMes, setSucMes] = useState<String>('');
    const [errMes, setErrMes] = useState<String>('');

    const [orders, setOrders] = useState<Order[]>([]);


    useEffect(() => {

        if (!router.isReady)
            return;

        const { pk, q, rmpk } = router.query;
        if (pk)
            setSucMes(`Order #${pk} is created`);

        if (rmpk)
            setSucMes(`Order #${rmpk} is deleted`);

        if (q && q !== "") {
            DataStore.query(Order, c => c.id('contains', q.toString()), {
                page: 0,
                limit: 50,
                sort: p => p.createdAt(SortDirection.DESCENDING)
            }).then((resOrders) => {
                setOrders(resOrders);
            })

        } else {

            DataStore.query(Order, Predicates.ALL, {
                page: 0,
                limit: 50,
                sort: p => p.createdAt(SortDirection.DESCENDING)
            }).then((resOrders) => {
                setOrders(resOrders);
            })

        }

    }, [router.isReady, router.query]);

    const read = (id: string) => {
        router.push(`./orders/${id}`)
    }

    const remove = async (order: Order) => {
        const id = order.id;
        setSucMes('');

        try {

            if (deletingOrder == null)
                return;

            await DataStore.delete(order);
            setOrders(orders.filter(item => item !== order));
            setSucMes(`Order #${id} is deleted`);
            setDeletingOrder(null);

        } catch (error) {
            setErrMes(`Deleting Order #${id} failed`)
        }

    }

    return (
        <AdminPage pageName="Orders">
            {deletingOrder !== null ?
                <WarningAlert
                    title="Deleting Order"
                    message="Are you sure you want to delete ? All data will be permanently removed. This action cannot be undone"
                    onConfirm={() => remove(deletingOrder)}
                    onCancel={() => setDeletingOrder(null)}
                />
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

                <form action="./orders" method="GET" className="lg:col-end-7 lg:col-span-1 my-8 lg:my-0 ">

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
                title="Orders"
                description="You can Create, Update, Delete, Read the Order Data ">
                <thead>
                    <tr>
                        <th>ID#</th>
                        <th>userId</th>
                        <th>Created At</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length == 0 ?
                        <tr>
                            <td className="text-center" colSpan={4}> No any data here</td>
                        </tr>

                        :
                        orders.map((order: Order) => {
                            return (
                                <tr className="hover:bg-gray-100" key={order.id}>
                                    <td >{order.id}</td>
                                    <td>{order.userID}</td>
                                    <td>{(order.createdAt && order.createdAt !== '') ? <Memont>{order.createdAt!}</Memont> : ''}</td>

                                    <td className="action">
                                        <button className="btn view-btn" onClick={() => router.push(`/admin/portal/orders/${order.id}`)}>
                                            <EyeIcon className="mr-1" /> View
                                        </button>

                                        <button className="btn edit-btn" onClick={() => router.push(`/admin/portal/orders/${order.id}?action=edit`)}>
                                            <PencilIcon className="mr-1" /> Edit
                                        </button>
                                        <button className="btn remove-btn"
                                            onClick={() => setDeletingOrder(order)}>
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

export default PetOrdersPage;