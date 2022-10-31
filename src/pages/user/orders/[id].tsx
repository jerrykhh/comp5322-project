import { DataStore } from "aws-amplify";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import ImageView from "../../../components/lib/element/imageView";
import Page from "../../../components/template/Page";
import { Order, OrderItem, Product } from "../../../models"
import { OrderDetails } from "../../../typing/OrderDetails";
import Moment from 'react-moment';

const UserOrderDetailPage = () => {

    const router = useRouter();
    // const [order, setOrder] = useState<Order>();
    // const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
    // const [products, setProducts] = useState<{ [key: string]: Product }>({});
    const [order, setOrder] = useState<OrderDetails | null>(null);
    const [errMes, setErrMes] = useState<String>('');

    useEffect(() => {
        if (!router.isReady)
            return;

        const { id } = router.query;

        console.log('id', id)

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
                order: orderData!,
                orderItem: orderItems,
                products: products
            }));
            // setProducts(items);
            // setOrderItems(ois)
            // setOrder(orderData)
        }

        fetchData(id!.toString());

    }, [router.isReady]);



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
        <Page
            bgColor="bg-gray-50"
            category={null}
            title={`Your Order > ${(order !== null) ? order!.order.id : ''}`}
        >
            
                <div className="container mx-auto h-screen">

                    <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
                        <div className="mb-6">
                            <button onClick={() => router.push('/user/orders/')}> &lt; Back</button>
                        </div>
                        {errMes !== "" ?
                            <div className="my-12 bg-red-100 border  border-red-500 text-red-700 px-4 py-3" role="alert">
                                <p className="font-bold">Error message</p>
                                <p className="text-sm">{errMes}</p>
                            </div>
                            : <></>
                        }

                        <div className="flex justify-start item-start space-y-2 flex-col ">
                            <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-800">Order</h1>
                            <div className="text-base font-medium leading-6 text-gray-600">
                                <div className="my-2">Order Status: {order?.order.status!}</div>
                                {(order?.order.createdAt && order?.order.createdAt !== '') ?
                                    <div className="my-2">Order Created At: <Moment>order?.order.createdAt</Moment></div>
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
                                                <div key={i} className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full ">
                                                    <div className="pb-4 md:pb-8 w-full md:w-40">
                                                        <ImageView className="w-full md:block rounded-md" src={order!.products[item.productID].image!} alt="dress" />
                                                    </div>
                                                    <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                                                        <div className="w-full flex flex-col justify-start items-start space-y-8">
                                                            <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">{order.products[item!.productID].name!}</h3>
                                                            <div className="flex justify-start items-start flex-col space-y-2">
                                                                {order.products[item!.productID].description}
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-between space-x-8 items-start w-full">
                                                            <p className="text-base xl:text-lg leading-6 text-gray-800">{item?.qty} Qty</p>
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
                            </div>

                        </div>
                    </div>
                </div>
            
        </Page>
    )



}
export default UserOrderDetailPage;