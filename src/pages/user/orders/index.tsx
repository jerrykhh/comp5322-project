import { EyeIcon, PaperClipIcon } from "@heroicons/react/24/outline";
import { DataStore } from "aws-amplify";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Table from "../../../components/table";
import Page from "../../../components/template/Page";
import { UserContext } from "../../../contexts/user/user";
import { Order } from "../../../models";
import Moment from "react-moment";

const UserOrderPage = () => {

    const router = useRouter();

    const [orders, setOrders] = useState<Order[]>([]);
    const [sucMes, setSucMes] = useState<String>('');

    const {user, setUser} = useContext(UserContext);

    useEffect(() => {
        console.log(user)
        DataStore.query(Order, c => c.userID('eq', user!.getIdToken().payload['sub'])).then((orderData) => {
            setOrders(orderData)
        });
    }, []);

    useEffect(() => {

        if (!router.isReady)
            return;

        const { id } = router.query;
        if (id) {
            setSucMes(`Order #${id} is created`)
        }

    }, [router.isReady, router.query])

    return (
        <Page
            bgColor="bg-gray-50"
            category={null}
            title="Your Orders">
            <div className="bg-gray-50 min-h-[70vh]">
                <div className="container mx-auto">

                    <div className="p-10">
                        <div className="mb-10">
                            {sucMes !== "" ?

                                <div className="bg-teal-100 border-t border-b border-teal-500 text-teal-700 px-4 py-3" role="alert">
                                    <div className="font-bold">Successful Message</div>
                                    <div className="text-sm">{sucMes}</div>
                                </div>
                                : <></>
                            }
                        </div>

                        <div className="mb-6">
                            <button className="back-btn" onClick={() => router.push('/shop/')}> &lt; Back</button>
                        </div>


                        <Table
                            title="Orders">
                            <tr>
                                <th>ID#</th>
                                <th>Address</th>
                                <th>Status</th>
                                <th>updatedAt</th>
                                <th>Action</th>
                            </tr>
                            {orders.length === 0 ?
                                <tr>
                                    <td colSpan={5} className="text-center">No Data here</td>
                                </tr>
                                : orders.map((order, i) => {

                                    return (
                                        <React.Fragment key={i}>
                                            <tr>
                                                <td className="font-bold">{order.id}</td>
                                                <td><div className=" break-all w-[10rem] break-space">{order.address}</div></td>
                                                <td>{order.status}</td>
                                                <td>{order.updatedAt? <Moment>{order.updatedAt}</Moment>: <></>}</td>
                                                <td>
                                                    <Link href={`/user/orders/${order.id}`}>
                                                        <button className="btn view-btn">
                                                            <EyeIcon className="mr-1" /> View
                                                        </button>
                                                    </Link>
                                                </td>
                                            </tr>

                                        </React.Fragment>
                                    )

                                })

                            }

                        </Table>
                    </div>

                </div>
            </div>

        </Page>
    )
}

export default UserOrderPage;