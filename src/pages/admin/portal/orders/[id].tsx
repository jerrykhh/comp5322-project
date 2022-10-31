import { TrashIcon } from "@heroicons/react/24/outline";
import { DataStore, withSSRContext } from "aws-amplify";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAdminSessionCheck } from "../../../../components/lib/auth/admin-auth";
import { WarningAlert } from "../../../../components/modal";
import Table from "../../../../components/table";
import AdminPage from "../../../../components/template/AdminPage";
import { Order, Product, OrderItem, OrderStatus } from "../../../../models";
import Moment from "react-moment"
import ImageView from "../../../../components/lib/element/imageView";
import { OrderDetails } from "../../../../typing/OrderDetails";

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


const OrderDetailsPage = () => {

    const router = useRouter();
    const [order, setOrder] = useState<OrderDetails | null>(null);

    const [readOnlyMode, setReadOnlyMode] = useState<boolean>(true);
    const [cacheOrder, setCacheOrder] = useState<Order>();
    const [cacheOrderItem, setCacheOrderItem] = useState<OrderItem[]>();
    const [deletingOrderItem, setDeletingOrderItem] = useState<OrderItem | null>(null);

    const [sucMes, setSucMes] = useState<String>('');
    const [errMes, setErrMes] = useState<string>('');

    const orderStatus = [
        {
            status: OrderStatus.CREATED,
            button: <></>
        },

        {
            status: OrderStatus.CONFIRMED,
            button: <button onClick={() => {
                updateOrderStatus(OrderStatus.CONFIRMED);
                router.reload();


            }} type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Confirmed</button>
        },
        {
            status: OrderStatus.SHIPPING,
            button: <button onClick={() => {
                updateOrderStatus(OrderStatus.SHIPPING);
                router.reload();

            }} className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">Shipping</button>
        },
        {
            status: OrderStatus.FINISH,
            button: <button onClick={() => {
                updateOrderStatus(OrderStatus.FINISH);
                router.reload();

            }} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Finish</button>
        }
    ];



    const updateOrderStatus = (orderStatus: OrderStatus) => {
        DataStore.save(
            Order.copyOf(cacheOrder!, updated => {
                updated.status = orderStatus
            })
        );
        
    }



    useEffect(() => {

        if (!router.isReady)
            return;
        const { id, action } = router.query;

        if (action && action === "edit")
            setReadOnlyMode(false);

        const fetchData = async (id: string) => {
            const orderData = await DataStore.query(Order, id);
            console.log(id);
            const products: { [key: string]: Product } = {};
            const orderItems = await DataStore.query(OrderItem, c => c.orderID('eq', id));
            console.log('orderItens',)
            for (const item of orderItems) {
                const product = await DataStore.query(Product, item.productID);
                products[product!.id!] = product!;
            };

            setOrder(preState => ({
                ...preState,
                order: structuredClone(orderData!),
                orderItem: structuredClone(orderItems!),
                products: structuredClone(products)
            }));
            setCacheOrder(orderData);
            setCacheOrderItem(orderItems);
        }

        fetchData(id!.toString());


    }, [router.isReady]);


    // const fetchProducts = async (productIDs: string[]): Promise<{ [key: string]: Product }> => {
    //     const index: { [key: string]: Product } = {};
    //     for (const productID of productIDs) {
    //         const product = await DataStore.query(Product, productID);
    //         if (product)
    //             index[productID] = product;
    //     }
    //     return index;
    // }

    const save = () => {
        DataStore.save(
            Order.copyOf(cacheOrder!, updated => {
                updated.OrderItems = order?.orderItem!
            })
        );

        cacheOrderItem?.forEach((item, i) => {
            DataStore.save(
                OrderItem.copyOf(item!, update => {
                    update.qty = order!.orderItem[i].qty
                })
            )
        });
        setSucMes('Order Saved')

    };

    const updateQty = (index: number, qty: number) => {
        // const newOrderItems = structuredClone(order.OrderItems);
        // newOrderItems![index]!.qty! = qty;
        // setOrders(preState => ({
        //     ...preState,
        //     OrderItems: newOrderItems
        // }))
    }

    const remove = (item: OrderItem) => {
        // setSucMes('');
        // const newOrderItem = order.OrderItems?.filter(i => i != item);
        // const id = order.id;
        // if (newOrderItem?.length == 0) {

        //     DataStore.delete(Order, id);
        //     router.push(`/admin/portal/orders?rmpk=${id}`)
        // } else {
        //     setOrders(preState => ({
        //         ...preState,
        //         OrderItems: newOrderItem
        //     }));
        //     DataStore.save(
        //         Order.copyOf(cacheOrder!, update => {
        //             update.OrderItems = newOrderItem;
        //         })
        //     );
        //     setSucMes(`Product #${id} is deleted.`)
        // }
        // setDeletingOrderItem(null);

    }

    const btnNextOrderStatus = (status: OrderStatus | String) => {
        let needbreak: boolean = false;
        for (const os of orderStatus) {
            if (needbreak)
                return os.button
            if (os.status == status)
                needbreak = true;
        }
        return <></>;
    }

    const totalPrice = (orderItem: OrderItem[]) => {

        if (!orderItem)
            return 0.0
        return orderItem.reduce((pre: number | null, cur: OrderItem | null) => {
            if (pre === null || cur === null)
                return 0
            return pre + (cur.qty * cur.price)
        }, 0.0).toFixed(2)
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


                <div className="container mx-auto h-screen">

                    <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto ">


                        <div className="mb-6">
                            <button onClick={() => router.back()} className="w-full bg-black text-white rounded p-2  hover:bg-gray-800 md:w-auto md:bg-white md:text-black md:hover:bg-white md:px-0 md:p-0"> &lt; Back</button>
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
                        {errMes !== "" ?
                            <div className="my-12 bg-red-100 border  border-red-500 text-red-700 px-4 py-3" role="alert">
                                <p className="font-bold">Error message</p>
                                <p className="text-sm">{errMes}</p>
                            </div>
                            : <></>
                        }
                        {!readOnlyMode ?
                            <div className="my-4 flex justify-end">

                                <div className="">Change Status: {btnNextOrderStatus(order?.order.status!)}</div>

                            </div>
                            : <></>
                        }

                        <div className="flex justify-start item-start space-y-2 flex-col ">
                            <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-800">Order</h1>
                            <div className="text-base font-medium leading-6 text-gray-600">
                                <div className="my-2">UID: {order?.order.userID}</div>
                                <div className="my-2">Order Status: {order?.order.status!}</div>
                                {(order?.order.createdAt && order?.order.createdAt !== '') ?
                                    <div className="my-2">Order Created At: <Moment>{order?.order.createdAt}</Moment></div>
                                    : <></>
                                }
                                {(order?.order.updatedAt && order?.order.updatedAt !== '') ?
                                    <div className="my-2">Order Updated At: <Moment>{order?.order.updatedAt!}</Moment></div>
                                    : <></>
                                }


                            </div>
                        </div>
                        <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                            <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                                <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                                    <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">Customer’s Order Details</p>


                                    {order !== null ?

                                        order!.orderItem.map((item, i) => {
                                            console.log('order.orderItem', item);
                                            console.log(order.products)
                                            console.log('product', Object.values(order.products))

                                            return (
                                                <div key={i} className="mt-4 md:mt-6 flex  flex-col lg:flex-row justify-start items-start mlgd:items-center lg:space-x-6 xl:space-x-8 w-full ">
                                                    <div className="pb-4 md:pb-8 w-full md:w-40 self-center">
                                                        <ImageView className="w-full lg:block rounded-md" src={order!.products[item.productID].image!} alt="dress" />
                                                    </div>
                                                    <div className="border-b border-gray-200 lg:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 lg:space-y-0">
                                                        <div className="w-full flex flex-col justify-start items-start space-y-8">
                                                            <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">{order.products[item!.productID].name!}</h3>
                                                            <div className="flex justify-start items-start flex-col space-y-2">
                                                                {order.products[item!.productID].description}
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-between space-x-8 items-start w-full">
                                                            {!readOnlyMode ?
                                                                <input type={"number"} className="mt-1 w-24 block  rounded-md border-gray-300 shadow-sm sm:text-sm" value={item.qty} onChange={(e) => {
                                                                    const newOrder = structuredClone(order);
                                                                    newOrder.orderItem[i].qty = parseInt(e.target.value);
                                                                    setOrder(newOrder);
                                                                }} />
                                                                : <p className="text-base xl:text-lg leading-6 text-gray-800">{item?.qty} Qty</p>
                                                            }
                                                            <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">${item?.price}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                        : <></>
                                    }


                                </div>
                                <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                                    <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                                        <h3 className="text-xl font-semibold leading-5 text-gray-800">Summary</h3>

                                        <div className="flex justify-between items-center w-full border-t py-4">
                                            <p className="text-base font-semibold leading-4 text-gray-800">Total</p>
                                            <p className="text-base font-semibold leading-4 text-gray-600">${order !== null ? totalPrice(order.orderItem) : 0.0}</p>
                                        </div>
                                    </div>

                                </div>
                                <div className="flex justify-end">
                                    <button className="w-full lg:w-auto inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm  focus:outline-none focus:ring-2  focus:ring-offset-2" onClick={() => save()}>Save </button>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </React.Fragment>
        </AdminPage>
    )

}

export default OrderDetailsPage;