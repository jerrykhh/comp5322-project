import { TrashIcon } from "@heroicons/react/24/outline";
import { DataStore, withSSRContext } from "aws-amplify";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAdminSessionCheck } from "../../../../components/lib/auth/admin-auth";
import { WarningAlert } from "../../../../components/modal";
import Table from "../../../../components/table";
import AdminPage from "../../../../components/template/AdminPage";
import { Order, Product, OrderItem } from "../../../../models";


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


const OrderDetailsPage = () => {
    const router = useRouter();
    const [order, setOrders] = useState<Order>({
        id: '',
        userID: '',
        createdAt: '',
        updatedAt: '',
        OrderItems: []
    });

    const [readOnlyMode, setReadOnlyMode] = useState<boolean>(true);
    const [cacheOrder, setCacheOrder] = useState<Order>();

    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [products, setProducts] = useState<{ [key: string]: Product }>({});


    const [deletingOrderItem, setDeletingOrderItem] = useState<OrderItem | null>(null);

    const [sucMes, setSucMes] = useState<String>('');

    useEffect(() => {

        const o = {
            id: '123123',
            userID: '123123123213',
            createdAt: '',
            updatedAt: '',
            OrderItems: [
                {
                    orderID: '123123',
                    id: '123',
                    qty: 1,
                    productID: '123123123',
                    price: 30.0

                }
            ]
        };

        setOrders(o);

        if (!router.isReady)
            return;
        const { id, action } = router.query;

        if (action && action === "edit")
            setReadOnlyMode(false);

        // DataStore.query(Order, id!.toString()).then((os) => {
        //     if (!os)
        //         router.back()
        //     setOrders(os!);
        // })


    }, []);

    useEffect(() => {

        // const productIDs: string[] = order!.OrderItems!.map(product => product!.id);
        // fetchProducts(productIDs).then((pds) => {
        //     setProducts(pds)
        // })

        // const total = order!.OrderItems!.reduce((pre, cur) => {
        //     return pre + cur!.price * cur!.qty;
        // }, 0.0);

        // setTotalPrice(total);


    }, [order])

    const fetchProducts = async (productIDs: string[]): Promise<{ [key: string]: Product }> => {
        const index: { [key: string]: Product } = {};
        for (const productID of productIDs) {
            const product = await DataStore.query(Product, productID);
            if (product)
                index[productID] = product;
        }
        return index;
    }

    const save = () => {

        DataStore.save(
            Order.copyOf(cacheOrder!, updated => {
                updated.OrderItems = cacheOrder!.OrderItems
            })
        )
    };

    const updateQty = (index: number, qty: number) => {
        const newOrderItems = structuredClone(order.OrderItems);
        newOrderItems![index]!.qty! = qty;
        setOrders(preState => ({
            ...preState,
            OrderItems: newOrderItems
        }))
    }

    const remove = (item: OrderItem) => {
        setSucMes('');
        const newOrderItem = order.OrderItems?.filter(i => i != item);
        const id = order.id;
        if (newOrderItem?.length == 0) {
            
            DataStore.delete(Order, id);
            router.push(`/admin/portal/orders?rmpk=${id}`)
        } else {
            setOrders(preState => ({
                ...preState,
                OrderItems: newOrderItem
            }));
            DataStore.save(
                Order.copyOf(cacheOrder!, update => {
                    update.OrderItems = newOrderItem;
                })
            );
            setSucMes(`Product #${id} is deleted.`)
        }
        setDeletingOrderItem(null);

    }

    return (
        <AdminPage
            pageName="Order Details">
            <React.Fragment>
                {deletingOrderItem !== null ?
                    <WarningAlert
                        title={`Deleting Product #${deletingOrderItem.productID}`}
                        message={`Are you sure you want to delete ? All data will be permanently removed. This action cannot be undone`}
                        onConfirm={() => remove(deletingOrderItem)}
                        onCancel={() => setDeletingOrderItem(null)} />
                    : <></>
                }

                <div className="mb-6">
                    <button onClick={() => router.back()}> &lt; Back</button>
                </div>
                {sucMes !== "" ?

                    <div className="mb-10">
                        {sucMes !== "" ?

                            <div className="bg-teal-100 border-t border-b border-teal-500 text-teal-700 px-4 py-3" role="alert">
                                <p className="font-bold">Successful Message</p>
                                <p className="text-sm">{sucMes}</p>
                            </div>
                            : <></>
                        }


                    </div>
                    : <></>
                }
                <div className="mx-auto text-xl">
                    <div className="py-2">
                        <h2 className=" font-semibold text-2xl">ID: {order?.id}</h2>
                        <p>UID: {order!.userID}</p>
                        {(order!.createdAt) ?
                            <p>Createhd At: {order!.createdAt}</p>
                            : <></>
                        }
                        {(order!.createdAt || order?.updatedAt) ?
                            <p>Updated At: {(order?.updatedAt) ? order.updatedAt : order!.createdAt}</p>
                            : <></>
                        }
                    </div>
                    <div className="my-4">

                        <Table
                            title="Order Items">
                            <tr>
                                <th>Product ID</th>
                                <th>Qty</th>
                                <th>Price</th>
                                {!readOnlyMode ?
                                    <th>Action</th>
                                    : <></>
                                }
                            </tr>
                            {order!.OrderItems!.length == 0 ?
                                <tr>
                                    <td className="text-center" colSpan={(readOnlyMode) ? 3 : 4}>No Data Here</td>
                                </tr>
                                :
                                <React.Fragment>
                                    {order!.OrderItems!.map((orderItem, i) => {
                                        return (
                                            <tr key={orderItem!.id}>
                                                <td>{orderItem!.productID}</td>
                                                <td>
                                                    {readOnlyMode?
                                                        orderItem!.qty
                                                        : <input
                                                        type="number"
                                                        step={1}
                                                        placeholder="Search"
                                                        className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                                                        onChange={(e) => updateQty(i, parseInt(e.target.value))}
                                                        value={orderItem?.qty}
                                                    />
                                                    }
                                                </td>
                                                <td>${orderItem!.price}</td>
                                                {!readOnlyMode ?
                                                    <td><button className="btn remove-btn"
                                                        onClick={() => setDeletingOrderItem(orderItem)}>
                                                        <TrashIcon />
                                                    </button></td>
                                                    : <></>
                                                }
                                            </tr>
                                        )
                                    })}
                                    <tr>
                                        <td rowSpan={2}></td>
                                        <td className="text-right">Total:</td>
                                        <td>${totalPrice}</td>
                                    </tr>
                                </React.Fragment>

                            }

                        </Table>

                    </div>
                    {!readOnlyMode ?
                        <div className="px-4 py-3 text-right sm:px-6">
                            <button
                                type="button"
                                className="w-full md:w-fit inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm  focus:outline-none focus:ring-2  focus:ring-offset-2"
                                onClick={() => save()}
                            >
                                Save
                            </button>
                        </div>
                        : <></>
                    }
                </div >
            </React.Fragment>
        </AdminPage>
    )

}

export default OrderDetailsPage;